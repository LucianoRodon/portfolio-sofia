// main.js

// Año dinámico footer
document.getElementById('year').textContent = new Date().getFullYear();

// THEME (CLARO / OSCURO)
const root = document.documentElement;
const body = document.body;
const themeBtn = document.getElementById('themeBtn');

function applyTheme(mode) {
  if (mode === 'dark') {
    body.classList.add('dark-mode');

    // fondo/colores oscuros
    root.style.setProperty('--bg', '#1f1a29');
    root.style.setProperty('--surface', '#2a2336');
    root.style.setProperty('--surface-2', '#352d45');
    root.style.setProperty(
      '--section-alt-bg',
      'radial-gradient(circle at 80% 20%, rgba(125,109,245,.12) 0%, transparent 60%), radial-gradient(circle at 10% 90%, rgba(47,41,64,.8) 0%, transparent 60%), #1f1a29'
    );
    root.style.setProperty('--text', '#eae6f6');
    root.style.setProperty('--muted', '#bfb6d6');
    root.style.setProperty('--line', '#514667');

    // navbar oscuro/transparente que combine
    root.style.setProperty('--nav-bg', 'rgba(31,26,41,.7)');
    root.style.setProperty('--nav-line-color', '#3a304d');
    root.style.setProperty('--nav-shadow', '0 20px 40px rgba(0,0,0,.8)');

    themeBtn.textContent = 'Tema: Oscuro';
  } else {
    body.classList.remove('dark-mode');

    // fondo/colores claros
    root.style.setProperty('--bg', '#fffaf2');
    root.style.setProperty('--surface', '#ffffff');
    root.style.setProperty('--surface-2', '#fff3e8');
    root.style.setProperty(
      '--section-alt-bg',
      'radial-gradient(circle at 80% 20%, rgba(125,109,245,.06) 0%, transparent 60%), radial-gradient(circle at 10% 90%, rgba(255,244,230,.5) 0%, transparent 60%), #fffaf2'
    );
    root.style.setProperty('--text', '#2f2940');
    root.style.setProperty('--muted', '#6a617a');
    root.style.setProperty('--line', '#efe4d7');

    // navbar claro original
    root.style.setProperty('--nav-bg', 'rgba(255,250,242,.6)');
    root.style.setProperty('--nav-line-color', 'var(--line)');
    root.style.setProperty('--nav-shadow', '0 20px 40px rgba(47,41,64,.08)');

    themeBtn.textContent = 'Tema: Claro';
  }
  localStorage.setItem('themePref', mode);
}

applyTheme(localStorage.getItem('themePref') || 'light');

themeBtn.addEventListener('click', () => {
  const current = localStorage.getItem('themePref') || 'light';
  applyTheme(current === 'light' ? 'dark' : 'light');
  onScrollUI(); // refrescar sombra nav según tema cuando cambias
});

// NAV mobile
const menuBtn = document.getElementById('menuBtn');
const navlinks = document.getElementById('navlinks');
menuBtn.addEventListener('click', () => {
  const isOpen = navlinks.classList.toggle('show');
  menuBtn.setAttribute('aria-expanded', String(isOpen));
});
navlinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    if (window.innerWidth <= 780) {
      navlinks.classList.remove('show');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });
});

// HOVER TILT (cards con parallax 3D leve)
const tiltEls = document.querySelectorAll('[data-tilt]');
tiltEls.forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const rx = ((y / r.height) - .5) * 5;
    const ry = ((x / r.width) - .5) * -5;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
  });
});

// PARALLAX retrato leve al hacer scroll
const portrait = document.getElementById('portrait');
let lastY = 0;
window.addEventListener('scroll', () => {
  if (!portrait) return;
  const y = window.scrollY;
  const delta = Math.max(-8, Math.min(8, (y - lastY) * 0.1));
  portrait.style.transform = `translateY(${delta}px)`;
  lastY = y;
}, { passive: true });

// Scroll UI (back to top + sombra nav adaptada a tema)
const backtop = document.getElementById('backtop');
const nav = document.getElementById('nav');

function onScrollUI() {
  const y = window.scrollY || document.documentElement.scrollTop;
  backtop.classList.toggle('show', y > 400);

  if (body.classList.contains('dark-mode')) {
    nav.style.boxShadow = y > 4
      ? '0 20px 40px rgba(0,0,0,.8)'
      : '0 20px 40px rgba(0,0,0,.6)';
  } else {
    nav.style.boxShadow = y > 4
      ? '0 20px 40px rgba(0,0,0,.18)'
      : '0 20px 40px rgba(47,41,64,.08)';
  }
}
onScrollUI();
window.addEventListener('scroll', onScrollUI, { passive: true });

backtop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const d = el.getAttribute('data-delay');
      if (d) { el.style.transitionDelay = d; }
      el.classList.add('in');
      if (el.classList.contains('section-title')) el.classList.add('in');
      io.unobserve(el);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -80px 0px" });

document.querySelectorAll('[data-anim], .section-title').forEach(el => io.observe(el));

/* ======== RESERVA DE SERVICIO ======== */
const OWNER_EMAIL = 'sofi09-@live.com'; // tu correo

const bookingOverlay = document.getElementById('bookingOverlay');
const bookingModal = document.getElementById('bookingModal');
const bookingClose = document.getElementById('bookingClose');
const bookingForm = document.getElementById('bookingForm');
const bookingServiceInput = document.getElementById('bookingService');
const bookingServiceLabel = document.getElementById('bookingServiceLabel');

function openBookingModal(serviceName) {
  bookingServiceInput.value = serviceName;
  bookingServiceLabel.textContent = serviceName;
  bookingOverlay.hidden = false;
  bookingModal.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
  bookingOverlay.hidden = true;
  bookingModal.hidden = true;
  document.body.style.overflow = '';
}

// abrir modal al hacer click en una tarjeta de servicio
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', () => {
    const serviceName = card.querySelector('h3')
      ? card.querySelector('h3').textContent.trim()
      : 'Servicio';
    openBookingModal(serviceName);
  });
});

// cerrar modal
bookingOverlay.addEventListener('click', closeBookingModal);
bookingClose.addEventListener('click', closeBookingModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !bookingModal.hidden) {
    closeBookingModal();
  }
});

// manejar envío del formulario
bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = {
    service: bookingServiceInput.value.trim(),
    name: document.getElementById('clientName').value.trim(),
    email: document.getElementById('clientEmail').value.trim(),
    phone: document.getElementById('clientPhone').value.trim(),
    date: document.getElementById('desiredDate').value,
    details: document.getElementById('clientMsg').value.trim(),
  };

  if (!data.name || !data.email || !data.date) {
    alert('Por favor completá nombre, email y fecha.');
    return;
  }

  const subject = `Solicitud de servicio: ${data.service}`;
  const body =
    `Servicio: ${data.service}
Nombre: ${data.name}
Email: ${data.email}
WhatsApp / Tel: ${data.phone}
Fecha deseada: ${data.date}

Detalle del trabajo:
${data.details}`;

  const mailto = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // abre el cliente de correo del usuario con el borrador listo
  window.location.href = mailto;

  alert('Tu solicitud está lista para enviarse por email. Si no se abre tu correo, escribime a ' + OWNER_EMAIL + ' con esta info 🙌');
  closeBookingModal();
  bookingForm.reset();
});
