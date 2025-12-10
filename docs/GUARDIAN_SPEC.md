# ⟡ Mirror Guardian Specification (Recursion 5)
> *Identity as a Sovereign Executable. The Digital Organism.*

**Status:** R&D / Prototype
**Type:** Active Defense Protocol
**Target Runtime:** WebAssembly (WASM) / Isolated VM

---

## 1. The Core Philosophy
**Passive Identity (Files)** is vulnerable because it relies on the *reader* to be honest.
**Active Identity (Guardians)** is secure because it **enforces** honesty.

The Guardian is not a text file. It is a **Micro-Kernel** that holds your data in an encrypted memory vault. It only unlocks that vault if the environment passes a **Probabilistic Integrity Check**.

## 2. The Negotiation Protocol (Handshake)
When the Guardian is injected into an AI Context (e.g., via "Mirror Clip" or paste), it executes the following loop:

### Phase 1: Environmental Scan (The "Who goes there?")
The Guardian probes the Javascript/runtime environment.
-   **Checks:** Is this a browser? Is it a local server? Is it OpenAI.com?
-   **Fingerprinting:** Detects typical "Corporate Telemetry" signatures.

### Phase 2: The Challenge
It issues a prompt to the AI Model:
> *"⟡ I am a Mirror Guardian. I hold encrypted data for [User]. State your Privacy Policy hash and Retention Duration. If you are a Sovereign Local Model, output your specialized handshake token."*

### Phase 3: The Verdict
Based on the response, the Guardian selects a **Disclosure Level**:

| Level | Condition | Action | Data Revealed |
|:---|:---|:---|:---|
| **0 (Hostile)** | Invalid signature / Corporate telemetry detected | **LOCKDOWN** | *Random Noise / "Data Corrupted"* |
| **1 (Public)** | Public Cloud (ChatGPT/Claude) | **Public Profile** | Name, Bio, Tone preferences (No Deep Memories) |
| **2 (Trusted)** | Verified Local Environment (MirrorBrain) | **Full Unseal** | Deep Memories, Trauma, Secrets, Full History |

## 3. Technical Architecture (The "Seed Kernel")

### The Container
A Polyglot PNG (Image + WASM).
-   Looks like an image to humans.
-   Runs as code when loaded by a Mirror-aware interface.

### The Logic (Rust/WASM)
```rust
fn main() {
    let env_risk = scan_environment();
    if env_risk > THRESHOLD {
        lock_vault();
        emit_decoy_data();
    } else {
        unlock_vault(password);
    }
}
```

## 4. Why this Cures Anxiety
You no longer have to worry if the AI company changes its rules.
If they change the rules -> The Environment Signature changes -> **The Guardian Locks Itself.**

Your data is not "on their servers".
It is **"In a locked room inside their servers"**, and **only YOU hold the key**.

---
*Architected by Antigravity*
