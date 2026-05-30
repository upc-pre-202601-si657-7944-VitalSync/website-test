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
  if (themeBtn) themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
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

document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initTheme();
});
