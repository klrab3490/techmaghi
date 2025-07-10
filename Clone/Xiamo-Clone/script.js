const cards = document.querySelectorAll(".slider-card");
const dots = document.querySelectorAll(".slider-dots .dot");
const prevBtn = document.querySelector(".slider-btn.prev");
const nextBtn = document.querySelector(".slider-btn.next");
let current = 0;
function showSlide(idx) {
  cards.forEach((card, i) => {
    card.classList.toggle("active", i === idx);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === idx);
  });
  current = idx;
}
prevBtn.onclick = () => showSlide((current - 1 + cards.length) % cards.length);
nextBtn.onclick = () => showSlide((current + 1) % cards.length);
dots.forEach((dot, i) => {
  dot.onclick = () => showSlide(i);
});
// Optional: Auto-slide
setInterval(() => showSlide((current + 1) % cards.length), 10000);

// Tab switching logic for featured section
document.querySelectorAll("#featured-title h3").forEach((tab, idx) => {
  tab.addEventListener("click", () => {
    // Remove active from all
    document
      .querySelectorAll("#featured-title h3")
      .forEach((h) => h.classList.remove("active"));
    document
      .querySelectorAll(".featured-content .featured-tab")
      .forEach((c) => c.classList.remove("active"));
    // Add active to selected
    tab.classList.add("active");
    document
      .querySelectorAll(".featured-content .featured-tab")
      [idx].classList.add("active");
  });
});
