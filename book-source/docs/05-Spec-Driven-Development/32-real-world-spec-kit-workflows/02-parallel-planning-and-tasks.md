---
title: "Parallel Planning and Tasks: Managing 2-3 Agents Simultaneously"
chapter: 32
lesson: 2
duration_minutes: 90

# HIDDEN SKILLS METADATA (Institutional Integration Layer)
# Not visible to students; enables competency assessment and differentiation
skills:
  - name: "Multi-Session Project Management"
    proficiency_level: "B1"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student can monitor 3 simultaneous planning/task-generation sessions; handle state across multiple contexts; coordinate without blocking"

  - name: "Decomposition Thinking: Part 2"
    proficiency_level: "B1"
    category: "Conceptual"
    bloom_level: "Analyze"
    digcomp_area: "Information Literacy"
    measurable_at_this_level: "Student can evaluate decomposition quality by analyzing plan complexity; recognize good vs bad decomposition through plan artifacts"

  - name: "Constitution as Shared Contract"
    proficiency_level: "A2"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Communication & Collaboration"
    measurable_at_this_level: "Student understands how shared constitution prevents quality drift across parallel work; explains why parallel execution is safe with constitutional alignment"

learning_objectives:
  - objective: "Run `/sp.plan` and `/sp.tasks` simultaneously across 3 worktrees, observing time savings"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Complete parallel planning/tasks exercise; document time tracking"

  - objective: "Evaluate plan quality as a decomposition indicator"
    proficiency_level: "B1"
    bloom_level: "Analyze"
    assessment_method: "Compare 3 plans; identify indicators of good vs bad decomposition"

  - objective: "Understand how shared constitution enables parallel execution without synchronous meetings"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Reflection on alignment and quality consistency across parallel sessions"

cognitive_load:
  new_concepts: 7
  assessment: "7 new concepts (parallel planning, plan quality indicators, terminal multiplexing, dependency analysis, integration risks, time tracking, constitutional alignment) within B1 limit of 10 ✓"

differentiation:
  extension_for_advanced: "Design terminal management for 10 parallel sessions; analyze scaling challenges of parallel decomposition"
  remedial_for_struggling: "Start with 2 worktrees instead of 3; use pre-configured tmux session; focus on time tracking and observation before independence"

# Generation metadata
generated_by: "lesson-writer v3.0.0"
source_spec: "specs/002-chapter-32-redesign/spec.md"
created: "2025-11-06"
last_modified: "2025-11-06"
git_author: "Claude Code"
workflow: "/sp.implement"
version: "1.0.0"
---

# Parallel Planning and Tasks: Managing 2-3 Agents Simultaneously

In Lesson 1, you set up 3 independent specifications in separate worktrees. Now comes the power move: **running planning and task generation in parallel**. You're learning to manage 2-3 agents' planning simultaneously—a skill that becomes essential when scaling to 10-15 parallel agent workflows.

The key insight? With a shared constitution, all 3 planning sessions will maintain consistent quality *without* needing synchronized meetings. Time that would have been spent in coordination gets spent on actual planning. This lesson teaches you to orchestrate parallelization safely and measure its value.

## Review: Your 3 Specs & Integration Contracts

Before running anything in parallel, let's solidify what you built in Lesson 1. You created three specifications:

- **feature-001-auth**: User authentication and identity management
- **feature-002-payment**: Payment processing and billing
- **feature-003-dashboard**: Analytics dashboard and reporting

Each spec is **independent** yet **interdependent**. For example:

- feature-002 (payment) depends on user identity from feature-001 (auth)
- feature-003 (dashboard) needs transaction data from feature-002
- All three depend on the shared constitution for standards

This is a **realistic decomposition**. Real systems don't have perfectly isolated components. The question is: *how well did you identify these dependencies in your specifications?*

Let's visualize it:

```
┌─────────────┐
│  feature-001│
│    (auth)   │
└──────┬──────┘
       │ provides: user identity
       │
       ▼
┌─────────────────┐
│  feature-002    │
│   (payment)     │
└──────┬──────────┘
       │ provides: transaction data
       │
       ▼
┌─────────────────┐
│  feature-003    │
│   (dashboard)   │
└─────────────────┘
```

The shared constitution (with standards for API contracts, data models, error handling) is the **glue** that keeps all three aligned without constant synchronization. This is what enables parallelization.

**Pause and Reflect**: Look at your three specifications. Can you identify:
1. Where each feature depends on another?
2. What API contracts must be honored between features?
3. Where the shared constitution prevents misalignment?

## Running Parallel Planning

Now you're ready to run three planning sessions simultaneously. This is where time savings become dramatic.

### The Sequential Baseline

If you ran these sequentially, the timeline looks like:

```
Phase 1: Plan feature-001 (auth)        20 minutes
Phase 2: Plan feature-002 (payment)     20 minutes
Phase 3: Plan feature-003 (dashboard)   20 minutes
─────────────────────────────────────────────────
Total:                                   60 minutes
```

### The Parallel Reality

Running all three simultaneously:

```
Time:   0m                              20m
        │                               │
Session1│ Plan feature-001 (auth) ──────┤
Session2│ Plan feature-002 (payment) ───┤
Session3│ Plan feature-003 (dashboard) ─┤
        │                               │
─────────────────────────────────────────────────
Total:                                 20 minutes
(instead of 60)
```

You save 40 minutes—not because planning is faster, but because time is no longer sequential.

### How to Execute

You need three terminals, each in a different worktree. The easiest way is to use **tmux** (terminal multiplexer) if you're on macOS/Linux, or **iTerm2 split panes** on macOS.

Here's a bash script to set up a 3-pane tmux layout:

```bash
#!/bin/bash
# setup-parallel-planning.sh
# Creates a tmux session with 3 panes for parallel planning

set -e

SESSION_NAME="parallel-planning"
BASE_DIR=$(pwd)

# Kill any existing session
tmux kill-session -t "$SESSION_NAME" 2>/dev/null || true

# Create new session (creates first pane)
tmux new-session -d -s "$SESSION_NAME" -x 250 -y 50

# Split horizontally to create second pane
tmux split-window -h -t "$SESSION_NAME:0"

# Split the right pane vertically to create third pane
tmux split-window -v -t "$SESSION_NAME:0.1"

# Navigate to each worktree and label the pane
tmux send-keys -t "$SESSION_NAME:0.0" "cd $BASE_DIR/feature-001-auth && pwd" Enter
tmux send-keys -t "$SESSION_NAME:0.0" "echo 'Session 1: feature-001 (auth)'" Enter

tmux send-keys -t "$SESSION_NAME:0.1" "cd $BASE_DIR/feature-002-payment && pwd" Enter
tmux send-keys -t "$SESSION_NAME:0.1" "echo 'Session 2: feature-002 (payment)'" Enter

tmux send-keys -t "$SESSION_NAME:0.2" "cd $BASE_DIR/feature-003-dashboard && pwd" Enter
tmux send-keys -t "$SESSION_NAME:0.2" "echo 'Session 3: feature-003 (dashboard)'" Enter

# Attach to session
tmux attach-session -t "$SESSION_NAME"
```

**How it works:**

1. **`tmux new-session`** creates the first pane (Session 1)
2. **First `split-window -h`** splits horizontally, creating Session 2 on the right
3. **Second `split-window -v`** splits the right pane vertically, creating Session 3
4. **`send-keys`** navigates each pane to its worktree and displays a label
5. **`attach-session`** connects you to the session so you can interact with all panes

To use this script:

```bash
chmod +x setup-parallel-planning.sh
./setup-parallel-planning.sh
```

Now you have one terminal window showing three panes side-by-side (or arranged in your preferred layout). Each pane is in a different worktree.

### Running the Commands

With your tmux session open, you can now run `/sp.plan` in each pane simultaneously. Here's the workflow:

**In Pane 1 (feature-001-auth):**
```bash
/sp.plan
```

**In Pane 2 (feature-002-payment):**
```bash
/sp.plan
```

**In Pane 3 (feature-003-dashboard):**
```bash
/sp.plan
```

Do this quickly, one after the other. Because the commands are non-blocking (they're running subagents in the background), all three will execute in parallel. After about 20 minutes, all three will complete.

**Key Observation**: Notice that you're not coordinating these sessions. You're not waiting for feature-001's plan to complete before planning feature-002. The shared constitution ensures that both agents will make aligned decisions—because they're both following the same standards, the same definition of "good", the same API contract patterns.

This is the **first proof** that decomposition works: if your specifications truly are independent, planning them in parallel will not produce conflicts. If they *do* conflict later, it means your decomposition had hidden dependencies.

## Evaluating Plan Quality as a Decomposition Indicator

After 20 minutes, you have 3 plans. The real skill is reading what they tell you about your decomposition quality.

### The Rubric: Good vs Bad Decomposition

Compare your three plans using this rubric:

| Quality Indicator | Good Decomposition | Bad Decomposition |
|-------------------|-------------------|-------------------|
| **Plan length** | 2-4 pages per feature | &lt;1 page (underspecified) OR 10+ pages (too complex) |
| **Complexity** | Balanced across features | One feature much larger than others |
| **Tasks count** | 10-20 specific tasks per feature | &lt;5 tasks (vague) OR 50+ tasks (too granular) |
| **Dependencies** | Explicitly listed; minimal cross-feature | Circular, unclear, or many implicit dependencies |
| **Integration points** | Clearly marked (e.g., "Depends on User ID from feature-001") | Buried in text; hard to identify |

### Example: Evaluating Your Three Plans

Let's say your three plans came back with these metrics:

```
feature-001 (auth):
  - Length: 2.5 pages ✓
  - Tasks: 12 ✓
  - Dependencies: 0 (foundational) ✓
  → Good

feature-002 (payment):
  - Length: 2.8 pages ✓
  - Tasks: 15 ✓
  - Dependencies: 2 (depends on User ID, Transaction ID format) ✓
  → Good

feature-003 (dashboard):
  - Length: 12 pages ✗
  - Tasks: 45 ✗
  - Dependencies: 8 (depends on data from both feature-001 and feature-002) ✗
  → Bad
```

What does this tell you? **The dashboard decomposition was too ambitious.** It should have been split into:

- feature-003a: Basic dashboard (transaction list, user stats)
- feature-003b: Advanced analytics (trends, predictions)

A plan that's 12 pages signals that the decomposition was poor. At 7-9 agent scale, bad decomposition becomes unmanageable. Imagine trying to run 15 planning sessions where half of them result in 12-page complexity avalanches. You'd spend more time coordinating across complex dependencies than you saved through parallelization.

### Reading Plan Quality as a Signal

Use these rules of thumb:

- **Balanced complexity** (plans within 1-2 pages of each other) = Good decomposition
- **One plan is 3-4x larger** than others = Hidden complexity; refactor
- **More than 3-4 cross-feature dependencies per plan** = Too interconnected; redivide
- **Explicit integration contracts** (e.g., "Expects JSON payload with user_id from feature-001") = Good
- **Vague integration** (e.g., "Will work with auth system") = Bad; go back to spec

**Exercise 3: Evaluate Your Plans**

1. Open all three plans side-by-side
2. For each plan, measure:
   - Length (page count or line count)
   - Number of distinct tasks
   - Number of cross-feature dependencies
3. Calculate the ratio: is the largest plan >2x the smallest?
4. List all integration points explicitly
5. Document: Does this decomposition match "good" or "bad" indicators?

If you find bad indicators, note them—you'll likely need to refactor your decomposition before moving to implementation.

## Running Parallel Task Generation

Once you're confident in your plan quality, it's time to generate tasks in parallel.

### Why Tasks in Parallel Matter

Tasks are the tactical specification—the actual, testable checklist of work. Running tasks in parallel matters because:

1. **Speed**: Generate all task lists in ~20 minutes instead of 60
2. **Validation**: Sees if feature interdependencies show up in the task lists
3. **Granularity**: Ensures tasks are at the right size (not too big, not too small)

### The Process

In your tmux session, you still have the three panes open. Now run:

**In Pane 1 (feature-001-auth):**
```bash
/sp.tasks
```

**In Pane 2 (feature-002-payment):**
```bash
/sp.tasks
```

**In Pane 3 (feature-003-dashboard):**
```bash
/sp.tasks
```

Again, fire these off quickly. All three will run in parallel. After ~20 minutes, you'll have complete task lists for all three features.

### What to Expect

When tasks are generated from good plans, they should:

- Be specific (each task has a clear acceptance criterion)
- Reference other features only at explicit integration points
- Be completable without constant cross-team communication
- Vary in complexity but cluster around a consistent size (most tasks take 1-4 hours)

If your task lists are messy (tasks that depend on "waiting for feature-002 to finish" scattered throughout feature-001), that's a sign your decomposition needs work.

### Monitoring Multiple Sessions

Here's where terminal management becomes important. With three planning sessions running, you need to track:

1. Which session finished first?
2. Did any session error out?
3. Are all three progressing at similar speed?

Rather than jumping between panes constantly, use a monitoring script to check status.

## Terminal Management Best Practices

Managing 3 parallel sessions is manageable. Managing 10 is chaos without good practices.

### tmux: The Power User Approach

If you're on macOS/Linux, tmux is the standard tool for multiplexing terminals. Here's a terminal management script that organizes everything:

```bash
#!/bin/bash
# parallel-session-monitor.sh
# Monitors 3 parallel planning/task sessions

SESSIONS=("parallel-planning")
SESSION="parallel-planning"
PANE_COUNT=3

echo "=== Parallel Session Monitor ==="
echo "Session: $SESSION"
echo ""

# Check if session exists
if ! tmux has-session -t "$SESSION" 2>/dev/null; then
    echo "ERROR: Session $SESSION not found"
    exit 1
fi

# Monitor each pane
for i in $(seq 0 $((PANE_COUNT-1))); do
    echo "─────────────────────────────────"
    echo "Pane $i Status:"

    # Get pane details
    tmux capture-pane -t "$SESSION:0.$i" -p | tail -5
    echo ""
done

echo "─────────────────────────────────"
echo "Tip: Press 'q' to exit this view"
echo "Use tmux shortcuts to navigate:"
echo "  Ctrl+B (or your prefix key) then:"
echo "  - Arrow keys to move between panes"
echo "  - [ to enter copy mode"
echo "  - z to zoom a pane"
```

Save this as `monitor-sessions.sh`, then run it periodically to check status without manually jumping between panes.

### iTerm2: The macOS Alternative

If you prefer iTerm2 (macOS), use split panes instead of tmux:

1. Open iTerm2
2. Create 3 tabs, or use split panes:
   - Cmd+D: Split pane vertically
   - Cmd+Shift+D: Split pane horizontally
3. Navigate each pane to a different worktree
4. Run commands simultaneously

While less powerful than tmux, iTerm2 splits are faster to set up and don't require learning tmux shortcuts.

### Naming Conventions: Clarity at Scale

Whether using tmux or iTerm2, label your sessions clearly. Use a naming convention like:

```
Session: dev-2024-11-auth
  Pane 1: feature-001-auth-planning
  Pane 2: feature-002-payment-planning
  Pane 3: feature-003-dashboard-planning
```

This prevents the confusion that comes with 10-15 parallel sessions where you accidentally run `/sp.tasks` in the wrong pane.

**Exercise 1: Set Up Your Terminal Layout**

1. Run the `setup-parallel-planning.sh` script to create a 3-pane tmux session
2. Verify all three panes are in the correct worktrees (use `pwd` in each)
3. Test switching between panes using tmux shortcuts (Ctrl+B + arrow keys)
4. Take a screenshot showing all three panes labeled and ready

## Reflection: Parallelization Value

Now that you've experienced parallel planning, let's quantify the value and think about scaling.

### Time Tracking Exercise

Document your actual time in this exercise:

```
Sequential baseline (estimated): 60 minutes
  - Plan feature-001: 20 min
  - Plan feature-002: 20 min
  - Plan feature-003: 20 min

Parallel execution (actual): _____ minutes
  - Start time: _____
  - All three complete: _____
  - Elapsed: _____

Time saved: _____ minutes
Efficiency gain: Sequential / Parallel = _____ x

Sequential baseline (tasks): 60 minutes
Parallel execution (tasks): _____ minutes
Total time saved across plan + tasks: _____ minutes
```

Most teams see 2-2.5x speedup. If you're seeing less, check:

1. Are all three panes actually running simultaneously, or did you run them sequentially?
2. Did any session stall waiting for input?
3. Are your 3 features genuinely independent?

### Reflection Questions

**Question 1: Independence Validation**

Looking at your three plans and task lists, did parallelization reveal any hidden dependencies you didn't catch in the specification phase? List them.

**Question 2: Constitutional Alignment**

Did all three plans follow the same patterns for API design, error handling, and data models? If yes, write down one example of how the shared constitution ensured alignment. If no, what diverged?

**Question 3: Decomposition Confidence**

On a scale of 1-10, how confident are you that these three features can be implemented independently without major integration surprises? What would increase your confidence?

**Question 4: Scaling to 7-9 agents**

Imagine you had 10 parallel decompositions instead of 3. How would parallel planning change?

- What would become harder?
- What would stay the same?
- What new tools or practices would you need?

Write a brief paragraph exploring these questions. You're not expected to have all the answers—this is about developing intuition for what breaks at scale.

### Journaling: When Does Parallel Planning Add Value?

Not every feature benefits from parallel planning. Write down:

1. **When parallel planning is valuable** (features are truly independent, teams are distributed, time pressure is high)
2. **When sequential planning is better** (features have tight coupling, team is small, design needs are exploratory)
3. **For your three features**, which was it? Why?

---

## Try With AI

You've now run `/sp.plan` and `/sp.tasks` in parallel and reflected on decomposition quality. Now use your AI companion to validate your thinking and design for scale.

### Setup

Use **Claude Code CLI** or your preferred AI partner (Gemini CLI, ChatGPT web—your choice). The prompts below work with any of these tools.

### Prompt Set

**Prompt 1: Validate Plan Quality & Dependencies**

Copy and paste your three plans into Claude Code and run:

```
Analyze these 3 feature plans and give me:
1. A summary of each plan's complexity (length, task count, dependencies)
2. Any circular dependencies or hidden integration points you spot
3. Whether the decomposition looks balanced or if one feature is too ambitious

Format as a table comparing the three features.
```

**Expected outcome**: A table showing plan metrics and a verdict on whether your decomposition is balanced. If any feature is flagged as too complex, you've identified a refactoring opportunity.

**Prompt 2: Terminal Management Strategy for Scale**

Run this prompt (no files needed—you're designing for the future):

```
I'm learning to manage parallel planning sessions. Right now I'm running 3 in parallel.

If I needed to run 10 parallel planning sessions simultaneously, what terminal management strategy would you recommend? Consider:

- How would you organize 10 separate terminals/worktrees?
- What tools (tmux, iTerm2, VS Code terminal, something else) would you choose and why?
- What labeling/naming convention would prevent confusion?
- How would you monitor progress across all 10 without constant context-switching?

Give me a concrete, actionable architecture.
```

**Expected outcome**: A proposed terminal/session architecture designed for 10 parallel workflows. You'll use this thinking as you scale the parallel approach in future lessons.

**Prompt 3: Decomposition Depth (Stretch)**

If you're ready to go deeper, run this:

```
Looking at my 3 features, I'm evaluating whether they're truly independent enough for parallel implementation.

Here are the explicit dependencies I found:
- [paste your dependencies here, e.g., "feature-002 depends on User ID from feature-001"]

Given these dependencies, what integration pain points should I expect during implementation? And is there any signal from these dependencies that my decomposition should change?
```

**Expected outcome**: Concrete risks identified (e.g., "feature-002's task list assumes User ID API will be available by day 3—if feature-001 slips, this becomes critical"). Use this to refine your task timing and ordering.

### Safety & Validation Note

AI plans often look reasonable but miss edge cases. When Claude Code suggests a terminal strategy or identifies dependencies, verify by:

1. **Checking your actual specifications** against the AI's analysis—do they match?
2. **Running a quick test**: Do your current 3 panes work smoothly with the suggested layout?
3. **Trusting but verifying**: Use AI to brainstorm, then validate against your domain knowledge

The skill here is not "believe the AI" but "AI + your judgment = better thinking."

---

**Your Checkpoint**: By the end of this lesson, you should have:

- ✓ 3 specifications set up in worktrees (from Lesson 1)
- ✓ 3 plans generated in parallel (~20 min)
- ✓ 3 task lists generated in parallel (~20 min)
- ✓ Evaluated your decomposition quality using the rubric
- ✓ Identified any hidden dependencies or decomposition issues
- ✓ Reflected on how parallel planning scales to 7-9 agents
- ✓ Designed a terminal management strategy for larger-scale parallelization

You now understand that **decomposition quality is proven through parallelization**. Good decomposition = clean parallel planning. Bad decomposition = chaos. This principle scales directly from 3 agents to 10, to 100.

In Lesson 3, you'll implement these features in parallel and watch decomposition quality translate to clean merges—or conflict-free integration proving your work can truly be done independently.
