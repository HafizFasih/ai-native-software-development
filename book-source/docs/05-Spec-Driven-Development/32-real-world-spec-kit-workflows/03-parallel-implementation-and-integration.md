---
title: "Parallel Implementation & Integration: Proving Decomposition Works"
chapter: 32
lesson: 3
duration_minutes: 120

# HIDDEN SKILLS METADATA (Institutional Integration Layer)
# Not visible to students; enables competency assessment and differentiation
skills:
  - name: "Parallel Implementation Execution"
    proficiency_level: "B1"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student can run `/sp.implement` simultaneously across multiple branches, manage state across sessions without blocking, and coordinate parallel workflows"

  - name: "Integration & Conflict Resolution"
    proficiency_level: "B1"
    category: "Technical"
    bloom_level: "Analyze"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student can merge parallel branches in dependency order, resolve conflicts strategically, understand what conflicts reveal about decomposition quality, and validate integration quality"

  - name: "Decomposition Thinking: Part 3 (Validation)"
    proficiency_level: "B1"
    category: "Conceptual"
    bloom_level: "Analyze"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student understands concrete proof that good decomposition = clean merges; poor decomposition = integration pain; uses merge conflicts as feedback to improve system design"

learning_objectives:
  - objective: "Execute `/sp.implement` in parallel across 3 feature branches without blocking"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Student demonstrates non-blocking parallel execution across multiple worktrees"

  - objective: "Merge feature branches in dependency order while strategically resolving conflicts"
    proficiency_level: "B1"
    bloom_level: "Analyze"
    assessment_method: "Student merges branches, analyzes conflicts, and explains what conflicts reveal about decomposition"

  - objective: "Analyze merge conflicts as feedback on decomposition quality; understand how this pattern scales to 7-9 agents"
    proficiency_level: "B1"
    bloom_level: "Analyze"
    assessment_method: "Student articulates decomposition lessons from integration experience and explains how pattern applies at larger scale"

cognitive_load:
  new_concepts: 7
  assessment: "7 new concepts (parallel execution, non-blocking coordination, merge strategies, conflict analysis, decomposition feedback, dependency management, integration testing) within B1 limit of 10 ✓"

differentiation:
  extension_for_advanced: "Run 4-5 features in parallel instead of 3; introduce merge conflict strategies (ours vs theirs, manual resolution with strategic rebasing); simulate 10-agent team scenario"
  remedial_for_struggling: "Work through one merge conflict example in detail; use simple 2-feature setup before attempting 3; pair with instructor for dependency analysis"

# Generation metadata
generated_by: "lesson-writer v3.0.0"
source_spec: "specs/002-chapter-32-redesign/spec.md"
created: "2025-11-06"
last_modified: "2025-11-06"
git_author: "Claude Code"
workflow: "/sp.implement"
version: "1.0.0"
---

# Parallel Implementation & Integration: Proving Decomposition Works

## Introduction: From Plan to Proof

You've decomposed your system into 3 independent features. You've written clear specifications for each. You've created detailed task lists. Now comes the critical test: **Can you actually build all three in parallel, integrate them cleanly, and ship a working system?**

This lesson proves whether your decomposition was actually good. Here's the profound insight: **Clean merges mean excellent decomposition. Many merge conflicts mean your system design needs rethinking.** You're not struggling with git—you're learning about system architecture.

This is where everything changes. Most teams decompose poorly, then waste weeks in integration hell. You're going to see why, experience it firsthand, and learn the patterns to avoid it. And here's what's remarkable: **The patterns you learn with 3 features and 3 sessions scale directly to 7-9 agents running in parallel on production systems.** Same principles. Different scale.

Let's build it.

---

## Preparing for Parallel Implementation

Before you launch three simultaneous implementation sessions, you need a merge strategy. This isn't optional—it's how you prevent integration disasters.

### Understanding Merge Order and Dependencies

**Key principle**: You must merge features in dependency order. If Feature B depends on Feature A, Feature A must merge first. If they're truly independent, order doesn't matter, but the *act of merging in a deliberate order* forces you to think about hidden dependencies.

Let's say you decomposed a web application into:

- **Feature 001**: Authentication system (login, logout, user sessions)
- **Feature 002**: Payment processing (charges, refunds, webhooks)
- **Feature 003**: User dashboard (displays charges, manages billing)

What's the dependency order?

- Feature 001 (Auth) has no dependencies—merge it first
- Feature 002 (Payments) needs Auth (to know *who* is paying) but doesn't need Dashboard—merge second
- Feature 003 (Dashboard) needs both Auth *and* Payments (to display payment data)—merge last

If you tried to merge in the wrong order, Feature 003 would fail because the Payment API wouldn't exist yet. That's a merge conflict caused by bad sequencing, not bad decomposition.

### Exercise 1: Map Feature Dependencies

Take your 3 features from Lesson 2 (the 3 specifications you wrote). For each one:

1. **List external dependencies**: What does this feature *require* to exist in the codebase?
   - Example: "Feature 002 requires User model from Feature 001"

2. **List what it provides**: What does this feature *create* that other features might need?
   - Example: "Feature 002 provides Payment model and payment_status field"

3. **Draw a dependency graph** (text is fine):
   ```
   Feature 001 → Feature 002 → Feature 003
   ```
   or
   ```
   Feature 001 ┐
              ├→ Feature 003
   Feature 002 ┘
   ```

4. **Determine merge order**: Read the graph left-to-right. That's your merge sequence.

**At 7-9 agent scale**: You'd have 10-15 features with potentially complex dependency graphs. Tools like `topo-sort` (topological sorting) automatically compute merge order. The principle is identical—dependencies first—but the graph complexity is higher.

### Pre-Merge Checklist

Before you merge a single branch, ask:

- [ ] Does this feature's branch have all its code committed and pushed?
- [ ] Do the branch's tests pass locally?
- [ ] Does the specification match what was implemented?
- [ ] Have you reviewed the code (or asked AI to review it)?
- [ ] Are there any hardcoded constants that should be configurable?
- [ ] Did you document any breaking changes or new dependencies?

This checklist prevents a common disaster: merging incomplete work that breaks main.

---

## Running Parallel Implementation

This is where the 2.5x speed advantage manifests.

### The Setup: Three Worktrees, Three Sessions

Instead of this sequential approach:

```
Start Feature 001 → 45 min → Finish Feature 001
Start Feature 002 →         45 min → Finish Feature 002
Start Feature 003 →                  45 min → Finish Feature 003
Total: ~2 hours
```

You do this in parallel:

```
Session 1: Start Feature 001 → 45 min → Finish Feature 001 ┐
Session 2: Start Feature 002 → 45 min → Finish Feature 002 ├→ Total: ~50 min
Session 3: Start Feature 003 → 45 min → Finish Feature 003 ┘
```

The clock time is ~50 minutes (dominated by the longest feature), not 2+ hours.

### How to Execute Parallel Implementation

If you're working alone:

1. **Create three separate directories** (worktrees):
   ```bash
   git worktree add ../feature-001 -b feature-001 main
   git worktree add ../feature-002 -b feature-002 main
   git worktree add ../feature-003 -b feature-003 main
   ```

2. **In Terminal Session 1**, navigate to the feature-001 worktree:
   ```bash
   cd ../feature-001
   /sp.implement feature-001
   ```
   This runs in the background. You don't wait for it.

3. **In Terminal Session 2**, navigate to the feature-002 worktree:
   ```bash
   cd ../feature-002
   /sp.implement feature-002
   ```

4. **In Terminal Session 3**, navigate to the feature-003 worktree:
   ```bash
   cd ../feature-003
   /sp.implement feature-003
   ```

All three are running simultaneously. Your job now: monitor progress.

If you're leading a team with 3 people:

- Person A works in feature-001 worktree
- Person B works in feature-002 worktree
- Person C works in feature-003 worktree

Same principle. Different scale.

**Scale note for 7-9 agents**: You'd create 10-15 worktrees (or use a distributed task queue). Agents coordinate via shared state (git commits, status files). The principle—parallel, non-blocking execution—is identical.

---

## Background: Monitoring Multi-Session Execution

While your three `/sp.implement` processes run in the background, you're validating their quality.

### Real-Time Code Review Activity

Every 10-15 minutes, check the work in each worktree. You're not waiting—you're *reviewing*.

**What to look for**:

1. **Spec Alignment**: Does the code match the specification you approved?
   - Example: Spec says "User model must have `created_at` timestamp." Does the code include it?

2. **Obvious Issues**:
   - Syntax errors (would fail tests anyway)
   - Hardcoded values that shouldn't be hardcoded
   - Missing error handling
   - Commented-out code (either remove or document why it's there)

3. **Integration Hints**:
   - Are there file path imports that assume a specific directory structure?
   - Are there API endpoint names that might conflict with other features?
   - Are database table names unique across features?

4. **Testing Status**:
   - Do tests exist for this feature?
   - Are they passing?

### Example: Monitoring a Payment Processing Implementation

Let's say Feature 002 (Payments) is running in a worktree. You check it after 20 minutes:

```python
# Feature 002: Payment Processing
# From feature-002 worktree

class PaymentProcessor:
    """Handles charge creation and refunds"""

    def create_charge(self, user_id: int, amount: float) -> dict:
        # Check spec: Does it validate amount > 0?
        # Check code: No validation! 🚩
        # This is a spec mismatch
        pass

    def process_refund(self, charge_id: str) -> dict:
        # Check spec: What does "process refund" mean?
        # Check code: Deletes record from database
        # Is this the right approach? Audit trail needed?
        pass
```

You spot missing input validation. You note it. This isn't a blocker—`/sp.implement` can add it—but you've caught it early.

### Parallel Monitoring Log

Keep a simple log while work runs:

```
T+10 min: Feature-001 (Auth) - 40% complete, no issues
T+10 min: Feature-002 (Payments) - 30% complete, spotted missing validation (noted)
T+10 min: Feature-003 (Dashboard) - 25% complete, good progress

T+20 min: Feature-001 - 80% complete, tests passing ✓
T+20 min: Feature-002 - 65% complete, validation issue being fixed
T+20 min: Feature-003 - 55% complete, api calls look correct

T+30 min: Feature-001 - COMPLETE ✓
T+30 min: Feature-002 - 85% complete, integration looks clean
T+30 min: Feature-003 - 80% complete, minor doc issue noted

T+45 min: Feature-002 - COMPLETE ✓
T+48 min: Feature-003 - COMPLETE ✓
```

This log is your proof that work happened in parallel. It's also your quality audit trail.

---

## Integration: Merging in Dependency Order

Now all three features are "done" in their branches. Time to merge them into main and prove the decomposition worked.

### Code Example 1: Three-Feature Starter Repository

Before you merge, understand the starting state. Here's what your git log looks like:

```
main:
  commit abc123 - "Initial commit: empty project skeleton"

feature-001 (auth):
  commit def456 - "Add User model"
  commit ghi789 - "Add login/logout endpoints"
  commit jkl012 - "Add tests for auth flow"
  [3 commits ahead of main]

feature-002 (payments):
  commit mno345 - "Add Payment model"
  commit pqr678 - "Add charge/refund endpoints"
  commit stu901 - "Add tests for payments"
  [3 commits ahead of main]

feature-003 (dashboard):
  commit vwx234 - "Add Dashboard component"
  commit yza567 - "Add API calls for user and payment data"
  commit bcd890 - "Add tests for dashboard"
  [3 commits ahead of main]
```

Each feature is 3 commits ahead of main, working on *different files*, because you decomposed well.

### Step 1: Merge Feature 001 (Auth)

Switch to main and merge feature-001:

```bash
git checkout main
git merge feature-001
```

Expected outcome: **Fast-forward merge**. Main jumps forward, no conflicts.

```
main now includes:
  commit abc123 - Initial commit
  commit def456 - Add User model
  commit ghi789 - Add login/logout endpoints
  commit jkl012 - Add auth tests
```

**Why no conflicts?** Because feature-001 only touched auth files (User.py, routes/auth.py, tests/auth.py). Nothing in main changed those files.

Verify:
```bash
# Run tests
pytest tests/
# All tests pass ✓
```

### Step 2: Merge Feature 002 (Payments)

Now feature-002 branches off an old main (before auth was there). When you merge it, git needs to integrate it:

```bash
git merge feature-002
```

Git performs a **recursive merge**: It finds the common ancestor (original main), sees what changed in feature-002, sees what changed in main (auth code), and combines them.

Expected: **Clean merge**. You edited Payment.py, Feature-001 edited User.py. Different files.

Verify:
```bash
pytest tests/
# All tests pass? Great. If not, see Troubleshooting section below
```

### Step 3: Merge Feature 003 (Dashboard)

Feature-003 needs both auth and payment code. Now it'll find them in main:

```bash
git merge feature-003
```

Again: recursive merge. Dashboard.py didn't exist before, so no conflicts with auth or payment changes.

Verify:
```bash
pytest tests/
# Tests pass, and now integration tests run:
# User can authenticate, dashboard shows charges, refunds work
```

If you followed dependency order correctly, merges should be clean.

---

## Handling & Learning from Merge Conflicts

Sometimes, merges aren't clean. A conflict looks like this:

```python
# In Payment.py, someone modified the validate_amount function

<<<<<<< HEAD (main)
def validate_amount(self, amount: float) -> bool:
    return amount > 0  # Simple validation
=======
def validate_amount(self, amount: float) -> bool:
    if amount <= 0:
        raise ValueError("Amount must be positive")
    if amount > 999999.99:
        raise ValueError("Amount too large")
    return True
||||||| merged common ancestor
def validate_amount(self, amount: float) -> bool:
    return amount > 0
>>>>>>> feature-002
```

Git is saying: "I don't know which version of this function you want."

### Code Example 2: Merge Conflict Resolution Guide

**Step 1: Understand the conflict**

You have three versions:
- **Common ancestor** (|||||||): The version both branches started from
- **HEAD (main)**: What main has now (simple validation)
- **Branch (feature-002)**: What the feature added (strict validation with limits)

**Step 2: Decide strategically**

Do you want:
- **Ours** (main's simple validation)? `git checkout --ours`
- **Theirs** (feature-002's strict validation)? `git checkout --theirs`
- **Both** (combine them)? Manual edit

In this case, the feature's strict validation is *better* (more secure). Choose theirs:

```bash
git checkout --theirs Payment.py
# Or manually edit to combine:
def validate_amount(self, amount: float) -> bool:
    if amount <= 0:
        raise ValueError("Amount must be positive")
    if amount > 999999.99:
        raise ValueError("Amount too large")
    return True
```

**Step 3: Test and commit**

```bash
pytest tests/test_payments.py  # Verify feature-002's validation tests still pass
git add Payment.py
git commit -m "Merge feature-002: Accept strict payment validation from feature branch"
```

### What Merge Conflicts Reveal About Decomposition

Here's the critical insight: **Merge conflicts don't mean git is broken. They mean your specification or decomposition was unclear.**

Common conflict scenarios and what they teach:

| Scenario | Root Cause | Lesson |
|----------|-----------|--------|
| **Conflicts in same file** | Two features touched the same file, but specs said independent | Specs were vague about ownership. Refine specs to clarify "Feature A owns X, Feature B owns Y" |
| **Conflicts in API definitions** | Two features defined API endpoints with same route | Specs didn't coordinate naming. Use a shared API schema before implementation. |
| **Conflicts in database migrations** | Two features added columns to same table | Specs assumed separate tables but didn't enforce it. Database schema should be part of pre-merge checklist. |
| **No conflicts, but tests fail** | Hidden dependency not visible in code | Spec missed an integration point. Update spec to document all integration paths. |

**At 7-9 agent scale**: Merge conflicts become *systemic feedback*. One conflict = timing issue. *Many* conflicts = decomposition problem. That's when you stop, reanalyze your specifications, and replan. You don't fight through 50 conflicts—you fix the root cause.

### The "Merge Early, Merge Often" Strategy

Here's why most teams avoid parallel work: they're afraid of integration chaos. The antidote: **merge frequently, in small batches, as soon as possible.**

If you merged feature-001 *immediately* after it was done, and feature-002 team saw it, they could rebase their work:

```bash
# In feature-002 worktree:
git rebase main  # Replay feature-002 commits on top of new main
```

This keeps feature-002 branches "fresh" against the latest main code. Conflicts surface early, when they're small, not after 3 days of work.

**Practice Exercise**: After you merge feature-001 into main, have feature-002 and feature-003 rebase:

```bash
cd ../feature-002
git rebase main
# Resolve any conflicts (should be minimal)

cd ../feature-003
git rebase main
# Resolve any conflicts
```

This is the "merge early, merge often" discipline that prevents integration disasters.

---

## Integration Validation

Now you have one codebase with all three features. Prove it works.

### Code Example 3: Integration Testing Script

You need tests that prove the three features work *together*, not just independently.

```python
"""
Integration tests: Verify all three features work together
Feature 001 (Auth) + Feature 002 (Payments) + Feature 003 (Dashboard)
"""

import pytest
from app import create_app
from app.models import User, Payment
from app.auth import login_user
from app.payments import create_charge

@pytest.fixture
def client():
    """Setup test app and database"""
    app = create_app(config='test')
    with app.app_context():
        yield app.test_client()

class TestIntegration:
    """Integration tests across all three features"""

    def test_user_can_authenticate_and_see_dashboard(self, client):
        """Feature 001 + Feature 003: Auth enables Dashboard"""
        # Step 1: User registers (Feature 001)
        response = client.post('/api/auth/register', json={
            'email': 'alice@example.com',
            'password': 'secure123'
        })
        assert response.status_code == 201
        user_id = response.json['user_id']

        # Step 2: User logs in (Feature 001)
        response = client.post('/api/auth/login', json={
            'email': 'alice@example.com',
            'password': 'secure123'
        })
        assert response.status_code == 200
        token = response.json['token']

        # Step 3: Dashboard accessible only with auth (Feature 003 + Feature 001)
        headers = {'Authorization': f'Bearer {token}'}
        response = client.get('/api/dashboard', headers=headers)
        assert response.status_code == 200

    def test_user_can_pay_and_see_charge_on_dashboard(self, client):
        """Feature 001 + Feature 002 + Feature 003: Full workflow"""
        # Step 1: Authenticate (Feature 001)
        client.post('/api/auth/register', json={
            'email': 'bob@example.com',
            'password': 'secure123'
        })
        response = client.post('/api/auth/login', json={
            'email': 'bob@example.com',
            'password': 'secure123'
        })
        token = response.json['token']
        headers = {'Authorization': f'Bearer {token}'}

        # Step 2: Create a charge (Feature 002)
        response = client.post('/api/payments/charge', json={
            'amount': 29.99,
            'description': 'Premium subscription'
        }, headers=headers)
        assert response.status_code == 201
        charge_id = response.json['charge_id']

        # Step 3: Dashboard shows the charge (Feature 003)
        response = client.get('/api/dashboard', headers=headers)
        assert response.status_code == 200
        charges = response.json['charges']
        assert any(c['id'] == charge_id for c in charges)
        assert any(c['amount'] == 29.99 for c in charges)

    def test_unauthenticated_user_cannot_see_dashboard(self, client):
        """Feature 001 + Feature 003: Auth is enforced"""
        # Without authentication:
        response = client.get('/api/dashboard')
        assert response.status_code == 401  # Unauthorized

# Run these tests after final merge
# pytest tests/integration/test_all_features.py -v
```

**What this proves**:

- Feature 001 (Auth) and Feature 003 (Dashboard) work together
- Feature 002 (Payments) integrates with both
- The full workflow succeeds: authenticate → pay → see result

If all integration tests pass, your decomposition was excellent.

### Exercise 3: Run Smoke Tests

A **smoke test** is a quick check that the system "smokes" (works at all). It's not comprehensive—it's just "does the lights turn on?"

```bash
# After all merges, run smoke tests
pytest tests/integration/test_all_features.py::TestIntegration::test_user_can_authenticate_and_see_dashboard -v

# If this passes, the three major features work together
# This is your proof of decomposition quality
```

### Exercise 4: End-to-End Workflow Test

Beyond unit and integration tests, walk through a complete user scenario:

1. A new user visits the website
2. They register an account (Feature 001)
3. They see an empty dashboard (Feature 003)
4. They make a payment (Feature 002)
5. The dashboard shows their charge (Feature 003)
6. They log out and log back in (Feature 001)
7. The charge is still visible (persistence)

If this workflow succeeds, all three features work together cleanly.

---

## Time Tracking & Reflection

Now that integration is complete, measure the value of parallelization and learn from the experience.

### Exercise 5: Time Tracking Analysis

Fill in your actual times:

| Task | Estimated (Sequential) | Actual (Parallel) | Sessions |
|------|------------------------|------------------|----------|
| Feature 001 implementation | 45 min | 45 min | Session 1 |
| Feature 002 implementation | 45 min | 45 min | Session 2 (concurrent) |
| Feature 003 implementation | 45 min | 45 min | Session 3 (concurrent) |
| Merge conflicts resolved | 10 min | ? min | After parallel complete |
| Integration testing | 15 min | ? min | Final phase |
| **Total Sequential** | ~2 hours | | |
| **Total Parallel** | | ~1 hour | Clock time |
| **Speed Improvement** | | 2x faster | |

Calculate your actual speed improvement:

```
Time saved = Sequential time - Parallel time
            = 2 hours - 1 hour = 1 hour saved
Efficiency = Parallel time / Sequential time
           = 1 hour / 2 hours = 50% of sequential time
```

For a 3-person team, this means: **You shipped in 1 hour what would take 1 person 2 hours.**

**At 7-9 agent scale**: Imagine 10 features with similar complexity:
- Sequential: 10 features × 45 min = 450 minutes = 7.5 hours
- Parallel: ~50 minutes (clock time, longest feature)
- Savings: **7 hours per cycle**

That's where the compounding value emerges. Over a quarter (13 weeks), that's 13 × 7 hours = **91 hours saved per team.**

### Exercise 6: Decomposition Reflection

Answer these questions in your journal:

1. **Were your merges clean?**
   - If yes: "My decomposition specs were excellent. I clearly separated concerns."
   - If conflicts: "I found boundary issues. Next time, I'll clarify [specific spec area]."

2. **Did you discover any hidden dependencies?**
   - Which feature depended on another more than you expected?
   - Update your specs to document this explicitly next time.

3. **Did the three features work together on the first try?**
   - If yes: Great! Integration tests passed. Specs were clear.
   - If no: What was the issue?
     - Missing API endpoint?
     - Incorrect data format?
     - Sequence of operations didn't match spec?
   - Document the fix and update your process.

4. **What would you change with 5 features?**
   - More dependencies to manage?
   - Would you merge more frequently?
   - Would you use a different dependency graph strategy?

5. **At 7-9 agent scale, what would worry you?**
   - "Keeping track of 15 dependency graphs?"
   - "Coordinating 15 merge operations?"
   - "What if 10 agents all depend on the same module?"
   - Write down your concerns. These inform your next-level specs.

**Scale Connection**: The exact decomposition thinking you just did—identifying boundaries, dependencies, merge order—becomes *formalized* at 7-9 agent scale. You'd document a dependency graph formally, use topological sorting to compute merge order automatically, and use integration tests as your formal verification that all 15 features still work together.

---

## Troubleshooting Guide

### "I have merge conflicts everywhere"

**Diagnosis**: This usually means specs overlapped or boundaries were unclear.

**Checklist**:

- [ ] Do both features edit the same files? If yes, spec didn't separate concerns
- [ ] Did both features define the same API endpoints? Spec didn't coordinate naming
- [ ] Did both features add columns to the same database table? Schema wasn't pre-agreed
- [ ] Did you merge out of dependency order? Try merging in the correct order

**Fix**: Stop merging. Return to specs. Clarify boundaries. Start fresh.

### "One feature looks way bigger than the others"

**Diagnosis**: Decomposition was unbalanced.

**Red flags**:

- One feature has 2x more code than others
- One feature takes 2x longer to implement than others
- One feature has 10x more test cases

**What this means**: That "big" feature actually contains 2-3 smaller features that you didn't decompose.

**Fix**: In Lesson 4, you'll redecompose. Break the large feature into smaller, more independent specs.

**At 7-9 agent scale**: Balanced features mean balanced agent load. If one feature is huge, one agent will be bottlenecked. The whole team waits.

### "Tests pass individually, but integration tests fail"

**Diagnosis**: Hidden dependency you didn't spec.

**Example**: Feature 002 (Payments) assumes User model has a `billing_address` field, but Feature 001 (Auth) didn't create it.

**Resolution**:

1. Read the integration test error carefully
2. Find the missing piece (field, endpoint, data structure)
3. Add it to the feature that *should* provide it
4. Re-test
5. **Document this in your spec**: "Feature 001 provides User with fields: id, email, password, created_at, **billing_address**"

### "Tests pass, but API calls seem broken"

**Common causes**:

- Wrong endpoint URL (Feature 002 calls `/api/payment-charge` but Feature 001 defines `/api/payments/charge`)
- Missing authentication header (Feature 003 tries to call Feature 002 API without auth token)
- Wrong HTTP method (Feature 3 does GET but endpoint expects POST)

**Fix**: Review API specs before integration. Test endpoints independently, then test their integration.

---

## Common Pitfalls & How to Avoid Them

### Pitfall 1: Merging Without Testing

**The mistake**: Merge feature branches into main without running tests first.

**Why it fails**: Integration tests catch integration issues. If you skip them, users find the bugs.

**Fix**:
```bash
# Before any merge:
git checkout feature-branch
pytest tests/ -v  # All tests pass?

# Then merge
git checkout main
git merge feature-branch
pytest tests/ -v  # All tests still pass?
```

### Pitfall 2: Unclear Feature Ownership

**The mistake**: Feature 001 and Feature 002 both define how User data is stored.

**Why it fails**: Merge conflicts, inconsistent data structure, confusion about which feature "owns" User model.

**Fix**: In your spec, explicitly assign ownership:
- "Feature 001 owns User model; provides: id, email, password, created_at"
- "Feature 002 adds: billing_address, payment_method (modifies User, depends on Feature 001)"

Be explicit about which feature *creates* what, and which feature *modifies* what.

### Pitfall 3: Skipping Integration Tests

**The mistake**: "Individual tests pass, so we're good."

**Why it fails**: Integration issues only appear when features interact.

**Fix**: Write integration tests *before* implementation. Use them as a spec.

### Pitfall 4: Merging in Wrong Order

**The mistake**: Merge Feature 003 (Dashboard) before Feature 001 (Auth).

**Why it fails**: Feature 003 needs User model from Feature 001. Merge fails or code breaks.

**Fix**: Map dependencies first. Merge bottom-up (dependencies first).

---

## Try With AI

You've run `/sp.implement` three times in parallel. You've merged code. You've resolved conflicts (maybe). Now use AI to deepen your understanding of what the experience taught you.

**Tool**: Claude Code CLI or ChatGPT (web)

### Prompt 1: Merge Conflict Analysis

Copy a merge conflict from your work (or use the example from "Code Example 2" above) and ask:

```
I encountered this merge conflict in [filename]:
[paste the conflict]

What does this conflict reveal about my feature decomposition?
What spec detail should I have clarified to prevent it?
```

**Expected outcome**: AI explains the root cause (overlapping responsibilities, unclear boundaries, etc.) and suggests a spec improvement for next time.

### Prompt 2: Integration Test Review

Share your integration tests and ask:

```
Review these integration tests I wrote for my three features.
Are these good integration tests? What am I missing?
Should I add tests for error cases or edge cases?

[paste your integration test code]
```

**Expected outcome**: AI critiques test coverage and suggests additional tests that validate edge cases (auth failures, payment failures, missing data).

### Prompt 3: Retrospective — Scaling to 10 Features

Reflect on what you learned and ask:

```
I just coordinated three features in parallel:
- Feature 001 (Auth) - 45 min
- Feature 002 (Payments) - 45 min
- Feature 003 (Dashboard) - 45 min
- Parallel time: ~50 min
- I encountered [number] merge conflicts
- Root causes: [list them]

What would change if I had to do this with 10-15 features instead of 3?
How would I prevent the merge conflicts I experienced from multiplying at larger scale?
What decomposition patterns would help?
```

**Expected outcome**: AI explains how decomposition patterns scale, identifies risks with larger teams, and suggests coordination strategies (dependency graphs, merge orchestration, parallel merge windows).

### Prompt 4 (Stretch): Automated Merge Orchestration

If you want to explore deeper:

```
How could I automate the merge process for 10-15 features?
What tools or scripts could automatically:
1. Compute merge order from dependencies
2. Execute merges in sequence
3. Flag conflicts for manual review
4. Run integration tests
5. Report success/failure

Give me a sketch of how this would work.
```

**Expected outcome**: AI sketches a CI/CD pipeline that automates parallel decomposition validation.

### Safety & Ethics Note

When AI generates code for merge automation or integration testing:
- Review the code for security (no hardcoded credentials, proper error handling)
- Test it on a non-production branch first
- Understand what it does before running it in production
- Remember: **The goal is to automate boring work, not to skip thinking about decomposition.**

The most common mistake: Using automation to cover up bad decomposition. Don't do that. Use automation to validate *good* decomposition quickly.

---

**Next step**: In Lesson 4, you'll take this experience and scale it. You've proven the pattern works with 3 features. Now you'll design the systems and governance to make it work with 7-9 agents building in parallel. That's where professional SDD becomes truly powerful.
