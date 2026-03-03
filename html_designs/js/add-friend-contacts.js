/**
 * Add Friend flow: contact list + search filter.
 * Intended logic: user opens Add Friend → request contacts permission → list shows device contacts.
 * - GoShopMe user: image, name, mobile, "Add" (adds to chat with ShAI).
 * - Non–GoShopMe user: initials, name, mobile, "Invite" (sends link: Join me on GoShopMe https://app.goshopme.ai/).
 * Demo: uses sample data. Live app: populate window.__addFriendContacts from device contacts (native plugin) after permission.
 * Android Chrome only: Contact Picker API adds "Add from device" to merge device contacts into the list.
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

    function isAndroidChrome() {
        var ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
        return /Android/i.test(ua) && /Chrome\/[.0-9]* Mobile/i.test(ua);
    }

    function isContactPickerSupported() {
        return typeof navigator !== 'undefined' && navigator.contacts && typeof navigator.contacts.select === 'function';
    }

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

    function openContactPicker() {
        if (!isAndroidChrome() || !isContactPickerSupported()) return;
        navigator.contacts.select(['name', 'tel'], { multiple: true }).then(function(contacts) {
            var list = Array.isArray(window.__addFriendContacts) ? window.__addFriendContacts.slice() : DEFAULT_CONTACTS.slice();
            var seen = {};
            list.forEach(function(c) { seen[digitsOnly(c.phone)] = true; });
            for (var i = 0; i < contacts.length; i++) {
                var c = contacts[i];
                var name = (c.name && c.name[0]) ? c.name[0] : '';
                var phone = (c.tel && c.tel[0]) ? c.tel[0] : '';
                if (!phone) continue;
                var key = digitsOnly(phone);
                if (key && !seen[key]) { seen[key] = true; list.push({ name: name || 'Unknown', phone: phone, goshopme: false }); }
            }
            window.__addFriendContacts = list;
            var container = document.getElementById('contacts-container');
            if (container) {
                renderAddFriendContacts(container);
                var searchEl = document.getElementById('contact-search');
                filterContacts(searchEl ? searchEl.value : '');
            }
        }).catch(function() {});
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

    function injectContactPickerButton() {
        if (!isAndroidChrome() || !isContactPickerSupported()) return;
        var container = document.getElementById('contacts-container');
        if (!container || !container.parentNode) return;
        if (document.getElementById('add-from-device-btn')) return;
        var btn = document.createElement('button');
        btn.id = 'add-from-device-btn';
        btn.type = 'button';
        btn.className = 'w-full py-2 px-3 rounded-xl border border-[#939BFB] text-[#939BFB] text-sm font-medium mb-2';
        btn.textContent = 'Add from device';
        btn.addEventListener('click', function(e) { e.preventDefault(); openContactPicker(); });
        container.parentNode.insertBefore(btn, container);
    }

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
        if (isAndroidChrome() && isContactPickerSupported()) {
            injectContactPickerButton();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
