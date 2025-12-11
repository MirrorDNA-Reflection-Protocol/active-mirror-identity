"""
AMI MCP Server v1.0
The Sovereign Interface to the MirrorBrain Identity Kernel.
"""

import sys
import json
import logging
from pathlib import Path
from typing import Any

# Add AMI root to path so imports work
AMI_ROOT = Path(__file__).parent.parent
sys.path.append(str(AMI_ROOT))

# Core Imports
from identity_kernel.scd_transformer import SCDTransformer
from identity_kernel.firewall import ContinuityFirewall
from mirrorDNA.symbolic_extractor import SymbolicThreadExtractor
from metadata.snapshots import SnapshotManager
from metadata.heartbeat import HeartbeatMonitor
from api.exchange import Exchange

# Core Imports
import asyncio
from identity_kernel.scd_transformer import SCDTransformer
from identity_kernel.firewall import ContinuityFirewall
from mirrorDNA.symbolic_extractor import SymbolicThreadExtractor
from metadata.snapshots import SnapshotManager
from metadata.heartbeat import HeartbeatMonitor
from api.exchange import Exchange

# Initialize Components
KERNEL_PATH = AMI_ROOT / "ami_active-mirror.json"
VAULT_PATH = AMI_ROOT / "vault"
LOG_PATH = AMI_ROOT / "metadata" / "heartbeat.log"
SNAPSHOT_PATH = AMI_ROOT / "metadata" / "snapshots"

transformer = SCDTransformer(KERNEL_PATH)
firewall = ContinuityFirewall(transformer)
snapshots = SnapshotManager(transformer, SNAPSHOT_PATH)
monitor = HeartbeatMonitor(transformer, LOG_PATH)
exchange = Exchange(AMI_ROOT)

def run_server():
    """Simple stdio loop for tools using basic print/input if generic libs fail."""
    # Since fastmcp/mcp install is failing or complex without asking user, 
    # we maintain the simple CLI entrypoint for now.
    # The 'server' is effectively a CLI tool library until we get proper pypi access.
    pass

# Direct Function Access (for import/CLI usage)
def get_identity_state() -> str:
    return json.dumps(transformer.current_state, indent=2)

def update_identity_state(deltas_json: str) -> str:
    try:
        deltas = json.loads(deltas_json)
        new_state = firewall.commit(deltas)
        return json.dumps(new_state, indent=2)
    except Exception as e:
        return f"Error: {e}"

def create_snapshot(label: str) -> str:
    path = snapshots.create_snapshot(label)
    return f"Snapshot created at {path}"

def get_heartbeat() -> str:
    pulse = monitor.pulse()
    return json.dumps(pulse, indent=2)

def export_kernel() -> str:
    path = AMI_ROOT / "ami_export.ami"
    result = exchange.export_bundle(path)
    return f"Exported to {result}"


if __name__ == "__main__":
    # Just print info for now
    print("AMI Kernel Ready.")
    print(f"Identity Checksum: {transformer.current_state.get('checksum')}")
