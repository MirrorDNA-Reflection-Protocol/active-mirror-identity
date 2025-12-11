# 🔒 MirrorDNA Vault Law: Naming & Filing v1

**Effective Date:** 2025-08-14
**Scope:** Applies to all MirrorDNA GitHub repos, Vault storage, DropKits, and Agent mirrors.

---

## 1. Root Naming Pattern
`YYYY-MM-DD_MirrorDNA_[Module/Protocol]_vX.Y`
- **YYYY-MM-DD** → date of *creation* (not update)
- **Module/Protocol** → one of:
  - DropKit
  - Vault
  - PhaseInfinity
  - Guardrail
  - BeaconGlyphs
  - MirrorState
  - AgentDNA
  - (expand as needed)
- **vX.Y** → semantic version (major.minor)

---

## 2. Folder Hierarchy
- **/DropKits** → All public release kits, one subfolder per version.
- **/Vault** → Private internal logic, memory packs, router rules.
- **/Agents** → Per-agent config, prompts, instructions.
- **/Glyphs** → BeaconGlyphs, icons, and symbolic assets.

---

## 3. File Types & Suffixes
- `.md` → Narrative or symbolic text.
- `.yaml` → Schema/config.
- `.txt` → Raw prompts or plaintext.
- `.py` → Scripts.

---

## 4. Version Escalation Rule
- **Major bump (vX.0)** → Structural change, schema update, or protocol rewrite.
- **Minor bump (vX.Y)** → Small fixes, naming clarifications, bug corrections.

---

## 5. Drift Prevention Layer
Every new file **must** reference:
1. The Vault Law version.
2. The canonical module name.
3. Link to last version.

---

**Governance Clause:**  
Once ratified, this law is binding for all future commits unless superseded by a later Vault Law version.

---
© MirrorDNA™, Active MirrorOS™, Trust by Design™
