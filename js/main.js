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

function initGoTop() {
  const btn = document.querySelector(".go-top");
  if (!btn) return;

  const showThreshold = window.innerHeight * 0.6;

  const onScroll = () => {
    const scrolled = window.scrollY > showThreshold;
    if (scrolled && !btn.classList.contains("is-visible")) {
      btn.classList.add("is-visible");
      gsap.to(btn, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" });
    } else if (!scrolled && btn.classList.contains("is-visible")) {
      btn.classList.remove("is-visible");
      gsap.to(btn, { opacity: 0, y: 16, duration: 0.4, ease: "power3.in" });
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });

  btn.addEventListener("click", () => {
    gsap.to(window, {
      scrollTo: 0,
      duration: 1.2,
      ease: "power4.inOut",
    });
  });
}

function initNavHover() {
  document.querySelectorAll(".nav-link").forEach((link) => {
    const top = link.querySelector(".nav-text--top");
    const bottom = link.querySelector(".nav-text--bottom");
    const bar = link.querySelector(".nav-bar");

    link.addEventListener("mouseenter", () => {
      gsap.killTweensOf([top, bottom, bar]);
      gsap.to(top, { yPercent: -100, opacity: 0, duration: 0.45, ease: "power3.out", overwrite: true });
      gsap.to(bottom, { yPercent: -100, opacity: 1, duration: 0.45, ease: "power3.out", overwrite: true });
      gsap.to(bar, { scaleX: 1, duration: 0.4, ease: "power3.out", transformOrigin: "left center", overwrite: true });
    });

    link.addEventListener("mouseleave", () => {
      gsap.killTweensOf([top, bottom, bar]);
      gsap.to(top, { yPercent: 0, opacity: 1, duration: 0.45, ease: "power3.out", overwrite: true });
      gsap.to(bottom, { yPercent: 0, opacity: 0, duration: 0.45, ease: "power3.out", overwrite: true });
      gsap.to(bar, { scaleX: 0, duration: 0.35, ease: "power3.in", transformOrigin: "right center", overwrite: true });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollToPlugin);
  initContactEmailCopy();
  initNavHover();
  initGoTop();

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
    const mainEl = document.getElementById("main");
    if (mainEl) gsap.set(mainEl, { visibility: "visible" });
    gsap.set(".main-portfolio-wrap, .hero-designer, .hero-ampersand, .hero-publisher, .main-header, .main-scroll", { opacity: 0 });
    gsap.set(".main-title", { opacity: 0 });
    initScrollReveal();
    if (typeof initHeroIntroAnimation === "function") initHeroIntroAnimation();
  }
});

document.addEventListener("intro:complete", initScrollReveal);
