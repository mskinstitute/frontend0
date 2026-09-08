'use client';

import { SqlQueryResult } from './types';

export interface SqlColumnInfo {
  name: string;
  type: string;
  notnull: boolean;
  isPk: boolean;
  defaultValue?: string | null;
}

export interface SqlTableInfo {
  name: string;
  columns: SqlColumnInfo[];
}

export interface SqlDatabaseInfo {
  name: string;
  isActive: boolean;
  tables: SqlTableInfo[];
}

/**
 * Splits SQL script into discrete statements while preserving:
 * - Single quotes ('...')
 * - Double quotes ("...")
 * - Backticks (`...`)
 * - Single-line comments (-- and #)
 * - Multi-line comments (/* ... *\/)
 */
export function splitSqlStatements(sql: string): string[] {
  const statements: string[] = [];
  let current = '';
  let inSingleQuote = false;
  let inDoubleQuote = false;
  let inBacktick = false;
  let inLineComment = false;
  let inBlockComment = false;

  for (let i = 0; i < sql.length; i++) {
    const char = sql[i];
    const nextChar = sql[i + 1] || '';

    // Inside single-line comment (-- or #)
    if (inLineComment) {
      current += char;
      if (char === '\n') inLineComment = false;
      continue;
    }

    // Inside multi-line comment (/* ... */)
    if (inBlockComment) {
      current += char;
      if (char === '*' && nextChar === '/') {
        current += nextChar;
        i++;
        inBlockComment = false;
      }
      continue;
    }

    // Inside single-quoted string
    if (inSingleQuote) {
      current += char;
      if (char === '\\') {
        current += nextChar;
        i++;
      } else if (char === "'") {
        inSingleQuote = false;
      }
      continue;
    }

    // Inside double-quoted string
    if (inDoubleQuote) {
      current += char;
      if (char === '\\') {
        current += nextChar;
        i++;
      } else if (char === '"') {
        inDoubleQuote = false;
      }
      continue;
    }

    // Inside backtick-quoted identifier
    if (inBacktick) {
      current += char;
      if (char === '`') inBacktick = false;
      continue;
    }

    // Check for comment starts
    if (char === '-' && nextChar === '-') {
      inLineComment = true;
      current += char;
      continue;
    }
    if (char === '#') {
      inLineComment = true;
      current += '--'; // Normalize MySQL # comment to standard SQL --
      continue;
    }
    if (char === '/' && nextChar === '*') {
      inBlockComment = true;
      current += char + nextChar;
      i++;
      continue;
    }

    if (char === "'") { inSingleQuote = true; current += char; continue; }
    if (char === '"') { inDoubleQuote = true; current += char; continue; }
    if (char === '`') { inBacktick = true; current += char; continue; }

    // Statement boundary
    if (char === ';') {
      const trimmed = current.trim();
      if (trimmed) statements.push(trimmed);
      current = '';
      continue;
    }

    current += char;
  }

  const finalTrim = current.trim();
  if (finalTrim) statements.push(finalTrim);

  return statements;
}

/**
 * Normalizes MySQL-specific DDL / DML constructs to SQLite-compatible syntax:
 * - Converts MySQL # comments to -- comments
 * - Normalizes AUTO_INCREMENT to INTEGER PRIMARY KEY AUTOINCREMENT
 * - Strips MySQL table storage options (ENGINE=..., DEFAULT CHARSET=..., COLLATE=..., ROW_FORMAT=...)
 * - Strips MySQL UNSIGNED and ZEROFILL keywords
 */
export function normalizeMysqlToSqlite(sql: string): string {
  let s = sql;

  // Convert MySQL hash comments to dash-dash
  s = s.replace(/^(\s*)#(\s*.*)$/gm, '$1--$2');

  // Strip MySQL table options following closing parenthesis on CREATE TABLE:
  // e.g. ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; -> );
  s = s.replace(
    /\)\s*(?:(?:ENGINE|DEFAULT\s+CHARSET|CHARSET|COLLATE|CHARACTER\s+SET|ROW_FORMAT|AUTO_INCREMENT)\s*=[^;]+)+;?/gi,
    ');'
  );

  // MySQL AUTO_INCREMENT conversions:
  // id INT PRIMARY KEY AUTO_INCREMENT -> id INTEGER PRIMARY KEY AUTOINCREMENT
  // id INT AUTO_INCREMENT PRIMARY KEY -> id INTEGER PRIMARY KEY AUTOINCREMENT
  s = s.replace(
    /\bINT(?:EGER)?\s+(?:PRIMARY\s+KEY\s+)?AUTO_INCREMENT(?:\s+PRIMARY\s+KEY)?\b/gi,
    'INTEGER PRIMARY KEY AUTOINCREMENT'
  );
  s = s.replace(/\bAUTO_INCREMENT\b/gi, 'AUTOINCREMENT');

  // Strip UNSIGNED, ZEROFILL
  s = s.replace(/\bUNSIGNED\b/gi, '');
  s = s.replace(/\bZEROFILL\b/gi, '');

  return s;
}

/**
 * Registers MySQL helper functions into a SQLite database instance (sql.js)
 */
function registerHelperFunctions(db: any, getActiveDbName: () => string) {
  try {
    // MySQL NOW() -> YYYY-MM-DD HH:MM:SS
    db.create_function('NOW', () => {
      const now = new Date();
      return now.toISOString().slice(0, 19).replace('T', ' ');
    });

    // MySQL CURDATE() -> YYYY-MM-DD
    db.create_function('CURDATE', () => {
      return new Date().toISOString().slice(0, 10);
    });

    // MySQL CURTIME() -> HH:MM:SS
    db.create_function('CURTIME', () => {
      return new Date().toTimeString().slice(0, 8);
    });

    // MySQL DATABASE() / SCHEMA() -> current active database name
    db.create_function('DATABASE', () => getActiveDbName());
    db.create_function('SCHEMA', () => getActiveDbName());

    // MySQL VERSION()
    db.create_function('VERSION', () => '8.0.36-msk (MySQL Compatible WebAssembly)');

    // MySQL CONCAT(...)
    db.create_function('CONCAT', (...args: any[]) => args.join(''));

    // MySQL IF(condition, value_if_true, value_if_false)
    db.create_function('IF', (condition: any, trueVal: any, falseVal: any) => {
      return condition ? trueVal : falseVal;
    });
  } catch (err) {
    console.warn('Could not register MySQL helper functions on SQLite instance:', err);
  }
}

/**
 * Comprehensive MySQL & Standard SQL Compatibility Engine
 * Manages multiple in-memory databases, schema switching (USE db),
 * MySQL inspection commands (SHOW DATABASES, SHOW TABLES, DESCRIBE), and query execution.
 */
export class MysqlEngine {
  private databases: Map<string, any> = new Map();
  private activeDatabaseName: string = 'default';
  private SQL: any = null;

  /**
   * Initialize engine with sql.js instance
   */
  public init(SQLInstance: any) {
    this.SQL = SQLInstance;
    if (!this.databases.has('default')) {
      const defaultDb = new SQLInstance.Database();
      registerHelperFunctions(defaultDb, () => this.activeDatabaseName);
      this.databases.set('default', defaultDb);
      this.activeDatabaseName = 'default';
    }
  }

  /**
   * Reset all databases and state back to empty default
   */
  public reset() {
    this.databases.forEach((db) => {
      try {
        db.close();
      } catch {}
    });
    this.databases.clear();
    this.activeDatabaseName = 'default';

    if (this.SQL) {
      const defaultDb = new this.SQL.Database();
      registerHelperFunctions(defaultDb, () => this.activeDatabaseName);
      this.databases.set('default', defaultDb);
    }
  }

  /**
   * Get current active database name
   */
  public getActiveDbName(): string {
    return this.activeDatabaseName;
  }

  /**
   * Get list of all currently created databases
   */
  public getDatabaseList(): string[] {
    return Array.from(this.databases.keys());
  }

  /**
   * Get SQLite instance for active database
   */
  public getActiveDb(): any {
    if (!this.databases.has(this.activeDatabaseName) && this.SQL) {
      const newDb = new this.SQL.Database();
      registerHelperFunctions(newDb, () => this.activeDatabaseName);
      this.databases.set(this.activeDatabaseName, newDb);
    }
    return this.databases.get(this.activeDatabaseName);
  }

  /**
   * CREATE DATABASE / SCHEMA [IF NOT EXISTS] db_name
   */
  public createDatabase(rawName: string, ifNotExists: boolean): { affectedRows: number; message: string } {
    const name = rawName.replace(/[`'"]/g, '').trim().toLowerCase();
    if (!name) throw new Error("Syntax error: Database name cannot be empty");

    if (this.databases.has(name)) {
      if (ifNotExists) {
        return {
          affectedRows: 0,
          message: `Query OK, 0 rows affected (Database '${name}' already exists)`,
        };
      }
      throw new Error(`Can't create database '${name}'; database exists`);
    }

    if (!this.SQL) throw new Error('SQL engine not loaded yet');
    const newDb = new this.SQL.Database();
    registerHelperFunctions(newDb, () => this.activeDatabaseName);
    this.databases.set(name, newDb);

    return {
      affectedRows: 1,
      message: `Query OK, 1 row affected (Database '${name}' created)`,
    };
  }

  /**
   * USE db_name
   */
  public useDatabase(rawName: string): { affectedRows: number; message: string } {
    const name = rawName.replace(/[`'"]/g, '').trim().toLowerCase();
    if (!name) throw new Error("Syntax error: Database name cannot be empty");

    if (!this.databases.has(name)) {
      throw new Error(`Unknown database '${name}'`);
    }

    this.activeDatabaseName = name;
    return {
      affectedRows: 0,
      message: `Database changed to '${name}'`,
    };
  }

  /**
   * DROP DATABASE / SCHEMA [IF EXISTS] db_name
   */
  public dropDatabase(rawName: string, ifExists: boolean): { affectedRows: number; message: string } {
    const name = rawName.replace(/[`'"]/g, '').trim().toLowerCase();
    if (!name) throw new Error("Syntax error: Database name cannot be empty");

    if (!this.databases.has(name)) {
      if (ifExists) {
        return {
          affectedRows: 0,
          message: `Query OK, 0 rows affected (Database '${name}' doesn't exist)`,
        };
      }
      throw new Error(`Can't drop database '${name}'; database doesn't exist`);
    }

    try {
      this.databases.get(name)?.close();
    } catch {}
    this.databases.delete(name);

    // If currently on dropped database, switch to another or default
    if (this.activeDatabaseName === name) {
      const nextDb = this.databases.keys().next().value;
      if (nextDb) {
        this.activeDatabaseName = nextDb;
      } else if (this.SQL) {
        const defaultDb = new this.SQL.Database();
        registerHelperFunctions(defaultDb, () => this.activeDatabaseName);
        this.databases.set('default', defaultDb);
        this.activeDatabaseName = 'default';
      }
    }

    return {
      affectedRows: 0,
      message: `Query OK, 0 rows affected (Database '${name}' dropped)`,
    };
  }

  /**
   * SHOW DATABASES / SCHEMAS
   */
  public showDatabases(): { columns: string[]; values: (string | number | boolean | null)[][] } {
    const dbs = Array.from(this.databases.keys());
    return {
      columns: ['Database'],
      values: dbs.map((d) => [d]),
    };
  }

  /**
   * SHOW TABLES [FROM db_name]
   */
  public showTables(targetDb?: string): { columns: string[]; values: (string | number | boolean | null)[][] } {
    const dbName = targetDb ? targetDb.replace(/[`'"]/g, '').trim().toLowerCase() : this.activeDatabaseName;
    if (!this.databases.has(dbName)) {
      throw new Error(`Unknown database '${dbName}'`);
    }
    const db = this.databases.get(dbName);
    const query = "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name";
    const res = db.exec(query);
    const tables = res && res.length > 0 ? res[0].values : [];

    return {
      columns: [`Tables_in_${dbName}`],
      values: tables,
    };
  }

  /**
   * DESCRIBE / DESC / EXPLAIN / SHOW COLUMNS FROM table_name
   */
  public describeTable(rawTableName: string): { columns: string[]; values: (string | number | boolean | null)[][] } {
    const tableName = rawTableName.replace(/[`'"]/g, '').trim();
    const db = this.getActiveDb();
    if (!db) throw new Error('Database not initialized');

    const pragmaRes = db.exec(`PRAGMA table_info("${tableName}")`);
    if (!pragmaRes || pragmaRes.length === 0 || pragmaRes[0].values.length === 0) {
      throw new Error(`Table '${this.activeDatabaseName}.${tableName}' doesn't exist`);
    }

    // Format output matching MySQL standard DESCRIBE table:
    // Columns: Field | Type | Null | Key | Default | Extra
    const rows = pragmaRes[0].values.map((r: any[]) => {
      const name = String(r[1] || '');
      const rawType = (r[2] || 'TEXT').toString();
      const notnull = r[3];
      const dflt = r[4];
      const pk = r[5];

      return [
        name,
        rawType,
        notnull === 1 ? 'NO' : 'YES',
        pk === 1 ? 'PRI' : '',
        dflt !== null && dflt !== undefined ? String(dflt) : 'NULL',
        pk === 1 ? 'auto_increment' : '',
      ];
    });

    return {
      columns: ['Field', 'Type', 'Null', 'Key', 'Default', 'Extra'],
      values: rows,
    };
  }

  /**
   * SHOW CREATE TABLE table_name
   */
  public showCreateTable(rawTableName: string): { columns: string[]; values: (string | number | boolean | null)[][] } {
    const tableName = rawTableName.replace(/[`'"]/g, '').trim();
    const db = this.getActiveDb();
    if (!db) throw new Error('Database not initialized');

    const res = db.exec(
      `SELECT name AS 'Table', sql AS 'Create Table' FROM sqlite_master WHERE type='table' AND name='${tableName}'`
    );
    if (!res || res.length === 0 || res[0].values.length === 0) {
      throw new Error(`Table '${this.activeDatabaseName}.${tableName}' doesn't exist`);
    }

    return {
      columns: ['Table', 'Create Table'],
      values: res[0].values,
    };
  }

  /**
   * Returns a complete overview of all databases, tables, and column schemas
   */
  public getSchemaOverview(): SqlDatabaseInfo[] {
    const list: SqlDatabaseInfo[] = [];

    // Ensure default database exists if databases is empty
    if (this.databases.size === 0 && this.SQL) {
      this.init(this.SQL);
    }

    this.databases.forEach((db, dbName) => {
      const tables: SqlTableInfo[] = [];
      try {
        const tableQuery = "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name";
        const tableRes = db.exec(tableQuery);
        if (tableRes && tableRes.length > 0 && tableRes[0].values) {
          tableRes[0].values.forEach((row: any) => {
            const tableName = String(row[0]);
            const columns: SqlColumnInfo[] = [];
            try {
              // PRAGMA table_info returns [cid, name, type, notnull, dflt_value, pk]
              const colRes = db.exec(`PRAGMA table_info("${tableName.replace(/"/g, '""')}")`);
              if (colRes && colRes.length > 0 && colRes[0].values) {
                colRes[0].values.forEach((cRow: any) => {
                  columns.push({
                    name: String(cRow[1]),
                    type: String(cRow[2] || 'VARCHAR').toUpperCase(),
                    notnull: Boolean(cRow[3]),
                    defaultValue: cRow[4] !== null && cRow[4] !== undefined ? String(cRow[4]) : null,
                    isPk: Boolean(cRow[5]),
                  });
                });
              }
            } catch (colErr) {
              console.warn(`Failed to inspect columns for ${tableName}:`, colErr);
            }
            tables.push({ name: tableName, columns });
          });
        }
      } catch (tableErr) {
        console.warn(`Failed to inspect tables for ${dbName}:`, tableErr);
      }

      list.push({
        name: dbName,
        isActive: dbName === this.activeDatabaseName,
        tables,
      });
    });

    // If list is empty but default should be present
    if (list.length === 0) {
      list.push({
        name: 'default',
        isActive: true,
        tables: [],
      });
    }

    return list;
  }

  /**
   * Executes a full SQL script containing single or multiple SQL statements
   * with seamless support for both MySQL commands and standard SQL queries.
   */
  public async executeScript(script: string, isSelected = false): Promise<SqlQueryResult[]> {
    const statements = splitSqlStatements(script);
    const results: SqlQueryResult[] = [];

    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i];
      // Skip pure comments or blank lines
      const strippedComments = stmt
        .replace(/^\s*--.*$/gm, '')
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .trim();
      if (!strippedComments) continue;

      const startTime = performance.now();

      try {
        // 1. CREATE DATABASE / SCHEMA
        const createDbMatch = stmt.match(
          /^\s*CREATE\s+(?:DATABASE|SCHEMA)(?:\s+IF\s+NOT\s+EXISTS)?\s+[`'"]?([a-zA-Z0-9_]+)[`'"]?/i
        );
        if (createDbMatch) {
          const ifNotExists = /IF\s+NOT\s+EXISTS/i.test(stmt);
          const res = this.createDatabase(createDbMatch[1], ifNotExists);
          results.push({
            columns: [],
            values: [],
            affectedRows: res.affectedRows,
            message: res.message,
            executionTimeMs: performance.now() - startTime,
            query: stmt,
            isSelected,
            database: this.activeDatabaseName,
          });
          continue;
        }

        // 2. USE database
        const useMatch = stmt.match(/^\s*USE\s+[`'"]?([a-zA-Z0-9_]+)[`'"]?/i);
        if (useMatch) {
          const res = this.useDatabase(useMatch[1]);
          results.push({
            columns: [],
            values: [],
            affectedRows: res.affectedRows,
            message: res.message,
            executionTimeMs: performance.now() - startTime,
            query: stmt,
            isSelected,
            database: this.activeDatabaseName,
          });
          continue;
        }

        // 3. SHOW DATABASES / SCHEMAS
        if (/^\s*SHOW\s+(?:DATABASES|SCHEMAS)\b/i.test(stmt)) {
          const res = this.showDatabases();
          results.push({
            columns: res.columns,
            values: res.values,
            executionTimeMs: performance.now() - startTime,
            query: stmt,
            isSelected,
            database: this.activeDatabaseName,
          });
          continue;
        }

        // 4. SHOW TABLES [FROM db_name]
        const showTablesMatch = stmt.match(
          /^\s*SHOW\s+(?:FULL\s+)?TABLES(?:\s+(?:FROM|IN)\s+[`'"]?([a-zA-Z0-9_]+)[`'"]?)?/i
        );
        if (showTablesMatch) {
          const targetDb = showTablesMatch[1];
          const res = this.showTables(targetDb);
          results.push({
            columns: res.columns,
            values: res.values,
            executionTimeMs: performance.now() - startTime,
            query: stmt,
            isSelected,
            database: this.activeDatabaseName,
          });
          continue;
        }

        // 5. DESCRIBE / DESC / EXPLAIN / SHOW COLUMNS
        const descMatch =
          stmt.match(/^\s*(?:DESCRIBE|DESC|EXPLAIN)\s+[`'"]?([a-zA-Z0-9_]+)[`'"]?/i) ||
          stmt.match(/^\s*SHOW\s+COLUMNS\s+(?:FROM|IN)\s+[`'"]?([a-zA-Z0-9_]+)[`'"]?/i);
        if (descMatch) {
          const tableName = descMatch[1];
          const res = this.describeTable(tableName);
          results.push({
            columns: res.columns,
            values: res.values,
            executionTimeMs: performance.now() - startTime,
            query: stmt,
            isSelected,
            database: this.activeDatabaseName,
          });
          continue;
        }

        // 6. SHOW CREATE TABLE
        const showCreateMatch = stmt.match(/^\s*SHOW\s+CREATE\s+TABLE\s+[`'"]?([a-zA-Z0-9_]+)[`'"]?/i);
        if (showCreateMatch) {
          const tableName = showCreateMatch[1];
          const res = this.showCreateTable(tableName);
          results.push({
            columns: res.columns,
            values: res.values,
            executionTimeMs: performance.now() - startTime,
            query: stmt,
            isSelected,
            database: this.activeDatabaseName,
          });
          continue;
        }

        // 7. DROP DATABASE / SCHEMA [IF EXISTS]
        const dropDbMatch = stmt.match(
          /^\s*DROP\s+(?:DATABASE|SCHEMA)(?:\s+IF\s+EXISTS)?\s+[`'"]?([a-zA-Z0-9_]+)[`'"]?/i
        );
        if (dropDbMatch) {
          const ifExists = /IF\s+EXISTS/i.test(stmt);
          const res = this.dropDatabase(dropDbMatch[1], ifExists);
          results.push({
            columns: [],
            values: [],
            affectedRows: res.affectedRows,
            message: res.message,
            executionTimeMs: performance.now() - startTime,
            query: stmt,
            isSelected,
            database: this.activeDatabaseName,
          });
          continue;
        }

        // 8. Standard SQL (SELECT, INSERT, UPDATE, DELETE, CREATE TABLE, etc.)
        const db = this.getActiveDb();
        if (!db) throw new Error('Database instance unavailable');

        const normalizedSql = normalizeMysqlToSqlite(stmt);
        const execRes = db.exec(normalizedSql);
        const duration = performance.now() - startTime;

        if (execRes && execRes.length > 0) {
          execRes.forEach((r: any) => {
            results.push({
              columns: r.columns,
              values: r.values,
              executionTimeMs: duration,
              query: stmt,
              isSelected,
              database: this.activeDatabaseName,
            });
          });
        } else {
          const affected = db.getRowsModified ? db.getRowsModified() : 0;
          results.push({
            columns: [],
            values: [],
            affectedRows: affected,
            message: affected > 0 ? `Query OK, ${affected} row(s) affected` : 'Query OK, schema/table updated',
            executionTimeMs: duration,
            query: stmt,
            isSelected,
            database: this.activeDatabaseName,
          });
        }
      } catch (err: any) {
        results.push({
          columns: [],
          values: [],
          error: err?.message || String(err),
          executionTimeMs: performance.now() - startTime,
          query: stmt,
          isSelected,
          database: this.activeDatabaseName,
        });
        // Stop execution on first statement error, matching standard SQL script execution
        break;
      }
    }

    return results;
  }
}

// Export singleton instance
export const mysqlEngine = new MysqlEngine();
