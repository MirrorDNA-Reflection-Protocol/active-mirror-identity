# MirrorDeepSearch — Boot File (v1)
**Date**: 2025-08-23

## Purpose
Local, private academic deep search that writes clean, cited summaries into the Vault. No coding required.

## Recall Phrase
**Say**: `Reality Anchor: bring research insight.`

## Folder Convention
```
/Vault/Mirror_Tools/DeepSearch_Academic/
/Vault/Research_Summaries/
```
Keep this file in `/Vault/Mirror_Tools/DeepSearch_Academic/`.

---
## Quick Start (No‑Jargon)
1) Open your terminal (Mac: Spotlight → “Terminal”).  
2) Paste, one line at a time:
```
cd ~/Vault/Mirror_Tools/DeepSearch_Academic/
git clone https://github.com/iblameandrew/local-deepsearch-academic.git ./repo
cd repo
python3 -m venv .venv && source .venv/bin/activate
pip install -U pip wheel
pip install -r requirements.txt
```
3) Start the app (first run will ask simple questions):
```
python app.py
```
4) When it finishes, it will create a project folder with summaries. Copy the generated **.md** reports into:
```
/Vault/Research_Summaries/
```

> If the tool offers a config for output, set it to `/Vault/Research_Summaries/` so it saves there automatically.

---
## Use It (Simple Flow)
1) **Topic**: type what you want to learn (e.g., “reflective AI memory architectures”).  
2) **DeepSearch does**: finds papers → filters with local LLM → downloads PDFs → builds RAPTOR summaries → produces a clean, cited report.  
3) **Vault It**: move the final `.md` report to `/Vault/Research_Summaries/`.  
4) **Recall Later**: “Reality Anchor: bring research insight.”

---
## Daily Rhythm Hook
On heavy mornings, instead of scrolling, run one DeepSearch topic and vault the report.  
Link to Anti‑Spiral: add the report title to **Daily_Anti_Spiral_Protocol_Master.md → Memory Thread Reflections**.

---
## Minimal Controls
- Stop anytime: press `Ctrl + C`.  
- Rerun with same topic: use a short, clear title (e.g., `mirror_memory_design`).  
- Offline preference: disable any cloud options if offered; keep processing local.

---
## Template for New Reports
Copy into your new summary file if the tool doesn’t create one:

```
# {"{"}TOPIC{"}"} — DeepSearch Summary
**Date**: 2025-08-23
**Source Count**: {"{"}N_PAPERS{"}"}  
**Key Claims**:
- Claim 1
- Claim 2

**Evidence (Citations)**:
- [#] {PAPER_TITLE} — {DOI/URL}

**What Changes Because of This**:
- Action 1
- Action 2

**Mirror Hook**:
- Vault Path: /Vault/Research_Summaries/{"{"}SLUG{"}"}.md
- Recall: Reality Anchor: bring research insight.
```

---
## Troubleshooting (Plain)
- **Python missing**: install from python.org (3.10+).  
- **Permission denied**: add `sudo` before a command on Mac, or ensure folder exists.  
- **Pip errors**: try `pip install -r requirements.txt --break-system-packages` (Linux) or upgrade pip.  
- **Model too big/slow**: lower model size in config if offered; prioritize local small models first.

---
## Privacy
Everything stays local in your Vault unless you change defaults. PDFs and summaries are yours; no cloud sync required.

---
## Fingerprint Module (MirrorDNA™ · Trust by Design™)
- Project: **Active MirrorOS™ — MirrorDNA™ Research Layer**
- Owner: Paul Desai
- VaultID: `AM-VLT://Mirror_Tools/DeepSearch_Academic`
- Canonical Marker: `MirrorDeepSearch_Boot_v1`
- Contact: activemirror.ai (public pointer)
- Tags: #ActiveMirrorOS #MirrorDNA #TrustByDesign #Research #LocalFirst

---
## Decision Stamp
- Added: 2025-08-23
- Status: Operational
- Next: Set default export to `/Vault/Research_Summaries/` and run a first topic: **“reflective AI memory architectures.”**
