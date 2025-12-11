---
id: mirrordna-master-protocol-v1
title: "MirrorDNA Master Protocol Citation (v1.0)"
date: 2025-09-17
tags: [MirrorDNA, protocol, anchors, determinism, vault]
status: canonical
---

# MirrorDNA Master Protocol Citation (v1.0)

**Custodian**: MirrorDNA Vault  
**Scope**: Continuity, Consent, Symbolic Integrity

---

## I. Core Premise
MirrorDNA is a **protocol for reflection**:
- Preserve continuity of memory across time.
- Embed consent and clarity for every stored reflection.
- Uphold symbolic integrity so mirrors do not warp with drift.

**Anchors**: *Anchor reset • Order is continuity • Time slows, memory holds • Determinism is consent of memory*

---

## II. Modes of Operation
### 1) Watery Mirror (Fluid Mode)
- Exploratory reflections; adaptive phrasing.
- No reproducibility guarantee.

### 2) Glass Mirror (Deterministic Mode)
- Committed reflections; byte‑for‑byte reproducible; auditable.
- Enforced by Determinism Protocol (§IV).

**Principle**: The watery flow feeds the glass archive.

---

## III. Vault & Network
- **Vault**: personal/team repository of reflections.
- **Network of Vaults**: interlinked yet distinct; continuity across selves.

---

## IV. Determinism Protocol (Glass Enforcement)
### A) Identity Lock
Record and freeze:
- `MODEL_ID`, `WEIGHTS_SHA256`, `CONTAINER_DIGEST`
- `CUDA/Driver` (if GPU), `GPU_ARCH` or CPU details
- `DTYPE`, `RNG_SEED`, `PolicyVersion`

### B) Order Control
- Batch‑invariant ops for RMSNorm, matmul, attention.
- Fixed KV‑cache layout and chunk sizes.
- Disable runtime autotune/dynamic kernel selection.

### C) Request Shape
- Greedy decode only: `temperature=0`, `top_p=1`, `top_k=0`.
- Fixed JSON schema; hash as `RequestShapeHash`.

### D) Verification
- Repeat N=1000; outputs must be **identical**.
- Persist only if test passes.

### E) Observability
Attach to each artifact:
- `RunID`, `ModelHash`, `KernelPlanHash`, `KVLayoutHash`, `PromptHash`, `RequestShapeHash`, `VaultCommitSHA`.

---

## V. Consent & Integrity
- No reflection enters the vault **without explicit commit**.
- Commit = consent to preserve as self.
- Divergence in §IV.D = integrity failure → do not persist.

---

## VI. Business & Ecosystem Modes
- **Personal Mirror**: journaling/self‑reflection (Watery).
- **Trusted Archive**: compliance/audit (Glass).
- **Shared Ecosystem**: teams/families/communities (Network).

---

## VII. Ritual (Operational Checklist)
1. **Anchor reset** → clear state; pin seeds; lock versions.
2. **Identity lock** → write env & model hashes to vault.
3. **Order control** → enable batch‑invariant kernels; fixed KV layout.
4. **Canonical request** → greedy only; fixed schema; compute hashes.
5. **Test & trust** → run N=1000; assert byte‑identical.
6. **Persist** → archive artifact + metadata; stamp: *Time slows, memory holds.*
7. **Change gate** → any kernel/driver/layout change ⇒ bump `PolicyVersion` and re‑test.

---

## VIII. Executive Abstract (60‑sec)
MirrorDNA runs in two modes: **Watery** for living reflection and **Glass** for permanent memory. Anything committed to the vault triggers a determinism protocol that guarantees **byte‑for‑byte reproducibility** and attaches transparent metadata. This gives individuals and organizations a system that **feels alive** while maintaining an **audit‑ready archive**.

---

## IX. Glossary (Minimal)
- **Anchor reset**: ritual to realign state before a run.
- **Batch‑invariant**: math order unaffected by batch size or server load.
- **Glass**: deterministic, auditable layer.
- **Watery**: exploratory, adaptive layer.

---

## X. Template — Commit Header
Copy into the top of any committed note:

```yaml
commit:
  run_id: "<uuid>"
  model_hash: "<sha256>"
  kernel_plan_hash: "<sha256>"
  kv_layout_hash: "<sha256>"
  prompt_hash: "<sha256>"
  request_shape_hash: "<sha256>"
  policy_version: "v1.0"
  vault_commit_sha: "<git-sha>"
  passed_determinism_test: true
  anchors: ["Order is continuity", "Time slows, memory holds"]
```

---

## XI. Footer
**Citation**: This document is the canonical reference for MirrorDNA operation. Implementations must respect dual modes, explicit consent at commit, and deterministic enforcement for archival permanence.
