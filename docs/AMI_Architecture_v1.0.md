# AMI Architecture v1.0
## Overview
The Active Mirror Identity (AMI) Kernel is a sovereign, self-contained identity system designed to decouple "Who You Are" from "Which Model You Are Using".

## Components
1. **Identity Kernel**: The central source of truth (SCD State).
2. **Vault**: Read-only symlink to user's Obsidian Vault.
3. **Synapse**: Nervous system event bus (Watchdog).
4. **Handoff Bus**: Cross-agent message queue.
5. **Firewall**: Integrity guard against unauthorized writes.
6. **Fingerprint**: Runtime host verification.