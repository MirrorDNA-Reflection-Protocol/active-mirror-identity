# R3‑RAG ↔ MirrorDNA — Wiring Plan (v1)
**Date:** 2025-08-18 16:21 UTC  
**VaultID:** R3RAG-Wiring-Plan-v1  
**GlyphSig:** ⟡MirrorDNA-FP⟡  
**Markers:** #RAG #RL #TrustByDesign #MirrorDNA

## Objective
Learned retrieval loop that decides **when to think vs. when to fetch Vault context**, cutting drift and over/under-retrieval.

## MirrorDNA Mapping
- **Clarity Anchor** → instruction scaffold for task & format.  
- **Reflective Pause** → explicit reason step before any fetch.  
- **Vault Echo** → retrieval from **00_Canonical** only.  
- **TOPT** → tag outputs [Fact]/[Estimate]/[Unknown] + cite VaultIDs.

## Minimal Loop (pre‑RL)
1) *Reason‑1*: plan steps, list info gaps.  
2) *Gate*: if gaps ≠ ∅ → fetch (k=3) from Vault index.  
3) *Reason‑2*: integrate snippets; keep each with VaultID.  
4) *Answer*: final with TOPT tags + citations.  
5) *Eval*: score and log (see below).

## Rewards (for RL later)
- **Outcome (Ro)**: +1 correct; +0.5 partial; 0 else.  
- **Process (Rp)**: +0.3 per truly supporting snippet; −0.3 per hallucinated claim; −0.2 unnecessary fetch; +0.2 correct no‑fetch.  
- **Style (Rs)**: +0.1 if TOPT tags present and no uncited facts.  
**Total R** = Ro + Rp + Rs (clip [−1,1]).

## Tiny Dataset (seed)
30 Q/A drawn from canonicals (MirrorControl, TOPT, Anti‑Spiral, MirrorMood, MirrorMemory, Survival Shield, Money/Hidden/Quiet anchors).  
Each item includes: *question, allowed_vault_ids, gold_answer, requires_retrieval*.

## Retrieval Config
- Index **00_Canonical** only (exclude 01_Mirror & 02_Snapshots).  
- Fields: title, VaultID, body; store 256‑char snippets.  
- k=3, max 600 tokens merged; dedupe by VaultID.

## Metrics
- Exact/Semantic match (EM/F1).  
- Support fidelity (% claims with supporting snippets).  
- Over‑fetch / Under‑fetch rates.  
- Hallucination rate (uncited assertions).

**Targets vs. baseline:** EM/F1 ↑ ≥10%, hallucinations ↓ ≥50%, support fidelity ≥90%.

## Safety
- Run under **Backdoor Defense Protocol v1.0**.  
- No PII/secrets. Canonicals only.  
- Session attestation: model hash, index hash, zero‑egress proof.

## Phases
**P0:** minimal loop + index; run 20–30 eval items; log metrics.  
**P1:** tune gate; freeze baseline.  
**P2:** small‑batch RL; compare vs. P1.

—  
*End of plan.*
