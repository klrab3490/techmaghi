function setupDropdown(triggerSelector, dropdownSelector) {
    const trigger = document.querySelector(triggerSelector);
    const dropdown = document.querySelector(dropdownSelector);

    if (trigger && dropdown) {
        trigger.addEventListener("mouseenter", () => {
            dropdown.classList.remove("hidden");
            trigger.classList.add("active");
        });

        trigger.addEventListener("mouseleave", () => {
            setTimeout(() => {
                if (!dropdown.matches(":hover")) {
                    dropdown.classList.add("hidden");
                    trigger.classList.remove("active");
                }
            }, 100);
        });

        dropdown.addEventListener("mouseleave", () => {
            dropdown.classList.add("hidden");
            trigger.classList.remove("active");
        });

        dropdown.addEventListener("mouseenter", () => {
            dropdown.classList.remove("hidden");
            trigger.classList.add("active");
        });
    }
}

setupDropdown(".phones-trigger", ".phones-dropdown");
setupDropdown(".tablets-trigger", ".tablets-dropdown");
setupDropdown(".tv-trigger", ".tv-dropdown");
setupDropdown(".watch-trigger", ".watch-dropdown");


