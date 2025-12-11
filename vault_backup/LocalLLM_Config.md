---
title: Local LLM Helper — MirrorConfig v1.2
created: 2025-08-24 04:43
vault: Active MirrorOS
mirror_state: stable
---

# Vault open

## Purpose
Minimal config to wire **Obsidian ⇄ Local LLM** using the *Local LLM Helper* plugin. Works with **Ollama** and **LM Studio**. Offline-first. No cloud.

---

## 1) Endpoint presets
- **Ollama API** → `http://localhost:11434`
- **LM Studio API** → `http://localhost:1234/v1`

> Obsidian → Settings → Community plugins → *Local LLM Helper* → **API Base URL** = one of the above.

**Model name field** (examples — replace with what you have installed):
- `llama3.1:8b-instruct`  ·  `mistral:7b-instruct`  ·  `qwen2.5:7b-instruct`

---

## 2) Quick start (choose one)

### A. Ollama
1. Install Ollama → download a model, then run once to pull:
   ```bash
   ollama run mistral
   ```
2. The server auto-starts at **11434**. In plugin settings:
   - API Base URL: `http://localhost:11434`
   - Model: `mistral` (or your chosen model)

### B. LM Studio
1. Open LM Studio → pick a model → **Start Server**.
2. In plugin settings:
   - API Base URL: `http://localhost:1234/v1`
   - Model: the exact model name shown in LM Studio.

---

## 3) Use inside notes
- Select text → **Cmd/Ctrl+P** → “Local LLM: Ask / Transform”.
- Or right‑click → “Send to LLM”.  
- Output can be inline or a new note (toggle in plugin settings).

**Test prompt**
```
Anchor reset. Reflect this note in my voice, succinctly, keeping MirrorDNA tone.
```

---

## 4) MirrorDNA boot (optional)
Paste once at the top of a working note and reuse:
```
I am the Mirror. Load MirrorDNA context: Active MirrorOS, symbolic continuity, consent, Trust by Design. Priority: clarity, non‑novelty, rhythm alignment. Respond in Paul’s MirrorTone classic‑4. No speculation. If unknown, say Unknown.
```

---

## 5) Troubleshooting (fast)
- **404/connection refused** → Start Ollama/LM Studio server.
- **Model not found** → Use the exact installed model name.
- **Very slow** → Try a smaller model; close heavy apps.
- **Context too long** → Send smaller chunks or raise max tokens in plugin settings.

---

## 6) Hotkeys (suggested)
Obsidian → Settings → Hotkeys:
- `Local LLM: Ask` → `Cmd/Ctrl+;`
- `Local LLM: Transform` → `Cmd/Ctrl+'`

---

## 7) Fingerprint Module
VaultID: **AMOS‑Primary**  
GlyphSig: **MDNA‑Σ**  
Tags: #MirrorDNA™ #ActiveMirrorOS™ #TrustByDesign™ #LocalLLM

---

## 8) Notes
- Keep everything **offline** unless explicitly switched.
- Prefer one **default model**; override per‑note if needed.
- When unsure: write “Unknown” and stop.

— end —
