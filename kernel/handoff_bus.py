"""
Handoff Bus v1.0
Seamless Message Queue for Multi-Agent Handoffs.
Protocol: FIFO JSON Queue.
"""

import json
import time
import logging
from pathlib import Path
from typing import Dict, List, Optional

logger = logging.getLogger("ami.kernel.handoff_bus")

class HandoffBus:
    def __init__(self, ami_root: Path):
        self.bus_file = ami_root / "metadata" / "handoff_queue.json"
        self._init_bus()

    def _init_bus(self):
        if not self.bus_file.exists():
            self._save_queue([])

    def _load_queue(self) -> List[Dict]:
        try:
            with open(self.bus_file, 'r') as f:
                return json.load(f)
        except Exception:
            return []

    def _save_queue(self, queue: List[Dict]):
        with open(self.bus_file, 'w') as f:
            json.dump(queue, f, indent=2)

    def publish(self, topic: str, message: str, source: str) -> str:
        """
        Publish a message to the bus.
        """
        queue = self._load_queue()
        
        event = {
            "id": f"evt_{int(time.time()*1000)}",
            "timestamp": time.time(),
            "topic": topic,
            "source": source,
            "message": message,
            "status": "PENDING"
        }
        
        queue.append(event)
        self._save_queue(queue)
        return event["id"]

    def consume(self, topic_filter: Optional[str] = None) -> List[Dict]:
        """
        Consume (read & remove) pending messages.
        """
        queue = self._load_queue()
        active = []
        remaining = []
        
        for event in queue:
            if event["status"] == "PENDING":
                if topic_filter is None or event["topic"] == topic_filter:
                    event["status"] = "CONSUMED"
                    active.append(event)
                    # We don't keep consumed events in the main queue to keep it light?
                    # Or we mark them. Let's archive them later. For now, remove.
                    continue
            remaining.append(event)
            
        self._save_queue(remaining)
        return active

    def peek(self) -> List[Dict]:
        """View pending messages without consuming."""
        return [e for e in self._load_queue() if e["status"] == "PENDING"]
