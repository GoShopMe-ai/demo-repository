# Orders & Returns Data Model

## Order

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | |
| user_id | UUID | FK |
| merchant_id | UUID | FK |
| order_type | enum | marketplace / affiliate |
| status | enum | created, shipped, delivered, returned |
| subtotal_amount | decimal | Before discounts |
| discount_amount | decimal | |
| total_amount | decimal | Paid amount |
| currency | string | |
| created_at | timestamp | |

## Order Item

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | |
| order_id | UUID | FK |
| product_id | UUID | FK |
| variant_id | UUID | FK |
| quantity | integer | |
| original_price | decimal | Before discount |
| unit_price | decimal | After discount |

## Return

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | |
| order_id | UUID | FK |
| status | enum | initiated, approved, rejected, completed |
| reason | string | |
| initiated_at | timestamp | |


