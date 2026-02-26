/**
 * GoShopMe Shared Chat Drawer Component
 * Based on Home.html implementation. Use on any page that needs the ShAI chat drawer.
 * 
 * Usage:
 *   1. Include: <script src="js/group-chat.js"></script> (optional, for group chat)
 *   2. Include: <script src="js/chat-drawer.js"></script>
 *   3. Call: GoShopMeChatDrawer.init({ openByDefault: false, insertBefore: 'bottom-navigation' });
 *   4. Use: GoShopMeChatDrawer.expandDrawer(), GoShopMeChatDrawer.addContextualMessage(msg, thumbUrls)
 */
(function() {
    'use strict';

    var DEFAULT_AVATAR = '../assets/shai-avatar.png';

    var CHAT_DRAWER_HTML = 
        '<div id="chat-drawer" class="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white rounded-t-3xl shadow-2xl z-50 h-[50vh] transform translate-y-full transition-transform duration-300 flex flex-col border-t border-gray-100" style="-webkit-overflow-scrolling:touch;overscroll-behavior:contain">' +
        '  <div id="drag-handle-zone" class="chat-drawer-drag-zone flex justify-center pt-2 flex-shrink-0 min-h-[44px] items-center" style="touch-action:none;-webkit-tap-highlight-color:transparent;-webkit-user-select:none;user-select:none"><div id="drag-handle" class="w-10 h-1 bg-gray-300 rounded-full cursor-grab pointer-events-none" role="button" aria-label="Drag to resize"></div></div>' +
        '  <div id="chat-header" class="flex items-center p-4 pb-2 flex-shrink-0">' +
        '    <button id="back-btn" class="mr-3 hidden hover:opacity-70 transition-opacity"><svg class="w-[18px] h-[18px] text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/></svg></button>' +
        '    <div class="w-8 h-8 rounded-full overflow-hidden mr-3 flex-shrink-0"><img class="w-full h-full object-cover" src="' + DEFAULT_AVATAR + '" alt="ShAI avatar" data-shai-avatar /></div>' +
        '    <div class="flex-1"><p class="font-semibold text-black text-sm" id="header-title">ShAI</p><p class="text-xs text-gray-500" id="header-subtitle">Your shopping assistant</p></div>' +
        '  </div>' +
        '  <div id="chat-content" class="flex-1 flex flex-col min-h-0">' +
        '    <div id="chat-messages" class="flex-1 overflow-y-auto" style="-webkit-overflow-scrolling:touch;overscroll-behavior:contain"><div class="p-4 pb-0">' +
        '      <div class="flex items-start space-x-3 mb-4">' +
        '        <div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"><img class="w-full h-full object-cover" src="' + DEFAULT_AVATAR + '" alt="ShAI" data-shai-avatar /></div>' +
        '        <div class="flex-1"><div class="bg-gray-50 rounded-2xl rounded-tl-md p-3 mb-3"><p class="text-sm text-black break-words whitespace-pre-wrap">Hi! I\'m ShAI, your shopping assistant. How can I help you?</p></div>' +
        '        <div id="smart-prompts" class="flex flex-wrap gap-2 pb-2"><button class="smart-prompt-btn bg-white border border-[#B7C7FF] text-[#939BFB] px-3 py-1.5 rounded-full text-xs font-medium hover:bg-[#939BFB] hover:text-white transition-colors">Find similar styles</button><button class="smart-prompt-btn bg-white border border-[#B7C7FF] text-[#939BFB] px-3 py-1.5 rounded-full text-xs font-medium hover:bg-[#939BFB] hover:text-white transition-colors">Create an outfit</button><button class="smart-prompt-btn bg-white border border-[#B7C7FF] text-[#939BFB] px-3 py-1.5 rounded-full text-xs font-medium hover:bg-[#939BFB] hover:text-white transition-colors">Show alternatives</button></div></div></div>' +
        '    </div></div>' +
        '    <div id="chat-input-drawer" class="bg-white border-t border-gray-100 p-4 flex-shrink-0">' +
        '      <div class="flex items-center gap-2 bg-white rounded-2xl border border-gray-200 px-4 py-3 shadow-sm">' +
        '        <button id="cam-btn-drawer" class="icon-button hover:opacity-70 transition-opacity" aria-label="Add image or video"><svg class="w-[18px] h-[18px] text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"/></svg></button>' +
        '        <textarea id="message-input" placeholder="Message ShAI..." class="flex-1 bg-transparent outline-none text-black placeholder-gray-500 dm-sans resize-none min-h-[24px] max-h-[144px] overflow-y-auto" rows="1"></textarea>' +
        '        <button id="add-friend-btn" class="icon-button hover:opacity-70 transition-opacity"><svg class="w-[18px] h-[18px] text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"/></svg></button>' +
        '        <button id="mic-btn" class="icon-button hover:opacity-70 transition-opacity" aria-label="Record voice"><svg class="w-[18px] h-[18px] text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"/></svg></button>' +
        '        <button id="send-btn" class="text-[#939BFB] hidden hover:opacity-70 transition-opacity"><svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/></svg></button>' +
        '      </div></div>' +
        '  </div>' +
        '  <div id="add-friend-content" class="flex-1 flex flex-col min-h-0 hidden">' +
        '    <div class="flex-1 overflow-y-auto p-4">' +
        '      <div class="mb-4"><div class="relative"><svg class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg><input type="text" id="contact-search" placeholder="Search contacts..." class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 pl-10 text-sm"></div></div>' +
        '      <div id="contacts-container" class="space-y-2"></div>' +
        '    </div>' +
        '  </div>' +
        '</div>' +
        '<div id="chat-input-bar" class="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-gray-100 p-4 z-[55]">' +
        '  <div class="flex items-center gap-2 bg-white rounded-2xl border border-gray-200 px-4 py-3 shadow-sm">' +
        '    <button id="cam-btn" class="icon-button hover:opacity-70 transition-opacity" aria-label="Add image or video"><svg class="w-[18px] h-[18px] text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"/></svg></button>' +
        '    <textarea id="chat-input-bar-field" placeholder="Message ShAI..." class="flex-1 bg-transparent outline-none text-black placeholder-gray-500 dm-sans resize-none min-h-[24px] max-h-[144px] overflow-y-auto" rows="1"></textarea>' +
        '    <button id="add-friend-btn-bar" class="icon-button hover:opacity-70 transition-opacity"><svg class="w-[18px] h-[18px] text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"/></svg></button>' +
        '    <button id="mic-btn-bar" class="icon-button hover:opacity-70 transition-opacity" aria-label="Record voice"><svg class="w-[18px] h-[18px] text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"/></svg></button>' +
        '    <button id="send-btn-bar" class="text-[#939BFB] hidden hover:opacity-70 transition-opacity"><svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/></svg></button>' +
        '  </div></div>';

    var chatDrawer, chatInputBar, dragHandle, chatMessages;
    var chatContent, addFriendContent, backBtn, contactsContainer, contactSearch;
    var isDrawerExpanded = false;
    var isAddFriendMode = false;
    var currentHeight = 50;
    var isDragging = false;
    var startY = 0;
    var isRecording = false, mediaRecorder, audioChunks = [], startX = 0, micAccessDenied = false, mediaStream = null;

    function scrollToBottom() {
        if (chatMessages) {
            requestAnimationFrame(function() { chatMessages.scrollTop = chatMessages.scrollHeight; });
        }
    }

    function expandDrawer() {
        if (!chatDrawer) return;
        chatDrawer.classList.remove('translate-y-full');
        if (chatInputBar) chatInputBar.classList.add('hidden');
        isDrawerExpanded = true;
        chatDrawer.style.height = '50vh';
    }

    function collapseDrawer() {
        if (!chatDrawer) return;
        chatDrawer.classList.add('translate-y-full');
        if (chatInputBar) chatInputBar.classList.remove('hidden');
        isDrawerExpanded = false;
        if (isAddFriendMode) showMainView();
    }

    function addContextualMessage(message, thumbUrls) {
        var container = document.querySelector('#chat-messages .p-4');
        if (!container) return;
        var avatarUrl = (typeof window.__shaiAvatarUrl !== 'undefined' ? window.__shaiAvatarUrl : null) || DEFAULT_AVATAR;
        var thumbHtml = (thumbUrls && thumbUrls.length) ? '<div class="flex gap-1.5 mt-2 flex-wrap">' + thumbUrls.slice(0, 4).map(function(t) { return '<img class="w-12 h-12 rounded-lg object-cover border border-gray-200" src="' + (t || '').replace(/"/g, '&quot;') + '" alt="">'; }).join('') + '</div>' : '';
        var msg = document.createElement('div');
        msg.className = 'flex items-start space-x-3 mb-4';
        msg.innerHTML = '<div class="w-8 h-8 rounded-full overflow-hidden flex-shrink-0"><img class="w-full h-full object-cover" src="' + avatarUrl.replace(/"/g, '&quot;') + '" alt="ShAI" data-shai-avatar /></div><div class="bg-gray-50 rounded-2xl rounded-tl-md p-3 max-w-[80%]"><p class="text-sm text-black break-words whitespace-pre-wrap">' + String(message || '').replace(/</g, '&lt;') + '</p>' + thumbHtml + '</div>';
        container.appendChild(msg);
        scrollToBottom();
    }

    function sendFromInput(inputEl, micEl, addEl, sendEl) {
        var text = (inputEl && inputEl.value || '').trim();
        if (!text) return;
        var container = document.querySelector('#chat-messages .p-4');
        if (container) {
            var wrap = document.createElement('div');
            wrap.className = 'flex justify-end mb-4';
            wrap.innerHTML = '<div class="bg-[#939BFB] text-white rounded-2xl rounded-tr-md p-3 max-w-[80%]"><p class="text-sm break-words whitespace-pre-wrap"></p></div>';
            wrap.querySelector('p').textContent = text;
            container.appendChild(wrap);
        }
        if (inputEl) { inputEl.value = ''; autoGrowTextarea(inputEl); }
        if (micEl) micEl.classList.remove('hidden');
        if (addEl) addEl.classList.remove('hidden');
        if (sendEl) sendEl.classList.add('hidden');
        scrollToBottom();
        setTimeout(function() { addContextualMessage("Let me help you find what you're looking for!"); }, 800);
    }

    function updateInputState(inputEl, micEl, addEl, sendEl) {
        var has = (inputEl && inputEl.value || '').trim().length > 0;
        if (micEl) micEl.classList.toggle('hidden', has);
        if (addEl) addEl.classList.toggle('hidden', has);
        if (sendEl) sendEl.classList.toggle('hidden', !has);
    }

    function handleCameraAccess() {
        var input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*,video/*';
        input.onchange = function(e) {
            var file = e.target.files && e.target.files[0];
            if (file) {
                var url = URL.createObjectURL(file);
                var container = document.querySelector('#chat-messages .p-4');
                if (container) {
                    var bubble = document.createElement('div');
                    bubble.className = 'flex justify-end mb-4';
                    var isVideo = (file.type || '').indexOf('video') === 0;
                    if (isVideo) {
                        bubble.innerHTML = '<div class="rounded-2xl border border-[#939BFB] max-w-[60%] overflow-hidden shadow-sm"><video src="' + url + '" controls class="w-full h-auto"></video></div>';
                    } else {
                        bubble.innerHTML = '<div class="rounded-2xl border border-[#939BFB] max-w-[60%] overflow-hidden shadow-sm"><img src="' + url + '" class="w-full h-auto" alt="Uploaded" /></div>';
                    }
                    container.appendChild(bubble);
                    scrollToBottom();
                    setTimeout(function() {
                        addContextualMessage(isVideo ? "Great! I can analyze your video. Let me find products that match what I see." : "Perfect! I can see your image. Let me find similar products for you.");
                    }, 1500);
                }
                input.value = '';
            }
        };
        input.click();
    }

    function autoGrowTextarea(ta) {
        if (!ta) return;
        ta.style.height = 'auto';
        ta.style.height = Math.min(ta.scrollHeight, 144) + 'px';
    }

    function showAddFriendView() {
        isAddFriendMode = true;
        if (chatContent) chatContent.classList.add('hidden');
        if (addFriendContent) addFriendContent.classList.remove('hidden');
        if (backBtn) backBtn.classList.remove('hidden');
        if (!isDrawerExpanded) expandDrawer();
    }
    function showMainView() {
        isAddFriendMode = false;
        if (addFriendContent) addFriendContent.classList.add('hidden');
        if (chatContent) chatContent.classList.remove('hidden');
        if (backBtn) backBtn.classList.add('hidden');
    }
    function addChatNotification(message) {
        var container = document.querySelector('#chat-messages .p-4');
        if (!container) return;
        var n = document.createElement('div');
        n.className = 'flex justify-center mb-4';
        n.innerHTML = '<div class="bg-green-100 text-green-800 px-4 py-2 rounded-full text-xs font-medium">' + String(message || '').replace(/</g, '&lt;') + '</div>';
        container.appendChild(n);
        scrollToBottom();
    }

    function applyGroupHeader() {
        var header = document.getElementById('chat-header');
        if (!header) return;
        var gc = window.GoShopMeGroupChat;
        if (!gc || !gc.hasParticipants()) {
            header.innerHTML = '<button id="back-btn" class="mr-3 hidden hover:opacity-70 transition-opacity"><svg class="w-[18px] h-[18px] text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/></svg></button><div class="w-8 h-8 rounded-full overflow-hidden mr-3 flex-shrink-0"><img class="w-full h-full object-cover" src="' + DEFAULT_AVATAR + '" alt="ShAI avatar" data-shai-avatar /></div><div class="flex-1"><p class="font-semibold text-black text-sm" id="header-title">ShAI</p><p class="text-xs text-gray-500" id="header-subtitle">Your shopping assistant</p></div>';
            backBtn = document.getElementById('back-btn');
            if (backBtn) backBtn.addEventListener('click', showMainView);
            return;
        }
        var participants = gc.getParticipants();
        var shaiAvatar = (typeof window.__shaiAvatarUrl !== 'undefined' ? window.__shaiAvatarUrl : null) || DEFAULT_AVATAR;
        var userAvatar = '';
        try { userAvatar = localStorage.getItem('profilePhoto') || ''; } catch (e) {}
        var avatarHtml = '<div class="flex -space-x-2 mr-3">';
        avatarHtml += '<img src="' + (userAvatar || 'https://raw.githubusercontent.com/nora-todorova/GoShopMe-assets/main/assets/avatars/avatar-5.jpg') + '" alt="You" class="w-8 h-8 rounded-full border-2 border-white object-cover" onerror="this.src=\'https://raw.githubusercontent.com/nora-todorova/GoShopMe-assets/main/assets/avatars/avatar-5.jpg\'">';
        participants.forEach(function(p) {
            var av = (p.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent((p.name || 'U').split(' ')[0]) + '&background=939BFB&color=fff').replace(/"/g, '&quot;');
            avatarHtml += '<img src="' + av + '" alt="' + (p.name || '').replace(/"/g, '&quot;') + '" class="w-8 h-8 rounded-full border-2 border-white object-cover">';
        });
        avatarHtml += '<div class="w-8 h-8 rounded-full border-2 border-white overflow-hidden"><img src="' + shaiAvatar.replace(/"/g, '&quot;') + '" alt="ShAI" class="w-full h-full object-cover" data-shai-avatar></div></div>';
        var names = ['You'].concat(participants.map(function(p) { return p.name; })).concat(['ShAI']);
        var title = names.length > 2 ? names.slice(0, -1).join(', ') + ' & ' + names[names.length - 1] : names.join(' & ');
        header.innerHTML = '<button id="back-btn" class="mr-3 hidden hover:opacity-70 transition-opacity"><svg class="w-[18px] h-[18px] text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/></svg></button>' + avatarHtml + '<div class="flex-1 min-w-0"><p class="text-sm font-semibold text-gray-900 poppins truncate" id="header-title">' + (title || '').replace(/</g, '&lt;') + '</p><p class="text-xs text-gray-500 dm-sans" id="header-subtitle">Active now</p></div>';
        backBtn = document.getElementById('back-btn');
        if (backBtn) backBtn.addEventListener('click', showMainView);
    }

    function setupInput(taId, micId, addId, sendId) {
        var ta = document.getElementById(taId);
        var mic = document.getElementById(micId);
        var add = document.getElementById(addId);
        var send = document.getElementById(sendId);
        if (!ta) return;
        function update() {
            updateInputState(ta, mic, add, send);
            autoGrowTextarea(ta);
        }
        ta.addEventListener('input', update);
        ta.addEventListener('paste', function() { setTimeout(update, 0); });
        ta.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendFromInput(ta, mic, add, send); }
        });
        if (send) send.addEventListener('click', function() { sendFromInput(ta, mic, add, send); });
        update();
        autoGrowTextarea(ta);
    }

    function init(options) {
        options = options || {};
        var openByDefault = options.openByDefault === true;
        var insertBeforeId = options.insertBefore || 'bottom-navigation';

        var wrap = document.createElement('div');
        wrap.innerHTML = CHAT_DRAWER_HTML;
        var target = document.getElementById(insertBeforeId);
        var parent = (target && target.parentNode) ? target.parentNode : document.body;
        var children = Array.from(wrap.children);
        for (var i = 0; i < children.length; i++) {
            parent.insertBefore(children[i], target);
        }

        chatDrawer = document.getElementById('chat-drawer');
        chatInputBar = document.getElementById('chat-input-bar');
        dragHandle = document.getElementById('drag-handle');
        chatMessages = document.getElementById('chat-messages');

        /* Let taps pass through chat bar so product tiles stay clickable; only input/buttons capture */
        if (chatInputBar) {
            chatInputBar.style.pointerEvents = 'none';
            var interactive = chatInputBar.querySelectorAll('button, input, textarea');
            for (var i = 0; i < interactive.length; i++) interactive[i].style.pointerEvents = 'auto';
        }

        setupInput('message-input', 'mic-btn', 'add-friend-btn', 'send-btn');
        setupInput('chat-input-bar-field', 'mic-btn-bar', 'add-friend-btn-bar', 'send-btn-bar');

        if (chatInputBar) chatInputBar.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (!isDrawerExpanded) { expandDrawer(); setTimeout(function() { var t = document.getElementById('message-input'); if (t) t.focus(); }, 200); }
        });
        var barField = document.getElementById('chat-input-bar-field');
        if (barField) {
            barField.addEventListener('focus', function() { if (!isDrawerExpanded) expandDrawer(); });
            barField.addEventListener('click', function(e) { e.stopPropagation(); if (!isDrawerExpanded) expandDrawer(); });
        }

        [document.getElementById('cam-btn'), document.getElementById('cam-btn-drawer')].forEach(function(btn) {
            if (btn) btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (!isDrawerExpanded) expandDrawer();
                setTimeout(handleCameraAccess, 200);
            });
        });

        var dragHandleZone = document.getElementById('drag-handle-zone') || document.getElementById('drag-handle');
        function startDrag(e) {
            isDragging = true;
            startY = e.touches && e.touches.length ? e.touches[0].clientY : e.clientY;
        }
        if (dragHandleZone) {
            dragHandleZone.addEventListener('mousedown', startDrag);
            dragHandleZone.addEventListener('touchstart', startDrag, { passive: true });
        }

        function getY(e) { return e.touches && e.touches.length ? e.touches[0].clientY : e.clientY; }
        function onDrag(e) {
            if (!isDragging) return;
            var y = getY(e);
            var delta = startY - y;
            startY = y;
            currentHeight = Math.min(90, Math.max(10, currentHeight + (delta / window.innerHeight) * 100));
            if (chatDrawer) { chatDrawer.style.transition = 'none'; chatDrawer.style.height = currentHeight + 'vh'; }
        }
        document.addEventListener('mousemove', onDrag);
        document.addEventListener('touchmove', function(e) {
            if (isDragging) { e.preventDefault(); onDrag(e); }
        }, { passive: false });

        function onDragEnd() {
            if (!isDragging) return;
            isDragging = false;
            if (chatDrawer) chatDrawer.style.transition = '';
            var rect = chatDrawer && chatDrawer.getBoundingClientRect();
            var h = rect ? (rect.height / window.innerHeight) * 100 : 50;
            if (h < 25) collapseDrawer();
            else { currentHeight = Math.max(35, Math.min(90, h)); if (chatDrawer) chatDrawer.style.height = currentHeight + 'vh'; }
        }
        document.addEventListener('mouseup', onDragEnd);
        document.addEventListener('touchend', onDragEnd);
        document.addEventListener('touchcancel', onDragEnd);

        if (typeof window.setShAIAvatar === 'undefined') {
            window.setShAIAvatar = function(url) {
                window.__shaiAvatarUrl = url || DEFAULT_AVATAR;
                document.querySelectorAll('[data-shai-avatar]').forEach(function(img) { img.src = window.__shaiAvatarUrl; });
            };
        }
        if (typeof window.__shaiAvatarUrl === 'undefined') window.__shaiAvatarUrl = DEFAULT_AVATAR;

        if (openByDefault) expandDrawer();

        chatContent = document.getElementById('chat-content');
        addFriendContent = document.getElementById('add-friend-content');
        backBtn = document.getElementById('back-btn');
        contactsContainer = document.getElementById('contacts-container');
        contactSearch = document.getElementById('contact-search');

        if (typeof window.__addFriendContacts === 'undefined') {
            window.__addFriendContacts = [
                { name: 'Alex Johnson', phone: '+1 (555) 123-4567', goshopme: true, avatar: 'https://raw.githubusercontent.com/nora-todorova/GoShopMe-assets/main/assets/avatars/avatar-2.jpg' },
                { name: 'Maria Rodriguez', phone: '+1 (555) 987-6543', goshopme: false },
                { name: 'David Kim', phone: '+1 (555) 456-7890', goshopme: true, avatar: 'https://raw.githubusercontent.com/nora-todorova/GoShopMe-assets/main/assets/avatars/avatar-3.jpg' },
                { name: 'Sarah Thompson', phone: '+1 (555) 234-5678', goshopme: false }
            ];
        }
        window.loadAddFriendContacts = function(data) {
            window.__addFriendContacts = Array.isArray(data) ? data : [];
            renderAddFriendContacts();
        };
        function getInitials(n) {
            var p = (n || '').trim().split(/\s+/);
            if (p.length >= 2) return (p[0][0] + p[1][0]).toUpperCase();
            return (p[0] ? p[0].slice(0, 2) : '??').toUpperCase();
        }
        function renderAddFriendContacts() {
            if (!contactsContainer) return;
            var list = Array.isArray(window.__addFriendContacts) ? window.__addFriendContacts : [];
            var gc = window.GoShopMeGroupChat;
            var participants = gc ? gc.getParticipants() : [];
            var atMax = gc ? gc.isAtMax() : false;
            contactsContainer.innerHTML = list.map(function(c, idx) {
                var rawId = c.phone || c.name || 'user-' + idx;
                var idAttr = String(rawId).replace(/"/g, '&quot;');
                var ini = getInitials(c.name);
                var avatarHtml = (c.goshopme && c.avatar)
                    ? '<div class="w-8 h-8 rounded-full overflow-hidden flex-shrink-0"><img src="' + (c.avatar || '').replace(/"/g, '&quot;') + '" alt="" class="w-full h-full object-cover"></div>'
                    : '<div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0"><span class="text-gray-600 font-medium text-xs">' + ini + '</span></div>';
                var inGroup = participants.some(function(p) { return p.id === rawId || p.name === c.name; });
                var btnHtml;
                if (inGroup) {
                    btnHtml = '<span class="text-gray-500 text-xs font-medium">Added</span>';
                } else if (c.goshopme) {
                    btnHtml = atMax ? '<span class="text-gray-400 text-xs font-medium">Full</span>' : '<button class="contact-add-btn bg-[#939BFB] text-white px-2 py-1 rounded-full text-xs font-medium">Add</button>';
                } else {
                    btnHtml = '<button class="contact-invite-btn bg-white text-[#939BFB] px-2 py-1 rounded-full text-xs font-medium border border-[#939BFB]">Invite</button>';
                }
                return '<div class="contact-item flex items-center gap-2 p-2 bg-gray-50 rounded-xl" data-id="' + idAttr + '" data-name="' + (c.name || '').replace(/"/g, '&quot;') + '" data-phone="' + (c.phone || '').replace(/"/g, '&quot;') + '" data-avatar="' + (c.avatar || '').replace(/"/g, '&quot;') + '">' + avatarHtml + '<div class="flex-1"><p class="font-medium text-sm text-black">' + String(c.name || '').replace(/</g, '&lt;') + '</p><p class="text-xs text-gray-500">' + String(c.phone || '').replace(/</g, '&lt;') + '</p></div>' + btnHtml + '</div>';
            }).join('');
        }
        renderAddFriendContacts();

        applyGroupHeader();

        [document.getElementById('add-friend-btn'), document.getElementById('add-friend-btn-bar')].forEach(function(btn) {
            if (btn) btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (!isDrawerExpanded) expandDrawer();
                setTimeout(showAddFriendView, 200);
            });
        });
        if (backBtn) backBtn.addEventListener('click', showMainView);
        if (contactSearch) contactSearch.addEventListener('input', function() {
            var q = (contactSearch.value || '').toLowerCase();
            var items = contactsContainer ? contactsContainer.querySelectorAll('.contact-item') : [];
            items.forEach(function(el) {
                var name = ((el.querySelector('p') || {}).textContent || '').toLowerCase();
                var phone = ((el.querySelectorAll('p')[1] || {}).textContent || '').toLowerCase();
                el.style.display = (name.indexOf(q) >= 0 || phone.indexOf(q) >= 0) ? 'flex' : 'none';
            });
        });
        if (contactsContainer) {
            contactsContainer.addEventListener('click', function(e) {
                var addBtn = e.target.closest('.contact-add-btn');
                var invBtn = e.target.closest('.contact-invite-btn');
                var item = e.target.closest('.contact-item');
                if (item) {
                    var name = item.dataset.name || item.getAttribute('data-name') || '';
                    if (addBtn) {
                        var gc = window.GoShopMeGroupChat;
                        if (gc) {
                            var id = item.dataset.id || item.getAttribute('data-id') || name;
                            var avatar = item.dataset.avatar || item.getAttribute('data-avatar') || '';
                            if (gc.addUser({ id: id, name: name, avatar: avatar })) {
                                addChatNotification(name + ' has been added to chat');
                                showMainView();
                                applyGroupHeader();
                                renderAddFriendContacts();
                            } else if (gc.isAtMax()) {
                                addChatNotification('Maximum 3 participants reached');
                            } else {
                                addChatNotification(name + ' is already in the chat');
                                showMainView();
                                renderAddFriendContacts();
                            }
                        } else {
                            addChatNotification(name + ' has been added to chat');
                            showMainView();
                        }
                    }
                    if (invBtn) {
                        var txt = "Hey! I'm using GoShopMe. It's faster, smarter and effortless — join me";
                        var url = 'https://app.goshopme.ai';
                        if (navigator.share) navigator.share({ title: 'Join me on GoShopMe', text: txt, url: url });
                        else navigator.clipboard.writeText(txt + ' ' + url).then(function() { addChatNotification('Invitation link copied!'); });
                    }
                }
            });
        }

        setupVoiceRecording();
        document.querySelectorAll('#smart-prompts button').forEach(function(btn) {
            if (btn) btn.addEventListener('click', function() {
                var txt = (btn.textContent || '').trim();
                if (!txt) return;
                var container = document.querySelector('#chat-messages .p-4');
                if (!container) return;
                var wrap = document.createElement('div');
                wrap.className = 'flex justify-end mb-4';
                wrap.innerHTML = '<div class="bg-[#939BFB] text-white rounded-2xl rounded-tr-md p-3 max-w-[80%]"><p class="text-sm break-words whitespace-pre-wrap">' + txt.replace(/</g, '&lt;') + '</p></div>';
                container.appendChild(wrap);
                scrollToBottom();
                setTimeout(function() { addContextualMessage("Great choice! Let me curate some perfect options for you."); }, 800);
            });
        });
    }

    function showToast(msg) {
        var t = document.createElement('div');
        t.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-full text-sm z-[60]';
        t.textContent = msg;
        document.body.appendChild(t);
        setTimeout(function() { t.remove(); }, 3000);
    }
    function removeTempRecordingBubble() {
        var t = document.getElementById('temp-recording');
        if (t) t.remove();
    }
    function setupVoiceRecording() {
        var micBtns = [document.getElementById('mic-btn'), document.getElementById('mic-btn-bar')];
        micBtns.forEach(function(btn) {
            if (!btn) return;
            btn.addEventListener('mousedown', startRecording);
            btn.addEventListener('touchstart', startRecording);
            btn.addEventListener('mouseup', stopRecording);
            btn.addEventListener('mouseleave', cancelRecording);
            btn.addEventListener('touchend', stopRecording);
            btn.addEventListener('touchcancel', cancelRecording);
            btn.addEventListener('touchmove', handleSwipeCancel);
        });
    }
    function startRecording(e) {
        e.preventDefault();
        removeTempRecordingBubble();
        if (!isDrawerExpanded) { expandDrawer(); return; }
        if (micAccessDenied) { showToast('Microphone access denied. Enable it in your browser settings.'); return; }
        startX = e.touches ? e.touches[0].clientX : e.clientX;
        try {
            var btn = e.currentTarget;
        if (!mediaStream || !mediaStream.active) {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(function(stream) { mediaStream = stream; startRecordingAfterMedia(btn, stream); })
                .catch(handleMicError);
        } else {
            startRecordingAfterMedia(btn, mediaStream);
        }
        } catch (err) { handleMicError(err); }
    }
    function startRecordingAfterMedia(btn, stream) {
        try {
            mediaRecorder = new (window.MediaRecorder || window.webkitMediaRecorder)(stream);
            isRecording = true;
            audioChunks = [];
            mediaRecorder.ondataavailable = function(ev) { if (ev.data.size > 0) audioChunks.push(ev.data); };
            mediaRecorder.start();
            if (btn) btn.classList.add('scale-110', 'ring-2', 'ring-[#939BFB]', 'ring-offset-2');
            var container = document.querySelector('#chat-messages .p-4');
            if (container) {
                var tb = document.createElement('div');
                tb.id = 'temp-recording';
                tb.className = 'flex justify-end mb-2';
                tb.innerHTML = '<div class="flex items-center bg-[#939BFB] text-white rounded-2xl px-3 py-2 max-w-[70%]"><svg class="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"/></svg><span class="text-xs">Recording... swipe left to cancel</span></div>';
                container.appendChild(tb);
                scrollToBottom();
            }
        } catch (err) { handleMicError(err); }
    }
    function handleMicError(err) {
        removeTempRecordingBubble();
        if (err && (err.name === 'NotAllowedError' || err.name === 'SecurityError')) { micAccessDenied = true; showToast('Microphone access denied. Enable it in your browser settings.'); }
        else { showToast('Could not access microphone. Please try again.'); }
    }
    function stopRecording(e) {
        e.preventDefault();
        if (!isRecording) return;
        isRecording = false;
        if (e.currentTarget) e.currentTarget.classList.remove('scale-110', 'ring-2', 'ring-[#939BFB]', 'ring-offset-2');
        removeTempRecordingBubble();
        if (mediaRecorder) {
            mediaRecorder.stop();
            mediaRecorder.onstop = function() {
                var blob = new Blob(audioChunks, { type: 'audio/webm' });
                renderAudioBubble(URL.createObjectURL(blob));
            };
        }
    }
    function cancelRecording(e) {
        if (!isRecording) return;
        isRecording = false;
        if (e.currentTarget) e.currentTarget.classList.remove('scale-110', 'ring-2', 'ring-[#939BFB]', 'ring-offset-2');
        removeTempRecordingBubble();
        if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop();
    }
    function handleSwipeCancel(e) {
        if (!isRecording || !e.touches || !e.touches.length) return;
        if (startX - e.touches[0].clientX > 30) cancelRecording.call(e.currentTarget, e);
    }
    function renderAudioBubble(url) {
        var container = document.querySelector('#chat-messages .p-4');
        if (!container) return;
        var bubble = document.createElement('div');
        bubble.className = 'flex justify-end mb-2';
        bubble.innerHTML = '<div role="group" aria-label="Voice message from you" class="voice-message-bubble bg-[#939BFB] text-white rounded-full px-3 py-2 flex items-center gap-2 h-11 shadow-sm">' +
            '<button aria-label="Play voice message from you" class="play-btn flex-shrink-0 w-6 h-6 border border-white rounded-full flex items-center justify-center hover:bg-white/20" onclick="toggleVoicePlayback(this, \'' + url + '\')">' +
            '<svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></button>' +
            '<div class="waveform flex-1 flex items-center justify-center gap-0.5 h-4 max-w-[120px]">' +
            '<div class="wave-bar w-0.5 bg-white/90 rounded-full" style="height: 8px; --i: 0"></div><div class="wave-bar w-0.5 bg-white/90 rounded-full" style="height: 12px; --i: 1"></div><div class="wave-bar w-0.5 bg-white/90 rounded-full" style="height: 6px; --i: 2"></div><div class="wave-bar w-0.5 bg-white/90 rounded-full" style="height: 16px; --i: 3"></div><div class="wave-bar w-0.5 bg-white/90 rounded-full" style="height: 10px; --i: 4"></div>' +
            '</div><span class="duration-text text-white/90 text-xs font-medium flex-shrink-0">0:00</span><audio src="' + url + '" preload="auto" class="hidden"></audio></div>';
        container.appendChild(bubble);
        var audio = bubble.querySelector('audio');
        var dt = bubble.querySelector('.duration-text');
        if (audio && dt) audio.addEventListener('loadedmetadata', function() { var d = Math.ceil(audio.duration); dt.textContent = Math.floor(d / 60) + ':' + (d % 60).toString().padStart(2, '0'); });
        scrollToBottom();
        setTimeout(function() { addContextualMessage("Got your voice message! I'm on it — let me find the best options for you."); }, 800);
    }
    if (typeof window.toggleVoicePlayback === 'undefined') {
        window.toggleVoicePlayback = function(button, audioUrl) {
            var container = button.closest('.voice-message-bubble');
            var audio = container.querySelector('audio');
            var playIcon = button.querySelector('svg');
            var waveBars = container.querySelectorAll('.wave-bar');
            var dt = container.querySelector('.duration-text');
            if (audio.paused) {
                audio.play();
                playIcon.innerHTML = '<path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>';
                waveBars.forEach(function(b, i) { b.style.animation = 'wavePulse 1.1s ease-in-out infinite'; b.style.animationDelay = (i * 0.08) + 's'; });
                audio.addEventListener('timeupdate', function() { var r = Math.ceil(audio.duration - audio.currentTime); dt.textContent = Math.floor(r / 60) + ':' + (r % 60).toString().padStart(2, '0'); });
                audio.addEventListener('ended', function() { playIcon.innerHTML = '<path d="M8 5v14l11-7z"/>'; waveBars.forEach(function(b) { b.style.animation = 'none'; }); var d = Math.ceil(audio.duration); dt.textContent = Math.floor(d / 60) + ':' + (d % 60).toString().padStart(2, '0'); });
            } else {
                audio.pause();
                playIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
                waveBars.forEach(function(b) { b.style.animation = 'none'; });
            }
        };
    }

    window.GoShopMeChatDrawer = {
        init: init,
        expandDrawer: expandDrawer,
        collapseDrawer: collapseDrawer,
        addContextualMessage: addContextualMessage,
        addShAIMessage: addContextualMessage,
        applyGroupHeader: applyGroupHeader
    };
})();
