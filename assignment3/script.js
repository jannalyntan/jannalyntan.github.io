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
const frontImg = document.querySelector("#card-face-front");
console.log(frontImg);
const backImg = document.querySelector("#card-face-back");
console.log(backImg);

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

    // Fully reset can visuals & state
    can.classList.remove("animate", "centered", "shake", "hidden", "can-flip", "clickable");
    can.style.transition = "";
    can.style.opacity = "1";
    clickStage = 0;
    canReady = false;

    // Force reflow to restart animation
    void can.offsetWidth;
    can.classList.add("animate");

    setTimeout(() => {
      canReady = true;
      can.classList.add("clickable");
    }, 500);
  });
});

machine.addEventListener("animationend", () => {
  machine.classList.remove("machineShake");
});

//Randomise the Cards

function randomiseCard() {
  // Step 1: Randomly pick one of the front types
  const types = ["Blue", "Pink", "Yellow"];
  const selectedType = types[Math.floor(Math.random() * types.length)];

  // Step 2: Pick a back image index (1–10)
  const backIndex = Math.floor(Math.random() * 8) + 1;

  // Step 3: Set front and back image paths
  frontImg.src = `card/frontPage${selectedType}.png`; // e.g. card/cardBlue.svg
  backImg.src = `card/card${selectedType}${backIndex}.png`; // e.g. card/cardBlue5.svg

  console.log(`Front: card${selectedType}.png`);
  console.log(`Back: card${selectedType}${backIndex}.png`);
}

can.addEventListener("click", () => {
  if (!canReady) return;

  if (clickStage === 0) {
    // 1st click: center the can and show overlay
    can.classList.remove("animate", "shake", "hidden");
    can.classList.add("centered");
    overlay.classList.remove("hidden");
    overlay.classList.add("active");
    clickStage = 1;
  } else if (clickStage === 1) {
    // 2nd click: shake, then fade out

    can.classList.add("shake");

    // After 3 seconds of shaking, fade out
    setTimeout(() => {
      can.classList.remove("shake");
      can.style.transition = "opacity 0.2s ease";
      can.style.opacity = 0;

     setTimeout(() => {
  can.classList.add("hidden");
  randomiseCard();
  
  // Reset cardContainer before showing
  cardContainer.classList.remove("hidden");
  cardContainer.style.opacity = 0;
  cardContainer.offsetHeight; // force reflow
  
  cardContainer.classList.add("visible");
  cardContainer.style.transition = "opacity 0.4s ease";
  cardContainer.style.opacity = 1;
}, 250);
    }, 1000); // 3 sec shake
  }
});

card.addEventListener("click", () => {
  console.log("Card clicked");
  card.classList.toggle("flipped");

  // Show close button only after flip
  if (card.classList.contains("flipped")) {
    // Wait for flip animation (adjust delay if needed)
    setTimeout(() => {
      closeBtn.classList.add("visible");
    }, 1000); // Match your flip duration
  } else {
    // Hide if flipped back
    closeBtn.classList.remove("visible");
  }
});

const closeBtn = document.querySelector("#close-btn");

closeBtn.addEventListener("click", () => {
  // Hide card container smoothly
  cardContainer.classList.remove("visible");
  cardContainer.style.opacity = 0;

  // After fade out completes, fully reset
  setTimeout(() => {
    cardContainer.classList.add("hidden");
    card.classList.remove("flipped"); // Reset flip state
    closeBtn.classList.remove("visible"); // Hide close button
  }, 300);

  // Hide overlay and reset can
  overlay.classList.remove("active");
  overlay.classList.add("hidden");

  canReady = false;
  clickStage = 0;

  can.classList.remove("centered", "shake", "clickable");
  can.classList.add("hidden");
  can.style.opacity = 1;
});

//---------------------------------------------
// Window Size
//---------------------------------------------


function checkWindowSize() {
  const warning = document.querySelector("#screen-warning");
 const minWidth = 900;
  const minHeight = 930;


 if (window.innerWidth < minWidth || window.innerHeight < minHeight) {
    warning.classList.remove("hidden");
  } else {
    warning.classList.add("hidden");
  }
}

window.addEventListener("load", checkWindowSize);
window.addEventListener("resize", checkWindowSize);

//---------------------------------------------
// Infomation Popup
//---------------------------------------------



const closeInfoBtn = document.querySelector("#close-info-btn");
console.log(closeInfoBtn)

const infoPopup = document.querySelector("#information-popup");
console.log(infoPopup)

const infoBtn = document.querySelector("#infoBtn");
console.log(infoBtn)

closeInfoBtn.addEventListener("click", () => {
infoPopup.classList.add("hidden")
});

infoBtn.addEventListener("click", () => {
infoPopup.classList.remove("hidden")
});
