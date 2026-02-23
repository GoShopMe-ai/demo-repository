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

        return {
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
                image: (s.images && s.images[0]) || s.image || ''
            })),
            reviews: apiProduct.reviews || []
        };
    }

    /**
     * Fetch a single product by ID from the API.
     * Tries: 1) API (if configured), 2) local data/products/{id}.json (dev fallback)
     * @param {string} productId - Product ID or slug
     * @returns {Promise<object|null>} Product in loadProductData format, or null on error
     */
    async function fetchProductById(productId) {
        if (!productId) return null;

        // When no custom API URL, try local JSON first (avoids failed API call on localhost)
        const hasCustomApi = window.GOSHOPME_API_BASE_URL && window.GOSHOPME_API_BASE_URL !== '/api';

        if (!hasCustomApi) {
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

    /**
     * Fetch product list (search or recommendations).
     * @param {object} opts - { q?, image_url?, video_url?, merchant_id?, brand? } for search
     * @returns {Promise<array>} Array of products in tile format { id, name, brand, price, image }
     */
    async function fetchProducts(opts) {
        try {
            const useSearch = opts?.q || opts?.image_url || opts?.video_url || opts?.brand;
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
            console.warn('Product API fetchProducts failed:', err);
            return [];
        }
    }

    window.GoShopMeProductAPI = {
        fetchProductById,
        fetchProducts,
        mapApiProductToUi,
        BASE_URL,
        ENDPOINTS
    };
})();
