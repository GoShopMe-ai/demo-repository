# Microservices Architecture (Logical – Final)

```
[ Client Apps ]
      |
      v
[ API Gateway ]
      |
      +--> Auth & Identity Service
      +--> User Profile & Preferences Service
      +--> Style Quiz Service
      +--> Voice Processing Service
      +--> AI Orchestration Service (ShAI)
      +--> Unified Product Catalog Service
      +--> Wishlist Service
      +--> Cart & Checkout Service
      +--> Orders & Returns Service
      +--> Subscription & Payments Service
      +--> Earnings & Referrals Service
      +--> Affiliate & External Search Service
      +--> Creator Service (Phase 2)
      +--> Analytics & Tracking Service
      +--> Notification Service
```

## Key Service Responsibilities (Updated)

### Earnings & Referrals Service

Generates and manages:

User referral links

Creator attribution

Tracks:

Registrations via referral

Purchases by referred users

Calculates:

Commission eligibility

Accrued earnings

Manages earnings states:

Pending

Confirmed

Paid

Feeds Admin reporting and payouts

### Voice Processing Service

Handles:

Voice-to-text for user input

Text-to-voice for AI responses

Integrates with ShAI

Emits analytics events for voice usage


