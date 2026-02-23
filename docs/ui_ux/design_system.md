# Design System
## GoShopMe Platform

## 1. Color Palette

### Primary Colors
- **Primary**: `#939BFB` (shine-primary)
  - Used for: Primary buttons, active states, accents, chat bubbles (outgoing), links
- **Accent**: `#F96226` (shine-accent)
  - Used for: Notification badges, alerts, highlights

### Secondary Colors
- **Light Blue**: `#B7C7FF`
  - Used for: Chat prompt button borders, hover states

### Neutral Colors
- **Background**: 
  - Primary: `#FFFFFF` (white)
  - Secondary: `#F6F6F6` (light gray)
  - Tertiary: `#F3F4F6` (gray-50)
- **Text Colors**:
  - Primary: `#000000` (black)
  - Secondary: `#1F2937` (gray-900)
  - Tertiary: `#4B5563` (gray-600)
  - Quaternary: `#6B7280` (gray-500)
  - Disabled: `#9CA3AF` (gray-400)
- **Borders**:
  - Light: `#F3F4F6` (gray-100)
  - Medium: `#E5E7EB` (gray-200)
  - Dark: `#D1D5DB` (gray-300)

### Status Colors
- **Success**: Green tones (for notifications, confirmations)
- **Error/Recording**: `#EF4444` (red-500)
  - Used for: Form validation errors, invalid input states (`.input-error`, `.error-msg`), voice recording state
  - **Do not use for delete/remove actions**
- **Delete/Destructive**: `#F96226` (shine-accent)
  - Used for: Delete confirmations, remove buttons, destructive actions (e.g. delete address)
  - **Distinct from Error** — delete is an intentional user action, not a validation failure
- **Warning**: Yellow/amber tones (if needed)

## 2. Typography

### Font Families

**Primary Font Stack** (DM Sans):
```css
font-family: 'DM Sans', 
             'Karla',
             -apple-system,
             BlinkMacSystemFont,
             'Segoe UI',
             Roboto,
             'Helvetica Neue',
             Arial,
             'Noto Sans',
             sans-serif;
```

**Secondary Font Stack** (Poppins):
```css
font-family: 'Poppins',
             -apple-system,
             BlinkMacSystemFont,
             'Segoe UI',
             Roboto,
             'Helvetica Neue',
             Arial,
             sans-serif;
```

### Font Weights
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

### Type Scale

**Headings** (Poppins):
- H1: `text-2xl font-semibold` (24px, semibold) - Product names
- H2: `text-lg font-semibold` (18px, semibold) - Section headers
- H3: `text-sm font-semibold` (14px, semibold) - Subsection headers

**Body Text** (DM Sans):
- Large: `text-base` (16px, regular) - Primary body text
- Medium: `text-sm` (14px, regular) - Secondary text, descriptions
- Small: `text-xs` (12px, regular) - Labels, captions, badges

**Special**:
- Price: `text-2xl font-bold` (24px, bold, black)

### Font Usage Rules
- **Body & UI text**: Use DM Sans stack — apply via global `*`, `.dm-sans`, or `.font-wix` (alias)
- **Headings** (H1, H2, H3): Use Poppins — apply via `.poppins` or `.font-fuhkwang` (alias)
- **Buttons**: Use DM Sans for button labels; Poppins for primary CTA text if desired
- **Minimum body font size**: 12px (`text-xs`); headings 14px+ (`text-sm` and up)
- **Desktop**: Same font rules; no scaling changes — use same classes across breakpoints

## 3. Buttons

### Icon Buttons

**Header Icon Buttons** (back, bell, shopping bag) — see **Section 5. Header** for full spec. Use plain icons (no circular background), `.header-icon-btn` class, hover lift effect.

**Default Icon Button** (for non-header contexts, e.g. overlays):
- Size: `w-10 h-10` (40px × 40px)
- Background: `bg-gray-50` (rounded-full) — optional; header icons use plain style
- Icon size: `w-5 h-5` (20px × 20px)
- Stroke width: `1.5`
- Hover: Icon color changes to `#939BFB` or `hover:opacity-70 transition-opacity`

**Icon Button (White)**:
- Background: `bg-white/90` (90% opacity)
- Backdrop blur: `backdrop-blur-sm`
- Used in: Product image overlays (wishlist, share)

**Collection/Product Image Overlay Icons** (heart, share, chat) — match Wishlist:
- **No circular background** — plain icon buttons over the image
- Icon size: `w-4 h-4` (16px) for chat; heart/share may use `w-4 h-4` or `w-[18px] h-[18px]` depending on screen
- Icon color: `text-white` (overlay on images)
- Stroke: `stroke-width="1.5"`
- Hover: `hover:opacity-80 transition-opacity`
- Placement: `absolute top-3 right-3 flex flex-col space-y-2` (vertical stack) or `top-2 right-2 space-y-1` (Wishlist)
- Heart: outline default; filled `#939BFB` when wishlisted (`.heart-filled`, `fill="#939BFB" stroke="#939BFB"`)
- Share: paper plane with `share-icon-tilted` (rotate -35deg)
- **Chat**: Heroicons chat-bubble-left-right (two bubbles, conversation style). Use **everywhere** product/collection cards appear: Home, Creator Picks, Creator Collections, Creator Single Collection, Trending Now, Wishlist.
  - Button: `p-1 flex items-center justify-center hover:opacity-80 transition-opacity chat-trigger`
  - SVG: `w-4 h-4 text-white product-overlay-icon`, `fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"`
  - Path: `M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155`
  - **Chat trigger behavior**: When tapped, opens the ShAI chat drawer and adds a contextual message with product/collection thumbnails. Thumbnails: up to 4 images, `w-12 h-12 rounded-lg object-cover border border-gray-200`. Product tiles: use `data-product-image` or `data-product-id`; collection tiles: use `data-collection` with `itemThumbnails` or `coverImage`. Heart and Share must call `toggleWishlist(button, productId)` and `shareProduct(name, price, url, productId, brand)` respectively.

**Product tile overlay behavior** (Heart, Share, Chat — consistent across all screens):
- **Heart (wishlist)**: Class `wishlist-btn`. Calls `window.toggleWishlist(button, productId)`. Outline when not wishlisted; `.heart-filled` with `fill="#939BFB" stroke="#939BFB"` when wishlisted.
- **Share**: Class `share-product-btn`. Calls `window.shareProduct(productName, price, productUrl, productId, brand)`. Uses `share-icon-tilted` class on the SVG.
- **Chat**: Class `chat-trigger`. Opens ShAI drawer, adds contextual message with ShAI avatar and product/collection thumbnails (up to 4, `w-12 h-12 rounded-lg object-cover border border-gray-200`). Product tiles: `data-item` (name), `data-product-image` (URL). Collection tiles: `data-collection` (name), thumbnails from `itemThumbnails` or `coverImage`.

**Chat + thumbnail implementation pattern** (apply on all screens with product tiles and chat drawer):
- Use `addContextualMessage(message, thumbUrls)` where `thumbUrls` is an array of image URLs (max 4).
- Thumbnail HTML: `flex gap-1.5 mt-2 flex-wrap` container; images: `w-12 h-12 rounded-lg object-cover border border-gray-200`.
- Product image source: `trigger.getAttribute('data-product-image')` or `item.querySelector('[data-product-image]')?.src` or `item.querySelector('img')?.src`.
- Reference screens: Trending_Now.html, Wishlist.html, Picks.html (collections), Creator's Single_Collection.html.

### Text Buttons

**Primary Button**:
- Background: `bg-[#939BFB]`
- Text: `text-white`
- Padding: `px-4 py-2` or `px-3 py-1.5`
- Border radius: `rounded-full` or `rounded-xl`
- Font: `text-sm font-medium`

**Secondary Button (Outlined)**:
- Background: `bg-white`
- Border: `border border-[#B7C7FF]`
- Text: `text-[#939BFB]`
- Hover: `hover:bg-[#939BFB] hover:text-white`
- Border radius: `rounded-full`
- Padding: `px-3 py-1.5`
- Font: `text-xs font-medium`

**Ghost Button**:
- Background: Transparent
- Text: `text-gray-600` or `text-black`
- Padding: `px-3 py-1`
- Hover: `hover:opacity-70`

**Destructive Button** (delete, remove actions):
- Background: `bg-[#F96226]` (shine-accent)
- Text: `text-white`
- Padding: `py-2 px-3`
- Border radius: `rounded-full`
- Font: `text-sm font-medium`
- Hover: `hover:opacity-90 transition-opacity`
- Icon: Use `text-[#F96226]` with `bg-orange-100` for the icon circle
- **Never use red (#EF4444)** — reserved for error states only

### Button States
- **Default**: Standard styling
- **Hover**: `hover:opacity-70 transition-opacity` or color change
- **Active**: `active` class or color change
- **Disabled**: Reduced opacity, no pointer events

### Size Selector Buttons
- Size: `py-3` (padding vertical)
- Border: `border border-gray-200` or `border-2 border-[#939BFB]`
- Active state: `border-2 border-[#939BFB] bg-[#939BFB] text-white`
- Border radius: `rounded-lg`
- Font: `text-sm font-medium`

### Unit Toggle Buttons
- Container: `bg-gray-100 rounded-lg p-1`
- Active: `bg-white rounded-md shadow-sm`
- Inactive: `text-gray-600`
- Padding: `px-3 py-1`
- Font: `text-sm`

## 4. Icons

### Icon Specifications
- **Standard Size**: `w-5 h-5` (20px × 20px)
- **Small Size**: `w-4 h-4` (16px × 16px)
- **Drawer/Chat Size**: `w-[18px] h-[18px]` (18px × 18px)
- **Stroke Width**: `1.5` (default), `2` (when needed)
- **Color**: Inherits from parent or `currentColor`

### Icon Libraries
- **Heroicons**: Outline version (v2.0.16)
- **Custom**: Share icon (tilted -35deg rotation)

### Icon Usage
- Header icons: 20px
- Bottom nav icons: 20px with 4px margin-bottom
- Chat input icons: 18px
- Product card icons: 16px

## 5. Header

### Structure
- **Position**: Fixed top, centered
- **Width**: Always matches main screen — `w-full max-w-[390px]` (must be same width as app shell/main container on desktop)
- **Desktop**: `fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[390px]` — centered, max 390px
- **Background**: `bg-white`
- **Border**: `border-b border-gray-100`
- **Z-index**: `z-50`
- **Padding**: `p-4`

### Layout
- **Left**: Back button (when applicable)
- **Center**: Page title (H1, Poppins, semibold, gray-900)
- **Right**: Icon buttons (notifications, cart) with badges

### Header Icon Buttons (Back, Bell, Shopping Bag)

**Design** — plain icons, no circular background:
- Size: `w-10 h-10` (40px × 40px touch target)
- Icon size: `w-5 h-5` (20px × 20px)
- Stroke width: `1.5`
- Color: `text-gray-600`
- Hover: `hover:text-gray-800`
- **No grey circle** — do not use `rounded-full bg-gray-50`

**Hover behavior** (mouse):
- Slight upward movement: `transform: translateY(-2px)` on hover
- Transition: `transition: transform 0.2s ease, color 0.2s ease`
- Apply via class: `.header-icon-btn`

**CSS**:
```css
.header-icon-btn { transition: transform 0.2s ease, color 0.2s ease; }
.header-icon-btn:hover { transform: translateY(-2px); }
```

**Back Button** (see **Section 5b. Back Button – Global Behavior**):
- **Must return user to previous screen** – use `history.back()` when possible
- Use class `goshopme-back-btn` with `data-fallback="URL"` when using shared component
- Icon: Left arrow (Heroicons), 20px
- `aria-label`: e.g. "Back", "Back to profile"

**Bell (Notifications)** (see **Section 5a. Header Icons & Badges – Global Component**):
- Link: `Notifications_Screen.html?from=<screen-id>`
- `aria-label`: "Notifications"

**Shopping Bag (Cart)** (see **Section 5a**):
- Link: `Shopping_bag.html?from=<screen-id>`
- `aria-label`: "Shopping bag"

### Section 5a. Header Icons & Badges – Global Component

The **bell (notifications)** and **shopping bag (cart)** with badges are global elements. Use the shared component to ensure consistent behavior across all screens.

**1. Include the script** (in `<head>` or before `</body>`):

```html
<script src="js/header-icons-badges.js"></script>
```

**2. Option A – Inject into placeholder** (recommended for new screens):

```html
<div id="header-icons-slot" class="flex items-center gap-0"></div>
```

The script injects bell + bag icons. Links automatically include `?from=<current-screen>`.

**3. Option B – Use your own HTML** (legacy screens):

Provide elements with IDs: `#notif-btn`, `#cart-btn`, `#notif-indicator`, `#notif-count`, `#cart-indicator`, `#cart-count`. The script syncs badge counts from localStorage.

**API**:
- `window.GoShopMeHeaderIcons.updateCartBadge(count)` – set cart badge
- `window.GoShopMeHeaderIcons.updateNotifBadge(count)` – set notification badge
- `window.GoShopMeHeaderIcons.getCartCount()` / `getNotifCount()`
- `window.GoShopMeHeaderIcons.addToCart()` / `addToNotifications()` – increment

**localStorage keys**: `goshopme_cart_count`, `goshopme_notif_count`

### Section 5b. Back Button – Global Behavior

The header back button **must return the user to the previous screen**. Do not hardcode `href` to a specific page (e.g. profile) except as fallback.

**1. Include the script**:

```html
<script src="js/back-button.js"></script>
```

**2. Mark back buttons**:

```html
<a href="#" class="goshopme-back-btn" data-fallback="User_Profile_Free_Plan.html" aria-label="Back">
  <svg>...</svg>
</a>
```

- `data-fallback`: URL when `history.back()` is unavailable (e.g. opened in new tab)
- Uses `history.back()` when history length > 1

**Manual alternative** (if not using shared script):

```javascript
if (history.length > 1) history.back(); else location.href = 'fallback.html';
```

### Header Badges

**Notification Badge**:
- Position: `absolute -top-0.5 -right-0.5` on the bell icon container
- Size: `min-w-[18px] min-h-[18px] px-1`
- Background: `bg-[#F96226]` (shine-accent)
- Border radius: `rounded-full`
- Text: `text-[10px] text-white font-medium leading-none`
- Visibility: Hidden when count is 0; use `hidden` / `flex` toggling
- Storage: `localStorage` key `goshopme_notif_count`

**Cart Badge**:
- Position: `absolute -top-0.5 -right-0.5` on the bag icon container
- Size: `min-w-[18px] min-h-[18px] px-1`
- Background: `bg-[#939BFB]` (shine-primary)
- Border radius: `rounded-full`
- Text: `text-[10px] text-white font-medium leading-none`
- Visibility: Hidden when count is 0
- Storage: `localStorage` key `goshopme_cart_count`

**Title**:
- Font: `text-lg font-semibold text-gray-900 poppins`

## 6. Bottom Navigation

**See Section 6a for the global component.** Use the shared `bottom-nav.js` on all app screens.

### Section 6a. Bottom Navigation – Global Component

The bottom navigation bar is a global element. Use the shared component.

**1. Include the script**:

```html
<script src="js/bottom-nav.js"></script>
```

**2. Initialize on `DOMContentLoaded`** (or set `window.__bottomNavInit` before load):

```javascript
GoShopMeBottomNav.init({
    insertBefore: 'bottom-nav-placeholder',  // or null to append to body
    currentPage: 'home',   // 'home'|'picks'|'wishlist'|'profile' – sets .active
    profileHref: 'User_Profile_Free_Plan.html'  // optional override
});
```

**Or pre-set** (before DOMContentLoaded):

```javascript
window.__bottomNavInit = { insertBefore: null, currentPage: 'home' };
```

**Profile link**: Defaults to `User_Profile_Free_Plan.html` or `User_Profile_Paid_Plan.html` based on `localStorage.__userPlan`. Override via `profileHref` or `window.__profilePageUrl`.

**Profile photo**: Read from `localStorage.profilePhoto`. After updating, call `GoShopMeBottomNav.refreshProfilePhoto()` if the nav is already rendered.

### Structure
- **Position**: Fixed bottom
- **Width**: Always matches main screen — `w-full max-w-[390px]` (must be same width as app shell on desktop)
- **Desktop**: `fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px]` — centered, max 390px
- **Background**: `bg-white`
- **Border**: `border-t border-gray-100`
- **Z-index**: `z-50`
- **Padding**: `py-2`

### Navigation Items
- **Layout**: `flex items-center justify-around`
- **Item Structure**: Flex column, centered
- **Icon Size**: `w-6 h-6` (24px) for profile image, `20px × 20px` for SVG icons
- **Icon Margin**: `mb-1` (4px)
- **Label**: `text-xs`
- **Spacing**: Icons use `stroke-width: 1.5`

### States
- **Default**: `color: #6B7280` (gray-500)
- **Active**: `color: #939BFB` (primary)
- **Hover**: `color: #939BFB`
- **Transition**: `transition: color 0.2s ease-in-out`

### Navigation Items (4 items)
1. **Home** (house icon)
2. **Picks** (star icon) — label must be "Picks" (not "Collections"); links to Creator Picks / Collections screen
3. **Wishlist** (heart icon)
4. **Profile** (user avatar image, 24px)

**Important**: The second nav item label is always "Picks" per approved design. Do not use "Collections" in the bottom nav.

### Profile Picture (Bottom Nav)
- **No photo uploaded**: Show profile icon (SVG user icon, `w-6 h-6`, `text-shine-primary`)
- **Photo uploaded**: Show user's picture (`w-6 h-6 rounded-full object-cover`)
- **Storage**: Use `localStorage.getItem('profilePhoto')` / `localStorage.setItem('profilePhoto', dataUrl)` for the data URL
- **On load**: Read from localStorage; show icon or img accordingly
- **On update**: Call `window.setProfilePhoto(url)` to persist and update the nav; use `setProfilePhoto(null)` to clear

## 7. Chat Drawer

### Structure
- **Position**: Fixed bottom
- **Width**: Full width, max 390px
- **Background**: `bg-white`
- **Border Radius**: `rounded-t-3xl` (top corners)
- **Shadow**: `shadow-2xl`
- **Z-index**: `z-50`
- **Height**: `h-[80vh]` (default, draggable)
- **Transform**: Slides up from `translate-y-full` to `translate-y-0`
- **Transition**: `transition-transform duration-300`

### Drag Handle
- **Size**: `w-10 h-1` (40px × 4px)
- **Background**: `bg-gray-300`
- **Border Radius**: `rounded-full`
- **Position**: Centered at top, `pt-2`
- **Cursor**: `cursor-pointer`

### Chat Header
- **Layout**: `flex items-center p-4 pb-2`
- **Avatar**: `w-8 h-8 rounded-full object-cover` — **ShAI avatar image** (hardcoded for now):
  - **Asset path**: `assets/shai-avatar.png` (project root: `C:\Users\norag\GoShopMe\assets\shai-avatar.png`)
  - **HTML usage**: Use `src="../assets/shai-avatar.png"` for files in `html_designs/` (relative path from html_designs to assets folder)
  - **Fallback**: `#shai-avatar-placeholder` with "AI" text when image fails to load (`onerror` handler)
  - **Data attribute**: `data-shai-avatar` on all ShAI avatar `<img>` elements for bulk updates via `window.setShAIAvatar(url)` when DB provides URL later
  - **Default init**: Call `window.setShAIAvatar('assets/shai-avatar.png')` or equivalent on DOMContentLoaded so all `[data-shai-avatar]` elements get the image
  - Apply to all screens with the chat drawer and chat
- **Title**: `font-semibold text-black text-sm`
- **Subtitle**: `text-xs text-gray-500`
- **Back Button**: `w-[18px] h-[18px]`, hidden by default (shown only in add-friend flow)
- **No drawer-toggle/arrow button**: Drawer collapses via overlay tap or **drag handle down** (see Chat Drawer Dragging)

### Chat Messages Container
- **Container**: `flex-1 overflow-y-auto`
- **Padding**: `p-4 pb-0`
- **Scroll Behavior**: Auto-scroll to bottom when new messages arrive (scroll the `#chat-messages` container, not inner `.p-4`)

### Message Bubbles

**Incoming (ShAI)**:
- Background: `bg-gray-50`
- Text: `text-black`
- Border radius: `rounded-2xl rounded-tl-md` (use `rounded-tl-md`, not `rounded-tl-sm`)
- Padding: `p-3`
- Max width: `max-w-[80%]`
- Font: `text-sm`
- **Text wrapping**: Inner `<p>` must include `break-words whitespace-pre-wrap` for long messages and newlines

**Outgoing (User)**:
- Background: `bg-[#939BFB]`
- Text: `text-white`
- Border radius: `rounded-2xl rounded-tr-md`
- Padding: `p-3`
- Max width: `max-w-[80%]`
- Font: `text-sm`
- Alignment: `justify-end`
- **Text wrapping**: Inner `<p>` must include `break-words whitespace-pre-wrap` so long messages wrap correctly and newlines are preserved

**Product Bubble**:
- Background: `bg-white`
- Border: `border border-gray-200` or `border-[#939BFB]` for outgoing
- Border radius: `rounded-2xl`
- Padding: `p-3`
- Max width: `max-w-[60%]`
- Shadow: `shadow-sm`
- Image: `h-32 object-cover rounded-lg`

**Voice Message Bubble**:
- Min width: `140px`
- Max width: `260px`
- Padding: `px-3 py-2`
- Height: `h-11`
- Border radius: `rounded-full`
- Background: `bg-[#939BFB]` (outgoing) or `bg-gray-50` (incoming)
- Waveform bars: `w-0.5` with varying heights
- Play button: `w-6 h-6 border border-white rounded-full`

### Chat Input

**Container**:
- Background: `bg-white`
- Border: `border-t border-gray-100`
- Padding: `p-4`

**Input Field**:
- Use `<textarea>` (not `<input type="text">`) for multi-line expansion
- Container: `bg-white rounded-2xl border border-gray-200 px-4 py-3 shadow-sm`
- Input: `flex-1 bg-transparent outline-none resize-none`
- Placeholder: `placeholder-gray-500`
- Font: DM Sans
- Min height: `min-h-[24px]`
- Max height: `max-h-[144px]` (~6 rows)
- **Auto-grow**: When text exceeds field width, expand to multiple rows; max 6 rows; `overflow-y: auto` when capped
- Apply to all screens where the chat drawer persists (Home, Creator Collections, Orders, Product details, Wishlist, Shopping bag, etc.)

**Input Icons**:
- Size: `w-[18px] h-[18px]`
- Color: `text-black`
- Spacing: `gap-2`

**Camera Button** (cam-btn, cam-btn-drawer):
- Tap opens native file picker via `<input type="file" accept="image/*,video/*">`
- User selects image or video from device; selection is shown in chat as image/video bubble
- ShAI responds after upload (e.g. "Perfect! I can see your image. Let me analyze it...")

**Microphone Button** (mic-btn, mic-btn-drawer):
- **Hold to record**: `mousedown`/`touchstart` → start recording; `mouseup`/`touchend` → stop
- **Cancel**: `mouseleave` (mouse) or swipe left >30px (touch)
- **Visual feedback while recording**: `scale-110`, `ring-2 ring-[#939BFB] ring-offset-2` on mic button
- **Recording bubble (visible)**: Show temporary bubble "Recording... swipe left to cancel" immediately when recording starts; `bg-[#939BFB]`, white text, `font-medium`, optional `animate-pulse`; **scroll chat to bottom** so the bubble is visible
- **Recording bubble**: waveform bars, play button, duration; `bg-[#939BFB]`, `rounded-full`
- Uses `MediaRecorder`, `getUserMedia`, `Blob`, `URL.createObjectURL`
- Same behavior on Home screen and chat drawer

**Send Button**:
- Color: `text-[#939BFB]`
- Hidden when input is empty
- Shows when text is entered

### Smart Prompts (Quick Actions)
- Container: `flex flex-wrap gap-2 pb-2`
- Button style: Secondary button (outlined)
- Size: `px-3 py-1.5`
- Font: `text-xs font-medium`
- Hover: `hover:bg-[#939BFB] hover:text-white transition-colors`

### Chat Overlay
- Background: `bg-black/40` (40% opacity)
- Position: Fixed, full screen
- Z-index: `z-40`
- Hidden by default, shows when drawer is open

### Implementation (Shared Chat Drawer Component)

A **shared JavaScript component** provides the chat drawer for all pages, matching the Home screen. Use it instead of duplicating chat HTML/JS per page.

**1. Include the script** (before your page script, typically before `</body>`):

```html
<script src="js/chat-drawer.js"></script>
```

**2. Initialize on `DOMContentLoaded`** (use `insertBefore` so the chat UI sits above the bottom nav):

```javascript
if (typeof window.GoShopMeChatDrawer !== 'undefined') {
    window.GoShopMeChatDrawer.init({
        openByDefault: false,    // true to open drawer on load
        insertBefore: 'bottom-navigation'   // ID of element to insert before (usually bottom nav)
    });
}
```

**3. Use the API for chat triggers** (e.g. `.chat-trigger` on product cards, creator profile):

```javascript
// Open drawer and add contextual message
window.GoShopMeChatDrawer.expandDrawer();
window.GoShopMeChatDrawer.addContextualMessage('Tell me more about the "' + productName + '"...', [productImageUrl]);

// Or use addShAIMessage (alias)
window.GoShopMeChatDrawer.addShAIMessage(message, thumbUrls);
```

**4. ShAI avatar**: Set `window.__shaiAvatarUrl` or call `window.setShAIAvatar(url)` before init so all `[data-shai-avatar]` elements use the correct image.

**Shared component elements** (full inventory, per Home.html):

| Element ID | Description |
|------------|-------------|
| `#chat-overlay` | Full-screen overlay; tap to close drawer |
| `#chat-drawer` | Main drawer container (messages + input) |
| `#drag-handle-zone` | Touch target for drag (min 44px height, mobile-optimized) |
| `#drag-handle` | Visible pill (w-10 h-1) inside zone |
| `#chat-header` | Header with back, avatar, title, subtitle |
| `#back-btn` | Back (shown in Add Friend view) |
| `#chat-content` | Main chat view (messages + input) |
| `#chat-messages` | Scrollable message list |
| `#smart-prompts` | Quick-action chips |
| `#message-input` | Textarea in drawer (auto-expands to 6 rows) |
| `#cam-btn-drawer` | Camera (image/video upload) in drawer |
| `#add-friend-btn` | Add Friend in drawer |
| `#mic-btn` | Microphone (hold to record) in drawer |
| `#send-btn` | Send in drawer (hidden when empty) |
| `#add-friend-content` | Add Friend view (hidden by default) |
| `#contact-search` | Search contacts input |
| `#contacts-container` | Contact list (Add/Invite buttons) |
| `#chat-input-bar` | Collapsed bar (fixed above bottom nav) |
| `#chat-input-bar-field` | Textarea in collapsed bar |
| `#cam-btn` | Camera in collapsed bar |
| `#add-friend-btn-bar` | Add Friend in collapsed bar |
| `#mic-btn-bar` | Microphone in collapsed bar |
| `#send-btn-bar` | Send in collapsed bar |

**Features included** (matching Home): Camera (image + video upload), Add Friend flow (contact list, search, Add/Invite), Voice recording (hold mic, swipe left to cancel), Auto-expand textarea (max 6 rows), Smart prompts, Overlay tap to close.

**Optional**: `window.loadAddFriendContacts(data)` — pass `{ name, phone, goshopme, avatar? }[]` to replace default contacts.

### Chat Drawer Dragging (Mobile Optimization)

- **Touch target**: The drag handle uses a `#drag-handle-zone` wrapper with `min-h-[44px]` (Apple HIG) so the whole area is tappable on mobile.
- **Touch handling**: `touch-action: none` and `user-select: none` on the zone prevent scroll/selection during drag; `-webkit-tap-highlight-color: transparent` removes tap flash.
- **Events**: `touchstart` on zone (passive), `touchmove` with `preventDefault()` (passive: false), `touchend` and `touchcancel` to end drag.
- **Transitions**: Height transitions are disabled during drag (`transition: none`) for responsive feedback.
- **Close threshold**: When released below 25vh, drawer collapses fully; otherwise snaps to 35–90vh.
- **Scroll**: Drawer uses `-webkit-overflow-scrolling: touch` and `overscroll-behavior: contain` for smooth mobile scrolling.

**Reference pages**: `Home.html`, `Trending_Now.html`.

## 7a. Creator Collections Page (Dynamic)

### Data Source
- Creator profile and collections are loaded from the database. Call `window.loadCreatorProfile(data)` with API response.

### Creator Profile Data Shape
```javascript
{
  id: string,
  name: string,
  avatar?: string,           // URL; if missing, show initials
  tagline?: string,
  followers?: string|number, // e.g. "47.2k" or 47200
  isFollowing?: boolean,
  social?: {                 // Optional; keys: instagram, tiktok, youtube, pinterest, twitter
    instagram?: string,      // Handle or full URL
    tiktok?: string,
    youtube?: string,
    pinterest?: string,
    twitter?: string
  },
  collections: Array<{
    id: string,
    name: string,
    coverImage: string,
    description?: string,
    itemCount: number,
    priceRange?: string,
    saves?: string,
    badge?: "New Collection" | "Trending" | null,
    itemThumbnails?: string[]
  }>
}
```

### Preload Data
- Set `window.__creatorProfileData` before `DOMContentLoaded` to use your API data; otherwise sample data is used.

## 8. Input Fields

### Text Input
- Background: `bg-white` or `bg-gray-50`
- Border: `border border-gray-200`
- Border radius: `rounded-xl` or `rounded-2xl`
- Padding: `px-4 py-2` or `px-4 py-3`
- Font: DM Sans
- Placeholder: `placeholder-gray-500`
- Focus: `outline-none` (custom focus states)

### Textarea (Auto-growing)
- Base: Same as text input
- `resize-none`
- `overflow-y: hidden`
- Auto-resize up to 6 rows
- Line height: 20px (default)

### Search Input
- Container: `relative`
- Icon position: Absolute left `left-3 top-1/2 -translate-y-1/2`
- Icon color: `text-gray-400`

### Form Validation & Error Messaging
- **Error state**: Errored field gets red border `#EF4444` via class `.input-error`
- **CSS**:
  - `.input-error { border-color: #EF4444 !important; }`
  - `.input-error:focus { --tw-ring-color: #EF4444 !important; }`
  - `.error-msg { color: #EF4444; font-size: 12px; margin-top: 4px; }`
- **Message**: Display contextual message below the field (e.g., "First name is required", "Please enter a valid email address")
- **Clear**: Remove `.input-error` from field and clear/hide message when user corrects input

## 9. Badges & Indicators

### Notification Badge
- Size: `w-3 h-3` (12px × 12px)
- Background: `bg-[#F96226]` (accent)
- Position: `absolute -top-0.5 -right-0.5`
- Border radius: `rounded-full`
- Hidden by default, shows when count > 0

### Cart Badge
- Size: `w-3 h-3` (12px × 12px)
- Background: `bg-[#939BFB]` (primary)
- Position: `absolute -top-0.5 -right-0.5`
- Border radius: `rounded-full`
- Text: `text-[10px] text-white font-medium leading-none`
- Hidden by default, shows when count > 0

## 10. Cards & Product Displays

### Product Card
- Background: `bg-white`
- Border: `border border-gray-100`
- Border radius: `rounded-lg`
- Padding: `p-3`
- Hover: `hover:shadow-md transition-shadow`
- Image: `h-32 bg-gray-100 rounded-lg overflow-hidden`
- Image object: `object-cover`

### Product Gallery
- Height: `h-[400px]`
- Background: `bg-gray-100`
- Image: `w-full h-full object-cover`
- Gallery dots: `w-2 h-2 rounded-full`, positioned bottom-center

### Product Info Section
- Padding: `px-4 pt-6 pb-4`
- Brand: `text-sm text-gray-500`
- Name: `text-2xl font-semibold text-gray-900 poppins mb-2`
- Price: `text-2xl font-bold text-black mb-1`
- Merchant: `text-sm text-gray-500`

## 11. Spacing & Layout

### Container Width
- **Max Width**: `max-w-[390px]` (mobile viewport)
- **Centering**: `mx-auto` or `left-1/2 -translate-x-1/2`

### Standalone & Auth/Onboarding Screen Template
For screens without the main app shell (auth, onboarding, error states, etc.):

- **Body**: `bg-[#F6F6F6] min-h-screen` — gray background around the centered card
- **Main container**: `relative w-full max-w-[390px] mx-auto min-h-screen bg-white flex flex-col overflow-y-auto shadow-2xl` — white card, centered, 390px max width
- **Header**: `w-full bg-white border-b border-gray-100 px-5 py-4 flex-shrink-0` — same width as main container (inherits from parent)
- **Bottom nav / fixed footer** (when present): `fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px]` — same width as main screen
- **No full-screen gradients**; keep content on plain white over gray background
- **Icons**: Heroicons SVG inline; avoid Font Awesome

### Padding Scale
- **XS**: `p-1` (4px)
- **SM**: `p-2` (8px)
- **MD**: `p-3` (12px)
- **LG**: `p-4` (16px)
- **XL**: `p-6` (24px)
- **XXL**: `p-8` (32px)

### Gap Scale
- **XS**: `gap-1` (4px)
- **SM**: `gap-2` (8px)
- **MD**: `gap-3` (12px)
- **LG**: `gap-4` (16px)

### Margin Scale
- **XS**: `mb-1` (4px)
- **SM**: `mb-2` (8px)
- **MD**: `mb-3` (12px)
- **LG**: `mb-4` (16px)
- **XL**: `mb-6` (24px)
- **XXL**: `mb-8` (32px)

## 12. Border Radius

- **Small**: `rounded` (4px)
- **Medium**: `rounded-lg` (8px)
- **Large**: `rounded-xl` (12px)
- **XLarge**: `rounded-2xl` (16px)
- **XXLarge**: `rounded-3xl` (24px)
- **Full**: `rounded-full` (9999px)

## 13. Shadows

- **Small**: `shadow-sm` (subtle elevation)
- **Medium**: `shadow-md` (card hover states)
- **Large**: `shadow-2xl` (drawer, modals)

## 14. Transitions & Animations

### Transitions
- **Color**: `transition-colors`
- **Opacity**: `transition-opacity`
- **Transform**: `transition-transform duration-300`
- **All**: `transition-all`

### Animations
- **Wave Pulse**: For voice message waveforms
  - Duration: `1.1s ease-in-out infinite`
  - Delay: `calc(var(--i) * 0.08s)`

### Hover Effects
- **Opacity**: `hover:opacity-70`
- **Scale**: `hover:scale-110` (voice recording)
- **Background**: `hover:bg-[#939BFB]` (buttons)

## 15. States & Behaviors

### Wishlist Heart
- **Default**: Outline, `fill: none`, `stroke: currentColor`
- **Active**: `fill: #939BFB`, `stroke: #939BFB`
- **Class**: `.heart-filled`

### Voice Recording
- **Active State**: `bg-[#ef4444]` (red), `color: white`
- **Scale**: `scale-110`
- **Ring**: `ring-2 ring-[#939BFB] ring-offset-2`

### Button States
- **Active**: Applied via `.active` class
- **Disabled**: Reduced opacity, pointer-events-none
- **Loading**: (to be defined)

### Scroll Behavior
- **Chat Messages**: Auto-scroll to bottom when new messages arrive
- **Scrollbar**: Hidden (`::-webkit-scrollbar { display: none; }`)

## 16. Responsive Layout Rules (React + Capacitor)

### Strategy Overview
One codebase for web, iOS (App Store), and Android (Google Play Store) using React + Capacitor. Mobile-first design that adapts to different screen sizes while maintaining consistency across platforms.

### Breakpoints

```javascript
const breakpoints = {
  mobile: '< 768px',      // Phones: full width
  tablet: '768px - 1023px', // Tablets: adaptive width
  desktop: '≥ 1024px'     // Desktop: centered 390px
}
```

### Desktop Resolution Rules
- **Target width**: 390px — all main content, header, and bottom nav use `max-w-[390px]`
- **Layout**: Centered with `mx-auto` (block) or `left-1/2 -translate-x-1/2` (fixed elements)
- **Header & bottom nav**: Must always match main screen width — use `max-w-[390px]` so they align visually
- **Fonts**: Same as mobile — no scaling; use DM Sans for body, Poppins for headings
- **No responsive font sizing** on desktop — apply same type scale across breakpoints

### Default Width
- **Target Width**: 390px (design target)
- **Mobile Devices (< 768px)**: Full width (`w-full`) - no max-width restriction
- **Tablets (768px - 1023px)**: Adaptive width (see tablet rules below)
- **Desktop (≥ 1024px)**: Fixed max-width (`max-w-[390px]`) and centered

### Layout Rules

1. **All content centered on desktop/tablet**
   - Use `mx-auto` for block elements
   - Use `left-1/2 -translate-x-1/2` for fixed/absolute positioning

2. **Horizontal overflow forbidden**
   - Apply `overflow-x-hidden` to body/html
   - Ensure all content fits within viewport width
   - No horizontal scrolling on any device

3. **Fixed header and bottom nav always visible**
   - Mobile: `fixed top-0 left-0 w-full` (full width)
   - Desktop/Tablet: `fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[390px]` (centered, max 390px)
   - Both use `z-50`

### Device Behavior

**Mobile Phones (< 768px)**:
- Container: `w-full` (full width, no max-width)
- Header: `fixed top-0 left-0 w-full`
- Bottom nav: `fixed bottom-0 left-0 w-full`
- Content expands to full screen width
- Works for both native apps (iOS/Android) and mobile web

**Tablets (768px - 1023px)**:

**Native Apps (Capacitor)**:
- Container: `max-w-[768px] mx-auto` (uses more space)
- Header: `fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[768px]`
- Bottom nav: `fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[768px]`
- Adaptive width to utilize tablet screen space better

**Web (Tablets)**:
- Container: `max-w-[390px] mx-auto` (mobile-like experience)
- Header: `fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[390px]`
- Bottom nav: `fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px]`
- Maintains focused, mobile-like experience

**Desktop (≥ 1024px)**:
- Container: `max-w-[390px] mx-auto` (block) or `max-w-[390px] left-1/2 -translate-x-1/2` (fixed)
- Header: `fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[390px]` (centered, not full width)
- Bottom nav: `fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px]` (centered, not full width)
- Content maintains 390px width, centered on screen
- Mobile-first focused experience (similar to Instagram, Twitter)

### Container Classes

**Mobile (< 768px)**:
- **App Shell**: `relative w-full min-h-screen bg-white`
- **Header**: `fixed top-0 left-0 w-full`
- **Bottom Nav**: `fixed bottom-0 left-0 w-full`
- **Chat Drawer**: `fixed bottom-16 left-0 w-full`
- **Chat Input Bar**: `fixed bottom-16 left-0 w-full`

**Tablet (768px - 1023px) - Native App**:
- **App Shell**: `relative mx-auto w-full max-w-[768px] min-h-screen bg-white`
- **Header**: `fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[768px]`
- **Bottom Nav**: `fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[768px]`
- **Chat Drawer**: `fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[768px]`
- **Chat Input Bar**: `fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[768px]`

**Tablet (768px - 1023px) - Web**:
- **App Shell**: `relative mx-auto w-full max-w-[390px] min-h-screen bg-white`
- **Header**: `fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[390px]`
- **Bottom Nav**: `fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px]`
- **Chat Drawer**: `fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[390px]`
- **Chat Input Bar**: `fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[390px]`

**Desktop (≥ 1024px)**:
- **App Shell**: `relative mx-auto w-full max-w-[390px] min-h-screen bg-white`
- **Header**: `fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[390px]`
- **Bottom Nav**: `fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px]`
- **Chat Drawer**: `fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[390px]`
- **Chat Input Bar**: `fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[390px]`

### CSS Media Query Implementation

```css
/* Mobile-first: Full width by default */
#app-shell {
    width: 100%;
}

header,
#bottom-nav,
#chat-drawer,
#chat-input-bar {
    width: 100%;
    left: 0;
}

/* Tablet: Adaptive width for native apps */
@media (min-width: 768px) and (max-width: 1023px) {
    /* Detect Capacitor and apply wider width */
    .capacitor-app #app-shell,
    .capacitor-app header,
    .capacitor-app #bottom-nav,
    .capacitor-app #chat-drawer,
    .capacitor-app #chat-input-bar {
        max-width: 768px;
        margin-left: auto;
        margin-right: auto;
        left: 50%;
        transform: translateX(-50%);
    }
    
    /* Web tablets: Keep mobile-like 390px */
    .web-app #app-shell,
    .web-app header,
    .web-app #bottom-nav,
    .web-app #chat-drawer,
    .web-app #chat-input-bar {
        max-width: 390px;
        margin-left: auto;
        margin-right: auto;
        left: 50%;
        transform: translateX(-50%);
    }
}

/* Desktop: Centered with max-width */
@media (min-width: 1024px) {
    #app-shell {
        max-width: 390px;
        margin-left: auto;
        margin-right: auto;
    }
    
    header,
    #bottom-nav,
    #chat-drawer,
    #chat-input-bar {
        max-width: 390px;
        left: 50%;
        transform: translateX(-50%);
    }
}
```

### React + Capacitor Implementation

```jsx
// Detect if running in Capacitor (native app)
import { Capacitor } from '@capacitor/core';

const isNative = Capacitor.isNativePlatform();
const width = window.innerWidth;
const isTablet = width >= 768 && width < 1024;
const isDesktop = width >= 1024;

// Dynamic container classes
const getContainerClass = () => {
  if (isDesktop) {
    return 'max-w-[390px] mx-auto';
  }
  if (isTablet && isNative) {
    return 'max-w-[768px] mx-auto';
  }
  if (isTablet && !isNative) {
    return 'max-w-[390px] mx-auto';
  }
  return 'w-full'; // Mobile phones
};

const getFixedPositionClass = () => {
  if (isDesktop) {
    return 'left-1/2 -translate-x-1/2 max-w-[390px]';
  }
  if (isTablet && isNative) {
    return 'left-1/2 -translate-x-1/2 max-w-[768px]';
  }
  if (isTablet && !isNative) {
    return 'left-1/2 -translate-x-1/2 max-w-[390px]';
  }
  return 'left-0 w-full'; // Mobile phones
};

// Usage in component
function AppShell() {
  return (
    <div className={`relative min-h-screen bg-white ${getContainerClass()}`}>
      <header className={`fixed top-0 ${getFixedPositionClass()} z-50`}>
        {/* Header content */}
      </header>
      {/* Rest of app */}
    </div>
  );
}
```

### Tailwind CSS Implementation (Recommended)

```jsx
// Using Tailwind's responsive classes
function AppShell() {
  const isNative = Capacitor.isNativePlatform();
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

  return (
    <div className={`
      relative w-full min-h-screen bg-white
      ${isTablet && isNative ? 'md:max-w-[768px] md:mx-auto' : 'md:max-w-[390px] md:mx-auto'}
    `}>
      <header className={`
        fixed top-0 w-full z-50
        ${isTablet && isNative 
          ? 'md:left-1/2 md:-translate-x-1/2 md:max-w-[768px]' 
          : 'md:left-1/2 md:-translate-x-1/2 md:max-w-[390px]'
        }
      `}>
        {/* Header content */}
      </header>
      {/* Rest of app */}
    </div>
  );
}
```

### Overflow Prevention

```css
/* Prevent horizontal overflow globally */
html, body {
    overflow-x: hidden;
    width: 100%;
    position: relative;
}

/* Ensure app shell doesn't overflow */
#app-shell,
.app-container {
    overflow-x: hidden;
    width: 100%;
}

/* Prevent horizontal scroll on all containers */
* {
    max-width: 100%;
    box-sizing: border-box;
}
```

### Platform Detection Helper

```javascript
// utils/platform.js
import { Capacitor } from '@capacitor/core';

export const PlatformUtils = {
  isNative: () => Capacitor.isNativePlatform(),
  
  isIOS: () => Capacitor.getPlatform() === 'ios',
  
  isAndroid: () => Capacitor.getPlatform() === 'android',
  
  isWeb: () => Capacitor.getPlatform() === 'web',
  
  isTablet: () => {
    const width = window.innerWidth;
    return width >= 768 && width < 1024;
  },
  
  isDesktop: () => window.innerWidth >= 1024,
  
  isMobile: () => window.innerWidth < 768,
  
  getMaxWidth: () => {
    const width = window.innerWidth;
    const isNative = Capacitor.isNativePlatform();
    
    if (width >= 1024) return '390px'; // Desktop
    if (width >= 768 && width < 1024 && isNative) return '768px'; // Tablet native
    if (width >= 768 && width < 1024 && !isNative) return '390px'; // Tablet web
    return '100%'; // Mobile
  }
};
```

## 17. Z-Index Scale

- **Base**: `z-0` (default)
- **Overlay**: `z-30` (chat input bar)
- **Overlay Background**: `z-40` (chat overlay)
- **Drawer/Modal**: `z-50` (chat drawer, header, bottom nav)
- **Tooltip**: (to be defined)

## 18. Accessibility

### Focus States
- **Outline**: `outline-none` (custom focus styles to be implemented)
- **Focus Visible**: Implement custom focus indicators that meet WCAG standards
- **Keyboard Navigation**: All interactive elements must be keyboard accessible
- **Focus Indicators**: Visible focus rings on all interactive elements (buttons, links, inputs)

### ARIA Labels
- **Voice Message**: `aria-label="Voice message from you"`
- **Play Button**: `aria-label="Play voice message from you"`
- **Button Roles**: Ensure all icon-only buttons have descriptive ARIA labels
- **Navigation**: Use `aria-label` for navigation elements (bottom nav items)
- **Form Inputs**: Associate labels with form inputs using `htmlFor` and `id` attributes

### Color Contrast
- **Text on primary background**: White on `#939BFB` (meets WCAG AA - ratio 4.8:1)
- **Text on gray backgrounds**: Black/gray-900 on gray-50 (meets WCAG AA)
- **Minimum contrast ratio**: 4.5:1 for normal text, 3:1 for large text (18px+)
- **Interactive elements**: Ensure sufficient contrast for all button states (default, hover, active, disabled)

### Touch Target Sizes
- **Minimum touch target**: 44px × 44px (Apple HIG) / 48px × 48px (Material Design)
- **Icon buttons**: 40px × 40px (acceptable, meets minimum requirements)
- **Bottom nav items**: Adequate spacing between items for easy tapping
- **Interactive spacing**: Minimum 8px gap between touch targets

### Screen Reader Support
- **Semantic HTML**: Use semantic HTML elements where possible (`<button>`, `<nav>`, `<header>`, `<main>`)
- **ARIA labels**: Icon-only buttons require descriptive ARIA labels
- **Alt text**: All images must have descriptive `alt` attributes
- **Heading hierarchy**: Proper heading hierarchy (h1 → h2 → h3) for document structure
- **Landmarks**: Use ARIA landmarks (`role="navigation"`, `role="main"`, etc.)

### Responsive Text
- **Text scaling**: Text scales appropriately on different screen sizes
- **Minimum font size**: 12px for body text (iOS minimum: 11px)
- **Readable text**: No text smaller than 11px
- **Dynamic Type**: Support system font size preferences (iOS Dynamic Type, Android font scaling)

### Motion & Animation
- **Reduced motion**: Respect `prefers-reduced-motion` media query
- **Animation control**: Provide option to disable animations for users with motion sensitivity
- **Animation duration**: Keep animations brief and purposeful (typically 200-300ms)
- **Auto-play**: Avoid auto-playing videos or animations

### Implementation Example

```css
/* Focus styles */
button:focus-visible,
a:focus-visible,
input:focus-visible {
    outline: 2px solid #939BFB;
    outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

```jsx
// ARIA label example
<button 
  className="icon-button"
  aria-label="Add item to wishlist"
  onClick={handleWishlistToggle}
>
  <svg>...</svg>
</button>

// Semantic HTML example
<nav role="navigation" aria-label="Main navigation">
  <button aria-label="Home">
    <svg>...</svg>
    <span className="sr-only">Home</span>
  </button>
</nav>
```

## 19. Component Patterns

### Share Icon (Tilted)
- Transform: `rotate(-35deg)` (Instagram-style paper plane)

### Size Selector
- Grid: `grid-cols-4 gap-2`
- Selected: `border-2 border-[#939BFB] bg-[#939BFB] text-white`
- Unselected: `border border-gray-200 text-gray-900`

### Contact List Items (Add Friend Flow)
- **Layout**: `flex items-center gap-2 p-2 bg-gray-50 rounded-xl`
- **Background**: `bg-gray-50`
- **Padding**: `p-2`
- **Border radius**: `rounded-xl`
- **Avatar**: `w-8 h-8 rounded-full` — dynamic display per contact:
  - **GoShopMe user with uploaded picture**: Show avatar image (`<img src="..." class="w-full h-full object-cover">`)
  - **GoShopMe user without picture**: Show initials in `bg-gray-200` circle (`text-gray-600 font-medium text-xs`)
  - **Non-GoShopMe user**: Show initials in `bg-gray-200` circle until they become GoShopMe users
- **Initials**: First letter of first name + first letter of last name (e.g. "JD" for John Doe); single word → first 2 chars
- **Action button**: GoShopMe user → `bg-[#939BFB] text-white px-2 py-1 rounded-full text-xs font-medium` ("Add"); non-GoShopMe → `bg-white text-[#939BFB] border border-[#939BFB] px-2 py-1 rounded-full text-xs font-medium` ("Invite")
- **Search**: Input with search icon (Heroicons), `bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 pl-10 text-sm`
- **Data shape**: `{ name, phone, goshopme: boolean, avatar?: string }` — call `window.loadAddFriendContacts(data)` or set `window.__addFriendContacts` before load
- **Consistency**: Same design on Home, Creator Collections, Creator Single Collection, Creator Picks, Orders, Shopping bag, etc.

## 20. Special Behaviors

### Chat Drawer Dragging
- Draggable via drag handle
- Height range: 10vh to 90vh during drag
- **Drag to close**: When user drags down and releases with height < 25vh, drawer collapses to 100% closed (`translate-y-full`)
- Close threshold: < 25vh triggers full close on release
- If released above threshold: snap to 35–90vh range
- User can close the drawer by: (1) tap on overlay, (2) **drag handle down past threshold** — both methods fully close the drawer
- **Mobile optimization** (see Section 7): `#drag-handle-zone` with min 44px touch target, `touch-action: none`, `touchcancel` handler, transitions disabled during drag for responsiveness

### Auto-growing Textarea (Chat Input)
- Use `<textarea>` (not `<input type="text">`) for chat input
- Starts at 1 row
- Grows with content; when text exceeds field width, expands to multiple rows
- Max 6 rows (~144px)
- Line height: 20px (or computed line-height)
- Apply to all screens where the chat drawer persists

### Text Message Behavior (Chat Input)
- **Enter key**: Sends message when pressed without Shift
- **Shift+Enter**: Inserts newline (textarea default)
- Apply to both collapsed input bar and drawer input on Home, Creator Picks, Creator Collections, etc.

### Auto-scroll on New Message
- When any new message is added (user, ShAI, image, video, voice, recording bubble, etc.), scroll `#chat-messages` to bottom: `chatMessages.scrollTop = chatMessages.scrollHeight`
- Ensures the latest content (including "Recording... swipe left to cancel") is visible

### Voice Recording (Microphone Button)
- **Hold to record**: `mousedown`/`touchstart` → start; `mouseup`/`touchend` → stop
- **Cancel**: `mouseleave` (mouse) or swipe left >30px (touch)
- **Visual feedback**: `scale-110`, `ring-2 ring-[#939BFB] ring-offset-2` on mic button
- **Temporary bubble**: "Recording... swipe left to cancel" (bg-[#939BFB])
- **Recording bubble**: waveform, play button, duration; `bg-[#939BFB]`, `rounded-full`
- Uses `MediaRecorder`, `getUserMedia`, `Blob`, `URL.createObjectURL`
- **ShAI reply**: After a voice message is sent, ShAI must reply within ~800ms with a contextual message (e.g. "Got your voice message! I'm on it — let me find the best options for you."). Use `addShAIMessage`, `addShaiReply`, `addContextualMessage`, or equivalent.
- Behavior consistent across Home screen and chat drawer

### Image/Video Upload (Camera Button)
- **Tap**: Opens native file picker via `<input type="file" accept="image/*,video/*">`
- User selects image or video from device (pictures, videos, folders via native app)
- Selected file shown in chat as image/video bubble; ShAI responds after upload

## 21. Grid Systems

### Product Grid (Similar Items)
- `grid grid-cols-2 gap-4`

### Size Options Grid
- `grid grid-cols-4 gap-2`

### Contact List
- Vertical stack with `space-y-2`

## 22. Image Handling

### ShAI Avatar (Chat Assistant)
- **Asset**: `assets/shai-avatar.png` — hardcoded path for ShAI (shopping assistant) avatar
- **Location**: Project root `assets/` folder
- **Sizes**: Header `w-8 h-8`; message bubbles `w-8 h-8` or `w-10 h-10`
- **Classes**: `rounded-full object-cover flex-shrink-0`
- **Attribute**: `data-shai-avatar` for dynamic updates
- **Fallback**: "AI" text in gray circle when image fails
- **Screens**: Home, Trending Now, Picks, Wishlist, Product details, Shopping bag, Orders, Notifications, Creator Collections, Creator Single Collection, ShopbyCategory, Return Details, Orders Empty State, Shopping bag empty state, Group chat

### Avatar Images
- Size: `w-8 h-8` or `w-10 h-10`
- Border radius: `rounded-full`
- Object fit: `object-cover`

### Product Images
- Gallery: `w-full h-full object-cover`
- Cards: `h-32 object-cover`
- Chat bubbles: `w-full h-auto`

## 23. Loading States

- (To be defined - skeletons, spinners, etc.)

## 24. Error States

- System bubbles: `bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs`
- Success notifications: `bg-green-50 text-green-700`

## 25. Empty States

- Text: `text-gray-500 text-sm`
- (More patterns to be defined)

## 26. Complete CSS Implementation

### Tailwind Configuration

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        'shine-primary': '#939BFB',
        'shine-accent': '#F96226'
      }
    }
  }
}
```

### Global Styles

```css
/* Hide scrollbar */
::-webkit-scrollbar { 
    display: none;
}

/* Global font family */
* { 
    font-family: 'DM Sans', 
                 'Karla',
                 -apple-system,
                 BlinkMacSystemFont,
                 'Segoe UI',
                 Roboto,
                 'Helvetica Neue',
                 Arial,
                 'Noto Sans',
                 sans-serif; 
}

/* DM Sans font class */
.dm-sans { 
    font-family: 'DM Sans', 
                 'Karla',
                 -apple-system,
                 BlinkMacSystemFont,
                 'Segoe UI',
                 Roboto,
                 'Helvetica Neue',
                 Arial,
                 'Noto Sans',
                 sans-serif; 
}

/* Poppins font class */
.poppins { 
    font-family: 'Poppins',
                 -apple-system,
                 BlinkMacSystemFont,
                 'Segoe UI',
                 Roboto,
                 'Helvetica Neue',
                 Arial,
                 sans-serif; 
}
```

### Icon Button Styles

```css
/* Icon styling */
.icon-button svg {
    width: 18px;
    height: 18px;
    stroke-width: 1.5;
}

.icon-button:hover svg {
    color: #939BFB;
}

.icon-button.white svg {
    color: #FFF;
}
```

### Bottom Navigation Styles

```css
/* Bottom nav styling */
.bottom-nav-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #6B7280;
    transition: color 0.2s ease-in-out;
}

.bottom-nav-btn:hover,
.bottom-nav-btn.active {
    color: #939BFB;
}

.bottom-nav-btn:hover svg,
.bottom-nav-btn:hover span,
.bottom-nav-btn.active svg,
.bottom-nav-btn.active span {
    color: #939BFB;
}

.bottom-nav-btn svg {
    width: 20px;
    height: 20px;
    stroke-width: 1.5;
    margin-bottom: 4px;
}
```

### Wishlist Heart Styles

```css
/* Wishlist heart filled state */
.heart-filled {
    fill: #939BFB !important;
    stroke: #939BFB !important;
}
```

### Voice Recording Styles

```css
/* Voice recording state */
.recording {
    background: #ef4444 !important;
    color: white !important;
}
```

### Chat Message Bubble Styles

```css
/* Chat message bubbles */
.voice-message-bubble {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    border-radius: 16px;
    max-width: 80%;
    min-width: 140px;
    max-width: 260px;
    width: fit-content;
}

.voice-message-outgoing {
    background: #939BFB;
    color: white;
    margin-left: auto;
}

.voice-message-incoming {
    background: #f3f4f6;
    color: #000;
}
```

### Product Bubble Styles

```css
.product-bubble {
    background: white;
    border: 1px solid #D1D5DB;
    border-radius: 16px;
    padding: 12px;
    max-width: 60%;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.product-bubble.outgoing {
    border-color: #939BFB;
    margin-left: auto;
}
```

### Share Icon Styles

```css
/* Share button - Instagram-style tilted paper plane */
.share-icon-tilted {
    transform: rotate(-35deg);
}
```

### Voice Waveform Animation

```css
/* Wave pulse animation for voice messages */
@keyframes wavePulse {
    0%, 100% { 
        transform: scaleY(0.5); 
    }
    50% { 
        transform: scaleY(1.0); 
    }
}

.wave-bar.playing {
    animation: wavePulse 1.1s ease-in-out infinite;
    animation-delay: calc(var(--i) * 0.08s);
}
```

### Google Fonts Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Karla:wght@400;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### External Dependencies

**Tailwind CSS**:
```html
<script src="https://cdn.tailwindcss.com"></script>
```

**Heroicons**:
```html
<script src="https://unpkg.com/heroicons@2.0.16/24/outline/index.js"></script>
```

## 27. Complete CSS File (Ready to Use)

Here's the complete CSS file that can be copied directly into your project:

```css
/* ============================================
   GoShopMe Design System - Complete CSS
   ============================================ */

/* Hide scrollbar */
::-webkit-scrollbar { 
    display: none;
}

/* Global font family */
* { 
    font-family: 'DM Sans', 
                 'Karla',
                 -apple-system,
                 BlinkMacSystemFont,
                 'Segoe UI',
                 Roboto,
                 'Helvetica Neue',
                 Arial,
                 'Noto Sans',
                 sans-serif; 
}

/* DM Sans font class */
.dm-sans { 
    font-family: 'DM Sans', 
                 'Karla',
                 -apple-system,
                 BlinkMacSystemFont,
                 'Segoe UI',
                 Roboto,
                 'Helvetica Neue',
                 Arial,
                 'Noto Sans',
                 sans-serif; 
}

/* Poppins font class */
.poppins { 
    font-family: 'Poppins',
                 -apple-system,
                 BlinkMacSystemFont,
                 'Segoe UI',
                 Roboto,
                 'Helvetica Neue',
                 Arial,
                 sans-serif; 
}

/* Icon styling */
.icon-button svg {
    width: 18px;
    height: 18px;
    stroke-width: 1.5;
}

.icon-button:hover svg {
    color: #939BFB;
}

.icon-button.white svg {
    color: #FFF;
}

/* Bottom nav styling */
.bottom-nav-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #6B7280;
    transition: color 0.2s ease-in-out;
}

.bottom-nav-btn:hover,
.bottom-nav-btn.active {
    color: #939BFB;
}

.bottom-nav-btn:hover svg,
.bottom-nav-btn:hover span,
.bottom-nav-btn.active svg,
.bottom-nav-btn.active span {
    color: #939BFB;
}

.bottom-nav-btn svg {
    width: 20px;
    height: 20px;
    stroke-width: 1.5;
    margin-bottom: 4px;
}

/* Wishlist heart filled state */
.heart-filled {
    fill: #939BFB !important;
    stroke: #939BFB !important;
}

/* Voice recording state */
.recording {
    background: #ef4444 !important;
    color: white !important;
}

/* Chat message bubbles */
.voice-message-bubble {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    border-radius: 16px;
    max-width: 80%;
    min-width: 140px;
    max-width: 260px;
    width: fit-content;
}

.voice-message-outgoing {
    background: #939BFB;
    color: white;
    margin-left: auto;
}

.voice-message-incoming {
    background: #f3f4f6;
    color: #000;
}

.product-bubble {
    background: white;
    border: 1px solid #D1D5DB;
    border-radius: 16px;
    padding: 12px;
    max-width: 60%;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.product-bubble.outgoing {
    border-color: #939BFB;
    margin-left: auto;
}

/* Share button - Instagram-style tilted paper plane */
.share-icon-tilted {
    transform: rotate(-35deg);
}

/* Wave pulse animation for voice messages */
@keyframes wavePulse {
    0%, 100% { 
        transform: scaleY(0.5); 
    }
    50% { 
        transform: scaleY(1.0); 
    }
}

.wave-bar.playing {
    animation: wavePulse 1.1s ease-in-out infinite;
    animation-delay: calc(var(--i) * 0.08s);
}
```

## 27a. Global Components – Script Checklist

When creating or amending screens, include these scripts as needed:

| Component | Script | When to use |
|-----------|--------|-------------|
| Header bell + bag + badges | `js/header-icons-badges.js` | All screens with header (use `#header-icons-slot` or own HTML with IDs) |
| Bottom navigation | `js/bottom-nav.js` | All main app screens (Home, Picks, Wishlist, Profile, Orders, etc.) |
| Back button (history.back) | `js/back-button.js` | Screens with header back button |
| Chat drawer | `js/chat-drawer.js` | Screens with ShAI chat |
| Chat drawer mobile drag | `css/chat-drawer-drag.css` | Screens with chat drawer |
| Global components CSS | `css/global-components.css` | Screens using header icons, bottom nav, badges |

**Back button**: Use `class="goshopme-back-btn"` and `data-fallback="URL"` — never hardcode `href` to a specific page; use `history.back()`.

## 28. HTML Head Setup

Complete HTML head setup for GoShopMe:

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'shine-primary': '#939BFB',
                        'shine-accent': '#F96226'
                    }
                }
            }
        }
    </script>
    
    <!-- Heroicons -->
    <script src="https://unpkg.com/heroicons@2.0.16/24/outline/index.js"></script>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Karla:wght@400;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Custom CSS -->
    <style>
        /* Include all CSS from section 27 above */
    </style>
</head>
```

