/**
 * ShAI Flow - Shared logic for outfit search, budget similar, accessories, web search, add-to-bag.
 * Works with both full chat drawer (#chat-messages) and injected drawer (#shai-messages).
 */
(function () {
  'use strict';

  const CATALOG_URL = 'https://raw.githubusercontent.com/nora-todorova/GoShopMe-assets/main/product-catalog.json';
  const SHAI_AVATAR = 'https://raw.githubusercontent.com/nora-todorova/GoShopMe-assets/main/assets/shai-avatar.png';

  const LUXURY_BRANDS = [
    'VALENTINO', 'CHLOE', 'CHLOÉ', 'DOLCE&GABBANA', 'DOLCE AND GABBANA',
    'MAGDA BUTRYM', 'KHAITE', 'ALAIA', 'SAINT LAURENT', 'SELF-PORTRAIT',
    'SELF-POTRAIT', 'JACQUEMUS', 'ZIMMERMANN', 'GUCCI', 'GIVENCHY'
  ].map(function (b) { return b.trim().toUpperCase(); });

  const BUDGET_BRANDS = ['SHEIN', 'MOTF', 'ANEWSTA', 'FRIENDS', 'MOTF STUDIO'].map(function (b) { return b.trim().toUpperCase(); });

  const OUTFIT_SLOTS = [
    { key: 'dress', keywords: ['dress', 'gown', 'minidress', 'midi dress', 'shirt dress', 'bustier dress'] },
    { key: 'top', keywords: ['top', 'blouse', 'shirt', 'cardigan', 'tank', 'knit'] },
    { key: 'shoes', keywords: ['sandals', 'pumps', 'mules', 'heels', 'flats', 'slingback', 'wedge', 'slides'] },
    { key: 'bag', keywords: ['bag', 'clutch', 'tote', 'shoulder bag', 'vanity', 'baguette'] }
  ];

  const ACCESSORY_KEYWORDS = ['earrings', 'clip-on', 'drop earrings', 'bag', 'clutch', 'belt', 'necklace'];

  let catalogCache = null;

  var ShaiFlow = {
    state: {
      pendingAsk: null,
      lastProducts: [],
      lastCategories: [],
      lastResultSource: 'catalog',
      userApprovedProducts: null
    },

    getCatalog: function () {
      if (catalogCache) return Promise.resolve(catalogCache);
      return fetch(CATALOG_URL)
        .then(function (r) { return r.ok ? r.json() : Promise.reject(new Error('Catalog fetch failed')); })
        .then(function (data) {
          catalogCache = (data && data.products) ? data.products : [];
          return catalogCache;
        })
        .catch(function () {
          catalogCache = [];
          return catalogCache;
        });
    },

    parsePrice: function (priceStr) {
      if (typeof priceStr !== 'string') return 0;
      var n = parseFloat(priceStr.replace(/[€£$,\s]/g, '').replace(',', '.'));
      return isNaN(n) ? 0 : n;
    },

    isLuxuryBrand: function (brand) {
      var b = (brand || '').trim().toUpperCase();
      return LUXURY_BRANDS.some(function (lb) { return b.indexOf(lb) >= 0 || lb.indexOf(b) >= 0; });
    },

    getProductCategory: function (product) {
      var name = (product.name || '').toLowerCase();
      var desc = (product.description || '').toLowerCase();
      var combined = name + ' ' + desc;
      if (ACCESSORY_KEYWORDS.some(function (k) { return combined.indexOf(k) >= 0; })) {
        if (/\b(earrings?|clip-on|drop earrings)\b/.test(combined)) return 'accessory';
        if (/\b(bag|clutch|tote|shoulder bag)\b/.test(combined)) return 'bag';
      }
      if (/\b(dress|gown|minidress|midi dress|shirt dress)\b/.test(combined)) return 'dress';
      if (/\b(skirt)\b/.test(combined)) return 'skirt';
      if (/\b(top|blouse|shirt|cardigan|tank|knit)\b/.test(combined)) return 'top';
      if (/\b(sandals?|pumps?|mules?|heels?|flats?|slingback|wedge|slides)\b/.test(combined)) return 'shoes';
      if (/\b(bag|clutch|tote|shoulder bag)\b/.test(combined)) return 'bag';
      return 'other';
    },

    userSizeMatch: function (product, userSizes) {
      if (!product.sizes || !product.sizes.length) return true;
      var u = (userSizes || []).map(function (s) { return String(s).trim().toUpperCase(); }).filter(Boolean);
      if (!u.length) return true;
      return product.sizes.some(function (ps) {
        var p = String(ps).trim().toUpperCase();
        return u.some(function (us) { return p.indexOf(us) >= 0 || us.indexOf(p) >= 0; });
      });
    },

    findOutfitFromCatalog: function (userSizes, useBudgetBrandsOnly) {
      var self = this;
      return this.getCatalog().then(function (products) {
        var list = (products || []).slice();
        if (useBudgetBrandsOnly) {
          list = list.filter(function (p) {
            var b = (p.brand || '').trim().toUpperCase();
            return BUDGET_BRANDS.some(function (bb) { return b.indexOf(bb) >= 0; });
          });
        }
        list = list.filter(function (p) { return self.userSizeMatch(p, userSizes); });
        var bySlot = {};
        OUTFIT_SLOTS.forEach(function (slot) {
          bySlot[slot.key] = list.filter(function (p) {
            var cat = self.getProductCategory(p);
            return slot.key === cat || (slot.key === 'top' && (cat === 'top' || cat === 'skirt'));
          });
        });
        var result = [];
        var categories = [];
        OUTFIT_SLOTS.forEach(function (slot) {
          var arr = bySlot[slot.key];
          if (arr.length) {
            arr.sort(function (a, b) { return self.parsePrice(a.price) - self.parsePrice(b.price); });
            result.push(arr[0]);
            categories.push(slot.key);
          }
        });
        if (result.length === 0 && list.length > 0) {
          list.sort(function (a, b) { return self.parsePrice(a.price) - self.parsePrice(b.price); });
          result = list.slice(0, 3);
          result.forEach(function (p) { categories.push(self.getProductCategory(p)); });
        }
        return { products: result, categories: categories };
      });
    },

    findWebResults: function (userSizes) {
      return this.findOutfitFromCatalog(userSizes, false);
    },

    findBudgetSimilar: function (categories) {
      var self = this;
      return this.getCatalog().then(function (products) {
        var list = (products || []).filter(function (p) {
          var b = (p.brand || '').trim().toUpperCase();
          return BUDGET_BRANDS.some(function (bb) { return b.indexOf(bb) >= 0; });
        });
        var cats = categories && categories.length ? categories : ['dress', 'shoes', 'bag'];
        var out = [];
        cats.forEach(function (c) {
          var match = list.filter(function (p) { return self.getProductCategory(p) === c; });
          match.sort(function (a, b) { return self.parsePrice(a.price) - self.parsePrice(b.price); });
          if (match[0]) out.push(match[0]);
        });
        if (out.length === 0) out = list.slice(0, 3).sort(function (a, b) { return self.parsePrice(a.price) - self.parsePrice(b.price); });
        return out;
      });
    },

    findAccessories: function (limit) {
      var self = this;
      limit = limit || 4;
      return this.getCatalog().then(function (products) {
        var list = (products || []).filter(function (p) {
          var cat = self.getProductCategory(p);
          var name = (p.name || '').toLowerCase() + ' ' + (p.description || '').toLowerCase();
          return cat === 'accessory' || cat === 'bag' || /\b(earrings?|clutch|bag)\b/.test(name);
        });
        list.sort(function (a, b) { return self.parsePrice(a.price) - self.parsePrice(b.price); });
        return list.slice(0, limit);
      });
    },

    mapToBagProduct: function (p) {
      return {
        id: (p.id || '').replace(/"/g, ''),
        name: (p.name || '').replace(/"/g, ''),
        brand: (p.brand || '').replace(/"/g, ''),
        unitPrice: this.parsePrice(p.price) || 0,
        imgSrc: (p.imageUrls && p.imageUrls[0]) ? p.imageUrls[0] : '',
        details: (p.description || '').slice(0, 80).replace(/</g, '')
      };
    },

    addToBagAndRedirect: function (products) {
      var bagProducts = products.map(function (p) { return this.mapToBagProduct(p); }.bind(this));
      try {
        sessionStorage.setItem('__shaiProductsToAdd', JSON.stringify(bagProducts));
        var base = window.location.pathname.replace(/\/[^/]*$/, '') || '';
        window.location.href = (base ? base + '/' : '') + 'Shopping_bag.html?from=shai';
      } catch (e) {
        console.warn('ShaiFlow addToBag', e);
      }
    },

    renderProductCards: function (products, container, options) {
      if (!container || !products || !products.length) return;
      options = options || {};
      var source = options.source || 'catalog';
      var badge = options.badge || (source === 'web' ? 'From the web' : 'Best price');
      var avatarUrl = options.avatarUrl || SHAI_AVATAR;
      var wrap = document.createElement('div');
      wrap.className = 'flex items-start space-x-3 mb-4 shai-product-cards-wrap';
      var cardsHtml = products.map(function (p) {
        var img = (p.imageUrls && p.imageUrls[0]) ? p.imageUrls[0] : '';
        var link = p.productUrl || '#';
        var price = (p.price || '').trim() || '';
        return '<a href="' + link.replace(/"/g, '&quot;') + '" target="_blank" rel="noopener" class="shai-product-card block w-[calc(50%-4px)] flex-shrink-0 rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">' +
          '<div class="aspect-square bg-gray-100"><img class="w-full h-full object-cover" src="' + (img || '').replace(/"/g, '&quot;') + '" alt=""></div>' +
          '<div class="p-2">' +
          '<p class="text-xs text-gray-500 truncate">' + (p.brand || '').replace(/</g, '&lt;') + '</p>' +
          '<p class="text-xs font-medium text-gray-900 truncate">' + (p.name || '').replace(/</g, '&lt;') + '</p>' +
          '<p class="text-xs text-[#939BFB] font-semibold mt-0.5">' + (price || '').replace(/</g, '&lt;') + '</p>' +
          (badge ? '<span class="inline-block mt-1 text-[10px] bg-[#E8EBFF] text-[#939BFB] px-1.5 py-0.5 rounded">' + (badge || '').replace(/</g, '&lt;') + '</span>' : '') +
          '</div></a>';
      }).join('');
      wrap.innerHTML =
        '<div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"><img class="w-full h-full object-cover" src="' + avatarUrl.replace(/"/g, '&quot;') + '" alt="ShAI"></div>' +
        '<div class="flex-1 min-w-0">' +
        '<div class="bg-gray-50 rounded-2xl rounded-tl-md p-3">' +
        '<div class="flex flex-wrap gap-2">' + cardsHtml + '</div>' +
        '</div></div>';
      container.appendChild(wrap);
    },

    runAfterUpload: function (messageContainer, addMessageFn, scrollFn) {
      var self = this;
      if (!messageContainer || typeof addMessageFn !== 'function') return;
      scrollFn = typeof scrollFn === 'function' ? scrollFn : function () {};
      var userSizes = window.__userSizes || ['M', 'EU 38', 'UK 8', '38'];
      self.getCatalog().then(function () {
        return self.findOutfitFromCatalog(userSizes, false);
      }).then(function (out) {
        if (out.products.length === 0) {
          addMessageFn("I couldn't find a close match in our partners' catalog. Would you like me to search the internet for similar items?");
          self.state.pendingAsk = 'web';
          self.state.lastProducts = [];
          self.state.lastResultSource = 'catalog';
          scrollFn();
        } else {
          addMessageFn("I found the items in your look. I've searched across thousands of options and picked these in your size at the best price.");
          self.renderProductCards(out.products, messageContainer, { source: 'catalog', badge: 'Best price' });
          self.state.lastProducts = out.products;
          self.state.lastCategories = out.categories;
          self.state.lastResultSource = 'catalog';
          self.state.userApprovedProducts = null;
          scrollFn();
          var hasLuxury = out.products.some(function (p) { return self.isLuxuryBrand(p.brand); });
          if (hasLuxury) {
            setTimeout(function () {
              addMessageFn("These pieces are from luxury brands. Would you like me to find similar styles at a more budget-friendly price?");
              self.state.pendingAsk = 'budget';
              scrollFn();
            }, 600);
          } else {
            setTimeout(function () {
              addMessageFn("Would you like me to add these to your shopping bag?");
              self.state.pendingAsk = 'add_to_bag';
              scrollFn();
            }, 600);
          }
        }
      }).catch(function () {
        addMessageFn("I couldn't find a match right now. Would you like me to search the internet for similar items?");
        self.state.pendingAsk = 'web';
        self.state.lastProducts = [];
        scrollFn();
      });
    },

    handleUserReply: function (text, messageContainer, addMessageFn, scrollFn) {
      var self = this;
      if (!messageContainer || typeof addMessageFn !== 'function') return false;
      scrollFn = typeof scrollFn === 'function' ? scrollFn : function () {};
      var t = (text || '').trim().toLowerCase();
      var yes = /^(yes|yeah|yep|sure|ok|okay|please|add them|add to bag|yes please|yes add|show me)$/.test(t) || t === 'yes, add to bag' || t === 'yes, show me';
      var no = /^(no|nope|nah|thanks|thank you|no thanks)$/.test(t);
      var wantToBuy = /^(buy|i want to buy|i'll buy|purchase|get these)$/.test(t);

      if (self.state.pendingAsk === 'web') {
        if (yes) {
          self.state.pendingAsk = null;
          var userSizes = window.__userSizes || ['M', 'EU 38', 'UK 8'];
          self.findWebResults(userSizes).then(function (out) {
            if (out.products.length) {
              addMessageFn("Here are the best matches I found online, in your size and at the best prices.");
              self.renderProductCards(out.products, messageContainer, { source: 'web', badge: 'From the web' });
              self.state.lastProducts = out.products;
              self.state.lastResultSource = 'web';
              self.state.pendingAsk = 'web_buy';
            } else {
              addMessageFn("I couldn't find matches this time. Try another photo or ask me something else!");
            }
            scrollFn();
          });
        } else if (no) {
          self.state.pendingAsk = null;
          addMessageFn("No problem. Upload another image or ask me anything else!");
          scrollFn();
        }
        return true;
      }

      if (self.state.pendingAsk === 'web_buy' && wantToBuy) {
        self.state.pendingAsk = null;
        addMessageFn("These items are from external retailers. To complete your purchase, please use the links I provided — each will take you to the merchant's website where you can complete the transaction. I can't add them to your GoShopMe bag because checkout happens on their site.");
        scrollFn();
        return true;
      }

      if (self.state.pendingAsk === 'budget') {
        if (yes) {
          self.state.pendingAsk = null;
          self.findBudgetSimilar(self.state.lastCategories).then(function (products) {
            if (products.length) {
              addMessageFn("Here are similar options from mid-range and fast-fashion brands.");
              self.renderProductCards(products, messageContainer, { source: 'catalog', badge: 'Budget find' });
              self.state.lastProducts = products;
              self.state.lastResultSource = 'catalog';
            }
            setTimeout(function () {
              addMessageFn("Would you like me to add these to your shopping bag?");
              self.state.pendingAsk = 'add_to_bag';
              scrollFn();
            }, 400);
            scrollFn();
          });
        } else if (no) {
          self.state.pendingAsk = null;
          addMessageFn("Would you like me to add the previous items to your shopping bag?");
          self.state.pendingAsk = 'add_to_bag';
          scrollFn();
        }
        return true;
      }

      if (self.state.pendingAsk === 'accessories') {
        if (yes) {
          self.state.pendingAsk = null;
          self.findAccessories(4).then(function (products) {
            if (products.length) {
              addMessageFn("Here are some accessories that go well with your look.");
              self.renderProductCards(products, messageContainer, { source: 'catalog', badge: 'Accessory' });
              self.state.lastProducts = products;
              setTimeout(function () {
                addMessageFn("Would you like me to add these to your shopping bag?");
                self.state.pendingAsk = 'add_to_bag';
                scrollFn();
              }, 400);
            }
            scrollFn();
          });
        } else if (no) {
          self.state.pendingAsk = null;
          addMessageFn("No problem! Anything else?");
          scrollFn();
        }
        return true;
      }

      if (self.state.pendingAsk === 'add_to_bag') {
        if (yes && self.state.lastProducts && self.state.lastProducts.length && self.state.lastResultSource === 'catalog') {
          self.state.pendingAsk = null;
          addMessageFn("Done! I've added them to your shopping bag.");
          scrollFn();
          setTimeout(function () {
            self.addToBagAndRedirect(self.state.lastProducts);
          }, 800);
        } else if (no) {
          self.state.pendingAsk = null;
          addMessageFn("No problem. Anything else I can help with?");
          scrollFn();
        }
        return true;
      }

      if (self.state.lastProducts && self.state.lastProducts.length && !self.state.pendingAsk) {
        if (yes || /^(like|love|great|perfect|nice)$/.test(t)) {
          self.state.userApprovedProducts = self.state.lastProducts;
          addMessageFn("Would you like some accessories to complete this outfit?");
          self.state.pendingAsk = 'accessories';
          scrollFn();
          return true;
        }
        if (/add to bag|add them/.test(t) && self.state.lastResultSource === 'catalog') {
          addMessageFn("Done! I've added them to your shopping bag.");
          scrollFn();
          setTimeout(function () { self.addToBagAndRedirect(self.state.lastProducts); }, 800);
          return true;
        }
      }

      return false;
    }
  };

  window.ShaiFlow = ShaiFlow;
})();
