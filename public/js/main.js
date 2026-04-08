// SEO-optimized JavaScript for POS website
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle (if needed)
    const mobileMenuToggle = document.querySelector('.nav-toggle') || document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        const openMenu = () => {
            mobileMenuToggle.setAttribute('aria-expanded', 'true');
            navMenu.classList.add('open');
            document.body.classList.add('no-scroll');
        };

        const closeMenu = () => {
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('open');
            document.body.classList.remove('no-scroll');
        };

        mobileMenuToggle.addEventListener('click', function() {
            const expanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
            if (expanded) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('open')) {
                    closeMenu();
                }
            });
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('open')) {
                closeMenu();
                mobileMenuToggle.focus();
            }
        });
    }

    // Lazy loading for images (SEO benefit)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Form validation and submission (keep generic forms untouched)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        // No-op here; specific handlers applied to contact forms below
    });

    // Track user engagement for SEO analytics
    let scrollDepth = 0;
    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.pageYOffset;
        const currentScrollDepth = Math.round((scrollTop / documentHeight) * 100);
        
        if (currentScrollDepth > scrollDepth && currentScrollDepth % 25 === 0) {
            scrollDepth = currentScrollDepth;
            // Track scroll depth milestone
            if (typeof gtag !== 'undefined') {
                gtag('event', 'scroll_depth', {
                    'custom_parameter': scrollDepth + '%'
                });
            }
        }
    });

    // Scroll-triggered reveal animations
    const revealTargets = document.querySelectorAll('.reveal');
    if (revealTargets.length && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver(function(entries, obs) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
        revealTargets.forEach(function(el) { revealObserver.observe(el); });
    }

    // Animate metric counters on scroll
    var metricValues = document.querySelectorAll('.metric-value[data-target]');
    if (metricValues.length && 'IntersectionObserver' in window) {
        var counterObserver = new IntersectionObserver(function(entries, obs) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var el = entry.target;
                    var target = el.getAttribute('data-target');
                    if (/^\d+$/.test(target)) {
                        var current = 0;
                        var end = parseInt(target, 10);
                        var step = Math.ceil(end / 40);
                        var timer = setInterval(function() {
                            current += step;
                            if (current >= end) { current = end; clearInterval(timer); }
                            el.textContent = current;
                        }, 30);
                    }
                    obs.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        metricValues.forEach(function(el) { counterObserver.observe(el); });
    }

    // Contact form enhancement
    const contactForms = document.querySelectorAll('.contact-form');
    contactForms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });

        // AJAX submit to /api/contact and show modal on success
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Clear top-level error box if present
            const existingErrorBox = form.parentNode.querySelector('.error-list');
            if (existingErrorBox) existingErrorBox.remove();

                // Validate required fields
                let ok = true;
                const toValidate = form.querySelectorAll('input[required], select[required], textarea[required]');
                toValidate.forEach(f => { if (!validateField(f)) ok = false; });
                if (!ok) return;

                const submitBtn = form.querySelector('button[type="submit"]');
                const prevText = submitBtn ? submitBtn.textContent : null;
                if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending...'; }

                const data = {};
                new FormData(form).forEach((v,k) => { data[k]=v; });

                try {
                    const resp = await fetch('/api/contact', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                        body: JSON.stringify(data)
                    });

                    if (resp.ok) {
                        const json = await resp.json();
                        openModal(json.message || 'Thanks — we will contact you shortly');
                        form.reset();
                    } else {
                        const err = await resp.json().catch(()=>({ errors: ['Submission failed'] }));
                        renderFormErrors(form, err.errors || ['Submission failed']);
                    }
                } catch (err) {
                    renderFormErrors(form, ['Network error — please try again']);
                } finally {
                    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = prevText || 'Send Request'; }
                }
        });
    });

    function validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        
        if (type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        if (field.required && !value) {
            showFieldError(field, 'This field is required');
            return false;
        }
        
        clearFieldError(field);
        return true;
    }

    function showFieldError(field, message) {
        clearFieldError(field);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
        field.classList.add('error');
    }

    function clearFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        field.classList.remove('error');
    }

    // Render server-side style errors in a top box
    function renderFormErrors(form, errors) {
        const box = document.createElement('div');
        box.className = 'error-list card-error';
        box.innerHTML = '<strong>Please fix the following:</strong><ul>' + errors.map(e => '<li>' + e + '</li>').join('') + '</ul>';
        form.parentNode.insertBefore(box, form);
        box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Modal helpers
    function openModal(message) {
        const modal = document.getElementById('contactModal');
        if (!modal) return;
        const msg = modal.querySelector('#contactModalMessage');
        if (msg) msg.textContent = message;
        modal.setAttribute('aria-hidden', 'false');
        modal.classList.remove('hidden');
        // trap focus minimally
        const close = modal.querySelector('.modal-close');
        if (close) close.focus();
    }

    function closeModal() {
        const modal = document.getElementById('contactModal');
        if (!modal) return;
        modal.setAttribute('aria-hidden', 'true');
        modal.classList.add('hidden');
    }

    // Modal event wiring
    document.addEventListener('click', function(e) {
        // close on backdrop or close button
        if (e.target.matches('.modal-backdrop') || e.target.matches('.modal-close') || e.target.matches('.modal-ok')) {
            closeModal();
        }
    });
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeModal(); });
});

// Performance monitoring
window.addEventListener('load', function() {
    // Track page load time for performance optimization
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log('Page load time:', loadTime + 'ms');
    
    // Track Core Web Vitals
    if ('web-vital' in window) {
        // This would integrate with actual web vitals library
        console.log('Tracking Core Web Vitals for SEO');
    }
});

// Export functions for use in other scripts
window.POSWebsite = {
    validateField: function(field) {
        // Field validation function
        return true;
    },
    trackEvent: function(eventName, parameters) {
        // Event tracking for analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, parameters);
        }
    }
};
