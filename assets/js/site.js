(function () {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const header = document.getElementById("site-header");
  const isHome = document.body.classList.contains("page-home");

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

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => closeNav());
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });

  const current = document.body.dataset.page;
  if (current) {
    nav?.querySelectorAll("a[data-page]").forEach((link) => {
      link.classList.toggle("is-active", link.dataset.page === current);
    });
  }

  if (isHome && header) {
    function updateHeader() {
      header.classList.toggle("is-scrolled", window.scrollY > 48);
    }
    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();
  } else if (header) {
    header.classList.add("is-scrolled");
  }

  window.encodeAssetPath = function (path) {
    return path.split("/").map(encodeURIComponent).join("/");
  };
})();
