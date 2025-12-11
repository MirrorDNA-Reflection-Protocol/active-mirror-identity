"""
AMI Heartbeat System
Monitors integrity of the Identity Kernel.
"""

import time
import json
import logging
from pathlib import Path
from typing import Dict, Any, List
from identity_kernel.scd_transformer import SCDTransformer

logger = logging.getLogger("ami.metadata.heartbeat")

class HeartbeatMonitor:
    def __init__(self, transformer: SCDTransformer, log_path: Path):
        self.transformer = transformer
        self.log_path = log_path

    def pulse(self) -> Dict[str, Any]:
        """
        Run a single heartbeat check.
        """
        status = {
            "timestamp": time.time(),
            "status": "HEALTHY",
            "checks": {}
        }

        # Check 1: SCD Integrity
        try:
            is_valid = self.transformer.verify_integrity(self.transformer.current_state)
            status["checks"]["scd_integrity"] = "PASS" if is_valid else "FAIL"
            if not is_valid:
                status["status"] = "DEGRADED"
        except Exception as e:
            status["checks"]["scd_integrity"] = f"ERROR: {e}"
            status["status"] = "ERROR"

        # Check 2: Vault (Mock for now, would check mount point)
        status["checks"]["vault_mounted"] = True

        # Check 3: Synapse Activity
        status["recent_events"] = self._get_recent_synapse_events()

        self._log_pulse(status)
        return status

    def _get_recent_synapse_events(self, limit: int = 5) -> list:
        """Read the last N events from the synapse log."""
        synapse_log = self.log_path.parent / "synapse.log"
        if not synapse_log.exists():
            return []
        
        events = []
        try:
            with open(synapse_log, 'r') as f:
                lines = f.readlines()
                for line in reversed(lines[-limit:]):
                    try:
                        events.append(json.loads(line))
                    except json.JSONDecodeError:
                        continue
        except Exception:
            pass
        return events

    def _log_pulse(self, status: Dict[str, Any]):
        try:
            with open(self.log_path, 'a') as f:
                f.write(json.dumps(status) + "\n")
        except Exception as e:
            logger.error(f"Failed to write heartbeat: {e}")
