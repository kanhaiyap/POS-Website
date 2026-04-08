// Hero word cycling
window.addEventListener('load', function () {
    var track = document.getElementById('heroWordTrack');
    if (!track) return;
    var words = track.querySelectorAll('.hero-word');
    if (!words.length) return;
    var idx = 0;
    // Read height after fonts are guaranteed to be loaded
    function getSlotH() {
        var h = words[0].getBoundingClientRect().height;
        return h > 0 ? h : 126;
    }
    var SLOT_H = getSlotH();
    track.style.transition = 'transform 0.6s cubic-bezier(0.4,0,0.2,1)';
    setInterval(function () {
        idx = (idx + 1) % words.length;
        SLOT_H = getSlotH();
        track.style.transform = 'translateY(-' + (idx * SLOT_H) + 'px)';
    }, 2400);
});

// FAQ carousel cycling
(function () {
    var carousel = document.getElementById('faqCarousel');
    if (!carousel) return;
    var items = carousel.querySelectorAll('.faq-featured-card');
    var dots = document.querySelectorAll('#faqNav .faq-dot');
    if (!items.length) return;
    var current = 0;
    var timer;

    function showFaq(idx) {
        items[current].classList.remove('faq-item--active');
        if (dots[current]) dots[current].classList.remove('faq-dot--active');
        current = idx;
        items[current].classList.add('faq-item--active');
        if (dots[current]) dots[current].classList.add('faq-dot--active');
    }

    function startTimer() {
        timer = setInterval(function () {
            showFaq((current + 1) % items.length);
        }, 5000);
    }

    dots.forEach(function (dot, i) {
        dot.addEventListener('click', function () {
            clearInterval(timer);
            showFaq(i);
            startTimer();
        });
    });

    startTimer();
})();

// Feature panel tab switcher
(function () {
    var tabs = document.querySelectorAll('.pf-tab');
    var panels = document.querySelectorAll('.pf-panel');
    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            tabs.forEach(function (t) { t.classList.remove('pf-tab--active'); });
            panels.forEach(function (p) { p.classList.remove('pf-panel--active'); });
            tab.classList.add('pf-tab--active');
            var target = document.getElementById('pf-' + tab.dataset.tab);
            if (target) target.classList.add('pf-panel--active');
        });
    });

    // Arrow navigation between panels
    document.querySelectorAll('.pf-arrow').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var activeTab = document.querySelector('.pf-tab--active');
            var tabList = Array.from(tabs);
            var currentIndex = tabList.indexOf(activeTab);
            var dir = parseInt(btn.dataset.dir) || 1;
            var nextIndex = (currentIndex + dir + tabList.length) % tabList.length;
            tabList[nextIndex].click();
        });
    });
})();
