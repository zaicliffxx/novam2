(function () {
  if (typeof NOVA_PROJECTS === "undefined") return;

  const categoryGrid = document.getElementById("category-grid");
  const listView = document.getElementById("projects-list-view");
  const grid = document.getElementById("projects-grid");
  if (!categoryGrid) return;

  const params = new URLSearchParams(window.location.search);
  const activeCategory = params.get("category");

  const CATEGORY_ORDER = [
    "A&A Works",
    "ACMV",
    "Electrical",
    "Plumbing",
    "Fit-out",
    "DFMA",
    "Inspection",
    "MEP",
  ];

  const CATEGORY_BLURBS = {
    "A&A Works": "Addition & alteration works — switchboards, cabling, and switchgear upgrades.",
    ACMV: "Air-conditioning, mechanical ventilation, chillers, and cooling towers.",
    Electrical: "Distribution, installations, provision works, and generator testing.",
    Plumbing: "Sanitary, underground piping, and related MEP coordination.",
    "Fit-out": "MEP coordination for commercial and interior fit-out projects.",
    DFMA: "Design for manufacturing and assembly — modular MEP delivery.",
    Inspection: "Technical inspection and compliance for critical plant rooms.",
    MEP: "General MEP engineering and on-site coordination.",
  };

  function projectUrl(slug) {
    return `project.html?slug=${encodeURIComponent(slug)}`;
  }

  function categoryUrl(category) {
    return `projects.html?category=${encodeURIComponent(category)}`;
  }

  function getCategories() {
    const seen = new Set(NOVA_PROJECTS.map((p) => p.category));
    return CATEGORY_ORDER.filter((c) => seen.has(c)).concat(
      [...seen].filter((c) => !CATEGORY_ORDER.includes(c)).sort()
    );
  }

  function projectsInCategory(category) {
    return NOVA_PROJECTS.filter((p) => p.category === category);
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
            <span class="project-card-more">View project</span>
          </div>
        </a>
      </article>`;
  }

  function renderCategoryCard(category) {
    const projects = projectsInCategory(category);
    const cover = window.encodeAssetPath(projects[0].images[0]);
    const count = projects.length;
    const blurb = CATEGORY_BLURBS[category] || "MEP engineering works in this discipline.";

    return `
      <article class="category-card">
        <a class="category-card-link" href="${categoryUrl(category)}">
          <div class="category-card-image">
            <img src="${cover}" alt="" loading="lazy" width="480" height="300" />
          </div>
          <div class="category-card-body">
            <h2>${category}</h2>
            <p class="category-card-blurb">${blurb}</p>
            <p class="category-card-count">${count} project${count === 1 ? "" : "s"}</p>
          </div>
        </a>
      </article>`;
  }

  function updateBanner(title, lead) {
    const heading = document.querySelector(".page-banner h1");
    const bannerLead = document.querySelector(".page-banner-lead");
    if (heading) heading.textContent = title;
    if (bannerLead) bannerLead.textContent = lead;
  }

  function showCategoryBrowse() {
    const categories = getCategories();
    categoryGrid.innerHTML = categories.map(renderCategoryCard).join("");
    categoryGrid.hidden = false;
    if (listView) listView.hidden = true;
    updateBanner(
      "Projects",
      "Select a category to browse our MEP engineering portfolio."
    );
    document.title = "Projects | Nova M2";
  }

  function showCategoryProjects(category) {
    const projects = projectsInCategory(category);

    if (!projects.length) {
      showCategoryBrowse();
      return;
    }

    categoryGrid.hidden = true;
    if (listView) listView.hidden = false;
    if (grid) grid.innerHTML = projects.map(renderCard).join("");

    const count = document.getElementById("projects-count");
    if (count) {
      count.textContent = `${projects.length} project${projects.length === 1 ? "" : "s"}`;
    }

    const blurb = CATEGORY_BLURBS[category];
    updateBanner(
      category,
      blurb || `Projects in ${category}.`
    );
    document.title = `${category} | Nova M2 Projects`;
  }

  if (activeCategory) {
    showCategoryProjects(activeCategory);
  } else {
    showCategoryBrowse();
  }
})();
