# Data Flow
## End-to-End (Final – Revised)

## 1. User Onboarding Flow (Extended)

User registers

Auth Service:

Creates identity

Verifies email & phone

Style Quiz Service:

Captures styles, sizes, colors, brands

User Profile Service:

Stores personal data

Stores quiz results

Stores onboarding channel

Stores referral source (if any)

Analytics Service records onboarding events

## 2. AI Shopping Flow (Marketplace)

User interacts with ShAI (text, image, video, voice)

Voice Processing Service (if voice used):

Converts voice → text

AI Orchestration Service:

Uses profile, quiz, wishlist, chat context

Searches Unified Product Catalog (multi-merchant pool)

ShAI presents recommendations

Upon user request, ShAI adds/removes items to/from cart

Cart & Checkout Service:

Updates cart

Confirms checkout conversationally

Orders Service:

Creates order

Syncs with merchant APIs

Earnings & Referrals Service:

Attributes purchase to referrer / creator (if applicable)

Analytics records engagement, purchase, commissions

## 3. Wishlist Flow

User or ShAI adds/removes item from wishlist

Wishlist Service persists item

Analytics logs wishlist events

Wishlist data feeds AI learning loop

## 4. Affiliate Fallback Flow

ShAI determines marketplace unavailable

Affiliate Service performs external search

User redirected to merchant site

Affiliate conversion tracked

Earnings & Referrals Service attributes commission

Analytics records revenue

## 5. Returns Flow (AI-Orchestrated)

User asks ShAI (text or voice) to return an item

AI Orchestration Service:

Validates return eligibility

Initiates return

Orders & Returns Service:

Calls merchant return APIs (integrated merchants)

Status updates returned to user via chat/voice

Earnings adjusted if return affects commission

## 6. Referral & Earnings Flow (Users)

User shares item or invite link

New user registers via referral

Referred user completes purchase

Earnings & Referrals Service:

Calculates commission

Updates earnings ledger

User sees earnings in app

Admin manages payouts

## 7. Creator Flow (Phase 2)

User activates Creator role

Creator publishes collection

Collection appears in Creators' Picks

User purchases via collection

Earnings Service attributes creator commission

Analytics records creator performance


