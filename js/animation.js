const INTRO_STEPS = [
  { word: "DESIGNER", imageIndex: 0 },
  { word: "PUBLISHER", imageIndex: 1 },
  { word: "UI·UX", imageIndex: 2 },
  { word: "KIM INSEO", imageIndex: 3 },
];

const STAIR_HEIGHTS = ["21.2vh", "32.2vh", "43.6vh", "60.5vh", "80.6vh", "100vh"];

const STEP_HOLD = 1.1;
const DIAL_DURATION = 0.65;

function initMainScrollBounce() {
  const scroll = document.querySelector(".main-scroll");
  if (!scroll) return;

  gsap.to(scroll, {
    y: 12,
    duration: 0.8,
    ease: "power1.inOut",
    yoyo: true,
    repeat: -1,
  });
}

function initIntroAnimation() {
  const intro = document.getElementById("intro");
  const main = document.getElementById("main");
  const track = intro.querySelector(".intro-word-track");
  const wordSlot = intro.querySelector(".intro-word-slot");
  const items = intro.querySelectorAll(".intro-word-item");
  const images = intro.querySelectorAll(".intro-bg-img");
  const stairBars = intro.querySelectorAll(".intro-stair");

  if (!intro || !main || !track || items.length === 0 || images.length === 0) return;

  const slotHeight = items[0].offsetHeight;

  document.body.style.overflow = "hidden";
  gsap.set(stairBars, { height: 0, y: 0 });

  gsap.set(track, { y: 0 });
  gsap.set(images, { opacity: 0 });
  gsap.set(images[0], { opacity: 0.2 });

  const tl = gsap.timeline({
    onComplete: () => {
      intro.remove();
      document.body.style.overflow = "";
      initMainScrollBounce();
      document.dispatchEvent(new CustomEvent("intro:complete"));
    },
  });

  INTRO_STEPS.forEach((step, index) => {
    if (index > 0) {
      tl.to(
        track,
        {
          y: -slotHeight * index,
          duration: DIAL_DURATION,
          ease: "power3.inOut",
        },
        `step-${index}`
      );

      tl.to(
        images[index - 1],
        {
          opacity: 0,
          duration: DIAL_DURATION,
          ease: "power2.inOut",
        },
        `step-${index}`
      );

      tl.to(
        images[step.imageIndex],
        {
          opacity: 0.2,
          duration: DIAL_DURATION,
          ease: "power2.inOut",
        },
        `step-${index}`
      );
    }

    tl.to({}, { duration: STEP_HOLD });
  });

  tl.to([wordSlot, ...images], {
    opacity: 0,
    duration: 0.35,
    ease: "power2.inOut",
  });

  tl.to(stairBars, {
    height: (index) => STAIR_HEIGHTS[index],
    duration: 0.55,
    stagger: 0.07,
    ease: "power3.inOut",
  });

  tl.to(stairBars, {
    height: "100vh",
    duration: 0.35,
    ease: "power2.inOut",
  });

  tl.set(main, { visibility: "visible" }, "-=0.15");

  tl.to(stairBars, {
    y: "-100%",
    duration: 0.65,
    stagger: 0.06,
    ease: "power4.inOut",
  });

  tl.to(
    intro,
    {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
    },
    "-=0.45"
  );
}

const CATEGORY_PREVIEW_LERP = 0.12;
const CATEGORY_PREVIEW_OFFSET_X = 20;
const CATEGORY_PREVIEW_OFFSET_Y = -80;

function initCategoryHoverFx() {
  const section = document.querySelector(".category-section");
  if (!section || typeof gsap === "undefined") return;

  const preview = section.querySelector(".hover-preview");
  const previewImg = preview.querySelector(".hover-preview-img");
  const cursor = section.querySelector(".custom-cursor");
  if (!preview || !previewImg || !cursor) return;

  gsap.set(preview, { scale: 0.85 });

  let mouseX = 0;
  let mouseY = 0;
  let previewX = 0;
  let previewY = 0;

  const setPreviewX = gsap.quickSetter(preview, "x", "px");
  const setPreviewY = gsap.quickSetter(preview, "y", "px");
  const setCursorX = gsap.quickSetter(cursor, "x", "px");
  const setCursorY = gsap.quickSetter(cursor, "y", "px");

  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  function tick() {
    previewX += (mouseX + CATEGORY_PREVIEW_OFFSET_X - previewX) * CATEGORY_PREVIEW_LERP;
    previewY += (mouseY + CATEGORY_PREVIEW_OFFSET_Y - previewY) * CATEGORY_PREVIEW_LERP;
    setPreviewX(previewX);
    setPreviewY(previewY);
    setCursorX(mouseX);
    setCursorY(mouseY);
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  section.querySelectorAll(".category-row").forEach((row) => {
    const name = row.querySelector(".category-row-name");

    row.addEventListener("mouseenter", () => {
      const thumb = row.dataset.thumb;
      const tilt = Number(row.dataset.tilt || 0);
      if (thumb) previewImg.src = thumb;

      gsap.to(preview, { opacity: 1, scale: 1, rotate: tilt, duration: 0.3, ease: "power2.out", overwrite: "auto" });
      gsap.to(cursor, { opacity: 1, duration: 0.2, overwrite: "auto" });
      if (name) gsap.to(name, { color: "#c1121f", x: -8, duration: 0.2, ease: "power2.out", overwrite: "auto" });
    });

    row.addEventListener("mouseleave", () => {
      gsap.to(preview, { opacity: 0, scale: 0.85, duration: 0.2, ease: "power2.in", overwrite: "auto" });
      gsap.to(cursor, { opacity: 0, duration: 0.2, overwrite: "auto" });
      if (name) gsap.to(name, { color: "#f4f8ff", x: 0, duration: 0.2, ease: "power2.out", overwrite: "auto" });
    });
  });
}

function initCategoryClickFlash() {
  const section = document.querySelector(".category-section");
  if (!section || typeof gsap === "undefined") return;

  section.querySelectorAll(".category-row-toggle").forEach((toggle) => {
    const name = toggle.querySelector(".category-row-name");
    if (!name) return;

    const category = toggle.closest(".category-row").dataset.category;

    toggle.addEventListener("click", () => {
      gsap.set(name, { color: "#c1121f" });
      gsap.to(name, { color: "#f4f8ff", duration: 0.3, ease: "power1.out", overwrite: "auto" });

      scrollToCategoryFirstCard(category);
    });
  });
}

let projectSliderTrigger = null;

function getProjectSliderScrollLength(track) {
  const cards = track.querySelectorAll(".project-card");
  const lastCard = cards[cards.length - 1];
  const paddingRight = parseFloat(getComputedStyle(track).paddingRight) || 0;
  const contentEnd = lastCard.offsetLeft + lastCard.offsetWidth + paddingRight;
  return Math.max(contentEnd - window.innerWidth, 0);
}

function initProjectSlider() {
  const section = document.querySelector(".project-slider");
  if (!section || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);
  if (typeof ScrollToPlugin !== "undefined") gsap.registerPlugin(ScrollToPlugin);

  initProjectSliderColorShift(section);

  const track = section.querySelector(".project-slider-track");
  const cards = track.querySelectorAll(".project-card");

  cards.forEach((card) => {
    const img = card.querySelector(".project-card-img");
    if (img && img.dataset.thumb) img.src = img.dataset.thumb;
  });

  initProjectCardInteractions(cards);

  if (window.matchMedia("(max-width: 768px)").matches) return;

  const categoryBoundaries = getCategoryBoundaries(track);
  const categoryEdge = parseFloat(getComputedStyle(track).paddingLeft) || 0;

  const scrollTween = gsap.to(track, {
    x: () => -getProjectSliderScrollLength(track),
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => `+=${getProjectSliderScrollLength(track)}`,
      pin: true,
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => updateActiveCategory(self, track, categoryBoundaries, categoryEdge),
    },
  });

  projectSliderTrigger = scrollTween.scrollTrigger;
}

function getCategoryBoundaries(track) {
  const boundaries = [];
  let lastCategory = null;

  track.querySelectorAll(".project-card").forEach((card) => {
    const category = card.dataset.category;
    if (category !== lastCategory) {
      boundaries.push({ category, offsetLeft: card.offsetLeft });
      lastCategory = category;
    }
  });

  return boundaries;
}

function setActiveCategoryRow(category) {
  document.querySelectorAll(".category-row").forEach((row) => {
    row.classList.toggle("is-active", row.dataset.category === category);
  });
}

let activeCategory = null;

// Mirrors the "slideChange -> active class" behavior from a discrete slider,
// adapted to this scrub-driven horizontal track: the active category is
// whichever card group currently sits at the track's left edge.
function updateActiveCategory(self, track, boundaries, edge) {
  const maxX = getProjectSliderScrollLength(track);
  const currentX = maxX > 0 ? self.progress * maxX : 0;

  let category = "all";
  boundaries.forEach((boundary) => {
    if (currentX + edge > boundary.offsetLeft) category = boundary.category;
  });

  if (category !== activeCategory) {
    activeCategory = category;
    setActiveCategoryRow(category);
  }
}

function initProjectSliderColorShift(section) {
  gsap.fromTo(
    section,
    { backgroundColor: "#f4f8ff" },
    {
      backgroundColor: "#0d0d0d",
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    }
  );
}

function initProjectCardInteractions(cards) {
  cards.forEach((card) => {
    const img = card.querySelector(".project-card-img");

    card.addEventListener("mouseenter", () => {
      gsap.to(img, { scale: 1.05, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      gsap.to(card, { y: -10, duration: 0.3, ease: "power2.out", overwrite: "auto" });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(img, { scale: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" });
      gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out", overwrite: "auto" });
    });

    card.addEventListener("click", () => openProjectOverlay(card));
  });
}

function scrollToCategoryFirstCard(category) {
  if (category === "archive") {
    document.getElementById("archive")?.scrollIntoView({ behavior: "smooth" });
    return;
  }

  const track = document.querySelector(".project-slider-track");
  if (!track || !projectSliderTrigger || typeof gsap === "undefined") return;

  const card =
    category === "all"
      ? track.querySelector(".project-card")
      : track.querySelector(`.project-card[data-category="${category}"]`);
  if (!card) return;

  const maxX = getProjectSliderScrollLength(track);
  if (maxX <= 0) return;

  const progress = Math.min(card.offsetLeft / maxX, 1);
  const targetY =
    projectSliderTrigger.start + progress * (projectSliderTrigger.end - projectSliderTrigger.start);

  gsap.to(window, { scrollTo: { y: targetY, autoKill: false }, duration: 1, ease: "power3.inOut" });
}

// Rich "Template A" content for projects that have a Figma case-study design.
// Projects without an entry here fall back to the card's own basic fields and
// the extra sections (overview/before-after/etc.) stay hidden.
const PROJECT_DETAILS = {
  downy: {
    figmaUrl:
      "https://www.figma.com/design/mlNyk8zl2HXSxHw0jDAgRy/%EA%B9%80%EC%9D%B8%EC%84%9C-%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4%EC%8B%9C%EB%82%98%EB%A6%AC%EC%98%A4?node-id=85-25",
    tag: "UI · UX PROJECT",
    titleLines: ["Downy", "Redesign"],
    info: [
      { label: "period", value: "3days" },
      { label: "role", value: "기획 · 디자인" },
      { label: "tool", value: "Figma" },
    ],
    heroImg: "img/downy-mockup copy.jpg",
    overview:
      "기존 다우니 웹사이트는 브랜드 아이덴티티 없이 단순 마크업 수준에 머물러 있었습니다.\n레이아웃 구조를 전면 재설계하고, 다우니 고유의 부드럽고 청결한 브랜드 이미지를 시각적으로 일관성 있게 구현하는 것에 중점을 두었습니다.\n\n사용자가 브랜드를 자연스럽게 경험할 수 있도록 정보 흐름과 시각 위계를 함께 고려했습니다.",
    beforeImg: "img/기존사이트 캡쳐.png",
    afterImg: "img/Downyviewpage-after.webp",
    colors: ["#12284B", "#0055A0", "#252525", "#FFFFFF"],
    typographyTagline: {
      bold: "다우니, ",
      regular: "부드러운 향기 오래도록  ",
      faded: "NanumSquare Neo OTF",
    },
    wireframe: { base: "img/downy-wireframe.webp" },
    designDetails: [
      {
        tag: "HERO BANNER",
        img: "img/Downyviewpage-01.svg",
        desc:
          "브랜드의 첫인상을 결정하는 구간으로, 자연광과 플로럴 소재를 활용한 이미지와 대형 타이포그래피를 조합해 다우니 고유의 프리미엄 감성을 시각적으로 전달했습니다. CTA 버튼 배치를 통해 사용자의 시선 흐름과 행동을 자연스럽게 유도했습니다.",
      },
      {
        tag: "FEATURE ICON SECTION",
        img: "img/Downyviewpage-02.svg",
        desc:
          "다우니의 핵심 제품 특징을 아이콘과 함께 시각화한 섹션입니다. 일관된 아이콘 스타일과 명확한 텍스트 위계를 통해 정보를 빠르게 인지할 수 있도록 구성하고, 브랜드 컬러를 절제해 사용해 깔끔하고 신뢰감 있는 인상을 유지했습니다.",
      },
      {
        tag: "CARD GRID",
        img: "img/Downyviewpage-03.webp",
        desc:
          "제품을 일관성 있게 탐색할 수 있도록 카드형 레이아웃을 적용했습니다. BEST 뱃지와 View all 링크로 정보 위계를 명확히 하고, 그리드 정렬과 여백을 통해 시각적 피로감 없이 다수의 제품을 자연스럽게 노출할 수 있도록 했습니다.",
      },
    ],
    sectionOrder: ["overview", "before-after", "color-typography", "wireframe", "design-detail"],
  },
  arco: {
    figmaUrl:
      "https://www.figma.com/design/mlNyk8zl2HXSxHw0jDAgRy/%EA%B9%80%EC%9D%B8%EC%84%9C-%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4%EC%8B%9C%EB%82%98%EB%A6%AC%EC%98%A4?node-id=263-7",
    tag: "UI · UX PROJECT",
    titleLines: ["Arco"],
    info: [
      { label: "period", value: "1week" },
      { label: "role", value: "기획 · 디자인 · 프로토" },
      { label: "tool", value: "Figma" },
    ],
    heroImg: "img/app-mockup.jpg",
    overview:
      "기존 아르코 예술극장 모바일 앱은 복잡한 정보 구조와 불편한 예매 동선으로 원하는 공연 정보를 빠르게 찾기 어려웠습니다.\n정보 구조를 전면 재설계하고, 공연 탐색부터 예매까지 이어지는 사용자 경험을 직관적이고 일관성 있게 개선하는 데 중점을 두었습니다.",
    planning: [
      { img: "img/arcoviewpage_01.webp", alt: "Background" },
      { img: "img/arcoviewpage_02.webp", alt: "User research" },
      { img: "img/arcoviewpage_03.webp", alt: "Persona & Journey Map" },
      { img: "img/arcoviewpage_04.webp", alt: "Pain Points & Solution" },
    ],
    colors: ["#9F7BFF", "#C6B0FF", "#0F0F14", "#F2F2F2", "#C3C3C3", "#8A8AA0", "#6B6B78"],
    typographyTagline: {
      bold: "아르코, ",
      regular: '"공연을 찾는 방식에서, 발견하는 경험으로" ',
      faded: "S-Core Dream",
    },
    wireframe: { base: "img/arco-wireframe02.webp", hover: "img/arco-wireframe01.webp" },
    finalDesignImg: "img/arco-finaldesign.webp",
    sectionOrder: ["overview", "planning", "wireframe", "color-typography", "final-design"],
  },
  zara: {
    figmaUrl:
      "https://www.figma.com/design/mlNyk8zl2HXSxHw0jDAgRy/%EA%B9%80%EC%9D%B8%EC%84%9C-%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4%EC%8B%9C%EB%82%98%EB%A6%AC%EC%98%A4?node-id=281-8",
    siteUrl: "#",
    githubUrl: "#",
    tag: "PUBLISHING",
    titleLines: ["ZARA Onepage"],
    info: [
      { label: "period", value: "1week" },
      { label: "role", value: "HTML/CSS" },
      { label: "tool", value: "VS code, Figma" },
    ],
    overview:
      "기존 ZARA 웹사이트는 이미지 중심으로 구성되어 있었지만, 제품에 대한 정보 전달이 부족해 사용자가 필요한 내용을 직관적으로 파악하기 어려웠습니다.\n원페이지 레이아웃으로 콘텐츠를 재구성하고, 정보의 우선순위와 시각적 계층을 정리하여 브랜드 경험과 사용성을 함께 개선하는 데 중점을 두었습니다.",
    colors: ["#111111", "#FFFFFF", "#2B2B2B", "#F4EFE6"],
    typographyFont: "pretendard",
    typographyTagline: {
      bold: "ZARA, ",
      regular: '"브랜드를 넘어, 컬렉션을 경험하다" ',
      faded: "Pretendard",
    },
    wireframe: { base: "img/zara_wireframe.webp", scrollDuration: 4.5, width: "min(95%, 960px)" },
    designDetailMode: "swiper",
    designDetails: [
      {
        tag: "HERO BANNER",
        img: "img/zara-selectdesign01.webp",
        desc:
          "메인/호버 이미지 크로스페이드 + 무한 marquee 배너 → 진입 화면에서 바로 브랜드 무드와 시즌 메시지를 압축 전달, 스크롤 없이도 정보 인지 가능",
      },
      {
        tag: "NEW",
        img: "img/zara-selectdesign02.webp",
        desc: "신상품 그리드에 가격 정보 같이 노출 → 이미지만 나열되던 원본과 달리 필요한 정보를 바로 제공",
      },
      {
        tag: "ABOUT",
        img: "img/zara-selectdesign03.webp",
        desc:
          "숫자 카운터(국가/매장수/창립연도) → 텍스트로만 흩어져 있던 브랜드 정보를 한눈에 스캔되는 데이터로 재구성",
      },
      {
        tag: "WOMAN",
        img: "img/zara-selectdesign04.webp",
        desc:
          "호버 시 메인컷↔디테일컷 전환 그리드 → 단순 나열을 인터랙션으로 바꿔 한 화면에서 더 많은 정보(앞/뒤 디테일)를 전달",
      },
      {
        tag: "MAN",
        img: "img/zara-selectdesign05.webp",
        desc: "풀스크린 비주얼 위 상품 리스트 오버레이 → 이미지와 정보를 분리하지 않고 한 섹션 안에 압축 배치",
      },
    ],
    sectionOrder: ["overview", "color-typography", "wireframe", "design-detail"],
  },
};

let planningSwiper = null;

function buildPlanningSlides(overlay, slides) {
  const wrapper = overlay.querySelector(".overlay-planning-swiper .swiper-wrapper");
  if (!wrapper) return;

  if (planningSwiper) {
    planningSwiper.destroy(true, true);
    planningSwiper = null;
  }

  wrapper.innerHTML = slides
    .map(
      (slide) => `
        <div class="swiper-slide">
          <img class="overlay-planning-slide-img" src="${slide.img}" alt="${slide.alt || ""}" />
        </div>`
    )
    .join("");

  if (!slides.length || typeof Swiper === "undefined") return;

  planningSwiper = new Swiper(overlay.querySelector(".overlay-planning-swiper"), {
    effect: "cards",
    grabCursor: true,
    loop: false,
    autoplay: false,
    navigation: {
      nextEl: overlay.querySelector(".overlay-planning-next"),
      prevEl: overlay.querySelector(".overlay-planning-prev"),
    },
  });
}

// Two display modes share the .overlay-wireframe-frame container:
// - fade mode (wireframe.hover set, e.g. Arco): two images crossfade on hover
// - scroll mode (wireframe.hover absent, e.g. Downy): single tall image scrolls into view on hover
function setWireframeImages(overlay, wireframe) {
  const frame = overlay.querySelector(".overlay-wireframe-frame");
  if (!frame) return;

  frame.classList.remove("is-hovered");
  frame.onmouseenter = null;
  frame.onmouseleave = null;

  if (wireframe?.hover) {
    frame.innerHTML = `
      <img class="overlay-wireframe-fade-img is-base" src="${wireframe.base}" alt="" />
      <img class="overlay-wireframe-fade-img is-hover" src="${wireframe.hover}" alt="" />
      <div class="overlay-wireframe-hint">
        <span class="overlay-wireframe-hint-icon" aria-hidden="true">
          <span></span><span></span><span></span>
        </span>
        <span>마우스 오버를 하면 와이어프레임이 전환됩니다</span>
      </div>
    `;
    frame.onmouseenter = () => {
      frame.classList.add("is-hovered");
    };
    frame.onmouseleave = () => {
      frame.classList.remove("is-hovered");
    };
    return;
  }

  const scrollImgStyle = wireframe?.width ? ` style="width:${wireframe.width};"` : "";
  frame.innerHTML = `
    <div class="overlay-wireframe-scroll">
      <img class="overlay-wireframe-scroll-img" src="${wireframe?.base || ""}"${scrollImgStyle} alt="" />
    </div>
    <div class="overlay-wireframe-hint">
      <span class="overlay-wireframe-hint-icon" aria-hidden="true">
        <span></span><span></span><span></span>
      </span>
      <span>마우스 오버시 와이어프레임이 아래로 움직입니다</span>
    </div>
  `;

  const scroller = frame.querySelector(".overlay-wireframe-scroll");
  function getScrollDistance() {
    return Math.max(scroller.scrollHeight - frame.offsetHeight, 0);
  }
  frame.onmouseenter = () => {
    const distance = getScrollDistance();
    if (distance <= 0) return;
    const duration = wireframe?.scrollDuration ?? Math.min(Math.max(distance / 60, 3), 14) * 0.6;
    gsap.to(scroller, {
      y: -distance,
      duration,
      ease: "sine.inOut",
      overwrite: "auto",
    });
  };
  frame.onmouseleave = () => {
    gsap.to(scroller, { y: 0, duration: 1, ease: "sine.out", overwrite: "auto" });
  };
}

function initProjectOverlay() {
  const overlay = document.querySelector(".project-overlay");
  if (!overlay || typeof gsap === "undefined") return;

  gsap.set(overlay, { yPercent: 100 });
  overlay.querySelector(".project-overlay-close").addEventListener("click", closeProjectOverlay);
  overlay.querySelector(".overlay-detail-next").addEventListener("click", advanceDesignDetailSlide);

  overlay.querySelector(".overlay-footer-prev").addEventListener("click", () => {
    const sibling = getSiblingProjectCard(Number(overlay.dataset.currentCardId), -1);
    if (sibling) openProjectOverlay(sibling);
  });
  overlay.querySelector(".overlay-footer-next").addEventListener("click", () => {
    const sibling = getSiblingProjectCard(Number(overlay.dataset.currentCardId), 1);
    if (sibling) openProjectOverlay(sibling);
  });
  overlay.querySelector(".overlay-footer-all").addEventListener("click", (event) => {
    event.preventDefault();
    closeProjectOverlay();
    document.getElementById("project")?.scrollIntoView({ behavior: "smooth" });
  });
}

function getAllProjectCards() {
  return [...document.querySelectorAll(".project-slider-track .project-card")];
}

function getSiblingProjectCard(index, direction) {
  const cards = getAllProjectCards();
  return cards[index + direction] || null;
}

function setOverlaySectionVisible(overlay, section, visible) {
  const el = overlay.querySelector(`[data-section="${section}"]`);
  if (el) el.style.display = visible ? "" : "none";
}

// Projects can list which sections appear and in what order, since not every
// case study uses the same template (e.g. arco has planning/final-design,
// downy has before-after/design-detail). Falls back to the existing DOM order.
function applySectionOrder(overlay, sectionOrder) {
  if (!sectionOrder?.length) return;
  const scroll = overlay.querySelector(".project-overlay-scroll");
  const anchor = scroll.querySelector(".overlay-bottom-actions");
  sectionOrder.forEach((section) => {
    const el = scroll.querySelector(`[data-section="${section}"]`);
    if (el) scroll.insertBefore(el, anchor);
  });
}

function openProjectOverlay(card) {
  const overlay = document.querySelector(".project-overlay");
  if (!overlay || typeof gsap === "undefined") return;

  const id = card.dataset.projectId || "";
  const details = PROJECT_DETAILS[id];

  const category = card.querySelector(".project-card-category").textContent;
  const name = card.querySelector(".project-card-name").textContent;

  overlay.querySelector(".overlay-hero-img").src = details?.heroImg || card.dataset.thumb || "";
  overlay.querySelector(".overlay-hero-tag").textContent = details?.tag || category;

  const titleLines = details?.titleLines || [name];
  overlay.querySelector(".overlay-hero-title").innerHTML = titleLines
    .map((line) => `<span>${line}</span>`)
    .join("<br />");

  const infoList = overlay.querySelector(".overlay-hero-info");
  infoList.innerHTML = (details?.info || [])
    .map(
      (row) =>
        `<li><span class="overlay-hero-info-label">${row.label}&nbsp;&nbsp;|</span><span class="overlay-hero-info-value">${row.value}</span></li>`
    )
    .join("");

  const siteLinks = overlay.querySelectorAll(".overlay-hero-site, .overlay-bottom-site");
  siteLinks.forEach((link) => {
    link.href = details?.siteUrl || "#";
    link.style.display = details?.siteUrl ? "" : "none";
  });

  const githubLinks = overlay.querySelectorAll(".overlay-hero-github, .overlay-bottom-github");
  githubLinks.forEach((link) => {
    link.href = details?.githubUrl || "#";
    link.style.display = details?.githubUrl ? "" : "none";
  });

  const bottomFigma = overlay.querySelector(".overlay-bottom-figma");
  bottomFigma.href = details?.figmaUrl || "#";
  bottomFigma.style.display = details?.figmaUrl ? "" : "none";

  // Hero only has room to feature one CTA group: prefer site/github when a project has
  // them (e.g. Zara), otherwise fall back to the figma link (e.g. Downy, Arco).
  const heroFigma = overlay.querySelector(".overlay-hero-figma");
  const showHeroFigma = Boolean(details?.figmaUrl) && !details?.siteUrl && !details?.githubUrl;
  heroFigma.href = details?.figmaUrl || "#";
  heroFigma.style.display = showHeroFigma ? "" : "none";

  setOverlaySectionVisible(overlay, "overview", Boolean(details?.overview));
  overlay.querySelector(".overlay-overview-text").textContent = details?.overview || "";

  setOverlaySectionVisible(overlay, "before-after", Boolean(details?.beforeImg && details?.afterImg));
  overlay.querySelector(".overlay-before-img").src = details?.beforeImg || "";
  overlay.querySelector(".overlay-after-img").src = details?.afterImg || "";

  setOverlaySectionVisible(overlay, "color-typography", Boolean(details?.colors));
  const colorList = overlay.querySelector(".overlay-color-list");
  colorList.innerHTML = (details?.colors || [])
    .map(
      (hex) =>
        `<li><span class="overlay-color-swatch" style="background-color:${hex}"></span><span class="overlay-color-hex">${hex}</span></li>`
    )
    .join("");
  const tagline = overlay.querySelector(".overlay-typo-tagline");
  if (details?.typographyTagline) {
    const { bold, regular, faded } = details.typographyTagline;
    tagline.innerHTML = `<strong>${bold}</strong>${regular}<span>${faded}</span>`;
  } else {
    tagline.innerHTML = "";
  }
  overlay
    .querySelector(".overlay-typography")
    .classList.toggle("is-pretendard", details?.typographyFont === "pretendard");

  setOverlaySectionVisible(overlay, "wireframe", Boolean(details?.wireframe?.base));
  setWireframeImages(overlay, details?.wireframe);

  setOverlaySectionVisible(overlay, "planning", Boolean(details?.planning?.length));
  buildPlanningSlides(overlay, details?.planning || []);

  setOverlaySectionVisible(overlay, "final-design", Boolean(details?.finalDesignImg));
  overlay.querySelector(".overlay-final-design-img").src = details?.finalDesignImg || "";

  setOverlaySectionVisible(overlay, "design-detail", Boolean(details?.designDetails?.length));
  buildDesignDetailSlides(overlay, details?.designDetails || [], details?.designDetailMode || "track");

  applySectionOrder(overlay, details?.sectionOrder);

  const cards = getAllProjectCards();
  const cardIndex = cards.indexOf(card);
  overlay.dataset.currentCardId = String(cardIndex);
  const prevCard = getSiblingProjectCard(cardIndex, -1);
  const nextCard = getSiblingProjectCard(cardIndex, 1);
  fillFooterProject(overlay.querySelector(".overlay-footer-prev"), prevCard);
  fillFooterProject(overlay.querySelector(".overlay-footer-next"), nextCard);

  overlay.scrollTop = 0;
  overlay.querySelector(".overlay-detail-slider").dataset.index = "0";
  document.body.style.overflow = "hidden";

  gsap.set(overlay, { pointerEvents: "auto" });
  gsap.to(overlay, { yPercent: 0, duration: 0.6, ease: "power3.out", overwrite: "auto" });
}

function fillFooterProject(button, projectCard) {
  if (!projectCard) {
    button.style.visibility = "hidden";
    return;
  }
  button.style.visibility = "visible";
  button.querySelector(".overlay-footer-name").textContent =
    projectCard.querySelector(".project-card-name").textContent;
  button.querySelector(".overlay-footer-thumb").src = projectCard.dataset.thumb || "";
}

// Two display modes share the .overlay-detail-slider container:
// - track mode (default, e.g. Downy): custom GSAP track, advances via the next button only
// - swiper mode (e.g. Zara): Swiper instance with creative effect, arrows, pagination, drag, keyboard, loop
let designDetailSwiper = null;

function buildDesignDetailSlides(overlay, slides, mode = "track") {
  const track = overlay.querySelector(".overlay-detail-track");
  const swiperEl = overlay.querySelector(".overlay-detail-swiper");
  const prevBtn = overlay.querySelector(".overlay-detail-prev");

  if (designDetailSwiper) {
    designDetailSwiper.destroy(true, true);
    designDetailSwiper = null;
  }

  const isSwiperMode = mode === "swiper";
  overlay.dataset.detailMode = mode;
  track.style.display = isSwiperMode ? "none" : "";
  swiperEl.style.display = isSwiperMode ? "" : "none";
  prevBtn.style.display = isSwiperMode ? "" : "none";

  const slideMarkup = (slide) => `
        <div class="overlay-detail-slide">
          <span class="overlay-detail-tag">${slide.tag}</span>
          ${slide.img ? `<img class="overlay-detail-img" src="${slide.img}" alt="${slide.tag}" />` : ""}
          <p class="overlay-detail-desc">${slide.desc}</p>
        </div>`;

  if (!isSwiperMode) {
    track.innerHTML = slides.map(slideMarkup).join("");
    gsap.set(track, { xPercent: 0 });
    return;
  }

  const wrapper = swiperEl.querySelector(".swiper-wrapper");
  wrapper.innerHTML = slides
    .map((slide) => `<div class="swiper-slide">${slideMarkup(slide)}</div>`)
    .join("");

  if (!slides.length || typeof Swiper === "undefined") return;

  designDetailSwiper = new Swiper(swiperEl, {
    effect: "creative",
    creativeEffect: {
      prev: { shadow: true, translate: ["-20%", 0, -1], opacity: 0 },
      next: { translate: ["20%", 0, 0], opacity: 0 },
    },
    grabCursor: true,
    loop: true,
    autoHeight: true,
    keyboard: { enabled: true },
    navigation: {
      nextEl: overlay.querySelector(".overlay-detail-next"),
      prevEl: prevBtn,
    },
    pagination: {
      el: overlay.querySelector(".overlay-detail-pagination"),
      clickable: true,
    },
  });
}

function advanceDesignDetailSlide() {
  const overlay = document.querySelector(".project-overlay");
  if (overlay.dataset.detailMode === "swiper") return;

  const slider = overlay.querySelector(".overlay-detail-slider");
  const track = overlay.querySelector(".overlay-detail-track");
  const slideCount = track.children.length;
  if (!slideCount) return;

  const index = (Number(slider.dataset.index || 0) + 1) % slideCount;
  slider.dataset.index = String(index);
  gsap.to(track, { xPercent: -100 * index, duration: 0.6, ease: "power3.inOut", overwrite: "auto" });
}

function closeProjectOverlay() {
  const overlay = document.querySelector(".project-overlay");
  if (!overlay || typeof gsap === "undefined") return;

  gsap.to(overlay, {
    yPercent: 100,
    duration: 0.5,
    ease: "power3.in",
    overwrite: "auto",
    onComplete: () => {
      gsap.set(overlay, { pointerEvents: "none" });
      document.body.style.overflow = "";
    },
  });
}

function initArchiveOverlay() {
  const overlay = document.querySelector(".archive-overlay");
  if (!overlay || typeof gsap === "undefined") return;

  gsap.set(overlay, { yPercent: 100 });
  overlay.querySelector(".archive-overlay-close").addEventListener("click", closeArchiveOverlay);

  document.querySelectorAll(".archive-card").forEach((card) => {
    card.addEventListener("click", () => openArchiveOverlay(card));
  });
}

function openArchiveOverlay(card) {
  const overlay = document.querySelector(".archive-overlay");
  if (!overlay || typeof gsap === "undefined") return;

  const thumb = card.dataset.thumb || "";
  const galleryBase = thumb.replace(/\.webp$/, "");

  overlay.querySelector(".archive-overlay-hero-img").src = thumb;
  overlay.querySelector(".archive-overlay-title").textContent = card.dataset.name || "";

  const tagsWrap = overlay.querySelector(".archive-overlay-tags");
  const tools = card.dataset.tools ? card.dataset.tools.split(",") : [];
  const tags = card.dataset.period ? [`PERIOD  ${card.dataset.period}`, ...tools] : tools;
  tagsWrap.innerHTML = "";
  tags.forEach((label) => {
    const tag = document.createElement("span");
    tag.className = "archive-overlay-tag";
    tag.textContent = label;
    tagsWrap.appendChild(tag);
  });
  tagsWrap.style.display = tags.length ? "flex" : "none";

  const overviewBlock = overlay.querySelector(".archive-overlay-overview");
  overlay.querySelector(".archive-overlay-overview-text").textContent = card.dataset.overview || "";
  overviewBlock.style.display = card.dataset.overview ? "block" : "none";

  overlay.querySelectorAll(".archive-overlay-gallery-img").forEach((img, index) => {
    img.src = `${galleryBase}-${index + 1}.webp`;
  });

  overlay.scrollTop = 0;
  document.body.style.overflow = "hidden";

  gsap.set(overlay, { pointerEvents: "auto" });
  gsap.to(overlay, { yPercent: 0, duration: 0.6, ease: "power3.out", overwrite: "auto" });
}

function closeArchiveOverlay() {
  const overlay = document.querySelector(".archive-overlay");
  if (!overlay || typeof gsap === "undefined") return;

  gsap.to(overlay, {
    yPercent: 100,
    duration: 0.5,
    ease: "power3.in",
    overwrite: "auto",
    onComplete: () => {
      gsap.set(overlay, { pointerEvents: "none" });
      document.body.style.overflow = "";
    },
  });
}

document.addEventListener("DOMContentLoaded", initIntroAnimation);
document.addEventListener("DOMContentLoaded", initCategoryHoverFx);
document.addEventListener("DOMContentLoaded", initCategoryClickFlash);
document.addEventListener("DOMContentLoaded", initProjectSlider);
function initArchiveOverlayScrollFx() {
  const overlay = document.querySelector(".archive-overlay");
  if (!overlay || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  const targets = [
    overlay.querySelector(".archive-overlay-overview-text"),
    ...overlay.querySelectorAll(".archive-overlay-label"),
    ...overlay.querySelectorAll(".archive-overlay-gallery-img"),
  ].filter(Boolean);

  gsap.set(targets, { opacity: 0, y: 40 });

  targets.forEach((target) => {
    gsap.to(target, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        scroller: overlay,
        trigger: target,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });
  });
}

document.addEventListener("DOMContentLoaded", initProjectOverlay);
document.addEventListener("DOMContentLoaded", initArchiveOverlay);
document.addEventListener("DOMContentLoaded", initArchiveOverlayScrollFx);
