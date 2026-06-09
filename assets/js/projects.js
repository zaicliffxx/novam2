(function () {
  if (typeof NOVA_PROJECTS === "undefined") return;

  const grid = document.getElementById("projects-grid");
  const filters = document.getElementById("project-filters");
  if (!grid) return;

  const categories = ["All", ...new Set(NOVA_PROJECTS.map((p) => p.category))].sort((a, b) =>
    a === "All" ? -1 : b === "All" ? 1 : a.localeCompare(b)
  );

  let active = "All";

  function projectUrl(slug) {
    return `project.html?slug=${encodeURIComponent(slug)}`;
  }

  function renderCard(project) {
    const cover = window.encodeAssetPath(project.images[0]);
    return `
      <article class="project-card">
        <a class="project-card-link" href="${projectUrl(project.slug)}">
          <div class="project-card-image">
            <img src="${cover}" alt="${project.title}" loading="lazy" width="400" height="280" />
          </div>
          <div class="project-card-body">
            <h3>${project.title}</h3>
            <p class="project-card-cat">${project.category}</p>
            <span class="project-card-more">Read more</span>
          </div>
        </a>
      </article>`;
  }

  function renderGrid() {
    const list =
      active === "All" ? NOVA_PROJECTS : NOVA_PROJECTS.filter((p) => p.category === active);
    grid.innerHTML = list.map(renderCard).join("");
    const count = document.getElementById("projects-count");
    if (count) count.textContent = `${list.length} project${list.length === 1 ? "" : "s"}`;
  }

  if (filters) {
    filters.innerHTML = categories
      .map(
        (cat) =>
          `<button type="button" class="filter-btn${cat === active ? " is-active" : ""}" data-filter="${cat}">${cat}</button>`
      )
      .join("");

    filters.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      active = btn.dataset.filter;
      filters.querySelectorAll(".filter-btn").forEach((b) => {
        b.classList.toggle("is-active", b.dataset.filter === active);
      });
      renderGrid();
    });
  }

  renderGrid();
})();
