#!/bin/bash
# Example validation script for Python projects
# This runs inside the sandbox container

set -e

echo "🐍 Python Project Validation"
echo "============================"
echo ""

# Check if workspace exists
if [ ! -d "/workspace" ]; then
    echo "❌ /workspace directory not found"
    exit 1
fi

cd /workspace

echo "📂 Workspace contents:"
ls -la
echo ""

# Check for requirements.txt or pyproject.toml
if [ -f "requirements.txt" ]; then
    echo "✅ requirements.txt found"
    echo ""
    echo "📦 Installing dependencies..."
    python3 -m pip install --quiet -r requirements.txt
    echo ""
elif [ -f "pyproject.toml" ]; then
    echo "✅ pyproject.toml found"
    echo ""
    echo "📦 Installing dependencies..."
    python3 -m pip install --quiet .
    echo ""
else
    echo "⚠️  No requirements.txt or pyproject.toml found"
    echo ""
fi

# Run tests if they exist
if [ -d "tests" ] || [ -f "test_*.py" ]; then
    echo "🧪 Running tests..."
    python3 -m pytest -v || python3 -m unittest discover -v
    echo ""
fi

# Check for main entry point
if [ -f "main.py" ]; then
    echo "✅ main.py found"
    echo ""
    echo "🚀 Running main.py..."
    python3 main.py
elif [ -f "app.py" ]; then
    echo "✅ app.py found"
    echo ""
    echo "🚀 Running app.py..."
    python3 app.py
else
    echo "⚠️  No main.py or app.py found"
fi

echo ""
echo "✅ Validation complete!"
