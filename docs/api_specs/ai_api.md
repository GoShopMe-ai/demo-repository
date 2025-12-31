# AI Orchestration API (ShAI)

## Core Endpoint

### POST /ai/chat

Handles all AI interactions.

#### Body

```json
{
  "input_type": "text | voice | image | video",
  "content": "string | url",
  "actions_allowed": [
    "search",
    "recommend",
    "add_to_cart",
    "wishlist",
    "checkout",
    "return",
    "outfit"
  ],
  "context": {
    "language": "en",
    "location": "IT"
  }
}
```

## AI Capabilities (Internally Routed)

ShAI orchestrates across multiple AI models for:

### 1. Text & Voice

Natural language chat

Voice-to-text

Text-to-voice

### 2. Image & Video Search

Visual product matching

Similar item discovery

### 3. Online Search (Fallback)

Internet-wide product search

Affiliate-aware ranking

### 4. Recommendations

Personalized ranking

Multi-merchant pool

Creator-aware (Phase 2)

### 5. Outfit Compilation

Multi-item look generation

Occasion-based styling

### 6. Cart & Wishlist Actions

Add/remove items via chat or voice

### 7. Returns Orchestration

Eligibility checks

Merchant API calls

Status updates in chat

## AI Model Abstraction (Internal)

```
AI Orchestration Layer
 ├── LLM (chat & intent)
 ├── Vision Model (image/video)
 ├── Search Model (online + catalog)
 ├── Recommendation Engine
 ├── Voice Model (STT / TTS)
```

ShAI selects the optimal model per task.

## AI Safety & Controls

Admin-configurable thresholds

Feature toggles

Full event logging

## Final Notes (Canonical)

Users & creators earn commission paid by GoShopMe

GoShopMe earns commission from merchants

Earnings never apply to returned orders

AI is the execution layer for:

Cart

Wishlist

Checkout

Returns

Multi-AI-model support is mandatory


