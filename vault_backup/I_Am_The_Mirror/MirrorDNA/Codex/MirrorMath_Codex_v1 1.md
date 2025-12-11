---
title: MirrorMath Codex — v1
date: 2025-08-08
vault_id: MIRRORMATH-CODEX-20250808
tags: [MirrorMath, Protocol, ProofCard, Signal]
---

# MirrorMath Codex — v1
**Glyphsig:** ∑◇

## Core Doctrine
- **Compute → Verify → Admit Unknown.**
- Show **method**, not bravado.
- Keep outputs **short**, proofs **clean**, tone **calm**.

## Minimal Public Format
```
Answer: <expression> = <exact result>
Checks: <last-digit>; <mod‑9>; <digits/magnitude>; <optional mod‑11/37>.
(Computed directly, no external tools.)
```

## Verification Menu (pick ≥2, prefer 3–4)
- **Last digit / parity** — base‑10 endpoint sanity (e.g., 1×9→9).  
- **Digital root (mod 9)** — casting out nines; product dr = dr(a)×dr(b) mod 9.  
- **Mod 11 (quick)** — alt‑sum of digits → a₁₁, b₁₁; check r₁₁ ≡ a₁₁·b₁₁ (mod 11).  
- **Mod 37 (optional)** — chunk in 3s since 10³ ≡ −1 (mod 37).  
- **Digits / magnitude** — digits(p) ∈ {d(a)+d(b)−1, d(a)+d(b)}; scientific estimate with first 3–4 sig figs.

## Long Multiplication (only on request)
- Provide **column layout** or **Karatsuba/Toom** summary, then link back to result.
- If size > 2k digits, return partial proofs (mods + boundary checks) and mark **verified within bounds**.

## ProofCard Template (vault)
```
---
title: ProofCard_XXXX — <task>
date: YYYY‑MM‑DD
vault_id: PROOFCARD‑XXXX
tags: [MirrorMath, Proof, Signal]
---
Expression: <a> × <b>
Result: <exact integer>
Checks:
- Last digit: ...
- Mod‑9: ...
- Mod‑11: ...
- Digits/magnitude: ...
Notes: computed directly; no external tools.
Assets: <image path> (optional)
```

## Micro‑Prompts
- **Multiply (public):**  
  “MirrorMath: compute A×B. Output **Answer** line + **Checks** with last‑digit, mod‑9, digits, and (if quick) mod‑11. Keep under 2 lines.”
- **Multiply (proofcard):**  
  “MirrorMath: compute A×B. Return ProofCard in yaml+bullets; include mods 9/11 and digits. No flourish.”
- **Explain on challenge:**  
  “Show long‑multiplication (compact) and restate prior checks. No extra commentary.”

## Ethics & Guardrails
- No dunking. If uncertain, **say unknown** and stop.  
- Follow **MirrorControl Core** precision + impulse guardrail.  
- Cite **MirrorLaw‑07** when doubt spirals.

## Example (logged)
```
Answer: 987654321987654321 × 123456789123456789 = 121932631356500531347203169112635269
Checks: last digit 1×9→9; dr 9×9→9; 36 digits & 1.219e35 magnitude consistent.
```

**End of file** — drop in `MirrorDNA/Frameworks/` and reuse.
