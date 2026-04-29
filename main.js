// ── NAV SCROLL ──
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── INTERSECTION OBSERVER (fade-up) ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.pillar, .module-card, .price-block').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.6s ease ${i * 0.07}s, transform 0.6s ease ${i * 0.07}s`;
  observer.observe(el);
});

// ── HERO FADE IN ──
document.querySelector('.hero__inner')?.classList.add('fade-up', 'fade-up-1');
document.querySelector('.hero__visual')?.classList.add('fade-up', 'fade-up-3');

// ── WAITLIST FORM → GOOGLE SHEETS ──
// SETUP: Replace SCRIPT_URL with your Google Apps Script Web App URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxy2oEzkECt8hDQpxluwc5goVDV9qF0nDuzNll9VhmOaDIgtk2bilBiJA9tXRGCfjRvmQ/exec';

const form = document.getElementById('waitlistForm');
const msg = document.getElementById('formMessage');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  const name = form.querySelector('[name="name"]').value.trim();
  const email = form.querySelector('[name="email"]').value.trim();

  if (!name || !email) return;

  btn.textContent = 'Joining...';
  btn.disabled = true;
  msg.className = 'form-message';
  msg.textContent = '';

  try {
    const res = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        timestamp: new Date().toISOString(),
        source: 'kansoway.com'
      }),
      mode: 'no-cors'
    });

    // no-cors returns opaque response — assume success
    msg.className = 'form-message success';
    msg.textContent = 'You are on the list. We will reach out before launch.';
    form.reset();
  } catch (err) {
    msg.className = 'form-message error';
    msg.textContent = 'Something went wrong. Please try again or email hello@kansoway.com';
  } finally {
    btn.textContent = 'Join Waitlist';
    btn.disabled = false;
  }
});
