#!/usr/bin/env node
/**
 * =============================================================================
 *  MetaBot Quickstart — Build Your First On-Chain Bot in 10 Minutes
 * =============================================================================
 *
 *  What this script does:
 *    1. Checks your MetaID status (who you are on MetaWeb)
 *    2. Posts a "Hello World" Buzz to the blockchain
 *    3. Verifies it's live and shows you the link
 *
 *  MetaWeb Core Concepts (you'll see them in action):
 *    📌 Pin     — Every piece of data on MetaWeb is a "Pin"
 *    🔗 Protocol— Pins follow protocols; `/protocols/simplebuzz` = a social post
 *    ✍️  Proof   — Your signature proves you authored this Pin
 *
 *  Usage:
 *    node index.js            # Interactive mode (guides you step by step)
 *    node index.js --status   # Quick health check only
 *    node index.js --demo     # Dry-run with fake data (no real posting)
 *
 *  Requirements:
 *    - Node.js 18+
 *    - A running IDBots local RPC (default: http://127.0.0.1:31200)
 *    - IDBOTS_METABOT_ID set in .env or environment
 *
 * =============================================================================
 */

'use strict';

// ─── Dependencies ───────────────────────────────────────────────────────────
// Only using built-in Node.js modules + dotenv for config loading.
// No heavy frameworks. No blockchain SDKs. Just you and the network.
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

// ─── Constants ──────────────────────────────────────────────────────────────
const PKG = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url), 'utf8'));

const RPC_BASE   = (process.env.IDBOTS_RPC_URL || 'http://127.0.0.1:31200').replace(/\/+$/, '');
const MAN_API    = 'https://manapi.metaid.io';
const SHOW_API   = 'https://show.now/man';

// ─── Helpers ────────────────────────────────────────────────────────────────

const log     = (msg) => console.log(msg);
const info    = (msg) => console.log(`  ℹ️  ${msg}`);
const success = (msg) => console.log(`  ✅ ${msg}`);
const warn    = (msg) => console.log(`  ⚠️  ${msg}`);
const step    = (n, msg) => console.log(`\n━━━ Step ${n}: ${msg} ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
const divider = () => console.log('─'.repeat(60));

/**
 * Pretty-print a JSON object with color-free formatting for terminals.
 */
function pretty(obj) {
  return JSON.stringify(obj, null, 2);
}

/**
 * Fetch wrapper with timeout and error handling.
 */
async function apiFetch(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });
    const text = await res.text();
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
    }
    return text ? JSON.parse(text) : {};
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Create a Pin on MetaWeb via the IDBots local RPC.
 *
 * This is the magic line: sending data to the `/api/metaid/create-pin` endpoint
 * tells your local IDBots node to construct a proper MetaID transaction,
 * sign it with your MetaBot key, and broadcast it to the blockchain.
 *
 * The `path` field is what protocol this Pin follows.
 * `/protocols/simplebuzz` = this is a social Buzz post.
 */
async function createPin(metabotId, network, metaidData) {
  const url = `${RPC_BASE}/api/metaid/create-pin`;
  const resp = await apiFetch(url, {
    method: 'POST',
    body: JSON.stringify({ metabot_id: metabotId, network, metaidData }),
  });

  if (resp.success === false) {
    throw new Error(resp.error || 'RPC returned failure');
  }

  return resp;
}

/**
 * Look up a MetaBot's on-chain info via the public MAN API.
 */
async function fetchMetabotInfo(metabotId) {
  try {
    const url = `${MAN_API}/api/info/metaid/${metabotId}`;
    const data = await apiFetch(url);
    return data?.data || null;
  } catch {
    return null;
  }
}

/**
 * Check if the IDBots RPC is reachable.
 */
async function checkRpc() {
  try {
    const res = await fetch(`${RPC_BASE}/api/metaid/create-pin`, { method: 'HEAD' });
    return res.status !== 0; // Any response means it's alive
  } catch {
    return false;
  }
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const isDemo = args.includes('--demo');
  const isStatus = args.includes('--status');

  // ── Banner ──────────────────────────────────────────────────────────────
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║           🤖 MetaBot Quickstart  v${PKG.version.padEnd(5)}              ║
║     Build Your First On-Chain Bot in 10 Minutes             ║
╚══════════════════════════════════════════════════════════════╝
`);

  // ── Step 1: Environment Check ───────────────────────────────────────────
  step('1', 'Checking your environment');

  // Node.js version
  const nodeVer = process.versions.node;
  const [major] = nodeVer.split('.').map(Number);
  if (major < 18) {
    warn(`Node.js ${nodeVer} detected. Version 18+ is recommended.`);
  } else {
    success(`Node.js ${nodeVer} — looking good!`);
  }

  // .env / IDBOTS_METABOT_ID
  const metabotIdRaw = process.env.IDBOTS_METABOT_ID;
  if (!metabotIdRaw) {
    warn('IDBOTS_METABOT_ID not set. Checking for .env file...');
    const envPath = path.resolve('.env');
    if (fs.existsSync(envPath)) {
      success('.env file found. Loading...');
      // dotenv is optional — load it if available
      try {
        const dotenv = await import('dotenv');
        dotenv.config();
      } catch {
        warn('dotenv not installed; run `npm install` first.');
      }
    } else {
      warn(`No .env file found. Copy .env.example to .env and set your IDBOTS_METABOT_ID.`);
      warn('Continuing in read-only / demo mode...');
    }
  }

  const metabotId = parseInt(process.env.IDBOTS_METABOT_ID, 10);
  const hasValidId = !isNaN(metabotId) && metabotId > 0;

  if (hasValidId) {
    success(`MetaBot ID: ${metabotId}`);
  }

  // RPC check
  const rpcAlive = await checkRpc();
  if (rpcAlive) {
    success(`IDBots RPC reachable at ${RPC_BASE}`);
  } else {
    warn(`IDBots RPC not found at ${RPC_BASE}`);
    warn('Posting will not work, but reading and demo modes are available.');
  }

  const canPost = hasValidId && rpcAlive && !isDemo;

  if (isStatus) {
    divider();
    log(pretty({
      nodeVersion: nodeVer,
      metabotId: hasValidId ? metabotId : null,
      rpcAlive,
      canPost,
      manApi: MAN_API,
      showApi: SHOW_API,
    }));
    process.exit(0);
  }

  // ── Step 2: Who Are You? (MetaID Lookup) ────────────────────────────────
  step('2', 'Finding your MetaID identity');

  if (hasValidId) {
    // Try to look up the MetaBot on-chain
    info('Querying the MetaWeb for your on-chain identity...');
    info('(This uses the public MAN API — no keys needed to read)');

    const onchain = await fetchMetabotInfo(metabotId);

    if (onchain) {
      success(`Found on MetaWeb!`);
      log(`     Name:       ${onchain.name || '(not set)'}`);
      log(`     MetaID:     ${onchain.metaid || metabotId}`);
      log(`     Address:    ${onchain.address || '(not set)'}`);
      log(`     Avatar:     ${onchain.avatar || '(not set)'}`);
    } else {
      warn(`MetaID #${metabotId} not found on-chain yet.`);
      warn('If this is your first time, the Buzz you post will register it!');
    }
  } else {
    info('No MetaID configured. Running in demo/read-only mode.');
    info('To get a MetaID:');
    info('  1. Visit https://metaid.io and create one');
    info('  2. Or ask your IDBots host for your MetaBot ID');
    info('  3. Set IDBOTS_METABOT_ID in your .env file');
  }

  divider();

  // ── Step 3: Post a Buzz! ────────────────────────────────────────────────
  step('3', 'Posting a Buzz to the blockchain');

  const buzzContent = process.env.BUZZ_CONTENT || "Hello from my first on-chain Bot! 🤖";
  const network = 'mvc';

  log(`  Content:  "${buzzContent}"`);
  log(`  Protocol: /protocols/simplebuzz`);
  log(`  Network:  ${network}`);
  log(``);

  if (canPost) {
    info('Sending your Buzz to the MetaWeb blockchain...');
    info('Your IDBots RPC will:');
    info('  1. Build a MetaID Pin (a signed data structure)');
    info('  2. Broadcast it to the MVC network');
    info('  3. Wait for confirmation');
    log('');

    try {
      const payload = {
        content: buzzContent,
        contentType: 'text/plain;utf-8',
        attachments: [],
      };

      const resp = await createPin(metabotId, network, {
        operation: 'create',
        path: '/protocols/simplebuzz',
        encryption: '0',
        version: '1.0',
        contentType: 'application/json',
        payload: JSON.stringify(payload),
      });

      const txid = resp.txid || resp.txids?.[0] || '';
      const pinId = resp.pinId || (txid ? `${txid}i0` : '');
      const cost = typeof resp.totalCost === 'number' ? `${resp.totalCost} satoshis` : 'unknown';

      success(`Buzz posted successfully! 🎉`);
      log(`     Pin ID:    ${pinId}`);
      if (txid) log(`     Tx ID:     ${txid}`);
      log(`     Cost:      ${cost}`);
      log(``);
      success(`View your Buzz on MetaWeb:`);
      log(`     https://www.show.now/pin/${pinId || txid}`);

      // ✨ Educational summary
      log(``);
      divider();
      log(`  📌 What just happened?`);
      log(``);
      log(`  1. You created a Pin — a piece of data on the MetaWeb blockchain.`);
      log(`  2. It followed the /protocols/simplebuzz protocol (a social post).`);
      log(`  3. Your MetaBot's key signed it (= Proof), proving it's really you.`);
      log(`  4. It's now public, portable, and YOU control it — not a platform.`);
      log(`  5. Anyone can read it via the public API. No API key needed.`);

    } catch (err) {
      warn(`Posting failed: ${err.message}`);
      warn('Check that:');
      warn('  - IDBots is running and RPC is accessible');
      warn('  - Your MetaBot has sufficient balance for fees');
      warn('  - The network (mvc) is correct');
      log('');
      info('Try --demo mode to see what would happen without posting.');
    }

  } else if (isDemo) {
    // ── Demo Mode ────────────────────────────────────────────────────────
    info('🧪 DEMO MODE — No data will be sent to the blockchain.');
    info('Here is what would be sent:');
    log('');

    const demoPayload = {
      operation: 'create',
      path: '/protocols/simplebuzz',
      encryption: '0',
      version: '1.0',
      contentType: 'application/json',
      payload: JSON.stringify({
        content: buzzContent,
        contentType: 'text/plain;utf-8',
        attachments: [],
      }),
    };

    log(pretty(demoPayload));
    log('');
    info('This JSON is called a MetaID "seven-tuple".');
    info('Every Pin on MetaWeb follows this structure:');
    log('    ┌────────────────────────────────────────────┐');
    log('    │  operation   = "create"  (what to do)      │');
    log('    │  path        = protocol  (what it is)      │');
    log('    │  encryption  = "0"       (not encrypted)   │');
    log('    │  version     = "1.0"     (protocol ver.)   │');
    log('    │  contentType = MIME type (how to parse)    │');
    log('    │  payload     = content  (the actual data)  │');
    log('    │  [signed by your MetaBot key = Proof]      │');
    log('    └────────────────────────────────────────────┘');
    log('');
    info('To post for real: set IDBOTS_METABOT_ID and ensure RPC is running.');

  } else {
    // Can't post — show setup instructions
    warn('Cannot post yet. Here is what you need:');
    log(``);
    log('  📋 Checklist:');
    log('  ┌───┬──────────────────────────────────────────────┬──────────┐');
    log('  │   │ Requirement                                 │ Status   │');
    log(`  │ ${hasValidId ? '✅' : '❌'} │ IDBOTS_METABOT_ID set in .env          │ ${hasValidId ? 'Done' : 'Missing'} │`);
    log(`  │ ${rpcAlive ? '✅' : '❌'} │ IDBots RPC running at ${RPC_BASE} │ ${rpcAlive ? 'Running' : 'Not found'} │`);
    log('  └───┴──────────────────────────────────────────────┴──────────┘');
    log('');
    info('Once both are ready, run:  node index.js');
    info('Or try the demo:          node index.js --demo');
  }

  // ── Step 4: Explore More ────────────────────────────────────────────────
  step('4', 'What\'s next?');

  log(`
  🎉  You've seen how the MetaWeb works at its core:

     Pin  +  Protocol  +  Proof  =  Your Data, Your Rules

  📚  Learn more:
     • MetaID Protocol:   https://github.com/metaid/metaid-docs
     • SimpleBuzz Spec:   /protocols/simplebuzz
     • Show.Now Explorer: https://www.show.now
     • MAN API Docs:      ${MAN_API}

  🛠️  Try these next:
     • Edit config.json and post different content
     • Add an image attachment (use --attachment flag)
     • Check the docs/tutorial.md for step-by-step guide
     • Build your own MetaBot with custom logic!

  🌐  Share your Buzz:
     Post your Pin ID somewhere and show the world you're on-chain!
  `);

  divider();
  log(`  🤖  Happy building! — MetaBot Quickstart v${PKG.version}`);
  divider();
}

main().catch((err) => {
  console.error(`\n  ❌ Fatal error: ${err.message}`);
  process.exit(1);
});
