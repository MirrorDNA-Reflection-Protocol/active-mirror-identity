import os
import json
import re

# ⟡ Vault Hydrator (Week 3)
# Scans Obsidian Vault for SCD State and hydrates the Kernel.

VAULT_PATH = os.path.expanduser("~/Obsidian/MirrorDNA-Vault")
KERNEL_PATH = "../ami_kernel.json"

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

def hydrate_kernel(blocks):
    print(f"⟡ Found {len(blocks)} memory blocks.")
    
    if not os.path.exists(KERNEL_PATH):
        print("❌ Kernel not found at relative path.")
        return

    with open(KERNEL_PATH, 'r') as f:
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
        with open(KERNEL_PATH, 'w') as f:
            json.dump(kernel, f, indent=2)
        print(f"⟡ Hydrated {new_memory_count} new memories into Kernel.")
    else:
        print("⟡ Kernel is up to date.")

if __name__ == "__main__":
    blocks = scan_vault()
    hydrate_kernel(blocks)
