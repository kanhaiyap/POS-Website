/**
 * Live Google reviews widget.
 * Loads the Maps JavaScript API (Places library) only when the section scrolls into view,
 * fetches rating + up to 5 reviews for our Place ID, and renders them with the author
 * attribution Google requires. Nothing is cached or stored — every view is live from Google.
 * The section stays hidden if loading fails or there are fewer than data-min-reviews reviews.
 */
(function () {
    var section = document.getElementById('google-reviews');
    if (!section) return;

    var placeId = section.getAttribute('data-place-id');
    var key = section.getAttribute('data-key');
    var minReviews = parseInt(section.getAttribute('data-min-reviews') || '3', 10);
    var el = function (name) { return section.querySelector('[data-gr="' + name + '"]'); };

    function stars(n) {
        var full = Math.round(n);
        return '★★★★★'.slice(0, full) + '☆☆☆☆☆'.slice(0, 5 - full);
    }

    function text(tag, cls, value) {
        var node = document.createElement(tag);
        if (cls) node.className = cls;
        if (value) node.textContent = value;
        return node;
    }

    function render(place) {
        var count = place.userRatingCount || 0;
        if (!place.rating || count < minReviews) return;

        el('rating').textContent = place.rating.toFixed(1);
        el('stars').textContent = stars(place.rating);
        el('count').textContent = count;
        if (place.googleMapsURI) el('count-link').href = place.googleMapsURI;

        var list = el('list');
        (place.reviews || []).filter(function (r) { return r.text; }).slice(0, 5).forEach(function (r) {
            var card = text('article', 'gr-card');
            var head = text('div', 'gr-card-head');
            var author = r.authorAttribution || {};
            if (author.photoURI) {
                var img = document.createElement('img');
                img.src = author.photoURI; img.alt = ''; img.width = 36; img.height = 36; img.loading = 'lazy';
                img.referrerPolicy = 'no-referrer';
                head.appendChild(img);
            }
            var who = text('div', 'gr-card-who');
            var name = author.uri ? document.createElement('a') : document.createElement('span');
            name.className = 'gr-card-name';
            name.textContent = author.displayName || 'Google user';
            if (author.uri) { name.href = author.uri; name.target = '_blank'; name.rel = 'noopener'; }
            who.appendChild(name);
            who.appendChild(text('span', 'gr-card-meta', stars(r.rating || 0) + ' · ' + (r.relativePublishTimeDescription || '')));
            head.appendChild(who);
            card.appendChild(head);
            card.appendChild(text('p', 'gr-card-text', String(r.text).slice(0, 400)));
            list.appendChild(card);
        });

        section.hidden = false;
    }

    window.bmGoogleReviewsInit = function () {
        google.maps.importLibrary('places').then(function (lib) {
            var place = new lib.Place({ id: placeId });
            return place.fetchFields({ fields: ['rating', 'userRatingCount', 'reviews', 'googleMapsURI'] })
                .then(function () { render(place); });
        }).catch(function () { /* keep hidden on any failure */ });
    };

    function load() {
        var s = document.createElement('script');
        s.src = 'https://maps.googleapis.com/maps/api/js?key=' + encodeURIComponent(key) +
                '&v=weekly&loading=async&callback=bmGoogleReviewsInit';
        s.async = true;
        document.head.appendChild(s);
    }

    // The section is hidden (no layout box) until loaded, so observe a 1px marker in its place.
    var target = document.querySelector('[data-gr-sentinel]') || section;
    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
            if (entries.some(function (e) { return e.isIntersecting; })) { io.disconnect(); load(); }
        }, { rootMargin: '600px 0px' });
        io.observe(target);
    } else {
        load();
    }
})();
