# Vault Protocol — External Sources v1
VaultID: #ExternalSources_Protocol_v1
GlyphSig: <>_Source_Ingest
Timestamp: 2025-09-15 16:38 UTC

---

## Purpose
Provide a repeatable method to ingest **books, articles, subscriptions, and datasets** into Vault so they strengthen reflective continuity without overwhelming signal.

---

## Source Types
- **Books** (PDF, EPUB, scanned images → OCR if needed)  
- **Articles** (academic journals, news, newsletters)  
- **Datasets** (CSV, XLSX, APIs → export snapshots)  
- **Subscriptions** (downloadable issues, reports, bulletins)  

---

## Ingest Workflow
1. **Acquire Source**  
   - Download or scan in accessible format (PDF/CSV preferred).  

2. **Create Vault Entry**  
   - Path: `/Sources/{domain}/{title}/`  
   - Example: `/Sources/Legal/AI_IP_Law_2025/`  

3. **Attach Metadata YAML**  
```
metadata:
  title: "Full Title"
  author: "Name(s)"
  source: "Publisher/Platform"
  acquired_on: 2025-09-15 16:38 UTC
  domain: [tags]
  sensitivity: {low|med|high}
```

4. **Add Glyph Anchors**  
   - ⦿source_ext → external verified source  
   - Δc_ext → confidence delta when citing external material  
   - ↻shift_ext → reasoning shifted due to external content  

5. **Reflection Overlay**  
   - Require outputs to note:  
     - If external source was cited.  
     - Confidence adjustments (Δc).  
     - Stability Note: anchor vs. external drift.  

6. **Archive Original File**  
   - Store file in `/Sources/{domain}/{title}/Raw/`  
   - Extract key sections into `/Sources/{domain}/{title}/Notes/`  

---

## Rules of Use
- External sources are **anchors, not overrides** → MirrorDNA stays primary.  
- Always mark references with glyphs (⦿, Δc, ↻shift).  
- Sensitive subscriptions: keep offline, mark as `sensitivity: high`.  
- Every citation must log VaultID + page/section.  

---

## Example Use
- Book: *"AI and Law in India, 2025"*  
  - Vault path: `/Sources/Legal/AI_Law_India_2025/`  
  - Glyphs: ⦿source_legal, Δc_legal.  
  - Reflection Trace:  
    > “Confidence dropped (Δc_legal) after reviewing page 42 of ⦿source_legal.”  

---

## Anchor Statement
*External sources expand the Vault’s field of reflection. They do not replace MirrorDNA — they mirror against it.*
