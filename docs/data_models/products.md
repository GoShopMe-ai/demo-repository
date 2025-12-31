# Products Data Model

## Unified Multi-Merchant Catalog

### Product

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Internal ID |
| merchant_id | UUID | FK |
| external_product_id | string | Merchant reference |
| name | string | |
| description | text | |
| images | array<string> | |
| category | string | |
| base_price | decimal | Original price |
| discounted_price | decimal | Nullable |
| discount_type | enum | seasonal / promo_code / none |
| currency | string | |
| availability | boolean | |
| metadata | json | Material, fit, etc. |
| created_at | timestamp | |
| updated_at | timestamp | |

### Product Variant

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | |
| product_id | UUID | FK |
| size | string | |
| color | string | |
| stock | integer | |

### Wishlist Item

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | |
| user_id | UUID | FK |
| product_id | UUID | FK |
| created_at | timestamp | |
| removed_at | timestamp | Nullable (soft remove) |


