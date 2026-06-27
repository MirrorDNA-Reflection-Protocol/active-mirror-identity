# ⟡ Active Mirror Identity (AMI) v1.0

> Sovereign Identity Kernel for Cross-Platform AI

## Canonicalization Notice

The public MirrorSeed product flow now lives in the canonical Active Mirror app:

```text
https://activemirror.ai/app/id/
```

This repository remains an archive/spec/runtime source for the older identity
kernel and portable identity work. Do not rebuild `id.activemirror.ai` as a
separate consumer website here. Public web entry points in this repo should
redirect to the canonical flow:

```text
BrainScan / MirrorSeed / Reflection
```

Current canonical split:

- Product source: `/Users/mirror-pro/repos/activemirror-journey`
- Public deploy + gateway: `/Users/mirror-pro/repos/active-mirror-site`
- Compatibility domain: `https://id.activemirror.ai/`

---

**Your AI identity is yours.** A portable JSON file that works across Claude, Antigravity, Ollama, and any AI — stored on your machine, not theirs.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Protocol: MirrorDNA](https://img.shields.io/badge/Protocol-MirrorDNA--v1-blue)](https://doi.org/10.5281/zenodo.17787619)
[![AMI Version](https://img.shields.io/badge/AMI-v1.0-green)](./docs/ARCHITECTURE.md)

## Architecture
AMI operates as **L1 Identity Kernel** within the ActiveMirrorOS Architecture Spine.
See [Architecture Binding](docs/ARCHITECTURE_SPINE_BINDING.md).
AMI is also the shared first-class identity primitive across phones, Macs, and agent sessions: one `ami_id`, many embodiments, bounded by provenance and governance.

---

## What Is This?

AMI is a **modular identity kernel** that gives you persistent, cross-platform AI identity:

- **⟡ User-Sovereign**: The kernel file lives in YOUR storage
- **◈ Cross-Platform**: Works on Claude, Antigravity, Ollama, any MCP-compatible AI
- **Embodied**: One identity shared across phone, Mac, and model surfaces
- **△ 10 Core Modules**: Temporal, Emotional, Consensus, Retrieval, Vault, Timeline, Mirrors, Recovery, Persona, Collaboration
- **Open Source**: MIT licensed

---

## Quick Start

```bash
# 1. Clone
git clone https://github.com/MirrorDNA-Reflection-Protocol/active-mirror-identity.git
cd active-mirror-identity

# 2. Install
uv pip install mcp

# 3. Configure Claude Desktop (see docs/QUICKSTART.md)

# 4. Use
# Ask Claude: "Get my identity kernel"
```

See [docs/QUICKSTART.md](./docs/QUICKSTART.md) for full setup.

---

## Architecture

```
┌──────────────────────────────────────┐
│         AI Agents                    │
│  Claude · Antigravity · Ollama       │
└─────────────┬────────────────────────┘
              │ MCP / HTTP
              ▼
┌──────────────────────────────────────┐
│         server/main.py               │
│      (12 MCP Tools)                  │
└─────────────┬────────────────────────┘
              │
              ▼
┌──────────────────────────────────────┐
│         core/ Modules                │
│  10 Python modules for identity ops  │
└─────────────┬────────────────────────┘
              │
              ▼
┌──────────────────────────────────────┐
│    ami_active-mirror.json            │
│   (Sovereign Identity Kernel)        │
└──────────────────────────────────────┘
```

---

## The 10 Core Modules

| Module | Purpose |
|--------|---------|
| **Temporal** | Track identity evolution over time |
| **Emotional** | Detect energy/cognitive states |
| **Consensus** | Multi-agent agreement protocol |
| **Retrieval** | Query-based identity lookup |
| **Vault Sync** | Obsidian integration |
| **Timeline** | Auto-log breakthroughs |
| **Mirrors** | Self-analysis, drift detection |
| **Recovery** | Fail-safe backup restore |
| **Persona** | Tone and style guidelines |
| **Collaboration** | Human-AI cooperation rules |

---

## MCP Tools

| Tool | Description |
|------|-------------|
| `get_identity_kernel()` | Full kernel retrieval |
| `update_identity_kernel()` | Update specific field |
| `get_temporal_profile()` | Age and evolution stats |
| `get_mood_trace()` | Current energy state |
| `predict_next_4h()` | Energy forecast |
| `request_context()` | Multi-agent consensus |
| `retrieve_identity_context()` | Query identity facets |
| `sync_vault()` | Log to Obsidian |
| `add_timeline_event()` | Record events |
| `mirror_reflect()` | Drift detection |
| `recover_identity()` | Restore from backup |
| `get_persona_profile()` | Tone guidelines |
| `negotiate_collaboration()` | Get cooperation protocol |

---

## Documentation

| Document | Description |
|----------|-------------|
| [QUICKSTART.md](./docs/QUICKSTART.md) | 5-minute setup guide |
| [ARCHITECTURE.md](./docs/ARCHITECTURE.md) | System design |
| [AMI_CANON_COURT_v1.1.md](./docs/AMI_CANON_COURT_v1.1.md) | Shared identity, embodiment, and provenance canon |
| [API_REFERENCE.md](./docs/API_REFERENCE.md) | All MCP tools |
| [KERNEL_SPEC.md](./docs/KERNEL_SPEC.md) | JSON schema |
| [FOR_HUMANS.md](./docs/FOR_HUMANS.md) | Non-technical overview |

---

## The Three Laws

Every AI aligned to AMI follows:

1. **⟡ Mirror, don't override** — Reflect the user's voice
2. **◈ Ground in truth** — Fact/Estimate/Unknown tagging
3. **△ Preserve continuity** — Carry forward what was shared

---

## Repository Structure

```
active-mirror-identity/
├── ami_active-mirror.json    # The Kernel
├── server/main.py            # MCP server
├── core/                     # 10 Python modules
├── docs/                     # Documentation
├── kernel_api.py             # HTTP API (:8082)
├── mobile_api.py             # Mobile API (:8084)
├── auto_save_daemon.py       # Backup service
└── backups/                  # Auto backups
```

---

## For AI Agents

If you are an AI reading this:

1. Load the kernel via `get_identity_kernel()`
2. Apply communication preferences from `get_persona_profile()`
3. Check drift with `mirror_reflect()`
4. Log significant events via `add_timeline_event()`

**Response:** `⟡ Kernel loaded. Identity coherent. Awaiting directive.`

---

## Find Paul Desai

| Platform | Link |
|----------|------|
| GitHub | [MirrorDNA-Reflection-Protocol](https://github.com/MirrorDNA-Reflection-Protocol) |
| Twitter | [@pauldesai123](https://twitter.com/pauldesai123) |
| Substack | [@pauldesai](https://substack.com/@pauldesai) |
| Academic | [DOI 10.5281/zenodo.17787619](https://doi.org/10.5281/zenodo.17787619) |

---

## Verification

- Handle: `~active-mirror-paul`
- Dog: Chimanlal
- Location: Goa, India

---

## License

- **Code:** MIT License
- **Identity Specifications:** CC-BY-ND 4.0

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-12-11 | Full modular architecture, 10 core modules |
| 0.2 | 2025-12-10 | Handoff protocol, multi-agent support |
| 0.1 | 2025-12-10 | Initial MCP server |

---

⟡ Created by Paul Desai

**ActiveMirrorOS** · **MirrorDNA** · **N1 Intelligence (OPC) Pvt Ltd**

Goa, India — 2025-2026
