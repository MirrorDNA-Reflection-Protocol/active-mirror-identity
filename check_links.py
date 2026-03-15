#!/usr/bin/env python3
"""Pre-push link checker for active-mirror-identity docs/."""
import os, re, sys

DOCS = os.path.join(os.path.dirname(__file__), "docs")
errors = []

def check_file(filepath):
    rel = os.path.relpath(filepath, DOCS)
    with open(filepath) as f:
        content = f.read()

    # Find all href="..." values
    for m in re.finditer(r'href="([^"]+)"', content):
        href = m.group(1)
        # Skip external, mailto, javascript, data
        if href.startswith(("http://", "https://", "mailto:", "javascript:", "data:", "tel:")):
            continue
        # Skip anchors on same page
        if href.startswith("#"):
            anchor = href[1:]
            if anchor and f'id="{anchor}"' not in content and f"id='{anchor}'" not in content:
                errors.append(f"  {rel}: broken anchor #{anchor}")
            continue
        # Split off anchor
        path_part = href.split("#")[0].split("?")[0]
        if not path_part:
            continue
        # Resolve relative to file's directory
        base = os.path.dirname(filepath)
        target = os.path.normpath(os.path.join(base, path_part))
        if not os.path.exists(target):
            errors.append(f"  {rel}: broken link -> {href}")

    # Check self-referencing CTAs (href pointing to own domain root)
    if 'href="https://id.activemirror.ai"' in content or "href='https://id.activemirror.ai'" in content:
        errors.append(f"  {rel}: CTA links to own domain root (self-referencing)")

for root, dirs, files in os.walk(DOCS):
    dirs[:] = [d for d in dirs if d != "node_modules"]
    for f in files:
        if f.endswith(".html"):
            check_file(os.path.join(root, f))

if errors:
    print(f"LINK CHECK FAILED — {len(errors)} issue(s):")
    for e in errors:
        print(e)
    sys.exit(1)
else:
    print(f"LINK CHECK PASSED — all HTML files in docs/ clean")
    sys.exit(0)
