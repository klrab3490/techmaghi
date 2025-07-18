const prevBtnCard = document.getElementById("newLaunchPrev");
const nextBtnCard = document.getElementById("newLaunchNext");
const group1 = document.querySelectorAll(".group1");
const group2 = document.querySelectorAll(".group2");
const group3 = document.querySelectorAll(".group3");
const group4 = document.querySelectorAll(".group4");

function showGroup(showFirst) {
  const groups = [group1, group2, group3, group4];
  let currentIndex = showGroup.currentIndex ?? 0;

  if (showFirst === true) {
    currentIndex = Math.max(0, currentIndex - 1);
  } else if (showFirst === false) {
    currentIndex = Math.min(groups.length - 1, currentIndex + 1);
  }

  groups.forEach((group, idx) => {
    group.forEach((el) => el.classList.toggle("hidden", idx !== currentIndex));
  });

  prevBtnCard.disabled = currentIndex === 0;
  prevBtnCard.classList.toggle("cursor-not-allowed", currentIndex === 0);
  prevBtnCard.classList.toggle("cursor-pointer", currentIndex !== 0);

  nextBtnCard.disabled = currentIndex === groups.length - 1;
  nextBtnCard.classList.toggle(
    "cursor-not-allowed",
    currentIndex === groups.length - 1
  );
  nextBtnCard.classList.toggle(
    "cursor-pointer",
    currentIndex !== groups.length - 1
  );

  showGroup.currentIndex = currentIndex;
}

prevBtnCard.addEventListener("click", () => showGroup(true));
nextBtnCard.addEventListener("click", () => showGroup(false));
