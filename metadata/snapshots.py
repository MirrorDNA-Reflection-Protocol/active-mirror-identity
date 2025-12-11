"""
Meta-State Snapshots v1.0
Manages point-in-time recovery checkpoints.
"""

import json
import logging
from pathlib import Path
from typing import Dict, List, Any
from identity_kernel.scd_transformer import SCDTransformer

logger = logging.getLogger("ami.metadata.snapshots")

class SnapshotManager:
    def __init__(self, transformer: SCDTransformer, snapshot_dir: Path):
        self.transformer = transformer
        self.snapshot_dir = snapshot_dir
        self.snapshot_dir.mkdir(parents=True, exist_ok=True)

    def create_snapshot(self, label: str) -> str:
        """
        Capture current state as a snapshot.
        """
        state = self.transformer.current_state
        checksum = state.get("checksum", "UNKNOWN")
        turn = state.get("turn", 0)
        
        filename = f"snapshot_T{turn}_{label}_{checksum[:8]}.json"
        path = self.snapshot_dir / filename
        
        snapshot_data = {
            "meta": {
                "label": label,
                "created_at_turn": turn,
                "checksum": checksum
            },
            "state_dump": state
        }
        
        with open(path, 'w') as f:
            json.dump(snapshot_data, f, indent=2)
            
        return str(path)

    def list_snapshots(self) -> List[str]:
        return [str(p.name) for p in self.snapshot_dir.glob("*.json")]

    def restore_snapshot(self, filename: str) -> bool:
        """
        Restore state from a snapshot.
        This is a 'Hard Reset' - breaks lineage unless handled carefully.
        """
        path = self.snapshot_dir / filename
        if not path.exists():
            return False
            
        try:
            with open(path, 'r') as f:
                data = json.load(f)
                
            restored_state = data.get("state_dump", {})
            
            # FORCE RESTORE
            self.transformer.current_state = restored_state
            self.transformer.save_state()
            return True
            
        except Exception as e:
            logger.error(f"Restore failed: {e}")
            return False
