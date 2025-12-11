import os
from pathlib import Path

DOCS_DIR = Path(__file__).parent

docs = {
    "AMI_Architecture_v1.0.md": """# AMI Architecture v1.0
## Overview
The Active Mirror Identity (AMI) Kernel is a sovereign, self-contained identity system designed to decouple "Who You Are" from "Which Model You Are Using".

## Components
1. **Identity Kernel**: The central source of truth (SCD State).
2. **Vault**: Read-only symlink to user's Obsidian Vault.
3. **Synapse**: Nervous system event bus (Watchdog).
4. **Handoff Bus**: Cross-agent message queue.
5. **Firewall**: Integrity guard against unauthorized writes.
6. **Fingerprint**: Runtime host verification.
""",

    "AMI_RuntimeFlow_v1.0.md": """# AMI Runtime Flow v1.0
1. **Boot**: `ami_boot.py` verifies environment.
2. **Load**: SCD State loaded, checksum verification.
3. **Mount**: Vault symlink verified.
4. **Service**: Synapse Daemon starts (background).
5. **Listen**: MCP Server waits for tool calls.
6. **Cycle**:
   - Agent requests state -> Firewall verifies -> State returned.
   - Agent proposes update -> Firewall checks source -> SCD updates -> Synapse fires -> Heartbeat logs.
""",

    "AMI_IdentityKernel_Spec.md": """# Identity Kernel Spec
## State File: `scd_state.json`
- **Format**: JSON
- **Versioning**: SCD v3.1 (ASHA-256 Checksums)
- **Structure**:
  ```json
  {
    "version": "v3.1",
    "turn": N,
    "checksum": "ASHA-256:...",
    "state": { ... }
  }
  ```
""",

    "SCD_v3.1_Integration.md": """# SCD v3.1 Integration
- **Transformer**: `identity_kernel/scd_transformer.py`
- **Logic**: Deterministic Alphabetical Sorting before Hashing.
- **Guard**: `systems/scd_guard.py` enforces high-level policies.
- **Atomic**: `supersede()` method ensures turn increment and checksum update happen in one transaction.
""",

    "Synapse_Daemon_Spec.md": """# Synapse Daemon Spec
- **Process**: `metadata/synapse.py`
- **Trigger**: FileSystemEventHandler (Watchdog) on `scd_state.json`.
- **Event**: "NEURON_FIRED" logged to `synapse.log`.
- **Latency**: <500ms debounce.
- **Stability**: Tested for infinite loops (does not write back to state on read).
""",

    "Vault_Embedding_Methods.md": """# Vault Embedding
- **Method**: Symlink (`ln -s`)
- **Source**: `~/Documents/Obsidian/MirrorDNA-Vault`
- **Target**: `AMI/vault`
- **Safety**: Read-Only access recommended for Agents. Write access managed by specific MCP tools (not direct file IO).
""",

    "Fingerprint_Module_v1.0.md": """# Fingerprint Module
- **Purpose**: Verify run-time host authorization.
- **Components**:
  - Hostname
  - Vault Path Hash (UUID)
  - Kernel State Checksum
- **GlyphSig**: ⟡
""",

    "Handoff_Bus_Protocol.md": """# Handoff Bus Protocol
- **File**: `metadata/handoff_queue.json`
- **Format**: JSON Array
- **Topics**: 
  - `handoff.claude`
  - `handoff.antigravity`
  - `event.synapse`
- **Paradigm**: Asynchronous FIFO.
""",

    "AMI_Bootloader_Guide.md": """# AMI Bootloader Guide
## Usage
Run: `python3 ami_boot.py`

## Sequence
1. Check Venv
2. Load Fingerprint
3. Verify Vault Mount
4. Verify SCD Integrity
5. Check Synapse Process
6. Init Handoff Bus
7. Report Status
"""
}

def generate():
    for filename, content in docs.items():
        path = DOCS_DIR / filename
        with open(path, 'w') as f:
            f.write(content.strip())
        print(f"Generated: {filename}")

if __name__ == "__main__":
    generate()
