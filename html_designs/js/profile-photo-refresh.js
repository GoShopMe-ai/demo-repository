/**
 * Profile Photo Refresh - Ensures profile photos in nav stay in sync with localStorage.
 * Include on pages that show profile photos. Refreshes on load and when returning from bfcache.
 */
(function() {
    'use strict';
    function refreshAll() {
        var imgs = document.querySelectorAll('img[data-profile-avatar]');
        imgs.forEach(function(img) {
            var icon = img.previousElementSibling;
            if (!icon || !icon.classList) return;
            try {
                var saved = localStorage.getItem('profilePhoto');
                if (saved) {
                    img.src = saved;
                    img.classList.remove('hidden');
                    icon.classList.add('hidden');
                } else {
                    img.src = '';
                    img.classList.add('hidden');
                    icon.classList.remove('hidden');
                }
            } catch (e) {}
        });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', refreshAll);
    } else {
        refreshAll();
    }
    window.addEventListener('pageshow', function(e) {
        if (e.persisted) refreshAll();
    });
    window.refreshProfilePhotos = refreshAll;
})();
