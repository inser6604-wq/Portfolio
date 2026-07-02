const INTRO_STEPS = [
  { word: "DESIGNER", imageIndex: 0 },
  { word: "PUBLISHER", imageIndex: 1 },
  { word: "UI·UX", imageIndex: 2 },
  { word: "KIM INSEO", imageIndex: 3 },
];

const STAIR_HEIGHTS = ["21.2vh", "32.2vh", "43.6vh", "60.5vh", "80.6vh", "100vh"];

const STEP_HOLD = 0.5;
const DIAL_DURATION = 0.25;

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

  // Pre-hide hero elements before #main becomes visible during the intro stair reveal.
  // Individual initial positions (y, filter) are applied in initHeroIntroAnimation().
  // Note: .main-portfolio-wrap (not .main-portfolio-label) is hidden here so the CSS
  // transform: rotate(-90deg) on the label is never touched by GSAP.
  gsap.set(
    [".hero-designer", ".hero-ampersand", ".hero-publisher", ".main-portfolio-wrap", ".main-header", ".main-scroll"],
    { opacity: 0 }
  );
  gsap.set(".main-title", { opacity: 0 });

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
    duration: 0.2,
    ease: "power2.inOut",
  });

  tl.to(stairBars, {
    height: (index) => STAIR_HEIGHTS[index],
    duration: 0.35,
    stagger: 0.045,
    ease: "power3.inOut",
  });

  tl.to(stairBars, {
    height: "100vh",
    duration: 0.2,
    ease: "power2.inOut",
  });

  tl.set(main, { visibility: "visible" }, "-=0.1");

  tl.to(stairBars, {
    y: "-100%",
    duration: 0.45,
    stagger: 0.04,
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

  if (window.matchMedia("(max-width: 768px)").matches) {
    initMobileProjectSlider(track);
    return;
  }

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

function resolveActiveCategory(currentX, boundaries, edge) {
  let category = "all";
  boundaries.forEach((boundary) => {
    if (currentX + edge > boundary.offsetLeft) category = boundary.category;
  });
  return category;
}

function applyActiveCategory(category) {
  if (category !== activeCategory) {
    activeCategory = category;
    setActiveCategoryRow(category);
  }
}

function updateActiveCategoryFromTrackScroll(track, boundaries, edge) {
  applyActiveCategory(resolveActiveCategory(track.scrollLeft, boundaries, edge));
}

function updateActiveCategory(self, track, boundaries, edge) {
  const maxX = getProjectSliderScrollLength(track);
  const currentX = maxX > 0 ? self.progress * maxX : 0;
  applyActiveCategory(resolveActiveCategory(currentX, boundaries, edge));
}

function initMobileProjectSlider(track) {
  const categoryBoundaries = getCategoryBoundaries(track);
  const categoryEdge = parseFloat(getComputedStyle(track).paddingLeft) || 0;

  track.addEventListener(
    "scroll",
    () => updateActiveCategoryFromTrackScroll(track, categoryBoundaries, categoryEdge),
    { passive: true }
  );
}

function scrollMobileTrackToCategory(track, category) {
  const targetLeft =
    category === "all"
      ? 0
      : track.querySelector(`.project-card[data-category="${category}"]`)?.offsetLeft ?? 0;

  track.scrollTo({ left: targetLeft, behavior: "smooth" });
  applyActiveCategory(category === "all" ? "all" : category);
}

function scrollToProjectSectionThen(callback) {
  const projectSection = document.getElementById("project");
  if (!projectSection) {
    callback();
    return;
  }

  const rect = projectSection.getBoundingClientRect();
  const isVisible = rect.top <= 80 && rect.bottom >= window.innerHeight * 0.3;

  if (isVisible) {
    callback();
    return;
  }

  projectSection.scrollIntoView({ behavior: "smooth" });
  window.setTimeout(callback, 500);
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
    applyActiveCategory("archive");
    return;
  }

  const track = document.querySelector(".project-slider-track");
  if (!track) return;

  if (window.matchMedia("(max-width: 768px)").matches) {
    const card =
      category === "all"
        ? track.querySelector(".project-card")
        : track.querySelector(`.project-card[data-category="${category}"]`);
    if (!card) return;

    scrollToProjectSectionThen(() => scrollMobileTrackToCategory(track, category));
    return;
  }

  if (!projectSliderTrigger || typeof gsap === "undefined") return;

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
      "https://www.figma.com/design/juZYlQiaWwqnBIVte538EW/2-%E1%84%80%E1%85%B5%E1%86%B7%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A5-%E1%84%87%E1%85%B3%E1%84%85%E1%85%A2%E1%86%AB%E1%84%83%E1%85%B3UI%E1%84%83%E1%85%B5%E1%84%8C%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB?node-id=0-1&t=lvmnhQAMGtEeBdcj-1",
    badge: "100% PERSONAL",
    tag: "UI · UX PROJECT",
    titleLines: ["Downy", "Redesign"],
    info: [
      { label: "period", value: "3days" },
      { label: "role", value: "기획 · 디자인 / 100% Personal" },
      { label: "tool", value: "Figma" },
    ],
    heroImg: "img/downy-mockup copy.jpg",
    overview:
      "기존 다우니 웹사이트는 브랜드 아이덴티티 없이 단순 마크업 수준에 머물러 있었습니다.\n레이아웃 구조를 전면 재설계하고, 다우니 고유의 부드럽고 청결한 브랜드 이미지를 시각적으로 일관성 있게 구현하는 것에 중점을 두었습니다.\n\n사용자가 브랜드를 자연스럽게 경험할 수 있도록 정보 흐름과 시각 위계를 함께 고려했습니다.",
    beforeImg: "img/기존사이트 캡쳐.png",
    afterImg: "img/downy-afterimg.jpg",
    colors: ["#12284B", "#0055A0", "#252525", "#FFFFFF"],
    typographyTagline: {
      bold: "다우니, ",
      regular: "부드러운 향기 오래도록  ",
      faded: "NanumSquare Neo OTF",
    },
    wireframe: { base: "img/downy-wireframe.webp" },
    preview: {
      images: ["img/Downy-mockup01.jpg", "img/Downy-mockup02.jpg"],
    },
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
    sectionOrder: ["overview", "before-after", "color-typography", "wireframe", "design-detail", "preview"],
  },
  arco: {
    figmaUrl:
      "https://www.figma.com/design/V9X6qPnM7Ec7A3u42baE54/%EA%B9%80%EC%9D%B8%EC%84%9C-%EB%AA%A8%EB%B0%94%EC%9D%BC%EC%95%B1UI%EB%94%94%EC%9E%90%EC%9D%B8?node-id=0-1&t=d6UqbIHdNmSgYMPx-1",
    badge: "100% PERSONAL",
    badgeColor: "#9359FF",
    heroNavColor: "#0d0d0d",
    tag: "UI · UX PROJECT",
    titleLines: ["Arco"],
    info: [
      { label: "period", value: "1week" },
      { label: "role", value: "기획 · 디자인 · 프로토 / 100% Personal" },
      { label: "tool", value: "Figma" },
    ],
    heroImg: "img/app-mockup.jpg",
    overview:
      "기존 아르코 예술극장 모바일 앱은 복잡한 정보 구조와 불편한 예매 동선으로\n원하는 공연 정보를 빠르게 찾기 어려웠습니다.\n정보 구조를 전면 재설계하고, 공연 탐색부터 예매까지 이어지는 사용자 경험을\n직관적이고 일관성 있게 개선하는 데 중점을 두었습니다.",
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
    preview: {
      images: ["img/arco-mockup01.jpg", "img/arco-mockup02.jpg"],
    },
    sectionOrder: ["overview", "planning", "wireframe", "color-typography", "preview"],
  },
  zara: {
    figmaUrl:
      "https://www.figma.com/design/aK6cCABll232WEyJ1yIcSY/4-Onepage-%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84?node-id=21-2&t=cokYFQYkRYKMglhO-1",
    siteUrl: "https://inser6604-wq.github.io/onepage/",
    githubUrl: "https://github.com/inser6604-wq/onepage.git",
    badge: "100% PERSONAL",
    tag: "PUBLISHING",
    titleLines: ["ZARA Onepage"],
    info: [
      { label: "period", value: "1week" },
      { label: "role", value: "기획 · 디자인 · 퍼블리싱 / 100% Personal" },
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
    preview: {
      images: ["img/zara-mockup01.jpg", "img/zara-mockup02.jpg"],
    },
    sectionOrder: ["overview", "color-typography", "wireframe", "design-detail", "preview"],
  },
  compose: {
    siteUrl: "https://compose.dothome.co.kr/",
    githubUrl: "https://github.com/inser6604-wq/compose-website.git",
    badge: "100% PERSONAL",
    tag: "PUBLISHING",
    titleLines: ["Compose", "Coffee Website"],
    info: [
      { label: "period", value: "2week" },
      { label: "role", value: "기획 · 디자인 · 퍼블리싱 / 100% Personal" },
      { label: "tool", value: "HTML / CSS / JavaScript" },
    ],
    heroImg: "img/works-img05.jpg",
    overview:
      "기존 컴포즈커피 창업 웹사이트는 정보가 분산되어 있고 창업자가 필요로 하는 핵심 정보가 부족해 원하는 내용을 빠르게 파악하기 어려웠습니다.\n\n창업 절차와 브랜드 경쟁력, 비용 안내 등 필수 콘텐츠를 중심으로 정보 구조를 재구성하고, HTML·CSS·JavaScript를 활용한 하드코딩 방식으로 구현하여 직관적인 사용자 경험을 제공하는 데 중점을 두었습니다.",
    storyboard: {
      images: [
        "img/compose/compose-storyboard01.jpg",
        "img/compose/compose-storyboard02.jpg",
        "img/compose/compose-storyboard03.jpg",
        "img/compose/compose-storyboard04.jpg",
        "img/compose/compose-storyboard05.jpg",
        "img/compose/compose-storyboard06.jpg",
        "img/compose/compose-storyboard07.jpg",
        "img/compose/compose-storyboard08.jpg",
        "img/compose/compose-storyboard09.jpg",
        "img/compose/compose-storyboard10.jpg",
      ],
      figmaUrl: "https://www.figma.com/slides/RcMy9zbmbU1ia87SRsYNKL",
    },
    publishingDetail: {
      tabs: [
        { label: "01 MAIN VISUAL" },
        { label: "02 BRAND HISTORY" },
        { label: "03 MENU" },
        { label: "04 EXPECT COST" },
        { label: "05 ONLINE COUNSEL" },
      ],
      images: [
        "img/compose/compose-detail01.jpg",
        "img/compose/compose-detail02.jpg",
        "img/compose/compose-detail03.jpg",
        "img/compose/compose-detail04.jpg",
        "img/compose/compose-detail05.jpg",
      ],
      captions: [
        {
          title: "메인 페이지",
          text: "Hero(CTA 2개) + 4 Reason 카드 + 메뉴 무한 캐러셀 + 숫자 카운터 + 가맹 프로세스 7단계 + 점주 후기 + 예상비용 간이 계산기 + 상담 폼까지 창업 전 여정을 한 페이지에서 완결합니다.",
        },
        {
          title: "브랜드 스토리 페이지",
          text: "브랜드 철학 텍스트 + 매장수·누적판매량·만족도 숫자 카운터 + 연혁 타임라인 + 품질·상생·혁신 3가지 브랜드 약속 카드로 브랜드 신뢰도를 구조적으로 전달합니다.",
        },
        {
          title: "Menu 페이지",
          text: "BEST·SEASON·COFFEE·SMOOTHIE·TEA·DESSERT 탭 필터로 전체 메뉴를 카테고리별로 탐색할 수 있도록 구성했습니다.",
        },
        {
          title: "예상 창업 비용 페이지",
          text: "10평/15평 기준 항목별 비용을 테이블로 분리해 총액을 명확히 비교할 수 있도록 구성했습니다.",
        },
        {
          title: "가맹 창업 상담 페이지",
          text: "성명·연락처·지역·문의내용 + 개인정보 동의를 한 폼에 담아 상담 신청 흐름을 단일 페이지로 완결했습니다.",
        },
      ],
    },
    preview: {
      images: ["img/compose-mockup01.jpg", "img/compose-mockup02.jpg"],
    },
    sectionOrder: ["overview", "storyboard", "publishing-detail", "preview"],
  },
  aether: {
    siteUrl: "https://cursor-vibe-coding-kappa.vercel.app/",
    githubUrl: "https://github.com/inser6604-wq/cursor-vibe-coding.git",
    badge: "VIBE CODING",
    tag: "PUBLISHING",
    titleLines: ["Aether", "Landing page"],
    info: [
      { label: "period", value: "1DAY" },
      { label: "role", value: "기획 · 디자인 / Cursor Ai" },
      { label: "tool", value: "Cursor, Supabase" },
    ],
    heroImg: "img/works-img04.jpg",
    overview:
      "가상의 미래형 우주 예약 서비스를 주제로 기획부터 제작까지 진행한 랜딩 페이지 프로젝트입니다. PRD와 TRD를 작성하여 서비스 구조와 기능을 설계하고, 바이브 코딩을 활용해 반응형 UI를 구현했습니다.\n\n또한 예약 폼에 Supabase를 연동하여 사용자 데이터가 실제 데이터베이스에 저장되도록 구현하며, 기획부터 프론트엔드와 백엔드 연동까지 전 과정을 경험하는 데 중점을 두었습니다.",
    overviewSkills: ["Planning", "Vibe Coding", "Frontend", "Backend"],
    designProcess: [
      { title: "PRD", sub: "서비스 목표 정의" },
      { title: "TRD", sub: "기능 및 기술 설계" },
      { title: "Cursor", sub: "AI 바이브 코딩" },
      { title: "Supabase", sub: "예약 데이터 저장" },
    ],
    designDetailMode: "swiper",
    designDetails: [
      {
        tag: "HERO BANNER",
        img: "img/aetherslider-01.webp",
        desc: "풀스크린 배경 + 슬라이드 카운터(01/05)로 미래형 우주 예약 서비스의 브랜드 아이덴티티를 전달하는 첫 화면입니다.",
      },
      {
        tag: "ABOUT",
        img: "img/aetherslider-02.webp",
        desc: "서비스의 핵심 가치와 비전을 임팩트 있는 비주얼과 카피로 구성해 사용자가 서비스 개념을 빠르게 이해할 수 있도록 했습니다.",
      },
      {
        tag: "DESTINATIONS",
        img: "img/aetherslider-03.webp",
        desc: "번호 붙은 카드 그리드(화성/유로파/금성/목성)로 여행지를 구조화해 우주 목적지를 상품처럼 탐색할 수 있습니다.",
      },
      {
        tag: "EXPERIENCE",
        img: "img/aetherslider-04.webp",
        desc: "01→02→03→04 스텝 플로우로 예약부터 출발까지 복잡한 프로세스를 직관적으로 시각화했습니다.",
      },
    ],
    preview: {
      images: ["img/aether-mockup01.jpg", "img/aether-mockup02.jpg"],
    },
    sectionOrder: ["overview", "design-process", "design-detail", "preview"],
  },
  jejuvegan: {
    figmaUrl:
      "https://www.figma.com/design/DsApQ6nIvzU1U7OowP8Rkh/%ED%95%9C%EB%9D%BC%EB%B4%89%ED%8C%80-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B8%B0%ED%9A%8D?node-id=0-1&t=GO0JhWAC6mpX9hvj-1",
    siteUrl: "https://kis0503.dothome.co.kr/",
    githubUrl: "https://github.com/inser6604-wq/jeju-vegan-project.git",
    badge: "TEAM PROJECT",
    badgeColor: "#c1121f",
    tag: "TEAM / responsive",
    titleLines: ["jeju vegan", "website"],
    info: [
      { label: "period", value: "2week" },
      { label: "role", value: "Team Leader / 기획 · 디자인 · 퍼블리싱<br />디자인, 퍼블리싱 총괄 및<br class=\"overlay-info-br-mobile\" />메인페이지, faq 구현" },
      { label: "TEAM", value: "4 Members" },
      { label: "tool", value: "Figma / HTML / CSS /<br class=\"overlay-info-br-mobile\" />JavaScript / SupaBase" },
    ],
    heroImg: "img/works-img01.jpg",
    overview:
      "기존에는 제주 지역의 비건 식당 정보가 여러 플랫폼에 분산되어 있어 원하는 정보를 빠르게 찾기 어려웠으며, 여행 동선까지 함께 고려한 서비스도 부족했습니다.\n\n이를 개선하기 위해 지도 기반으로 정보를 통합하고, 비건 여행객과 제주 방문객이 식당과 여행 코스를 직관적으로 탐색할 수 있는 사용자 경험을 설계했습니다. 또한 반응형 웹을 구현하여 PC, Tablet, Mobile 환경에서도 일관된 사용성과 접근성을 제공하는 데 중점을 두었습니다.",
    beforeImg: "img/jejuvegan/jejuvegan-before.jpg",
    afterImg: "img/jejuvegan/jejuvegan-after.jpg",
    planning: [
      { img: "img/jejuvegan/jejuvegan-planning01.jpg", alt: "기획 01" },
      { img: "img/jejuvegan/jejuvegan-planning02.jpg", alt: "기획 02" },
      { img: "img/jejuvegan/jejuvegan-planning03.jpg", alt: "기획 03" },
      { img: "img/jejuvegan/jejuvegan-planning04.jpg", alt: "기획 04" },
      { img: "img/jejuvegan/jejuvegan-planning05.jpg", alt: "기획 05" },
    ],
    colors: ["#FF7F00", "#133020", "#FFFCF7", "#787878", "#111111", "#FFFFFF"],
    typographyFonts: [
      {
        fontClass: "is-a2z",
        tagline: {
          bold: "제주에서 ",
          regular: "비건을 더 쉽고, 즐겁게  ",
          faded: "A2Z",
        },
      },
      {
        fontClass: "is-pretendard",
        tagline: {
          bold: "제주도에서, ",
          regular: '"비건을 더 쉽고, 즐겁게"  ',
          faded: "pretendard",
        },
      },
    ],
    publishingDetail: {
      tabs: [
        { label: "01 MAIN" },
        { label: "02 VEGAN MAP" },
        { label: "03 vegan pick" },
        { label: "04 Submit Vegan Spot" },
        { label: "05 faq" },
      ],
      images: [
        "img/jejuvegan/jejuvegan-detail01.jpg",
        "img/jejuvegan/jejuvegan-detail02.jpg",
        "img/jejuvegan/jejuvegan-detail03.jpg",
        "img/jejuvegan/jejuvegan-detail04.jpg",
        "img/jejuvegan/jejuvegan-detail05.jpg",
      ],
      captions: [
        {
          title: "메인 페이지",
          text: "메뉴 검색 + 슬라이더 히어로로 진입하자마자 원하는 비건 맛집을 바로 탐색할 수 있도록 유도합니다. 비건 PICK·여행코스·지도 프리뷰·이메일 구독까지 사이트의 핵심 기능을 모두 메인에서 노출합니다.",
        },
        {
          title: "비건 지도",
          text: "Supabase 데이터베이스와 연동해 식당 정보를 동적으로 불러오는 구조로 구현했습니다. 영업 여부·인원·비건 정도·코스 등 다중 필터로 비건 스팟을 조건에 맞게 탐색할 수 있습니다.",
        },
        {
          title: "비건 PICK",
          text: "제주비건 팀이 직접 선정한 오늘의 추천 메뉴를 지역·비건 정도 필터와 함께 카드 형태로 소개합니다.",
        },
        {
          title: "비건 정보 제보하기",
          text: "사장님 직접 등록(4단계 폼)과 방문객 빠른 제보(간단 폼) 두 가지 경로를 분리해 누구나 쉽게 참여할 수 있도록 구성했습니다.",
        },
        {
          title: "자주 묻는 질문",
          text: "서비스 이용·가게 등록·맛집 제보·여행 정보 4개 카테고리와 키워드 검색을 결합해 원하는 답변을 빠르게 찾을 수 있도록 구성했습니다.",
        },
      ],
    },
    preview: {
      images: ["img/vegan-mockup01.jpg", "img/vegan-mockup02.jpg"],
    },
    sectionOrder: ["overview", "before-after", "planning", "color-typography", "publishing-detail", "preview"],
  },
  timo: {
    siteUrl: "https://timo-sigma-six.vercel.app/#login",
    githubUrl: "https://github.com/kaeunj/timo.git",
    badge: "TEAM PROJECT",
    badgeColor: "#6FE6C0",
    tag: "TEAM",
    titleLines: ["timo app"],
    info: [
      { label: "period", value: "1week" },
      { label: "role", value: "기획 · 디자인 · 퍼블리싱 / stitch ai, figma make, claude code" },
      { label: "TEAM", value: "3 Members" },
      { label: "tool", value: "Figma / HTML / CSS / JavaScript / SupaBase" },
    ],
    heroImg: "img/works-img02.jpg",
    overview:
      "프로젝트 팀원 매칭 서비스를 주제로 기획부터 구현까지 진행한 바이브 코딩 프로젝트입니다.\n성향 테스트 기반의 팀 매칭과 프로젝트 탐색 기능을 중심으로 서비스를 설계했으며,\n\nAI와 협업하여 모바일 애플리케이션을 구현했습니다. 기획부터 UI 설계, 프론트엔드, 백엔드 구현까지\n빠르게 반복하며, 서비스를 완성하는 바이브 코딩 프로세스를 경험하는 데 중점을 두었습니다.",
    colors: ["#7FFFD4", "#6FE6C0", "#202020", "#FEFFFF", "#EAEAEA", "#666666"],
    typographyFonts: [
      {
        fontClass: "is-scoredream",
        tagline: {
          bold: "티모에서 ",
          regular: "팀을 모아요  ",
          faded: "S-Core Dream",
        },
      },
      {
        fontClass: "is-pretendard",
        tagline: {
          bold: "팀을 찾고 싶다면, ",
          regular: '"티모에서 시작하세요"  ',
          faded: "Pretendard",
        },
      },
    ],
    wireframe: { base: "img/timo/Flow chart 1.jpg", hover: "img/timo/IA 1.jpg", contain: true },
    preview: {
      images: ["img/timo/timo-mockup01.jpg", "img/timo/timo-mockup02.jpg"],
    },
    sectionOrder: ["overview", "wireframe", "color-typography", "preview"],
  },
};

function buildDesignProcess(overlay, steps) {
  const flow = overlay.querySelector(".overlay-process-flow");
  if (!flow) return;

  flow.innerHTML = steps
    .map(
      (step, i) => `
        <div class="overlay-process-step">
          <div class="overlay-process-badge">
            <span class="overlay-process-badge-title">${step.title}</span>
            <span class="overlay-process-badge-sub">${step.sub}</span>
          </div>
          ${i < steps.length - 1 ? '<div class="overlay-process-arrow" aria-hidden="true"></div>' : ""}
        </div>`
    )
    .join("");
}

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
// - fade mode (wireframe.hover set, e.g. Arco): crossfade on hover (desktop) / auto (mobile)
// - scroll mode (wireframe.hover absent, e.g. Downy): scroll on hover (desktop) / auto (mobile)
const WIREFRAME_HINT_FADE = `
  <div class="overlay-wireframe-hint">
    <span class="overlay-wireframe-hint-icon" aria-hidden="true">
      <span></span><span></span><span></span>
    </span>
    <span>마우스 오버를 하면 와이어프레임이 전환됩니다</span>
  </div>`;

const WIREFRAME_HINT_SCROLL = `
  <div class="overlay-wireframe-hint">
    <span class="overlay-wireframe-hint-icon" aria-hidden="true">
      <span></span><span></span><span></span>
    </span>
    <span>마우스 오버시 와이어프레임이 아래로 움직입니다</span>
  </div>`;

function isMobileWireframe() {
  return window.matchMedia("(max-width: 768px)").matches;
}

function initWireframeHoverFade(frame) {
  frame.onmouseenter = () => frame.classList.add("is-hovered");
  frame.onmouseleave = () => frame.classList.remove("is-hovered");
}

function initWireframeHoverScroll(frame, wireframe) {
  const scroller = frame.querySelector(".overlay-wireframe-scroll");
  if (!scroller || typeof gsap === "undefined") return;

  const getScrollDistance = () => Math.max(scroller.scrollHeight - frame.offsetHeight, 0);

  frame.onmouseenter = () => {
    const distance = getScrollDistance();
    if (distance <= 0) return;
    const duration =
      (wireframe?.scrollDuration ?? Math.min(Math.max(distance / 60, 3), 14)) * 0.6;
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

function initWireframeAutoFade(frame) {
  if (frame._wireframeObserver) {
    frame._wireframeObserver.disconnect();
    frame._wireframeObserver = null;
  }

  frame.classList.add("is-auto-fade");
  frame.classList.remove("is-show-hover", "is-playing", "is-hovered");

  frame._wireframeObserver = new IntersectionObserver(
    ([entry]) => {
      frame.classList.toggle("is-playing", entry.isIntersecting);
      if (!entry.isIntersecting) frame.classList.remove("is-show-hover");
    },
    { threshold: 0.35 }
  );
  frame._wireframeObserver.observe(frame);
}

function initWireframeAutoScroll(frame, wireframe) {
  if (frame._wireframeObserver) {
    frame._wireframeObserver.disconnect();
    frame._wireframeObserver = null;
  }
  if (frame._wireframeTween) {
    frame._wireframeTween.kill();
    frame._wireframeTween = null;
  }

  const scroller = frame.querySelector(".overlay-wireframe-scroll");
  if (!scroller || typeof gsap === "undefined") return;

  frame.classList.add("is-auto-scroll");
  gsap.set(scroller, { y: 0 });

  const getScrollDistance = () => Math.max(scroller.scrollHeight - frame.offsetHeight, 0);

  const startScroll = () => {
    if (frame._wireframeTween) {
      frame._wireframeTween.kill();
      frame._wireframeTween = null;
    }

    const distance = getScrollDistance();
    if (distance <= 0) return;

    const duration =
      wireframe?.scrollDuration ?? Math.min(Math.max(distance / 60, 3), 14);

    frame._wireframeTween = gsap.to(scroller, {
      y: -distance,
      duration,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      repeatDelay: 0.8,
      overwrite: "auto",
    });
  };

  const stopScroll = () => {
    if (frame._wireframeTween) {
      frame._wireframeTween.kill();
      frame._wireframeTween = null;
    }
    gsap.to(scroller, { y: 0, duration: 0.6, ease: "sine.out", overwrite: "auto" });
  };

  frame._wireframeObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        const img = scroller.querySelector("img");
        if (img && !img.complete) {
          img.addEventListener("load", startScroll, { once: true });
        } else {
          startScroll();
        }
      } else {
        stopScroll();
      }
    },
    { threshold: 0.35 }
  );
  frame._wireframeObserver.observe(frame);
}

function resetWireframeFrame(frame) {
  if (frame._wireframeObserver) {
    frame._wireframeObserver.disconnect();
    frame._wireframeObserver = null;
  }
  if (frame._wireframeTween) {
    frame._wireframeTween.kill();
    frame._wireframeTween = null;
  }

  frame.classList.remove("is-hovered", "is-auto-fade", "is-auto-scroll", "is-playing", "is-show-hover");
  frame.onmouseenter = null;
  frame.onmouseleave = null;
}

function setWireframeImages(overlay, wireframe) {
  const frame = overlay.querySelector(".overlay-wireframe-frame");
  if (!frame) return;

  resetWireframeFrame(frame);
  const mobile = isMobileWireframe();

  if (wireframe?.hover) {
    const containClass = wireframe.contain ? " is-contain" : "";
    frame.innerHTML = `
      <img class="overlay-wireframe-fade-img is-base${containClass}" src="${wireframe.base}" alt="" />
      <img class="overlay-wireframe-fade-img is-hover${containClass}" src="${wireframe.hover}" alt="" />
      ${mobile ? "" : WIREFRAME_HINT_FADE}
    `;
    if (mobile) {
      initWireframeAutoFade(frame);
    } else {
      initWireframeHoverFade(frame);
    }
    return;
  }

  const scrollImgStyle = wireframe?.width ? ` style="width:${wireframe.width};"` : "";
  frame.innerHTML = `
    <div class="overlay-wireframe-scroll">
      <img class="overlay-wireframe-scroll-img" src="${wireframe?.base || ""}"${scrollImgStyle} alt="" />
    </div>
    ${mobile ? "" : WIREFRAME_HINT_SCROLL}
  `;

  if (mobile) {
    initWireframeAutoScroll(frame, wireframe);
  } else {
    initWireframeHoverScroll(frame, wireframe);
  }
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
  overlay.querySelector(".overlay-hero-nav-prev").addEventListener("click", () => {
    const sibling = getSiblingProjectCard(Number(overlay.dataset.currentCardId), -1);
    if (sibling) openProjectOverlay(sibling);
  });
  overlay.querySelector(".overlay-hero-nav-next").addEventListener("click", () => {
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

  const skillsEl = overlay.querySelector(".overlay-overview-skills");
  if (skillsEl) {
    if (details?.overviewSkills?.length) {
      const skills = details.overviewSkills;
      skillsEl.innerHTML = skills
        .map((skill, i) => {
          const isLast = i === skills.length - 1;
          return isLast
            ? `<span class="overlay-overview-skill-label">${skill}</span>`
            : `<span class="overlay-overview-skill-item">
                 <span class="overlay-overview-skill-label">${skill}</span>
                 <span class="overlay-overview-skill-line" aria-hidden="true"></span>
               </span>`;
        })
        .join("");
      skillsEl.style.display = "";
    } else {
      skillsEl.style.display = "none";
    }
  }

  setOverlaySectionVisible(overlay, "before-after", Boolean(details?.beforeImg && details?.afterImg));
  overlay.querySelector(".overlay-before-img").src = details?.beforeImg || "";
  overlay.querySelector(".overlay-after-img").src = details?.afterImg || "";

  setOverlaySectionVisible(overlay, "color-typography", Boolean(details?.colors || details?.typographyFonts));
  const colorList = overlay.querySelector(".overlay-color-list");
  colorList.innerHTML = (details?.colors || [])
    .map(
      (hex) =>
        `<li><span class="overlay-color-swatch" style="background-color:${hex}"></span><span class="overlay-color-hex">${hex}</span></li>`
    )
    .join("");

  const typoEl = overlay.querySelector(".overlay-typography");
  if (details?.typographyFonts?.length) {
    typoEl.className = "overlay-typography";
    typoEl.innerHTML = details.typographyFonts
      .map((font) => {
        const taglineHtml = font.tagline
          ? `<p class="overlay-typo-tagline"><strong>${font.tagline.bold}</strong>${font.tagline.regular}<span>${font.tagline.faded}</span></p>`
          : "";
        return `<div class="overlay-typo-block ${font.fontClass || ""}">
          <p class="overlay-typo-aa">Aa</p>
          <p class="overlay-typo-chars">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />1234567890<br /><span class="overlay-typo-bold">Bold</span><br /><span class="overlay-typo-medium">Medium</span><br /><span class="overlay-typo-regular">Regular</span></p>
          ${taglineHtml}
        </div>`;
      })
      .join("");
  } else {
    typoEl.innerHTML = `<p class="overlay-typo-aa">Aa</p>
      <p class="overlay-typo-chars">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
        1234567890<br />
        <span class="overlay-typo-bold">Bold</span><br />
        <span class="overlay-typo-medium">Medium</span><br />
        <span class="overlay-typo-regular">Regular</span>
      </p>
      <p class="overlay-typo-tagline"></p>`;
    const tagline = typoEl.querySelector(".overlay-typo-tagline");
    if (details?.typographyTagline) {
      const { bold, regular, faded } = details.typographyTagline;
      tagline.innerHTML = `<strong>${bold}</strong>${regular}<span>${faded}</span>`;
    }
    typoEl.classList.toggle("is-pretendard", details?.typographyFont === "pretendard");
  }

  setOverlaySectionVisible(overlay, "wireframe", Boolean(details?.wireframe?.base));
  setWireframeImages(overlay, details?.wireframe);

  setOverlaySectionVisible(overlay, "planning", Boolean(details?.planning?.length));
  buildPlanningSlides(overlay, details?.planning || []);

  setOverlaySectionVisible(overlay, "final-design", Boolean(details?.finalDesignImg));
  overlay.querySelector(".overlay-final-design-img").src = details?.finalDesignImg || "";

  setOverlaySectionVisible(overlay, "design-process", Boolean(details?.designProcess?.length));
  buildDesignProcess(overlay, details?.designProcess || []);

  overlay.dataset.projectId = id;
  setOverlaySectionVisible(overlay, "design-detail", Boolean(details?.designDetails?.length));
  buildDesignDetailSlides(overlay, details?.designDetails || [], details?.designDetailMode || "track");

  // Storyboard
  if (storyboardSwiper) {
    storyboardSwiper.destroy(true, true);
    storyboardSwiper = null;
  }
  setOverlaySectionVisible(overlay, "storyboard", Boolean(details?.storyboard));
  if (details?.storyboard) buildStoryboardSlider(overlay, details.storyboard);

  // Publishing Detail
  setOverlaySectionVisible(overlay, "publishing-detail", Boolean(details?.publishingDetail));
  if (details?.publishingDetail) buildPublishingDetail(overlay, details.publishingDetail);

  // Preview
  setOverlaySectionVisible(overlay, "preview", Boolean(details?.preview?.images?.length));
  if (details?.preview?.images?.length) buildPreviewSection(overlay, details.preview);

  applySectionOrder(overlay, details?.sectionOrder);

  const cards = getAllProjectCards();
  const cardIndex = cards.indexOf(card);
  overlay.dataset.currentCardId = String(cardIndex);
  const prevCard = getSiblingProjectCard(cardIndex, -1);
  const nextCard = getSiblingProjectCard(cardIndex, 1);
  fillFooterProject(overlay.querySelector(".overlay-footer-prev"), prevCard);
  fillFooterProject(overlay.querySelector(".overlay-footer-next"), nextCard);

  // Badge: show/hide based on project data; fallback (no details) keeps HTML text
  const badge = overlay.querySelector(".overlay-hero-badge");
  if (badge) {
    if (details?.badge) {
      badge.textContent = details.badge;
      badge.style.color = details.badgeColor || "";
      badge.style.display = "";
    } else if (details) {
      badge.style.display = "none";
    } else {
      badge.style.color = "";
      badge.style.display = "";
    }
  }

  // Hero nav: show/hide arrows + per-project color
  const heroNavPrev = overlay.querySelector(".overlay-hero-nav-prev");
  const heroNavNext = overlay.querySelector(".overlay-hero-nav-next");
  if (heroNavPrev) heroNavPrev.classList.toggle("is-hidden", !prevCard);
  if (heroNavNext) heroNavNext.classList.toggle("is-hidden", !nextCard);
  const navColor = details?.heroNavColor || "";
  [heroNavPrev, heroNavNext].forEach((btn) => {
    if (!btn) return;
    btn.style.color = navColor;
    btn.style.borderColor = navColor;
  });

  overlay.scrollTop = 0;
  overlay.querySelector(".overlay-detail-slider").dataset.index = "0";
  document.body.style.overflow = "hidden";
  if (typeof setGoTopSuppressed === "function") setGoTopSuppressed(true);

  initWorksViewAnimation(overlay);

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

// --- Storyboard Slider ---

let storyboardSwiper = null;

function buildStoryboardSlider(overlay, storyboard) {
  const section = overlay.querySelector('[data-section="storyboard"]');
  if (!section) return;

  if (storyboardSwiper) {
    storyboardSwiper.destroy(true, true);
    storyboardSwiper = null;
  }

  const swiperEl = section.querySelector(".overlay-storyboard-swiper");
  const wrapper = swiperEl.querySelector(".swiper-wrapper");
  const images = storyboard.images || [];
  const figmaUrl = storyboard.figmaUrl || "";

  const hintMarkup = `<span class="overlay-storyboard-figma-hint" aria-hidden="true">
       <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
         <rect x="0" y="0" width="7" height="7" rx="1"/><rect x="9" y="0" width="7" height="7" rx="1"/>
         <rect x="0" y="9" width="7" height="7" rx="1"/><rect x="9" y="9" width="7" height="7" rx="1"/>
       </svg>
       이미지 클릭시 피그마 슬라이드로 이동합니다.
     </span>`;

  wrapper.innerHTML = images
    .map((src, i) => {
      const img = `<img class="overlay-storyboard-img" src="${src}" alt="Storyboard ${i + 1}" loading="lazy" />`;
      const inner = figmaUrl
        ? `<a class="overlay-storyboard-slide-link" href="${figmaUrl}" target="_blank" rel="noopener">${img}${hintMarkup}</a>`
        : `<div class="overlay-storyboard-slide-link">${img}${hintMarkup}</div>`;
      return `<div class="swiper-slide overlay-storyboard-slide">
                <div class="overlay-storyboard-slide-img-wrap">${inner}</div>
              </div>`;
    })
    .join("");

  if (typeof Swiper === "undefined" || !images.length) return;

  storyboardSwiper = new Swiper(swiperEl, {
    effect: "fade",
    fadeEffect: { crossFade: true },
    loop: true,
    autoplay: {
      delay: 3800,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: {
      prevEl: section.querySelector(".overlay-storyboard-prev"),
      nextEl: section.querySelector(".overlay-storyboard-next"),
    },
    pagination: {
      el: section.querySelector(".overlay-storyboard-pagination"),
      clickable: true,
    },
  });
}

// --- Publishing Detail ---

function buildPublishingDetail(overlay, data) {
  const section = overlay.querySelector('[data-section="publishing-detail"]');
  if (!section) return;

  const tabsEl = section.querySelector(".overlay-pub-tabs");
  const imgEl = section.querySelector(".overlay-pub-img");
  const captionEl = section.querySelector(".overlay-pub-caption");
  const counterCur = section.querySelector(".overlay-pub-counter-cur");
  const counterTot = section.querySelector(".overlay-pub-counter-tot");

  const tabs = data.tabs || [];
  const images = data.images || [];
  const captions = data.captions || [];

  if (counterTot) counterTot.textContent = String(tabs.length).padStart(2, "0");

  tabsEl.innerHTML = tabs
    .map(
      (tab, i) =>
        `<button class="overlay-pub-tab${i === 0 ? " is-active" : ""}" type="button" data-index="${i}">${tab.label}</button>`
    )
    .join("");

  function goTo(index, animate) {
    section._pubIndex = index;

    if (counterCur) counterCur.textContent = String(index + 1).padStart(2, "0");

    tabsEl.querySelectorAll(".overlay-pub-tab").forEach((btn, i) => {
      btn.classList.toggle("is-active", i === index);
    });

    const caption = captions[index];
    if (captionEl) {
      if (caption && typeof caption === "object") {
        captionEl.innerHTML = `<strong class="overlay-pub-caption-title">${caption.title}</strong>${caption.text}`;
      } else {
        captionEl.textContent = caption || "";
      }
    }

    if (animate) {
      imgEl.classList.remove("is-visible");
      setTimeout(() => {
        imgEl.src = images[index] || "";
        imgEl.onload = () => imgEl.classList.add("is-visible");
        if (!images[index]) imgEl.classList.add("is-visible");
      }, 280);
    } else {
      imgEl.src = images[index] || "";
      requestAnimationFrame(() => imgEl.classList.add("is-visible"));
    }
  }

  // Always update the live reference so existing listeners use current project's data
  section._pubGoTo = goTo;

  section._pubIndex = 0;
  goTo(0, false);

  // Use setup flag to avoid stacking listeners
  if (!section.dataset.pubReady) {
    section.dataset.pubReady = "1";

    tabsEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".overlay-pub-tab");
      if (!btn) return;
      section._pubGoTo(parseInt(btn.dataset.index, 10), true);
    });

    section.querySelector(".overlay-pub-arr--prev").addEventListener("click", () => {
      const total = section.querySelectorAll(".overlay-pub-tab").length;
      section._pubGoTo(((section._pubIndex || 0) - 1 + total) % total, true);
    });

    section.querySelector(".overlay-pub-arr--next").addEventListener("click", () => {
      const total = section.querySelectorAll(".overlay-pub-tab").length;
      section._pubGoTo(((section._pubIndex || 0) + 1) % total, true);
    });
  }
}

function buildPreviewSection(overlay, data) {
  const section = overlay.querySelector('[data-section="preview"]');
  if (!section) return;

  const items = section.querySelectorAll(".overlay-preview-item");
  const imgs = section.querySelectorAll(".overlay-preview-img");
  const images = data.images || [];

  imgs.forEach((img, i) => {
    img.src = images[i] || "";
  });

  items.forEach((item, i) => {
    item.style.display = i < images.length ? "" : "none";
  });
}

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

  const slideMarkup = (slide) => overlay.dataset.projectId === "downy"
    ? `<div class="overlay-detail-slide">
          ${slide.img ? `<img class="overlay-detail-img" src="${slide.img}" alt="${slide.tag}" />` : ""}
          <div class="overlay-detail-content">
            <span class="overlay-detail-tag">${slide.tag}</span>
            <p class="overlay-detail-desc">${slide.desc}</p>
          </div>
        </div>`
    : `<div class="overlay-detail-slide">
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
      if (typeof setGoTopSuppressed === "function") setGoTopSuppressed(false);
      killWorksViewAnimation();
    },
  });
}

function getAllArchiveCards() {
  return [...document.querySelectorAll(".archive-card")];
}

function getSiblingArchiveCard(index, direction) {
  const cards = getAllArchiveCards();
  return cards[index + direction] || null;
}

function initArchiveOverlay() {
  const overlay = document.querySelector(".archive-overlay");
  if (!overlay || typeof gsap === "undefined") return;

  gsap.set(overlay, { yPercent: 100 });
  overlay.querySelector(".archive-overlay-close").addEventListener("click", closeArchiveOverlay);

  overlay.querySelector(".archive-overlay-nav-prev").addEventListener("click", () => {
    const sibling = getSiblingArchiveCard(Number(overlay.dataset.currentCardId), -1);
    if (sibling) openArchiveOverlay(sibling);
  });

  overlay.querySelector(".archive-overlay-nav-next").addEventListener("click", () => {
    const sibling = getSiblingArchiveCard(Number(overlay.dataset.currentCardId), 1);
    if (sibling) openArchiveOverlay(sibling);
  });

  document.querySelectorAll(".archive-card").forEach((card) => {
    card.addEventListener("click", () => openArchiveOverlay(card));
  });
}

function openArchiveOverlay(card) {
  const overlay = document.querySelector(".archive-overlay");
  if (!overlay || typeof gsap === "undefined") return;

  const thumb = card.dataset.thumb || "";
  const galleryBase = thumb.replace(/\.webp$/, "");
  const heroSvgPath = card.dataset.heroSvg || "";

  const heroImgEl = overlay.querySelector(".archive-overlay-hero-img");
  const svgHeroEl = overlay.querySelector(".archive-overlay-svg-hero");

  if (heroSvgPath && svgHeroEl) {
    heroImgEl.style.display = "none";
    heroImgEl.src = "";
    svgHeroEl.style.display = "flex";
    svgHeroEl.innerHTML = "";
    fetch(heroSvgPath)
      .then((r) => r.text())
      .then((svgText) => {
        svgHeroEl.innerHTML = svgText.replace(/#151515/g, "#f4f8ff");
      })
      .catch(() => {
        svgHeroEl.style.display = "none";
        heroImgEl.style.display = "";
        heroImgEl.src = thumb;
      });
  } else {
    if (svgHeroEl) {
      svgHeroEl.style.display = "none";
      svgHeroEl.innerHTML = "";
    }
    heroImgEl.style.display = "";
    heroImgEl.src = thumb;
  }

  const titleEl = overlay.querySelector(".archive-overlay-title");
  titleEl.textContent = card.dataset.name || "";
  titleEl.style.color = card.dataset.titleColor || "";
  titleEl.style.textShadow = card.dataset.titleShadow === "true"
    ? "0 2px 12px rgba(0,0,0,0.45), 0 1px 4px rgba(0,0,0,0.3)"
    : "";

  const archiveBadge = overlay.querySelector(".archive-overlay-badge");
  if (archiveBadge) {
    archiveBadge.style.display = card.dataset.hideBadge === "true" ? "none" : "";
  }

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

  const customGalleryImages = card.dataset.galleryImages ? card.dataset.galleryImages.split(",") : null;
  overlay.querySelectorAll(".archive-overlay-gallery-img").forEach((img, index) => {
    img.src = customGalleryImages ? (customGalleryImages[index] || "") : `${galleryBase}-${index + 1}.webp`;
  });

  const processSection = overlay.querySelector(".archive-overlay-process");
  if (processSection) {
    const processImages = card.dataset.processImages ? card.dataset.processImages.split(",") : [];
    const processCaptions = card.dataset.processCaptions ? card.dataset.processCaptions.split(",") : [];
    if (processImages.length) {
      processSection.querySelectorAll(".archive-overlay-process-img").forEach((img, i) => {
        img.src = processImages[i] || "";
      });
      processSection.querySelectorAll(".archive-overlay-process-caption").forEach((cap, i) => {
        cap.textContent = processCaptions[i] || "";
      });
      processSection.style.display = "block";
    } else {
      processSection.style.display = "none";
    }
  }

  const cards = getAllArchiveCards();
  const cardIndex = cards.indexOf(card);
  overlay.dataset.currentCardId = String(cardIndex);

  const prevBtn = overlay.querySelector(".archive-overlay-nav-prev");
  const nextBtn = overlay.querySelector(".archive-overlay-nav-next");
  if (prevBtn) prevBtn.classList.toggle("is-hidden", !getSiblingArchiveCard(cardIndex, -1));
  if (nextBtn) nextBtn.classList.toggle("is-hidden", !getSiblingArchiveCard(cardIndex, 1));

  if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();

  overlay.scrollTop = 0;
  document.body.style.overflow = "hidden";
  if (typeof setGoTopSuppressed === "function") setGoTopSuppressed(true);

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
      if (typeof setGoTopSuppressed === "function") setGoTopSuppressed(false);
    },
  });
}

function initHeroIntroAnimation() {
  const designer = document.querySelector(".hero-designer");
  const ampersand = document.querySelector(".hero-ampersand");
  const publisher = document.querySelector(".hero-publisher");
  const titleEl = document.querySelector(".main-title");
  // Animate the WRAP, not the label — the label has CSS transform:rotate(-90deg)
  // which GSAP would overwrite (losing rotation) if we applied y on it directly.
  const portfolioWrap = document.querySelector(".main-portfolio-wrap");
  const header = document.querySelector(".main-header");
  const scrollEl = document.querySelector(".main-scroll");

  if (!designer || !ampersand || !publisher || !titleEl || !portfolioWrap) return;

  gsap.set(titleEl, { opacity: 0, y: 60, filter: "blur(18px)" });

  // --- 초기 숨김 상태 ---
  gsap.set([designer, publisher], { opacity: 0, y: 50, filter: "blur(12px)" });
  gsap.set(ampersand, { opacity: 0, scale: 0.8 });
  gsap.set(portfolioWrap, { opacity: 0 });
  if (header) gsap.set(header, { opacity: 0 });
  if (scrollEl) gsap.set(scrollEl, { opacity: 0 });

  const tl = gsap.timeline();

  // 1. UI/UX DESIGNER
  tl.to(designer, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, ease: "power3.out" });

  // 2. & — 0.05s gap
  tl.to(ampersand, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }, "+=0.05");

  // 3. WEB PUBLISHER — 0.05s gap
  tl.to(publisher, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, ease: "power3.out" }, "+=0.05");

  // 4. INSEO — 0.1s gap
  tl.addLabel("inseo", "+=0.1");
  tl.to(titleEl, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "expo.out" }, "inseo");

  // 5. portfolio — 0.15s after INSEO 완료 (y는 쓰지 않음 — 부모 wrap에 transform 없어야 label의 CSS rotate 유지됨)
  tl.to(portfolioWrap, { opacity: 1, duration: 0.5, ease: "power3.out" }, ">+0.15");

  // navigation
  if (header) {
    tl.to(header, { opacity: 1, duration: 0.5, ease: "power2.out" }, ">+0.1");
  }

  // scroll indicator → bounce 루프 시작
  if (scrollEl) {
    tl.to(scrollEl, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
      onComplete: initMainScrollBounce,
    }, header ? "<+0.1" : ">+0.1");
  }
}

document.addEventListener("intro:complete", initHeroIntroAnimation);

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
    ...overlay.querySelectorAll(".archive-overlay-process-step"),
    ...overlay.querySelectorAll(".archive-overlay-process-arrow"),
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

// ─── Archive Gallery Reveal Animation ─────────────────────────────────────────

function initArchiveReveal() {
  const grid = document.querySelector(".archive-grid");
  if (!grid || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  const cards = [...grid.querySelectorAll(".archive-card")];
  if (!cards.length) return;

  // Detect which CSS column each card is in by comparing rendered left offsets
  function buildColumnBoundaries() {
    const bounds = [];
    cards.forEach((card) => {
      const x = card.getBoundingClientRect().left;
      if (!bounds.some((b) => Math.abs(b - x) < 30)) bounds.push(x);
    });
    return bounds.sort((a, b) => a - b);
  }

  const colBounds = buildColumnBoundaries();

  const colOf = (card) => {
    const x = card.getBoundingClientRect().left;
    return colBounds.findIndex((b) => Math.abs(b - x) < 30);
  };

  const colCounts = {};

  cards.forEach((card) => {
    const col = colOf(card);
    if (colCounts[col] === undefined) colCounts[col] = 0;
    const cardInCol = colCounts[col]++;

    // Column delay: left→center→right, plus per-card stagger within column
    const delay = col * 0.10 + cardInCol * 0.08;

    gsap.fromTo(
      card,
      { opacity: 0, y: 40, filter: "blur(12px)", scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        scale: 1,
        duration: 0.9,
        ease: "power3.out",
        delay,
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "top 40%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
}

document.addEventListener("DOMContentLoaded", initArchiveReveal);

// ─── Works View Page (Overlay) Animation Module ───────────────────────────────

let _worksCtx = null;

const _WV = {
  ease: "power3.out",
  dur: 0.8,
  start: "top 88%",
  actions: "play none none none",
};

function _wvST(trigger, scroller) {
  return { trigger, scroller, start: _WV.start, toggleActions: _WV.actions };
}

function _wvTargets(targets) {
  return Array.isArray(targets) ? targets.filter(Boolean) : targets;
}

function _wvFirst(targets) {
  return Array.isArray(targets) ? targets.find(Boolean) : targets;
}

function wvRevealUp(targets, scroller, stagger) {
  const t = _wvTargets(targets);
  const f = _wvFirst(t);
  if (!f) return;
  return gsap.fromTo(t,
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: _WV.dur, ease: _WV.ease, stagger: stagger || 0, scrollTrigger: _wvST(f, scroller) }
  );
}

function wvRevealLeft(targets, scroller, stagger) {
  if (window.matchMedia("(max-width: 768px)").matches) {
    return wvRevealUp(targets, scroller, stagger);
  }

  const t = _wvTargets(targets);
  const f = _wvFirst(t);
  if (!f) return;
  return gsap.fromTo(t,
    { opacity: 0, x: -60 },
    { opacity: 1, x: 0, duration: _WV.dur, ease: _WV.ease, stagger: stagger || 0, scrollTrigger: _wvST(f, scroller) }
  );
}

function wvRevealRight(targets, scroller, stagger) {
  if (window.matchMedia("(max-width: 768px)").matches) {
    return wvRevealUp(targets, scroller, stagger);
  }

  const t = _wvTargets(targets);
  const f = _wvFirst(t);
  if (!f) return;
  return gsap.fromTo(t,
    { opacity: 0, x: 60 },
    { opacity: 1, x: 0, duration: _WV.dur, ease: _WV.ease, stagger: stagger || 0, scrollTrigger: _wvST(f, scroller) }
  );
}

function wvRevealDown(targets, scroller, stagger) {
  const t = _wvTargets(targets);
  const f = _wvFirst(t);
  if (!f) return;
  return gsap.fromTo(t,
    { opacity: 0, y: -50 },
    { opacity: 1, y: 0, duration: _WV.dur, ease: _WV.ease, stagger: stagger || 0, scrollTrigger: _wvST(f, scroller) }
  );
}

function wvRevealFade(targets, scroller, stagger) {
  const t = _wvTargets(targets);
  const f = _wvFirst(t);
  if (!f) return;
  return gsap.fromTo(t,
    { opacity: 0 },
    { opacity: 1, duration: _WV.dur, ease: _WV.ease, stagger: stagger || 0, scrollTrigger: _wvST(f, scroller) }
  );
}

function wvRevealZoomIn(targets, scroller, stagger) {
  const t = _wvTargets(targets);
  const f = _wvFirst(t);
  if (!f) return;
  return gsap.fromTo(t,
    { opacity: 0, scale: 0.95 },
    { opacity: 1, scale: 1, duration: _WV.dur, ease: _WV.ease, stagger: stagger || 0, scrollTrigger: _wvST(f, scroller) }
  );
}

// Parallax: translateY on el relative to overlay scroller
function wvParallax(el, scroller, yAmount) {
  if (!el) return;
  gsap.set(el, { willChange: "transform" });
  return gsap.fromTo(el,
    { y: 0 },
    { y: yAmount || 25, ease: "none",
      scrollTrigger: { trigger: el, scroller, start: "top bottom", end: "bottom top", scrub: 1 } }
  );
}

// Parallax: scale 0.98→1 for large images
function wvScaleParallax(el, scroller) {
  if (!el) return;
  gsap.set(el, { willChange: "transform" });
  return gsap.fromTo(el,
    { scale: 0.98 },
    { scale: 1, ease: "none",
      scrollTrigger: { trigger: el, scroller, start: "top 90%", end: "top 20%", scrub: 1 } }
  );
}

function _wvSectionOn(overlay, key) {
  const el = overlay.querySelector(`[data-section="${key}"]`);
  return el && el.style.display !== "none";
}

function initWorksViewAnimation(overlay) {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);

  if (_worksCtx) {
    _worksCtx.revert();
    _worksCtx = null;
  }

  const scroller = overlay;
  if (!scroller) return;

  _worksCtx = gsap.context(() => {

    // ── Hero: entrance (every open, ScrollTrigger) ───────────────────
    {
      const badge   = overlay.querySelector(".overlay-hero-badge");
      const tag     = overlay.querySelector(".overlay-hero-tag");
      const title   = overlay.querySelector(".overlay-hero-title");
      const infos   = [...overlay.querySelectorAll(".overlay-hero-info li")];
      const actions = overlay.querySelector(".overlay-hero-actions");

      const heroST = (el) => ({ trigger: el, scroller, start: "top bottom", toggleActions: _WV.actions });

      const badgeTag = [badge, tag].filter(Boolean);
      if (badgeTag.length) {
        gsap.fromTo(badgeTag,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: _WV.ease, stagger: 0.1, delay: 0.35, scrollTrigger: heroST(badgeTag[0]) }
        );
      }
      if (title) {
        gsap.fromTo(title,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9, ease: _WV.ease, delay: 0.5, scrollTrigger: heroST(title) }
        );
      }
      const infoActions = [...infos, actions].filter(Boolean);
      if (infoActions.length) {
        gsap.fromTo(infoActions,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.7, ease: _WV.ease, stagger: 0.08, delay: 0.65, scrollTrigger: heroST(infoActions[0]) }
        );
      }
    }

    // ── Hero image parallax ──────────────────────────────────────────
    const heroMedia = overlay.querySelector(".overlay-hero-media");
    const heroSec   = overlay.querySelector(".overlay-hero");
    if (heroMedia && heroSec) {
      gsap.set(heroMedia, { willChange: "transform" });
      gsap.fromTo(heroMedia, { y: 0 }, {
        y: 30, ease: "none",
        scrollTrigger: { trigger: heroSec, scroller, start: "top top", end: "bottom top", scrub: 1 }
      });
    }

    // ── Overview ─────────────────────────────────────────────────────
    if (_wvSectionOn(overlay, "overview")) {
      const sec = overlay.querySelector(".overlay-overview");
      wvRevealDown(sec.querySelector(".overlay-label"), scroller);
      wvRevealRight(sec.querySelector(".overlay-overview-text"), scroller);
      const skills = sec.querySelector(".overlay-overview-skills");
      if (skills && skills.children.length) wvRevealUp([...skills.children], scroller, 0.1);
    }

    // ── Before & After ────────────────────────────────────────────────
    if (_wvSectionOn(overlay, "before-after")) {
      const sec = overlay.querySelector(".overlay-before-after");
      wvRevealDown(sec.querySelector(".overlay-label"), scroller);
      const cols = [...sec.querySelectorAll(".overlay-before-after-col")];
      if (cols[0]) wvRevealLeft([cols[0]], scroller);
      if (cols[1]) wvRevealRight([cols[1]], scroller);
      cols.forEach((col) => {
        col.addEventListener("mouseenter", () =>
          gsap.to(col, { scale: 1.03, duration: 0.5, ease: "power2.out", overwrite: "auto" })
        );
        col.addEventListener("mouseleave", () =>
          gsap.to(col, { scale: 1, duration: 0.5, ease: "power2.out", overwrite: "auto" })
        );
      });
    }

    // ── Planning ──────────────────────────────────────────────────────
    if (_wvSectionOn(overlay, "planning")) {
      const sec = overlay.querySelector(".overlay-planning");
      wvRevealLeft(sec.querySelector(".overlay-label"), scroller);
      wvRevealUp(sec.querySelector(".overlay-planning-frame"), scroller);
    }

    // ── Wireframe ─────────────────────────────────────────────────────
    if (_wvSectionOn(overlay, "wireframe")) {
      const sec = overlay.querySelector(".overlay-wireframe");
      wvRevealRight(sec.querySelector(".overlay-label"), scroller);
      const frame = sec.querySelector(".overlay-wireframe-frame");
      wvRevealZoomIn(frame, scroller);
      wvParallax(frame, scroller, 15);
    }

    // ── Color & Typography ────────────────────────────────────────────
    if (_wvSectionOn(overlay, "color-typography")) {
      const sec = overlay.querySelector(".overlay-color-type");
      wvRevealDown(sec.querySelector(".overlay-label"), scroller);
      const colorItems = [...sec.querySelectorAll(".overlay-color-list li")];
      if (colorItems.length) wvRevealLeft(colorItems, scroller, 0.08);
      wvRevealRight(sec.querySelector(".overlay-typography"), scroller);
    }

    // ── Design Process ────────────────────────────────────────────────
    if (_wvSectionOn(overlay, "design-process")) {
      const sec = overlay.querySelector(".overlay-design-process");
      wvRevealLeft(sec.querySelector(".overlay-label"), scroller);
      const steps = [...sec.querySelectorAll(".overlay-process-step")];
      if (steps.length) wvRevealUp(steps, scroller, 0.12);
    }

    // ── Storyboard ────────────────────────────────────────────────────
    if (_wvSectionOn(overlay, "storyboard")) {
      const sec = overlay.querySelector(".overlay-storyboard");
      wvRevealRight(sec.querySelector(".overlay-label"), scroller);
      wvRevealZoomIn(sec.querySelector(".overlay-storyboard-wrap"), scroller);
    }

    // ── Publishing Detail ─────────────────────────────────────────────
    if (_wvSectionOn(overlay, "publishing-detail")) {
      const sec = overlay.querySelector(".overlay-pub-detail");
      wvRevealDown(sec.querySelector(".overlay-label"), scroller);
      const tabs = [...sec.querySelectorAll(".overlay-pub-tab")];
      if (tabs.length) wvRevealLeft(tabs, scroller, 0.06);
      wvRevealRight(sec.querySelector(".overlay-pub-body"), scroller);
    }

    // ── Preview ───────────────────────────────────────────────────────
    if (_wvSectionOn(overlay, "preview")) {
      const sec   = overlay.querySelector(".overlay-preview");
      const items = [...sec.querySelectorAll(".overlay-preview-item")]
        .filter((el) => el.style.display !== "none");

      wvRevealLeft(sec.querySelector(".overlay-label"), scroller);

      items.forEach((item, i) => {
        // 홀수: 왼쪽, 짝수: 오른쪽에서 등장
        const revealFn = i % 2 === 0 ? wvRevealLeft : wvRevealRight;
        revealFn([item], scroller);
        gsap.set(item, { willChange: "transform" });
        wvParallax(item, scroller, 20);
        item.addEventListener("mouseenter", () =>
          gsap.to(item, { scale: 1.03, duration: 0.5, ease: "power2.out", overwrite: "auto" })
        );
        item.addEventListener("mouseleave", () =>
          gsap.to(item, { scale: 1, duration: 0.5, ease: "power2.out", overwrite: "auto" })
        );
      });
    }

    // ── Design Detail ─────────────────────────────────────────────────
    if (_wvSectionOn(overlay, "design-detail")) {
      const sec = overlay.querySelector(".overlay-design-detail");
      wvRevealRight(sec.querySelector(".overlay-label"), scroller);
      wvRevealZoomIn(sec.querySelector(".overlay-detail-slider"), scroller);
    }

    // ── Bottom actions + Footer ───────────────────────────────────────
    wvRevealUp(overlay.querySelector(".overlay-bottom-actions"), scroller);
    wvRevealDown(overlay.querySelector(".overlay-footer-nav"), scroller);

    ScrollTrigger.refresh();

  }, overlay);
}

function killWorksViewAnimation() {
  if (_worksCtx) {
    _worksCtx.revert();
    _worksCtx = null;
  }
}
