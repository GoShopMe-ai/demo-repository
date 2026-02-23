# GoShopMe Screen Flows – Complete Documentation

This document describes all navigation flows between screens in the GoShopMe HTML designs.

---

## 1. Entry & Auth

### Welcome_Screen.html
- **Get started** → `SignUp_Screen.html`
- **Sign in** → `SignIn_Screen.html`

### SignUp_Screen.html
- **Back** → `Welcome_Screen.html`
- **Sign In** (link) → `SignIn_Screen.html`
- **Sign Up** (submit) → (backend: typically `Onboarding_Personal_Details.html` or `Home.html`)

### SignIn_Screen.html
- **Back** → `Welcome_Screen.html`
- **Forgot Password?** → `Forgotten_Password_Main.html`
- **Sign Up** (link) → `SignUp_Screen.html`
- **Sign In** (submit) → (backend: typically `Home.html`)

### Forgotten_Password_Main.html
- **Back** → `SignIn_Screen.html`
- **Submit** (email found) → `Forgotten_Pass_Email_Sent.html?email=...`
- **Submit** (email not found) → `Forgotten_Pass_AccountNotFound.html?email=...`

### Forgotten_Pass_Email_Sent.html
- **Back** → `Forgotten_Password_Main.html`
- **Reset link** (in email) → `Create_New_Password.html`

### Forgotten_Pass_AccountNotFound.html
- **Contact Support** → `mailto:support@goshopme.com`
- **Back** → `Forgotten_Password_Main.html`

### Create_New_Password.html
- **Back** → `SignIn_Screen.html`
- **Submit** (success) → `Password_Updated_Success.html` (after ~1.5s)

### Password_Updated_Success.html
- **Return to Login** → `SignIn_Screen.html`

---

## 2. Onboarding

### Onboarding_Personal_Details.html
- **Back** → `SignUp_Screen.html`
- **Continue** → `Onboarding_Choose_Plan.html`

### Onboarding_Choose_Plan.html
- **Back** → `Onboarding_Personal_Details.html`
- **Continue** (free plan) → `QuizOrSkip_Success_Subscribe.html` (no payment success banner)
- **Continue** (premium) → `Onboarding_Subscribe_Payment.html`

### Onboarding_Subscribe_Payment.html
- **Go Back** → `Onboarding_Choose_Plan.html`
- **Start My Premium Plan** (success) → `QuizOrSkip_Success_Subscribe.html`
- **Payment failed** → `Onboarding_Payment_Unsuccesful.html`

### Onboarding_Payment_Unsuccesful.html
- **Edit Payment Details** → `Onboarding_Subscribe_Payment.html`
- **Go Back to Plans** → `Onboarding_Choose_Plan.html`

### QuizOrSkip_Success_Subscribe.html
- **Back** → `QuizOrSkip_Screen.html` (or `Onboarding_Choose_Plan.html` when coming from free)
- **Take Style Quiz** → `QuizStep1_BodyShape.html`

---

## 3. Style Quiz

### QuizOrSkip_Screen.html
- **Back** → `Onboarding_Choose_Plan.html`
- **Take Style Quiz** (select quiz option) → `QuizStep1_BodyShape.html`

### QuizStep1_BodyShape.html
- **Back** → `QuizOrSkip_Screen.html`
- **Next** → `QuizStep2_Hair&SkinColor.html`

### QuizStep2_Hair&SkinColor.html
- **Back** → `QuizStep1_BodyShape.html`
- **Next** → `QuizStep3_ColorsLike&Dislike.html`

### QuizStep3_ColorsLike&Dislike.html
- **Back** → `QuizStep2_Hair&SkinColor.html`
- **Next** / **Skip** → `QuizStep4_Sizes_HeelsHeight.html`

### QuizStep4_Sizes_HeelsHeight.html
- **Back** → `QuizStep3_ColorsLike&Dislike.html`
- **Next** → `QuizStep5_Brands.html`

### QuizStep5_Brands.html
- **Back** → `QuizStep4_Sizes_HeelsHeight.html`
- **Next** → `QuizStep6_UploadPics.html`

### QuizStep6_UploadPics.html
- **Back** → `QuizStep5_Brands.html`
- **Continue** → `QuizComplete.html`

### QuizComplete.html
- **Back** → `QuizStep6_UploadPics.html`
- **Start Shopping** → `Home.html`

### Preferred_Disliked_Colors.html
- **Next** → `QuizStep4_Sizes_HeelsHeight.html` (alternate quiz path)

---

## 4. Main App – Home & Discovery

### Home.html
- **Notifications** → `Notifications_Screen.html?from=home`
- **Shopping bag** → `Shopping_bag.html?from=home`
- **Trending Now** (section link) → `Trending_Now.html`
- **Creator's Picks** (section link) → `Picks.html`
- **Shop by Category** → `ShopbyCategory.html`
- **Product cards** (dynamic) → `Product_details_page.html?id=...&...`
- **Creator cards** (dynamic) → `Creator`s Collections_Page.html` or `Creator`s Single_Collection.html`
- **Bottom nav**: Home (active), Picks, Wishlist, Profile

### Trending_Now.html
- **Back** (data-fallback) → `Home.html`
- **Product cards** → `Product_details_page.html`
- **Brand links** → `Brand_Products.html?brand=...`
- **Bottom nav**: Home, Picks, Wishlist, Profile

### ShopbyCategory.html
- **Back** → `Home.html`
- **Notifications** → `Notifications_Screen.html?from=category`
- **Shopping bag** → `Shopping_bag.html?from=category`
- **Category tiles** (dynamic) → category product grids or `Brand_Products.html`
- **Bottom nav**: Home, Picks, Wishlist, Profile

### Brand_Products.html
- **Back** → `Trending_Now.html`
- **Product cards** → `Product_details_page.html?id=...&from=brand`

### Picks.html (Creator's Picks)
- **Back** (header) → (contextual)
- **Notifications** → `Notifications_Screen.html?from=picks`
- **Shopping bag** → `Shopping_bag.html?from=picks`
- **Collection tiles** → `Creator`s Collections_Page.html` (via JS)
- **Product cards** → `Product_details_page.html`
- **Bottom nav**: Home, Picks (active), Wishlist, Profile

### Creator`s Collections_Page.html
- **Back** → `Picks.html`
- **Notifications** → `Notifications_Screen.html?from=collections`
- **Shopping bag** → `Shopping_bag.html?from=collections`
- **Collection tile** (click) → `Creator`s Single_Collection.html?collection=...`
- **Bottom nav**: Home, Picks (active), Wishlist, Profile

### Creator`s Single_Collection.html
- **Back** → `Creator`s Collections_Page.html`
- **Notifications** → `Notifications_Screen.html?from=collection`
- **Shopping bag** → `Shopping_bag.html?from=collection`
- **Product cards** → `Product_details_page.html`

### Product_details_page.html
- **Back** (or goBackProductDetails) → referrer (e.g. `Home.html`) or `Home.html`
- **Notifications** → `Notifications_Screen.html?from=product`
- **Shopping bag** → `Shopping_bag.html?from=product`
- **Bottom nav**: Home, Picks, Wishlist, Profile

---

## 5. Shopping Bag & Wishlist

### Shopping_bag.html
- **Back** (when empty, goBackCartEmpty) → referrer or `Home.html`
- **Notifications** → `Notifications_Screen.html`
- **Checkout** → (checkout flow – TBD)
- **Bottom nav**: Home, Picks, Wishlist, Profile
- **Note**: May show `Shopping_bag_empty_state.html` content when cart is empty (or redirect)

### Shopping_bag_empty_state.html
- **Back** → referrer or `Home.html`
- **Notifications** → `Notifications_Screen.html?from=cart-empty`
- **Shopping bag** → `Shopping_bag.html?from=cart-empty`
- **Bottom nav**: Home, Picks, Wishlist, Profile

### Wishlist.html
- **Notifications** → `Notifications_Screen.html`
- **Shopping bag** → `Shopping_bag.html`
- **Product cards** → `Product_details_page.html`
- **Bottom nav**: Home, Picks, Wishlist (active), Profile

---

## 6. Orders & Tracking

### Orders.html
- **Back** (header) → (contextual / profile)
- **Notifications** → `Notifications_Screen.html?from=orders`
- **Shopping bag** → `Shopping_bag.html?from=orders`
- **Track** (per order) → `Order_Tracking.html`
- **Order details / Receipt** → `Receipt_Details_Screen.html` (or similar)
- **Return** → `Return_Details.html`
- **Note**: Shows `Orders_Screen_Empty_State.html` content when no orders, or uses `?demo=orders` for sample data

### Orders_Screen_Empty_State.html
- **Notifications** → `Notifications_Screen.html?from=orders-empty`
- **Shopping bag** → `Shopping_bag.html?from=orders-empty`
- **Bottom nav**: Home, Picks, Wishlist, Profile

### Order_Tracking.html
- **Back** → `Orders.html`
- **Carrier link** (when `trackingUrl` exists) → external carrier URL
- **Notifications** → `Notifications_Screen.html?from=order-tracking`
- **Shopping bag** → `Shopping_bag.html?from=order-tracking`
- **Bottom nav**: Home, Picks, Wishlist, Profile

### Receipt_Details_Screen.html
- **Back** → `Orders.html`
- **PDF Receipt** → `PDF_Receipt.html`

### Return_Details.html
- **Back** → `Orders.html`

### PDF_Receipt.html
- **Back** → `Receipt_Details_Screen.html` or `Orders.html`

---

## 7. Profile & Settings

### User_Profile_Free_Plan.html / User_Profile_Paid_Plan.html
- **Notifications** → `Notifications_Screen.html?from=profile-*`
- **Shopping bag** → `Shopping_bag.html?from=profile-*`
- **Edit Personal Info** → `Edit_Personal_Info.html`
- **Subscription Management** / **Upgrade** → `Subscription_Management.html`
- **Orders** → `Orders.html`
- **Shipping Address** → `Shipping_Address_Settings.html`
- **Current Style Goals** → `Style_Goals.html`
- **Payment Method** → `Payment_Method_Settings.html`
- **Notifications Settings** → `Notifications_Settings.html`
- **Privacy Settings** → `Privacy_Settings.html`
- **Log out** → `Welcome_Screen.html` (via `logout()`)
- **Bottom nav**: Home, Picks, Wishlist, Profile (active)

### Style_Goals.html
- **Back** → `User_Profile_Free_Plan.html` or `User_Profile_Paid_Plan.html` (based on plan)
- **Retake Style Quiz** → `QuizOrSkip_Screen.html`

### Edit_Personal_Info.html
- **Back** → `User_Profile_Free_Plan.html` (or Paid)
- **Save** → stays on screen (or back to profile)

### Subscription_Management.html
- **Back** → Profile
- **Bottom nav**: Home, Picks, Wishlist, Profile

### Shipping_Address_Settings.html
- **Back** → `User_Profile_Free_Plan.html` (or Paid)
- **Add New Address** → `Edit_AddNew_Shipping_Address.html`
- **Notifications** → `Notifications_Screen.html?from=shipping`
- **Shopping bag** → `Shopping_bag.html?from=shipping`

### Edit_AddNew_Shipping_Address.html
- **Back** → `Shipping_Address_Settings.html`
- **Notifications** → `Notifications_Screen.html?from=add-address`
- **Shopping bag** → `Shopping_bag.html?from=add-address`

### Payment_Method_Settings.html
- **Back** → Profile
- **Bottom nav**: Home, Picks, Wishlist, Profile

### Notifications_Settings.html
- **Back** → `User_Profile_Free_Plan.html`
- **Notifications** → `Notifications_Screen.html?from=notifications-settings`
- **Shopping bag** → `Shopping_bag.html?from=notifications-settings`
- **Bottom nav**: Home, Picks, Wishlist, Profile (active)

### Privacy_Settings.html
- **Back** → `User_Profile_Free_Plan.html`
- **View Full Cookie Policy** → `Cookie_Policy.html`
- **Notifications** → `Notifications_Screen.html?from=privacy-settings`
- **Shopping bag** → `Shopping_bag.html?from=privacy-settings`

### Cookie_Policy.html
- **Back** → `Privacy_Settings.html`

---

## 8. Notifications

### Notifications_Screen.html
- **Back** (goBackNotifications) → referrer (e.g. `Home.html`) or `Home.html`
- **Notification items** → (contextual: e.g. order, product, chat)
- **Note**: Back link may be dynamic based on `from` query param

### Notifications_Screen_Empty.html
- Same structure as Notifications_Screen; used when no notifications

---

## 9. Bottom Navigation (Global)

Screens with bottom nav typically link to:
- **Home** → `Home.html`
- **Picks** → `Picks.html`
- **Wishlist** → `Wishlist.html`
- **Profile** → `User_Profile_Free_Plan.html` or `User_Profile_Paid_Plan.html` (based on `localStorage` plan)

Profile link may be updated via JS (e.g. `#*-nav-profile-link`) based on plan.

---

## 10. Screens with Limited or Indirect Flows

| Screen | Notes |
|--------|-------|
| **Group chat.html** | Standalone; flow TBD |
| **test_index.html** | Test/dev only |
| **Preferred_Disliked_Colors.html** | Alternate quiz path → QuizStep4 |

---

## 11. Dynamic / JS-Based Navigation

- **Product cards** across Home, Trending, Picks, Shop by Category, Brand, Creator: `Product_details_page.html?id=...&name=...&from=...`
- **Back buttons** with `goBack*` handlers: use `document.referrer` or sessionStorage to return to previous screen
- **Orders** Track button: `Order_Tracking.html` (with order id in URL/state)
- **Creator collection click**: `Creator`s Single_Collection.html?collection=...`
- **Category click** (ShopbyCategory): navigates to category products (inline or Brand_Products)

---

## 12. Data-Dependent Flows

- **Orders.html**: If no orders → shows empty state (inline or redirect to `Orders_Screen_Empty_State.html`)
- **Shopping_bag.html**: If cart empty → may show empty state or redirect to `Shopping_bag_empty_state.html`
- **Style_Goals.html** back link: Set dynamically to Free or Paid profile based on `localStorage` plan
- **Order_Tracking.html** profile link: Set dynamically based on plan

---

*Last updated: Feb 2025. Reflects current `html_designs/` structure.*
