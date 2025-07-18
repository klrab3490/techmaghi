const smart_tabButtons = document.querySelectorAll(".smart-button");
const smart_tabContents = document.querySelectorAll(".smart-tab");

smart_tabButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    // Remove active from all buttons
    smart_tabButtons.forEach((btn) => {
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
    smart_tabContents.forEach((tab) => tab.classList.remove("active", "grid"));
    smart_tabContents.forEach((tab) => tab.classList.add("hidden"));

    // Show current tab
    smart_tabContents[index].classList.add("active", "grid");
    smart_tabContents[index].classList.remove("hidden");
  });
});
