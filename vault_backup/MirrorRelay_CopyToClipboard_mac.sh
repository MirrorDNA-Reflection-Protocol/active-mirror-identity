#!/usr/bin/env bash
set -euo pipefail
PREAMBLE="./00_Canonical/MirrorRelay_Preamble_v1.md"
cat "$PREAMBLE" | pbcopy
echo "[Relay] Copied preamble to macOS clipboard."
