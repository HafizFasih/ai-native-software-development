#!/bin/bash
# setup-sandbox.sh - Create persistent Docker sandbox container
# Version: 1.0.0

set -e

# Configuration
DEFAULT_BASE_IMAGE="ubuntu:24.04"
DEFAULT_CONTAINER_NAME="general-sandbox"

BASE_IMAGE="${1:-$DEFAULT_BASE_IMAGE}"
CONTAINER_NAME="${2:-$DEFAULT_CONTAINER_NAME}"

echo "🐳 General Sandbox Setup"
echo "======================="
echo ""

# Check if Docker is running
if ! docker info &>/dev/null; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if container already exists
if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo "📦 Container '${CONTAINER_NAME}' already exists"

    # Check if it's running
    if docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
        echo "✅ Container is running"
        CONTAINER_ID=$(docker ps -q -f "name=${CONTAINER_NAME}")
        echo ""
        echo "📊 Container Details:"
        echo "   Container ID: ${CONTAINER_ID}"
        echo "   Status: Running"
        echo "   Base Image: $(docker inspect -f '{{.Config.Image}}' ${CONTAINER_NAME})"
        echo ""
        echo "💡 Use: docker exec -it ${CONTAINER_NAME} bash"
        exit 0
    else
        echo "🔄 Starting existing container..."
        docker start "${CONTAINER_NAME}"
        CONTAINER_ID=$(docker ps -q -f "name=${CONTAINER_NAME}")
        echo "✅ Container started: ${CONTAINER_ID}"
        exit 0
    fi
fi

# Pull base image if not present
echo "📥 Pulling base image: ${BASE_IMAGE}"
docker pull "${BASE_IMAGE}"

# Create container with basic utilities
echo ""
echo "🔨 Creating new sandbox container..."
CONTAINER_ID=$(docker run -d \
    --name "${CONTAINER_NAME}" \
    --hostname sandbox \
    -v /tmp:/tmp \
    "${BASE_IMAGE}" \
    tail -f /dev/null)

echo "✅ Container created: ${CONTAINER_ID:0:12}"

# Install basic utilities
echo ""
echo "📦 Installing basic utilities..."
docker exec "${CONTAINER_NAME}" bash -c "
    if command -v apt-get &>/dev/null; then
        apt-get update -qq
        apt-get install -y -qq curl wget git build-essential ca-certificates > /dev/null 2>&1
        echo '✅ Ubuntu/Debian utilities installed'
    elif command -v apk &>/dev/null; then
        apk add --no-cache curl wget git build-base ca-certificates > /dev/null 2>&1
        echo '✅ Alpine utilities installed'
    elif command -v yum &>/dev/null; then
        yum install -y -q curl wget git gcc make > /dev/null 2>&1
        echo '✅ CentOS/RHEL utilities installed'
    else
        echo '⚠️  Unknown package manager, skipping utility installation'
    fi
"

echo ""
echo "🎉 Sandbox Setup Complete!"
echo ""
echo "📊 Environment Details:"
echo "   Container: ${CONTAINER_NAME}"
echo "   Container ID: ${CONTAINER_ID:0:12}"
echo "   Base Image: ${BASE_IMAGE}"
echo "   Status: Running"
echo ""
echo "🎯 Next Steps:"
echo "   1. Install your stack: bash scripts/install-in-sandbox.sh \"commands\""
echo "   2. Run validation: bash scripts/validate-in-sandbox.sh <script> <target>"
echo "   3. Interactive shell: docker exec -it ${CONTAINER_NAME} bash"
echo ""
echo "💡 Tip: This container is persistent. No need to recreate for future validations!"
