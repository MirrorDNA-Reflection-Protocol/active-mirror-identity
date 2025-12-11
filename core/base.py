import json
import os
import hashlib
from datetime import datetime
from typing import Dict, Any, Optional

class AMIKernelModule:
    """
    Base class for all AMI v1.0 Identity Modules.
    Ensures 'Kernel-First' architecture by standardizing I/O.
    """
    
    def __init__(self, kernel_path: Optional[str] = None):
        if kernel_path:
            self.KERNEL_PATH = kernel_path
        else:
            # Auto-resolve relative to this file
            base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            self.KERNEL_PATH = os.path.join(base_dir, "ami_active-mirror.json")
            if not os.path.exists(self.KERNEL_PATH):
                # Fallback to looking for any json kernel
                files = [f for f in os.listdir(base_dir) if f.startswith('ami_') and f.endswith('.json')]
                if files:
                    self.KERNEL_PATH = os.path.join(base_dir, files[0])

    def load_kernel(self) -> Dict[str, Any]:
        """Load the kernel with error handling."""
        if os.path.exists(self.KERNEL_PATH):
            try:
                with open(self.KERNEL_PATH, 'r') as f:
                    return json.load(f)
            except json.JSONDecodeError:
                return {"error": "Corrupt Kernel JSON"}
        return {"error": "Kernel Not Found"}

    def save_kernel(self, kernel: Dict[str, Any], writer: str) -> bool:
        """Save the kernel with checksum and metadata."""
        # Update metadata
        kernel["meta"] = kernel.get("meta", {})
        kernel["meta"]["last_write"] = datetime.utcnow().isoformat() + "Z"
        kernel["meta"]["last_writer"] = writer
        
        # Compute Checksum
        checksum = self._compute_checksum(kernel)
        kernel["checksum"] = checksum
        
        try:
            with open(self.KERNEL_PATH, 'w') as f:
                json.dump(kernel, f, indent=2)
            return True
        except Exception as e:
            print(f"Error saving kernel: {e}")
            return False

    def _compute_checksum(self, data: Dict[str, Any]) -> str:
        """Compute SHA256 of kernel data (excluding checksum field)."""
        data_copy = {k: v for k, v in data.items() if k != "checksum" and k != "_checksum_warning"}
        canonical = json.dumps(data_copy, sort_keys=True, separators=(',', ':'))
        return hashlib.sha256(canonical.encode()).hexdigest()[:16]

    def get_architecture_spine_info(self) -> Dict[str, str]:
        """
        Returns static metadata about the Active MirrorOS Architecture Spine
        as seen from the AMI Kernel.
        """
        return ARCHITECTURE_SPINE

    def log(self, message: str):
        """Standardized logging."""
        print(f"[AMI:{self.__class__.__name__}] {message}")

# --- Architecture Spine v1.0 Binding ---
ARCHITECTURE_SPINE = {
    "version": "v1.0",
    "identity_layer": "L1",
    "identity_layer_name": "Identity Kernel",
    "vault_path": "ActiveMirrorOS/00_CORE/Architecture_Spine_v1.0.md"
}
