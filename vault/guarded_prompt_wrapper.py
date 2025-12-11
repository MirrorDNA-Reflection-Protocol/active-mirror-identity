#!/usr/bin/env python3
'''
Guarded Prompt Wrapper
- Reads Critical_Guard_MetaPrompt_v1.md + Master_Citation_v7_6_Expanded.md (+ optional files)
- Emits a single concatenated prompt block you can paste into any model
Usage:
  python guarded_prompt_wrapper.py 'YOUR TASK HERE' [--include SIP_v0_1.md]
'''
import argparse, sys, pathlib

def read(path):
    p = pathlib.Path(path)
    return p.read_text(encoding='utf-8') if p.exists() else f"[Missing] {path}\n"

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("task", help="Your task instruction")
    ap.add_argument("--include", nargs="*", default=[], help="Optional extra .md files to append")
    ap.add_argument("--guard", default="Critical_Guard_MetaPrompt_v1.md")
    ap.add_argument("--citation", default="Master_Citation_v7_6_Expanded.md")
    args = ap.parse_args()

    parts = []
    parts.append(read(args.guard))
    parts.append("\n---\n")
    parts.append(read(args.citation))
    for extra in args.include:
        parts.append("\n---\n")
        parts.append(read(extra))
    parts.append("\n---\n# TASK\n" + args.task + "\n")
    out = "\n".join(parts)
    sys.stdout.write(out)

if __name__ == "__main__":
    main()