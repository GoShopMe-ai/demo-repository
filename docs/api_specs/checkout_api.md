# Cart, Checkout & Returns API

## GET /cart

Returns cart.

## POST /cart/add

```json
{
  "product_id": "uuid",
  "variant_id": "uuid",
  "quantity": 1
}
```

## POST /cart/remove

## POST /checkout/confirm

Creates marketplace order.

## POST /returns/initiate

Initiated via AI or UI.

```json
{
  "order_id": "uuid",
  "reason": "string"
}
```

**Note:** Returns are not available for affiliate purchases.


