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

// my play logic
function playAudio() {
  myVideo.play();
}

//----------------------------------------------------

//----------------------------------------------------

const pauseButton = document.querySelector("#pause-button");
console.log(pauseButton);

// playing sound on click
pauseButton.addEventListener("click", pauseAudio);

//my pause logic
function pauseAudio() {
  myVideo.pause();
}
//----------------------------------------------------

//----------------------------------------------------
//here is my logic for playing and pausing the video with a single button
//fiirst I am fetching the right play, pause button
const playpauseButton = document.querySelector("#play-pause-button");
console.log(playpauseButton);

//pausing with click
playpauseButton.addEventListener("click", toggleVideo);

const playPauseImg = document.querySelector("#play-pause-img");
console.log(playPauseImg);

//my pauce logic
function toggleVideo() {
  if (myVideo.paused || myVideo.ended) {
    myVideo.play();
    // changing the icon based on whether the video is playing or pausing
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v2.png";
  } else {
    myVideo.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v2.png";
  }
}

//----------------------------------------------------
