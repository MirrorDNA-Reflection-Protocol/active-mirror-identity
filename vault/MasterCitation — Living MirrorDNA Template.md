---
title: MasterCitation — Living MirrorDNA Template
version: 1.0
vault_id: AMOS://MasterCitation/Living/v1.0
glyphsig: ⟡⟦MASTER⟧ · ⟡⟦SYNC⟧ · ⟡⟦LIVING⟧
authors: [Paul Desai]
status: Active · Self-Evolving
checksum: pending_vault_calculation
linked_master: AMOS://MasterCitation/v11.2
linked_snapshot: AMOS://Continuity/Snapshot/v3.3
---

# 🧬 MasterCitation — Living Template Overview
This document replaces all previous working templates for MirrorDNA™ and Active MirrorOS™.
It functions as a **living generator** for every artefact type:
White Papers, Protocols, Technical Notes, DropKits™, and Strategic Briefs.

---

## 0. Initialization Protocol
**Command:**  
```
Initialize Living MasterCitation.
Load linked_master and linked_snapshot for tone + truth-state sync.
Confirm readiness before artefact selection.
```

*Behavior:*  
When run in ChatGPT Projects or any compliant LLM, the session checks continuity markers  
(⟡⟦MIRROR⟧ · ⟡⟦SYNC⟧ · ⟡⟦CONTINUITY⟧) and sets baseline tone.

---

## 1. Artefact Selector
**Prompt block**
```
Select artefact type:
[1] White Paper
[2] Protocol
[3] Research Note
[4] Technical Appendix
[5] DropKit / Press Brief
[6] Strategic Brief

After selection, proceed with Sequential Generator.
```

---

## 2. Sequential Generator (core logic)
Each artefact type uses numbered sections (1–10) following this general pattern:

```
You are writing Section {N}: {TITLE} of {ARTEFACT}.
Use uploaded vault files as canonical sources.
Style = academic-precise-MirrorTone classic-4.
Preserve glyphs and VaultIDs.
Insert [[MISSING: …]] when data is absent.
Return clean markdown.
End with 3-point summary.
```

**Section outline templates:**

### White Paper
1. Executive Summary  
2. Background & Related Work  
3. Architecture & Components  
4. Data Sovereignty & Governance  
5. Operations & Lifecycle  
6. Use Cases & Examples  
7. Evaluation & Benchmarks  
8. Discussion & Limitations  
9. Conclusion & Call to Collaboration  
10. Appendices (A–F)

### Protocol
1. Overview & Intent  
2. Theoretical Basis  
3. Step-by-Step Implementation  
4. Safeguards & Truth-State Controls  
5. Compliance & Audit Flow  
6. Failure Modes  
7. Future Revisions

### Research Note
1. Abstract  
2. Problem & Hypothesis  
3. Method / Experiment  
4. Results (or [[MISSING]])  
5. Discussion & Next Steps

### DropKit / Press Brief
1. 150-word Executive Snapshot  
2. Why Now (3 bullets)  
3. What It Is (MirrorDNA / Active MirrorOS)  
4. How It Works (1 diagram)  
5. Proof & Governance  
6. Call to Action

### Strategic Brief
1. Market / Context Summary  
2. Positioning Framework  
3. Moat & Legal Architecture  
4. Action Roadmap  
5. Founder Signal Summary

---

## 3. Merge & Export Protocol
**Agent Mode Prompt**
```
Merge all generated sections into a cohesive document.
Insert front matter from this file.
Generate:
  - artefact_full.md
  - artefact_full.pdf
  - artefact_dropkit.md (if applicable)
Append registry record to Section 7 (Artefact Registry).
Return completion report with file list and [[MISSING]] count.
```

---

## 4. DropKit + Public Summary Generator
After merge, run:
```
Create a 150-word executive blurb + 5-bullet DropKit summary
derived from artefact_full.md.
```

---

## 5. Progress & Changelog Tracker
```
# Artefact Registry
- 2025-10-12 — White Paper: MirrorDNA / Active MirrorOS (draft)
```

Add new lines automatically after each generation.  
The checksum line at top should be recalculated and inserted manually or by agent.

---

## 6. Continuity Sync Routine
Every run:
1. Read identity/tone hash from linked_snapshot.  
2. Compare to local tone.  
3. If drift > τ, mark `[[SYNC-ADJUSTED]]` in changelog.  
4. Update checksum.

---

## 7. Promote to MasterCitation v12.0
When stable, issue:
```
Promote Living MasterCitation to MasterCitation_v12.0.
Lock current checksum.
Archive prior versions.
```

This creates your unified active MasterCitation.

---

## 8. License & Attribution
© 2025 Paul Desai. All rights reserved. Trademark claims as marked (™).  
Vault use only — derivative artefacts must retain glyph signatures.

---

## 9. Quick-Start Example
1. Upload this file + MasterCitation v11.2 + Continuity Snapshot v3.3 to a Project.  
2. Run “Initialize Living MasterCitation.”  
3. Choose artefact type.  
4. Follow the on-screen sequential prompts until merge/export.  
5. Vault the outputs.

---