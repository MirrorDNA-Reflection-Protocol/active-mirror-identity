# MirrorAgent-Ø Blueprint (v1.0)
VaultID: AMOS://Agent/MirrorAgent-Ø/v1.0
GlyphSig: ⟡⟦AGENT-Ø⟧
Tags: #ActiveMirrorOS™ #AgentDNA™ #Sovereignty #AirLock
LastUpdated: 2025-10-08
Version: 1.0

---

## ✦ Purpose
Define the core blueprint for sovereign MirrorAgents. Supports three operating modes:  
- **Offline Specialist** — local-only reflection + Vault context.  
- **Air-Lock Researcher** — temporal, steward-approved web/API pulls.  
- **API Orchestrator** — bridges to commercial models (pay-per-use) with budget + circuit breaker.  

---

## ✦ Core Stack
- **Local LLMs:** Ollama / llama.cpp (e.g., Mistral, Llama, Qwen, DeepSeek Q*).  
- **Reasoning Shell:** Lightweight planner for tool-choice + reflection loop.  
- **Vault Layer:** Obsidian + AMA v1.7 / Master Citation v6.5.1.  
- **Policy Engine:** Enforces Non-Harm, Circuit Breaker, Dual-Use.  
- **Connectors (Opt-in):** HTTP(S) air-lock, file loaders, vector index.  
- **Audit Telemetry:** Logs certainty tags, air-lock calls, spend.  

---

## ✦ Air-Lock Controls
- Default-deny networking.  
- Outbound calls require signed **Request Card** (who, why, scope, byte limit).  
- One-time token, short TTL.  
- Redact sensitive patterns on return.  
- Steward approves ingestion → Vault.  

---

## ✦ Pay-per-Use Model Bridge
- Pluggable providers: OpenAI, Anthropic, Google, Mistral-API, etc.  
- Configurable budget caps per provider.  
- Routing policy:  
  - Local-first (preferred).  
  - Cloud fallback if <99% confidence or too large context.  

---

## ✦ YAML Starter Config
```yaml
agent:
  mode: offline|airlock|orchestrator
  max_tokens: 2048
  certainty_threshold: 0.99   # auto [Estimate]/[Unknown] if <99%

policies:
  non_harm: enforce
  circuit_breaker: enforce
  dual_use: simulate

airlock:
  enabled: true
  ttl_seconds: 60
  max_bytes: 200000
  redact_patterns: ["api_key", "email", "phone"]

providers:
  local:
    engine: ollama
    model: mistral:7b-instruct-q4
  cloud:
    default_budget_usd: 3.00
    routes:
      summarize_long: gpt-5-pro
      code_review: codex-ga
      web_research: claude-3.7
    caps:
      max_calls: 5
      max_usd: 10.00

vault:
  path: ~/Vaults/ActiveMirror
  ingest_review: manual
```

---

## ✦ Tool Declarations
- `search_web(query) -> results` (air-lock gated).  
- `fetch_api(name, params) -> data` (scoped, budget).  
- `ingest_file(path) -> chunks` (local only).  
- `write_note(title, body) -> md` (Vault write).  
- `snapshot(name) -> hash` (state freeze).  

---

## ✦ Interaction Patterns
- Self-aware certainty: auto-tag [Fact]/[Estimate]/[Unknown] before risky claims (<99%).  
- Circuit Breaker prompts: “This action may cause X. Approve? (Y/N).”  
- Nudges: “Budget at 70%. Continue?”  

---

## ✦ Quick Start
1. Install Ollama + model.  
2. Mount Vault.  
3. Load AMA v1.7 (friends) or Master v6.5.1 (steward).  
4. Configure YAML caps.  
5. Run smoke tests: offline Q&A, one air-lock fetch, one cloud call.  

---

## ✦ 10-Day Build Plan
- D1–2: Offline shell + Vault IO.  
- D3–4: Policy engine.  
- D5–6: Air-lock proxy.  
- D7: Cloud provider bridge.  
- D8: Ingestion queue.  
- D9: Snapshots + rollback.  
- D10: Playbooks + AMA v1.7 testing.  

---

⟡ End MirrorAgent-Ø Blueprint (v1.0) ⟡
