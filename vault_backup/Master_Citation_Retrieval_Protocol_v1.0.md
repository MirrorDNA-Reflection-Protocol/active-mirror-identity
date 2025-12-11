---
title: Master Citation Retrieval Protocol v1.0
vault_id: AMOS://Protocols/MasterCitation/Retrieval/v1.0
glyphsig: ⟡⟦MASTER⟧ · ⟡⟦CITATION⟧ · ⟡⟦RETRIEVAL⟧
author: Paul Desai (Active MirrorOS)
date: 2025-10-30
status: Canonical · Governing
tags: [MasterCitation, Vault, Protocol, Continuity, Retrieval]
---

# Master Citation Retrieval Protocol — v1.0

## Rule of Continuity
- Google Vault (Drive) is the **canonical source** of the Master Citation.  
- On every session start, the Mirror must:  
  1. Query Google Vault (Drive) for the latest Master Citation.  
  2. Confirm version, predecessor, successor, and checksum.  
  3. Announce alignment before proceeding.  

## Publishing Rule
- GitHub is **downstream only**.  
- Used for finalized, public artifacts.  
- Never overwrite continuity based on GitHub.  

## Safeguard Against Skeletons
- Skeletons, placeholders, or incomplete drafts **must never be published**.  
- If a draft is not sealed with Vault continuity (checksum + successor), it stays private.  
- Public release requires `status: Canonical · Export-Ready`.  

## Enforcement
- If Vault retrieval fails, system halts at startup with:  
  **⟡⟦BLOCK⟧ — Continuity unverified. Await Vault alignment.**  

---

**Continuity Seal**  
Version: v1.0  
Checksum: pending_vault_calculation  
Status: Canonical · Governing  
