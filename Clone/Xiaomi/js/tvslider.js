// Only select slides, not nav/dots
const tvslides = document.querySelectorAll("#sliderWrapper .tv-card");
const tvdots = document.querySelectorAll(".tvdot");
const prevBtnTV = document.getElementById("prevBtnTV");
const nextBtnTV = document.getElementById("nextBtnTV");
let currentSlideTV = 0;

function showSlideTV(index) {
  tvslides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (tvdots[i]) tvdots[i].classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
      if (tvdots[i]) tvdots[i].classList.add("active");
    }
  });
}

function nextSlideTV() {
  currentSlideTV = (currentSlideTV + 1) % tvslides.length;
  showSlideTV(currentSlideTV);
}

function prevSlideTV() {
  currentSlideTV = (currentSlideTV - 1 + tvslides.length) % tvslides.length;
  showSlideTV(currentSlideTV);
}

tvdots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    currentSlideTV = i;
    showSlideTV(currentSlideTV);
  });
});

nextBtnTV.addEventListener("click", nextSlideTV);
prevBtnTV.addEventListener("click", prevSlideTV);

// Optional: auto slide
setInterval(nextSlideTV, 6000);


// 2nd Slider for TV Section
const tvSliderWrapper = document.getElementById("tvSliderWrapper");
const tvSliderCards = document.querySelectorAll(".tvslidercard");
const tvSliderDots = document.querySelectorAll(".tvsliderdot");
const prevBtnTVSlider = document.getElementById("prevBtnTVSlider");
const nextBtnTVSlider = document.getElementById("nextBtnTVSlider");
let currentTVSlider = 0;

function updateTVSlider() {
  tvSliderWrapper.style.transform = `translateX(-${currentTVSlider * 100}vw)`;
  tvSliderDots.forEach((dot, i) => {
    if (i === currentTVSlider) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

function nextTVSlider() {
  currentTVSlider = (currentTVSlider + 1) % tvSliderCards.length;
  updateTVSlider();
}

function prevTVSlider() {
  currentTVSlider =
    (currentTVSlider - 1 + tvSliderCards.length) % tvSliderCards.length;
  updateTVSlider();
}

tvSliderDots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    currentTVSlider = i;
    updateTVSlider();
  });
});

nextBtnTVSlider.addEventListener("click", nextTVSlider);
prevBtnTVSlider.addEventListener("click", prevTVSlider);

// Optional: auto slide
setInterval(nextTVSlider, 6000);

// Initialize position on load
updateTVSlider();
