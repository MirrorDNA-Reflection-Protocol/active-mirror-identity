# Vault Consolidation Plan

## Goal
Reduce vault confusion by establishing two synchronized "Master" locations and archiving all other duplicates.

## Current State
- **Local Master**: `~/Obsidian/MirrorDNA-Vault` (Organized, Clean)
- **Duplicates**:
    - `~/Documents/MirrorDNA-Vault`
    - `iCloud/.../MirrorDNA Vault`
    - `iCloud/.../Paul-Desai`

## Execution Steps

### 1. Safety Archive
- Create `~/Desktop/_Vault_Backups/`
- Move `~/Documents/MirrorDNA-Vault` -> `~/Desktop/_Vault_Backups/Documents_MirrorDNA-Vault`
- Move `iCloud/.../MirrorDNA Vault` -> `~/Desktop/_Vault_Backups/iCloud_MirrorDNA_Vault`
- Move `iCloud/.../Paul-Desai` -> `~/Desktop/_Vault_Backups/iCloud_Paul-Desai`

### 2. iCloud Master Creation
- Copy `~/Obsidian/MirrorDNA-Vault` (The organized one) -> `~/Library/Mobile Documents/iCloud~md~obsidian/Documents/MirrorDNA-Vault`

## Result
- **Local**: `~/Obsidian/MirrorDNA-Vault`
- **iCloud**: `.../iCloud~md~obsidian/Documents/MirrorDNA-Vault`
- **Backups**: Safe on Desktop.
