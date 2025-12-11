#!/usr/bin/env python3
"""
⟡ Sovereign Ollama Wrapper
Injects kernel identity into every local model call.

Usage:
  python3 sovereign_ollama.py "Your prompt here"
  
Or as API:
  curl -X POST http://localhost:8083/generate -d '{"prompt": "hello"}'
"""

import requests
import json
import sys

KERNEL_API = "http://localhost:8082"
OLLAMA_API = "http://localhost:11434"
DEFAULT_MODEL = "mirror-seed:latest"

def get_kernel_prompt():
    """Fetch system prompt from kernel API."""
    try:
        resp = requests.get(f"{KERNEL_API}/kernel/prompt", timeout=2)
        if resp.status_code == 200:
            return resp.text
    except:
        pass
    return "⟡ Kernel unavailable. Proceed without identity context."

def get_handoff_context():
    """Fetch any pending handoff context."""
    try:
        resp = requests.get(f"{KERNEL_API}/handoff/prompt", timeout=2)
        if resp.status_code == 200 and "No pending" not in resp.text:
            return "\n\n" + resp.text
    except:
        pass
    return ""

def generate(prompt: str, model: str = DEFAULT_MODEL) -> str:
    """Generate with kernel context injected."""
    system_prompt = get_kernel_prompt() + get_handoff_context()
    
    resp = requests.post(
        f"{OLLAMA_API}/api/generate",
        json={
            "model": model,
            "system": system_prompt,
            "prompt": prompt,
            "stream": False
        },
        timeout=120
    )
    
    if resp.status_code == 200:
        return resp.json().get("response", "")
    return f"Error: {resp.status_code}"

def log_to_kernel(content: str, source: str = "local_model"):
    """Log interaction to kernel history."""
    try:
        requests.post(
            f"{KERNEL_API}/kernel/append",
            json={
                "type": "observation",
                "source": source,
                "writer": "local_model",
                "content": content[:200]
            },
            timeout=2
        )
    except:
        pass

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 sovereign_ollama.py 'your prompt'")
        sys.exit(1)
    
    prompt = " ".join(sys.argv[1:])
    response = generate(prompt)
    print(response)
    
    # Log significant interactions
    if len(prompt) > 50:
        log_to_kernel(f"Query: {prompt[:100]}...")
