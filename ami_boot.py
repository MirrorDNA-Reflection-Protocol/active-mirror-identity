"""
AMI Bootloader v1.0
Master Sequencer for Active Mirror Identity.
"""

import sys
import time
import subprocess
from pathlib import Path

# Setup Path
AMI_ROOT = Path(__file__).parent
sys.path.append(str(AMI_ROOT))

# Imports
from fingerprint.fingerprint import Fingerprint
from metadata.heartbeat import HeartbeatMonitor
from identity_kernel.scd_transformer import SCDTransformer

def boot():
    print("⟡ AMI Kernel Boot Sequence Initiated...")
    time.sleep(0.5)

    # 1. Environment Check
    print(f"   [ENV] Root: {AMI_ROOT}")
    venv_python = AMI_ROOT / "venv" / "bin" / "python3"
    if not venv_python.exists():
        print("   [ERR] Venv not found! Run setup first.")
        sys.exit(1)
    print("   [ENV] Venv Active.")

    # 2. Fingerprint Load
    print("   [ID]  Loading Fingerprint...")
    fp = Fingerprint(AMI_ROOT)
    identity_card = fp.generate()
    print(f"   [ID]  Host: {identity_card['host']}")
    print(f"   [ID]  Vault: {identity_card['vault_id'][:8]}...")
    print(f"   [ID]  Kernel Hash: {identity_card['kernel_hash'][:8]}...")
    print(f"   [ID]  Signature: {identity_card['signature']}")

    # 3. Vault Mount Check
    vault_path = AMI_ROOT / "vault"
    if vault_path.exists():
        print("   [VLT] Vault Mounted (Live Symlink).")
    else:
        print("   [ERR] Vault NOT Mounted!")
        sys.exit(1)

    # 4. Kernel Integrity
    transformer = SCDTransformer(AMI_ROOT / "identity_kernel" / "scd_state.json")
    if transformer.verify_integrity(transformer.current_state):
         print("   [KER] Integrity Verified (ASHA-256).")
    else:
         print("   [ERR] Kernel Integrity Failed!")
         sys.exit(1)

    # 5. Synapse Check (Process)
    # Check if a python process running synapse.py exists
    try:
        # Simple grep check
        res = subprocess.check_output("ps aux | grep synapse.py | grep -v grep", shell=True)
        print("   [SYN] Synapse Daemon Active.")
    except subprocess.CalledProcessError:
        print("   [WRN] Synapse Daemon NOT Detected. (Run AMI_Services_Start.command)")

    # 6. Handoff Bus Check
    bus_file = AMI_ROOT / "metadata" / "handoff_queue.json"
    if bus_file.exists():
         print("   [BUS] Handoff Bus Online.")
    else:
         print("   [BUS] Initializing Bus...")
         with open(bus_file, 'w') as f:
             f.write("[]")

    print("\n⟡ System Ready. Welcome, Sovereign.")

if __name__ == "__main__":
    boot()
