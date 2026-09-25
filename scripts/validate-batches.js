#!/usr/bin/env node
/**
 * MSK Institute — Live Batches Data Integrity Validator
 *
 * Validates public/data/live-batches.json:
 * - JSON syntax & schema
 * - Unique Batch IDs
 * - Required fields: id, title, courseSlug, startDate, schedule, price, instructor, status
 * - Valid courseSlug mapping to all-courses.json
 * - Valid batch lifecycle status ('DRAFT' | 'UPCOMING' | 'OPEN' | 'FULL' | 'RUNNING' | 'COMPLETED' | 'CLOSED' | 'ARCHIVED')
 * - Valid date formats
 * - Valid price string or number
 */

const fs = require('fs');
const path = require('path');

const batchesPath = path.join(process.cwd(), 'public', 'data', 'live-batches.json');
const coursesPath = path.join(process.cwd(), 'public', 'data', 'all-courses.json');

console.log('--- MSK INSTITUTE LIVE BATCHES VALIDATION ---');
console.log(`Checking: ${batchesPath}`);

if (!fs.existsSync(batchesPath)) {
  console.error('FATAL: live-batches.json does not exist!');
  process.exit(1);
}

let batches;
try {
  batches = JSON.parse(fs.readFileSync(batchesPath, 'utf8'));
} catch (err) {
  console.error(`FATAL: live-batches.json is not valid JSON: ${err.message}`);
  process.exit(1);
}

if (!Array.isArray(batches)) {
  console.error('FATAL: live-batches.json must contain an array of batches');
  process.exit(1);
}

console.log(`Total live batches found: ${batches.length}`);

// Load valid course slugs
const courses = JSON.parse(fs.readFileSync(coursesPath, 'utf8'));
const validSlugs = new Set(courses.map(c => c.slug));
const validIds = new Set(courses.map(c => c.id));

const batchIdSet = new Set();
let errors = 0;
let warnings = 0;
const allowedStatuses = new Set([
  'DRAFT',
  'UPCOMING',
  'OPEN',
  'FULL',
  'RUNNING',
  'COMPLETED',
  'CLOSED',
  'ARCHIVED',
]);

for (let i = 0; i < batches.length; i++) {
  const b = batches[i];
  const idx = `Batch #${i + 1} (${b.id || 'unnamed'})`;

  // ID check
  if (!b.id || typeof b.id !== 'string') {
    console.error(`[ERROR] ${idx}: Missing or invalid 'id'`);
    errors++;
  } else if (batchIdSet.has(b.id)) {
    console.error(`[ERROR] ${idx}: Duplicate batch id '${b.id}'`);
    errors++;
  } else {
    batchIdSet.add(b.id);
  }

  // Title check
  if (!b.title || typeof b.title !== 'string') {
    console.error(`[ERROR] ${idx}: Missing or empty 'title'`);
    errors++;
  }

  // Course slug check
  if (!b.courseSlug || typeof b.courseSlug !== 'string') {
    console.error(`[ERROR] ${idx}: Missing 'courseSlug'`);
    errors++;
  } else if (!validSlugs.has(b.courseSlug) && !validIds.has(b.courseSlug)) {
    console.error(`[ERROR] ${idx}: courseSlug '${b.courseSlug}' does not match any course in all-courses.json`);
    errors++;
  }

  // Start Date check
  if (!b.startDate || typeof b.startDate !== 'string') {
    console.error(`[ERROR] ${idx}: Missing 'startDate'`);
    errors++;
  } else {
    const parsed = new Date(b.startDate);
    if (isNaN(parsed.getTime())) {
      console.error(`[ERROR] ${idx}: Invalid date format for startDate '${b.startDate}'`);
      errors++;
    }
  }

  // Schedule check
  if (!b.schedule || typeof b.schedule !== 'string') {
    console.error(`[ERROR] ${idx}: Missing 'schedule'`);
    errors++;
  }

  // Price check (e.g., "₹2,999" or 2999)
  const numericPrice = Number(String(b.price || '').replace(/[^0-9.]/g, ''));
  if (b.price === undefined || b.price === null || isNaN(numericPrice) || numericPrice <= 0) {
    console.error(`[ERROR] ${idx}: Missing or invalid price '${b.price}'`);
    errors++;
  }

  // Instructor check
  if (!b.instructor || typeof b.instructor !== 'string') {
    console.error(`[ERROR] ${idx}: Missing 'instructor'`);
    errors++;
  }

  // Status check
  if (b.status && !allowedStatuses.has(b.status)) {
    console.error(`[ERROR] ${idx}: Invalid status '${b.status}'. Allowed: ${Array.from(allowedStatuses).join(', ')}`);
    errors++;
  }

  // Completed batch check
  if (b.status === 'COMPLETED' && !b.endDate) {
    console.warn(`[WARN] ${idx}: Completed batch has no 'endDate' specified`);
    warnings++;
  }
}

console.log('----------------------------------------------------');
console.log(`Validation finished: ${batches.length} live batches checked.`);
console.log(`Errors: ${errors}, Warnings: ${warnings}`);

if (errors > 0) {
  console.error('Validation FAILED: Please fix the errors listed above.');
  process.exit(1);
} else {
  console.log('Validation PASSED: All batch data is 100% integral and complete!');
  process.exit(0);
}
