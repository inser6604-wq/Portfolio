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

    toggle.addEventListener("click", () => {
      gsap.set(name, { color: "#c1121f" });
      gsap.to(name, { color: "#f4f8ff", duration: 0.3, ease: "power1.out", overwrite: "auto" });

      // TODO: GSAP ScrollToPlugin으로 해당 프로젝트 섹션으로 스크롤 이동 (추후 구현)
    });
  });
}

document.addEventListener("DOMContentLoaded", initIntroAnimation);
document.addEventListener("DOMContentLoaded", initCategoryHoverFx);
document.addEventListener("DOMContentLoaded", initCategoryClickFlash);
