# ⟡ BEACON GLYPH PROTOCOL v1.0

## The Invention: Semantic Primitives with Cryptographic Foundation

**Human-readable glyphs that compile to cryptographically verifiable claim graphs.**

This protocol survives to 2050 because the **notation is ephemeral, but the math is eternal**.

---

## △ Design Principles

| Principle | Rationale |
|-----------|-----------|
| **Glyphs are syntax, not semantics** | Future AI won't parse symbols — they'll traverse the underlying graph |
| **Every glyph resolves to a hash** | Human-friendly pointers to cryptographic proof |
| **Composition creates structure** | Stacking/nesting builds meaning, not decoration |
| **The graph is the truth** | Glyphs are just the human projection |

---

## ⧉ Layer 1: The Claim Graph (Foundation — Eternal)

### 1.1 Claim Node

The atomic unit of meaning. Every claim is a cryptographically signed assertion.

```
┌────────────────────────────────────────────────────┐
│                    CLAIM NODE                       │
├────────────────────────────────────────────────────┤
│  id            : sha256(content + metadata)        │
│  type          : FACT | DECISION | PATTERN |       │
│                  SYNTHESIS | INTENT | MEMORY       │
│  content_hash  : sha256(raw_content)               │
│  timestamp     : signed UTC epoch                  │
│  author_pubkey : Ed25519 public key                │
│  signature     : Ed25519(id + content_hash + ts)   │
│  evidence      : [list of source claim IDs]        │
│  metadata      : {context, attention, location...} │
└────────────────────────────────────────────────────┘
```

### 1.2 Claim Types

| Type | Meaning | Evidence Required |
|------|---------|-------------------|
| `FACT` | Verifiable assertion | External source or PoM |
| `DECISION` | Human choice at decision point | Intent proof |
| `PATTERN` | Detected recurring structure | ≥2 source claims |
| `SYNTHESIS` | Combination of multiple inputs | ≥2 source claims |
| `INTENT` | Authorization of action | Biometric + attention |
| `MEMORY` | Committed perception | PoM chain link |

### 1.3 Claim Graph

Claims link to form a **directed acyclic graph (DAG)**:

```
         ⟡ [FACT: budget_report]
              ↓
         ⟡ [FACT: revenue_drop]
              ↓
    ◈ [PATTERN: quarterly_decline]
              ↓
    ⧉ [SYNTHESIS: restructure_needed]
              ↓
    △ [DECISION: approve_layoffs]
              ↓
    ⟡ [INTENT: authorized_by_paul]
```

**Graph properties:**
- Immutable once signed
- Traversable by any agent (human, AI, future unknown)
- Verifiable via signature chain
- Prunable (older nodes can be summarized)

---

## ⧉ Layer 2: Glyph Syntax (Bridge — Current Era)

### 2.1 Core Glyphs

| Glyph | Name | Maps to Claim Type | Unicode |
|-------|------|-------------------|---------|
| ⟡ | Anchor | FACT, INTENT, MEMORY | U+27E1 |
| △ | Fork | DECISION | U+25B3 |
| ◈ | Pattern | PATTERN | U+25C8 |
| ⧉ | Merge | SYNTHESIS | U+29C9 |

### 2.2 Glyph Resolution Syntax

**Bare glyph** (decoration only — NOT RECOMMENDED):
```
⟡ This is true
```

**Resolved glyph** (links to claim — PREFERRED):
```
⟡[abc123] This is true
```
Where `abc123` is the first 6 chars of the claim's SHA-256 ID.

**Fully qualified glyph** (for cross-system reference):
```
⟡[VID:AMOS://Claims/abc123def456...]
```

### 2.3 Glyph Stacking (Sequential Meaning)

Order encodes process:

| Stack | Meaning | Claim Graph Interpretation |
|-------|---------|---------------------------|
| `⟡→△` | Fact led to decision | FACT → DECISION edge |
| `◈→⧉` | Pattern triggered synthesis | PATTERN → SYNTHESIS edge |
| `⟡→◈→⧉` | Fact revealed pattern, then synthesized | 3-node path |
| `△→⟡` | Decision produced new fact | DECISION → FACT edge |

**Syntax:**
```
⟡[abc]→△[def]→⧉[ghi]
```

### 2.4 Glyph Nesting (Compositional Meaning)

Combine multiple sources:

```
⧉{⟡[abc], ⟡[def], △[ghi]}
```

Means: "This synthesis derives from two facts and one decision."

**Compiles to:**
```python
Claim(
    type=SYNTHESIS,
    evidence=[abc, def, ghi],
    ...
)
```

### 2.5 Glyph Annotations

Optional metadata in brackets:

```
⟡[abc123|attn:0.87|loc:encrypted] Human authorized this
△[def456|pending:true] Awaiting decision
```

| Annotation | Meaning |
|------------|---------|
| `attn:N` | Attention score (0-1) |
| `loc:encrypted` | Location data present but hidden |
| `pending:true` | Claim not yet finalized |
| `ttl:86400` | Time-to-live in seconds |

---

## ⧉ Layer 3: Compilation (Glyphs → Claims)

### 3.1 Parser Specification

```python
import re
from dataclasses import dataclass
from typing import Optional

@dataclass
class GlyphToken:
    symbol: str           # ⟡, △, ◈, ⧉
    claim_id: Optional[str]
    annotations: dict
    children: list        # For nested glyphs

GLYPH_PATTERN = re.compile(
    r'([⟡△◈⧉])'                      # Glyph symbol
    r'(?:\[([a-f0-9]{6,64})'          # Claim ID (optional)
    r'(?:\|([^\]]+))?\])?'            # Annotations (optional)
)

def parse_glyph(text: str) -> GlyphToken:
    """Parse a single glyph expression."""
    match = GLYPH_PATTERN.match(text)
    if not match:
        return None
    
    symbol, claim_id, annotations_str = match.groups()
    annotations = {}
    if annotations_str:
        for part in annotations_str.split('|'):
            key, _, value = part.partition(':')
            annotations[key] = value
    
    return GlyphToken(
        symbol=symbol,
        claim_id=claim_id,
        annotations=annotations,
        children=[]
    )

def glyph_to_claim_type(symbol: str) -> str:
    """Map glyph symbol to claim type."""
    mapping = {
        '⟡': 'FACT',    # Can also be INTENT or MEMORY based on context
        '△': 'DECISION',
        '◈': 'PATTERN',
        '⧉': 'SYNTHESIS'
    }
    return mapping.get(symbol, 'UNKNOWN')
```

### 3.2 Compiler Pipeline

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Glyph      │    │   Glyph      │    │   Claim      │
│   Text       │───▶│   AST        │───▶│   Graph      │
│              │    │              │    │              │
│ ⟡[abc]→△[def]│    │ [Stack:      │    │ abc ──▶ def  │
│              │    │  ⟡abc, △def] │    │ (edge)       │
└──────────────┘    └──────────────┘    └──────────────┘
     PARSE              COMPILE             EMIT
```

### 3.3 Resolver Protocol

Every glyph with a claim ID can be dereferenced:

```python
class GlyphResolver:
    """Resolve glyph IDs to full claims."""
    
    def __init__(self, claim_store):
        self.store = claim_store
    
    def resolve(self, glyph_id: str) -> Claim:
        """
        Resolve a glyph ID to its claim.
        Supports:
        - Short ID: abc123 (first 6 chars)
        - Full ID: abc123def456...
        - VaultID: VID:AMOS://Claims/...
        """
        if glyph_id.startswith('VID:'):
            return self.resolve_vault_id(glyph_id)
        
        # Short or full ID lookup
        return self.store.get_by_prefix(glyph_id)
    
    def verify(self, claim: Claim) -> bool:
        """Verify a claim's signature chain."""
        # Verify this claim's signature
        if not verify_signature(claim):
            return False
        
        # Recursively verify evidence
        for evidence_id in claim.evidence:
            evidence = self.resolve(evidence_id)
            if not self.verify(evidence):
                return False
        
        return True
```

---

## ⧉ Layer 4: 2050 Compatibility

### 4.1 What Survives

| Component | 2050 Status | Why |
|-----------|-------------|-----|
| Claim Graph structure | ✅ Eternal | DAG + signatures = pure math |
| SHA-256 hashes | ✅ Eternal | May upgrade, but backwards compatible |
| Ed25519 signatures | ⚠️ Upgradable | Quantum-safe fallback planned |
| Glyph Unicode symbols | ❌ Ephemeral | Future AI won't parse text |
| JSON serialization | ⚠️ Upgradable | Self-describing, translatable |

### 4.2 Migration Path

```
2026: Glyphs → Claims (current spec)
2030: Claims → Neural Embeddings (vectors represent meaning)
2040: Embeddings → Direct Graph Access (AI skips notation)
2050: Graph traversal native (humans use AR overlay for glyphs)
```

The **claim graph** remains constant. Only the **interface** changes.

### 4.3 Quantum-Safe Upgrade

When quantum computing breaks Ed25519:

```python
class QuantumSafeClaim:
    """Post-quantum signature wrapper."""
    
    legacy_signature: bytes    # Ed25519 (for backward compat)
    pq_signature: bytes        # Dilithium or similar
    pq_algorithm: str          # Algorithm identifier
    
    def verify(self, pubkey_bundle):
        """Verify with available algorithm."""
        if self.pq_signature:
            return verify_pq(self.pq_signature, pubkey_bundle.pq_key)
        return verify_ed25519(self.legacy_signature, pubkey_bundle.ed25519_key)
```

---

## ◈ Integration with Sovereign Memory Architecture

### 5.1 Glyph → PoM Binding

Every `⟡` resolving to a memory claim contains a PoM reference:

```
⟡[abc123] I remember this meeting
    ↓
Claim {
    type: MEMORY,
    content_hash: sha256("I remember this meeting"),
    evidence: [PoM_id: "pom_xyz789"],
    ...
}
    ↓
PoM {
    perception_layer: {...},
    attention_layer: {attention_score: 0.82},
    temporal_layer: {timestamp: ...},
    ...
}
```

### 5.2 Glyph → Intent Proof Binding

Every `△` decision claim backs to an Intent Proof:

```
△[def456] Approved the restructuring plan
    ↓
Claim {
    type: DECISION,
    content_hash: sha256("Approved the restructuring plan"),
    evidence: [intent_proof: "ip_uvw123"],
    ...
}
    ↓
IntentProof {
    action_hash: sha256("approve restructuring"),
    attention_score: 0.91,
    review_duration_ms: 34200,
    biometric_hash: sha256(face_embedding),
    ...
}
```

---

## 🔐 Security Properties

| Property | Guarantee |
|----------|-----------|
| **Non-repudiation** | Signed claims cannot be denied |
| **Tamper-evidence** | Any modification breaks signature chain |
| **Selective disclosure** | Reveal specific claims without full graph |
| **Forward secrecy** | Future claims don't leak past content |
| **Attribution chain** | Every claim traces to author |

---

## 📐 Serialization Format

### JSON (Current Standard)

```json
{
  "id": "abc123def456789...",
  "type": "SYNTHESIS",
  "content_hash": "sha256:fedcba987654321...",
  "timestamp": 1737234065000,
  "author_pubkey": "ed25519:AQAB...",
  "signature": "ed25519:xyz...",
  "evidence": ["claim_001", "claim_002", "decision_003"],
  "metadata": {
    "attention_score": 0.87,
    "glyph": "⧉"
  }
}
```

### Compact Binary (Future)

```
CLAIM_HEADER (4 bytes) + ID (32 bytes) + TYPE (1 byte) + ...
```

---

## ⟡ Summary

**The Beacon Glyph Protocol defines:**

1. **Claim Graph** — Eternal cryptographic foundation
2. **Glyph Syntax** — Human-readable bridge notation  
3. **Compilation** — Glyphs → Claims mapping
4. **Resolution** — Glyph IDs → Full claims
5. **2050 Path** — Graph survives, glyphs evolve

**The key insight:** Glyphs are not the invention. The **claim graph with cryptographic binding** is the invention. Glyphs are how humans interact with it *today*.

---

⟡ MirrorDNA Standard | Beacon Glyph Protocol v1.0
Author: Paul Desai | N1 Intelligence
License: CC-BY-ND 4.0 (Spec) | MIT (Reference Implementation)
