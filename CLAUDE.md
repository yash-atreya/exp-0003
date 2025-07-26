# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
# Install dependencies (enable corepack first)
corepack enable
pnpm install

# Start both client and server in development mode
pnpm dev

# Or start individually
pnpm --filter='server' dev
pnpm --filter='client' dev
```

### Database Setup (Cloudflare D1)
```bash
# Create database
pnpm --filter='server' db:create

# Bootstrap local database
pnpm --filter='server' db:bootstrap

# Bootstrap remote database
pnpm --filter='server' db:bootstrap:remote
```

### Testing & Validation
```bash
# Run biome formatter
pnpm format

# Run biome linter
pnpm lint

# Run both formatter and linter
pnpm check

# Run TypeScript type checking
pnpm typecheck
```

### Building & Deployment
```bash
# Build all packages
pnpm build

# Deploy client
cd client && pnpm deploy

# Deploy server
cd server && pnpm deploy
```

## Architecture

This is a monorepo for EXP-0003: Application Subscriptions - a system that demonstrates delegated transaction signing using P256 keys.

### High-Level Flow
1. **Client** requests a P256 key pair from the server
2. **Server** generates and stores the key pair (encrypted private key)
3. **Client** grants permissions to the server's public key using Porto wallet
4. **Client** schedules transactions to be executed by the server
5. **Server** uses Cloudflare Workflows to execute scheduled transactions with the delegated key

### Key Components

**Client** (`/client`)
- React + Vite application deployed to Cloudflare Pages
- Uses wagmi/viem for Ethereum interactions
- Porto wallet integration for key permissions
- UI for scheduling automated transactions

**Server** (`/server`)
- Cloudflare Worker with Hono framework
- Manages P256 key pairs with encrypted storage
- Cloudflare Workflows for scheduled transaction execution
- D1 database for storing keypairs, transactions, and schedules

### Database Schema
- `keypairs`: Stores encrypted P256 key pairs with expiry
- `transactions`: Records executed transactions
- `schedules`: Stores scheduled actions to be executed

### Environment Setup
Create `.env` file with:
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`

### Porto Integration
The system uses Porto wallet's experimental permissions API to delegate transaction signing capabilities to server-generated P256 keys, enabling automated transaction execution without exposing user private keys.