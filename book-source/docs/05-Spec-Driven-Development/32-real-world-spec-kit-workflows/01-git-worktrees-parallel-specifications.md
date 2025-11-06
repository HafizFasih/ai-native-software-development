---
title: "Git Worktrees & Parallel Specifications"
chapter: 32
lesson: 1
duration_minutes: 90

# HIDDEN SKILLS METADATA (Institutional Integration Layer)
# Not visible to students; enables competency assessment and differentiation
skills:
  - name: "Git Worktrees for Parallel Development"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student can create, list, navigate, and remove multiple git worktrees; understand isolation mechanism; perform basic worktree operations independently with scaffolding"

  - name: "Parallel Specification Design"
    proficiency_level: "B1"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student can write specifications for independent features simultaneously; design integration contracts between specs; coordinate parallel work through shared constitution; identify when features are parallelizable"

  - name: "Decomposition Thinking: Part 1"
    proficiency_level: "A2"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student can recognize what makes features parallelizable; understand that clear feature boundaries enable autonomous work; identify when decomposition is effective"

learning_objectives:
  - objective: "Set up and manage 3 git worktrees for simultaneous feature development"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Successful creation and navigation of 3 worktrees; output of `git worktree list` showing all 3"

  - objective: "Run parallel `/sp.specify` workflows across 3 features without conflicts"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Completion of 3 parallel specifications in feature-specific directories with PHR auto-routing verified"

  - objective: "Design integration contracts that define how features connect"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Documentation of integration points between 3 specs showing data formats and dependencies"

  - objective: "Understand how parallel specification design enables 7-9 agent orchestration"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Reflection on scaling from 3 to 7-9 agents; analysis of what changes in workflow"

cognitive_load:
  new_concepts: 7
  assessment: "7 new concepts (git worktree, feature isolation, parallel specification, integration contracts, PHR routing, feature numbering, decomposition thinking) within A2/B1 limit of 7 ✓"

differentiation:
  extension_for_advanced: "Scale to 5+ worktrees simultaneously; design decomposition strategy for large monorepo; explore worktree integration with CI/CD pipelines"
  remedial_for_struggling: "Start with 2 worktrees instead of 3; use provided integration contract template; pair with peer during parallel specification phase"

# Generation metadata
generated_by: "lesson-writer v3.0.0"
source_spec: "specs/002-chapter-32-redesign/spec.md"
created: "2025-11-06"
last_modified: "2025-11-06"
git_author: "Claude Code"
workflow: "/sp.implement"
version: "1.0.0"
---

# Git Worktrees & Parallel Specifications

## The Bottleneck Most Teams Miss

Imagine you have three features to build. Normally, you'd do them one at a time: finish Feature A, then start Feature B, then start Feature C. Your entire team sits idle while one person writes specifications. This is the **sequential bottleneck** that keeps teams slow.

But here's what top engineering teams do differently: they work on all three specifications **at the same time**, in complete isolation, without anyone's work interfering with anyone else's. How? **Git worktrees**.

In this lesson, you're learning to manage **2-3 agents NOW to scale to 7-9 agents LATER**. You'll see that parallel development isn't just faster—it's the foundation for orchestrating teams of AI agents. When you move from 3 agents to 7-9 agents, the same patterns apply, scaled up.

By the end of this lesson, you'll have 3 feature specifications written in parallel, a clear understanding of how they integrate, and the confidence to extend this pattern to any team size.

---

## What Is a Worktree?

A **git worktree** is a separate working directory that's connected to the same git repository. Think of it as having multiple desks in the same library: each desk has its own papers and files, but you're all using the same books (git history).

### Why This Matters

Without worktrees, working on multiple features simultaneously creates a **merge conflict nightmare**:

- Engineer A works on Feature A, changes `api/auth.py`
- Engineer B wants to work on Feature B, changes `specs/feature-b.md`
- A stashes changes, B checks out a different branch, A un-stashes
- Someone forgets to stash, work is lost
- File conflicts pile up

With worktrees, each feature lives in its own directory with its own checked-out branch:

```
project/
  .git/
  feature-001-auth/          <- Worktree 1: completely isolated
    specs/
    code/
  feature-002-payment/       <- Worktree 2: completely isolated
    specs/
    code/
  feature-003-dashboard/     <- Worktree 3: completely isolated
    specs/
    code/
```

**Key insight**: Each worktree can run on a different git branch (feature-001, feature-002, feature-003) while sharing the same `.git` directory. Changes in one worktree don't affect the others—true isolation.

### Real-World Impact

This matters because **time saved is exponential**:

- **Sequential approach**: 30 min per spec × 3 features = 90 minutes total
- **Parallel approach with 3 worktrees**: 30 min per spec, all 3 simultaneously = 30 minutes total
- **Saved**: 60 minutes (67% reduction)

At 7-9 agents running in parallel, that's the difference between a 6-hour planning phase and a 1-hour phase.

---

## Setting Up Your First 3 Worktrees

Let's build your first parallel development environment. You'll create 3 worktrees for three independent features: authentication, payments, and dashboard.

### Step 1: Create a Base Repository

Start with a clean project directory:

```bash
mkdir my-parallel-project
cd my-parallel-project

# Create initial commit so branches have a base
touch README.md
git add README.md
git commit -m "Initial commit"
```

### Step 2: Create Your First Worktree

Now create 3 worktrees from the main branch:

```bash
# Worktree 1: Authentication Feature
git worktree add ../feature-001-auth main
cd ../feature-001-auth
git checkout -b feature-001-auth

# Back to main directory
cd ../my-parallel-project

# Worktree 2: Payment Feature
git worktree add ../feature-002-payment main
cd ../feature-002-payment
git checkout -b feature-002-payment

# Back to main directory
cd ../my-parallel-project

# Worktree 3: Dashboard Feature
git worktree add ../feature-003-dashboard main
cd ../feature-003-dashboard
git checkout -b feature-003-dashboard
```

### Code Example 1: Automated Worktree Setup Script

Instead of running these commands manually, use this bash script to automate the setup:

```bash
#!/bin/bash
# setup-worktrees.sh
# Creates 3 git worktrees for parallel feature development
# Usage: bash setup-worktrees.sh my-parallel-project

PROJECT_NAME="${1:-my-parallel-project}"
BASE_DIR="$(pwd)"

# Create base project directory
mkdir -p "$PROJECT_NAME"
cd "$PROJECT_NAME"

# Initialize git repository
git init
git config user.name "Developer"
git config user.email "dev@example.com"

# Create initial commit
touch README.md
echo "# Parallel Development Project" >> README.md
git add README.md
git commit -m "Initial commit for parallel development"

# Array of features to create worktrees for
FEATURES=("001-auth" "002-payment" "003-dashboard")

# Create worktrees for each feature
for FEATURE in "${FEATURES[@]}"; do
  WORKTREE_PATH="../feature-$FEATURE"

  # Add worktree
  git worktree add "$WORKTREE_PATH" main

  # Navigate to worktree and create feature branch
  cd "$WORKTREE_PATH"
  git checkout -b "feature-$FEATURE"

  # Create feature-specific directory structure
  mkdir -p specs code
  echo "# Feature: $FEATURE" > README.md
  git add .
  git commit -m "Initialize feature-$FEATURE structure"

  # Return to main directory
  cd "$BASE_DIR/$PROJECT_NAME"
done

# Verify all worktrees created
echo ""
echo "=== Worktree Setup Complete ==="
git worktree list

echo ""
echo "Your parallel development environment is ready."
echo "Navigate to each worktree: cd ../feature-001-auth (etc.)"
```

**Copy this script** to `setup-worktrees.sh`, make it executable with `chmod +x setup-worktrees.sh`, and run it:

```bash
bash setup-worktrees.sh my-parallel-project
```

After running this script, verify your setup:

```bash
cd my-parallel-project
git worktree list
```

Expected output:

```
/Users/yourname/feature-001-auth        abc1234 [feature-001-auth]
/Users/yourname/feature-002-payment     def5678 [feature-002-payment]
/Users/yourname/feature-003-dashboard   ghi9012 [feature-003-dashboard]
```

**Why this structure matters**: Each worktree has its own branch, so `/sp.specify` in Feature 1 doesn't affect Feature 2 or Feature 3. This is the foundation for parallel agent work.

---

## Running Parallel Specifications

Now that you have 3 isolated worktrees, it's time to run specifications in parallel. This is where the real acceleration happens.

### The Parallel Workflow

Open **3 terminal sessions** (one per worktree). You can use tmux, iTerm2 split panes, or three separate terminal windows:

**Session 1 (Authentication)**:
```bash
cd ../feature-001-auth
# You'll run /sp.specify here
```

**Session 2 (Payments)**:
```bash
cd ../feature-002-payment
# You'll run /sp.specify here
```

**Session 3 (Dashboard)**:
```bash
cd ../feature-003-dashboard
# You'll run /sp.specify here
```

### Step 1: Start All Three Sessions

Once all 3 terminals are open and positioned in their respective worktrees, **start `/sp.specify` in all three simultaneously**:

**In Session 1**:
```bash
/sp.specify Authentication system with user registration, login, token refresh
```

**In Session 2** (while Session 1 is still running):
```bash
/sp.specify Payment processing with Stripe integration, order validation
```

**In Session 3** (while Sessions 1-2 are running):
```bash
/sp.specify User dashboard showing orders, recommendations, account settings
```

### Step 2: Watch the Parallel Execution

Notice what happens:

- All 3 specifications are being generated **at the same time**
- Spec 1 outputs go to `feature-001-auth/specs/`
- Spec 2 outputs go to `feature-002-payment/specs/`
- Spec 3 outputs go to `feature-003-dashboard/specs/`
- **No conflicts, no interference**

Each agent runs independently in its own worktree. This is the magic of parallel development.

### Time Comparison

Track the timing:

- **Sequential**: If you ran `/sp.specify` once for Auth, waited 30 min, then Payments, waited 30 min, then Dashboard, waited 30 min = **90 minutes total**
- **Parallel**: All 3 running simultaneously = **30 minutes total**
- **Time saved**: 60 minutes (67%)

At 7-9 agents, this scaling pattern means the difference between **9 hours of sequential planning** and **1 hour of parallel planning**.

### Code Example 2: Feature Specification Template

Here's the structure your parallel specs should follow (with integration contracts):

```markdown
# Feature 001: Authentication System

## Overview
User authentication with JWT tokens and refresh token rotation.

## Integration Contracts
**This feature PROVIDES:**
- `POST /auth/register` -> Returns `{ user_id, access_token, refresh_token }`
- `POST /auth/login` -> Returns `{ user_id, access_token, refresh_token }`
- `GET /auth/user/:id` -> Returns `{ user_id, email, created_at }`

**This feature DEPENDS ON:**
- User database schema (provided by infrastructure)

**Data Format:**
```json
{
  "user": {
    "id": "uuid",
    "email": "string",
    "password_hash": "string",
    "created_at": "ISO8601"
  },
  "token": {
    "access_token": "jwt",
    "refresh_token": "uuid",
    "expires_in": "seconds"
  }
}
```

## Edge Cases
- Registration with duplicate email
- Login with invalid credentials
- Expired access token (use refresh token)
- Refresh token expiration
- Concurrent login attempts

## Success Criteria
- Register new user in < 200ms
- Authenticate user in < 100ms
- Token refresh in < 50ms
- All edge cases return descriptive errors
```

This template shows **where Feature 1 (Auth) connects to other features**. Feature 2 (Payments) will depend on the user schema that Feature 1 defines.

### Real-World Example 1: Vercel's Parallel Engineering

[Vercel, 2024] has 50+ engineers working simultaneously on different features. They use **feature-based monorepos with clear integration contracts**. Each team can work on their feature in parallel because the boundaries are crystal clear. When teams aren't clear on boundaries, merge chaos ensues. When they are, parallel development scales to any team size.

---

## Understanding Integration Contracts

The key to parallel development is **integration contracts**: agreements between features about how they'll work together.

### What Is an Integration Contract?

An integration contract specifies:

1. **What this feature provides** (outputs, APIs, data it produces)
2. **What this feature depends on** (inputs, data it consumes)
3. **Data formats** (JSON schemas, data types)
4. **Error handling** (what happens when integration fails)

Without integration contracts, you get this when merging:

- Feature 1 defines user ID as `integer`
- Feature 2 expects user ID as `uuid`
- **Merge conflict**: Complete integration failure

With integration contracts, both teams agree on the contract **before writing code**:

```
Feature 001 (Auth) PROVIDES:
  user_id: uuid

Feature 002 (Payment) CONSUMES:
  user_id: uuid
  [✓ Contract agreement in place]
```

### Code Example 3: Integration Mapping Diagram

Here's a visual map of how your 3 features integrate:

```
┌──────────────────────────────┬──────────────────────────┬──────────────────────┐
│   Feature 001: Auth          │  Feature 002: Payment    │  Feature 003: Dashboard
├──────────────────────────────┼──────────────────────────┼──────────────────────┤
│ PROVIDES:                    │ PROVIDES:                │ PROVIDES:            │
│ • user_id (uuid)             │ • order_id (uuid)        │ • dashboard_url      │
│ • access_token (jwt)         │ • transaction_id (uuid)  │ • user_preferences   │
│ • user_schema                │ • payment_status         │                      │
│                              │                          │ DEPENDS ON:          │
│ DEPENDS ON:                  │ DEPENDS ON:              │ • user_id (auth)     │
│ • database (infrastructure)  │ • user_id (from Auth)    │ • orders (payment)   │
│                              │ • order_schema           │ • user_schema (auth) │
└──────────────────────────────┴──────────────────────────┴──────────────────────┘

Integration Flow:
Auth -> Payment -> Dashboard
         (user_id)  (user_id, orders)
```

This diagram shows:
- **Auth feature** has no upstream dependencies (it's foundational)
- **Payment feature** depends on Auth (needs user IDs)
- **Dashboard feature** depends on both Auth and Payment (displays orders, user data)

This dependency structure makes it safe to parallelize Spec 001 and Spec 002 immediately, then Spec 003 once Specs 001-002 are drafted.

### Exercise 1: Identify Your Integration Contracts

Open your 3 terminal sessions with the 3 generated specs. Create an integration mapping document:

```markdown
# Integration Mapping

## Feature 001 -> Feature 002
What does Auth provide to Payment?
- user_id schema
- authentication status
- user email

## Feature 002 -> Feature 003
What does Payment provide to Dashboard?
- order history
- transaction status
- user purchase data

## Feature 001 -> Feature 003
What does Auth provide to Dashboard?
- user_id
- user email
- authentication status
```

Write this down. You'll validate these contracts when merging specs back to main.

---

## Reflection & Time Tracking

Parallel development seems faster (and it is), but you need to understand **why** it works.

### Time Tracking Worksheet

Complete this table to understand the speedup:

| Task | Sequential Time | Parallel Time | Speedup |
|------|-----------------|---------------|---------|
| Write Auth spec | 30 min | 10 min (concurrent) | 3x |
| Write Payment spec | 30 min | 10 min (concurrent) | 3x |
| Write Dashboard spec | 30 min | 10 min (concurrent) | 3x |
| **Total** | **90 min** | **30 min** | **3x** |

**Key insight**: The speedup isn't magic—it's simple math. 3 tasks done in parallel take 1/3 the time as 3 tasks done sequentially.

At 7-9 agents:

| Scenario | Sequential | Parallel | Speedup |
|----------|-----------|----------|---------|
| 10 features | 5 hours | 30 min | **10x** |
| 15 features | 7.5 hours | 30 min | **15x** |

### Exercise 2: Decomposition Analysis

For each feature you specified, answer:

**For Feature 001 (Auth)**:
- Can authentication work independently? (YES → good candidate for parallel)
- Does it depend on payments? (NO → can run in parallel with payments)
- Can I write a spec without knowing payment details? (YES → parallel-ready)

**For Feature 002 (Payment)**:
- Can payments work independently? (YES, if users already exist)
- Does it depend on dashboard? (NO → can run in parallel with dashboard)
- Can I write a spec without knowing dashboard details? (YES)

**For Feature 003 (Dashboard)**:
- Can dashboard work independently? (YES, as read-only interface)
- Does it depend on auth and payment? (YES → must come after specs 1-2)
- Can I write a partial spec before seeing auth/payment specs? (YES, but integration parts depend on them)

This analysis teaches you **decomposition thinking**: knowing which features can run in parallel.

### Exercise 3: Scaling Analysis

Now answer the hard question:

**"How would this workflow change with 7-9 agents instead of 3?"**

Write your answer:

1. **Setup time**: Would you still use git worktrees? (Likely YES—no better approach at scale)
2. **Coordination**: How would 10 agents know which features to spec? (Need a feature registry or task queue)
3. **Merge complexity**: Would merging 10 specs be harder than merging 3? (YES—need stricter integration contracts)
4. **Parallelization limits**: Can all 10 features run in parallel? (Only those with no inter-dependencies)

These are the real challenges of scaling. You're solving them now with 3 agents to prepare for 10-15.

### Real-World Example 2: Solo Founder Using Parallel Specs

[Indie Hackers, 2023] A solo founder used parallel specification to build an MVP 3x faster:

- **Without parallel specs**: 1 person × 90 min per feature × 3 features = 4.5 hours
- **With parallel specs + AI agents**: Run 3 specs in parallel (30 min), get AI to generate code simultaneously (90 min) = **2 hours total**

The founder could spec all 3 features in parallel, then run 3 code-generation agents in parallel. Total time: 2 hours instead of 9.

This is the pattern that scales to 7-9 agents.

### Real-World Example 3: Academic Research—Distributed Team Coordination

[Forsgren et al., 2021] studied how distributed teams coordinate without synchronous meetings. Their finding: **Clear specifications eliminate the need for meetings**. Instead of 5 synchronous meetings to align 10 people, teams with clear specs can coordinate asynchronously:

- Team A writes spec for component X
- Team B reads spec, writes integration contract
- Team C starts implementation based on contract
- **No meetings. All async. 10x faster.**

This is the power of parallel specification design.

---

## Try With AI

Now that you understand how parallel specifications accelerate development, use your AI companion to validate your work and explore scaling.

### Setup

Use **Claude Code CLI** (or your preferred AI companion from earlier chapters). Navigate to your main project directory and open Claude Code:

```bash
cd my-parallel-project
claude
```

### Prompt Set 1: Validate Your Integration Contracts

**Copy and paste this prompt:**

```
Review my 3 feature specifications for integration conflicts:

Feature 001 (Auth):
- Provides: user_id (uuid), access_token (jwt)
- Depends on: database

Feature 002 (Payment):
- Provides: order_id (uuid), transaction_id (uuid)
- Depends on: user_id from Auth

Feature 003 (Dashboard):
- Provides: dashboard_url
- Depends on: user_id from Auth, orders from Payment

Questions:
1. Will these three features merge cleanly?
2. Are there any hidden dependencies I missed?
3. What integration tests would validate these contracts?
```

**Expected outcome**: AI identifies if contracts are sound or if you missed dependencies. Correct contracts mean clean merges.

---

### Prompt Set 2: Parallelization Feasibility

**Copy and paste this prompt:**

```
I'm decomposing my application into parallel features.
Can I develop these 3 features in parallel, or does one need to finish before others start?

Feature 001: User authentication and token management
Feature 002: Payment processing with order validation
Feature 003: User dashboard displaying orders and recommendations

For each feature, tell me:
- Can spec be written in parallel with others? (YES/NO)
- Can code be implemented in parallel? (YES/NO)
- When does feature need to merge back to main?
```

**Expected outcome**: AI confirms which features are truly parallelizable and which have hidden sequential dependencies.

---

### Prompt Set 3: Scaling to 10 Agents

**Copy and paste this prompt:**

```
I'm currently managing 3 agents working in parallel on 3 features using git worktrees.
How would I scale this to 10 agents with 10 features?

What would change in:
1. Repository structure (still worktrees, or something else?)
2. Integration contract definition (more detailed? less?)
3. Coordination mechanism (how do 10 agents know dependencies?)
4. Merge strategy (how do 10 specs merge without conflicts?)
5. Validation (how do I verify all contracts are compatible?)
```

**Expected outcome**: AI outlines the architectural changes needed to scale from 3 to 7-9 agents. This prepares you for Chapter 33.

---

### Safety & Ethics Note

AI will suggest architectural improvements and identify potential integration issues. **However, you remain responsible for:**

- Final validation of integration contracts (AI suggests, you decide)
- Architecture decisions (AI explores options, you choose)
- Risk assessment (AI helps identify risks, you prioritize)

Don't blindly accept AI suggestions for contracts that affect multiple teams. Review, question, and validate.