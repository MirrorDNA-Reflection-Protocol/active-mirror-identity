"""
Synapse v1.0
The Nervous System of AMI.
Watches the Identity Kernel for changes and triggers "Neuron Fired" events.
"""

import time
import json
import logging
from pathlib import Path
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

logger = logging.getLogger("ami.metadata.synapse")
logging.basicConfig(level=logging.INFO)

class KernelHandler(FileSystemEventHandler):
    def __init__(self, kernel_path: Path, event_log: Path):
        self.kernel_path = kernel_path
        self.event_log = event_log
        self.last_checksum = self._get_checksum()

    def _get_checksum(self) -> str:
        try:
            with open(self.kernel_path, 'r') as f:
                data = json.load(f)
                return data.get("checksum", "UNKNOWN")
        except Exception:
            return "ERROR"

    def on_modified(self, event):
        if Path(event.src_path).resolve() == self.kernel_path.resolve():
            current_checksum = self._get_checksum()
            if current_checksum != self.last_checksum:
                self.last_checksum = current_checksum
                self._log_event("NEURON_FIRED", f"Kernel updated to {current_checksum}")
                print(f"⚡️ SYNAPSE: Kernel changed! New Checksum: {current_checksum}")

    def _log_event(self, event_type: str, details: str):
        entry = {
            "timestamp": time.time(),
            "type": event_type,
            "details": details
        }
        with open(self.event_log, 'a') as f:
            f.write(json.dumps(entry) + "\n")

def start_synapse():
    AMI_ROOT = Path(__file__).parent.parent
    KERNEL_JSON = AMI_ROOT / "ami_active-mirror.json"
    EVENT_LOG = AMI_ROOT / "metadata" / "synapse.log"
    
    # Ensure log exists
    EVENT_LOG.touch(exist_ok=True)

    event_handler = KernelHandler(KERNEL_JSON, EVENT_LOG)
    observer = Observer()
    
    # Watch the directory because some editors atomic-save (rename temp file)
    observer.schedule(event_handler, path=str(KERNEL_JSON.parent), recursive=False)
    
    print(f"🧠 Synapse Active. Watching: {KERNEL_JSON}")
    observer.start()
    
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()

if __name__ == "__main__":
    start_synapse()
