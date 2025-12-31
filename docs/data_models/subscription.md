# Subscription Data Model

## Subscription

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | |
| user_id | UUID | FK |
| plan | enum | weekly / monthly / annual |
| status | enum | trial / active / cancelled |
| start_date | date | |
| end_date | date | |
| created_at | timestamp | |

## Payment Method (Tokenized)

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | |
| user_id | UUID | FK |
| provider | string | |
| token | string | No raw card data |
| last4 | string | |
| expiry | string | |


