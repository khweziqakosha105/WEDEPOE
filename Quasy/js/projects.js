/* Quasy - live project search (Part 3) */
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("project-search");
  const cards = document.querySelectorAll(".project-card");
  const count = document.getElementById("project-count");
  const noResults = document.getElementById("no-results");
  if (!input) return;

  function search() {
    const query = input.value.trim().toLowerCase();
    let shown = 0;

    cards.forEach((card) => {
      const match = card.textContent.toLowerCase().includes(query);
      card.hidden = !match;
      if (match) shown++;
    });

    noResults.hidden = shown > 0;
    count.textContent = `Showing ${shown} of ${cards.length} projects`;
  }

  input.addEventListener("input", search);
  search();
});
