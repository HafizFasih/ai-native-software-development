# Python Code Validation Report - 18-lists-tuples-dictionary

**Generated:** 2025-11-12 12:22:55
**Python Version:** 3.14.0
**Container:** python-sandbox-validator

## Executive Summary

**Total Code Blocks:** 196
**Syntax Errors:** 5
**Runtime Errors:** 17
**Successful:** 174
**Success Rate:** 88.8%

❌ **VALIDATION FAILURES DETECTED**

- 5 syntax error(s) require immediate fix
- 17 runtime error(s) need review

---

## Results by File

### 01-introduction-to-collections.md
- **Total Blocks:** 13
- **Errors:** 1
- **Status:** ❌ FAIL (1 error(s))

**Error Details:**

- `01-introduction-to-collections.md:208` (block 5)
  - **RUNTIME**: TypeError: 'tuple' object does not support item assignment

### 02-lists-creation-and-basics.md
- **Total Blocks:** 15
- **Errors:** 1
- **Status:** ❌ FAIL (1 error(s))

**Error Details:**

- `02-lists-creation-and-basics.md:462` (block 14)
  - **SYNTAX**: invalid syntax

### 03-lists-mutability-and-modification.md
- **Total Blocks:** 27
- **Errors:** 4
- **Status:** ❌ FAIL (4 error(s))

**Error Details:**

- `03-lists-mutability-and-modification.md:230` (block 9)
  - **RUNTIME**: ValueError: list.remove(x): x not in list

- `03-lists-mutability-and-modification.md:287` (block 14)
  - **RUNTIME**: IndexError: pop from empty list

- `03-lists-mutability-and-modification.md:420` (block 23)
  - **RUNTIME**: IndexError: pop index out of range

- `03-lists-mutability-and-modification.md:426` (block 24)
  - **RUNTIME**: IndexError: pop from empty list

### 04-lists-sorting-and-advanced-methods.md
- **Total Blocks:** 14
- **Errors:** 2
- **Status:** ❌ FAIL (2 error(s))

**Error Details:**

- `04-lists-sorting-and-advanced-methods.md:198` (block 5)
  - **RUNTIME**: ValueError: list.index(x): x not in list

- `04-lists-sorting-and-advanced-methods.md:435` (block 12)
  - **RUNTIME**: ValueError: list.index(x): x not in list

### 05-list-comprehensions.md
- **Total Blocks:** 14
- **Errors:** 2
- **Status:** ❌ FAIL (2 error(s))

**Error Details:**

- `05-list-comprehensions.md:384` (block 12)
  - **SYNTAX**: invalid syntax

- `05-list-comprehensions.md:389` (block 13)
  - **SYNTAX**: invalid syntax

### 06-tuples-immutable-sequences.md
- **Total Blocks:** 16
- **Errors:** 2
- **Status:** ❌ FAIL (2 error(s))

**Error Details:**

- `06-tuples-immutable-sequences.md:99` (block 1)
  - **RUNTIME**: TypeError: 'tuple' object does not support item assignment

- `06-tuples-immutable-sequences.md:298` (block 12)
  - **RUNTIME**: TypeError: cannot use 'list' as a dict key (unhashable type: 'list')

### 07-dicts-key-value-basics.md
- **Total Blocks:** 15
- **Errors:** 2
- **Status:** ❌ FAIL (2 error(s))

**Error Details:**

- `07-dicts-key-value-basics.md:229` (block 6)
  - **RUNTIME**: KeyError: 'gpa'

- `07-dicts-key-value-basics.md:404` (block 11)
  - **RUNTIME**: KeyError: 'title'

### 08-dicts-crud-operations.md
- **Total Blocks:** 26
- **Errors:** 1
- **Status:** ❌ FAIL (1 error(s))

**Error Details:**

- `08-dicts-crud-operations.md:270` (block 7)
  - **RUNTIME**: KeyError: 'bananas'

### 09-dicts-iteration-and-comprehensions.md
- **Total Blocks:** 22
- **Errors:** 1
- **Status:** ❌ FAIL (1 error(s))

**Error Details:**

- `09-dicts-iteration-and-comprehensions.md:627` (block 20)
  - **RUNTIME**: NameError: name 'temps' is not defined

### 10-choosing-the-right-structure.md
- **Total Blocks:** 21
- **Errors:** 2
- **Status:** ❌ FAIL (2 error(s))

**Error Details:**

- `10-choosing-the-right-structure.md:103` (block 1)
  - **RUNTIME**: TypeError: 'tuple' object does not support item assignment

- `10-choosing-the-right-structure.md:598` (block 20)
  - **SYNTAX**: invalid syntax

### 11-capstone-data-processing-pipeline.md
- **Total Blocks:** 13
- **Errors:** 4
- **Status:** ❌ FAIL (4 error(s))

**Error Details:**

- `11-capstone-data-processing-pipeline.md:384` (block 7)
  - **RUNTIME**: NameError: name 'stats' is not defined

- `11-capstone-data-processing-pipeline.md:570` (block 9)
  - **SYNTAX**: unexpected indent

- `11-capstone-data-processing-pipeline.md:595` (block 10)
  - **RUNTIME**: NameError: name 'students' is not defined

- `11-capstone-data-processing-pipeline.md:634` (block 12)
  - **RUNTIME**: NameError: name 'students' is not defined


---

## Recommended Actions

### High Priority (Syntax Errors)
Fix these immediately—code will not run:

- **02-lists-creation-and-basics.md:462** — invalid syntax
- **11-capstone-data-processing-pipeline.md:570** — unexpected indent
- **10-choosing-the-right-structure.md:598** — invalid syntax
- **05-list-comprehensions.md:384** — invalid syntax
- **05-list-comprehensions.md:389** — invalid syntax

### Medium Priority (Runtime Errors)
Review these—syntax is valid but execution fails:

- **03-lists-mutability-and-modification.md:230** — Review runtime behavior
- **03-lists-mutability-and-modification.md:287** — Review runtime behavior
- **03-lists-mutability-and-modification.md:420** — Review runtime behavior
- **03-lists-mutability-and-modification.md:426** — Review runtime behavior
- **04-lists-sorting-and-advanced-methods.md:198** — Review runtime behavior
- **04-lists-sorting-and-advanced-methods.md:435** — Review runtime behavior
- **07-dicts-key-value-basics.md:229** — Review runtime behavior
- **07-dicts-key-value-basics.md:404** — Review runtime behavior
- **11-capstone-data-processing-pipeline.md:384** — Review runtime behavior
- **11-capstone-data-processing-pipeline.md:595** — Review runtime behavior
- **11-capstone-data-processing-pipeline.md:634** — Review runtime behavior
- **10-choosing-the-right-structure.md:103** — Review runtime behavior
- **09-dicts-iteration-and-comprehensions.md:627** — Review runtime behavior
- **01-introduction-to-collections.md:208** — Review runtime behavior
- **06-tuples-immutable-sequences.md:99** — Review runtime behavior
- **06-tuples-immutable-sequences.md:298** — Review runtime behavior
- **08-dicts-crud-operations.md:270** — Review runtime behavior

