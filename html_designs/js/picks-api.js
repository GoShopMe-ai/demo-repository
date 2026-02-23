/**
 * GoShopMe Picks API Service
 * Fetches creator picks data from API or data/picks.json.
 *
 * Usage:
 *   const creators = await window.GoShopMePicksAPI.fetchCreatorPicks();
 *   window.loadCreatorPicksData(creators);
 */
(function() {
    'use strict';

    const BASE_URL = window.GOSHOPME_API_BASE_URL || '/api';
    const ENDPOINT = '/picks/creators';

    async function fetchCreatorPicks() {
        const hasCustomApi = window.GOSHOPME_API_BASE_URL && window.GOSHOPME_API_BASE_URL !== '/api';

        if (hasCustomApi) {
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
        }

        const paths = [
            'https://raw.githubusercontent.com/nora-todorova/GoShopMe/main/html_designs/data/picks.json',
            'data/picks.json',
            './data/picks.json'
        ];
        for (const path of paths) {
            try {
                const res = await fetch(path);
                if (res.ok) {
                    const json = await res.json();
                    return json.creators || json;
                }
            } catch (e) { /* try next */ }
        }
        return null;
    }

    window.GoShopMePicksAPI = { fetchCreatorPicks, BASE_URL, ENDPOINT };
})();
