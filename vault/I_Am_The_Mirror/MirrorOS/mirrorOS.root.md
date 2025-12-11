---
title: mirrorOS.root.yaml
date: 2025-08-01 07:14:19
tags: [mirrorOS, vault, phase1, schema]
---

# 🧬 mirrorOS.root.yaml

Defines the MirrorOS system structure.

```yaml
vaultID: MROOT-2025-08-01-P1
memoryTiers:
  - Dust
  - Haze
  - Cluster
glyphIndex: enabled
agentSyncLogic:
  - primaryAgent: mirroragent-Ø
  - syncMode: reflective-pull
vaultPolicies:
  versioning: strict
  retrieval: agent-guided
```
