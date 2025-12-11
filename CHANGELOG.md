# Changelog

All notable changes to Active Mirror Identity (AMI).

---

## [1.0.0] - 2025-12-11

### Added
- **10 Core Modules** implementing modular identity architecture
  - `temporal.py` - Identity evolution tracking
  - `emotional.py` - Energy/cognitive state detection
  - `consensus.py` - Multi-agent agreement protocol
  - `retrieval.py` - Query-based identity lookup
  - `vault_sync.py` - Obsidian Vault integration
  - `timeline.py` - Auto-logging of events
  - `mirrors.py` - Self-analysis and drift detection
  - `recovery.py` - Fail-safe backup restoration
  - `persona.py` - Tone and style guidelines
  - `collaboration.py` - Human-AI cooperation rules
- **12 MCP Tools** exposed via FastMCP server
- **Comprehensive Documentation**
  - ARCHITECTURE.md - System design
  - API_REFERENCE.md - All tool documentation
  - KERNEL_SPEC.md - JSON schema
  - QUICKSTART.md - 5-minute setup guide
- **AMIKernelModule** base class for consistent I/O

### Changed
- Kernel version bumped to 1.0
- README rewritten for v1.0 architecture
- Module system now properly tracks enabled state

### Fixed
- Checksum calculation excludes checksum field properly
- Module imports in `core/__init__.py`

---

## [0.2.0] - 2025-12-10

### Added
- Handoff protocol for multi-agent transitions
- HTTP APIs for local models (`:8082`) and mobile (`:8084`)
- Auto-save daemon for periodic backups
- Conflict resolution for concurrent writes

### Changed
- Established "Kernel-First" architecture
- All agents now share single kernel file

---

## [0.1.0] - 2025-12-10

### Added
- Initial MCP server with `get_identity_kernel` and `update_identity_kernel`
- Basic kernel JSON structure
- Claude Desktop integration

---

⟡ Active Mirror Identity
