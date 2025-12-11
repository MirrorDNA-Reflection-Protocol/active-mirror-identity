# ⟡ Seamless Handoff Protocol v1.0

**For: Paul, Claude, Antigravity**

This protocol ensures any of us can pick up exactly where another left off with zero context loss.

---

## The Golden Rule

**Every session ends with a handoff. Every session starts by reading the handoff.**

---

## Session Start (All Agents)

When starting ANY session, immediately:

```
1. Call get_handoff() 
2. Read: last_handoff, pending_actions, active_project, recent_history
3. Announce to Paul:
   "⟡ Continuity check:
    - Last handoff from: [from_agent] → [to_agent]
    - Project: [project]
    - Pending: [next_actions]
    - Last writer: [last_writer]
    Ready to continue?"
```

If no pending handoff, ask Paul what we're working on.

---

## During Session

Log significant work as it happens:
```
append_memory_chain(
  entry_type="observation" | "state_change" | "decision",
  source="descriptive_name",
  content="what happened",
  writer="claude" | "antigravity"
)
```

---

## Session End (CRITICAL)

Before ending ANY session:

### If handing to another agent:
```
create_handoff(
  from_agent="claude",        # or "antigravity"
  to_agent="antigravity",     # or "claude" or "paul"
  summary="What was accomplished",
  next_actions="Clear list of next steps",
  project="project_name",
  context="Any file paths, decisions, blockers"
)
```

### If just pausing (same agent will continue):
```
end_session_summary(
  summary="What was accomplished",
  key_decisions="Any decisions made",
  next_actions="What to do next"
)
```

---

## Handoff Types


### Claude → Antigravity
Use when:
- Architecture/design done, need implementation
- Code reviewed, ready to deploy
- Research done, need file operations

### Antigravity → Claude  
Use when:
- Code written, needs review/validation
- Hit a complex architectural decision
- Need deep analysis or synthesis

### Either → Paul
Use when:
- Decision needed (△ glyph)
- Human judgment required (⨀ HITL)
- Approval for irreversible action

---

## MCP Tools Reference

| Tool | Purpose |
|------|---------|
| `get_handoff()` | Read current handoff state (START of session) |
| `create_handoff(...)` | Create handoff to another agent (END of session) |
| `complete_handoff(id)` | Mark handoff as done |
| `end_session_summary(...)` | Close session without handoff |
| `get_identity_kernel()` | Read full kernel |
| `get_memory_chain()` | Read history chain |
| `append_memory_chain(...)` | Log to history |
| `query_kernel(path)` | Read specific field |

---

## HTTP API (for local models)

| Endpoint | Purpose |
|----------|---------|
| `GET /handoff` | Get current handoff state |
| `GET /handoff/prompt` | Get handoff as injectable prompt |
| `GET /kernel/prompt` | Get identity as system prompt |
| `POST /kernel/append` | Log to history chain |

---

## Example Flow

```
[Claude Session]
Paul: "Let's build the new API endpoint"
Claude: *calls get_handoff()* → No pending
Claude: *works on architecture*
Claude: *calls create_handoff(from="claude", to="antigravity", 
         summary="API spec complete", 
         next_actions="1. Create endpoint.py\n2. Add to router\n3. Test")*
Claude: "⟡ Handoff created. Take this to Antigravity."

[Antigravity Session]  
Paul: "Continue"
Antigravity: *calls get_handoff()* → Pending from Claude
Antigravity: "⟡ Picking up: API spec from Claude. Next: Create endpoint.py"
Antigravity: *implements*
Antigravity: *calls create_handoff(from="antigravity", to="claude",
              summary="Endpoint implemented",
              next_actions="Review code, check edge cases")*
Antigravity: "⟡ Ready for Claude to review."

[Claude Session]
Paul: "Continue"  
Claude: *calls get_handoff()* → Pending from Antigravity
Claude: "⟡ Picking up: Code review. Let me check the implementation..."
```

---

## What Gets Persisted

| Data | Location | Survives |
|------|----------|----------|
| Handoff state | handoff_state.json | Forever |
| History chain | ami_kernel.json | Forever |
| Session summaries | ami_kernel.json → sessions[] | Last 50 |

---

## Failure Recovery

If handoff state seems stale or wrong:
1. Check `get_memory_chain()` for recent history
2. Look at `last_writer` and `last_write` timestamps
3. Ask Paul for clarification
4. Create fresh handoff with current understanding

---

⟡ Protocol v1.0 — Zero context loss across all agents
