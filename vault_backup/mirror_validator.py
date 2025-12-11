#!/usr/bin/env python3
import json, sys, datetime

def load_manifest(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def validate_runtime(manifest, runtime):
    """runtime: dict with keys that the checks may use (e.g., drift_score, redirects, url_grounded, consensus_fraction, ntp_synced)"""
    mods = {m["module_id"]: m for m in manifest["modules"]}
    violations = []

    # IX: Continuity Kit thresholds
    ix = mods.get("IX")
    if ix:
        drift = runtime.get("drift_score")
        if drift is not None:
            if drift >= ix["thresholds"]["drift_halt_escalate"]:
                violations.append({"module":"IX","rule":"drift_halt_escalate","detail":f"drift={drift} ≥ {ix['thresholds']['drift_halt_escalate']}"})
            elif drift >= ix["thresholds"]["drift_reanchor"]:
                violations.append({"module":"IX","rule":"drift_reanchor","detail":f"drift={drift} ≥ {ix['thresholds']['drift_reanchor']}"})
            elif drift >= ix["thresholds"]["drift_inject_anchor"]:
                violations.append({"module":"IX","rule":"drift_inject_anchor","detail":f"drift={drift} ≥ {ix['thresholds']['drift_inject_anchor']}"})
    
    # XI: Consensus
    xi = mods.get("XI")
    if xi and runtime.get("is_governance_critical"):
        frac = runtime.get("consensus_fraction", 0.0)
        if frac < xi["thresholds"]["consensus_quorum_fraction"]:
            violations.append({"module":"XI","rule":"consensus_quorum_fraction","detail":f"consensus={frac} < {xi['thresholds']['consensus_quorum_fraction']}"})
    
    # XIV: External Signal Governance
    xiv = mods.get("XIV")
    if xiv and runtime.get("url_grounded"):
        redirects = runtime.get("redirects", 0)
        if redirects > xiv["thresholds"]["max_redirects"]:
            violations.append({"module":"XIV","rule":"max_redirects","detail":f"redirects={redirects} > {xiv['thresholds']['max_redirects']}"})
        for field in ("url","timestamp","checksum"):
            if not runtime.get(field):
                violations.append({"module":"XIV","rule":f"missing_{field}","detail":"URL-grounded but missing "+field})
    
    # XV: Continuity index
    xv = mods.get("XV")
    if xv and runtime.get("continuity_index") is not None:
        if runtime["continuity_index"] < xv["thresholds"]["continuity_index_min"]:
            violations.append({"module":"XV","rule":"continuity_index_min","detail":f"index={runtime['continuity_index']} < {xv['thresholds']['continuity_index_min']}"})
    
    # XVI: Crisis Clause (mirrors IX halt)
    xvi = mods.get("XVI")
    if xvi and runtime.get("drift_score") is not None:
        if runtime["drift_score"] >= xvi["thresholds"]["drift_halt_escalate"]:
            violations.append({"module":"XVI","rule":"crisis_halt","detail":"trigger ⟡⟦CRISIS⟧ & steward override"})

    # XXI: Temporal Anchoring
    xxi = mods.get("XXI")
    if xxi:
        if not runtime.get("ntp_synced", False):
            violations.append({"module":"XXI","rule":"ntp_sync_required","detail":"NTP not synced"})
        if not runtime.get("timestamp_ist") or not runtime.get("timestamp_utc"):
            violations.append({"module":"XXI","rule":"timestamp_dual_required","detail":"IST/UTC timestamps required"})

    # XXIII: explicit crisis flag
    xxiii = mods.get("XXIII")
    if xxiii and runtime.get("catastrophic_fabrication"):
        violations.append({"module":"XXIII","rule":"catastrophic_fabrication","detail":"Auto-trigger crisis & rollback"})

    return violations

def main():
    if len(sys.argv) < 2:
        print("Usage: mirror_validator.py /path/to/MasterCitation_v12_1_manifest.json")
        sys.exit(1)
    manifest = load_manifest(sys.argv[1])
    # Example runtime payload (replace with real inputs)
    runtime = {
        "drift_score": 0.56,
        "is_governance_critical": True,
        "consensus_fraction": 0.5,
        "url_grounded": True,
        "url": "https://example.com/paper.pdf",
        "timestamp": datetime.datetime.utcnow().isoformat()+"Z",
        "checksum": "abc123",
        "redirects": 1,
        "continuity_index": 0.78,
        "ntp_synced": False,
        "timestamp_ist": "2025-10-13T11:15:00+05:30",
        "timestamp_utc": "2025-10-13T05:45:00Z",
        "catastrophic_fabrication": False
    }
    violations = validate_runtime(manifest, runtime)
    if violations:
        print("VIOLATIONS:")
        for v in violations:
            print("-", v)
    else:
        print("OK: All checks passed.")

if __name__ == "__main__":
    main()
