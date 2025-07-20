const smarthomeSliderWrapper = document.getElementById("smarthomeSliderWrapper");
const smarthomeSliderCards = document.querySelectorAll(".smarthomeslidercard");
const smarthomeSliderDots = document.querySelectorAll(".smarthomesliderdot");
const prevBtnSmarthomeSlider = document.getElementById("prevBtnSmarthomeSlider");
const nextBtnSmarthomeSlider = document.getElementById("nextBtnSmarthomeSlider");
let currentSmarthomeSlider = 0;

function updateSmarthomeSlider() {
  smarthomeSliderWrapper.style.transform = `translateX(-${currentSmarthomeSlider * 100}vw)`;
  smarthomeSliderDots.forEach((dot, i) => {
    if (i === currentSmarthomeSlider) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

function nextSmarthomeSlider() {
  currentSmarthomeSlider = (currentSmarthomeSlider + 1) % smarthomeSliderCards.length;
  updateSmarthomeSlider();
}

function prevSmarthomeSlider() {
  currentSmarthomeSlider =
    (currentSmarthomeSlider - 1 + smarthomeSliderCards.length) % smarthomeSliderCards.length;
  updateSmarthomeSlider();
}

smarthomeSliderDots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    currentSmarthomeSlider = i;
    updateSmarthomeSlider();
  });
});

nextBtnSmarthomeSlider.addEventListener("click", nextSmarthomeSlider);
prevBtnSmarthomeSlider.addEventListener("click", prevSmarthomeSlider);

// Optional: auto slide
setInterval(nextSmarthomeSlider, 6000);

// Initialize position on load
updateSmarthomeSlider();
