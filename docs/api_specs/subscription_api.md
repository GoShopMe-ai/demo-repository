# Subscription API

## GET /subscription/me

## POST /subscription/start-trial

## POST /subscription/upgrade

## POST /subscription/cancel

Cancels the user's subscription and stores the reason for customer behavior analysis.

**Request body:**
```json
{
  "reason": "ai-features" | "short-term" | "price" | "technical" | "switching" | "other",
  "otherReason": "string (required when reason is 'other')"
}
```

**Reason values:**
- `ai-features` — I don't use the AI features enough
- `short-term` — I only needed it for a short time
- `price` — The price feels too high
- `technical` — I had technical issues
- `switching` — I'm switching to another service
- `other` — Other (requires `otherReason` text)

**Response:** 200 OK on success. Store `reason` and `otherReason` (if present) in the database for analytics.



