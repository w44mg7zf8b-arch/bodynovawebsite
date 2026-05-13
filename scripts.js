const HEADER_FALLBACK = `
<div class="top-note"><span></span>Premium aesthetic clinic treatments in Dubai<span></span></div>
<header class="site-header" id="site-header"><div class="shell header-shell"><a href="index.html" class="brand"><img src="assets/images/logo-light.png" alt="BodyNova Beauty Center" class="brand-logo brand-logo-light" loading="eager" decoding="async"><img src="assets/images/logo-dark.png" alt="" class="brand-logo brand-logo-dark" loading="eager" decoding="async" aria-hidden="true"></a><nav class="desktop-nav"><a href="index.html#home">Home</a><a href="about.html">About</a><a href="index.html#how">How It Works</a><a href="index.html#moments">Moments</a><div class="nav-dropdown" data-dropdown><a href="services.html" class="nav-dropdown-trigger" aria-haspopup="true" aria-expanded="false">Services<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></a><div class="nav-dropdown-menu" role="menu"><a href="service-body-sculpting.html" role="menuitem">Body Sculpting &amp; Fat Removal</a><a href="service-hydra-facial.html" role="menuitem">Hydra Facial</a><a href="service-body-contouring.html" role="menuitem">Body Contouring</a><a href="service-body-slimming.html" role="menuitem">Body Slimming</a><a href="service-skin-tightening.html" role="menuitem">Skin Tightening</a><a href="service-lymphatic-drainage.html" role="menuitem">Lymphatic Drainage</a><a href="service-cellulite-reduction.html" role="menuitem">Cellulite Reduction</a><a href="service-detox-body-wrap.html" role="menuitem">Detox Body Wrap</a></div></div><a href="index.html#offers">Offers</a><a href="index.html#reviews">Reviews</a><a href="contact.html">Contact</a></nav><div class="header-actions"><a href="#" class="header-call js-call">Call</a><a href="#" class="header-book js-book">Book Now</a></div><button class="menu-toggle" id="menu-toggle" type="button" aria-label="Open menu"><span></span><span></span><span></span></button></div><div class="mobile-panel" id="mobile-panel"><nav class="mobile-nav"><a href="index.html#home">Home</a><a href="about.html">About</a><a href="index.html#how">How It Works</a><a href="index.html#moments">Moments</a><div class="mobile-submenu" data-mobile-submenu><button type="button" class="mobile-submenu-toggle" aria-expanded="false"><span>Services</span><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button><div class="mobile-submenu-list"><a href="services.html">All Services</a><a href="service-body-sculpting.html">Body Sculpting &amp; Fat Removal</a><a href="service-hydra-facial.html">Hydra Facial</a><a href="service-body-contouring.html">Body Contouring</a><a href="service-body-slimming.html">Body Slimming</a><a href="service-skin-tightening.html">Skin Tightening</a><a href="service-lymphatic-drainage.html">Lymphatic Drainage</a><a href="service-cellulite-reduction.html">Cellulite Reduction</a><a href="service-detox-body-wrap.html">Detox Body Wrap</a></div></div><a href="index.html#offers">Offers</a><a href="index.html#reviews">Reviews</a><a href="contact.html">Contact</a></nav><div class="mobile-actions"><a href="#" class="soft-btn js-call">Call Now</a><a href="#" class="main-btn js-whatsapp">WhatsApp</a></div></div></header>`;

const FOOTER_FALLBACK = `
<footer class="footer" id="contact"><div class="shell footer-shell"><div class="footer-topline"><p class="eyebrow">BodyNova Beauty Center</p><div class="footer-topline-actions"><a href="#" class="main-btn js-whatsapp">Book on WhatsApp</a><a href="#" class="soft-btn js-call">Call Now</a></div></div><div class="footer-grid footer-grid-cards"><div class="footer-card footer-intro-card"><h2>Luxury aesthetic care with calm precision.</h2><p>Clinic based beauty and body treatments designed for comfort, confidence, and refined results. Thoughtful care, advanced treatments, and a premium experience.</p><div class="footer-socials"><a href="#" id="footer-instagram" aria-label="Instagram" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.9"></rect><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.9"></circle><circle cx="17.5" cy="6.5" r="1.15" fill="currentColor"></circle></svg></a><a href="#" id="footer-facebook" aria-label="Facebook" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.6 1.6-1.6h1.7V4.2c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.4V14h2.7v8h3.4Z"></path></svg></a><a href="#" id="footer-tiktok" aria-label="TikTok" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.66a8.16 8.16 0 0 0 4.77 1.52V6.73a4.85 4.85 0 0 1-1.84-.04Z"></path></svg></a><a href="#" id="footer-whatsapp" aria-label="WhatsApp" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"></path></svg></a></div></div><div class="footer-card footer-menu-card"><h4>Menu</h4><div class="footer-link-list"><a href="index.html#home"><span>Home</span><small>01</small></a><a href="about.html"><span>About Us</span><small>02</small></a><a href="index.html#services"><span>Services</span><small>03</small></a><a href="contact.html#contact-faq"><span>FAQs</span><small>04</small></a><a href="contact.html"><span>Contact Us</span><small>05</small></a></div></div><div class="footer-card footer-services-card"><h4>Services</h4><div class="footer-link-list"><a href="service-body-sculpting.html"><span>Body Sculpting</span></a><a href="service-hydra-facial.html"><span>Hydra Facial</span></a><a href="service-body-contouring.html"><span>Body Contouring</span></a><a href="service-skin-tightening.html"><span>Skin Tightening</span></a><a href="service-lymphatic-drainage.html"><span>Lymphatic Drainage</span></a></div></div><div class="footer-card footer-contact-card"><h4>Contact</h4><div class="footer-contact-stack"><div class="footer-contact-item"><span class="footer-label">Phone</span><a href="#" id="footer-phone-link"></a></div><div class="footer-contact-item"><span class="footer-label">Email</span><a href="#" id="footer-email-link"></a></div><div class="footer-contact-item"><span class="footer-label">Address</span><span id="footer-address"></span></div></div></div></div><div class="footer-bottom"><p id="footer-copy-text"></p><div class="payment-row"><span>Visa</span><span>Mastercard</span><span>Tabby</span><span>Apple Pay</span></div><div class="footer-bottom-links"><a href="#">Terms</a><a href="#">Privacy</a></div></div></div></footer>`;

async function loadPartial(selector, url, fallback) {
  const mount = document.querySelector(selector);
  if (!mount) return;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(url);
    mount.innerHTML = await res.text();
  } catch (error) {
    mount.innerHTML = fallback;
  }
}

function applyConfig() {
  if (typeof CONFIG === 'undefined') return;
  document.querySelectorAll('.js-whatsapp').forEach(el => el.href = CONFIG.whatsappUrl);
  document.querySelectorAll('.js-call').forEach(el => el.href = CONFIG.phoneUrl);
  document.querySelectorAll('.js-book').forEach(el => el.href = CONFIG.bookingLink);

  const phone = document.getElementById('footer-phone-link');
  if (phone) { phone.href = CONFIG.phoneUrl; phone.textContent = CONFIG.phoneDisplay; }
  const email = document.getElementById('footer-email-link');
  if (email) { email.href = `mailto:${CONFIG.email}`; email.textContent = CONFIG.email; }
  const address = document.getElementById('footer-address');
  if (address) address.textContent = CONFIG.address;
  const copy = document.getElementById('footer-copy-text');
  if (copy) copy.textContent = `© ${new Date().getFullYear()} ${CONFIG.brandName}. All rights reserved.`;
  const ig = document.getElementById('footer-instagram');
  const fb = document.getElementById('footer-facebook');
  const tt = document.getElementById('footer-tiktok');
  const wa = document.getElementById('footer-whatsapp');
  if (ig) ig.href = CONFIG.instagramLink;
  if (fb) fb.href = CONFIG.facebookLink;
  if (tt) tt.href = CONFIG.tiktokLink;
  if (wa) wa.href = CONFIG.whatsappUrl;
}

function initMenu() {
  const btn = document.getElementById('menu-toggle');
  const panel = document.getElementById('mobile-panel');
  if (!btn || !panel) return;
  btn.addEventListener('click', () => {
    const open = panel.classList.toggle('is-open');
    btn.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    panel.setAttribute('aria-hidden', open ? 'false' : 'true');
  });
  panel.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    panel.classList.remove('is-open');
    btn.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
  }));
}

function initReveal() {
  const items = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  items.forEach(item => observer.observe(item));
}

function initSlider() {
  const slides = [...document.querySelectorAll('.slide')];
  const dots = [...document.querySelectorAll('.slider-dots button')];
  if (!slides.length) return;
  let active = 0;
  function go(index) {
    slides[active].classList.remove('active');
    dots[active]?.classList.remove('active');
    active = (index + slides.length) % slides.length;
    slides[active].classList.add('active');
    dots[active]?.classList.add('active');
  }
  dots.forEach((dot, index) => dot.addEventListener('click', () => go(index)));
  setInterval(() => go(active + 1), 5200);
}


function initStoryMedia() {
  if (typeof CONFIG === 'undefined') return;
  const img = document.getElementById('story-media-image');
  const video = document.getElementById('story-media-video');
  const source = document.getElementById('story-media-source');
  const placeholder = document.getElementById('story-media-placeholder');
  if (!img || !video || !source || !placeholder) return;
  const imageSrc = CONFIG.aboutShowcaseImage || 'assets/images/about-showcase.jpg';
  const posterSrc = CONFIG.aboutShowcasePoster || imageSrc;
  const videoSrc = CONFIG.aboutShowcaseVideo || '';
  const mode = (CONFIG.aboutShowcaseMediaType || 'image').toLowerCase();
  img.src = imageSrc;
  img.onerror = () => { if (!video.classList.contains('is-active')) placeholder.classList.add('is-active'); img.classList.remove('is-active'); };
  video.poster = posterSrc;
  source.src = videoSrc;
  video.load();
  function showImage(){ img.classList.add('is-active'); video.classList.remove('is-active'); placeholder.classList.remove('is-active'); video.pause(); }
  function showVideo(){ video.classList.add('is-active'); img.classList.remove('is-active'); placeholder.classList.remove('is-active'); const p = video.play(); if (p && typeof p.catch === 'function') p.catch(() => showImage()); }
  video.addEventListener('error', showImage, { once:true });
  if (mode === 'video' && videoSrc) showVideo(); else showImage();
}


/* ================== EMAIL FORMS ==================
   All website forms (homepage booking, about booking, service-page booking,
   contact form, footer/CTA forms) submit user details to the clinic mailbox
   via send.php on the local server. send.php builds a fully-branded HTML
   email (BodyNova teal + gold, no third-party sponsor footer) and uses
   PHP's built-in mail() function (the host's local MTA — sendmail /
   postfix). On success the visitor is redirected to thank-you.html. The
   "Or WhatsApp instead" link on each form is a separate <a>, so it keeps
   working independently. */

const FORM_EMAIL_ENDPOINT = 'send.php';
const FORM_THANK_YOU_URL  = 'thank-you.html';

function ensureFormStatusEl(form) {
  let status = form.querySelector('.form-status');
  if (!status) {
    status = document.createElement('p');
    status.className = 'form-status';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    form.appendChild(status);
  }
  return status;
}

function setFormStatus(form, type, message) {
  const status = ensureFormStatusEl(form);
  status.classList.remove('is-success', 'is-error', 'is-loading');
  if (type) status.classList.add(`is-${type}`);
  status.textContent = message || '';
}

function buildFormSubject(form) {
  const explicit = form.getAttribute('data-email-subject');
  if (explicit) return explicit;
  const title = (document.title || 'BodyNova').replace(/\s*\|\s*BodyNova.*$/i, '').trim();
  return `New website enquiry — ${title || 'BodyNova'}`;
}

function collectFormPayload(form) {
  const data = new FormData(form);
  const payload = {
    _subject: buildFormSubject(form),
    Page: document.title || location.pathname,
    'Page URL': location.href
  };
  data.forEach((value, key) => {
    if (key.startsWith('_')) { payload[key] = value; return; }
    const label = key.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    payload[label] = (value || '').toString().trim();
  });
  return payload;
}

/* Convert the {label: value} payload into URL-encoded form data so PHP's
   $_POST superglobal can parse it natively (no need for json_decode on
   php://input). */
function payloadToFormEncoded(payload) {
  const params = new URLSearchParams();
  Object.keys(payload).forEach(key => {
    const value = payload[key];
    if (value === undefined || value === null) return;
    params.append(key, String(value));
  });
  return params.toString();
}

async function submitFormToEmail(form, options = {}) {
  const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
  const originalLabel = submitBtn ? submitBtn.innerHTML : '';
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-busy', 'true');
  }
  setFormStatus(form, 'loading', options.loadingMessage || 'Sending your details…');
  try {
    const response = await fetch(FORM_EMAIL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: payloadToFormEncoded(collectFormPayload(form))
    });
    let serverPayload = null;
    try { serverPayload = await response.json(); } catch (e) { /* not JSON */ }

    if (!response.ok) {
      const serverMessage = serverPayload && (serverPayload.error || serverPayload.detail);
      const err = new Error(serverMessage || `Form submission failed (${response.status})`);
      err.status = response.status;
      err.serverMessage = serverMessage;
      throw err;
    }
    setFormStatus(form, 'success', options.successMessage ||
      'Thank you — your request has been sent. Redirecting…');
    form.reset();
    const target = options.thankYouUrl || FORM_THANK_YOU_URL;
    setTimeout(() => { window.location.href = target; }, 600);
  } catch (error) {
    console.error('[BodyNova form] submission error:', error);
    const userMessage = options.errorMessage
      || (error && error.serverMessage
          ? `Sorry, your message could not be sent — ${error.serverMessage} Please try again or contact us on WhatsApp.`
          : 'Sorry, we could not send your message right now. Please try again or contact us on WhatsApp.');
    setFormStatus(form, 'error', userMessage);
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.removeAttribute('aria-busy');
      submitBtn.innerHTML = originalLabel;
    }
  }
}

function attachEmailFormHandler(form, options) {
  if (!form || form.dataset.emailBound === '1') return;
  form.dataset.emailBound = '1';
  form.setAttribute('novalidate', 'novalidate');
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (typeof form.checkValidity === 'function' && !form.checkValidity()) {
      form.reportValidity();
      return;
    }
    submitFormToEmail(form, options || {});
  });
}

function initBookingForm() {
  document.querySelectorAll('#booking-form, .booking-form, .about-booking-form').forEach(form => {
    attachEmailFormHandler(form, {
      successMessage: 'Thank you — your booking request has been received. Our clinic team will confirm shortly.'
    });
  });
}

function initAmbientMotion() {
  document.querySelectorAll('.product-row article, .service-card, .mini-offers article').forEach((card, index) => {
    card.style.transitionDelay = `${Math.min(index * 40, 180)}ms`;
  });
}

function initHeroSlider() {
  const slides = [...document.querySelectorAll('.hero-slide')];
  const dots   = [...document.querySelectorAll('.hero-dot')];
  const prev   = document.querySelector('.hero-prev');
  const next   = document.querySelector('.hero-next');
  const nav    = document.querySelector('.hero-slider-nav');
  if (!slides.length) return;

  let active = 0;
  let timer;

  function goTo(idx) {
    slides[active].classList.remove('is-active');
    dots[active]?.classList.remove('is-active');
    active = (idx + slides.length) % slides.length;
    slides[active].classList.add('is-active');
    dots[active]?.classList.add('is-active');
    if (nav) {
      nav.setAttribute('data-current', active + 1);
      nav.setAttribute('data-total', slides.length);
    }
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(() => goTo(active + 1), 5500);
  }

  // Init counter attrs
  if (nav) {
    nav.setAttribute('data-current', '1');
    nav.setAttribute('data-total', slides.length);
  }

  dots.forEach((d, i) => d.addEventListener('click', () => { goTo(i); startAuto(); }));
  prev?.addEventListener('click', () => { goTo(active - 1); startAuto(); });
  next?.addEventListener('click', () => { goTo(active + 1); startAuto(); });

  startAuto();
}


/* Transparent header to sticky solid header */
function initTransparentStickyHeader() {
  const header = document.getElementById('site-header');
  const topNote = document.querySelector('.top-note');
  if (!header) return;

  const update = () => {
    const scrolled = window.scrollY > 48;
    header.classList.toggle('is-scrolled', scrolled);
    header.classList.toggle('is-transparent', !scrolled);

    if (topNote) {
      topNote.classList.toggle('top-note-hidden', scrolled);
      header.style.top = scrolled ? '0px' : `${topNote.offsetHeight}px`;
    }
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
}

function initSmoothScroll() {
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

/* Desktop dropdown (Services) — opens on hover and on focus / keyboard
   activation. Tap on touch devices opens it without navigating. */
function initNavDropdowns() {
  const dropdowns = document.querySelectorAll('[data-dropdown]');
  dropdowns.forEach(dd => {
    const trigger = dd.querySelector('.nav-dropdown-trigger');
    if (!trigger) return;

    function setOpen(open) {
      dd.classList.toggle('is-open', open);
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    // Tap-to-open on touch devices: first tap opens, second tap navigates.
    trigger.addEventListener('click', e => {
      const isTouch = window.matchMedia('(hover: none)').matches;
      if (isTouch && !dd.classList.contains('is-open')) {
        e.preventDefault();
        setOpen(true);
      }
    });

    // Close on outside click.
    document.addEventListener('click', e => {
      if (!dd.contains(e.target)) setOpen(false);
    });

    // Close on Escape.
    dd.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        setOpen(false);
        trigger.focus();
      }
    });
  });
}

/* Mobile submenu inside the burger panel. */
function initMobileSubmenus() {
  document.querySelectorAll('[data-mobile-submenu]').forEach(group => {
    const btn = group.querySelector('.mobile-submenu-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const open = group.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
}

/* Generic service-page booking form -> email.
   Used by every service-detail page and the services hub CTA. */
function initServiceBookingForm() {
  document.querySelectorAll('.service-booking-form, #service-booking-form-el').forEach(form => {
    attachEmailFormHandler(form, {
      successMessage: 'Thank you — your appointment request has been received. Our clinic team will be in touch.'
    });
  });
}

/* Contact-page enquiry form -> email. */
function initContactForm() {
  document.querySelectorAll('#contact-form, .contact-form').forEach(form => {
    attachEmailFormHandler(form, {
      successMessage: 'Thank you for your message — we will get back to you very soon.'
    });
  });
}

/* Catch-all: any other <form> in the page (footer/CTA forms etc.) also
   sends to the clinic mailbox via the same email pipeline. */
function initGenericEmailForms() {
  document.querySelectorAll('form').forEach(form => {
    if (form.dataset.emailBound === '1') return;
    if (form.dataset.noEmail === '1') return;
    attachEmailFormHandler(form);
  });
}

async function init() {
  await Promise.all([
    loadPartial('#header-placeholder', 'header.html', HEADER_FALLBACK),
    loadPartial('#footer-placeholder', 'footer.html', FOOTER_FALLBACK)
  ]);
  applyConfig();
  initMenu();
  initReveal();
  initSlider();
  initStoryMedia();
  initBookingForm();
  initAmbientMotion();
  initHeroSlider();
  initTransparentStickyHeader();
  initSmoothScroll();
  initNavDropdowns();
  initMobileSubmenus();
  initServiceBookingForm();
  initContactForm();
  initGenericEmailForms();
}

document.addEventListener('DOMContentLoaded', init);
