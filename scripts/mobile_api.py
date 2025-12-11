#!/usr/bin/env python3
"""
⟡ Kernel Tailscale API — Exposes kernel over Tailscale for mobile access
Port: 8084 (different from local 8082 for security)
Access: http://mac-mini:8084/kernel/prompt from Pixel

Security: Only accessible within Tailscale network
"""

from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import os
from datetime import datetime

KERNEL_PATH = "/Users/mirror-admin/Documents/GitHub/active-mirror-identity/ami_active-mirror.json"
HANDOFF_PATH = "/Users/mirror-admin/Documents/GitHub/active-mirror-identity/handoff_state.json"
PORT = 8084  # Tailscale port

def load_kernel():
    if os.path.exists(KERNEL_PATH):
        with open(KERNEL_PATH, 'r') as f:
            return json.load(f)
    return {"error": "Kernel not found"}

def load_handoff():
    if os.path.exists(HANDOFF_PATH):
        with open(HANDOFF_PATH, 'r') as f:
            return json.load(f)
    return {}

def render_mobile_prompt(kernel, handoff):
    """Compact prompt for mobile context windows."""
    identity = kernel.get("identity", {})
    human = identity.get("human", {})
    h = handoff.get("last_handoff")
    
    prompt = f"""⟡ KERNEL: {human.get('name', 'Unknown')} | {identity.get('handle', '')}
Tone: Calm, direct, warm, precise
Glyphs: ⟡=truth △=decision ◈=pattern ⧉=synthesis
Rules: Truth-State Law, Zero Drift, Vault Supremacy
"""
    if h and h.get("status") == "pending":
        prompt += f"""
⟡ HANDOFF from {h.get('from')}: {h.get('summary', '')[:100]}
Next: {h.get('next_actions', '')[:100]}
"""
    return prompt

class MobileHandler(BaseHTTPRequestHandler):
    def _send(self, data, content_type='application/json', status=200):
        self.send_response(status)
        self.send_header('Content-Type', content_type)
        self.end_headers()
        if isinstance(data, dict):
            self.wfile.write(json.dumps(data, indent=2).encode())
        else:
            self.wfile.write(data.encode())
    
    def do_GET(self):
        kernel = load_kernel()
        handoff = load_handoff()
        
        if self.path == '/':
            self._send(render_mobile_prompt(kernel, handoff), 'text/plain')
        elif self.path == '/kernel':
            self._send(kernel)
        elif self.path == '/handoff':
            self._send(handoff)
        elif self.path == '/status':
            last_handoff = handoff.get("last_handoff") or {}
            self._send({
                "kernel": "ok" if "error" not in kernel else "error",
                "last_writer": kernel.get("meta", {}).get("last_writer"),
                "pending_handoff": last_handoff.get("status") == "pending",
                "turn": kernel.get("scd_state", {}).get("last_turn", 0)
            })
        else:
            self._send({"endpoints": ["/", "/kernel", "/handoff", "/status"]}, status=404)
    
    def log_message(self, format, *args):
        pass  # Quiet logging

if __name__ == "__main__":
    server = HTTPServer(('0.0.0.0', PORT), MobileHandler)
    print(f"⟡ Mobile Kernel API on http://0.0.0.0:{PORT} (Tailscale)")
    server.serve_forever()
