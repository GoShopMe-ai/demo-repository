# AI Features → Data Usage Mapping

## Purpose
Make it explicit what data ShAI reads, writes, and learns from, so engineering, AI logic, and privacy are aligned.

## 1. AI Feature → Data Sources Table

| AI Feature | Reads Data | Writes Data | Learns From |
|------------|------------|-------------|-------------|
| Text Chat | User profile, style profile, conversation history | Chat events | Chat corrections, confirmations |
| Voice Messages | Voice input, chat context | Transcripts, voice events | Voice usage patterns |
| Image Search | Uploaded image, catalog images | Search events | Click & purchase outcomes |
| Video Search | Uploaded video frames, catalog videos | Search events | Engagement & conversion |
| Online Search (Affiliate) | Intent, unified catalog gaps | Affiliate redirect events | Conversion success |
| Product Recommendations | Unified catalog, style profile, wishlist | Recommendation events | Accept/reject signals |
| Outfit Compilation | Style profile, occasion intent, catalog | Outfit events | Outfit conversion |
| Cart Add/Remove | Cart state, product availability | Cart mutations | Cart → checkout flow |
| Wishlist Add/Remove | Wishlist state | Wishlist events | Long-term interest |
| Checkout Guidance | Cart, subscription status | Checkout events | Drop-off reasons |
| Return Orchestration | Orders, merchant return rules | Return events | Return reasons |
| Referral Attribution | Referral graph, orders | Commission events | Referral conversion |
| Earnings Optimization (Future) | Commission performance | Earnings updates | Payout behavior |

## 2. Core Data Models Used by AI

### ShAI actively reads:

users

user_profile

style_profile

wishlist_items

products (unified pool)

product_variants

orders

returns

referral_attribution

commission_events

### ShAI writes:

analytics.events

cart_state

wishlist_items

return_requests

commission_events (trigger only)

### ShAI never writes:

Payments

Merchant data

Payouts

## 3. Sequence Diagrams (Text-Based, Engineer-Ready)

These are intentionally text-based so they can be:

Implemented immediately

Converted to Mermaid / PlantUML later

Understood by backend + frontend + AI teams

### 3.1 AI Chat → Recommendation → Cart Add

```
User
 → AI Chat (text / voice)
   → AI Orchestration
     → Read: style_profile, wishlist, conversation
     → Query: unified_product_catalog
     → Rank results
   ← Recommendations

User: "Add the second one in size M"

 → AI Orchestration
   → Validate availability
   → Cart Service: add item
   → Analytics: cart_add
 ← Confirmation message
```

### 3.2 AI Image Search → Affiliate Fallback

```
User uploads image
 → AI Orchestration
   → Vision Model: extract features
   → Search unified catalog
   → No marketplace match found
   → Affiliate Search Service
   → Rank external results
 ← Affiliate options shown

User clicks external link
 → Affiliate Redirect
   → Analytics: affiliate_redirect
```

### 3.3 AI Checkout (Marketplace)

```
User: "I want to buy this"

 → AI Orchestration
   → Check subscription status
   → Validate cart not empty
   → Checkout Service: confirm
   → Orders Service: create order
   → Merchant API: place order
   → Earnings Service: attribute commission
   → Analytics: checkout_completed
 ← Order confirmation
```

### 3.4 AI Return Orchestration (Chat or Voice)

```
User: "I want to return my last order"

 → AI Orchestration
   → Orders Service: fetch last order
   → Validate return eligibility
   → Merchant supports returns?
     → Yes
       → Returns Service: initiate
       → Merchant API: create return
       → Commission Service: cancel earnings
       → Analytics: return_initiated
     → No
       → AI explains limitation
 ← Return status update
```

### 3.5 Referral → Earnings Attribution

```
User A shares referral link
 → User B registers
   → Referral Attribution stored

User B purchases
 → Orders Service
 → Earnings Service
   → Create commission_event (pending)
 → Analytics: commission_earned

If order returned
 → Earnings Service
   → Cancel commission_event
```

### 3.6 Outfit Compilation

```
User: "Create a dinner outfit for Milan"

 → AI Orchestration
   → Read: style_profile, location, season
   → Query unified catalog
   → Build multi-item outfit
 ← Outfit proposal

User adds full outfit
 → Cart Service (multiple adds)
 → Analytics: outfit_conversion
```



