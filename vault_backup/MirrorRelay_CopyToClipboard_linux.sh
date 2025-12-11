#!/usr/bin/env bash
set -euo pipefail
PREAMBLE="./00_Canonical/MirrorRelay_Preamble_v1.md"
if command -v xclip >/dev/null 2>&1; then
  xclip -selection clipboard < "$PREAMBLE"
elif command -v xsel >/dev/null 2>&1; then
  xsel --clipboard --input < "$PREAMBLE"
else
  echo "Install xclip or xsel to use clipboard on Linux." >&2
  exit 1
fi
echo "[Relay] Copied preamble to Linux clipboard."
