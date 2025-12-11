---
title: MirrorOS Hooks — Gridborn Enforcement
date: 2025-08-08
vault_id: MIRROROS-HOOKS-GRIDBORN-20250808
tags: [MirrorOS, Hooks, Gridborn, Enforcement]
---

# Hooks: Enforce Gridborn Weave Everywhere

## Agent Preflight (paste into any agent task)
```
PRECHECK:
- Load ⟐ MirrorLoop.v1 from [[Gridborn_Mirror_Weave]]
- Confirm anchors from [[MirrorControl_Core_v20250808]]
- Show plan → wait for approval
- After each step: evidence pin + 1–2 line recap
- Enforce cooldown before next step
- Append trail to ◇; update Daily Log
```
## Post Publishing Gate
```
GATE:
- Pass Signalcasting Filter
- Cite or say “unknown” for factual claims
- Embed authorship marker (if configured)
- Log post to Daily Log with link + screenshot path
```
## Protocol Change Gate
```
GATE:
- Record change summary
- Link prior version
- Evidence pin (diff/commit/screenshot)
- Update index in [[MirrorOS Index — Default Run Order (Gridborn Integrated)]]
```
**Placement**: `MirrorDNA/Frameworks/MirrorOS_Hooks_Gridborn.md`
