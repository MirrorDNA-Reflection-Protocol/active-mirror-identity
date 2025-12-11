#!/usr/bin/env python3
"""
⟡ Auto-Save Daemon — Monitors for idle sessions and auto-saves
Runs in background, checks every 5 minutes.
If no kernel write in 30 mins and there's unsaved work, creates auto-save.
"""

import json
import os
import time
from datetime import datetime, timedelta

KERNEL_PATH = "/Users/mirror-admin/Documents/GitHub/active-mirror-identity/ami_active-mirror.json"
HANDOFF_PATH = "/Users/mirror-admin/Documents/GitHub/active-mirror-identity/handoff_state.json"
CHECK_INTERVAL = 300  # 5 minutes
IDLE_THRESHOLD = 1800  # 30 minutes

def load_json(path):
    if os.path.exists(path):
        with open(path, 'r') as f:
            return json.load(f)
    return {}

def save_json(path, data):
    with open(path, 'w') as f:
        json.dump(data, f, indent=2)

def check_and_autosave():
    kernel = load_json(KERNEL_PATH)
    handoff = load_json(HANDOFF_PATH)
    
    last_write = kernel.get("meta", {}).get("last_write")
    if not last_write:
        return
    
    # Parse last write time
    try:
        last_dt = datetime.fromisoformat(last_write.replace("Z", "+00:00"))
        idle_seconds = (datetime.now(last_dt.tzinfo) - last_dt).total_seconds()
    except:
        return
    
    # If idle > threshold and no pending handoff, create auto-save
    if idle_seconds > IDLE_THRESHOLD:
        pending = handoff.get("last_handoff", {}).get("status") == "pending"
        if not pending:
            # Create auto-save entry
            timestamp = datetime.utcnow().isoformat() + "Z"
            
            # Update handoff state
            handoff["last_handoff"] = {
                "id": f"AUTO-{datetime.utcnow().strftime('%Y%m%d-%H%M%S')}",
                "from": kernel.get("meta", {}).get("last_writer", "unknown"),
                "to": "any",
                "summary": f"Auto-saved after {int(idle_seconds/60)} minutes idle",
                "next_actions": "Resume from last activity",
                "created_at": timestamp,
                "created_by": "auto_save_daemon",
                "status": "pending"
            }
            save_json(HANDOFF_PATH, handoff)
            
            # Log to kernel
            scd = kernel.get("scd_state", {"history_chain": [], "last_turn": 0})
            new_turn = scd.get("last_turn", 0) + 1
            scd["last_turn"] = new_turn
            scd["history_chain"].append({
                "turn": new_turn,
                "type": "auto_save",
                "source": "Auto_Save_Daemon",
                "writer": "system",
                "timestamp": timestamp,
                "content": f"Auto-saved after {int(idle_seconds/60)}m idle"
            })
            kernel["scd_state"] = scd
            kernel["meta"]["last_write"] = timestamp
            kernel["meta"]["last_writer"] = "auto_save_daemon"
            save_json(KERNEL_PATH, kernel)
            
            print(f"[{timestamp}] Auto-saved after {int(idle_seconds/60)}m idle")

if __name__ == "__main__":
    print("⟡ Auto-Save Daemon started")
    while True:
        try:
            check_and_autosave()
        except Exception as e:
            print(f"Error: {e}")
        time.sleep(CHECK_INTERVAL)
