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
      "기존 다우니 웹사이트는 브랜드 아이덴티티 없이 단순 마크업 수준에 머물러 있었습니다.\n레이아웃 구조를 전면 재설계하고, 다우니 고유의 부드럽고 청결한 브랜드 이미지를\n\n시각적으로 일관성 있게 구현하는 것에 중점을 두었습니다.\n사용자가 브랜드를 자연스럽게 경험할 수 있도록 정보 흐름과 시각 위계를 함께 고려했습니다.",
    beforeImg: "img/기존사이트 캡쳐.png",
    afterImg: "img/downy-mockup copy.jpg",
    colors: ["#12284B", "#0055A0", "#252525", "#FFFFFF"],
    typographyTagline: {
      bold: "다우니, ",
      regular: "부드러운 향기 오래도록  ",
      faded: "NanumSquare Neo OTF",
    },
    wireframeImg: "img/downy-wireframe.webp",
    designDetails: [
      {
        tag: "HERO BANNER",
        img: "img/downy-mockup copy.jpg",
        desc:
          "브랜드의 첫인상을 결정하는 구간으로, 자연광과 플로럴 소재를 활용한 이미지와 대형 타이포그래피를 조합해 다우니 고유의 프리미엄 감성을 시각적으로 전달했습니다. CTA 버튼 배치를 통해 사용자의 시선 흐름과 행동을 자연스럽게 유도했습니다.",
      },
      {
        tag: "FEATURE ICON SECTION",
        img: "",
        desc:
          "다우니의 핵심 제품 특징을 아이콘과 함께 시각화한 섹션입니다. 일관된 아이콘 스타일과 명확한 텍스트 위계를 통해 정보를 빠르게 인지할 수 있도록 구성하고, 브랜드 컬러를 절제해 사용해 깔끔하고 신뢰감 있는 인상을 유지했습니다.",
      },
      {
        tag: "CARD GRID",
        img: "",
        desc:
          "제품을 일관성 있게 탐색할 수 있도록 카드형 레이아웃을 적용했습니다. BEST 뱃지와 View all 링크로 정보 위계를 명확히 하고, 그리드 정렬과 여백을 통해 시각적 피로감 없이 다수의 제품을 자연스럽게 노출할 수 있도록 했습니다.",
      },
    ],
  },
};

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

  initWireframeHoverScroll(overlay);
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

  const figmaLinks = overlay.querySelectorAll(".overlay-hero-figma, .overlay-bottom-figma");
  figmaLinks.forEach((link) => {
    link.href = details?.figmaUrl || "#";
    link.style.display = details?.figmaUrl ? "" : "none";
  });

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

  setOverlaySectionVisible(overlay, "wireframe", Boolean(details?.wireframeImg));
  overlay.querySelector(".overlay-wireframe-img").src = details?.wireframeImg || "";

  setOverlaySectionVisible(overlay, "design-detail", Boolean(details?.designDetails?.length));
  buildDesignDetailSlides(overlay, details?.designDetails || []);

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

function buildDesignDetailSlides(overlay, slides) {
  const track = overlay.querySelector(".overlay-detail-track");
  track.innerHTML = slides
    .map(
      (slide) => `
        <div class="overlay-detail-slide">
          <span class="overlay-detail-tag">${slide.tag}</span>
          ${slide.img ? `<img class="overlay-detail-img" src="${slide.img}" alt="${slide.tag}" />` : ""}
          <p class="overlay-detail-desc">${slide.desc}</p>
        </div>`
    )
    .join("");
  gsap.set(track, { xPercent: 0 });
}

function advanceDesignDetailSlide() {
  const overlay = document.querySelector(".project-overlay");
  const slider = overlay.querySelector(".overlay-detail-slider");
  const track = overlay.querySelector(".overlay-detail-track");
  const slideCount = track.children.length;
  if (!slideCount) return;

  const index = (Number(slider.dataset.index || 0) + 1) % slideCount;
  slider.dataset.index = String(index);
  gsap.to(track, { xPercent: -100 * index, duration: 0.6, ease: "power3.inOut", overwrite: "auto" });
}

function initWireframeHoverScroll(overlay) {
  const frame = overlay.querySelector(".overlay-wireframe-frame");
  const scroller = overlay.querySelector(".overlay-wireframe-scroll");
  const img = overlay.querySelector(".overlay-wireframe-img");
  if (!frame || !scroller || !img) return;

  function getScrollDistance() {
    return Math.max(img.offsetHeight - frame.offsetHeight, 0);
  }

  frame.addEventListener("mouseenter", () => {
    const distance = getScrollDistance();
    if (distance <= 0) return;
    gsap.to(scroller, {
      y: -distance,
      duration: Math.min(Math.max(distance / 60, 3), 14),
      ease: "sine.inOut",
      overwrite: "auto",
    });
  });

  frame.addEventListener("mouseleave", () => {
    gsap.to(scroller, { y: 0, duration: 1, ease: "sine.out", overwrite: "auto" });
  });
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
