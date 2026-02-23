# Creator Requirements (Phase 2 – Post-MVP)
## GoShopMe Platform

**Status:** Not included in MVP  
**Creator Type:** Single unified role — Creator

## 1. Scope & Core Principles

Creators are a content and discovery layer, not a transactional or decision-making layer.

**Key principles:**

ShAI remains the primary shopping interface

Creators enhance inspiration and discovery

No direct creator–merchant interaction

GoShopMe owns attribution, monetization, and payouts

No admin bottlenecks in content publishing

## 2. Creator Onboarding Flow

### 2.1 Creator Application

Any user can apply to become a Creator.

**Required application fields:**

Full name

Email address

Mobile phone number

Date of birth

Country

Short bio / description

Style focus / niche (free text + tags)

Social media links (Instagram, TikTok, YouTube, etc.)

Acceptance of Creator Terms

There is only one Creator type.
Stylist / influencer / curator distinctions are implicit, not explicit.

### 2.2 Verification & Activation

Email and mobile phone must be verified

Age validation based on date of birth (platform-defined minimum age)

Once verified, the user gains Creator access

No manual admin approval required

## 3. Creator Profile (Public)

Each Creator has a public profile visible inside the app.

### 3.1 Profile Fields

Profile picture

Display name

Bio / description

Country / region

Style tags

Social media links

Published collections

Engagement indicators (future):

Saves

Views

Followers (optional future)

### 3.2 Profile Rules

Profile becomes public once Creator status is active

Profile is discoverable via:

Creators section

Creator collections

Shared links

## 4. Creator Collections (Core Feature)

### 4.1 Collection Creation

Creators can create collections composed of:

Marketplace products

Affiliate-eligible products (if enabled)

Media:

Images

Videos

Optional styling notes or captions

Creators cannot:

Upload arbitrary products

Modify prices

Control checkout logic

### 4.2 Collection States (Updated)

Since no admin approval is required, collections follow a self-managed lifecycle:

Draft

Published

Unpublished

State behavior:

Draft → visible only to creator

Published → visible to users

Unpublished → hidden but retained

## 5. Discovery & Placement

### 5.1 Creators' Picks Section

All published creator collections appear in:

Creators' Picks section (dedicated discovery area)

Optional future placements:

AI inspiration surfaces

Occasion-based browsing

Seasonal highlights

ShAI may:

Reference creator collections

Use them as inspiration signals
But AI retains final recommendation control.

### 5.2 Social Sharing

Creators can:

Share collection links externally

Drive new users into GoShopMe

Generate onboarding attribution via share_link

## 6. Monetization & Attribution

### 6.1 Commission Model

Creators earn commissions from:

Marketplace purchases

Affiliate purchases (where applicable)

Rules:

Commission rates defined by GoShopMe

Attribution window configurable

Earnings tracked at collection level

Creators never negotiate directly with merchants.

### 6.2 Attribution Logic

A purchase is attributed to a Creator if:

The purchase originated from a Creator collection

The attribution window has not expired

Creators see aggregated performance only (no user PII).

## 7. Creator Dashboard (In-App)

Creators have access to a Creator Dashboard.

### 7.1 Dashboard Features

Creators can view:

Number of collections

Collection views

Product clicks

Purchases attributed

Earnings:

Pending

Confirmed

Paid (future)

## 8. Restrictions & Safeguards

Creators cannot:

Message users directly

Access user profiles or personal data

Override AI behavior

Control pricing or checkout

Interact with merchants directly

This ensures:

Trust

Consistency

Platform control

## 9. Admin Controls (Creators)

Admins can:

Suspend or deactivate creators

Edit or hide creator profiles if needed

Configure global commission rules

View creator performance reports

Enforce policy compliance

Admins do not approve collections.

## 10. Non-Functional Requirements (Creators)

Creator features must not impact AI performance

Creator content must load quickly on mobile

Clear separation between:

Creator data

Merchant data

User data

All creator actions are logged for auditability

## 11. Acceptance Criteria (Phase 2)

Users can apply to become Creators

Application requires mobile phone and date of birth

Creator profiles are public after activation

Creators can publish and unpublish collections without admin approval

Collections appear in Creators' Picks

Creator commissions are tracked correctly

Creators cannot interact directly with merchants or users

## 12. Strategic Note (Internal)

Creators are:

A discovery multiplier

A growth channel

A content layer

They are not the decision engine.

ShAI decides.
Creators inspire.



