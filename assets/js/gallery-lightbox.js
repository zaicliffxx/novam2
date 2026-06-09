(function () {
  const gallery = document.querySelector(".project-gallery");
  if (!gallery) return;

  const items = [...gallery.querySelectorAll(".gallery-item")];
  if (!items.length) return;

  const images = items.map((btn) => ({
    src: btn.querySelector("img")?.src || "",
    alt: btn.querySelector("img")?.alt || "",
  }));

  let current = 0;
  let triggerIndex = 0;

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.hidden = true;
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Photo gallery");
  lightbox.innerHTML = `
    <div class="lightbox-backdrop" data-close></div>
    <div class="lightbox-inner">
      <button type="button" class="lightbox-btn lightbox-close" aria-label="Close gallery">&times;</button>
      <button type="button" class="lightbox-btn lightbox-prev" aria-label="Previous photo">&#8249;</button>
      <button type="button" class="lightbox-btn lightbox-next" aria-label="Next photo">&#8250;</button>
      <figure class="lightbox-figure">
        <img class="lightbox-image" src="" alt="" />
        <figcaption class="lightbox-caption"></figcaption>
      </figure>
    </div>`;

  document.body.appendChild(lightbox);

  const imgEl = lightbox.querySelector(".lightbox-image");
  const captionEl = lightbox.querySelector(".lightbox-caption");
  const prevBtn = lightbox.querySelector(".lightbox-prev");
  const nextBtn = lightbox.querySelector(".lightbox-next");
  const closeBtn = lightbox.querySelector(".lightbox-close");

  function show(index) {
    current = (index + images.length) % images.length;
    const item = images[current];
    imgEl.src = item.src;
    imgEl.alt = item.alt;
    captionEl.textContent = `${current + 1} / ${images.length}`;
    prevBtn.style.visibility = images.length > 1 ? "visible" : "hidden";
    nextBtn.style.visibility = images.length > 1 ? "visible" : "hidden";
  }

  function open(index) {
    triggerIndex = index;
    show(index);
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
    closeBtn.focus();
  }

  function close() {
    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");
    imgEl.removeAttribute("src");
    items[triggerIndex]?.focus();
  }

  items.forEach((btn, index) => {
    btn.addEventListener("click", () => open(index));
  });

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    show(current - 1);
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    show(current + 1);
  });

  closeBtn.addEventListener("click", close);
  lightbox.querySelector("[data-close]").addEventListener("click", close);

  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });
})();
