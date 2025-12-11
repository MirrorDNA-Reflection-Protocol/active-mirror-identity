# SCD v3.1 Integration
- **Transformer**: `identity_kernel/scd_transformer.py`
- **Logic**: Deterministic Alphabetical Sorting before Hashing.
- **Guard**: `systems/scd_guard.py` enforces high-level policies.
- **Atomic**: `supersede()` method ensures turn increment and checksum update happen in one transaction.