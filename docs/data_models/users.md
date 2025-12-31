# Users Data Model

## User (App-Level)

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| email | string | Unique, verified |
| phone | string | Unique, verified |
| password_hash | string | Auth service |
| app_role | enum | shopper / creator |
| status | enum | active / suspended |
| date_of_birth | date | Age validation |
| created_at | timestamp | |
| updated_at | timestamp | |

## Admin User (Back-Office)

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | |
| email | string | |
| role | enum | admin / finance / operations / support / content / analyst |
| status | enum | active / suspended |
| created_at | timestamp | |

## User Profile

| Field | Type | Notes |
|-------|------|-------|
| user_id | UUID | FK → User |
| first_name | string | |
| last_name | string | |
| profile_image_url | string | |
| country | string | |
| region | string | |
| city | string | |
| postal_code | string | |
| street | string | |
| street_number | string | |
| additional_info | string | |
| notification_settings | json | in-app, email, future WhatsApp |
| marketing_opt_in | boolean | |

## Style Profile (Onboarding Quiz + AI)

| Field | Type | Notes |
|-------|------|-------|
| user_id | UUID | FK |
| gender | enum | female / male / non_binary / prefer_not_to_say |
| body_type | string | e.g. pear, hourglass |
| skin_tone | string | |
| hair_color | string | |
| preferred_heel_height | enum | flat / low / mid / high |
| favorite_brands | array<string> | |
| typical_top_size | string | |
| typical_bottom_size | string | |
| typical_dress_size | string | |
| typical_shoe_size | string | |
| updated_at | timestamp | Updated by AI |

## Referral Attribution

| Field | Type | Notes |
|-------|------|-------|
| user_id | UUID | FK |
| referred_by_user_id | UUID | Nullable |
| referral_code | string | Share / invite |
| onboarding_channel | enum | facebook, instagram, tiktok, organic, share_link |
| created_at | timestamp | Immutable |


