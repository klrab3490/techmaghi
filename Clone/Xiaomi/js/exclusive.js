const prevBtnCard = document.getElementById("prevBtnCard");
const nextBtnCard = document.getElementById("nextBtnCard");
const group1 = document.querySelectorAll(".group1");
const group2 = document.querySelectorAll(".group2");

function showGroup(showFirst) {
  group1.forEach((el) => el.classList.toggle("hidden", !showFirst));
  group2.forEach((el) => el.classList.toggle("hidden", showFirst));

  prevBtnCard.disabled = showFirst;
  prevBtnCard.classList.toggle("cursor-not-allowed", showFirst);
  prevBtnCard.classList.toggle("cursor-pointer", !showFirst);
  nextBtnCard.disabled = !showFirst;
  nextBtnCard.classList.toggle("cursor-not-allowed", !showFirst);
  nextBtnCard.classList.toggle("cursor-pointer", showFirst);
}

prevBtnCard.addEventListener("click", () => showGroup(true));
nextBtnCard.addEventListener("click", () => showGroup(false));
