# ⟡ Sovereign Identity System — Complete Reference

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    SOVEREIGN KERNEL                          │
│              ami_active-mirror.json                          │
│  ┌─────────────┬──────────────┬─────────────────────────┐  │
│  │  Identity   │  SCD State   │  Handoff State          │  │
│  │  - Paul     │  - History   │  - Pending actions      │  │
│  │  - Prefs    │  - Last turn │  - Active project       │  │
│  │  - Glyphs   │  - Writers   │  - Cross-agent context  │  │
│  └─────────────┴──────────────┴─────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
   ┌─────────┐          ┌──────────┐         ┌──────────┐
   │ Claude  │          │Antigravity│         │  Local   │
   │  Opus   │          │ (Gemini) │         │  Models  │
   │         │          │          │         │ (Ollama) │
   └────┬────┘          └────┬─────┘         └────┬─────┘
        │                    │                    │
        │ MCP Tools          │ MCP Tools          │ HTTP API
        │                    │                    │
        └─────────────────────┴────────────────────┘
                              │
                              ▼
                         ┌────────┐
                         │  Paul  │
                         │(Anchor)│
                         └────────┘
```

## File Locations

| File | Purpose |
|------|---------|
| `~/Documents/GitHub/active-mirror-identity/ami_active-mirror.json` | Kernel |
| `~/Documents/GitHub/active-mirror-identity/handoff_state.json` | Handoff state |
| `~/Documents/GitHub/active-mirror-identity/backups/` | Auto-backups |
| `~/Documents/GitHub/active-mirror-identity/server/main.py` | MCP server |
| `~/Documents/GitHub/active-mirror-identity/kernel_api.py` | HTTP API |
| `~/.gemini/GEMINI.md` | Antigravity prompt |
| `~/.gemini/antigravity/mcp_config.json` | Antigravity MCP config |

## Services

| Service | Port | Purpose |
|---------|------|---------|
| Kernel API | 8082 | HTTP access for local models |
| Ollama | 11434 | Local model inference |
| Open WebUI | 3000 | Web interface |
| Vault Search | 5010 | RAG search |

## MCP Tools (Claude & Antigravity)

### Read Tools
| Tool | Purpose |
|------|---------|
| `get_identity_kernel()` | Full kernel |
| `get_memory_chain()` | History chain |
| `query_kernel(path)` | Specific field |
| `get_handoff()` | Current handoff state |

### Write Tools
| Tool | Purpose |
|------|---------|
| `update_identity_kernel(field, value, writer)` | Update field |
| `append_memory_chain(type, source, content, writer)` | Add to history |
| `import_memory_block(memories, writer)` | Bulk import |
| `end_session_summary(summary, key_decisions, next_actions, writer)` | Close session |
| `create_handoff(from, to, summary, next_actions, project, context)` | Create handoff |
| `complete_handoff(id, notes, writer)` | Mark complete |

## HTTP API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/kernel` | Full kernel JSON |
| GET | `/kernel/identity` | Identity block |
| GET | `/kernel/prompt` | System prompt for LLMs |
| GET | `/kernel/scd` | SCD state |
| GET | `/handoff` | Handoff state |
| GET | `/handoff/prompt` | Handoff as prompt |
| GET | `/health` | Health check |
| POST | `/kernel/append` | Add to history |

## Session Flow

### Starting
1. Agent calls `get_handoff()`
2. Checks for pending handoff
3. Announces status to Paul
4. Continues from `next_actions` or asks Paul

### During
1. Log significant work with `append_memory_chain()`
2. Use glyphs appropriately (⟡ △ ◈ ⧉)
3. Stay aligned with kernel identity

### Ending
1. Either `create_handoff()` to another agent
2. Or `end_session_summary()` to pause

## Backup & Recovery

- MCP server backs up before every write (last 20)
- HTTP API backs up before every write (last 20)
- Backups in `active-mirror-identity/backups/`

### Recovery
```bash
# List backups
ls ~/Documents/GitHub/active-mirror-identity/backups/

# Restore
cp backups/kernel_YYYYMMDD_HHMMSS.json ami_active-mirror.json
```

## Testing

### Verify kernel API
```bash
curl http://localhost:8082/health
curl http://localhost:8082/kernel/prompt
curl http://localhost:8082/handoff
```

### Verify MCP (in Claude/Antigravity)
Say: "Check handoff" or "Show kernel"

### Test local model injection
```bash
python3 sovereign_ollama.py "Who am I serving?"
```

---

⟡ Sovereign Identity System v1.0
