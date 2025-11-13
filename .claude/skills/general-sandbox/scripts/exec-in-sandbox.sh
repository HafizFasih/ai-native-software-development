#!/bin/bash
# exec-in-sandbox.sh - Execute arbitrary commands in sandbox
# Version: 1.0.0

set -e

CONTAINER_NAME="${CONTAINER_NAME:-general-sandbox}"

if [ $# -lt 1 ]; then
    echo "Usage: $0 \"command to execute\""
    echo ""
    echo "Example:"
    echo "  $0 \"node --version\""
    echo "  $0 \"python3 -c 'print(42)'\""
    echo "  $0 \"ls -la /workspace\""
    exit 1
fi

COMMAND="$1"

# Check if container is running
if ! docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo "❌ Container '${CONTAINER_NAME}' is not running"
    echo "💡 Run: bash scripts/setup-sandbox.sh"
    exit 2
fi

# Execute command
docker exec "${CONTAINER_NAME}" bash -c "$COMMAND"
