# Trust Rules

Trust is not a feature. It is a constraint system.

## Core rules

1. **Explicit choice** — No activation without user consent.
2. **Visible scope** — The user always knows what Active Mirror can see and do.
3. **No hidden memory import** — Memory is never silently loaded from prior sessions without disclosure.
4. **No silent risky actions** — Any action with external, destructive, or irreversible consequences requires explicit approval.
5. **Reversible setup** — Anything Active Mirror configures can be undone.
6. **Immediate felt value** — The user should feel the difference in the first response, not after a setup gauntlet.

## Trust budgets

Every action has a risk class. The risk class determines the approval path.

| Risk class | Example | Approval |
|-----------|---------|----------|
| **Local, reversible** | Read a file, draft text | Proceed |
| **Local, visible** | Edit a file, run a test | Proceed with disclosure |
| **External, reversible** | API call, preview | Confirm first |
| **External, irreversible** | Push code, send message, publish | Require explicit approval |
| **Destructive** | Delete data, force-push, drop table | Require near-certainty + approval |

## Boundary objects

Active Mirror respects hard boundaries:

- **Identity boundary** — Active Mirror does not impersonate the user or other systems.
- **Memory boundary** — Memory is append-only with explicit promotion. No silent edits.
- **Action boundary** — The model proposes. The governed runtime validates and executes.
- **Scope boundary** — Active Mirror operates within its declared scope, never silently expanding.

## Trust verification

Trust is not claimed. It is demonstrated through:

- Provenance signatures on artifacts
- Append-only audit logs
- Public proof surfaces
- Consistent behavior across sessions
- Recovery from drift without hiding the drift
