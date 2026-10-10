function header() {
  const headerEl = document.querySelector('header');
  if (!headerEl) return;

  const mainMenuList = document.querySelectorAll('.main');
  const headerHeight = headerEl.offsetHeight;

  mainMenuList.forEach((sub) => {
    sub.addEventListener('mouseenter', function () {
      const subMenuHeight = this.querySelector('.submenu').offsetHeight;
      headerEl.style.height = `${headerHeight + subMenuHeight}px`;
    });
    sub.addEventListener('mouseleave', function () {
      headerEl.style.height = `${headerHeight}px`;
    });
  });
}

function initAll() {
  header();
  countUp();

  const processList = document.querySelector('.process-list');
  const processIcons = document.querySelectorAll('.process-item i');

  if (processList) {
    processList.addEventListener('mouseenter', () => {
      processIcons.forEach((icon, i) => {
        setTimeout(() => {
          icon.classList.add('active');
        }, i * 150);
      });
    });

    processList.addEventListener('mouseleave', () => {
      processIcons.forEach((icon) => {
        icon.classList.remove('active');
      });
    });
  }
}

const heroSwiperEl = document.querySelector('.mySwiper');
if (heroSwiperEl) {
  const swiper = new Swiper('.mySwiper', {
    spaceBetween: 30,
    effect: 'fade',
    allowTouchMove: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  heroSwiperEl.addEventListener('mouseenter', () => swiper.autoplay.stop());
  heroSwiperEl.addEventListener('mouseleave', () => swiper.autoplay.start());
}

if (document.querySelector('.storySwiper')) {
  new Swiper('.storySwiper', {
    navigation: {
      nextEl: '.story-swiper-button-next',
      prevEl: '.story-swiper-button-prev',
    },
    pagination: {
      el: '.story-swiper-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
    },
  });
}

function countUp() {
  const statNums = document.querySelectorAll('.stat-num');
  if (!statNums.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = +entry.target.dataset.target;
        const suffix = entry.target.dataset.suffix;
        let count = 0;
        const duration = 1200;
        const step = target / (duration / 16);

        const timer = setInterval(() => {
          count += step;
          if (count >= target) {
            count = target;
            clearInterval(timer);
          }
          entry.target.textContent = Math.floor(count).toLocaleString() + suffix;
        }, 16);

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach((el) => observer.observe(el));
}
