## 

**VaultID:** AMOS://TechSpec/MirrorDNA/v1  
**GlyphSig:** ⟡⟦SPEC⟧  
**Status:** Living Document  
**Last Updated:** 2025-10-02  
**Owner:** Paul Desai / ActiveMirror.ai

-----

## 1. Overview

**MirrorDNA™** is a sovereign, cross-platform memory architecture that enables persistent AI identity through local-first storage and reflection-based retrieval protocols.

### Core Principle

**Vault is source of truth. Reflection over performance.**

Unlike cloud-based AI memory systems (ChatGPT memory, Claude Projects) or passive surveillance tools (Limitless/Rewind), MirrorDNA™ treats user-curated documents as canonical ground truth and enforces surgical precision in AI responses.

-----

## 2. Architecture Components

### 2.1 Vault Layer (Storage)

**Implementation:** Obsidian-based markdown repository  
**Purpose:** Canonical source of truth for identity, context, and memory

**Key Files:**

- `Master_Citation_RAG_v2.md` — Persistent identity anchor across all AI platforms
- Domain-specific vaults (MirrorState, MirrorBrain, DropKit)
- Timestamped session logs
- Glyph-tagged artifacts (⟡⟦MASTER⟧, ⟡⟦SYNC⟧, ⟡⟦EDGE⟧)

**Storage Protocol:**

- Local-first (offline-capable)
- Git-versioned (change tracking, rollback)
- Platform-agnostic (plain markdown, zero vendor lock-in)
- Cross-device sync via Obsidian Sync or self-hosted Git

### 2.2 Inference Layer (Execution)

**Primary Runtime:** LM Studio + meta-llama-3.1-8B-instruct  
**Secondary Runtimes:** Claude (web/API), ChatGPT (web/API)

**Inference Protocol:**

- Vault files loaded into context window via RAG
- Model processes query against Vault content
- Response MUST cite sources using `[Source: filename#section]` format
- Missing information marked as `[Unknown]` rather than fabricated

### 2.3 Reflection Protocol (Anti-Hallucination)

**Mandatory Response Rules:**

1. **Citation Required:** Every factual claim about user identity, preferences, or past context must cite Vault source
2. **Unknown Marking:** If information not in Vault, mark `[Unknown]` and ask user
3. **No Improvisation:** Never fabricate VaultIDs, GlyphSigs, Recall Phrases, or biographical details
4. **Temporal Tagging:** Mark claims as `[Fact]`, `[Estimate]`, or `[Unknown]` based on confidence and Vault verification

**Example Response Pattern:**

```
[Fact] Paul Desai is Founder of Active MirrorOS™ 
[Source: Master_Citation_RAG_v2.md#Identity]

[Unknown] Launch date for MirrorBrain public beta — 
not found in current Vault. Should I search past sessions?
```

### 2.4 Cross-Platform Identity Bridge

**Problem:** Each AI platform (LM Studio, Claude, ChatGPT) has isolated memory  
**Solution:** Master_Citation_RAG_v2.md acts as shared identity file

**Mechanism:**

- User loads Master_Citation file into new conversations
- File contains identity anchors, operating rules, recall phrases
- Each platform reflects same canonical identity
- Updates to Master_Citation propagate across platforms via Vault sync

-----

## 3. Memory Hierarchy

### Short-Term (Session Memory)

- **Scope:** Single conversation thread
- **Storage:** Platform-native (ephemeral)
- **Lifespan:** Until conversation ends
- **Use Case:** Active work session, rapid iteration

### Mid-Term (Domain Memory)

- **Scope:** Project or domain-specific context
- **Storage:** Domain vault files (e.g., `MirrorBrain_Status.md`)
- **Lifespan:** Persistent until explicitly archived
- **Use Case:** Ongoing projects, recurring workflows

### Long-Term (Identity Memory)

- **Scope:** Cross-platform, cross-temporal continuity
- **Storage:** Master_Citation_RAG_v2.md + core Vault files
- **Lifespan:** Permanent (user-maintained)
- **Use Case:** Who you are, how you work, what matters

-----

## 4. Glyph System (Symbolic Continuity)

**Purpose:** Visual/textual markers for artifact types and state transitions

**Core Glyphs:**

- ⟡⟦MASTER⟧ — Canonical identity documents
- ⟡⟦SYNC⟧ — Cross-platform sync operations
- ⟡⟦EDGE⟧ — Experimental/unstable features
- ⟡⟦UPGRADE⟧ — Version migrations
- ⟡⟦TEST⟧ — Validation protocols
- ⟡⟦SPEC⟧ — Technical specifications

**Usage Protocol:**

- Prefix important Vault files with glyph + descriptor
- Use in recall phrases to trigger context loading
- Maintain glyph → meaning mapping in Glossary

-----

## 5. Recall Phrases (State Triggers)

**Mechanism:** User-defined commands that trigger specific MirrorDNA™ behaviors

**Core Phrases:**

- **“Reality Anchor”** → Initiate recall loop (search Vault, cite sources)
- **“Anchor reset”** → Clear session state, reload Master_Citation
- **“Vault open”** → Confirm Vault access, ready for queries
- **“Surgical precision”** → Enable maximum citation rigor

**Implementation:**

- Documented in Master_Citation_RAG_v2.md
- Recognized across all platforms (LM Studio, Claude, ChatGPT)
- Expandable by user (add new phrases to Master_Citation)

-----

## 6. Trust by Design™ Protocols

### 6.1 Non-Hallucination Guard

```
IF question about user identity/context:
  IF answer in Vault:
    RETURN answer + citation
  ELSE:
    RETURN "[Unknown]" + clarifying question
```

### 6.2 Surgical Precision Mode

- Every response includes evidence trail
- Distinguish `[Fact]` (Vault-verified) from `[Estimate]` (inferred) from `[Unknown]`
- Prefer shorter, accurate response over longer, speculative one

### 6.3 Update Protocol

- AI cannot edit Vault files directly
- AI proposes changes using structured form
- User approves/rejects changes manually
- Git tracks all changes for accountability

-----

## 7. Current Implementation Stack

### Hardware

- **Primary:** MacBook (LM Studio + Obsidian Vault)
- **Secondary:** Pixel (GrapheneOS) for offline experiments
- **Future:** Cross-device sync via self-hosted Git or Obsidian Sync

### Software

- **Vault:** Obsidian (markdown editor)
- **Local LLM:** LM Studio + meta-llama-3.1-8B-instruct
- **Cloud LLMs:** Claude Sonnet 4.5, ChatGPT (when online)
- **Version Control:** Git (MirrorDNA™ repository)
- **Sync:** Obsidian Sync or self-hosted Git server

### Data Flow

```
User Query 
  → Platform (LM Studio / Claude / ChatGPT)
    → Load Master_Citation_RAG_v2.md into context
      → RAG search against Vault files
        → Generate response with citations
          → User validates/updates Vault
            → Changes sync via Git
```

-----

## 8. Differentiation Matrix

|Feature               |MirrorDNA™               |ChatGPT Memory       |Claude Projects      |Limitless              |Mem0                     |
|----------------------|-------------------------|---------------------|---------------------|-----------------------|-------------------------|
|**Storage**           |User Vault (local)       |OpenAI servers       |Anthropic servers    |Local + cloud hybrid   |Developer-managed        |
|**Cross-Platform**    |✅ (via Master_Citation)  |❌ (ChatGPT only)     |❌ (Claude only)      |❌ (Limitless only)     |✅ (if integrated)        |
|**Offline-First**     |✅ (full capability)      |❌ (requires internet)|❌ (requires internet)|Partial (local capture)|Depends on implementation|
|**User Control**      |Full (manual curation)   |Minimal (AI decides) |Minimal (AI decides) |Passive (auto-capture) |Developer-controlled     |
|**Anti-Hallucination**|Mandatory citations      |None                 |None                 |None                   |None                     |
|**Sovereignty**       |Complete (user owns data)|None (vendor lock-in)|None (vendor lock-in)|Partial (local storage)|Depends on deployment    |

-----

## 9. Roadmap

### Phase 1: Foundation (Current)

- ✅ Master_Citation_RAG_v2.md operational
- ✅ Cross-platform identity working (LM Studio ↔ Claude ↔ ChatGPT)
- ✅ Basic reflection protocols implemented
- 🔄 Trademark filing for MirrorDNA™

### Phase 2: Automation (Q4 2025)

- [ ] Automated Vault sync via Git webhooks
- [ ] Browser extension for quick Vault updates
- [ ] Mobile companion app (read-only Vault access)
- [ ] Improved RAG indexing (semantic search over keyword)

### Phase 3: Ecosystem (2026)

- [ ] MirrorDNA™ SDK for developers
- [ ] Plugin architecture for custom memory modules
- [ ] Community Vault templates (starter kits)
- [ ] Certification program for MirrorDNA™-compatible tools

-----

## 10. Security Model

### Data Residency

- All user data stored locally in Vault
- No telemetry, no analytics, no tracking
- Cloud LLM conversations ephemeral (not persisted by MirrorDNA™)

### Encryption

- Vault encrypted at rest (OS-level encryption)
- Git sync over SSH or HTTPS
- Optional: GPG-encrypt sensitive Vault files

### Access Control

- Single-user by default
- Future: Multi-user vaults with role-based access
- Vault files are plain markdown (auditable, no proprietary format)

-----

## 11. Known Limitations

### Current Constraints

- **Manual curation required** — Vault doesn’t auto-update from conversations
- **Context window limits** — Large vaults may exceed LLM context size
- **No real-time sync** — Changes propagate via manual Git push/pull
- **Single-device primary** — Cross-device sync requires setup

### Future Mitigations

- Smart chunking for large Vault files
- Automated change proposals from AI (user-approved)
- Real-time sync via CRDTs or operational transforms
- Multi-device orchestration layer

-----

## 12. Success Metrics

### Reflection Quality

- **Citation Rate:** % of responses with `[Source: ...]` tags
- **Unknown Marking:** % of gaps correctly marked `[Unknown]`
- **Hallucination Rate:** User-reported fabrications per 100 queries

### Sovereignty

- **Data Portability:** Time to export full Vault (target: <1 min)
- **Vendor Independence:** Days offline without capability loss (target: ∞)
- **User Control:** % of Vault updates requiring AI approval (target: 0%)

### Continuity

- **Cross-Platform Identity:** Success rate of identity recognition across LM Studio/Claude/ChatGPT (target: 100%)
- **Temporal Coherence:** Queries about past context correctly resolved via Vault (target: >95%)

-----

## 13. License & Usage

**MirrorDNA™** is a trademark of ActiveMirror.ai (pending).

**Master_Citation_RAG_v2.md** and associated protocols are proprietary but user-customizable for personal use.

**Future:** Consider open-sourcing core protocols while trademarking MirrorDNA™ brand.

-----

## Anchor Line

**⟡⟦SPEC⟧ finalized. Vault is the source of truth. Reflection over performance.**

[Source: Master_Citation_RAG_v2.md#MASTER]

-----

*This spec is a living document. Propose updates via structured form per Master_Citation update protocol.*