// Mobile nav toggle
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
menuBtn?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});

// Dropdown toggle for mobile (tap to open)
function closeAllDropdowns() {
  document.querySelectorAll('.mainnav li.has-dd.open').forEach(li => li.classList.remove('open'));
}
document.querySelectorAll('.mainnav li.has-dd > a').forEach(link => {
  link.addEventListener('click', (e) => {
    // Only intercept on mobile widths
    if (window.innerWidth <= 920) {
      e.preventDefault();
      const li = link.parentElement;
      const isOpen = li.classList.contains('open');
      closeAllDropdowns();
      if (!isOpen) li.classList.add('open');
    }
  });
});
// Close mobile dropdowns if clicking outside
document.addEventListener('click', (e) => {
  if (window.innerWidth > 920) return;
  const navEl = document.querySelector('.navrow');
  if (navEl && !navEl.contains(e.target)) closeAllDropdowns();
});

// Simple Carousel
const slides = Array.from(document.querySelectorAll('.slide'));
const dotsWrap = document.getElementById('dots');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let idx = 0;
let timer = null;
const DURATION = 2000;

function renderDots() {
  dotsWrap.innerHTML = '';
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.className = 'dot' + (i === idx ? ' active' : '');
    b.setAttribute('aria-label', `Go to slide ${i + 1}`);
    b.addEventListener('click', () => go(i, true));
    dotsWrap.appendChild(b);
  });
}

function go(newIdx, user = false) {
  slides[idx].classList.remove('active');
  idx = (newIdx + slides.length) % slides.length;
  slides[idx].classList.add('active');
  renderDots();
  if (user) restart();
}

function nextSlide() { go(idx + 1); }
function prevSlide() { go(idx - 1, true); }

function restart() {
  if (timer) clearInterval(timer);
  if (!prefersReduced) timer = setInterval(nextSlide, DURATION);
}

next.addEventListener('click', () => go(idx + 1, true));
prev.addEventListener('click', prevSlide);

// Pause on hover
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', () => timer && clearInterval(timer));
carousel.addEventListener('mouseleave', restart);

// Keyboard controls
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') go(idx + 1, true);
  if (e.key === 'ArrowLeft') go(idx - 1, true);
});

// Init
renderDots();
restart();

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// ===== FAQ: close others when one opens (optional) =====
document.querySelectorAll('.faq .faq-item').forEach(d => {
  d.addEventListener('toggle', () => {
    if (d.open) {
      document.querySelectorAll('.faq .faq-item').forEach(o => {
        if (o !== d) o.open = false;
      });
    }
  });
});

// Tiny toast for inline confirmations (used by contact form)
(function(){
  const t = document.createElement('div');
  t.className = 'toast';
  t.setAttribute('role','status');
  t.setAttribute('aria-live','polite');
  document.body.appendChild(t);

  let tid = null;
  document.addEventListener('toast', (e) => {
    const msg = e.detail || 'Saved.';
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(tid);
    tid = setTimeout(()=> t.classList.remove('show'), 2500);
  });
})();

