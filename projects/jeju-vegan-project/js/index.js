document.querySelectorAll('.like-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const icon = btn.querySelector('.like-icon');
    btn.classList.toggle('is-active');

    // 빈 하트 ↔ 채운 하트 토글
    if (btn.classList.contains('is-active')) {
      icon.dataset.icon = 'mdi:heart';
    } else {
      icon.dataset.icon = 'mdi:heart-outline';
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {

      // 메인 히어로 슬라이더
      (function initHeroSlider() {
        var hero = document.querySelector('.home-hero');
        if (!hero) return;

        var slides = hero.querySelectorAll('.home-hero-slide');
        var heroSearch = hero.querySelector('.home-hero-inner--search');
        var heroMain = hero.querySelector('.home-hero-inner--main');
        var heroFresh = hero.querySelector('.home-hero-inner--fresh');
        var currentEl = hero.querySelector('.home-hero-current');
        var totalEl = hero.querySelector('.home-hero-total');
        var prevBtn = hero.querySelector('.home-hero-prev');
        var nextBtn = hero.querySelector('.home-hero-next');
        var total = slides.length;
        var current = 0;
        var timer = null;
        var INTERVAL = 3000;

        if (!total) return;

        function pad(num) {
          return String(num).padStart(2, '0');
        }

        function updateCounter() {
          if (currentEl) currentEl.textContent = pad(current + 1);
          if (totalEl) totalEl.textContent = pad(total);
        }

        function updateContent() {
          if (heroSearch) heroSearch.classList.toggle('is-visible', current === 0);
          if (heroMain) heroMain.classList.toggle('is-visible', current === 1);
          if (heroFresh) heroFresh.classList.toggle('is-visible', current === 2);
        }

        function goTo(index) {
          slides[current].classList.remove('is-active');
          current = (index + total) % total;
          slides[current].classList.add('is-active');
          updateCounter();
          updateContent();
        }

        function next() {
          goTo(current + 1);
        }

        function prev() {
          goTo(current - 1);
        }

        function startAutoplay() {
          stopAutoplay();
          timer = window.setInterval(next, INTERVAL);
        }

        function stopAutoplay() {
          if (timer) {
            window.clearInterval(timer);
            timer = null;
          }
        }

        if (prevBtn) {
          prevBtn.addEventListener('click', function () {
            prev();
            startAutoplay();
          });
        }

        if (nextBtn) {
          nextBtn.addEventListener('click', function () {
            next();
            startAutoplay();
          });
        }

        hero.addEventListener('mouseenter', stopAutoplay);
        hero.addEventListener('mouseleave', startAutoplay);
        hero.addEventListener('focusin', stopAutoplay);
        hero.addEventListener('focusout', function (e) {
          if (!hero.contains(e.relatedTarget)) startAutoplay();
        });

        updateCounter();
        updateContent();
        startAutoplay();
      })();

      // FAQ 아코디언
      document.querySelectorAll('.js-faq-question').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var item = this.closest('.faq-item');
          var isActive = item.classList.contains('active');

          item.closest('.faq-list').querySelectorAll('.faq-item').forEach(function (el) {
            el.classList.remove('active');
            el.querySelector('.js-faq-question').setAttribute('aria-expanded', 'false');
          });

          if (!isActive) {
            item.classList.add('active');
            this.setAttribute('aria-expanded', 'true');
          }
        });
      });

      // 카테고리 탭 필터
      document.querySelectorAll('.js-tab-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          document.querySelectorAll('.js-tab-btn').forEach(function (b) {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
          });
          this.classList.add('active');
          this.setAttribute('aria-selected', 'true');

          var tabPanel = document.getElementById('faq-tabpanel');
          if (tabPanel) tabPanel.setAttribute('aria-labelledby', this.id);

          var tab = this.dataset.tab;
          document.querySelectorAll('.faq-group').forEach(function (group) {
            group.style.display = (tab === 'all' || group.dataset.panel === tab) ? '' : 'none';
          });
        });
      });

      // 검색
      var searchForm = document.querySelector('.faq-search-form');
      var searchInput = document.querySelector('.faq-search-input');

      function runSearch() {
        var query = searchInput.value.trim().toLowerCase();

        if (!query) {
          document.querySelectorAll('.faq-item').forEach(function (item) { item.style.display = ''; });
          document.querySelectorAll('.faq-group').forEach(function (group) { group.style.display = ''; });
          return;
        }

        document.querySelectorAll('.faq-group').forEach(function (group) {
          var hasVisible = false;
          group.querySelectorAll('.faq-item').forEach(function (item) {
            var match = item.textContent.toLowerCase().includes(query);
            item.style.display = match ? '' : 'none';
            if (match) hasVisible = true;
          });
          group.style.display = hasVisible ? '' : 'none';
        });
      }

      if (searchForm) searchForm.addEventListener('submit', function (e) { e.preventDefault(); runSearch(); });
      if (searchInput) searchInput.addEventListener('input', runSearch);
      
      // 메인페이지 카운트업 애니메이션
      var countupItems = document.querySelectorAll('.home-map-stats strong[data-count]');
      if (countupItems.length) {
        function animateCount(item) {
          if (item.dataset.countStarted === 'true') return;
          item.dataset.countStarted = 'true';

          var target = parseInt(item.dataset.count, 10) || 0;
          var suffix = item.dataset.suffix || '';
          var duration = 2000;
          var startTime = null;

          function updateCount(timestamp) {
            if (!startTime) startTime = timestamp;
            var elapsed = timestamp - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var current = Math.floor(progress * target);
            item.textContent = current + suffix;

            if (progress < 1) {
              window.requestAnimationFrame(updateCount);
            } else {
              item.textContent = target + suffix;
            }
          }

          window.requestAnimationFrame(updateCount);
        }

        var observer = new IntersectionObserver(function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.3 });

        countupItems.forEach(function (item) {
          observer.observe(item);
        });
      }
    });

function setSubmitTabFromHash() {
  const hash = window.location.hash.slice(1);
  if (hash === 'tab-store' || hash === 'tab-report') {
    const tab = document.getElementById(hash);
    if (tab) tab.checked = true;
  }
}

var goTopBtn = document.getElementById('goTopBtn');
if (goTopBtn) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      goTopBtn.classList.add('is-visible');
    } else {
      goTopBtn.classList.remove('is-visible');
    }
  });

  goTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

window.addEventListener('DOMContentLoaded', setSubmitTabFromHash);
window.addEventListener('hashchange', setSubmitTabFromHash);

// 메인 페이지 투명 헤더: includeHTML 로딩 완료 후 초기화
document.addEventListener('includeHTMLLoaded', function () {
  if (!document.querySelector('.page-index')) return;

  var header = document.querySelector('.site-header');
  if (!header) return;

  var logoImg = header.querySelector('.logo img');
  var defaultLogo = 'image/jeju-vegan-logo-default.svg';
  var greenLogo = 'image/jeju-vegan-logo-green.svg';

  function updateHeader() {
    if (window.scrollY < 10) {
      header.classList.add('is-transparent');
      if (logoImg) logoImg.src = greenLogo;
    } else {
      header.classList.remove('is-transparent');
      if (logoImg) logoImg.src = defaultLogo;
    }
  }

  header.addEventListener('mouseenter', function () {
    if (header.classList.contains('is-transparent') && logoImg) {
      logoImg.src = defaultLogo;
    }
  });

  header.addEventListener('mouseleave', function () {
    if (header.classList.contains('is-transparent') && logoImg) {
      logoImg.src = greenLogo;
    }
  });

  window.addEventListener('scroll', updateHeader);
  updateHeader();
});

document.addEventListener("click", (e) => {
  const mobileMenu = document.querySelector(".mobile-menu");

  // 햄버거 버튼 토글
  const menuBtn = e.target.closest(".menu-btn");
  if (menuBtn) {
    e.preventDefault();
    const isActive = menuBtn.classList.toggle("active");
    mobileMenu?.classList.toggle("active", isActive);
    document.body.classList.toggle("menu-open", isActive);
    return;
  }

  // X 닫기 버튼
  if (e.target.closest(".mobile-menu-close")) {
    document.querySelector(".menu-btn")?.classList.remove("active");
    mobileMenu?.classList.remove("active");
    document.body.classList.remove("menu-open");
    return;
  }

  // 메뉴 외부(오버레이) 클릭 시 닫기
  if (document.body.classList.contains("menu-open") && !e.target.closest(".mobile-menu")) {
    document.querySelector(".menu-btn")?.classList.remove("active");
    mobileMenu?.classList.remove("active");
    document.body.classList.remove("menu-open");
    return;
  }

  // 아코디언 메인메뉴 토글
  const span = e.target.closest(".mobile-depth1 > li > span");
  if (span) {
    const subMenu = span.nextElementSibling;
    document.querySelectorAll(".mobile-depth2").forEach(item => {
      if (item !== subMenu) item.classList.remove("active");
    });
    subMenu?.classList.toggle("active");
  }

  // pick 탭 버튼 active 토글
  const tabBtn = e.target.closest(".tab-list .tab-btn");
  if (tabBtn && !tabBtn.dataset.filterType) {
    const tabList = tabBtn.closest(".tab-list");
    tabList.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
    tabBtn.classList.add("active");
  }
});

//pick, course 카드 더보기 버튼
document.querySelectorAll('.card-more-btn').forEach(function (btn) {
  var list = btn.closest('.card-more-wrap').previousElementSibling;
  while (list && list.tagName !== 'UL') {
    list = list.previousElementSibling;
  }
  if (!list) return;
  var extraCards = list.querySelectorAll('.card-extra');
  var icon = btn.querySelector('.card-more-icon');
  var label = btn.querySelector('.card-more-label');

  btn.addEventListener('click', function () {
    var isOpen = btn.classList.contains('is-open');

    if (!isOpen) {
      extraCards.forEach(function (card, i) {
        card.classList.remove('card-hidden');
        setTimeout(function () {
          card.classList.add('is-visible');
        }, i * 80 + 30);
      });
      btn.classList.add('is-open');
      if (label) label.textContent = '접기';
      if (icon) icon.style.transform = 'rotate(180deg)';
    } else {
      extraCards.forEach(function (card) {
        card.classList.remove('is-visible');
        card.classList.add('card-hidden');
      });
      btn.classList.remove('is-open');
      if (label) label.textContent = '더보기';
      if (icon) icon.style.transform = '';
    }
  });
});

// course 탭 필터
(function initCourseTabFilter() {
  if (!document.querySelector('.page-course')) return;

  var cards = Array.from(document.querySelectorAll('.course-card-list .course-card'));
  var moreWrap = document.querySelector('.card-more-wrap');
  var moreBtn = document.querySelector('.card-more-btn');
  var tabList = document.querySelector('.page-course .tab-list');
  var noResult = document.querySelector('.course-no-result');

  if (!tabList || !cards.length) return;

  var activeFilters = { location: '전체', duration: null, theme: null };

  function isFiltered() {
    return activeFilters.location !== '전체' || activeFilters.duration || activeFilters.theme;
  }

  function applyFilter() {
    var filtered = isFiltered();
    var visibleCount = 0;

    cards.forEach(function (card) {
      var locMatch = activeFilters.location === '전체' || card.dataset.location === activeFilters.location;
      var durMatch = !activeFilters.duration || card.dataset.duration === activeFilters.duration;
      var themeMatch = !activeFilters.theme || card.dataset.theme === activeFilters.theme;
      var show = locMatch && durMatch && themeMatch;

      if (filtered) {
        // 필터 적용 중: 모든 카드를 대상으로 표시/숨김
        card.classList.remove('card-hidden');
        card.style.display = show ? '' : 'none';
        if (show) visibleCount++;
      } else {
        // 필터 초기화: 원래 상태로 복원
        card.style.display = '';
        if (card.classList.contains('card-extra')) {
          if (moreBtn && moreBtn.classList.contains('is-open')) {
            card.classList.remove('card-hidden');
          } else {
            card.classList.add('card-hidden');
          }
        }
        visibleCount++;
      }
    });

    // 더보기 버튼: 필터 중에는 숨김
    if (moreWrap) moreWrap.style.display = filtered ? 'none' : '';

    // 결과 없음 메시지
    if (noResult) noResult.style.display = (filtered && visibleCount === 0) ? '' : 'none';
  }

  tabList.addEventListener('click', function (e) {
    var btn = e.target.closest('.tab-btn[data-filter-type]');
    if (!btn) return;

    var filterType = btn.dataset.filterType;
    var filterValue = btn.dataset.filterValue;

    if (filterType === 'location') {
      // 지역: 라디오 방식
      tabList.querySelectorAll('[data-filter-type="location"]').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
      activeFilters.location = filterValue;
      // 전체 클릭 시 소요시간·테마 초기화
      if (filterValue === '전체') {
        tabList.querySelectorAll('[data-filter-type="duration"], [data-filter-type="theme"]').forEach(function (b) {
          b.classList.remove('active');
        });
        activeFilters.duration = null;
        activeFilters.theme = null;
      }
    } else if (filterType === 'duration') {
      // 소요시간: 토글 방식
      if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        activeFilters.duration = null;
      } else {
        tabList.querySelectorAll('[data-filter-type="duration"]').forEach(function (b) {
          b.classList.remove('active');
        });
        btn.classList.add('active');
        activeFilters.duration = filterValue;
      }
    } else if (filterType === 'theme') {
      // 테마: 토글 방식
      if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        activeFilters.theme = null;
      } else {
        tabList.querySelectorAll('[data-filter-type="theme"]').forEach(function (b) {
          b.classList.remove('active');
        });
        btn.classList.add('active');
        activeFilters.theme = filterValue;
      }
    }

    applyFilter();
  });
})();


// map__________________________________________________________
// map-filter-tab 여닫기 클릭
document.addEventListener('DOMContentLoaded', () => {
  const filterTab = document.querySelector('.map-filter-tab');
  const filterInner = document.querySelector('.map-filter-inner');
  const mapFilter = document.querySelector('.map-filter');
  if (!filterTab || !filterInner || !mapFilter) return;
  const tabArrow = filterTab.querySelector('img');

  // 1200px 이하(태블릿 포함)는 슬라이드 방식 적용
  const isTabletOrMobile = () => window.innerWidth <= 1200;

  // 기본 상태: 1200px 이하는 닫힘, 데스크탑은 열림
  let isOpen = !isTabletOrMobile();

  function applyFilterState(open) {
    if (isTabletOrMobile()) {
      // 태블릿·모바일(≤1200px): .active 클래스 슬라이드 방식
      mapFilter.classList.toggle('active', open);
      mapFilter.classList.remove('closed');
      filterInner.classList.toggle('hidden', !open);
    } else {
      // 데스크탑(>1200px): .closed / .hidden 방식
      mapFilter.classList.toggle('closed', !open);
      mapFilter.classList.remove('active');
      filterInner.classList.toggle('hidden', !open);
    }
    if (tabArrow) tabArrow.style.transform = open ? 'rotate(0deg)' : 'rotate(180deg)';
  }

  applyFilterState(isOpen);

  // 클릭 시 토글: 1회=열림, 2회=닫힘
  filterTab.addEventListener('click', (e) => {
    e.preventDefault();
    isOpen = !isOpen;
    applyFilterState(isOpen);
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      isOpen = !isTabletOrMobile();
      applyFilterState(isOpen);
    }, 150);
  });
});
  // map-pin hover
const mapPinItems = document.querySelectorAll('.map-pin');

mapPinItems.forEach(pinItem => {
  const anchor = pinItem.querySelector('a');
  const greenImg = anchor.querySelector('img');

  const orangeImg = document.createElement('img');
  orangeImg.setAttribute('src', greenImg.getAttribute('src').replace('mappin-green', 'mappin-orange'));
  orangeImg.setAttribute('alt', 'mappin-orange');
  orangeImg.style.position = 'absolute';
  orangeImg.style.top = '0';
  orangeImg.style.left = '0';
  orangeImg.style.opacity = '0';
  orangeImg.style.transition = 'opacity 0.3s ease';

  greenImg.style.transition = 'opacity 0.3s ease';
  greenImg.style.display = 'block';

  anchor.style.display = 'block';
  anchor.style.position = 'relative';
  anchor.appendChild(orangeImg);

  pinItem.addEventListener('mouseenter', () => {
    greenImg.style.opacity = '0';
    orangeImg.style.opacity = '1';
  });

  pinItem.addEventListener('mouseleave', () => {
    greenImg.style.opacity = '1';
    orangeImg.style.opacity = '0';
  });
});
// map-in-card 모바일 위치 자동 조정 (지도 영역 밖으로 나가지 않게)
(function initMobileInCardPosition() {
  const mapContent = document.querySelector('.page-map .map-main-content');
  if (!mapContent) return;

  const pins = mapContent.querySelectorAll('.map-pin');
  if (!pins.length) return;

  function adjust() {
    const isMobile = window.innerWidth <= 480;
    const mapH = mapContent.offsetHeight;
    const mapW = mapContent.offsetWidth;
    const remPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const cardW = 16 * remPx;  // CSS: width: 16rem
    const cardH = 8 * remPx;   // 이미지 없는 카드 대략 높이
    // filter-tab 닫힌 상태: left 2rem + width 2.5rem → 4.5rem 이후부터 안전
    const tabSafeLeft = 4.5 * remPx;

    pins.forEach(pin => {
      const card = pin.querySelector('.map-in-card');
      if (!card) return;

      if (!isMobile) {
        card.style.top = '';
        card.style.bottom = '';
        card.style.transform = '';
        return;
      }

      const pinCenterX = pin.offsetLeft + pin.offsetWidth / 2;
      const pinBottom  = pin.offsetTop + pin.offsetHeight;

      // ── 세로: 하단 넘침 → 핀 위로
      if (pinBottom + cardH + 8 > mapH) {
        card.style.top = 'auto';
        card.style.bottom = 'calc(100% + 8px)';
      } else {
        card.style.top = '';
        card.style.bottom = '';
      }

      // ── 가로 계산
      // translateX(-50%) 기준: cardLeft = pinCenterX - cardW/2
      const cardLeftDefault  = pinCenterX - cardW / 2;
      const cardRightDefault = pinCenterX + cardW / 2;

      if (cardRightDefault > mapW) {
        // 오른쪽 넘침: 카드를 왼쪽 방향으로 (translateX(-100%) → 카드 오른쪽 끝 = 핀 중심)
        const idealLeft = pinCenterX - cardW;
        if (idealLeft < tabSafeLeft) {
          // 왼쪽 끝도 filter-tab에 걸릴 경우 최소한 tabSafeLeft 까지만 밀기
          card.style.transform = `translateX(calc(-100% + ${tabSafeLeft - idealLeft}px))`;
        } else {
          card.style.transform = 'translateX(-100%)';
        }
      } else if (cardLeftDefault < tabSafeLeft) {
        // 왼쪽 filter-tab 영역 침범 → 오른쪽으로 밀기
        card.style.transform = `translateX(calc(-50% + ${tabSafeLeft - cardLeftDefault}px))`;
      } else {
        card.style.transform = '';
      }
    });
  }

  adjust();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(adjust, 150);
  });
})();
