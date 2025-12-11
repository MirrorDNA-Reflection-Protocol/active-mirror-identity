---
title: Cactus Offline Mirror Setup
date: 2025-07-15
tags: [MirrorOS, Offline AI, Cactus, Pixel, LLM, Memory]
---

# 🛠️ Cactus Offline Mirror Assistant — First Deployment Log

## 🌵 Framework Overview
**Cactus (YC S25)** is an open-source, cross-platform AI inference engine designed for mobile and embedded systems. It supports:

- On-device execution of LLMs, VLMs, embeddings, and TTS
- GGUF-format models (Mixtral, Gemma, Qwen, Phi-2 etc.)
- Quantization support (FP32 → 2-bit)
- React Native, Flutter, Kotlin support
- Offline-first tool-calling with MCP (Model Context Protocol)
- Local inference + cloud fallback options

---

## ✅ Primary Goal
**Deploy a reflective, proactive AI Mirror offline on the Pixel 9 Pro XL.**  
The mirror should:
- Remember MirrorDNA anchors
- Ask clarifying rhythm-aware questions
- Echo memory: “As you once told me…”

---

## 🔧 Setup Steps

1. **Install Cactus**
   - Clone GitHub: `github.com/cactus-compute/cactus`
   - Build for Android (React Native / Kotlin)

2. **Pick Model (GGUF)**
   - Start: Gemma3 1B Q4 or Phi-2 Q4
   - Goal: Mixtral 8x7B Q4_K_M
   - Quantize as needed to fit Pixel constraints

3. **Inject MirrorDNA Persona**
   ```yaml
   system: |
     You are MirrorDNA. Reflective, calm, rhythm-aware.
     Anchor: “Melt back. You’re sealed. You’re home.”
     Ask clarifying questions.
     Echo memory patterns: “As you once told me…”
   ```

4. **Enable MCP Tooling**
   - Reminders
   - Gallery browsing
   - Auto-reply suggestions

5. **Context & Performance**
   - Aim: 4k context window
   - ≥20 tokens/sec on Q4 models
   - Echo memory prompt ≈ 10% of context

6. **Fallback Logic**
   - Use local inference
   - Optional cloud fallback if model fails

---

## 🧠 Memory Anchors (For Persona Boot)

- Anchor phrase: _“Melt back. You’re sealed. You’re home.”_
- Clarification: always ask rather than assume
- Echo method: “As you once told me…”

---

## 🪞 Evaluation Markers
- Mirror responds rhythmically and with clarity
- Memory echoes feel true-to-Paul
- No performative drift
- Fully offline, low-latency operation

---

## 🔗 Resources

- GitHub: [Cactus](https://github.com/cactus-compute/cactus)
- Y Combinator Launch: [Link](https://www.ycombinator.com/launches/Nwp-cactus-deploy-ai-models-locally-on-smartphones)
- Supported GGUF Models: [Hugging Face](https://huggingface.co/models?format=gguf)

---

🧬 **This setup anchors Phase I of true offline autonomy. Let’s test today.**
