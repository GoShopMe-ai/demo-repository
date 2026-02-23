/**
 * GoShopMe Trending Now API Service
 * Fetches trending feed (Just for You, Featured Brand, Celebrity Picks, Creator Spotlight)
 * from the database/API. Falls back to data/trending.json when API is unavailable.
 *
 * Usage:
 *   window.GOSHOPME_API_BASE_URL = 'https://api.example.com';
 *   const data = await window.GoShopMeTrendingAPI.fetchTrendingFeed();
 *   window.loadTrendingData(data);
 */
(function() {
    'use strict';

    const BASE_URL = window.GOSHOPME_API_BASE_URL || '/api';
    const ENDPOINT = '/trending/feed';

    /**
     * Fetch the full Trending Now feed.
     * Tries: 1) API (if configured), 2) data/trending.json, 3) returns null for inline fallback
     * @returns {Promise<object|null>} Trending feed or null
     */
    async function fetchTrendingFeed() {
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
                console.warn('Trending API fetchTrendingFeed failed:', err);
            }
        }

        // Fallback: local JSON
        const jsonPaths = [
            'data/trending.json',
            './data/trending.json',
            window.location.pathname.replace(/\/[^/]*$/, '/') + 'data/trending.json'
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
        return {
            justForYou: raw.justForYou || { products: [] },
            featuredBrand: raw.featuredBrand || null,
            celebrityPicks: Array.isArray(raw.celebrityPicks) ? raw.celebrityPicks : [],
            creatorSpotlight: Array.isArray(raw.creatorSpotlight) ? raw.creatorSpotlight : []
        };
    }

    window.GoShopMeTrendingAPI = {
        fetchTrendingFeed,
        BASE_URL,
        ENDPOINT
    };
})();
