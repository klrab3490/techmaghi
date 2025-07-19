const prevBtnCard = document.getElementById("prevBtnShopCard");
const nextBtnCard = document.getElementById("nextBtnShopCard");
const shop1 = document.querySelectorAll(".shop1");
const shop2 = document.querySelectorAll(".shop2");

function showGroup(showFirst) {
  shop1.forEach((el) => el.classList.toggle("hidden", !showFirst));
  shop2.forEach((el) => el.classList.toggle("hidden", showFirst));

  prevBtnCard.disabled = showFirst;
  prevBtnCard.classList.toggle("cursor-not-allowed", showFirst);
  prevBtnCard.classList.toggle("cursor-pointer", !showFirst);
  nextBtnCard.disabled = !showFirst;
  nextBtnCard.classList.toggle("cursor-not-allowed", !showFirst);
  nextBtnCard.classList.toggle("cursor-pointer", showFirst);
}

prevBtnCard.addEventListener("click", () => showGroup(true));
nextBtnCard.addEventListener("click", () => showGroup(false));
