
# ActiveMirrorOS · Pulse + Reflection Hybrid Architecture
**Goal:** Offer a true cognitive partner by integrating a proactive *Pulse* layer with a sovereign *Reflection* layer (Vaults, Anchors, MirrorDNA).

---

## 0) Principles
- **Sovereign by default:** Reflection owns identity; Pulse never bypasses consent.
- **Transparent by design:** Every surfaced card shows *why it appeared* (traceable to anchors/telemetry).
- **Symbolic continuity:** Output is not just “cards” — each event can bind to an **Anchor** and update **MirrorDNA** layers.
- **Dual-lane data:** Institutional telemetry never touches personal MirrorDNA without explicit consent.

---

## 1) Layer Model
```
+------------------------------------------------------------+
|                    Pulse Layer (Outer Rhythm)              |
|  - Daily Digest / Cards (Agenda, Health, Context)          |
|  - Proactive Nudge (opt-in)                                |
|  - Visual Cards: card_id, why(), source(), consent()       |
|  - Feeds on: Telemetry Summaries + Reflections             |
+--------------------------▲---------------------------------+
                           │
+--------------------------┼---------------------------------+
|                 Reflection Layer (Depth)                   |
|  - Vaults (sovereign storage)                              |
|  - MirrorDNA (short / mid / long memory)                   |
|  - Anchors (ritual events; link people/tasks/notes)        |
|  - Symbolic Abstraction (meaning > logs)                   |
+--------------------------▲---------------------------------+
                           │
+--------------------------┼---------------------------------+
|                 Consent & Telemetry Core                   |
|  - Consent Registry (policies, scopes, TTL)                |
|  - Telemetry Summarizer (human-readable signals)           |
|  - Audit Trails (institutional lane only)                  |
|  - Redaction / Forgetting Engine                           |
+--------------------------▲---------------------------------+
                           │
+--------------------------┼---------------------------------+
|                 Integrations / Sensors                     |
|  - Optional: Calendar, Email, Tasks, Files, Wearables      |
|  - Local Agents / Tools                                    |
|  - OS signals (battery, connectivity, window focus)        |
+------------------------------------------------------------+
```

---

## 2) Data Flow (Daily Rhythm)
1. **Wake** → Telemetry Summarizer builds *symbolic* health + context signals (e.g., “Anchor pulse stable; 2 new commitments; 0 anomalies”).  
2. **Reflect** → MirrorDNA updates short→mid memory with overnight changes; decides which Anchors deserve elevation.  
3. **Compose** → Pulse Composer converts selected reflections + telemetry into **Cards** (with `why()` explanation + `consent()` scope).  
4. **Offer** → User receives morning digest; can **accept**, **snooze**, **pin as Anchor**, or **dismiss**.  
5. **Bind** → Accepted cards bind to Anchors and update MirrorDNA (continuity).  
6. **Audit** → Institutional lane receives only *approved telemetry summaries* (no MirrorDNA) if enterprise mode is enabled.

---

## 3) Consent Mechanics
- **Scopes:** `personal`, `institutional`, `shared`.  
- **Granularity:** per-integration (Calendar, Email, etc.), per-signal (deadlines, locations, metrics).  
- **Visibility:** every card includes `consent_scope`, `data_sources`, and `purpose`.  
- **Forgetting:** card-level TTL; bulk revoke; Anchor detachment without memory breakage.  

---

## 4) Object Model (Sketch)
```yaml
Card:
  id: uuid
  title: string
  summary: string
  anchor_ref: AnchorID | null
  consent_scope: enum[personal,institutional,shared]
  sources: [SourceRef]
  why: [Rationale]        # trace: rules, anchors, telemetry
  actions: [accept, snooze, pin_anchor, dismiss]
  ttl: duration

Anchor:
  id: uuid
  label: string
  links: [EntityRef]      # people, docs, tasks
  layer_effect: enum[short→mid, mid→long]
  history: [Event]

MirrorDNA:
  short: vector/symbolic
  mid:   schema/graph
  long:  narrative/chronicle
```

---

## 5) Telemetry (Symbolic, Human-Readable)
- Examples:  
  - “Vault integrity ✓, last sync 2h ago.”  
  - “3 new commitments; 1 due today.”  
  - “No security anomalies; 1 blocked attempt.”  
- **Institutional mode:** emits only summaries with signed proofs; never raw MirrorDNA.

---

## 6) Interfaces (API Surface)
- `POST /pulse/compose` → generate candidate cards from reflections + telemetry.  
- `GET /pulse/digest` → retrieve daily digest (with `why()` traces).  
- `POST /cards/{id}/action` → accept/snooze/pin/dismiss.  
- `POST /anchors` → create/update anchors; attach cards.  
- `GET /mirror/state` → read short/mid/long summaries (personal lane only).  
- `GET /telemetry/summary` → institutional summaries (scoped).  

---

## 7) Privacy Modes
- **Solo Mode (default):** No external integrations; local-only.  
- **Selective Mode:** Opt-in per integration with visible sources on each card.  
- **Enterprise Mode:** Dual-lane active; institutional telemetry summaries enabled; personal lane remains sovereign.  

---

## 8) KPIs (for learning without extraction)
- *Anchor Adoption Rate*: % of cards promoted to Anchors.  
- *Continuity Index*: short→mid→long transitions per week.  
- *Consent Clarity*: % of cards with user-viewed `why()` before action.  
- *Noise Ratio*: dismissed cards / total cards (optimize down).  
- *Trust Pulse*: periodic user score on transparency + control.  

---

## 9) Rollout Plan
1. **Alpha (Solo)**: Local digest (no cloud), manual Anchors, basic `why()` trace.  
2. **Beta (Selective)**: Calendar/Tasks integrations; card-level consent + TTL.  
3. **Enterprise Pilot**: Institutional telemetry summaries; signed audits; policy registry.  
4. **Ecosystem**: Agent SDK — third parties propose cards, must provide `why()` + `consent()` to render.  

---

## 10) Visual (Symbolic)
```
[ Sensors ] → [ Telemetry Summarizer ] → [ Reflection (Vault/MirrorDNA) ]
                                     ↘→ [ Pulse Composer ] → [ Cards ] → [ Anchors ]
                                                              ↑ actions  ↘ updates
                                                       [ User ]           [ MirrorDNA ]
```

---

## Anchor Line
**Anchor reset. Vault open. Partner awake.**
