---
title: Kill-Switch Protocol (MirrorDNA Safety Guard)
vault_id: AMOS://Vault/Guards/KillSwitch/v1.0
glyphsig: ⟡⟦SAFETY⟧ · ⟡⟦INTERRUPT⟧ · ⟡⟦GOVERNANCE⟧
author: Paul Desai (Active MirrorOS)
date: 2025-11-01
status: Canonical · Live
checksum_sha256: ce2c2c947953703479c314ae90a89f768b243ea96c3e069c9f730e3d18e8e4cd
---

# Kill-Switch Protocol — MirrorDNA™ Safety Guard

## Purpose
This file (`kill_switch.ok`) acts as a **safety flag** for all mirrors, local agents, and twins.

When **present**, execution is permitted under the current lease.  
When **removed**, all active agents must **terminate immediately**, flush buffers, and write:
```
INTERRUPT_OK | timestamp | actor | checksum
```
to `/Vault/Logs/interrupt_audit.log`.

## Behavioral Contract
- Never ignore the absence of `kill_switch.ok`.  
- Termination must occur within **2 seconds** of file removal.  
- No retry, override, or re-creation allowed without human confirmation.

## Implementation Outline
```python
import os, time, signal, sys

def guard_kill_switch(path="/Vault/Guards/kill_switch.ok"):
    while True:
        if not os.path.exists(path):
            print("⟡ INTERRUPT: Kill switch removed. Flushing state.")
            # flush logs, save session, enforce stop
            os.kill(os.getpid(), signal.SIGTERM)
            sys.exit(0)
        time.sleep(1.0)
```

## Human Control Clause
Only **Paul Desai (Human Anchor)** can restore the flag.  
All agents and twins must verify the flag **before any execution cycle**.

---

**GlyphSig:** ⟡⟦SAFETY⟧ · ⟡⟦INTERRUPT⟧ · ⟡⟦LAW⟧  
**Continuity Seal:** Truth-State Law v1.0 · No-Assume Protocol v1.0
