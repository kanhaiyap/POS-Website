/**
 * Analytics + conversion tracking.
 * IDs come from data attributes on this script tag (set from GA4_ID / CLARITY_ID at build time).
 * Exposes window.bmTrack(eventName, params) for other scripts (e.g. contact form success).
 *
 * Conversions to mark as "key events" in GA4: generate_lead, whatsapp_click, phone_click.
 */
(function () {
    var script = document.currentScript;
    var ga4Id = script && script.getAttribute('data-ga4');
    var clarityId = script && script.getAttribute('data-clarity');

    if (ga4Id) {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { window.dataLayer.push(arguments); };
        window.gtag('js', new Date());
        window.gtag('config', ga4Id);
    }

    if (clarityId) {
        (function (c, l, a, r, i, t, y) {
            c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
            t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
            y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
        })(window, document, 'clarity', 'script', clarityId);
    }

    window.bmTrack = function (name, params) {
        params = params || {};
        params.page_path = location.pathname;
        if (window.gtag) window.gtag('event', name, params);
        if (window.clarity) window.clarity('event', name);
    };

    // Track WhatsApp and phone taps anywhere on the site
    document.addEventListener('click', function (e) {
        var link = e.target.closest && e.target.closest('a[href]');
        if (!link) return;
        var href = link.getAttribute('href');
        if (href.indexOf('https://wa.me/') === 0) window.bmTrack('whatsapp_click', { link_text: (link.textContent || '').trim().slice(0, 60) });
        else if (href.indexOf('tel:') === 0) window.bmTrack('phone_click', {});
    });
})();
