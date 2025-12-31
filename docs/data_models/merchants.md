# Merchants Data Model

## Merchant

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | |
| name | string | |
| country | string | |
| integration_type | enum | api / manual |
| supports_returns | boolean | |
| platform_commission_rate | decimal | % GoShopMe earns |
| status | enum | active / inactive |
| created_at | timestamp | |

*Note: manual integration is prototype/testing only and not preferred.*

## Merchant Integration

| Field | Type | Notes |
|-------|------|-------|
| merchant_id | UUID | FK |
| api_endpoint | string | Nullable |
| auth_type | string | Nullable |
| last_sync | timestamp | |
| integration_notes | string | Manual upload details |


