/**
 * GoShopMe Back Button - Global Component
 *
 * Ensures header back button returns user to the previous screen.
 * Uses history.back() when history allows; falls back to data-fallback URL.
 *
 * Usage:
 *   1. Include: <script src="js/back-button.js"></script>
 *   2. For header back button, use one of:
 *      <a href="#" class="goshopme-back-btn" data-fallback="User_Profile_Free_Plan.html" aria-label="Back">...</a>
 *      <button class="goshopme-back-btn" data-fallback="Home.html" aria-label="Back">...</button>
 *
 * data-fallback: URL to navigate to when history.back() is not available (e.g. opened in new tab)
 */
(function() {
    'use strict';

    function goBack(e) {
        if (e) e.preventDefault();
        var el = e && e.target ? e.target.closest('.goshopme-back-btn') : null;
        var fallback = el ? (el.getAttribute('data-fallback') || '') : '';
        if (window.history.length > 1) {
            window.history.back();
        } else if (fallback) {
            window.location.href = fallback;
        }
        return false;
    }

    function init() {
        document.querySelectorAll('.goshopme-back-btn').forEach(function(btn) {
            btn.removeEventListener('click', goBack);
            btn.addEventListener('click', goBack);
        });
    }

    document.addEventListener('DOMContentLoaded', init);

    window.GoShopMeBack = {
        goBack: goBack
    };
})();
