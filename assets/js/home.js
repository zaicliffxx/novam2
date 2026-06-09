(function () {
  if (typeof NOVA_PROJECTS === "undefined") return;

  const grid = document.getElementById("featured-projects");
  if (!grid) return;

  const featured = [
    "acmv-work",
    "66-kv-switch-gear",
    "gen-set-testing",
    "aa-fit-out-work",
    "server-room-elv",
    "electrical-main-distribution",
  ]
    .map((slug) => NOVA_PROJECTS.find((p) => p.slug === slug))
    .filter(Boolean);

  grid.innerHTML = featured
    .map((p) => {
      const cover = window.encodeAssetPath(p.images[0]);
      return `
        <article class="project-card project-card--compact">
          <a class="project-card-link" href="project.html?slug=${encodeURIComponent(p.slug)}">
            <div class="project-card-image">
              <img src="${cover}" alt="${p.title}" loading="lazy" width="360" height="240" />
            </div>
            <div class="project-card-body">
              <h3>${p.title}</h3>
              <p class="project-card-cat">${p.category}</p>
            </div>
          </a>
        </article>`;
    })
    .join("");
})();
