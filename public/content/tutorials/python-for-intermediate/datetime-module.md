# The Datetime Module in Python

Date and time manipulation is central to backend systems, financial transaction logs, scheduling engines, and data analytics. Python's built-in **`datetime`** module provides classes for managing calendar dates, times, durations, and timezones.

---

## 1. The Core `datetime` Classes

The module is structured into four primary classes:
- **`date`**: Represents an idealized calendar date (Year, Month, Day).
- **`time`**: Represents an idealized time of day (Hour, Minute, Second, Microsecond), independent of any date.
- **`datetime`**: Combines both date and time into a single timestamp.
- **`timedelta`**: Represents a duration expressing the difference between two dates or times.

```python
from datetime import date, time, datetime, timedelta, timezone

# 1. Date instance
today = date.today()
print(f"Today: {today.year}-{today.month:02d}-{today.day:02d}")

# 2. Time instance
lunch_time = time(13, 30, 0)  # 01:30:00 PM
print(f"Lunch: {lunch_time}")

# 3. Datetime instance
now = datetime.now()
print(f"Current local timestamp: {now}")

# 4. Timezone-Aware UTC Timestamp (Python 3.11+ recommended)
utc_now = datetime.now(timezone.utc)
print(f"Current UTC timestamp: {utc_now}")
```

---

## 2. Formatting Dates with `strftime()`

The **`strftime()`** method (*String Format Time*) converts a `datetime` object into a custom formatted string according to format directives:

| Directive | Meaning | Example Output |
| :--- | :--- | :--- |
| `%Y` | 4-digit Year | `2026` |
| `%m` | 2-digit Month (01-12) | `09` |
| `%d` | 2-digit Day of Month (01-31) | `12` |
| `%H` | Hour in 24-hour clock (00-23) | `16` |
| `%I` | Hour in 12-hour clock (01-12) | `04` |
| `%M` | Minute (00-59) | `15` |
| `%S` | Second (00-59) | `30` |
| `%p` | AM / PM | `PM` |
| `%B` | Full Month Name | `September` |
| `%A` | Full Weekday Name | `Saturday` |

```python
from datetime import datetime

current = datetime.now()

# Standard formats:
print(current.strftime("%d-%m-%Y %H:%M:%S"))      # 12-09-2026 16:15:30
print(current.strftime("%A, %B %d, %Y"))          # Saturday, September 12, 2026
print(current.strftime("%I:%M %p"))                # 04:15 PM
print(current.isoformat())                        # 2026-09-12T16:15:30.123456
```

---

## 3. Parsing Strings into Dates with `strptime()`

The **`strptime()`** method (*String Parse Time*) converts text strings from files, databases, or APIs into `datetime` objects using the corresponding format string:

```python
from datetime import datetime

date_str = "2026-09-12 18:45"
parsed_dt = datetime.strptime(date_str, "%Y-%m-%d %H:%M")

print(parsed_dt)        # 2026-09-12 18:45:00
print(type(parsed_dt))  # <class 'datetime.datetime'>
print("Year:", parsed_dt.year)
```

> **Memory Trick:**
> - `strftime` -> **F**ormat to string.
> - `strptime` -> **P**arse from string.

---

## 4. Date Arithmetic with `timedelta`

`timedelta` allows calculating deadlines, age, past dates, and future intervals effortlessly:

```python
from datetime import datetime, timedelta

now = datetime.now()

# Calculate future deadline (14 days and 4 hours ahead)
trial_duration = timedelta(days=14, hours=4)
expiry_date = now + trial_duration
print(f"Subscription expires on: {expiry_date.strftime('%Y-%m-%d %H:%M')}")

# Calculating difference between two dates
epoch_event = datetime(2026, 1, 1)
elapsed = now - epoch_event
print(f"Days elapsed since New Year 2026: {elapsed.days} days")
print(f"Total seconds elapsed: {elapsed.total_seconds():,.0f} s")
```

---

## 5. Naive vs. Aware Datetime Objects

- **Naive**: Contains no timezone information. Python cannot determine what geographical timezone it belongs to.
- **Aware**: Holds timezone metadata (such as UTC, IST, or EST) via the `tzinfo` parameter, preventing ambiguity across distributed servers.

```python
from datetime import datetime, timezone, timedelta

# Create timezone offset (IST: UTC + 5:30)
ist_zone = timezone(timedelta(hours=5, minutes=30), name="IST")

# Current time in IST
ist_time = datetime.now(ist_zone)
print(f"Time in India: {ist_time}")
# Output: 2026-09-12 16:15:30.123456+05:30
```

---

# Multiple Choice Questions

### 1. Which method converts a `datetime` object into a custom formatted string?
A. `datetime.strptime()`
B. `datetime.to_string()`
C. `datetime.strftime()`
D. `datetime.parse()`
**Answer:** C
**Explanation:** `strftime()` ("String Format Time") formats a datetime object into a string representation according to specified format directives.
---

### 2. What does `strptime("25/12/2026", "%d/%m/%Y")` produce?
A. A string `"25-12-2026"`
B. A `datetime` object representing December 25, 2026
C. A timestamp integer
D. A syntax error
**Answer:** B
**Explanation:** `strptime()` parses a string into a Python `datetime` object according to the directive tokens provided.
---

### 3. Which class represents the elapsed duration or difference between two datetime instances?
A. `datetime.duration`
B. `datetime.timedelta`
C. `datetime.timespan`
D. `datetime.interval`
**Answer:** B
**Explanation:** `timedelta` represents differences between two dates or times, supporting arithmetic operations like addition and subtraction.
---

### 4. What is the difference between a "naive" and an "aware" datetime object in Python?
A. Naive objects have microsecond precision, while aware objects do not
B. Aware objects contain explicit timezone offset information (`tzinfo`), whereas naive objects do not
C. Naive objects are deprecated in Python 3
D. Aware objects can only be created on Linux
**Answer:** B
**Explanation:** An aware datetime has an associated `tzinfo` indicating its geographical timezone offset; naive datetimes lack timezone context.
---

### 5. What directive in `strftime()` represents the 4-digit year?
A. `%y`
B. `%Y`
C. `%YEAR`
D. `%d`
**Answer:** B
**Explanation:** `%Y` outputs the 4-digit year (e.g. 2026), whereas lowercase `%y` outputs the 2-digit year (e.g. 26).
---
