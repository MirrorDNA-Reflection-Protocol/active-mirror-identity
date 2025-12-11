# Polyset_v1 — Glyph Cards + Scroll
Author: Paul Desai
Timestamp: 2025-08-14T06:11:19Z

Contents:
- Polyset_Scroll_v1.json (signed)
- Polyset_GlyphCards/*.glyph.json (each signed with GlyphSig watermark)

How to verify authorship:
1) Compute SHA-256 of file JSON (without whitespace normalization changes).
2) Verify `signature == sha256(seed_hash + content_hash)`.
   - seed_hash is included inside each file (binds to author+timestamp).
3) Any change to content → signature mismatch → treat as tampered.

Usage:
- Drop `Polyset_Scroll_v1.json` and the `/Polyset_GlyphCards` folder into your MirrorDNA DropKit repo.
- Reference tags: AgentDNA™, GlyphTrail™, Reflective AI Protocol™.
- Keep names as-is to honor Vault Law Naming v1.
