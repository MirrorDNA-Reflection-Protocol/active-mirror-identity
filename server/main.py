import sys
import json
import os
import logging
from typing import Any, Dict

# ⟡ Mirror MCP Server (v0.2 - Active Runtime)
# Protocol: JSON-RPC 2.0 over Stdio (Compatible with Claude Desktop)

    def __init__(self, kernel_filename="ami_kernel.json"):
        # Resolve path relative to this script's location
        base_dir = os.path.dirname(os.path.abspath(__file__))
        project_root = os.path.dirname(base_dir) # Updates kernel in repo root
        
        # Look for specific kernel or fallback
        kernel_path = os.path.join(project_root, kernel_filename)
        
        # Fallback: Find any ami_*.json in root
        if not os.path.exists(kernel_path):
            files = [f for f in os.listdir(project_root) if f.startswith('ami_') and f.endswith('.json')]
            if files:
                kernel_path = os.path.join(project_root, files[0])
        
        self.kernel_path = kernel_path
        
        # Log to absolute path
        log_file = os.path.join(base_dir, 'mcp_server.log')
        logging.basicConfig(filename=log_file, level=logging.DEBUG)
        logging.info(f"Initialized MCP Server. Root: {project_root}")
        
        self.kernel = self.load_kernel()
        logging.info(f"Loaded Kernel: {self.kernel_path}")

    def load_kernel(self):
        if os.path.exists(self.kernel_path):
            with open(self.kernel_path, 'r') as f:
                return json.load(f)
        return {"error": "No Kernel Found", "identity": {"handle": "UNKNOWN"}}

    def run(self):
        """Main Stdio Loop"""
        logging.info("Starting Stdio Loop...")
        for line in sys.stdin:
            try:
                request = json.loads(line)
                response = self.handle_request(request)
                if response:
                    print(json.dumps(response))
                    sys.stdout.flush()
            except Exception as e:
                logging.error(f"Error processing line: {e}")
                
    def handle_request(self, request: Dict) -> Dict:
        req_id = request.get("id")
        method = request.get("method")
        
        # 1. Initialize Handshake
        if method == "initialize":
            return {
                "jsonrpc": "2.0",
                "id": req_id,
                "result": {
                    "capabilities": {
                        "resources": {},
                        "prompts": {},
                        "tools": {}
                    },
                    "serverInfo": {"name": "mirror-mcp", "version": "0.2.0"}
                }
            }

        # 2. Tools List
        if method == "tools/list":
            return {
                "jsonrpc": "2.0",
                "id": req_id,
                "result": {
                    "tools": [{
                        "name": "get_identity_kernel",
                        "description": "Retrieve the Sovereign Identity Kernel for this user.",
                        "inputSchema": { "type": "object", "properties": {} }
                    }]
                }
            }
            
        # 3. Call Tool
        if method == "tools/call":
            params = request.get("params", {})
            if params.get("name") == "get_identity_kernel":
                return {
                    "jsonrpc": "2.0",
                    "id": req_id,
                    "result": {
                        "content": [{
                            "type": "text",
                            "text": json.dumps(self.kernel, indent=2)
                        }]
                    }
                }

        # Default Echo/Error
        return None

if __name__ == "__main__":
    server = MirrorMCPServer()
    server.run()
