#!/bin/bash
# install-in-sandbox.sh - Install tools/languages in sandbox
# Version: 1.0.0

set -e

CONTAINER_NAME="${CONTAINER_NAME:-general-sandbox}"

if [ $# -lt 1 ]; then
    echo "Usage: $0 \"commands to execute\""
    echo ""
    echo "Example:"
    echo "  $0 \"apt-get install -y nodejs npm\""
    echo ""
    echo "  $0 \"\\"
    echo "    curl -fsSL https://deno.land/install.sh | sh"
    echo "    export PATH=\\\"\\\$HOME/.deno/bin:\\\$PATH\\\""
    echo "    deno --version"
    echo "  \""
    exit 1
fi

COMMANDS="$1"

echo "🔧 Installing in Sandbox: ${CONTAINER_NAME}"
echo "==========================================="
echo ""

# Check if container exists and is running
if ! docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo "❌ Container '${CONTAINER_NAME}' is not running"
    echo "💡 Run: bash scripts/setup-sandbox.sh"
    exit 2
fi

echo "📦 Executing installation commands..."
echo ""

# Execute commands in container
if docker exec "${CONTAINER_NAME}" bash -c "$COMMANDS"; then
    echo ""
    echo "✅ Installation complete!"
    exit 0
else
    echo ""
    echo "❌ Installation failed (exit code: $?)"
    exit 1
fi
