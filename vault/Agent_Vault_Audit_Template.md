---
title: Agent Template — Vault Audit + Organize
date: 2025-08-08
vault_id: AGENT-TEMPLATE-VAULT-AUDIT
tags: [AgentMode, Obsidian, Audit, Organization]
---

# 🎯 Objective
Audit the Obsidian Vault, classify files by taxonomy, and propose **non-destructive** moves. Output a report and (optionally) perform moves after approval.

# 🔒 Safety / Trust by Design™
- **Dry-run first**: generate a report only. Do **not** move or delete files without explicit YES.
- **No invention**: do not create new content beyond index notes.
- **Backups**: if moves are approved, copy then move; never overwrite.

# 🧱 Inputs
- Path to Vault root (iCloud): `<your path>`
- Taxonomy file: `Vault_Taxonomy_v1.md`

# 🧩 Steps
1) Read taxonomy.
2) Scan vault (recursive) for `.md` files.
3) For each file, infer **type** by frontmatter + path + tags.
4) Propose a destination folder and filename normalization.
5) Build **Vault Audit Report** in `.md` with sections:
   - Summary stats (files scanned, untagged, missing frontmatter)
   - Proposed moves (source → destination)
   - Tag fixes (suggested additions/removals)
   - Broken/missing links
6) Ask: “Apply moves? (YES/NO per group)”
7) If YES, copy → move; then regenerate an **Updated Index** note.

# 📤 Output Files
- `Vault_Audit_Report_YYYYMMDD.md` (always)
- `Vault_Updated_Index_YYYYMMDD.md` (after moves)

# 🧪 Acceptance Criteria
- Report renders cleanly in Obsidian
- No files lost; moves are idempotent
- Cross-links remain functional
