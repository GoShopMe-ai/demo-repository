/**
 * GoShopMe Bottom Navigation - Global Component
 *
 * Injects the standard bottom nav: Home, Picks, Wishlist, Profile
 * Use on all app screens that need main navigation.
 *
 * Usage:
 *   1. Include: <script src="js/bottom-nav.js"></script>
 *   2. Call: GoShopMeBottomNav.init({ insertBefore: 'element-id', currentPage: 'home' });
 *      - insertBefore: ID of element to insert nav before (e.g. 'bottom-nav-placeholder').
 *        If null/omit, nav is appended to body.
 *      - currentPage: 'home'|'picks'|'wishlist'|'profile' - adds .active class
 *      - profileHref: Override profile link (default: User_Profile_Free_Plan.html or Paid based on __userPlan)
 *
 * Required CSS (from design system):
 *   .bottom-nav-btn { display: flex; flex-direction: column; align-items: center; color: #6B7280; ... }
 *   .bottom-nav-btn.active { color: #939BFB; }
 */
(function() {
    'use strict';

    var NAV_ID = 'bottom-navigation';
    var currentPage = '';

    function getProfileHref() {
        var override = window.__profilePageUrl || (typeof GoShopMeBottomNav !== 'undefined' && GoShopMeBottomNav._profileHref);
        if (override) return override;
        try {
            var plan = (localStorage.getItem('__userPlan') || '').toLowerCase();
            return (plan === 'paid' || plan === 'true') ? 'User_Profile_Paid_Plan.html' : 'User_Profile_Free_Plan.html';
        } catch (e) {
            return 'User_Profile_Free_Plan.html';
        }
    }

    function buildNavHTML(active) {
        var profileHref = getProfileHref();
        var homeActive = active === 'home' ? ' active' : '';
        var picksActive = active === 'picks' ? ' active' : '';
        var wishlistActive = active === 'wishlist' ? ' active' : '';
        var profileActive = active === 'profile' ? ' active' : '';

        return '<nav id="' + NAV_ID + '" class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-gray-100 z-50">' +
            '<div class="flex items-center justify-around py-2">' +
            '<a href="Home.html" class="bottom-nav-btn flex flex-col items-center min-w-[60px] p-2' + homeActive + '">' +
            '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" class="w-5 h-5 mb-1"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/></svg>' +
            '<span class="text-xs">Home</span></a>' +
            '<a href="Picks.html" class="bottom-nav-btn flex flex-col items-center min-w-[60px] p-2' + picksActive + '">' +
            '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" class="w-5 h-5 mb-1"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/></svg>' +
            '<span class="text-xs">Picks</span></a>' +
            '<a href="Wishlist.html" class="bottom-nav-btn flex flex-col items-center min-w-[60px] p-2' + wishlistActive + '">' +
            '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" class="w-5 h-5 mb-1"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>' +
            '<span class="text-xs">Wishlist</span></a>' +
            '<a id="bottom-nav-profile-link" href="' + profileHref + '" class="bottom-nav-btn flex flex-col items-center min-w-[60px] p-2' + profileActive + '">' +
            '<span id="bottom-nav-profile-icon" class="flex items-center justify-center w-6 h-6 mb-1"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg></span>' +
            '<img id="bottom-nav-profile-photo" class="w-6 h-6 rounded-full object-cover mb-1 hidden" src="" alt="Profile">' +
            '<span class="text-xs">Profile</span></a>' +
            '</div></nav>';
    }

    function initProfilePhoto() {
        var img = document.getElementById('bottom-nav-profile-photo');
        var icon = document.getElementById('bottom-nav-profile-icon');
        if (!img || !icon) return;
        try {
            var saved = localStorage.getItem('profilePhoto');
            if (saved) {
                img.src = saved;
                img.classList.remove('hidden');
                icon.classList.add('hidden');
            } else {
                img.classList.add('hidden');
                icon.classList.remove('hidden');
            }
        } catch (e) {}
    }

    function init(options) {
        options = options || {};
        currentPage = (options.currentPage || '').toLowerCase();
        if (options.profileHref) {
            window.GoShopMeBottomNav._profileHref = options.profileHref;
        }

        var existing = document.getElementById(NAV_ID);
        if (existing) existing.remove();

        var html = buildNavHTML(currentPage);
        var temp = document.createElement('div');
        temp.innerHTML = html;
        var nav = temp.firstChild;

        var insertBefore = options.insertBefore ? document.getElementById(options.insertBefore) : null;
        if (insertBefore && insertBefore.parentNode) {
            insertBefore.parentNode.insertBefore(nav, insertBefore);
        } else {
            document.body.appendChild(nav);
        }

        initProfilePhoto();
    }

    function refreshProfilePhoto() {
        initProfilePhoto();
    }

    document.addEventListener('DOMContentLoaded', function() {
        if (window.__bottomNavInit) {
            init(window.__bottomNavInit);
        }
    });

    window.GoShopMeBottomNav = {
        init: init,
        refreshProfilePhoto: refreshProfilePhoto,
        _profileHref: null
    };
})();
