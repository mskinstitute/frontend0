# Pytest for Advanced Testing

While Python's standard `unittest` module provides an xUnit foundation, **Pytest** has emerged as the industry standard for Python testing. Pytest eliminates boilerplate class hierarchies, leverages Python's native `assert` statement through **Abstract Syntax Tree (AST) rewriting**, and introduces a dependency-injection **Fixture Architecture** and concise test **Parametrization**.

---

## 1. The Pytest Advantage: AST Rewriting & Simple Assertions

In standard `unittest`, developers must memorize dozens of specialized methods (`assertEqual`, `assertSequenceEqual`, `assertIn`). 

Pytest intercepts standard Python `assert` statements at import time using **AST Rewriting**, providing detailed failure introspection without custom assertion methods:

```python
# In standard Pytest, write simple, idiomatic Python:
def test_dictionary_comparison():
    expected = {"status": 200, "data": [1, 2, 3]}
    actual = {"status": 200, "data": [1, 2, 4]}  # Notice difference
    
    # If this fails, Pytest highlights the exact differing list element (3 vs 4)
    assert actual == expected
```

---

## 2. Test Parametrization (`@pytest.mark.parametrize`)

Testing edge cases across multiple input permutations previously required repetitive test functions or loops that aborted on the first failure.

The `@pytest.mark.parametrize` decorator executes a single test function multiple times across a matrix of inputs, reporting each permutation as an independent test:

```python
import pytest

def calculate_discount(price: float, membership_tier: str) -> float:
    discounts = {"STANDARD": 0.0, "SILVER": 0.10, "GOLD": 0.20, "PLATINUM": 0.30}
    if membership_tier not in discounts:
        raise ValueError("Invalid tier")
    return price * (1.0 - discounts[membership_tier])

# Executes as 4 distinct tests in the Pytest test runner
@pytest.mark.parametrize("price, tier, expected_final_price", [
    (100.0, "STANDARD", 100.0),
    (100.0, "SILVER", 90.0),
    (100.0, "GOLD", 80.0),
    (200.0, "PLATINUM", 140.0),
])
def test_discount_tiers(price: float, tier: str, expected_final_price: float) -> None:
    assert calculate_discount(price, tier) == pytest.approx(expected_final_price)
```

---

## 3. Dependency Injection with Fixtures (`@pytest.fixture`)

Pytest fixtures replace verbose `setUp()` and `tearDown()` methods with a modular **Dependency Injection** model. Tests declare their dependencies by naming fixture functions in their parameter lists:

```
                         Pytest Fixture Dependency Graph
                                        │
           ┌────────────────────────────┴────────────────────────────┐
           ▼                                                         ▼
     session_scope                                             module_scope
  database_connection                                       api_client_session
           │                                                         │
           └────────────────────────────┬────────────────────────────┘
                                        ▼
                                  function_scope
                                fresh_user_record
                                        │
                                        ▼
                             def test_profile(fresh_user_record):
```

### Fixture Scopes & Clean Teardown via `yield`
Fixtures define their lifecycle through the `scope` parameter (`function`, `class`, `module`, `package`, `session`). A fixture uses `yield` to separate setup from teardown:

```python
import pytest
import sqlite3
from typing import Generator

# Scoped to the entire test module (runs once per test file)
@pytest.fixture(scope="module")
def memory_db() -> Generator[sqlite3.Connection, None, None]:
    # Setup Phase
    print("\n[FIXTURE SETUP] Initializing SQLite in-memory database...")
    conn = sqlite3.connect(":memory:")
    cursor = conn.cursor()
    cursor.execute("CREATE TABLE users (id INT PRIMARY KEY, name TEXT)")
    conn.commit()

    yield conn  # Yields database connection to requesting tests

    # Teardown Phase (Guaranteed execution after module tests finish)
    print("\n[FIXTURE TEARDOWN] Closing database connection...")
    conn.close()

# Function-scoped fixture (runs before each individual test)
@pytest.fixture(scope="function")
def seed_user(memory_db: sqlite3.Connection) -> int:
    cursor = memory_db.cursor()
    cursor.execute("INSERT INTO users VALUES (1, 'Ada Lovelace')")
    memory_db.commit()
    
    yield 1
    
    # Cleanup individual row
    cursor.execute("DELETE FROM users WHERE id = 1")
    memory_db.commit()

def test_user_lookup(memory_db: sqlite3.Connection, seed_user: int):
    cursor = memory_db.cursor()
    cursor.execute("SELECT name FROM users WHERE id = ?", (seed_user,))
    row = cursor.fetchone()
    assert row[0] == "Ada Lovelace"
```

---

## 4. Exception Assertions with `pytest.raises`

Pytest captures expected exceptions using `pytest.raises()` as a context manager, allowing inspection of error messages and attributes:

```python
def test_invalid_membership_tier():
    with pytest.raises(ValueError) as exc_info:
        calculate_discount(100.0, "UNKNOWN_TIER")

    # Verify the exact error message
    assert "Invalid tier" in str(exc_info.value)
```

---

## 5. Sharing Fixtures Globally with `conftest.py`

When fixtures are defined in a file named `conftest.py` in the root of your test directory, Pytest makes them globally available to all test files in that directory and its subdirectories **without needing to import them explicitly**.

---

## 6. Architectural Summary Table

| Feature | `unittest` | `pytest` |
| :--- | :--- | :--- |
| **Test Structure** | Must subclass `unittest.TestCase` | Plain standalone functions (`test_*`) |
| **Assertions** | Verbose methods (`self.assertEqual`) | Native Python `assert` with AST rewriting |
| **Fixtures** | Rigid `setUp()` / `tearDown()` | Modular dependency-injected `@pytest.fixture` |
| **Teardown** | Handled in `tearDown()` | Handled via `yield` inside fixture |
| **Parametrization** | Requires external libraries | Native `@pytest.mark.parametrize` |
| **Global Sharing** | Manual base test classes | Automatic via `conftest.py` |

---

# Multiple Choice Questions

### 1.
How does Pytest provide detailed error diagnostics when a native Python `assert a == b` statement fails?
A. By compiling Python to native C++ binaries.
B. Through AST (Abstract Syntax Tree) rewriting at module import time, replacing standard assertion bytecodes with introspection hooks.
C. By reading error logs from the operating system kernel.
D. By converting assertions into HTTP requests.

**Answer:** B

**Explanation:** Pytest intercepts test module loading and rewrites the Abstract Syntax Tree (AST) for `assert` statements, enabling rich value introspection and visual diffs on failure.

---

### 2.
What is the default execution scope of a `@pytest.fixture` if no `scope` argument is specified?
A. `session`
B. `module`
C. `function` (re-executed before every individual test function)
D. `class`

**Answer:** C

**Explanation:** By default, Pytest fixtures are scoped to `"function"`, ensuring that a fresh fixture instance is provided to each test to prevent cross-test contamination.

---

### 3.
How is teardown/cleanup logic implemented inside a Pytest fixture?
A. By writing a method named `clean()` inside the test class.
B. By placing cleanup code after a `yield` statement inside the fixture function.
C. By registering an `atexit` hook.
D. Pytest does not support fixture cleanup.

**Answer:** B

**Explanation:** Pytest fixture functions use `yield` to return the resource. Any statements following the `yield` execute as teardown code when the fixture's scope ends.

---

### 4.
What is the purpose of the `conftest.py` file in a Pytest project?
A. It holds database credentials for production servers.
B. It defines reusable fixtures, hooks, and plugins that are automatically shared across all test files in its directory tree without explicit imports.
C. It compiles C extensions.
D. It configures the Python virtual environment.

**Answer:** B

**Explanation:** Pytest treats `conftest.py` as a per-directory local plugin, making its fixtures and configuration hooks automatically available across all surrounding test modules.

---

### 5.
Which decorator allows running a single test function across multiple different test cases and expected outcomes?
A. `@pytest.mark.repeat`
B. `@pytest.mark.parametrize`
C. `@pytest.fixture(multi=True)`
D. `@pytest.mark.matrix`

**Answer:** B

**Explanation:** `@pytest.mark.parametrize("args", [data])` unpacks a sequence of test parameters, generating a distinct test execution for each parameter set.

---
