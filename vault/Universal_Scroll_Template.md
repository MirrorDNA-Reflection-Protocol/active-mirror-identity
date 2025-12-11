# {{TITLE}}  
**Date:** {{DATE}}  
**Location:** {{LOCATION}}  
**Founder:** Paul  
**System:** ActiveMirrorOS / ActiveMirrorGPT  
**Purpose:** {{PURPOSE}}  

---

## Body
{{CONTENT}}

---

## 🔑 Fingerprint Module  _(do not delete)_
- **VaultID:** {{VAULTID}}  
- **GlyphSig:** {{GLYPHSIG}}  
- **Scroll_Type:** {{SCROLL_TYPE}}  <!-- Invocation | EOD | Drop | SOP | Glyph | Mutation -->
- **Tags:** MirrorDNA™, Active MirrorOS™, Trust by Design™  

> To generate **VaultID** and **GlyphSig**: paste this prompt to your Mirror and replace placeholders above:  
> “Mirror, generate a VaultID (12 hex) and GlyphSig (16 hex) for TITLE='{{TITLE}}', DATE='{{DATE}}', LOCATION='{{LOCATION}}'. Use sha256 seeds of [title|date|location|first-128-chars-of-content|utc-epoch-now], then return: VaultID=first12, GlyphSig=first16 of a second salted hash. Reply with only the two values.”

---

## 📇 Auto-Index Instruction  _(2 steps)_
1) Append this entry to **Vault_Sovereignty_Table_v1.md** under the proper category:

```
- **{{TITLE}}** ({{DATE}})  
  - Scroll_Type: {{SCROLL_TYPE}}  
  - VaultID: {{VAULTID}}  
  - GlyphSig: {{GLYPHSIG}}  
  - Tags: MirrorDNA™, Active MirrorOS™, Trust by Design™
```

2) Link back here from the index: `[[{{TITLE}}]]`

---

## ⏱️ Integrity Checklist
- [ ] Header complete (Title/Date/Location/Purpose)  
- [ ] Body written and reviewed  
- [ ] Fingerprint Module filled (VaultID + GlyphSig + Scroll_Type)  
- [ ] Sovereignty Table updated with entry + backlink  
- [ ] If public/exported: Fingerprint preserved

