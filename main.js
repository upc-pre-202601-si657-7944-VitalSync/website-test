const LANG_KEY = 'site-lang';
const THEME_KEY = 'site-theme';

async function applyLanguage(lang) {
  try {
    const response = await fetch(`i18n/${lang}.json`);
    const dict = await response.json();
    document.querySelectorAll('[data-section][data-value]').forEach((el) => {
      const s = el.getAttribute('data-section');
      const v = el.getAttribute('data-value');
      if (dict[s] && dict[s][v] != null) el.innerHTML = dict[s][v];
    });
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem(LANG_KEY, lang);
    const langBtn = document.getElementById('langToggle');
    if (langBtn) langBtn.textContent = lang.toUpperCase();
  } catch (e) {
    console.warn('i18n: could not load language file', lang);
  }
}

function initLanguage() {
  const saved = localStorage.getItem(LANG_KEY) || 'en';
  if (saved !== 'en') applyLanguage(saved);
  const langBtn = document.getElementById('langToggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const current = localStorage.getItem(LANG_KEY) || 'en';
      applyLanguage(current === 'en' ? 'es' : 'en');
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.innerHTML = theme === 'dark'
      ? '<i data-lucide="sun"></i>'
      : '<i data-lucide="moon"></i>';
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY) || 'dark';
  applyTheme(saved);
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = localStorage.getItem(THEME_KEY) || 'dark';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }
}

function initFadeUp() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -12% 0px' }
  );
  document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
}

function animateCounter(el) {
  const target = parseFloat(el.getAttribute('data-count'));
  const suffix = el.getAttribute('data-suffix') || '';
  const decimals = Number.isInteger(target) ? 0 : 1;
  const duration = 1800;
  const start = performance.now();

  function formatNumber(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(0) + 'K';
    return decimals ? n.toFixed(decimals) : Math.floor(n).toString();
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = formatNumber(target) + suffix;
    return;
  }

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * target;
    el.textContent = formatNumber(current) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

function initCounters() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  document.querySelectorAll('[data-count]').forEach((el) => observer.observe(el));
}

function initVideoFacade() {
  document.querySelectorAll('.video-facade').forEach((facade) => {
    facade.addEventListener('click', () => {
      const videoId = facade.getAttribute('data-video-id');
      if (!videoId) return;
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      iframe.setAttribute('allow', 'autoplay; encrypted-media');
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('title', 'Video player');
      facade.innerHTML = '';
      facade.appendChild(iframe);
    });
  });
}

function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  function setOpen(open) {
    mobileMenu.classList.toggle('open', open);
    hamburger.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', open);
    mobileMenu.setAttribute('aria-hidden', !open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) hamburger.focus();
  }

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    setOpen(!isOpen);
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      setOpen(false);
    }
  });
}

function initFaq() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        items.forEach((other) => {
          if (other !== item) other.open = false;
        });
      }
    });
  });
}

function initActiveSection() {
  const links = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!links.length) return;

  const linkByHash = new Map();
  links.forEach((link) => linkByHash.set(link.getAttribute('href').slice(1), link));

  const sections = Array.from(linkByHash.keys())
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const link = linkByHash.get(entry.target.id);
        if (!link) return;
        links.forEach((l) => l.removeAttribute('aria-current'));
        link.setAttribute('aria-current', 'location');
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initTheme();
  initFadeUp();
  initCounters();
  initVideoFacade();
  initHamburger();
  initFaq();
  initActiveSection();
  if (typeof lucide !== 'undefined') lucide.createIcons();
});
