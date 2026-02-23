/**
 * GoShopMe Group Chat - Global component for multi-user chat with ShAI
 * Max 3 participants (friends) can be added to a chat. When participants exist,
 * the chat drawer shows group header on all screens.
 *
 * Usage:
 *   1. Include before chat-drawer.js: <script src="js/group-chat.js"></script>
 *   2. chat-drawer.js will use this automatically when present
 *
 * API:
 *   GoShopMeGroupChat.getParticipants() -> [{id, name, avatar}, ...]
 *   GoShopMeGroupChat.addUser({id, name, avatar}) -> boolean (false if at max or duplicate)
 *   GoShopMeGroupChat.removeUser(id) -> void
 *   GoShopMeGroupChat.clear() -> void
 *   GoShopMeGroupChat.isAtMax() -> boolean
 */
(function() {
    'use strict';

    var STORAGE_KEY = '__groupChatParticipants';
    var MAX_PARTICIPANTS = 3;
    var DEFAULT_AVATAR = '../assets/shai-avatar.png';

    function load() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return [];
            var arr = JSON.parse(raw);
            return Array.isArray(arr) ? arr : [];
        } catch (e) {
            return [];
        }
    }

    function save(arr) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
        } catch (e) {}
    }

    function getParticipants() {
        return load();
    }

    function addUser(user) {
        if (!user || !user.id || !user.name) return false;
        var list = load();
        if (list.some(function(p) { return p.id === user.id; })) return false;
        if (list.length >= MAX_PARTICIPANTS) return false;
        list.push({
            id: String(user.id),
            name: String(user.name),
            avatar: user.avatar || ''
        });
        save(list);
        return true;
    }

    function removeUser(id) {
        var list = load().filter(function(p) { return p.id !== id; });
        save(list);
    }

    function clear() {
        save([]);
    }

    function isAtMax() {
        return load().length >= MAX_PARTICIPANTS;
    }

    function hasParticipants() {
        return load().length > 0;
    }

    window.GoShopMeGroupChat = {
        getParticipants: getParticipants,
        addUser: addUser,
        removeUser: removeUser,
        clear: clear,
        isAtMax: isAtMax,
        hasParticipants: hasParticipants,
        MAX_PARTICIPANTS: MAX_PARTICIPANTS
    };
})();
