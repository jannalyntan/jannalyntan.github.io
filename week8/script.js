const myVideo = document.querySelector("#my-video");
console.log(myVideo);

const playPauseBtn = document.querySelector("#play-pause-button");
console.log(playPauseBtn);

const playPauseImg = document.querySelector("#play-pause-img");
console.log(playPauseImg);

playPauseBtn.addEventListener("click", togglePlay);

function togglePlay() {
  if (myVideo.paused || myVideo.eneded) {
    myVideo.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v2.png";
  } else {
    myVideo.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v2.png";
  }
}

const muteBtn = document.querySelector("#mute-unmute-button");
console.log(muteBtn);

const muteImg = document.querySelector("#mute-unmute-img");
console.log(muteImg);

muteBtn.addEventListener("click", toggleSound);

function toggleSound() {
  if (myVideo.muted) {
    myVideo.muted = false;
    muteImg.src = "https://img.icons8.com/ios-glyphs/30/no-audio--v1.png";
  } else {
    myVideo.muted = true;
    muteImg.src = "https://img.icons8.com/ios-glyphs/30/high-volume--v2.png";
  }
}

// = assigning values
// === comparison of values and type
// myVideo.muted => myVideo.muted === true
// !myVideo.muted => myVideo.muted === false

const fastForwardBtn = document.querySelector("#fast-forward-button");
console.log(fastForwardBtn);

fastForwardBtn.addEventListener("click", toggleSpeed);

function toggleSpeed() {
  if (myVideo.playbackRate === 1.0) {
    myVideo.playbackRate = 2.0;
  } else {
    myVideo.playbackRate = 1.0;
  }
}

const step1Btn = document.querySelector("#step1-button");
console.log(step1Btn);

step1Btn.addEventListener("click", gotoStep1);

function gotoStep1() {
  myVideo.currentTime = 17.0;
}

const step2Btn = document.querySelector("#step2-button");
console.log(step2Btn);

step2Btn.addEventListener("click", gotoStep2);

function gotoStep2() {
  myVideo.currentTime = 43.0;
}

const fullScreenBtn = document.querySelector("#fullscreen-button");
console.log(fullScreenBtn);

fullScreenBtn.addEventListener("click", fullScreen);

function fullScreen() {
  if (!document.fullscreenElement) {
    myVideo.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

const heartBtn = document.querySelector("#heart-button");
console.log(heartBtn);

let likes = 0;

const likesContainer = document.querySelector("#likes");
console.log(likesContainer);

fullScreenBtn.addEventListener("click", updateLikes);

function updateLikes() {
  likes++;
  likesContainer.textContent = likes;
}

const progressBar = document.querySelector("#progress-bar");
console.log(progressBar);

myVideo.addEventListener("timeupdate", updateProgress);

function updateProgress() {
  let progress = (myVideo.currentTime / myVideo.duration) * 100;

  progressBar.style.width = progress + "%";
}

const startdustBtn = document.querySelector("#stardust-vid-button");
console.log(startdustBtn);

startdustBtn.addEventListener("click", function chooseStardust() {
  //chooseVideo(0);
  chooseSrc("stardust.mp4");
});

const zenscapeBtn = document.querySelector("#zenscape-vid-button");
console.log(zenscapeBtn);

zenscapeBtn.addEventListener("click", function chooseZenscape() {
  //chooseVideo(1);
  chooseSrc("zenscape.mp4");
});

const musicVideoBtn = document.querySelector("#musicvideo-vid-button");
console.log(zenscapeBtn);

musicVideoBtn.addEventListener("click", function chooseZenscape() {
  chooseVideo(2);
});

const playlist = [
  {
    id: 1,
    src: "stardust.mp4",
    name: "Stardust",
  },
  {
    id: 2,
    src: "zenscape.mp4",
    name: "zenscape",
  },
  {
    id: 3,
    src: "musicvideo.mp4",
    name: "musicvideo",
  },
];

function chooseVideo(no) {
  myVideo.src = playlist[no].src;
  myVideo.load();
  myVideo.play();
}

function chooseSrc(src) {
  myVideo.src = src;
  myVideo.load();
  myVideo.play();
}
