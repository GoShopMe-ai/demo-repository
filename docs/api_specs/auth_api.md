# Authentication API

## POST /auth/register

Registers a new shopper or creator.

### Body

```json
{
  "email": "string",
  "phone": "string",
  "password": "string",
  "date_of_birth": "YYYY-MM-DD",
  "referral_code": "string (optional)"
}
```

## POST /auth/verify-email

## POST /auth/verify-phone

## POST /auth/login

Returns JWT with role claims.

## POST /auth/logout

## POST /auth/admin/login

Admin-only authentication
Roles: admin | finance | operations | support | content | analyst



