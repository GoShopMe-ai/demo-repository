/**
 * GoShopMe Home API Service
 * Fetches home feed from the API when configured.
 * Falls back to inline window.__HOME_FALLBACK_DATA when running locally.
 */
(function() {
    'use strict';

    const BASE_URL = window.GOSHOPME_API_BASE_URL || '/api';
    const ENDPOINT = '/home/feed';

    async function fetchHomeFeed() {
        if (!window.GOSHOPME_API_BASE_URL) return null;

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
        return null;
    }

    function normalizeFeed(raw) {
        const jfy = raw.justForYou;
        const jfyProducts = Array.isArray(jfy) ? jfy : (jfy?.products || []);
        return {
            justForYou: jfyProducts,
            trending: Array.isArray(raw.trending) ? raw.trending : [],
            creatorCollections: Array.isArray(raw.creatorCollections || raw.creators) ? (raw.creatorCollections || raw.creators) : [],
            categories: Array.isArray(raw.categories) ? raw.categories : [],
            recentActivity: Array.isArray(raw.recentActivity) ? raw.recentActivity : []
        };
    }

    window.GoShopMeHomeAPI = { fetchHomeFeed, BASE_URL, ENDPOINT };
})();
