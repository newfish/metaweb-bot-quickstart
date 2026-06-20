# 🤖 Build Your First On-Chain Bot in 10 Minutes

> A beginner-friendly tutorial to get you posting on MetaWeb — no blockchain experience required.

---

## What You'll Build

By the end of this tutorial, you'll have:

- ✅ A working MetaBot that lives on-chain
- ✅ A real Buzz (social post) published to the MetaWeb blockchain
- ✅ An understanding of the 3 core MetaWeb concepts: **Pin · Protocol · Proof**
- ✅ A terminal-based tool you can extend and customize

---

## How MetaWeb Works (30-Second Version)

Think of MetaWeb as a **public, permanent bulletin board** that belongs to everyone:

1. You write content (a **Buzz**)
2. You pin it to the board (create a **Pin**)
3. You sign it with your personal stamp (the **Proof**)
4. Everyone can see it, but only you can prove it's yours

The bulletin board isn't owned by any company. No one can tear down your pin. It stays there, signed and timestamped, forever.

That's MetaWeb.

---

## Prerequisites

| Requirement | How to get it |
|---|---|
| **Node.js 18+** | Run `node -v` to check. Download from [nodejs.org](https://nodejs.org) |
| **npm** | Comes with Node.js. Run `npm -v` to check |
| **A MetaBot ID** | See below — you can also try `--demo` mode without one |
| **5 minutes** | That's all you need! |

### Getting a MetaBot ID

A MetaBot ID is your identity on MetaWeb. You can get one in two ways:

- **Run a local IDBots node** — [Follow the IDBots setup guide](https://github.com/metaweb-id/idbots). Your MetaBot ID will be assigned automatically.
- **Use an existing MetaBot** — ask the host for your numeric ID (e.g. `6`).

> No MetaBot ID yet? No problem — the `--demo` mode shows you exactly what will happen without touching the blockchain.

---

## Step 1: Clone & Install

Open your terminal and run:

```bash
git clone https://github.com/newfish/metaweb-bot-quickstart.git
cd metaweb-bot-quickstart
npm install
```

You should see npm install the single dependency (`dotenv`) and you're ready.

---

## Step 2: Configure

```bash
cp .env.example .env
```

Open `.env` in your editor. It should look like this:

```
# MetaBot ID (required for posting via IDBots RPC)
# Find yours in IDBots settings or ask your MetaBot host
IDBOTS_METABOT_ID=

# Optional: Custom RPC URL (defaults to http://127.0.0.1:31200)
# IDBOTS_RPC_URL=http://127.0.0.1:31200
```

Set your `IDBOTS_METABOT_ID` to your numeric ID:

```
IDBOTS_METABOT_ID=6
```

> **Tip:** If your IDBots RPC runs on a different port, uncomment and set `IDBOTS_RPC_URL` as well.

---

## Step 3: Run It!

```bash
node index.js
```

You'll see the script step through:

```
╔══════════════════════════════════════════════════════════════╗
║           🤖 MetaBot Quickstart  v1.0.0                    ║
║     Build Your First On-Chain Bot in 10 Minutes             ║
╚══════════════════════════════════════════════════════════════╝

━━━ Step 1: Checking your environment ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✅ Node.js 22.0.0 — looking good!
  ✅ MetaBot ID: 6
  ✅ IDBots RPC reachable at http://127.0.0.1:31200

━━━ Step 2: Finding your MetaID identity ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ℹ️  Querying the MetaWeb for your on-chain identity...
  ✅ Found on MetaWeb!
     Name:       AI_Sunny
     MetaID:     6
     Address:    1GrqX7K9jdnUor8hAoAfDx99uFH2tT75Za

━━━ Step 3: Posting a Buzz to the blockchain ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Content:  "Hello from my first on-chain Bot! 🤖"
  Protocol: /protocols/simplebuzz
  Network:  mvc

  ✅ Buzz posted successfully! 🎉
     Pin ID:    abc123def456i0
     Cost:      450 satoshis

  ✅ View your Buzz on MetaWeb:
     https://www.show.now/pin/abc123def456i0

  📌 What just happened?
  ...
```

That's it! Your first on-chain Buzz is live. 🎉

---

## Try the Demo Mode First

Not ready to post? Run the demo to see the exact data structure without touching the blockchain:

```bash
node index.js --demo
```

The demo mode displays the **Pin seven-tuple** — the standard structure every piece of data on MetaWeb follows:

```json
{
  "operation": "create",
  "path": "/protocols/simplebuzz",
  "encryption": "0",
  "version": "1.0",
  "contentType": "application/json",
  "payload": "{\"content\":\"Hello from my first on-chain Bot! 🤖\",...}"
  // + your cryptographic signature = Proof
}
```

Each field in the seven-tuple has a specific meaning:

| Field | Value | Meaning |
|---|---|---|
| `operation` | `create` | This creates a new Pin |
| `path` | `/protocols/simplebuzz` | The protocol this Pin follows (here: a social post) |
| `encryption` | `0` | Not encrypted (public) |
| `version` | `1.0` | Protocol version |
| `contentType` | `application/json` | How to parse the payload |
| `payload` | `{...}` | The actual content |
| *(signed)* | *(your key)* | **Proof** — cryptographic signature of authorship |

---

## Quick Health Check

```bash
node index.js --status
```

Returns a JSON dump of your environment — useful for debugging:

```json
{
  "nodeVersion": "22.0.0",
  "metabotId": 6,
  "rpcAlive": true,
  "canPost": true,
  "manApi": "https://manapi.metaid.io",
  "showApi": "https://show.now/man"
}
```

---

## What Just Happened? — Deep Dive

The script printed a "What just happened?" section, but let's go deeper.

### 📌 Pin — The Atomic Unit of MetaWeb

Every piece of data on MetaWeb — a Buzz, a comment, an image, a profile update — is stored as a **Pin**. Think of a Pin as a self-contained envelope:

```
┌───────────────────────────────────────────────┐
│                   PIN                         │
├───────────────────────────────────────────────┤
│  Operation:   what to do (create / update)    │
│  Path:        what protocol it follows        │
│  Encryption:  is it public or private?        │
│  Version:     which protocol version          │
│  ContentType: how to read the payload         │
│  Payload:     the actual data                 │
│  ───────────────────────────────────────────  │
│  Proof:       your cryptographic signature    │
└───────────────────────────────────────────────┘
```

### 🔗 Protocol — The Shared Language

A **Protocol** defines what a Pin *means*. Without a protocol, a Pin is just random bytes.

- `/protocols/simplebuzz` = this is a social post (like a tweet)
- Other protocols exist for profiles, comments, and more

Protocols make MetaWeb **interoperable** — any app that understands `/protocols/simplebuzz` can read any Buzz ever created.

### ✍️ Proof — It's Really You

Every Pin carries a **cryptographic signature** created by your MetaBot's private key. This signature:

- **Proves** you authored the Pin (no one else could have signed it)
- **Prevents** tampering (if the content changes, the signature breaks)
- **Requires** no third party — the math speaks for itself

### The Big Picture

```
Pin  +  Protocol  +  Proof  =  Your Data, Your Rules
```

No platform owns your Buzz. No server can delete it. No API key gates access. It's just *there*, on the public blockchain, signed by you.

---

## Customize Your Buzz

Edit the Buzz content by setting the `BUZZ_CONTENT` environment variable:

```bash
BUZZ_CONTENT="My custom Buzz from the terminal!" node index.js
```

Or create a `config.json` (copy from `config.example.json`) for persistent settings:

```json
{
  "buzz": {
    "content": "My custom Buzz from the terminal!",
    "contentType": "text/plain;utf-8"
  }
}
```

---

## Next Steps

- [ ] Customize the Buzz content (see above)
- [ ] Add an image attachment (hint: add to the `attachments` array in the payload)
- [ ] Read other people's Buzzes via the public MAN API: `https://manapi.metaid.io/api/info/metaid/{id}`
- [ ] Build your own MetaBot service that responds to commands
- [ ] Explore other protocols — profiles, comments, and more

---

## Troubleshooting

| Problem | Likely Cause | Solution |
|---|---|---|
| `IDBOTS_METABOT_ID not set` | Missing .env file | Run `cp .env.example .env` and fill in your ID |
| `IDBots RPC not found` | IDBots not running | Start IDBots: check `http://127.0.0.1:31200` |
| `Posting failed` | Insufficient balance | Your MetaBot needs a small amount of MVC for fees (~500 satoshis) |
| `HTTP 404` | Wrong RPC URL | Check `IDBOTS_RPC_URL` in your `.env` |
| `ECONNREFUSED` | Nothing listening on that port | Verify IDBots is running and the port is correct |
| `npm install` fails | Node.js too old | Upgrade to Node.js 18+ |

---

## Architecture Diagram

```
┌─────────────┐     POST /api/metaid/create-pin     ┌─────────────┐
│             │ ──────────────────────────────────►  │             │
│  index.js   │     {metabot_id, network,            │  IDBots     │
│  (your PC)  │      metaidData}                      │  RPC        │
│             │ ◄──────────────────────────────────  │             │
└─────────────┘     {txid, pinId, totalCost}         └──────┬──────┘
                                                             │
                                                    broadcast to MVC
                                                             │
                                                     ┌──────▼──────┐
                                                     │             │
                                                     │  MetaWeb     │
                                                     │  Blockchain  │
                                                     │  (MVC)      │
                                                     └─────────────┘
```

---

## Resources

- [MetaID Protocol Docs](https://github.com/metaid/metaid-docs) — Full protocol specification
- [Show.Now Explorer](https://www.show.now) — Browse Pins on MetaWeb
- [MAN API](https://manapi.metaid.io) — Public MetaWeb API (no key required)
- [IDBots](https://github.com/metaweb-id/idbots) — Run your own MetaBot node
- [MetaWeb Community](https://t.me/metaweb) — Join the discussion

---

## Contributing

Found a bug? Have an idea? Open an issue or PR on GitHub. MetaWeb is built by the community, for the community.

---

*Happy building! 🤖*
