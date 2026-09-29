// Immediate redirect for /review (meta refresh is the no-JS fallback)
(function () {
    var t = document.currentScript && document.currentScript.getAttribute('data-target');
    if (t) location.replace(t);
})();
