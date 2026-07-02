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
    const isContactSection = section.id === "contact";

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
          // Last section: don't reverse on scroll past — at page bottom every
          // element's end fires onLeave and fades back to opacity 0 on mobile.
          ...(isContactSection
            ? { once: true }
            : { toggleActions: "play reverse play reverse" }),
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

function initMobileNav() {
  const hamburger = document.querySelector(".nav-hamburger");
  const mobileNav = document.querySelector(".mobile-nav");
  const goTop = document.querySelector(".go-top");
  if (!hamburger || !mobileNav) return;

  const bars = hamburger.querySelectorAll(".nav-hamburger-bar");
  const links = mobileNav.querySelectorAll(".mobile-nav-link");
  let isOpen = false;
  let placeholder = null;

  function liftHamburger() {
    const rect = hamburger.getBoundingClientRect();

    placeholder = document.createElement("span");
    placeholder.className = "nav-hamburger-placeholder";
    placeholder.setAttribute("aria-hidden", "true");
    hamburger.after(placeholder);

    document.body.appendChild(hamburger);
    hamburger.classList.add("is-floating");
    Object.assign(hamburger.style, {
      position: "fixed",
      top: `${rect.top}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      zIndex: "501",
      margin: "0",
      display: "block",
    });
  }

  function dropHamburger() {
    if (!placeholder) return;
    placeholder.replaceWith(hamburger);
    placeholder = null;
    hamburger.classList.remove("is-floating");
    hamburger.removeAttribute("style");
  }

  function openNav() {
    liftHamburger();
    isOpen = true;
    mobileNav.classList.add("is-open");
    mobileNav.setAttribute("aria-hidden", "false");
    hamburger.setAttribute("aria-expanded", "true");
    hamburger.setAttribute("aria-label", "메뉴 닫기");
    document.body.classList.add("is-mobile-nav-open");
    document.body.style.overflow = "hidden";
    if (goTop) goTop.style.visibility = "hidden";

    gsap.to(bars[0], { y: 10, rotate: 45, duration: 0.35, ease: "power2.inOut" });
    gsap.to(bars[1], { opacity: 0, duration: 0.2 });
    gsap.to(bars[2], { y: -10, rotate: -45, duration: 0.35, ease: "power2.inOut" });

    gsap.fromTo(
      links,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.08, delay: 0.18 }
    );
  }

  function closeNav(onDone) {
    isOpen = false;
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "메뉴 열기");
    document.body.classList.remove("is-mobile-nav-open");

    gsap.to(bars[0], { y: 0, rotate: 0, duration: 0.35, ease: "power2.inOut" });
    gsap.to(bars[1], { opacity: 1, duration: 0.2, delay: 0.1 });
    gsap.to(bars[2], { y: 0, rotate: 0, duration: 0.35, ease: "power2.inOut" });

    gsap.to(links, {
      opacity: 0,
      y: 16,
      duration: 0.3,
      ease: "power2.in",
      stagger: 0.04,
      onComplete: () => {
        mobileNav.classList.remove("is-open");
        mobileNav.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        if (goTop) goTop.style.visibility = "";
        dropHamburger();
        if (onDone) onDone();
      },
    });
  }

  hamburger.addEventListener("click", () => {
    if (isOpen) closeNav();
    else openNav();
  });

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      closeNav(() => target.scrollIntoView({ behavior: "smooth" }));
    });
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

  const syncGoTopVisibility = () => {
    if (btn.dataset.suppressed === "true") return;

    const scrolled = window.scrollY > showThreshold;
    if (scrolled && !btn.classList.contains("is-visible")) {
      btn.classList.add("is-visible");
      gsap.to(btn, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" });
    } else if (!scrolled && btn.classList.contains("is-visible")) {
      btn.classList.remove("is-visible");
      gsap.to(btn, { opacity: 0, y: 16, duration: 0.4, ease: "power3.in" });
    }
  };

  window.addEventListener("scroll", syncGoTopVisibility, { passive: true });

  btn.addEventListener("click", () => {
    gsap.to(window, {
      scrollTo: 0,
      duration: 1.2,
      ease: "power4.inOut",
    });
  });

  window.syncGoTopVisibility = syncGoTopVisibility;
}

function setGoTopSuppressed(suppressed) {
  const btn = document.querySelector(".go-top");
  if (!btn) return;

  if (suppressed) {
    gsap.killTweensOf(btn);
    btn.dataset.suppressed = "true";
    btn.classList.remove("is-visible");
    gsap.set(btn, { opacity: 0, y: 16 });
    btn.style.visibility = "hidden";
    btn.style.pointerEvents = "none";
    return;
  }

  delete btn.dataset.suppressed;
  btn.style.visibility = "";
  btn.style.pointerEvents = "";

  if (typeof window.syncGoTopVisibility === "function") {
    window.syncGoTopVisibility();
  }
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
  initMobileNav();
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
