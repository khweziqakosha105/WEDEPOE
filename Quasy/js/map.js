/* Quasy - interactive map on the Contact page (Part 3) */
document.addEventListener("DOMContentLoaded", () => {
  const mapEl = document.getElementById("map");
  if (!mapEl || typeof L === "undefined") return;

  const position = [-26.2041, 28.0473]; // Johannesburg, South Africa

  const map = L.map(mapEl).setView(position, 11);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker(position)
    .addTo(map)
    .bindPopup("<strong>Khwezi</strong><br>Web development student")
    .openPopup();
});
