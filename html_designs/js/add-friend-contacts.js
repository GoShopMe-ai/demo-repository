/**
 * Add Friend flow: contact list + search filter.
 * Intended logic: user taps Add Friend → Add Friend screen → native app requests contacts permission → after grant, list shows device contacts.
 * - GoShopMe user: "Add" (adds to chat with ShAI).
 * - Non–GoShopMe user: "Invite" (share: Join me on GoShopMe https://app.goshopme.ai).
 * Demo/design: uses DEFAULT_CONTACTS so the screen is usable in browser. Live app: populate window.__addFriendContacts from device contacts after permission (native wrapper).
 * Include before home-chat.js on pages with #contacts-container and #contact-search.
 */
(function() {
    'use strict';

    var DEFAULT_CONTACTS = [
        { name: 'Alex Johnson', phone: '+1 (555) 123-4567', goshopme: true, avatar: 'https://raw.githubusercontent.com/nora-todorova/GoShopMe-assets/main/assets/avatars/avatar-2.jpg' },
        { name: 'Maria Rodriguez', phone: '+1 (555) 987-6543', goshopme: false },
        { name: 'David Kim', phone: '+1 (555) 456-7890', goshopme: true, avatar: 'https://raw.githubusercontent.com/nora-todorova/GoShopMe-assets/main/assets/avatars/avatar-3.jpg' },
        { name: 'Sarah Thompson', phone: '+1 (555) 234-5678', goshopme: false },
        { name: 'Emma Wilson', phone: '+1 (555) 345-6789', goshopme: true, avatar: 'https://raw.githubusercontent.com/nora-todorova/GoShopMe-assets/main/assets/avatars/avatar-5.jpg' },
        { name: 'Michael Brown', phone: '+1 (555) 678-9012', goshopme: false },
        { name: 'Jennifer Lee', phone: '+1 (555) 789-0123', goshopme: true, avatar: 'https://raw.githubusercontent.com/nora-todorova/GoShopMe-assets/main/assets/avatars/avatar-6.jpg' }
    ];

    function getInitials(name) {
        var p = (name || '').trim().split(/\s+/);
        return p.length >= 2 ? (p[0][0] + p[1][0]).toUpperCase() : (p[0] ? p[0].slice(0, 2) : '??').toUpperCase();
    }

    function renderAddFriendContacts(container) {
        if (!container) return;
        var list = Array.isArray(window.__addFriendContacts) && window.__addFriendContacts.length ? window.__addFriendContacts : DEFAULT_CONTACTS;
        container.innerHTML = list.map(function(c) {
            var initials = getInitials(c.name);
            var hasAvatar = c.goshopme && c.avatar;
            var avatarHtml = hasAvatar
                ? '<div class="w-8 h-8 rounded-full overflow-hidden flex-shrink-0"><img src="' + (c.avatar || '').replace(/"/g, '&quot;') + '" alt="" class="w-full h-full object-cover"></div>'
                : '<div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0"><span class="text-gray-600 font-medium text-xs">' + initials + '</span></div>';
            var btnHtml = c.goshopme
                ? '<button class="contact-action bg-[#939BFB] text-white px-2 py-1 rounded-full text-xs font-medium">Add</button>'
                : '<button class="contact-action bg-white text-[#939BFB] px-2 py-1 rounded-full text-xs font-medium border border-[#939BFB]">Invite</button>';
            return '<div class="contact-item flex items-center gap-2 p-2 bg-gray-50 rounded-xl" data-name="' + (c.name || '').replace(/"/g, '&quot;') + '" data-phone="' + (c.phone || '').replace(/"/g, '&quot;') + '" data-goshopme="' + (c.goshopme ? 'true' : 'false') + '">' + avatarHtml + '<div class="flex-1"><p class="font-medium text-sm text-black">' + (c.name || '').replace(/</g, '&lt;') + '</p><p class="text-xs text-gray-500">' + (c.phone || '').replace(/</g, '&lt;') + '</p></div>' + btnHtml + '</div>';
        }).join('');
    }

    function digitsOnly(str) { return (str || '').replace(/\D/g, ''); }

    function filterContacts(term) {
        var container = document.getElementById('contacts-container');
        if (!container) return;
        var items = container.querySelectorAll('.contact-item');
        var t = (term || '').trim().toLowerCase();
        var tDigits = digitsOnly(term || '');
        for (var i = 0; i < items.length; i++) {
            var el = items[i];
            var name = (el.getAttribute('data-name') || '').toLowerCase();
            var phone = (el.getAttribute('data-phone') || '');
            var phoneLower = phone.toLowerCase();
            var phoneDigits = digitsOnly(phone);
            var matchName = t.length > 0 && name.indexOf(t) !== -1;
            var matchPhone = t.length > 0 && (phoneLower.indexOf(t) !== -1 || (tDigits.length > 0 && phoneDigits.indexOf(tDigits) !== -1));
            el.style.setProperty('display', (matchName || matchPhone || t.length === 0) ? 'flex' : 'none', 'important');
        }
    }

    function getContactNamePhone(el) {
        var name = (el.getAttribute('data-name') || '').trim();
        var phone = (el.getAttribute('data-phone') || '').trim();
        if (!name || !phone) {
            var paras = el.querySelectorAll('.flex-1 p');
            if (paras.length >= 1) name = (name || (paras[0].textContent || '').trim()).trim();
            if (paras.length >= 2) phone = (phone || (paras[1].textContent || '').trim()).trim();
        }
        return { name: name, phone: phone };
    }

    function runSearchFromInput(searchInput) {
        if (!searchInput || typeof searchInput.value !== 'string') return;
        var term = (searchInput.value || '').trim();
        var addFriendPanel = searchInput.closest && searchInput.closest('#add-friend-content');
        var container = addFriendPanel ? addFriendPanel.querySelector('#contacts-container') : document.getElementById('contacts-container');
        if (!container) return;
        var items = container.querySelectorAll('.contact-item');
        var t = term.toLowerCase();
        var tDigits = digitsOnly(term);
        for (var i = 0; i < items.length; i++) {
            var el = items[i];
            var np = getContactNamePhone(el);
            var name = (np.name || '').toLowerCase();
            var phone = (np.phone || '');
            var phoneLower = phone.toLowerCase();
            var phoneDigits = digitsOnly(phone);
            var matchName = t.length > 0 && name.indexOf(t) !== -1;
            var matchPhone = t.length > 0 && (phoneLower.indexOf(t) !== -1 || (tDigits.length > 0 && phoneDigits.indexOf(tDigits) !== -1));
            el.style.setProperty('display', (matchName || matchPhone || t.length === 0) ? 'flex' : 'none', 'important');
        }
    }

    function isAddFriendSearchInput(el) {
        if (!el || el.nodeName !== 'INPUT') return false;
        if (el.id === 'contact-search') return true;
        var panel = el.closest && el.closest('#add-friend-content');
        return !!panel && panel.querySelector('input[id="contact-search"]') === el;
    }

    window.__renderAddFriendContacts = renderAddFriendContacts;
    window.__filterAddFriendContacts = function(term) {
        var container = document.getElementById('contacts-container');
        if (!container) return;
        var searchEl = document.getElementById('contact-search');
        if (searchEl && typeof term === 'undefined') term = searchEl.value;
        filterContacts(term);
    };
    window.__runSearchFromInput = runSearchFromInput;

    function onSearchInputOrKeyup(e) {
        if (e.target && isAddFriendSearchInput(e.target)) runSearchFromInput(e.target);
    }

    document.addEventListener('input', onSearchInputOrKeyup, true);
    document.addEventListener('keyup', onSearchInputOrKeyup, true);

    function init() {
        var contactsContainer = document.getElementById('contacts-container');
        if (!contactsContainer) return;
        if (!window.__addFriendContacts || !window.__addFriendContacts.length) {
            window.__addFriendContacts = DEFAULT_CONTACTS.slice();
        }
        renderAddFriendContacts(contactsContainer);
        var contactSearch = document.getElementById('contact-search');
        if (contactSearch) {
            contactSearch.placeholder = 'Search by name or mobile number';
            contactSearch.addEventListener('input', function() { runSearchFromInput(this); });
            contactSearch.addEventListener('keyup', function() { runSearchFromInput(this); });
            contactSearch.addEventListener('focus', function() { runSearchFromInput(this); });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
