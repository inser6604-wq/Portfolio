const SCROLL_EXCLUDED_SECTIONS = "#intro, .overlay";
const SCROLL_REVEAL_SELECTOR = ".scroll-reveal";

let scrollRevealInitialized = false;

function getScrollSections() {
  return document.querySelectorAll(
    `main.section, section.section:not(${SCROLL_EXCLUDED_SECTIONS})`
  );
}

function initScrollReveal() {
  if (scrollRevealInitialized || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    return;
  }

  scrollRevealInitialized = true;
  gsap.registerPlugin(ScrollTrigger);

  getScrollSections().forEach((section) => {
    const targets = section.querySelectorAll(SCROLL_REVEAL_SELECTOR);
    if (!targets.length) return;

    gsap.set(targets, { opacity: 0, y: 40 });

    gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play reverse play reverse",
      },
    });
  });

  ScrollTrigger.refresh();
}

const CATEGORY_THUMB_OFFSET_X = 30;
const CATEGORY_THUMB_OFFSET_Y = 30;

function initCategoryHover() {
  const categoryItems = document.querySelectorAll(".category-item");

  categoryItems.forEach((item) => {
    const thumb = item.querySelector(".category-thumb");
    const img = item.querySelector(".category-thumb img[data-src]");

    if (!thumb || !img) return;

    img.src = img.dataset.src;

    item.addEventListener("mousemove", (event) => {
      thumb.style.left = `${event.clientX + CATEGORY_THUMB_OFFSET_X}px`;
      thumb.style.top = `${event.clientY + CATEGORY_THUMB_OFFSET_Y}px`;
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.main-nav a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  if (!document.getElementById("intro")) {
    initScrollReveal();
  }

  initCategoryHover();
});

document.addEventListener("intro:complete", initScrollReveal);
