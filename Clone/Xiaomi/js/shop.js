const shopPrevious = document.getElementById("shopPrevious");
const shopNext = document.getElementById("shopNext");
const shopScrollContainer = document.getElementById("shopScrollContainer"); // Add an id to your scrollable container

const scrollAmount = 300; // Adjust as needed

shopPrevious.addEventListener("click", () => {
    shopScrollContainer.scrollBy({
        left: -scrollAmount,
        behavior: "smooth"
    });
});

shopNext.addEventListener("click", () => {
    shopScrollContainer.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
    });
});
