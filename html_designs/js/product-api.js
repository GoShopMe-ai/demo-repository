/**
 * GoShopMe Product API Service
 * All product data (pictures, sizes, price, description, brand, etc.) is fetched
 * from the database/API. Set window.GOSHOPME_API_BASE_URL to your API base.
 *
 * Usage:
 *   window.GOSHOPME_API_BASE_URL = 'https://api.example.com';
 *   const product = await window.GoShopMeProductAPI.fetchProductById('product-id');
 *   if (product) window.loadProductData(product);
 */
(function() {
    'use strict';

    const BASE_URL = window.GOSHOPME_API_BASE_URL || '/api';
    const ENDPOINTS = {
        product: '/catalog/products',
        search: '/catalog/search',
        recommendations: '/catalog/recommendations'
    };

    /**
     * Map API response to loadProductData() format.
     * API may return: id, name, description, images, base_price, discounted_price,
     * currency, merchant/brand, metadata { material_and_care }, variants (sizes), etc.
     */
    function mapApiProductToUi(apiProduct) {
        if (!apiProduct) return null;
        const price = apiProduct.discounted_price != null ? apiProduct.discounted_price : apiProduct.base_price;
        const meta = apiProduct.metadata || {};
        const variants = apiProduct.variants || [];

        // Build sizing chart from variants (unique sizes per unit)
        let sizingChart = apiProduct.sizingChart || apiProduct.sizes;
        if (!sizingChart && variants.length) {
            const byUnit = {};
            variants.forEach(v => {
                const unit = v.unit || v.size_unit || '';
                if (!byUnit[unit]) byUnit[unit] = [];
                const s = v.size || v.size_value;
                if (s && !byUnit[unit].includes(s)) byUnit[unit].push(s);
            });
            sizingChart = Object.keys(byUnit).length ? byUnit : { '': variants.map(v => v.size).filter(Boolean) };
        }

        var out = {
            id: apiProduct.id,
            name: apiProduct.name,
            brand: apiProduct.brand || apiProduct.merchant_name || '',
            description: apiProduct.description || '',
            price: price,
            currency: apiProduct.currency || 'USD',
            merchant: apiProduct.merchant_name || apiProduct.brand || '',
            images: Array.isArray(apiProduct.images) ? apiProduct.images : (apiProduct.image ? [apiProduct.image] : []),
            material_and_care: meta.material_and_care || meta.material || '',
            shipping_and_returns: meta.shipping_and_returns || meta.shipping || '',
            sizingChart: sizingChart,
            sizes: apiProduct.sizes || sizingChart,
            similar: (apiProduct.similar || apiProduct.recommendations || []).map(s => ({
                id: s.id,
                name: s.name,
                brand: s.brand || s.merchant_name || '',
                price: s.discounted_price ?? s.base_price ?? s.price,
                image: (s.images && s.images[0]) || s.image || '',
                originalPrice: s.originalPrice != null ? s.originalPrice : s.original_price,
                discountPercent: s.discountPercent
            })),
            reviews: apiProduct.reviews || []
        };
        if (apiProduct.category) out.category = apiProduct.category;
        if (apiProduct.colors && apiProduct.colors.length) out.colors = apiProduct.colors;
        if (apiProduct.availableColors && apiProduct.availableColors.length) out.colors = out.colors || apiProduct.availableColors;
        if (apiProduct.originalPrice != null || apiProduct.original_price != null) {
            out.originalPrice = apiProduct.originalPrice != null ? apiProduct.originalPrice : apiProduct.original_price;
        }
        if (apiProduct.discountPercent != null) out.discountPercent = apiProduct.discountPercent;
        return out;
    }

    /** Parse price string to number for discount calculation (handles "€ 35.62", "35.62€", "$120") */
    function parsePriceToNumber(priceStr) {
        if (priceStr == null || priceStr === '') return NaN;
        var s = String(priceStr).replace(/[€$£\s]/g, '').replace(',', '.');
        var n = parseFloat(s);
        return isNaN(n) ? NaN : n;
    }

    /** Compute discount percentage from original and sale price; returns null if invalid */
    function computeDiscountPercent(originalPrice, salePrice) {
        var orig = typeof originalPrice === 'number' ? originalPrice : parsePriceToNumber(originalPrice);
        var sale = typeof salePrice === 'number' ? salePrice : parsePriceToNumber(salePrice);
        if (isNaN(orig) || isNaN(sale) || orig <= 0 || sale >= orig) return null;
        return Math.round((1 - sale / orig) * 100);
    }

    /** Normalize price for display: "35.62€" -> "€ 35.62"; prefix form unchanged */
    function normalizePriceForDisplay(priceStr) {
        if (priceStr == null || priceStr === '') return priceStr;
        var s = typeof priceStr === 'string' ? priceStr.trim() : String(priceStr);
        if (/^[€$£]\s*[\d.,]+/.test(s)) return s;
        var m = s.match(/^([\d.,\s]+)\s*€\s*$/);
        if (m) return '€ ' + m[1].replace(/\s/g, '').trim();
        if (s.indexOf('€') >= 0) return '€ ' + s.replace(/€/g, '').replace(/\s/g, '').trim();
        return s;
    }

    /**
     * Fetch a single product by ID from the API.
     * Tries: 1) API (if configured), 2) local data/products/{id}.json (dev fallback)
     * @param {string} productId - Product ID or slug
     * @returns {Promise<object|null>} Product in loadProductData format, or null on error
     */
    var BEAUTY_IDS = ['81', '82', '83', '84', '85', '86'];
    var SALE_IDS = ['63', '64', '65', '66', '67'];
    var SALE_ORIGINAL_PRICE_FALLBACK = { '63': '€ 210', '64': '€ 190', '65': '€ 270', '66': '€ 120', '67': '€ 95' };
    var SALE_PRICE_FALLBACK = { '66': '€ 96', '67': '€ 76' };
    var BEAUTY_COLOR_FALLBACKS = {
        '81': ['Petal', 'Doux', 'Biscuit', 'Chouchette', 'Mimi', 'Poppet'],
        '82': ['Full range', 'Black', 'Brown', 'Nude', 'Burgundy', 'Grey', 'White'],
        '83': ['W0 Pearl', 'W1 Nude', 'W2 Natural', 'N1 Buff', 'N2 Sand', 'C1 Custard', 'C2 Honey', 'C3 Caramel'],
        '84': ['Cherry', 'Berry', 'Plum', 'Peach', 'Coral', 'Nude', 'Pink', 'Red'],
        '85': ['Pillow Talk', 'Pillow Talk Dreams', 'Pillow Talk Midnight', 'The Rebel', 'The Sophisticate'],
        '86': ['Rouge H', 'Rouge Casaque', 'Rouge Piment', 'Rose Lipstick', 'Nude', 'Orange Boîte', 'Burgundy', 'Pink']
    };
    /** Hex colors for beauty product swatches (name -> hex). Products 81-86. */
    var BEAUTY_COLOR_HEX = {
        '81': { 'Petal': '#F5D0C5', 'Doux': '#E8C4B8', 'Biscuit': '#E3C6A8', 'Chouchette': '#D4A574', 'Mimi': '#C9956C', 'Poppet': '#B8865C' },
        '82': { 'Full range': '#888', 'Black': '#1a1a1a', 'Brown': '#5D4037', 'Nude': '#E8D5C4', 'Burgundy': '#722F37', 'Grey': '#9E9E9E', 'White': '#F5F5F5' },
        '83': { 'W0 Pearl': '#F5F0E6', 'W1 Nude': '#E8DED2', 'W2 Natural': '#D4C4B0', 'N1 Buff': '#C9B896', 'N2 Sand': '#B8A078', 'C1 Custard': '#D4C45C', 'C2 Honey': '#C9A830', 'C3 Caramel': '#A67C52' },
        '84': { 'Cherry': '#B71C1C', 'Berry': '#880E4F', 'Plum': '#4A148C', 'Peach': '#FFAB91', 'Coral': '#FF7043', 'Nude': '#E8D5C4', 'Pink': '#F48FB1', 'Red': '#D32F2F' },
        '85': { 'Pillow Talk': '#C9A996', 'Pillow Talk Dreams': '#D4B5A8', 'Pillow Talk Midnight': '#5C4A4A', 'The Rebel': '#8D6E63', 'The Sophisticate': '#4A3728' },
        '86': { 'Rouge H': '#6D2C2C', 'Rouge Casaque': '#8B2519', 'Rouge Piment': '#C62828', 'Rose Lipstick': '#E8A0A0', 'Nude': '#E0C9B8', 'Orange Boîte': '#E65100', 'Burgundy': '#722F37', 'Pink': '#F48FB1' }
    };

    function mapCatalogProductToUi(found) {
        var id = (found.id || '').toString();
        var isBeauty = BEAUTY_IDS.indexOf(id) >= 0;
        var images = (found.imageUrls && found.imageUrls.length) ? found.imageUrls : (found.originalImageUrls && found.originalImageUrls.length) ? found.originalImageUrls : [];
        var rawPrice = (typeof found.price === 'string') ? found.price : (found.price != null ? '€ ' + found.price : null);
        if ((!rawPrice || rawPrice === '') && SALE_PRICE_FALLBACK[id]) rawPrice = SALE_PRICE_FALLBACK[id];
        var price = normalizePriceForDisplay(rawPrice);
        var origRaw = found.originalPrice != null || found.original_price != null ? (found.originalPrice != null ? found.originalPrice : found.original_price) : (SALE_IDS.indexOf(id) >= 0 ? (SALE_ORIGINAL_PRICE_FALLBACK[id] || null) : null);
        var originalPrice = origRaw ? normalizePriceForDisplay(origRaw) : null;
        var discountPercent = found.discountPercent != null ? found.discountPercent : (originalPrice && price ? computeDiscountPercent(originalPrice, rawPrice || found.price) : null);
        var meta = {
            material_and_care: isBeauty ? '' : 'Premium materials. Machine wash cold or dry clean only. Do not bleach. Lay flat to dry. Iron on low heat if needed.',
            shipping_and_returns: 'Free standard shipping on orders over $50. 30-day easy returns. Delivery within 5–7 business days. International shipping available.'
        };
        var out = {
            id: found.id,
            name: found.name || '',
            brand: found.brand || '',
            description: found.description || '',
            price: price,
            currency: 'USD',
            metadata: meta,
            images: images,
            sizes: found.sizes,
            sizingChart: Array.isArray(found.sizes) ? { '': found.sizes } : (found.sizes || {}),
            similar: []
        };
        if (originalPrice) out.originalPrice = originalPrice;
        if (discountPercent != null) out.discountPercent = discountPercent;
        if (isBeauty) {
            out.category = 'beauty';
            var rawColors = (found.colors && found.colors.length) ? found.colors : (BEAUTY_COLOR_FALLBACKS[id] || []);
            var hexMap = BEAUTY_COLOR_HEX[id];
            out.colors = rawColors.map(function(c) {
                var name = typeof c === 'string' ? c : (c.name || c.label || c);
                var hex = (typeof c === 'object' && c.hex) ? c.hex : (hexMap && hexMap[name]);
                return hex ? { name: name, hex: hex } : name;
            });
        }
        return mapApiProductToUi({
            id: out.id,
            name: out.name,
            brand: out.brand,
            description: out.description,
            base_price: out.price,
            currency: out.currency,
            metadata: out.metadata,
            images: out.images,
            sizes: out.sizes,
            sizingChart: out.sizingChart,
            similar: out.similar,
            category: out.category,
            colors: out.colors,
            originalPrice: out.originalPrice,
            discountPercent: out.discountPercent
        });
    }

    async function fetchProductById(productId) {
        if (!productId) return null;

        // When no custom API URL, try local JSON first (avoids failed API call on localhost)
        const hasCustomApi = window.GOSHOPME_API_BASE_URL && window.GOSHOPME_API_BASE_URL !== '/api';

        if (!hasCustomApi) {
            // Prefer full catalog from Category/Brand pages (includes colors for beauty)
            var catalog = window.__fullProductCatalog;
            if (catalog && catalog.products && catalog.products.length) {
                var list = catalog.products;
                var found = list.find(function(p) { return (p.id || '').toString() === (productId || '').toString(); });
                if (found) return mapCatalogProductToUi(found);
            }
            const jsonPaths = [
                'data/products/' + encodeURIComponent(productId) + '.json',
                './data/products/' + encodeURIComponent(productId) + '.json',
                window.location.pathname.replace(/\/[^/]*$/, '/') + 'data/products/' + encodeURIComponent(productId) + '.json'
            ];
            for (const path of jsonPaths) {
                try {
                    const res = await fetch(path);
                    if (res.ok) {
                        const json = await res.json();
                        return mapApiProductToUi(json.data || json.product || json);
                    }
                } catch (e) { /* try next */ }
            }
            // Fallback: try home.json and trending.json for products from feeds
            const feedPaths = ['data/home.json', './data/home.json', 'data/trending.json', './data/trending.json'];
            for (const path of feedPaths) {
                try {
                    const res = await fetch(path);
                    if (!res.ok) continue;
                    const json = await res.json();
                    const items = (json.justForYou || []).concat(json.trending || []);
                    const found = items.find(p => (p.id || '').toLowerCase() === (productId || '').toLowerCase());
                    if (found) {
                        return mapApiProductToUi({
                            id: found.id,
                            name: found.name,
                            brand: found.brand || '',
                            image: found.image || '',
                            images: found.image ? [found.image] : [],
                            base_price: typeof found.price === 'string' ? parseFloat(found.price.replace(/[^0-9.]/g, '')) : found.price,
                            currency: 'USD',
                            description: found.description || '',
                            metadata: {},
                            similar: []
                        });
                    }
                } catch (e) { /* try next */ }
            }
            // Fallback: demo catalog from GitHub or local data/product-catalog.json
            var catalogUrl = 'data/product-catalog.json';
            try {
                var catRes = await fetch(catalogUrl);
                if (!catRes.ok) catRes = await fetch('https://raw.githubusercontent.com/nora-todorova/GoShopMe-assets/main/product-catalog.json');
                if (!catRes.ok) return null;
                var catalog = await catRes.json();
                var list = catalog.products || [];
                var found = list.find(function(p) { return (p.id || '').toString() === (productId || '').toString(); });
                if (found) return mapCatalogProductToUi(found);
            } catch (e) { /* ignore */ }
        }

        // Try API
        if (hasCustomApi) {
            try {
                const res = await fetch(BASE_URL + ENDPOINTS.product + '/' + encodeURIComponent(productId), {
                    credentials: 'same-origin',
                    headers: { 'Accept': 'application/json' }
                });
                if (res.ok) {
                    const json = await res.json();
                    return mapApiProductToUi(json.data || json.product || json);
                }
            } catch (err) {
                console.warn('Product API fetchProductById failed:', err);
            }
        }

        return null;
    }

    const DEMO_CATALOG_URL = 'https://raw.githubusercontent.com/nora-todorova/GoShopMe-assets/main/product-catalog.json';

    /**
     * Fetch product list (search or recommendations).
     * When opts.brand is set and API is not configured, falls back to demo catalog filtered by brand (e.g. Saint Laurent).
     * @param {object} opts - { q?, image_url?, video_url?, merchant_id?, brand? } for search
     * @returns {Promise<array>} Array of products in tile format { id, name, brand, price, image }
     */
    async function fetchProducts(opts) {
        const brand = opts?.brand ? String(opts.brand).trim() : '';
        try {
            const useSearch = opts?.q || opts?.image_url || opts?.video_url || brand;
            const endpoint = useSearch
                ? ENDPOINTS.search + '?' + new URLSearchParams(opts).toString()
                : ENDPOINTS.recommendations;
            const res = await fetch(BASE_URL + endpoint, {
                credentials: 'same-origin',
                headers: { 'Accept': 'application/json' }
            });
            if (!res.ok) throw new Error('Request failed');
            const json = await res.json();
            const items = json.data || json.products || json.results || json.items || [];
            return items.map(p => ({
                id: p.id,
                name: p.name,
                brand: p.brand || p.merchant_name || '',
                price: typeof p.price === 'number' ? '$' + p.price : (p.discounted_price ? '$' + p.discounted_price : '$' + (p.base_price || 0)),
                image: (p.images && p.images[0]) || p.image || ''
            }));
        } catch (err) {
            if (brand) {
                try {
                    const catRes = await fetch(DEMO_CATALOG_URL);
                    if (!catRes.ok) return [];
                    const catalog = await catRes.json();
                    const list = (catalog.products || []).filter(function(p) {
                        const b = (p.brand || '').trim().toUpperCase();
                        const match = brand.toUpperCase();
                        return b.indexOf(match) >= 0 || match.indexOf(b) >= 0;
                    });
                    return list.map(function(p) {
                        var img = (p.imageUrls && p.imageUrls[0]) || (p.images && p.images[0]) || '';
                        var price = (typeof p.price === 'string') ? p.price : (p.price != null ? '$' + p.price : '');
                        return { id: p.id, name: p.name, brand: p.brand || '', price: price, image: img };
                    });
                } catch (e) {
                    console.warn('Demo catalog fallback failed:', e);
                }
            }
            return [];
        }
    }

    window.GoShopMeProductAPI = {
        fetchProductById,
        fetchProducts,
        mapApiProductToUi,
        normalizePriceForDisplay,
        computeDiscountPercent,
        parsePriceToNumber,
        BASE_URL,
        ENDPOINTS
    };
})();
