# Analytics & Events Data Model

## Event

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | |
| user_id | UUID | Nullable |
| event_type | string | |
| metadata | json | |
| created_at | timestamp | |

## Key Event Types (Updated)

registration_completed

style_quiz_completed

ai_message_sent

voice_message_sent

image_search

video_search

wishlist_add

wishlist_remove

add_to_cart

checkout_completed

affiliate_redirect

return_initiated

referral_registered

commission_earned

commission_cancelled

## Canonical Business Rules (Summary)

Returned orders never generate earnings

Merchants pay GoShopMe commission

GoShopMe pays users & creators commission

Discounts affect commission calculations

Manual merchant integration is prototype-only

Wishlist supports add & remove

Style quiz is a first-class AI input


