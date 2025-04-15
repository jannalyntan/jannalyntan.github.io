//to connect the elements in html to the js file
const airportAudio = document.querySelector("#airport-audio");
console.log(airportAudio);

//----------------------------------------------------

//here is my logic for playing the sound
// first I am detching the right play button
const playButton = document.querySelector("#play-button");
console.log(playButton);

// playing sound on click
playButton.addEventListener("click", playAudio);

//play my logic
function playAudio() {
  airportAudio.play();
}

//----------------------------------------------------

//----------------------------------------------------

const pauseButton = document.querySelector("#pause-button");
console.log(pauseButton);

// playing sound on click
pauseButton.addEventListener("click", pauseAudio);

// pause my logic
function pauseAudio() {
  airportAudio.pause();
}
//----------------------------------------------------
//----------------------------------------------------

const popSound = document.querySelector("#pop-sound");
console.log(popSound);

const popButton = document.querySelector("#pop-button");
console.log(popButton);

// playing sound on click
popButton.addEventListener("click", popAudio);

// pause my logic
function popAudio() {
  popSound.play();
}

//----------------------------------------------------
