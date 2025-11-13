# SDD Loop Orchestrators: Command Comparison

This document compares the two main SDD (Spec-Driven Development) workflow orchestrators.

---

## Quick Decision Guide

**Use `/sp.python-chapter [N]`** when:
- ✅ Building Part 4 Python chapters (12-29)
- ✅ Need Python-specific teaching patterns
- ✅ Want AI-Native Learning pedagogy built-in
- ✅ Require CEFR proficiency level mapping
- ✅ Need pedagogical ordering validation

**Use `/sp.loopflow [goal]`** when:
- ✅ Building ANY other chapter (Parts 1-3, 5-13)
- ✅ Adding code features or components
- ✅ Writing documentation
- ✅ Creating tests or validation scripts
- ✅ Refactoring existing code
- ✅ Any non-Python-chapter task

---

## Feature Comparison Matrix

| Feature | /sp.python-chapter | /sp.loopflow |
|---------|-------------------|-------------|
| **Scope** | Python chapters 12-29 only | Universal (any chapter/feature/task) |
| **Target Parts** | Part 4 only | All parts (1-13) |
| **Task Types** | Book chapters | Chapters, features, docs, tests, refactoring |
| **Intelligence Sources** | Constitution + chapter-index + Python standards + MCP docs | Constitution + project context + domain skills |
| **Adaptive Questions** | 0-3 (Python-specific) | 0-5 (task-adaptive) |
| **Teaching Patterns** | AI-Native Learning (hardcoded) | Task-dependent (flexible) |
| **Proficiency Levels** | CEFR A1-B2 (automatic) | Context-dependent |
| **Subagents** | lesson-writer, technical-reviewer, proof-validator | Task-adaptive (lesson-writer OR general-purpose OR test-runner) |
| **Validation Focus** | Python code quality + CoLearning pedagogy + lesson closure | Task-dependent (code quality OR docs quality OR test coverage) |
| **Output Files** | Always lessons + README + quiz | Context-dependent |
| **Python Standards** | 3.14+, type hints, modern syntax | N/A (not Python-specific) |
| **Pedagogical Ordering** | Built-in validation (forward references) | N/A (not pedagogy-focused) |
| **MCP Integration** | Python.org docs via context7 | N/A |
| **Cognitive Load** | Max 5/7/10 concepts (tier-dependent) | Task-dependent |
| **Lesson Closure** | "Try With AI" ONLY (enforced) | Task-dependent |
| **CoLearning Elements** | 💬🎓🤝 throughout (enforced) | Task-dependent |

---

## Workflow Comparison

### /sp.python-chapter Workflow

```
PHASE 0: Intelligent Context Discovery
└─ Reads: Constitution, chapter-index, Python standards, MCP docs
└─ Derives: CEFR levels, complexity tier, AI-Native Learning pattern
└─ Asks: 0-3 Python-specific questions

PHASE 1: Specification + Clarification Gate
└─ /sp.specify (Python teaching context)
└─ /sp.clarify (underspecified areas)
└─ Create git branch
└─ Human approval ✅

PHASE 2: Planning + ADR Gate
└─ /sp.plan (lesson structure + CEFR + skills-proficiency-mapper)
└─ /sp.adr (pedagogical decisions)
└─ Human approval ✅

PHASE 3: Tasks + Analysis Gate
└─ /sp.tasks (lesson implementation checklist)
└─ /sp.analyze (spec ↔ plan ↔ tasks consistency)
└─ Human approval ✅

PHASE 4: Implementation + Technical Review Gate
└─ /sp.implement (lesson-writer with CoLearning instructions)
└─ technical-reviewer (AI-Native Learning compliance + pedagogical ordering)
└─ Auto-fix critical issues
└─ Human approval ✅

PHASE 5: Finalization
└─ Update chapter-index.md
└─ Optional: /sp.git.commit_pr
└─ Create PHR
```

### /sp.loopflow Workflow

```
PHASE 0: Intelligent Context Discovery
└─ Reads: Constitution, project context, domain skills
└─ Derives: Audience, complexity, task type, validation strategy
└─ Asks: 0-5 task-adaptive questions

PHASE 1: Specification + Clarification Gate
└─ /sp.specify (task context + evals-first)
└─ /sp.clarify (underspecified areas)
└─ Create git branch
└─ Human approval ✅

PHASE 2: Planning + ADR Gate
└─ /sp.plan (task-specific strategy)
└─ /sp.adr (architectural decisions)
└─ Human approval ✅

PHASE 3: Tasks + Analysis Gate
└─ /sp.tasks (implementation checklist)
└─ /sp.analyze (cross-artifact consistency)
└─ Human approval ✅

PHASE 4: Implementation + Validation Gate
└─ /sp.implement (task-adaptive subagent)
└─ Validation (task-type dependent)
└─ Auto-fix critical issues
└─ Human approval ✅

PHASE 5: Finalization
└─ Update project tracking
└─ Optional: /sp.git.commit_pr
└─ Create PHR
```

---

## Example Outputs

### /sp.python-chapter Output

```
specs/part-4-chapter-14/
  ├── spec.md
  ├── plan.md
  └── tasks.md

book-source/docs/04-Part-4-Python-Fundamentals/14-data-types/
  ├── readme.md
  ├── 01-variables-and-type-hints.md
  ├── 02-integers-and-floats.md
  ├── 03-strings-and-booleans.md
  ├── 04-collections-awareness.md
  └── 05-type-explorer-capstone.md

VALIDATION_REPORT_CHAPTER_14.md
history/prompts/part-4-chapter-14/phr-[timestamp].md
```

### /sp.loopflow Output (Chapter Example)

```
specs/part-2-chapter-08/
  ├── spec.md
  ├── plan.md
  └── tasks.md

book-source/docs/02-Part-2-AIDD-Fundamentals/08-markdown-intro/
  ├── readme.md
  ├── 01-what-is-markdown.md
  ├── 02-basic-syntax.md
  ├── 03-markdown-in-ai-workflow.md
  └── 04-markdown-capstone.md

VALIDATION_REPORT_part-2-chapter-08.md
history/prompts/part-2-chapter-08/phr-[timestamp].md
```

### /sp.loopflow Output (Feature Example)

```
specs/user-authentication/
  ├── spec.md
  ├── plan.md
  └── tasks.md

src/auth/
  ├── jwt-handler.ts
  ├── middleware.ts
  └── tests/
      ├── jwt-handler.test.ts
      └── middleware.test.ts

docs/auth/
  └── authentication-guide.md

VALIDATION_REPORT_user-authentication.md
history/prompts/user-authentication/phr-[timestamp].md
history/adr/042-jwt-authentication-strategy.md
```

---

## When to Use Which

### Scenario 1: Writing Chapter 15 (Python Control Flow)

**Correct Choice**: `/sp.python-chapter 15`

**Why**:
- Part 4 Python chapter (12-29 range)
- Needs AI-Native Learning pedagogy
- Requires CEFR proficiency mapping
- Benefits from pedagogical ordering validation
- Wants Python 3.14+ code standards

---

### Scenario 2: Writing Chapter 8 (Markdown Intro)

**Correct Choice**: `/sp.loopflow "Chapter 8: Introduction to Markdown"`

**Why**:
- Part 2 chapter (not Part 4)
- Not Python-specific
- Needs general teaching patterns (not AI-Native Learning focus)
- No CEFR Python proficiency mapping needed

---

### Scenario 3: Adding Authentication Feature

**Correct Choice**: `/sp.loopflow "Add user authentication with JWT"`

**Why**:
- Code feature, not book chapter
- Needs code architecture planning
- Requires test-driven development
- Not pedagogical content

---

### Scenario 4: Documenting a Skill

**Correct Choice**: `/sp.loopflow "Document the general-sandbox skill"`

**Why**:
- Documentation task, not chapter
- Needs technical clarity
- No teaching patterns required
- Not Python-specific

---

### Scenario 5: Creating Validation Tests

**Correct Choice**: `/sp.loopflow "Create validation tests for Chapter 12"`

**Why**:
- Testing task, not chapter creation
- Needs test frameworks
- Validation-focused, not pedagogy-focused

---

## Shared Core Principles

Both orchestrators follow these constitutional principles:

### ✅ Evals-First, Then Spec-First
- Define success criteria BEFORE specifications
- Specs validated against evals

### ✅ Intelligence-Driven
- Read authoritative sources first
- Derive automatically what can be derived
- Ask only genuinely ambiguous questions

### ✅ Quality Gates at Every Phase
- Clarification gate (underspecified areas)
- ADR gate (architectural decisions)
- Analysis gate (cross-artifact consistency)
- Validation gate (quality assurance)

### ✅ Human-AI Co-Learning
- User STEERS at approval gates
- AI ADAPTS to feedback
- Iterative convergence to optimal solution

### ✅ Constitutional Compliance
- All outputs align with project vision
- Domain skills applied contextually
- Graduated complexity respected

### ✅ Shipping-Ready Output
- Quality built-in, not bolted on
- Validation ensures readiness
- PHR documents decision trail

---

## Migration Path

### From /sp.python-chapter to /sp.loopflow

**Not applicable** - these are complementary, not competing.

- Keep using `/sp.python-chapter` for Part 4 Python chapters (12-29)
- Use `/sp.loopflow` for everything else

### Why Two Commands?

**Specialization vs Generalization**:

- `/sp.python-chapter`: **Optimized** for Python teaching (hardcoded Python standards, AI-Native Learning, CEFR, pedagogical ordering)
- `/sp.loopflow`: **Flexible** for any task (adaptive task detection, context-dependent validation)

**Benefits of Specialization** (Python chapters):
- Python 3.14+ standards built-in
- AI-Native Learning pedagogy enforced
- CoLearning elements (💬🎓🤝) validated
- Pedagogical ordering (no forward references) checked
- CEFR proficiency levels automatic

**Benefits of Generalization** (everything else):
- Works for ANY chapter (Parts 1-3, 5-13)
- Adapts to task type (code, docs, tests)
- No hardcoded assumptions
- Flexible validation strategies

---

## Advanced Usage

### Chaining Multiple Tasks

```bash
# Create chapter spec first
/sp.loopflow "Chapter 8: Markdown Introduction"

# After chapter complete, add validation tests
/sp.loopflow "Create validation tests for Chapter 8 markdown examples"

# Then add documentation
/sp.loopflow "Document markdown teaching approach for instructors"
```

### Mixing Orchestrators

```bash
# Use specialized orchestrator for Python chapters
/sp.python-chapter 15

# Use general orchestrator for other parts
/sp.loopflow "Chapter 34: FastAPI Deployment"  # Part 6
/sp.loopflow "Chapter 45: GitHub Actions CI/CD"  # Part 8
```

### Iterating on Existing Work

```bash
# Initial creation
/sp.loopflow "Add authentication feature"

# After feedback, refine
/sp.loopflow "Refactor authentication to support OAuth providers"

# Add comprehensive tests
/sp.loopflow "Create integration tests for authentication flow"
```

---

## Best Practices

### 1. Start with Clear Goals

**Good**:
- "Chapter 8: Introduction to Markdown for AI Workflows"
- "Add JWT authentication with refresh tokens"
- "Document the general-sandbox skill for contributors"

**Bad**:
- "Do something with markdown" (too vague)
- "Make auth better" (no clear goal)
- "Write docs" (no target specified)

### 2. Let Intelligence Derive What It Can

**Good Workflow**:
1. State goal clearly
2. Let AI read constitution + context
3. Answer only adaptive questions (0-5)
4. Review and approve at gates

**Bad Workflow**:
1. Answer 20 hardcoded questions upfront
2. AI ignores constitution
3. No approval gates
4. Output doesn't match standards

### 3. Use Approval Gates as Learning Opportunities

**At each gate, review**:
- Spec gate: "Does this match my intent?"
- Plan gate: "Is this the right strategy?"
- Tasks gate: "Are these tasks complete?"
- Implementation gate: "Does this meet quality standards?"

### 4. Trust the Process, Steer the Outcome

- **Trust**: AI will read constitution and derive intelligence
- **Steer**: Provide feedback at approval gates
- **Converge**: Iterate to optimal solution

---

## Troubleshooting

### Issue: "Which orchestrator should I use?"

**Decision Tree**:
1. Is this a Part 4 Python chapter (12-29)? → Use `/sp.python-chapter`
2. Is this any other task? → Use `/sp.loopflow`

### Issue: "Orchestrator asked too many questions"

**Expected**:
- 0-3 questions for `/sp.python-chapter` (Python-specific)
- 0-5 questions for `/sp.loopflow` (task-adaptive)

**If more questions asked**:
- Goal may be too vague (refine goal statement)
- AI may not have access to required context (check constitution, chapter-index)

### Issue: "Output doesn't match constitutional standards"

**Solution**:
- Validation gate should catch this
- If not caught: Report issue, improve validation
- Re-run validation after fixes

### Issue: "Want to skip a phase"

**Not recommended**:
- Quality gates ensure consistency
- Skipping gates risks propagating bad specs

**If necessary**:
- Use individual commands (`/sp.specify`, `/sp.plan`, etc.)
- Not orchestrators

---

## Summary

**Two orchestrators, complementary roles**:

- **`/sp.python-chapter`**: Specialized for Part 4 Python chapters (12-29) with AI-Native Learning pedagogy built-in
- **`/sp.loopflow`**: Universal for any chapter, feature, doc, test, or refactoring task

**Shared principles**:
- Evals-first, then spec-first
- Intelligence-driven (not questionnaire-driven)
- Quality gates at every phase
- Human-AI co-learning partnership
- Constitutional compliance
- Shipping-ready output

**Choose based on task type, trust the process, steer at approval gates, converge to quality.**

---

**See also**:
- `/sp.python-chapter.md` - Specialized Python chapter orchestrator
- `/sp.loopflow.md` - Universal LoopFlow orchestrator
- `.specify/memory/constitution.md` - Project constitution (source of truth)
