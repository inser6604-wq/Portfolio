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

document.addEventListener("DOMContentLoaded", initIntroAnimation);
