# Trending Now API

The Trending Now page fetches all section content from the database/API. Data is personalized where applicable (Just for You uses quiz + purchase history).

---

## GET /trending/feed

Returns the full Trending Now feed. Used by `Trending_Now.html` on load.

### Headers
- `Authorization: Bearer <token>` (optional; when present, Just for You is personalized)

### Response (JSON)

```json
{
  "justForYou": {
    "products": [
      {
        "id": "string",
        "name": "string",
        "brand": "string",
        "price": "$248",
        "image": "https://...",
        "images": ["url1", "url2"],
        "discountBadge": null
      }
    ]
  },
  "featuredBrand": {
    "id": "saint-laurent",
    "name": "Saint Laurent",
    "tagline": "Rooted in Refinement",
    "coverImage": "https://...",
    "seasonLabel": "Saint Laurent Fall '25",
    "ctaText": "Explore the Drop"
  },
  "celebrityPicks": [
    {
      "id": "zendaya-mugler",
      "celebrityName": "Zendaya",
      "outfitDescription": "wearing vintage Mugler at Paris Fashion Week",
      "coverImage": "https://...",
      "products": [
        {
          "id": "string",
          "name": "string",
          "brand": "string",
          "price": "$850",
          "image": "https://..."
        }
      ]
    }
  ],
  "creatorSpotlight": [
    {
      "id": "styled-by-mira",
      "creatorId": "creator-1",
      "creatorHandle": "@StyledByMira",
      "creatorAvatar": "https://...",
      "lookTitle": "Neutral Power",
      "lookSubtitle": "Minimalist elegance",
      "coverImage": "https://...",
      "products": [
        {
          "id": "string",
          "name": "string",
          "brand": "string",
          "price": "$89",
          "image": "https://..."
        }
      ]
    }
  ]
}
```

### Section behavior

| Section | Data source | Personalization |
|---------|-------------|-----------------|
| **justForYou** | `/trending/feed` or `/catalog/recommendations` | Uses user style profile (quiz: body_type, sizes, colors, brands) + purchase history for similar items |
| **featuredBrand** | Admin-curated or CMS | Links to brand products page (`ShopbyCategory.html?brand=X` or `/catalog/products?brand=X`) |
| **celebrityPicks** | CMS / editorial | Cover image + outfit breakdown (same/similar products from catalog) |
| **creatorSpotlight** | Top-performing creators (analytics) or curated | Cover image + items in the look |

### Product tile format

Same as `products_api.md`: `{ id, name, brand, price, image, images?, discountBadge? }`

### Fallback

If the API fails, the client loads `data/trending.json` then falls back to inline mock data.

---

## Related endpoints

- **GET /catalog/recommendations** – AI-ranked products; can be used for Just for You when called with user context (quiz + orders).
- **GET /catalog/search?brand={name}** – Products filtered by brand (for featured brand page).
- **GET /users/me/style-profile** – Quiz data (sizes, preferences) for personalization.
- **GET /users/me/orders** or **/orders** – Purchase history for "similar to purchased" logic.
