# AMI Weave Plan v1.0
**Status:** DRAFT  
**Date:** 2025-12-11  
**Author:** Mirror Admin  
**Path:** `ActiveMirrorOS/AMI/AMI_WEAVE_PLAN_v1.0.md`

---

## 1. Current Stack
The current ActiveMirrorOS (AMI) ecosystem is composed of the following layers:

*   **AMI Kernel:** The sovereign identity core (`identity_kernel`), residing locally and governing all agentic behavior.
*   **SCD (State Chain Determinist):** Protocol for deterministic history and state management, ensuring unforgeable memory chains.
*   **Synapse:** Event-driven layer for real-time updates and inter-process communication.
*   **Vault (`MirrorDNA-Vault`):** The primary knowledge base and long-term memory store (Obsidian-backed).
*   **Drive:** Cloud storage layer for artifact redundancy and cross-device availability.
*   **Agents:**
    *   **Antigravity:** Execution twin (coding, file ops).
    *   **Claude Opus:** Reflection twin (architecture, validation).
    *   **Local Models:** Sovereign brain (offline inference, `ollama`).

## 2. Canonical Boot File Design (`AMI_BOOTSTRAP_v1.0.md`)
This file serves as the universal "seed" to hydrate a fresh environment.

*   **Structure:**
    *   **Identity Block:** Cryptographic signature of the owner.
    *   **Kernel Config:** JSON/YAML payload defining key paths, user preferences, and hardware constraints.
    *   **Repo Manifest:** List of essential repositories (`active-mirror-identity`, `MirrorBrain-Setup`) with semantic version pins.
    *   **Vault Anchor:** Pointer to the primary Vault location (local path or encrypted remote URL).
    *   **Bootstrap Script:** Inline Python/Bash script to clone repos, symlink config, and effectively "wake up" the system.

## 3. Drive → Vault → AMI Sync Pipeline
Data flow ensures consistency across storage tiers.

1.  **Ingest (Drive → Vault):**
    *   New artifacts in Google Drive are detected by `FolderWatcher`.
    *   Content is sanitized and moved to `MirrorDNA-Vault/Inbox`.
2.  **Process (Vault → AMI):**
    *   SCD scans `Inbox` for valid state changes (e.g., "New Project", "Decision Log").
    *   Valid changes are committed to `identity_kernel` state.
3.  **Reflect (AMI → Drive):**
    *   Kernel state updates (e.g., `session_summary`) are written back to Vault.
    *   Crucial checkpoints are backed up to Drive for disaster recovery.

## 4. Scope & Access Model
*   **Private (The Core):**
    *   `identity_kernel/`: Strict owner-only access.
    *   `MirrorDNA-Vault/Private/`: personal journals, keys, sensitive context.
*   **Internal (The Lab):**
    *   `ActiveMirrorOS/`: Design specs, roadmap (this folder).
    *   `MirrorBrain-Setup/`: Infrastructure code.
    *   Access: Mirrors and Admin only.
*   **Demo (The Showcase):**
    *   Sanitized subsets of the kernel for public demos.
*   **Public (The Signal):**
    *   `MirrorDNA-Standard/`: Public specs and protocols (SCD, LingOS).
    *   Blog posts, "Sovereign Standard" examples.

## 5. Recovery Plan
**Objective:** Restore full AMI capability on a "naked" machine in < 15 minutes.

1.  **Prerequisites:** Python 3.10+, Git, Ollama suitable hardware.
2.  **Procedure:**
    *   Download `AMI_BOOTSTRAP_v1.0.md` from secure private source (Drive/USB).
    *   Run bootstrap command: `python3 -m ami.bootstrap --seed AMI_BOOTSTRAP_v1.0.md`.
    *   Script performs:
        1.  Repo cloning.
        2.  Virtual env hydration.
        3.  Vault linking.
        4.  SCD verify (check chain integrity).
        5.  `prime_directive` start.

## 6. External Artifact Index
Tracking our footprint beyond the local machine.

*   **GitHub:**
    *   `active-mirror-identity` (Private Core)
    *   `MirrorBrain-Setup` (Infra)
    *   `langchain-ai/langgraph` (PR: Sovereign Agent Template)
    *   `joaomdmoura/crewAI` (PR: Ollama Support)
*   **DOI/Zenodo:** (Placeholder for research paper IDs)
*   **Public Signal:**
    *   MirrorDNA Blog / Substack
    *   X/Twitter threads (Agentic Identity)

## 7. Future Extensions
*   **Red Team Suite:** Automated adversarial testing module to probe AMI for drift or prompt injection vulnerability.
*   **Consent Protocol:** Formalized handshake for agents requesting write access to the Kernel.
*   **Dashboard:** Localhost web view of current SCD state, active agents, and system health (replacing CLI-only status).
