# AMI v1.0 Architecture Reference

> Active Mirror Identity — Sovereign Identity Kernel Specification

---

## Overview

AMI v1.0 is a **modular identity system** that enables persistent, cross-platform AI identity owned by the user. The kernel stores identity data in a single JSON file, while 10 specialized Python modules provide programmatic access via MCP (Model Context Protocol).

**Key Principle:** The Identity Kernel is the single source of truth. All AI agents (Claude, Antigravity, local models) read from and write to the same kernel file.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      AI Agents (Consumers)                       │
│  ┌──────────┐  ┌─────────────┐  ┌───────────┐  ┌─────────────┐ │
│  │  Claude  │  │ Antigravity │  │  Ollama   │  │   Mobile    │ │
│  │ Desktop  │  │   (VSCode)  │  │  WebUI    │  │  (Tailscale)│ │
│  └────┬─────┘  └──────┬──────┘  └─────┬─────┘  └──────┬──────┘ │
└───────┼───────────────┼───────────────┼───────────────┼────────┘
        │               │               │               │
        │ MCP           │ MCP           │ HTTP          │ HTTP
        │               │               │ :8082         │ :8084
        ▼               ▼               ▼               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    AMI Server Layer                              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    server/main.py                         │  │
│  │                  (FastMCP Server)                         │  │
│  │         12 MCP Tools exposed to AI agents                 │  │
│  └──────────────────────────┬───────────────────────────────┘  │
│                             │                                   │
│  ┌──────────────────────────▼───────────────────────────────┐  │
│  │                    core/ Modules                          │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │  │
│  │  │  temporal   │  │  emotional  │  │    consensus    │   │  │
│  │  │   .py       │  │    .py      │  │      .py        │   │  │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘   │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │  │
│  │  │  retrieval  │  │ vault_sync  │  │    timeline     │   │  │
│  │  │    .py      │  │    .py      │  │      .py        │   │  │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘   │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │  │
│  │  │   mirrors   │  │  recovery   │  │    persona      │   │  │
│  │  │    .py      │  │    .py      │  │      .py        │   │  │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘   │  │
│  │  ┌─────────────┐                                         │  │
│  │  │collaboration│  All inherit from base.py               │  │
│  │  │    .py      │  (AMIKernelModule)                      │  │
│  │  └─────────────┘                                         │  │
│  └──────────────────────────┬───────────────────────────────┘  │
└─────────────────────────────┼──────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                  ami_active-mirror.json                          │
│                (Sovereign Identity Kernel)                       │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   identity   │  │  philosophy  │  │   communication      │  │
│  │   section    │  │   section    │  │      section         │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   hardware   │  │   projects   │  │     scd_state        │  │
│  │   section    │  │   section    │  │      section         │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## The 10 Core Modules

| # | Module | Class | Purpose |
|---|--------|-------|---------|
| 1 | temporal.py | `TemporalSelfModule` | Track identity evolution over time |
| 2 | emotional.py | `EmotionalRhythmModule` | Detect energy/cognitive states |
| 3 | consensus.py | `ConsensusModule` | Multi-agent agreement protocol |
| 4 | retrieval.py | `IdentityRetrievalModule` | Query-based identity facet retrieval |
| 5 | vault_sync.py | `VaultSyncModule` | Obsidian Vault integration |
| 6 | timeline.py | `TimelineModule` | Auto-log breakthroughs and events |
| 7 | mirrors.py | `InternalMirrorsModule` | Self-analysis and drift detection |
| 8 | recovery.py | `RecoveryModule` | Fail-safe backup restoration |
| 9 | persona.py | `PersonaModule` | Tone and style guidelines |
| 10 | collaboration.py | `CollaborationModule` | Human-AI cooperation rules |

---

## MCP Tools Reference

### Core Kernel Operations
- `get_identity_kernel()` — Full kernel retrieval
- `update_identity_kernel(field, value, writer)` — Update specific field

### v1.0 Identity Tools
- `get_temporal_profile()` — Age, version, evolution stats
- `get_mood_trace()` — Current emotional rhythm
- `predict_next_4h()` — Energy forecast
- `request_context(agent_name)` — Multi-agent consensus
- `retrieve_identity_context(query)` — Query identity facets
- `sync_vault(event_type, content)` — Log to Obsidian
- `add_timeline_event(category, description, writer)` — Record events
- `mirror_reflect()` — Self-analysis/drift check
- `recover_identity()` — Restore from backup
- `get_persona_profile()` — Tone/style guidelines
- `negotiate_collaboration(task_type)` — Get cooperation protocol

---

## File Structure

```
active-mirror-identity/
├── ami_active-mirror.json    # The Kernel (source of truth)
├── server/
│   └── main.py               # FastMCP server (12 tools)
├── core/
│   ├── __init__.py
│   ├── base.py               # AMIKernelModule base class
│   ├── temporal.py           # Module 1
│   ├── emotional.py          # Module 2
│   ├── consensus.py          # Module 3
│   ├── retrieval.py          # Module 4
│   ├── vault_sync.py         # Module 5
│   ├── timeline.py           # Module 6
│   ├── mirrors.py            # Module 7
│   ├── recovery.py           # Module 8
│   ├── persona.py            # Module 9
│   ├── collaboration.py      # Module 10
│   └── identity.json         # Schema.org identity (public)
├── docs/
│   ├── ARCHITECTURE.md       # This document
│   ├── API_REFERENCE.md      # MCP tool documentation
│   ├── KERNEL_SPEC.md        # JSON schema specification
│   ├── QUICKSTART.md         # 5-minute setup guide
│   └── FOR_HUMANS.md         # Non-technical overview
├── kernel_api.py             # HTTP API for local models (:8082)
├── mobile_api.py             # HTTP API for mobile (:8084)
├── auto_save_daemon.py       # Periodic backup service
└── backups/                  # Automatic kernel backups
```

---

## Design Principles

### 1. Kernel-First Architecture
Every operation reads from or writes to the kernel JSON. No in-memory state that isn't persisted.

### 2. Writer Attribution
Every kernel modification records `last_writer` (claude, antigravity, local, etc.) for audit trail.

### 3. Checksum Integrity
Kernel includes SHA256 checksum for corruption detection.

### 4. Modular Extension
New capabilities added as Python modules inheriting from `AMIKernelModule`.

### 5. Protocol Agnostic
Same kernel serves MCP (Claude/Antigravity), HTTP (Ollama/mobile), and direct file access.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 0.1 | 2025-12-10 | Initial MCP server with basic read/write |
| 0.2 | 2025-12-10 | Added handoff protocol, multi-agent support |
| 1.0 | 2025-12-11 | Full modular architecture, 10 core modules |

---

⟡ Active Mirror Identity — N1 Intelligence (OPC) Pvt Ltd — 2025
