"""
Continuity Firewall v1.0
Guard layer for AMI Identity Kernel.
"""

import logging
from typing import Dict, Any, Optional, Tuple
from identity_kernel.scd_transformer import SCDTransformer

logger = logging.getLogger("ami.identity_kernel.firewall")

class ContinuityFirewall:
    def __init__(self, transformer: SCDTransformer):
        self.transformer = transformer

    def validate_proposal(self, deltas: Dict[str, Any], source: str = "unknown") -> Tuple[bool, str]:
        """
        Validate a proposed state update before applying it.
        Strict source checking enabled.
        """
        # 0. Source Check
        ALLOWED_SOURCES = ["scd_guard", "synapse", "handoff_bus", "fingerprint", "internal_test", "CLI"]
        if source not in ALLOWED_SOURCES:
            logger.warning(f"Firewall blocked unauthorized source: {source}")
            return False, f"Unauthorized Source: {source}"

        # 1. Simulate the transition
        current_state = self.transformer.current_state
        
        try:
            # Policy checks
            # Allow "scd_guard" to override protected fields if it logic permits (it has its own checks)
            if source != "scd_guard" and not self._check_protected_fields(deltas):
                return False, "Attempted to modify protected identity fields without Sovereign Guard."

            return True, "Proposal accepted."
            
        except Exception as e:
            return False, f"Validation error: {e}"

    def _check_protected_fields(self, deltas: Dict[str, Any]) -> bool:
        """
        Prevent accidental drift of core identity anchors.
        """
        protected_prefixes = ["identity.human.name", "identity.human.birthday", "identity.fingerprint", "lineage"]
        
        for key in deltas.keys():
            for prefix in protected_prefixes:
                if key.startswith(prefix):
                    logger.warning(f"Firewall blocked modification of protected field: {key}")
                    return False
        return True

    def commit(self, deltas: Dict[str, Any], source: str = "unknown") -> Dict[str, Any]:
        """
        Execute the update if valid.
        """
        valid, reason = self.validate_proposal(deltas, source)
        if not valid:
            raise PermissionError(f"Continuity Firewall Rejection: {reason}")
            
        return self.transformer.supersede(deltas)
