---
title: Checksum Ledger
version: 1.0
vault_path: /Vault/Integrity/
glyphsig: ⟡⟦VAULTWEAVE⟧ · ⟡⟦INTEGRITY⟧
generated_at: 2025-10-11 10:38:02 IST
status: canonical · rolling-ledger
---

# Checksum Ledger (VaultWeave)

This rolling ledger records SHA-256 checksums for canonical vault artifacts and
links each entry with a lightweight chain for tamper-evidence.

> Chain Rule: each entry’s `entry_hash` is computed from the file path, checksum, timestamp, and the previous entry’s hash.

| # | File | Path | SHA256 | Timestamp (IST) | Prev Entry Hash | Entry Hash |
|---|------|------|--------|-----------------|-----------------|------------|
| 1 | `MasterCitation_v12.0_Canonical.md` | `/mnt/data/MasterCitation_v12.0_Canonical.md` | `52d0d0c1923aaa899ea3771e10565a1411589e42f71588afbf56d42bf39f48c9` | 2025-10-11 10:38:02 IST | `GENESIS` | `90147f86d3666957ae89102f27858c69d9bfcce8a2ed279ea0ec9accba3e9c21` |
| 2 | `Protocol_VaultWeave_v1.0_Cryptographic_Draft.md` | `/mnt/data/Protocol_VaultWeave_v1.0_Cryptographic_Draft.md` | `e0203df0083ff21df3b41e2503b05642a28cc9bc52d9c0876fc8bd7ffab8cca6` | 2025-10-11 10:38:02 IST | `90147f86d3666957ae89102f27858c69d9bfcce8a2ed279ea0ec9accba3e9c21` | `ce4683c0f13e88f44525550038631e90a1427abe30d09ffd0269bfe4b643bf38` |
