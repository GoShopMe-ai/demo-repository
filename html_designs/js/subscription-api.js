/**
 * GoShopMe Subscription API
 * Fetches subscription details and payment history from the database.
 * Use window.__subscriptionData for dev mode / mock data.
 *
 * Data shape:
 * {
 *   subscription: { ... },
 *   payments: Array<{ id, date, planName, amount, status, receiptUrl? }>,
 *   hasMore: boolean
 * }
 */
(function() {
    'use strict';

    var ALL_PAYMENTS = [
        { id: '1', date: 'July 15, 2025', planName: 'Premium (Monthly)', amount: '$19.99', status: 'paid' },
        { id: '2', date: 'June 15, 2025', planName: 'Premium (Monthly)', amount: '$19.99', status: 'paid' },
        { id: '3', date: 'May 15, 2025', planName: 'Premium (Monthly)', amount: '$19.99', status: 'paid' },
        { id: '4', date: 'April 15, 2025', planName: 'Premium (Monthly)', amount: '$19.99', status: 'paid' },
        { id: '5', date: 'March 15, 2025', planName: 'Premium (Monthly)', amount: '$19.99', status: 'paid' },
        { id: '6', date: 'February 15, 2025', planName: 'Premium (Monthly)', amount: '$19.99', status: 'paid' },
        { id: '7', date: 'January 15, 2025', planName: 'Premium (Monthly)', amount: '$19.99', status: 'paid' },
        { id: '8', date: 'December 15, 2024', planName: 'Premium (Monthly)', amount: '$19.99', status: 'paid' }
    ];

    var DEFAULT_SUBSCRIPTION = {
        plan: 'monthly',
        status: 'active',
        planName: 'Premium Plan',
        price: '$19.99',
        interval: '/month',
        nextBillingDate: 'August 15, 2025',
        paymentMethod: 'Visa ending in 4242'
    };

    var INITIAL_PAGE_SIZE = 3;
    var LOAD_MORE_PAGE_SIZE = 5;

    function fetchSubscriptionData() {
        if (window.__subscriptionData) {
            var data = window.__subscriptionData;
            var payments = (data.payments || []).slice(0, INITIAL_PAGE_SIZE);
            var hasMore = (data.payments || []).length > INITIAL_PAGE_SIZE;
            return Promise.resolve({
                subscription: data.subscription || DEFAULT_SUBSCRIPTION,
                payments: payments,
                hasMore: hasMore
            });
        }
        if (typeof window.GoShopMeSubscriptionAPI !== 'undefined' && window.GoShopMeSubscriptionAPI.fetch) {
            return window.GoShopMeSubscriptionAPI.fetch();
        }
        return Promise.resolve({
            subscription: DEFAULT_SUBSCRIPTION,
            payments: ALL_PAYMENTS.slice(0, INITIAL_PAGE_SIZE),
            hasMore: ALL_PAYMENTS.length > INITIAL_PAGE_SIZE
        });
    }

    function fetchMorePayments(offset) {
        var all = window.__subscriptionData && window.__subscriptionData.payments
            ? window.__subscriptionData.payments
            : ALL_PAYMENTS;
        var page = (all || []).slice(offset, offset + LOAD_MORE_PAGE_SIZE);
        return Promise.resolve({
            payments: page,
            hasMore: offset + page.length < (all || []).length
        });
    }

    function cancelSubscription(reason, otherReasonText) {
        var payload = { reason: reason || '' };
        if (reason === 'other' && otherReasonText) payload.otherReason = otherReasonText.trim();
        if (typeof window.GoShopMeSubscriptionAPI !== 'undefined' && window.GoShopMeSubscriptionAPI.cancel) {
            return window.GoShopMeSubscriptionAPI.cancel(payload);
        }
        return fetch('/api/subscription/cancel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).then(function(r) {
            if (!r.ok) throw new Error('Cancel failed');
            return r.json().catch(function() { return {}; });
        }).catch(function() {
            return Promise.resolve({});
        });
    }

    window.GoShopMeSubscriptionAPI = {
        fetchSubscriptionData: fetchSubscriptionData,
        fetchMorePayments: fetchMorePayments,
        cancelSubscription: cancelSubscription,
        DEFAULT_DATA: { subscription: DEFAULT_SUBSCRIPTION, payments: ALL_PAYMENTS, hasMore: true }
    };
})();
