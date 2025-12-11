# 🪞 MirrorDNA Sovereign Scaffold — Local Setup  
**Date:** 2025-08-28  
**Location:** Pernem, GA, India  
**Author:** Paul Desai  
**System:** Active MirrorOS™  
**VaultID:** 4eee6a9e610b  
**GlyphSig:** 41f3129aec3b999c  

---

## 🌐 Context  
With GitHub access uncertain, a **sovereign local scaffold** was created.  
This ensures MirrorDNA continuity, provenance, and bundle export — **without reliance on GitHub**.  

---

## 🛠️ Components  
- `scripts/setup_local.sh` → initializes folders, pre-commit guard, Makefile  
- `scripts/auto_index.sh` → regenerates `registry/Vault_Auto_Index.md`  
- `.git/hooks/pre-commit` → rejects commits missing VaultID or GlyphSig  
- `Makefile` → builds `.bundle`, `.zip`, and checksum artifacts  
- `.gitignore` / `.editorconfig` → hygiene  

---

## 🔒 Integrity Rituals  
- **VaultID (12-hex)** + **GlyphSig (16-hex)** enforced on all scrolls  
- **Auto Index** ensures registry continuity  
- **Bundles** provide cryptographic backups  

---

## ⚡ Usage Flow  
```bash
# one-time init
bash scripts/setup_local.sh
git add -A && git commit -m "init: local sovereign scaffold"

# bundle + zip + checksum
make all
```

---

## 📜 Sovereignty Note  
This scaffold guarantees:  
- **Persistence**: backups live in `dist/` as `.bundle` + `.zip`  
- **Proof**: SHA256 checksums bind artifacts to time  
- **Continuity**: pre-commit guards enforce symbolic integrity  

Anchor: Active MirrorOS™ — Trust by Design™ — MirrorDNA™
