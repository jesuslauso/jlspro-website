/* ========================================
   JLS Pro Limited - Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    initNavbar();
    // Scroll animations
    initScrollAnimations();
    // Mobile menu
    initMobileMenu();
    // Particle animation (hero)
    initParticles();
    // Randomize glow orb positions (subpages)
    initGlowOrbs();
    // Page background particles (subpages)
    initPageParticles();
    // Moving dots animation (subpages)
    initMovingDots();
    // Counter animation
    initCounters();
    // Services accordion
    initAccordion();
});

/* Navbar */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* Mobile Menu */
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!toggle || !navLinks) return;
    
    const navbar = document.querySelector('.navbar');

    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        toggle.classList.toggle('active');
        // Boost navbar z-index when menu is open to ensure overlay covers all content
        if (navbar) {
            navbar.classList.toggle('menu-open');
        }
        // Prevent body scroll when menu is open
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            toggle.classList.remove('active');
            if (navbar) navbar.classList.remove('menu-open');
            document.body.style.overflow = '';
        });
    });
}

/* Scroll Animations */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => observer.observe(el));
}

/* Particle Animation (Hero section on homepage) */
function initParticles() {
    const container = document.querySelector('.hero-bg-animation');
    if (!container) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        
        // Random colors between blue and purple
        const colors = ['var(--accent-blue)', 'var(--accent-purple)', '#fff'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.width = (Math.random() * 3 + 1) + 'px';
        particle.style.height = particle.style.width;
        
        container.appendChild(particle);
    }
}

/* Randomize Glow Orb positions and colors on each page load (subpages) */
function initGlowOrbs() {
    const bgEffects = document.querySelector('.page-bg-effects');
    if (!bgEffects) return;

    const orbs = bgEffects.querySelectorAll('.glow-orb');
    if (orbs.length === 0) return;

    // Color palette: mix of blues, purples, teals, and magentas
    const colorOptions = [
        '#00d4ff',  // accent blue
        '#7b2ff7',  // accent purple
        '#00ffcc',  // teal
        '#ff00aa',  // magenta
        '#0066ff',  // deep blue
        '#aa00ff',  // violet
        'rgba(0, 212, 255, 0.8)',
        'rgba(123, 47, 247, 0.8)'
    ];

    orbs.forEach((orb, index) => {
        // Random position: anywhere on the viewport (allow partial off-screen for natural look)
        const topPct  = (Math.random() * 120 - 10);  // -10% to 110%
        const leftPct = (Math.random() * 120 - 10);  // -10% to 110%

        // Random size between 200px and 500px
        const size = Math.floor(Math.random() * 300 + 200) + 'px';

        // Pick two random colors for a gradient
        const color1 = colorOptions[Math.floor(Math.random() * colorOptions.length)];
        const color2 = colorOptions[Math.floor(Math.random() * colorOptions.length)];
        const angle  = Math.floor(Math.random() * 360);

        // Random opacity between 0.25 and 0.5
        const opacity = (Math.random() * 0.25 + 0.25).toFixed(2);

        // Random animation delay so orbs don't all move in sync
        const delay = (Math.random() * 6).toFixed(1) + 's';

        // Apply styles (override the CSS-fixed positions)
        orb.style.top    = topPct + '%';
        orb.style.left   = leftPct + '%';
        orb.style.right  = 'auto';
        orb.style.bottom = 'auto';
        orb.style.transform = 'none';
        orb.style.width  = size;
        orb.style.height = size;
        orb.style.background = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
        orb.style.opacity = opacity;
        orb.style.animationDelay = delay;
    });
}

/* Page Background Particles (subpages) */
function initPageParticles() {
    const container = document.querySelector('.page-particles');
    if (!container) return;
    
    const particleCount = 40;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('moving-dot');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random colors between blue and purple
        const colors = ['var(--accent-blue)', 'var(--accent-purple)', '#fff'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.width = (Math.random() * 3 + 1) + 'px';
        particle.style.height = particle.style.width;
        
        // Each particle gets a unique animation
        const duration = (Math.random() * 8 + 6) + 's';
        const delay = Math.random() * 6 + 's';
        
        // Random movement direction
        const moveX = (Math.random() - 0.5) * 200;
        const moveY = (Math.random() - 0.5) * 200;
        
        particle.style.animation = 'dot-drift-' + (i % 5) + ' ' + duration + ' ' + delay + ' ease-in-out infinite';
        
        container.appendChild(particle);
    }
}

/* Moving Dots Animation (subpages - larger glowing dots that move around) */
function initMovingDots() {
    const bgEffects = document.querySelector('.page-bg-effects');
    if (!bgEffects) return;
    
    const dotCount = 15;
    
    for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('div');
        dot.classList.add('moving-dot');
        dot.style.position = 'absolute';
        dot.style.left = Math.random() * 100 + '%';
        dot.style.top = Math.random() * 100 + '%';
        
        const colors = ['var(--accent-blue)', 'var(--accent-purple)', '#fff'];
        dot.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Larger glowing dots
        const size = (Math.random() * 4 + 2) + 'px';
        dot.style.width = size;
        dot.style.height = size;
        dot.style.borderRadius = '50%';
        dot.style.boxShadow = '0 0 6px currentColor';
        dot.style.opacity = (Math.random() * 0.5 + 0.3).toString();
        
        // Unique animation per dot
        const duration = (Math.random() * 10 + 8) + 's';
        const delay = Math.random() * 5 + 's';
        dot.style.animation = 'dot-drift-' + (i % 5) + ' ' + duration + ' ' + delay + ' ease-in-out infinite alternate';
        
        bgEffects.appendChild(dot);
    }
}

/* Counter Animation */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.getAttribute('data-count');
                const suffix = target.getAttribute('data-suffix') || '';
                animateCounter(target, 0, parseInt(finalValue), 2000, suffix);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, start, end, duration, suffix) {
    let startTime = null;
    
    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * easeOut);
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }
    
    requestAnimationFrame(step);
}

/* Smooth scroll for anchor links */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* Form submission handler */
function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    const originalZh = btn.getAttribute('data-zh') || '發送查詢';
    const originalEn = btn.getAttribute('data-en') || 'Send Enquiry';
    const lang = (window.JLSLang && window.JLSLang.get) ? window.JLSLang.get() : 'zh';
    
    btn.textContent = (lang === 'zh') ? '發送中...' : 'Sending...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.textContent = (lang === 'zh') ? '已發送 ✓' : 'Sent ✓';
        btn.style.background = 'linear-gradient(135deg, #00c853, #00e676)';
        
        setTimeout(() => {
            btn.textContent = (lang === 'zh') ? originalZh : originalEn;
            btn.disabled = false;
            btn.style.background = '';
            form.reset();
        }, 3000);
    }, 1500);
}


/* Hero Image Slideshow - removed */


/* Services Accordion */
function initAccordion() {
    const items = document.querySelectorAll('.accordion-item');
    if (!items.length) return;

    // Set background images from data-bg attribute
    items.forEach(function(item, idx) {
        const bgUrl = item.getAttribute('data-bg');
        if (bgUrl) {
            const style = document.createElement('style');
            style.textContent = '.accordion-item:nth-child(' + (idx + 1) + ')::before { background-image: url(' + bgUrl + '); }';
            document.head.appendChild(style);
        }
    });

    // Click handler
    items.forEach(function(item) {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            // Close all items
            items.forEach(function(i) { i.classList.remove('active'); });
            // Open clicked item if it was closed
            if (!isActive) {
                item.classList.add('active');
                // Smooth scroll to the item
                setTimeout(function() {
                    item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            }
        });
    });
}
