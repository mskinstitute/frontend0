# Encapsulation and Abstraction in Python

Encapsulation and Abstraction are two foundational pillars of Object-Oriented software design. Together, they protect internal object integrity, hide internal implementation complexity, and expose clean, intuitive interfaces to external consumers.

---

## 1. What is Encapsulation?

**Encapsulation** is the bundling of data (attributes) and the methods that operate on that data into a single unit (a class), while restricting direct access to internal components to prevent unintended tampering.

### Python Naming Conventions for Access Control

Unlike languages with hard `public`, `protected`, and `private` keywords, Python uses naming conventions and **name mangling**:

| Type | Convention | Meaning | Access Behavior |
| :--- | :--- | :--- | :--- |
| **Public** | `attribute` | Part of the public API | Fully accessible from anywhere |
| **Protected** | `_attribute` | Internal use only; intended for class & subclasses | Accessible, but signals "do not touch outside class" |
| **Private** | `__attribute` | Strictly private to this class | Triggers name mangling (`_ClassName__attribute`) |

```python
class BankAccount:
    def __init__(self, owner: str, initial_balance: float):
        self.owner = owner            # Public
        self._account_type = "Saving" # Protected convention
        self.__balance = initial_balance # Strictly Private (mangled)

    def get_balance(self) -> float:
        return self.__balance

acc = BankAccount("Aarav", 10000.0)
print(acc.owner)        # Aarav (Allowed)
print(acc._account_type) # Saving (Allowed, but discouraged by convention)

# Direct access to __balance triggers an AttributeError
try:
    print(acc.__balance)
except AttributeError as err:
    print(f"Blocked: {err}")

# How Python mangles the name under the hood:
print(acc._BankAccount__balance)  # 10000.0 (Accessible, demonstrating "consenting adults" philosophy)
```

> **Python's Philosophy:** Python operates on the principle of *"We are all consenting adults here"*. Name mangling is designed primarily to avoid naming collisions in subclasses, not as an impenetrable security sandbox.

---

## 2. Pythonic Properties: `@property` and Setters

In traditional OOP (like Java or C++), developers write verbose `getBalance()` and `setBalance()` methods. Python replaces this with the elegant `@property` decorator, enabling getter/setter validation while preserving clean attribute access syntax (`acc.balance = 500` instead of `acc.set_balance(500)`).

```python
class Employee:
    def __init__(self, name: str, salary: float):
        self.name = name
        self.salary = salary  # Uses the setter below!

    # 1. Getter property
    @property
    def salary(self) -> float:
        return self._salary

    # 2. Setter with input validation
    @salary.setter
    def salary(self, value: float):
        if not isinstance(value, (int, float)):
            raise TypeError("Salary must be a numeric value.")
        if value < 0:
            raise ValueError("Salary cannot be negative.")
        self._salary = float(value)

    # 3. Deleter (optional)
    @salary.deleter
    def salary(self):
        print(f"Deleting salary record for {self.name}.")
        del self._salary

emp = Employee("Meera", 75000)
print(emp.salary)  # 75000.0 (calls getter)

emp.salary = 82000  # Validated update via setter
print(emp.salary)

try:
    emp.salary = -500  # Raises ValueError: Salary cannot be negative.
except ValueError as err:
    print(f"Validation caught error: {err}")
```

---

## 3. What is Abstraction?

**Abstraction** focuses on hiding background details and displaying only essential features to the user. An end-user interacting with a smartphone screen doesn't need to understand RF transmission circuits or silicon microcode—they only interact with high-level buttons and icons.

In Python, abstraction is enforced using the `abc` (Abstract Base Classes) module:
- **`ABC`**: Base class from which abstract classes inherit.
- **`@abstractmethod`**: Decorator indicating methods that *must* be implemented by any concrete subclass.

```python
from abc import ABC, abstractmethod

# Abstract Base Class definition
class DatabaseConnector(ABC):
    @abstractmethod
    def connect(self):
        """Establish connection to data store."""
        pass

    @abstractmethod
    def execute_query(self, query: str):
        """Execute a query string and return results."""
        pass

    @abstractmethod
    def disconnect(self):
        """Cleanly terminate connection."""
        pass


# Attempting to instantiate an abstract class directly fails:
try:
    db = DatabaseConnector()
except TypeError as err:
    print(f"Direct instantiation blocked: {err}")
```

---

## 4. Implementing Concrete Subclasses

Any subclass that fails to implement *all* abstract methods cannot be instantiated:

```python
class PostgreSQLConnector(DatabaseConnector):
    def connect(self):
        print("Connected to PostgreSQL on port 5432.")

    def execute_query(self, query: str):
        print(f"Executing SQL: '{query}' on Postgres engine.")
        return [{"id": 1, "status": "active"}]

    def disconnect(self):
        print("PostgreSQL connection terminated.")

# Concrete class instantiated successfully
pg = PostgreSQLConnector()
pg.connect()
data = pg.execute_query("SELECT * FROM users;")
pg.disconnect()
```

---

# Multiple Choice Questions

### 1. What happens when an attribute name begins with two leading underscores (e.g. `__secret`)?
A. Python makes the attribute read-only in memory
B. Python automatically performs name mangling, changing its internal name to `_ClassName__secret`
C. Python encrypts the value using SHA-256
D. The attribute can only be accessed via an external C extension
**Answer:** B
**Explanation:** Double-underscore prefixes trigger name mangling, prepending `_ClassName` to the attribute to protect against accidental overrides in subclasses.
---

### 2. Which decorator is used to turn a method into a read-only getter attribute?
A. `@getter`
B. `@classmethod`
C. `@property`
D. `@abstractmethod`
**Answer:** C
**Explanation:** The `@property` decorator exposes a method as a readable attribute without needing parentheses when called.
---

### 3. What error is raised when attempting to instantiate an abstract class that has unimplemented `@abstractmethod`s?
A. `NotImplementedError`
B. `AttributeError`
C. `TypeError`
D. `InstantiationError`
**Answer:** C
**Explanation:** Python raises a `TypeError: Can't instantiate abstract class ... with abstract method ...` when trying to instantiate an incomplete abstract class.
---

### 4. What is the primary convention of a single leading underscore (e.g. `_internal_var`)?
A. It indicates private variables enforced by the Python bytecode compiler
B. It is an advisory naming convention indicating internal use, signaling other programmers not to access it directly
C. It denotes a global variable
D. It deletes the variable automatically after the function returns
**Answer:** B
**Explanation:** A single leading underscore is a conventional hint to programmers that the variable is intended for internal implementation, but Python does not technically restrict access.
---

### 5. From which standard library module are `ABC` and `@abstractmethod` imported?
A. `abstract`
B. `typing`
C. `abc`
D. `sys`
**Answer:** C
**Explanation:** The standard Python module for abstract base classes is `abc` (Abstract Base Classes).
---
