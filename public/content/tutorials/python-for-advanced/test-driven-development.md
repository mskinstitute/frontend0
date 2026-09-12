# Test-Driven Development (TDD) & Code Quality

Test-Driven Development (TDD) is an established software engineering discipline where tests are written **before** the implementation code. Formulated by Kent Beck, TDD transforms automated tests from an afterthought into a design tool that enforces loose coupling, modularity, and high code quality.

---

## 1. The Red-Green-Refactor Cycle

The core methodology of TDD operates in a tight, iterative three-stage loop:

```
                            The TDD Feedback Loop
                                      │
            ┌─────────────────────────┴─────────────────────────┐
            ▼                                                   │
        1. RED                                                  │
   Write a small test for a requirement                         │
   that currently fails or doesn't compile.                     │
            │                                                   │
            ▼                                                   │
        2. GREEN                                                │
   Write the MINIMAL implementation                             │
   code required to make the test pass.                         │
            │                                                   │
            ▼                                                   │
       3. REFACTOR ─────────────────────────────────────────────┘
   Improve architecture, remove duplication,
   and clean up code while tests remain green.
```

1. **RED**: Write a failing test verifying a single business rule. Run the test and observe it fail.
2. **GREEN**: Implement the simplest, most direct code to make the test pass (even hardcoding values if appropriate initially).
3. **REFACTOR**: Restructure the code, remove duplication, and enhance readability while verifying that all tests continue to pass.

---

## 2. Practical TDD Walkthrough: Building a Token Bucket Rate Limiter

Let's build a production **Token Bucket Rate Limiter** using the TDD cycle.

### Iteration 1: Rejecting requests when bucket is empty
- **Step 1 (RED)**: We write a test expecting an empty bucket to reject an acquisition.

```python
import time
import pytest

# The Test (Written First)
def test_rate_limiter_rejects_when_tokens_exhausted():
    # Attempting to import non-existent class forces us to define it
    from rate_limiter import TokenBucketLimiter

    limiter = TokenBucketLimiter(capacity=1, refill_rate_per_sec=1.0)
    assert limiter.acquire() is True   # First token consumed
    assert limiter.acquire() is False  # Empty bucket rejects immediately
```

- **Step 2 (GREEN)**: We write the minimal code to satisfy the test.

```python
# File: rate_limiter.py
class TokenBucketLimiter:
    def __init__(self, capacity: int, refill_rate_per_sec: float) -> None:
        self.capacity = capacity
        self.tokens = float(capacity)

    def acquire(self) -> bool:
        if self.tokens >= 1.0:
            self.tokens -= 1.0
            return True
        return False
```
*Result: Test passes! (GREEN)*

---

### Iteration 2: Refilling tokens over time
- **Step 1 (RED)**: We write a test verifying that tokens refill as time elapses.

```python
def test_rate_limiter_refills_tokens_over_time():
    from rate_limiter import TokenBucketLimiter

    limiter = TokenBucketLimiter(capacity=2, refill_rate_per_sec=10.0)
    # Drain bucket
    assert limiter.acquire() is True
    assert limiter.acquire() is True
    assert limiter.acquire() is False

    # Wait 0.15s (should generate 1.5 tokens, enabling 1 acquisition)
    time.sleep(0.15)
    assert limiter.acquire() is True
```

- **Step 2 (GREEN)**: Implement timestamp-based token replenishment.

```python
import time

class TokenBucketLimiter:
    def __init__(self, capacity: int, refill_rate_per_sec: float) -> None:
        self.capacity = float(capacity)
        self.refill_rate = float(refill_rate_per_sec)
        self.tokens = self.capacity
        self.last_refill = time.perf_counter()

    def _replenish(self) -> None:
        now = time.perf_counter()
        elapsed = now - self.last_refill
        self.tokens = min(self.capacity, self.tokens + (elapsed * self.refill_rate))
        self.last_refill = now

    def acquire(self) -> bool:
        self._replenish()
        if self.tokens >= 1.0:
            self.tokens -= 1.0
            return True
        return False
```
*Result: Test passes! (GREEN)*

- **Step 3 (REFACTOR)**: Optimize math, add thread-safety with `threading.Lock`, and add type annotations without breaking the existing test suite.

---

## 3. Code Coverage Metrics: `pytest-cov`

Code coverage measures the proportion of executable statements verified by automated tests. In Python, coverage is measured using the `coverage` package or `pytest-cov`:

```bash
# Running Pytest with Line and Branch Coverage
pytest --cov=rate_limiter --cov-report=term-missing --cov-branch
```

### Line Coverage vs Branch Coverage
- **Line (Statement) Coverage**: Measures whether a line of code was touched during execution.
- **Branch Coverage**: Verifies that **both branches** of every conditional statement (`if condition: ... else: ...`) were evaluated. Branch coverage is vastly superior for identifying subtle logic flaws.

---

## 4. TDD Anti-Patterns to Avoid

| Anti-Pattern | Description | Remediation |
| :--- | :--- | :--- |
| **Testing Implementation Details** | Asserting private variables (`_internal_cache`) instead of public API behaviors. | Test public contracts; private mechanics should be free to refactor. |
| **The 100% Coverage Illusion** | Achieving high line coverage by running code without meaningful assertions. | Focus on edge cases, branch boundaries, and invariant validation. |
| **Brittle Mocks** | Mocking internal methods of the class under test. | Only mock external boundaries (network, disk, clock). |
| **Writing Tests After Code** | Writing code first and reverse-engineering tests to fit implementation bugs. | Stick strictly to the Red-Green-Refactor discipline. |

---

## 5. Architectural Summary Table

| Phase | Goal | Mindset |
| :--- | :--- | :--- |
| **RED** | Formulate a clear specification via a failing test | "What should the public interface and behavior be?" |
| **GREEN** | Make the test pass as rapidly as possible | "What is the simplest solution to verify correctness?" |
| **REFACTOR**| Clean up design and eliminate technical debt | "How can this be made cleaner while keeping tests green?" |

---

# Multiple Choice Questions

### 1.
What are the three sequential phases of the Test-Driven Development (TDD) cycle?
A. Plan, Code, Ship
B. Red (write failing test), Green (make test pass), Refactor (clean code)
C. Compile, Link, Execute
D. Mock, Patch, Assert

**Answer:** B

**Explanation:** The canonical TDD workflow is Red (write a failing test), Green (write minimal code to make it pass), and Refactor (clean up the code while keeping tests passing).

---

### 2.
Why is Branch Coverage considered more rigorous than standard Line Coverage?
A. Branch coverage requires less memory.
B. Branch coverage verifies that both `True` and `False` pathways of every conditional branch are evaluated, whereas line coverage only checks if a line was executed.
C. Branch coverage compiles tests to machine code.
D. Line coverage cannot detect syntax errors.

**Answer:** B

**Explanation:** Line coverage can be satisfied by executing just one branch of an `if` condition. Branch coverage ensures all logical decision paths (`if`, `elif`, `else`) are exercised.

---

### 3.
What is a major testing anti-pattern when writing unit tests under TDD?
A. Using fixtures to manage state.
B. Testing private internal implementation details rather than observable public behaviors.
C. Using descriptive test names.
D. Running tests in continuous integration.

**Answer:** B

**Explanation:** Testing private attributes or implementation details couples tests tightly to the code structure, making refactoring difficult without breaking tests even when behavior is unchanged.

---

### 4.
What is the primary goal of the "GREEN" phase in TDD?
A. To achieve perfect architectural perfection immediately.
B. To write the minimal code necessary to satisfy the failing test and verify correctness as quickly as possible.
C. To generate documentation for end users.
D. To deploy code to production.

**Answer:** B

**Explanation:** The Green phase focuses exclusively on making the failing test pass with the simplest code possible, deferring architectural cleanup to the Refactor phase.

---

### 5.
Which command line flag in `pytest-cov` enables evaluation of conditional branch paths?
A. `--cov-branch`
B. `--branch-mode`
C. `--verify-all`
D. `--deep-coverage`

**Answer:** A

**Explanation:** The `--cov-branch` flag instructs `coverage.py` and `pytest-cov` to measure branch coverage across all conditional statements.

---
