#!/bin/bash
# Example validation script for Node.js projects
# This runs inside the sandbox container

set -e

echo "🧪 Node.js Project Validation"
echo "=============================="
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

# Check for package.json
if [ ! -f "package.json" ]; then
    echo "⚠️  No package.json found"
else
    echo "✅ package.json found"
    echo ""
    echo "📦 Installing dependencies..."
    npm install --silent
    echo ""
fi

# Run tests if test script exists
if [ -f "package.json" ] && grep -q '"test"' package.json; then
    echo "🧪 Running tests..."
    npm test
    echo ""
fi

# Check for main entry point
if [ -f "index.js" ]; then
    echo "✅ index.js found"
    echo ""
    echo "🚀 Running index.js..."
    node index.js
elif [ -f "app.js" ]; then
    echo "✅ app.js found"
    echo ""
    echo "🚀 Running app.js..."
    node app.js
else
    echo "⚠️  No index.js or app.js found"
fi

echo ""
echo "✅ Validation complete!"
