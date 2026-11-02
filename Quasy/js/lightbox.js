/* Quasy - gallery lightbox for project images (Part 3) */
document.addEventListener("DOMContentLoaded", () => {
  const images = Array.from(document.querySelectorAll(".project-card img"));
  if (images.length === 0) return;

  /* Build the lightbox with JavaScript so the HTML stays simple */
  const box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", "Project image viewer");
  box.hidden = true;
  box.innerHTML = `
    <button type="button" class="lightbox-close" aria-label="Close image viewer">✕</button>
    <button type="button" class="lightbox-prev" aria-label="Previous image">‹</button>
    <figure>
      <img class="lightbox-img" src="" alt="">
      <figcaption class="lightbox-caption"></figcaption>
    </figure>
    <button type="button" class="lightbox-next" aria-label="Next image">›</button>`;
  document.body.appendChild(box);

  const bigImg = box.querySelector(".lightbox-img");
  const caption = box.querySelector(".lightbox-caption");
  const closeBtn = box.querySelector(".lightbox-close");
  let index = 0;
  let visible = [];

  function show(i) {
    index = (i + visible.length) % visible.length;
    bigImg.src = visible[index].src;
    bigImg.alt = visible[index].alt;
    caption.textContent = visible[index].alt;
  }

  function open(img) {
    // only images of cards that are currently shown by the search
    visible = images.filter((im) => !im.closest(".project-card").hidden);
    show(visible.indexOf(img));
    box.hidden = false;
    document.body.classList.add("no-scroll");
    closeBtn.focus();
  }

  function close() {
    box.hidden = true;
    document.body.classList.remove("no-scroll");
  }

  images.forEach((img) => {
    img.classList.add("zoomable");
    img.tabIndex = 0;
    img.addEventListener("click", () => open(img));
    img.addEventListener("keydown", (e) => { if (e.key === "Enter") open(img); });
  });

  closeBtn.addEventListener("click", close);
  box.querySelector(".lightbox-prev").addEventListener("click", () => show(index - 1));
  box.querySelector(".lightbox-next").addEventListener("click", () => show(index + 1));
  box.addEventListener("click", (e) => { if (e.target === box) close(); });

  document.addEventListener("keydown", (e) => {
    if (box.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });
});
