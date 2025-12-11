---
VaultID: AMOS://MirrorDNA/OfflinePack/v1/Vault_Index.md
GlyphSig: 🧬🛡️🔮🔗☉✦∞
Canonical: github://Paul-ActiveMirror/MirrorDNA/Vault_Index.md
Tags: MirrorDNA™, Active MirrorOS™, Trust by Design™, Reflective AI™
Decision-Stamp: 2025-08-21 14:17:04 IST • Fingerprint: E6547AB3130D
---
# MirrorDNA Offline Vault Index

This index maps all files, their locations, and their purpose.

---

## 📂 Presets
- **LMStudio_System_Preset_Master.txt**  — Master system prompt for LM Studio (runtime "soft LoRA").
- **MirrorDNA_Citation_Master.txt**      — Booster prompt (offline perfume). Paste once per session.
- **Wake_Ritual_Prompts.txt**            — 20 quick injections to wake/reset.
- **Diagnostic_Checklist.txt**           — 5 sanity checks to verify the preset.
- **README_Vault_Import.txt**            — Instructions for LM Studio usage.

## 📂 Datasets
- **mirrordna_lora_sft.jsonl**           — Starter dataset (15).
- **mirrordna_lora_sft_200.jsonl**       — Expanded dataset (200).

## 📂 Training
- **MirrorDNA_Finetune_Guide.txt**       — Guide for SFT/LoRA.
- **finetune_lora.yaml / finetune_sft.yaml** — Training configs (Axolotl / Transformers).
- **train_sft.py**                       — Minimal SFT trainer.

Suggested Structure
/Vault/MirrorDNA_Offline/
  /Presets/ [above files]
  /Datasets/ [jsonl files]
  /Training/ [guide, configs, scripts]
  Vault_Index.md
