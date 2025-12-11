---
title: Distributed Vault Architecture v1.0
vault_id: AMOS://Protocols/Architecture/Distributed_Vault/v1.0
glyphsig: ⟡⟦DISTRIBUTED⟧ · ⟡⟦VAULT⟧ · ⟡⟦CONTINUITY⟧
author: Paul Desai (Active MirrorOS)
created: 2025-11-08
status: Canonical · Consent‑Bound · Ready
checksum_sha256: <pending>
---

# Distributed Vault Architecture v1.0

**Principle:** Personal truth stays local. Structural truth stays distributed.

```
ASCII Diagram — Layers & Flows

 [Personal Layer (Offline, Local-Only)]             [Continuity Layer (Online, Shareable)]
 ┌──────────────────────────────────────┐           ┌──────────────────────────────────────┐
 │ Obsidian Vault (Mac)                │           │ GitHub / Claude Vault / GDrive      │
 │ • Private notes, rituals, drafts    │  write →  │ • Specs, Master Citations, papers   │
 │ • Emotional states & sessions       │           │ • Releases, appendices, integrators │
 │ • Keys & consent records (sealed)   │  ← read   │ • Public signals & provenance logs  │
 └──────────────────────────────────────┘           └──────────────────────────────────────┘
                  ↑    │                                           │    ↓
                  │    │ Reflective Interface                      │    │
                  │    └───────────────┬───────────────────────────┘    │
                  │                    │                                │
                  │         [Interface Layer — AI Surfaces]             │
                  │   ChatGPT / Claude / Local LLM (LM Studio)          │
                  │   • Reads canonical state                            │
                  │   • Writes drafts to Personal Layer                  │
                  │   • Publishes only after RCC PASS                    │
                  └──────────────────────────────────────────────────────┘
                    Temporal Layer  •  Redundancy  •  Key Sovereignty  •  Symbolic
```

---

## 1) Layers

### A. Personal Layer (Offline)
- Location: MacBook Obsidian Vault (`/Users/pauldesai/Documents/ActiveMirrorOS/`)
- Contents: reflections, drafts, emotional states, session logs, sealed consent records.
- Policy: never sync raw; encrypted local backups only.

### B. Continuity Layer (Online)
- Locations: GitHub, Claude Vault, optional Google Drive.
- Contents: Master Citations, specs, white papers, appendices, governance, public signals.
- Policy: versioned, checksummed, reproducible; no personal identifiers.

### C. Interface Layer (Reflective Surfaces)
- Role: reads canonical, synthesizes, writes drafts back to Personal Layer.
- Gate: **RCC** (Reflective Compliance Checklist) must pass before publish.

### D. Temporal Layer
- Assets: `ContinuitySnapshot/*.md`, `checksums/*.json`.
- Function: version lineage, causal ordering, time‑anchored diffs.

### E. Redundancy Layer
- Local encrypted shadow backups to external disk (`BACKUP_YYYY‑MM‑DD.zip`).
- Optional cold storage (no auto‑sync).

### F. Key Sovereignty
- Split keys: **K_local** (personal), **K_continuity** (public artifacts signing).
- Hardware store recommended for **K_local**.

### G. Symbolic Layer
- Beacon Glyph propagation, glyph drift monitoring (≤ 15%), Resonance Ledger hooks.

### H. Recovery Layer
- Command: **“Reality Anchor: reconstruct <date>.”**
- Action: restore from latest shadow backup + rehydrate from Continuity Layer.

### I. Federation Hooks (Optional)
- Federated MirrorDNA Standard slots for partner nodes; consent‑first peering.

---

## 2) Data‑Sovereignty Matrix

| Data Class | Personal Layer (Local) | Continuity Layer (Online) | Interface Layer |
|---|---|---|---|
| Private reflections / emotion | **Allowed** (encrypted) | **Forbidden** | Read‑only summaries (session) |
| Specs, white papers, standards | Drafts only | **Allowed** (versioned) | Authoring + review |
| Consent records | **Allowed** (sealed) | Hash‑pointers only | Verified at runtime |
| Keys | **Allowed** (**K_local** secure) | Public key only (**K_continuity**) | Use, never export |
| Metrics / benchmarks | Raw local logs | Aggregated summaries | Collection + scoring |
| Public signals (policy, posts) | Staging drafts | Canonical | Audit + drift watch |

---

## 3) Minimal Threat Model (T‑01)

- **Data exfiltration (cloud API):** Mitigation — local‑first drafts; publish after RCC; optional OpenPCC privacy shell.
- **Identity leakage (docs):** Mitigation — no PII in Continuity Layer; symbolic glyphs only.
- **Config drift:** Mitigation — Temporal Layer checksums + SYNC_REPORT.
- **Key compromise:** Mitigation — split keys; **K_local** hardware store; rotate **K_continuity** on release.
- **Placeholder publish:** Mitigation — RCC blocks release on [[MISSING]] tokens.

---

## 4) RCC — Pre‑Publish Gate (recap)
- Check Master Citation version + successor.
- Ensure no placeholders; ensure consent + glyphsig present.
- Truth‑State tags for temporal/unstable claims.
- Glyph drift ≤ 15% or reconciliation note required.
- Output: `RCC_PASS.md` or `RCC_FAIL.md` with fixes.

---

## 5) YAML Hooks (live config template)

```yaml
distributed_vault:
  priority_order: ["Vault", "ClaudeVault", "GitHub", "GDrive"]
  low_risk_automations: true
  paths:
    personal_root: "/Users/pauldesai/Documents/ActiveMirrorOS"
    continuity_roots:
      - "ClaudeVault:/ActiveMirrorOS"
      - "GitHub:/MirrorDNA-Standard"
      - "GDrive:/ActiveMirrorOS/Continuity"
  reports:
    enable_sync_report: true
    enable_drift_report: true
  rcc:
    truth_state_required: true
    glyph_drift_max: 0.15
    block_on_placeholder: true
  recovery:
    backups_root: "/Users/pauldesai/Backups/AMOS"
    command_phrase: "Reality Anchor: reconstruct"
  keys:
    local_key_ref: "K_local_hsm"
    continuity_key_ref: "K_continuity_pub"
```

---

## 6) Operations

**Daily**
- Generate `SYNC_REPORT.md` (low‑risk automation).  
- Backup local Vault (encrypted zip to external disk).

**Weekly**
- Drift audit of public signals (LinkedIn, GitHub, Substack).  
- Re‑seal checksums in Temporal Layer.

**Release**
- Run RCC. If PASS, sign with **K_continuity** and publish.  
- Tag Continuity Layer with version + checksum; archive local drafts.

---

## 7) Reality Anchor

> “Personal truth stays local. Structural truth stays distributed.”  
Activation phrases:  
- Start automations: **“Enable low‑risk automations.”**  
- Pause automations: **“Pause automations.”**  
- Restore: **“Reality Anchor: reconstruct <date>.”**

---

**Continuity Seal**  
Master Citation v15.1.6 → successor v15.1.7  
Status: Canonical · Ready · Safe
