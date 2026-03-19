/**
 * Shared wishlist store (localStorage). Use on all pages that show product tiles or the wishlist screen.
 * - getWishlist() → array of { id, name, brand, price, image, originalPrice?, discountPercent? }
 * - addToWishlist(product) → adds/updates by id
 * - removeFromWishlist(productId) → removes by id
 * - isInWishlist(productId) → boolean
 */
(function() {
    var KEY = '__goShopMeWishlist';

    function getStored() {
        try {
            var raw = localStorage.getItem(KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            return [];
        }
    }

    function setStored(arr) {
        try {
            localStorage.setItem(KEY, JSON.stringify(arr));
        } catch (e) {}
    }

    function normalizeProduct(p) {
        if (!p) return null;
        var id = (p.id != null && p.id !== '') ? String(p.id) : '';
        if (!id && typeof p.name === 'string' && p.name.trim()) id = p.name.trim().toLowerCase().replace(/\s+/g, '-');
        if (!id) return null;
        return {
            id: id,
            name: p.name || '',
            brand: p.brand || '',
            price: p.price != null ? (typeof p.price === 'string' ? p.price : String(p.price)) : '',
            image: (p.image != null ? p.image : (p.imageUrls && p.imageUrls[0]) || (p.images && p.images[0])) || '',
            originalPrice: p.originalPrice != null ? String(p.originalPrice) : '',
            discountPercent: p.discountPercent != null ? p.discountPercent : null
        };
    }

    window.GoShopMeWishlist = {
        getWishlist: function() {
            return getStored();
        },
        addToWishlist: function(product) {
            var arr = getStored();
            var norm = normalizeProduct(product);
            if (!norm) return;
            arr = arr.filter(function(item) { return item.id !== norm.id; });
            arr.push(norm);
            setStored(arr);
        },
        removeFromWishlist: function(productId) {
            var id = productId == null ? '' : String(productId);
            var arr = getStored().filter(function(item) { return item.id !== id; });
            setStored(arr);
        },
        isInWishlist: function(productId) {
            var id = productId == null ? '' : String(productId);
            return getStored().some(function(item) { return item.id === id; });
        }
    };
})();
