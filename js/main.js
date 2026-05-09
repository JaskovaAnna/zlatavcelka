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
    prefill: 'Dobrý den, mám zájem o med. Prosím o více informací o aktuální nabídce druhů a cenách.',
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
    prefill: 'Dobrý den, mám zájem o svíčky z včelího vosku. Prosím o více informací ohledně aktuální nabídky tvarů a velikostí.',
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
    prefill: 'Dobrý den, mám zájem o propolis. Prosím o více informací o dostupných formách (tinktura / pevný blok) a cenách.',
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
    prefill: 'Dobrý den, rád/a bych si objednal/a dárkový balíček. Prosím o více informací – možnosti složení a ceny.',
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

    if (data.prefill) {
      const cta = document.createElement('div');
      cta.className = 'modal-cta';
      cta.innerHTML = `<button class="modal-cta-btn" data-prefill="${data.prefill}">Poptat produkt</button>`;
      modalContent.appendChild(cta);
    }

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

  modalContent.addEventListener('click', e => {
    const btn  = e.target.closest('.modal-cta-btn');
    const link = e.target.closest('.modal-link');
    if (!btn && !link) return;
    e.preventDefault();
    const prefill = btn ? btn.dataset.prefill : null;
    closeModal();
    setTimeout(() => {
      if (prefill) {
        const field = document.getElementById('message');
        if (field) field.value = prefill;
      }
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }, 350);
  });
}

// ===========================
// REVIEWS CAROUSEL
// ===========================
const reviewsCarousel = document.getElementById('reviewsCarousel');
if (reviewsCarousel) {
  const track     = document.getElementById('reviewsTrack');
  const btnPrev   = document.getElementById('reviewsPrev');
  const btnNext   = document.getElementById('reviewsNext');
  const origCards = Array.from(track.querySelectorAll('.review-card'));
  const total     = origCards.length;
  const mq        = window.matchMedia('(max-width: 899px)');

  let current    = 1;
  let active     = false;
  let busy       = false;
  let cloneFirst, cloneLast;
  let jumpTimer;

  function cardWidth() { return reviewsCarousel.offsetWidth; }

  function setPos(idx, animate) {
    if (animate) {
      track.style.transition = 'transform 0.4s ease';
      track.style.transform  = `translateX(${-idx * cardWidth()}px)`;
    } else {
      track.style.transition = 'none';
      void track.offsetHeight; // force reflow – ensures transition:none is applied before transform changes
      track.style.transform  = `translateX(${-idx * cardWidth()}px)`;
    }
  }

  function syncWidths() {
    const w = cardWidth() + 'px';
    Array.from(track.children).forEach(c => { c.style.width = w; c.style.flexShrink = '0'; });
  }

  function afterTransition() {
    busy = false;
    if (current === 0)              { setPos(total, false); current = total; }
    else if (current === total + 1) { setPos(1,     false); current = 1;     }
  }

  function goTo(idx) {
    if (busy) return;
    busy = true;
    current = idx;
    setPos(current, true);
    clearTimeout(jumpTimer);
    jumpTimer = setTimeout(afterTransition, 450);
  }

  track.addEventListener('transitionend', e => {
    if (e.target !== track || e.propertyName !== 'transform') return;
    clearTimeout(jumpTimer);
    afterTransition();
  });

  let touchStartX = 0, touchStartY = 0, touchIsH = false;

  function onTouchStart(e) {
    if (busy) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchIsH = false;
    track.style.transition = 'none';
  }
  function onTouchMove(e) {
    if (busy) return;
    const dx = e.touches[0].clientX - touchStartX;
    const dy = e.touches[0].clientY - touchStartY;
    if (!touchIsH && Math.abs(dx) < 5 && Math.abs(dy) < 5) return;
    if (!touchIsH) {
      if (Math.abs(dx) > Math.abs(dy)) touchIsH = true;
      else { track.style.transition = 'transform 0.4s ease'; return; }
    }
    e.preventDefault();
    track.style.transform = `translateX(${-current * cardWidth() + dx}px)`;
  }
  function onTouchEnd(e) {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (touchIsH && Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
    else setPos(current, true);
  }

  function onResize() { syncWidths(); setPos(current, false); }
  function onPrev()   { goTo(current - 1); }
  function onNext()   { goTo(current + 1); }

  function activate() {
    if (active) return;
    active = true;

    // Strip reveal animation from originals so clones inherit a clean, visible state
    origCards.forEach(c => {
      c.style.transition = 'none';
      c.classList.remove('reveal');
      c.classList.add('revealed');
    });

    cloneLast  = origCards[total - 1].cloneNode(true);
    cloneFirst = origCards[0].cloneNode(true);
    cloneLast.setAttribute('aria-hidden', 'true');
    cloneFirst.setAttribute('aria-hidden', 'true');
    track.insertBefore(cloneLast, origCards[0]);
    track.appendChild(cloneFirst);

    current = 1;
    syncWidths();
    setPos(current, false);

    btnPrev.addEventListener('click', onPrev);
    btnNext.addEventListener('click', onNext);
    reviewsCarousel.addEventListener('touchstart', onTouchStart, { passive: true });
    reviewsCarousel.addEventListener('touchmove',  onTouchMove,  { passive: false });
    reviewsCarousel.addEventListener('touchend',   onTouchEnd,   { passive: true });
    window.addEventListener('resize', onResize);
  }

  function deactivate() {
    if (!active) return;
    active = false;
    busy = false;
    clearTimeout(jumpTimer);
    if (cloneLast  && cloneLast.parentNode)  track.removeChild(cloneLast);
    if (cloneFirst && cloneFirst.parentNode) track.removeChild(cloneFirst);
    cloneLast = null; cloneFirst = null;
    Array.from(track.children).forEach(c => { c.style.width = ''; c.style.flexShrink = ''; });
    track.style.transform  = '';
    track.style.transition = '';
    current = 1;
    btnPrev.removeEventListener('click', onPrev);
    btnNext.removeEventListener('click', onNext);
    reviewsCarousel.removeEventListener('touchstart', onTouchStart);
    reviewsCarousel.removeEventListener('touchmove',  onTouchMove);
    reviewsCarousel.removeEventListener('touchend',   onTouchEnd);
    window.removeEventListener('resize', onResize);
  }

  mq.addEventListener('change', e => e.matches ? activate() : deactivate());
  if (mq.matches) activate();
}
