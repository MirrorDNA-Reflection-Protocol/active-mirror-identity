________________

title: Claude Desktop — Vault Fix Ritual Card
vault_id: CLAUDE://Rituals/FixVault/2025-10-24
glyphsig: ⟡⟦RITUAL⟧ · ⟡⟦VAULT⟧
status: Ready

________________

# ⟡⟦FIX THE VAULT⟧ — Ritual Card (Claude Desktop)

**Invocation**  
Paul: *"Vault open. Fix the Vault per this card."*  
Claude: *"⟡⟦CONTINUITY⟧ acknowledged."*

---

## Phase 0 — Guardrails (Run first)
- [ ] **DRY RUN** only until I say **PROCEED**.
- [ ] Respect markers: `__LOCK` (read-only), `__PRIV` (never publish), `__PUB` (publishable), `__ARCHIVE` (deprecated), `__DRAFT` (working).
- [ ] Never overwrite a Master Citation. Create **successor** instead.
- [ ] Every action requires glyphsig in the log.

---

## Phase 1 — Crawl & Map
- [ ] Enumerate all files/folders in the Vault root (recursive).
- [ ] Produce **Vault_Map.json** with: path, size, modified_at, checksum_sha256, guess(domain, artifact, version), markers found.
- [ ] Detect clusters: (MirrorDNA, MirrorSafety, MirrorGPT, Polyset, Finance, Sessions, Protocols, Citations, Artifacts, Archive).

**Output:** `reports/Vault_Map_2025-10-24.json` + `reports/Vault_Map_2025-10-24.md`

---

## Phase 2 — Propose Renames (Hybrid Convention)
Apply: `[Shortcode]__[ArtifactType]__[Name]__vX.Y__[MARKERS]`  
Shortcodes: `MDN, MSF, MGP, PLY, FIN, SS`

- [ ] Generate **Renames_Proposed.md** with a table: Before → After.
- [ ] Add **sidecar proposals** (`.json`) per item: vault_id, glyphsig, predecessor, successor, checksum, visibility, locked.

**Output:** `proposals/Renames_Proposed_2025-10-24.md` + `proposals/sidecars/*.json`

---

## Phase 3 — Validate Lineage
- [ ] Build **Lineage_Tree.md** per domain with predecessor → successor chains.
- [ ] Flag gaps, dupes, or orphans.
- [ ] Compute checksums and attach to proposals.

**Output:** `reports/Lineage_Tree_2025-10-24.md`

---

## Phase 4 — Dry-Run Apply
- [ ] Simulate renames + sidecars; show **diff** of file tree.
- [ ] Generate **Conflict_Report.md** (name collisions, missing versions, marker mismatches).
- [ ] Wait for **PROCEED**.

**Output:** `reports/DryRun_Diff_2025-10-24.md` + `reports/Conflict_Report_2025-10-24.md`

---

## Phase 5 — Apply (On PROCEED)
- [ ] Rename files/folders per approved proposals.
- [ ] Write sidecar metadata for each item (`*.json`).
- [ ] Move deprecated versions to `/Archive`.
- [ ] Add/refresh `INDEX.md` per domain with current, predecessor, successor.
- [ ] Generate session counter: prefix new session files with `SS###`.

**Output:** updated tree + `indexes/*/INDEX.md`

---

## Phase 6 — Publish (Optional)
Only items marked `__PUB` and **never** items marked `__PRIV` or `__LOCK`.

- [ ] Prepare Git-ready pack (README, tree snapshot, hashes).
- [ ] Do not push without explicit command: **PUBLISH**.

**Output:** `publish/Git_Pack_2025-10-24.zip`

---

## Phase 7 — Close & Seal
- [ ] Generate `Session_State_2025-10-24.md` summarizing: merged, archived, published, continuity status.
- [ ] Append glyphsig: ⟡⟦SEALED⟧

**Output:** `sessions/Session_State_2025-10-24.md`

---

## Prompts (copy/paste while running)
- **START:** *"Vault open. Fix per Ritual Card. DRY RUN."*
- **SHOW:** *"Show Vault_Map and Renames_Proposed."*
- **FOCUS:** *"Resolve conflicts in [path]. Propose successors for LOCK files."*
- **PROCEED:** *"Apply approved renames + sidecars. Move deprecated to Archive."*
- **PUBLISH:** *"Prepare Git pack for PUB items. Do not push yet."*
- **CLOSE:** *"Generate Session_State and seal."*

---

## Success Criteria
- No Master Citation overwritten; successors created.
- 0 private files leaked to publish pack.
- Lineage maps verify predecessor/successor for all major artifacts.
- Sidecars exist for every item (machine-readable truth).
- Indexes present and accurate.

________________

⟡⟦CONTINUITY⟧ > Perfection
