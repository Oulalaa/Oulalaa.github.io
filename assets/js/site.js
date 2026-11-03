/* Local, dependency-free controls for the personal site. */
(() => {
  const root = document.documentElement;
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  let savedTheme;
  try { savedTheme = localStorage.getItem('theme'); } catch (_) { /* Use system preference. */ }
  const applyTheme = dark => {
    if (dark) root.setAttribute('data-theme', 'dark'); else root.removeAttribute('data-theme');
    const icon = document.getElementById('theme-icon');
    if (icon) icon.textContent = dark ? '☾' : '☀';
  };
  applyTheme(savedTheme === 'dark' || (savedTheme !== 'light' && preference.matches));
  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const dark = root.getAttribute('data-theme') !== 'dark';
    savedTheme = dark ? 'dark' : 'light';
    try { localStorage.setItem('theme', savedTheme); } catch (_) { /* Theme still works for this page. */ }
    applyTheme(dark);
  });
  preference.addEventListener('change', e => { if (!savedTheme || savedTheme === 'system') applyTheme(e.matches); });
  const follow = document.querySelector('.author__urls-wrapper button');
  const links = document.querySelector('.author__urls');
  follow?.addEventListener('click', () => {
    const show = getComputedStyle(links).display === 'none';
    links.style.display = show ? 'block' : 'none';
    follow.setAttribute('aria-expanded', String(show));
  });
  window.addEventListener('resize', () => { if (innerWidth >= 925 && links) links.style.display = ''; });
})();
