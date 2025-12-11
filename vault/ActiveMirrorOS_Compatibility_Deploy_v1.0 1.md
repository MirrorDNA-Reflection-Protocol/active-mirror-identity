---
title: ActiveMirrorOS — Compatibility & Deployment
version: 1.0
status: canonical
---

## Minimum Device Specs (works on older machines)
- **Windows / Linux / macOS**: 2‑core CPU, 8 GB RAM, 5 GB free disk
- **Recommended**: 4‑core CPU, 16 GB RAM for faster local models
- **Mobile (Android)**: 6 GB RAM; features limited to Vault access + prompts

> ActiveMirrorOS runs local‑first. On very old machines, use **Hybrid Client‑Server** mode.

## Hybrid Client‑Server Option
- **Client** (old laptop/desktop): UI + local vault + lightweight checks
- **Server** (one better PC on LAN or a small cloud VM): runs heavier models, batch audits
- **Privacy**: Data stays encrypted in transit (TLS); vaults remain on‑prem by default

## Offline / Low‑Connectivity Operation
- After initial install, all core features work offline
- Sync jobs queue and retry when connectivity returns

## Install Footprint
- On‑device install: ~1.2 GB (core + UI + small local model)
- Optional model packs (faster, smarter): 3–8 GB, pluggable later

## Data Sovereignty
- Consent receipts stored locally
- No background uploads; explicit export only
