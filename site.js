const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');

if (menuButton && mobileMenu) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    mobileMenu.hidden = isOpen;
    menuButton.querySelector('.menu-icon').textContent = isOpen ? '+' : '×';
  });
  mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    mobileMenu.hidden = true;
    menuButton.querySelector('.menu-icon').textContent = '+';
  }));
}

const gallery = document.querySelector('.gallery-track');
const galleryCount = document.querySelector('.gallery-count');
const galleryCards = gallery ? [...gallery.querySelectorAll('.gallery-card')] : [];

function moveGallery(direction) {
  if (!gallery || galleryCards.length === 0) return;
  const current = Math.round(gallery.scrollLeft / galleryCards[0].offsetWidth);
  const next = Math.max(0, Math.min(galleryCards.length - 1, current + direction));
  gallery.scrollTo({ left: galleryCards[next].offsetLeft, behavior: 'smooth' });
  if (galleryCount) galleryCount.textContent = `${String(next + 1).padStart(2, '0')} / ${String(galleryCards.length).padStart(2, '0')}`;
}

document.querySelector('[data-gallery="previous"]')?.addEventListener('click', () => moveGallery(-1));
document.querySelector('[data-gallery="next"]')?.addEventListener('click', () => moveGallery(1));

gallery?.addEventListener('scroll', () => {
  if (!galleryCount || galleryCards.length === 0) return;
  const current = Math.min(galleryCards.length - 1, Math.round(gallery.scrollLeft / galleryCards[0].offsetWidth));
  galleryCount.textContent = `${String(current + 1).padStart(2, '0')} / ${String(galleryCards.length).padStart(2, '0')}`;
}, { passive: true });
