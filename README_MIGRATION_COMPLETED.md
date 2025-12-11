# AMI Kernel Migration Completed
**Date:** 2025-12-11
**Status:** SUCCESS / UNIFIED
**Canonical Path:** `/Users/mirror-admin/Documents/GDrive/My Drive/ActiveMirrorOS/AMI`

## Overview
The AMI Ecosystem has been fully migrated to Google Drive to enable multi-agent synchronization (ChatGPT, Claude, MirrorBrain). The "Code Kernel" (`active-mirror-identity`) and "State Kernel" (`AMI`) have been unified into a single canonical folder.

## Canonical Locations
- **Unified Kernel Root:** `~/Documents/GDrive/My Drive/ActiveMirrorOS/AMI`
- **Identity State:** `ami_active-mirror.json` (Unified L1 + Spine v1.0 Metadata)
- **Codebase:** `core/`, `server/`, `mcp/` (Merged from GitHub/active-mirror-identity)

## Symlink Redirections
Local paths have been redirected to the Canonical Drive folder. Existing scripts using these paths should continue to work:
- `~/Documents/GitHub/AMI` -> Points to Drive
- `~/Documents/GitHub/active-mirror-identity` -> Points to Drive

## Component Updates
- **Synapse (metadata/synapse.py):** Updated to watch `ami_active-mirror.json`.
- **MCP Server (mcp/server.py):** Updated to serve `ami_active-mirror.json`.

## Manual Action Required (Critical)
1.  **Restart Claude Desktop:** To ensure it loads the python modules from the new Symlinked location.
2.  **Verify Claude Config:** If Claude fails to load AMI tools, check `~/Library/Application Support/Claude/claude_desktop_config.json`. Ensure paths point to `~/Documents/GitHub/AMI/...` or `~/Documents/GitHub/active-mirror-identity/...` (both are valid symlinks).
3.  **ChatGPT:** Use the Google Drive integration to access `ActiveMirrorOS/AMI/ami_active-mirror.json`.

## Backup
- **Pre-Merge Backup:** `~/Documents/GDrive/My Drive/ActiveMirrorOS/AMI_BACKUP_PRE_MERGE`
- **Local Git Backup:** `~/Documents/GitHub/active-mirror-identity_BACKUP`
