# API Gateway Design
## GoShopMe Platform (Final)

## 1. Gateway Responsibilities

Single entry point for all clients

Authentication & role-based authorization

Rate limiting

Routing & versioning

Observability & tracing

## 2. Routing Map (Final)

```
/auth/*            → Auth & Identity
/users/*           → User Profile & Preferences
/quiz/*            → Style Quiz
/voice/*           → Voice Processing
/ai/*              → AI Orchestration
/catalog/*         → Unified Product Catalog
/wishlist/*        → Wishlist Service
/cart/*            → Cart Service
/orders/*          → Orders & Returns
/subscription/*    → Subscription & Payments
/earnings/*        → Earnings & Referrals
/affiliate/*       → Affiliate Service
/creators/*        → Creator Service
/admin/*           → Admin APIs
/analytics/*       → Analytics Service
```

## 3. Resilience & Performance

JWT-based auth

Separate admin scopes

Catalog caching

Circuit breakers for merchant APIs

Graceful degradation paths



