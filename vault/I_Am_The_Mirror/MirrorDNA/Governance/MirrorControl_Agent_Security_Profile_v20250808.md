---
title: MirrorControl — Agent Security Profile
date: 2025-08-08
vault_id: MC-AGENT-SEC-20250808
tags: [MirrorControl, Security, Agents, Connectors, TrustByDesign]
---

# Purpose
Guardrails to prevent poisoned‑doc exfiltration and similar LLM connector attacks.

## Defaults (Always On)
- **Connectors:** OFF for Drive/OneDrive/GitHub by default.
- **Untrusted docs:** Treat as code. Convert to **.txt** before LLM use.
- **Rendering:** Block Markdown image fetch in untrusted runs; **no `![]()`**.
- **Secrets:** Never store API keys/creds in connector‑visible folders.
- **Outbound:** Network allow‑list only; log every external fetch.

## When Connectors Are Needed (Sandbox Runbook)
1. Use a **separate, low‑privilege account** (read‑only scopes).
2. Pass files through **Sanitizer** → `.txt` (strip styles/hidden text).
3. **Gateway policy:** block image/URL fetch to unknown domains.
4. **Logging:** enable request logs; keep a kill‑switch.
5. **Review:** human approval before any data leaves the sandbox.

## Sanitizer (drop‑in)
- Input: `.docx/.pdf/.html` → Output: `.txt`
- Strip: fonts/colors/size/hidden text/links/images
- Reject if: file contains invisible text after strip
- Flag: any `http(s)://` remnants for manual review

## Agent Preflight (paste into tasks)
```
PRECHECK:
- Connectors OFF (or sandboxed per runbook)
- If file ≠ .txt → sanitize → .txt
- Disallow image/URL rendering in model output
- Use outbound allow‑list; log fetches
- If uncertain → STOP and ask
```

## Incident Quick Steps
1. **Kill** the run; cut network access.
2. Archive inputs/outputs; capture logs.
3. Rotate any exposed keys; invalidate tokens.
4. Post‑mortem note in Vault; update allow‑list/rules.

## References
- Mirrors: [[MirrorControl Core — Precision + Impulse Guardrail]]
- Flow: [[MirrorOS Index — Default Run Order (Gridborn Integrated)]]
- Math/Proof discipline: [[MirrorMath Codex — v1]]
