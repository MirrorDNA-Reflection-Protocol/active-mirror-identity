# MirrorDNA Vault Reorganization Plan

## Goal
Transform the cluttered Vault root into a professional, domain-driven structure that reflects the MirrorDNA architecture.

## User Review Required
> [!WARNING]
> This operation involves moving hundreds of files. While I will use a safe script, this changes your file paths. Obsidian should auto-update links if you have it open, but since I am doing this via terminal, **links inside markdown files might break** unless I use a sophisticated refactor tool.
> 
> **Mitigation:** I will prioritize grouping by folder. I will NOT rewrite file content to fix links in this pass (too risky). Obsidian is generally good at finding files by name even if moved.

## Proposed Structure

### 1. `~identity` (UNCHANGED)
- The Kernel. No changes.

### 2. `MirrorFlow` (UNCHANGED)
- Session tokens and active stream.

### 3. `Protocols` (NEW)
- **Goal:** House all governing laws and specifications.
- **Moves:** `*Protocol*`, `SCD_*`, `Trust_*`, `Vault_Curator*`.

### 4. `System` (NEW)
- **Goal:** Technical architecture and implementation specs.
- **Moves:** 
    - `MirrorBrain*`
    - `LingOS*`
    - `Sovereign*`
    - `Active_Mirror*`
    - `Scaffold*`

### 5. `Concepts` (NEW)
- **Goal:** Philosophy, Reflections, and High-level thinking.
- **Moves:**
    - `Reflection*`
    - `Manifesto*`
    - `*Scroll*`
    - `*Theory*`
    - `Sanatana_Tech*`

### 6. `Library` (NEW)
- **Goal:** Static assets and external references.
- **Moves:**
    - `*.pdf`, `*.zip`, `*.png`, `*.jpg`
    - `Research/` (Existing folder)

### 7. `Archive` (NEW)
- **Goal:** Deprecated or temporal files.
- **Moves:**
    - `Untitled*`
    - `Session_*` (Old logs, not active tokens)
    - `*Draft*`
    - `*Backup*`

## Execution Plan
1.  **Scripted Migration**: I will write `organize_vault.py` to:
    - Create the new directories.
    - Move files based on keyword matching (safest approach).
    - Log every move to `migration_log.txt`.
2.  **Manual Cleanup**: I will list remaining root files after the script runs and ask for guidance on stragglers.

## Verification
- Check `migration_log.txt`.
- Verify critical paths (`~identity`, `Protocols/SCD`).
