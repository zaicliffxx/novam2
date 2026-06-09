(function () {
  const statNums = document.querySelectorAll(".stat-num[data-count]");
  if (!statNums.length || !("IntersectionObserver" in window)) return;

  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    if (Number.isNaN(target)) return;
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  statNums.forEach((el) => observer.observe(el));
})();
