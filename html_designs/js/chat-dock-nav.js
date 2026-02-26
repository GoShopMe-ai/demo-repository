/**
 * Chat Dock to Bottom Nav - sets --shai-nav-h so chat drawer/input bar dock directly above the nav.
 * Include on ALL screens that have a chat drawer.
 */
(function () {
  'use strict';
  function applyDock() {
    var nav = document.getElementById('bottom-navigation') || document.getElementById('bottom-nav') ||
              document.querySelector('nav[id$="-navigation"]') || document.querySelector('nav[id$="-nav"]');
    if (!nav) return;
    var h = nav.getBoundingClientRect().height;
    if (h > 0) document.documentElement.style.setProperty('--shai-nav-h', h + 'px');
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyDock);
  } else {
    applyDock();
  }
  if (window.ResizeObserver) {
    var nav = document.getElementById('bottom-navigation') || document.getElementById('bottom-nav');
    if (nav) {
      var ro = new ResizeObserver(applyDock);
      ro.observe(nav);
    }
  }
  window.addEventListener('load', applyDock);
  window.addEventListener('resize', applyDock);
  setTimeout(applyDock, 100);
  setTimeout(applyDock, 500);
  /* Re-apply after shai-chat injects (Receipt, etc.) */
  if (window.MutationObserver) {
    var mo = new MutationObserver(function() {
      if (document.getElementById('chat-drawer') || document.getElementById('chat-input-bar')) {
        applyDock();
      }
    });
    mo.observe(document.body, { childList: true, subtree: false });
  }
})();
