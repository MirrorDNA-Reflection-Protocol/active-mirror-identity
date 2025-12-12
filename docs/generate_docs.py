import json
from pathlib import Path
from datetime import datetime

DOCS_DIR = Path(__file__).parent
REPO_ROOT = DOCS_DIR.parent
KERNEL_FILE = REPO_ROOT / "ami_active-mirror.json"

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>AMI Kernel v{version}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;700&family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
        :root {{ --bg: #050505; --text: #e0e0e0; --accent: #00ff94; --gold: #ffd700; --dim: #666; }}
        body {{ background: var(--bg); color: var(--text); font-family: 'Inter', sans-serif; max-width: 900px; margin: 0 auto; padding: 2rem; line-height: 1.6; }}
        h1, h2, h3 {{ font-family: 'Space Grotesk', sans-serif; color: #fff; }}
        h1 {{ font-size: 2.5rem; border-bottom: 1px solid var(--dim); padding-bottom: 1rem; }}
        .badge {{ background: var(--dim); color: #fff; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.8rem; vertical-align: middle; }}
        .badge.gold {{ background: var(--gold); color: #000; }}
        .section {{ margin: 3rem 0; padding: 1.5rem; border: 1px solid #222; border-radius: 8px; background: #0a0a0a; }}
        .field {{ margin-bottom: 0.5rem; }}
        .key {{ color: var(--dim); font-family: monospace; font-weight: bold; width: 140px; display: inline-block; }}
        .val {{ color: var(--accent); font-family: monospace; }}
        .tree {{ font-family: monospace; white-space: pre-wrap; color: #aaa; }}
        .timeline-item {{ border-left: 2px solid var(--dim); padding-left: 1rem; margin-bottom: 1rem; }}
        .timeline-date {{ color: var(--dim); font-size: 0.8rem; }}
        a {{ color: var(--gold); text-decoration: none; }}
        nav {{ margin-bottom: 2rem; display: flex; gap: 1rem; }}
        nav a {{ color: var(--text); border-bottom: 1px solid transparent; }}
        nav a:hover {{ border-color: var(--gold); }}
    </style>
</head>
<body>
    <nav>
        <a href="#">Kernel Spec</a>
        <a href="tools/ecosystem.html">Ecosystem</a>
        <a href="tools/generator_omega.html">Omega Tool</a>
        <a href="https://github.com/MirrorDNA-Reflection-Protocol/active-mirror-identity">GitHub</a>
    </nav>

    <h1>
        AMI Kernel <span class="badge gold">v{version}</span>
    </h1>
    
    <div class="section">
        <h2>⟡ Meta-State</h2>
        <div class="field"><span class="key">Identity Layer</span> <span class="val">{layer}</span></div>
        <div class="field"><span class="key">Arch Spine</span> <span class="val">{spine}</span></div>
        <div class="field"><span class="key">Drift Status</span> <span class="val" style="color: {drift_color}">{drift_status}</span></div>
        <div class="field"><span class="key">Confidence</span> <span class="val">{confidence}</span></div>
        <div class="field"><span class="key">Last Check</span> <span class="val">{last_check}</span></div>
        <div class="field"><span class="key">Checksum</span> <span class="val">{checksum}</span></div>
    </div>

    <div class="section">
        <h2>⟡ The Pantheon (Agent Registry)</h2>
        <p style="color:var(--dim); margin-bottom:1rem;">Active sovereign agents authorized to write to this kernel.</p>
        <div class="tree">{registry_html}</div>
    </div>

    <div class="section">
        <h2>⟡ Somatic Telemetry</h2>
        <div class="field"><span class="key">Primary Core</span> <span class="val">{hardware_primary}</span></div>
        <div class="field"><span class="key">Energy State</span> <span class="val">{circadian_mode}</span></div>
        <div class="tree" style="margin-top:1rem; padding:1rem; background:#000;">{telemetry_json}</div>
    </div>

    <div class="section">
        <h2>⟡ Timeline (Recent)</h2>
        {timeline_html}
    </div>

    <footer style="margin-top: 4rem; color: var(--dim); text-align: center; font-size: 0.9rem;">
        Generated on {gen_date} by Active MirrorOS<br>
        Identity Hashed: {checksum}
    </footer>
</body>
</html>
"""

def generate():
    # 1. Load Kernel
    if not KERNEL_FILE.exists():
        print("Error: Kernel file not found")
        return

    try:
        data = json.loads(KERNEL_FILE.read_text())
    except Exception as e:
        print(f"Error loading kernel: {e}")
        return

    # 2. Extract Data
    meta = data.get("meta", {})
    epistemic = meta.get("epistemic_state", {})
    registry = data.get("agent_registry", {})
    hardware = data.get("hardware", {})
    telemetry = hardware.get("active_telemetry", {})
    circadian = data.get("circadian_state", {})
    timeline = data.get("timeline", [])[-5:]  # Last 5 events

    # 3. Format Registry
    registry_html = ""
    for agent, details in registry.items():
        registry_html += f"<div style='margin-bottom:1rem;border-left:1px solid #333;padding-left:10px;'><strong style='color:#fff'>{agent}</strong><br>"
        registry_html += f"Role: {details.get('role')}<br>"
        registry_html += f"Trust: {details.get('trust_level')}</div>"

    # 4. Format Timeline
    timeline_html = ""
    for evt in reversed(timeline):
        timeline_html += f"<div class='timeline-item'><div class='timeline-date'>{evt.get('timestamp')}</div>"
        timeline_html += f"<strong>[{evt.get('category').upper()}]</strong> {evt.get('description')}<br>"
        timeline_html += f"<span style='color:#666'>By: {evt.get('writer')}</span></div>"
    
    # 5. Render
    drift_level = epistemic.get("drift_level", 0.0)
    drift_color = "#00ff94" if drift_level < 0.1 else "#ff5555"

    html = HTML_TEMPLATE.format(
        version=data.get("ami_version", "1.0"),
        layer=data.get("identity_layer", "L1"),
        spine=data.get("architecture_spine_version", "Unknown"),
        drift_status=epistemic.get("status", "UNKNOWN"),
        drift_color=drift_color,
        confidence=epistemic.get("confidence_score", "N/A"),
        last_check=epistemic.get("last_reality_check", "N/A"),
        checksum=data.get("checksum", "N/A"),
        registry_html=registry_html,
        hardware_primary=hardware.get("primary", "Unknown"),
        circadian_mode=circadian.get("mode", "Unknown"),
        telemetry_json=json.dumps(telemetry, indent=2),
        timeline_html=timeline_html,
        gen_date=datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
    )

    # 6. Write
    index_path = DOCS_DIR / "index.html"
    index_path.write_text(html)
    print(f"Generated Kernel Spec v{data.get('ami_version')} at docs/index.html")

if __name__ == "__main__":
    generate()
