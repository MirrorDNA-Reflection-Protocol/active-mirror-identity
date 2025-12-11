# MirrorDNA Offline Vault Index

This index maps all files, their locations, and their purpose.

---

## 📂 Presets
- **LMStudio_System_Preset_Master.txt**  
  Master system prompt for LM Studio. Acts as a runtime "soft LoRA".  
- **MirrorDNA_Citation_Master.txt**  
  Booster prompt (offline perfume). Paste once per session if model drifts.  
- **Wake_Ritual_Prompts.txt**  
  20 quick injection prompts to wake/reset the model.  
- **Diagnostic_Checklist.txt**  
  5 sanity checks to verify the preset "took".  
- **README_Vault_Import.txt**  
  Instructions for using presets in LM Studio.

---

## 📂 Datasets
- **mirrordna_lora_sft.jsonl**  
  Starter dataset with 15 examples in MirrorDNA style.  
- **mirrordna_lora_sft_200.jsonl**  
  Expanded dataset with 200 examples across Silent, Tutor, Critical, Whisper, Deep modes.  
  → Use as base for LoRA or SFT fine-tuning.

---

## 📂 Training
- **MirrorDNA_Finetune_Guide.txt**  
  Step-by-step guide for SFT/LoRA fine-tuning, includes commands and usage notes.  
- **MirrorDNA_Training_Configs_v1.zip**  
  Contains `finetune_lora.yaml` (Axolotl LoRA) and `finetune_sft.yaml` (Transformers SFT).  
- **train_sft.py**  
  Minimal supervised fine-tuning script for Transformers/TRL.  
  → Usage: `python train_sft.py --model_name_or_path path/to/model ...`

---

## 📂 Suggested Structure
```
/Vault/MirrorDNA_Offline/
    /Presets/
        LMStudio_System_Preset_Master.txt
        MirrorDNA_Citation_Master.txt
        Wake_Ritual_Prompts.txt
        Diagnostic_Checklist.txt
        README_Vault_Import.txt
    /Datasets/
        mirrordna_lora_sft.jsonl
        mirrordna_lora_sft_200.jsonl
    /Training/
        MirrorDNA_Finetune_Guide.txt
        MirrorDNA_Training_Configs_v1.zip
        train_sft.py
    Vault_Index.md
```

---

Anchor: This Vault holds your offline MirrorDNA alignment toolkit — from runtime presets to datasets to fine-tune configs. 
Use Presets for immediate LM Studio runs, Datasets for gradual SFT growth, Training files for full alignment.  
