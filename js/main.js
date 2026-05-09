// ===========================
// MOBILE MENU
// ===========================
const navToggle = document.getElementById('navToggle');
const nav       = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-label', isOpen ? 'Zavřít menu' : 'Otevřít menu');
});

// Close mobile menu when a link is clicked
nav.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.classList.remove('open');
  });
});

// ===========================
// HEADER SCROLL SHADOW
// ===========================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ===========================
// ACTIVE NAV LINK (Intersection Observer)
// ===========================
const sections  = document.querySelectorAll('main section[id]');
const navLinks  = document.querySelectorAll('.nav__link[href^="#"]');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ===========================
// SCROLL REVEAL ANIMATION
// ===========================
const revealEls = document.querySelectorAll(
  '.product-card, .review-card, .about__inner, .contact__content, .section-header'
);

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ===========================
// CONTACT FORM (demo handler)
// ===========================
const contactForm = document.getElementById('contactForm');
const formNotice  = document.getElementById('formNotice');

if (contactForm) contactForm.addEventListener('submit', async e => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Odesílám...';
  formNotice.textContent = '';
  formNotice.className   = 'form-notice';

  // Simulate async send (replace with real fetch / emailjs / etc.)
  await new Promise(resolve => setTimeout(resolve, 1200));

  formNotice.textContent = 'Vaše zpráva právě přistála v našem úlu. Brzy se Vám ozveme!';
  formNotice.className   = 'form-notice success';
  contactForm.reset();

  btn.disabled    = false;
  btn.textContent = 'Odeslat zprávu';
});

// ===========================
// PRODUCT MODAL
// ===========================
const productData = {
  med: {
    title: 'Náš med',
    image: 'images/med.jpg',
    imageAlt: 'Med',
    content: `
      <div class="modal-item">
        <h4>Květový med</h4>
        <p>Jemný, zlatavý med ze smíšených lučních kvítků. Sbírán na rozkvetlých loukách v okolí naší vesnice. Ideální do čaje, na pečivo nebo jen tak po lžičce.</p>
        <span class="modal-tag">Dostupný celý rok</span>
      </div>
      <div class="modal-item">
        <h4>Lipový med</h4>
        <p>Intenzivně voňavý med s charakteristickými mentologickými tóny. Vynikající při nachlazení a zánětech horních cest dýchacích. Sklizeň probíhá v červnu až červenci.</p>
        <span class="modal-tag">Červen – Červenec</span>
      </div>
      <div class="modal-item">
        <h4>Lesní med</h4>
        <p>Tmavý medovicový med s bohatou, karamelovou chutí. Obsahuje výrazně více minerálů a antioxidantů než květové medy. Sbírán v létě a na podzim z blízkých lesů.</p>
        <span class="modal-tag">Léto – Podzim</span>
      </div>
      <div class="modal-note">Všechny naše medy jsou nepasterizované, bez přidaných látek – plné přírodních enzymů a vitamínů.</div>
    `
  },
  svicky: {
    title: 'Svíčky z včelího vosku',
    image: 'images/svicky.jpg',
    imageAlt: 'Svíčky',
    content: `
      <p>Naše svíčky jsou vyráběny ručně z přírodního včelího vosku. Na rozdíl od parafínových svíček jsou šetrnější k životnímu prostředí i vašemu zdraví.</p>
      <ul class="modal-list">
        <li>Hoří čistě, bez škodlivých emisí</li>
        <li>Vydávají jemnou, přirozenou vůni medu</li>
        <li>Ionizují vzduch a napomáhají jeho čistění</li>
        <li>Vydrží hořet podstatně déle než parafín</li>
      </ul>
      <div class="modal-item" style="margin-top:1.5rem;border-top:1px solid var(--color-border);padding-top:1.5rem;">
        <h4>Dostupné tvary a velikosti</h4>
        <p>Nabízíme válcové svíčky, votivní svíčky i originální odlitky ve tvaru plástve. Skvělý přírodní dárek pro každou příležitost. Větší objednávky prosím konzultujte předem.</p>
      </div>
      <div class="modal-note">Svíčky jsou dostupné celoročně. Kontaktujte nás pro aktuální nabídku.</div>
    `
  },
  propolis: {
    title: 'Propolis',
    image: 'images/propolis.jpg',
    imageAlt: 'Propolis',
    content: `
      <div class="modal-item">
        <h4>Co je propolis?</h4>
        <p>Propolis je přírodní látka, kterou včely vyrábějí ze smol stromů, pylových vosků a enzymů. Slouží jim k dezinfekci a utěsnění úlu – je to jeden z nejúčinnějších přírodních antibiotik.</p>
      </div>
      <div class="modal-item">
        <h4>Léčivé účinky</h4>
        <ul class="modal-list">
          <li>Antimikrobiální – ničí bakterie, viry i plísně</li>
          <li>Protizánětlivý – zmírňuje záněty v celém těle</li>
          <li>Imunostimulační – posiluje přirozený imunitní systém</li>
          <li>Antibakteriální – vhodný pro ústní hygienu</li>
        </ul>
      </div>
      <div class="modal-item">
        <h4>Jak propolis používat?</h4>
        <p>Nabízíme propolis ve formě tinktury a pevných bloků. Tinkturu lze nanášet na rány, přidávat do nápojů nebo používat jako kloktadlo. Pevný propolis je vhodný pro další zpracování doma.</p>
      </div>
      <div class="modal-note">Propolis je dostupný na objednávku. Kontaktujte nás pro více informací.</div>
    `
  },
  balicky: {
    title: 'Dárkové balíčky',
    image: 'images/darkove_sety.jpg',
    imageAlt: 'Dárkové balíčky',
    content: `
      <p>Sestavíme pro vás dárkový set ze všeho nejlepšího, co naše včelí rodiny nabízejí – přesně na míru vašich přání a rozpočtu.</p>
      <div class="modal-item" style="margin-top:1.25rem;border-top:1px solid var(--color-border);padding-top:1.25rem;">
        <h4>Co může být v balíčku?</h4>
        <ul class="modal-list">
          <li>Výběr z různých druhů medu (mini skleničky nebo plné)</li>
          <li>Ručně odlévané svíčky z včelího vosku</li>
          <li>Propolis – tinktura nebo pevný blok</li>
          <li>Recepty a tipy, jak s produkty pracovat</li>
        </ul>
      </div>
      <div class="modal-item">
        <h4>Pro koho se hodí?</h4>
        <ul class="modal-list">
          <li>Vánoční dárky pro rodinu a přátele</li>
          <li>Firemní dárky a pozornosti</li>
          <li>Narozeninové překvapení</li>
          <li>Výjimečná příležitost pro milovníky přírody</li>
        </ul>
      </div>
      <div class="modal-note">Kontaktujte nás s vaší představou a my připravíme balíček přesně podle vašich přání.</div>
    `
  }
};

const productModal  = document.getElementById('productModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose    = document.getElementById('modalClose');
const modalImg      = document.getElementById('modalImg');
const modalTitle    = document.getElementById('modalTitle');
const modalContent  = document.getElementById('modalContent');

if (productModal) {
  const modalPanel = productModal.querySelector('.product-modal__panel');

  function applyPanelHeight() {
    const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    modalPanel.style.maxHeight = (vh - 20) + 'px';
  }

  function openModal(key) {
    const data = productData[key];
    if (!data) return;

    modalImg.src           = data.image;
    modalImg.alt           = data.imageAlt;
    modalTitle.textContent = data.title;
    modalContent.innerHTML = data.content;

    applyPanelHeight();
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', applyPanelHeight);
    }

    productModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => productModal.classList.add('open'));
    setTimeout(() => modalClose.focus(), 50);
  }

  function closeModal() {
    productModal.classList.remove('open');
    if (window.visualViewport) {
      window.visualViewport.removeEventListener('resize', applyPanelHeight);
    }
    modalPanel.style.maxHeight = '';

    function onEnd(e) {
      if (e.target === productModal && e.propertyName === 'opacity') {
        productModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        productModal.removeEventListener('transitionend', onEnd);
      }
    }
    productModal.addEventListener('transitionend', onEnd);
  }

  document.querySelectorAll('.product-card[data-product]').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.product));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card.dataset.product); }
    });
  });

  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && productModal.classList.contains('open')) closeModal();
  });
}

// ===========================
// REVIEWS CAROUSEL
// ===========================
const reviewsCarousel = document.getElementById('reviewsCarousel');
if (reviewsCarousel) {
  const track     = document.getElementById('reviewsTrack');
  const dots      = reviewsCarousel.querySelectorAll('.reviews__dot');
  const origCards = Array.from(track.querySelectorAll('.review-card'));
  const total     = origCards.length;
  const mq        = window.matchMedia('(max-width: 899px)');

  let current = 1;
  let timer;
  let busy    = false;
  let active  = false;

  function cardWidth() { return reviewsCarousel.offsetWidth; }

  function setPos(idx, animate) {
    track.style.transition = animate ? 'transform 0.45s ease' : 'none';
    track.style.transform  = `translateX(${-idx * cardWidth()}px)`;
  }

  function syncCardWidths() {
    const w = cardWidth() + 'px';
    Array.from(track.children).forEach(c => { c.style.width = w; c.style.flexShrink = '0'; });
  }

  function updateDots() {
    const real = ((current - 1) + total) % total;
    dots.forEach((d, i) => d.classList.toggle('active', i === real));
  }

  function afterTransition() {
    busy = false;
    if (current === 0)          { setPos(total, false); current = total; }
    else if (current === total + 1) { setPos(1, false); current = 1; }
  }

  let jumpTimer;
  function goTo(idx) {
    if (busy) return;
    busy = true;
    current = idx;
    setPos(current, true);
    updateDots();
    clearTimeout(jumpTimer);
    jumpTimer = setTimeout(afterTransition, 500);
  }

  track.addEventListener('transitionend', (e) => {
    if (e.target !== track || e.propertyName !== 'transform') return;
    clearTimeout(jumpTimer);
    afterTransition();
  });

  function startAuto() { timer = setInterval(() => goTo(current + 1), 4000); }
  function stopAuto()  { clearInterval(timer); }

  let touchStartX = 0;
  function handleTouchStart(e) { touchStartX = e.touches[0].clientX; }
  function handleTouchEnd(e) {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { stopAuto(); goTo(diff > 0 ? current + 1 : current - 1); startAuto(); }
  }

  dots.forEach(dot => dot.addEventListener('click', () => {
    if (!active) return;
    stopAuto(); goTo(+dot.dataset.index + 1); startAuto();
  }));

  function activate() {
    if (active) return;
    active = true;
    track.insertBefore(origCards[total - 1].cloneNode(true), origCards[0]);
    track.appendChild(origCards[0].cloneNode(true));
    current = 1;
    syncCardWidths();
    setPos(current, false);
    updateDots();
    window.addEventListener('resize', syncAndRepos);
    track.addEventListener('mouseenter', stopAuto);
    track.addEventListener('mouseleave', startAuto);
    reviewsCarousel.addEventListener('touchstart', handleTouchStart, { passive: true });
    reviewsCarousel.addEventListener('touchend',   handleTouchEnd,   { passive: true });
    startAuto();
  }

  function syncAndRepos() {
    syncCardWidths();
    setPos(current, false);
  }

  function deactivate() {
    if (!active) return;
    active = false;
    busy   = false;
    stopAuto();
    window.removeEventListener('resize', syncAndRepos);
    track.removeChild(track.children[0]);
    track.removeChild(track.children[track.children.length - 1]);
    Array.from(track.children).forEach(c => { c.style.width = ''; c.style.flexShrink = ''; });
    track.style.transform  = '';
    track.style.transition = '';
    current = 1;
    track.removeEventListener('mouseenter', stopAuto);
    track.removeEventListener('mouseleave', startAuto);
    reviewsCarousel.removeEventListener('touchstart', handleTouchStart);
    reviewsCarousel.removeEventListener('touchend',   handleTouchEnd);
    dots.forEach((d, i) => d.classList.toggle('active', i === 0));
  }

  mq.addEventListener('change', e => e.matches ? activate() : deactivate());
  if (mq.matches) activate();
}
