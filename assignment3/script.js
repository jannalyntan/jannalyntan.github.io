//---------------------------------------------
// Step Guide
//---------------------------------------------

// linking the html to js
const title = document.querySelector(".step-text h1");
console.log(title);

const instruction = document.querySelector(".step-text p");
console.log(instruction);

// this function actually updates the step guide.
// it takes in the step number and whatever instruction I want to show.
//Using text.content to change the text
function updateStep(stepNumber, instructions) {
  // stepNumber: what step are we at, which gets displayed as "Step X".
  title.textContent = `Step ${stepNumber}`;
  // instructions: the text describing what the user should do for that step.
  instruction.textContent = instructions;
}

//---------------------------------------------
//Randomise the Cards
//---------------------------------------------

// Inputting the can data as each button will produce a different can.]
//  I also had to state its type and the card inside will change based on
// the colour of the can

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

// Keeps track of the last card shown so we avoid repeating the same card consecutively.
let lastCard = null;

//randomiseCard - Picks a random back image for a card of a selected type,
//ensuring the same card doesn’t appear twice in a row.

//usiing selectedtype to see whihc type of card should be used corresponding to the type of can being selected
function randomiseCard(selectedType) {
  // Will store the random index number for the back image.
  let backIndex;
  // Will store the combined card type + index string (e.g. "Pink5").
  let newCard;

  do {
    // Generate a random number between 1 and 8 (inclusive) to select back image variation.
    backIndex = Math.floor(Math.random() * 8) + 1;

    // Create a string identifier for the new card using the selected type and random back index.
    newCard = selectedType + backIndex;

    // Repeat the process if the new card is the same as the last one shown to avoid repetition. Using do
    // and while since it will repear until the condition is met
  } while (newCard === lastCard);

  // Update lastCard so the next call knows what was shown last.
  lastCard = newCard;

  // Update the front and back image source.
  frontImg.src = `card/frontPage${selectedType}.png`;
  backImg.src = `card/card${selectedType}${backIndex}.png`;

  // ensuring the cards work
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

// Linking html items to the js
const bgSound = document.querySelector("#bg-sound");
console.log(bgSound);

const soundOn = document.querySelector("#sound-on");
console.log(soundOn);

//Wait for any user interaction, using window as on the first click there
//  will be the sound played and users can off it via the mute sound afterwards
// if not wanted
// Creating a new function as I the music state was messing up this interaction, hence having to create another one
window.addEventListener(
  "click",
  function playOnce() {
    // To play the background sound
    bgSound.play();
  },
  { once: true }
);

// This variable keeps track of whether the music is currently on or off.
let musicstate = true;

// This function runs every time the user clicks the sound toggle.
// If music is playing, pause it and switch the icon to the "off" version.
// If it's not, play it and switch to the "on" version.
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

// When user clicks the sound icon, run the function above
soundOn.addEventListener("click", playMusic);

//---------------------------------------------
// On vending machine button click — drop can
//---------------------------------------------

// Linking html items to the js
const buttons = document.querySelectorAll(".machine-button");
console.log(buttons);

const can = document.querySelector("#can");
console.log(can);

// For each button, add a click listener to trigger the can drop
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // Get the clicked button's ID
    const btnId = button.id;

    // Get the corresponding can info from canData (image src + type)
    const canInfo = canData[btnId];

    // Update the can image source to match the selected can
    can.src = canInfo.src;

    // Save the current can's type (color) for use later
    currentCanType = canInfo.type;

    // Add the 'shake' animation class to the vending machine element, play shake sound, update the step guide
    machine.classList.add("machineShake");
    shakeSound.play();
    updateStep(2, "Take the can");

    // Reset the can's visual state and animation classes
    can.classList.remove("centered", "shake", "hidden");
    can.style.transition = "";
    can.style.opacity = "1";

    // Reset internal state variables to prepare for next interaction
    clickStage = 0;
    canReady = false;

    can.classList.add("animate");

    // After 500 milliseconds, mark the can as ready for next interaction
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

const clickText = document.querySelector(".click-can-text");
console.log(clickText);

let clickStage = 0; // Tracks click steps
let canReady = false;

can.addEventListener("click", () => {
  if (!canReady) return;

  if (clickStage === 0) {
    // 1st click: center the can and show overlay
    can.classList.remove("animate", "shake", "hidden");
    can.classList.add("centered");
    overlay.classList.remove("hidden");
    zoominSound.play();
    clickText.classList.remove("hidden");
    updateStep(3, "Open the can");
    clickStage = 1;
  } else if (clickStage === 1) {
    // 2nd click: shake, then fade out
    clickText.classList.add("hidden");
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
        updateStep(4, "Flip the card");

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
// Flipping card- error when second card appear the retry is there
//---------------------------------------------

const retryBtn = document.querySelector("#retry-btn");
console.log(retryBtn);

const card = document.querySelector("#card");
console.log(card);

card.addEventListener("click", () => {
  console.log("Card clicked");
  card.classList.toggle("flipped");
  flipSound.play();
  updateStep(5, "See your advice");

  // Show close button only after flip
  if (card.classList.contains("flipped")) {
    // Wait for flip animation (adjust delay if needed)
    setTimeout(() => {
      retryBtn.classList.remove("hidden");
      flipSound.play();
    }, 600); // Match your flip duration
  } else {
    // Hide if flipped back
    retryBtn.classList.add("hidden");
    updateStep(4, "Flip the card");
  }
});

//---------------------------------------------
// Retry button
//---------------------------------------------

retryBtn.addEventListener("click", () => {
  // Hide card container smoothly
  cardContainer.classList.remove("hidden");
  cardContainer.style.opacity = 0;
  retrySound.play();
  updateStep(1, "Select a can");

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
  const minWidth = 1700;
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
