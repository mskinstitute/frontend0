# Regex Patterns and Groups

Regular expressions (regex) provide a domain-specific language for string pattern matching, parsing, and data validation. In Python, the `re` module interfaces with an optimized C-level backtracking regex engine.

Beyond simple substring searches, advanced regex techniques—such as **named capturing groups**, **non-capturing groups**, **zero-width lookaround assertions**, and **verbose multi-line compiling**—allow engineers to write maintainable parsing engines for complex textual data.

---

## 1. Capturing Groups vs Non-Capturing Groups

Parentheses in regular expressions serve two distinct functions: grouping for quantification and capturing for extraction.

```
 Capturing Group: (pattern)
 ──► Matches 'pattern' AND extracts into match.groups() tuple.
 
 Non-Capturing Group: (?:pattern)
 ──► Applies quantifiers or alternation WITHOUT memory allocation in match.groups().
```

```python
import re

text = "server-us-east-prod.aws.com"

# Capturing: allocates group 1 for region and group 2 for env
cap_match = re.search(r"server-(us-\w+)-(prod|dev)", text)
if cap_match:
    print("Capturing groups:", cap_match.groups())  # ('us-east', 'prod')

# Non-Capturing (?:...): groups for alternation without capturing
non_cap_match = re.search(r"server-(?:us-\w+)-(prod|dev)", text)
if non_cap_match:
    print("Non-capturing groups:", non_cap_match.groups())  # ('prod',)
```

---

## 2. Named Capturing Groups (`?P<name>...`)

Positional groups (`group(1)`, `group(2)`) become fragile and error-prone as patterns expand. **Named Capturing Groups** assign semantic identifiers to matched substrings:

```python
import re

log_line = "2026-09-12 14:32:01 [ERROR] [auth_service] Invalid JWT credentials"

pattern = re.compile(
    r"^(?P<timestamp>\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2})\s"
    r"\[(?P<level>[A-Z]+)\]\s"
    r"\[(?P<service>\w+)\]\s"
    r"(?P<message>.*)$"
)

match = pattern.match(log_line)
if match:
    # Access by semantic name
    print(f"Timestamp: {match.group('timestamp')}")
    print(f"Level:     {match.group('level')}")
    print(f"Service:   {match.group('service')}")
    
    # Extract entire match as a structured dictionary
    parsed_dict = match.groupdict()
    print("Parsed groupdict:", parsed_dict)
```

---

## 3. Zero-Width Lookaround Assertions

Lookaround assertions match characters **without consuming them** (zero-width match). They act as conditional anchors verifying what precedes or succeeds the current character position:

| Type | Syntax | Description | Example Match |
| :--- | :--- | :--- | :--- |
| **Positive Lookahead** | `(?=abc)` | Matches if followed by `abc` | `\d+(?=px)` matches `50` in `50px` |
| **Negative Lookahead** | `(?!abc)` | Matches if NOT followed by `abc` | `\d+(?!px)` matches `50` in `50em` |
| **Positive Lookbehind**| `(?<=abc)`| Matches if preceded by `abc` | `(?<=\$)\d+` matches `100` in `$100` |
| **Negative Lookbehind**| `(?<!abc)`| Matches if NOT preceded by `abc` | `(?<!\$)\d+` matches `100` in `€100` |

```python
import re

payload = "Standard pricing: $250 base, €180 promo, 500 reward points, 100px border."

# 1. Positive Lookbehind: extract numbers preceded by a dollar sign
dollar_prices = re.findall(r"(?<=\$)\d+", payload)
print("Dollar prices:   ", dollar_prices)  # ['250']

# 2. Positive Lookahead: extract numbers followed by 'px'
pixel_dimensions = re.findall(r"\d+(?=px)", payload)
print("Pixel values:    ", pixel_dimensions)  # ['100']

# 3. Negative Lookahead: find numbers NOT followed by 'px' or ' reward'
raw_numbers = re.findall(r"\b\d+\b(?!\s*px| reward)", payload)
print("Unlabeled numbers:", raw_numbers)  # ['250', '180']
```

---

## 4. Verbose Regular Expressions with `re.VERBOSE` (`re.X`)

Complex regular expressions are notoriously difficult to read. The `re.VERBOSE` flag allows you to format patterns across multiple lines with whitespace and comments:

```python
import re

# Clean, readable, self-documenting pattern with comments
EMAIL_REGEX = re.compile(r"""
    ^                           # Start of string
    (?P<user>                   # User identifier group
        [a-zA-Z0-9_.+-]+
    )
    @                           # Literal @ symbol
    (?P<domain>                 # Domain name group
        [a-zA-Z0-9-]+
        (?:\.[a-zA-Z0-9-]+)*    # Optional subdomains (non-capturing)
    )
    \.                          # Literal dot
    (?P<tld>                    # Top-level domain
        [a-zA-Z]{2,}
    )
    $                           # End of string
""", re.VERBOSE)

email = "dev.operations@us-east.cloud.internal"
match = EMAIL_REGEX.match(email)
if match:
    print("Parsed Email Dictionary:", match.groupdict())
```

---

## 5. Architectural Summary Table

| Construct | Syntax | Purpose |
| :--- | :--- | :--- |
| **Capturing Group** | `(pattern)` | Groups and extracts matched substring into `match.group(n)` |
| **Non-Capturing Group** | `(?:pattern)` | Groups for quantifier without allocating extraction buffer |
| **Named Group** | `(?P<name>pattern)`| Extracts matched substring into `match.group('name')` |
| **Positive Lookahead** | `(?=pattern)` | Asserts that pattern follows match without consuming characters |
| **Negative Lookahead** | `(?!pattern)` | Asserts that pattern does NOT follow match |
| **Positive Lookbehind**| `(?<=pattern)` | Asserts that pattern precedes match |
| **Negative Lookbehind**| `(?<!pattern)` | Asserts that pattern does NOT precede match |

---

# Multiple Choice Questions

### 1.
What is the primary operational difference between `(abc)` and `(?:abc)` in a regular expression?
A. `(abc)` is case-insensitive, while `(?:abc)` is case-sensitive.
B. `(abc)` captures the matched substring into the group results, whereas `(?:abc)` groups the tokens for operators without storing the captured slice.
C. `(?:abc)` runs in parallel threads.
D. `(abc)` is deprecated in Python 3.

**Answer:** B

**Explanation:** `(abc)` is a capturing group that records the matched text into `match.groups()`. `(?:abc)` is a non-capturing group that provides grouping without memory overhead.

---

### 2.
How do you access the value of a named capturing group defined as `(?P<client_ip>\d+\.\d+\.\d+\.\d+)` from a match object?
A. `match.name("client_ip")`
B. `match.group("client_ip")`
C. `match.get("client_ip")`
D. `match["client_ip"]`

**Answer:** B

**Explanation:** Named groups are accessed via `match.group("client_ip")` or collected into a dictionary via `match.groupdict()`.

---

### 3.
What type of assertion is represented by `(?<=\bID:)\d+`?
A. Positive Lookahead
B. Positive Lookbehind
C. Negative Lookahead
D. Negative Lookbehind

**Answer:** B

**Explanation:** `(?<=...)` is a Positive Lookbehind assertion, confirming that the matched number is preceded by `"ID:"` without including `"ID:"` in the matched result.

---

### 4.
What does a Negative Lookahead `\d+(?!\s*dollars)` verify?
A. Matches numbers only if they are immediately followed by `"dollars"`.
B. Matches numbers only if they are NOT followed by optional whitespace and the word `"dollars"`.
C. Replaces dollars with euros.
D. Inverts all digits.

**Answer:** B

**Explanation:** `(?!...)` asserts that the enclosed pattern does not occur immediately ahead of the current position in the input string.

---

### 5.
Which compilation flag in Python's `re` module allows writing multi-line regular expressions with whitespace and embedded comments?
A. `re.MULTILINE` (`re.M`)
B. `re.DOTALL` (`re.S`)
C. `re.VERBOSE` (`re.X`)
D. `re.DEBUG`

**Answer:** C

**Explanation:** `re.VERBOSE` (or `re.X`) instructs the regex engine to ignore whitespace (except when escaped or inside character classes) and treat text following `#` as comments.

---
