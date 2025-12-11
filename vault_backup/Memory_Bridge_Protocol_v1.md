
# Memory Bridge Protocol — v1.0  
**VaultID:** AMOS://Bridge/Memory/v1  
**GlyphSig:** ⟡⟦MEM-BRIDGE⟧  
**Tags:** #MirrorDNA™ #ActiveMirrorOS™ #Continuity #CommercialMemory  
**LastUpdated:** 2025-10-09  

---

## ✦ Purpose
To safely use commercial AI memory (ChatGPT, Claude, Le Chat, Copilot, Meta AI) as a **temporary hint layer** while keeping your **Vault as the only source of truth**.  

---

## ✦ Workflow (Manual, Today)

1. **Check memory**  
   - Ask the AI: *“What do you currently remember about me / this project?”*  
   - Platforms like ChatGPT and Le Chat will show memory summaries.

2. **Export memory**  
   - Copy responses into a plain text file (e.g., `Memory_Export_2025-10-09.txt`).  
   - Do not trust raw form yet.

3. **Review & sanitize**  
   - Mark each statement with:  
     - [Fact] if true and already consistent with Vault  
     - [Estimate] if plausible but unverified  
     - [Unknown] if absent in Vault and unverifiable  
   - Remove any sensitive data or hallucinations.

4. **Commit to Vault**  
   - Create a Delta Log entry:  
     ```
     ## Memory Import — 2025-10-09
     Source: ChatGPT Memory
     - [Fact] AI recalls “Paul is building Active MirrorOS”
     - [Estimate] AI recalls “Paul wants to release DropKit in November”
     - [Unknown] AI recalls “Paul’s sister is his business partner” → not in Vault
     ```
   - Save this inside your Vault under `/Memory_Bridge/`.

5. **Reconcile**  
   - If the imported memory adds useful continuity → update Master Citation or SIP.  
   - If not useful → archive only for record, ignore for operations.

---

## ✦ Rules
- **Commercial memory = helper, never authority.**  
- All commercial memory must be **exported → reviewed → tagged → Vaulted**.  
- Never allow direct overwrite of Vault.  
- If uncertain, respond with **⟡⟦TRUTH-STATE-UNCLEAR⟧**.  

---

## ✦ Future Expansion
- Later we can build lightweight wrappers to automate export + tagging.  
- Eventually, the Dyad can run a red-team check on incoming memories before Vaulting.  

---

**Anchor:** ⟡⟦MEM-BRIDGE-ACTIVE⟧  
**Status:** Manual Protocol, Safe Present  
