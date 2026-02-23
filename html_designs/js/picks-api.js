/**
 * GoShopMe Picks API Service
 * Fetches creator picks from API when configured.
 * Falls back to inline window.__PICKS_FALLBACK_DATA when running locally.
 */
(function() {
    'use strict';

    const BASE_URL = window.GOSHOPME_API_BASE_URL || '/api';
    const ENDPOINT = '/picks/creators';

    async function fetchCreatorPicks() {
        if (!window.GOSHOPME_API_BASE_URL) return null;

        try {
            const res = await fetch(BASE_URL + ENDPOINT, {
                credentials: 'same-origin',
                headers: { 'Accept': 'application/json' }
            });
            if (res.ok) {
                const json = await res.json();
                return (json.data || json).creators || (json.data || json);
            }
        } catch (err) {
            console.warn('Picks API fetchCreatorPicks failed:', err);
        }
        return null;
    }

    window.GoShopMePicksAPI = { fetchCreatorPicks, BASE_URL, ENDPOINT };
})();
