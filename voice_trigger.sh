#!/bin/bash
# ⟡ Voice Trigger Script — Called by macOS Shortcuts or automation
# Usage: voice_trigger.sh "continue" | "handoff" | "status" | "close"

ACTION="${1:-status}"
KERNEL_API="http://localhost:8082"

case "$ACTION" in
    continue|pickup)
        # Fetch handoff and speak it
        HANDOFF=$(curl -s "$KERNEL_API/handoff")
        PENDING=$(echo "$HANDOFF" | python3 -c "import sys,json; h=json.load(sys.stdin).get('last_handoff',{}); print(f\"Handoff from {h.get('from','nobody')}: {h.get('summary','nothing pending')[:100]}\" if h else 'No pending handoff')")
        say "$PENDING"
        ;;
    status)
        STATUS=$(curl -s "$KERNEL_API/handoff")
        LAST=$(echo "$STATUS" | python3 -c "import sys,json; d=json.load(sys.stdin); print(f\"Last writer: {d.get('last_writer','unknown')}. Turn {len(d.get('recent_history',[]))}\")")
        say "$LAST"
        ;;
    handoff)
        say "Opening handoff in Claude"
        open -a "Claude"
        ;;
    close)
        say "Session closing. Remember to save your handoff."
        ;;
    *)
        say "Unknown command: $ACTION"
        ;;
esac
