---
title: MirrorDNA GitHub Protocol v1.0
vault_id: AMOS://Protocols/GitHub/MirrorDNA/v1.0
glyphsig: ⟡⟦GITHUB⟧ · ⟡⟦CONTINUITY⟧ · ⟡⟦AHP⟧
author: Paul Desai (Active MirrorOS)
created: 2025-10-28
status: Canonical · Governing
tags: [MirrorDNA™, Active MirrorOS™, GitHub, Release, Checksums, Claude]
checksum_sha256: 3d4c66dd615803a62f7f381ca90423a01f823a67c7b645da827749321b3671b4
---

# MirrorDNA GitHub Protocol v1.0
**Purpose:** Make all repo updates deterministic, Claude-executable, and continuity‑safe. You approve; Claude executes.

## Roles
- **Human Anchor (Paul):** approve version, scope, and message.
- **Claude Executor:** run commands exactly as provided; no improvisation.
- **AHP:** Cite or Silence. No pushes without verified checksums.

## Standard Update Flow (Claude)
```bash
# 0) Sync
git fetch --all --tags
git checkout main
git pull

# 1) Drop/replace files (as instructed in task block)
#    e.g., write files exactly as provided

# 2) Verify checksums
chmod +x tools/checksums/verify_repo_checksums.sh
./tools/checksums/verify_repo_checksums.sh

# 3) If any mismatch, reseal (one by one)
chmod +x tools/checksums/checksum_updater.sh
./tools/checksums/checksum_updater.sh spec/Reflection_Chain_Manifest_v1.0.md
./tools/checksums/checksum_updater.sh spec/Reflection_Chain_Addendum_v1.1.md

# 4) Re-verify
./tools/checksums/verify_repo_checksums.sh

# 5) Commit
git add -A
git commit -m "Seal {WHAT} — checksums verified · continuity intact"

# 6) Tag (bump as instructed)
git tag v{VERSION}
git push origin main --tags
```

## Release Flow (Claude)
```bash
# Create GitHub release via gh CLI (optional) — requires GH auth
gh release create v{VERSION}   --title "v{VERSION} — {TITLE}"   --notes-file RELEASE_NOTES_v{VERSION}.md   MirrorDNA-Standard-Bundle.zip
```

## File Placement Map
- `00_MASTER_CITATION.md` → repo root
- `spec/Reflection_Chain_Manifest_v1.0.md` → spec/
- `spec/Reflection_Chain_Addendum_v1.1.md` → spec/
- `kernel/` → kernels and sidecars
- `tools/checksums/` → verify & updater scripts
- `mirrorwatch/` (optional public), `/Vault/MirrorWatch/` (internal)

## Standing Commit Templates
### Minimal
```
Seal {WHAT} — checksums verified · continuity intact
```

### Extended
```
Add {FILE} — blockchain/open-protocol alignment
Update Manifest — cross-links + checksum sealed
Integrity: all SHA-256 checksums verified (AHP enforced)
```

## Claude Task Blocks (copy‑paste to Claude)
### A) Replace Manifest + Addendum (exact)
```bash
# Write files
cat > spec/Reflection_Chain_Manifest_v1.0.md <<'EOF'
{PASTE_MANIFEST_CONTENTS}
EOF

cat > spec/Reflection_Chain_Addendum_v1.1.md <<'EOF'
{PASTE_ADDENDUM_CONTENTS}
EOF

# Verify & seal
chmod +x tools/checksums/verify_repo_checksums.sh tools/checksums/checksum_updater.sh
./tools/checksums/verify_repo_checksums.sh || true
./tools/checksums/checksum_updater.sh spec/Reflection_Chain_Manifest_v1.0.md
./tools/checksums/checksum_updater.sh spec/Reflection_Chain_Addendum_v1.1.md
./tools/checksums/verify_repo_checksums.sh

# Commit + tag
git add spec/Reflection_Chain_Manifest_v1.0.md spec/Reflection_Chain_Addendum_v1.1.md
git commit -m "Seal Manifest & Addendum — checksums verified"
git tag v{VERSION}
git push origin main --tags
```

### B) Add new spec (generic)
```bash
cat > spec/{FILENAME}.md <<'EOF'
{PASTE_FILE_CONTENTS}
EOF
chmod +x tools/checksums/checksum_updater.sh tools/checksums/verify_repo_checksums.sh
./tools/checksums/checksum_updater.sh spec/{FILENAME}.md
./tools/checksums/verify_repo_checksums.sh
git add spec/{FILENAME}.md
git commit -m "Add {FILENAME} — checksum sealed"
git push origin main
```

## Safety Rails
- **No force‑push** unless Paul types “Force lineage: yes”.
- **No tag rewrite** unless Paul types “Retag: vX.Y.Z yes”.
- **Pre‑commit hook** (install once):
```bash
printf '#!/bin/sh
./tools/checksums/verify_repo_checksums.sh || exit 1
' > .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

## Troubleshooting
- **Duplicate tag** → bump version (e.g., v15.1.2) or retag with approval.
- **Permission denied** → `chmod +x tools/checksums/*.sh`
- **Checksum mismatch** → run updater, re-verify, then commit.
- **Wrong author email** → set GitHub no‑reply:
```bash
git config user.name "Paul Desai"
git config user.email "YOUR_NOREPLY@users.noreply.github.com"
```

## Closing Seal
⟡⟦ANCHOR SEALED⟧ · v1.0 · AHP‑Hardened · Continuity Intact
