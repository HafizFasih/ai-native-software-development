---
sidebar_position: 6
title: Custom Slash Commands
---

# Custom Slash Commands

**Duration**: 16-18 minutes

So far, you've used Gemini CLI's **built-in commands** like `/help`, `/tools`, and `/clear`. But what if you could create your own commands?

Custom slash commands are **reusable prompts** that encapsulate your team's workflows. Instead of typing the same 200-word prompt every time, you type `/code-review src/main.py`. This lesson shows you how.

---

## Part 1: Why Custom Commands Matter

### The Problem: Repetition

You need to review code every day. Your review prompt is always:

```
Review this code for:
1. Security vulnerabilities
2. Performance issues
3. Code style consistency with our team standards
4. Testability and maintainability

If you find issues, categorize by severity (critical/warning/info).
```

Typing this every day is tedious. Copy-pasting it works but is error-prone.

### The Solution: Custom Commands

Create a file called `review.toml` in `~/.gemini/commands/`:

```toml
description = "Review code for security, performance, and style"
prompt = """
Review this code for:
1. Security vulnerabilities
2. Performance issues
3. Code style consistency
4. Testability

Categorize findings by severity (critical/warning/info).
"""
```

Now instead of typing the prompt, you type:

```
/review src/main.py
```

Gemini CLI automatically:
1. Reads the file
2. Inserts `src/main.py` into the prompt
3. Sends it to Gemini

### Team Standardization

When your team creates custom commands, everyone uses the same prompts. Code reviews are consistent. Planning sessions follow the same framework. Refactoring uses the same checklist.

Commands become **team codified knowledge**.

---

## Part 2: TOML File Structure and Syntax

Custom commands are written in **TOML** format (a simple, readable configuration language).

### Required Fields

Every custom command needs two fields:

```toml
description = "Brief description of what this command does"
prompt = """
The actual prompt sent to Gemini.
Can be multi-line.
"""
```

The `description` appears when someone types `/help` and looks for your command.

### Optional Fields

You can customize behavior:

```toml
description = "Code review assistant"
prompt = "Review this code: {{args}}"
model = "gemini-2.5-pro"        # Override default model
temperature = 0.7                 # Control creativity (0=deterministic, 1=creative)
systemInstruction = "You are a security expert reviewing code for vulnerabilities"
```

### File Naming Rules

- Filename becomes the command name
- Underscores become hyphens in command names
- Example: `code_review.toml` → `/code_review` or `/code-review`

### Minimal Example

**File**: `~/.gemini/commands/explain.toml`

```toml
description = "Explain a concept in simple terms"
prompt = "Explain {{args}} in simple terms a 5th grader could understand"
```

**Usage**:
```
/explain quantum computing
```

**Result**: Gemini explains quantum computing at a 5th-grade level.

---

## Part 3: Injection Patterns

The real power comes from **injection patterns**—ways to insert dynamic content into your prompt.

### Pattern 1: Argument Injection (`{{args}}`)

The `{{args}}` placeholder gets replaced with whatever you type after the command.

**Example**:
```toml
description = "Review code file for issues"
prompt = "Review this code and suggest improvements:\n{{args}}"
```

**Usage**:
```
/review src/main.py
```

Becomes:
```
Review this code and suggest improvements:
src/main.py
```

But wait—how does Gemini see the **contents** of `src/main.py`? That's where the next pattern helps.

### Pattern 2: Shell Command Injection (`!{command}`)

The `!{command}` placeholder executes a shell command and injects the output.

**Example**:
```toml
description = "Summarize recent commits"
prompt = """
Summarize these recent commits and identify patterns:

!{git log --oneline -10}

What areas of the codebase are getting the most attention?
"""
```

**Execution**:
1. Runs `git log --oneline -10`
2. Injects the output into the prompt
3. Sends to Gemini

**Output** (what Gemini sees):
```
Summarize these recent commits and identify patterns:

abc1234 Fix authentication bug
def5678 Refactor database queries
ghi9012 Add user profile page
jkl3456 Update dependencies
... (10 commits total)

What areas of the codebase are getting the most attention?
```

### Pattern 3: File Content Injection (`@{filepath}`)

The `@{filepath}` placeholder reads a file and injects its contents.

**Example**:
```toml
description = "Review code against project standards"
prompt = """
Review this code:
@{src/main.py}

Against our team standards:
@{CODING_STANDARDS.md}

Any violations?
"""
```

**Execution**:
1. Reads `src/main.py` and injects content
2. Reads `CODING_STANDARDS.md` and injects content
3. Sends combined prompt to Gemini

This is powerful for keeping prompts in sync with your actual code and standards.

### Pattern 4: Combining All Three

Here's a real-world example using all three injection patterns:

**File**: `~/.gemini/commands/git/commit-message.toml`

```toml
description = "Generate semantic commit message from git diff"
prompt = """
Generate a semantic commit message for these changes:

Staged files:
!{git diff --cached --name-only}

Changes:
!{git diff --cached}

Project conventions:
@{CONTRIBUTING.md}

Focus area: {{args}}

Format: <type>(<scope>): <description>
Examples: feat(auth): Add OAuth support
"""
```

**Usage**:
```
/git:commit "authentication improvements"
```

**What Happens**:
1. `{{args}}` → "authentication improvements"
2. `!{git diff --cached --name-only}` → Lists changed files
3. `!{git diff --cached}` → Shows actual diff
4. `@{CONTRIBUTING.md}` → Reads project guidelines
5. Combined prompt goes to Gemini
6. Gemini returns properly formatted commit message

You never typed the diff or read the guidelines—the command handles it.

---

## Part 4: Namespacing and Organization

As your command library grows, you need organization.

### Directory Structure Maps to Namespaces

```
~/.gemini/commands/
├── plan.toml              → /plan
├── review.toml            → /review
├── git/
│   ├── commit.toml        → /git:commit
│   ├── log.toml           → /git:log
│   └── status.toml        → /git:status
├── deploy/
│   ├── staging.toml       → /deploy:staging
│   ├── production.toml    → /deploy:production
│   └── rollback.toml      → /deploy:rollback
└── team/
    └── backend/
        ├── deploy.toml    → /team:backend:deploy
        └── test.toml      → /team:backend:test
```

**Rule**: Directory name becomes namespace. Colons separate namespace levels.

### Best Practices

1. **Group by category**: All git-related commands in `git/`, all deploy commands in `deploy/`
2. **Use namespaces for teams**: `/team:frontend:test`, `/team:backend:deploy`
3. **Global vs Project**:
   - `~/.gemini/commands/` - Personal commands (apply everywhere)
   - `.gemini/commands/` in project root - Project-specific commands
4. **Share with team**: Commit `.gemini/commands/` to version control so everyone benefits

### Project-Level Commands

Create `.gemini/commands/` in your project root for team-specific workflows:

```
my-project/
├── .gemini/
│   └── commands/
│       ├── dev/
│       │   ├── setup.toml      → /dev:setup
│       │   ├── test.toml       → /dev:test
│       │   └── debug.toml      → /dev:debug
│       └── deploy/
│           ├── staging.toml    → /deploy:staging
│           └── prod.toml       → /deploy:prod
```

When developers clone your repo, they get these commands automatically. `/dev:setup` runs your project's specific setup procedure.

---

## Red Flags to Watch

### "Command not found: /review"
- Check file location:
  - `~/.gemini/commands/review.toml` (global)
  - `.gemini/commands/review.toml` (project, if in project root)
- Filename must match exactly (case-sensitive on Linux/Mac, not on Windows)
- Gemini CLI may need restart after adding commands

### "Variable not defined: {{args}}"
- You used `{{args}}` but didn't provide arguments
- Example that fails: `/review` (no file provided)
- Correct: `/review src/main.py`

### "Injection failed: File not found"
- Your `@{filepath}` references a file that doesn't exist
- Check path is correct (relative to current directory or use absolute path)
- Example: `@{STANDARDS.md}` won't work if file is `docs/STANDARDS.md`

### TOML syntax error
- Common mistake: Forgetting quotes around string values
- ✅ Correct: `description = "Review code"`
- ❌ Wrong: `description = Review code`
- Wrong: Trailing commas in multi-line strings

---

## Try With AI

### Prompt 1: Creating Your First Custom Command
```
Help me create a custom Gemini CLI command called /code-review
that takes a file as argument and reviews it for:
1. Security vulnerabilities
2. Performance issues
3. Code style

Show me:
1. The exact TOML file content
2. Where to save it
3. How to use it
4. What output to expect
```

**Expected outcome**: Ready-to-use TOML file you can create.

### Prompt 2: Using All Injection Patterns
```
I want to create a command that:
1. Takes a commit message as argument ({{args}})
2. Gets the current git status (!{git status})
3. Reads my team's commit guidelines (@{CONTRIBUTING.md})
4. Uses all three injection patterns to verify my commit message is valid

Write the TOML file.
```

**Expected outcome**: Advanced command using all three injection patterns.

### Prompt 3: Project Team Commands
```
My team is [describe: 5 developers / Django project / feature-driven].
Design a set of custom commands using /namespace:command structure that would:
1. Standardize our code review process
2. Automate our deployment checks
3. Help with pull request descriptions
4. Reduce repetitive typing

Show me the directory structure and 3-4 example TOML files.
```

**Expected outcome**: Team command structure aligned to your workflow.

### Prompt 4: Debugging Command Issues
```
I created this custom command but it's not working:

[show your TOML file]

When I run [your command usage], I get this error: [your error message]

Debug this for me. What's wrong? How do I fix it?
```

**Expected outcome**: Specific debugging steps based on your error.

---

## Summary

Custom slash commands let you **codify repetitive workflows** into reusable, shareable commands.

**Three injection patterns**:
1. `{{args}}` - Replace with command arguments
2. `!{command}` - Execute shell command, inject output
3. `@{filepath}` - Read file, inject contents

**Organization**:
- Global commands: `~/.gemini/commands/`
- Project commands: `.gemini/commands/` (in project root)
- Namespacing: Directories create namespaces (`git/commit.toml` → `/git:commit`)

**Benefits**:
- Reduce repetition (type less, accomplish more)
- Team standardization (everyone uses same commands)
- Automation (commands can combine multiple inputs)
- Version control (commit commands to repo, share with team)

---

## Next Lesson

**Lesson 7: MCP Servers & Integration** teaches you how to connect Gemini CLI to external tools and databases using the Model Context Protocol, building on configuration skills from Lesson 4.
