# AMI v1.0 API Reference

> Complete documentation for all MCP tools and HTTP endpoints

---

## MCP Tools (Claude Desktop / Antigravity)

### Core Kernel Operations

#### `get_identity_kernel()`
Retrieve the complete Sovereign Identity Kernel.

**Returns:** JSON string of entire kernel

**Example:**
```json
{
  "ami_version": "1.0",
  "identity": { ... },
  "philosophy": { ... },
  ...
}
```

---

#### `update_identity_kernel(field, value, writer)`
Update a specific field using dot notation.

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| field | string | Dot-notation path (e.g., `identity.human.location`) |
| value | string | New value (JSON parsed if valid) |
| writer | string | Agent identifier (default: "claude") |

**Example:**
```python
update_identity_kernel("identity.human.location", "Mumbai, India", "claude")
```

**Returns:**
```json
{"success": true, "field": "identity.human.location", "value": "Mumbai, India"}
```

---

### Module 1: Temporal Self

#### `get_temporal_profile()`
Get identity age, version, and evolution statistics.

**Returns:**
```json
{
  "version": "1.0",
  "days_alive": 237,
  "total_turns": 12,
  "last_update": "2025-12-11T10:35:00Z",
  "evolution_velocity": "stable"
}
```

---

### Module 2: Emotional Rhythm

#### `get_mood_trace()`
Analyze current time against known energy patterns.

**Returns:**
```json
{
  "timestamp": "2025-12-11T16:30:00",
  "local_hour": 16,
  "detected_mode": "Execution",
  "energy_level": "Medium-High",
  "recommendation": "Collaborate, code, ship."
}
```

**Energy Modes:**
| Hours | Mode | Energy |
|-------|------|--------|
| 00-06 | Deep Reflection | Low |
| 06-12 | High Clarity | High |
| 12-18 | Execution | Medium-High |
| 18-24 | Creative | Medium |

---

#### `predict_next_4h()`
Forecast cognitive state for the next 4 hours.

**Returns:**
```json
{
  "+1h": "Execution",
  "+2h": "Execution",
  "+3h": "Creative",
  "+4h": "Creative"
}
```

---

### Module 3: Consensus

#### `request_context(agent_name)`
Request current "truth" state for multi-agent consensus.

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| agent_name | string | Requesting agent (e.g., "antigravity") |

**Returns:**
```json
{
  "active_hand": null,
  "last_writer": "claude_opus_4.5",
  "consensus_status": "synced"
}
```

---

### Module 4: Identity Retrieval

#### `retrieve_identity_context(query)`
Retrieve specific identity facets based on natural language query.

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| query | string | Natural language query |

**Query Keywords:**
- "who" / "name" → Returns handle and human info
- "belief" / "value" / "why" → Returns philosophy
- "contact" / "social" → Returns social links

**Example:**
```python
retrieve_identity_context("what are Paul's beliefs?")
```

**Returns:**
```json
{
  "philosophy": {
    "core": "User sovereignty over AI automation",
    "approach": "Reflective AI as cognitive extension",
    "principles": [...]
  }
}
```

---

### Module 5: Vault Sync

#### `sync_vault(event_type, content)`
Log an event to the Obsidian Vault.

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| event_type | string | Category (e.g., "Session_Close", "Breakthrough") |
| content | string | Markdown content to log |

**Returns:**
```json
{"success": true, "file": "/path/to/MirrorFlow/Logs/2025-12-11_Kernel_Sync.md"}
```

**Vault Structure:**
```
MirrorDNA-Vault/
└── MirrorFlow/
    └── Logs/
        └── 2025-12-11_Kernel_Sync.md
```

---

### Module 6: Timeline

#### `add_timeline_event(category, description, writer)`
Add a significant event to the identity timeline.

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| category | string | Event type (breakthrough, collapse, dip, verification) |
| description | string | What happened |
| writer | string | Agent that recorded it |

**Example:**
```python
add_timeline_event("breakthrough", "Achieved model-agnostic identity", "claude")
```

**Returns:** `true`

---

### Module 7: Internal Mirrors

#### `mirror_reflect()`
Perform self-analysis and drift detection.

**Returns:**
```json
{
  "coherence_score": 1.0,
  "drift_detected": false,
  "checks": [
    {"status": "PASS", "msg": "Handle: active-mirror-paul"},
    {"status": "PASS", "msg": "History chain integrity OK"},
    {"status": "PASS", "msg": "Checksum valid"}
  ],
  "reflection": "I am coherent."
}
```

**Coherence Checks:**
1. Handle validity (not UNKNOWN)
2. History chain integrity
3. Checksum verification

---

### Module 8: Recovery

#### `recover_identity()`
Attempt fail-safe restore from backup.

**Returns (success):**
```json
{
  "success": true,
  "restored_from": "ami_backup_20251211_103500.json",
  "timestamp": "2025-12-11T10:35:00Z"
}
```

**Returns (failure):**
```json
{"error": "No backups available"}
```

---

### Module 9: Persona

#### `get_persona_profile()`
Get writing tone and style guidelines.

**Returns:**
```json
{
  "tone": "Calm, direct, warm, precise",
  "style": "Natural prose",
  "glyphs_active": true,
  "forbidden_phrases": ["As an AI", "I cannot", "I am a text-based model"],
  "signature_block": "⟡ Active Mirror"
}
```

---

### Module 10: Collaboration

#### `negotiate_collaboration(task_type)`
Get protocol for a specific collaboration type.

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| task_type | string | Type of task |

**Supported Task Types:**
| Type | Protocol |
|------|----------|
| code_edit | User approval for destructive actions |
| ideation | Generate 3 options, user decides |
| debugging | Autonomous investigation, report RCA |
| identity_change | STRICT: requires ⟡ glyph approval |

**Returns:**
```json
{
  "task": "debugging",
  "protocol": "Autonomous investigation allowed. Report back with RCA.",
  "mode": "Sovereign Partner"
}
```

---

## HTTP APIs

### Kernel API (`:8082`)
For local models (Ollama, LM Studio)

```bash
# Get kernel
curl http://localhost:8082/kernel

# Update kernel
curl -X POST http://localhost:8082/kernel \
  -H "Content-Type: application/json" \
  -d '{"field": "identity.human.location", "value": "Mumbai", "writer": "ollama"}'
```

### Mobile API (`:8084`)
For Tailscale mobile access

```bash
# Get kernel (via Tailscale IP)
curl http://100.x.x.x:8084/kernel
```

---

## Error Handling

All tools return JSON with `error` key on failure:

```json
{"error": "Kernel Not Found"}
{"error": "Corrupt Kernel JSON"}
{"error": "Vault not found at /path"}
{"error": "All backups failed"}
```

---

⟡ Active Mirror Identity — API Reference v1.0
