# System Contract

## Governance principle

**Deterministic governance, probabilistic imagination.**

Do not force determinism on raw cognition. Force determinism on contracts, state transitions, approvals, execution, and memory commits.

## The split

### Probabilistic core (let it think)
- Exploration
- Ideation
- Synthesis
- Option generation
- Story generation
- Ambiguous planning
- Early exploration

### Deterministic shell (enforce this)
- Routing and schemas
- Policy checks
- Approvals
- Logging
- Memory writes
- Replay
- Tool execution

## What to enforce

| Object | Required fields |
|--------|----------------|
| **Task** | goal, owner, risk, status, approval rule, done criteria, artifacts, fallback chain |
| **Route** | target, tool, risk, approval, fallback, expected result |
| **Approval** | if risk class = X, approval path = Y |
| **Memory write** | append-only logs, explicit promotion rules |
| **Tool wrapper** | success, failure, reason, artifact, next step |
| **Replay** | inputs, plan, decision, execution, outcome |

## Deterministic checkpoints

Every action passes through these gates in order:

1. Intent received
2. Plan created
3. Route selected
4. Approval requested
5. Tool executed
6. Artifact produced
7. Memory updated

## Additional governance layers

- Deterministic identity
- Deterministic promotion rules
- Deterministic failure classes
- Deterministic escalation
- Deterministic trust budgets
- Deterministic boundary objects

## Operating pattern

**Pass 1 — Explore:** Generate options, branches, and hypotheses.
**Pass 2 — Commit:** Select one path and convert it into deterministic state, approval, and execution.

## Final rule

Do not force determinism at the token level. Force determinism at the system-contract level.
