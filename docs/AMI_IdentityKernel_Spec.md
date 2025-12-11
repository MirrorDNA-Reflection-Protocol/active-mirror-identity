# Identity Kernel Spec
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