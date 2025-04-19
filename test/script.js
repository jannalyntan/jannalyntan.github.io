const timerBtn = document.querySelector("#timer-btn");
console.log(timerBtn);

const openPopup = document.querySelector("#open-popup-btn");
console.log(openPopup);

const closePopup = document.querySelector("#close-popup");
console.log(closePopup);

const popup = document.querySelector("#popup");
console.log(popup);

openPopup.addEventListener("click", () => {
  popup.style.display = "block";
});

// () => {} used as an arrow function. Since it is a single callback and

closePopup.addEventListener("click", () => {
  popup.style.display = "none";
});
