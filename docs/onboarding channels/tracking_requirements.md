# Tracking Requirements
## Onboarding Channels & Attribution (GoShopMe)

## 1. Objective

The goal of onboarding channel tracking is to:

Identify where users come from

Measure conversion quality, not just volume

Attribute subscriptions and revenue to acquisition sources

Support growth optimization and reporting

Tracking must work across:

Web

Mobile web

Future native apps

## 2. Tracked Onboarding Channels (Canonical List)

Each user must be attributed to one primary onboarding channel at registration.

### 2.1 Standard Channels

facebook

instagram

tiktok

organic (search engines, direct discovery)

direct (typed URL, bookmark)

share_link (invite / referral link)

campaign (explicit paid or special campaigns)

unknown (fallback only)

## 3. Tracking Data Model (Required Fields)

### 3.1 Stored at User Level (Immutable After Registration)

These fields are stored once at successful registration and must not change.

**onboarding_channel**
(enum: facebook, instagram, tiktok, organic, share_link, campaign, direct, unknown)

**onboarding_source**
(free text or ID: e.g. fb_ads, ig_reels, influencer_xyz, invite_user_id)

**onboarding_campaign_id** (optional)
Used for paid or special campaigns

**registration_timestamp**

### 3.2 Optional Attribution Metadata

Stored if available:

UTM parameters:

utm_source

utm_medium

utm_campaign

utm_content

Referrer URL

Invite / referral code

## 4. Channel Detection Logic (Priority Order)

Attribution is determined once, at registration, using the following priority:

**Invite / sharing link**

If referral code or invite ID exists → share_link

**Campaign tracking**

If valid campaign ID or UTM campaign exists → campaign

**Social platforms**

If referrer or UTM source matches:

Facebook → facebook

Instagram → instagram

TikTok → tiktok

**Organic**

Search engine referrer or no paid indicators

**Direct**

No referrer, no campaign, no invite

**Unknown**

Only if detection fails

## 5. Event Tracking Requirements

### 5.1 Mandatory Events

Each event must include:

user_id

onboarding_channel

timestamp

**Events to Track**

registration_completed

email_verified

phone_verified

onboarding_quiz_completed

free_trial_started

subscription_activated

subscription_cancelled

first_purchase_marketplace

first_affiliate_redirect

## 6. Conversion Attribution Rules

### 6.1 Subscription Attribution

Subscription revenue is attributed to:

The user's original onboarding_channel

Attribution does not change if:

User upgrades later

User purchases later

### 6.2 Revenue Attribution

Revenue reports must support:

Revenue per onboarding channel

Revenue per channel over time

Subscription vs commission revenue per channel

## 7. Reporting Requirements (Admin)

Admin must be able to view:

### 7.1 Acquisition Metrics

New users by onboarding channel

Registration growth by channel

Country breakdown per channel

### 7.2 Funnel Metrics (Per Channel)

Registrations → verified users

Verified users → trial started

Trial started → paid subscriptions

Conversion rates per step

### 7.3 Revenue Metrics (Per Channel)

Subscription revenue

Marketplace commission revenue

Affiliate commission revenue

Total LTV per channel (future)

## 8. Data Integrity Rules

Onboarding channel:

Is written once

Cannot be edited manually (except by Super Admin with audit log)

Missing attribution defaults to unknown

All attribution changes (if any) must be logged

## 9. Privacy & Compliance

Tracking must comply with GDPR

Marketing attribution must respect:

User consent

Marketing opt-in settings

No third-party tracking scripts without consent

## 10. MVP vs Post-MVP

### MVP

Channel attribution

Basic UTM support

Admin reports by channel

Revenue per channel

### Post-MVP

Multi-touch attribution

Influencer-level tracking

Cohort analysis

LTV by channel

Fraud / abuse detection

## 11. Acceptance Criteria (Tracking)

Every registered user has an onboarding channel assigned

Admin reports reflect correct channel attribution

Revenue and subscriptions are correctly attributed

No duplicate or conflicting channel assignments

Exported reports include onboarding channel data



