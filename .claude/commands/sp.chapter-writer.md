---
description: Intelligence-driven workflow for creating book chapters (any programming language). Reads constitution + chapter-index to derive audience/complexity/prerequisites automatically. Loads official language documentation via MCP. Integrates AI-Native CoLearning pedagogy throughout lessons. Chains /sp.specify → /sp.plan → /sp.tasks → /sp.implement with validation gates.
---

# /sp.chapter-writer: Universal Intelligence-Driven Chapter Workflow

**Purpose**: Design a complete book chapter (any programming language or conceptual topic) using **vertical intelligence** (constitution + chapter-index + skills + MCP documentation) to automatically derive context. Language-agnostic with AI-Native CoLearning pedagogy built-in.

**Intelligence Sources**:
- Constitution: Target audience, philosophy, learning patterns
- Chapter Index: Exact title (THE ANCHOR), part, prerequisites
- Skills Library: Available domain skills (especially `ai-collaborate-teaching`)
- MCP Servers: Official language/framework documentation (Python.org, TypeScript docs, etc.)
- Context Materials: Existing pedagogical patterns (if available)

**Adaptive Questions**: 0-3 targeted questions based on what intelligence can't derive (NOT hardcoded).

## User Input

```text
$ARGUMENTS
```

**Expected Format**:
```bash
/sp.chapter-writer <chapter-number> [--language <lang>] [--dry-run]
```

**Examples**:
```bash
/sp.chapter-writer 15 --language python       # Python chapter
/sp.chapter-writer 38 --language typescript   # TypeScript chapter
/sp.chapter-writer 5 --language conceptual    # Conceptual/narrative chapter
/sp.chapter-writer 20 --dry-run               # Plan only, no implementation
```

**Parameters**:
- `<chapter-number>`: Required. Chapter number (1-56)
- `--language <lang>`: Optional. Programming language (python, typescript, conceptual). Auto-detected from chapter-index if not provided.
- `--dry-run`: Optional. Generate spec/plan/tasks only, skip implementation.

---

## VERTICAL INTELLIGENCE: AI-Native CoLearning Teaching

Before orchestration begins, understand what makes chapters effective in the AI-native era:

### Core Principle: CoLearning WITH AI (Not Just Using AI)

Students don't just learn programming syntax. They learn to **co-reason with AI**:

1. **Understand the concept** (book teaches foundational, stable concepts directly)
2. **Explore with AI** (AI companion handles complex execution, student directs)
3. **Validate outputs** (critical thinking, never blind trust)
4. **Orchestrate at scale** (AI automates 10+ operations, student supervises)

### AI-Native CoLearning Pedagogy (Constitution Principle 13 + ai-collaborate-teaching skill)

**Traditional Programming Teaching**:
- "Memorize syntax"
- "Here are all 47 string methods"
- Syntax-first (memorize, then apply)

**AI-Native CoLearning Pattern**:
- **Book Teaches Foundational** (Tier 1): Stable concepts explained directly
- **AI Companion Handles Complex** (Tier 2): Student specifies, AI executes, student observes
- **AI Orchestration at Scale** (Tier 3): Student orchestrates, AI manages, student validates

**CoLearning Structural Elements** (throughout lessons, NOT just end):

#### 💬 AI Colearning Prompt (Claude Code or Gemini CLI)
- Positioned after introducing foundational concepts
- Encourages students to explore deeper with AI as co-reasoning partner
- Example: "Explain how `for` loops work under the hood with `range()`."
- **Purpose**: Position AI as intellectual partner for conceptual exploration

#### 🎓 Instructor Commentary: "From Syntax to Semantics"
- Emphasizes conceptual understanding over syntax memorization
- Key mantra: "Syntax is cheap — semantics is gold"
- Example: "In AI-driven development, you don't memorize operator precedence—you understand when to ask AI for clarification."
- **Purpose**: Reframe learning goals (understanding > memorization)

#### 🚀 CoLearning Challenge
- Prompts that teach conceptual translation (intent → AI prompt → code → understanding)
- Example: "Ask your AI: Generate a factorial function using recursion, then explain how recursion works step-by-step including the call stack."
- **Purpose**: Practice specification-driven thinking WITH AI collaboration

#### ✨ Teaching Tip
- How to use Claude Code/Gemini CLI as pair-teacher
- Example: "Use Claude Code to explore edge cases: 'What happens if I use // with negative numbers?'"
- **Purpose**: Build AI tool literacy and effective collaboration patterns

**Critical Distinctions**:
- **CoLearning Elements** (throughout lesson): Conversational, exploration-focused, AI partnership throughout content
- **Try With AI Section** (end of lesson): Structured 4-prompt synthesis and reflection (closure point)

**Tone Requirements for ALL Lessons**:
- ✅ Conversational (you, your, we)
- ✅ Exploration-focused (discover, explore, try)
- ✅ AI partnership emphasized (co-teacher, co-reasoning partner, pair-teacher)
- ❌ NOT documentation style
- ❌ NOT reference manual tone
- ❌ NOT traditional tutorial "here's how you do X" without AI collaboration context

---

## Language-Specific Standards

### Python Chapters (12-29, 41-45)

**Version:** 3.14+ (always use latest stable from https://www.python.org/downloads/)
**Syntax:** f-strings only, match/case, modern types (`list[int]`, `X | None`)
**Type hints:** Mandatory from Chapter 14 onwards
**MCP Documentation Source**: Python.org official docs via context7 MCP server

**Security (non-negotiable)**:
- ❌ No `eval()`, `shell=True`, hardcoded secrets
- ✅ Environment variables, input validation, modern patterns

**Language-Appropriate CoLearning**:
- "Ask your AI: Why does Python use `:` after `if` statements instead of `{}`?"
- "Tell your AI: Generate a function that validates email addresses and explain the regex pattern."

---

### TypeScript Chapters (38-40, 46-48)

**Version:** 5.3+ with ES2024 target
**Syntax:** Modern ES features, async/await, strict mode
**Type hints:** Mandatory throughout (TypeScript's core value)
**MCP Documentation Source**: TypeScript official docs + MDN via context7 MCP server

**Security (non-negotiable)**:
- ❌ No `eval()`, `innerHTML` without sanitization, hardcoded API keys
- ✅ Environment variables, CSP headers, modern security patterns

**Language-Appropriate CoLearning**:
- "Ask your AI: Why does TypeScript require explicit `async` keyword when JavaScript doesn't?"
- "Tell your AI: Generate a React component with TypeScript and explain the type inference."

---

### Conceptual Chapters (1-11, 30-37, 49-56)

**Focus:** Mindset, methodology, specification-driven development, architecture
**No code requirements** (or minimal illustrative code)
**MCP Documentation Source**: Not applicable (no language docs needed)

**CoLearning Adaptation**:
- "Ask your AI: What are the ethical implications of AI-generated code in production systems?"
- "Tell your AI: Analyze this specification for ambiguities and suggest clarifications."

---

## CRITICAL DESIGN RULES

### Rule 1: USER INTENT IS AUTHORITY

**Never override user input:**
- User says "beginner" → Make A1-A2 (NOT A2-B1)
- User says "just variables" → Only variables (NOT + functions + loops)
- User says "absolute beginners" → 5 concepts max, simple framing

**Always ask, always honor. Do NOT assume.**

---

### Rule 2: NO FORWARD REFERENCES + PART-APPROPRIATE LANGUAGE

**Never mention untaught concepts:**
- ❌ NO references to chapters not yet encountered
- ❌ NO professional terminology before it's taught
- ❌ NO "you'll learn this in Chapter N" without context

**DO reference what students already know:**
- ✅ "Building on the AIDD principles from Part 1..."
- ✅ "Remember validation-first from Chapter 4..."
- ✅ "Using your AI as co-reasoning partner (as you learned in Part 2)..."

**Part-Specific Language**:
- **Parts 1-3**: "Describe your intent", "Ask your AI", "Explore with your AI companion"
- **Parts 4-5**: "Write clear specifications", "Validate with type hints", "Test your understanding"
- **Parts 6-13**: "Design agent architecture", "Define specifications", "Deploy to production"

---

### Rule 3: RUTHLESS CONTEXT FILTERING

**When extracting from context materials:**

**Decision Rule**:
- IF context concept fits THIS chapter's title → EXTRACT
- IF context concept belongs to later chapters → SKIP
- IF context concept is advanced variation → SKIP
- IF context concept requires future prerequisites → SKIP

**Example (Chapter 15 "Operators")**:
- ✅ Arithmetic operators (+, -, *, /) → USE (chapter focus)
- ✅ Comparison operators (==, !=, >, <) → USE (chapter focus)
- ❌ List comprehensions → SKIP (Ch 18-19 topic)
- ❌ Exception handling → SKIP (Ch 21 topic)

---

### Rule 4: GRADUATED COMPLEXITY (Constitution Principle 12)

**Depth > breadth.**

- **Beginner (Ch 1-16)**: 5 concepts max per lesson, 3-4 lessons per chapter
- **Intermediate (Ch 17-29)**: 7 concepts max per lesson, 4-5 lessons per chapter
- **Advanced (Ch 30-48)**: 10 concepts max per lesson, 5-6 lessons per chapter
- **Professional (Ch 49-56)**: No artificial limits, real-world complexity

---

### Rule 5: MINIMAL FILES

**Create ONLY:**
- ✅ spec.md (what students learn)
- ✅ plan.md (how we teach it + skills proficiency mapping)
- ✅ tasks.md (implementation checklist)

**Never create:**
- ❌ index.md, _templates/, _assets/, _code-examples/, lesson-template.md, capstone-rubric.md

---

### Rule 6: COLEARNING IS AI PARTNERSHIP (Not Troubleshooting Appendix)

**Real-world context:** Students will encounter errors, confusion, edge cases. Rather than appendices, teach students to ASK their AI co-teacher in the moment.

**Application in chapters:**
- **Foundational chapters**: "Ask your AI: What does this error mean?"
- **Applied chapters**: "Tell your AI: I'm getting TypeError. Walk me through what went wrong."
- **Advanced chapters**: "Ask your AI: Compare these three architectural approaches and explain tradeoffs."

**Why this works:**
- ✅ Teaches resilience: Errors are information, not obstacles
- ✅ Builds partnership: AI becomes problem-solving collaborator
- ✅ Scales with complexity: Works for simple errors to architectural decisions
- ✅ Honors reality: Professional developers ask AI constantly

**Example Integration (throughout lesson, not appendix)**:
```markdown
### Understanding Comparison Operators

Comparison operators return `True` or `False`:

\`\`\`python
x: int = 10
y: int = 5

print(x > y)   # True
print(x == y)  # False
\`\`\`

#### 💬 AI Colearning Prompt
> "Explain why `==` checks value equality but not type equality. What happens if I compare `5 == 5.0`?"

#### 🎓 Instructor Commentary
> In AI-native development, you don't memorize comparison rules—you understand WHEN equality matters and ask AI to clarify edge cases. Syntax is cheap; understanding is gold.
```

---

### Rule 7: GRADUATED TEACHING PATTERN (Constitution Principle 13)

**Apply the three-tier teaching approach from constitution:**

**Tier 1 - Foundational Concepts** (Book Teaches Directly):
- Stable, core concepts explained directly in book
- Direct explanation with analogies and examples
- Examples: What are variables? What is a loop? What are type hints?
- **NO "Ask your AI: What is X?" for foundations**
- Book provides clear, authoritative explanation first
- **Then CoLearning for deeper exploration**: "Ask your AI: How does Python store variables in memory?"

**Tier 2 - Complex Syntax** (AI Companion Handles):
- Complex syntax patterns AI handles (student directs, AI executes)
- Student specifies WHAT they want, AI handles HOW
- Examples: Decorators, context managers, complex regex, async/await patterns
- "Tell your AI: Create a decorator that logs function execution time."
- Student learns strategy and intent, not memorization

**Tier 3 - Scaling Operations** (AI Orchestration):
- Operations involving 10+ items or multi-file workflows
- Student orchestrates strategy, AI manages tactical execution
- Examples: Setting up 10 test environments, batch conversions, project scaffolding
- "Tell your AI: Set up 10 worktrees for features 1-10."
- Student learns orchestration and supervision skills

**Application**:
- Primarily Tier 1+2 for beginner/intermediate chapters
- Tier 3 introduced in advanced/professional chapters
- Balance: Book teaches, AI handles complexity, student directs

---

### Rule 8: STANDARDIZED "TRY WITH AI" FORMAT (End-of-Lesson Closure)

**Every lesson MUST end with "Try With AI" section ONLY** (no summaries, no "what's next", no checklists):

```markdown
## Try With AI

Use your AI companion (Claude Code or Gemini CLI). [Brief context about what you're exploring].

### Prompt 1: [Descriptive Title - Recall/Understand]
\`\`\`
[Clear, concrete prompt asking about the concept]
\`\`\`

**Expected outcome**: [What student should understand after AI response]

### Prompt 2: [Descriptive Title - Apply]
\`\`\`
[Clear, concrete prompt about application or edge case]
\`\`\`

**Expected outcome**: [What student learns from this]

### Prompt 3: [Descriptive Title - Analyze/Evaluate]
\`\`\`
[Prompt encouraging deeper understanding or real-world connection]
\`\`\`

**Expected outcome**: [Connection to professional practice]

### Prompt 4: [Descriptive Title - Synthesis/Create]
\`\`\`
[Synthesis prompt pulling together concepts from lesson]
\`\`\`

**Expected outcome**: [Integration of understanding + forward-looking insight]
```

**Critical requirements:**
- ✅ Exactly 4 prompts per lesson (progressive Bloom's levels: Remember → Understand → Apply → Analyze/Synthesize)
- ✅ Prompts are CONCRETE and SPECIFIC (not "ask AI about X")
- ✅ Each prompt has explicit "Expected outcome"
- ✅ Prompts include validation thinking ("Does this match the spec?", "What assumptions did I make?")
- ✅ **NOTHING after "Try With AI"** (this IS the closure)

**CRITICAL LESSON CLOSURE PATTERN** (Constitutional Mandate):

Lessons MUST end with "Try With AI" section ONLY. Prompt 4 provides cognitive closure.

**NEVER ADD after "Try With AI":**
- ❌ "Key Takeaways" or "Summary"
- ❌ "What's Next"
- ❌ "Completion Checklist" (even for capstone lessons)
- ❌ "Chapter Summary"
- ❌ Any other closure content

**WHY**: Try With AI Prompt 4 already provides reflection and synthesis. Additional sections create cognitive overload and violate Constitution Principle 12 (Cognitive Load).

---

## MCP DOCUMENTATION LOADING (Phase 0 Enhancement)

**Purpose**: Load official, current documentation for programming languages/frameworks to ensure accuracy and reduce manual context preparation.

**MCP Server**: context7 (or equivalent documentation server available via MCP tools)

**Supported Languages**:
- **Python**: Python.org official docs (v3.14+ or latest stable)
- **TypeScript**: TypeScript official docs + MDN Web Docs (v5.3+ or latest stable)
- **Conceptual**: N/A (no language docs needed)

**Loading Strategy** (Phase 0):
- Detect available MCP documentation tools autonomously
- Load language-specific docs based on chapter context (tutorial, library references, framework-specific sections)
- Store documentation source for attribution in outputs
- Graceful fallback to cached context materials if MCP unavailable

**Documentation Usage**:
- **During /sp.specify**: Reference for accurate requirement definition
- **During /sp.plan**: Validate code examples and teaching approach
- **During /sp.implement**: lesson-writer accesses for technical accuracy

**Fallback Strategy**:
- If MCP unavailable: warn user, use cached context from `context/` directory, flag for manual verification

---

## ORCHESTRATED WORKFLOW (What Actually Happens)

When you run `/sp.chapter-writer [N] --language [L]`:

### PHASE 0: Intelligent Context Gathering (Adaptive + MCP-Enhanced)

**Intelligence-Driven Discovery** (not hardcoded questions):

**Step 1: Parse Arguments**
- Chapter number (required, 1-56)
- Language flag (`--language python|typescript|conceptual`) or auto-detect from chapter number
- Dry-run flag (optional)
- Validate: chapter in range, language supported

**Step 2: Read Authoritative Sources**
- Constitution (`.specify/memory/constitution.md`): audience, philosophy, principles
- Chapter index (`specs/book/chapter-index.md`): title, file name, part number
- Available skills (`.claude/skills/` directory)
- Existing context materials (`context/` directory, if any)

**Step 3: Load Language Documentation via MCP** (WHEN AVAILABLE)
- For Python/TypeScript chapters: Use MCP tools to fetch official documentation (v3.14+ for Python, v5.3+ for TypeScript)
- Load relevant sections based on chapter focus (tutorial, library references, framework-specific)
- Graceful fallback to cached context if MCP unavailable
- For conceptual chapters: Skip language docs (not needed)
- Acknowledge documentation source in outputs

**Step 4: Derive Chapter Intelligence**
```python
# From constitution (no need to ask user)
audience = "Aspiring/Professional/Founders (graduated complexity)"

# From chapter number (automatic tier assignment)
if 1 <= chapter_num <= 16:
    complexity_tier = "beginner"
    cefr_range = "A1-A2"
    max_concepts = 5
    part_language = "describe intent, explore with AI, validate"
elif 17 <= chapter_num <= 37:
    complexity_tier = "intermediate"
    cefr_range = "A2-B1"
    max_concepts = 7
    part_language = "write specifications, test understanding, apply patterns"
elif 38 <= chapter_num <= 48:
    complexity_tier = "advanced"
    cefr_range = "B1-B2"
    max_concepts = 10
    part_language = "design architecture, define specifications, optimize performance"
elif 49 <= chapter_num <= 56:
    complexity_tier = "professional"
    cefr_range = "B2-C1"
    max_concepts = None  # No artificial limits
    part_language = "production deployment, system design, scalability"

# From chapter index (THE ANCHOR)
part_num = <derived from chapter-index.md>
prerequisites = f"Chapters 1-{chapter_num - 1}"
learning_pattern = <derived from part number>  # AI-Native Learning, SDD, etc.

# Store all derived intelligence for later phases
chapter_intelligence = {
    "number", "title", "part", "language",
    "complexity_tier", "cefr_range", "max_concepts_per_lesson",
    "prerequisites", "audience", "learning_pattern",
    "part_appropriate_language", "available_skills",
    "colearning_required", "documentation_source", "dry_run"
}
```

**Step 5: Intelligently Determine What to Ask User**
- Only ask if genuinely ambiguous or requires human judgment
- Example triggers: existing context found, broad chapter title, unclear capstone vs conceptual
- Ask 0-3 targeted questions max (NOT hardcoded forms)
- Store user preferences in chapter intelligence

**Step 6: Confirm Intelligence Gathered (DO NOT create branch yet)**

**CRITICAL**: Branch creation happens in Phase 1 AFTER spec.md is created, ensuring branch name matches spec directory name.

**Step 7: Report Intelligence Summary**
```
✅ PHASE 0 COMPLETE: Intelligence Gathered

📊 Chapter Intelligence:
  - Chapter: {number} - {title}
  - Part: {part_num}
  - Language: {language}
  - Complexity: {complexity_tier} (CEFR {cefr_range})
  - Max Concepts/Lesson: {max_concepts}
  - Prerequisites: Chapters 1-{chapter_num - 1}
  - Documentation: {doc_source}
  - CoLearning: ✅ ai-collaborate-teaching skill will be applied
  - Dry Run: {dry_run}

Proceeding to PHASE 1: Specification...
```

---

### PHASE 1: Specification (Automated + Quality Gate)

**THIS PHASE INVOKES `/sp.specify` AUTOMATICALLY WITH FULL CONTEXT INCLUDING MCP DOCS**

1. **Prepare context** (Ruthless filtering + MCP docs + CoLearning principles):
   - Gather chapter intelligence from Phase 0
   - Extract language documentation from MCP (if available)
   - Extract context materials (if available and user approved)
   - Apply ruthless filtering: Skip future chapters, skip advanced variations
   - Embed CoLearning principles (ai-collaborate-teaching skill patterns)
   - Embed learning pattern (AI-Native Learning, SDD, etc.)
   - Embed cognitive load limits (5/7/10 based on tier)

2. **Invoke /sp.specify with full context**:
   ```
   /sp.specify [chapter-slug]

   Write Chapter [N]: [Title] in Part [P] for [Language]

   [Full context: intelligence, CoLearning patterns, MCP docs, teaching patterns, cognitive load rules, filtered materials]
   ```

3. **Wait for /sp.specify completion**:
   - ✅ `specs/part-[P]-chapter-[N]/spec.md` created
   - ✅ CoLearning principles specified
   - ✅ Learning objectives aligned with proficiency levels

4. **Invoke /sp.clarify (Quality Gate)**:
   - Read spec.md
   - Identify underspecified areas
   - Ask up to 5 targeted questions
   - Update spec.md with answers

5. **Create Feature Branch (AFTER spec exists)**:
   ```bash
   # Derive branch name from spec directory (e.g., specs/part-4-chapter-15/ → part-4-chapter-15)
   spec_dir_name=$(basename "$(dirname "$FEATURE_SPEC")")
   current_branch=$(git branch --show-current)

   if [[ "$current_branch" == "main" ]]; then
       git checkout -b "$spec_dir_name"
       echo "✅ Created branch: $spec_dir_name"
   elif [[ "$current_branch" == "$spec_dir_name" ]]; then
       echo "ℹ️  Already on correct branch: $current_branch"
   else
       echo "⚠️  Warning: Current branch ($current_branch) != spec directory ($spec_dir_name)"
       echo "    Consider switching: git checkout -b $spec_dir_name"
   fi
   ```

6. **Output approval checkpoint**:
   ```
   ✅ PHASE 1 COMPLETE: Specification Created & Clarified

   📋 specs/part-[P]-chapter-[N]/spec.md

   Please review and confirm:
   - ✅ "Spec approved" to proceed to planning
   - 📝 Feedback to revise specification
   - ❓ Questions for clarification
   ```

6. **Wait for user approval**: Block until user confirms OR provides feedback

---

### PHASE 2: Planning (Automated + ADR Gate)

**THIS PHASE INVOKES `/sp.plan` AUTOMATICALLY WITH COLEARNING CONTEXT**

1. **Prepare context**:
   - Read approved spec.md
   - Add CEFR proficiency levels
   - Add skills proficiency mapping (skills-proficiency-mapper)
   - Add CoLearning structural elements (💬🎓🚀✨)
   - Add lesson progression (Foundation → AI-Assisted → Verification balance)
   - Add AI prompts for each lesson
   - Add MCP documentation reference

2. **Invoke /sp.plan with full context**:
   ```
   /sp.plan [chapter-slug]

   [Full context: spec, CEFR levels, CoLearning patterns, lesson structure, MCP docs]
   ```

3. **Wait for /sp.plan completion**:
   - ✅ `specs/part-[P]-chapter-[N]/plan.md` created
   - ✅ Lessons broken down with CoLearning elements specified
   - ✅ Skills proficiency mapped

4. **Invoke /sp.adr (Architectural Decision Gate)**:
   - Detect significant decisions
   - Suggest ADR creation (wait for user consent)

5. **Output approval checkpoint**:
   ```
   ✅ PHASE 2 COMPLETE: Plan Created (+ ADR if applicable)

   📋 specs/part-[P]-chapter-[N]/plan.md

   Please review and confirm:
   - ✅ "Plan approved" to proceed to tasks
   - 📝 Feedback to revise plan
   ```

6. **Wait for user approval**

---

### PHASE 3: Tasks (Automated + Analysis Gate)

**THIS PHASE INVOKES `/sp.tasks` AND `/sp.analyze` AUTOMATICALLY**

1. **Invoke /sp.tasks**:
   ```
   /sp.tasks [chapter-slug]

   [Context: spec + plan, acceptance criteria, CoLearning validation steps]
   ```

2. **Invoke /sp.analyze (Cross-Artifact Consistency Gate)**:
   - Validate spec ↔ plan ↔ tasks alignment
   - Check CoLearning elements present in plan
   - Verify cognitive load limits
   - Report consistency issues

3. **Output approval checkpoint**:
   ```
   ✅ PHASE 3 COMPLETE: Tasks + Analysis

   📋 specs/part-[P]-chapter-[N]/tasks.md
   📊 Analysis report: [findings]

   Please review and confirm:
   - ✅ "Tasks approved" to proceed to implementation
   - 📝 Feedback to address issues
   ```

4. **Wait for user approval**

---

### PHASE 4: Implementation (Automated + Technical Review Gate)

**THIS PHASE INVOKES `/sp.implement` WITH EXPLICIT COLEARNING INSTRUCTIONS**

**CRITICAL**: Only execute if NOT dry-run mode

```python
if dry_run:
    print("🏁 DRY RUN MODE: Stopping at tasks generation")
    print("   To implement: Run without --dry-run flag")
    exit(0)
```

1. **Invoke /sp.implement with CoLearning context**:
   ```
   /sp.implement [chapter-slug]

   CRITICAL INSTRUCTIONS FOR lesson-writer:

   Apply these domain skills IN THIS ORDER:
   1. ai-collaborate-teaching (CoLearning pedagogy THROUGHOUT lesson)
   2. learning-objectives (aligned with CEFR proficiency levels)
   3. concept-scaffolding (graduated complexity)
   4. code-example-generator (if technical chapter)
   5. exercise-designer (deliberate practice)

   CoLearning Structural Elements (MUST appear throughout lesson):
   - 💬 AI Colearning Prompt: After foundational concepts, encourage AI exploration
   - 🎓 Instructor Commentary: Emphasize "syntax cheap, semantics gold"
   - 🚀 CoLearning Challenge: Practice specification-driven thinking with AI
   - ✨ Teaching Tip: Build AI tool literacy and collaboration patterns

   Tone Requirements:
   - ✅ Conversational (you, your, we)
   - ✅ Exploration-focused (discover, explore, try)
   - ✅ AI partnership (co-teacher, pair-teacher)
   - ❌ NOT documentation style
   - ❌ NOT reference manual

   Lesson Closure:
   - ✅ ONLY "Try With AI" section at end (4 prompts)
   - ❌ NO summaries, checklists, "what's next" after Try With AI

   [Full context: spec, plan, tasks, MCP docs, language standards]
   ```

2. **Wait for lesson-writer completion**:
   - ✅ All lesson files created
   - ✅ CoLearning elements present throughout
   - ✅ "Try With AI" closure only

3. **Invoke technical-reviewer (Quality Gate)**:
   ```
   Validate Chapter [N] with focus on:
   - AI-Native CoLearning pedagogy (💬🎓🚀✨ elements present)
   - Conversational tone (not documentation)
   - Lesson closure (Try With AI ONLY)
   - Technical accuracy (code runs, types correct)
   - Constitution compliance
   ```

4. **Apply critical fixes** (if needed):
   - Re-run technical-reviewer until PASS

5. **Final report**:
   ```
   ✅ CHAPTER [N] COMPLETE & VALIDATED

   📚 Lessons: [count] lessons created
   📋 Validation: PASS
   🎯 CoLearning: ✅ Applied throughout

   Next: Update chapter-index.md
   ```

---

### PHASE 5: Finalization (Update Chapter Index)

**Update chapter-index.md with completion status**

```bash
# Update chapter-index.md
# Mark chapter as ✅ Implemented & Validated
# Add status block with lesson count, validation result, date
```

---

## KEY PRINCIPLES (Always Applied)

### ✅ CoLearning Pedagogy First (ai-collaborate-teaching skill)
- Apply CoLearning structural elements throughout lessons (not just end)
- Conversational tone, exploration-focused, AI partnership emphasized
- 40/40/20 balance (Foundation 40%, AI-Assisted 40%, Verification 20%)
- AI positioned as co-reasoning partner, not autocomplete

### ✅ MCP-Enhanced Intelligence (When Available)
- Load official language documentation via context7 MCP server
- Fallback to cached context if MCP unavailable
- Reference docs for technical accuracy throughout workflow

### ✅ Language-Agnostic Design
- Single command for Python, TypeScript, conceptual chapters
- Language-specific standards applied automatically
- Parameterized via `--language` flag or auto-detection

### ✅ Constitution Compliance
- Graduated Teaching Pattern (Tier 1/2/3)
- Cognitive Load Limits (5/7/10/unlimited based on tier)
- No Forward References (chapter boundaries respected)
- Lesson Closure (Try With AI ONLY)

### ✅ Vertical Intelligence Preserved
- Every phase applies CoLearning principles
- Every phase uses teaching patterns
- Every phase respects chapter boundaries
- Every phase validates against acceptance criteria

---

## EXECUTION INSTRUCTIONS (For Claude Code)

**CRITICAL**: This is an EXECUTABLE orchestration prompt. Claude Code must:
1. Follow this flow exactly, in order
2. Automatically invoke downstream commands WITHOUT asking approval first
3. Pass full context (CoLearning, MCP docs, teaching patterns) to each command
4. Respect approval gates ONLY between phases

### Command Parsing & Language Detection

Agent autonomously:
- Parses chapter number (required), language flag (optional), dry-run flag (optional)
- Auto-detects language from chapter ranges if not specified (Python: 12-29, 41-45; TypeScript: 38-40, 46-48; Conceptual: others)
- Detects and uses available MCP servers for documentation loading
- Validates inputs and provides usage errors if needed

---

## VALIDATION CHECKLIST

Before releasing this command, verify:

**Phase 0 Checks**:
- [ ] MCP context7 server detection works
- [ ] Language documentation loading succeeds (or fails gracefully)
- [ ] Auto-detection logic correct for all chapter ranges
- [ ] Chapter intelligence derived correctly

**Phase 1-3 Checks**:
- [ ] /sp.specify receives CoLearning context
- [ ] /sp.plan includes CoLearning structural elements
- [ ] /sp.tasks includes CoLearning validation steps

**Phase 4 Checks**:
- [ ] lesson-writer receives explicit CoLearning instructions
- [ ] Generated lessons have 💬🎓🚀✨ elements throughout
- [ ] Generated lessons have conversational tone
- [ ] Generated lessons end with "Try With AI" ONLY
- [ ] technical-reviewer validates CoLearning pedagogy

**Cross-Cutting Checks**:
- [ ] Python chapters use Python 3.14+ standards
- [ ] TypeScript chapters use TypeScript 5.3+ standards
- [ ] Conceptual chapters have no code requirements
- [ ] Cognitive load limits enforced (5/7/10 based on tier)
- [ ] Constitution compliance verified

---

## EXAMPLES

### Example 1: Python Chapter (Standard)

```bash
/sp.chapter-writer 15 --language python
```

**Expected Workflow**:
1. Phase 0: Load Python 3.14 docs via MCP, detect "beginner" tier
2. Phase 1: Create spec with CoLearning principles
3. Phase 2: Plan 5 lessons with 💬🎓🚀✨ elements
4. Phase 3: Generate 99 tasks with CoLearning validation
5. Phase 4: lesson-writer creates lessons with conversational tone
6. Phase 5: Update chapter-index.md

---

### Example 2: TypeScript Chapter (Dry Run)

```bash
/sp.chapter-writer 38 --language typescript --dry-run
```

**Expected Workflow**:
1. Phase 0: Load TypeScript 5.3 docs via MCP
2. Phase 1-3: Generate spec, plan, tasks
3. **STOP** (dry run mode - no implementation)
4. User reviews artifacts, then runs without --dry-run to implement

---

### Example 3: Conceptual Chapter (Auto-Detect)

```bash
/sp.chapter-writer 5
```

**Expected Workflow**:
1. Phase 0: Auto-detect "conceptual" (no language docs needed)
2. Phase 1-3: Generate spec, plan, tasks (no code requirements)
3. Phase 4: lesson-writer creates narrative content with CoLearning prompts
4. Lessons have reflection prompts, not coding exercises

---

## CRITICAL SUCCESS FACTORS

1. **MCP Integration**: Official docs loaded when available, graceful fallback when not
2. **CoLearning Throughout**: ai-collaborate-teaching applied to every lesson, not just end
3. **Conversational Tone**: Lessons feel like AI co-teacher dialogue, not reference manual
4. **Language-Agnostic**: Single command handles Python, TypeScript, conceptual
5. **Constitution Compliant**: All 17 principles enforced automatically
6. **Automatic Invocation**: Commands chain automatically with approval gates between phases
7. **Context Preservation**: Full intelligence flows through all phases

---

## TROUBLESHOOTING

### MCP Context7 Not Available

**Symptom**: "⚠️ MCP context7 server unavailable"

**Impact**: Fallback to cached context materials

**Resolution**:
- Verify MCP server configuration in Claude Desktop settings
- Check context7 server is installed and running
- Use `--dry-run` to test without docs, review artifacts manually

### Lessons Missing CoLearning Elements

**Symptom**: Generated lessons don't have 💬🎓🚀✨ sections

**Root Cause**: lesson-writer didn't receive explicit CoLearning instructions

**Resolution**:
- Verify Phase 4 passes explicit instructions (see "CRITICAL INSTRUCTIONS FOR lesson-writer" in Phase 4)
- Check ai-collaborate-teaching skill has `required_for: ["lesson-writer"]` metadata
- Re-run technical-reviewer to validate CoLearning compliance

### Documentation Style Instead of Conversational

**Symptom**: Lessons read like API reference, not teaching dialogue

**Root Cause**: Tone requirements not emphasized enough to lesson-writer

**Resolution**:
- Emphasize tone requirements in Phase 4 invocation
- Include example CoLearning sections in context
- Provide feedback to lesson-writer: "Rewrite in conversational tone"

---

## REFERENCES

- **Constitution**: `.specify/memory/constitution.md` (Principles 1, 12, 13 especially)
- **Chapter Index**: `specs/book/chapter-index.md` (THE ANCHOR for chapter titles)
- **ai-collaborate-teaching Skill**: `.claude/skills/ai-collaborate-teaching/SKILL.md`
- **Output Style**: `.claude/output-styles/lesson.md`
- **MCP Documentation**: [MCP Protocol Spec](https://modelcontextprotocol.io/docs)

---

## ONE COMMAND. FULL INTELLIGENCE. COLEARNING BUILT-IN. MCP-ENHANCED.

Run `/sp.chapter-writer [N] --language [L]` and the system executes this opinionated workflow:

**PHASE 0**: Intelligent Context Discovery + MCP Documentation Loading
**PHASE 1**: Specification + Clarification (CoLearning principles embedded)
**PHASE 2**: Planning + ADR (CoLearning structural elements defined)
**PHASE 3**: Tasks + Analysis (CoLearning validation steps included)
**PHASE 4**: Implementation + Technical Review (lesson-writer applies ai-collaborate-teaching)
**PHASE 5**: Finalization (chapter-index.md updated)

**Result**: High-quality, AI-Native CoLearning chapters with built-in pedagogy, official documentation references, and constitutional compliance.

---

**Note**: For PHR (Prompt History Record) creation after command completion, see constitution for instructions.
