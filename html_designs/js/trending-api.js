/**
 * GoShopMe Trending Now API Service
 * Fetches trending feed from API when configured.
 * Falls back to inline window.__TRENDING_FALLBACK_DATA when running locally.
 */
(function() {
    'use strict';

    const BASE_URL = window.GOSHOPME_API_BASE_URL || '/api';
    const ENDPOINT = '/trending/feed';

    async function fetchTrendingFeed() {
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
            console.warn('Trending API fetchTrendingFeed failed:', err);
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

    window.GoShopMeTrendingAPI = { fetchTrendingFeed, BASE_URL, ENDPOINT };
})();
