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

// Linking html items to the js
const machine = document.querySelector("#machine-wrapper");
console.log(machine);

// creating the machine shake when the animation end so that it can be played again
machine.addEventListener("animationend", () => {
  machine.classList.remove("machineShake");
});

//---------------------------------------------
// Can Dropping
//---------------------------------------------

// Linking html items to the js
const overlay = document.querySelector("#overlay");
console.log(overlay);

const cardContainer = document.querySelector(".card-container");
console.log(cardContainer);

const frontImg = document.querySelector("#card-face-front");
console.log(frontImg);

const backImg = document.querySelector("#card-face-back");
console.log(backImg);

const clickText = document.querySelector(".click-can-text");
console.log(clickText);

// Tracks click steps, this is because there is mulitple click interactions , therefore needing to track the steps just so that the code is update where the user is at
// I realised without this it was there was a lot of error
let clickStage = 0;
let canReady = false;

can.addEventListener("click", () => {
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

    // This is to give some time before running this code. This is
    // to allow the shake animation to run, before removing it.
    setTimeout(() => {
      can.classList.remove("shake");
      can.style.transition = "opacity 0.2s ease";
      can.style.opacity = 0;

      // Again waiting for the fade out to happpen before bringing in the card.
      setTimeout(() => {
        can.classList.add("hidden");

        // Since we stored the can type just now, we are now retrieving it to
        //  show the correct type of card.
        randomiseCard(currentCanType);
        revealSound.play();
        updateStep(4, "Flip the card");
        retryBtn.classList.add("hidden");

        // Reset cardContainer before showing
        cardContainer.classList.remove("hidden");
        cardContainer.style.opacity = 0;
        //Accessing .offsetHeight forces a reflow, which restarts the animation process.
        // It ensures the browser properly registers the opacity change that happens next.
        cardContainer.offsetHeight;

        // start the animation
        cardContainer.classList.add("visible");
        cardContainer.style.transition = "opacity 1s ease";
        cardContainer.style.opacity = 1;
      }, 250);

      // 1 second shake before fading
    }, 1000);
  }
});

//---------------------------------------------
// Flipping card- error when second card appear the retry is there
//---------------------------------------------

// Linking html items to the js
const retryBtn = document.querySelector("#retry-btn");
console.log(retryBtn);

const card = document.querySelector("#card");
console.log(card);

// When the card is clicked, flip it and update the interface
card.addEventListener("click", () => {
  console.log("Card clicked");

  // Toggle the 'flipped' class to rotate the card
  card.classList.toggle("flipped");
  flipSound.play();
  updateStep(5, "See your advice");

  // Check if the card is now flipped to the back
  if (card.classList.contains("flipped")) {
    // Wait for the flip animation to finish before showing the retry button
    setTimeout(() => {
      retryBtn.classList.remove("hidden");
      flipSound.play();

      // Delayed the retry button appearing as I wanted the user to read the card before being able to retry.
    }, 600);
  } else {
    // If the card is flipped back to front, hide the retry button again
    updateStep(4, "Flip the card");
  }
});

//---------------------------------------------
// Retry button
//---------------------------------------------

// Listen for click on the retry button
retryBtn.addEventListener("click", () => {
  // Start fading out the card container visually
  cardContainer.classList.remove("hidden");
  cardContainer.style.opacity = 0;
  retrySound.play();
  updateStep(1, "Select a can");

  // After the fade-out completes (300ms), fully reset states
  setTimeout(() => {
    cardContainer.classList.add("hidden");
    card.classList.remove("flipped"); // Reset flip state
    closeBtn.classList.add("hidden"); // Hide close button
  }, 300);

  // Reset the overlay visibility
  overlay.classList.remove("hidden");
  overlay.classList.add("hidden");

  // Reset the click stage and interaction readiness
  canReady = false;
  clickStage = 0;

  // Reset the can’s appearance and hide it again to prep it for the next animation
  can.classList.remove("centered", "shake");
  can.classList.add("hidden");
  can.style.opacity = 1;
});

//---------------------------------------------
// Window Size
//---------------------------------------------

// Function to check if the current window size is too small.
//Becasue my interactions relied a lot of the exact positioning
// I had to include this to make sure that the buttons dont move
//  where I dont want them to be at

function checkWindowSize() {
  const warning = document.querySelector("#screen-warning");
  const minWidth = 1700;
  const minHeight = 930;

  // If window is smaller than required in either dimension, show warning
  if (window.innerWidth < minWidth || window.innerHeight < minHeight) {
    warning.classList.add("visible");
  } else {
    warning.classList.remove("visible");
  }
}

// Run the check when the page first loads
window.addEventListener("load", checkWindowSize);

// Also run the check every time the window is resized
window.addEventListener("resize", checkWindowSize);

//---------------------------------------------
// Infomation Popup
//---------------------------------------------

// Linking html items to the js
const infoBtn = document.querySelector("#info-btn");
console.log(infoBtn);

const infoPopup = document.querySelector("#information-popup");
console.log(infoPopup);

const closeInfoBtn = document.querySelector("#close-info-btn");
console.log(closeInfoBtn);

// When the info btn is clicked the pop up is shown
infoBtn.addEventListener("click", () => {
  infoPopup.classList.remove("hidden");
});

// When the close btn is clicked, popup is closed
closeInfoBtn.addEventListener("click", () => {
  infoPopup.classList.add("hidden");
});

//---------------------------------------------
// Attribution Popup
//---------------------------------------------

// Linking html items to the js
const attriBtn = document.querySelector(".attribution-btn");
console.log(attriBtn);

const attriPopup = document.querySelector(".attribution-popup");
console.log(attriPopup);

const closeAttriBtn = document.querySelector("#close-attribution-btn");
console.log(closeAttriBtn);

// When the attri btn is clicked the pop up is shown
attriBtn.addEventListener("click", () => {
  attriPopup.classList.remove("hidden");
});

// When the close btn is clicked, popup is closed
closeAttriBtn.addEventListener("click", () => {
  attriPopup.classList.add("hidden");
});
