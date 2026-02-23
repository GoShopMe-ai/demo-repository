/**
 * GoShopMe Home API Service
 * Fetches home feed (Just for You, Trending, Creator Collections, Categories)
 * from the database/API. Falls back to data/home.json when API is unavailable.
 *
 * Usage:
 *   window.GOSHOPME_API_BASE_URL = 'https://api.example.com';
 *   const data = await window.GoShopMeHomeAPI.fetchHomeFeed();
 *   window.loadHomeDynamicSections(data);
 */
(function() {
    'use strict';

    const BASE_URL = window.GOSHOPME_API_BASE_URL || '/api';
    const ENDPOINT = '/home/feed';

    async function fetchHomeFeed() {
        const hasCustomApi = window.GOSHOPME_API_BASE_URL && window.GOSHOPME_API_BASE_URL !== '/api';

        if (hasCustomApi) {
            try {
                const res = await fetch(BASE_URL + ENDPOINT, {
                    credentials: 'same-origin',
                    headers: { 'Accept': 'application/json' }
                });
                if (res.ok) {
                    const json = await res.json();
                    return normalizeFeed(json.data || json);
                }
            } catch (err) {
                console.warn('Home API fetchHomeFeed failed:', err);
            }
        }

        const jsonPaths = [
            'data/home.json',
            './data/home.json',
            window.location.pathname.replace(/\/[^/]*$/, '/') + 'data/home.json'
        ];
        for (const path of jsonPaths) {
            try {
                const res = await fetch(path);
                if (res.ok) {
                    const json = await res.json();
                    return normalizeFeed(json);
                }
            } catch (e) { /* try next */ }
        }

        return null;
    }

    function normalizeFeed(raw) {
        const jfy = raw.justForYou;
        const jfyProducts = Array.isArray(jfy) ? jfy : (jfy?.products || []);
        const trending = Array.isArray(raw.trending) ? raw.trending : [];
        const creators = raw.creatorCollections || raw.creators || [];
        const categories = raw.categories || [];
        const recentActivity = raw.recentActivity || [];
        return {
            justForYou: jfyProducts,
            trending: trending,
            creatorCollections: Array.isArray(creators) ? creators : [],
            categories: Array.isArray(categories) ? categories : [],
            recentActivity: Array.isArray(recentActivity) ? recentActivity : []
        };
    }

    window.GoShopMeHomeAPI = {
        fetchHomeFeed,
        BASE_URL,
        ENDPOINT
    };
})();
