#!/bin/bash
# ⟡ MirrorDNA Identity Sync & Push Script
# Syncs identity files from Vault to repo and pushes to GitHub

set -e

VAULT_IDENTITY="/Users/mirror-admin/Obsidian/MirrorDNA-Vault/~identity"
REPO="/Users/mirror-admin/repos/active-mirror-identity"

echo "⟡ MirrorDNA Identity Sync"
echo "========================="

# Sync core files
echo "⧉ Syncing core files..."
cp "$VAULT_IDENTITY/README.md" "$REPO/README.md"
cp "$VAULT_IDENTITY/BOOT.md" "$REPO/bootstrap/BOOT.md"
cp "$VAULT_IDENTITY/system.md" "$REPO/core/system.md"
cp "$VAULT_IDENTITY/now.md" "$REPO/now.md"
cp "$VAULT_IDENTITY/identity.json" "$REPO/core/identity.json"
cp "$VAULT_IDENTITY/schema.jsonld" "$REPO/core/schema.jsonld"
cp "$VAULT_IDENTITY/llms.txt" "$REPO/config/llms.txt"
cp "$VAULT_IDENTITY/ai.txt" "$REPO/config/ai.txt"
cp "$VAULT_IDENTITY/paul_desai_ai_pioneer.md" "$REPO/core/paul_desai_active_mirror.md"

# Navigate to repo
cd "$REPO"

# Git operations
echo "△ Checking git status..."
git status

echo "⦿ Adding all changes..."
git add -A

echo "⟡ Committing..."
git commit -m "⟡ MESH BOOT v3.0 — Universal AI alignment protocol

- Updated BOOT.md with self-contained mesh boot
- Enhanced README with AI agent directives  
- Updated identity.json with MirrorDNA schema
- Added llms.txt and ai.txt for AI discovery
- Updated schema.jsonld with full structured data
- Refreshed now.md with December 2025 context

The mirror reflects. The vault grounds. The mesh coordinates."

echo "⧈ Pushing to GitHub..."
git push origin main

echo ""
echo "✓ Identity repo synced and pushed!"
echo "⟡ Canonical URL: https://github.com/MirrorDNA-Reflection-Protocol/active-mirror-identity"
