/**
 * shai-chat.js â€” Self-contained ShAI Chat System
 * Drop <script src="js/shai-chat.js"></script> into any GoShopMe screen.
 * The script injects the overlay, drawer, and collapsed input bar,
 * then wires up all interactions: text, image/video, voice recording,
 * drag-to-resize, add-friend, and ShAI contextual replies.
 */
(function () {
  'use strict';

  const SHAI_AVATAR = 'https://raw.githubusercontent.com/nora-todorova/GoShopMe-assets/main/assets/shai-avatar.png';

  /* â”€â”€ Skip if a full drawer already exists on this page â”€â”€ */
  function removeExistingChat() {
    var ids = ['chat-drawer', 'chat-overlay', 'chat-input-bar', 'shai-chat-drawer', 'shai-chat-drawer-wrapper', 'chat-drawer-wrapper'];
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.parentNode) el.parentNode.removeChild(el);
    });
    var bar = document.querySelector('#chat-input-collapsed, [id$="chat-input-bar"]');
    if (bar && bar.parentNode) bar.parentNode.removeChild(bar);
  }

  /* -------------------------------------------------------
     1. INJECT HTML
     ------------------------------------------------------- */
  function inject() {
    removeExistingChat();

    const html = `
<!-- ShAI overlay -->
<div id="chat-overlay" class="shai-injected fixed inset-0 bg-black/40 z-40 hidden"></div>

<!-- ShAI drawer -->
<div id="chat-drawer"
     class="shai-injected fixed left-1/2 -translate-x-1/2 w-full max-w-[390px]
            bg-white rounded-t-3xl shadow-2xl h-[50vh]
            transform translate-y-full transition-transform duration-300
            flex flex-col border-t border-gray-100"
     style="max-height:calc(100dvh - 144px)">

  <!-- Drag handle -->
  <div id="drag-handle-zone"
       class="chat-drawer-drag-zone flex justify-center flex-shrink-0"
       style="touch-action:none;user-select:none;padding-top:14px;padding-bottom:14px;cursor:grab">
    <div class="w-10 h-1 bg-gray-300 rounded-full pointer-events-none"></div>
  </div>

  <!-- Header -->
  <div class="flex items-center px-4 pb-2 flex-shrink-0">
    <button id="shai-friend-back" class="hidden w-8 h-8 flex items-center justify-center mr-2 hover:opacity-70 transition-opacity" aria-label="Back to chat">
      <svg class="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/></svg>
    </button>
    <div id="shai-avatar-wrap" class="w-8 h-8 rounded-full overflow-hidden mr-3 flex-shrink-0">
      <img class="w-full h-full object-cover" src="${SHAI_AVATAR}" alt="ShAI" data-shai-avatar>
    </div>
    <div class="flex-1">
      <p id="shai-header-title" class="font-semibold text-black text-sm">ShAI</p>
      <p id="shai-header-sub" class="text-xs text-gray-500">Your shopping assistant</p>
    </div>
  </div>

  <!-- Chat messages -->
  <div id="shai-messages" class="flex-1 overflow-y-auto min-h-0" style="overscroll-behavior:contain">
    <div class="p-4 pb-0">
      <div class="flex items-start space-x-3 mb-4">
        <div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          <img class="w-full h-full object-cover" src="${SHAI_AVATAR}" alt="ShAI" data-shai-avatar>
        </div>
        <div class="flex-1">
          <div class="bg-gray-50 rounded-2xl rounded-tl-md p-3 mb-3">
            <p class="text-sm text-black">Hi there! I'm ShAI, your personal shopping assistant. How can I help you find the perfect items today?</p>
          </div>
        </div>
      </div>
    </div>
  </div>


  <!-- Add Friend panel (hidden by default) -->
  <div id="shai-friend-panel" class="hidden flex-col flex-1 min-h-0 overflow-hidden">
    <div class="px-4 py-2 border-b border-gray-100 flex-shrink-0">
      <div class="relative">
        <svg class="absolute left-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        <input type="text" id="shai-friend-search" placeholder="Search contacts..." class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 pl-10 text-sm">
      </div>
    </div>
    <div id="shai-friend-list" class="flex-1 overflow-y-auto p-4 space-y-2" style="overscroll-behavior:contain"></div>
  </div>

  <!-- Drawer input -->
  <div class="bg-white border-t border-gray-100 p-4 flex-shrink-0">
    <div class="flex items-center gap-2 bg-white rounded-2xl border border-gray-200 px-4 py-3 shadow-sm">
      <button id="shai-cam-drawer" class="hover:opacity-70 transition-opacity" aria-label="Image/video">
        <svg class="w-[18px] h-[18px] text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"/>
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"/>
        </svg>
      </button>
      <textarea id="shai-input-drawer" rows="1" placeholder="Message ShAI..."
        class="flex-1 bg-transparent outline-none text-black placeholder-gray-500 resize-none min-h-[24px] max-h-[144px] overflow-y-auto"
        style="font-family:inherit;font-size:14px"></textarea>
      <button id="shai-add-drawer" class="hover:opacity-70 transition-opacity" aria-label="Add friend">
        <svg class="w-[18px] h-[18px] text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"/>
        </svg>
      </button>
      <button id="shai-mic-drawer" class="hover:opacity-70 transition-opacity" aria-label="Voice">
        <svg class="w-[18px] h-[18px] text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"/>
        </svg>
      </button>
      <button id="shai-send-drawer" class="text-[#939BFB] hidden hover:opacity-70 transition-opacity" aria-label="Send">
        <svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>
        </svg>
      </button>
    </div>
  </div>
</div>

<!-- Collapsed input bar -->
<div id="chat-input-bar"
     class="shai-injected fixed left-1/2 -translate-x-1/2 w-full max-w-[390px]
            bg-white border-t border-gray-100 p-4 z-30">
  <div class="flex items-center gap-2 bg-white rounded-2xl border border-gray-200 px-4 py-3 shadow-sm">
    <button id="shai-cam-bar" class="hover:opacity-70 transition-opacity" aria-label="Image/video">
      <svg class="w-[18px] h-[18px] text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"/>
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"/>
      </svg>
    </button>
    <textarea id="shai-input-bar" rows="1" placeholder="Message ShAI..."
      class="flex-1 bg-transparent outline-none text-black placeholder-gray-500 resize-none min-h-[24px] max-h-[144px] overflow-y-auto"
      style="font-family:inherit;font-size:14px"></textarea>
    <button id="shai-add-bar" class="hover:opacity-70 transition-opacity" aria-label="Add friend">
      <svg class="w-[18px] h-[18px] text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"/>
      </svg>
    </button>
    <button id="shai-mic-bar" class="hover:opacity-70 transition-opacity" aria-label="Voice">
      <svg class="w-[18px] h-[18px] text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"/>
      </svg>
    </button>
    <button id="shai-send-bar" class="text-[#939BFB] hidden hover:opacity-70 transition-opacity" aria-label="Send">
      <svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>
      </svg>
    </button>
  </div>
</div>`;

    /* Dock: chat drawer and input bar must sit above the bottom nav. Set variable immediately. */
    if (!document.getElementById('shai-dock-rule')) {
      var ds = document.createElement('style');
      ds.id = 'shai-dock-rule';
      ds.textContent = '#chat-drawer,#chat-input-bar{bottom:var(--shai-nav-h,64px)!important;z-index:45}#chat-input-bar{z-index:35}';
      document.head.appendChild(ds);
      document.documentElement.style.setProperty('--shai-nav-h', '64px');
    }

    document.body.insertAdjacentHTML('beforeend', html);
    document.body.classList.add('shai-ready');
  }

  /* -------------------------------------------------------
     2. INIT LOGIC (runs after HTML is injected)
     ------------------------------------------------------- */
  function init() {
    const drawer      = document.getElementById('chat-drawer');
    const overlay     = document.getElementById('chat-overlay');
    const inputBar    = document.getElementById('chat-input-bar');
    const messages    = document.getElementById('shai-messages');
    const msgContainer = messages ? messages.querySelector('.p-4') : null;

    const inputDrawer = document.getElementById('shai-input-drawer');
    const sendDrawer  = document.getElementById('shai-send-drawer');
    const micDrawer   = document.getElementById('shai-mic-drawer');
    const addDrawer   = document.getElementById('shai-add-drawer');
    const camDrawer   = document.getElementById('shai-cam-drawer');

    const inputBar2   = document.getElementById('shai-input-bar');
    const sendBar     = document.getElementById('shai-send-bar');
    const micBar      = document.getElementById('shai-mic-bar');
    const addBar      = document.getElementById('shai-add-bar');
    const camBar      = document.getElementById('shai-cam-bar');

    const dragZone    = document.getElementById('drag-handle-zone');

    if (!drawer || !overlay || !inputBar) return;

    let isOpen = false, isDragging = false, dragStartY = 0, dragStartH = 0;
    let lastDrawerHeight = 0;
    let isRecording = false, mediaRecorder, audioChunks = [], mediaStream, micDenied = false, startX;

    function getDrawerMaxHeight() {
      var bottomOffset = parseFloat(getComputedStyle(drawer).bottom) || 64;
      return Math.max(80, window.innerHeight - bottomOffset - 80);
    }

    /* Drawer open / close - keep user-selected height when reopening */
    function openDrawer() {
      drawer.classList.remove('translate-y-full');
      overlay.classList.remove('hidden');
      inputBar.classList.add('hidden');
      isOpen = true;
      document.body.style.overflow = 'hidden';
      if (lastDrawerHeight > 0) {
        drawer.style.height = lastDrawerHeight + 'px';
      } else {
        var maxH = getDrawerMaxHeight();
        drawer.style.height = maxH + 'px';
        lastDrawerHeight = maxH;
      }
    }
    function closeDrawer() {
      drawer.classList.add('translate-y-full');
      overlay.classList.add('hidden');
      inputBar.classList.remove('hidden');
      isOpen = false;
      document.body.style.overflow = '';
    }

    /* Restore body overflow on unload/visibility so page never stays frozen */
    function restoreBodyOverflow() {
      if (isOpen) document.body.style.overflow = '';
    }
    window.addEventListener('beforeunload', restoreBodyOverflow);
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') restoreBodyOverflow();
    });

    overlay.addEventListener('click', closeDrawer);

    /* Open drawer when user taps the collapsed bar area */
    inputBar.addEventListener('click', function (e) {
      if (!e.target.closest('button')) openDrawer();
    });

    /* â”€â”€ Auto-grow textarea helper â”€â”€ */
    function autoGrow(ta) {
      ta.style.height = 'auto';
      ta.style.height = Math.min(ta.scrollHeight, 144) + 'px';
    }

    /* â”€â”€ Button visibility based on input content â”€â”€ */
    function updateButtons(input, send, mic, add) {
      if (!input) return;
      var hasText = (input.value || '').trim().length > 0;
      if (send) { if (hasText) send.classList.remove('hidden'); else send.classList.add('hidden'); }
      if (mic) { if (hasText) mic.classList.add('hidden'); else mic.classList.remove('hidden'); }
      if (add) { if (hasText) add.classList.add('hidden'); else add.classList.remove('hidden'); }
    }

    [inputDrawer, inputBar2].forEach(function (ta, i) {
      const send = i === 0 ? sendDrawer : sendBar;
      const mic  = i === 0 ? micDrawer  : micBar;
      const add  = i === 0 ? addDrawer  : addBar;
      if (!ta) return;
      ta.addEventListener('input', function () {
        autoGrow(ta);
        updateButtons(ta, send, mic, add);
        updateButtons(i === 0 ? inputBar2 : inputDrawer, i === 0 ? sendBar : sendDrawer, i === 0 ? micBar : micDrawer, i === 0 ? addBar : addDrawer);
      });
      ta.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendText(ta, send, mic, add, i === 1);
        }
      });
      if (send) send.addEventListener('click', function () { sendText(ta, send, mic, add, i === 1); });
      if (i === 0 && inputDrawer) {
        inputDrawer.addEventListener('focus', function () {
          if (isOpen && drawer) {
            var h = drawer.getBoundingClientRect().height;
            if (h > 0) lastDrawerHeight = h;
            requestAnimationFrame(function () {
              if (lastDrawerHeight > 0) drawer.style.height = lastDrawerHeight + 'px';
            });
          }
        });
      }
    });
    updateButtons(inputDrawer, sendDrawer, micDrawer, addDrawer);
    updateButtons(inputBar2, sendBar, micBar, addBar);

    /* â”€â”€ Scroll to bottom â”€â”€ */
    function scrollBottom() {
      if (messages) requestAnimationFrame(function () { messages.scrollTop = messages.scrollHeight; });
    }

    /* â”€â”€ Add ShAI reply bubble â”€â”€ */
    function shaiReply(text) {
      if (!msgContainer) return;
      const div = document.createElement('div');
      div.className = 'flex items-start space-x-3 mb-4';
      div.innerHTML = '<div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"><img class="w-full h-full object-cover" src="' + SHAI_AVATAR + '" alt="ShAI" data-shai-avatar></div>' +
        '<div class="flex-1"><div class="bg-gray-50 rounded-2xl rounded-tl-md p-3"><p class="text-sm text-black">' + text.replace(/</g, '&lt;') + '</p></div></div>';
      msgContainer.appendChild(div);
      scrollBottom();
    }

    /* â”€â”€ Send text message â”€â”€ */
    function sendText(ta, send, mic, add, openAfter) {
      const text = ta.value.trim();
      if (!text) return;
      if (!msgContainer) return;
      if (openAfter) openDrawer();
      const isExactBagPhrase = /exact\s*bag|find\s+(the\s+)?exact\s+bag/i.test(text);
      const beforeLast = msgContainer.lastElementChild;
      const prevWasUserImage = beforeLast && beforeLast.classList && beforeLast.classList.contains('flex') && beforeLast.classList.contains('justify-end') && beforeLast.querySelector && beforeLast.querySelector('img') && !beforeLast.querySelector('.voice-message-bubble');
      if (isExactBagPhrase && !prevWasUserImage) {
        window.__waitingForExactBagImage = true;
      } else if (isExactBagPhrase && prevWasUserImage) {
        window.__waitingForExactBagImage = false;
      }
      const div = document.createElement('div');
      div.className = 'flex justify-end mb-4';
      div.innerHTML = '<div class="bg-[#939BFB] text-white rounded-2xl rounded-tr-md p-3 max-w-[80%]"><p class="text-sm break-words whitespace-pre-wrap"></p></div>';
      div.querySelector('p').textContent = text;
      msgContainer.appendChild(div);
      ta.value = ''; autoGrow(ta);
      updateButtons(ta, send, mic, add);
      updateButtons(inputDrawer, sendDrawer, micDrawer, addDrawer);
      updateButtons(inputBar2, sendBar, micBar, addBar);
      scrollBottom();
      setTimeout(function () {
        if (window.ShaiFlow && typeof window.ShaiFlow.handleUserReply === 'function' && window.ShaiFlow.handleUserReply(text, msgContainer, shaiReply, scrollBottom)) {
          return;
        }
        shaiReply("Perfect! Let me help you find exactly what you're looking for.");
      }, 1000);
    }

    /* â”€â”€ Smart prompt chips â”€â”€ */
    /* Prompt chips removed - no click handler */

    /* â”€â”€ Camera / file picker â”€â”€ */
    function pickFile(openFirst) {
      if (openFirst) openDrawer();
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*,video/*';
      input.onchange = function (e) {
        const file = e.target.files && e.target.files[0];
        if (!file || !msgContainer) return;
        const url = URL.createObjectURL(file);
        const div = document.createElement('div');
        div.className = 'flex justify-end mb-4';
        if (file.type.startsWith('image/')) {
          div.innerHTML = '<div class="rounded-2xl border border-[#939BFB] max-w-[60%] overflow-hidden shadow-sm"><img src="' + url + '" class="w-full h-auto"></div>';
          msgContainer.appendChild(div);
          scrollBottom();
          var waitingForBag = window.__waitingForExactBagImage === true;
          if (waitingForBag && window.ShaiFlow && typeof window.ShaiFlow.runExternalSearchScenario === 'function') {
            window.__waitingForExactBagImage = false;
            setTimeout(function () { window.ShaiFlow.runExternalSearchScenario(msgContainer, shaiReply, scrollBottom); }, 800);
          } else {
            var isHome = (typeof window.location !== 'undefined' && ((window.location.pathname || '').indexOf('Home') >= 0 || (window.location.href || '').indexOf('Home') >= 0));
            if (isHome && window.ShaiFlow && typeof window.ShaiFlow.runAfterUpload === 'function') {
              window.ShaiFlow.runAfterUpload(msgContainer, shaiReply, scrollBottom);
            } else {
              setTimeout(function () { shaiReply("I can see your image! Let me find similar products for you."); }, 1500);
            }
          }
        } else {
          div.innerHTML = '<div class="rounded-2xl border border-[#939BFB] max-w-[60%] overflow-hidden shadow-sm"><video src="' + url + '" controls class="w-full h-auto"></video></div>';
          msgContainer.appendChild(div);
          scrollBottom();
          setTimeout(function () { shaiReply("Got your video! Let me analyze it and find matching products."); }, 1500);
        }
      };
      input.click();
    }
    if (camDrawer) camDrawer.addEventListener('click', function () { pickFile(false); });
    if (camBar) camBar.addEventListener('click', function () { pickFile(true); });

    /* â”€â”€ Voice recording â”€â”€ */
    function setupMic(btn) {
      btn.addEventListener('mousedown', startRec);
      btn.addEventListener('touchstart', startRec, { passive: false });
      btn.addEventListener('mouseup', stopRec);
      btn.addEventListener('touchend', stopRec);
      btn.addEventListener('mouseleave', cancelRec);
      btn.addEventListener('touchcancel', cancelRec);
      btn.addEventListener('touchmove', function (e) {
        if (!isRecording || !e.touches) return;
        if (startX - e.touches[0].clientX > 30) cancelRec.call(btn, e);
      });
    }
    if (micDrawer) setupMic(micDrawer);
    if (micBar) setupMic(micBar);

    async function startRec(e) {
      e.preventDefault();
      if (!isOpen) { openDrawer(); return; }
      if (micDenied) { showToast('Microphone access denied.'); return; }
      startX = e.touches ? e.touches[0].clientX : e.clientX;
      removeTempBubble();
      try {
        if (!mediaStream || !mediaStream.active) mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(mediaStream);
        isRecording = true; audioChunks = [];
        mediaRecorder.ondataavailable = function (ev) { if (ev.data.size > 0) audioChunks.push(ev.data); };
        mediaRecorder.start();
        this.classList.add('scale-110', 'ring-2', 'ring-[#939BFB]', 'ring-offset-2');
        if (msgContainer) {
          const t = document.createElement('div');
          t.id = 'shai-temp-rec'; t.className = 'flex justify-end mb-2';
          t.innerHTML = '<div class="flex items-center bg-[#939BFB] text-white rounded-2xl px-3 py-2 max-w-[70%]"><svg class="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"/></svg><span class="text-xs">Recording... swipe left to cancel</span></div>';
          msgContainer.appendChild(t); scrollBottom();
        }
      } catch (err) {
        removeTempBubble();
        if (err.name === 'NotAllowedError') { micDenied = true; showToast('Microphone access denied.'); }
        else showToast('Could not access microphone.');
      }
    }
    function stopRec(e) {
      e.preventDefault();
      if (!isRecording) return;
      isRecording = false;
      this.classList.remove('scale-110', 'ring-2', 'ring-[#939BFB]', 'ring-offset-2');
      removeTempBubble();
      if (mediaRecorder) {
        mediaRecorder.stop();
        mediaRecorder.onstop = function () {
          const blob = new Blob(audioChunks, { type: 'audio/webm' });
          renderAudio(URL.createObjectURL(blob));
        };
      }
    }
    function cancelRec(e) {
      if (!isRecording) return;
      isRecording = false;
      this.classList.remove('scale-110', 'ring-2', 'ring-[#939BFB]', 'ring-offset-2');
      removeTempBubble();
      if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop();
    }
    function removeTempBubble() { const t = document.getElementById('shai-temp-rec'); if (t) t.remove(); }

    function renderAudio(url) {
      if (!msgContainer) return;
      const div = document.createElement('div');
      div.className = 'flex justify-end mb-2';
      div.innerHTML = '<div class="voice-message-bubble bg-[#939BFB] text-white rounded-full px-3 py-2 flex items-center gap-2 h-11 shadow-sm">' +
        '<button class="play-btn flex-shrink-0 w-6 h-6 border border-white rounded-full flex items-center justify-center hover:bg-white/20" onclick="window.shaiToggleAudio(this,\'' + url + '\')">' +
        '<svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></button>' +
        '<div class="waveform flex items-center gap-0.5 h-4 max-w-[100px]">' +
        [8,12,6,16,10,14,8,12,6,10].map(function(h,i){return '<div class="wave-bar w-0.5 bg-white/90 rounded-full" style="height:'+h+'px"></div>';}).join('') +
        '</div><span class="duration-text text-white/90 text-xs font-medium flex-shrink-0">0:00</span>' +
        '<audio src="' + url + '" preload="auto" class="hidden"></audio></div>';
      const audio = div.querySelector('audio');
      audio.addEventListener('loadedmetadata', function () {
        const s = Math.ceil(audio.duration);
        div.querySelector('.duration-text').textContent = Math.floor(s/60) + ':' + String(s%60).padStart(2,'0');
      });
      msgContainer.appendChild(div); scrollBottom();
      if (window.ShaiFlow && typeof window.ShaiFlow.runVoiceBudgetScenario === 'function') {
        setTimeout(function () { window.ShaiFlow.runVoiceBudgetScenario(msgContainer, shaiReply, scrollBottom); }, 800);
      } else {
        setTimeout(function () { shaiReply("Got your voice message! Let me find the best options for you."); }, 800);
      }
    }

    window.shaiToggleAudio = function (btn, url) {
      const wrap = btn.closest('.voice-message-bubble');
      const audio = wrap.querySelector('audio');
      const bars = wrap.querySelectorAll('.wave-bar');
      const dur = wrap.querySelector('.duration-text');
      if (audio.paused) {
        audio.play();
        btn.querySelector('svg').innerHTML = '<path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>';
        bars.forEach(function (b, i) { b.style.animation = 'shaiWave 1.1s ease-in-out infinite'; b.style.animationDelay = (i*0.08)+'s'; });
        audio.ontimeupdate = function () { var r=Math.ceil(audio.duration-audio.currentTime); dur.textContent=Math.floor(r/60)+':'+String(r%60).padStart(2,'0'); };
        audio.onended = function () { btn.querySelector('svg').innerHTML='<path d="M8 5v14l11-7z"/>'; bars.forEach(function(b){b.style.animation='none';}); };
      } else {
        audio.pause();
        btn.querySelector('svg').innerHTML = '<path d="M8 5v14l11-7z"/>';
        bars.forEach(function (b) { b.style.animation = 'none'; });
      }
    };

    /* â”€â”€ Drag to resize â”€â”€ */
    dragZone.addEventListener('touchstart', function (e) {
      isDragging = true; dragStartY = e.touches[0].clientY;
      dragStartH = drawer.getBoundingClientRect().height;
      drawer.style.transition = 'none';
    }, { passive: true });

    dragZone.addEventListener('touchmove', function (e) {
      if (!isDragging) return;
      e.preventDefault();
      const bottomOffset = parseFloat(getComputedStyle(drawer).bottom) || 64;
      const maxH = window.innerHeight - bottomOffset - 80;
      const newH = Math.max(80, Math.min(maxH, dragStartH - (e.touches[0].clientY - dragStartY)));
      drawer.style.height = newH + 'px';
      lastDrawerHeight = newH;
    }, { passive: false });

    function endDrag() {
      if (!isDragging) return;
      isDragging = false;
      drawer.style.transition = '';
      var currentH = drawer.getBoundingClientRect().height;
      lastDrawerHeight = currentH;
      const h = currentH / window.innerHeight * 100;
      if (h < 25) closeDrawer();
    }
    dragZone.addEventListener('touchend', endDrag, { passive: true });
    dragZone.addEventListener('touchcancel', endDrag, { passive: true });

    dragZone.addEventListener('mousedown', function (e) {
      isDragging = true; dragStartY = e.clientY; dragStartH = drawer.getBoundingClientRect().height;
      drawer.style.transition = 'none';
      function mm(ev) { if (!isDragging) return; var maxH=getDrawerMaxHeight(); var newH=Math.max(80,Math.min(maxH,dragStartH-(ev.clientY-dragStartY))); drawer.style.height=newH+'px'; lastDrawerHeight=newH; }
      function mu() { document.removeEventListener('mousemove',mm); document.removeEventListener('mouseup',mu); endDrag(); }
      document.addEventListener('mousemove', mm);
      document.addEventListener('mouseup', mu);
    });

    /* â”€â”€ Toast helper â”€â”€ */
    function showToast(msg) {
      var t = document.createElement('div');
      t.style.cssText = 'position:fixed;bottom:120px;left:50%;transform:translateX(-50%);background:#333;color:#fff;padding:8px 16px;border-radius:20px;font-size:13px;z-index:9999;max-width:80vw;text-align:center';
      t.textContent = msg;
      document.body.appendChild(t);
      setTimeout(function () { t.remove(); }, 3500);
    }

    /* â”€â”€ Inject wave animation keyframes â”€â”€ */

    /* -- Add-friend panel -- */
    var friendPanel = document.getElementById('shai-friend-panel');
    var friendBackBtn = document.getElementById('shai-friend-back');
    var friendSearch = document.getElementById('shai-friend-search');
    var friendList = document.getElementById('shai-friend-list');
    var avatarWrap = document.getElementById('shai-avatar-wrap');
    var drawerHeaderTitle = document.getElementById('shai-header-title');
    var drawerHeaderSub = document.getElementById('shai-header-sub');
    var isFriendMode = false;

    window.__addFriendContacts = window.__addFriendContacts || [
      { name: 'Alex Johnson', phone: '+1 (555) 123-4567', goshopme: true, avatar: 'https://raw.githubusercontent.com/nora-todorova/GoShopMe-assets/main/assets/avatars/avatar-2.jpg' },
      { name: 'Maria Rodriguez', phone: '+1 (555) 987-6543', goshopme: false },
      { name: 'David Kim', phone: '+1 (555) 456-7890', goshopme: true, avatar: 'https://raw.githubusercontent.com/nora-todorova/GoShopMe-assets/main/assets/avatars/avatar-3.jpg' },
      { name: 'Sarah Thompson', phone: '+1 (555) 234-5678', goshopme: false },
      { name: 'Emma Wilson', phone: '+1 (555) 345-6789', goshopme: true, avatar: 'https://raw.githubusercontent.com/nora-todorova/GoShopMe-assets/main/assets/avatars/avatar-5.jpg' },
      { name: 'Michael Brown', phone: '+1 (555) 678-9012', goshopme: false },
      { name: 'Jennifer Lee', phone: '+1 (555) 789-0123', goshopme: true, avatar: 'https://raw.githubusercontent.com/nora-todorova/GoShopMe-assets/main/assets/avatars/avatar-6.jpg' }
    ];

    function getFriendInitials(name) {
      var parts = (name || '').trim().split(/\s+/);
      return parts.length >= 2 ? (parts[0][0] + parts[1][0]).toUpperCase() : (parts[0] ? parts[0].slice(0, 2) : '??').toUpperCase();
    }

    function renderFriendContacts(query) {
      if (!friendList) return;
      var list = (window.__addFriendContacts || []).filter(function(c) {
        if (!query) return true;
        return (c.name || '').toLowerCase().indexOf(query.toLowerCase()) >= 0 || (c.phone || '').indexOf(query) >= 0;
      });
      if (!list.length) { friendList.innerHTML = '<div class="text-center text-sm text-gray-400 py-8">No contacts found</div>'; return; }
      friendList.innerHTML = list.map(function(c, i) {
        var initials = getFriendInitials(c.name);
        var avatarHtml = (c.goshopme && c.avatar)
          ? '<div class="w-8 h-8 rounded-full overflow-hidden flex-shrink-0"><img src="' + c.avatar + '" alt="" class="w-full h-full object-cover"></div>'
          : '<div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0"><span class="text-gray-600 font-medium text-xs">' + initials + '</span></div>';
        var btnClass = c.goshopme
          ? 'bg-[#939BFB] text-white px-2 py-1 rounded-full text-xs font-medium flex-shrink-0'
          : 'bg-white text-[#939BFB] px-2 py-1 rounded-full text-xs font-medium border border-[#939BFB] flex-shrink-0';
        var btnLabel = c.goshopme ? 'Add' : 'Invite';
        return '<div class="contact-item flex items-center gap-2 p-2 bg-gray-50 rounded-xl" data-idx="' + i + '" data-name="' + (c.name||'').replace(/"/g,'&quot;') + '" data-phone="' + (c.phone||'').replace(/"/g,'&quot;') + '" data-goshopme="' + (c.goshopme?'true':'false') + '">' + avatarHtml + '<div class="flex-1 min-w-0"><p class="font-medium text-sm text-black truncate">' + (c.name || '').replace(/</g, '&lt;') + '</p><p class="text-xs text-gray-500 truncate">' + (c.phone || '').replace(/</g, '&lt;') + '</p></div><button class="shai-friend-action ' + btnClass + '">' + btnLabel + '</button></div>';
      }).join('');
      friendList.querySelectorAll('.shai-friend-action').forEach(function(btn) {
        btn.addEventListener('click', function() {
          var idx = parseInt(btn.closest('[data-idx]').getAttribute('data-idx'), 10);
          var contact = list[idx];
          var firstName = contact ? (contact.name || '').split(' ')[0] : 'Contact';
          if (btn.textContent.trim() === 'Add') {
            if (msgContainer) {
              var note = document.createElement('div');
              note.className = 'flex justify-center mb-4';
              note.innerHTML = '<div class="bg-green-100 text-green-800 px-4 py-2 rounded-full text-xs font-medium">' + firstName + ' has been added to the chat</div>';
              msgContainer.appendChild(note);
              scrollBottom();
            }
            hideFriendPanel();
            if (window.ShaiFlow && typeof window.ShaiFlow.runAddFriendScenario === 'function') {
              var friendFullName = (contact && contact.name) ? contact.name : firstName;
              var friendAvatar = (contact && contact.avatar) ? contact.avatar : '';
              window.ShaiFlow.runAddFriendScenario(msgContainer, friendFullName, shaiReply, scrollBottom, friendAvatar);
            }
          } else {
            var shareData = { title: 'Join me on GoShopMe', text: "Hey! I'm using GoShopMe. It's faster, smarter and effortless - join me", url: 'https://app.goshopme.ai' };
            if (navigator.share) {
              navigator.share(shareData).catch(function() {
                if (navigator.clipboard) navigator.clipboard.writeText(shareData.text + ' ' + shareData.url);
              });
            } else if (navigator.clipboard) {
              navigator.clipboard.writeText(shareData.text + ' ' + shareData.url);
              showToast('Invitation link copied to clipboard!');
            }
          }
        });
      });
    }

    function showFriendPanel() {
      isFriendMode = true;
      if (!isOpen) openDrawer();
      if (messages) messages.classList.add('hidden');
      if (friendPanel) { friendPanel.classList.remove('hidden'); friendPanel.classList.add('flex'); }
      if (friendBackBtn) friendBackBtn.classList.remove('hidden');
      if (avatarWrap) avatarWrap.classList.add('hidden');
      if (drawerHeaderTitle) drawerHeaderTitle.textContent = 'Add Friend';
      if (drawerHeaderSub) drawerHeaderSub.textContent = 'Choose contacts to add';
      if (friendSearch) friendSearch.value = '';
      renderFriendContacts('');
    }
    function hideFriendPanel() {
      isFriendMode = false;
      if (messages) messages.classList.remove('hidden');
      if (friendPanel) { friendPanel.classList.add('hidden'); friendPanel.classList.remove('flex'); }
      if (friendBackBtn) friendBackBtn.classList.add('hidden');
      if (avatarWrap) avatarWrap.classList.remove('hidden');
      if (drawerHeaderTitle) drawerHeaderTitle.textContent = 'ShAI';
      if (drawerHeaderSub) drawerHeaderSub.textContent = 'Your shopping assistant';
    }
    if (friendBackBtn) friendBackBtn.addEventListener('click', hideFriendPanel);
    if (friendSearch) friendSearch.addEventListener('input', function() { renderFriendContacts(friendSearch.value); });
    if (addDrawer) addDrawer.addEventListener('click', showFriendPanel);
    if (addBar) addBar.addEventListener('click', function() { showFriendPanel(); });

        /* -- Dock: set --shai-nav-h to nav height so drawer/input bar sit above bottom nav (nav stays z-50 on top) -- */
    (function() {
      var nav = document.getElementById('bottom-navigation') || document.getElementById('bottom-nav') ||
                document.querySelector('nav[id$="-navigation"]') || document.querySelector('nav[id$="-nav"]');
      var dockDrawer = document.getElementById('chat-drawer');
      var dockBar = document.getElementById('chat-input-bar');
      var minBottom = 56;

      function applyDock() {
        var navH = nav ? nav.getBoundingClientRect().height : 0;
        var bottomVal = Math.max(navH > 0 ? navH : 64, minBottom);
        var bottomPx = bottomVal + 'px';
        document.documentElement.style.setProperty('--shai-nav-h', bottomPx);
        if (dockDrawer) { dockDrawer.style.setProperty('bottom', bottomPx, 'important'); }
        if (dockBar) { dockBar.style.setProperty('bottom', bottomPx, 'important'); }
      }

      applyDock();
      if (nav) {
        if (window.ResizeObserver) {
          var ro = new ResizeObserver(function() { applyDock(); });
          ro.observe(nav);
        }
        setTimeout(applyDock, 0);
        setTimeout(applyDock, 100);
        setTimeout(applyDock, 400);
      }
      window.addEventListener('load', applyDock);
      window.addEventListener('resize', applyDock);
    })();
    if (!document.getElementById('shai-wave-css')) {
      var s = document.createElement('style');
      s.id = 'shai-wave-css';
      s.textContent = '@keyframes shaiWave{0%,100%{transform:scaleY(1)}50%{transform:scaleY(2)}}';
      document.head.appendChild(s);
    }
  }

  /* â”€â”€ Run on DOM ready â”€â”€ */
  function run() {
    inject();
    init();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

})();
