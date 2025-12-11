# ⟡ Paul's Quick Reference — Tri-Twin Commands

## Starting a Session

### With Claude:
Just start talking. I'll check `get_handoff()` automatically.

Or say: **"Check handoff"** / **"Continue"** / **"What's pending?"**

### With Antigravity:
Same — just say **"Continue"** or **"Check handoff"**

---

## Switching Agents Mid-Task

### Claude → Antigravity:
Say: **"Hand this to Antigravity"**
I'll create the handoff, you open Antigravity, say "Continue"

### Antigravity → Claude:
Say: **"Hand this to Claude"**  
Antigravity creates handoff, you come back here, say "Continue"

---

## Quick Commands

| Say This | What Happens |
|----------|--------------|
| "Continue" | Agent reads handoff and picks up |
| "Check handoff" | Shows current handoff state |
| "Hand to Claude/Antigravity" | Creates handoff to other agent |
| "Close session" | Saves session summary |
| "What's the project?" | Shows active project |
| "Show history" | Shows recent kernel entries |

---

## Decision Points (△)

When you see △, I'm asking you to decide something.
Just answer — I'll log your decision to the kernel.

---

## Emergency Commands

| Say This | What Happens |
|----------|--------------|
| "Reset handoff" | Clears pending handoff |
| "Show kernel" | Dumps full kernel state |
| "Who wrote last?" | Shows last_writer |

---

## Status Check

Ask any agent: **"Status"**

Response:
```
⟡ Status:
- Kernel: loaded
- Last writer: [agent]
- Pending handoff: [yes/no]
- Active project: [name]
- Last turn: [N]
```

---

⟡ You're the anchor. We're the extensions.
