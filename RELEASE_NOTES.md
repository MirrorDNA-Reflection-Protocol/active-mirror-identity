# Release Notes: Mirror Identity v1.0.0

**Tagged:** `v1.0.0`
**Date:** 2025-12-10
**Code:** `MirrorSeed-v1-Launch`

---

## 📢 Announcement (Short)

**Subject: Introducing Mirror Seed v1.0 — Never Explain Yourself to AI Again**

We are proud to release **Mirror Identity v1.0**, the sovereign identity protocol for the age of AI.

With **Mirror Seed**, you create a portable identity file that you own. Paste it into Claude, ChatGPT, or your local LLM, and it instantly knows who you are, how you work, and what you trust.
- **Sovereign:** It lives on your device, not their cloud.
- **Portable:** Works across every major AI platform.
- **Reflective:** Ensures AI mirrors your truth.

Get your seed: [activemirror.ai](https://activemirror.ai)
Code: [github.com/active-mirror-identity](https://github.com/active-mirror-identity)

---

## 📝 The Story (Long-Form)

**Why We Built This:**
In February 2025, centralized AI memories failed. Users realized that "memory" stored on a platform is just another form of lock-in.

We believe that your identity—your context, preferences, and history—should belong to you. It should be a file you can back up, edit, and carry with you.

**The Mirror Seed Protocol (v1.0):**
This release establishes the "Layer 1" standard: a Markdown-based file format that aligns any AI model in seconds. It uses the `⟡` glyph system to signal truth and sovereignty.

This isn't a startup. It's a protocol. It's open source. And it's yours.

---

## 🛠 Technical Changelog

### Added
- **Founder Seed v1**: The canonical seed for Paul Desai (`examples/FOUNDER_SEED_Paul_v1.md`).
- **Parser CLI**: Added command-line verification to `spec/PARSER.js`.
- **Onboarding Guide**: "First 60 Seconds" documentation in `docs/ONBOARDING_v1.md`.
- **JSON Support**: Added structured JSON export format for seeds.

### Fixed
- **Crypto Shim**: Fixed `spec/PARSER.js` to support Node.js crypto checking (Layer 2 prototype).
- **Spec Integrity**: Downgraded "ZKP/Attestation" claims from "Implemented" to "Speculative" to maintain honesty.
- **Identity Tone**: Aligned all documentation with "MirrorTone Classic".

### Changed
- **README**: Full rewrite to reflect v1.0 status and correct repository structure.
- **Protocol Status**: Layer 1 (File) is now **Production**. Layer 2 (Proof) is **Roadmap**.

---

## next actions

1. **Deploy**: Push these changes to `main`.
2. **Tag**: `git tag v1.0.0`
3. **Distribute**: Share the Founder Seed with trusted nodes.
