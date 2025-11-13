---
name: general-sandbox
description: |
  Universal Docker-based validation environment for testing code, tools, and frameworks across any technology stack. Install your own dependencies, run custom validation scripts, and ensure reproducible testing for educational content.
version: 1.0.0
tags: [validation, testing, docker, sandbox, isolation]
---

# General Sandbox — Universal Docker Validation Environment

## Overview

A flexible, persistent Docker-based sandbox that lets you install ANY technology stack (Node.js, Python, Go, Rust, Java, Ruby, etc.) and run validation tests in complete isolation. Perfect for validating educational content across multiple programming languages and frameworks.

**Key Features:**
- ✅ Persistent container (setup once, reuse indefinitely)
- ✅ Install any language runtime, package manager, or framework
- ✅ Execute custom validation scripts in isolated environment
- ✅ Reproducible testing (same results across all machines)
- ✅ Fast iteration (no rebuild overhead after initial setup)
- ✅ Support for complex multi-tool stacks (e.g., Node + Python + Docker in Docker)

## When to Use

Use this skill when:
- ✅ Validating code examples for chapters in Part 2, 5, or any part
- ✅ Testing tool installations (UV, Ruff, Node, npm, pnpm, Deno, etc.)
- ✅ Validating agentic framework examples (LangChain, CrewAI, AutoGen, etc.)
- ✅ Running integration tests across multiple technologies
- ✅ Need reproducible, isolated environment for any validation task
- ✅ Want to test "does this installation command work?" across platforms

**Trigger phrases:**
- "Validate code in sandbox"
- "Test installation commands"
- "Run validation for Chapter X"
- "Set up sandbox with [technology stack]"
- "Execute tests in isolated environment"

## Quick Start

### Step 1: Initialize Sandbox

```bash
# Create persistent container with base Ubuntu environment
bash .claude/skills/general-sandbox/scripts/setup-sandbox.sh
```

This creates a container named `general-sandbox` with:
- Ubuntu 24.04 base (or your specified OS)
- Basic utilities (curl, wget, git, build tools)
- Persistent state across sessions

### Step 2: Install Your Stack

```bash
# Install whatever you need for your validation task
bash .claude/skills/general-sandbox/scripts/install-in-sandbox.sh "
  # Example: Install Node.js and Python
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs python3 python3-pip

  # Install package managers
  npm install -g pnpm
  pip3 install uv
"
```

### Step 3: Run Validation

```bash
# Execute your validation script
bash .claude/skills/general-sandbox/scripts/validate-in-sandbox.sh \
  /path/to/validation-script.sh \
  /path/to/code-to-validate
```

## Architecture

### Container Lifecycle

**Initial Setup** (one-time):
```bash
scripts/setup-sandbox.sh [--base-image ubuntu:24.04]
```
Creates persistent container named `general-sandbox` that runs indefinitely.

**Stack Installation** (per technology):
```bash
scripts/install-in-sandbox.sh "commands to install tools"
```
Installs languages, frameworks, package managers as needed.

**Validation Execution** (repeatable):
```bash
scripts/validate-in-sandbox.sh <script> <target-directory>
```
Runs validation script inside container, returns results.

**Reset** (when needed):
```bash
scripts/reset-sandbox.sh
```
Removes and recreates container from scratch.

### Data Flow

```
Host Machine                  Docker Container (general-sandbox)
───────────                   ──────────────────────────────────
Code to validate    ───────>  /workspace/ (mounted volume)
Validation script   ───────>  /scripts/ (mounted volume)
                              │
                              ├─> Install dependencies
                              ├─> Run validation script
                              ├─> Generate report
                              │
Results/Logs        <───────  Output (stdout/file)
```

## Bundled Scripts

### scripts/setup-sandbox.sh

Creates persistent Docker container with base environment.

**Usage:**
```bash
bash scripts/setup-sandbox.sh [OPTIONS]

Options:
  --base-image IMAGE    Docker base image (default: ubuntu:24.04)
  --container-name NAME Container name (default: general-sandbox)
  --help               Show help message
```

**What it does:**
1. Checks if container exists (by name)
2. If not, pulls base image and creates container
3. Installs basic utilities (curl, wget, git, build-essential)
4. Keeps container running in background (detached mode)
5. Returns container ID and status

**Example:**
```bash
# Default Ubuntu setup
bash scripts/setup-sandbox.sh

# Custom base image
bash scripts/setup-sandbox.sh --base-image debian:12
```

---

### scripts/install-in-sandbox.sh

Installs languages, frameworks, or tools inside the running sandbox.

**Usage:**
```bash
bash scripts/install-in-sandbox.sh "commands to execute"

Example:
bash scripts/install-in-sandbox.sh "
  curl -fsSL https://deno.land/install.sh | sh
  export PATH=\"\$HOME/.deno/bin:\$PATH\"
  deno --version
"
```

**What it does:**
1. Verifies sandbox container is running
2. Executes provided commands inside container
3. Captures output and exit code
4. Reports success or failure

**Common Installation Patterns:**

**Node.js + pnpm:**
```bash
bash scripts/install-in-sandbox.sh "
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
  npm install -g pnpm
  pnpm --version
"
```

**Python + UV:**
```bash
bash scripts/install-in-sandbox.sh "
  apt-get update && apt-get install -y python3 python3-pip curl
  curl -LsSf https://astral.sh/uv/install.sh | sh
  export PATH=\"\$HOME/.cargo/bin:\$PATH\"
  uv --version
"
```

**Rust + Cargo:**
```bash
bash scripts/install-in-sandbox.sh "
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
  export PATH=\"\$HOME/.cargo/bin:\$PATH\"
  rustc --version
"
```

---

### scripts/validate-in-sandbox.sh

Executes validation script inside sandbox against target code.

**Usage:**
```bash
bash scripts/validate-in-sandbox.sh <validation-script> <target-directory> [output-dir]

Arguments:
  validation-script  Path to bash script that performs validation
  target-directory   Path to code/content to validate
  output-dir        Optional: where to save results (default: validation-output)

Example:
bash scripts/validate-in-sandbox.sh \
  ./validate-chapter.sh \
  book-source/docs/02-Part-2-Tools/05-chapter-npm \
  validation-results
```

**What it does:**
1. Mounts validation script to `/scripts/validate.sh` in container
2. Mounts target directory to `/workspace/` in container
3. Executes validation script inside container
4. Captures stdout/stderr and exit code
5. Saves results to output directory on host
6. Returns success (0) or failure (1) exit code

**Exit Codes:**
- `0` — Validation passed, all checks successful
- `1` — Validation failed, errors found
- `2` — Sandbox not running (run setup first)
- `3` — Invalid arguments (missing script or target)

---

### scripts/reset-sandbox.sh

Removes existing sandbox container and recreates from scratch.

**Usage:**
```bash
bash scripts/reset-sandbox.sh [--base-image IMAGE]
```

**When to use:**
- Container is corrupted or behaving unexpectedly
- Need to test installation from clean slate
- Want to change base image (e.g., Ubuntu → Alpine)
- Accumulated state is causing issues

**What it does:**
1. Stops running container (if running)
2. Removes container completely
3. Calls `setup-sandbox.sh` to recreate fresh container

---

### scripts/exec-in-sandbox.sh

Executes arbitrary commands inside running sandbox (utility script).

**Usage:**
```bash
bash scripts/exec-in-sandbox.sh "command to run"

Examples:
# Check installed Node version
bash scripts/exec-in-sandbox.sh "node --version"

# List Python packages
bash scripts/exec-in-sandbox.sh "pip3 list"

# Run custom validation
bash scripts/exec-in-sandbox.sh "cd /workspace && npm test"
```

**What it does:**
- Runs command inside container
- Returns stdout/stderr
- Exits with command's exit code

---

## Common Workflows

### Workflow 1: Validate Node.js Chapter

```bash
# 1. Setup sandbox (one-time)
bash scripts/setup-sandbox.sh

# 2. Install Node.js + pnpm
bash scripts/install-in-sandbox.sh "
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
  npm install -g pnpm
"

# 3. Create validation script
cat > validate-node-chapter.sh << 'EOF'
#!/bin/bash
set -e

cd /workspace

echo "Validating Node.js examples..."

# Extract and test all JS code blocks
find . -name "*.md" -exec grep -A 10 '```javascript' {} \; > extracted.js

# Run with node
node extracted.js

echo "✅ All Node examples validated"
EOF

chmod +x validate-node-chapter.sh

# 4. Run validation
bash scripts/validate-in-sandbox.sh \
  ./validate-node-chapter.sh \
  book-source/docs/02-Part-2-Tools/05-npm-chapter
```

---

### Workflow 2: Validate Multi-Language Agentic Framework

```bash
# 1. Install Python + Node (for LangChain/LangGraph)
bash scripts/install-in-sandbox.sh "
  apt-get update && apt-get install -y python3 python3-pip nodejs npm
  pip3 install langchain langgraph openai
  npm install -g typescript
"

# 2. Validate examples
bash scripts/validate-in-sandbox.sh \
  ./validate-langchain-examples.sh \
  book-source/docs/05-Part-5-Agentic/langchain-chapter
```

---

### Workflow 3: Test Installation Commands

```bash
# Validate that installation commands in documentation actually work

cat > test-install-commands.sh << 'EOF'
#!/bin/bash

cd /workspace

# Extract all installation commands from markdown
grep -h "curl.*install" *.md > install-commands.txt

# Test each command
while read -r cmd; do
  echo "Testing: $cmd"
  eval "$cmd" || { echo "❌ FAILED: $cmd"; exit 1; }
done < install-commands.txt

echo "✅ All installation commands work"
EOF

bash scripts/validate-in-sandbox.sh \
  ./test-install-commands.sh \
  book-source/docs/02-Part-2-Tools
```

---

## Example Validation Scripts

### Example 1: Python Code Validation

```bash
#!/bin/bash
# validate-python-code.sh

set -e
cd /workspace

echo "Extracting Python code blocks from markdown..."
find . -name "*.md" -exec awk '/```python/,/```/ {if (!/```/) print}' {} \; > all_code.py

echo "Running syntax check..."
python3 -m py_compile all_code.py

echo "Running with Python..."
python3 all_code.py

echo "✅ Python validation complete"
```

### Example 2: Node.js Package Installation

```bash
#!/bin/bash
# validate-npm-chapter.sh

set -e
cd /workspace

echo "Testing npm commands from chapter..."

# Test npm init
npm init -y

# Test installing packages mentioned in chapter
grep -h "npm install" *.md | while read -r cmd; do
  echo "Executing: $cmd"
  eval "$cmd"
done

# Verify installations
npm list

echo "✅ All npm packages installed successfully"
```

### Example 3: Multi-Tool Stack Validation

```bash
#!/bin/bash
# validate-fullstack-example.sh

set -e
cd /workspace

echo "Setting up full-stack environment..."

# Backend validation (Python)
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py test

# Frontend validation (Node)
cd ../frontend
npm install
npm run build
npm test

echo "✅ Full-stack validation complete"
```

---

## Advanced Usage

### Installing Docker-in-Docker

For validating Docker-related content:

```bash
bash scripts/install-in-sandbox.sh "
  apt-get update
  apt-get install -y docker.io
  service docker start
"
```

### Using Custom Base Images

```bash
# Use Alpine for minimal size
bash scripts/setup-sandbox.sh --base-image alpine:latest

# Use specific language image
bash scripts/setup-sandbox.sh --base-image node:20-alpine
```

### Parallel Validation

```bash
# Validate multiple chapters in parallel
for chapter in book-source/docs/02-Part-2-Tools/*/; do
  bash scripts/validate-in-sandbox.sh \
    ./validate-chapter.sh \
    "$chapter" &
done
wait

echo "All validations complete"
```

---

## Container Management

### Check Container Status

```bash
docker ps -f name=general-sandbox
```

### View Container Logs

```bash
docker logs general-sandbox
```

### Enter Container Interactively

```bash
docker exec -it general-sandbox bash
```

### Stop Container (but keep for reuse)

```bash
docker stop general-sandbox
```

### Start Stopped Container

```bash
docker start general-sandbox
```

### Remove and Recreate

```bash
bash scripts/reset-sandbox.sh
```

---

## Constitutional Alignment

This skill embodies:

✅ **Validation-First Safety (Philosophy #5)**: Never trust code without testing in isolated environment
✅ **Evals-First Development (Philosophy #4)**: Define success (0 errors) before validating
✅ **Professional Standards**: Production-grade Docker isolation for all technology stacks
✅ **Efficiency**: Persistent container eliminates rebuild overhead across validation runs
✅ **Flexibility**: Supports any language, framework, or tool combination

---

## Troubleshooting

### Issue: "Container not found"

**Solution:**
```bash
bash .claude/skills/general-sandbox/scripts/setup-sandbox.sh
```

### Issue: "Permission denied"

**Solution:**
```bash
chmod +x .claude/skills/general-sandbox/scripts/*.sh
```

### Issue: "Cannot connect to Docker daemon"

**Solution:**
```bash
# Ensure Docker is running
docker info

# Start Docker (macOS)
open -a Docker

# Start Docker (Linux)
sudo systemctl start docker
```

### Issue: "Validation script not found in container"

**Solution:**
Ensure validation script has correct shebang and is executable:
```bash
#!/bin/bash
# At top of script
chmod +x your-validation-script.sh
```

---

## Integration Examples

### With CI/CD (GitHub Actions)

```yaml
name: Validate Chapter Content

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup General Sandbox
        run: bash .claude/skills/general-sandbox/scripts/setup-sandbox.sh

      - name: Install Stack
        run: |
          bash .claude/skills/general-sandbox/scripts/install-in-sandbox.sh "
            apt-get update && apt-get install -y nodejs npm python3
          "

      - name: Run Validation
        run: |
          bash .claude/skills/general-sandbox/scripts/validate-in-sandbox.sh \
            ./validate-all.sh \
            book-source/docs/
```

### With Pre-Commit Hooks

```bash
#!/bin/bash
# .git/hooks/pre-commit

echo "Validating staged files..."
bash .claude/skills/general-sandbox/scripts/validate-in-sandbox.sh \
  ./validate-staged.sh \
  .

if [ $? -ne 0 ]; then
  echo "❌ Validation failed. Commit aborted."
  exit 1
fi

echo "✅ Validation passed"
```

---

## Comparison: General Sandbox vs. Python Sandbox

| Feature | Python Sandbox | General Sandbox |
|---------|----------------|-----------------|
| **Language Support** | Python only | Any language |
| **Use Case** | Python code validation | Any tech stack validation |
| **Pre-installed Tools** | Python 3.14 + UV | Minimal (you choose) |
| **Setup Time** | Fast (pre-configured) | Flexible (install as needed) |
| **Best For** | Python chapters (12-29) | Part 2 tools, Part 5 frameworks |

**When to use each:**
- Use **Python Sandbox** for validating Python code in Chapters 12-29
- Use **General Sandbox** for validating Node, Rust, Go, multi-language stacks, tool installations, agentic frameworks

---

## Status Output

After successful execution, report:

```markdown
✅ STATUS=VALIDATED
📦 CONTAINER=general-sandbox
🔧 STACK=[installed tools]
📊 RESULTS=validation-output/report.md

Validation Summary:
- Total items validated: X
- Errors found: Y
- Success rate: Z%

Next steps:
1. Review results in validation-output/
2. Fix any errors found
3. Re-run validation
```

---

## Version History

**v1.0.0** (2025-01-13)
- Initial release
- Support for any Docker base image
- Installation script for arbitrary technology stacks
- Validation script executor
- Container lifecycle management
- Documentation and examples
