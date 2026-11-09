// Keep navigation useful without making the story depend on JavaScript.
const sectionLinks = [...document.querySelectorAll('.site-header nav a[href^="#"]')];
const sections = sectionLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    const active = entries.find(entry => entry.isIntersecting);
    if (!active) return;
    sectionLinks.forEach(link => {
      const current = link.getAttribute('href') === `#${active.target.id}`;
      link.classList.toggle('is-active', current);
      if (current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-10% 0px -65% 0px', threshold: 0 });
  sections.forEach(section => observer.observe(section));
}

// Each dated entry can be linked, bookmarked, or opened from the latest list.
function openLinkedEntry() {
  const id = window.location.hash.slice(1);
  const entry = document.getElementById(id);
  if (!entry || !entry.matches('details.notebook-detail')) return;
  entry.open = true;
  requestAnimationFrame(() => entry.scrollIntoView({block:'start'}));
}
window.addEventListener('hashchange', openLinkedEntry);
openLinkedEntry();
document.querySelectorAll('a[href^="#entry-"]').forEach(link => {
  link.addEventListener('click', () => {
    const entry = document.getElementById(link.hash.slice(1));
    if (entry?.matches('details.notebook-detail')) entry.open = true;
  });
});
