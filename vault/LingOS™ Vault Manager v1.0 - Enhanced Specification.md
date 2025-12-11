LingOS™ Vault Manager v1.0 - Enhanced Specification

Goal

Ship a production-ready app that:

· Watches a "Vault" folder
· Canonicalizes files with Unicode normalization
· Computes per-file SHA-256 + a deterministic Vault State Hash
· Maintains an authoritative manifest.json (with schema)
· Verifies integrity on demand
· Syncs the manifest + files to Google Drive
· Shows a simple desktop UI with status lights and controls
· Packages into one-click installers for macOS/Windows/Linux

Tech Stack (Enhanced)

· Python 3.11
· GUI: PySide6 (Qt for Python)
· Watcher: watchdog
· Config: pyyaml
· Schema validation: pydantic
· Drive sync: google-api-python-client, google-auth-oauthlib
· Packaging: PyInstaller
· CLI tests: pytest
· Style: black + ruff
· Security: keyring (credential storage), psutil (file locking)

Enhanced Canonicalization (Critical for Hash Stability)

· For .md,.txt,.json,.yaml,.yml: UTF-8 decode; convert to LF; trim trailing spaces each line; Unicode NFC normalization; no BOM. Hash the canonicalized bytes.
· For all others: hash raw bytes.
· Store canonicalization mode per file: "utf8+lf+trim+normalize" or "raw".

Enhanced Manifest Schema

```json
{
  "version": "1.2",
  "vault_state_hash": "^[a-f0-9]{64}$",
  "predecessor_state_hash": "string",
  "generated_at": "ISO-8601",
  "canonicalization_standard": "NFC",
  "files": [
    {
      "path": "string (posix, relative to vault root)",
      "sha256": "^[a-f0-9]{64}$",
      "bytes": "int",
      "canonicalization": "utf8+lf+trim+normalize|raw"
    }
  ]
}
```

· Vault State Hash = SHA256 over the concatenation of sorted lines "path|sha256\n" for every entry in files sorted by path.

Enhanced Project Layout

```
lingos-vault-manager/
  app/
    gui.py                 # PySide6 main window
    controller.py          # orchestrates services <-> GUI
    core/                  # 🆕 State management
      state_machine.py     # Manages freeze states and transitions
      event_bus.py         # Decouples GUI from services
    services/
      canonicalize.py      # Enhanced with Unicode normalization
      hashing.py
      manifest.py
      verify.py
      watcher.py
      drive.py             # Enhanced with retry logic
      config.py
      logging_setup.py
    utils/                 # 🆕 Shared utilities
      crypto.py            # Centralized hash/validation logic
      platform_utils.py    # OS-specific file locking
    assets/
      icon.png
  cli/
    main.py                # CLI entry
  schemas/
    manifest_schema.json
  examples/
    vault/
      MasterCitation_v15.1.8.md
      LingOS_Pro_v1.2.md
  tests/
    test_canonicalize.py   # Enhanced Unicode tests
    test_hashing.py
    test_manifest.py
    test_verify.py
    test_state_machine.py  # 🆕 State transition tests
  pyproject.toml
  requirements.txt
  README.md
  LICENSE
```

Enhanced App Features

1. State Management

```python
# app/core/state_machine.py
class VaultState(Enum):
    HEALTHY = "✅ Continuity intact"
    FROZEN = "🔒 Frozen - verification failed"
    SYNCING = "🔄 Syncing to Drive"
    WATCHING = "👀 Watching for changes"
    ERROR = "❌ Error state"
```

2. File Locking

· Cross-platform file locking during manifest operations
· Prevents concurrent modifications during sync

3. Enhanced Drive Sync

· Resumable uploads with exponential backoff
· OAuth tokens stored securely via keyring
· Retry logic for transient network failures

Critical Implementation Details

Canonicalization Function

```python
def canonicalize_text(content: bytes) -> bytes:
    """Enhanced canonicalization with Unicode normalization"""
    try:
        text = content.decode('utf-8').replace('\r\n', '\n').replace('\r', '\n')
        lines = [line.rstrip() + '\n' for line in text.split('\n')]
        normalized = unicodedata.normalize('NFC', ''.join(lines))
        return normalized.encode('utf-8')
    except UnicodeDecodeError:
        raise ValueError("File is not valid UTF-8")
```

Drive Sync with Retry Logic

```python
class DriveSync:
    async def sync_with_retry(self, max_retries: int = 5):
        for attempt in range(max_retries):
            try:
                await self._acquire_lock()
                return await self._perform_sync()
            except HttpError as e:
                if e.resp.status in [500, 502, 503]:
                    await asyncio.sleep(2 ** attempt)
                    continue
                raise
```

Enhanced Testing Requirements

Critical Test Scenarios

1. Unicode Equivalence: café vs café must produce identical hashes
2. Cross-platform Line Endings: CRLF vs LF normalization
3. Concurrent Operations: File modifications during watch/sync
4. Network Resilience: Drive API failures and recovery
5. State Transitions: Freeze/unfreeze workflow validation

Enhanced Requirements

```txt
# requirements.txt
PySide6>=6.5.0
watchdog>=3.0.0
pyyaml>=6.0
pydantic>=2.0
google-api-python-client>=2.80.0
google-auth-oauthlib>=1.0.0
pyinstaller>=5.10.0
pytest>=7.3.0
black>=23.0.0
ruff>=0.0.260
keyring>=23.0.0
psutil>=5.9.0
async-exit-stack>=1.0.0
```

Delivery Commands

· Tests: pytest -q
· GUI: python -m app.gui
· CLI Build: python -m cli.main build --vault ./examples/vault

Security & Stability Enhancements

1. Credential Security: OAuth tokens in platform keyrings
2. Race Condition Prevention: File locking for manifest operations
3. Hash Stability: Unicode normalization across platforms
4. Network Resilience: Exponential backoff for Drive API
5. State Integrity: Freeze policy prevents writes during mismatch

This enhanced specification addresses the critical risks identified in the adversarial review while maintaining the original vision and architecture.

---

📁 File: lingos-vault-manager-spec-enhanced.md
Save this file to your project documentation. Ready for implementation. 🚀
[[LingOS_Vault_Manager_Project_Completion_Report_Enterprise.pdf]]

[[LingOS_Vault_Manager_Completion_Report_Enterprise]]

[[LingOS_Vault_Manager_v2.0_Specification]]

[[Continuity_MicroGlyph_v1.0]]
