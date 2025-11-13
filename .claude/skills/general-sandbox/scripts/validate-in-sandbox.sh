#!/bin/bash
# validate-in-sandbox.sh - Execute validation script in sandbox
# Version: 1.0.0

set -e

CONTAINER_NAME="${CONTAINER_NAME:-general-sandbox}"

if [ $# -lt 2 ]; then
    echo "Usage: $0 <validation-script> <target-directory> [output-dir]"
    echo ""
    echo "Arguments:"
    echo "  validation-script  Path to bash script that performs validation"
    echo "  target-directory   Path to code/content to validate"
    echo "  output-dir         Optional: where to save results (default: validation-output)"
    echo ""
    echo "Example:"
    echo "  $0 ./validate-chapter.sh book-source/docs/02-Part-2/05-npm-chapter"
    exit 3
fi

VALIDATION_SCRIPT="$1"
TARGET_DIR="$2"
OUTPUT_DIR="${3:-validation-output}"

echo "🔍 General Sandbox Validation"
echo "============================="
echo ""

# Validate inputs
if [ ! -f "$VALIDATION_SCRIPT" ]; then
    echo "❌ Validation script not found: $VALIDATION_SCRIPT"
    exit 3
fi

if [ ! -d "$TARGET_DIR" ]; then
    echo "❌ Target directory not found: $TARGET_DIR"
    exit 3
fi

# Check if container is running
if ! docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo "❌ Container '${CONTAINER_NAME}' is not running"
    echo "💡 Run: bash scripts/setup-sandbox.sh"
    exit 2
fi

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Get absolute paths
ABS_SCRIPT=$(cd "$(dirname "$VALIDATION_SCRIPT")" && pwd)/$(basename "$VALIDATION_SCRIPT")
ABS_TARGET=$(cd "$TARGET_DIR" && pwd)
ABS_OUTPUT=$(cd "$OUTPUT_DIR" && pwd)

echo "📊 Validation Configuration:"
echo "   Container: ${CONTAINER_NAME}"
echo "   Script: $(basename "$VALIDATION_SCRIPT")"
echo "   Target: $TARGET_DIR"
echo "   Output: $OUTPUT_DIR"
echo ""

# Copy validation script to container
echo "📤 Uploading validation script..."
docker cp "$ABS_SCRIPT" "${CONTAINER_NAME}:/tmp/validate.sh"
docker exec "${CONTAINER_NAME}" chmod +x /tmp/validate.sh

# Copy target directory to container
echo "📤 Uploading target directory..."
docker exec "${CONTAINER_NAME}" rm -rf /workspace
docker cp "$ABS_TARGET" "${CONTAINER_NAME}:/workspace"

echo ""
echo "🚀 Executing validation..."
echo "─────────────────────────────────────────"

# Run validation and capture output
if docker exec "${CONTAINER_NAME}" bash /tmp/validate.sh > "${ABS_OUTPUT}/validation.log" 2>&1; then
    RESULT="✅ PASSED"
    EXIT_CODE=0
else
    RESULT="❌ FAILED"
    EXIT_CODE=1
fi

echo "─────────────────────────────────────────"
echo ""
echo "📋 Validation Result: ${RESULT}"
echo ""

# Display log
echo "📄 Validation Log:"
cat "${ABS_OUTPUT}/validation.log"
echo ""

# Generate summary
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
cat > "${ABS_OUTPUT}/summary.md" << EOF
# Validation Summary

**Timestamp:** ${TIMESTAMP}
**Container:** ${CONTAINER_NAME}
**Target:** ${TARGET_DIR}
**Script:** $(basename "$VALIDATION_SCRIPT")

## Result

${RESULT}

## Log Output

\`\`\`
$(cat "${ABS_OUTPUT}/validation.log")
\`\`\`

## Next Steps

$(if [ $EXIT_CODE -eq 0 ]; then
    echo "- ✅ Validation passed. Content is ready for publication."
else
    echo "- ❌ Review errors above and fix issues"
    echo "- 🔄 Re-run validation after fixes"
fi)
EOF

echo "💾 Results saved to: ${OUTPUT_DIR}/"
echo "   - validation.log (raw output)"
echo "   - summary.md (formatted report)"
echo ""

exit $EXIT_CODE
