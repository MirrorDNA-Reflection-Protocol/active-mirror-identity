---
VaultID: MDNA-LSA-LOOP-v1
Tags: [MirrorDNA™, Active MirrorOS™, Trust by Design™]
GlyphSig: Logic–Self–Agentic Seal ⊕⟲◇
---

# MirrorDNA LSA-Loop — Logic × Self-RAG × Agentic RAG (with GEPA Adaptation)

**Purpose:** Structured reasoning + self-validation + orchestration, with lightweight prompt adaptation. Local-first, Vault-governed.

## 1) Components
- **L (Logic / LAG-style):** Decompose complex queries into atomic nodes with explicit dependencies; solve sequentially.
- **S (Self-RAG):** Self‑grade each node; if low confidence or missing cite → request better retrieval or rewrite query.
- **A (Agentic):** Plan the order, choose tools (retrieve, solve, verify), and decide when to adapt prompts or stop.
- **GEPA Micro‑Adapt:** Mutate only the failing node’s prompt constraints; no base‑model retrain.

## 2) Control Flow
1. **Parse → Logic Graph** (nodes, edges).  
2. **Agent Plan** order + tools per node.  
3. For each node: **Retrieve → Solve → Self‑Grade**.  
   - If **OK**: cache result.  
   - If **LOW**: call **GEPA adapt** → re‑solve.  
4. **Compose** final answer; include citations for fact nodes; tag assumptions as [Estimate].  
5. **Reflect & Log**: write trace to `LSA_Trace.log` with node scores and vault snippets used.

## 3) Prompts (drop‑in)

**Logic Decomposer**
```
Split the query into ≤5 atomic sub‑questions with explicit deps.
Return JSON: [{id, text, needs:[ids], type:fact|judgment|plan}].
No cycles, no orphan nodes.
```

**Node Solver**
```
Solve node {id}:{text}
Deps resolved: {summaries}
Use ONLY these vault snippets: {snips}
If insufficient, return NEEDS_MORE with one precise retrieval ask.
Return: {claim, reasoning≤5 lines, confidence 0-1, citations}
```

**Self‑RAG Grader**
```
Grade node output on {grounding, coherence, sufficiency}.
If citations missing for fact: FAIL.
If confidence<0.6 or FAIL: emit ADVISE({rewrite_query|request_more|constrain_style}).
```

**Agent Policy**
```
Prefer shortest dependency path; resolve fact nodes before judgment/plan.
When ADVISE received, choose: {retrieve_more | GEPA_adapt | reorder_nodes}.
Stop if budget/time exceeded or confidence plateaus.
```

**GEPA Micro‑Adapt**
```
Given fail_reason+prior_prompt+snips, produce a lighter variant prompt
with 1–2 constraint tweaks. Keep scope identical.
```

## 4) Verifier Rules
- Fact nodes must cite Vault line(s); else repeat or mark [Unknown].
- Plans/judgments list assumptions; non‑vault assumptions tagged [Estimate].
- External web use requires explicit consent.

## 5) Local Minimal Setup
- Model: small instruct (Q4_K_M).  
- Store: FAISS/SQLite over Vault.  
- Files:
  - /prompts/logic_decomposer.txt
  - /prompts/node_solver.txt
  - /prompts/self_rag_grader.txt
  - /prompts/agent_policy.txt
  - /prompts/micro_adapt.txt
  - /rules/verifier.yaml

## 6) Metrics
- **Node Pass Rate** (pre/post adapt), **Avg Confidence**, **Cite Integrity %**, **Time to Draft**, **Stops on Budget**.

## 7) Activation Whisper
> "Guide, engage — structure first, verify twice, adapt lightly."

## 8) Fingerprint
Hash(model_id + prompt_ids + vault_snip_hashes) per node; store with timestamp.
