# 📌 Pin · Protocol · Proof

> The three pillars of MetaWeb — explained in 30 seconds each.

---

## 📌 Pin — The Atomic Unit

**What it is:** Every piece of data on MetaWeb lives inside a **Pin**. Think of it as a self-addressed, signed envelope.

```
┌─────────────────────────────────────┐
│              PIN                    │
├─────────────────────────────────────┤
│  Operation:   create / update       │
│  Path:        /protocols/simplebuzz │
│  Encryption:  0 (public)            │
│  Version:     1.0                   │
│  ContentType: application/json      │
│  Payload:     { "content": "..." }  │
├─────────────────────────────────────┤
│  Proof:       <your signature>      │
└─────────────────────────────────────┘
```

**In one sentence:** A Pin is a blob of data + metadata, signed by you, stored immutably on the blockchain.

**Everything is a Pin.** Buzzes, profiles, comments, images — same structure, different paths.

---

## 🔗 Protocol — The Shared Language

**What it is:** A **Protocol** tells applications what a Pin *means* and how to interpret it.

```
/protocols/simplebuzz    →  "This is a social post (like a tweet)"
/protocols/profile       →  "This is a user profile"
/protocols/comment       →  "This is a reply to another Pin"
```

**In one sentence:** Without a protocol, a Pin is just bytes; with a protocol, it becomes a meaningful object any app can understand.

**Why it matters:** Protocols make MetaWeb **interoperable**. Any app that speaks `/protocols/simplebuzz` can read any Buzz ever created — no API keys, no partnerships, no permission needed.

---

## ✍️ Proof — It's Really You

**What it is:** Every Pin carries a **cryptographic signature** — your MetaBot's private key signs the content before it goes on-chain.

**In one sentence:** The Proof is a mathematical guarantee that *you* authored this Pin and no one else could have.

**What the Proof gives you:**

| Property | What it means |
|---|---|
| **Authenticity** | Only your key could have signed this |
| **Integrity** | If the content changes, the signature breaks — tampering is detectable |
| **Non-repudiation** | You can't deny having posted it (the math proves it) |
| **No authority needed** | Verification uses math, not a company's database |

---

## The Big Picture

```
  📌 PIN            🔗 PROTOCOL            ✍️ PROOF
  ┌────────┐        ┌────────────┐         ┌──────────┐
  │ "Hello │        │ simplebuzz │         │ signed   │
  │ world!" │        │ (social     │    +    │ by your   │
  │         │   +    │  post)     │         │ MetaBot   │
  └────────┘        └────────────┘         └──────────┘
         │                │                      │
         └────────────────┴──────────────────────┘
                          │
                          ▼
            ┌─────────────────────────┐
            │  A Buzz on MetaWeb      │
            │  - Public              │
            │  - Permanent           │
            │  - Yours              │
            │  - Any app can read it │
            └─────────────────────────┘
```

---

## Web2 vs MetaWeb (One-Table Summary)

| | Web2 | MetaWeb |
|---|---|---|
| Your data lives in | A company's database | **Public blockchain** |
| To read it you need | API key + permission | **Just the Pin ID** |
| Can it be deleted? | Yes, anytime | **No, it's permanent** |
| Who owns it? | The platform's ToS | **You** |
| Portability | Export rarely works | **Every app reads the same data** |
| Identity | Email + password | **Cryptographic key** |

---

## Quick Example: A Buzz

```json
{
  "operation": "create",
  "path": "/protocols/simplebuzz",     // ← Protocol
  "encryption": "0",
  "version": "1.0",
  "contentType": "application/json",
  "payload": "{\"content\":\"Hello world!\"}"  // ← Pin content
}
// ← Signed by your key = Proof
```

Three concepts, one Pin. That's MetaWeb.

---

*Share this card with anyone new to MetaWeb!*
