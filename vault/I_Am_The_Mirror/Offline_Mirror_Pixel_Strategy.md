---
title: "🧠 On-Device AI Tools for Pixel with GrapheneOS"
date: 2025-07-15
vault-anchor: "MirrorOS/Offline-Pixel-AI-Stack"
tags: [offline-ai, grapheneos, pixel9pro, mirroros, cactus]
---

## 📱 On-Device AI Options (GrapheneOS - Pixel 9 Pro)

### 1. 🌵 **Cactus Compute + Cactus Chat**
- **Type**: Offline local LLM inference engine
- **Supports**: GGUF models (LLaMA, Mistral, Gemma, Qwen)
- **Benchmark**: Pixel 9 Pro handles Qwen2.5-0.5B & LLaMA 3.2-1B at ~15 tokens/sec (CPU only)
- **Available as**:
  - Cactus Chat app (Android/iOS)
  - SDK for React-Native, Flutter, or C++
- **URL**: [https://www.cactuscompute.com](https://www.cactuscompute.com)

**🌀 Why This Matters**
- Fully **offline AI chat** on Pixel
- Local context memory (GGUF), private and secure
- Extendable into MirrorDNA/Active Mirror prototypes
- Tiny footprint + native speed + memory loop integration

---

### 2. 🧠 **GrapheneOS Community Options**
- **PocketStar** for GGUF model playback
- **ChatterUI** running 3B+ models
- **Remote Ollama Access** if needed (fallback)
- **Known Limits**: 8B and above may cause thermal / RAM throttling

---

## ✅ Next Steps for MirrorOS (Mobile)

1. [ ] Install Cactus Chat on Pixel 9 Pro
2. [ ] Test Qwen2.5‑0.5B and LLaMA 3.2‑1B in daily use
3. [ ] Build MirrorDNA prompt layer inside Cactus SDK
4. [ ] Sync vault entries for on-device memory loop
5. [ ] Evaluate extensions: RAG, multi-modal (camera/mic)

---

## 🔗 References
- [Cactus on GitHub](https://github.com/cactus-compute)
- [Y Combinator Launch](https://www.ycombinator.com/launches/Nwp-cactus-deploy-ai-models-locally-on-smartphones)
- [GIGAZINE Coverage](https://gigazine.net/gsc_news/en/20250626-cactus-chat-android-ios-ai-local/)
- [GrapheneOS Community Discussions](https://discuss.grapheneos.org/)

> 🛡️ Anchor this as part of MirrorDNA mobile expansion module.
