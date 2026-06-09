(function () {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const header = document.getElementById("site-header");
  const navLinks = nav?.querySelectorAll("a[data-nav]") ?? [];
  const sections = document.querySelectorAll(".page-section[id]");

  function closeNav() {
    nav?.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
    toggle?.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("nav-open");
  }

  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("nav-open", open);
  });

  navLinks.forEach((link) => link.addEventListener("click", () => closeNav()));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });

  /* Header: solid on scroll past home */
  function updateHeader() {
    if (!header) return;
    const scrolled = window.scrollY > 48;
    header.classList.toggle("is-scrolled", scrolled);
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  /* Active nav for current section */
  function updateActiveNav() {
    const offset = header?.offsetHeight ?? 72;
    let current = "home";

    sections.forEach((section) => {
      const top = section.offsetTop - offset - 40;
      if (window.scrollY >= top) {
        current = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.dataset.nav === current);
    });
  }

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();

  /* Stats counter */
  const statNums = document.querySelectorAll(".stat-num[data-count]");
  if (statNums.length && "IntersectionObserver" in window) {
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
  }
})();
