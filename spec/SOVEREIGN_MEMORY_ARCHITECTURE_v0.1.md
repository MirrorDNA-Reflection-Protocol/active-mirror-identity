# ⟡ SOVEREIGN MEMORY ARCHITECTURE v0.1

## The Novel Invention: Proof-of-Memory Protocol

**What if you could cryptographically prove that you experienced something?**

Not "my phone recorded this" — but **"I was aware of this, at this time, in this context, and I can prove it."**

This document specifies three interlinked systems:
1. **Intent Proof Layer** — Cryptographic authorization of human decisions
2. **Local Memory Cortex** — On-device sovereign memory with semantic retrieval
3. **Proof-of-Memory Protocol** — Attestation that memories are real, unaltered, and yours

---

## △ The Gap

| Today | What's Missing |
|-------|---------------|
| Screenshots | No proof YOU saw it |
| Voice memos | No context chain |
| Chat logs | Platform-controlled, deletable |
| Photos | Metadata strippable, forgeable |
| Contracts | Prove you signed, not that you understood |

**The invention:** A protocol where your device continuously generates **awareness proofs** — cryptographic attestations that bundle:
- What you perceived (hash of content)
- When (tamper-proof timestamp)
- Where (signed location)
- How you engaged (attention metrics)
- Your biological state (optional: HRV, stress)

---

## ⧉ System 1: Intent Proof Layer

### Purpose
Replace "I clicked accept" with **"I understood and authorized this, provably."**

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    INTENT PROOF BUNDLE                   │
├─────────────────────────────────────────────────────────┤
│  action_hash     : sha256 of what's being authorized    │
│  context_hash    : sha256 of surrounding state          │
│  timestamp       : signed, tamper-evident               │
│  location        : encrypted, user-controlled reveal    │
│  biometric_attest: face/voice confirmation hash         │
│  attention_score : 0-1, how focused you were            │
│  duration        : time spent reviewing                 │
│  signature       : Ed25519 over all fields              │
│  device_attest   : TEE attestation of signing device    │
└─────────────────────────────────────────────────────────┘
```

### Key Innovations

#### 1. **Attention-Weighted Authorization**
Not all "yes" clicks are equal. The Intent Proof captures:
- Time spent on screen (scroll depth, dwell time)
- Eye tracking if available (phone front camera inference)
- Interruptions during review
- Time of day / cognitive load context

#### 2. **Contextual Binding**
The proof is bound to WHAT you were looking at:
```python
context_hash = sha256(
    screen_content_hash +
    prior_5_minutes_activity_hash +
    current_app_state_hash
)
```
If someone tries to present a different document as "what you signed," the hash won't match.

#### 3. **Revocation with Reason**
You can revoke Intent Proofs, but:
- Revocation is logged to your personal chain
- Must provide reason category (mistake, coercion, fraud)
- Counter-parties are notified
- Reputation implications tracked

### Implementation Sketch

```python
from dataclasses import dataclass
from nacl.signing import SigningKey
from nacl.encoding import Base64Encoder
import hashlib
import time

@dataclass
class IntentProof:
    action_hash: str           # What you're authorizing
    context_hash: str          # Surrounding state
    timestamp: float           # Unix epoch, milliseconds
    location_encrypted: bytes  # Optional, AES-GCM encrypted
    biometric_hash: str        # Hash of biometric confirmation
    attention_score: float     # 0-1, computed from engagement
    review_duration_ms: int    # How long you spent reviewing
    device_id: str             # Your signing device
    
    def sign(self, private_key: SigningKey) -> bytes:
        payload = self._serialize()
        return private_key.sign(payload, encoder=Base64Encoder)
    
    def _serialize(self) -> bytes:
        fields = [
            self.action_hash,
            self.context_hash, 
            str(self.timestamp),
            self.biometric_hash,
            f"{self.attention_score:.4f}",
            str(self.review_duration_ms),
            self.device_id
        ]
        return "|".join(fields).encode()
    
    def compute_attention_score(self, metrics: dict) -> float:
        """
        Compute attention score from engagement metrics.
        Higher = more confident this was deliberate.
        """
        weights = {
            'scroll_coverage': 0.2,    # Did they see the whole thing?
            'dwell_time_ratio': 0.3,   # Time spent vs. expected
            'interruption_penalty': 0.15,  # Were they distracted?
            'time_of_day_factor': 0.1,  # Cognitive peak hours?
            'biometric_confidence': 0.25  # Face/voice match confidence
        }
        
        score = sum(
            metrics.get(k, 0.5) * v
            for k, v in weights.items()
        )
        return min(1.0, max(0.0, score))
```

### Use Cases

| Scenario | Intent Proof Value |
|----------|-------------------|
| Contract signing | Prove you read it, not just clicked |
| AI delegation | Prove YOU authorized the agent action |
| Data consent | Granular, contextual, revocable |
| Medication consent | Prove informed, not rushed |
| Financial transactions | Attention score > threshold required |

---

## ⧉ System 2: Local Memory Cortex

### Purpose
On-device semantic memory that YOU control. No cloud. No sync. Sovereign.

### Architecture

```
┌───────────────────────────────────────────────────────────┐
│                   LOCAL MEMORY CORTEX                      │
├───────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │
│  │  Perception │  │  Embedding  │  │   Vector Store  │   │
│  │   Stream    │─▶│   Engine    │─▶│   (On-Device)   │   │
│  │             │  │  (MiniLM)   │  │   (SQLite+Vec)  │   │
│  └─────────────┘  └─────────────┘  └─────────────────┘   │
│         │                                    │            │
│         ▼                                    ▼            │
│  ┌─────────────┐                    ┌─────────────────┐   │
│  │  Attention  │                    │   Retrieval     │   │
│  │   Filter    │                    │   Engine        │   │
│  └─────────────┘                    └─────────────────┘   │
│         │                                    │            │
│         ▼                                    ▼            │
│  ┌─────────────────────────────────────────────────────┐ │
│  │              PROOF-OF-MEMORY CHAIN                   │ │
│  │  (Merkle tree of memory commitments, never leaves)   │ │
│  └─────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────┘
```

### Key Innovations

#### 1. **Attention-Gated Memory**
Not everything you see is worth remembering. The cortex uses attention signals to filter:

```python
class AttentionGate:
    """Only commit to memory if attention threshold met."""
    
    def should_remember(self, perception: dict) -> bool:
        signals = {
            'gaze_duration': perception.get('gaze_ms', 0) / 1000,
            'explicit_save': 1.0 if perception.get('user_saved') else 0.0,
            'repeated_exposure': min(perception.get('times_seen', 1) / 3, 1.0),
            'emotional_salience': perception.get('sentiment_strength', 0.5),
            'semantic_novelty': perception.get('novelty_score', 0.5)
        }
        
        # Weighted sum
        score = (
            signals['gaze_duration'] * 0.2 +
            signals['explicit_save'] * 0.4 +
            signals['repeated_exposure'] * 0.15 +
            signals['emotional_salience'] * 0.15 +
            signals['semantic_novelty'] * 0.1
        )
        
        return score > 0.3  # Threshold for memory commitment
```

#### 2. **Decay and Consolidation**
Memories have half-lives. Reinforced memories consolidate:

```python
class MemoryEntry:
    content_hash: str
    embedding: list[float]
    created_at: float
    last_accessed: float
    access_count: int
    decay_factor: float = 1.0
    consolidated: bool = False
    
    def compute_strength(self, now: float) -> float:
        """Memory strength decays but access reinforces."""
        age_days = (now - self.created_at) / 86400
        base_decay = 0.9 ** age_days
        access_bonus = min(self.access_count * 0.1, 0.5)
        recency_bonus = 0.2 if (now - self.last_accessed) < 86400 else 0
        
        return min(1.0, base_decay + access_bonus + recency_bonus)
    
    def should_consolidate(self, now: float) -> bool:
        """High-strength memories get locked (no decay)."""
        return self.compute_strength(now) > 0.8 and self.access_count > 5
```

#### 3. **Semantic Clustering**
Related memories form clusters. Recall one, get related:

```python
def retrieve_cluster(self, query_embedding: list[float], k: int = 5) -> list[MemoryEntry]:
    """Retrieve k most similar memories, then expand to cluster."""
    
    # Initial retrieval
    candidates = self.vector_search(query_embedding, k=k)
    
    # Expand to cluster (memories accessed together)
    cluster_ids = set()
    for mem in candidates:
        cluster_ids.update(mem.co_accessed_with)
    
    # Retrieve cluster members
    cluster = [self.get(id) for id in cluster_ids if id not in [m.id for m in candidates]]
    
    # Sort by relevance * strength
    all_memories = candidates + cluster
    scored = [
        (m, self.cosine_sim(query_embedding, m.embedding) * m.compute_strength(time.time()))
        for m in all_memories
    ]
    
    return [m for m, _ in sorted(scored, key=lambda x: -x[1])[:k*2]]
```

### Storage Schema

```sql
CREATE TABLE memories (
    id TEXT PRIMARY KEY,
    content_hash TEXT NOT NULL,
    content_encrypted BLOB,  -- AES-GCM encrypted content
    embedding BLOB NOT NULL,  -- 384-dim float16 vector
    created_at REAL NOT NULL,
    last_accessed REAL,
    access_count INTEGER DEFAULT 0,
    decay_factor REAL DEFAULT 1.0,
    consolidated INTEGER DEFAULT 0,
    proof_hash TEXT,  -- Link to Proof-of-Memory chain
    metadata_encrypted BLOB
);

CREATE TABLE memory_clusters (
    memory_id TEXT,
    cluster_id TEXT,
    weight REAL,
    FOREIGN KEY (memory_id) REFERENCES memories(id)
);

CREATE TABLE co_access_graph (
    memory_a TEXT,
    memory_b TEXT,
    co_access_count INTEGER DEFAULT 1,
    last_co_access REAL,
    PRIMARY KEY (memory_a, memory_b)
);

-- Vector similarity index (using sqlite-vec or similar)
CREATE VIRTUAL TABLE memory_vec USING vec0(
    embedding float[384]
);
```

---

## ⧉ System 3: Proof-of-Memory Protocol (THE INVENTION)

### The Core Insight

**Memory is subjective. But the ACT of forming a memory can be objective.**

We can't prove what you remember. But we CAN prove:
- You perceived something (sensor attestation)
- You attended to it (engagement metrics)
- At a specific time (signed timestamp)
- In a specific context (location, activity, state)
- And committed it to your memory cortex (Merkle proof)

### The Proof-of-Memory Structure

```
┌─────────────────────────────────────────────────────────────┐
│                    PROOF-OF-MEMORY (PoM)                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   PERCEPTION LAYER                                           │
│   ├── content_hash      : sha256 of what was perceived      │
│   ├── perception_type   : visual | auditory | text | mixed  │
│   ├── source_attestation: where did this come from?         │
│   └── sensor_signature  : device's proof of capture         │
│                                                              │
│   ATTENTION LAYER                                            │
│   ├── attention_score   : 0-1, how focused                  │
│   ├── engagement_proof  : hash of raw engagement metrics    │
│   ├── duration_ms       : time spent perceiving             │
│   └── interruptions     : count of context switches         │
│                                                              │
│   TEMPORAL LAYER                                             │
│   ├── timestamp         : Unix epoch, milliseconds          │
│   ├── time_source       : gps | network | device | external │
│   ├── uncertainty_ms    : ± confidence interval             │
│   └── timezone          : IANA timezone string              │
│                                                              │
│   CONTEXT LAYER                                              │
│   ├── location_hash     : sha256(lat,lon,accuracy)          │
│   ├── activity_hash     : sha256(recent activity stream)    │
│   ├── biometric_hash    : sha256(biometric state snapshot)  │
│   └── device_state_hash : sha256(battery, connectivity)     │
│                                                              │
│   COMMITMENT LAYER                                           │
│   ├── memory_id         : ID in local cortex                │
│   ├── merkle_root       : root of memory tree at commit     │
│   ├── merkle_proof      : path to this memory in tree       │
│   └── cortex_version    : schema version                    │
│                                                              │
│   SIGNATURE LAYER                                            │
│   ├── device_signature  : Ed25519 sig from device key       │
│   ├── tee_attestation   : TEE proof of signing context      │
│   └── chain_link        : hash of previous PoM              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### The Novel Properties

#### 1. **Non-Repudiable Awareness**
Once you've generated a PoM, you cannot credibly claim you didn't see something. The proof includes:
- Hash of the content you perceived
- Attention metrics proving engagement
- Device attestation proving authenticity

#### 2. **Temporal Ordering**
PoMs form a chain (like a personal blockchain). Each links to the previous:
```
PoM_1 ← PoM_2 ← PoM_3 ← ... ← PoM_n
```
You cannot insert fake memories into the past without invalidating the chain.

#### 3. **Selective Disclosure**
You can prove you have a memory WITHOUT revealing the content:
```python
def prove_memory_exists(pom: ProofOfMemory, challenge: bytes) -> bytes:
    """Zero-knowledge proof that you have this memory."""
    return sign(
        pom.content_hash + 
        pom.merkle_proof + 
        challenge,
        private_key
    )
```

#### 4. **Federated Verification**
Others can verify your PoM without accessing your memories:
```python
def verify_pom(pom: ProofOfMemory, user_public_key: bytes) -> bool:
    # Verify signature
    if not verify_signature(pom.serialize(), pom.device_signature, user_public_key):
        return False
    
    # Verify merkle proof (memory was in tree at time of commit)
    if not verify_merkle_proof(pom.memory_id, pom.merkle_proof, pom.merkle_root):
        return False
    
    # Verify chain link (temporal ordering)
    if pom.chain_link != sha256(previous_pom.serialize()):
        return False
    
    return True
```

### Use Cases

| Scenario | Proof-of-Memory Value |
|----------|----------------------|
| "I told you about this" | Prove the conversation exists in your memory chain |
| Legal discovery | Selective disclosure of relevant memories |
| "I never saw that contract" | You either have a PoM or you don't |
| Witness testimony | Memories with high attention scores weighted higher |
| Insurance claims | Prove you saw the warning label |
| Academic integrity | Prove you saw the training, not just clicked through |

### The Killer Feature: Memory Sharing with Attribution

```python
class SharedMemory:
    """A memory with attribution chain."""
    
    original_pom: ProofOfMemory  # Creator's proof
    share_chain: list[ShareEvent]  # Who shared with whom
    
    @dataclass
    class ShareEvent:
        from_user: str
        to_user: str
        timestamp: float
        permission: str  # read | quote | remix
        signature: bytes  # From sharer's key
```

Now you can trace ideas:
```
Paul → Sarah → Alex → Bob
(original) (quote) (remix) (forward)
```

Every use is attributed. Every share is provable.

---

## ◈ The Three Systems Working Together

### Scenario: Delegating to an AI Agent

```
1. AI proposes action: "I want to book a flight to Mumbai"

2. INTENT PROOF generated:
   - action_hash: sha256("book flight SFO→BOM on 2026-02-15")
   - context_hash: sha256(current_screen + conversation_history)
   - attention_score: 0.87 (you read the details)
   - review_duration: 12,400ms
   - biometric_hash: sha256(face_embedding)
   - signature: Ed25519(all_fields)

3. Action executes (flight booked)

4. MEMORY CORTEX commits:
   - Stores: what was booked, the intent proof, the result
   - Embedding: semantic vector of the experience
   - Attention: high (you authorized it)

5. PROOF-OF-MEMORY generated:
   - Links intent proof to memory
   - Adds to chain
   - Now provable: "I authorized this booking on this date"

6. Later dispute: "I never booked that"
   Response: "Here's the PoM with your attention score 0.87, 
              biometric confirmation, and the exact screen you saw."
```

### Scenario: Meeting Recall

```
1. Meeting with Sarah (in person)

2. PERCEPTION captured:
   - Audio transcription (local, never uploaded)
   - Key phrases extracted
   - Emotional tone detected

3. ATTENTION measured:
   - Gaze toward speaker: 78%
   - Note-taking activity: yes
   - Phone checks: 2

4. MEMORY committed:
   - "Meeting with Sarah about Q2 projections"
   - Embedding for semantic search
   - High attention = high consolidation weight

5. PROOF-OF-MEMORY:
   - location_hash: sha256(office_coords)
   - duration: 47 minutes
   - attention_score: 0.82
   - content_hash: sha256(transcript_summary)

6. Three months later: "Did we discuss the budget cut?"
   Query: semantic search for "budget cut" near "Sarah meeting"
   Result: "Yes, at timestamp 12:34. Here's the PoM proving you were there."
```

---

## 🔐 Privacy Guarantees

| Data | Stored Where | Encrypted | Can Leave Device |
|------|-------------|-----------|------------------|
| Raw perceptions | Never stored | N/A | Never |
| Memory content | Local cortex | AES-256-GCM | Only with explicit share |
| Memory embeddings | Local cortex | Yes | Never |
| PoM proofs | Local chain | Partially | Only for verification |
| Intent proofs | Local chain | Partially | Only what you share |

**The device is your vault. Nothing leaves without explicit, attention-verified consent.**

---

## 📐 Implementation Roadmap

### Phase 1: Foundation (Q1 2027)
- [ ] Local Memory Cortex v1 (SQLite + vector search)
- [ ] Basic Intent Proof (without biometric binding)
- [ ] PoM chain initialization

### Phase 2: Attention (Q2 2027)
- [ ] Attention scoring from screen time + scroll depth
- [ ] Engagement metrics collection
- [ ] Attention-gated memory filter

### Phase 3: Biometric Binding (Q3 2027)
- [ ] Face confirmation at intent time
- [ ] Voice print verification
- [ ] HRV-based stress detection (optional)

### Phase 4: Full Protocol (Q4 2027)
- [ ] Complete PoM with all layers
- [ ] Zero-knowledge proofs for selective disclosure
- [ ] Federated verification API

### Phase 5: Mesh Integration (2028)
- [ ] PoM verification in Sovereign Mesh
- [ ] Reputation based on proof quality
- [ ] Cross-device memory sync (encrypted)

---

## ⟡ Why This Matters

**Today:** Memory is fallible. Intent is assumed. Context is lost.

**With Sovereign Memory Architecture:**
- Your memories are YOUR memories
- Your intent is provable
- Your context is captured forever
- You can share, selectively
- You can verify, cryptographically
- No one can gaslight you

**This is the invention:** A protocol that makes human memory trustworthy,
not by recording everything, but by proving what you attended to.

---

⟡ MirrorDNA Standard | Sovereign Memory Architecture v0.1
Author: Paul Desai | N1 Intelligence
License: CC-BY-ND 4.0 (Spec) | MIT (Reference Implementation)
