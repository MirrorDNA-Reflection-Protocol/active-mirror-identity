# Scripts

Utility scripts for AMI v1.0.

## Services

| Script | Port | Purpose |
|--------|------|---------|
| `kernel_api.py` | 8082 | HTTP API for local models (Ollama) |
| `mobile_api.py` | 8084 | HTTP API for Tailscale mobile access |
| `auto_save_daemon.py` | — | Periodic kernel backup service |

## Tools

| Script | Purpose |
|--------|---------|
| `ami_installer.py` | Initialize new AMI kernel |
| `install_mcp_config.py` | Configure Claude Desktop MCP |
| `vault_hydrator.py` | Populate kernel from Vault |
| `conflict_resolution.py` | Resolve concurrent write conflicts |
| `encryption.py` | Kernel encryption utilities |
| `sovereign_ollama.py` | Direct Ollama integration |

## Shell

| Script | Purpose |
|--------|---------|
| `start_kernel_api.sh` | Launch kernel API service |
| `voice_trigger.sh` | Voice command integration |

## Usage

```bash
# Start kernel API
python scripts/kernel_api.py

# Start mobile API
python scripts/mobile_api.py

# Run auto-save daemon
python scripts/auto_save_daemon.py &
```
