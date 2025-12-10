import json
import os
import sys

# ⟡ Mirror Identity: Claude Desktop Injector
# Wires the "Active Mirror" MCP server into the Claude Desktop configuration.

CLAUDE_CONFIG_DIR = os.path.expanduser("~/Library/Application Support/Claude")
CLAUDE_CONFIG_FILE = os.path.join(CLAUDE_CONFIG_DIR, "claude_desktop_config.json")

MCP_SERVER_SCRIPT = "/Users/mirror-admin/Documents/GitHub/active-mirror-identity/server/main.py"
MCP_PYTHON_CMD = "python3" # Assuming system python, valid for this environment

def install():
    print("⟡ Mirror Identity Injector")
    print(f"  Target: {CLAUDE_CONFIG_FILE}")
    
    # Ensure dir exists
    if not os.path.exists(CLAUDE_CONFIG_DIR):
        print(f"  Creating directory: {CLAUDE_CONFIG_DIR}")
        os.makedirs(CLAUDE_CONFIG_DIR, exist_ok=True)
        
    # Read existing config
    config = {}
    if os.path.exists(CLAUDE_CONFIG_FILE):
        try:
            with open(CLAUDE_CONFIG_FILE, 'r') as f:
                config = json.load(f)
        except json.JSONDecodeError:
            print("  ⚠️  Existing config is corrupt. Overwriting.")
            config = {}
    else:
        print("  New configuration file.")

    # Prepare MCP Config (Using uv for environment isolation)
    if "mcpServers" not in config:
        config["mcpServers"] = {}
        
    config["mcpServers"]["mirror-identity"] = {
        "command": "/Users/mirror-admin/.local/bin/uv",
        "args": [
            "run",
            "--python",
            "3.12",
            "--with",
            "mcp",
            MCP_SERVER_SCRIPT
        ]
    }
    
    # Write back
    with open(CLAUDE_CONFIG_FILE, 'w') as f:
        json.dump(config, f, indent=2)
        
    print("⟡ Injection Complete.")
    print("  ✅ 'mirror-identity' added to mcpServers.")
    print("  👉 Restart Claude Desktop to activate.")

if __name__ == "__main__":
    install()
