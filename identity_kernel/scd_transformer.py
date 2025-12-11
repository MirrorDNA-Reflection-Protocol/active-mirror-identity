"""
SCD Transformer v3.1 for AMI Kernel
Provides deterministic state transitions, ASHA-256 checksumming, and lineage verification.
"""

import json
import hashlib
import logging
from pathlib import Path
from typing import Dict, Any, Optional

logger = logging.getLogger("ami.identity_kernel.scd")

class SCDTransformer:
    """
    Structured Contextual Distillation (SCD) Transformer.
    Enforces deterministic state evolution for the AMI Identity Kernel.
    
    Version: 3.1
    """
    
    def __init__(self, state_file: Optional[Path] = None):
        self.state_file = state_file
        self.current_state = self._load_state()

    def _load_state(self) -> Dict[str, Any]:
        """Load state from file or initialize genesis state."""
        if self.state_file and self.state_file.exists():
            try:
                with open(self.state_file, 'r') as f:
                    state = json.load(f)
                    if self.verify_integrity(state):
                        return state
                    else:
                        logger.error("State integrity check failed! Falling back to Genesis (DANGEROUS).")
            except Exception as e:
                logger.error(f"Failed to load state: {e}")
        
        return self._create_genesis_state()

    def _create_genesis_state(self) -> Dict[str, Any]:
        return {
            "version": "3.1.0",
            "turn": 0,
            "state": {},
            "checksum": "GENESIS",
            "parent_checksum": None,
            "lineage_depth": 0
        }

    def save_state(self) -> None:
        """Persist current state to file."""
        if not self.state_file:
            return
            
        try:
            self.state_file.parent.mkdir(parents=True, exist_ok=True)
            with open(self.state_file, 'w') as f:
                json.dump(self.current_state, f, indent=2)
        except Exception as e:
            logger.error(f"Failed to save state: {e}")

    def compute_checksum(self, inner_state: Dict[str, Any]) -> str:
        """
        Compute ASHA-256 checksum on inner state.
        ASHA = Alphabetically Sorted Hashing Algorithm.
        """
        # 1. Deterministic JSON serialization (sort_keys=True)
        canonical_json = json.dumps(inner_state, sort_keys=True).encode('utf-8')
        
        # 2. SHA-256 Hash
        sha256_hash = hashlib.sha256(canonical_json).hexdigest()
        
        return f"ASHA-256:{sha256_hash}"

    def supersede(self, deltas: Dict[str, Any]) -> Dict[str, Any]:
        """
        Atomically transition to the next state turn.
        
        Args:
            deltas: Dictionary of updates to apply to inner state. 
                    Value None means delete key.
        """
        # 1. Capture Lineage
        prev_checksum = self.current_state.get("checksum")
        prev_turn = self.current_state.get("turn", 0)
        
        # 2. Apply Deltas
        prev_inner_state = self.current_state.get("state", {})
        new_inner_state = prev_inner_state.copy()
        
        for key, value in deltas.items():
            if value is None:
                new_inner_state.pop(key, None)
            else:
                new_inner_state[key] = value

        # 3. Compute New Checksum
        new_checksum = self.compute_checksum(new_inner_state)
        
        # 4. Construct New Full State
        new_full_state = {
            "version": "3.1.0",
            "turn": prev_turn + 1,
            "state": new_inner_state,
            "checksum": new_checksum,
            "parent_checksum": prev_checksum,
            "lineage_depth": self.current_state.get("lineage_depth", 0) + 1
        }
        
        # 5. Commit
        self.current_state = new_full_state
        self.save_state()
        
        return new_full_state

    def verify_integrity(self, state: Dict[str, Any]) -> bool:
        """
        Verify the mathematical integrity of a state object.
        Checks if checksum matches the inner state.
        Does NOT check lineage (that requires history).
        """
        checksum = state.get("checksum")
        if checksum == "GENESIS":
            return True
            
        inner_state = state.get("state", {})
        computed = self.compute_checksum(inner_state)
        
        return computed == checksum

    def verify_lineage(self, current_state: Dict[str, Any], previous_state: Dict[str, Any]) -> bool:
        """
        Verify the chain of custody between two states.
        """
        # 1. Turn increment
        if current_state["turn"] != previous_state["turn"] + 1:
            return False
            
        # 2. Parent checksum linkage
        if current_state["parent_checksum"] != previous_state["checksum"]:
            return False
            
        return True

    def get_inner_state(self) -> Dict[str, Any]:
        return self.current_state.get("state", {}).copy()

    def get_metadata(self) -> Dict[str, Any]:
        return {
            "turn": self.current_state.get("turn"),
            "checksum": self.current_state.get("checksum"),
            "parent": self.current_state.get("parent_checksum")
        }
