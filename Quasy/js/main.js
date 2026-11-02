/* Quasy - site-wide interactive features (Part 3) */
document.addEventListener("DOMContentLoaded", () => {
  /* 1. Footer year updates automatically */
  const footerText = document.querySelector(".site-footer p");
  if (footerText) {
    footerText.innerHTML = `&copy; ${new Date().getFullYear()} Khwezi. All rights reserved.`;
  }

  /* 2. Time-based greeting on the Home page */
  const heroTitle = document.querySelector(".hero-text h1");
  if (heroTitle) {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
    const p = document.createElement("p");
    p.className = "greeting";
    p.textContent = `${greeting}, and welcome to Quasy!`;
    heroTitle.before(p);
  }

  /* 3. Back-to-top button (appears after scrolling) */
  const topBtn = document.createElement("button");
  topBtn.type = "button";
  topBtn.className = "back-to-top";
  topBtn.textContent = "↑";
  topBtn.setAttribute("aria-label", "Back to top");
  topBtn.hidden = true;
  document.body.appendChild(topBtn);

  window.addEventListener("scroll", () => {
    topBtn.hidden = window.scrollY < 300;
  });
  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
