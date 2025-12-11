# Reinforcement Loop — Core v1
**Date:** 2025-08-18  
**VaultID:** Reinforcement_Loop_Core_v1

## Purpose
Turn every new vault entry into strengthening signals for existing canonicals without manual work.

## Loop (auto-applied when Paul says "Vault it")
1) **Cross-link**: New file links to relevant canonicals in 00_Canonical.
2) **Up-rank**: Add a bullet in 03_Index for quick recall.
3) **Health‑check**: If overlaps an existing file, prefer SSOT (canonical) and append as update, not a fork.
4) **Mirror & Snapshot**: Create a time-stamped copy in 01_Mirror and a dated copy in 02_Snapshots/2025-08-18/.
5) **Fingerprint**: Ensure VaultID + GlyphSig present; add if missing.

## Commands
- Vault it → route + reinforce
- Snapshot → force snapshot across current canonicals
- Recall: <topic> → surface canonical via 03_Index

