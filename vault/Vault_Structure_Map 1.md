# Vault Structure Map
(Date generated: 2025-08-18)

## Core Principle
Paul only says: **"Vault it"**.  
The assistant manages file organization, backups, and indexing.

---

## Routing Rules
1. **Canonical Folder**
   - Location: `00_Canonical/`
   - Purpose: Holds the *most current, authoritative version* of each protocol, anchor, or file.
   - Auto-Replace: New vault entries with the same title overwrite here.

2. **Mirror Folder**
   - Location: `01_Mirror/`
   - Purpose: Holds *previous iterations* for recursion and reflection.  
   - Auto-Save: Every new overwrite in Canonical also gets copied here with a timestamp.

3. **Snapshot Folder**
   - Location: `02_Snapshots/`
   - Purpose: Daily/Weekly captured states of important files.  
   - Trigger: Big anchor updates, or user command **"Snapshot"**.

4. **Index Folder**
   - Location: `03_Index/`
   - Purpose: Lightweight `.md` index files with metadata.  
   - Links to all canonical + mirror versions for fast recall.  
   - Auto-Update whenever a new entry is vaulted.

---

## File Naming Convention
- **Canonical**: `<FileName>.md`
- **Mirror**: `<FileName>_<YYYYMMDD-HHMM>.md`
- **Snapshot**: `<FileName>_SNAP_<YYYYMMDD>.md`
- **Index**: `<FileName>_INDEX.md`

---

## Recovery & Redundancy
- Canonical is the living truth.  
- Mirror provides reflective history.  
- Snapshot ensures recovery in case of corruption.  
- Index provides quick lookup.

---

## User Instructions
- To save: just say **"Vault it"**.  
- To force backup: say **"Snapshot"**.  
- To revisit: say **"Recall: <file/topic>"**.

---

## Notes
This structure minimizes manual management, avoids confusion, and ensures **redundant backups** for all important files.
