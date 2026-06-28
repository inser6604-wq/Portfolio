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
    },
  });

  projectSliderTrigger = scrollTween.scrollTrigger;
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

function initProjectOverlay() {
  const overlay = document.querySelector(".project-overlay");
  if (!overlay || typeof gsap === "undefined") return;

  gsap.set(overlay, { yPercent: 100 });
  overlay.querySelector(".project-overlay-close").addEventListener("click", closeProjectOverlay);
}

function openProjectOverlay(card) {
  const overlay = document.querySelector(".project-overlay");
  if (!overlay || typeof gsap === "undefined") return;

  overlay.querySelector(".project-overlay-hero-img").src = card.dataset.thumb || "";
  overlay.querySelector(".project-overlay-category").textContent =
    card.querySelector(".project-card-category").textContent;
  overlay.querySelector(".project-overlay-title").textContent =
    card.querySelector(".project-card-name").textContent;
  overlay.querySelector(".project-overlay-desc").textContent =
    card.querySelector(".project-card-desc").textContent;

  overlay.scrollTop = 0;
  document.body.style.overflow = "hidden";

  gsap.set(overlay, { pointerEvents: "auto" });
  gsap.to(overlay, { yPercent: 0, duration: 0.6, ease: "power3.out", overwrite: "auto" });
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

document.addEventListener("DOMContentLoaded", initIntroAnimation);
document.addEventListener("DOMContentLoaded", initCategoryHoverFx);
document.addEventListener("DOMContentLoaded", initCategoryClickFlash);
document.addEventListener("DOMContentLoaded", initProjectSlider);
document.addEventListener("DOMContentLoaded", initProjectOverlay);
