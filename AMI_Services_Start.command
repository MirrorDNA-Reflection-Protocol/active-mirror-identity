#!/bin/bash

# AMI Services Startup Script
# Adds 24x7 persistence by inheriting Terminal permissions.

# 1. Define Paths
AMI_ROOT="/Users/mirror-admin/Documents/GitHub/AMI"
LOG_DIR="$AMI_ROOT/logs"
mkdir -p "$LOG_DIR"

# 2. Activate Environment
source "$AMI_ROOT/venv/bin/activate"

# 3. Start Synapse (The Nervous System)
echo "🧠 Starting Synapse Daemon..."
nohup python3 "$AMI_ROOT/metadata/synapse.py" > "$LOG_DIR/synapse.log" 2>&1 &
echo "   PID: $!"

# 4. Start MCP Server (The Interface)
# echo "🔌 Starting AMI MCP Server..."
# nohup python3 "$AMI_ROOT/mcp/server.py" > "$LOG_DIR/mcp.log" 2>&1 &
# echo "   PID: $!"

echo "✅ AMI Identity Kernel Services Active."
echo "   Logs: $LOG_DIR"
