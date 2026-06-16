/* ===================================================
   ContentForge AI — Landing Page Scripts
   =================================================== */

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // =====================================
    // Mobile Navigation Toggle
    // =====================================
    const navToggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('nav');

    if (navToggle && nav) {
        navToggle.addEventListener('click', function () {
            const isOpen = nav.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        // Close nav on link click (mobile)
        nav.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                nav.classList.remove('open');
                navToggle.setAttribute('aria-expanded', false);
            });
        });
    }

    // =====================================
    // Header scroll shadow effect
    // =====================================
    const header = document.getElementById('site-header');
    let lastScrollY = 0;

    if (header) {
        window.addEventListener('scroll', function () {
            const scrollY = window.scrollY;
            if (scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            lastScrollY = scrollY;
        }, { passive: true });
    }

    // =====================================
    // Smooth scroll for anchor links (fallback)
    // =====================================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =====================================
    // CTA Form Handling
    // =====================================
    const ctaForm = document.getElementById('cta-form');

    if (ctaForm) {
        ctaForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('cta-name').value.trim();
            const email = document.getElementById('cta-email').value.trim();
            const company = document.getElementById('cta-company').value.trim();

            if (!name || !email) {
                showFormFeedback(ctaForm, 'Please fill in your name and email.', 'error');
                return;
            }

            // Basic email validation
            if (!email.includes('@') || !email.includes('.')) {
                showFormFeedback(ctaForm, 'Please enter a valid email address.', 'error');
                return;
            }

            // Real submission via fetch
            const submitBtn = ctaForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            var formData = new URLSearchParams();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('company', company);

            fetch('/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (data.status === 'ok') {
                    // Hide form fields, show success
                    ctaForm.querySelectorAll('.form-group').forEach(function (el) {
                        el.style.display = 'none';
                    });
                    submitBtn.style.display = 'none';

                    var feedback = document.createElement('div');
                    feedback.className = 'form-success';
                    feedback.textContent = data.message;
                    ctaForm.appendChild(feedback);
                } else {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    showFormFeedback(ctaForm, data.message || 'Something went wrong. Please try again.', 'error');
                }
            })
            .catch(function () {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                showFormFeedback(ctaForm, 'Could not connect. Please try again or email us directly.', 'error');
            });
        });
    }

    /**
     * Show temporary feedback on the form
     */
    function showFormFeedback(form, message, type) {
        // Remove existing feedback
        var existing = form.querySelector('.form-feedback');
        if (existing) existing.remove();

        var feedback = document.createElement('p');
        feedback.className = 'form-feedback';
        feedback.style.cssText = 'grid-column: 1 / -1; font-size: 0.85rem; color: #E07A5F; font-family: Raleway, sans-serif; font-weight: 500;';
        feedback.textContent = message;
        form.insertBefore(feedback, form.querySelector('.btn'));

        // Auto-remove after 3 seconds
        setTimeout(function () {
            if (feedback.parentNode) feedback.remove();
        }, 3000);
    }

    // =====================================
    // Intersection Observer — fade-in animations
    // =====================================
    // Only run if the browser supports it
    if ('IntersectionObserver' in window) {
        var animateElements = document.querySelectorAll(
            '.step, .tier-card, .diff-card, .showcase-grid > *, .preview-card'
        );

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animateElements.forEach(function (el) {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }
});