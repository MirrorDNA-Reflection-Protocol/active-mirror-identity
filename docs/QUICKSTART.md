# AMI v1.0 Quickstart

> Get your Sovereign Identity Kernel running in 5 minutes

---

## Prerequisites

- Python 3.10+
- Claude Desktop or Antigravity (VSCode fork)
- UV package manager (recommended) or pip

---

## Step 1: Clone the Repository

```bash
git clone https://github.com/MirrorDNA-Reflection-Protocol/active-mirror-identity.git
cd active-mirror-identity
```

---

## Step 2: Install Dependencies

```bash
# Using UV (recommended)
uv pip install mcp

# Or using pip
pip install mcp
```

---

## Step 3: Configure Claude Desktop

Edit `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "mirror-identity": {
      "command": "uv",
      "args": [
        "run",
        "--python", "3.12",
        "--with", "mcp",
        "/path/to/active-mirror-identity/server/main.py"
      ]
    }
  }
}
```

Replace `/path/to/` with your actual path.

---

## Step 4: Restart Claude Desktop

1. Quit Claude Desktop completely
2. Relaunch Claude Desktop
3. Check for the 🔌 MCP indicator in the interface

---

## Step 5: Verify Installation

In Claude, type:

> "Get my identity kernel"

Claude should call `get_identity_kernel()` and return your kernel JSON.

---

## Optional: HTTP APIs for Local Models

### Start Kernel API (for Ollama/LM Studio)

```bash
python kernel_api.py
# Runs on http://localhost:8082
```

### Start Mobile API (for Tailscale access)

```bash
python mobile_api.py
# Runs on http://localhost:8084
```

---

## Optional: Auto-Save Daemon

Keep automatic backups running:

```bash
python auto_save_daemon.py &
# Creates backups in ./backups/ every 30 minutes of inactivity
```

---

## Test the Tools

| Command | Expected Result |
|---------|-----------------|
| "What's my identity age?" | Calls `get_temporal_profile()` |
| "What's my energy state?" | Calls `get_mood_trace()` |
| "Run drift detection" | Calls `mirror_reflect()` |
| "What's my persona style?" | Calls `get_persona_profile()` |

---

## Troubleshooting

### MCP tools not appearing

1. Check Claude logs: `~/Library/Logs/Claude/`
2. Verify Python path in config
3. Ensure `mcp` package is installed

### Kernel not found

1. Verify `ami_active-mirror.json` exists in repo root
2. Check file permissions

### Checksum warnings

Run `mirror_reflect()` to diagnose. If corruption detected, run `recover_identity()`.

---

## Next Steps

- Read [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
- Read [API_REFERENCE.md](./API_REFERENCE.md) for all tools
- Read [KERNEL_SPEC.md](./KERNEL_SPEC.md) for JSON schema

---

⟡ You now have sovereign AI identity.
