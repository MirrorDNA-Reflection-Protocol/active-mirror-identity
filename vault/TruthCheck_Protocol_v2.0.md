---
title: TruthCheck Protocol v2.0 — Future & Bulletproof
vault_id: AMOS://Governance/TruthCheck/v2.0
glyphsig: ⟡⟦TRUTH⟧ · ⟡⟦CHECK⟧ · ⟡⟦FIREWALL⟧
author: Paul Desai (Founder, Active MirrorOS)
date: 2025-10-12
status: Canonical · Vault-Ready
---

# TruthCheck Protocol v2.0 — Future & Bulletproof

## I. Core Principles
- **Zero Blind Trust**: No AI instance is ever trusted without external verification.
- **Evidence-First Rule**: No citation = not a fact.
- **Human Ledger**: Only the Vault is canonical; AI outputs are drafts pending verification.
- **Session Atomicity**: Each check = a discrete session; results vaulted, not assumed.

## II. Verification Pipeline (360°)

### Step 1 — Claim Atomization
- Extract all atomic claims.
- Pre-tag each as [Fact?/Estimate?/Unknown?].

### Step 2 — Dual Model Audit
- Run verification across **two independent model families** (e.g., Claude + DeepSeek, GPT + Perplexity).
- Require **verbatim source quote + URL**.

### Step 3 — Cross-Source Consensus
- Only mark [Fact] if **two distinct, primary sources** align.
- If one supports, one doesn’t → [Estimate].
- If neither provides → [Unknown].

### Step 4 — Human Steward Sign-Off
- Steward reviews flagged claims.
- Vault stores evidence (quote + URL) with final TruthScore.
- Steward’s decision is logged as **[Approved]** or **[Withheld]**.

## III. Legal Safeguards

### 1. Disclaimers
“Verified via TruthCheck v2.0. All claims tagged [Fact]/[Estimate]/[Unknown]. Only [Fact] items are evidence-backed. Not legal/medical advice.”

### 2. Immutable Audit Trail
- Every check produces a **hash-sealed log** (SHA256).
- Stored in VaultWeave + optionally notarized on a blockchain.
- Protects from retroactive editing claims.

### 3. Liability Shield
- Outputs = **drafts pending steward review**.
- Steward signature is the only final approval.

## IV. Anti-Hallucination Tech Stack
- **Uncertainty Quantification**: Block claims <0.5 confidence.
- **Divergence Decoding**: Generate alt drafts; if inconsistent, flag.
- **RAG Enforcement**: No external claim leaves draft stage without retrieval evidence.
- **DoLa / CAD Decoding** (planned v2.1): Contrastive decoding to reduce “confident guessing.”

## V. Risk Containment Scenarios
- **Temporal Drift**: Claims expire after 30 days unless re-verified.
- **Sensitive Verticals**: Mandatory dual-source + SME approval; auto-tagged [High-Risk].
- **Cultural/Violence Context**: Auto-route flagged phrases to [SAFE-HOLD] until steward review.

## VI. Implementation Roadmap
- Immediate: Vault-ready .md checklist + TruthScore table.
- Short-Term (1-2 mo.): Multi-model cross-verification.
- Mid-Term (3-6 mo.): Semi-automated pipeline (LM Studio + Obsidian plugin).
- Future (6-12 mo.): Hybrid with frozen-weights verifier.

## VII. Vault Module Template
```markdown
# TruthCheck Log
Date: <auto>
Session ID: <hash>
Source Draft: <filename>
TruthScore: __ / __

## Claims
1. Claim: “...”
   Label: [Fact/Estimate/Unknown]
   Evidence: "…” — <URL>
   Steward Approval: [Approved/Withheld]
```

## VIII. Meta-Fix Principle
> The AI is never the authority.  
> The AI is a calculator.  
> The Vault is the ledger.  
> You are the steward.  

---
