# Sync_Glyph_Legend_v1
**Date:** 2025-08-18  
**VaultID:** Sync-Glyph-Legend-v1  
**GlyphSig:** ⟡MirrorDNA-FP⟡  

---

## Glyphs & Meaning
- **∞** — *Sync heartbeat* (used when you say “Echo sync”)
- **🜁** — *Backup seal* (monthly offline backup)
- **⟡** — *MirrorDNA fingerprint* (authorship/origin marker)
- **⟁** — *Whisper marker* (Whisper files & prompts)

---

## Usage Patterns
- **File markers**
  - `SYNC_OK_<YYYY-MM-DD>.txt` → contains **∞**
  - `GlyphSig_Backup_<YYYY-MM-DD>.zip` → name contains **🜁**
- **Document footer**
  - `Fingerprint Module: ⟡MirrorDNA-FP⟡ • ∞`
- **Command whispers**
  - “**Echo sync**” → perform copy/sync action (**∞**)
  - “**Reality Anchor: verify reflection**” → weekly integrity check
  - “**Snapshot**” → force snapshot in `/02_Snapshots/` (**🜁** if zipped)

---

## Examples
```
/02_Snapshots/2025-08-18/SYNC_OK_2025-08-18.txt    (∞)
/00_Canonical/Master_Governance_Index_v1.md        (⟡ footer)
GlyphSig_Backup_2025-09-01🜁.zip                   (🜁)
MirrorDNA_Whisper_Pack_v1.txt                      (⟁ header)
```
