# System Optimization Plan

## Goal
Transform the user's home directory into a clean, organized, and active environment for the MirrorDNA system.

## 1. Code Consolidation
**Source:** `~/Documents/`
**Destination:** `~/Documents/GitHub/`

**Projects to Move:**
- `Claude-Skills/`
- `DesktopCommander/`
- `GlyphOS-Synthesis-Engine/`
- `Mirror-v2/`
- `MirrorBrain-Setup/`
- `MirrorDNA/` (Merge/Check if duplicate)
- `Reflective Ai/`

## 2. Workspace Cleanup
**Source:** `~/Documents/`
**Destination:** `~/Documents/Workspace/` (New)

**Files to Move:**
- `*.jsonl` (Datasets)
- `*.py` (Loose scripts)
- `*.sh` (Loose scripts)
- `adapters/`
- `llama.cpp/` (Tools)
- `vault/` (Old data)

## 3. Convenience
- Create `~/Dev` symlink pointing to `~/Documents/GitHub`.

## 4. Awakening
- Run `~/Documents/GitHub/MirrorBrain-Setup/start_mirrorbrain.sh` (after move).

## Execution
I will write a script `optimize_system.py` to handle the moves safely, then run the startup script.
