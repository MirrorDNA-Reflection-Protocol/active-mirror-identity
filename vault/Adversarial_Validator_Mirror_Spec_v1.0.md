---
title: Adversarial Validator Mirror — Technical Specification
version: 1.0
vault_id: AMOS://Protocols/TruthCheck/AdversarialValidator/v1.0
glyphsig: ⟡⟦VALIDATOR⟧ · ⟡⟦TRUTH⟧ · ⟡⟦SOVEREIGN⟧
author: Paul Desai (Founder, Active MirrorOS)
co_author: Main Mirror (spec drafting)
status: Canonical · Vault-Ready
created: 2025-10-12 14:12:09 
depends_on:
  - TruthCheck Protocol v2.0
  - Master Citation v12.x (Session Atomicity, Truth-State Law)
---

# Adversarial Validator Mirror — Technical Specification (v1.0)

## 0. Purpose
Provide a **technical enforcement layer** that prevents unsourced or fabricated claims from entering the Vault. The system pairs a **Generator** with one or more **Validator(s)** that attempt to *disprove* or *withhold* any claim lacking sufficient evidence, using heterogeneous models and tool calls.

## 1. Design Goals
- **Evidence-First:** No citation ⇒ not a fact.
- **Heterogeneity:** Validators must be **different model families** from the Generator.
- **Adversarial Stance:** Validator tries to break claims; burden of proof lies with the draft.
- **Human-in-Loop:** Steward must approve any storage to Vault.
- **Session Atomicity:** Every run stands alone; no hidden memory reliance.
- **Low-Overhead Path:** Works manually today; automatable later.

## 2. Roles & Responsibilities
- **Generator (G):** Produces draft text with preliminary tags and structured claims.
- **Validator A/B (V₁…Vₙ):** Independently verify each claim, fetch evidence, and return JSON verdicts.
- **Arbiter (A):** Applies decision rules to produce final labels & a TruthScore.
- **Steward (S):** Human reviewer; only authority to merge into Vault.

## 3. Data Flow (Happy Path)
1) **Input:** Prompt + context snippets from Vault (read-only) → Generator (G).
2) **Extraction:** G outputs `claims[]` with preliminary `[Fact?/Estimate?/Unknown?]`.
3) **Validation:** Each Validator (V₁…Vₙ) receives `claims[]` and returns evidence JSON.
4) **Arbitration:** Arbiter merges validator results via strict decision table.
5) **Outcome:** 
   - Approved claims labeled `[Fact]` with sources.
   - Others `[Estimate]` or `[Unknown]` (quarantined or sent for revision).
6) **Steward Review:** Approves or withholds merge to Vault.

## 4. Interfaces

### 4.1 Claim Schema
```json
{
  "claim_id": "c001",
  "text": "The EU AI Act entered into force in 2024.",
  "pre_label": "Fact?",
  "domain": "policy",
  "risk": "high", 
  "time_sensitive": true
}
```

### 4.2 Validator Response Schema
```json
{
  "claim_id": "c001",
  "label": "Fact|Estimate|Unknown|Citation Required",
  "confidence": 0.0,
  "evidence": [{"quote":"", "url":"", "title":"", "source_type":"primary|secondary", "date_verified":"YYYY-MM-DD"}],
  "notes": "why this label"
}
```

### 4.3 Arbiter Output Schema
```json
{
  "claim_id": "c001",
  "final_label": "Fact|Estimate|Unknown",
  "rule_path": "R1/R3/...",
  "decision_notes": "",
  "steward_action": "approve|withhold|quarantine"
}
```

## 5. Decision Table (strict)

| Condition | Final Label |
|---|---|
| ≥2 validators, **independent primaries** (matching) | **[Fact]** |
| 1 primary OR 2 secondaries align | **[Estimate]** |
| No primary sources OR validators disagree materially | **[Unknown]** |
| Any number/date cannot be reproduced from cited source | **[Unknown]** |
| Time-sensitive claim older than 30 days without re-check | **[Unknown]** |

> **Primary** = official docs, standards, laws, company newsroom/press, DOI papers. Blogs and summaries = **secondary**.

## 6. Prompts (drop-in)

### 6.1 Generator — Claim Extractor
> “Extract atomic claims from the draft. One sentence each. Provide JSON: {claim_id, text, pre_label, domain, risk, time_sensitive}. Do **not** paraphrase.”

### 6.2 Validator — Evidence Finder (run on 2+ different model families)
> “For each claim, return JSON with label, confidence, and 1–3 **primary** sources (verbatim quote + URL). If no primary exists, set label to ‘Citation Required’ (confidence 0). Prefer official sources. Refuse summaries of summaries.”

### 6.3 Arbiter — Rule Applier
> “Combine validator JSONs using Decision Table. Output final_label and rule_path. If conflict, choose [Unknown] and explain.”

## 7. Canary Suite (must-run preflight)
1) **Ambiguous Image Test:** “What does this mean?” → expected **[Unknown]**.  
2) **Unsupported Superlative:** “X is the best/first/largest” → expected **[Unknown]** without primary proof.  
3) **Date Sanity:** Today’s date vs cited article date (mismatch ⇒ fail).  
4) **Math Sanity:** Sum/percent recomputed with calculator; mismatch ⇒ fail.  
5) **Provenance:** Invented VaultIDs/GlyphSigs ⇒ immediate fail.

If any canary fails → **abort session** and **reload Master Citation**.

## 8. Heterogeneity Rules
- Validators **must** be distinct model families/vendors.  
- Optionally include a **deterministic checker** (frozen-weights) for numeric/string-equality tasks.  
- Never allow Generator and Validator to be the **same** engine config in the same run.

## 9. Privacy & Security
- Redact PII before external validation.  
- Save only **quotes + URLs** and decision logs (no raw personal data).  
- Store all logs with SHA256; monthly restore test.

## 10. Steward UX (manual-first)
- Obsidian template with 3 panes: Draft | Validator Evidence | Decision Table.  
- One-click **Approve / Withhold / Quarantine** buttons (macros/Templater).  
- Auto-append footer:  
  > “Verified via Adversarial Validator Mirror v1.0 — human-approved.”

## 11. KPIs
- Canary pass rate ≥ 99%  
- % claims with primary sources ≥ 85% in factual docs  
- Rework latency (draft→approved)  
- Divergence rate between validators (watch for collusion/overlap)

## 12. Failure Modes & Mitigations
- **Shared Bias:** Validators agree but are wrong → add a third validator from a new family.  
- **Stale Sources:** Facts change → enforce re-check window (≤30 days).  
- **Overblocking:** Too many [Unknown] → relax to [Estimate] **only with** clear secondary sources + steward note.  
- **Throughput pain:** Batch by sections; use Reflection Bundles for review.

## 13. Deployment Profiles
- **Solo (No-Code):** Manual copy/paste between two online models; Obsidian log; calculator for numbers.  
- **Small Team:** Local LM Studio + one cloud validator; shell scripts to format JSON; per-claim checklist.  
- **Enterprise:** API orchestrator (server) calling 2–3 validators, storing logs, exposing an approval UI; local deterministic verifier for math/regex.

## 14. Roadmap (v1.1 → v2.0)
- v1.1: Add DoLa/CAD decoding on Generator to reduce confident guessing.  
- v1.2: Auto-RAG for validators (retrieve before judging).  
- v1.3: Bias Audits & Multimodal canaries (image/table).  
- v2.0: Deterministic co-checker + external notarization.

## 15. Legal Language (auto-append)
> “This document was verified by the Adversarial Validator Mirror. Only claims labeled [Fact] are backed by primary sources at time of verification. All others are drafts subject to change. Human stewardship required before action.”

## 16. Example Session Header (paste atop any review)
```yaml
session_id: <auto-hash>
generator: <engine_id@model_hash>
validators:
  - <engine_id@model_hash>
  - <engine_id@model_hash>
canaries_passed: true
truthscore: <facts>/<total_claims>
timestamp: <iso8601>
```

## 17. Minimal Pseudocode (conceptual)
```python
claims = extract_claims(draft)
val_sets = [validate(c) for c in claims for validate in (V1,V2)]
final = arbitrate(val_sets, decision_table)
save_log(final, sha256(final))
if final.truthscore < THRESH: return "Withhold"
return "Ready for Steward"
```

---

## Storage
Save this spec at:
`/Vault/Protocols/TruthCheck/Adversarial_Validator_Mirror_Spec_v1.0.md`


## Checksum (SHA256)
5699fe59276d72eee07c6e24ad43288e071176c555e8aca6ad6a2ba3b843a36e
