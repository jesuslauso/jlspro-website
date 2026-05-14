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
    // Counter animation
    initCounters();
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
    
    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        toggle.classList.toggle('active');
    });
    
    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            toggle.classList.remove('active');
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

/* Particle Animation */
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
