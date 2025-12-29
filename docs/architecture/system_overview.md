# System Overview
## GoShopMe Platform Architecture

## 1. Architectural Principles

AI-first orchestration: ShAI controls discovery, cart actions, checkout guidance, returns, and referrals.

Unified commerce pool: Multiple merchant catalogs are normalized into one searchable pool.

Marketplace-first, affiliate fallback: Affiliate used only when marketplace inventory is unavailable.

Commission-based earnings:

Users earn commissions by sharing items and inviting others

Creators earn commissions via collections (Phase 2)

Voice-enabled interactions: Voice is a native input/output layer, not an add-on.

API-driven & modular: Independently scalable services.

Admin-governed: All rules, commissions, and attribution are centrally controlled.

## 2. High-Level Components

### Client Applications

Mobile Web App (Phase 1)

Native Mobile Apps (Phase 2)

Admin Web Application

Creator Interface (Phase 2)

### Core Backend Services

API Gateway

Authentication & Identity Service

User Profile & Preferences Service

Style Quiz Service

AI Orchestration Service (ShAI)

Unified Product Catalog Service

Wishlist Service

Cart & Checkout Service

Orders & Returns Service

Subscription & Payments Service

Earnings & Referrals Service (Users + Creators)

Affiliate & External Search Service

Creator Service (Phase 2)

Analytics & Tracking Service

Notification Service

Voice Processing Service

### External Integrations

Merchant APIs (catalogs, orders, returns)

Payment providers

Affiliate networks

AI model providers

Voice-to-text / text-to-voice providers

Email / SMS / Messaging providers

## 3. Data Ownership

GoShopMe owns:

User profiles, style quiz data, AI conversations

Unified product index

Referral graphs & commission attribution

Earnings ledgers (users & creators)

Merchants own:

Inventory

Shipping

Fulfillment

