import os
from datetime import datetime
from typing import Dict, Any
from .base import AMIKernelModule

class VaultSyncModule(AMIKernelModule):
    """
    Module 5: Vault Sync Engine
    Integrates the Identity Kernel with the Obsidian Vault.
    Assumes standard MirrorDNA Vault structure.
    """
    
    def __init__(self, kernel_path: str = None, vault_path: str = None):
        super().__init__(kernel_path)
        self.VAULT_ROOT = vault_path or self._resolve_vault_root()

    def _resolve_vault_root(self) -> str:
        """Resolve the canonical vault path across older and newer layouts."""
        candidates = [
            os.environ.get("MIRRORDNA_VAULT"),
            "~/MirrorDNA-Vault",
            "~/Documents/MirrorDNA-Vault",
            "~/Documents/Obsidian/MirrorDNA-Vault",
        ]

        for candidate in candidates:
            if not candidate:
                continue
            expanded = os.path.expanduser(candidate)
            if os.path.exists(expanded):
                return expanded

        # Preserve the modern preferred location even when the vault is offline.
        return os.path.expanduser("~/MirrorDNA-Vault")

    def sync_vault(self, event_type: str, content: str) -> Dict[str, Any]:
        """
        Log an event to the Vault.
        """
        if not os.path.exists(self.VAULT_ROOT):
            return {"error": f"Vault not found at {self.VAULT_ROOT}"}
            
        timestamp = datetime.now().strftime("%Y-%m-%d")
        log_dir = os.path.join(self.VAULT_ROOT, "MirrorFlow", "Logs")
        os.makedirs(log_dir, exist_ok=True)
        
        filename = f"{timestamp}_Kernel_Sync.md"
        filepath = os.path.join(log_dir, filename)
        
        mode = 'a' if os.path.exists(filepath) else 'w'
        
        entry = f"""
## [{datetime.now().strftime('%H:%M:%S')}] {event_type}
{content}
---
"""
        try:
            with open(filepath, mode) as f:
                f.write(entry)
            return {"success": True, "file": filepath}
        except Exception as e:
            return {"error": str(e)}
