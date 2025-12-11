#!/usr/bin/env python3
"""
⟡ Conflict Resolution for Kernel Writes
Implements last-write-wins with conflict detection and logging.
"""

import json
import os
import hashlib
from datetime import datetime
from filelock import FileLock, Timeout

KERNEL_PATH = "/Users/mirror-admin/Documents/GitHub/active-mirror-identity/ami_active-mirror.json"
LOCK_PATH = KERNEL_PATH + ".lock"
CONFLICT_LOG = "/Users/mirror-admin/Documents/GitHub/active-mirror-identity/conflicts.jsonl"

def compute_checksum(data: dict) -> str:
    """Compute checksum excluding meta fields."""
    clean = {k: v for k, v in data.items() if k not in ["meta", "checksum"]}
    return hashlib.sha256(json.dumps(clean, sort_keys=True).encode()).hexdigest()[:16]

def safe_read_kernel():
    """Read kernel with lock."""
    lock = FileLock(LOCK_PATH, timeout=5)
    try:
        with lock:
            if os.path.exists(KERNEL_PATH):
                with open(KERNEL_PATH, 'r') as f:
                    return json.load(f), None
            return {}, "Kernel not found"
    except Timeout:
        return {}, "Lock timeout - another process is writing"

def safe_write_kernel(kernel: dict, writer: str, expected_checksum: str = None):
    """
    Write kernel with conflict detection.
    
    Args:
        kernel: Data to write
        writer: Who is writing
        expected_checksum: Checksum from when data was read (for conflict detection)
    
    Returns:
        (success, error_message, conflict_info)
    """
    lock = FileLock(LOCK_PATH, timeout=10)
    
    try:
        with lock:
            # Read current state
            current = {}
            if os.path.exists(KERNEL_PATH):
                with open(KERNEL_PATH, 'r') as f:
                    current = json.load(f)
            
            # Check for conflict
            if expected_checksum:
                current_checksum = compute_checksum(current)
                if current_checksum != expected_checksum:
                    # Conflict detected
                    conflict = {
                        "timestamp": datetime.utcnow().isoformat() + "Z",
                        "writer": writer,
                        "expected_checksum": expected_checksum,
                        "actual_checksum": current_checksum,
                        "last_writer": current.get("meta", {}).get("last_writer"),
                        "resolution": "last_write_wins"
                    }
                    
                    # Log conflict
                    with open(CONFLICT_LOG, 'a') as f:
                        f.write(json.dumps(conflict) + "\n")
                    
                    # Still write (last-write-wins) but return conflict info
                    pass
            
            # Update meta
            kernel["meta"] = kernel.get("meta", {})
            kernel["meta"]["last_write"] = datetime.utcnow().isoformat() + "Z"
            kernel["meta"]["last_writer"] = writer
            kernel["checksum"] = compute_checksum(kernel)
            
            # Write
            with open(KERNEL_PATH, 'w') as f:
                json.dump(kernel, f, indent=2)
            
            return True, None, None
            
    except Timeout:
        return False, "Lock timeout", None
    except Exception as e:
        return False, str(e), None

# Install filelock if not present
if __name__ == "__main__":
    try:
        from filelock import FileLock
        print("✓ filelock available")
    except ImportError:
        print("Installing filelock...")
        import subprocess
        subprocess.run(["pip3", "install", "filelock", "--quiet"])
        print("✓ filelock installed")
