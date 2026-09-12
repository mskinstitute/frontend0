# Creating Classes & Objects (Review & Deep Dive)

Object-Oriented Programming (OOP) is a programming paradigm based on the concept of **objects**, which bundle state (attributes/data) and behavior (methods/functions) together. In Python, everything is an object—from simple integers and strings to complex modules and custom classes.

---

## 1. Classes vs. Instances

A **class** serves as a blueprint or schema defining the attributes and operations that instances will possess. An **instance** (or object) is a concrete manifestation created in memory based on that blueprint.

```python
class Developer:
    """Blueprint for a software developer profile."""
    pass

# Creating two distinct instances in memory
dev_a = Developer()
dev_b = Developer()

print(dev_a)  # <__main__.Developer object at 0x7f8...>
print(dev_a == dev_b)  # False (different memory addresses)
```

---

## 2. The `__init__` Constructor and `self`

The `__init__` method is Python's initialization hook called immediately after an instance is created in memory:
- **`self`**: A reference to the specific instance currently being initialized or manipulated. Python automatically passes the instance as the first argument when calling instance methods.

```python
class Developer:
    def __init__(self, name: str, primary_language: str, years_exp: int):
        # Instance attributes bound to this specific object
        self.name = name
        self.primary_language = primary_language
        self.years_exp = years_exp
        
    def describe(self) -> str:
        return f"{self.name} specializes in {self.primary_language} with {self.years_exp} years of experience."

dev = Developer("Vikram", "Python", 4)
print(dev.describe())
# dev.describe() is syntactic sugar for: Developer.describe(dev)
```

---

## 3. Instance Attributes vs. Class Attributes

Understanding the distinction between class-level and instance-level attributes is critical to avoiding state bugs:

- **Instance Attributes**: Bound to `self`. Each instance maintains its own distinct copy in its `__dict__`.
- **Class Attributes**: Defined directly inside the class body, shared across *all* instances of that class.

```python
class Student:
    # Class attribute (shared by all instances)
    institution = "MSK Institute of Technology"
    student_count = 0
    
    def __init__(self, name, roll_no):
        # Instance attributes (unique to each student)
        self.name = name
        self.roll_no = roll_no
        
        # Incrementing the shared class counter
        Student.student_count += 1

s1 = Student("Aarav", 101)
s2 = Student("Ananya", 102)

print(s1.institution)  # MSK Institute of Technology
print(s2.institution)  # MSK Institute of Technology
print(Student.student_count)  # 2
```

> **The Mutable Class Attribute Trap:**
> Never define mutable defaults (like lists or dictionaries) as class attributes if they are meant to be per-instance!
> ```python
> class Team:
>     members = []  # BAD: Shared across all Team instances!
>     
> class CorrectTeam:
>     def __init__(self):
>         self.members = []  # GOOD: Each team has its own list
> ```

---

## 4. Instance, Class, and Static Methods

Python provides three distinct method types using decorators:

| Method Type | Decorator | First Argument | Typical Use Case |
| :--- | :--- | :--- | :--- |
| **Instance Method** | *(None)* | `self` | Manipulates individual instance state |
| **Class Method** | `@classmethod` | `cls` | Factory methods, modifying class-level state |
| **Static Method** | `@staticmethod` | *(None)* | Self-contained utility functions logically grouped in the class |

```python
class Temperature:
    def __init__(self, celsius: float):
        self.celsius = celsius

    # 1. Instance Method
    def to_fahrenheit(self) -> float:
        return (self.celsius * 9/5) + 32

    # 2. Class Method (Alternative Constructor / Factory)
    @classmethod
    def from_fahrenheit(cls, fahrenheit: float):
        celsius = (fahrenheit - 32) * 5/9
        return cls(celsius)

    # 3. Static Method (Pure utility)
    @staticmethod
    def is_freezing(celsius: float) -> bool:
        return celsius <= 0.0

# Using Instance Method
t1 = Temperature(25)
print(f"25°C in F: {t1.to_fahrenheit()}°F")

# Using Class Method Factory
t2 = Temperature.from_fahrenheit(98.6)
print(f"98.6°F in C: {t2.celsius:.1f}°C")

# Using Static Method
print(f"Is -5°C freezing? {Temperature.is_freezing(-5)}")
```

---

## 5. String Representations: `__str__` vs `__repr__`

Every Python class should define informative string representations:

- **`__str__`**: User-friendly, readable string representation (returned by `print(obj)` or `str(obj)`).
- **`__repr__`**: Unambiguous, developer-oriented string used for debugging (returned by typing `obj` in interactive shell or `repr(obj)`). Ideally should look like valid Python code to recreate the object.

```python
class Book:
    def __init__(self, title, author, isbn):
        self.title = title
        self.author = author
        self.isbn = isbn

    def __str__(self):
        return f"'{self.title}' by {self.author}"

    def __repr__(self):
        return f"Book(title='{self.title}', author='{self.author}', isbn='{self.isbn}')"

book = Book("Fluent Python", "Luciano Ramalho", "978-1491946008")
print(str(book))   # 'Fluent Python' by Luciano Ramalho
print(repr(book))  # Book(title='Fluent Python', author='Luciano Ramalho', isbn='978-1491946008')
```

---

# Multiple Choice Questions

### 1. What does the `self` parameter in a Python instance method represent?
A. The class type that spawned the method
B. A pointer to the global Python execution namespace
C. The specific instance on which the method was invoked
D. A copy of Python's garbage collection registry
**Answer:** C
**Explanation:** When invoking an instance method like `obj.method()`, Python passes the instance `obj` automatically as the first parameter `self`.
---

### 2. What happens if you define a mutable list as a class attribute and append items to it from an instance?
A. Python throws an `AttributeError`
B. The list is cloned exclusively for that instance
C. The list is modified for all instances sharing that class
D. The list converts automatically into an immutable tuple
**Answer:** C
**Explanation:** Class attributes are shared across all instances. Modifying a mutable class attribute affects every instance that references it.
---

### 3. Which decorator allows defining an alternative factory constructor that receives the class itself as `cls`?
A. `@property`
B. `@classmethod`
C. `@staticmethod`
D. `@factory`
**Answer:** B
**Explanation:** `@classmethod` passes the class object as its first argument (usually named `cls`), allowing the method to construct and return new instances of that class or its subclasses.
---

### 4. How does `@staticmethod` differ from regular instance methods and class methods?
A. It cannot be called without first creating an instance
B. It automatically runs in a background thread
C. It does not receive an implicit first argument (`self` or `cls`)
D. It can only return integer values
**Answer:** C
**Explanation:** A `@staticmethod` is a plain function bound into a class's namespace without receiving automatic `self` or `cls` references.
---

### 5. What is the standard purpose of the `__repr__` special method in Python?
A. To print formatted HTML documents for web browsers
B. To provide an unambiguous, developer-focused string representation of the object
C. To serialize the object to binary byte streams
D. To validate user permissions before accessing attributes
**Answer:** B
**Explanation:** `__repr__` is intended for developers and debugging, providing an explicit, unambiguous representation of the object state.
---
