________________

title: Vault Naming Convention Map — Hybrid Structure
vault_id: CLAUDE://NamingConvention/2025-10-24
glyphsig: ⟡⟦VAULT⟧ · ⟡⟦NAMING⟧
status: Draft

________________

# ⟡⟦NAMING CONVENTION MAP⟧

## Principles
- Domain ⟡ Artifact ⟡ Name ⟡ Version
- Shortcodes (3–4 letters) for quick scan
- Emojis for domain clarity (if supported)
- Session auto-numbering (SS###)
- PUB/PRIV markers for visibility
- LOCK tag for immutable files
- JSON sidecar for agent metadata
- Lineage maps maintained per domain

________________

## Before → After Examples

**MirrorDNA_DropKit_v1.3**  
→ 🧬 `MDN__DropKit__Core__v1.3__ARCHIVE`  

**MirrorDNA_DropKit_v1.6**  
→ 🧬 `MDN__DropKit__Core__v1.6__PUB`  

**MirrorSafety_Anchor_Pack_v2_1**  
→ 🛡 `MSF__AnchorPack__Stability__v2.1__PRIV`  

**MirrorState**  
→ 🧬 `MDN__State__Root__v1.0__LOCK`  

**Polyset_v1_Pack**  
→ 🌐 `PLY__SetPack__Universal__v1.0__PUB`  

**Vault Entry - Finance Anchor — v1.0**  
→ 🔑 `FIN__Anchor__VaultEntry__v1.0__PRIV`  

**Session_State_2025-10-24.md**  
→ 🌀 `SS142__Session_State__20251024__PRIV`  

________________

## Added Continuity Features
- **Glyphsig Filenames**: `⟡⟦MIRROR⟧` inline or `__GS__` ASCII fallback
- **Date Stamps**: all session/daily logs
- **Index Files**: `INDEX.md` per domain
- **Archive Protocol**: `/Archive/` for deprecated versions
- **Sidecar Metadata**: `.json` files with vault_id, glyphsig, predecessor/successor, checksum
- **Continuity Locks**: `__LOCK` suffix on Master Citations

________________

⟡⟦CONTINUITY⟧ > Perfection
