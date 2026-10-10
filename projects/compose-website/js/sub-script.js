document.addEventListener('DOMContentLoaded', () => {
  const strengthEl = document.querySelector('.strength');
  if (!strengthEl) return;

  const dts = strengthEl.querySelectorAll('dl dt');
  const dds = strengthEl.querySelectorAll('dl dd');
  const imageEl = strengthEl.querySelector('.image img');
  const textEl = strengthEl.querySelector('.text p');

  const closeAll = () => dds.forEach((dd) => (dd.style.display = 'none'));

  dts.forEach((dt) => {
    dt.addEventListener('click', () => {
      dts.forEach((x) => x.classList.remove('selected'));
      dt.classList.add('selected');
      closeAll();

      const dd = dt.nextElementSibling;
      if (dd && dd.tagName === 'DD') dd.style.display = 'block';

      const src = dt.dataset.background;
      if (src && imageEl) {
        imageEl.style.opacity = '0';
        setTimeout(() => {
          imageEl.src = src;
          imageEl.style.opacity = '1';
        }, 200);
      }

      const t = dt.dataset.text;
      if (textEl) textEl.textContent = t || '';
    });
  });

  const firstDt = dts[0];
  if (firstDt && imageEl) {
    imageEl.src = firstDt.dataset.background;
    if (textEl) textEl.textContent = firstDt.dataset.text || '';

    const firstDd = firstDt.nextElementSibling;
    if (firstDd && firstDd.tagName === 'DD') firstDd.style.display = 'block';
  }
});

const faqButtons = document.querySelectorAll('.faq-title');
if (faqButtons.length) {
  faqButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const faqItem = btn.closest('.faq');
      const isActive = faqItem.classList.contains('active');

      faqButtons.forEach((item) => {
        item.closest('.faq').classList.remove('active');
      });

      if (!isActive) {
        faqItem.classList.add('active');
      }
    });
  });
}

const tabs = document.querySelectorAll('.btn li');
const tabContents = document.querySelectorAll('.tabContents > div');
if (tabs.length && tabContents.length) {
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tabContents.forEach((c) => c.classList.remove('active'));

      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.alt);
      if (target) target.classList.add('active');
    });
  });
}

const barFills = document.querySelectorAll('.bar-fill');
if (barFills.length) {
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.style.getPropertyValue('--w');
      } else {
        entry.target.style.width = '0%';
      }
    });
  }, { threshold: 0.3 });

  barFills.forEach((bar) => barObserver.observe(bar));
}

const storeSlider = document.querySelector('.store-slider');
if (storeSlider) {
  const track = storeSlider.querySelector('.slider-track');
  const slides = storeSlider.querySelectorAll('.slide');
  const prevBtn = storeSlider.querySelector('.slider-btn.prev');
  const nextBtn = storeSlider.querySelector('.slider-btn.next');
  const viewport = storeSlider.querySelector('.slider-viewport');
  const gap = 24;
  let current = 0;

  function setSlideWidths() {
    const viewportWidth = viewport.clientWidth;
    slides.forEach((slide) => {
      slide.style.width = `${viewportWidth}px`;
      slide.style.flexBasis = `${viewportWidth}px`;
    });
  }

  function moveTo(index) {
    const max = slides.length - 1;
    current = Math.max(0, Math.min(index, max));

    const slideWidth = viewport.clientWidth;
    const offset = current * (slideWidth + gap);
    track.style.transform = `translateX(${-offset}px)`;
  }

  setSlideWidths();
  moveTo(0);
  window.addEventListener('resize', () => {
    setSlideWidths();
    moveTo(current);
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => moveTo(current - 1));
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => moveTo(current + 1));
  }

  let autoplay = setInterval(() => {
    moveTo(current >= slides.length - 1 ? 0 : current + 1);
  }, 3000);

  [prevBtn, nextBtn].forEach((btn) => {
    if (!btn) return;
    btn.addEventListener('click', () => {
      clearInterval(autoplay);
      autoplay = setInterval(() => {
        moveTo(current >= slides.length - 1 ? 0 : current + 1);
      }, 3000);
    });
  });
}

function initMenu() {
  const tabBtns = document.querySelectorAll('.menu-main-tab button');
  const tabContents = document.querySelectorAll('.menu-content');
  const filterChip = document.querySelector('.menu-filter-chip');
  const bestGrid = document.querySelector('#best > .menu-grid');

  if (!tabBtns.length) return;

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach((b) => b.classList.remove('active'));
      tabContents.forEach((c) => c.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');

      if (filterChip) {
        filterChip.style.display = btn.dataset.tab === 'best' ? 'flex' : 'none';
      }
      if (bestGrid) bestGrid.style.display = '';
    });
  });

  const catBtns = document.querySelectorAll('.menu-filter-chip button');
  const categories = document.querySelectorAll('.menu-category');

  catBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      catBtns.forEach((b) => b.classList.remove('active'));
      categories.forEach((c) => c.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(btn.dataset.cat).classList.add('active');

      if (bestGrid) bestGrid.style.display = 'none';
    });
  });

  categories.forEach((c, i) => {
    c.classList.toggle('active', i === 0);
  });
}
