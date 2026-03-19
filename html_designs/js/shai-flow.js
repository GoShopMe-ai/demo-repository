/**
 * shai-flow.js - Scenario 1: Photo upload + outfit reconstruction (Home screen only)
 * runAfterUpload: typing indicator -> "I found the key pieces" -> hero + supporting products -> follow-up
 */
(function () {
  'use strict';

  var SHAI_AVATAR = 'https://raw.githubusercontent.com/nora-todorova/GoShopMe-assets/main/assets/shai-avatar.png';

  var SCENARIO1_HERO = {
    id: 'zimmermann-crush-leopard-midi-dress',
    name: 'Crush leopard-print linen-blend midi dress',
    brand: 'ZIMMERMANN',
    price: 1125,
    originalPrice: 2250,
    image: 'https://cdn11.bigcommerce.com/s-mqq1i1xa2c/images/stencil/1280x1280/products/209712/5766729/20913_MIAL_1__37257.1732897199.jpg?c=1',
    description: 'Leopard print, adjustable crystal-embellished shoulder straps, crystal-embellished sweetheart neck, boned bodice, lightly padded cups, belt loops, detachable adjustable belt with bow embellishment, side slip pockets, smocked panel at back, gathered details, curved hem, partially lined. Concealed zip fastening at back. 55% linen, 45% silk; lining: 100% cotton. Dry clean.'
  };

  var SCENARIO1_SUPPORTING = [
    {
      id: 'jacquemus-le-bisou-ceinture-shoulder-bag',
      name: 'Le Bisou Ceinture Shoulder Bag',
      brand: 'Jacquemus',
      price: 592,
      image: 'https://cdn.theluxurycloset.com/uploads/products/250x250/luxury-women-jacquemus-new-handbags-p962576-013.jpg',
      description: 'Crafted from supple red leather with a slim silhouette, subtle gold-tone logo embellishment, and adjustable shoulder strap. Length: 28 cm, Width: 2 cm, Height: 11 cm, Handle drop: 20 cm adjustable.'
    },
    {
      id: 'amina-muaddi-julia-pumps',
      name: 'Julia pumps',
      brand: 'Amina Muaddi',
      price: 714,
      image: 'https://assets.levelshoes.com/cdn-cgi/image/width=720,height=1008,quality=85,format=webp/media/catalog/product/j/u/juliaglasspump-tan_5.jpg?ts=20220731030507',
      description: 'Brown leather and PVC pumps with crystal spike embellishments, slim stiletto heel, adjustable ankle strap, sharp pointed toe, and branded leather insole. Heel height: 9.5 cm.'
    },
    {
      id: 'zimmermann-bloom-large-embellished-drop-earrings',
      name: 'Bloom Large embellished drop earrings',
      brand: 'Zimmermann',
      price: 380,
      image: 'https://www.mytheresa.com/image/1094/1238/100/9e/P01173073.jpg',
      description: 'Gold-tone drop earrings with glass floral-inspired adornments. Material: 12kt gold-plated brass, glass, stainless steel. Butterfly-back fastening. One size.'
    }
  ];

  function formatPrice(val) {
    if (typeof val === 'string' && (val.indexOf('€') !== -1 || val.indexOf('$') !== -1)) return val;
    return (val == null || val === '') ? '' : ('$' + val);
  }
  function renderOutfitMatchGroup(hero, supporting) {
    var heroPrice = formatPrice(hero.price);
    var heroHtml = '<div class="mb-3">' +
      '<a href="Product_details_page.html?id=' + encodeURIComponent(hero.id) + '" class="block rounded-xl border border-gray-200 overflow-hidden hover:border-[#939BFB] transition-colors">' +
      '<div class="max-h-40 flex items-center justify-center bg-gray-50"><img src="' + hero.image + '" alt="" class="max-w-full max-h-40 w-auto h-auto object-contain"></div><div class="p-3"><p class="font-medium text-sm text-black">' + (hero.name || '').replace(/</g, '&lt;') + '</p>' +
      '<p class="text-xs text-gray-500">' + (hero.brand || '').replace(/</g, '&lt;') + '</p><p class="text-sm font-semibold text-[#939BFB]">' + heroPrice + '</p></div></a></div>';
    var supportHtml = '<div class="flex gap-2 overflow-x-auto pb-2 -mx-1" style="scrollbar-width:none;-ms-overflow-style:none">' +
      (supporting || []).map(function (p) {
        var pPrice = formatPrice(p.price);
        return '<a href="Product_details_page.html?id=' + encodeURIComponent(p.id) + '" class="flex-shrink-0 w-24 rounded-lg border border-gray-200 overflow-hidden hover:border-[#939BFB] transition-colors">' +
          '<img src="' + (p.image || '') + '" alt="" class="w-full aspect-square object-cover">' +
          '<div class="p-1.5"><p class="text-xs font-medium text-black truncate">' + (p.name || '').replace(/</g, '&lt;') + '</p>' +
          '<p class="text-xs text-[#939BFB] font-medium">' + pPrice + '</p></div></a>';
      }).join('') + '</div>';
    return '<div class="outfit-match-group space-y-2">' + heroHtml + supportHtml + '</div>';
  }

  var TYPING_MESSAGE = 'Analyzing thousands of products to find the best match in your size at the best price…';
  var TYPING_CHAR_MS = 20;

  function addTypingIndicator(container) {
    if (!container) return null;
    var div = document.createElement('div');
    div.className = 'flex items-start space-x-3 mb-4 shai-typing-indicator';
    div.innerHTML = '<div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"><img class="w-full h-full object-cover" src="' + SHAI_AVATAR + '" alt="ShAI"></div>' +
      '<div class="flex-1"><div class="bg-gray-50 rounded-2xl rounded-tl-md p-3 inline-block text-xs text-gray-700 max-w-xs">' +
      '<span class="shai-typing-text"></span><span class="shai-typing-cursor" style="display:inline-block;width:2px;height:1em;background:#939BFB;margin-left:1px;vertical-align:text-bottom;animation:shai-cursor-blink 0.8s ease-in-out infinite"></span>' +
      '</div></div>';
    container.appendChild(div);
    var textEl = div.querySelector('.shai-typing-text');
    if (!textEl) return div;
    var cursorEl = div.querySelector('.shai-typing-cursor');
    var idx = 0;
    var tid = setInterval(function () {
      if (idx >= TYPING_MESSAGE.length) {
        clearInterval(tid);
        div._shaiTypingDone = true;
        return;
      }
      textEl.textContent += TYPING_MESSAGE.charAt(idx);
      idx++;
    }, TYPING_CHAR_MS);
    div._shaiTypingTimer = tid;
    if (!document.getElementById('shai-typing-styles')) {
      var style = document.createElement('style');
      style.id = 'shai-typing-styles';
      style.textContent = '@keyframes shai-cursor-blink{0%,50%{opacity:1}51%,100%{opacity:0}}';
      document.head.appendChild(style);
    }
    return div;
  }

  function removeTypingIndicator() {
    var el = document.querySelector('.shai-typing-indicator');
    if (el) {
      if (el._shaiTypingTimer) clearInterval(el._shaiTypingTimer);
      if (el.parentNode) el.parentNode.removeChild(el);
    }
  }

  function addTypingIndicatorWithMessage(container, message, charMs) {
    if (!container || !message) return null;
    var div = document.createElement('div');
    div.className = 'flex items-start space-x-3 mb-4 shai-typing-indicator';
    div.innerHTML = '<div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"><img class="w-full h-full object-cover" src="' + SHAI_AVATAR + '" alt="ShAI"></div>' +
      '<div class="flex-1"><div class="bg-gray-50 rounded-2xl rounded-tl-md p-3 inline-block text-xs text-gray-700 max-w-xs">' +
      '<span class="shai-typing-text"></span><span class="shai-typing-cursor" style="display:inline-block;width:2px;height:1em;background:#939BFB;margin-left:1px;vertical-align:text-bottom;animation:shai-cursor-blink 0.8s ease-in-out infinite"></span>' +
      '</div></div>';
    container.appendChild(div);
    var textEl = div.querySelector('.shai-typing-text');
    if (!textEl) return div;
    var idx = 0;
    var ms = typeof charMs === 'number' && charMs > 0 ? charMs : 20;
    var tid = setInterval(function () {
      if (idx >= message.length) { clearInterval(tid); div._shaiTypingDone = true; return; }
      textEl.textContent += message.charAt(idx);
      idx++;
    }, ms);
    div._shaiTypingTimer = tid;
    if (!document.getElementById('shai-typing-styles')) {
      var style = document.createElement('style');
      style.id = 'shai-typing-styles';
      style.textContent = '@keyframes shai-cursor-blink{0%,50%{opacity:1}51%,100%{opacity:0}}';
      document.head.appendChild(style);
    }
    return div;
  }

  /** Scenario 2: red shoe from existing catalog (Christopher Esber Blaze leather sandals - id 6) */
  var SCENARIO2_RED_SHOE = {
    id: '6',
    name: 'Blaze leather sandals',
    brand: 'CHRISTOPHER ESBER',
    price: '€ 750',
    priceNum: 750,
    image: 'https://raw.githubusercontent.com/nora-todorova/GoShopMe-assets/main/catalog/p6_0.jpg',
    description: 'Christopher Esber\'s designs offer a contemporary take on minimalism. The Blaze leather sandals feature slim straps and sleek stiletto heels. Color: red.'
  };

  function addFriendMessage(container, friendName, text, scrollChat, friendAvatarUrl) {
    if (!container) return;
    var firstName = (friendName || '').trim().split(/\s+/)[0] || 'Friend';
    var safeText = (text || '').replace(/</g, '&lt;').replace(/"/g, '&quot;');
    var avatarUrl = (typeof friendAvatarUrl === 'string' && friendAvatarUrl) ? friendAvatarUrl : '';
    var avatarHtml = avatarUrl
      ? '<div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"><img src="' + avatarUrl.replace(/"/g, '&quot;') + '" alt="" class="w-full h-full object-cover"></div>'
      : '<div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-[#939BFB]/20 flex items-center justify-center"><svg class="w-5 h-5 text-[#939BFB]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg></div>';
    var wrap = document.createElement('div');
    wrap.className = 'flex items-start space-x-3 mb-4';
    wrap.innerHTML = avatarHtml +
      '<div class="flex-1"><div class="bg-[#939BFB]/10 border border-[#939BFB]/30 rounded-2xl rounded-tl-md p-3 inline-block max-w-[85%]"><p class="text-xs font-medium mb-0.5" style="color:#939BFB">' + firstName + '</p><p class="text-sm text-gray-800">' + safeText + '</p></div></div>';
    container.appendChild(wrap);
    if (typeof scrollChat === 'function') scrollChat();
  }

  function renderSingleProductCard(product) {
    if (!product || !product.id) return '';
    var img = (product.image || (product.imageUrls && product.imageUrls[0]) || '').replace(/"/g, '&quot;');
    var name = (product.name || '').replace(/</g, '&lt;');
    var brand = (product.brand || '').replace(/</g, '&lt;');
    var price = product.price || product.priceNum || '';
    if (typeof price === 'number') price = '€ ' + price;
    return '<div class="mb-3">' +
      '<a href="Product_details_page.html?id=' + encodeURIComponent(product.id) + '" class="block rounded-xl border border-gray-200 overflow-hidden hover:border-[#939BFB] transition-colors">' +
      '<div class="max-h-40 flex items-center justify-center bg-gray-50"><img src="' + img + '" alt="" class="max-w-full max-h-40 w-auto h-auto object-contain"></div>' +
      '<div class="p-3"><p class="font-medium text-sm text-black">' + name + '</p><p class="text-xs text-gray-500">' + brand + '</p><p class="text-sm font-semibold text-[#939BFB]">' + (price || '').replace(/</g, '&lt;') + '</p></div></a></div>';
  }

  function isExactBagAsk(text) {
    return typeof text === 'string' && /exact\s*bag|find\s+(the\s+)?exact\s+bag/i.test(text.trim());
  }

  function isAddToShoppingBagAsk(text) {
    if (typeof text !== 'string') return false;
    var t = text.toLowerCase();
    var hasShoppingBag = /shopping\s*bag/i.test(t);
    var hasAdd = /\badd\b/.test(t);
    var hasDress = /dress/i.test(t);
    // "red bag" phrasing (keep a couple flexible variations)
    var hasRedBag = /red\s*(bag|handbag|shoulder\s*bag|tote|leather\s*bag)/i.test(t);
    // "neutral shoes" phrasing (neutral/beige)
    var hasNeutralShoes = /neutral\s*(shoes|shoes|shoe|footwear|pumps|heels|mules)|beige\s*(shoes|shoe|footwear|mules|pumps)/i.test(t);
    // Require all core intents to reduce accidental triggers.
    return hasShoppingBag && hasAdd && hasDress && hasRedBag && hasNeutralShoes;
  }

  function isReturnAssistanceAsk(text) {
    if (typeof text !== 'string') return false;
    var t = text.toLowerCase();
    return /i\s*want\s*to\s*return\s*(the\s*)?shoes?|return\s*(the\s*)?shoes?|help\s*me\s*return|return\s*assistance/.test(t);
  }

  function isThanksMessage(text) {
    if (typeof text !== 'string') return false;
    return /^(thanks|thank you|thanks!|thank you!|thx|thx!)$/i.test(text.trim());
  }

  function isBudgetOutfitAsk(text) {
    if (typeof text !== 'string') return false;
    var t = text.trim();
    return /too\s+expensive/i.test(t) &&
      (/similar\s+items?\s+on\s+a\s+budget/i.test(t) || /on\s+a\s+budget/i.test(t) || /budget/i.test(t));
  }

  function getReturnAssistItem() {
    var orders = [];
    try {
      if (Array.isArray(window.__ORDERS_DATA__)) orders = window.__ORDERS_DATA__;
      else {
        var raw = localStorage.getItem('__orders');
        if (raw) orders = JSON.parse(raw);
      }
    } catch (e) {}
    if (!Array.isArray(orders) || !orders.length) {
      try {
        if (Array.isArray(window.SAMPLE_ORDERS)) orders = window.SAMPLE_ORDERS;
      } catch (e) {}
    }
    orders = Array.isArray(orders) ? orders : [];

    var context = null;
    try { context = window.__returnAssistContext || null; } catch (e) {}
    if (context && context.item && (context.item.title || context.item.image)) {
      return {
        orderId: context.orderId || '#S12345',
        title: context.item.title || 'Selected item',
        meta: context.item.meta || 'Qty 1',
        image: context.item.image || 'https://raw.githubusercontent.com/nora-todorova/GoShopMe-assets/main/assets/e3f92e89da-91c7ebe70b64c417c52b.png'
      };
    }
    if (context && context.orderId) {
      var contextOrder = null;
      for (var c = 0; c < orders.length; c++) {
        if (String((orders[c] || {}).id || '') === String(context.orderId)) {
          contextOrder = orders[c];
          break;
        }
      }
      if (contextOrder) {
        var contextItems = Array.isArray(contextOrder.items) ? contextOrder.items : [];
        var idx = typeof context.itemIndex === 'number' ? context.itemIndex : 0;
        var contextItem = contextItems[idx] || contextItems[0] || null;
        if (contextItem) {
          return {
            orderId: contextOrder.id || '#S12345',
            title: contextItem.title || contextItem.name || 'Selected item',
            meta: contextItem.meta || 'Qty 1',
            image: contextItem.image || 'https://raw.githubusercontent.com/nora-todorova/GoShopMe-assets/main/assets/fe90b9b439-e7fb2c439c531b8e3eb3.png'
          };
        }
      }
    }

    var selectedOrder = null;
    var selectedItem = null;
    var shoeRx = /shoe|shoes|pump|pumps|mules|sneaker|sneakers|boot|boots|heel|heels/i;
    for (var i = 0; i < orders.length; i++) {
      var o = orders[i] || {};
      var status = String(o.status || '').toLowerCase();
      if (status && status !== 'delivered') continue;
      var items = Array.isArray(o.items) ? o.items : [];
      for (var j = 0; j < items.length; j++) {
        var it = items[j] || {};
        var title = String(it.title || it.name || '');
        if (shoeRx.test(title)) { selectedOrder = o; selectedItem = it; break; }
      }
      if (!selectedItem && items.length) { selectedOrder = o; selectedItem = items[0]; }
      if (selectedItem) break;
    }

    if (!selectedItem) {
      return {
        orderId: '#S12345',
        title: 'Black Leather Ankle Boots',
        meta: 'Size 8 • Qty 1',
        image: 'https://raw.githubusercontent.com/nora-todorova/GoShopMe-assets/main/assets/fe90b9b439-e7fb2c439c531b8e3eb3.png'
      };
    }

    return {
      orderId: selectedOrder && selectedOrder.id ? selectedOrder.id : '#S12345',
      title: selectedItem.title || selectedItem.name || 'Selected item',
      meta: selectedItem.meta || 'Qty 1',
      image: selectedItem.image || 'https://raw.githubusercontent.com/nora-todorova/GoShopMe-assets/main/assets/fe90b9b439-e7fb2c439c531b8e3eb3.png'
    };
  }

  window.ShaiFlow = {
    /** Exact-bag flow: image-first → search now; text-first → set flag, ask for photo; search only after upload. */
    handleUserReply: function (message, container, addShAIMessage, scrollChat) {
      if (!message || !container || typeof addShAIMessage !== 'function') return false;

      if (isThanksMessage(message)) {
        addShAIMessage('Happy to help!');
        if (typeof scrollChat === 'function') scrollChat();
        return true;
      }

      if (isBudgetOutfitAsk(message) && typeof window.ShaiFlow.runVoiceBudgetScenario === 'function') {
        window.ShaiFlow.runVoiceBudgetScenario(container, addShAIMessage, scrollChat);
        return true;
      }

      // Scenario 5: Add to shopping bag (text-only intent)
      if (isAddToShoppingBagAsk(message)) {
        window.ShaiFlow.runAddToShoppingBagScenario(container, addShAIMessage, scrollChat);
        return true;
      }

      if (isReturnAssistanceAsk(message)) {
        window.ShaiFlow.runReturnAssistanceScenario(container, addShAIMessage, scrollChat);
        return true;
      }

      if (!isExactBagAsk(message)) return false;
      var last = container.lastElementChild;
      var prev = last && last.previousElementSibling;
      var prevIsUserImage = prev && prev.classList && prev.classList.contains('flex') && prev.classList.contains('justify-end') && prev.querySelector && prev.querySelector('img') && !prev.querySelector('.voice-message-bubble');
      if (prevIsUserImage && typeof window.ShaiFlow.runExternalSearchScenario === 'function') {
        setTimeout(function () {
          window.ShaiFlow.runExternalSearchScenario(container, addShAIMessage, scrollChat);
        }, 800);
        try { window.__waitingForExactBagImage = false; } catch (e) {}
        return true;
      }
      // Text-first: only show the "Sure..." message if we are still waiting for an image upload.
      // If the user already uploaded the image (and search started), the waiting flag will have been cleared.
      try {
        if (window.__waitingForExactBagImage !== true) return true;
        window.__waitingForExactBagImage = true;
      } catch (e) {}
      addShAIMessage('Sure, send me the item that you are looking for.');
      if (typeof scrollChat === 'function') scrollChat();
      return true;
    },

    /** Scenario 5: Add dress + red bag + neutral shoes to shopping bag (mock front-end, uses existing bag page mechanism). */
    runAddToShoppingBagScenario: function (container, addShAIMessage, scrollChat) {
      if (!container || typeof addShAIMessage !== 'function') return;
      var scroll = typeof scrollChat === 'function' ? scrollChat : function () {};

      // Uses known catalog items so Shopping_bag.html can generate valid bag tiles.
      // Note: we override the bag image to match the "red bag" visuals from Scenario 4.
      var dress = {
        id: 'budget-shein-leopard-dress',
        name: 'Leopard Print A-Line Dress',
        brand: 'Shein',
        unitPrice: 20.77,
        imgSrc: 'images/leopard-dress-hero.png',
        details: ''
      };

      var redBag = {
        // Product-catalog id used by the bag tile links; image overridden to your Dolce & Gabbana match.
        id: '9',
        name: 'Dolce & Gabbana Red Vittoria Calfskin Handbag',
        brand: 'Dolce & Gabbana',
        unitPrice: 1990,
        imgSrc: 'https://cdna.lystit.com/photos/dolcegabbana/3f6fbc13/dolce-gabbana-Red-Vittoria-Calfskin-Handbag.jpeg',
        details: ''
      };

      var neutralShoes = {
        // Neutral/beige mules from catalog.
        id: '20',
        name: 'Lupita 70 leather mules',
        brand: 'AMINA MUADDI',
        unitPrice: 590,
        imgSrc: 'https://raw.githubusercontent.com/nora-todorova/GoShopMe-assets/main/catalog/p20_0.jpg',
        details: ''
      };

      var products = [dress, redBag, neutralShoes];

      // Reuse existing bag-item mechanism on Shopping_bag.html.
      // Shopping_bag.html reads this on load and calls its internal addProductToBag().
      try { sessionStorage.setItem('__shaiProductsToAdd', JSON.stringify(products)); } catch (e) {}

      // Update existing cart badge on the current page (Home header).
      // (Bag tiles themselves appear on Shopping_bag.html after navigation.)
      if (typeof window.addToCart === 'function') {
        for (var i = 0; i < products.length; i++) {
          try { window.addToCart(); } catch (e) {}
        }
      }

      var thumbs = products.map(function (p) { return p.imgSrc; });
      addShAIMessage("Great choice! I've added the items to your shopping bag.", thumbs);
      scroll();

      // Prompt chip(s)
      setTimeout(function () {
        // Avoid duplicate chips if the user spam-clicks.
        if (container.querySelector('#shai-go-to-checkout-chip')) return;
        var row = document.createElement('div');
        row.className = 'flex flex-wrap gap-2 justify-center mb-2';
        row.innerHTML =
          '<button id="shai-go-to-checkout-chip" type="button" ' +
          'class="bg-white border border-[#939BFB] text-[#939BFB] px-3 py-1.5 rounded-full text-xs font-medium dm-sans hover:bg-[#939BFB] hover:text-white transition-colors">Go to checkout</button>';
        var btn = row.querySelector('#shai-go-to-checkout-chip');
        if (btn) {
          btn.addEventListener('click', function () {
            window.location.href = 'Shopping_bag.html?from=home';
          });
        }
        container.appendChild(row);
        scroll();
      }, 250);

      return true;
    },
    runAfterUpload: function (container, addShAIMessage, scrollChat) {
      if (!container || typeof addShAIMessage !== 'function') return;
      var scroll = typeof scrollChat === 'function' ? scrollChat : function () {};
      addTypingIndicator(container);
      scroll();
      setTimeout(function () {
        removeTypingIndicator();
        addShAIMessage("I found the key pieces in this look.");
        scroll();
        setTimeout(function () {
          var outfitHtml = renderOutfitMatchGroup(SCENARIO1_HERO, SCENARIO1_SUPPORTING);
          var wrap = document.createElement('div');
          wrap.className = 'flex items-start space-x-3 mb-4';
          wrap.innerHTML = '<div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"><img class="w-full h-full object-cover" src="' + SHAI_AVATAR + '" alt="ShAI"></div>' +
            '<div class="flex-1"><div class="bg-gray-50 rounded-2xl rounded-tl-md p-3">' + outfitHtml + '</div></div>';
          container.appendChild(wrap);
          scroll();
          setTimeout(function () {
            addShAIMessage("Do you want me to add the items to your bag or perhaps you want to ask a friend?");
            scroll();
          }, 600);
        }, 800);
      }, 1500);
    },

    /** Scenario 2: Add friend into the chat — friend message, ShAI reply, typewriter "Searching for red shoes...", then red shoe from catalog */
    runAddFriendScenario: function (container, friendName, addShAIMessage, scrollChat, friendAvatarUrl) {
      if (!container || typeof addShAIMessage !== 'function') return;
      var scroll = typeof scrollChat === 'function' ? scrollChat : function () {};
      var avatar = (typeof friendAvatarUrl === 'string' && friendAvatarUrl) ? friendAvatarUrl : (function () {
        var list = window.__addFriendContacts || [];
        var name = (friendName || '').trim();
        for (var i = 0; i < list.length; i++) { if ((list[i].name || '').trim() === name && list[i].avatar) return list[i].avatar; }
        return '';
      })();
      var friendText = 'I think the dress will look better with red shoes. The bag is beautiful though.';
      setTimeout(function () {
        addFriendMessage(container, friendName, friendText, scroll, avatar);
        setTimeout(function () {
          addShAIMessage('Sure let me find you matching red shoes');
          scroll();
          var typingMsg = 'Searching for red shoes…';
addTypingIndicatorWithMessage(container, typingMsg, 50);
        scroll();
        setTimeout(function () {
          removeTypingIndicator();
          var shoeHtml = renderSingleProductCard(SCENARIO2_RED_SHOE);
          var wrap = document.createElement('div');
          wrap.className = 'flex items-start space-x-3 mb-4';
          wrap.innerHTML = '<div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"><img class="w-full h-full object-cover" src="' + SHAI_AVATAR + '" alt="ShAI"></div>' +
              '<div class="flex-1"><div class="bg-gray-50 rounded-2xl rounded-tl-md p-3">' + shoeHtml + '</div></div>';
            container.appendChild(wrap);
            scroll();
          }, Math.max(typingMsg.length * 50, 1000));
        }, 700);
      }, 600);
    },

    /** Scenario 4: External search fallback — user asked "Can you find the exact bag?" + uploaded bag image; no catalog match → "Search online..." → fallback results */
    runExternalSearchScenario: function (container, addShAIMessage, scrollChat) {
      if (!container || typeof addShAIMessage !== 'function') return;
      var scroll = typeof scrollChat === 'function' ? scrollChat : function () {};

      // Mock "external" results — three bags from catalog, premium fallback feel
      var externalResults = [
        // Left card: exact Dolce & Gabbana match (premium external fallback mock)
        {
          id: '3',
          name: 'Dolce & Gabbana BB7844AZ000 handbag',
          brand: 'Dolce & Gabbana',
          price: '€ 1,700',
          image: 'https://www.dolcegabbana.com/dw/image/v2/BKDB_PRD/on/demandware.static/-/Sites-15/default/dwcb0daafc/images/zoom/BB7844AZ000_83028_0.jpg?sw=366&sh=504&sm=fit',
          url: '#'
        },
        // Middle card: keep a bag-only fallback (still “Found online” but not an error state)
        { id: '17', name: 'My Sicily leather tote bag', brand: 'Found online', price: '€ 1,850', image: 'https://raw.githubusercontent.com/nora-todorova/GoShopMe-assets/main/catalog/p17_0.jpg', url: '#' },
        // Right card: exact Dolce & Gabbana Red Vittoria match (bag-only)
        { id: '9', name: 'Dolce & Gabbana Red Vittoria Calfskin Handbag', brand: 'Dolce & Gabbana', price: '€ 1,990', image: 'https://cdna.lystit.com/photos/dolcegabbana/3f6fbc13/dolce-gabbana-Red-Vittoria-Calfskin-Handbag.jpeg', url: '#' }
      ];

      function addSearchOnlineIndicator() {
        var div = document.createElement('div');
        div.className = 'flex items-start space-x-3 mb-4 shai-search-online-indicator';
        div.innerHTML = '<div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"><img class="w-full h-full object-cover" src="' + SHAI_AVATAR + '" alt="ShAI"></div>' +
          '<div class="flex-1"><div class="bg-gray-50/80 border border-gray-100 rounded-2xl rounded-tl-md px-3 py-2.5 inline-flex items-center gap-2 text-xs text-gray-500">' +
          '<svg class="w-4 h-4 flex-shrink-0 text-[#939BFB]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>' +
          '<span>Search online…</span></div></div>';
        container.appendChild(div);
        if (!document.getElementById('shai-search-online-styles')) {
          var style = document.createElement('style');
          style.id = 'shai-search-online-styles';
          style.textContent = '.shai-search-online-indicator span{animation:shai-search-pulse 1.2s ease-in-out infinite}@keyframes shai-search-pulse{0%,100%{opacity:.7}50%{opacity:1}}';
          document.head.appendChild(style);
        }
        return div;
      }

      function renderFoundOnlineCards(products) {
        var label = '<p class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Found online</p>';
        var cards = (products || []).map(function (p) {
          var img = (p.image || '').replace(/"/g, '&quot;');
          var name = (p.name || '').replace(/</g, '&lt;');
          var brand = (p.brand || '').replace(/</g, '&lt;');
          var price = (p.price || '').replace(/</g, '&lt;');
          var href = (p.url || 'Product_details_page.html?id=' + encodeURIComponent(p.id)).replace(/"/g, '&quot;');
          return '<a href="' + href + '" class="block min-w-0 rounded-xl border border-gray-200 overflow-hidden hover:border-[#939BFB] hover:shadow-md transition-all" target="_blank" rel="noopener">' +
            '<div class="aspect-square bg-gray-50 flex items-center justify-center"><img src="' + img + '" alt="" class="w-full h-full object-cover"></div>' +
            '<div class="p-1.5"><p class="text-xs font-medium text-black truncate">' + name + '</p><p class="text-[10px] text-gray-500 truncate">' + brand + '</p><p class="text-xs font-semibold text-[#939BFB]">' + price + '</p></div></a>';
        }).join('');
        return label + '<div class="grid grid-cols-3 gap-2 w-full min-w-0 max-w-full">' + cards + '</div>';
      }

      setTimeout(function () {
        addShAIMessage('I couldn\'t find an exact match in integrated stores.');
        scroll();
        setTimeout(function () {
          addSearchOnlineIndicator();
          scroll();
          setTimeout(function () {
            var ind = container.querySelector('.shai-search-online-indicator');
            if (ind && ind.parentNode) ind.parentNode.removeChild(ind);
            addShAIMessage('I searched the internet and found the closest available option.');
            scroll();
            setTimeout(function () {
              var html = renderFoundOnlineCards(externalResults);
              var wrap = document.createElement('div');
              wrap.className = 'flex items-start space-x-3 mb-4';
              wrap.innerHTML = '<div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"><img class="w-full h-full object-cover" src="' + SHAI_AVATAR + '" alt="ShAI"></div>' +
                '<div class="flex-1 min-w-0 max-w-full overflow-hidden"><div class="bg-gray-50 rounded-2xl rounded-tl-md p-3 border border-gray-100">' + html + '</div></div>';
              container.appendChild(wrap);
              scroll();
            }, 400);
          }, 2200);
        }, 700);
      }, 800);
    },

    /** Scenario 7: Return assistance inside chat (item -> reason -> confirm). */
    runReturnAssistanceScenario: function (container, addShAIMessage, scrollChat) {
      if (!container || typeof addShAIMessage !== 'function') return;
      var scroll = typeof scrollChat === 'function' ? scrollChat : function () {};
      var item = getReturnAssistItem();
      var flowId = 'shai-return-flow-' + Date.now();

      addShAIMessage('I can help with that.');
      scroll();

      setTimeout(function () {
        var wrap = document.createElement('div');
        wrap.className = 'flex items-start space-x-3 mb-4';
        wrap.innerHTML = '<div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"><img class="w-full h-full object-cover" src="' + SHAI_AVATAR + '" alt="ShAI"></div>' +
          '<div class="flex-1"><div class="bg-gray-50 rounded-2xl rounded-tl-md p-3 border border-gray-100">' +
          '<p class="text-xs font-semibold text-gray-700 mb-2">Return assistance</p>' +
          '<div class="mb-3"><p class="text-xs font-medium text-gray-700 mb-1">Select item</p>' +
          '<label class="flex items-start gap-2 rounded-lg border border-gray-200 bg-white p-2">' +
          '<input type="checkbox" class="mt-1 w-4 h-4 accent-[#939BFB]" id="' + flowId + '-item-check" checked>' +
          '<img src="' + (item.image || '').replace(/"/g, '&quot;') + '" alt="" class="w-10 h-10 rounded object-cover bg-gray-100">' +
          '<span class="min-w-0"><span class="block text-xs font-medium text-gray-900">' + String(item.title || '').replace(/</g, '&lt;') + '</span><span class="block text-[11px] text-gray-500">' + String(item.meta || '').replace(/</g, '&lt;') + ' • ' + String(item.orderId || '').replace(/</g, '&lt;') + '</span></span>' +
          '</label></div>' +
          '<div class="mb-3"><p class="text-xs font-medium text-gray-700 mb-1">Select reason</p>' +
          '<select id="' + flowId + '-reason" class="w-full rounded-lg border border-gray-300 bg-white px-2.5 py-2 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#939BFB]">' +
          '<option value="">Select a reason</option>' +
          '<option value="size">Wrong size</option>' +
          '<option value="style">Not my style</option>' +
          '<option value="damaged">Arrived damaged</option>' +
          '<option value="other">Other</option>' +
          '</select></div>' +
          '<div class="flex justify-end"><button type="button" id="' + flowId + '-confirm" class="bg-[#939BFB] text-white px-3 py-1.5 rounded-full text-xs font-medium hover:opacity-90 transition-opacity">Confirm return</button></div>' +
          '<p id="' + flowId + '-status" class="hidden mt-2 text-[11px] text-green-700"></p>' +
          '</div></div>';
        container.appendChild(wrap);
        scroll();

        var checkEl = document.getElementById(flowId + '-item-check');
        var reasonEl = document.getElementById(flowId + '-reason');
        var confirmEl = document.getElementById(flowId + '-confirm');
        var statusEl = document.getElementById(flowId + '-status');
        if (!confirmEl) return;

        confirmEl.addEventListener('click', function () {
          var hasItem = !!(checkEl && checkEl.checked);
          var reason = reasonEl ? reasonEl.value : '';
          if (!hasItem || !reason) {
            if (statusEl) {
              statusEl.classList.remove('hidden', 'text-green-700');
              statusEl.classList.add('text-red-600');
              statusEl.textContent = 'Please select the item and reason.';
            }
            return;
          }

          confirmEl.disabled = true;
          confirmEl.classList.add('opacity-60', 'cursor-not-allowed');
          if (reasonEl) reasonEl.disabled = true;
          if (checkEl) checkEl.disabled = true;
          if (statusEl) {
            statusEl.classList.remove('hidden', 'text-red-600');
            statusEl.classList.add('text-green-700');
            statusEl.textContent = 'Return confirmed. Preparing label...';
          }
          scroll();

          setTimeout(function () {
            addShAIMessage('Your return is ready. I prepared the label and return instructions.');
            scroll();

            // Return assets in chat: downloadable label + concise pickup instructions.
            var labelText =
              'GoShopMe Return Label\n' +
              'Order: ' + String(item.orderId || '#S12345') + '\n' +
              'Item: ' + String(item.title || 'Selected item') + '\n' +
              'Reason: ' + String(reason) + '\n' +
              'Courier: DHL Express\n' +
              'Phone: +1 (800) 225-5345\n' +
              'Generated: ' + new Date().toISOString() + '\n';
            var labelHref = 'data:text/plain;charset=utf-8,' + encodeURIComponent(labelText);
            var labelFile = 'return-label-' + String(item.orderId || 'order').replace(/[^a-zA-Z0-9_-]/g, '') + '.txt';

            var assetsWrap = document.createElement('div');
            assetsWrap.className = 'flex items-start space-x-3 mb-4';
            assetsWrap.innerHTML =
              '<div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"><img class="w-full h-full object-cover" src="' + SHAI_AVATAR + '" alt="ShAI"></div>' +
              '<div class="flex-1"><div class="bg-gray-50 rounded-2xl rounded-tl-md p-3 border border-gray-100">' +
              '<p class="text-xs font-semibold text-gray-700 mb-2">Return documents</p>' +
              '<a href="' + labelHref + '" download="' + labelFile + '" class="inline-flex items-center gap-2 bg-white border border-[#939BFB] text-[#939BFB] px-3 py-1.5 rounded-full text-xs font-medium hover:bg-[#939BFB] hover:text-white transition-colors">Download return label</a>' +
              '<div class="mt-3 text-xs text-gray-700 space-y-1">' +
              '<p>Pickup instructions:</p>' +
              '<p>1) Put the item in its original packaging and attach the label.</p>' +
              '<p>2) Book parcel pickup with DHL Express at <span class="font-medium">+1 (800) 225-5345</span>.</p>' +
              '<p>3) Keep the pickup receipt for tracking.</p>' +
              '</div>' +
              '</div></div>';
            container.appendChild(assetsWrap);
            scroll();
          }, 700);
        });
      }, 250);
    },

    /** Scenario 3: Voice message for budget options — "Absolutely" + typewriter + affordable outfit + summary */
    runVoiceBudgetScenario: function (container, addShAIMessage, scrollChat) {
      if (!container || typeof addShAIMessage !== 'function') return;
      var scroll = typeof scrollChat === 'function' ? scrollChat : function () {};
      var beforeTotal = 2811;
      var budgetHero = {
        id: 'budget-shein-leopard-dress',
        name: 'Leopard Print A-Line Dress',
        brand: 'Shein',
        price: '$20.77',
        priceNum: 20.77,
        image: 'images/leopard-dress-hero.png'
      };
      var budgetSupporting = [
        { id: 'budget-aldo-scintilla-sandals', name: 'SCINTILLA Sandals', brand: 'Aldo', price: '$110.00', priceNum: 110, image: 'https://www.aldoshoes.co.za/wp-content/uploads/scintilla_red_600-002-033_main_sq_nt_1000x1000.jpg' },
        { id: 'budget-yusiwoal-tote-bag', name: 'Shoulder Tote Bag Retro Half Handbag', brand: 'YUSIWOAL', price: '$32.00', priceNum: 32, image: 'https://m.media-amazon.com/images/I/51rIB879-IL._AC_SY695_.jpg' },
        { id: 'budget-sara-domenech-earrings', name: 'LONG GOLDEN EARRINGS VOL', brand: 'SARA DOMÈNECH', price: '$28.00', priceNum: 28, image: 'https://www.joidart.com/cdnassets/J3420AR043200-S_l.jpg' }
      ];
      var afterTotal = budgetHero.priceNum + budgetSupporting[0].priceNum + budgetSupporting[1].priceNum + budgetSupporting[2].priceNum;

      setTimeout(function () {
        addShAIMessage('Absolutely');
        scroll();
        var typingMsg = 'I need to recreate the look with more affordable options.';
        addTypingIndicatorWithMessage(container, typingMsg, 50);
        scroll();
        setTimeout(function () {
          removeTypingIndicator();
          var outfitHtml = renderOutfitMatchGroup(budgetHero, budgetSupporting);
          var wrap = document.createElement('div');
          wrap.className = 'flex items-start space-x-3 mb-4';
          wrap.innerHTML = '<div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"><img class="w-full h-full object-cover" src="' + SHAI_AVATAR + '" alt="ShAI"></div>' +
            '<div class="flex-1"><div class="bg-gray-50 rounded-2xl rounded-tl-md p-3">' + outfitHtml + '</div></div>';
          container.appendChild(wrap);
          scroll();
          setTimeout(function () {
            var beforeStr = '€' + String(beforeTotal).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            var afterStr = '$' + (typeof afterTotal === 'number' && afterTotal % 1 !== 0 ? afterTotal.toFixed(2) : String(afterTotal));
            addShAIMessage('Estimated total before: ' + beforeStr + '. Updated total: ' + afterStr + '.');
            scroll();
          }, 500);
        }, Math.max(typingMsg.length * 50, 1200));
      }, 600);
    }
  };
})();
