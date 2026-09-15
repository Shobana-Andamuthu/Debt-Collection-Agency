/**
 * AEGIS RECOVERY PARTNERS — MAIN JAVASCRIPT
 * Template 3: Ethical Debt Recovery Agency
 */

window.toggleMobileMenu = function (e) {
  if (e) {
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
  }
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('mobileOverlay') || document.getElementById('drawerOverlay');
  const hamburgers = document.querySelectorAll('.hamburger-btn, #hamburgerBtn');
  if (!drawer) return;

  const isOpen = drawer.classList.contains('is-open') || drawer.classList.contains('active');
  if (isOpen) {
    drawer.classList.remove('is-open', 'active');
    if (overlay) overlay.classList.remove('is-open', 'active');
    hamburgers.forEach(btn => {
      btn.classList.remove('is-active', 'active');
      btn.setAttribute('aria-expanded', 'false');
    });
    document.body.classList.remove('menu-open');
  } else {
    drawer.classList.add('is-open', 'active');
    if (overlay) overlay.classList.add('is-open', 'active');
    hamburgers.forEach(btn => {
      btn.classList.add('is-active', 'active');
      btn.setAttribute('aria-expanded', 'true');
    });
    document.body.classList.add('menu-open');
  }

  // Always collapse open submenus (Home 1 / Home 2 dropdown) on toggle/close
  const dropdownContainers = drawer.querySelectorAll('.mobile-nav-item, .has-dropdown, .has-submenu, .mobile-submenu');
  dropdownContainers.forEach(item => {
    item.classList.remove('is-expanded', 'show', 'open');
  });
};

(function () {
  'use strict';

  // --- 1. THEME MANAGEMENT (LIGHT / DARK MODE) ---
  const THEME_KEY = 'aegis_theme_preference';
  
  function getPreferredTheme() {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved) return saved;
    } catch (e) {
      // Security restriction on file:// protocol
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {}
    
    // Update theme toggle buttons
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

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  }

  // --- 2. RTL / LTR MANAGEMENT ---
  const RTL_KEY = 'aegis_direction_preference';

  function getPreferredDirection() {
    try {
      const saved = localStorage.getItem(RTL_KEY);
      if (saved) return saved;
    } catch (e) {}
    return 'ltr';
  }

  function applyDirection(dir) {
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

  function toggleDirection() {
    const current = document.documentElement.getAttribute('dir') || 'ltr';
    const next = current === 'rtl' ? 'ltr' : 'rtl';
    applyDirection(next);
  }



  function initMobileMenu() {
    const hamburgers = document.querySelectorAll('.hamburger-btn, #hamburgerBtn');
    const drawer = document.getElementById('mobileDrawer');
    const overlay = document.getElementById('mobileOverlay') || document.getElementById('drawerOverlay');
    const drawerCloseBtn = document.getElementById('drawerCloseBtn');
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle, .mobile-drawer .dropdown-toggle');

    if (!drawer) return;

    function closeMenu() {
      drawer.classList.remove('is-open', 'active');
      if (overlay) overlay.classList.remove('is-open', 'active');
      hamburgers.forEach(btn => {
        btn.classList.remove('is-active', 'active');
        btn.setAttribute('aria-expanded', 'false');
      });
      document.body.classList.remove('menu-open');

      const dropdownItems = document.querySelectorAll('.mobile-nav-item.has-dropdown, .has-submenu');
      dropdownItems.forEach(item => {
        item.classList.remove('is-expanded', 'active');
      });
    }

    hamburgers.forEach(btn => {
      btn.onclick = window.toggleMobileMenu;
    });

    if (drawerCloseBtn) {
      drawerCloseBtn.onclick = closeMenu;
    }

    if (overlay) {
      overlay.onclick = closeMenu;
    }

    const drawerLinks = drawer.querySelectorAll('a:not(.mobile-dropdown-toggle):not(.dropdown-toggle)');
    drawerLinks.forEach(link => {
      link.onclick = closeMenu;
    });

    mobileDropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        const parent = this.closest('.mobile-nav-item, .has-submenu');
        if (parent) {
          parent.classList.toggle('is-expanded');
          parent.classList.toggle('active');
        }
      });
    });

    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && (drawer.classList.contains('is-open') || drawer.classList.contains('active'))) {
        closeMenu();
      }
    });
  }

  // --- 4. BACK TO TOP BUTTON ---
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

  // --- 5. ACTIVE NAV LINK HIGHLIGHTING ---
  function initActiveNav() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';

    const allLinks = document.querySelectorAll('.nav-link, .dropdown-item, .mobile-nav-link, .mobile-submenu-link');
    allLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === page || (page === '' && href === 'index.html')) {
        link.classList.add('active');
        // If it's a dropdown child, make parent active too
        const parentDropdown = link.closest('.nav-dropdown');
        if (parentDropdown) {
          const parentLink = parentDropdown.querySelector('.nav-link');
          if (parentLink) parentLink.classList.add('active');
        }
      }
    });
  }

  // --- 6. INTERACTIVE GROSS-TO-NET RECOVERY CALCULATOR ---
  function initRecoveryCalculator() {
    const slider = document.getElementById('calcPortfolio');
    const displayVal = document.getElementById('calcPortfolioDisplay');
    const tierInputs = document.querySelectorAll('input[name="delinquencyTier"]');
    const industrySelect = document.getElementById('calcIndustry');
    
    const grossOut = document.getElementById('calcGrossRecovered');
    const netOut = document.getElementById('calcNetClientReturn');
    const rateOut = document.getElementById('calcSuccessRate');
    const feeOut = document.getElementById('calcFeeRate');

    if (!slider || !grossOut || !netOut) return;

    function formatUSD(num) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(num);
    }

    function calculate() {
      const amount = parseFloat(slider.value) || 500000;
      if (displayVal) {
        displayVal.textContent = formatUSD(amount);
      }

      let selectedTier = 'tier2';
      tierInputs.forEach(input => {
        if (input.checked) selectedTier = input.value;
      });

      // Base recovery rate & contingency fee rate by delinquency bucket
      let recoveryRate = 0.72;
      let contingencyFee = 0.22;

      if (selectedTier === 'tier1') {
        recoveryRate = 0.86;
        contingencyFee = 0.18;
      } else if (selectedTier === 'tier2') {
        recoveryRate = 0.72;
        contingencyFee = 0.22;
      } else if (selectedTier === 'tier3') {
        recoveryRate = 0.58;
        contingencyFee = 0.28;
      } else if (selectedTier === 'tier4') {
        recoveryRate = 0.42;
        contingencyFee = 0.34;
      }

      // Small industry modifier
      if (industrySelect) {
        const ind = industrySelect.value;
        if (ind === 'commercial') {
          recoveryRate += 0.04;
        } else if (ind === 'saas') {
          recoveryRate += 0.02;
        } else if (ind === 'consumer') {
          recoveryRate -= 0.02;
        }
      }

      const grossRecovered = amount * recoveryRate;
      const feeAmount = grossRecovered * contingencyFee;
      const netClientReturn = grossRecovered - feeAmount;

      if (grossOut) grossOut.textContent = formatUSD(grossRecovered);
      if (netOut) netOut.textContent = formatUSD(netClientReturn);
      if (rateOut) rateOut.textContent = `${Math.round(recoveryRate * 100)}% Estimated Recovery`;
      if (feeOut) feeOut.textContent = `${Math.round(contingencyFee * 100)}% Contingency Fee (No Upfront Cost)`;

      const feeAmtEl = document.getElementById('calcFeeAmount');
      if (feeAmtEl) feeAmtEl.textContent = formatUSD(feeAmount);

      const netBarEl = document.getElementById('calcNetProgressBar');
      if (netBarEl) {
        const netPercent = Math.round((netClientReturn / amount) * 100);
        netBarEl.style.width = `${netPercent}%`;
      }
    }

    slider.addEventListener('input', calculate);
    tierInputs.forEach(input => input.addEventListener('change', calculate));
    if (industrySelect) industrySelect.addEventListener('change', calculate);

    // Initial calculation
    calculate();
  }

  // --- 7. INTERACTIVE PRACTICE VERTICALS CONSOLE TABS ---
  function initVerticalTabs() {
    const tabBtns = document.querySelectorAll('.vertical-tab-btn');
    const tabPanes = document.querySelectorAll('.vertical-tab-pane');

    if (!tabBtns.length || !tabPanes.length) return;

    tabBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const targetId = this.getAttribute('data-tab');

        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        this.classList.add('active');
        const activePane = document.getElementById(targetId);
        if (activePane) {
          activePane.classList.add('active');
        }
      });
    });
  }

  // --- 8. FAQ ACCORDION INTERACTIVITY ---
  function initAccordions() {
    // Support .faq-accordion, .compliance-faq-list, and .pricing-faq-arena
    const accordions = document.querySelectorAll('.faq-accordion, .pricing-faq-arena');
    if (!accordions.length) return;

    accordions.forEach(acc => {
      const items = acc.querySelectorAll('.faq-item, .pricing-acc-card');
      items.forEach(item => {
        const header = item.querySelector('.faq-header, .pricing-acc-btn');
        if (!header) return;

        header.addEventListener('click', function (e) {
          e.preventDefault();
          const isActive = item.classList.contains('is-active');

          // Close siblings inside same accordion
          items.forEach(sibling => {
            sibling.classList.remove('is-active');
            const siblingBtn = sibling.querySelector('.pricing-acc-btn, .faq-header');
            if (siblingBtn) siblingBtn.setAttribute('aria-expanded', 'false');
          });

          if (!isActive) {
            item.classList.add('is-active');
            header.setAttribute('aria-expanded', 'true');
          }
        });
      });
    });
  }

  // --- 8B. PRICING PAGE WORKING SEGMENTED RATE PICKER ---
  function initPricingRatePicker() {
    const pickerRow = document.querySelector('[data-picker-row]');
    const priceDisplay = document.querySelector('[data-picker-price]');
    const whatDisplay = document.querySelector('[data-picker-what]');

    if (!pickerRow || !priceDisplay || !whatDisplay) return;

    const options = pickerRow.querySelectorAll('input[name="bracketRate"]');
    options.forEach(opt => {
      opt.addEventListener('change', function () {
        if (this.checked) {
          const rate = this.getAttribute('data-rate') || '18%';
          const desc = this.getAttribute('data-desc') || '';
          priceDisplay.textContent = rate;
          whatDisplay.textContent = desc;
        }
      });
    });
  }

  // --- 8C. PRICING BLUEPRINT TERMINAL FILTER ---
  function initBlueprintFilter() {
    const filterBtns = document.querySelectorAll('.blueprint-pill-btn');
    const rows = document.querySelectorAll('.blueprint-stream-row');

    if (!filterBtns.length || !rows.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');

        rows.forEach(row => {
          const category = row.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            row.style.display = 'grid';
          } else {
            row.style.display = 'none';
          }
        });
      });
    });
  }

  // --- 8D. INTERACTIVE ROTATING ORBITAL STAGES SYSTEM ---
  function initOrbitalStages() {
    const orbitNodes = document.querySelectorAll('.stage-pill-btn, .orbit-satellite-node');
    const container = document.getElementById('orbitalSystemContainer');
    const hubTag = document.getElementById('hubStageTag');
    const hubTitle = document.getElementById('hubStageTitle');
    const hubSLA = document.getElementById('hubStageSLA');

    const badge = document.getElementById('inspectorStageBadge');
    const slaChip = document.getElementById('inspectorSLAChip');
    const regPill = document.getElementById('inspectorRegPill');
    const headline = document.getElementById('inspectorHeadline');
    const narrative = document.getElementById('inspectorNarrative');
    const checkGrid = document.getElementById('inspectorCheckGrid');

    const prevBtn = document.getElementById('orbitPrevBtn');
    const nextBtn = document.getElementById('orbitNextBtn');
    const pauseToggle = document.getElementById('orbitPauseToggle');
    const pauseIcon = document.getElementById('pauseBtnIcon');
    const pauseText = document.getElementById('pauseBtnText');

    if (!orbitNodes.length || !headline) return;

    let currentStage = 1;
    let isPaused = false;

    const orbitalData = {
      1: {
        numText: 'STAGE 01 ACTIVE',
        shortTitle: 'Data Scrubbing',
        badge: 'Stage 01 · Ingest Firewall',
        badgeClass: 'badge-coral',
        sla: 'SLA: 24h Turnaround',
        reg: 'GLBA & SOC 2 Type II',
        title: 'Multi-Registry Automated Data Scrubbing & Ingest',
        narrative: 'Prior to any debtor contact, commercial portfolio files pass through automated statutory compliance gatekeepers to purge prohibited debtor states and litigation triggers in real-time.',
        checks: [
          'PACER Federal Bankruptcy Automatic Cross-Check',
          'SSA Master Death File instantaneous scrub',
          'Active-duty Servicemembers Civil Relief Act (SCRA) check'
        ]
      },
      2: {
        numText: 'STAGE 02 ACTIVE',
        shortTitle: 'Forensic Trace',
        badge: 'Stage 02 · Deep Investigation',
        badgeClass: 'badge-fuchsia',
        sla: 'SLA: 48h Resolution',
        reg: 'FCRA / LexisNexis Tier-1',
        title: 'Forensic Asset, Bank & Officer Guarantee Mapping',
        narrative: 'Our intelligence division conducts deep asset searches across 50 states to uncover active commercial bank accounts, corporate real estate holdings, and personal guarantor liabilities.',
        checks: [
          '50-State UCC-1 fixture filing encumbrance search',
          'County recorder real property deed verification',
          'Corporate entity officer personal guarantee linking'
        ]
      },
      3: {
        numText: 'STAGE 03 ACTIVE',
        shortTitle: 'Speech AI Mediation',
        badge: 'Stage 03 · AI Acoustic Tone',
        badgeClass: 'badge-violet',
        sla: 'SLA: Days 3–21',
        reg: 'CFPB Reg F (7X7) Hard-Lock',
        title: '100% Speech AI Audited Empathetic Mediation',
        narrative: 'Certified mediation specialists negotiate structured voluntary settlements. Every single call is audited in real-time by acoustic speech analytics to guarantee absolute regulatory compliance and zero coercion.',
        checks: [
          'Automated 7-calls-per-7-days statutory frequency lock',
          'Real-time acoustic coercion decibel & sentiment detector',
          'Structured promissory note & same-day ACH settlement docket'
        ]
      },
      4: {
        numText: 'STAGE 04 ACTIVE',
        shortTitle: 'Legal Counsel',
        badge: 'Stage 04 · Judicial Action',
        badgeClass: 'badge-sky',
        sla: 'SLA: Days 22–35',
        reg: 'Admitted Bar Counsel Forwarding',
        title: 'Licensed Legal Forwarding & Judicial Remedies',
        narrative: 'When voluntary negotiation is exhausted against solvent commercial debtors, accounts are forwarded to admitted network counsel for formal statutory demand letters, summons, and judicial docket filings.',
        checks: [
          'Formal attorney demand letter with statutory cure notice',
          'Verified civil summons & state court docket filing',
          'Post-judgment bank levy & writ of execution service'
        ]
      },
      5: {
        numText: 'STAGE 05 ACTIVE',
        shortTitle: 'FDIC Remittance',
        badge: 'Stage 05 · Final Remittance',
        badgeClass: 'badge-emerald',
        sla: 'SLA: Within 48 Hours',
        reg: 'FDIC Trust Account Rule',
        title: 'Strictly Segregated FDIC Escrow Remittance & Fedwire',
        narrative: 'Recovered client capital is held in sovereign, segregated client trust accounts and remitted directly to your corporate operating account within 48 hours of clearance with line-by-line electronic settlement reconciliation.',
        checks: [
          'Automated Same-Day Fedwire / Same-Day ACH bank remittance',
          'Audited electronic reconciliation settlement docket',
          'Comprehensive IRS bad-debt uncollectibility certificate'
        ]
      }
    };

    function updateStage(stageNum) {
      currentStage = parseInt(stageNum, 10);
      const data = orbitalData[currentStage];
      if (!data) return;

      // Update active satellite circle
      orbitNodes.forEach(node => {
        if (parseInt(node.getAttribute('data-stage'), 10) === currentStage) {
          node.classList.add('active');
        } else {
          node.classList.remove('active');
        }
      });

      // Update Center Hub
      if (hubTag) hubTag.textContent = data.numText;
      if (hubTitle) hubTitle.textContent = data.shortTitle;
      if (hubSLA) hubSLA.textContent = data.sla;

      // Update Inspector Panel
      if (badge) {
        badge.textContent = data.badge;
        badge.className = `inspector-stage-tag ${data.badgeClass}`;
      }
      if (slaChip) slaChip.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> <span>${data.sla}</span>`;
      if (regPill) regPill.textContent = data.reg;
      if (headline) headline.textContent = data.title;
      if (narrative) narrative.textContent = data.narrative;

      if (checkGrid) {
        checkGrid.innerHTML = data.checks.map(chk => `
          <div class="inspector-check-item">
            <span class="inspector-check-icon">✓</span>
            <span class="inspector-check-text">${chk}</span>
          </div>
        `).join('');
      }
    }

    orbitNodes.forEach(node => {
      node.addEventListener('click', function () {
        const stage = this.getAttribute('data-stage');
        updateStage(stage);
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        let prev = currentStage - 1;
        if (prev < 1) prev = 5;
        updateStage(prev);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        let next = currentStage + 1;
        if (next > 5) next = 1;
        updateStage(next);
      });
    }

    if (pauseToggle && container) {
      pauseToggle.addEventListener('click', function () {
        isPaused = !isPaused;
        if (isPaused) {
          container.classList.add('is-paused');
          if (pauseIcon) pauseIcon.textContent = '▶';
          if (pauseText) pauseText.textContent = 'Resume Rotation';
        } else {
          container.classList.remove('is-paused');
          if (pauseIcon) pauseIcon.textContent = '⏸';
          if (pauseText) pauseText.textContent = 'Pause Rotation';
        }
      });
    }
  }

  // --- 8E. PHASE 7: FORENSIC SCRUBBING TERMINAL SIMULATOR ---
  function initScrubTerminalSimulation() {
    const toggles = document.querySelectorAll('.scrub-filter-toggle');
    const passedDigit = document.querySelector('[data-scrub-passed]');
    const accuracyDigit = document.querySelector('[data-scrub-accuracy]');
    const logFeed = document.querySelector('.scrub-feed-logs');

    if (!toggles.length || !logFeed) return;

    toggles.forEach(toggle => {
      toggle.addEventListener('click', function () {
        this.classList.toggle('active');
        const filterName = this.querySelector('span') ? this.querySelector('span').textContent : 'Filter';
        const isActive = this.classList.contains('active');

        const activeCount = document.querySelectorAll('.scrub-filter-toggle.active').length;
        const basePassed = 842 - (5 - activeCount) * 28;
        const baseAccuracy = 99.8 - (5 - activeCount) * 0.9;

        if (passedDigit) passedDigit.textContent = `${basePassed} Accounts`;
        if (accuracyDigit) accuracyDigit.textContent = `${baseAccuracy.toFixed(1)}%`;

        const logItem = document.createElement('div');
        logItem.innerHTML = `[${new Date().toLocaleTimeString()}] <span style="color: ${isActive ? '#10B981' : '#EF4444'};">${isActive ? 'ENABLED' : 'DISABLED'}</span>: ${filterName} check filter updated.`;
        logFeed.appendChild(logItem);
        logFeed.scrollTop = logFeed.scrollHeight;
      });
    });
  }

  // --- 8F. PHASE 7: SCENARIO SIMULATOR TABS ---
  function initScenarioSimulator() {
    const tabBtns = document.querySelectorAll('.scenario-tab-btn');
    const panes = document.querySelectorAll('.scenario-pane');

    if (!tabBtns.length || !panes.length) return;

    tabBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const targetId = this.getAttribute('data-scenario-target');

        tabBtns.forEach(b => b.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));

        this.classList.add('active');
        const targetPane = document.getElementById(targetId);
        if (targetPane) targetPane.classList.add('active');
      });
    });
  }

  // --- 9. DESKTOP NAVBAR DROPDOWN TOGGLE ---
  function initDesktopDropdowns() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    dropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('.nav-link');
      const arrow = dropdown.querySelector('.dropdown-arrow');
      if (!toggle) return;

      // Ensure clicking the arrow toggles on touch/clicks
      if (arrow) {
        arrow.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          dropdown.classList.toggle('is-open');
        });
      }

      // Close dropdown when clicking outside
      document.addEventListener('click', function (e) {
        if (!dropdown.contains(e.target)) {
          dropdown.classList.remove('is-open');
        }
      });
    });
  }

  // --- 10. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER) ---
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-fade-up, .reveal-fade-left, .reveal-fade-right, .reveal-scale');
    if (!revealElements.length) return;

    // Immediately reveal elements that are already in the initial viewport
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('is-revealed');
      }
    });

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');

          // Smoothly animate progress bars inside the revealed element
          const bars = entry.target.querySelectorAll('.progress-bar-fill');
          bars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width') || bar.style.width;
            if (targetWidth) {
              bar.style.width = '0%';
              setTimeout(() => {
                bar.style.width = targetWidth;
              }, 120);
            }
          });

          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.01,
      rootMargin: '0px 0px 100px 0px'
    });

    revealElements.forEach(el => observer.observe(el));

    // Fail-safe timer: Reveal all elements after 600ms so no page stays blank under any circumstance
    setTimeout(() => {
      revealElements.forEach(el => el.classList.add('is-revealed'));
    }, 600);
  }

  // --- 11. STAT COUNTERS ON SCROLL ---
  function initStatCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-counter')) || 0;
          const prefix = el.getAttribute('data-prefix') || '';
          const suffix = el.getAttribute('data-suffix') || '';
          const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
          const duration = 1800;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = (target * easeProgress).toFixed(decimals);

            el.textContent = `${prefix}${currentVal}${suffix}`;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = `${prefix}${target}${suffix}`;
            }
          }

          requestAnimationFrame(updateCounter);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    counters.forEach(el => observer.observe(el));
  }

  // --- 12. STATE LICENSING DIRECTORY ---
  function initStateLicenseDirectory() {
    const searchInput = document.getElementById('stateLicenseSearch');
    const filterBtns = document.querySelectorAll('.state-filter-btn');
    const cards = document.querySelectorAll('.state-license-card');

    if (!cards.length) return;

    if (searchInput || filterBtns.length) {
      function filterStates() {
        const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
        const activeBtn = document.querySelector('.state-filter-btn.active');
        const activeRegion = activeBtn ? activeBtn.getAttribute('data-region') : 'all';

        cards.forEach(card => {
          const stateName = (card.getAttribute('data-state') || card.querySelector('.state-name')?.textContent || '').toLowerCase();
          const stateCode = (card.getAttribute('data-code') || card.querySelector('.state-code-pill')?.textContent || '').toLowerCase();
          const region = card.getAttribute('data-region') || 'all';

          const matchesRegion = activeRegion === 'all' || region === activeRegion;
          const matchesQuery = !query || stateName.includes(query) || stateCode.includes(query);

          if (matchesRegion && matchesQuery) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      }

      if (searchInput) {
        searchInput.addEventListener('input', filterStates);
      }

      filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
          filterBtns.forEach(b => b.classList.remove('active'));
          this.classList.add('active');
          filterStates();
        });
      });
    }
  }

  // --- 13. PHASE 8: ABOUT US INTERACTIVE TIMELINE DECK ---
  function initAboutHistoryTimeline() {
    const yearBtns = document.querySelectorAll('.year-nav-btn');
    const timelineDeck = document.getElementById('historyTimelineDeck');
    if (!yearBtns.length || !timelineDeck) return;

    const timelineData = {
      '2012': {
        phase: 'Phase 01 · Founding & Mission Charter',
        title: 'Establishing the Ethical Debt Recovery Protocol',
        desc: 'Aegis Recovery Partners was founded in Denver, Colorado, by a coalition of commercial trial attorneys and banking risk executives who witnessed the widespread reputational erosion caused by predatory collection agencies. We introduced our landmark Zero-Harassment Consumer Charter.',
        milestones: [
          '<strong>Initial $25M Tier-1 Bank Mandate:</strong> Successfully resolved with zero consumer complaints filed.',
          '<strong>Denver Command Hub Established:</strong> Formed with in-house legal review teams and dedicated dispute officers.'
        ],
        stat1Num: '$25M',
        stat1Lbl: 'Inaugural Portfolio',
        stat2Num: '0',
        stat2Lbl: 'CFPB Inquiries',
        img: 'assets/images/sections/about-founding-partners.jpg',
        badge: 'Inaugural Charter · Denver HQ'
      },
      '2016': {
        phase: 'Phase 02 · National Licensing Expansion',
        title: 'Attaining 50-State Direct Licensing & Bonded Infrastructure',
        desc: 'Secured master statutory collection licenses, local surety bonds, and resident manager registrations across all 50 U.S. states. Integrated our nationwide legal forwarding network to handle judicial debt litigation seamlessly.',
        milestones: [
          '<strong>50-State Licensing Completed:</strong> Direct sovereign compliance without third-party broker dependencies.',
          '<strong>RMAI Certified Business (CRB):</strong> Awarded national accreditation for ethical receivables management.'
        ],
        stat1Num: '50',
        stat1Lbl: 'States Licensed',
        stat2Num: '$120M+',
        stat2Lbl: 'Annual Liquidation',
        img: 'assets/images/sections/about-timeline-2016.jpg',
        badge: '50-State Licensing · RMAI CRB'
      },
      '2020': {
        phase: 'Phase 03 · AI Acoustic Compliance & Telemetry',
        title: 'Deploying Speech Sentiment AI & Zero-Coercion Monitoring',
        desc: 'Pioneered the debt collection industry\'s first 100% real-time acoustic speech AI monitoring platform. Every single phone mediation is analyzed live for empathy, decibel modulation, and absolute Reg F fidelity.',
        milestones: [
          '<strong>100% Real-Time Call Scrubbing:</strong> Instant automated red-flag alerts if conversational parameters fluctuate.',
          '<strong>Propensity Intelligence Engine:</strong> Dynamic installment restructuring tailored to verifiable consumer cash flow.'
        ],
        stat1Num: '100%',
        stat1Lbl: 'Calls AI-Audited',
        stat2Num: '99.8%',
        stat2Lbl: 'Audit Compliance',
        img: 'assets/images/sections/about-timeline-2020.jpg',
        badge: 'Acoustic AI Lab · Real-Time Telemetry'
      },
      '2024': {
        phase: 'Phase 04 · Reg F & Enterprise Escrow Standard',
        title: 'Institutional Fiduciary Architecture & Segregated Trust Accounts',
        desc: 'Implemented daily multi-signature cryptographic escrow reconciliation and SOC 2 Type II certified data vaults. Achieved benchmark status for CFPB examination reviews among institutional non-performing debt purchasers.',
        milestones: [
          '<strong>Tripartite Daily Reconciliation:</strong> All recovered funds segregated into insured master escrow dockets.',
          '<strong>Zero Regulatory Consent Decrees:</strong> Recognized for flawless multi-year consumer protection audits.'
        ],
        stat1Num: '$350M+',
        stat1Lbl: 'Escrow Volume',
        stat2Num: 'SOC 2',
        stat2Lbl: 'Type II Certified',
        img: 'assets/images/sections/about-ethics-counsel.jpg',
        badge: 'Institutional Trust · SOC 2 Type II'
      },
      '2026': {
        phase: 'Phase 05 · The Sovereign Standard in Capital Recovery',
        title: 'Next-Generation Multi-Jurisdiction Debt Rehabilitation',
        desc: 'Today, Aegis Recovery Partners manages over $480M+ in active repatriated commercial and consumer receivables, standing as the standard-bearer for compassionate, highly effective, and legally unassailable debt resolution.',
        milestones: [
          '<strong>120+ Admitted Network Litigators:</strong> Rapid pre-litigation asset discovery and judgment enforcement nationwide.',
          '<strong>Institutional Sovereign Standard:</strong> Trusted partner to Fortune 500 creditors, healthcare systems, and regional banks.'
        ],
        stat1Num: '$480M+',
        stat1Lbl: 'Total Repatriated',
        stat2Num: '120+',
        stat2Lbl: 'Barred Litigators',
        img: 'assets/images/sections/about-executive-leadership.jpg',
        badge: 'The Sovereign Standard · 2026'
      }
    };

    yearBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const year = this.getAttribute('data-year');
        const data = timelineData[year];
        if (!data) return;

        yearBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        // Smooth transition inside deck
        timelineDeck.style.opacity = '0.4';
        timelineDeck.style.transform = 'translateY(8px)';
        timelineDeck.style.transition = 'all 0.25s ease';

        setTimeout(() => {
          timelineDeck.innerHTML = `
            <div class="timeline-content-card active" id="timelineCard${year}">
              <div class="timeline-card-narrative">
                <span class="timeline-phase-tag">${data.phase}</span>
                <h3 class="timeline-phase-title">${data.title}</h3>
                <p class="timeline-phase-desc">${data.desc}</p>
                <div class="timeline-milestone-points">
                  ${data.milestones.map(m => `
                    <div class="milestone-item">
                      <div class="milestone-dot">✓</div>
                      <div class="milestone-details">${m}</div>
                    </div>
                  `).join('')}
                </div>
                <div class="timeline-stat-row">
                  <div class="stat-pill"><span class="stat-num">${data.stat1Num}</span><span class="stat-lbl">${data.stat1Lbl}</span></div>
                  <div class="stat-pill"><span class="stat-num">${data.stat2Num}</span><span class="stat-lbl">${data.stat2Lbl}</span></div>
                </div>
              </div>
              <div class="timeline-card-media">
                <img src="${data.img}" alt="${data.title}" class="timeline-media-img">
                <div class="timeline-media-badge">
                  <span>${data.badge}</span>
                </div>
              </div>
            </div>
          `;
          timelineDeck.style.opacity = '1';
          timelineDeck.style.transform = 'translateY(0)';
        }, 180);
      });
    });
  }

  // --- 14. PHASE 8: COMMAND ROOM REGIONAL HUBS ---
  function initCommandRoomTabs() {
    const hubBtns = document.querySelectorAll('.command-hub-btn');
    const hubTitle = document.getElementById('commandHubTitle');
    const hubDesc = document.getElementById('commandHubDesc');
    const capEl = document.getElementById('telemetryCap');
    const latEl = document.getElementById('telemetryLat');
    const secEl = document.getElementById('telemetrySec');
    const focEl = document.getElementById('telemetryFoc');
    const hubImg = document.querySelector('.command-panel-img');

    if (!hubBtns.length || !hubTitle) return;

    const hubDetails = {
      'denver': {
        title: 'Denver Global Headquarters',
        desc: 'Centrally houses the Executive Board of Governors, Enterprise Dispute Resolution Tribunal, and the 24/7 Compliance Recording Vault. All sovereign recovery strategies and client reporting pipelines are routed through this master facility.',
        cap: '180 Specialized Officers',
        lat: '< 14ms Real-time Scrub',
        sec: 'SOC 2 Type II Encrypted',
        foc: 'Corporate Governance & Strategy',
        img: 'assets/images/sections/about-hub-denver.jpg'
      },
      'chicago': {
        title: 'Chicago Valuation & Operations Command',
        desc: 'Specialized high-volume commercial portfolio valuation unit, distressed debt analytics floor, and primary Midwestern mediation theater. Features automated portfolio liquidation forecasting models.',
        cap: '95 Financial Analysts',
        lat: '< 18ms Ledger Sync',
        sec: '256-Bit TLS Bank Vault',
        foc: 'Commercial Debt Valuation',
        img: 'assets/images/sections/about-hub-chicago.jpg'
      },
      'dallas': {
        title: 'Dallas Skip-Trace & Data Intelligence Lab',
        desc: 'Advanced forensic asset discovery hub equipped with direct batch PACER federal court integrations, LexisNexis Risk Solutions APIs, and nationwide property deed cross-referencing clusters.',
        cap: '60 Intelligence Specialists',
        lat: '< 8ms API Throughput',
        sec: 'Air-Gapped Forensic Enclave',
        foc: 'Deep Asset Discovery & Tracing',
        img: 'assets/images/sections/about-hub-dallas.jpg'
      },
      'newyork': {
        title: 'New York Escrow & Judicial Litigation Center',
        desc: 'Coordinates multi-jurisdiction commercial trials, judgment enforcement, post-judgment garnishments, and multi-million-dollar segregated client trust escrow wire transfers.',
        cap: '50 Admitted Attorneys',
        lat: '< 20ms Fedwire Pipeline',
        sec: 'Insured Master Escrow Trust',
        foc: 'Litigation & Legal Forwarding',
        img: 'assets/images/sections/about-hub-newyork.jpg'
      }
    };

    hubBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const hubKey = this.getAttribute('data-hub');
        const data = hubDetails[hubKey];
        if (!data) return;

        hubBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        if (hubTitle) hubTitle.textContent = data.title;
        if (hubDesc) hubDesc.textContent = data.desc;
        if (capEl) capEl.textContent = data.cap;
        if (latEl) latEl.textContent = data.lat;
        if (secEl) secEl.textContent = data.sec;
        if (focEl) focEl.textContent = data.foc;
        
        if (hubImg) {
          hubImg.style.opacity = '0.3';
          hubImg.style.transform = 'scale(0.98)';
          hubImg.style.transition = 'all 0.25s ease';
          setTimeout(() => {
            hubImg.src = data.img;
            hubImg.alt = data.title;
            hubImg.style.opacity = '1';
            hubImg.style.transform = 'scale(1)';
          }, 200);
        }
      });
    });
  }

  // --- 15. PHASE 9: INTAKE TERMINAL WIZARD & CONTACT INTERACTION ---
  function initIntakeWizard() {
    const wizardForm = document.getElementById('intakeWizardForm');
    const stepNodes = document.querySelectorAll('.wizard-step-node');
    const stepCards = document.querySelectorAll('.wizard-card-step');
    const nextBtns = document.querySelectorAll('.wizard-next-btn');
    const prevBtns = document.querySelectorAll('.wizard-prev-btn');

    if (!wizardForm || !stepCards.length) return;

    function goToStep(stepNum) {
      stepNodes.forEach(node => {
        const step = parseInt(node.getAttribute('data-step'));
        if (step <= stepNum) {
          node.classList.add('active');
        } else {
          node.classList.remove('active');
        }
      });

      stepCards.forEach(card => card.classList.remove('active'));
      const targetCard = document.getElementById(`wizardStep${stepNum}`);
      if (targetCard) targetCard.classList.add('active');
    }

    nextBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const nextStep = parseInt(this.getAttribute('data-next'));
        if (nextStep === 4) {
          // Calculate algorithmic estimate values
          const volInput = document.getElementById('totalDebtVolume');
          const estRateEl = document.getElementById('estLiquidationRate');
          const estYieldEl = document.getElementById('estYieldVal');

          let rawVol = 1250000;
          if (volInput && volInput.value) {
            const parsed = parseFloat(volInput.value.replace(/[^0-9.]/g, ''));
            if (!isNaN(parsed) && parsed > 0) rawVol = parsed;
          }

          const estRate = 78.4;
          const estYield = Math.round(rawVol * (estRate / 100));

          if (estRateEl) estRateEl.textContent = `${estRate}%`;
          if (estYieldEl) estYieldEl.textContent = `$${estYield.toLocaleString('en-US')} USD`;
        }
        goToStep(nextStep);
      });
    });

    prevBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const prevStep = parseInt(this.getAttribute('data-prev'));
        goToStep(prevStep);
      });
    });

    stepNodes.forEach(node => {
      node.addEventListener('click', function () {
        const step = parseInt(this.getAttribute('data-step'));
        goToStep(step);
      });
    });

    if (wizardForm) {
      wizardForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('✓ Placement Ticket Successfully Executed! Secure Vault Token #AEG-8921-X has been generated. A Fiduciary Officer will contact you in < 15 minutes.');
      });
    }

    // Dropzone upload simulation
    const fileInput = document.getElementById('vaultFileInput');
    const fileStatus = document.getElementById('uploadedFileStatus');
    const fileNameEl = document.getElementById('uploadedFileName');

    if (fileInput && fileStatus && fileNameEl) {
      fileInput.addEventListener('change', function () {
        if (this.files && this.files.length > 0) {
          fileNameEl.textContent = `${this.files[0].name} (${(this.files[0].size / 1024 / 1024).toFixed(1)} MB) — AES-256 Encrypted`;
          fileStatus.style.display = 'inline-flex';
        }
      });
    }
  }

  function initContactPriorityChips() {
    const chips = document.querySelectorAll('.priority-chip');
    const categorySelect = document.getElementById('portfolioCategory');

    if (!chips.length) return;

    chips.forEach(chip => {
      chip.addEventListener('click', function () {
        chips.forEach(c => c.classList.remove('active'));
        this.classList.add('active');

        const type = this.getAttribute('data-type');
        if (categorySelect) {
          if (type === 'placement') categorySelect.value = 'commercial';
          else if (type === 'counsel') categorySelect.value = 'banking';
          else if (type === 'dispute') categorySelect.value = 'judgment';
        }

        const terminalEl = document.getElementById('intakeTerminal');
        if (terminalEl) {
          terminalEl.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  function initContactFaqAccordion() {
    const faqCards = document.querySelectorAll('.faq-item-card');
    if (!faqCards.length) return;

    faqCards.forEach(card => {
      card.style.cursor = 'pointer';

      card.addEventListener('click', function (e) {
        const isOpen = card.classList.contains('active');

        // Close all FAQ cards first
        faqCards.forEach(c => {
          c.classList.remove('active');
          const p = c.querySelector('.faq-answer-pane');
          if (p) p.style.display = 'none';
        });

        // Toggle clicked card
        if (!isOpen) {
          card.classList.add('active');
          const p = card.querySelector('.faq-answer-pane');
          if (p) p.style.display = 'block';
        }
      });
    });
  }

  // --- 15. SCROLL REVEAL OBSERVER ---
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal-fade-up');
    if (!reveals.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });

      reveals.forEach(el => observer.observe(el));
    } else {
      reveals.forEach(el => el.classList.add('is-revealed'));
    }
  }

  // --- 16. CONTACT INTAKE WIZARD INTERACTIVITY ---
  function initIntakeWizard() {
    const wizard = document.getElementById('intakeWizardForm');
    if (!wizard) return;

    const stepNodes = document.querySelectorAll('.wizard-step-node');
    const stepCards = document.querySelectorAll('.wizard-card-step');
    const nextBtns = document.querySelectorAll('.wizard-next-btn');
    const prevBtns = document.querySelectorAll('.wizard-prev-btn');

    function goToStep(stepNum) {
      stepNodes.forEach(node => {
        if (node.getAttribute('data-step') === String(stepNum)) {
          node.classList.add('active');
        } else {
          node.classList.remove('active');
        }
      });

      stepCards.forEach(card => {
        if (card.id === `wizardStep${stepNum}`) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });
    }

    nextBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const nextStep = this.getAttribute('data-next');
        if (nextStep === '4') {
          const volInput = document.getElementById('totalDebtVolume');
          const volStr = volInput ? volInput.value : '$1,250,000';
          const num = parseFloat(volStr.replace(/[^0-9.]/g, '')) || 1250000;
          const yieldVal = num * 0.784;
          const estYieldEl = document.getElementById('estYieldVal');
          if (estYieldEl) {
            estYieldEl.textContent = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(yieldVal);
          }
        }
        goToStep(nextStep);
      });
    });

    prevBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const prevStep = this.getAttribute('data-prev');
        goToStep(prevStep);
      });
    });

    stepNodes.forEach(node => {
      node.addEventListener('click', function () {
        const targetStep = this.getAttribute('data-step');
        if (targetStep) goToStep(targetStep);
      });
    });
  }

  // --- 17. CONTACT PRIORITY CHIPS ---
  function initContactPriorityChips() {
    const chips = document.querySelectorAll('.priority-chip');
    if (!chips.length) return;

    chips.forEach(chip => {
      chip.addEventListener('click', function () {
        chips.forEach(c => c.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }



  // --- 20. PAGE PRELOADER ---
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

  // --- INITIALIZATION ON DOM READY ---
  document.addEventListener('DOMContentLoaded', function () {
    initPagePreloader();

    // Initial Themes & Direction
    applyTheme(getPreferredTheme());
    applyDirection(getPreferredDirection());

    // Event Listeners for Theme and Direction Toggles
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });

    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggleDirection);
    });

    // Init components
    initMobileMenu();
    initBackToTop();
    initActiveNav();
    initRecoveryCalculator();
    initVerticalTabs();
    initAccordions();
    initDesktopDropdowns();
    initScrollReveal();
    initStatCounters();
    initStateLicenseDirectory();
    initPricingRatePicker();
    initBlueprintFilter();
    initOrbitalStages();
    initScrubTerminalSimulation();
    initScenarioSimulator();
    initAboutHistoryTimeline();
    initCommandRoomTabs();
    initIntakeWizard();
    initContactPriorityChips();
    initContactFaqAccordion();
  });
})();




