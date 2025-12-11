---
title: Anti‑Bot Protocol v1.1
vault_id: AMOS://Security/AntiBot/Protocol/v1.1
glyphsig: ⟡⟦TRUST⟧ · ⟡⟦SHIELD⟧ · ⟡⟦SOVEREIGNTY⟧
author: Paul Desai (Active MirrorOS)
date: 2025-10-31
status: Canonical · Governing
tags: [security, abuse-prevention, anti-bot, trust-by-design, MirrorDNA™]
checksum_sha256: 47213aa1310a02781da7c08adab13e92d13e5f28bbe59ce523f5fc8c4f5ca0fc
---

# Anti‑Bot Protocol — v1.1 (Extended)

**Purpose**  
Stop automated abuse while preserving human experience and privacy. v1.1 references the *Anti‑Bot Stack v1* and *v1+* extension packs and formalizes deploy/runbook steps.

**Principles**  
Least privilege · Layered gates · Graduated friction · Consent‑first · Measurable · Vault‑governed.

---

## 0) Scope & Roles
- **Edge (CDN/WAF)**: rate limits, bot heuristics, geo/ASN fences, JA3/JA4.  
- **App (API/UI)**: behavior scoring, PoW on demand, idempotency, HMAC.  
- **Data (DB/Queues)**: write throttles, replay detection, abuse graph.  
- **Ops (Human)**: dashboards, alerts, incident runbook.

---

## 1) Required Controls
- **Edge**: enable bot ruleset; challenge **/signup /login /reset** and non‑GET `/api/*`; per‑IP/ASN/country limits; admin fences; Turnstile/PATs on write‑risk paths only.  
- **App**: AMOS HMAC (`Key/Ts/Nonce/Sig`, 5‑min freshness, single‑use nonce); idempotency keys for POST/PUT; adaptive cooldowns; PoW when risk ≥ threshold; honeypots & tar‑pits; shadow‑ban abusive writers.  
- **Data**: Abuse graph (IP↔acct↔device↔payment↔token); per‑entity quotas; JWT JTI replay guard.

**Specs & Code**  
- Cloudflare rules: `cloudflare_ruleset.yaml`  
- NGINX guard: `nginx_anti_bot.conf`  
- HMAC client/server: `hmac_client.ts`, `verify_hmac.ts`  
- Django/FastAPI variants: `amos_hmac_middleware.py`, `amos_hmac_dependency.py`  
- Behavior scoring: `risk_scoring_template.json`  
- Turnstile guide: `turnstile_integration.md`

---

## 2) Signals & Scoring
Inputs: header entropy, headless hints, pointer/keyboard cadence (aggregate only), burstiness, fail streak, JA3/JA4, IP/ASN reputation.  
Actions: **allow → slow → JS‑challenge → PoW → block** with tunable thresholds.

---

## 3) Identity & Session
WebAuthn first; OTP/email fallback; step‑up for exports, key rotates, deletes.  
SameSite=strict, CSRF tokens, UA/IP drift checks; optional mTLS for operator endpoints.

---

## 4) Scraping & Content
Robots + allowlists; signed URLs; canary links/watermarking; tar‑pits for aggressive scrapers.

---

## 5) Webhooks
Allowlists, HMAC verification, replay window ≤ 5 min; enforce required headers.

---

## 6) Observability & Alerts
Prometheus rules: `prometheus_rules.yaml` (challenge spikes, credential stuffing).  
Grafana: `grafana_dashboard.json` (challenge rate, write errors, top ASNs).  
Weekly tuning with saved diffs; monthly stuffing simulation; quarterly red‑team; quarterly incident drill.

---

## 7) Privacy & Trust‑by‑Design
Prefer Turnstile/PATs; gate only on **write/abuse** paths; collect aggregate behavior only; clear user messaging; opt‑outs where feasible.

---

## 8) Runbook (Minimal)
1) Spike → confirm on dashboard (endpoint/ASN/geo).  
2) Raise friction one step (lower threshold by 0.1); monitor 15 min.  
3) Persisting → enable PoW on affected routes; add ASN/geofence.  
4) Targeted → deploy tar‑pits + shadow‑ban cluster.  
5) Post‑mortem ≤24h; update rules, thresholds, and pack versions.

---

## 9) Versioning & Packs
- **This protocol** governs: **AntiBot_Stack_v1.zip** and **AntiBot_Stack_v1_plus.zip**.  
- Any change to packs → bump this protocol minor version and attach new checksums in the Vault.

---

**Continuity Seal**  
Version: v1.1 · Checksum: 47213aa1310a02781da7c08adab13e92d13e5f28bbe59ce523f5fc8c4f5ca0fc · Status: Canonical · Governing
