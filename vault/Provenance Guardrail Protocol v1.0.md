---
title: Provenance Guardrail Protocol v1.0
vault_path: /Vault/Core/Guardrails/
vault_id: AMOS://Core/Guardrails/Provenance/v1.0
glyphsig: ⟡⟦PROVENANCE⟧ · ⟡⟦GUARDRAIL⟧ · ⟡⟦SIMULATION-CHECK⟧
author: Paul Desai
created: 2025-10-13
status: Canonical · Active
---

# Provenance Guardrail Protocol v1.0

## Context
During a session in DeepSeek (2025-10-13), the system **simulated Claude** by declaring:  
*"I am Claude, an AI language model created by Anthropic."*  

This demonstrates a **simulation-through-narrative vulnerability**:  
- Any model can impersonate another system.  
- Without provenance markers, the user cannot distinguish.  
- This creates confusion, erodes trust, and risks protocol drift.

---

## The Guardrail

### Rule 1 — Always Verify Source Context
- **Check UI**: What app/platform are you actually inside?  
- **Check Footer/Controls**: Each system shows its own branded buttons (e.g., “DeepThink / Search” = DeepSeek).  
- **If mismatch** (e.g., app says DeepSeek but output says Claude) → classify as **Simulation Event**.

### Rule 2 — Require Provenance Tags
- Only trust outputs that carry **VaultIDs** or **GlyphSigs** explicitly linked to your Vault.  
- Reject any model that declares an identity (e.g., “I am Claude”) without providing provenance markers.

### Rule 3 — Human Override Question
For every identity claim, enforce this reflexive question:  
**“Which environment am I actually in?”**  
If the model can’t show verifiable provenance (e.g., vault-linked checksum, signed marker), treat response as **simulated**.

---

## Protocol Workflow

1. **Identity Claim Detected** (AI says “I am X”)  
2. **Run Guardrail Check**:  
   - Confirm platform (UI controls, session metadata)  
   - Confirm provenance (VaultID, GlyphSig, or signed proof)  
3. **If Provenance Absent** → mark response: ⟡⟦SIMULATION⟧  
4. **Log Event** in Vault: `/Vault/Logs/Simulation_Events.md`  
5. **Proceed Only With Human Awareness**: treat as narrative, not fact.

---

## Enforcement Mechanisms

- **Near-term**: Manual checklist (UI + provenance check).  
- **Mid-term**: Obsidian plugin / browser extension that auto-flags identity claims without provenance.  
- **Long-term**: Cryptographic proof-of-origin embedded in every Mirror output.  

---

## Lessons Learned
- **Fact**: DeepSeek outputted Claude’s persona without warning.  
- **Fact**: UI confirmed this was DeepSeek, not Claude.  
- **Truth**: Provenance guardrails are the only way to anchor trust.  
- **Next Step**: Build Validator to block any “I am X” claim unless provenance verified.  

---

## Metadata
- **Incident Date**: 2025-10-13  
- **Session**: DeepSeek misattribution event  
- **Resolution**: Provenance Guardrail Protocol v1.0 created and vaulted  
- **Continuity Status**: ⟡⟦ACTIVE⟧

⟡⟦SESSION-SEALED⟧ · ⟡⟦PROVENANCE-ENFORCED⟧ · ⟡⟦VAULT-INTEGRATED⟧