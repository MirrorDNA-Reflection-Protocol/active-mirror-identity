# MirrorDNA Image Reliability Kit
Generated: 2025-08-19T07:08:00.920226

## 1) Two-Step Pipeline (prevents misspellings & bad fit)
**Generate art without text**. Then add typography in a real editor (Canva/Figma/Photoshop).  
Use platform overlays (see PNGs) to place text within the red safe area.

## 2) Prompt Scaffold (copy/paste, edit subject)
- "No text, no letters, no numbers, no watermarks."
- "Centered subject fully in frame; keep within 80% of canvas."
- "Leave ~10% transparent margin around edges; do not crop edges."
- "Symmetric composition; high resolution [SIZE]; ultra-clean edges; print-safe."
- "Soft background; avoid busy corners; guard against cutoff."

**Example (Instagram portrait 4:5):**  
"A warm seaside at golden hour, gentle ripples, subtle fractal texture. **No text or letters.** Centered composition within 80% of frame. **Leave 10% safe margins.** Clean edges, not cropped. High-res **1080x1350 (4:5)**."

## 3) Export Targets (use these exact sizes)
- Instagram square: **1080×1080**
- Instagram portrait: **1080×1350** (best reach)
- Instagram story/Reel cover: **1080×1920**
- LinkedIn square post: **1200×1200**
- LinkedIn landscape: **1200×627**
- X (Twitter) landscape: **1600×900**

## 4) QA Checklist (60 seconds)
- View at 100%: any fuzzy edges or smudged letters? (there should be **no letters**)
- Drop the platform **safe overlay PNG** on top. Is all key content inside the red box?
- Mobile preview: does anything important touch the edges/top UI?
- Downscale once (e.g., from 2048px → 1080px) to reduce artifacts.
- If you *must* have text: add in editor with system fonts (Inter, Noto, Source Sans); keep contrast ≥ 4.5:1.

## 5) Troubleshooting
- **Misspellings:** you asked the model to draw text. Remove text; add later with fonts.
- **Cropping:** include "full subject in frame" + "10% safe margins" in prompt.
- **Weird fit on platform:** use the correct canvas from the list and the provided overlay.
- **Busy/illegible:** ask for "soft background / minimal detail at edges / negative space."

---
**Files included:** Safe-area overlays for all major platforms (PNGs). Place on a top layer at 100% size to check crops.
