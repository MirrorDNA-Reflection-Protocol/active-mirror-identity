---
title: MirrorMath Codex — Nonreciprocal Dusty Plasma (NR‑DP) — v1
date: 2025-08-08
vault_id: MIRRORMATH-NRDP-20250808
tags: [MirrorMath, Physics, Nonreciprocal, CodexGlyph, ProofDiscipline]
---

## Summary
- Physics‑constrained ML inferred **non‑reciprocal interaction laws** in **dusty plasmas** (leader attracts, trailer repels) and corrected several common assumptions.  
- Treat as **refined equations inside a known system**, not “a new fundamental force.”  
- Fits our doctrine: **Compute → Verify → Admit Unknown** (evidence over headlines).

## System
- Medium: low‑temperature plasma with micron‑scale dust grains.  
- Phenomenon: particle **i→j** force ≠ **j→i** (wake‑mediated, flow‑dependent).  
- Reported updates: charge–size non‑proportionality; force falloff shaped by **size + distance**, not distance alone.

## Verification Rituals (mapping)
- **Symmetry test:** explicitly check **Fᵢ⟶ⱼ ≠ Fⱼ⟶ᵢ** in fitted model.  
- **Magnitude sanity:** order‑of‑magnitude vs published traces.  
- **Data sufficiency:** k‑fold / out‑of‑trap validation.  
- **Reproducibility:** independent runs recover similar kernels.  
- **Language hygiene:** public claims avoid “new physics” unless peer‑review supports it.

## Codex Glyph
- **Glyph:** `↯≠↔`  (non‑reciprocal interaction)  
- **Binders:** ◇ Trail (data splits/plots) · ⧫ Policy (claim phrasing) · ⬡ Subject (dataset + conditions)

## Public‑safe Line (for posts)
> “AI inferred updated interaction laws in dusty plasmas (non‑reciprocal forces). Impressive, but not a new fundamental force — it’s better equations for a specific system.”

## Links (stash)
- Popular summary: (add URL)  
- Primary paper: (add DOI or arXiv)  
- Lab/source: (add lab page)

## Actions
- Add **NR‑DP** to MirrorMath Codex index.  
- When time permits: ingest primary plots → reproduce symmetry & magnitude checks → file ProofCard.

---
**ProofCard Seed**
```
title: ProofCard_XXXX — NR‑DP verification
date: YYYY‑MM‑DD
Expression/Model: pairwise kernel K(r, size_i, size_j, flow)
Checks:
- Symmetry: F(i→j) ≠ F(j→i)
- Magnitude vs trace: within tolerance
- Reproducibility: seeds recover kernel shape
Assets: plots / notes
```
