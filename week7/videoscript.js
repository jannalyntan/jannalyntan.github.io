//to connect the elements in html to the js file
const myVideo = document.querySelector("#my-video");
console.log(myVideo);

//----------------------------------------------------

//here is my logic for playing the sound
// first I am detching the right play button
const playButton = document.querySelector("#play-button");
console.log(playButton);

// playing sound on click
playButton.addEventListener("click", playAudio);

//play my logic
function playAudio() {
  myVideo.play();
}

//----------------------------------------------------

//----------------------------------------------------

const pauseButton = document.querySelector("#pause-button");
console.log(pauseButton);

// playing sound on click
pauseButton.addEventListener("click", pauseAudio);

// pause my logic
function pauseAudio() {
  myVideo.pause();
}
//----------------------------------------------------
