# AI Chat Prompt Suggestions & Intent Mapping
## GoShopMe – ShAI Conversational UX

## 1. Purpose

This document defines:

Suggested chat prompts displayed in the UI (examples, quick actions, placeholders)

How these prompts map to clear, non-subjective intents

How ShAI should interpret them safely and deterministically

Prompts guide discovery and interaction but never execute irreversible actions without confirmation.

## 2. Core UX Principle

Prompts must reduce ambiguity, not introduce it.

**Rules:**

Avoid subjective language

Avoid assumptions about user taste

Prefer concrete actions (item, color, price, use case)

Prompts signal intent, not commands

## 3. Prompt Suggestions by Category (Approved Set)

### 3.1 Discovery & Browsing (Specific, High-Intent)

These prompts reflect most searched shopping intents, not open-ended inspiration.

**Suggested Chat Prompts**

"Show me dresses"

"Show me jackets"

"Show me shoes"

"Show me bags"

"Show me outfits for work"

"Show me outfits for a wedding"

"Show me outfits for a vacation"

"Show me outfits for a party"

"Show me trending items"

**AI Interpretation**

Category-based or occasion-based discovery

**ShAI Behavior**

Use unified multi-merchant catalog

Apply user profile, size, season, and location

Return a curated shortlist, not long lists

### 3.2 Product Search & Refinement (Text)

**Suggested Chat Prompts**

"I'm looking for a black dress"

"I need flat shoes"

"Show me ankle boots"

"Show me leather jackets"

"Show me midi skirts"

"Show me items under €200"

"Show me similar items but cheaper"

**AI Interpretation**

Attribute-based product search

Price sensitivity signal

**ShAI Behavior**

Apply implicit filters

Explain price and material differences

Prefer marketplace inventory first

### 3.3 Image-Based Search (Explicit & Actionable)

**Suggested Chat Prompts**

"Find this outfit"

"Find similar items"

"Find similar but budget friendly"

"Find it in another color"

**AI Interpretation**

Visual similarity search

Optional price or color constraint

**ShAI Behavior**

Extract visual features from image

Search unified catalog

If color not available, explain clearly

Affiliate fallback only if marketplace has no match

### 3.4 Video-Based Search

**Suggested Chat Prompts**

"Find this outfit from the video"

"Find similar items from this video"

"Find the jacket from this video"

**AI Interpretation**

Multi-frame visual extraction

Garment identification

**ShAI Behavior**

Identify key items (top, bottom, shoes, bag)

Propose closest matches

Allow user to refine item by item

### 3.5 Recommendations & Outfit Compilation (Concrete)

**Suggested Chat Prompts**

"Recommend items for me"

"Create an outfit using this item"

"Create a full outfit"

"Suggest items that go with this"

**AI Interpretation**

Personalized recommendation

Outfit assembly

**ShAI Behavior**

Use style quiz, sizes, wishlist, history

Propose complete, purchasable looks

Clearly separate items and prices

### 3.6 Cart Interaction (Conversational, Explicit)

**Suggested Chat Prompts**

"Add this to my cart"

"Remove this from my cart"

"Change the size to M"

"Is this available in another size?"

"Is this available in another color?"

**AI Interpretation**

Cart modification intent

**ShAI Behavior**

Validate item and variant

Execute requested change

Confirm the result in chat

### 3.7 Wishlist Interaction (Minimal & Clear)

**Suggested Chat Prompts**

"Save this for later"

"Add this to my wishlist"

"Remove this from my wishlist"

**AI Interpretation**

Non-transactional interest signal

**ShAI Behavior**

Add or remove wishlist item

Use wishlist as preference signal

Do not initiate checkout from wishlist

### 3.8 Checkout Preparation (Pre-Action Only)

**Suggested Chat Prompts**

"I want to buy this"

"I'm ready to checkout"

"Proceed with the order"

**AI Interpretation**

Checkout preparation intent

**ShAI Behavior**

Summarize cart contents

Confirm final price and delivery

Ask explicit confirmation before executing checkout

### 3.9 Returns (Conversational, Specific)

**Suggested Chat Prompts**

"I want to return my order"

"Return this item"

"This doesn't fit, I want to return it"

**AI Interpretation**

Return request

**ShAI Behavior**

Identify eligible marketplace order

Explain return conditions

Confirm before initiating return

Explain that earnings (if any) will be cancelled

## 4. Explicitly Excluded Prompts (Do Not Use)

The following must not appear as suggested prompts:

❌ "Show me my wishlist"

❌ "What's in my cart"

❌ "Make it more elegant"

❌ Broad inspirational prompts without constraints

❌ Any voice-specific phrasing

These actions are handled via UI elements, not chat prompts.

## 5. Confirmation Rules (Unchanged)

ShAI must request confirmation before:

Checkout

Returns

Removing paid items

Any irreversible action

## 6. Guardrails Summary (Prompt-Level)

Prompts are suggestions, not commands

No subjective language

No assumptions about preferences

Marketplace-first logic enforced

Affiliate items always clearly labeled

## 7. Relationship to Other Docs

| Document | Purpose |
|----------|---------|
| ai_prompt_suggestions.md | Chat UX prompts |
| ai_prompt_action_guardrails.md | Execution rules |
| ai_sequence_diagrams.md | Flow logic |
| ai_data_usage.md | Data access |

## 8. Final UX Rule

If a prompt cannot be executed deterministically, it should not be suggested.

This version is now:

Product-search realistic

AI-safe

Conversion-oriented

Ready for UI implementation


