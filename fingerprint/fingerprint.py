"""
Fingerprint Module v1.0
Runtime Identity Card for AMI.
"""

import hashlib
import uuid
import platform
from pathlib import Path
from typing import Dict

class Fingerprint:
    def __init__(self, ami_root: Path):
        self.ami_root = ami_root
        self.vault_path = ami_root / "vault"
        self.glyph = "⟡"
    
    def generate(self) -> Dict[str, str]:
        """
        Generate the runtime fingerprint.
        """
        # 1. Host ID
        host_id = platform.node()
        
        # 2. Vault ID (Mock or Read)
        vault_id = self._get_vault_id()
        
        # 3. Kernel Hash
        kernel_hash = self._get_kernel_hash()
        
        return {
            "glyph": self.glyph,
            "host": host_id,
            "vault_id": vault_id,
            "kernel_hash": kernel_hash,
            "signature": self._sign(host_id, vault_id, kernel_hash)
        }

    def _get_vault_id(self) -> str:
        # Ideally read a hidden file in vault. For now, deterministic hash of path.
        return hashlib.md5(str(self.vault_path.resolve()).encode()).hexdigest()

    def _get_kernel_hash(self) -> str:
        # Read scd_state.json checksum
        try:
            with open(self.ami_root / "identity_kernel" / "scd_state.json", 'r') as f:
                import json
                data = json.load(f)
                return data.get("checksum", "UNKNOWN")
        except:
            return "UNKNOWN"

    def _sign(self, h, v, k) -> str:
        payload = f"{self.glyph}:{h}:{v}:{k}"
        return hashlib.sha256(payload.encode()).hexdigest()[:16]
