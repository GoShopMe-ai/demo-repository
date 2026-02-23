# Shop by Category API

Used by the Shop by Category page to load hero media and category grid from the database.

## Endpoint

`GET /api/shop-by-category`

## Response

```json
{
  "hero": {
    "mediaType": "image",
    "imageUrl": "https://...",
    "videoUrl": null,
    "posterUrl": null,
    "title": "Explore by Category",
    "alt": "fashion shopping aesthetic minimalist hero background"
  },
  "categories": [
    {
      "id": "shoes",
      "name": "Shoes",
      "imageUrl": "https://...",
      "alt": "Shoes",
      "badge": null
    },
    {
      "id": "sale",
      "name": "Sale",
      "imageUrl": "https://...",
      "alt": "Sale",
      "badge": "Up to 50% off"
    }
  ]
}
```

## Hero fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| mediaType | `"image"` \| `"video"` | No | Defaults to `"image"` if `videoUrl` present, else `"image"` |
| imageUrl | string | Yes* | Hero image URL (*required when mediaType is image) |
| videoUrl | string | No | Hero video URL (used when mediaType is video) |
| posterUrl | string | No | Poster/thumbnail for video (falls back to imageUrl) |
| title | string | No | Overlay text (default: "Explore by Category") |
| alt | string | No | Alt text for image / accessibility |

## Category fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique category ID (used for chat context) |
| name | string | Yes | Display name |
| imageUrl | string | Yes | Category icon/image URL |
| alt | string | No | Alt text (falls back to name) |
| badge | string | No | Optional badge text (e.g. "Up to 50% off") |

## Client behavior

- Set `window.GOSHOPME_API_BASE_URL` before load to override the API base URL.
- If the API fails, the client tries `data/shop-by-category.json` then falls back to inline data.
- Categories are rendered in a 2-column grid; order is preserved from the response.
