# GoShopMe – Onboarding Style & Preference Quiz

## Purpose

The quiz exists to:

Give ShAI hard constraints (fit, size, colors)

Provide visual + psychological signals for better matching

Improve outfit completion and reduce returns

It is not a styling personality test, but it does include light psychological signals to guide AI decisions.

## Quiz Structure (Multi-Step, Skippable Where Marked)

### STEP 1: Gender

**Question**
What best describes you?

**Options**

Female

Male

Non-binary

Prefer not to say

### STEP 2: Body Shape (Visual Selection)

**Question**
Which body shape is closest to yours?

**Options** (with illustrated female silhouettes)

Apple

Pear (Triangle)

Inverted Triangle

Rectangle

Hourglass

**UI requirement**

Each option displayed with a female body shape illustration

Single selection

**AI usage**

Fit approximation

Outfit proportion logic (top/bottom balance)

### STEP 3: Skin Tone (Visual + Text)

**Question**
Which skin tone is closest to yours?

**Options** (with colored squares + labels)

Very Light

Light

Medium

Tan

Deep

**UI requirement**

Each option includes a colored square

Text label always visible

No ambiguous terms like "olive"

**AI usage**

Color harmony ranking (soft signal only)

### STEP 4: Hair Color

**Question**
What is your hair color?

**Options**

Blonde

Light Brown

Dark Brown

Black

Red

Grey / White

Other

**AI usage**

Outfit color harmony (secondary signal)

### STEP 5: Preferred Colors (Multi-Select)

**Question**
Which colors do you usually like to wear?

**Options**

Color palette grid (multi-select)

Neutral + seasonal colors

Up to unlimited selection

### STEP 6: Colors You Avoid / Don't Like (Optional)

**Question**
Are there any colors you don't like wearing?

**Options**

Same color grid

Optional

Multi-select

**AI rule**

Avoided colors are hard constraints

Preferred colors are soft ranking signals

### STEP 7: Preferred Heel Height

**Question**
What heel height do you usually prefer?

**Options**

Flat

Low

Mid

High

Used mainly for shoes matching.

### STEP 8: Size Chart Selection (Required)

**Question**
Which size chart do you usually use?

**Options**

EU

UK

US

This selection determines all size inputs below.

### STEP 9: Clothing Sizes (Based on Selected Chart)

#### 9.1 Typical Top Size
#### 9.2 Typical Bottom Size
#### 9.3 Typical Dress Size
#### 9.4 Typical Shoe Size

**UI requirements**

Dropdowns populated based on chosen size chart

Shoe size numeric

All fields optional but strongly recommended

**AI rule**

Exact size availability = highest ranking priority

### STEP 10: Brand Preferences (Grouped)

**Question**
Which brands do you usually shop from?

**Brand groups** (multi-select)

**1. Luxury / Premium**

Examples:

Prada

Gucci

Saint Laurent

The Row

**2. Contemporary / Mid-range**

Examples:

COS

Arket

& Other Stories

Sandro

**3. High-Street / Affordable**

Examples:

Zara

Mango

H&M

Uniqlo

**4. Sportswear / Casual**

Examples:

Nike

Adidas

Lululemon

**Notes**

Free-text search inside each group

Brand preferences are soft signals only

Never block cheaper alternatives

### STEP 11: Full-Body Photo Upload (Optional)

**Question**
Would you like to upload a full-body photo?
This helps us improve fit and outfit matching.

**Rules**

Optional

Single image

Private (not shared)

**AI usage**

Fit approximation

Proportion estimation

Never shown publicly

### STEP 12: Style Inspiration Upload (Optional)

**Question**
Upload photos of celebrities or looks you like.

**Rules**

Upload up to 5 images

Can be:

Celebrities

Influencers

Saved outfits

Step can be skipped entirely

**AI usage**

Visual style similarity

Preference clustering (future learning)

### STEP 13: Psychological Profile (Lightweight – 3 Questions)

These are deliberately minimal and non-invasive.

**Q1. Decision Style**

When shopping, you usually:

Decide quickly and move on

Compare options before choosing

Save items and decide later

**AI usage**

Result density

How assertive recommendations should be

**Q2. Shopping Motivation**

You mostly shop because:

You need something specific

You want to refresh your wardrobe

You saw something you liked

**AI usage**

Exact-match vs exploration bias

**Q3. Risk Comfort**

When trying something new, you prefer:

Safe and familiar choices

Slight variation from what I know

Something noticeably different

**AI usage**

Similarity threshold for alternatives

## Explicitly NOT Included (Still Excluded)

Budget ranges (handled in chat)

Trend labels

Fashion adjectives (elegant, edgy, etc.)

Social questions

## Completion Rules

Quiz is mandatory on first onboarding

Optional steps clearly marked

Can be edited later in profile

AI continues learning beyond quiz

## Canonical Rule

Images show intent.
Sizes and colors set constraints.
Psychology guides how options are presented.
Chat refines the final decision.
