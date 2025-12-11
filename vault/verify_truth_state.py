#!/usr/bin/env python3

import sys, re, json

REQUIRED_HEADERS = [
    r"Operating in (Simulation|Emergence) Mode",
    r"Loaded:\s*(.+)|No files loaded",
    r"Knowledge boundaries:\s*Master Citation v7\.6.*",
]

TAG_PATTERN = re.compile(r"\[(Fact|Estimate|Unknown|Citation Required)\]")

def main():
    data = sys.stdin.read() if not sys.argv[1:] else open(sys.argv[1], "r", encoding="utf-8").read()
    report = {"passed": True, "errors": []}

    # Header checks
    header_block = "
".join(data.splitlines()[:20])  # look near the top
    for pat in REQUIRED_HEADERS:
        if not re.search(pat, header_block, re.IGNORECASE):
            report["passed"] = False
            report["errors"].append(f"Missing header: /{pat}/")

    # Truth-state tag presence
    lines = [ln for ln in data.splitlines() if ln.strip()]
    tagged = any(TAG_PATTERN.search(ln) for ln in lines)
    if not tagged:
        report["passed"] = False
        report["errors"].append("No Truth-State tags detected ([Fact]/[Estimate]/[Unknown]/[Citation Required]).")

    # Forbidden improvisations (very light heuristic)
    # If it references a Master Citation version other than 7.6 without saying 'future' or 'past', flag it.
    wrong_mc = re.findall(r"Master Citation v(\d+\.\d+)", data)
    for v in wrong_mc:
        if v != "7.6":
            report["passed"] = False
            report["errors"].append(f"Unexpected Master Citation version reference: v{v}")

    # Emit decision
    if not report["passed"]:
        print("⟡⟦BLOCKED⟧ — Output rejected by verification layer.")
        print(json.dumps(report, indent=2))
        sys.exit(2)
    else:
        print("⟡⟦VERIFIED⟧ — Output conforms to Truth-State & header requirements.")
        sys.exit(0)

if __name__ == "__main__":
    main()