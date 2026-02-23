# API Error Codes, Example Responses & Frontend Flow Mapping
## GoShopMe Platform

## 1. Standard Error Model (All APIs)

All APIs return errors in a consistent envelope.

```json
{
  "error": {
    "code": "STRING_CODE",
    "message": "Human-readable message",
    "details": {
      "field": "optional",
      "context": "optional"
    }
  }
}
```

- `code` is machine-readable (used by frontend logic)
- `message` is user-safe
- `details` is optional and debug-oriented

## 2. Global Error Codes

### Authentication & Authorization

| Code | HTTP | Meaning |
|------|------|---------|
| AUTH_UNAUTHORIZED | 401 | Missing or invalid token |
| AUTH_FORBIDDEN | 403 | Role not allowed |
| AUTH_VERIFICATION_REQUIRED | 403 | Email/phone not verified |
| AUTH_TOKEN_EXPIRED | 401 | Session expired |

### Validation & Input

| Code | HTTP | Meaning |
|------|------|---------|
| VALIDATION_ERROR | 400 | Invalid input |
| REQUIRED_FIELD_MISSING | 400 | Required field missing |
| INVALID_FORMAT | 400 | Invalid data format |

### Business Rules

| Code | HTTP | Meaning |
|------|------|---------|
| SUBSCRIPTION_REQUIRED | 402 | Active subscription required |
| TRIAL_EXPIRED | 402 | Trial expired |
| PRODUCT_UNAVAILABLE | 409 | Item out of stock |
| RETURN_NOT_ELIGIBLE | 409 | Return not allowed |
| EARNINGS_NOT_ELIGIBLE | 409 | Earnings cancelled (returned item) |

### Commerce & Payments

| Code | HTTP | Meaning |
|------|------|---------|
| CART_EMPTY | 409 | Checkout attempted with empty cart |
| CHECKOUT_FAILED | 502 | Payment or merchant error |
| AFFILIATE_REDIRECT_FAILED | 502 | Affiliate link unavailable |

### AI & Search

| Code | HTTP | Meaning |
|------|------|---------|
| AI_MODEL_UNAVAILABLE | 503 | AI service temporarily unavailable |
| AI_ACTION_NOT_ALLOWED | 403 | Action blocked by rules |
| AI_INTENT_UNCLEAR | 422 | AI needs clarification |

### System

| Code | HTTP | Meaning |
|------|------|---------|
| RATE_LIMIT_EXCEEDED | 429 | Too many requests |
| INTERNAL_ERROR | 500 | Unhandled error |

## 3. Example API Responses

### 3.1 Auth – Successful Login

**POST /auth/login**

```json
{
  "token": "jwt_token",
  "user": {
    "id": "uuid",
    "role": "shopper",
    "subscription_status": "trial"
  }
}
```

### 3.2 Style Quiz Saved

**PUT /users/me/style-profile**

```json
{
  "status": "success",
  "updated_at": "2025-03-01T10:20:00Z"
}
```

### 3.3 Unified Product Search

**GET /catalog/search?q=black+dress**

```json
{
  "results": [
    {
      "product_id": "uuid",
      "name": "Black Midi Dress",
      "merchant": "Brand X",
      "base_price": 180,
      "discounted_price": 140,
      "currency": "EUR",
      "availability": true
    }
  ]
}
```

### 3.4 AI Chat – Add to Cart

**POST /ai/chat**

```json
{
  "message": "Added the black midi dress in size M to your cart.",
  "actions": [
    {
      "type": "cart_add",
      "product_id": "uuid",
      "variant_id": "uuid"
    }
  ]
}
```

### 3.5 Checkout Success

**POST /checkout/confirm**

```json
{
  "order_id": "uuid",
  "status": "created",
  "total_amount": 140,
  "currency": "EUR"
}
```

### 3.6 Return Initiated via AI

**POST /returns/initiate**

```json
{
  "return_id": "uuid",
  "status": "initiated",
  "message": "Your return has been initiated. I'll keep you updated."
}
```

### 3.7 Earnings (User / Creator)

**GET /earnings/me**

```json
{
  "total_earned": 120.00,
  "total_paid": 80.00,
  "balance": 40.00,
  "currency": "EUR"
}
```

### 3.8 Earnings Cancelled (Returned Item)

```json
{
  "error": {
    "code": "EARNINGS_NOT_ELIGIBLE",
    "message": "This order was returned. Earnings were cancelled."
  }
}
```

## 4. API → Frontend Flow Mapping

### 4.1 Onboarding Flow

**Frontend**

Registration screen

Verification screens

Style quiz

Enter app

**APIs**

POST /auth/register

POST /auth/verify-email

POST /auth/verify-phone

PUT /users/me/style-profile

### 4.2 AI Shopping Flow (Core)

**Frontend**

Chat screen (text / voice / image / video)

**APIs**

POST /ai/chat

GET /catalog/search

GET /catalog/recommendations

AI responses may trigger:

Cart updates

Wishlist updates

Affiliate redirect

### 4.3 Wishlist Flow

**Frontend**

Product card → "Save"

Wishlist screen

**APIs**

POST /users/me/wishlist

DELETE /users/me/wishlist/{product_id}

GET /users/me/wishlist

### 4.4 Cart & Checkout Flow

**Frontend**

Cart screen

Conversational checkout confirmation

**APIs**

GET /cart

POST /cart/add

POST /cart/remove

POST /checkout/confirm

### 4.5 Returns Flow (AI-Led)

**Frontend**

Chat: "I want to return my last order"

**APIs**

POST /ai/chat

POST /returns/initiate

GET /orders/{id}

### 4.6 Referral & Earnings Flow (Users & Creators)

**Frontend**

Share item

Earnings screen

**APIs**

POST /users/me/referral-link

GET /earnings/me

GET /earnings/me/history

### 4.7 Subscription Flow

**Frontend**

Paywall

Upgrade screen

**APIs**

GET /subscription/me

POST /subscription/start-trial

POST /subscription/upgrade

POST /subscription/cancel

### 4.8 Admin / Finance Flows (Back Office)

**Frontend**

Admin dashboard

Reports

Commission oversight

**APIs**

GET /admin/commissions/platform

GET /admin/commissions/users

GET /admin/commissions/creators

GET /admin/reports/*

## 5. Frontend Handling Rules (Canonical)

Always branch on `error.code`, not HTTP text

AI_INTENT_UNCLEAR → ask user for clarification

SUBSCRIPTION_REQUIRED → open paywall

RETURN_NOT_ELIGIBLE → explain limitation in chat

EARNINGS_NOT_ELIGIBLE → update earnings UI immediately



