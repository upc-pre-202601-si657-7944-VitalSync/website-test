(function () {
  'use strict';

  const isTerms = /\/terms(?:\.html)?\/?$/.test(window.location.pathname);
  const hashPrefix = isTerms ? 'index.html' : '';

  const NAV_LINKS = [
    { key: 'solution', label: 'Solution', href: '#solution' },
    { key: 'profiles', label: 'Segments', href: '#profiles' },
    { key: 'features', label: 'Features', href: '#features' },
    { key: 'howItWorks', label: 'How It Works', href: '#how-it-works' },
    { key: 'pricing', label: 'Pricing', href: '#subscription' },
    { key: 'team', label: 'About the Team', href: '#about-the-team' }
  ];

  const FOOTER_LINKS = {
    platform: [
      { key: 'featuresLink', label: 'Features', href: '#features' },
      { key: 'pricingLink', label: 'Pricing', href: '#subscription' },
      { key: 'howItWorksLink', label: 'How It Works', href: '#how-it-works' }
    ],
    company: [
      { key: 'aboutLink', label: 'About Us', href: '#solution' },
      { key: 'teamLink', label: 'Team', href: '#about-the-team' },
      { key: 'faqLink', label: 'FAQ', href: '#faq' }
    ],
    legal: [
      { key: 'termsLink', label: 'Terms & Conditions', href: isTerms ? '#' : 'terms.html' }
    ]
  };

  function withPrefix(href) {
    if (!hashPrefix) return href;
    if (href.startsWith('#')) return hashPrefix + href;
    return href;
  }

  function navHtml() {
    const links = NAV_LINKS
      .map(
        (l) =>
          `<li><a href="${withPrefix(l.href)}" data-section="nav" data-value="${l.key}">${l.label}</a></li>`
      )
      .join('');

    return `
      <header>
        <nav class="nav" aria-label="Main navigation">
          <div class="container">
            <div class="nav-left">
              <a href="${isTerms ? 'index.html' : '#banner'}" class="nav-logo">
                <img src="assets/img/medibridge_logo.svg" alt="MediBridge Logo" class="nav-logo-img" />
              </a>
              <ul class="nav-links">${links}</ul>
            </div>
            <div class="nav-actions">
              <button class="lang-toggle" type="button" id="langToggle" aria-label="Switch language">EN</button>
              <button class="nav-btn" type="button" id="themeToggle" aria-label="Toggle theme"><i data-lucide="${preThemeIcon()}"></i></button>
              <a href="#" class="btn btn-nav" data-section="nav" data-value="signIn">Sign In</a>
              <button class="hamburger" type="button" id="hamburger" aria-label="Open menu" aria-expanded="false">
                <span></span><span></span><span></span>
              </button>
            </div>
          </div>
        </nav>
      </header>
      <div class="mobile-menu" id="mobileMenu" role="navigation" aria-label="Mobile navigation" aria-hidden="true">
        ${NAV_LINKS.map((l) => `<a href="${withPrefix(l.href)}" data-section="nav" data-value="${l.key}">${l.label}</a>`).join('')}
        <a href="#" class="btn btn-nav btn-mobile" data-section="nav" data-value="signIn">Sign In</a>
      </div>
    `;
  }

  function footerHtml() {
    const platform = FOOTER_LINKS.platform
      .map((l) => `<li><a href="${withPrefix(l.href)}" data-section="footer" data-value="${l.key}">${l.label}</a></li>`)
      .join('');
    const company = FOOTER_LINKS.company
      .map((l) => `<li><a href="${withPrefix(l.href)}" data-section="footer" data-value="${l.key}">${l.label}</a></li>`)
      .join('');
    const legal = FOOTER_LINKS.legal
      .map((l) => {
        const href = l.href === '#' ? '#' : l.href;
        return `<li><a href="${href}" data-section="footer" data-value="${l.key}">${l.label}</a></li>`;
      })
      .join('');

    return `
      <footer class="footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <a href="${isTerms ? 'index.html' : '#banner'}" class="nav-logo">
                <img src="assets/img/medibridge_logo.svg" alt="MediBridge Logo" class="nav-logo-img" />
              </a>
              <p data-section="footer" data-value="description">Centralized geriatric care monitoring platform by VitalSync. Connecting families and caregivers through technology.</p>
            </div>
            <div class="footer-col">
              <h4 data-section="footer" data-value="platformTitle">Platform</h4>
              <ul>${platform}</ul>
            </div>
            <div class="footer-col">
              <h4 data-section="footer" data-value="companyTitle">Company</h4>
              <ul>${company}</ul>
            </div>
            <div class="footer-col">
              <h4 data-section="footer" data-value="legalTitle">Legal</h4>
              <ul>${legal}</ul>
            </div>
          </div>
          <div class="footer-bottom">
            <p>© 2026 VitalSync. All rights reserved.</p>
            <p data-section="footer" data-value="madeWith">Made with dedication for elderly care in Latin America.</p>
          </div>
        </div>
      </footer>
    `;
  }

  function mount() {
    const navMount = document.getElementById('nav-mount');
    const footerMount = document.getElementById('footer-mount');
    if (navMount) navMount.outerHTML = navHtml();
    if (footerMount) footerMount.outerHTML = footerHtml();
  }

  function preThemeIcon() {
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    return theme === 'dark' ? 'sun' : 'moon';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
