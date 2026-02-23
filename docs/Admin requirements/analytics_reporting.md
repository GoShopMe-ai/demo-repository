# Analytics, Reporting & Metrics Specification
## GoShopMe Admin Platform

## 1. Purpose

This document defines:

All business, engagement, and commerce metrics

Exact formulas

Clear user state definitions

Dashboard structure for the Admin app

It is designed for:

Backend implementation

Admin UI dashboards

Investor-grade reporting

## 2. Canonical User States (Authoritative)

### 2.1 Registered User
User with a created GoShopMe account

### 2.2 Verified User
User with verified email AND phone number

### 2.3 Active User (Engagement-Based)

A user is Active if they perform any meaningful in-app action during a time period.

**Included actions**

AI message sent

Image search

Video search

Viewing recommendations

Add to cart

Affiliate redirect

**Active Users =**
Distinct users with ≥1 engagement event in period

### 2.4 Trial User
User with an active free trial

### 2.5 Paid User
User with an active paid subscription

### 2.6 Purchasing User (Commerce-Based) ✅ KEY DISTINCTION

A user is considered a Purchasing User if they complete at least one purchase originating from GoShopMe.

**Includes**

Marketplace purchase (native checkout)

Affiliate purchase (tracked redirect + conversion)

**Purchasing Users =**
Distinct users with ≥1 completed purchase

### 2.7 Purchase Type Breakdown
**Marketplace Purchasing User =**
User with ≥1 completed marketplace order

**Affiliate Purchasing User =**
User with ≥1 confirmed affiliate conversion

## 3. Engagement Metrics

### 3.1 Active Users

**DAU**

DAU = Distinct active users per day

**WAU**

WAU = Distinct active users in last 7 days

**MAU**

MAU = Distinct active users in last 30 days

### 3.2 Stickiness
Stickiness (%) = DAU / MAU × 100

## 4. Commerce Metrics (Purchasing-Focused)

### 4.1 Purchasing Active Users

**DPAU**

Daily Purchasing Active Users =
Users with ≥1 purchase in a day

**WPAU**

Weekly Purchasing Active Users =
Users with ≥1 purchase in last 7 days

**MPAU**

Monthly Purchasing Active Users =
Users with ≥1 purchase in last 30 days

### 4.2 Engagement → Purchase Conversion
Engagement → Purchase (%) =
Purchasing Users / Active Users × 100

### 4.3 Subscription → Purchase Conversion

**Trial → Purchase**

Trial → Purchase (%) =
Purchasing Trial Users / Trial Users × 100

**Paid → Purchase**

Paid → Purchase (%) =
Purchasing Paid Users / Paid Users × 100

## 5. Onboarding & Funnel Metrics

### 5.1 Registration Funnel

**Verification Rate**

Verified Users / Registered Users × 100

**Quiz Completion Rate**

Users who completed onboarding quiz /
Registered Users × 100

### 5.2 Trial Funnel

**Trial Start Rate**

Trial Users / Verified Users × 100

**Trial → Paid Conversion**

Paid Users / Trial Users × 100

## 6. Subscription Metrics

### 6.1 Subscription Counts
**Active Subscriptions =**
Subscriptions with status = active

**By Plan**

Weekly / Monthly / Annual

### 6.2 Churn
Churn (%) =
Cancelled subscriptions during period /
Subscriptions active at start of period × 100

## 7. Revenue Metrics

### 7.1 Revenue Streams

**Subscription Revenue**

Σ completed subscription payments

**Marketplace Commission Revenue**

Σ (order value × platform commission %)

**Affiliate Commission Revenue**

Σ affiliate commissions received

**Total Revenue**

Subscription + Marketplace + Affiliate

### 7.2 Revenue per Purchasing User

**ARPPU (Commerce)**

ARPPU =
Total Revenue / Purchasing Users

### 7.3 Revenue by Onboarding Channel
Σ revenue WHERE onboarding_channel = X

## 8. Acquisition & Channel Metrics

### 8.1 Users by Channel
Count of users WHERE onboarding_channel = X

### 8.2 Conversion by Channel
Paid Users (channel X) /
Registered Users (channel X) × 100

### 8.3 Revenue by Channel
Total Revenue WHERE onboarding_channel = X

## 9. Commerce Quality Metrics

### 9.1 Marketplace Conversion
Completed marketplace orders /
Marketplace checkout starts × 100

### 9.2 Affiliate Redirect Rate
Affiliate redirects /
Recommendation views × 100

### 9.3 Return Rate (Marketplace Only)
Returned orders /
Completed marketplace orders × 100

## 10. Subscription vs Commerce Matrix

| User Type | Active | Purchasing |
|-----------|--------|------------|
| Free (No Trial) | ✓ | ✓ / ✗ |
| Trial | ✓ | ✓ / ✗ |
| Paid | ✓ | ✓ / ✗ |

## 11. Admin Reporting Dashboards

### 11.1 Executive Overview (Default)

**KPIs**

MAU

MPAU

Engagement → Purchase %

Active Subscriptions

Total Revenue (MTD)

**Charts**

MAU vs Purchasing Users

Revenue by stream (stacked)

### 11.2 Acquisition & Onboarding

Users by channel

Funnel: Registration → Verified → Trial → Paid

Revenue per channel

### 11.3 Subscriptions & Trials

Active trials

Trial conversion %

Churn %

Subscriptions by plan

### 11.4 Engagement & AI Usage

DAU / WAU / MAU

Avg AI interactions per user

Image vs video vs text usage

### 11.5 Commerce & Returns

Marketplace conversion %

Affiliate purchase %

Return rate

Orders & returns by merchant

## 12. Global Dashboard Controls

Date range

Country

Onboarding channel

Export (CSV)

## 13. MVP vs Post-MVP

### MVP

Single-touch attribution

Aggregated metrics

CSV exports

### Post-MVP

Cohort LTV

Multi-touch attribution

Predictive churn

AI-generated insights

## 14. Acceptance Criteria

Engagement and purchasing users are tracked separately

Users may purchase without being subscribed

Affiliate and marketplace purchases are both counted

Revenue attribution matches onboarding channel

Dashboards reflect real-time or clearly delayed data

All metrics support filters and export



