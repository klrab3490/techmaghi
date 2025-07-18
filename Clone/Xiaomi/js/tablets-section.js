const tablet_tabButtons = document.querySelectorAll(".tablets-button");
const tablet_tabContents = document.querySelectorAll(".tablets-tab");

tablet_tabButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    // Remove active from all buttons
    tablet_tabButtons.forEach((btn) => {
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
    tablet_tabContents.forEach((tab) => tab.classList.remove("active", "grid"));
    tablet_tabContents.forEach((tab) => tab.classList.add("hidden"));

    // Show current tab
    tablet_tabContents[index].classList.add("active", "grid");
    tablet_tabContents[index].classList.remove("hidden");
  });
});
