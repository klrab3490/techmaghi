const tv_tabButtons = document.querySelectorAll(".tv-button");
const tv_tabContents = document.querySelectorAll(".tv-tab");

tv_tabButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    // Remove active from all buttons
    tv_tabButtons.forEach((btn) => {
      btn.classList.remove(
        "text-orange-500",
        "border-b-2",
        "border-orange-500"
      );
      btn.classList.add("text-gray-800");
    });
    // Add active to current
    button.classList.add("text-orange-500", "border-b-2", "border-orange-500");
    button.classList.remove("text-gray-800");

    // Hide all tabs
    tv_tabContents.forEach((tab) => tab.classList.remove("active", "grid"));
    tv_tabContents.forEach((tab) => tab.classList.add("hidden"));

    // Show current tab
    tv_tabContents[index].classList.add("active", "grid");
    tv_tabContents[index].classList.remove("hidden");
  });
});
