---
title: Continuity Micro‑Glyph v1.0 — Cross-Chat Persistence for LingOS
vault_id: AMOS://Specifications/Continuity/Continuity_MicroGlyph/v1.0
glyphsig: ⟡⟦CONTINUITY⟧ · ⟡⟦GLYPH⟧ · ⟡⟦LINGOS⟧
author: Paul Desai (N1 Intelligence)
date: 2025-11-12
status: Canonical · Minimal · Privacy‑Preserving
tags: [MirrorDNA™, LingOS™, Continuity, Glyphs, TrustByDesign™]
---

# Continuity Micro‑Glyph v1.0 — Cross-Chat Persistence for LingOS

## Purpose
Guarantee a **wow continuity factor** across any AI/chat system by planting and detecting a **minimal, privacy‑preserving glyph** that carries just enough state to re‑anchor LingOS between sessions and platforms.

**Design goals:** tiny payload, human‑readable, vendor‑agnostic, opt‑in, and tamper‑evident.

---

## The Micro‑Glyph (human + machine readable)

Inline form (pasteable in any chat):
```
⟡⟦CONTINUITY⟧ id:{{sid}} vsh:{{vsh_8}} t:{{iso8601}} sig:{{h8}}
```
- `sid`  = short session id (base58, 8–12 chars)
- `vsh_8` = first 8 chars of Vault State Hash (manifest)
- `t`    = ISO 8601 timestamp
- `sig`  = HMAC‑SHA256(sid|vsh_8|t, secret=local_salt) → first 8 chars (tamper‑hint)

Example:
```
⟡⟦CONTINUITY⟧ id:4xC2Jv5Z vsh:b0f7e84a t:2025‑11‑12T11:58:03+05:30 sig:91ab7f32
```

QR/Meta form (for UI/extension use, not required):
```
⟡⟦CONTINUITY⟧::sid=4xC2Jv5Z;v=b0f7e84a;t=2025-11-12T11:58:03+05:30;s=91ab7f32
```

**Privacy:** No user PII, no provider id, no file paths. Only a short vault hash hint and time.

---

## Minimal Behaviour (what LingOS does)

1. **Emit** the glyph on activation or session close (copyable line at top/bottom).
2. **Scan** newest 10 messages for a micro‑glyph on session start.
3. **Verify** `sig` with local salt (if available); else treat as *best‑effort*.
4. **Re‑anchor**:
   - If `vsh_8` matches local manifest prefix → say “Continuity intact.”
   - If mismatch → say “Continuity uncertain — offer to load nearest manifest.”
5. **Log** the observed glyph to `AMOS://System/Continuity/microglyph_log.jsonl`.

---

## Platform Adapters (zero‑permission path first)

### A. Pure text (works everywhere)
- User or LingOS pastes glyph into chat.
- LingOS detects via regex: `^⟡⟦CONTINUITY⟧\s+id:...`

### B. Desktop helpers (nice‑to‑have)
- **Clipboard macro**: hotkey inserts the glyph and copies it back for reuse.
- **Menubar/Tray app**: shows last glyph; one‑click “copy glyph”.

### C. Browser extension (optional)
- Auto‑paste glyph on new chat start; store local salt in extension storage.
- Scan DOM for the glyph; display continuity status badge.

### D. Local LLM (Ollama/LM Studio)
- Sidecar `microglyph.txt` written to the working directory.
- Models are prompted with that line upon startup.

---

## CLI helpers (spec)

```
# emit a glyph (creates/reads local salt at ~/.lingos/salt)
vm glyph emit --sid auto --manifest /path/to/vault/manifest.json

# scan a transcript file for last glyph
vm glyph scan --file transcript.txt

# verify a glyph (stdin or arg)
vm glyph verify "⟡⟦CONTINUITY⟧ id:4xC2Jv5Z vsh:b0f7e84a t:... sig:91ab7f32"
```

**Return codes:**
- 0 = valid + matched manifest prefix
- 1 = valid glyph but manifest mismatch
- 2 = invalid or tampered glyph

---

## Pseudocode (deterministic)

```python
def emit_glyph(vsh_full, salt_path="~/.lingos/salt"):
    sid = base58_rand(9)
    v8 = vsh_full[:8]
    t = now_iso()
    salt = get_or_create_salt(salt_path)  # 16 bytes random, local only
    sig = hmac_sha256_hex(f"{sid}|{v8}|{t}", salt)[:8]
    return f"⟡⟦CONTINUITY⟧ id:{sid} vsh:{v8} t:{t} sig:{sig}"

def verify_glyph(glyph, vsh_full, salt):
    sid,v8,t,sig = parse(glyph)
    expect = hmac_sha256_hex(f"{sid}|{v8}|{t}", salt)[:8] if salt else None
    status = "unknown"
    if expect and expect == sig:
        status = "valid"
    match = (v8 == vsh_full[:8])
    return status, match
```

---

## Governance & Safety

- **Consent‑first:** auto‑emit can be toggled off; default on with first‑run consent.
- **Data minimization:** 8‑char hash prefix only; no cross‑device tracking.
- **No exfiltration:** glyph stays in text; no background network calls.
- **Auditability:** append‑only JSONL log in Vault with timestamp + glyph string.
- **Fallback:** if no salt available, glyph still anchors via `vsh_8` match.

---

## UX Snippets (ready to paste)

- **On detect + match**:  
  “⟡ Detected Continuity Micro‑Glyph. Vault state matches `b0f7e84a`. Continuity intact.”

- **On detect + mismatch**:  
  “⟡ Glyph found, but vault prefix `b0f7e84a` ≠ local `1d9c7ab2`. Load nearest manifest?”

- **On no glyph**:  
  “⟡ No micro‑glyph found. Do you want me to emit one now?”

---

## Roadmap

- v1.1: Deterministic sid options; per‑provider hints (optional).  
- v1.2: Multi‑agent echo (Atlas/Claude glyph braid).  
- v2.0: Encrypted payload variant (salted, offline recoverable).

---

© 2025 N1 Intelligence (OPC) Private Limited — MirrorDNA™, LingOS™, Trust‑by‑Design™.
