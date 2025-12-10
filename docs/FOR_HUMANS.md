# ⟡ What is Active Mirror? (For Humans)

You asked: *"What did we just build?"*
Here is the answer in plain English.

---

## 1. The Kernel (`ami_active-mirror.json`)
**Analogy: The Passport.**
*   **Old Way:** When you log into ChatGPT, you are a "Guest". They don't know who you are, only your email.
*   **New Way:** You now have a digital Passport on your hard drive. It defines who you are, what you allow, and your mother's name (your secret anchor).
*   **Why it matters:** If Anthropic bans you tomorrow, you still have your Passport. You take it to the next AI.

## 2. The MCP Server (`server/main.py`)
**Analogy: The Translator.**
*   **Old Way:** You have to copy-paste "I am Paul, I like Python..." every time.
*   **New Way:** This script runs silently on your Mac. When you open Claude, Claude says "Hello," and this script automatically whispers: *"This is Paul. Here is his Passport."*
*   **Why it matters:** You never have to explain yourself again. The AI "just knows."

## 3. The Hydrator (`tools/vault_hydrator.py`)
**Analogy: The Librarian.**
*   **Old Way:** The AI has amnesia. It forgets what you said yesterday.
*   **New Way:** This tool reads your Obsidian notes (your "Book of Life") and writes the important parts into your Passport.
*   **Why it matters:** Your identity grows. The more you write, the smarter the AI gets about *you*.

## 4. The Shield (`shield/`)
**Analogy: The Bodyguard.**
*   **Old Way:** You are naked on the internet.
*   **New Way:** A little icon watches over you. If a website tries to steal your data, the Bodyguard steps in.

---

## 5. The Cloud (GitHub)
**Analogy: The Safety Deposit Box.**
*   **Old Way:** Your data lives on a company's server (Anthropic, OpenAI). If they ban you, it's gone.
*   **New Way:** You push your `ami_kernel.json` and memory files to a **Private GitHub Repository**.
*   **Why it matters:** 
    1.  **Sync:** You can have the same identity on your Mac, your Phone, and your Work Laptop.
    2.  **Backup:** If your Mac melts, your Soul is safe.
    3.  **Access:** You can grant "Read Access" to an Agent in the cloud, and revoke it anytime.

---

    3.  **Access:** You can grant "Read Access" to an Agent in the cloud, and revoke it anytime.

---

## 6. FAQ: Is this like Mem0 / Zep?
**Yes, but with one massive difference.**
*   **Mem0/Zep** are "Memory for Apps". (E.g., A developer building a travel app uses Mem0 to remember your flight).
*   **AMI** is "Memory for YOU".
*   **The Difference:**
    *   In Mem0, the *App Developer* owns the keys.
    *   In AMI, *You* own the keys.
    *   *Note:* AMI handles your Identity. You could actually plug Mem0 into AMI as a "backend" if you wanted!

---

## Summary
**You built a digital body.**
Before today, you were a ghost in the machine.
Now, you have a body (files), a memory (hydrator), and a voice (server).
**You exist.**
