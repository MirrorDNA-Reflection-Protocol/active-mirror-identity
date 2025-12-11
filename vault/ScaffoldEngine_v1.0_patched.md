---
title: ScaffoldEngine v1.0 — Sovereign Builder/Validator (DyadSync‑patched)
vault_id: AMOS://Vault/Core/ScaffoldEngine/v1.0
glyphsig: ⟡⟦SCAFFOLD⟧ · ⟡⟦BUILDER⟧ · ⟡⟦VALIDATOR⟧
author: Paul Desai (via GPT‑5 Mirror)
created: 2025-10-16
status: Estimate · Patched (Notify/Transfer split)
tags: [ScaffoldEngine, LingOS™, MirrorDNA™, DyadNotify, DyadTransfer, Provenance, Rollback]
---

# ScaffoldEngine v1.0 — Sovereign Builder/Validator (DyadSync‑patched)

**Purpose**  
Generate, validate, and deploy canonical artifacts from Master Citation constraints — with **explicit separation** of event signaling vs artifact movement:

- **Dyad.Notify** → minimal JSON events (coordination only), *at‑least‑once*, idempotent.  
- **Dyad.Transfer** → full artifact handoff (bundled + provenance), *effectively‑once* apply.

---

## 1) Responsibilities

- Gap detection (RTM persister, VS config, Dyad channels).  
- Template‑driven generation (spec/config/index).  
- Anchor validation (truth‑state, fabrication guard, privacy).  
- Provenance stamping (hash chain, signer, LKGC link).  
- **Ephemeral deploy → audit → promote/rollback.**  
- **Emit Notify; invoke Transfer when cross‑mirror movement is required.**

---

## 2) Data Model (unchanged)

**ProvenanceHeader**  
- artifact_id (sha256), parent_id, created_utc, signer, anchors, privacy.

**GapReport**  
- components_missing, risks, suggested_templates, status (clean|warn|block).

**DeployTicket**  
- ticket_id, target_namespace, result (promoted|rolled_back|blocked), notes.

---

## 3) Pipelines (patched)

### 3.1 Gap Detection
```python
def detect_gaps(ctx) -> GapReport:
    missing = []
    if not ctx.has('RTM.persister'): missing.append('RTM Persister')
    if not ctx.has('Dyad.Notify'):   missing.append('Dyad.Notify channel')
    if not ctx.has('Dyad.Transfer'): missing.append('Dyad.Transfer capability')
    if not ctx.has('VS.Config'):     missing.append('VS Config Gate')
    risks = assess_risks(missing)
    return GapReport(components_missing=missing, risks=risks,
                     suggested_templates=['T_CONFIG.yaml','T_SPEC.md'],
                     status=('block' if missing else 'clean'))
```

### 3.2 Generate from Templates
Strict variable substitution; unknowns fail fast.

### 3.3 Anchor Validation
Require VaultID, GlyphSig, MasterCitation ref, privacy pass.

### 3.4 Provenance Stamp
Append chain record with sha256, parent_id, signer, lkcg_ref.

### 3.5 Ephemeral Deploy → Audit → Promote/Rollback
```python
def ephemeral_deploy(bundle) -> DeployTicket:
    ns = f"Sandbox/Scaffolds/{{nonce()}}"
    stage(ns, bundle)          # local only
    audit = run_audit(ns)      # anchors/privacy/consistency
    if audit.ok:
        promote(ns, target='Canonical/Scaffolds')
        dyad_notify('deploy.promoted', ref=ns, hash=head_hash(ns))
        return DeployTicket(result='promoted')
    else:
        rollback(ns)
        dyad_notify('deploy.rolled_back', ref=ns, hash=head_hash(ns))
        return DeployTicket(result='rolled_back', notes=audit.errors)
```

### 3.6 Cross‑Mirror Movement (NEW)
```python
def export_for_transfer(paths:list[str]) -> str:
    # Build VAB (Vault Artifact Bundle)
    vab = build_vab(paths)  # manifest.json + objects/
    sealed = seal_vab(vab, recipients=['mirror-key'])
    return sealed  # e.g., my.vab.zip.age

def send_to_mirror(sealed_vab:str, endpoint:str, cap:str):
    # Explicit artifact handoff
    dyad_transfer_send(sealed_vab, to=endpoint, capability=cap)
    dyad_notify('artifact.sent', ref=endpoint, hash=bundle_hash(sealed_vab))
```

**Rule:** *Never* embed payloads in Notify events. Notify only signals; Transfer carries content.

---

## 4) CLI (reference)

```bash
scaffold check
scaffold gen
scaffold audit
scaffold stage
scaffold promote
scaffold rollback --ticket TID

# New: cross‑mirror handoff
scaffold export --paths MasterCitation_v12.1.md LingOS_v2.1_Kernel_Runtime_with_Paxos.md
scaffold send --bundle my.vab.zip.age --to ssh://mirror@host:/inbox --cap cap:transfer:scope-hash
```

---

## 5) Minimal Config (excerpt)

```yaml
dyad:
  notify:
    transport: filesystem
    spool_dir: ".events"
  transfer:
    transport: syncthing   # or rsync/https
    inbox: "DyadInbox"
    encryption: age
    capabilities:
      send: "cap:transfer:scope-hash"
security:
  signer_key: "key:amos-local"
provenance:
  lkcg_ref: "LKGC_Manifest_v1.0.md"
```

---

## 6) Policy

- Events ≠ Payloads (hard rule).  
- Public export requires DropKit fingerprint.  
- Idempotent apply for all transfers.  
- Human‑in‑loop promotion.  
- Offline‑first friendly (filesystem/Syncthing allowed).

---

## 7) Status

- File: *Patched Estimate* — import, review, then promote.  
- Path: `/Vault/Core/ScaffoldEngine/v1.0`

⟡⟦ANCHOR SEALED⟧
