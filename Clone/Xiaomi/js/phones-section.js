const tabButtons = document.querySelectorAll(".phones-button");
const tabs = document.querySelectorAll(".phones-tab");

tabButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    // Remove active from all buttons
    tabButtons.forEach((btn) => {
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
    tabs.forEach((tab) => tab.classList.remove("active", "grid"));
    tabs.forEach((tab) => tab.classList.add("hidden"));

    // Show current tab
    tabs[index].classList.add("active", "grid");
    tabs[index].classList.remove("hidden");
  });
});
