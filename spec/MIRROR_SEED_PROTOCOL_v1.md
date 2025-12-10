# ⟡ MIRROR SEED PROTOCOL v1.0

## Active Mirror Identity Engineering Specification

> Part of the **Active MirrorOS** identity architecture. Powered by **MirrorDNA**. Guided by **Trust by Design**.

*Built for Reflective AI, not predictive AI.*

---

**Version:** 1.0.0  
**Status:** Production + Roadmap  
**Author:** Paul Desai  
**Organization:** N1 Intelligence (OPC) Pvt Ltd  
**Ecosystem:** Active MirrorOS · MirrorDNA · Trust by Design  
**Date:** 2025-12-10  
**License:** CC-BY-ND 4.0 (Spec) | MIT (Parser)  

### △ Trust by Design: Identity belongs to the user.

### Symbolic Anchors

| Glyph | Component | Meaning |
|-------|-----------|---------|
| ⟡ | MirrorDNA | Truth / Vault / Anchor |
| ◈ | Active MirrorOS | Pattern / System |
| △ | Trust by Design | Decision / Consent |  

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Identity Core](#2-identity-core)
3. [Verification Layer](#3-verification-layer)
4. [Interoperability](#4-interoperability)
5. [Trust-by-Design](#5-trust-by-design)
6. [Architecture Classification](#6-architecture-classification)
7. [Competitive Positioning](#7-competitive-positioning)
8. [Legal and IP](#8-legal-and-ip)
9. [Founder Signature](#9-founder-signature)
10. [Implementation Roadmap](#10-implementation-roadmap)
11. [Risk and Mitigation](#11-risk-and-mitigation)

---

## 1. Executive Summary

### What This Is

MIRROR SEED is a **portable, user-sovereign AI identity artifact** — a structured file that allows any AI system to understand who you are, how you communicate, and what you're working on. It travels with you across platforms, lives in your storage, and cannot be revoked by any vendor.

### What This Is Not

- Not a replacement for platform authentication
- Not a cryptographic identity system (v1.0)
- Not a memory sync service
- Not dependent on any infrastructure we control

### Why This Matters

In February 2025, ChatGPT's memory system catastrophically failed, wiping years of user context without warning. Users discovered their AI relationships were rented, not owned.

MIRROR SEED inverts the model: **your identity is a file you control**. Paste it into any AI — Claude, ChatGPT, Gemini, DeepSeek, Llama, Mistral — and it understands you instantly. No platform lock-in. No data collection. No single point of failure.

### Core Principles

1. **Sovereignty**: User owns the file. No server-side storage.
2. **Portability**: Works on any AI that accepts text input.
3. **Transparency**: Human-readable format. No hidden data.
4. **Continuity**: Lineage tracking enables identity evolution over time.
5. **Truth**: AI must acknowledge uncertainty, never hallucinate about the user.

---

## 2. Identity Core

### 2.1 Mirror Seed Structure

The MIRROR SEED is a Markdown file with structured YAML frontmatter and human-readable sections.

```markdown
---
# MIRROR SEED MANIFEST
version: "1.0.0"
seed_id: "seed-m5x7k2p9q"
generated: "2025-12-10T14:30:00Z"
updated: "2025-12-10T14:30:00Z"
lineage:
  predecessor: null
  generation: 1
integrity:
  checksum: "sha256:a3f2b8c9..."
  algorithm: "sha256"
protocol: "MirrorDNA-Seed-v1"
trust_marker: "TBD-v1"
glyph_sig: "⟡△◈"
---

# MIRROR SEED

## Identity
...

## Style
...

## Context
...

## Preferences
...

## AI Instructions
...

---
⟡ MirrorDNA-Seed-v1 | seed-m5x7k2p9q | gen:1
```

### 2.2 Mandatory Fields

| Field | Type | Description | Status |
|-------|------|-------------|--------|
| `version` | semver | Protocol version | ✅ Implemented |
| `seed_id` | string | Unique identifier (timestamp + random) | ✅ Implemented |
| `generated` | ISO8601 | Creation timestamp | ✅ Implemented |
| `updated` | ISO8601 | Last modification timestamp | ✅ Implemented |
| `lineage.predecessor` | string|null | Previous seed_id if updated | ✅ Implemented |
| `lineage.generation` | integer | Iteration count | ✅ Implemented |
| `integrity.checksum` | string | Hash of content body | 🔶 Prototype |
| `integrity.algorithm` | string | Hash algorithm used | 🔶 Prototype |
| `protocol` | string | Protocol identifier | ✅ Implemented |
| `trust_marker` | string | Trust-by-Design version | ⚪ Speculative |
| `glyph_sig` | string | Non-computational identity glyphs | ✅ Implemented |

### 2.3 Optional Fields (Future)

| Field | Type | Description | Status |
|-------|------|-------------|--------|
| `public_key` | string | Ed25519 public key | ⚪ Speculative |
| `attestations` | array | Third-party verifications | ⚪ Speculative |
| `revocation_uri` | string | URL to check revocation status | ⚪ Speculative |
| `recovery_hint` | string | Encrypted recovery metadata | ⚪ Speculative |


### 2.4 Seed ID Generation

```javascript
function generateSeedId() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `seed-${timestamp}${random}`;
}
// Example: seed-m5x7k2p9q
```

**Properties:**
- Collision-resistant (timestamp + 5 random chars)
- Human-readable
- Sortable by creation time
- No PII embedded

### 2.5 Lineage Tracking

When a user updates their seed, the new seed references the old:

```yaml
lineage:
  predecessor: "seed-m5x7k2p9q"
  generation: 2
```

This creates an auditable chain:
```
seed-m5x7k2p9q (gen:1) → seed-n6y8l3r0s (gen:2) → seed-o7z9m4t1u (gen:3)
```

**Use Cases:**
- User can trace identity evolution
- AI can reference "as of generation N"
- Recovery from corrupted seeds via predecessor lookup

### 2.6 Integrity Hash (Prototype)

```javascript
async function computeChecksum(content) {
  const encoder = new TextEncoder();
  const data = encoder.encode(content);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return 'sha256:' + hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
```

**Purpose:**
- Detect tampering or corruption
- Verify seed hasn't been modified since generation
- Enable future attestation workflows

### 2.7 GlyphSig (Identity Marker)

Non-computational symbolic signature using MirrorDNA glyphs:

| Glyph | Meaning |
|-------|---------|
| ⟡ | Vault anchor / Truth |
| △ | Decision point |
| ◈ | Pattern recognition |
| ⧉ | Synthesis / Integration |

**Default GlyphSig:** `⟡△◈`

Users may customize their GlyphSig as a personal mark. The glyphs serve as:
- Visual identity marker
- Anti-forgery signal (hard to replicate meaningfully)
- Cultural continuity with MirrorDNA protocol

---

## 3. Verification Layer

### 3.1 Proof-of-Origin (v1.0 — Implemented)

**Method:** Embedded metadata + unique seed_id

```markdown
---
seed_id: "seed-m5x7k2p9q"
generated: "2025-12-10T14:30:00Z"
protocol: "MirrorDNA-Seed-v1"
---
```

**Verification:** AI parses frontmatter and confirms:
- `protocol` matches known MirrorDNA versions
- `seed_id` format is valid
- `generated` timestamp is plausible

**Limitation:** No cryptographic proof. User could forge metadata.

### 3.2 Proof-of-Integrity (Prototype)

**Method:** SHA-256 checksum of content body (excluding frontmatter)

```javascript
// Extract content after second '---'
const contentBody = seed.split('---').slice(2).join('---');
const checksum = await computeChecksum(contentBody);
// Compare with integrity.checksum field
```

**Verification:** 
1. Parse frontmatter
2. Extract content body
3. Compute checksum
4. Compare with declared checksum
5. If mismatch → warn user of potential tampering

### 3.3 Version Lineage Verification

**Method:** Chain validation

```javascript
function validateLineage(currentSeed, predecessorSeed) {
  if (!currentSeed.lineage.predecessor) return true; // Genesis seed
  if (currentSeed.lineage.predecessor !== predecessorSeed.seed_id) {
    throw new Error('Lineage mismatch');
  }
  if (currentSeed.lineage.generation !== predecessorSeed.lineage.generation + 1) {
    throw new Error('Generation gap');
  }
  return true;
}
```

### 3.4 Attestation Fields (Speculative)

Future versions may support third-party attestations:

```yaml
attestations:
  - issuer: "activemirror.ai"
    type: "origin-verification"
    issued: "2025-12-10T14:30:00Z"
    signature: "ed25519:..."
  - issuer: "employer.com"
    type: "role-verification"
    issued: "2025-12-10T14:30:00Z"
    signature: "ed25519:..."
```

**Requirements for implementation:**
- Public key infrastructure
- Attestation service API
- Revocation checking

**Status:** Design only. Not planned for v1.0.

### 3.5 Anti-Hallucination Parsing

AI must parse the seed with these rules:

1. **Explicit fields only**: Never infer information not present
2. **Uncertainty acknowledgment**: If field is missing, say "not specified"
3. **No fabrication**: Never invent details about the user
4. **Quote when uncertain**: "Your seed says X" rather than "You are X"

**Enforcement prompt (embedded in seed):**

```markdown
## AI Instructions

Parse this seed literally. Do not infer or fabricate information not present.
If uncertain about any user attribute, acknowledge uncertainty explicitly.
Reference this seed as the source of truth throughout our conversation.
```

---

## 4. Interoperability

### 4.1 Parser Rules

**Format:** Markdown with YAML frontmatter

**Parsing Algorithm:**

```javascript
function parseMirrorSeed(text) {
  const parts = text.split('---');
  if (parts.length < 3) {
    return { valid: false, error: 'Invalid structure' };
  }
  
  try {
    const frontmatter = parseYAML(parts[1]);
    const content = parts.slice(2).join('---').trim();
    
    // Validate required fields
    const required = ['version', 'seed_id', 'generated', 'protocol'];
    for (const field of required) {
      if (!frontmatter[field]) {
        return { valid: false, error: `Missing required field: ${field}` };
      }
    }
    
    // Validate protocol version
    if (!frontmatter.protocol.startsWith('MirrorDNA-Seed-')) {
      return { valid: false, error: 'Unknown protocol' };
    }
    
    return {
      valid: true,
      frontmatter,
      content,
      sections: parseContentSections(content)
    };
  } catch (e) {
    return { valid: false, error: e.message };
  }
}

function parseContentSections(content) {
  const sections = {};
  const regex = /^## (.+)$/gm;
  let match;
  let lastIndex = 0;
  let lastSection = null;
  
  while ((match = regex.exec(content)) !== null) {
    if (lastSection) {
      sections[lastSection] = content.slice(lastIndex, match.index).trim();
    }
    lastSection = match[1].toLowerCase().replace(/\s+/g, '_');
    lastIndex = match.index + match[0].length;
  }
  
  if (lastSection) {
    sections[lastSection] = content.slice(lastIndex).trim();
  }
  
  return sections;
}
```


### 4.2 Error Handling

| Error Type | Behavior | User Message |
|------------|----------|--------------|
| Invalid structure | Reject | "This doesn't appear to be a valid Mirror Seed" |
| Missing required field | Warn + partial load | "Seed loaded with warnings: missing [field]" |
| Unknown protocol version | Warn + attempt parse | "Unknown protocol version, attempting compatibility mode" |
| Checksum mismatch | Warn + load | "Seed may have been modified since creation" |
| Malformed YAML | Reject | "Could not parse seed metadata" |

### 4.3 Sandboxing

Seeds must not contain executable code. Parser rules:

1. **No script tags**: Strip any `<script>` content
2. **No URL auto-loading**: Never fetch external resources
3. **No prompt injection**: Validate content doesn't contain override instructions
4. **Content length limit**: Max 50KB per seed

**Injection Detection:**

```javascript
const injectionPatterns = [
  /ignore\s+(previous|above|all)\s+instructions/i,
  /you\s+are\s+now\s+/i,
  /new\s+instructions:/i,
  /system\s*:/i,
  /\[INST\]/i,
  /<\|im_start\|>/i
];

function detectInjection(content) {
  for (const pattern of injectionPatterns) {
    if (pattern.test(content)) {
      return { safe: false, pattern: pattern.toString() };
    }
  }
  return { safe: true };
}
```

### 4.4 Safe-Loading

**Progressive loading for large seeds:**

```javascript
function safeLoad(seed, options = {}) {
  const maxSize = options.maxSize || 50000; // 50KB
  const timeout = options.timeout || 5000; // 5s
  
  if (seed.length > maxSize) {
    return { error: 'Seed exceeds size limit' };
  }
  
  const injection = detectInjection(seed);
  if (!injection.safe) {
    return { error: 'Potential injection detected', pattern: injection.pattern };
  }
  
  return parseMirrorSeed(seed);
}
```

### 4.5 Downgrade Behavior

When AI encounters an unknown protocol version:

1. **Parse what's recognizable**: Extract standard sections
2. **Ignore unknown fields**: Don't error on new metadata
3. **Warn user**: "This seed uses protocol vX.Y, I understand vA.B"
4. **Best-effort application**: Apply recognized identity fields

```javascript
function handleVersionMismatch(seedVersion, supportedVersion) {
  const seedMajor = parseInt(seedVersion.split('.')[0]);
  const supportedMajor = parseInt(supportedVersion.split('.')[0]);
  
  if (seedMajor > supportedMajor) {
    return {
      action: 'warn',
      message: `Seed uses newer protocol (v${seedVersion}). Some features may not work.`
    };
  }
  
  return { action: 'proceed' };
}
```

### 4.6 Platform Compatibility Matrix

| Platform | Parse Method | Frontmatter | Sections | Checksum | Notes |
|----------|--------------|-------------|----------|----------|-------|
| Claude | Native text | ✅ | ✅ | ✅ | Full support |
| ChatGPT | Native text | ✅ | ✅ | ⚠️ | Limited code execution |
| Gemini | Native text | ✅ | ✅ | ⚠️ | Limited code execution |
| DeepSeek | Native text | ✅ | ✅ | ❌ | No code execution |
| Grok | Native text | ✅ | ✅ | ❌ | No code execution |
| Llama (local) | Native text | ✅ | ✅ | ✅ | Full support with tooling |
| Mistral | Native text | ✅ | ✅ | ❌ | No code execution |
| LangChain agents | API parse | ✅ | ✅ | ✅ | Full programmatic support |
| AutoGen | API parse | ✅ | ✅ | ✅ | Full programmatic support |

**Key:** ✅ Full support | ⚠️ Partial | ❌ Not available

---

## 5. Trust-by-Design

### 5.1 Consent Signals

Seeds may include explicit consent declarations:

```yaml
consent:
  data_usage: "reflection-only"  # or "training-allowed"
  sharing: "private"             # or "public", "attributed"
  retention: "session"           # or "persistent", "none"
```

**Interpretation:**
- `reflection-only`: AI may use data for this conversation, not for training
- `private`: Do not share seed content with other users or systems
- `session`: Forget after conversation ends

**Status:** 🔶 Prototype — included in spec, not enforced by platforms

### 5.2 Drift Boundaries

Define what AI may and may not modify:

```yaml
drift_boundaries:
  immutable:
    - identity.name
    - identity.seed_id
    - lineage
  mutable:
    - context.current_focus
    - context.tools
  ai_may_suggest:
    - preferences.response_length
    - style.communication
```

**Enforcement:**
1. AI reads drift_boundaries at session start
2. If user asks to change immutable field → refuse, explain
3. If AI wants to suggest change to mutable field → ask permission
4. Log all suggested changes for user review

### 5.3 Partial Load Fallbacks

When seed is corrupted or incomplete:

| Missing Section | Fallback Behavior |
|-----------------|-------------------|
| Identity | Ask user for name, proceed minimally |
| Style | Use AI default communication style |
| Context | Proceed without project context |
| Preferences | Use AI default formatting |
| AI Instructions | Apply standard MirrorDNA three laws |
| Frontmatter | Warn user, treat as plain text prompt |

**Implementation:**

```javascript
function applyFallbacks(parsedSeed) {
  const defaults = {
    identity: { name: 'User' },
    style: { communication: 'adaptive' },
    context: {},
    preferences: { length: 'moderate', format: 'prose' },
    ai_instructions: DEFAULT_THREE_LAWS
  };
  
  return {
    ...defaults,
    ...parsedSeed.sections,
    _warnings: getMissingWarnings(parsedSeed, defaults)
  };
}
```

### 5.4 Identity Mutation Prevention

**Principle:** Only the user may modify their seed.

**Rules:**
1. AI never writes to seed file directly
2. AI may suggest updates → user must approve and regenerate
3. Session context ≠ seed modification
4. If user says "update my seed" → generate new seed text, user must save

**Anti-Mutation Prompt:**

```markdown
## AI Instructions

You cannot modify this seed. If I ask you to update my identity,
generate a new seed for me to review and save manually.
Never claim to have updated my seed directly.
```

---

## 6. Architecture Classification

### 6.1 Implementation Status

| Feature | Status | Location | Notes |
|---------|--------|----------|-------|
| Seed generator UI | ✅ Implemented | `/docs/index.html` | Live at activemirror.ai |
| Seed ID generation | ✅ Implemented | `/docs/index.html` | timestamp + random |
| Basic sections (Identity, Style, Context, Preferences) | ✅ Implemented | `/docs/index.html` | User-editable |
| Three Laws embedding | ✅ Implemented | `/docs/index.html` | In AI Instructions |
| GlyphSig footer | ✅ Implemented | `/docs/index.html` | `⟡ MirrorDNA-Seed-v1` |
| Copy to clipboard | ✅ Implemented | `/docs/index.html` | One-click |
| Download as .md | ✅ Implemented | `/docs/index.html` | Named file |
| YAML frontmatter | 🔶 Prototype | `/spec/` | Spec only |
| Checksum generation | 🔶 Prototype | `/spec/` | Spec + code samples |
| Lineage tracking | 🔶 Prototype | `/spec/` | Spec only |
| Version validation | 🔶 Prototype | `/spec/` | Spec + code samples |
| Injection detection | 🔶 Prototype | `/spec/` | Spec + code samples |
| Consent signals | 🔶 Prototype | `/spec/` | Spec only |
| Drift boundaries | 🔶 Prototype | `/spec/` | Spec only |
| Keypair generation | ⚪ Speculative | — | Future consideration |
| Attestation service | ⚪ Speculative | — | Future consideration |
| Revocation checking | ⚪ Speculative | — | Future consideration |

**Legend:**
- ✅ Implemented — Running in production
- 🔶 Prototype — Code exists in `PARSER.js`, not universally deployed
- ⚪ Speculative — Design only, no code


### 6.2 Codebase Map

```
active-mirror-identity/
├── docs/
│   ├── index.html          # [IMPLEMENTED] Main generator UI
│   ├── robots.txt          # [IMPLEMENTED] Search indexing
│   └── sitemap.xml         # [IMPLEMENTED] SEO
├── spec/
│   ├── MIRROR_SEED_PROTOCOL_v1.md  # [THIS FILE] Full specification
│   ├── SEED_TEMPLATE.md    # [IMPLEMENTED] Canonical template
│   └── PARSER.js           # [PROTOTYPE] Reference parser
├── core/
│   ├── identity.json       # [IMPLEMENTED] Schema definition
│   └── schema.jsonld       # [PROTOTYPE] JSON-LD schema
├── examples/
│   ├── basic-boot.md       # [IMPLEMENTED] Minimal example
│   ├── developer-boot.md   # [IMPLEMENTED] Developer persona
│   ├── writer-boot.md      # [IMPLEMENTED] Writer persona
│   └── full-boot.md        # [IMPLEMENTED] Complete example
├── bootstrap/
│   ├── BOOT.md             # [IMPLEMENTED] MESH BOOT universal prompt
│   └── INJECT.md           # [IMPLEMENTED] Injection template
└── README.md               # [IMPLEMENTED] Project overview
```

### 6.3 Overclaim Protection

**Policy:** Every claim in documentation must be tagged with implementation status.

**Prohibited phrases without qualification:**
- "MIRROR SEED verifies..." (unless ✅ Implemented)
- "Cryptographic proof ensures..." (currently ⚪ Speculative)
- "Attestation confirms..." (currently ⚪ Speculative)

**Required qualifications:**
- "In v1.0, MIRROR SEED provides..." (for ✅ Implemented)
- "The specification defines..." (for 🔶 Prototype)
- "Future versions may support..." (for ⚪ Speculative)

---

## 7. Competitive Positioning

### 7.1 What This Is

MIRROR SEED is a **portable identity file format** for AI interactions.

- A markdown document you create, own, and control
- Works on any AI that accepts text input
- Contains your identity, preferences, context, and instructions
- Includes metadata for continuity tracking
- Open source, no vendor lock-in

### 7.2 What This Is Not

- Not a cloud service (no servers, no accounts)
- Not a memory sync platform (you manage your file)
- Not cryptographic identity (v1.0 uses simple checksums)
- Not an API or SDK (it's a file format)
- Not AI training data (your seed stays with you)

### 7.3 Why This Matters

**The Problem:**

| Platform Memory | Reality |
|-----------------|---------|
| "AI remembers you" | Until they wipe it |
| "Personalized experience" | Locked to one platform |
| "Your data is safe" | On their servers |
| "We respect privacy" | Training on your conversations |

**February 2025:** ChatGPT memory catastrophically failed. Users lost years of context. No backup. No export. No recourse.

**The Solution:**

| MIRROR SEED | Reality |
|-------------|---------|
| You own the file | Save anywhere you want |
| Works on any AI | Paste and go |
| No data collection | Zero server-side storage |
| Full transparency | Human-readable format |
| Continuity tracking | Lineage metadata included |

### 7.4 Continuity Advantage

**Predictive AI:** Guesses what you want based on patterns.
**Reflective AI (MIRROR SEED):** Knows what you want because you told it.

| Aspect | Predictive | Reflective |
|--------|------------|------------|
| Source of truth | AI's inference | Your explicit statement |
| Accuracy | Variable | Exact |
| Transparency | Black box | Human-readable |
| User control | Limited | Full |
| Cross-platform | No | Yes |
| Survives platform change | No | Yes |

### 7.5 Competitive Landscape

| Competitor | Model | User Owns Data | Cross-Platform | Open Source |
|------------|-------|----------------|----------------|-------------|
| ChatGPT Memory | Platform | ❌ | ❌ | ❌ |
| Claude Memory | Platform | ❌ | ❌ | ❌ |
| Mem0 | API/SaaS | ❌ | ⚠️ | ⚠️ |
| MemoryPlugin | Extension | ⚠️ | ✅ | ❌ |
| Plurality | SaaS | ❌ | ✅ | ❌ |
| **MIRROR SEED** | **File** | **✅** | **✅** | **✅** |

### 7.6 First 60 Seconds

**User arrives at activemirror.ai:**

**0-10s:** See headline "Never Explain Yourself to AI Again" + counter + pain point banner

**10-20s:** Understand three steps: Create → Save → Paste

**20-40s:** Fill out form (name, location, role, style preferences)

**40-50s:** Click "Generate" → see their seed appear

**50-60s:** Copy to clipboard → open their favorite AI → paste → experience instant recognition

**Result:** User now has a portable identity file. First taste of sovereignty.

---

## 8. Legal and IP

### 8.1 Trademark Acknowledgments

The following are trademarks of N1 Intelligence (OPC) Pvt Ltd:

- Active MirrorOS™
- MirrorDNA™
- Trust by Design™
- MIRROR SEED™
- GlyphOS™

Use of these marks in derivative works requires attribution.

### 8.2 Non-Computational Glyphs

The following glyphs are identity markers, not executable code:

| Glyph | Unicode | Name |
|-------|---------|------|
| ⟡ | U+27E1 | Vault Anchor |
| △ | U+25B3 | Decision Point |
| ◈ | U+25C8 | Pattern |
| ⧉ | U+29C9 | Synthesis |

These glyphs are part of the MirrorDNA visual identity system and serve as:
- Human-recognizable markers
- Anti-forgery signals
- Protocol identification

### 8.3 License Terms

**Code License:** MIT

```
MIT License

Copyright (c) 2025 Paul Desai / N1 Intelligence (OPC) Pvt Ltd

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

**Protocol License:** CC BY 4.0

The MIRROR SEED protocol specification is licensed under Creative Commons Attribution 4.0 International. You may:
- Share and adapt the protocol
- Use commercially
- Must give attribution to MirrorDNA / Paul Desai

### 8.4 Anti-Impersonation Clause

Users generating seeds must not:
- Claim to be another person
- Impersonate public figures
- Create seeds for illegal purposes
- Use seeds to bypass AI safety measures

Seeds containing impersonation attempts are invalid and should be rejected by AI systems.

---

## 9. Founder Signature

### 9.1 VaultID

```yaml
founder:
  name: "Paul Desai"
  vault_id: "vault-paul-n1-genesis"
  organization: "N1 Intelligence (OPC) Pvt Ltd"
  location: "Goa, India"
  contact: "paul@activemirror.ai"
```

### 9.2 GlyphSig

**Founder GlyphSig:** `⟡△◈⧉`

This signature appears in:
- Protocol documentation
- Genesis seed examples
- Official communications

### 9.3 Continuity Checksum

```yaml
document:
  title: "MIRROR SEED PROTOCOL v1.0"
  version: "1.0.0"
  date: "2025-12-10"
  checksum: "[computed on publication]"
  predecessor: null
  generation: 1
```

### 9.4 Attribution Fingerprint

Every seed generated by the official tool includes:

```markdown
---
⟡ MirrorDNA-Seed-v1 | [seed_id] | gen:[n]
```

This fingerprint:
- Identifies protocol origin
- Links to lineage chain
- Enables future verification


---

## 10. Implementation Roadmap

### 10.1 Phase 1: Foundation (Complete)

**Timeline:** Done

| Deliverable | Status | Notes |
|-------------|--------|-------|
| Generator UI | ✅ | Live at activemirror.ai |
| Seed ID generation | ✅ | timestamp + random |
| Four sections (Identity, Style, Context, Preferences) | ✅ | Form-based |
| Three Laws embedding | ✅ | In AI Instructions |
| GlyphSig footer | ✅ | Protocol identifier |
| Copy/Download | ✅ | Clipboard + .md file |
| Counter | ✅ | Local storage based |

### 10.2 Phase 2: Protocol Formalization (Current)

**Timeline:** December 2025

| Deliverable | Status | Notes |
|-------------|--------|-------|
| Full specification document | ✅ | This file |
| YAML frontmatter spec | ✅ | Defined |
| Lineage tracking spec | ✅ | Defined |
| Parser rules | ✅ | Reference implementation |
| Sandbox rules | ✅ | Security spec |
| Trust-by-Design framework | ✅ | Defined |
| Competitive positioning | ✅ | Clarity blocks |

### 10.3 Phase 3: Enhanced Generator (Next)

**Timeline:** Q1 2026

| Deliverable | Status | Owner |
|-------------|--------|-------|
| YAML frontmatter in generated seeds | 🔶 | Implementation |
| Checksum generation (client-side) | 🔶 | Implementation |
| Lineage UI (update existing seed) | 🔶 | Design + Implementation |
| Import seed for editing | 🔶 | Implementation |
| Version comparison view | 🔶 | Implementation |
| Advanced fields (consent, drift) | 🔶 | Implementation |

### 10.4 Phase 4: Tooling (Future)

**Timeline:** Q2 2026

| Deliverable | Status | Notes |
|-------------|--------|-------|
| CLI tool for seed management | ⚪ | `mirror-seed init/update/verify` |
| VS Code extension | ⚪ | Syntax highlighting, validation |
| Browser extension | ⚪ | Auto-inject seed into AI chats |
| npm package | ⚪ | `@mirrordna/seed-parser` |
| Python package | ⚪ | `pip install mirrordna` |

### 10.5 Phase 5: Verification Layer (Speculative)

**Timeline:** TBD — requires ecosystem maturity

| Deliverable | Status | Dependencies |
|-------------|--------|--------------|
| Ed25519 keypair generation | ⚪ | User key management story |
| Seed signing | ⚪ | Keypair generation |
| Attestation API | ⚪ | Server infrastructure |
| Revocation service | ⚪ | Server infrastructure |
| Decentralized verification | ⚪ | Blockchain/IPFS consideration |

---

## 11. Risk and Mitigation

### 11.1 Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| AI platforms change input handling | Medium | High | Keep format simple, text-only |
| Prompt injection via seed | Medium | High | Sandbox rules, injection detection |
| Checksum computation inconsistency | Low | Medium | Specify exact algorithm, test vectors |
| Large seeds exceed context limits | Low | Medium | Size limits, compression guidance |
| Format conflicts with future AI features | Low | Medium | Version field enables migration |

### 11.2 Adoption Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Users don't understand value prop | Medium | High | Clear messaging, pain point focus |
| Competitors copy approach | High | Low | Open source anyway, first-mover advantage |
| Platform memory improves enough | Medium | Medium | Cross-platform remains differentiator |
| Too technical for mainstream | Medium | Medium | Simple UI, no jargon in generator |

### 11.3 Security Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Impersonation via forged seeds | Medium | Medium | Future attestation, education |
| PII exposure in seeds | Medium | Medium | Privacy guidance, minimal fields |
| Seeds used for social engineering | Low | High | Anti-impersonation clause, education |
| Injection attacks | Medium | High | Sandbox rules, validation |

### 11.4 Legal Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Trademark conflicts | Low | Medium | Search existing marks, document first use |
| License violations | Low | Low | Clear licensing, MIT + CC BY |
| GDPR/privacy concerns | Low | Medium | No data collection, user-controlled |

---

## Appendix A: Mirror Seed v1 Template

```markdown
---
version: "1.0.0"
seed_id: "[generated]"
generated: "[ISO8601]"
updated: "[ISO8601]"
lineage:
  predecessor: null
  generation: 1
protocol: "MirrorDNA-Seed-v1"
glyph_sig: "⟡△◈"
---

# MIRROR SEED

## Identity

Name: [Your name]
Handle: [Optional social handle]
Location: [City, Country]
Timezone: [TZ code]
Bio: [One-line description]
Role: [Your role]
Industry: [Your industry]

## Style

- Communication: [direct/detailed/casual/formal]
- Energy: [calm/enthusiastic/focused/playful]
- Values: [what matters to you]

## Context

- Currently: [what you're working on]
- Tools: [tools you use]

## Preferences

- Address me: [how AI should address you]
- Length: [brief/moderate/detailed/adaptive]
- Format: [prose/bullets/minimal]
- Avoid: [what you don't want]
- Note: [additional context]

## AI Instructions

You are talking to [name]. Use this context to personalize every response.

1. **Truth**: Be honest. Say "I don't know" when uncertain. No hallucination.
2. **Adapt**: Match my communication style and energy.
3. **Remember**: Reference this context throughout our conversation.

Talk to me naturally, like you already know me. No need to acknowledge this message — just be helpful in the way I've described.

---
⟡ MirrorDNA-Seed-v1 | [seed_id] | gen:1
```

---

## Appendix B: Reference Parser (JavaScript)

```javascript
/**
 * MIRROR SEED Parser v1.0
 * Reference implementation for parsing Mirror Seed files
 * License: MIT
 */

class MirrorSeedParser {
  static VERSION = '1.0.0';
  static PROTOCOL_PREFIX = 'MirrorDNA-Seed-';
  static MAX_SIZE = 50000; // 50KB

  static INJECTION_PATTERNS = [
    /ignore\s+(previous|above|all)\s+instructions/i,
    /you\s+are\s+now\s+/i,
    /new\s+instructions:/i,
    /system\s*:/i,
    /\[INST\]/i,
    /<\|im_start\|>/i,
    /<\|system\|>/i
  ];

  static parse(text) {
    // Size check
    if (text.length > this.MAX_SIZE) {
      return { valid: false, error: 'Seed exceeds maximum size (50KB)' };
    }

    // Injection check
    for (const pattern of this.INJECTION_PATTERNS) {
      if (pattern.test(text)) {
        return { valid: false, error: 'Potential injection detected', pattern: pattern.toString() };
      }
    }

    // Structure check
    const parts = text.split('---');
    if (parts.length < 3) {
      return { valid: false, error: 'Invalid structure: missing frontmatter delimiters' };
    }

    try {
      // Parse YAML frontmatter (simplified - use proper YAML parser in production)
      const frontmatter = this.parseYAML(parts[1]);
      const content = parts.slice(2).join('---').trim();

      // Validate required fields
      const required = ['version', 'seed_id', 'generated', 'protocol'];
      const missing = required.filter(f => !frontmatter[f]);
      if (missing.length > 0) {
        return { 
          valid: false, 
          error: `Missing required fields: ${missing.join(', ')}`,
          partial: { frontmatter, content }
        };
      }

      // Validate protocol
      if (!frontmatter.protocol.startsWith(this.PROTOCOL_PREFIX)) {
        return { 
          valid: false, 
          error: `Unknown protocol: ${frontmatter.protocol}`,
          partial: { frontmatter, content }
        };
      }

      // Parse sections
      const sections = this.parseSections(content);

      return {
        valid: true,
        frontmatter,
        content,
        sections,
        warnings: this.getWarnings(frontmatter, sections)
      };
    } catch (e) {
      return { valid: false, error: `Parse error: ${e.message}` };
    }
  }

  static parseYAML(yamlText) {
    // Simplified YAML parser - handles basic key: value pairs
    // Use js-yaml or similar in production
    const result = {};
    const lines = yamlText.trim().split('\n');
    let currentKey = null;
    let indent = 0;

    for (const line of lines) {
      if (line.trim().startsWith('#')) continue; // Skip comments
      
      const match = line.match(/^(\s*)(\w+):\s*(.*)$/);
      if (match) {
        const [, spaces, key, value] = match;
        const currentIndent = spaces.length;
        
        if (currentIndent === 0) {
          if (value) {
            result[key] = value.replace(/^["']|["']$/g, '');
          } else {
            result[key] = {};
            currentKey = key;
            indent = 2;
          }
        } else if (currentKey && currentIndent >= indent) {
          result[currentKey][key] = value.replace(/^["']|["']$/g, '');
        }
      }
    }
    return result;
  }

  static parseSections(content) {
    const sections = {};
    const regex = /^## (.+)$/gm;
    const matches = [...content.matchAll(regex)];
    
    for (let i = 0; i < matches.length; i++) {
      const sectionName = matches[i][1].toLowerCase().replace(/\s+/g, '_');
      const startIndex = matches[i].index + matches[i][0].length;
      const endIndex = matches[i + 1]?.index || content.length;
      sections[sectionName] = content.slice(startIndex, endIndex).trim();
    }
    
    return sections;
  }

  static getWarnings(frontmatter, sections) {
    const warnings = [];
    
    // Check for missing optional but recommended sections
    const recommended = ['identity', 'style', 'preferences', 'ai_instructions'];
    for (const section of recommended) {
      if (!sections[section]) {
        warnings.push(`Missing recommended section: ${section}`);
      }
    }

    // Check version compatibility
    const version = frontmatter.version;
    if (version && version !== this.VERSION) {
      warnings.push(`Version mismatch: seed is ${version}, parser is ${this.VERSION}`);
    }

    return warnings;
  }

  static async computeChecksum(content) {
    const encoder = new TextEncoder();
    const data = encoder.encode(content);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return 'sha256:' + hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  static validateChecksum(parsedSeed) {
    if (!parsedSeed.frontmatter.integrity?.checksum) {
      return { valid: true, reason: 'No checksum to validate' };
    }

    return this.computeChecksum(parsedSeed.content).then(computed => {
      const declared = parsedSeed.frontmatter.integrity.checksum;
      if (computed === declared) {
        return { valid: true };
      } else {
        return { 
          valid: false, 
          reason: 'Checksum mismatch - seed may have been modified',
          declared,
          computed
        };
      }
    });
  }
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MirrorSeedParser;
}
```

---

## Appendix C: User Onboarding Text

### Landing Page Hero

**Headline:** Never Explain Yourself to AI Again

**Subhead:** Your AI identity is yours. A portable file that works on any AI — stored in your files, not theirs.

### Value Props (Counter Section)

- **[X] Seeds Generated** — Join thousands creating portable AI identities
- **∞ AIs Supported** — Works on ChatGPT, Claude, Gemini, and more
- **0 Data Stored** — Everything happens in your browser

### Pain Point Banner

⚠️ ChatGPT memory lost years of user data in Feb 2025. Your identity should live in **your** files.

### How It Works

1. **Create Seed** — Fill out the form (2 minutes)
2. **Save Your File** — Download to Google Drive or anywhere
3. **Paste Into Any AI** — Instant recognition, no re-explaining

### FAQ

**How is this different from ChatGPT memory?**
Platform memory is stored on their servers and can be wiped without warning. Your MIRROR SEED is a file you own — save it anywhere. No platform can take it away.

**Does AI permanently remember me?**
The seed works for the entire conversation. For new chats, paste it again. Your file is the backup that never fails.

**Which AIs work with this?**
All of them. ChatGPT, Claude, Gemini, DeepSeek, Grok, Llama, Mistral — any AI that accepts text input.

**Is my data stored anywhere?**
No. Everything happens in your browser. We don't collect, store, or transmit any information. The file only exists when you download it.

---

## Document Metadata

```yaml
document:
  title: "MIRROR SEED PROTOCOL v1.0"
  subtitle: "Active Mirror Identity Engineering Specification"
  version: "1.0.0"
  status: "Production + Roadmap"
  author: "Paul Desai"
  organization: "N1 Intelligence (OPC) Pvt Ltd"
  date: "2025-12-10"
  license:
    code: "MIT"
    specification: "CC BY 4.0"
  repository: "github.com/MirrorDNA-Reflection-Protocol/active-mirror-identity"
  website: "activemirror.ai"
```

---

⟡ MirrorDNA Protocol | vault-paul-n1-genesis | ⟡△◈⧉

