# Products & Catalog API

All product tiles and product details (pictures, sizes, price, description, brand, etc.) are **dynamic** and must be fetched from the database or API. The frontend uses `window.GoShopMeProductAPI` (see `html_designs/js/product-api.js`) with `window.GOSHOPME_API_BASE_URL` pointing to your API.

---

## GET /catalog/products/{id}

Fetch a single product for the Product Details page.

### Path
```
GET /catalog/products/{id}
```

### Response (JSON)
```json
{
  "id": "string|uuid",
  "name": "string",
  "description": "text",
  "images": ["url1", "url2"],
  "base_price": 99.00,
  "discounted_price": 79.00,
  "currency": "USD",
  "brand": "string",
  "merchant_name": "string",
  "metadata": {
    "material_and_care": "string",
    "shipping_and_returns": "string"
  },
  "sizingChart": {
    "US": ["7", "7.5", "8", "8.5", "9"],
    "EU": ["40", "41", "42", "43", "44"],
    "UK": ["6", "6.5", "7", "7.5", "8"]
  },
  "variants": [
    { "size": "8", "color": "Black", "unit": "US", "stock": 5 }
  ],
  "similar": [
    { "id": "id", "name": "string", "brand": "string", "price": 50, "images": ["url"] }
  ],
  "reviews": []
}
```

### Frontend usage
- **Product_details_page.html** fetches product on load via `GoShopMeProductAPI.fetchProductById(id)` (id from `?id=` in URL).
- Response is mapped to `loadProductData(product)` format.

---

## GET /catalog/search

Unified multi-merchant search. Used for product feeds and search results.

### Query
```
?q=string
&image_url=string
&video_url=string
&merchant_id=optional
&brand=string
```

- `brand` – Filter products by brand name (e.g. `?brand=Saint+Laurent`). Used by Brand_Products.html when user taps "Explore the Drop" on a featured brand.

### Response
Array of products for tiles: `{ id, name, brand, price, images }`.

---

## GET /catalog/recommendations

AI-ranked results using unified pool. Used for "Just for you", "Trending", etc.

### Response
Array of products for tiles.

---

## Product tile format (all screens)

Product tiles across **Home**, **Wishlist**, **Trending**, **Creator's Single_Collection**, **Shopping_bag**, **ShopbyCategory**, etc. must receive data from the API/DB. Each tile expects:

| Field   | Type   | Notes                              |
|---------|--------|------------------------------------|
| id      | string | Product ID or slug                 |
| name    | string | Product name                       |
| brand   | string | Brand / merchant name              |
| price   | string | Display price (e.g. "$99")         |
| image   | string | Primary image URL                  |
| images  | array  | Optional, for gallery              |

### Data sources by screen
- **Home** – `loadHomeDynamicSections(data)` → `data.justForYou`, `data.trending` from API
- **Wishlist** – `loadWishlistData(items)` from `/wishlist` or user-wishlist API
- **Trending_Now** – product list from `/catalog/recommendations` or search
- **Creator's Single_Collection** – collection products from collections API
- **Shopping_bag** – cart items from `/cart` API
- **ShopbyCategory** – category products from category/merchant API

---

## Configuration

Set before page load:
```javascript
window.GOSHOPME_API_BASE_URL = 'https://api.yourservice.com';
```
