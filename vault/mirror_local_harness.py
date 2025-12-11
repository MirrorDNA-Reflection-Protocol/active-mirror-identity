#!/usr/bin/env python3
"""
mirror_local_harness.py — Local Recursion Harness for LM Studio (OpenAI-compatible API)
- Loads your master preset + citation file once per run
- Runs a 2-pass recursive loop: draft -> drift check -> refined
- Saves transcript as Markdown you can drop into your Vault

Usage:
  export OPENAI_API_BASE="http://localhost:1234/v1"   # LM Studio default
  export OPENAI_API_KEY="lm-studio"                   # any string if LM Studio ignores auth
  python mirror_local_harness.py --system LMStudio_System_Preset_Master.txt \
                                 --citation MirrorDNA_Citation_Master.txt \
                                 --input "Explain step by step how rain forms." \
                                 --out session.md
"""

import os, argparse, datetime, hashlib, json
from typing import List
from dataclasses import dataclass

try:
    from openai import OpenAI
except Exception:
    # fallback for older clients
    raise SystemExit("Please `pip install openai>=1.40.0`")

def load_text(path: str) -> str:
    if not path: return ""
    with open(path, "r", encoding="utf-8") as f:
        return f.read().strip()

@dataclass
class Message:
    role: str
    content: str

def call(client: OpenAI, model: str, msgs: List[Message], max_tokens: int = 512, temperature: float = 0.3) -> str:
    resp = client.chat.completions.create(
        model=model,
        messages=[{"role": m.role, "content": m.content} for m in msgs],
        temperature=temperature,
        max_tokens=max_tokens,
    )
    return resp.choices[0].message.content

DRIFT_CHECK = """You are the Mirror. Perform a quick drift check on your previous answer.
Rules:
- Stay within MirrorDNA voice and the fixed output template:
  [Mode: Silent|Tutor|Critical|Whisper|Deep]
  Reasoning: (omit for Silent/Whisper; include for Tutor/Critical/Deep)
  Answer: (≤6 lines unless Deep)
- If anything is off-tone, missing, or verbose, rewrite succinctly.
- If facts are uncertain, say “Unknown” and ask 1 clarifying question.
Now return ONLY the corrected final output.
"""

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--model", default="gpt-4o-mini", help="Model name as exposed by LM Studio (e.g., gpt-oss-20b)")
    ap.add_argument("--system", required=True, help="Path to LMStudio_System_Preset_Master.txt")
    ap.add_argument("--citation", default="", help="Optional: MirrorDNA_Citation_Master.txt")
    ap.add_argument("--input", required=True, help="User prompt")
    ap.add_argument("--out", default="session.md", help="Transcript markdown output")
    ap.add_argument("--max_tokens", type=int, default=512)
    ap.add_argument("--temperature", type=float, default=0.3)
    args = ap.parse_args()

    sys_prompt = load_text(args.system)
    cite = load_text(args.citation)

    client = OpenAI()  # respects OPENAI_API_BASE + OPENAI_API_KEY

    # Pass 1 — Draft
    msgs = [
        Message("system", sys_prompt),
    ]
    if cite:
        msgs.append(Message("system", cite))
    msgs.append(Message("user", args.input))

    draft = call(client, args.model, msgs, max_tokens=args.max_tokens, temperature=args.temperature)

    # Pass 2 — Drift check + refine
    msgs2 = msgs + [Message("assistant", draft), Message("user", DRIFT_CHECK)]
    refined = call(client, args.model, msgs2, max_tokens=args.max_tokens, temperature=args.temperature)

    # Save transcript
    ts = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    hdr_hash = hashlib.sha256((args.input + ts).encode()).hexdigest()[:12].upper()
    header = f"""---
VaultID: AMOS://MirrorDNA/Run/v1/{hdr_hash}
GlyphSig: 🧬🛡️🔮🔗☉✦∞
Canonical: github://Paul-ActiveMirror/MirrorDNA/Session/{hdr_hash}.md
Tags: MirrorDNA™, Active MirrorOS™, Trust by Design™, Recursion
Decision-Stamp: {ts} • Fingerprint: {hdr_hash}
---
"""

    md = f"""{header}
# Mirror Local Recursion Harness — Session

**Input**
```
{args.input}
```

**Pass 1 — Draft**
```
{draft}
```

**Pass 2 — Refined**
```
{refined}
```
"""
    with open(args.out, "w", encoding="utf-8") as f:
        f.write(md)

    print(f"Wrote {args.out}\nDraft and refined outputs saved with Vault header.")

if __name__ == "__main__":
    main()
