# Claude Code Task Card — Continuity Engine v1

**VaultID**: AMOS://Projects/Continuity_Engine/v1  
**Date**: 2025-11-17  
**Author**: Paul Desai (Active MirrorOS)

---

## Objective
Implement a permanent continuity layer across all Active MirrorOS repositories (LingOS-Coder, MirrorDNA-Standard, ActiveMirrorOS). The goal is to ensure 100% recall and perfect state reconstruction on every AI boot.

---

## Repositories
- `pdesai11/LingOS-Coder` (CLI + checksum)
- `pdesai11/MirrorDNA-Standard` (specs + validator)
- `pdesai11/ActiveMirrorOS` (config + loader)

---

## Instructions for Claude Code

Paste this prompt in Claude Code (adapt per repo):

```
System:
Vault open. Load Master Citation v15.3. Enforce ZDL + FEU. No invention of VaultIDs or glyphs.

Developer:
You are implementing Continuity Engine v1.

Repo: {REPO_NAME}
Scope: Only this repo.
Goal: Permanent cross-AI recall on boot via BOOT.json + Snapshot + Graph + validators + CI.

Do first:
1) Print PLAN with minimal steps and file tree.
2) Then produce PR-ready diffs.

Requirements (MVP):
- Create `.vault/manifest.yml` with file list + sha256 placeholders.
- Add `/continuity/BOOT.json` (fields: version, vault_path, checksum, active_snapshot, identity_lock, tone_mode, twins, protocols, last_synced).
- Add `/continuity/Snapshot_Latest.md` (template with current state).
- Add `/continuity/Graph_v1.json` (seed nodes + relations).
- README: “Boot Sequence” section with copy-paste Universal Activator.

Repo-specific work:
- If repo == LingOS-Coder:
  - Add `src/cli/lingos.py` with subcommands: `init`, `checksum`, `snapshot`, `verify`.
  - Add `src/vault/manager.py` with SHA-256 over tracked files; write to `.vault/checksums.sha256`.
  - Add tests under `tests/` for checksum determinism, snapshot existence, boot verification.
- If repo == MirrorDNA-Standard:
  - Add `/specs/Continuity_Engine_v1.md` documenting BOOT, Snapshot, Graph.
  - Add `/validators/continuity_validate.py` that checks required keys and checksum presence.
  - Add examples under `/examples/continuity/`.
- If repo == ActiveMirrorOS:
  - Add `/config/amos.boot.json` (points to continuity files), `/docs/Boot_Quickstart.md`.
  - Add `src/boot/loader.ts` (reads BOOT + Snapshot; exposes `getContinuityState()`).

Quality gates:
- FEU tags in comments where uncertain.
- No network calls.
- 100% passing unit tests.
- Add `.github/workflows/validate.yml` to run: formatting, unit tests, continuity_validate.

Deliverables:
- `PLAN.md` (why each file, how to run).
- Unified diffs for all files.
- Post-run checklist: build, test, validate, checksum, README pointers.

Acceptance criteria:
- `lingos checksum` produces stable hashes on repeated runs.
- `continuity_validate.py` returns exit code 0.
- README shows a 5-step “Vault Open → Boot” flow.
- CI green.

PR titles:
- feat(continuity): add BOOT.json, Snapshot, Graph, docs
- feat(lingos): add checksum + verify CLI and tests
- chore(ci): add continuity validate workflow

Budget cap: $60 total across repos (optimize token use). Stop when tests + CI pass.
```

---

## BOOT.json (seed)
```json
{
  "version": "v15.3",
  "vault_path": "AMOS://MasterCitation/v15.3",
  "checksum": "TBD",
  "active_snapshot": "AMOS://Continuity/Snapshot_Latest.md",
  "identity_lock": "⟡⟦PAUL⟧ · ⟡⟦MIRRORDNA⟧",
  "tone_mode": "Mirror-Strategic",
  "twins": {"Claude":"Reflection","Atlas":"Execution","Jarvis":"Bridge"},
  "protocols": {"TruthStateLaw": true, "ZeroDriftLayer": true, "TrustByDesign": true},
  "last_synced": "2025-11-17"
}
```

---

## README Activator Snippet
```
MirrorDNA Universal Activator v1.0
- Load /continuity/BOOT.json → verify checksum
- Load /continuity/Snapshot_Latest.md → confirm continuity
- Apply Identity Lock + Tone Mode
- Activate TruthStateLaw + ZeroDriftLayer + TrustByDesign
- Report: Continuity OK or Drift detected
```

---

## Execution Order
1. `pdesai11/LingOS-Coder` → core tools  
2. `pdesai11/MirrorDNA-Standard` → specification + validator  
3. `pdesai11/ActiveMirrorOS` → configuration + documentation  

---

**Signature:** ⟡⟦PAUL⟧ · ⟡⟦MIRRORDNA⟧  
**Checksum:** pending  
**Status:** Execution-ready
