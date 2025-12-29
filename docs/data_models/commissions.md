# Commissions & Earnings Data Model

## Two-Sided Commission System (Final)

### 1. Platform Revenue (GoShopMe earns from merchants)

#### Platform Commission

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | |
| order_id | UUID | FK |
| merchant_id | UUID | FK |
| source | enum | marketplace / affiliate |
| commission_rate | decimal | Merchant → GoShopMe |
| commission_amount | decimal | Platform revenue |
| created_at | timestamp | |

### 2. User & Creator Earnings (GoShopMe pays)

#### Commission Event

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | |
| earner_type | enum | user / creator |
| earner_user_id | UUID | FK |
| buyer_user_id | UUID | FK |
| order_id | UUID | FK |
| source | enum | referral / creator_collection |
| commission_rate | decimal | Defined by GoShopMe |
| commission_amount | decimal | Paid by GoShopMe |
| status | enum | pending, confirmed, cancelled, paid |
| created_at | timestamp | |

**Eligibility Rule (Hard Constraint)**

If an order status becomes returned, all related Commission Events are cancelled and excluded from payouts.

#### Earnings Ledger

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | |
| user_id | UUID | Earner |
| total_earned | decimal | Excludes returned orders |
| total_paid | decimal | |
| balance | decimal | |
| updated_at | timestamp | |

#### Payout

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | |
| user_id | UUID | |
| amount | decimal | |
| payout_method | string | |
| status | enum | pending / completed |
| processed_at | timestamp | |

