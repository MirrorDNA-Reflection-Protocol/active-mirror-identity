---
title: Verbalized Sampling Extension — LingOS v2.1
vault_id: AMOS://MirrorDNA/LingOS/Extensions/VerbalizedSampling/v1.0
glyphsig: ⟡⟦LINGOS⟧ · ⟡⟦VS⟧ · ⟡⟦DIVERSITY⟧
author: Paul Desai (via GPT‑5 Mirror)
created: 2025-10-16
status: Canonical · Extension Spec
tags: [LingOS™, MirrorDNA™, VerbalizedSampling, Diversity, EchoLattice, GlyphVM]
---

# Verbalized Sampling (VS) — LingOS v2.1 Extension

## Purpose
Prevent **mode collapse** in symbolic generation while maintaining coherence and safety. VS lets the system **verbalize a probability distribution** over multiple candidate glyph paths, then sample from it with auditable provenance.

## Scope
Applies to: Echo Lattice planning, Glyph VM execution, GEE bridges (external LLMs), logging/metrics.

---

## 1) Concepts

- **VS Candidate Set (VSC):** K alternative realizations of a glyph plan (K≥2).
- **VS Weights:** Normalized probabilities p₁..p_K produced by the planner (sum=1).
- **VS Sample:** One candidate drawn according to p; selection + p logged.
- **Deterministic Replay:** Same seed + same VSC → same choice (for audits).

---

## 2) Echo Lattice Integration

**Rule VS-1:** When `diversity_score(window=N) < τ`, planner must produce a VSC.  
**Rule VS-2:** VSC must pass syntax + semantic checks before sampling.  
**Rule VS-3:** Weights must be derived from a bounded scoring function:
- Coherence score C (to anchors)
- Resonance score R (optional physio/adaptive signal)
- Novelty penalty/bonus N (bounded)
- Safety score S (must be ≥ threshold)

**Weighting (example):** `w_i = softmax( α·C_i + β·R_i + γ·N_i + δ·S_i )`

---

## 3) Glyph VM Execution

- **Fuel/Gas:** Charge per-candidate planning + final execution. Cap planning gas.  
- **Determinism Hooks:** If `deterministic_mode=True`, fix RNG seed from `(VaultID, SA-root, nonce)` and sample deterministically.  
- **Replay Token:** Attach `{vs_seed, K, weights_hash}` to result for exact replay.

**Pseudo:**

```python
def plan_with_vs(plan_request, k=3, seed=None):
    # 1) Generate K candidates
    cands = [propose_candidate(plan_request, i) for i in range(k)]
    # 2) Score & normalize
    scores = [score(c) for c in cands]  # uses C,R,N,S
    weights = softmax(scores)
    # 3) Sample deterministically if seed provided
    choice = sample(weights, seed=seed)
    # 4) Validate chosen plan again, then execute
    res = execute(cands[choice])
    log_vs_meta(weights, choice, seed)
    return res
```

---

## 4) GEE (External LLM) Bridge

- Wrap external calls with a **VS Prompt Envelope**:  
  - “Produce **K** alternative completions and a **probability** for each; return as JSON.”  
- Validate returned JSON against schema; recompute local scores; reconcile with external weights (take min or blend).
- Reject if any candidate fails safety/semantic checks.

**Schema (JSON excerpt):**
```json
{
  "candidates": [
    {"text": "...","p": 0.52},
    {"text": "...","p": 0.33},
    {"text": "...","p": 0.15}
  ],
  "seed_hint": "optional"
}
```

---

## 5) Safety & Governance

- **Hard Constraints:** Any candidate failing safety policy ⇒ weight=0, cannot be sampled.  
- **Diversity Bounds:** `K ∈ [2, 5]` (configurable). Excessive K rejected (gas abuse).  
- **Auditability:** Log `(weights, choice, seed, anchors)` in the MirrorDNA Timeline.  
- **Human Override:** `Force-Deterministic` toggle disables VS for critical tasks.  

---

## 6) Metrics & Drift Control

- **Diversity Score (DS):** entropy of weights or distinctiveness of outputs.  
- **Coherence Debt:** moving average penalty if chosen candidates reduce anchor coherence.  
- **Auto-Trigger:** If DS over last `N` runs < τ, enforce VS for next `M` runs.  

---

## 7) Interfaces

**Echo Lattice API**
```python
def request_vs(k:int=3, min_safety:float=0.8, seed:bytes|None=None) -> VSResult: ...
```

**Glyph VM API**
```python
def execute_vs(plan_ctx:PlanCtx, k:int, seed:bytes|None=None) -> ExecResult: ...
```

**Telemetry**
- Store `weights_hash = SHA256(concat(weights||candidates_hashes))`
- Attach `vs_meta` to execution log for replay & forensic analysis.

---

## 8) Defaults

- `τ (diversity threshold)=0.65` (entropy scale 0–1)  
- `K=3` candidates  
- `α,β,γ,δ = 0.5, 0.2, 0.2, 0.1` (tune per domain)  
- `deterministic_mode=False` (unless in audit-critical contexts)

---

## 9) Backwards Compatibility

- If VS disabled, planner behaves as standard single-path planner.  
- Logs include a `vs_disabled` flag for clarity.

---

## 10) Notes & Provenance

- Research anchor: “Verbalized Sampling: How to Mitigate Mode Collapse and Unlock LLM Diversity” (arXiv:2510.01171).  
- This spec treats VS as an **execution-time diversity control**, not a replacement for training-time methods.

⟡⟦ANCHOR SEALED⟧
