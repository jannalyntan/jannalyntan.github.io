//---------------------------------------------
//Randomise the Cards
//---------------------------------------------

let lastCard = null;

function randomiseCard() {
  const types = ["Blue", "Pink", "Yellow"];
  let selectedType;
  let backIndex;
  let newCard;

  do {
    selectedType = types[Math.floor(Math.random() * types.length)];
    backIndex = Math.floor(Math.random() * 8) + 1;
    newCard = selectedType + backIndex;
  } while (newCard === lastCard);

  lastCard = newCard;

  frontImg.src = `card/frontPage${selectedType}.png`;
  backImg.src = `card/card${selectedType}${backIndex}.png`;

  console.log(`Front: card/frontPage${selectedType}.png`);
  console.log(`Back: card/card${selectedType}${backIndex}.png`);
}

//---------------------------------------------
// Sound
//---------------------------------------------
const shakeSound = document.querySelector("#shake-sound");
console.log(shakeSound);

const zoominSound = document.querySelector("#zoomin-sound");
console.log(zoominSound);

const canopenSound = document.querySelector("#canopen-sound");
console.log(canopenSound);

const revealSound = document.querySelector("#reveal-sound");
console.log(revealSound);

const retrySound = document.querySelector("#retry-sound");
console.log(retrySound);

const closeSound = document.querySelector("#close-sound");
console.log(closeSound);

const flipSound = document.querySelector("#flip-sound");
console.log(flipSound);

//---------------------------------------------
// Bg sound
//---------------------------------------------

const bgSound = document.querySelector("#bg-sound");
console.log(bgSound);

const soundOn = document.querySelector("#sound-on");
console.log(soundOn);

//Wait for any user interaction
window.addEventListener(
  "click",
  () => {
    bgSound.play().catch((e) => {
      console.log("Autoplay failed:", e);
    });
  },
  { once: true }
); // only run once

let musicstate = true;

function playMusic() {
  if (musicstate) {
    bgSound.pause();
    soundOn.src = "img/soundOff.png";
  } else {
    bgSound.play();
    soundOn.src = "img/soundOn.png";
  }
  musicstate = !musicstate; // Toggle state
}

soundOn.addEventListener("click", playMusic);

//---------------------------------------------
// On vending machine button click — drop can
//---------------------------------------------

const buttons = document.querySelectorAll(".machine-button");
console.log(buttons);

const can = document.querySelector("#can");
console.log(can);

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

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const btnId = button.id;
    const imageSrc = canImages[btnId] || "img/can-orange.svg";

    can.src = imageSrc;

    machine.classList.add("machineShake");
    shakeSound.play();

    // Fully reset can visuals & state
    can.classList.remove("centered", "shake", "hidden");
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

//---------------------------------------------
// Machine Shake
//---------------------------------------------

const machine = document.querySelector("#machine");

machine.addEventListener("animationend", () => {
  machine.classList.remove("machineShake");
});

//---------------------------------------------
// Machine Shake
//---------------------------------------------

const overlay = document.getElementById("overlay");

const cardContainer = document.querySelector(".card-container");
console.log(cardContainer);

const frontImg = document.querySelector("#card-face-front");
console.log(frontImg);
const backImg = document.querySelector("#card-face-back");
console.log(backImg);

let clickStage = 0; // Tracks click steps
let canReady = false;

can.addEventListener("click", () => {
  if (!canReady) return;

  if (clickStage === 0) {
    // 1st click: center the can and show overlay
    can.classList.remove("animate", "shake", "hidden");
    can.classList.add("centered");
    overlay.classList.remove("hidden");
    overlay.classList.add("active");
    zoominSound.play();
    clickStage = 1;
  } else if (clickStage === 1) {
    // 2nd click: shake, then fade out

    can.classList.add("shake");
    canopenSound.play();
    // After 3 seconds of shaking, fade out
    setTimeout(() => {
      can.classList.remove("shake");
      can.style.transition = "opacity 0.2s ease";
      can.style.opacity = 0;

      setTimeout(() => {
        can.classList.add("hidden");
        randomiseCard();
        revealSound.play();

        // Reset cardContainer before showing
        cardContainer.classList.remove("hidden");
        cardContainer.style.opacity = 0;
        cardContainer.offsetHeight; // force reflow

        cardContainer.classList.add("visible");
        cardContainer.style.transition = "opacity 1s ease";
        cardContainer.style.opacity = 1;
      }, 250);
    }, 1000); // 3 sec shake
  }
});

//---------------------------------------------
// Flipping card
//---------------------------------------------

const closeBtn = document.querySelector("#close-btn");

const card = document.querySelector("#card");
console.log(card);

card.addEventListener("click", () => {
  console.log("Card clicked");
  card.classList.toggle("flipped");
  flipSound.play();

  // Show close button only after flip
  if (card.classList.contains("flipped")) {
    // Wait for flip animation (adjust delay if needed)
    setTimeout(() => {
      closeBtn.classList.add("visible");
      flipSound.play();
    }, 1000); // Match your flip duration
  } else {
    // Hide if flipped back
    closeBtn.classList.remove("visible");
  }
});

//---------------------------------------------
// Retry button
//---------------------------------------------

closeBtn.addEventListener("click", () => {
  // Hide card container smoothly
  cardContainer.classList.remove("hidden");
  cardContainer.style.opacity = 0;
  retrySound.play();

  // After fade out completes, fully reset
  setTimeout(() => {
    cardContainer.classList.add("hidden");
    card.classList.remove("flipped"); // Reset flip state
    closeBtn.classList.remove("hidden"); // Hide close button
  }, 300);

  // Hide overlay and reset can
  overlay.classList.remove("hidden");
  overlay.classList.add("hidden");

  canReady = false;
  clickStage = 0;

  can.classList.remove("centered", "shake");
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
    warning.style.transition = "opacity 0.3s ease";
  } else {
    warning.classList.add("hidden");
  }
}

window.addEventListener("load", checkWindowSize);
window.addEventListener("resize", checkWindowSize);

//---------------------------------------------
// Infomation Popup
//---------------------------------------------

const infoBtn = document.querySelector("#info-btn");
console.log(infoBtn);
const infoPopup = document.querySelector("#information-popup");
const closeInfoBtn = document.querySelector("#close-info-btn");

infoBtn.addEventListener("click", () => {
  infoPopup.classList.remove("hidden");
});

closeInfoBtn.addEventListener("click", () => {
  infoPopup.classList.add("hidden");
});
