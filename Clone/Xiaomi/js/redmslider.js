const redmiSliderWrapper = document.getElementById("redmisliderWrapper");
const redmiSlides = document.querySelectorAll(".redmicard");
const redmiDots = document.querySelectorAll(".redmidot");
const redmiPrevBtn = document.getElementById("redmiPrevBtn");
const redmiNextBtn = document.getElementById("redmiNextBtn");
let currentSlideRedmi = 0;
const totalSlides = redmiSlides.length;

function updateRedmiSlider() {
  redmiSliderWrapper.style.transform = `translateX(-${
    currentSlideRedmi * 100
  }%)`;
  redmiDots.forEach((dot, i) => {
    if (i === currentSlideRedmi) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

function nextSlideRedmi() {
  currentSlideRedmi = (currentSlideRedmi + 1) % totalSlides;
  updateRedmiSlider();
}

function prevSlideRedmi() {
  currentSlideRedmi = (currentSlideRedmi - 1 + totalSlides) % totalSlides;
  updateRedmiSlider();
}

redmiDots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    currentSlideRedmi = i;
    updateRedmiSlider();
  });
});

redmiPrevBtn.addEventListener("click", prevSlideRedmi);
redmiNextBtn.addEventListener("click", nextSlideRedmi);

// Optional: auto slide
setInterval(nextSlideRedmi, 6000);

// Initialize on load
updateRedmiSlider();
