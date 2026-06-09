(function () {
  if (typeof NOVA_PROJECTS === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const project = NOVA_PROJECTS.find((p) => p.slug === slug);
  const main = document.getElementById("project-detail");

  if (!project || !main) {
    if (main) {
      main.innerHTML = `
        <div class="container page-content">
          <p>Project not found.</p>
          <a class="btn btn-primary" href="projects.html">Back to projects</a>
        </div>`;
    }
    return;
  }

  document.title = `${project.title} | Nova M2 Projects`;

  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.content = project.description;

  const gallery = project.images
    .map(
      (img, i) =>
        `<button type="button" class="gallery-item" aria-label="View photo ${i + 1} of ${project.images.length}">
          <img src="${window.encodeAssetPath(img)}" alt="${project.title} — photo ${i + 1}" loading="${i < 4 ? "eager" : "lazy"}" />
        </button>`
    )
    .join("");

  main.innerHTML = `
    <div class="page-banner">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <a href="index.html">Home</a><span>/</span>
          <a href="projects.html">Projects</a><span>/</span>
          <span>${project.title}</span>
        </nav>
        <p class="page-banner-label">${project.category}</p>
        <h1>${project.title}</h1>
      </div>
    </div>
    <div class="container page-content">
      <p class="project-desc">${project.description}</p>
      <div class="project-gallery" aria-label="Project photos">${gallery}</div>
      <p class="project-back"><a href="projects.html">&larr; All projects</a></p>
    </div>`;
})();
