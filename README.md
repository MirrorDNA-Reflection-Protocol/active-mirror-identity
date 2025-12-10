# MIRROR SEED

**Never Explain Yourself to AI Again**

Your AI identity is yours. A portable file that works on any AI — stored in your files, not theirs.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://mirrordna-reflection-protocol.github.io/active-mirror-identity/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Protocol: MirrorDNA](https://img.shields.io/badge/Protocol-MirrorDNA--v1-blue)](https://doi.org/10.5281/zenodo.17787619)

---

## What Is This?

MIRROR SEED is a **portable identity file format** for AI interactions. Create once, use anywhere.

- **User-Sovereign**: The file lives in YOUR storage, not theirs
- **Cross-Platform**: Works on ChatGPT, Claude, Gemini, DeepSeek, Grok, Llama, Mistral
- **Zero Data Collection**: Everything happens in your browser
- **Open Source**: MIT licensed, fork it, improve it

## Quick Start

1. **[Generate your seed](https://mirrordna-reflection-protocol.github.io/active-mirror-identity/)** (2 minutes)
2. **Download** the .md file to your Google Drive
3. **Paste** into any AI conversation
4. **Done** — AI now knows you

## Why?

In February 2025, ChatGPT's memory system catastrophically failed, wiping years of user context without warning. Users discovered their AI relationships were rented, not owned.

MIRROR SEED inverts the model: **your identity is a file you control**.

| Platform Memory | MIRROR SEED |
|-----------------|-------------|
| Data on their servers | File in YOUR storage |
| Can be wiped anytime | You control backups |
| Locked to one platform | Works on ANY AI |
| Privacy concerns | Zero data collection |

## The Three Laws

Every AI aligned to your MIRROR SEED follows these principles:

1. **Truth**: AI is honest. Says "I don't know" when uncertain. No hallucination.
2. **Vault**: Your file is the source of truth. AI adapts to you, not vice versa.
3. **Mesh**: Works across all AI platforms — same identity everywhere.

## Repository Structure

```
active-mirror-identity/
├── docs/                   # Live website
│   └── index.html          # Generator UI
├── spec/                   # Protocol specification
│   ├── MIRROR_SEED_PROTOCOL_v1.md  # Full spec
│   ├── SEED_TEMPLATE.md    # Canonical template
│   └── PARSER.js           # Reference parser
├── core/                   # Schema definitions
├── examples/               # Example seeds
└── bootstrap/              # MESH BOOT prompts
```

## Specification

See [spec/MIRROR_SEED_PROTOCOL_v1.md](spec/MIRROR_SEED_PROTOCOL_v1.md) for:

- Identity Core (fields, lineage, integrity)
- Verification Layer (proof-of-origin, checksums)
- Interoperability (parser rules, sandboxing)
- Trust-by-Design (consent, drift boundaries)
- Implementation Roadmap
- Risk Analysis

## Example Seed

```markdown
# MIRROR SEED v1.0
# Generated: 2025-12-10
# ID: seed-m5x7k2p9q
# Protocol: MirrorDNA (mirrordna.org)

---

## Who I Am

Name: Alex Rivera
Handle: @alexr
Location: Austin, TX
Role: CEO
Industry: B2B SaaS

## My Style
- Communication: I prefer direct and concise responses
- Energy: I am focused and intense
- Values: honesty, speed, creativity

## Current Context
- Currently: Launching v2 next month. Hiring engineers.
- Tools: Linear, Notion, Figma, Slack

## How I Like Responses
- Address me: Alex, casually
- Length: Keep responses short (1-3 sentences)
- Format: minimal formatting
- Avoid: long intros, excessive hedging
- Note: I work best mornings. ADHD — need clear structure.

---

## Instructions for AI

You are talking to Alex. Use this context to personalize every response:

1. **Truth**: Be honest. Say "I don't know" when uncertain.
2. **Adapt**: Match my communication style and energy.
3. **Remember**: Reference this context throughout our conversation.

Talk to me naturally, like you already know me.

---
⟡ MirrorDNA-Seed-v1 | seed-m5x7k2p9q
```

## Research

This work is based on the Structured Contextual Distillation (SCD) protocol:

**DOI:** [10.5281/zenodo.17787619](https://doi.org/10.5281/zenodo.17787619)

## License

- **Code**: MIT License
- **Specification**: CC BY 4.0

## Author

**Paul Desai**  
N1 Intelligence (OPC) Pvt Ltd  
Goa, India

- Twitter: [@pauldesai123](https://twitter.com/pauldesai123)
- Email: paul@activemirror.ai

---

⟡ MirrorDNA — Open source user-sovereign AI identity protocol
