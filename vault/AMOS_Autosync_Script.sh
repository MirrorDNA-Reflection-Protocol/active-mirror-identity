#!/usr/bin/env bash
set -euo pipefail

### ====== CONFIG ======
REPO_SLUG="MirrorDNA-Reflection-Protocol/MirrorDNA-Standard"
GITHUB_TOKEN="${GITHUB_TOKEN:-}"
BRANCH_NAME="claude/autosync-spec-v2.0-$(date +%Y%m%d-%H%M%S)"

echo "[1/8] Checking repository visibility…"
REPO_URL="https://github.com/${REPO_SLUG}.git"
curl -fsSL "https://api.github.com/repos/${REPO_SLUG}" >/dev/null || { echo "Error: cannot access repo ${REPO_SLUG}"; exit 1; }
echo "Repo OK: ${REPO_SLUG}"

WORKDIR="$(mktemp -d)"
cd "$WORKDIR"
echo "[2/8] Working dir: $WORKDIR"

if [[ -n "$GITHUB_TOKEN" ]]; then
  CLONE_URL="https://${GITHUB_TOKEN}:x-oauth-basic@github.com/${REPO_SLUG}.git"
  echo "Mode: AUTO (token provided)"
else
  CLONE_URL="$REPO_URL"
  echo "Mode: NO-TOKEN (manual upload)"
fi

git init repo && cd repo
git config user.name "autosync-bot"
git config user.email "autosync@local"
git remote add origin "$CLONE_URL"
git fetch --depth=50 origin main
git checkout -b "$BRANCH_NAME" origin/main

# Add placeholder spec file
mkdir -p specs/ActiveMirror/Archive
cat > specs/ActiveMirror/Archive/Active_Mirror_Product_Spec_v2.0_Placeholder.md <<'MD'
---
title: "Active Mirror™ — Product Specification v2.0 (Placeholder)"
vault_id: AMOS://ActiveMirror/ProductSpec/v2.0/Placeholder
glyphsig: ⟡⟦ACTIVE-MIRROR⟧ · ⟡⟦PLACEHOLDER⟧ · ⟡⟦TRI-TWIN⟧
author: Paul Desai (Active MirrorOS)
date: 2025-11-09
status: Canonical · Archive Placeholder
predecessor: Master_Citation_v15.1.1
successor: Active_Mirror_Product_Spec_v2.0 (Full)
tags: [MirrorDNA™, ActiveMirror™, Archive]
---

# Active Mirror™ — Product Specification v2.0 (Placeholder)

This is a placeholder to preserve lineage integrity for public-safe distribution.
MD

# Add lineage guard workflow
mkdir -p .github/workflows
cat > .github/workflows/lineage-guard.yml <<'YML'
name: lineage-guard
on: [push, pull_request]
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Verify front matter
        run: |
          REQUIRED=(title vault_id predecessor)
          FAIL=0
          while IFS= read -r -d '' f; do
            for k in "${REQUIRED[@]}"; do
              if ! grep -q "^${k}:" "$f"; then
                echo "::error file=$f::Missing $k"
                FAIL=1
              fi
            done
          done < <(find specs -type f -name "*.md" -print0)
          exit $FAIL
YML

# Commit changes
git add -A
git commit -m "chore(autosync): add placeholder + lineage guard"

if [[ -n "$GITHUB_TOKEN" ]]; then
  git push -u origin "$BRANCH_NAME"
  echo "PR will be created automatically."
else
  cd "$WORKDIR"
  zip -qr autosync_bundle.zip repo
  echo "Bundle ready at: $WORKDIR/autosync_bundle.zip"
fi

echo "Done."
