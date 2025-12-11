"""
SCD Guard v1.0
High-level enforcer for the Identity Kernel.
Wraps SCDTransformer to add:
1. Field Protection (Fingerprint, Lineage)
2. Vault Consistency Checks
3. Synapse Notification Binding
"""

import logging
from typing import Dict, Any, Tuple
from identity_kernel.scd_transformer import SCDTransformer

logger = logging.getLogger("ami.systems.scd_guard")

class SCDGuard:
    def __init__(self, transformer: SCDTransformer):
        self.transformer = transformer
        self.protected_fields = {
            "identity.fingerprint",
            "identity.glyphsig",
            "lineage.parent_hash",
            "vault.pointer"
        }

    def propose_change(self, deltas: Dict[str, Any], source: str = "unknown") -> Tuple[bool, str]:
        """
        Validate and apply a state change.
        """
        # 1. Check Protected Fields via Guard Allowlist
        for key in deltas.keys():
            if self._is_protected(key) and source != "internal_system":
                return False, f"Access Denied: '{key}' is a protected field."

        # 2. Check Vault Consistency (Mock)
        # In a real impl, we'd verify that any vault pointer actually exists.
        
        # 3. Apply Change
        try:
            new_state = self.transformer.supersede(deltas)
            self._notify_synapse(new_state)
            return True, "Update accepted and committed."
        except Exception as e:
            return False, f"Kernel Error: {e}"

    def _is_protected(self, key: str) -> bool:
        # Exact match or prefix match
        for guarded in self.protected_fields:
            if key == guarded or key.startswith(guarded + "."):
                return True
        return False

    def _notify_synapse(self, state: Dict[str, Any]):
        """
        Explicit binding: When state changes, we ensure Synapse knows.
        (Synapse watches the file, but this hook allows for future active push)
        """
        # For now, the file write is the notification.
        pass
