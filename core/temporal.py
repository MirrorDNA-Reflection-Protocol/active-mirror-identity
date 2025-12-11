from datetime import datetime
from typing import Dict, Any, List
from .base import AMIKernelModule

class TemporalSelfModule(AMIKernelModule):
    """
    Module 1: Temporal Self
    Tracks identity evolution over time (v1.0 -> v1.1).
    Stores deltas and snapshots.
    """
    
    def get_temporal_profile(self) -> Dict[str, Any]:
        """Return the current temporal state (version, age, evolution)."""
        kernel = self.load_kernel()
        if "error" in kernel: return kernel
        
        identity = kernel.get("identity", {})
        scd = kernel.get("scd_state", {})
        
        # Calculate Age
        start_date = kernel.get("ai_journey", {}).get("started", "2025-01-01")
        try:
            days_alive = (datetime.utcnow() - datetime.fromisoformat(start_date)).days
        except ValueError:
            days_alive = 0
            
        return {
            "version": kernel.get("ami_version", "1.0"),
            "days_alive": days_alive,
            "total_turns": scd.get("last_turn", 0),
            "last_update": kernel.get("meta", {}).get("last_write"),
            "evolution_velocity": "stable"  # Placeholder logic
        }

    def log_delta(self, field: str, old_value: Any, new_value: Any, writer: str):
        """Record a significant identity change."""
        kernel = self.load_kernel()
        if "temporal_deltas" not in kernel.get("scd_state", {}):
             if "scd_state" not in kernel: kernel["scd_state"] = {}
             kernel["scd_state"]["temporal_deltas"] = []
             
        delta = {
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "writer": writer,
            "field": field,
            "change": f"{str(old_value)[:50]} -> {str(new_value)[:50]}"
        }
        kernel["scd_state"]["temporal_deltas"].append(delta)
        self.save_kernel(kernel, writer)
