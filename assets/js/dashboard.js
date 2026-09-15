/**
 * AEGIS RECOVERY PARTNERS — CLIENT DASHBOARD JAVASCRIPT
 * Template 3: Ethical Debt Recovery Agency
 */

(function () {
  'use strict';

  // --- 1. THEME & RTL SYNC WITH MAIN SYSTEM ---
  const THEME_KEY = 'aegis_theme_preference';
  const RTL_KEY = 'aegis_direction_preference';

  function getPreferredTheme() {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved) return saved;
    } catch (e) {}
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyDashboardTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {}

    const themeToggles = document.querySelectorAll('.theme-toggle-btn');
    themeToggles.forEach(btn => {
      btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      const icon = btn.querySelector('.theme-icon');
      if (icon) {
        icon.innerHTML = theme === 'dark'
          ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
          : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
      }
    });
  }

  function toggleDashboardTheme(e) {
    if (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyDashboardTheme(next);
  }

  function getPreferredDirection() {
    try {
      const saved = localStorage.getItem(RTL_KEY);
      if (saved) return saved;
    } catch (e) {}
    return 'ltr';
  }

  function applyDashboardDirection(dir) {
    document.documentElement.setAttribute('dir', dir);
    try {
      localStorage.setItem(RTL_KEY, dir);
    } catch (e) {}

    const dirToggles = document.querySelectorAll('.rtl-toggle-btn');
    dirToggles.forEach(btn => {
      btn.setAttribute('aria-label', `Switch to ${dir === 'rtl' ? 'LTR' : 'RTL'} layout`);
      const label = btn.querySelector('.dir-label');
      if (label) {
        label.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      }
    });
  }

  function toggleDashboardDirection(e) {
    if (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
    const current = document.documentElement.getAttribute('dir') || 'ltr';
    const next = current === 'rtl' ? 'ltr' : 'rtl';
    applyDashboardDirection(next);
  }

  // --- 2. DASHBOARD TAB NAVIGATION ---
  function initDashboardTabs() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link[data-tab]');
    const tabPanels = document.querySelectorAll('.dashboard-tab-panel');

    sidebarLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetTab = this.getAttribute('data-tab');

        // Update active sidebar state
        sidebarLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');

        // Show target panel
        tabPanels.forEach(panel => {
          if (panel.id === `tab-${targetTab}`) {
            panel.style.display = 'block';
          } else {
            panel.style.display = 'none';
          }
        });
      });
    });
  }

  // --- 3. BACK TO TOP BUTTON ---
  function initBackToTop() {
    const btns = document.querySelectorAll('.back-to-top, .back-to-top-btn, #backToTopBtn');
    if (!btns.length) return;

    function checkScroll() {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      btns.forEach(btn => {
        if (scrollY > 120) {
          btn.classList.add('is-visible', 'visible', 'active');
        } else {
          btn.classList.remove('is-visible', 'visible', 'active');
        }
      });
    }

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();

    btns.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    });
  }

  // --- 4. PAGE PRELOADER ---
  function initPagePreloader() {
    let preloader = document.getElementById('pagePreloader');
    if (!preloader && document.body) {
      preloader = document.createElement('div');
      preloader.id = 'pagePreloader';
      preloader.innerHTML = `
        <div class="preloader-spinner-ring"></div>
        <div class="preloader-brand-box">
          <div class="preloader-text-brand">AEGIS <span class="gold-accent">RECOVERY</span></div>
        </div>
        <div class="preloader-bar-track"><div class="preloader-bar-fill"></div></div>
      `;
      document.body.prepend(preloader);
    }

    function hidePreloader() {
      if (preloader && !preloader.classList.contains('preloader-hidden')) {
        preloader.classList.add('preloader-hidden');
        setTimeout(() => {
          if (preloader && preloader.parentNode) {
            preloader.parentNode.removeChild(preloader);
          }
        }, 550);
      }
    }

    if (document.readyState === 'complete') {
      setTimeout(hidePreloader, 300);
    } else {
      window.addEventListener('load', function() {
        setTimeout(hidePreloader, 300);
      });
      setTimeout(hidePreloader, 1200);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    initPagePreloader();

    const savedTheme = getPreferredTheme();
    const savedDir = getPreferredDirection();

    applyDashboardTheme(savedTheme);
    applyDashboardDirection(savedDir);

    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggleDashboardTheme);
    });

    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggleDashboardDirection);
    });

    initDashboardTabs();
    initBackToTop();
  });
})();
