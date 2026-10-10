document.addEventListener('DOMContentLoaded', function () {
  var revealElements = document.querySelectorAll('.sr');
  if (!revealElements.length) return;

  var observer = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var delay = parseFloat(entry.target.dataset.srDelay) || 0;
        entry.target.style.transitionDelay = delay + 's';
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px',
    }
  );

  revealElements.forEach(function (element) {
    observer.observe(element);
  });
});
