---
sidebar_position: 6
title: "Agent Skills"
duration: "8-10 min"
---

# Agent Skills: Autonomous-Only Capabilities

You've learned that **subagents** can be invoked automatically by Claude Code OR explicitly by you. Now let's explore **Agent Skills**—capabilities that are **ONLY autonomous**. You can't invoke them explicitly; Claude discovers and applies them automatically based on context.

**The key difference**: **Invocation control**.
- **Subagents**: You have control (both autonomous AND explicit)
- **Skills**: Pure automation (autonomous ONLY, no explicit invocation)

**When to use skills**: When you want Claude to be smarter by default without needing to remember to invoke capabilities.

---

## What Are Agent Skills?

**Definition**: An Agent Skill is a reusable capability that Claude Code discovers autonomously and applies when relevant. Skills are bundled with instructions (SKILL.md), reference materials, and supporting scripts.

**Key characteristic**: Skills are **discovered, not invoked**. You don't command Claude Code to use a skill; Claude Code decides based on context.

### Subagents vs. Skills: What's Actually Different?

Based on the official documentation, subagents and skills are similar in structure but have **two critical differences**:

**Similarity**: Both:
- Have YAML frontmatter (name, description, tools)
- Have markdown content (instructions)
- Live in `.claude/` directories
- Claude discovers them autonomously

**The TWO key differences: Context isolation + Invocation control**

| Feature | Subagents | Skills |
|---------|-----------|--------|
| **Context isolation** | ✅ Separate context window<br>✅ Separate transcript file (`agent-{id}.jsonl`)<br>Prevents main conversation pollution | ❌ Runs in main Claude Code context<br>❌ No separate transcript<br>Shares context with main conversation |
| **Autonomous invocation** | ✅ Claude decides when to use | ✅ Claude decides when to use |
| **Explicit invocation** | ✅ "Use the [name] subagent"<br>(Hard invocation - guaranteed) | ❌ No hard invocation<br>✅ **But you CAN guide by name**<br>"Use the [name] skill" (soft guidance) |
| **File structure** | `.claude/agents/name.md` | `.claude/skills/name/SKILL.md` |
| **Tool specification** | `tools:` (inherits all if omitted) | `allowed-tools:` (restricts if specified) |

**Official quote on context isolation**:
> "Each subagent operates in its own context, preventing pollution of the main conversation and keeping it focused on high-level objectives."

**Official quote on skill invocation**:
> "Skills are **model-invoked**—Claude autonomously decides when to use them based on your request and the Skill's description. This is different from slash commands, which are **user-invoked**."

**Important clarification**: While skills don't have *hard invocation* (no system-level trigger), **you CAN guide Claude by mentioning skill names**. This provides contextual guidance that makes Claude more likely to apply that skill.

**Example**:

```
You: "Review this code for quality issues"

With a code-review subagent:
- ✅ Hard invocation: "Use the code-review subagent" (guaranteed launch)
- ✅ Autonomous: Claude may invoke it automatically
- ✅ Runs in isolated context (separate transcript)
- ✅ Main conversation stays clean

With a code-review skill:
- ✅ Soft guidance: "Use the code-review skill" (guides Claude's decision)
- ✅ Autonomous: Claude may apply it automatically
- ❌ Runs in main context (shares transcript with main conversation)
- ❌ Adds to main conversation context

You can also ask: "What skills do you have?" and Claude will list all available skills.
Then say: "Use the code-review skill for this file" and Claude will likely apply it.
```

**The Practical Difference**:

**Hard invocation (subagents)**:
- "Use the test-runner subagent" → System launches it (guaranteed)
- Separate context, separate transcript
- Use when you need isolation and guaranteed execution

**Soft guidance (skills)**:
- "Use the code-review skill" → Claude likely applies it (contextual guidance)
- Same context, same transcript
- Use when you want lightweight capabilities without context overhead

**When to use skills over subagents**:
- When context isolation isn't important (small, focused tasks)
- When you want Claude to be smarter by default
- When you want to guide by name but don't need guaranteed invocation
- When you want minimal overhead (no separate context management)

**When to use subagents over skills**:
- When you need **guaranteed invocation** ("Use X subagent" must work)
- When you need **context isolation** (complex tasks that shouldn't clutter main conversation)
- When you want **separate transcripts** for specialized work
- When the task is complex enough to justify separate context overhead

---

## How Skills Work: The Three-Level Architecture

### Level 1: Metadata in System Prompt (Always Loaded)

When Claude Code starts, it loads a brief summary of every available skill:

```
Available Skills:
- pdf-skill: Extract and analyze tables, forms, and fields from PDF files
- code-review-skill: Autonomous code quality auditing with architectural insight
- compliance-checker: Validate financial calculations against regulatory requirements
```

This is **tiny**—3-4 lines per skill. Claude reads these summaries and thinks: *"If the user shows me a PDF, I should probably use the pdf-skill."*

**Why this works**: Claude learns WHEN to invoke skills without needing the full SKILL.md file loaded yet.

### Level 2: Full SKILL.md When Relevant (On-Demand)

When Claude decides a skill is relevant, it fetches the complete **SKILL.md file**—the full instructions:

```yaml
---
name: "pdf-skill"
description: "Extract tables, forms, and field values from PDF files"
---

# PDF Skill

## When to Use This Skill
- User uploads a PDF and asks to extract a table
- User wants form fields extracted and validated
- User asks about PDF content structure

## How to Use This Skill
1. Run: `scripts/pdf_extractor.py --input [path] --output [format]`
2. Validate extracted data matches expected structure
3. Return structured JSON with confidence scores
```

Now Claude has the **full context** needed to execute properly. But it only loads this when relevant.

**Why this works**: Full instructions don't clutter the system prompt; they're loaded on-demand.

### Level 3: Bundled Reference Files and Scripts (Complete Toolkit)

If the SKILL.md needs supporting files, Claude accesses them:

```
.claude/skills/pdf-skill/
├── SKILL.md                 # Main instructions
├── scripts/
│   └── pdf_extractor.py     # Python script for extraction
└── reference/
    └── pdf-standards.md     # Technical reference: PDF specs
```

When Claude executes the skill, it can reference the Python script or dive into technical specs if needed.

**Real Example: PDF Form Filling Skill**

```
Flow:
1. User: "Extract all form fields from this W-2 PDF"
2. Claude reads system prompt: "pdf-skill: Extract forms and fields"
3. Claude fetches SKILL.md: "Use pdf_extractor.py"
4. Claude runs: pdf_extractor.py --input w2.pdf --output json
5. Claude references pdf-standards.md to validate field names
6. Claude returns: {"ssn": "XXX-XX-XXXX", "income": 125000, ...}
```

---

## When Claude Code Invokes Skills Automatically

Claude Code doesn't use skills randomly. It recognizes specific patterns and applies skills only when relevant:

**Pattern 1: Content Type Recognition**
- You upload a PDF → pdf-skill automatically discovered
- You paste JSON → validation-skill automatically discovered
- You show HTML → parsing-skill automatically discovered

**Pattern 2: Task Request Recognition**
- "Review this code for quality" → code-review-skill
- "Check this for compliance issues" → compliance-checker-skill
- "Summarize this document" → document-analysis-skill

**Pattern 3: Explicit Request**
- "Use the code-review skill to check this function"

### How to Verify Skills Are Loaded

**Check what skills are available** in your Claude Code session:

```bash
claude skill list
```

**This shows**:
- Skill names and descriptions
- Status (enabled/disabled)
- Bundled scripts available

---

## Practical Example: Using the PDF Skill

Scenario: You have a PDF invoice and want to extract key fields.

### What You Do

1. Have the PDF ready (e.g., `invoice.pdf`)
2. In Claude Code, say:

```
Extract invoice details from invoice.pdf:
- Invoice number
- Date
- Total amount
- Payment due date
- Vendor name
```

### What Happens Internally

1. Claude reads system prompt summary: "pdf-skill available for PDF extraction"
2. Claude recognizes PDF content + extraction request
3. Claude fetches full SKILL.md with `pdf_extractor.py` instructions
4. Claude runs the Python script: `pdf_extractor.py --input invoice.pdf --output json`
5. Claude validates output matches PDF structure
6. Claude returns structured data with confidence scores

### What You See

```
Extracted Invoice Details:
- Invoice #: INV-2024-00531
- Date: November 13, 2024
- Total: $2,450.00
- Due: December 13, 2024
- Vendor: Tech Solutions Inc.

Confidence: 98% (all fields validated)
```

**You didn't type any commands.** The skill executed automatically because Claude recognized the context.

---

## Strategic Decision: When to Use Skills vs. Explicit Commands

**Use Skills When**:
- Task type is predictable and repeatable (PDF extraction, code review, validation)
- You want automatic application (no explicit invocation needed)
- Multiple similar tasks in a session (skill handles consistently)

**Use Subagents When**:
- Task is complex with many variables (subagent can handle context better)
- You want explicit control (tell subagent what to do)
- Task needs specialized context (subagent can load team standards)

**Use Main Conversation When**:
- One-off, exploratory work
- You're learning something new
- No specialized skill exists yet

---

## Reflection: Understanding Autonomous Discovery

Think about how skills differ from traditional commands:

- **Traditional command**: You know the command exists, type it explicitly (`pdf_extract --input file.pdf`)
- **Claude Code skill**: You describe what you want; Claude discovers the right skill and applies it

This shift—from "command what exists" to "describe what you want"—is fundamental to AI-native development.

**Pause and Reflect**:
- What's the difference between telling Claude Code to "use the pdf-skill" vs. just asking "extract data from this PDF"?
- Why doesn't Claude Code list all available skills in every response? (Hint: cognitive load)
- When might a skill apply even when you didn't ask for it explicitly?

---

## Try With AI

Use Claude Code for this activity (preferred). If you have another AI companion tool (ChatGPT, Gemini), you can use that instead.

### Prompt 1: Understanding Skill Discovery

```
Explain how Claude Code discovers skills automatically.
Use an analogy: it's like having a colleague who...
(a) Notices the type of work you're doing,
(b) Suggests the right tool without you asking,
(c) But doesn't interrupt with suggestions for irrelevant tasks.
Show 3 examples of tasks where Claude would discover a skill automatically.
```

**Expected outcome**: Clear explanation of autonomous skill discovery with realistic examples.

### Prompt 2: Skill Limitations and Safety

```
If skills apply automatically without explicit requests, what prevents misuse?
(a) How does Claude decide NOT to use a skill when it could?
(b) What if a skill causes unintended side effects?
(c) How would you disable a skill that you don't trust?
(d) Create a 'skill safety checklist' for evaluating whether a skill is trustworthy.
```

**Expected outcome**: Understanding of skill safety boundaries and verification procedures.

### Prompt 3: Designing Your Own Skill

```
Think about a repeated task in your work.
Design a skill that would automate it:
(a) What's the skill name and description?
(b) When would Claude Code discover it's relevant?
(c) What files and scripts would it bundle?
(d) How would you know when it's working correctly?
Example tasks: "Code review for Python files", "Extract data from CSVs", "Check for security vulnerabilities"
```

**Expected outcome**: Concrete skill design based on your actual work patterns.

### Prompt 4: Skill vs. Subagent Decision

```
You have two similar tasks:
Task 1: Review Python code for style and type hint issues (happens 5x per week)
Task 2: Audit a specific legacy module for technical debt (one-time, complex investigation)

For each task, should you build a Skill or a Subagent?
Explain your reasoning for each choice.
What's the tradeoff between convenience (automatic skills) and control (explicit subagents)?
```

**Expected outcome**: Clear decision framework for when to use skills vs. subagents based on task patterns.
