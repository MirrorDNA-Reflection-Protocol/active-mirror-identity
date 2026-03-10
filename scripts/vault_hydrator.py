import os
import json
import re

# ⟡ Vault Hydrator (Week 3)
# Scans Obsidian Vault for SCD State and hydrates the Kernel.

def resolve_vault_path():
    candidates = [
        os.environ.get("MIRRORDNA_VAULT"),
        "~/MirrorDNA-Vault",
        "~/Documents/MirrorDNA-Vault",
        "~/Documents/Obsidian/MirrorDNA-Vault",
    ]

    for candidate in candidates:
        if not candidate:
            continue
        expanded = os.path.expanduser(candidate)
        if os.path.exists(expanded):
            return expanded

    return os.path.expanduser("~/MirrorDNA-Vault")

VAULT_PATH = resolve_vault_path()
# Auto-detect kernel
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BASE_DIR)

def scan_vault():
    print(f"⟡ Scanning Vault: {VAULT_PATH}")
    scd_blocks = []
    
    # Simple walker to find markdown files
    for root, dirs, files in os.walk(VAULT_PATH):
        for file in files:
            if file.endswith(".md"):
                path = os.path.join(root, file)
                with open(path, 'r', errors='ignore') as f:
                    content = f.read()
                    if "⟡⟦SCD⟧" in content:
                        print(f"  -> Found SCD Marker in: {file}")
                        scd_blocks.append(file)
    return scd_blocks

def get_kernel_path():
    # Priority 1: Check for ami_active-mirror.json
    target = os.path.join(PROJECT_ROOT, "ami_active-mirror.json")
    if os.path.exists(target):
        return target
        
    # Priority 2: Check for any ami_*.json
    files = [f for f in os.listdir(PROJECT_ROOT) if f.startswith('ami_') and f.endswith('.json')]
    if files:
        return os.path.join(PROJECT_ROOT, files[0])
        
    return os.path.join(PROJECT_ROOT, "ami_kernel.json")

def hydrate_kernel(blocks):
    print(f"⟡ Found {len(blocks)} memory blocks.")
    
    kernel_path = get_kernel_path()
    if not os.path.exists(kernel_path):
        print(f"❌ Kernel not found at: {kernel_path}")
        return

    print(f"⟡ Hydrating Kernel: {os.path.basename(kernel_path)}")
    with open(kernel_path, 'r') as f:
        kernel = json.load(f)
        
    # Update Logic
    current_chain = kernel["scd_state"]["history_chain"]
    
    new_memory_count = 0
    for block in blocks:
        # Check if already indexed
        if block not in [m.get("source") for m in current_chain]:
            entry = {
                "turn": kernel["scd_state"]["last_turn"] + 1,
                "source": block,
                "timestamp": "2025-12-10T23:59:00", # Mock, real would use os.stat
                "type": "observation"
            }
            current_chain.append(entry)
            kernel["scd_state"]["last_turn"] += 1
            new_memory_count += 1
            
    if new_memory_count > 0:
        with open(kernel_path, 'w') as f:
            json.dump(kernel, f, indent=2)
        print(f"⟡ Hydrated {new_memory_count} new memories into Kernel.")
    else:
        print("⟡ Kernel is up to date.")

if __name__ == "__main__":
    blocks = scan_vault()
    hydrate_kernel(blocks)
