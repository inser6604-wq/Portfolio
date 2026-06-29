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

  const aboveFoldTweens = [];

  getScrollSections().forEach((section) => {
    const targets = section.querySelectorAll(SCROLL_REVEAL_SELECTOR);
    if (!targets.length) return;

    // The very first section's small elements (header/subtitle) sit so
    // close to the page top that their OWN "bottom 15%" end can also land
    // above scroll 0, making the trigger zone entirely unreachable. Anchor
    // the end to the whole section's bottom instead, which is always a
    // safely-positive distance away, so onLeave/onEnterBack stay reachable.
    const useSectionEnd = section.matches("main.section");

    gsap.set(targets, { opacity: 0, y: 40 });

    targets.forEach((target) => {
      const tween = gsap.to(target, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: target,
          start: "top 85%",
          ...(useSectionEnd ? { endTrigger: section, end: "bottom 15%" } : { end: "bottom 15%" }),
          toggleActions: "play reverse play reverse",
        },
      });

      if (useSectionEnd) aboveFoldTweens.push(tween);
    });
  });

  // Re-checked after every refresh, since start/end can shift as web fonts
  // and images finish loading and layout settles.
  function fixAboveFoldTweens() {
    aboveFoldTweens.forEach((tween) => {
      const st = tween.scrollTrigger;
      if (!st) return;
      if (st.end <= 0) {
        st.kill();
        gsap.set(tween.targets(), { opacity: 1, y: 0 });
      } else if (st.start <= 0 && st.isActive && tween.progress() === 0) {
        tween.progress(1);
      }
    });
  }

  ScrollTrigger.refresh();
  fixAboveFoldTweens();

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
    fixAboveFoldTweens();
  });
}

function initContactEmailCopy() {
  const emailBtn = document.querySelector(".contact-email");
  if (!emailBtn) return;

  emailBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(emailBtn.dataset.email);
    } catch (err) {
      return;
    }

    emailBtn.classList.add("is-copied");
    setTimeout(() => emailBtn.classList.remove("is-copied"), 1500);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initContactEmailCopy();

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
