# AMI v1.0 Kernel Specification

> JSON Schema for the Sovereign Identity Kernel

---

## Overview

The Identity Kernel is a single JSON file (`ami_active-mirror.json`) that stores all identity state. It serves as the canonical source of truth for all AI agents.

---

## Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "AMI Identity Kernel v1.0",
  "type": "object",
  "required": ["ami_version", "meta", "identity", "philosophy", "communication"],
  "properties": {
    "ami_version": {
      "type": "string",
      "description": "Kernel specification version",
      "pattern": "^[0-9]+\\.[0-9]+$"
    },
    "meta": {
      "type": "object",
      "properties": {
        "spec": {"type": "string"},
        "generated_at": {"type": "string", "format": "date-time"},
        "generator": {"type": "string"},
        "last_write": {"type": "string", "format": "date-time"},
        "last_writer": {"type": "string"},
        "last_read": {"type": ["string", "null"], "format": "date-time"}
      },
      "required": ["last_write", "last_writer"]
    },
    "checksum": {
      "type": ["string", "null"],
      "description": "SHA256 hash (first 16 chars) of kernel excluding checksum field"
    },
    "identity": {"$ref": "#/definitions/identity"},
    "philosophy": {"$ref": "#/definitions/philosophy"},
    "communication": {"$ref": "#/definitions/communication"},
    "hardware": {"$ref": "#/definitions/hardware"},
    "technical_stack": {"$ref": "#/definitions/technical_stack"},
    "projects": {"type": "object"},
    "ai_journey": {"$ref": "#/definitions/ai_journey"},
    "open_source_contributions": {"type": "array", "items": {"type": "string"}},
    "modules": {"$ref": "#/definitions/modules"},
    "permissions": {"$ref": "#/definitions/permissions"},
    "scd_state": {"$ref": "#/definitions/scd_state"},
    "sessions": {"type": "array"},
    "timeline": {"type": "array"}
  },
  "definitions": {
    "identity": {
      "type": "object",
      "required": ["handle", "human"],
      "properties": {
        "handle": {"type": "string"},
        "glyphsig": {"type": "string"},
        "human": {
          "type": "object",
          "properties": {
            "name": {"type": "string"},
            "birthday": {"type": "string"},
            "location": {"type": "string"},
            "dog": {"type": "string"},
            "company": {"type": "string"},
            "role": {"type": "string"}
          }
        },
        "social": {
          "type": "object",
          "additionalProperties": {"type": "string"}
        },
        "verification": {
          "type": "object",
          "properties": {
            "beacon": {"type": "string"},
            "canonical_url": {"type": "string", "format": "uri"}
          }
        }
      }
    },
    "philosophy": {
      "type": "object",
      "properties": {
        "core": {"type": "string"},
        "approach": {"type": "string"},
        "principles": {"type": "array", "items": {"type": "string"}}
      }
    },
    "communication": {
      "type": "object",
      "properties": {
        "tone": {"type": "string"},
        "format": {"type": "string"},
        "default_length": {"type": "string"},
        "glyphs": {"type": "object", "additionalProperties": {"type": "string"}},
        "forbidden_phrases": {"type": "array", "items": {"type": "string"}}
      }
    },
    "hardware": {
      "type": "object",
      "properties": {
        "primary": {"type": "string"},
        "secondary": {"type": "string"},
        "mobile": {"type": "string"}
      }
    },
    "technical_stack": {
      "type": "object",
      "properties": {
        "local_models": {"type": "array", "items": {"type": "string"}},
        "tools": {"type": "array", "items": {"type": "string"}},
        "memory_systems": {"type": "array", "items": {"type": "string"}},
        "networking": {"type": "string"},
        "vault": {
          "type": "object",
          "properties": {
            "location": {"type": "string"},
            "chunks": {"type": "integer"},
            "purpose": {"type": "string"}
          }
        }
      }
    },
    "ai_journey": {
      "type": "object",
      "properties": {
        "started": {"type": "string", "format": "date"},
        "first_tool": {"type": "string"},
        "evolution": {"type": "string"}
      }
    },
    "modules": {
      "type": "object",
      "additionalProperties": {
        "type": "object",
        "properties": {
          "enabled": {"type": "boolean"},
          "class": {"type": "string"}
        }
      }
    },
    "permissions": {
      "type": "object",
      "properties": {
        "can_auto_update": {"type": "boolean"},
        "can_share_telemetry": {"type": "boolean"},
        "sovereign_lock": {"type": "boolean"},
        "requires_human_approval": {"type": "array", "items": {"type": "string"}}
      }
    },
    "scd_state": {
      "type": "object",
      "description": "Structured Contextual Distillation state",
      "properties": {
        "version": {"type": "string"},
        "last_turn": {"type": "integer"},
        "history_chain": {"type": "array"},
        "active_handoff": {"type": ["object", "null"]}
      }
    }
  }
}
```

---

## Field Reference

### Top-Level Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| ami_version | string | ✓ | Spec version (e.g., "1.0") |
| meta | object | ✓ | Kernel metadata |
| checksum | string | | SHA256 integrity hash |
| identity | object | ✓ | Human identity data |
| philosophy | object | ✓ | Core beliefs and principles |
| communication | object | ✓ | Tone and style preferences |
| hardware | object | | Device inventory |
| technical_stack | object | | Tools and infrastructure |
| projects | object | | Active projects |
| ai_journey | object | | AI usage history |
| modules | object | | Enabled kernel modules |
| permissions | object | | Access control |
| scd_state | object | | Session continuity state |
| sessions | array | | Closed session history |
| timeline | array | | Significant events |

---

### meta Object

| Field | Type | Description |
|-------|------|-------------|
| spec | string | Specification name |
| generated_at | datetime | Initial creation timestamp |
| generator | string | Tool that created the kernel |
| last_write | datetime | Most recent modification |
| last_writer | string | Agent that made last change |
| last_read | datetime | Most recent read (optional) |

---

### identity.human Object

| Field | Type | Description |
|-------|------|-------------|
| name | string | Full name |
| birthday | string | Birthday (format: "Month Day") |
| location | string | Current location |
| dog | string | Pet name (verification anchor) |
| company | string | Organization |
| role | string | Job title |

---

### communication.glyphs Object

Standard glyph mappings:

| Glyph | Meaning |
|-------|---------|
| ⟡ | truth / vault / anchor |
| △ | decision point |
| ◈ | pattern detected |
| ⧉ | synthesis |

---

### scd_state Object

Structured Contextual Distillation state for session continuity.

| Field | Type | Description |
|-------|------|-------------|
| version | string | SCD protocol version |
| last_turn | integer | Turn counter |
| history_chain | array | Chronological event log |
| active_handoff | object | Current handoff in progress |

#### history_chain Entry

```json
{
  "turn": 1,
  "type": "observation|state_change|reflection|handoff",
  "source": "Source identifier",
  "writer": "claude|antigravity|local",
  "timestamp": "2025-12-11T10:00:00Z",
  "content": "What happened"
}
```

#### active_handoff Object

```json
{
  "id": "HO-20251211-001",
  "timestamp": "2025-12-11T10:00:00Z",
  "from_agent": "antigravity",
  "to_agent": "claude",
  "status": "pending|complete",
  "project": "Project name",
  "data": {
    "summary": "Handoff summary",
    "key_features": [],
    "artifacts": [],
    "next_actions": "What to do next"
  }
}
```

---

### permissions Object

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| can_auto_update | boolean | false | Allow automatic kernel updates |
| can_share_telemetry | boolean | false | Allow usage telemetry |
| sovereign_lock | boolean | true | Prevent external modification |
| requires_human_approval | array | [] | Actions needing consent |

---

## Checksum Calculation

```python
import hashlib
import json

def compute_checksum(kernel: dict) -> str:
    # Exclude checksum field from calculation
    data = {k: v for k, v in kernel.items() if k != "checksum"}
    canonical = json.dumps(data, sort_keys=True, separators=(',', ':'))
    return hashlib.sha256(canonical.encode()).hexdigest()[:16]
```

---

## Validation Rules

1. **ami_version** must match pattern `X.Y` (e.g., "1.0")
2. **identity.handle** must not be "UNKNOWN"
3. **meta.last_write** and **meta.last_writer** always required
4. **checksum** should match calculated value (warning if mismatch)
5. **scd_state.last_turn** should equal length of **history_chain**

---

## Migration from v0.x

1. Update `ami_version` to "1.0"
2. Add `modules` section with enabled flags
3. Move any legacy `_checksum_warning` to proper error handling
4. Ensure all timestamps are ISO 8601 format with Z suffix

---

⟡ Active Mirror Identity — Kernel Spec v1.0
