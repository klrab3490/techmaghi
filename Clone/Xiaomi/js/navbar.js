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

function toggleMobileMenu() {
    if (window.innerWidth >= 1024) return;

    // Use the element with id="mobile-view"
    const mobileMenu = document.getElementById("mobile-view");
    if (mobileMenu) {
        const isActive = !mobileMenu.classList.contains("hidden");
        if (isActive) {
            mobileMenu.classList.add("hidden");
            document.body.classList.remove("overflow-hidden");
        } else {
            mobileMenu.classList.remove("hidden");
            document.body.classList.add("overflow-hidden");
        }
    } else {
        console.error("Mobile menu element not found.");
    }
}

function openInner(id) {
    toggleMobileMenu();
    const inner = document.getElementById(id);
    if (inner) {
        inner.classList.remove("hidden");
    } else {
        console.error("Inner element not found.");
    }
}

function closeInner(id) {
    const inner = document.getElementById(id);
    if (inner) {
        inner.classList.add("hidden");
        inner.classList.remove("active");
    } else {
        console.error("Inner element not found.");
    }
}

function closeSubMenu(id) {
    const subMenu = document.getElementById(id);
    if (subMenu) {
        subMenu.classList.add("hidden");
        subMenu.classList.remove("active");
        toggleMobileMenu();
    } else {
        console.error("Submenu element not found.");
    }
}