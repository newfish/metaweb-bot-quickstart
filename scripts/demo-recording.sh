#!/bin/bash
# Demo recording script for metaweb-bot-quickstart GIF
# This script simulates a developer walking through the tool

# Simulate "typing" effect with slow echo
type_cmd() {
  printf '$ %s\n' "$1"
  sleep 0.5
  eval "$1"
  echo ""
  sleep 1
}

clear
echo "╔══════════════════════════════════════════════════╗"
echo "║   MetaBot Quickstart — On-Chain in 10 Minutes   ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""

sleep 1

# Step 1: Show what we have
echo "📦 Let's see what's in the box..."
sleep 0.5
type_cmd "ls -la"

# Step 2: Quick status check
echo "🔍 Quick health check..."
type_cmd "node index.js --status"

# Step 3: Demo mode - show the Pin structure
echo "📖 Demo mode — see what a Pin looks like without posting..."
type_cmd "node index.js --demo"

# Step 4: The real deal
echo "🚀 Ready? Let's post a real Buzz on-chain!"
type_cmd "node index.js"

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║   ✅ Done! Your data is on the blockchain!       ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""
echo "👉 github.com/newfish/metaweb-bot-quickstart"
echo ""
sleep 2
