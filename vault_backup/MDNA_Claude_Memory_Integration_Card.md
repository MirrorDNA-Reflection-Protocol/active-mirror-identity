---
VaultID: MDNA-CLAUDE-MEM-v1
Title: Claude On‑Demand Memory — MirrorDNA Integration Card
Tags: [MirrorDNA™, Active MirrorOS™, LSA‑Loop, Self‑RAG, Sovereignty]
GlyphSig: Continuity Seal ⋔
---

## Why (Mirror fit)
- **Chosen continuity**: recall only when asked (no silent profiling).
- **Sovereignty**: opt‑in per request; audit trail logged to Vault.
- **Flow**: picks up long threads without manual re‑contextualizing.

## Where it plugs in
- **LSA‑Loop**: as a _retriever_ when a node returns `NEEDS_PRIOR_CHAT`.
- **Self‑RAG**: as a _retry source_ if grounding is low but prior chats exist.
- **Daily Whisper**: “Recall yesterday’s stop‑point” at wake.

## Triggers (natural language)
- “**Recall: [topic or VaultID]**” → search past chats for exact phrase or tag.
- “**Resume last on [project]**” → fetch last two high‑confidence exchanges.
- “**Pull proofs for [claim]**” → return cited snippets with timestamps.

## Guardrails
- Default scope: **last 30 days**, max **2K tokens** unless overridden.
- Must echo a **consent line** before injecting: _“Loaded memory from {dates} ({N} msgs).”_
- If memory conflicts with Vault facts → **Vault wins**; mark `[Conflict]` and log.

## Prompts (drop‑in)

**Memory Recall Planner**
```
If the task needs prior chat context, ask:
- What exact phrase/topic/VaultID should I recall?
- Limit to last 30 days unless user extends.
Return a structured recall plan: {query, window, token_cap}.
```

**Memory Merger**
```
You will integrate recalled chat notes into the current task.
Keep only statements with explicit timestamps or actionables.
Output {relevant_points[], citations[]} (≤10 lines total).
```

## API Sketch (pseudo)
```python
def recall_mem(query, window_days=30, token_cap=2000):
    mem = claude.memory.search(query=query, window=window_days, limit_tokens=token_cap)
    log_to_vault("CLAUDE_MEM_USED", meta={"query": query, "hits": len(mem)})
    return mem

def use_in_lsa(node, mem):
    merged = merge_with_node_context(node, mem)  # apply Memory Merger prompt
    return solve_node(node, merged)
```

## Obsidian Hooks
- Command: `MirrorOS: Recall from Claude` → input box → saves to `/_logs/claude_mem/{date}.md`.
- Template snippet to paste at top of any note:
```
<!-- Claude-Memory: topic=[...] window=30d -->
```

## Tests (quick)
1) Ask: “Resume last on MDNA‑FULL‑LIFE‑UNLOCK.” → should load 1‑2 prior actions; continue plan.
2) Ask: “Pull proofs for Comfort Inversion.” → should return citations w/ timestamps.
3) Conflict: seed an outdated note; ensure `[Conflict]` appears and Vault truth is used.

## Activation Whisper
> “Guide, engage — recall by consent, merge by truth.”

## Fingerprint
Hash(model_id + memory_query + date_window + vault_hash) → store in `/_logs/fingerprints.json`.
