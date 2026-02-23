# Users & Profiles API

## GET /users/me

Returns authenticated user profile.

## PUT /users/me/profile

Update profile details.

## PUT /users/me/style-profile

Stores style quiz results.

### Body

```json
{
  "gender": "female",
  "body_type": "hourglass",
  "skin_tone": "warm",
  "hair_color": "brown",
  "preferred_heel_height": "mid",
  "favorite_brands": [],
  "typical_top_size": "M",
  "typical_bottom_size": "38",
  "typical_dress_size": "M",
  "typical_shoe_size": "39"
}
```

## POST /users/me/referral-link

Generates a share link for commissions.

## GET /users/me/earnings

Returns user earnings only (referrals).

## GET /users/me/wishlist

## POST /users/me/wishlist

## DELETE /users/me/wishlist/{product_id}



