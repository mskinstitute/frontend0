# Context Managers with `__enter__` and `__exit__`

Context managers are Python's standard mechanism for deterministic resource acquisition and release. Formalized in PEP 343, the `with` statement guarantees that critical cleanup logic—such as releasing database connection locks, closing file descriptors, rolling back failed database transactions, or restoring system environments—executes reliably, even in the event of unexpected runtime exceptions.

---

## 1. The Context Management Protocol

A class qualifies as a context manager by implementing two dunder methods:
- `__enter__(self)`: Prepares the runtime environment and optionally returns a resource bound to the `as <variable>` target.
- `__exit__(self, exc_type, exc_val, exc_tb)`: Tears down the resource. Receives exception details if an error occurred inside the `with` block.

```
                         Execute: with ContextManager() as target:
                                             │
                                             ▼
                             manager = ContextManager()
                             target = manager.__enter__()
                                             │
                                             ▼
                                  Execute with-block body
                                             │
                       ┌─────────────────────┴─────────────────────┐
                       ▼                                           ▼
             Block Completed Cleanly                     Exception Occurred
                       │                                           │
                       ▼                                           ▼
          manager.__exit__(None, None, None)          manager.__exit__(exc_type, exc_val, tb)
                       │                                           │
                       │                              Did __exit__ return True?
                       │                               ┌───────────┴───────────┐
                       │                              YES                      NO
                       │                               │                       │
                       │                               ▼                       ▼
                       │                       Exception Suppressed    Exception Re-raised
                       │                               │                       │
                       └───────────────────────────────┴───────────────────────┘
                                                       │
                                                       ▼
                                         Continue script execution
```

---

## 2. Anatomy of the `__exit__` Signature

The `__exit__` method accepts four arguments:
1. `self`: The context manager instance.
2. `exc_type`: The exception class (e.g., `ValueError`) if an exception was raised inside the block; otherwise `None`.
3. `exc_val`: The exception instance/message (e.g., `ValueError("invalid")`); otherwise `None`.
4. `exc_tb`: The traceback object; otherwise `None`.

### Exception Suppression Semantics
> **Critical Rule:** If `__exit__` returns `True`, Python **swallows (suppresses)** the exception, allowing program execution to resume normally after the `with` block. If `__exit__` returns `False`, `None`, or anything falsy, Python **re-raises** the exception up the call stack.

```python
from typing import Optional, Type
from types import TracebackType

class SafeIgnorer:
    """A context manager that suppresses specified exception types."""

    def __init__(self, *exceptions_to_ignore: Type[BaseException]) -> None:
        self.exceptions_to_ignore = exceptions_to_ignore

    def __enter__(self) -> "SafeIgnorer":
        return self

    def __exit__(
        self,
        exc_type: Optional[Type[BaseException]],
        exc_val: Optional[BaseException],
        exc_tb: Optional[TracebackType]
    ) -> bool:
        if exc_type is not None and issubclass(exc_type, self.exceptions_to_ignore):
            print(f"[LOG] Suppressed expected exception: {exc_val}")
            return True  # Suppress the exception
        return False  # Let all other exceptions propagate

# Testing suppression
with SafeIgnorer(ZeroDivisionError, FileNotFoundError):
    result = 10 / 0
    print("This line will not run.")

print("Execution safely resumed after handled ZeroDivisionError!")
```

---

## 3. The `as` Target Nuance

The variable following the `as` keyword is bound to the **return value of `__enter__()`**, which is not necessarily `self`.

```python
class ConnectionPool:
    def __enter__(self) -> str:
        # Returns an active connection token, not the pool object itself
        print("Acquiring connection from pool...")
        return "DATABASE_CONNECTION_HANDLE_#42"

    def __exit__(self, exc_type, exc_val, exc_tb) -> None:
        print("Releasing connection back to pool...")

with ConnectionPool() as conn:
    print(f"Executing query with handle: {conn}")
    # conn is the string handle, not the ConnectionPool instance!
```

---

## 4. Production Example: Atomic Database Transaction

In relational databases or transactional file systems, all operations within a block must either commit completely or roll back entirely upon failure:

```python
class MockDatabase:
    def __init__(self) -> None:
        self.data: dict[str, int] = {"user_balance": 1000}
        self._backup: dict[str, int] = {}

    def commit(self) -> None:
        print("[DB] Transaction committed successfully.")

    def rollback(self) -> None:
        self.data = self._backup.copy()
        print("[DB] Transaction rolled back to original state.")

class AtomicTransaction:
    """Manages an atomic transaction scope with rollback capabilities."""

    def __init__(self, db: MockDatabase) -> None:
        self.db = db

    def __enter__(self) -> MockDatabase:
        # Take a snapshot of database state before modifications begin
        self.db._backup = self.db.data.copy()
        print("[DB] Transaction started. Snapshot taken.")
        return self.db

    def __exit__(self, exc_type, exc_val, exc_tb) -> bool:
        if exc_type is not None:
            print(f"[DB] Error encountered ({exc_val}). Rolling back...")
            self.db.rollback()
            return False  # Re-raise error to alert caller
        else:
            self.db.commit()
            return True

# Scenario A: Successful atomic operation
db = MockDatabase()
print(f"Starting Balance: {db.data['user_balance']}")

with AtomicTransaction(db) as active_db:
    active_db.data["user_balance"] -= 200

print(f"Committed Balance: {db.data['user_balance']}\n")

# Scenario B: Failed transaction triggering rollback
try:
    with AtomicTransaction(db) as active_db:
        active_db.data["user_balance"] -= 500
        raise RuntimeError("Payment gateway network failure!")
except RuntimeError as err:
    print(f"Caught caller exception: {err}")

print(f"Balance after rollback: {db.data['user_balance']}")
```

---

## 5. Compound Context Managers

Python supports multiple context managers within a single `with` statement separated by commas. They are entered from left to right and exited in reverse order (right to left):

```python
# Multiple context managers entered sequentially
with open("source.txt", "w") as src, open("dest.txt", "w") as dst:
    src.write("Initial data")
    dst.write("Copied data")
```

---

## 6. Summary Comparison

| Aspect | `__enter__` | `__exit__` |
| :--- | :--- | :--- |
| **Trigger** | Start of `with` block | End of `with` block (normal or exceptional) |
| **Arguments** | `self` | `self, exc_type, exc_val, exc_tb` |
| **Return Value Role** | Bound to variable after `as` | `True` suppresses exception; `False`/`None` re-raises |
| **Primary Use** | Setup, lock acquisition, initialization | Teardown, lock release, resource cleanup |

---

# Multiple Choice Questions

### 1.
What four arguments are passed to the `__exit__` method by the Python runtime when a `with` block exits?
A. `self`, `result`, `args`, `kwargs`
B. `self`, `exc_type`, `exc_val`, `exc_tb`
C. `self`, `status_code`, `message`, `stack`
D. `self`, `start_time`, `end_time`, `duration`

**Answer:** B

**Explanation:** Python passes `self` along with the exception type (`exc_type`), exception value (`exc_val`), and traceback object (`exc_tb`). If no exception occurred, all three are `None`.

---

### 2.
What must `__exit__` return in order to suppress an exception raised within the `with` block?
A. `None`
B. `False`
C. `True`
D. The exception instance itself

**Answer:** C

**Explanation:** Returning `True` (or any truthy value) from `__exit__` informs the Python interpreter that the exception has been handled and should be suppressed instead of propagating upward.

---

### 3.
In the statement `with Resource() as target:`, what value is bound to the variable `target`?
A. Always the `Resource()` instance itself
B. The boolean status of whether the context opened successfully
C. The return value of `Resource().__enter__()`
D. A tuple containing `(Resource(), __exit__)`

**Answer:** C

**Explanation:** The target variable following the `as` keyword receives whatever value is explicitly returned by the `__enter__()` method.

---

### 4.
When multiple context managers are combined in a single statement, e.g. `with ContextA() as a, ContextB() as b:`, in what order are their `__exit__` methods invoked?
A. `ContextA.__exit__` first, then `ContextB.__exit__`
B. `ContextB.__exit__` first, then `ContextA.__exit__` (LIFO / reverse order)
C. Simultaneously in parallel threads
D. Only the last manager's `__exit__` is called

**Answer:** B

**Explanation:** Python treats compound `with` statements as nested contexts: entering left-to-right (`ContextA` then `ContextB`), and exiting right-to-left in reverse LIFO order (`ContextB` then `ContextA`).

---

### 5.
If an unhandled exception occurs inside `__enter__`, what happens to `__exit__`?
A. `__exit__` is called immediately with the exception details.
B. `__exit__` is NOT called, because the context was never successfully entered.
C. `__exit__` is called with `None, None, None`.
D. Python crashes with a segmentation fault.

**Answer:** B

**Explanation:** If `__enter__` fails or raises an exception, the context was never established, so the corresponding `__exit__` method is not invoked.

---
