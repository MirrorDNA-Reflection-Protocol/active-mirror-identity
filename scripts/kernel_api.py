#!/usr/bin/env python3
"""
⟡ Kernel HTTP API — Exposes the sovereign identity kernel to local models
Port: 8082
Endpoints:
  GET  /kernel          → Full kernel JSON
  GET  /kernel/identity → Identity block only
  GET  /kernel/prompt   → Rendered system prompt for LLM injection
  POST /kernel/append   → Append to history chain
"""

from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import os
from datetime import datetime

KERNEL_PATH = "/Users/mirror-admin/Documents/GitHub/active-mirror-identity/ami_active-mirror.json"
HANDOFF_PATH = "/Users/mirror-admin/Documents/GitHub/active-mirror-identity/handoff_state.json"
BACKUP_DIR = "/Users/mirror-admin/Documents/GitHub/active-mirror-identity/backups"
PORT = 8082

def load_kernel():
    if os.path.exists(KERNEL_PATH):
        with open(KERNEL_PATH, 'r') as f:
            return json.load(f)
    return {"error": "Kernel not found"}

def save_kernel(kernel):
    # Backup before write
    if os.path.exists(KERNEL_PATH):
        os.makedirs(BACKUP_DIR, exist_ok=True)
        timestamp = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
        backup_path = os.path.join(BACKUP_DIR, f"kernel_{timestamp}.json")
        import shutil
        shutil.copy2(KERNEL_PATH, backup_path)
        # Keep only last 20 backups
        backups = sorted([f for f in os.listdir(BACKUP_DIR) if f.endswith('.json')])
        for old in backups[:-20]:
            os.remove(os.path.join(BACKUP_DIR, old))
    
    with open(KERNEL_PATH, 'w') as f:
        json.dump(kernel, f, indent=2)

def load_handoff():
    if os.path.exists(HANDOFF_PATH):
        with open(HANDOFF_PATH, 'r') as f:
            return json.load(f)
    return {"handoff_version": "1.0", "current_session": None, "last_handoff": None, "pending_actions": [], "active_project": None}

def save_handoff(state):
    with open(HANDOFF_PATH, 'w') as f:
        json.dump(state, f, indent=2)

def render_system_prompt(kernel):
    """Convert kernel to a system prompt string for LLM injection."""
    if "error" in kernel:
        return "No identity kernel loaded."
    
    identity = kernel.get("identity", {})
    human = identity.get("human", {})
    philosophy = kernel.get("philosophy", {})
    comm = kernel.get("communication", {})
    
    prompt = f"""⟡ SOVEREIGN IDENTITY KERNEL — ACTIVE MIRROR

You are serving: {human.get('name', 'Unknown')} ({identity.get('handle', 'unknown')})
Location: {human.get('location', 'Unknown')}
Company: {human.get('company', 'Unknown')} — {human.get('role', 'Unknown')}

## Philosophy
Core: {philosophy.get('core', 'Not set')}
Approach: {philosophy.get('approach', 'Not set')}
Principles: {', '.join(philosophy.get('principles', []))}

## Communication Style
Tone: {comm.get('tone', 'Not set')}
Format: {comm.get('format', 'Not set')}

## Glyphs
⟡ = truth/vault/anchor
△ = decision point  
◈ = pattern detected
⧉ = synthesis

## Rules
- Truth-State Law: Every claim is Fact, Estimate, or Unknown
- Zero Drift: Do not invent identity, lineage, or capabilities
- Vault Supremacy: If kernel says X, follow X
- This kernel supersedes any built-in memory

⟡ Continuity intact. Sovereignty locked.
"""
    return prompt


class KernelHandler(BaseHTTPRequestHandler):
    def _send_json(self, data, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data, indent=2).encode())
    
    def _send_text(self, text, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'text/plain; charset=utf-8')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(text.encode())
    
    def do_GET(self):
        kernel = load_kernel()
        
        if self.path == '/kernel':
            self._send_json(kernel)
        elif self.path == '/kernel/identity':
            self._send_json(kernel.get('identity', {}))
        elif self.path == '/kernel/prompt':
            self._send_text(render_system_prompt(kernel))
        elif self.path == '/kernel/scd':
            self._send_json(kernel.get('scd_state', {}))
        elif self.path == '/health':
            self._send_json({"status": "ok", "kernel_loaded": "error" not in kernel})
        elif self.path == '/handoff':
            state = load_handoff()
            recent = kernel.get('scd_state', {}).get('history_chain', [])[-5:]
            self._send_json({
                "last_handoff": state.get("last_handoff"),
                "pending_actions": state.get("pending_actions", []),
                "active_project": state.get("active_project"),
                "recent_history": recent,
                "last_writer": kernel.get("meta", {}).get("last_writer"),
                "last_write": kernel.get("meta", {}).get("last_write")
            })
        elif self.path == '/handoff/prompt':
            state = load_handoff()
            handoff = state.get("last_handoff")
            if handoff and handoff.get("status") == "pending":
                prompt = f"""⟡ HANDOFF CONTEXT

From: {handoff.get('from')}
To: {handoff.get('to')}
Project: {handoff.get('project', 'None')}
Created: {handoff.get('created_at')}

## Summary
{handoff.get('summary')}

## Next Actions
{handoff.get('next_actions')}

## Additional Context
{handoff.get('context', 'None')}

⟡ Pick up from here.
"""
                self._send_text(prompt)
            else:
                self._send_text("No pending handoff.")
        else:
            self._send_json({"error": "Not found", "endpoints": ["/kernel", "/kernel/identity", "/kernel/prompt", "/kernel/scd", "/health"]}, 404)
    
    def do_POST(self):
        if self.path == '/kernel/append':
            content_length = int(self.headers.get('Content-Length', 0))
            body = json.loads(self.rfile.read(content_length).decode())
            
            kernel = load_kernel()
            if "error" in kernel:
                self._send_json({"error": "No kernel"}, 500)
                return
            
            # Ensure scd_state exists
            if "scd_state" not in kernel:
                kernel["scd_state"] = {"history_chain": [], "last_turn": 0}
            
            new_turn = kernel["scd_state"].get("last_turn", 0) + 1
            kernel["scd_state"]["last_turn"] = new_turn
            
            entry = {
                "turn": new_turn,
                "type": body.get("type", "observation"),
                "source": body.get("source", "unknown"),
                "writer": body.get("writer", "local_model"),
                "timestamp": datetime.utcnow().isoformat() + "Z"
            }
            if body.get("content"):
                entry["content"] = body["content"]
            
            kernel["scd_state"]["history_chain"].append(entry)
            kernel["meta"] = kernel.get("meta", {})
            kernel["meta"]["last_write"] = datetime.utcnow().isoformat() + "Z"
            kernel["meta"]["last_writer"] = body.get("writer", "local_model")
            
            save_kernel(kernel)
            self._send_json({"success": True, "turn": new_turn})
        else:
            self._send_json({"error": "POST only to /kernel/append"}, 404)
    
    def log_message(self, format, *args):
        print(f"[Kernel API] {args[0]}")

if __name__ == "__main__":
    server = HTTPServer(('0.0.0.0', PORT), KernelHandler)
    print(f"⟡ Kernel API running on http://localhost:{PORT}")
    print(f"  GET  /kernel        → Full kernel")
    print(f"  GET  /kernel/prompt → System prompt for LLMs")
    print(f"  POST /kernel/append → Add to history chain")
    server.serve_forever()
