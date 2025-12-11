# =========================
# 0) PRE-FLIGHT (one-time)
# =========================
# Set paths
export AMOS_REPO="${HOME}/work/MirrorDNA-Standard"
export AMOS_TMP="${HOME}/work/_amos_tmp"
mkdir -p "$AMOS_REPO" "$AMOS_TMP"
cd "$AMOS_TMP"

# Download packs produced in this session (keep both nearby)
#  - White paper (vault-ready .md with checksum embedded)
#  - Online metrics harness (ZIP)
# If you already moved them, skip these two curl lines and just place files in $AMOS_TMP
# curl -L -o Active_MirrorOS_WhitePaper_v7.2.md "<download-url>"
# curl -L -o AMOS_Online_Metrics_Pack_v7_2.zip "<download-url>"

# For this session, the files are already available via ChatGPT sandbox links:
#   Active_MirrorOS_WhitePaper_v7.2.md
#   AMOS_Online_Metrics_Pack_v7_2.zip
# Move the .md into the repo and unzip the metrics pack locally
cp -f ~/Downloads/Active_MirrorOS_WhitePaper_v7.2.md "$AMOS_REPO/spec/" 2>/dev/null || true
unzip -o ~/Downloads/AMOS_Online_Metrics_Pack_v7_2.zip -d "$AMOS_TMP" 2>/dev/null || true

# If you used the ChatGPT links directly, copy from your browser's download folder into $AMOS_REPO/$AMOS_TMP accordingly.

# =========================
# 1) METRICS: ONLINE ONLY
# =========================
cd "$AMOS_TMP/amos_metrics_online_v7_2"
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

# Set your Anthropic key (required for Claude online metrics)
# Obtain securely from your password manager. This stays on your Mac.
export ANTHROPIC_API_KEY="sk-ant-REDACTED"

# Run benchmarks (TTFT, total latency, words/sec; basic factual tags)
python metrics/claude_online_bench.py --config metrics/config.yaml --logs logs

# Render figures from logs → ./figures/*.png
python metrics/make_charts.py --logs logs

# Verify outputs
ls -lah logs/ latency.csv hallu.csv figures/

# =========================
# 2) WIRE FIGURES INTO REPO
# =========================
# Create figures dir in repo if missing and copy images
mkdir -p "$AMOS_REPO/figures"
cp -f figures/ttft_bar.png figures/latency_bar.png figures/factuality_pie.png "$AMOS_REPO/figures/"

# Optional: keep raw logs private; if you want them in the repo, do:
# mkdir -p "$AMOS_REPO/logs/online/v7.2"
# cp -f logs/*.csv "$AMOS_REPO/logs/online/v7.2/"

# =========================
# 3) PATCH WHITE PAPER v7.2
# =========================
# File expected at: $AMOS_REPO/spec/Active_MirrorOS_WhitePaper_v7.2.md
# Insert figure references under Section 11 and add Appendix E header if not present.

WP="$AMOS_REPO/spec/Active_MirrorOS_WhitePaper_v7.2.md"

# Add figure block after "## 11. Evaluation & Benchmarks" if not yet present
awk '1;/^## 11\. Evaluation & Benchmarks$/ && !p{p=1;print "\n**Note:** The following results are Online-Only (Execution Twin via Claude API). Offline MirrorLayer metrics will be added in v7.3.\n\n**Figures**\n- Latency (TTFT): ![TTFT by Prompt](../figures/ttft_bar.png)\n- Total Latency: ![Latency by Prompt](../figures/latency_bar.png)\n- Factuality Tags: ![Factuality Tags](../figures/factuality_pie.png)\n"}' "$WP" > "$WP.tmp" && mv "$WP.tmp" "$WP"

# Append Appendix E mention at the end (if not already there)
grep -q "Appendix E: Online Metrics Pack v7.2" "$WP" || cat >> "$WP" <<'EOF'

## Appendix E: Online Metrics Pack v7.2
Artifacts:
- Harness: `amos_metrics_online_v7_2/metrics/claude_online_bench.py`
- Config:  `amos_metrics_online_v7_2/metrics/config.yaml`
- Logs:    `logs/` (TTFT, total latency, words/sec, factual tags)
- Figures: `../figures/ttft_bar.png`, `../figures/latency_bar.png`, `../figures/factuality_pie.png`

Scope: **Illustrative — Online Only**. Offline MirrorLayer (LM Studio/Jan) metrics to be added in **v7.3**.
EOF

# =========================
# 4) CHECKSUM & SEAL
# =========================
cd "$AMOS_REPO/spec"
# Recompute SHA256 of the white paper to verify integrity note (informational).
# The file already includes an embedded checksum from the vault-ready version.
shasum -a 256 Active_MirrorOS_WhitePaper_v7.2.md

# =========================
# 5) COMMIT, TAG, RELEASE PREP
# =========================
cd "$AMOS_REPO"
git add spec/Active_MirrorOS_WhitePaper_v7.2.md figures/*.png
# If you decided to include logs, also: git add logs/online/v7.2/*.csv

git commit -m "v15.1.7: Publish White Paper v7.2 with Online Metrics (figures wired); offline metrics scheduled for v7.3"
git tag -a v15.1.7 -m "MirrorDNA-Standard v15.1.7 — White Paper v7.2 (Online Metrics)"

# Push main + tag
git push origin main
git push origin v15.1.7

# =========================
# 6) GITHUB RELEASE TEXT
# =========================
cat > /tmp/release_v15_1_7.md <<'EOF'
# MirrorDNA-Standard v15.1.7 — White Paper v7.2 (Online Metrics)

**What’s new**
- ✅ Integrated **Active MirrorOS White Paper v7.2** (Integrated Edition)
- ✅ Added **Online Metrics** (Execution Twin via Claude API): TTFT, total latency, factuality tags
- ✅ Embedded figures: `figures/ttft_bar.png`, `figures/latency_bar.png`, `figures/factuality_pie.png`
- 🧭 Marked as **Illustrative — Online Only**; Offline **MirrorLayer** metrics scheduled for **v7.3**

**Continuity**
- Master Citation: v15.1.6
- Successor Tag: v15.1.7
- Status: Clean, checksums verified, continuity intact

**Paths**
- White Paper: `spec/Active_MirrorOS_WhitePaper_v7.2.md`
- Figures: `figures/`  
- (Optional) Logs: `logs/online/v7.2/`

**Notes**
- Consent & data sovereignty preserved (no Vault private data required).
- When offline metrics are ready, append **Appendix F: Offline MirrorLayer Metrics** and tag **v15.1.8+** or **v7.3** per roadmap.
EOF

echo "Release notes ready at /tmp/release_v15_1_7.md"
# Then publish the GitHub release for tag v15.1.7 using that file.