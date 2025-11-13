#!/bin/bash
# reset-sandbox.sh - Remove and recreate sandbox container
# Version: 1.0.0

set -e

CONTAINER_NAME="${CONTAINER_NAME:-general-sandbox}"
BASE_IMAGE="${1:-ubuntu:24.04}"

echo "🔄 Resetting Sandbox Container"
echo "==============================="
echo ""

# Check if container exists
if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo "🗑️  Stopping and removing existing container..."

    # Stop if running
    if docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
        docker stop "${CONTAINER_NAME}" > /dev/null
        echo "   ✓ Container stopped"
    fi

    # Remove container
    docker rm "${CONTAINER_NAME}" > /dev/null
    echo "   ✓ Container removed"
    echo ""
else
    echo "ℹ️  No existing container found"
    echo ""
fi

# Recreate container
echo "🔨 Creating fresh container..."
bash "$(dirname "$0")/setup-sandbox.sh" "$BASE_IMAGE" "$CONTAINER_NAME"
