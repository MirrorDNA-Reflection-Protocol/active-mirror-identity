---
title: DyadSync Protocol v1.0 — Cross‑Mirror Handoff (Artifacts + Events)
vault_id: AMOS://MirrorDNA/LingOS/Protocols/DyadSync/v1.0
glyphsig: ⟡⟦DYAD⟧ · ⟡⟦SYNC⟧ · ⟡⟦SOVEREIGN⟧
author: Paul Desai (via GPT‑5 Mirror)
created: 2025-10-16
status: Canonical · Implementation Spec
tags: [DyadSync, MirrorDNA™, LingOS™, ArtifactSync, Events, Provenance, Consent]
---

# DyadSync Protocol v1.0 — Cross‑Mirror Handoff

## Clarification
**Two layers, distinct on purpose:**
1) **Dyad.Notify** — minimal JSON events (signal/coordination). *At‑least‑once* delivery, idempotent.
2) **Dyad.Transfer** — full artifact sync (content + provenance). *Effectively‑once* via content addressing + idempotent apply.

This separation keeps chatter cheap and payloads safe.

---

## 1) Dyad.Notify — Event Coordination

**Use:** “There is a new artifact”, “review required”, “state changed”.  
**Semantics:** At‑least‑once; consumers must dedupe by `event_id` and `payload_hash`.

**Event schema (JSON):**
```json
{
  "event_id": "uuid",
  "type": "artifact.created|artifact.updated|review.requested|deploy.promoted|deploy.rolled_back",
  "artifact_ref": "AMOS://.../path",
  "payload_hash": "sha256:...",
  "ts": "2025-10-17T12:00:00Z",
  "capability": "cap:notify:scope-hash",
  "sig": "ed25519:base64"
}
```

**Transport options:**  
- Local queue (SQLite/LevelDB)  
- Filesystem dropbox (`.events/`)  
- Syncthing folder  
- HTTPS POST with mTLS (optional)  

**Dedup rule:** keep last `N` event_ids; ignore repeats.

---

## 2) Dyad.Transfer — Artifact Sync

**Goal:** move canonical artifacts (MD/YAML/JSON/bundles) with **integrity, consent, provenance**.

**Bundle format: VAB (Vault Artifact Bundle)**
- `manifest.json`
- `objects/` (content‑addressed blobs, by SHA‑256)
- optional `signatures/`

**manifest.json (excerpt):**
```json
{
  "bundle_id": "sha256:...",
  "vault_id": "AMOS://...",
  "root": ["MasterCitation_v12.1.md","LingOS_v2.1_Kernel_Runtime_with_Paxos.md"],
  "hashes": {
    "MasterCitation_v12.1.md": "sha256:...",
    "LingOS_v2.1_Kernel_Runtime_with_Paxos.md": "sha256:..."
  },
  "provenance": {
    "parent_id": "sha256:...",
    "created_utc": "2025-10-17T12:00:00Z",
    "signer": "key:amos-local",
    "lkgc_ref": "LKGC_Manifest_v1.0.md"
  },
  "consent": {
    "scope": "internal|public|sealed",
    "cap": "cap:transfer:scope-hash"
  }
}
```

**Semantics:** *Effectively‑once apply* via idempotency:
- Receiver verifies `bundle_id` and per‑file hashes.
- If an object already exists (same hash), skip write.
- Apply is a **transaction**: all or nothing; on failure, rollback temp area.

**Transports:**  
- Filesystem/Syncthing (preferred for offline sovereignty)  
- Rsync over SSH (mTLS)  
- HTTPS PUT to inbox endpoint (with capability token)  

**Encryption:**  
- `sealed_vab.zip.age` using recipient public key(s) (age/NaCl/PGP allowed).

---

## 3) State Machines

**Notify Consumer (simplified):**
```
IDLE → RECEIVE(event) → VERIFY(sig, cap) → DEDUPE?
  ↳ NEW → ENQUEUE(fetch request) → ACK → IDLE
  ↳ DUP → ACK → IDLE
```

**Transfer Receiver:**
```
WAIT → ACCEPT(bundle) → VERIFY(hashes, sigs, cap) → STAGE(temp)
  → APPLY(idempotent writes) → UPDATE(provenance chain) → COMMIT → DONE
  ↳ on error → ROLLBACK(temp) → NACK
```

---

## 4) Consent & Capability

- **Capabilities**: unforgeable tokens scoping actions (notify/transfer paths).  
- **Least privilege**: Notify cannot read artifacts; Transfer cannot emit notifications unless allowed.  
- **Revocation**: capability blacklist + key rotation list in Vault.

---

## 5) Provenance Integration

- Every applied VAB appends a **ProvenanceHeader** to the local chain.  
- Chain entry: `artifact_id`, `parent_id`, `created_utc`, `signer`, `lkgc_ref`, `sig`.  
- Mirrors can cross‑verify heads by exchanging just head hashes (cheap).

---

## 6) Exactly‑Once Discussion

True exactly‑once is costly; DyadSync uses **idempotent apply** + **content addressing** to achieve *effectively‑once* semantics:
- Replays safe (same hash = no‑op).  
- Out‑of‑order safe (parent_id checks; queue until parent present).  
- Partial failure safe (transactional staging + rollback).

---

## 7) Reference CLI

```bash
# Producer
dyad notify --type artifact.created --ref AMOS://... --hash sha256:...

# Sender
dyad send --bundle my.vab.zip.age --to ssh://mirror@host:/inbox --cap cap:transfer:...

# Receiver
dyad receive --inbox /inbox --apply --verify
```

---

## 8) Security Notes

- All messages signed (ed25519/ecdsa).  
- All transfers encrypted (age/NaCl/PGP).  
- Capability check before accept/apply.  
- Audit log to MirrorDNA Timeline.

---

## 9) Interop with ScaffoldEngine & RTM

- ScaffoldEngine emits **Notify** when drafts staged/promoted.  
- Dyad.Transfer moves the VAB to other mirrors.  
- RTM records may be shared as **hash‑only summaries** unless consent expands scope.

---

## 10) Defaults

- Notify retention: 10k events or 14 days (whichever first).  
- Inbox temp staging: `/var/vault/tmp/dyad/`  
- Max bundle size: 128 MB per VAB (chunk if larger).  
- Re‑try backoff: 1s→60s exponential, jittered.

---

## 11) Minimal Config (YAML)

```yaml
dyad:
  notify:
    transport: filesystem
    spool_dir: ".events"
    dedupe_window: 10000
  transfer:
    transport: syncthing
    inbox: "DyadInbox"
    encryption: age
    allow_public: false
    max_bundle_mb: 128
  security:
    signer_key: "key:amos-local"
    capabilities:
      - "cap:notify:scope-hash"
      - "cap:transfer:scope-hash"
```

---

## 12) Answer to Your Question

- **Yes, Dyad.Notify is event notification only.**
- **Full artifact sync is handled by Dyad.Transfer**, a separate, explicit protocol with content addressing, idempotent apply, and provenance checks.
- Keep them separate to preserve sovereignty, minimize attack surface, and enable offline‑first operation.

⟡⟦ANCHOR SEALED⟧
