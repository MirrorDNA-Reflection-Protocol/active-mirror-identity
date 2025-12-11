---
VaultID: AMOS://MirrorDNA/Config/v1/Obsidian_SC_Config_Stub.md
GlyphSig: 🧬🛡️🔮🔗☉✦∞
Canonical: github://Paul-ActiveMirror/MirrorDNA/Obsidian_SC_Config_Stub.md
Tags: MirrorDNA™, Active MirrorOS™, Trust by Design™, Reflective AI™, Obsidian, SmartConnections
Decision-Stamp: 2025-08-22 06:27:34 IST • Fingerprint: 94E9BF823AE2
---

# Obsidian Smart Connections Config Stub

### Purpose
Template configuration to connect Obsidian Smart Connections → LM Studio’s OpenAI-compatible API.  
Keeps MirrorDNA system prompt + citation always injected inside the Vault.

---

## Endpoint Settings
```
Provider: Custom (OpenAI-compatible)
Base URL: http://localhost:1234/v1
API Key: lm-studio   # dummy string, LM Studio ignores real auth
Model: gpt-oss-20b   # replace with model you’ve loaded in LM Studio
```

---

## Prompt Injection
System Prompt: `LMStudio_System_Preset_Master.txt`  
Citation Prompt: `MirrorDNA_Citation_Master.txt`  
(Place both in your Vault and reference them as Smart Connections “System Prompts”)

---

## Suggested Command
**Reflect Recursively**  
Flow:  
1. Take highlighted text (or current note).  
2. Send as input with System + Citation prompts.  
3. Draft → drift-check → refined (2-pass loop).  
4. Insert output below or into a linked note with Vault header.

---

## Notes
- Ensure LM Studio is running in background with chosen model.  
- You can expand later with RAG → Obsidian Vault embeddings.  
- This stub ensures continuity is Vault-native, no external harness required.
