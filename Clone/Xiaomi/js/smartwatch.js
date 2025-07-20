document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.getElementById("smartwatchSliderWrapper");
  const slides = wrapper.querySelectorAll(".smartwatch-card");
  const dots = document.querySelectorAll(".smartwatchdot");
  let current = 0;

  function showSlide(idx) {
    wrapper.style.transform = `translateX(-${idx * 100}vw)`;
    slides.forEach((slide, i) => slide.classList.toggle("active", i === idx));
    dots.forEach((dot, i) => dot.classList.toggle("active", i === idx));
    current = idx;
  }

  document.getElementById("prevBtnSmartwatch").onclick = function () {
    showSlide((current - 1 + slides.length) % slides.length);
  };
  document.getElementById("nextBtnSmartwatch").onclick = function () {
    showSlide((current + 1) % slides.length);
  };
  dots.forEach((dot, i) => {
    dot.onclick = () => showSlide(i);
  });

  showSlide(0);
});