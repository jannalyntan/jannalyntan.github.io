//---------------------------------------------
//Randomise the Cards
//---------------------------------------------

const canData = {
  button1: { src: "can/canPink.svg", type: "Pink" },
  button2: { src: "can/canBlue.svg", type: "Blue" },
  button3: { src: "can/canOrange.svg", type: "Yellow" },
  button4: { src: "can/canPink.svg", type: "Pink" },
  button5: { src: "can/canBlue.svg", type: "Blue" },
  button6: { src: "can/canPink.svg", type: "Pink" },
  button7: { src: "can/canBlue.svg", type: "Blue" },
  button8: { src: "can/canPink.svg", type: "Pink" },
  button9: { src: "can/canBlue.svg", type: "Blue" },
  button10: { src: "can/canOrange.svg", type: "Yellow" },
};
let lastCard = null;

function randomiseCard(selectedType) {
  let backIndex;
  let newCard;

  do {
    backIndex = Math.floor(Math.random() * 8) + 1; // Random back card index 1-8
    newCard = selectedType + backIndex; // e.g. Pink5
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

// Linking the sounds to from the html file to the js file

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

// Allowing background sound to be played. Since I thought it was a bit boring
// using another music playing in the background. This was also to add on to
// the mood of the game which was meant to be fun

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

    const canInfo = canData[btnId];
    if (!canData) return;

    can.src = canInfo.src;
    currentCanType = canInfo.type; // SAVE the can's color/type

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
    }, 500);
  });
});

//---------------------------------------------
// Machine Shake
//---------------------------------------------

const machine = document.querySelector("#machine-wrapper");
console.log(machine);

machine.addEventListener("animationend", () => {
  machine.classList.remove("machineShake");
});

//---------------------------------------------
// Can Dropping
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
        randomiseCard(currentCanType);
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
console.log(closeBtn);

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
      closeBtn.classList.remove("hidden");
      flipSound.play();
    }, 1000); // Match your flip duration
  } else {
    // Hide if flipped back
    closeBtn.classList.add("hidden");
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
    closeBtn.classList.add("hidden"); // Hide close button
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
  const minWidth = 1300;
  const minHeight = 930;

  if (window.innerWidth < minWidth || window.innerHeight < minHeight) {
    warning.classList.add("visible");
  } else {
    warning.classList.remove("visible");
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

//---------------------------------------------
// Attribution Popup
//---------------------------------------------

const attriBtn = document.querySelector(".attribution-btn");
console.log(attriBtn);
const attriPopup = document.querySelector(".attribution-popup");
const closeAttriBtn = document.querySelector("#close-attribution-btn");

attriBtn.addEventListener("click", () => {
  attriPopup.classList.remove("hidden");
});

closeAttriBtn.addEventListener("click", () => {
  attriPopup.classList.add("hidden");
});
