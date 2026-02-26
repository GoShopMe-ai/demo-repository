/**
 * GoShopMe Header Icons & Badges - Global Component
 *
 * Manages bell (notifications) and shopping bag icons with badge counts.
 * Persists counts in localStorage: goshopme_notif_count, goshopme_cart_count
 *
 * Usage:
 *   1. Include: <script src="js/header-icons-badges.js"></script>
 *   2. Option A: Add HTML placeholder - <div id="header-icons-slot"></div>
 *      Script will inject bell + bag icons when slot exists.
 *   3. Option B: Use your own HTML with IDs: #notif-indicator, #notif-count,
 *      #cart-indicator, #cart-count, #notif-btn, #cart-btn
 *      Script will sync badges and optionally append ?from=<screenId> to links.
 *
 * API:
 *   window.GoShopMeHeaderIcons.updateCartBadge(count)
 *   window.GoShopMeHeaderIcons.updateNotifBadge(count)
 *   window.GoShopMeHeaderIcons.getCartCount()
 *   window.GoShopMeHeaderIcons.getNotifCount()
 *   window.GoShopMeHeaderIcons.addToCart()      // increment cart
 *   window.GoShopMeHeaderIcons.addToNotifications()  // increment notif
 */
(function() {
    'use strict';

    var BADGE_KEYS = { notif: 'goshopme_notif_count', cart: 'goshopme_cart_count' };
    var cartCountValue = 0;
    var notifCountValue = 0;

    function getScreenId() {
        var path = window.location.pathname || '';
        var base = path.split('/').pop() || path;
        return (base || 'unknown').replace(/\.html$/, '');
    }

    function getBadgeElements() {
        return {
            cartIndicator: document.getElementById('cart-indicator'),
            cartCount: document.getElementById('cart-count'),
            notifIndicator: document.getElementById('notif-indicator'),
            notifCount: document.getElementById('notif-count'),
            notifBtn: document.getElementById('notif-btn'),
            cartBtn: document.getElementById('cart-btn')
        };
    }

    function updateCartBadge() {
        var el = getBadgeElements();
        if (!el.cartIndicator || !el.cartCount) return;
        var show = cartCountValue > 0;
        el.cartIndicator.classList.toggle('hidden', !show);
        el.cartIndicator.classList.toggle('flex', show);
        el.cartCount.textContent = show ? (cartCountValue > 99 ? '99+' : String(cartCountValue)) : '';
        try {
            localStorage.setItem(BADGE_KEYS.cart, String(cartCountValue));
            localStorage.setItem('__cartCount', String(cartCountValue));
        } catch (e) {}
    }

    function updateNotifBadge() {
        var el = getBadgeElements();
        if (!el.notifIndicator || !el.notifCount) return;
        var show = notifCountValue > 0;
        el.notifIndicator.classList.toggle('hidden', !show);
        el.notifIndicator.classList.toggle('flex', show);
        el.notifCount.textContent = show ? (notifCountValue > 99 ? '99+' : String(notifCountValue)) : '';
        try {
            localStorage.setItem(BADGE_KEYS.notif, String(notifCountValue));
        } catch (e) {}
    }

    function injectIntoSlot() {
        var slot = document.getElementById('header-icons-slot');
        if (!slot || slot.children.length > 0) return;

        var from = getScreenId();
        var notifHref = 'Notifications_Screen.html?from=' + encodeURIComponent(from);
        var cartHref = 'Shopping_bag.html?from=' + encodeURIComponent(from);

        slot.innerHTML =
            '<a href="' + notifHref + '" id="notif-btn" class="header-icon-btn w-10 h-10 flex items-center justify-center relative overflow-visible text-gray-600 hover:text-gray-800" aria-label="Notifications">' +
            '<svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">' +
            '<path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>' +
            '</svg>' +
            '<div id="notif-indicator" class="absolute -top-0.5 -right-0.5 min-w-[18px] min-h-[18px] px-1 bg-[#F96226] rounded-full hidden items-center justify-center flex">' +
            '<span id="notif-count" class="text-[10px] text-white font-medium leading-none whitespace-nowrap"></span></div></a>' +
            '<a href="' + cartHref + '" id="cart-btn" class="header-icon-btn w-10 h-10 flex items-center justify-center relative overflow-visible text-gray-600 hover:text-gray-800" aria-label="Shopping bag">' +
            '<svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">' +
            '<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119.993z"/>' +
            '</svg>' +
            '<div id="cart-indicator" class="absolute -top-0.5 -right-0.5 min-w-[18px] min-h-[18px] px-1 bg-[#939BFB] rounded-full hidden items-center justify-center flex">' +
            '<span id="cart-count" class="text-[10px] text-white font-medium leading-none whitespace-nowrap"></span></div></a>';

        slot.classList.add('flex', 'items-center', 'gap-0');
        updateCartBadge();
        updateNotifBadge();
    }

    function ensureLinkParams() {
        var el = getBadgeElements();
        var from = getScreenId();
        var base = window.location.href;
        if (el.notifBtn && el.notifBtn.href && el.notifBtn.href.indexOf('?from=') === -1) {
            try {
                var u = new URL(el.notifBtn.href, base);
                u.searchParams.set('from', from);
                el.notifBtn.href = u.toString();
            } catch (e) {}
        }
        if (el.cartBtn && el.cartBtn.href && el.cartBtn.href.indexOf('?from=') === -1) {
            try {
                var u2 = new URL(el.cartBtn.href, base);
                u2.searchParams.set('from', from);
                el.cartBtn.href = u2.toString();
            } catch (e) {}
        }
    }

    function init() {
        try {
            notifCountValue = parseInt(localStorage.getItem(BADGE_KEYS.notif) || '0', 10);
            cartCountValue = parseInt(localStorage.getItem(BADGE_KEYS.cart) || '0', 10);
        } catch (e) {}
        injectIntoSlot();
        ensureLinkParams();
        updateCartBadge();
        updateNotifBadge();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.GoShopMeHeaderIcons = {
        updateCartBadge: function(count) {
            if (typeof count === 'number') cartCountValue = Math.max(0, count);
            updateCartBadge();
        },
        updateNotifBadge: function(count) {
            if (typeof count === 'number') notifCountValue = Math.max(0, count);
            updateNotifBadge();
        },
        getCartCount: function() { return cartCountValue; },
        getNotifCount: function() { return notifCountValue; },
        addToCart: function() {
            cartCountValue++;
            updateCartBadge();
        },
        addToNotifications: function() {
            notifCountValue++;
            updateNotifBadge();
        }
    };
})();
