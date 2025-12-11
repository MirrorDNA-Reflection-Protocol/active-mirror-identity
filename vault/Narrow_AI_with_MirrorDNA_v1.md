# Narrow AI with MirrorDNA — Concept Note v1
VaultID: #NarrowAI_MirrorDNA_v1
GlyphSig: <>_Narrow_Mirror
Timestamp: 2025-09-15 15:22 UTC

---

## Intent
Create scoped, domain-specific AIs (“narrow mirrors”) that inherit MirrorDNA™ reflection and Vault anchoring while remaining tightly constrained to a domain.

---

## Architecture (Minimal)
1) **Vault Scope** → Each domain = one Vault (or sub‑vault).  
2) **Anchor Set** → Domain symbols, definitions, guardrails.  
3) **Glyph Map** → Domain-specific state markers (e.g., ⦿source_{domain}, ⊕pattern_{domain}).  
4) **Reflection Overlay** → Meta‑Language Protocol™ for self‑explanation.  
5) **I/O Policy** → Allowed sources + outputs (offline preferred).

---

## Setup Steps
1. **Create Domain Vault**: `Vault: /Narrow/{domain}`  
2. **Define Anchors** (YAML):  
```
anchors:
  domain: {domain}
  intents: [allowed_tasks]
  disallowed: [redlines]
  sources: [approved_corpora]
  sensitivity: {low|med|high}
```
3. **Glyph Map** (examples):  
```
glyphs:
  - name: ⦿source_{domain}
    meaning: Source alignment check
  - name: Δc_{domain}
    meaning: Confidence delta for domain facts
  - name: ↻shift_{domain}
    meaning: Reasoning shift trigger (pattern/contradiction)
```
4. **Reflection Template** (paste-in):  
```
[Reflective-Narrow v1]
Context: {task_summary}; Vault: /Narrow/{domain}; Refs: #Meta-Language-Protocol-v1
Directives:
- Only use approved sources.
- Report (Δc), (↻shift), (⦿source) per step.
- End with Stability Note re: Vault anchors.
Blocks: Result | Meta-Language Trace | Stability Note
```
5. **I/O Policy**:  
- Offline by default.  
- No external web unless whitelisted.  
- Log meta‑language traces to `/Narrow/{domain}/Traces/`.

---

## Example Narrow Mirrors
- **Legal‑Assist Mirror**  
  - Anchors: statutory cites, jurisdiction, deadlines.  
  - Glyphs: ⦿source_legal, Δc_legal, ↻shift_conflict.  
  - Outputs: draft clauses + citation trail.
- **Finance‑Explain Mirror**  
  - Anchors: GAAP/IFRS rules, ratios, disclosures.  
  - Glyphs: ⦿source_fin, Δc_fin, ⊕pattern_ratio.  
  - Outputs: variance explainers + risk notes.
- **Schools‑JanAI Mirror (Offline)**  
  - Anchors: syllabus, reading lists, language prefs.  
  - Glyphs: ⦿source_textbook, Δc_learning.  
  - Outputs: lesson aides + reflective hints.

---

## Safety & Drift Control
- Hard disallow list at Vault boundary.  
- Confidence floor (e.g., block outputs if Δc < threshold).  
- Daily “Anchor reset” ritual — refresh anchors + glyphs.

---

## KPI Traces
- % responses with complete Meta‑Language Trace.  
- # of drift blocks triggered (and causes).  
- Avg Δc change before/after anchor updates.

---

## Launch Checklist
- [ ] Domain Vault created  
- [ ] Anchors defined (YAML)  
- [ ] Glyph map finalized  
- [ ] Reflection template installed  
- [ ] I/O policy enforced (offline)  
- [ ] Trace logging active

---

## Statement
*Narrow mirrors are sovereign tools: scoped, reflective, and accountable. They trade breadth for trust.*
