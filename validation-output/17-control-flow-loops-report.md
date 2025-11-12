# Python Code Validation Report - 17-control-flow-loops

**Generated:** 2025-11-12 12:10:45
**Python Version:** 3.14.0
**Container:** python-sandbox-validator

## Executive Summary

**Total Code Blocks:** 99
**Syntax Errors:** 11
**Runtime Errors:** 29
**Successful:** 59
**Success Rate:** 59.6%

❌ **VALIDATION FAILURES DETECTED**

- 11 syntax error(s) require immediate fix
- 29 runtime error(s) need review

---

## Results by File

### 01-making-decisions-with-conditionals.md
- **Total Blocks:** 23
- **Errors:** 8
- **Status:** ❌ FAIL (8 error(s))

**Error Details:**

- `01-making-decisions-with-conditionals.md:174` (block 2)
  - **SYNTAX**: expected an indented block after 'if' statement on line 1

- `01-making-decisions-with-conditionals.md:234` (block 5)
  - **SYNTAX**: expected an indented block after 'if' statement on line 1

- `01-making-decisions-with-conditionals.md:289` (block 8)
  - **SYNTAX**: expected an indented block after 'if' statement on line 1

- `01-making-decisions-with-conditionals.md:509` (block 13)
  - **SYNTAX**: expected an indented block after 'if' statement on line 3

- `01-making-decisions-with-conditionals.md:522` (block 14)
  - **RUNTIME**: NameError: name 'age' is not defined

- `01-making-decisions-with-conditionals.md:580` (block 18)
  - **RUNTIME**: NameError: name 'age' is not defined

- `01-making-decisions-with-conditionals.md:596` (block 19)
  - **RUNTIME**: TypeError: '>=' not supported between instances of 'str' and 'int'

- `01-making-decisions-with-conditionals.md:644` (block 21)
  - **SYNTAX**: invalid syntax

### 02-pattern-matching-with-match-case.md
- **Total Blocks:** 20
- **Errors:** 8
- **Status:** ❌ FAIL (8 error(s))

**Error Details:**

- `02-pattern-matching-with-match-case.md:113` (block 2)
  - **SYNTAX**: invalid syntax

- `02-pattern-matching-with-match-case.md:206` (block 5)
  - **RUNTIME**: NameError: name 'choice' is not defined

- `02-pattern-matching-with-match-case.md:358` (block 9)
  - **SYNTAX**: expected ':'

- `02-pattern-matching-with-match-case.md:365` (block 10)
  - **RUNTIME**: NameError: name 'status_code' is not defined

- `02-pattern-matching-with-match-case.md:379` (block 11)
  - **RUNTIME**: SyntaxError: wildcard makes remaining patterns unreachable

- `02-pattern-matching-with-match-case.md:392` (block 12)
  - **RUNTIME**: NameError: name 'status_code' is not defined

- `02-pattern-matching-with-match-case.md:437` (block 15)
  - **RUNTIME**: NameError: name 'choice' is not defined

- `02-pattern-matching-with-match-case.md:449` (block 16)
  - **RUNTIME**: NameError: name 'choice' is not defined

### 03-repetition-with-loops.md
- **Total Blocks:** 16
- **Errors:** 4
- **Status:** ❌ FAIL (4 error(s))

**Error Details:**

- `03-repetition-with-loops.md:280` (block 6)
  - **RUNTIME**: EOFError: EOF when reading a line

- `03-repetition-with-loops.md:307` (block 7)
  - **TIMEOUT**: Execution exceeded 5 second timeout

- `03-repetition-with-loops.md:398` (block 11)
  - **TIMEOUT**: Execution exceeded 5 second timeout

- `03-repetition-with-loops.md:482` (block 15)
  - **RUNTIME**: ValueError: range() arg 3 must not be zero

### 04-controlling-loops.md
- **Total Blocks:** 23
- **Errors:** 12
- **Status:** ❌ FAIL (12 error(s))

**Error Details:**

- `04-controlling-loops.md:249` (block 4)
  - **RUNTIME**: NameError: name 'names' is not defined

- `04-controlling-loops.md:292` (block 6)
  - **RUNTIME**: NameError: name 'names' is not defined

- `04-controlling-loops.md:307` (block 7)
  - **RUNTIME**: NameError: name 'names' is not defined

- `04-controlling-loops.md:329` (block 8)
  - **RUNTIME**: EOFError: EOF when reading a line

- `04-controlling-loops.md:382` (block 9)
  - **RUNTIME**: NameError: name 'attempt' is not defined

- `04-controlling-loops.md:397` (block 10)
  - **RUNTIME**: NameError: name 'attempt' is not defined

- `04-controlling-loops.md:436` (block 11)
  - **RUNTIME**: EOFError: EOF when reading a line

- `04-controlling-loops.md:503` (block 13)
  - **RUNTIME**: SyntaxError: 'continue' not properly in loop

- `04-controlling-loops.md:549` (block 16)
  - **RUNTIME**: NameError: name 'some_condition' is not defined

- `04-controlling-loops.md:625` (block 20)
  - **SYNTAX**: invalid syntax

- `04-controlling-loops.md:656` (block 21)
  - **SYNTAX**: invalid syntax

- `04-controlling-loops.md:667` (block 22)
  - **SYNTAX**: invalid syntax

### 05-nested-control-structures.md
- **Total Blocks:** 17
- **Errors:** 8
- **Status:** ❌ FAIL (8 error(s))

**Error Details:**

- `05-nested-control-structures.md:501` (block 6)
  - **RUNTIME**: NameError: name 'items' is not defined. Did you mean: 'iter'?

- `05-nested-control-structures.md:514` (block 7)
  - **RUNTIME**: NameError: name 'items' is not defined. Did you mean: 'iter'?

- `05-nested-control-structures.md:524` (block 8)
  - **RUNTIME**: NameError: name 'do_something' is not defined

- `05-nested-control-structures.md:555` (block 9)
  - **SYNTAX**: unexpected indent

- `05-nested-control-structures.md:592` (block 12)
  - **RUNTIME**: NameError: name 'calculate' is not defined

- `05-nested-control-structures.md:600` (block 13)
  - **RUNTIME**: NameError: name 'calculate' is not defined

- `05-nested-control-structures.md:614` (block 14)
  - **TIMEOUT**: Execution exceeded 5 second timeout

- `05-nested-control-structures.md:642` (block 16)
  - **RUNTIME**: NameError: name 'items' is not defined. Did you mean: 'iter'?


---

## Recommended Actions

### High Priority (Syntax Errors)
Fix these immediately—code will not run:

- **01-making-decisions-with-conditionals.md:174** — expected an indented block after 'if' statement on line 1
- **01-making-decisions-with-conditionals.md:234** — expected an indented block after 'if' statement on line 1
- **01-making-decisions-with-conditionals.md:289** — expected an indented block after 'if' statement on line 1
- **01-making-decisions-with-conditionals.md:509** — expected an indented block after 'if' statement on line 3
- **01-making-decisions-with-conditionals.md:644** — invalid syntax
- **05-nested-control-structures.md:555** — unexpected indent
- **02-pattern-matching-with-match-case.md:113** — invalid syntax
- **02-pattern-matching-with-match-case.md:358** — expected ':'
- **04-controlling-loops.md:625** — invalid syntax
- **04-controlling-loops.md:656** — invalid syntax
- **04-controlling-loops.md:667** — invalid syntax

### Medium Priority (Runtime Errors)
Review these—syntax is valid but execution fails:

- **03-repetition-with-loops.md:280** — Review runtime behavior
- **03-repetition-with-loops.md:307** — Review runtime behavior
- **03-repetition-with-loops.md:398** — Review runtime behavior
- **03-repetition-with-loops.md:482** — Review runtime behavior
- **01-making-decisions-with-conditionals.md:522** — Review runtime behavior
- **01-making-decisions-with-conditionals.md:580** — Review runtime behavior
- **01-making-decisions-with-conditionals.md:596** — Review runtime behavior
- **05-nested-control-structures.md:501** — Review runtime behavior
- **05-nested-control-structures.md:514** — Review runtime behavior
- **05-nested-control-structures.md:524** — Review runtime behavior
- **05-nested-control-structures.md:592** — Review runtime behavior
- **05-nested-control-structures.md:600** — Review runtime behavior
- **05-nested-control-structures.md:614** — Review runtime behavior
- **05-nested-control-structures.md:642** — Review runtime behavior
- **02-pattern-matching-with-match-case.md:206** — Review runtime behavior
- **02-pattern-matching-with-match-case.md:365** — Review runtime behavior
- **02-pattern-matching-with-match-case.md:379** — Review runtime behavior
- **02-pattern-matching-with-match-case.md:392** — Review runtime behavior
- **02-pattern-matching-with-match-case.md:437** — Review runtime behavior
- **02-pattern-matching-with-match-case.md:449** — Review runtime behavior
- **04-controlling-loops.md:249** — Review runtime behavior
- **04-controlling-loops.md:292** — Review runtime behavior
- **04-controlling-loops.md:307** — Review runtime behavior
- **04-controlling-loops.md:329** — Review runtime behavior
- **04-controlling-loops.md:382** — Review runtime behavior
- **04-controlling-loops.md:397** — Review runtime behavior
- **04-controlling-loops.md:436** — Review runtime behavior
- **04-controlling-loops.md:503** — Review runtime behavior
- **04-controlling-loops.md:549** — Review runtime behavior

