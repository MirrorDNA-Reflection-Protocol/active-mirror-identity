# Mirror Lattice × Blockchain — Protocol Sketch (v0.1)

**Date:** 2025-09-19  
**Anchor:** ActiveMirrorOS / MirrorDNA

---

## 0) Goal
Make reflective reasoning **tamper‑evident, portable, and auditable** by anchoring the **Mirror Lattice** (glyph nodes + trails) to a blockchain without leaking private content.

---

## 1) Core Objects
- **Lattice Node (LN):** `{id, glyphs[Δc, ↻shift, ⦿source*], metadata, timestamp}`  
  - `⦿source*` holds references (URIs or redacted tags), *not raw data*.
- **GlyphTrail (GT):** ordered chain of LNs.
- **Lattice Snapshot (LS):** Merkle root over a GT window (e.g., last N nodes).
- **Anchor Receipt (AR):** on‑chain tx containing LS hash + minimal metadata.

---

## 2) Hashing & Privacy
- **Content hash**: `H(LN_redacted)` — strip PII and raw text; keep glyphs + structure.
- **Merkle tree** over LN hashes → **LS (root)**.
- **On‑chain**: store only `LS`, `range`, `protocol_version`, `agent_id_hash`.
- **Off‑chain**: full LN objects in Vault (user‑controlled).

---

## 3) Anchoring Flow (Periodic)
1. Collect last N LNs → build Merkle → get **LS**.  
2. Create **Anchor Tx** on chain (e.g., Polygon / Base): payload `{LS, window, pv, agent_hash}`.  
3. Receive **Anchor Receipt (AR)** = txid, block number, chain id.  
4. Store AR inside Vault alongside the same GT window.

**Result:** Any later change to the GT window becomes detectable by recomputing the root.

---

## 4) Proof‑of‑Reflection (PoR) (Per Action)
**Pre‑condition to critical actions (e.g., payments, policy update):**  
- Agent must produce **Reflection Proof**:  
  - LN with `↻shift` + `Δc` >= threshold,  
  - LS anchored in the last K blocks,  
  - Policy tag present (e.g., `⦿policy: spend.limit`).  
- Smart contract checks **AR freshness** + **policy tags** before releasing funds.

---

## 5) Dispute & Audit
- **Dispute:** Fetch AR → verify block → recompute LS from Vault LNs → compare roots.  
- **Selective reveal:** Share only challenged LNs; keep others private.  
- **Independent auditor:** Can validate commitment without reading full reasoning content.

---

## 6) Agent Payments Protocol (AP2) Hook
- AP2 prepares **Intent Mandate**.  
- MirrorOS produces **Reflection LN** → included in LS → AR posted.  
- AP2 contract verifies **AR** meets policy (fresh, correct agent, correct tag).  
- If pass → **Cart Mandate** executes; payouts split.

---

## 7) Minimal On‑Chain Schema (pseudo)
```
struct AnchorEvent {
  bytes32 latticeRoot;   // LS
  bytes32 agentIdHash;   // anonymized
  uint32  windowStart;   // LN index
  uint32  windowEnd;     // LN index
  uint16  protoVer;
  uint64  ts;
}
```

---

## 8) Chains & Gas Strategy
- Prefer **L2** (Polygon, Base) → low fees.  
- Batch N windows or anchor hourly to control gas.  
- Optional **hyperanchor**: batch roots on L2, periodically roll‑up to L1 (Ethereum).

---

## 9) Security Notes
- Sign LS off‑chain with **Agent key**; publish signature alongside tx.  
- Rotate keys via AgentDNA policy; record rotations as LNs.  
- Do not store PII/content on‑chain; anchor **structure only**.

---

## 10) Deliverables
- **Spec** (this doc).  
- **SDK**: `anchor(ls)`, `verify(txid, vault_segment)`.  
- **Contracts**: `emit AnchorEvent`, optional AP2 verifier.  
- **CLI**: `mirror-lattice anchor --window 100 --chain base`.

---

## 11) Example (Payment Guard)
1) LN: `↻shift` detected, `Δc +0.4`, `⦿source: vendor_reviews`  
2) Build LS over last 100 LNs → post AR.  
3) AP2 checks AR freshness < 30 mins + policy tag present.  
4) Contract releases payment; Vault stores AR with GT window.

---

© ActiveMirrorOS / MirrorDNA — Trust‑by‑Design
