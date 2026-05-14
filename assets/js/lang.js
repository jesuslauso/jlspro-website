/* ========================================
   JLS Pro Limited - Language Switcher
   Bilingual: 繁體中文 / English
   ======================================== */

(function() {
    'use strict';

    // Get saved language or default to 'zh'
    const STORAGE_KEY = 'jls_lang';

    function getCurrentLang() {
        return localStorage.getItem(STORAGE_KEY) || 'zh';
    }

    function setCurrentLang(lang) {
        localStorage.setItem(STORAGE_KEY, lang);
    }

    // Apply language to all elements with data-zh and data-en attributes
    function applyLanguage(lang) {
        // Update all elements with data-zh / data-en
        document.querySelectorAll('[data-zh][data-en]').forEach(function(el) {
            if (lang === 'zh') {
                el.textContent = el.getAttribute('data-zh');
            } else {
                el.textContent = el.getAttribute('data-en');
            }
        });

        // Update elements with data-zh-html / data-en-html (for innerHTML)
        document.querySelectorAll('[data-zh-html][data-en-html]').forEach(function(el) {
            if (lang === 'zh') {
                el.innerHTML = el.getAttribute('data-zh-html');
            } else {
                el.innerHTML = el.getAttribute('data-en-html');
            }
        });

        // Update placeholder attributes
        document.querySelectorAll('[data-zh-placeholder][data-en-placeholder]').forEach(function(el) {
            if (lang === 'zh') {
                el.placeholder = el.getAttribute('data-zh-placeholder');
            } else {
                el.placeholder = el.getAttribute('data-en-placeholder');
            }
        });

        // Show/hide elements based on language class
        document.querySelectorAll('.lang-zh').forEach(function(el) {
            el.style.display = (lang === 'zh') ? '' : 'none';
        });
        document.querySelectorAll('.lang-en').forEach(function(el) {
            el.style.display = (lang === 'en') ? '' : 'none';
        });

        // Update html lang attribute
        document.documentElement.lang = (lang === 'zh') ? 'zh-Hant' : 'en';

        // Update toggle button state
        updateToggleButton(lang);
    }

    // Update the language toggle button appearance
    function updateToggleButton(lang) {
        const btn = document.getElementById('lang-toggle');
        if (!btn) return;
        
        const zhSpan = btn.querySelector('.lang-opt-zh');
        const enSpan = btn.querySelector('.lang-opt-en');
        
        if (zhSpan && enSpan) {
            if (lang === 'zh') {
                zhSpan.classList.add('active');
                enSpan.classList.remove('active');
            } else {
                enSpan.classList.add('active');
                zhSpan.classList.remove('active');
            }
        }
    }

    // Toggle language
    function toggleLanguage() {
        const current = getCurrentLang();
        const newLang = (current === 'zh') ? 'en' : 'zh';
        setCurrentLang(newLang);
        applyLanguage(newLang);
    }

    // Initialize on DOM ready
    function init() {
        const lang = getCurrentLang();
        applyLanguage(lang);

        // Bind click event to toggle button
        const btn = document.getElementById('lang-toggle');
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                toggleLanguage();
            });
        }
    }

    // Run init when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose for external use if needed
    window.JLSLang = {
        toggle: toggleLanguage,
        set: function(lang) {
            setCurrentLang(lang);
            applyLanguage(lang);
        },
        get: getCurrentLang
    };
})();
