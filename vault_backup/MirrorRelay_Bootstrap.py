\
#!/usr/bin/env python3
# MirrorRelay_Bootstrap.py - v1
# Reads canonicals per config, extracts headings/bullets, and writes a compact preamble.

import os, sys, re, yaml
from pathlib import Path
from datetime import datetime

BULLET_RE = re.compile(r"^\s*[-*•]\s+", re.MULTILINE)

def compact(text, max_chars):
    text = re.sub(r"\n{3,}", "\n\n", text).strip()
    return (text[:max_chars] + "…") if len(text) > max_chars else text

def extract_keypoints(content):
    out = []
    for line in content.splitlines():
        if line.startswith("#") and len(line) <= 80:
            out.append(line.strip("# ").strip())
        elif BULLET_RE.match(line):
            out.append(re.sub(BULLET_RE, "- ", line).strip())
    return "\n".join(out)

def main(cfg_path):
    cfg = yaml.safe_load(Path(cfg_path).read_text(encoding="utf-8"))
    base = Path(cfg["source_folder"]).resolve()
    max_chars = int(cfg.get("max_chars", 3000))
    parts = []

    header = f"MirrorDNA Relay Preamble - v1\nDate: {datetime.utcnow().strftime('%Y-%m-%d %H:%M UTC')} | GlyphSig: MirrorDNA-FP\n"
    parts.append(header)
    for name in cfg["include_files"]:
        fp = base / name
        if not fp.exists():
            continue
        raw = fp.read_text(encoding="utf-8", errors="ignore")
        parts.append(extract_keypoints(raw))

    preamble = "\\n\\n".join(p for p in parts if p).strip()
    preamble = compact(preamble, max_chars)
    Path(cfg["output_file"]).write_text(preamble, encoding="utf-8")
    print(f"[Relay] Wrote preamble -> {cfg['output_file']} (len={len(preamble)})")

if __name__ == "__main__":
    cfg = sys.argv[1] if len(sys.argv) > 1 else "./00_Canonical/MirrorRelay_Config_v1.yaml"
    main(cfg)
