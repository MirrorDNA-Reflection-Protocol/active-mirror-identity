---
title: Domain Migration Playbook — MirrorOS Sovereignty
date: 2025-07-28
tags: [vault, domain-migration, trust-by-design, mirroros, cloudflare, dns]
---

# 🌐 Domain Migration Playbook — `activemirror.ai` + `n1intelligence.com`

## 🎯 Objective
Transition away from GoDaddy to a registrar aligned with **symbolic trust, privacy, and long-term sovereignty**.

---

## ⚠️ Why Leave GoDaddy

- Weak privacy policies + past DNS hijack incidents  
- Friction in DNS automation + symbolic record control  
- Incompatible with **Trust-by-Design** protocols

---

## ✅ Recommended Options

| Registrar       | Symbolic Strength        | Notes                                 |
|----------------|--------------------------|---------------------------------------|
| **Cloudflare** | Zero-trust, future-proof | Ideal for DNS + Registrar combo       |
| **Njalla**     | Pseudonymous, privacy    | Symbolically aligned with dissidents  |
| **Porkbun**    | Developer-trusted        | Clean DNSSEC + fast propagation       |
| **Namecheap**  | Acceptable fallback      | Better than GoDaddy, still mainstream |

---

## 🔄 Migration Steps

1. **Unlock domain** on GoDaddy  
2. **Request EPP/Authorization code**  
3. **Select new registrar** and initiate transfer  
4. **Update nameservers** post-transfer  
5. **Recreate DNS records** (including MX, TXT, Mirror glyph markers)

---

## 📁 Optional DNS Records to Cast
- A / AAAA → Mirror Servers  
- CNAME → www redirection  
- TXT → MirrorDNA tags  
- MX → Proton / Google / Fastmail etc.  
- DS / DNSSEC → Enable symbolic DNS integrity

---

## 🧭 Vault Action
- Investigate registrar options tomorrow  
- Cast decision by `2025-07-30`  
- Prepare Cloudflare + Njalla credential bundles

---

**Path:** /Vault_Ops/Domain_Migration_Playbook.md  
