# Validation Script Examples

This directory contains example validation scripts for different technology stacks.

## Available Examples

### Node.js (`validate-nodejs.sh`)

Validates Node.js projects by:
- Checking for package.json
- Installing dependencies with npm
- Running tests (if test script exists)
- Executing main entry point (index.js or app.js)

**Usage:**
```bash
bash scripts/validate-in-sandbox.sh examples/validate-nodejs.sh /path/to/nodejs-project
```

### Python (`validate-python.sh`)

Validates Python projects by:
- Checking for requirements.txt or pyproject.toml
- Installing dependencies with pip
- Running tests with pytest or unittest
- Executing main entry point (main.py or app.py)

**Usage:**
```bash
bash scripts/validate-in-sandbox.sh examples/validate-python.sh /path/to/python-project
```

## Creating Custom Validation Scripts

Validation scripts run **inside** the sandbox container with:
- Target code copied to `/workspace`
- All installed tools available
- Executed with bash

**Template:**
```bash
#!/bin/bash
set -e

echo "🔍 My Custom Validation"
echo "======================="
echo ""

cd /workspace

# Your validation logic here
# - Check files exist
# - Install dependencies
# - Run tests
# - Execute code
# - Verify outputs

echo "✅ Validation complete!"
```

**Exit codes:**
- `0` = Validation passed
- Non-zero = Validation failed

## Common Patterns

### Installing Tools
```bash
# Install via apt
apt-get update && apt-get install -y <package>

# Install via language package managers
npm install          # Node.js
pip install -r requirements.txt   # Python
cargo build          # Rust
go mod download      # Go
```

### Running Tests
```bash
npm test             # Node.js
pytest               # Python
cargo test           # Rust
go test ./...        # Go
```

### Checking File Existence
```bash
if [ ! -f "config.json" ]; then
    echo "❌ config.json missing"
    exit 1
fi
```

### Validating Output
```bash
OUTPUT=$(python main.py)
if echo "$OUTPUT" | grep -q "Expected pattern"; then
    echo "✅ Output correct"
else
    echo "❌ Output incorrect"
    exit 1
fi
```
