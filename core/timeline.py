from datetime import datetime
from typing import Dict, Any, List
from .base import AMIKernelModule

class TimelineModule(AMIKernelModule):
    """
    Module 6: Timeline Engine
    Auto-logs breakthroughs, collapses, and major actions.
    """
    
    def add_timeline_event(self, category: str, description: str, writer: str) -> bool:
        """
        Add an event to the timeline in the kernel.
        """
        kernel = self.load_kernel()
        if "timeline" not in kernel:
            kernel["timeline"] = []
            
        event = {
            "id": f"evt_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}",
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "category": category, # e.g. "breakthrough", "collapse", "dip"
            "description": description,
            "writer": writer
        }
        
        kernel["timeline"].append(event)
        self.save_kernel(kernel, writer)
        return True

    def get_timeline(self, limit: int = 10) -> List[Dict[str, Any]]:
        """Return recent timeline events."""
        kernel = self.load_kernel()
        timeline = kernel.get("timeline", [])
        return sorted(timeline, key=lambda x: x["timestamp"], reverse=True)[:limit]
