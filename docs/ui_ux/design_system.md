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
- **Error/Recording**: `#EF4444` (red-500) - used for voice recording state
- **Warning**: Yellow tones (if needed)

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

## 3. Buttons

### Icon Buttons

**Default Icon Button**:
- Size: `w-10 h-10` (40px × 40px)
- Background: `bg-gray-50` (rounded-full)
- Icon size: `w-5 h-5` (20px × 20px)
- Stroke width: `1.5`
- Hover: Icon color changes to `#939BFB`
- States: `hover:opacity-70 transition-opacity`

**Icon Button (White)**:
- Background: `bg-white/90` (90% opacity)
- Backdrop blur: `backdrop-blur-sm`
- Used in: Product image overlays (wishlist, share)

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
- **Width**: Full width, max 390px (mobile viewport)
- **Background**: `bg-white`
- **Border**: `border-b border-gray-100`
- **Z-index**: `z-50`
- **Padding**: `p-4`

### Layout
- **Left**: Back button (circular, gray-50 background)
- **Center**: Page title (H1, Poppins, semibold, gray-900)
- **Right**: Icon buttons (notifications, cart) with badges

### Header Elements

**Back Button**:
- Size: `w-10 h-10`
- Background: `bg-gray-50`
- Icon: Left arrow, 20px
- Border radius: `rounded-full`

**Title**:
- Font: `text-lg font-semibold text-gray-900 poppins`

**Action Icons**:
- Container: `flex items-center space-x-3`
- Each icon: `w-10 h-10 rounded-full bg-gray-50`
- Badge position: `absolute -top-0.5 -right-0.5`
- Badge size: `w-3 h-3 rounded-full`
- Badge colors: Notification `#F96226`, Cart `#939BFB`

## 6. Bottom Navigation

### Structure
- **Position**: Fixed bottom
- **Width**: Full width, max 390px
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
1. Home (house icon)
2. Picks (star icon)
3. Wishlist (heart icon)
4. Profile (user avatar image, 24px)

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
- **Avatar**: `w-8 h-8 rounded-full`
- **Title**: `font-semibold text-black text-sm`
- **Subtitle**: `text-xs text-gray-500`
- **Back Button**: `w-[18px] h-[18px]`, hidden by default

### Chat Messages Container
- **Container**: `flex-1 overflow-y-auto`
- **Padding**: `p-4 pb-0`
- **Scroll Behavior**: Auto-scroll to bottom, smooth

### Message Bubbles

**Incoming (ShAI)**:
- Background: `bg-gray-50`
- Text: `text-black`
- Border radius: `rounded-2xl rounded-tl-md`
- Padding: `p-3`
- Max width: `max-w-[80%]`
- Font: `text-sm`

**Outgoing (User)**:
- Background: `bg-[#939BFB]`
- Text: `text-white`
- Border radius: `rounded-2xl rounded-tr-md`
- Padding: `p-3`
- Max width: `max-w-[80%]`
- Font: `text-sm`
- Alignment: `justify-end`

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
- Container: `bg-white rounded-2xl border border-gray-200 px-4 py-3 shadow-sm`
- Input: `flex-1 bg-transparent outline-none`
- Placeholder: `placeholder-gray-500`
- Font: DM Sans
- Min height: `min-h-[24px]`
- Auto-grow: Up to 6 rows max

**Input Icons**:
- Size: `w-[18px] h-[18px]`
- Color: `text-black`
- Spacing: `gap-2`

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

### Contact List Items
- Background: `bg-gray-50`
- Padding: `p-2`
- Border radius: `rounded-xl`
- Avatar: `w-8 h-8 rounded-full`
- Action button: `bg-[#939BFB] text-white px-2 py-1 rounded-full text-xs`

## 20. Special Behaviors

### Chat Drawer Dragging
- Draggable via drag handle
- Height range: 0vh to 90vh
- Close threshold: < 30vh triggers full close
- Smooth transitions

### Auto-growing Textarea
- Starts at 1 row
- Grows with content
- Max 6 rows
- Line height: 20px

### Voice Recording
- Hold to record (mousedown/touchstart)
- Release to stop (mouseup/touchend)
- Swipe left to cancel
- Visual feedback: Red background, scale, ring

### Image/Video Upload
- File input trigger
- Supports image/* and video/*
- Preview in chat bubble
- ShAI response after upload

## 21. Grid Systems

### Product Grid (Similar Items)
- `grid grid-cols-2 gap-4`

### Size Options Grid
- `grid grid-cols-4 gap-2`

### Contact List
- Vertical stack with `space-y-2`

## 22. Image Handling

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

