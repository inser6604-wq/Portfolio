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

    targets.forEach((target) => {
      gsap.to(target, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: target,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play reverse play reverse",
        },
      });
    });
  });

  window.addEventListener("load", () => ScrollTrigger.refresh());
  ScrollTrigger.refresh();
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
});

document.addEventListener("intro:complete", initScrollReveal);
