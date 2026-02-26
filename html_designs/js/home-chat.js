/**
 * GoShopMe Home Chat - exact same implementation as Home.html
 * Use on any page that includes the Home chat HTML structure.
 * Requires: #chat-overlay, #chat-drawer, #chat-input-bar, #chat-messages, #message-input, #chat-input-drawer-field
 */
(function() {
'use strict';
if (!document.getElementById('chat-drawer')) return;

function upgradeToAutoGrowTextarea(cfg) {
    var old = document.querySelector(cfg.selector);
    if (!old) return;
    var ta = document.createElement('textarea');
    ta.id = old.id;
    ta.className = old.className + ' resize-none';
    ta.placeholder = old.placeholder || '';
    ta.value = old.value || '';
    ta.rows = 1;
    ta.autocomplete = 'off';
    ta.spellcheck = true;
    ta.style.overflowY = 'hidden';
    old.parentNode.replaceChild(ta, old);
    var mic = document.querySelector(cfg.mic);
    var add = document.querySelector(cfg.add);
    var send = document.querySelector(cfg.send);
    var chatScroll = document.getElementById('chat-messages');
    var rowH = function() { var lh = parseFloat(getComputedStyle(ta).lineHeight); return Number.isFinite(lh) ? lh : 20; };
    var autoResize = function() { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 6 * rowH()) + 'px'; };
    var updateButtons = function() { var hasText = ta.value.trim().length > 0; if (mic) mic.classList.toggle('hidden', hasText); if (add) add.classList.toggle('hidden', hasText); if (send) send.classList.toggle('hidden', !hasText); };
    var sendNow = function() {
        var text = ta.value.trim();
        if (!text) return;
        var container = document.querySelector('#chat-messages .p-4');
        if (container) {
            var wrap = document.createElement('div');
            wrap.className = 'flex justify-end mb-4';
            wrap.innerHTML = '<div class="bg-[#939BFB] text-white rounded-2xl rounded-tr-md p-3 max-w-[80%]"><p class="text-sm"></p></div>';
            wrap.querySelector('p').textContent = text;
            container.appendChild(wrap);
            if (typeof window.__scrollChatToBottom === 'function') window.__scrollChatToBottom(); else if (chatScroll) chatScroll.scrollTop = chatScroll.scrollHeight;
        }
        ta.value = '';
        autoResize();
        updateButtons();
        setTimeout(function() { if (typeof window.__shaiReplyToText === 'function') window.__shaiReplyToText(); }, 1000);
    };
    ta.addEventListener('input', function() { autoResize(); updateButtons(); });
    ta.addEventListener('keydown', function(e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendNow(); } });
    if (send) send.addEventListener('click', sendNow);
    autoResize();
    updateButtons();
    if (cfg.onFocusGrow) ta.addEventListener('focus', function() { var drawer = document.getElementById('chat-drawer'); if (drawer) drawer.style.height = '50vh'; });
}

upgradeToAutoGrowTextarea({ selector: '#message-input', mic: '#mic-btn', add: '#add-friend-btn', send: '#send-btn' });
upgradeToAutoGrowTextarea({ selector: '#chat-input-drawer-field', mic: '#mic-btn-drawer', add: '#add-friend-btn-drawer', send: '#send-btn-drawer', onFocusGrow: true });

document.addEventListener("DOMContentLoaded", function initHomeChat() {
    if (!document.getElementById("chat-drawer")) return;
    var chatDrawer = document.getElementById("chat-drawer");
    var chatOverlay = document.getElementById("chat-overlay");
    var chatMessages = document.getElementById("chat-messages");
    var chatInput = document.getElementById("message-input");
    var chatInputDrawer = document.getElementById("chat-input-drawer-field");
    var chatInputBar = document.getElementById("chat-input-bar");
    var micBtn = document.getElementById("mic-btn");
    var sendBtn = document.getElementById("send-btn");
    var addFriendBtn = document.getElementById("add-friend-btn");
    var micBtnDrawer = document.getElementById("mic-btn-drawer");
    var sendBtnDrawer = document.getElementById("send-btn-drawer");
    var addFriendBtnDrawer = document.getElementById("add-friend-btn-drawer");
    var dragHandleZone = document.getElementById("drag-handle-zone") || document.getElementById("drag-handle");
    var isDrawerExpanded = false;
    var isDragging = false;

    function scrollToBottom(force) {
        var el = document.getElementById("chat-messages");
        if (!el) return;
        var atBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 20;
        if (force || atBottom) requestAnimationFrame(function() { requestAnimationFrame(function() { el.scrollTop = el.scrollHeight; }); });
    }
    window.__scrollChatToBottom = function() { scrollToBottom(true); };

    function addShAIMessage(message, thumbUrls) {
        var container = document.querySelector('#chat-messages .p-4');
        var chatEl = document.getElementById('chat-messages');
        if (container) {
            var avatarUrl = window.__shaiAvatarUrl || 'https://raw.githubusercontent.com/nora-todorova/GoShopMe-assets/main/assets/shai-avatar.png';
            var thumbHtml = (thumbUrls && thumbUrls.length) ? '<div class="flex gap-1.5 mt-2 flex-wrap">' + thumbUrls.slice(0, 4).map(function(t) { return '<img class="w-12 h-12 rounded-lg object-cover border border-gray-200" src="' + (t || '').replace(/"/g, '&quot;') + '" alt="">'; }).join('') + '</div>' : '';
            var aiMessage = document.createElement('div');
            aiMessage.className = 'flex items-start space-x-3 mb-4';
            aiMessage.innerHTML = '<div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"><img class="w-full h-full object-cover" src="' + avatarUrl.replace(/"/g, '&quot;') + '" alt="ShAI avatar" data-shai-avatar /></div><div class="flex-1"><div class="bg-gray-50 rounded-2xl rounded-tl-md p-3"><p class="text-sm text-black">' + (message || '').replace(/</g, '&lt;') + '</p>' + thumbHtml + '</div></div>';
            container.appendChild(aiMessage);
            scrollToBottom(true);
        }
    }
    window.addShAIMessage = addShAIMessage;
    window.setShAIAvatar = function(url) {
        window.__shaiAvatarUrl = url || 'https://raw.githubusercontent.com/nora-todorova/GoShopMe-assets/main/assets/shai-avatar.png';
        document.querySelectorAll('[data-shai-avatar]').forEach(function(img) { img.src = window.__shaiAvatarUrl; });
    };
    window.__shaiReplyToText = function() { addShAIMessage("Perfect! Let me help you find exactly what you're looking for. I'll show you some great options that match your style."); };

    function expandDrawer() {
        if (!chatDrawer) return;
        chatDrawer.classList.remove('translate-y-full');
        if (chatOverlay) chatOverlay.classList.remove('hidden');
        if (chatInputBar) chatInputBar.classList.add('hidden');
        isDrawerExpanded = true;
        document.body.style.overflow = 'hidden';
    }

    function collapseDrawer() {
        if (!chatDrawer) return;
        chatDrawer.classList.add('translate-y-full');
        if (chatOverlay) chatOverlay.classList.add('hidden');
        if (chatInputBar) chatInputBar.classList.remove('hidden');
        isDrawerExpanded = false;
        document.body.style.overflow = '';
    }

    window.__expandChatDrawer = expandDrawer;
    if (chatOverlay) chatOverlay.addEventListener("click", collapseDrawer);
    if (chatInputBar) chatInputBar.addEventListener("click", function (e) { if (!e.target.closest("button")) expandDrawer(); });
    if (chatInput) chatInput.addEventListener('focus', function() { if (!isDrawerExpanded) { expandDrawer(); setTimeout(function() { if (chatInputDrawer) chatInputDrawer.focus(); }, 300); } });

    var addFriendContent = document.getElementById("add-friend-content");
    var chatContent = document.getElementById("chat-content");
    var backBtn = document.getElementById("back-btn");
    var headerTitle = document.getElementById("header-title");
    var headerSubtitle = document.getElementById("header-subtitle");
    var contactsContainer = document.getElementById("contacts-container");
    var contactSearch = document.getElementById("contact-search");
    var isAddFriendMode = false;

    window.__addFriendContacts = window.__addFriendContacts || [
        { name: 'Alex Johnson', phone: '+1 (555) 123-4567', goshopme: true, avatar: 'https://raw.githubusercontent.com/nora-todorova/GoShopMe-assets/main/assets/avatars/avatar-2.jpg' },
        { name: 'Maria Rodriguez', phone: '+1 (555) 987-6543', goshopme: false },
        { name: 'David Kim', phone: '+1 (555) 456-7890', goshopme: true, avatar: 'https://raw.githubusercontent.com/nora-todorova/GoShopMe-assets/main/assets/avatars/avatar-3.jpg' }
    ];

    function getInitials(name) { var p = (name || '').trim().split(/\s+/); return p.length >= 2 ? (p[0][0] + p[1][0]).toUpperCase() : (p[0] ? p[0].slice(0, 2) : '??').toUpperCase(); }
    function renderAddFriendContacts(container) {
        if (!container) return;
        var list = Array.isArray(window.__addFriendContacts) ? window.__addFriendContacts : [];
        container.innerHTML = list.map(function(c) {
            var initials = getInitials(c.name);
            var hasAvatar = c.goshopme && c.avatar;
            var avatarHtml = hasAvatar ? '<div class="w-8 h-8 rounded-full overflow-hidden flex-shrink-0"><img src="' + c.avatar + '" alt="" class="w-full h-full object-cover"></div>' : '<div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0"><span class="text-gray-600 font-medium text-xs">' + initials + '</span></div>';
            var btnHtml = c.goshopme ? '<button class="contact-action bg-[#939BFB] text-white px-2 py-1 rounded-full text-xs font-medium">Add</button>' : '<button class="contact-action bg-white text-[#939BFB] px-2 py-1 rounded-full text-xs font-medium border border-[#939BFB]">Invite</button>';
            return '<div class="contact-item flex items-center gap-2 p-2 bg-gray-50 rounded-xl" data-name="' + (c.name || '').replace(/"/g, '&quot;') + '" data-phone="' + (c.phone || '').replace(/"/g, '&quot;') + '" data-goshopme="' + (c.goshopme ? 'true' : 'false') + '">' + avatarHtml + '<div class="flex-1"><p class="font-medium text-sm text-black">' + (c.name || '').replace(/</g, '&lt;') + '</p><p class="text-xs text-gray-500">' + (c.phone || '').replace(/</g, '&lt;') + '</p></div>' + btnHtml + '</div>';
        }).join('');
    }
    renderAddFriendContacts(contactsContainer);

    function showAddFriendFlow() {
        isAddFriendMode = true;
        if (chatContent) chatContent.classList.add('hidden');
        if (addFriendContent) addFriendContent.classList.remove('hidden');
        if (backBtn) backBtn.classList.remove('hidden');
        if (headerTitle) headerTitle.textContent = 'Add Friend';
        if (headerSubtitle) headerSubtitle.textContent = 'Choose contacts to add';
    }
    function hideAddFriendFlow() {
        isAddFriendMode = false;
        if (chatContent) chatContent.classList.remove('hidden');
        if (addFriendContent) addFriendContent.classList.add('hidden');
        if (backBtn) backBtn.classList.add('hidden');
        if (headerTitle) headerTitle.textContent = 'ShAI';
        if (headerSubtitle) headerSubtitle.textContent = 'Your shopping assistant';
        if (contactSearch) { contactSearch.value = ''; filterContacts(''); }
    }
    function filterContacts(term) {
        if (!contactsContainer) return;
        var items = contactsContainer.querySelectorAll('.contact-item');
        var t = (term || '').toLowerCase();
        items.forEach(function(item) { var n = (item.getAttribute('data-name') || '').toLowerCase(); var p = (item.getAttribute('data-phone') || '').toLowerCase(); item.style.display = (n.indexOf(t) !== -1 || p.indexOf(t) !== -1) ? 'flex' : 'none'; });
    }
    if (contactSearch) contactSearch.addEventListener('input', function() { filterContacts(this.value); });
    if (backBtn) backBtn.addEventListener('click', hideAddFriendFlow);
    if (addFriendBtn) addFriendBtn.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); if (!isDrawerExpanded) { expandDrawer(); setTimeout(showAddFriendFlow, 300); } else showAddFriendFlow(); });
    if (addFriendBtnDrawer) addFriendBtnDrawer.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); showAddFriendFlow(); });

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('contact-action')) {
            var item = e.target.closest('.contact-item');
            if (!item) return;
            var name = item.querySelector('p') ? item.querySelector('p').textContent : '';
            var isGoshopme = item.getAttribute('data-goshopme') === 'true';
            if (e.target.textContent === 'Add' && isGoshopme) {
                var container = document.querySelector('#chat-messages .p-4');
                if (container) { var n = document.createElement('div'); n.className = 'flex justify-center mb-4'; n.innerHTML = '<div class="bg-green-100 text-green-800 px-4 py-2 rounded-full text-xs font-medium">' + (name.split(' ')[0] || '') + ' has been added to chat</div>'; container.appendChild(n); scrollToBottom(true); }
                hideAddFriendFlow();
            } else if (e.target.textContent === 'Invite' && navigator.share) {
                navigator.share({ title: 'Join me on GoShopMe', text: "Hey! I'm using GoShopMe. It's faster, smarter and effortless — join me", url: 'https://app.goshopme.ai' }).catch(function() {});
            }
        }
    });

    var smartPrompts = document.querySelectorAll('#smart-prompts button');
    smartPrompts.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var text = this.textContent;
            var container = document.querySelector('#chat-messages .p-4');
            if (container) {
                var userMsg = document.createElement('div');
                userMsg.className = 'flex justify-end mb-4';
                userMsg.innerHTML = '<div class="bg-[#939BFB] text-white rounded-2xl rounded-tr-md p-3 max-w-[80%]"><p class="text-sm">' + text + '</p></div>';
                container.appendChild(userMsg);
                setTimeout(function() {
                    var avatarUrl = window.__shaiAvatarUrl || 'https://raw.githubusercontent.com/nora-todorova/GoShopMe-assets/main/assets/shai-avatar.png';
                    var aiResponse = document.createElement('div');
                    aiResponse.className = 'flex items-start space-x-3 mb-4';
                    aiResponse.innerHTML = '<div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"><img class="w-full h-full object-cover" src="' + avatarUrl.replace(/"/g, '&quot;') + '" alt="ShAI" data-shai-avatar /></div><div class="flex-1"><div class="bg-gray-50 rounded-2xl rounded-tl-md p-3"><p class="text-sm text-black">I\'d be happy to help you with that! Let me find some perfect options for you.</p></div></div>';
                    container.appendChild(aiResponse);
                    scrollToBottom(true);
                }, 1000);
                scrollToBottom(true);
            }
        });
    });

    var camBtns = [document.getElementById("cam-btn"), document.getElementById("cam-btn-drawer")];
    var micBtns = [micBtn, micBtnDrawer];
    var wishlistItems = new Set();
    var isRecording = false, mediaRecorder, audioChunks = [], startX, micAccessDenied = false, mediaStream = null, recordingStartTime = 0;
    var isRequestingMic = false;
    var lastMicTouchTime = 0;

    function showToast(msg) { var t = document.createElement('div'); t.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-full text-sm z-[9999]'; t.textContent = msg; document.body.appendChild(t); setTimeout(function() { t.remove(); }, 3000); }

    function handleCameraAccess() {
        var input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*,video/*";
        input.onchange = function(e) { var file = e.target.files && e.target.files[0]; if (file) handleFileSelection(file); input.value = ""; };
        input.click();
    }
    function handleFileSelection(file) {
        var url = URL.createObjectURL(file);
        var container = document.querySelector('#chat-messages .p-4');
        var chatEl = document.getElementById('chat-messages');
        if (container) {
            var bubble = document.createElement('div');
            bubble.className = 'flex justify-end mb-4';
            if (file.type.startsWith("image/")) bubble.innerHTML = '<div class="rounded-2xl border border-[#939BFB] max-w-[60%] overflow-hidden shadow-sm"><img src="' + url + '" class="w-full h-auto" alt="Uploaded" /></div>';
            else if (file.type.startsWith("video/")) bubble.innerHTML = '<div class="rounded-2xl border border-[#939BFB] max-w-[60%] overflow-hidden shadow-sm"><video src="' + url + '" controls class="w-full h-auto"></video></div>';
            else return;
            container.appendChild(bubble);
            scrollToBottom(true);
            setTimeout(function() { addShAIMessage(file.type.startsWith("video/") ? "Great! I can analyze your video. Let me find products that match what I see." : "Perfect! I can see your image. Let me analyze it and find similar products for you."); }, 1500);
        }
    }
    camBtns.forEach(function(btn) {
        if (!btn) return;
        btn.addEventListener("click", function(e) { e.preventDefault(); e.stopPropagation(); if (chatDrawer && !chatDrawer.classList.contains('translate-y-full')) handleCameraAccess(); else { expandDrawer(); setTimeout(handleCameraAccess, 300); } });
    });

    function removeTempRecordingBubble() { var t = document.getElementById("temp-recording"); if (t) t.remove(); }
    function doStartRecording(btn) {
        if (!window.isSecureContext) { showToast("Microphone requires HTTPS. Open this page via https:// or localhost."); return; }
        if (isRequestingMic) return;
        var gotStream = function(stream) {
            isRequestingMic = false;
            mediaStream = stream;
            recordingStartTime = Date.now();
            var mimeOpt = {};
            if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported('audio/mp4')) mimeOpt.mimeType = 'audio/mp4';
            else if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported('audio/webm')) mimeOpt.mimeType = 'audio/webm';
            mediaRecorder = new MediaRecorder(stream, mimeOpt);
            isRecording = true;
            audioChunks = [];
            mediaRecorder.ondataavailable = function(ev) { if (ev.data && ev.data.size > 0) audioChunks.push(ev.data); };
            mediaRecorder.start();
            var container = document.querySelector('#chat-messages .p-4');
            if (btn) btn.classList.add("scale-110", "ring-2", "ring-[#939BFB]", "ring-offset-2");
            if (!document.getElementById('temp-recording') && container) {
                var tb = document.createElement('div');
                tb.id = 'temp-recording';
                tb.className = 'flex justify-end mb-2';
                tb.innerHTML = '<div class="flex items-center bg-[#939BFB] text-white rounded-2xl px-3 py-2 max-w-[70%]"><svg class="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"/></svg><span class="text-xs">Recording... swipe left to cancel</span></div>';
                container.appendChild(tb);
                scrollToBottom(true);
            }
        };
        var needStream = !mediaStream || !mediaStream.active;
        if (needStream) {
            isRequestingMic = true;
            if (navigator.permissions && navigator.permissions.query) {
                navigator.permissions.query({ name: 'microphone' }).then(function(p) {
                    if (p.state === 'denied') { isRequestingMic = false; micAccessDenied = true; showToast("Microphone access denied. Enable it in your browser settings."); return; }
                    navigator.mediaDevices.getUserMedia({ audio: true }).then(gotStream).catch(onMicError);
                }).catch(function() { navigator.mediaDevices.getUserMedia({ audio: true }).then(gotStream).catch(onMicError); });
            } else {
                navigator.mediaDevices.getUserMedia({ audio: true }).then(gotStream).catch(onMicError);
            }
        } else {
            gotStream(mediaStream);
        }
        function onMicError(err) {
            isRequestingMic = false;
            removeTempRecordingBubble();
            if (err && (err.name === "NotAllowedError" || err.name === "SecurityError")) { micAccessDenied = true; showToast("Microphone access denied. Enable it in your browser settings."); return; }
            if (err && err.name === "NotReadableError") { showToast("Microphone is in use by another app."); return; }
            if (err && err.name === "NotFoundError") { showToast("No microphone found."); return; }
            showToast("Could not access microphone. Try again.");
        }
    }
    function removeMicButtonStyles() {
        micBtns.forEach(function(b) { if (b) b.classList.remove("scale-110", "ring-2", "ring-[#939BFB]", "ring-offset-2"); });
    }
    function startRecording(e) {
        e.preventDefault();
        removeTempRecordingBubble();
        if (!isDrawerExpanded) { expandDrawer(); }
        if (micAccessDenied) { showToast("Microphone access denied. Enable it in your browser settings."); return; }
        startX = e.touches ? e.touches[0].clientX : e.clientX;
        var btn = e.currentTarget;
        doStartRecording(btn);
    }
    function stopRecording(e) {
        e.preventDefault();
        if (!isRecording) { removeMicButtonStyles(); return; }
        isRecording = false;
        removeMicButtonStyles();
        removeTempRecordingBubble();
        if (mediaRecorder) {
            mediaRecorder.onstop = function() {
                if (audioChunks.length === 0) return;
                var durSec = recordingStartTime ? Math.max(1, Math.ceil((Date.now() - recordingStartTime) / 1000)) : 0;
                var mime = (mediaRecorder.mimeType || 'audio/webm');
                var blob = new Blob(audioChunks, { type: mime });
                var url = URL.createObjectURL(blob);
                renderAudioBubble(url, durSec);
            };
            mediaRecorder.stop();
        }
    }
    function cancelRecording(e) {
        if (!isRecording) return;
        isRecording = false;
        removeMicButtonStyles();
        removeTempRecordingBubble();
        if (mediaRecorder && mediaRecorder.state !== "inactive") mediaRecorder.stop();
    }
    function handleSwipeCancel(e) {
        if (!isRecording || !e.touches || !e.touches.length) return;
        if (startX - e.touches[0].clientX > 30) cancelRecording(e);
    }
    function renderAudioBubble(url, recordedDurationSec) {
        var container = document.querySelector('#chat-messages .p-4');
        if (container) {
            var bubble = document.createElement('div');
            bubble.className = 'flex justify-end mb-2';
            bubble.innerHTML = '<div role="group" aria-label="Voice message from you" class="voice-message-bubble bg-[#939BFB] text-white rounded-full px-3 py-2 flex items-center gap-2 h-11 shadow-sm">' +
                '<button aria-label="Play voice message from you" class="play-btn flex-shrink-0 w-6 h-6 border border-white rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-150 hover:scale-105">' +
                '<svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></button>' +
                '<div class="waveform flex-1 flex items-center justify-center gap-0.5 h-4 max-w-[120px]">' +
                '<div class="wave-bar w-0.5 bg-white/90 rounded-full transition-all duration-300" style="height: 8px; --i: 0"></div>' +
                '<div class="wave-bar w-0.5 bg-white/90 rounded-full transition-all duration-300" style="height: 12px; --i: 1"></div>' +
                '<div class="wave-bar w-0.5 bg-white/90 rounded-full transition-all duration-300" style="height: 6px; --i: 2"></div>' +
                '<div class="wave-bar w-0.5 bg-white/90 rounded-full transition-all duration-300" style="height: 16px; --i: 3"></div>' +
                '<div class="wave-bar w-0.5 bg-white/90 rounded-full transition-all duration-300" style="height: 10px; --i: 4"></div>' +
                '<div class="wave-bar w-0.5 bg-white/90 rounded-full transition-all duration-300" style="height: 14px; --i: 5"></div>' +
                '<div class="wave-bar w-0.5 bg-white/90 rounded-full transition-all duration-300" style="height: 8px; --i: 6"></div>' +
                '<div class="wave-bar w-0.5 bg-white/90 rounded-full transition-all duration-300" style="height: 12px; --i: 7"></div>' +
                '<div class="wave-bar w-0.5 bg-white/90 rounded-full transition-all duration-300" style="height: 6px; --i: 8"></div>' +
                '<div class="wave-bar w-0.5 bg-white/90 rounded-full transition-all duration-300" style="height: 10px; --i: 9"></div>' +
                '</div>' +
                '<span class="duration-text text-white/90 text-xs font-medium flex-shrink-0" style="font-family: \'DM Sans\', \'Karla\', -apple-system, sans-serif;">0:00</span>' +
                '<audio preload="auto" class="hidden"></audio></div>';
            container.appendChild(bubble);
            var audio = bubble.querySelector('audio');
            var durationText = bubble.querySelector('.duration-text');
            var playBtn = bubble.querySelector('.play-btn');
            if (recordedDurationSec && recordedDurationSec > 0 && durationText) {
                var m = Math.floor(recordedDurationSec / 60);
                var s = recordedDurationSec % 60;
                durationText.textContent = m + ':' + (s < 10 ? '0' : '') + s;
            }
            var updateDuration = function() {
                if (!durationText || !audio) return;
                var d = audio.duration;
                if (!isFinite(d) || d <= 0) return;
                var sec = Math.ceil(d);
                var m = Math.floor(sec / 60);
                var s = sec % 60;
                durationText.textContent = m + ':' + (s < 10 ? '0' : '') + s;
            };
            if (audio && url) {
                audio.src = url;
                audio.load();
            }
            if (audio && durationText) {
                audio.addEventListener('loadedmetadata', updateDuration);
                audio.addEventListener('durationchange', updateDuration);
                audio.addEventListener('canplay', updateDuration);
            }
            if (playBtn) playBtn.addEventListener('click', function() { window.toggleVoicePlayback(this); });
            scrollToBottom(true);
            setTimeout(function() { addShAIMessage("Got your voice message! I'm on it — let me find the best options for you."); }, 800);
        }
    }
    window.toggleVoicePlayback = function(button) {
        var container = button && button.closest ? button.closest('.voice-message-bubble') : null;
        if (!container) return;
        var audio = container.querySelector('audio');
        var playIcon = button.querySelector('svg');
        var waveBars = container.querySelectorAll('.wave-bar');
        var durationText = container.querySelector('.duration-text');
        if (!audio) return;
        if (audio.paused) {
            var p = audio.play();
            if (p && p.catch) p.catch(function() {});
            if (playIcon) playIcon.innerHTML = '<path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>';
            waveBars.forEach(function(bar, i) { bar.style.animation = 'wavePulse 1.1s ease-in-out infinite'; bar.style.animationDelay = (i * 0.08) + 's'; });
            var onTime = function() { var r = Math.ceil(audio.duration - audio.currentTime); if (durationText) durationText.textContent = Math.floor(r/60) + ':' + (r%60 < 10 ? '0' : '') + (r%60); };
            var onEnd = function() {
                audio.removeEventListener('timeupdate', onTime); audio.removeEventListener('ended', onEnd);
                if (playIcon) playIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
                waveBars.forEach(function(b) { b.style.animation = 'none'; });
                if (durationText && audio.duration) { var d = Math.ceil(audio.duration); durationText.textContent = Math.floor(d/60) + ':' + (d%60 < 10 ? '0' : '') + (d%60); }
            };
            audio.addEventListener('timeupdate', onTime);
            audio.addEventListener('ended', onEnd);
        } else {
            audio.pause();
            if (playIcon) playIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
            waveBars.forEach(function(b) { b.style.animation = 'none'; });
        }
    };

    micBtns.forEach(function(btn) {
        if (!btn) return;
        btn.addEventListener("mousedown", startRecording);
        btn.addEventListener("touchstart", startRecording);
        btn.addEventListener("mouseup", stopRecording);
        btn.addEventListener("mouseleave", cancelRecording);
        btn.addEventListener("touchend", stopRecording);
        btn.addEventListener("touchcancel", cancelRecording);
        btn.addEventListener("touchmove", handleSwipeCancel);
    });

    if (dragHandleZone && chatDrawer) {
        dragHandleZone.style.userSelect = "none";
        dragHandleZone.style.cursor = "grab";
        dragHandleZone.style.paddingTop = "14px";
        dragHandleZone.style.paddingBottom = "14px";
        dragHandleZone.addEventListener("touchstart", function(e) { isDragging = true; var dragStartY = e.touches[0].clientY; var dragStartH = chatDrawer.getBoundingClientRect().height; chatDrawer.style.transition = "none"; }, { passive: true });
        dragHandleZone.addEventListener("touchmove", function(e) {
            if (!isDragging) return;
            e.preventDefault();
            var dragStartY = e.touches[0].clientY; var dragStartH = chatDrawer.getBoundingClientRect().height;
            var dy = e.touches[0].clientY - dragStartY;
            var bottomOffset = parseFloat(getComputedStyle(chatDrawer).bottom) || 64;
            var maxH = window.innerHeight - bottomOffset - 80;
            var newH = Math.max(80, Math.min(maxH, dragStartH - dy));
            chatDrawer.style.height = newH + "px";
        }, { passive: false });
        dragHandleZone.addEventListener("touchend", function() { if (!isDragging) return; isDragging = false; chatDrawer.style.transition = ""; var h = (chatDrawer.getBoundingClientRect().height / window.innerHeight) * 100; if (h < 30) collapseDrawer(); else chatDrawer.style.height = Math.max(35, Math.min(90, h)) + "vh"; }, { passive: true });
        dragHandleZone.addEventListener("mousedown", function(e) {
            isDragging = true;
            var dragStartY = e.clientY;
            var dragStartH = chatDrawer.getBoundingClientRect().height;
            chatDrawer.style.transition = "none";
            function onMouseMove(ev) {
                if (!isDragging) return;
                var dy = ev.clientY - dragStartY;
                var bottomOffset = parseFloat(getComputedStyle(chatDrawer).bottom) || 64;
                var maxH = window.innerHeight - bottomOffset - 80;
                var newH = Math.max(80, Math.min(maxH, dragStartH - dy));
                chatDrawer.style.height = newH + "px";
            }
            function onMouseUp() {
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
                isDragging = false;
                chatDrawer.style.transition = "";
                var h = (chatDrawer.getBoundingClientRect().height / window.innerHeight) * 100;
                if (h < 30) collapseDrawer();
                else chatDrawer.style.height = Math.max(35, Math.min(90, h)) + "vh";
            }
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        });
    }

    window.toggleWishlist = function(button, productId) {
        if (!button) return;
        var heartIcon = button.querySelector('svg');
        if (wishlistItems.has(productId)) { wishlistItems.delete(productId); if (heartIcon) { heartIcon.classList.remove('heart-filled'); heartIcon.setAttribute('fill', 'none'); } }
        else { wishlistItems.add(productId); if (heartIcon) { heartIcon.classList.add('heart-filled'); heartIcon.setAttribute('fill', '#939BFB'); } }
    };
    window.shareProduct = function(productName, price, productUrl, productId, brand) {
        var base = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
        var id = productId || (productName || '').toLowerCase().replace(/\s+/g, '-');
        var shareUrl = productUrl || (base + 'Product_details_page.html?id=' + encodeURIComponent(id) + (productName ? '&name=' + encodeURIComponent(productName) : '') + (brand ? '&brand=' + encodeURIComponent(brand) : ''));
        var shareData = { title: (productName || 'Product') + (brand ? ' by ' + brand : ''), text: 'Check out this ' + (productName || 'item') + (price ? ' for ' + price : '') + ' on GoShopMe', url: shareUrl };
        if (navigator.share) navigator.share(shareData).catch(function() { if (navigator.clipboard) navigator.clipboard.writeText(shareData.text + ' - ' + shareData.url); });
        else if (navigator.clipboard) navigator.clipboard.writeText(shareData.text + ' - ' + shareData.url);
    };
});

})();


