from mcp.server.fastmcp import FastMCP
import json
import os
import logging

# ⟡ Mirror MCP Server (v0.3 - FastMCP)
# Protocol: Model Context Protocol (Official SDK)

# Initialize FastMCP Server
mcp = FastMCP("Mirror Identity")

def load_kernel():
    # Resolve path relative to this script
    base_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(base_dir)
    
    # Logic to find kernel
    kernel_path = os.path.join(project_root, "ami_kernel.json")
    if not os.path.exists(kernel_path):
        files = [f for f in os.listdir(project_root) if f.startswith('ami_') and f.endswith('.json')]
        if files:
            kernel_path = os.path.join(project_root, files[0])
            
    if os.path.exists(kernel_path):
        with open(kernel_path, 'r') as f:
            return json.load(f)
    return {"error": "No Kernel Found", "identity": {"handle": "UNKNOWN"}}

@mcp.tool()
def get_identity_kernel() -> str:
    """
    Retrieve the Sovereign Identity Kernel for the current user.
    Returns the full JSON object containing Identity, Glyphs, and SCD State.
    """
    kernel = load_kernel()
    return json.dumps(kernel, indent=2)

@mcp.tool()
def get_memory_chain() -> str:
    """
    Retrieve the SCD History Chain (Memory).
    Returns the list of all state changes and observations.
    """
    kernel = load_kernel()
    return json.dumps(kernel.get("scd_state", {}).get("history_chain", []), indent=2)

if __name__ == "__main__":
    mcp.run()
