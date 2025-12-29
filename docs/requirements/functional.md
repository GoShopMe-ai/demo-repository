# Functional Requirements
## GoShopMe Platform

## 1. User Management & Identity

### 1.1 User Registration & Verification

Users must create a GoShopMe account

Required at registration:

Email address (verification required)

Mobile phone number (verification required)

Supported authentication:

Email + password

Social login (future phases)

### 1.2 User Profile (Extended)

Each user profile must include:

**Personal & Contact Information**

Email address

Mobile phone number

Profile picture upload

**Address:**

Country

Region / State

City

Postcode / ZIP

Street

Street number

Additional delivery information

**Preferences & Shopping Context**

Style preferences (from onboarding quiz and AI interaction)

Sizes and fit preferences

Preferred colors

Preferred brands

Purchase and return history

Budget range is not stored in the profile
Budget is communicated dynamically via conversation with ShAI.

**Payment & Subscription**

Stored payment methods:

Add new card

Edit existing card

Remove card

Subscription details:

Current subscription type

Upgrade / downgrade options

Free trial status

**Notifications & Communication**

Notification settings:

In-app notifications

Email notifications

WhatsApp (future)

Marketing & promotional communication preferences (opt-in / opt-out)

## 2. AI Personal Shopper (ShAI)

### 2.1 Conversational Interface

AI chat is the primary interface

Supports:

Text input

Image search

Video search

Voice input (future)

AI retains conversational context across sessions

### 2.2 Intent Understanding & Personalization

AI interprets:

Natural language

User corrections and feedback

Onboarding quiz answers (style, size, color, brand)

Country and location for seasonal relevance

AI adapts recommendations dynamically based on interaction

### 2.3 AI Recommendations

AI provides:

Individual product recommendations

Alternatives

Complete outfits / bundles

Explanations are provided for recommendations

## 3. Marketplace Functionality (Primary)

### 3.1 Merchant Catalog Integration

Merchant catalogs are ingested via APIs or data feeds

Product catalog includes:

Product name

Description

Images

Variants (size, color)

Price

Availability

Merchant identifier

### 3.2 Cart & Checkout

Unified cart managed by AI

AI can:

Add/remove items

Modify variants

Suggest complementary items

Checkout is orchestrated by the platform

Shipping is fulfilled by merchants

### 3.3 Orders & Tracking

Users can:

View order history

Track orders from integrated merchants

### 3.4 Returns Management

Returns can be initiated via GoShopMe only for integrated merchants

Platform communicates with merchant return APIs

Unified return status is displayed to the user

## 4. Affiliate Flow (Fallback)

### 4.1 Affiliate Trigger

Used only when:

Item is not available in marketplace catalogs

No acceptable alternative exists

### 4.2 Affiliate Purchase Flow

User must already have a GoShopMe profile

AI performs an online search

User is redirected to merchant website

Purchase and returns are handled entirely by the merchant

GoShopMe earns commission via affiliate links

## 5. Creators (Scalability)

Platform must support onboarding of creators

Creators can:

Curate collections

Influence discovery

Creator features are additive and do not replace AI ownership of shopping flow


