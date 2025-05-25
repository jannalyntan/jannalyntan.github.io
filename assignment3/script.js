let clickStage = 0; // Tracks click steps
let canReady = false;

const buttons = document.querySelectorAll(".machine-button");
console.log(buttons);
const can = document.querySelector("#can");
console.log(can);
const overlay = document.getElementById("overlay");
const machine = document.querySelector("#machine");
const card = document.querySelector("#card");
console.log(card);
const cardContainer = document.querySelector(".card-container");
console.log(cardContainer);

const canImages = {
  button1: "can/canPink.svg",
  button2: "can/canBlue.svg",
  button3: "can/canOrange.svg",
  button4: "can/canPink.svg",
  button5: "can/canBlue.svg",
  button6: "can/canPink.svg",
  button7: "can/canBlue.svg",
  button8: "can/canPink.svg",
  button9: "can/canBlue.svg",
  button10: "can/canOrange.svg",
};

// On vending machine button click — drop can
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const btnId = button.id;
    const imageSrc = canImages[btnId] || "img/can-orange.svg";

    can.src = imageSrc;

    machine.classList.add("machineShake");

    // Reset classes and states
    can.classList.remove("animate", "centered", "shake", "hidden", "can-flip");
    can.style.transition = "";
    can.style.opacity = "1";
    clickStage = 0;

    void can.offsetWidth; // reflow
    can.classList.add("animate");

    canReady = false;

    setTimeout(() => {
      canReady = true;
      can.classList.add("clickable");
    }, 500);
  });
});

machine.addEventListener("animationend", () => {
  machine.classList.remove("machineShake");
});

can.addEventListener("click", () => {
  if (!canReady) return;

  if (clickStage === 0) {
    // 1st click: center the can and show overlay
    can.classList.remove("animate", "shake");
    can.classList.add("centered");
    overlay.classList.remove("hidden");
    overlay.classList.add("active");
    clickStage = 1;
  } else if (clickStage === 1) {
    // 2nd click: fade out can
    can.style.transition = "opacity 0.4s ease";
    can.style.opacity = 0;

    // after fade out, fade in card container
    can.classList.add("hidden"); // hide the can completely after fade
    cardContainer.classList.remove("hidden");
      cardContainer.classList.add("visible");
    cardContainer.style.transition = "opacity 0.4s ease";
  }
});

card.addEventListener("click", () => {
  console.log("Card clicked");
  card.classList.toggle("flipped");
});
