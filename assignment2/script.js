//--------------------------------------------------------------------
// Tasklist Popup
//--------------------------------------------------------------------

// so that when the tasklist button is clicked the popup closes

//linking the html to the js
const tasklistBtn = document.querySelector("#tasklist-btn");
console.log(tasklistBtn);

const tasklistPopUp = document.querySelector(".task-list-group");
console.log(tasklistPopUp);

// adding an action to when the button is clicked the popup will close
// didnt use another line of function since this was a single action and the function will not be used again
tasklistBtn.addEventListener("click", function () {
  tasklistPopUp.classList.toggle("hidden");
});

//--------------------------------------------------------------------
// Timer Popup
//--------------------------------------------------------------------

// so that when the timer button is clicked the popup closes

//linking the html to the js
const timerBtn = document.querySelector("#timer-btn");
console.log(timerBtn);

const timerPopUp = document.querySelector(".timer-group");
console.log(timerPopUp);

// adding an action to when the button is clicked the popup will close
timerBtn.addEventListener("click", function () {
  timerPopUp.classList.toggle("hidden");
});

//--------------------------------------------------------------------
// Timer
//--------------------------------------------------------------------

//linking the html to the js
const countdownDisplay = document.querySelector("#countdown-display");
console.log(countdownDisplay);

const resetBtn = document.querySelector("#reset-btn");
console.log(resetBtn);

const pomodoroBtn = document.querySelector("#pomodoro-btn");
console.log(pomodoroBtn);

const customBtn = document.querySelector("#custom-btn");
console.log(customBtn);

const startBtn = document.querySelector("#start-btn");
console.log(startBtn);

// Setting the timer first
let timer; // holds the setInterval reference
let timeLeft = 30 * 60; // default 30 minutes
let isRunning = false;

//reference chatgpt for this section

// Helper to format seconds into MM:SS
function formatTime(seconds) {
  //Making the minutes
  // (MATH.floor) is helping to round down the number to the nearest whole number
  // seconds/60 it converts the seconds into minutes
  let mins = Math.floor(seconds / 60);
  // Making the seconds
  //Getting the remainer of the previous division to make it to the seconds
  let secs = seconds % 60;
  //so that if the minutes or seconds are single digit it will add a zero at the beginning
  return (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;
}

// Update display to make it back to the defult
function updateDisplay() {
  countdownDisplay.textContent = formatTime(timeLeft);
}

// to toggle btw starting and stopping the timer
function startTimer() {
  // meaning that if the timer is running
  if (isRunning) {
    //stop the countdown
    //used 'clear interval' as it is used to stop the excustion of the timer
    clearInterval(timer);
    // updates the state saying 'now the timer is not running'
    isRunning = false;
    // Update button label
    startBtn.textContent = "Start";
  } else {
    // If timer is not running, start it
    // updates the state saying 'now the timer is running'
    isRunning = true;
    //Updating the label
    startBtn.textContent = "Pause";

    // To continue the timer
    // Start the countdown using setInterval, which runs the function every 1 second
    let timer = setInterval(
      () => {
        // if the timer is not at 0, it will continue the timer
        if (timeLeft > 0) {
          // This mean to minus 1 from the remaing time
          timeLeft--;
          // Update the countdown display
          updateDisplay();
        } else {
          // Stop timer when countdown if the timeleft<0
          clearInterval(timer);
          // updates the state saying 'now the timer is not running'
          isRunning = false;
          // Run what happens after timer ends
          timerDone();
        }
      },
      // Repeat every 1000 milliseconds (1 second)
      1000
    );
  }
}

// Reset timer
function resetTimer() {
  // this stop the timer if it running and sets a new one
  clearInterval(timer);
  // Changing the state to 'the timer isnt running' so the user has to press start
  isRunning = false;
  //this is to set the timer for the defult timer set which is 30 sec
  timeLeft = 30 * 60;
  // changine the text on the button
  startBtn.textContent = "Start";

  // updating the timer
  updateDisplay();
}

// Set Pomodoro (25:00)
function setPomodoro() {
  // this clears the stop a timer if it running and sets a new one
  clearInterval(timer);
  // telling the program that 'the timer isnt running' so the user has to press start
  isRunning = false;
  //this is to set the timer for the pomodoro study method which is a 25 minute study time before a break
  timeLeft = 25 * 60;

  //to update the display
  updateDisplay();
}

// Event listeners
startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);
pomodoroBtn.addEventListener("click", setPomodoro);

updateDisplay();

//--------------------------------------------------------------------
// Timer Done Popup
//--------------------------------------------------------------------

//linking the html to the js
const timerDonePopUp = document.querySelector("#timer-done-popup");
console.log(timerDonePopUp);

const timerDonePopUpClose = document.querySelector("#close-timer-btn");
console.log(timerDonePopUpClose);

const timerDoneSound = document.querySelector("#timer-done-sound");
console.log(timerDoneSound);

// used for when the timer is done to have the popup and play an alert sound
function timerDone() {
  // Since ! is used as a negative and isRunning was defined as negative, the used of ! will create it to be a
  // postivie hence making it state that the timer is running.
  if (!isRunning) {
    // removing the hidden from the html file making it so that it will appear on screen
    timerDonePopUp.classList.remove("hidden");
    // Play the sound when the timer ends
    timerDoneSound.play();
  } else {
    // if the timer is in used, the pop up will remain hidden
    timerDonePopUp.classList.add("hidden");
  }
}

// To ensure the close button will hide the PopUp
timerDonePopUpClose.addEventListener("click", function () {
  timerDonePopUp.classList.add("hidden");
});

//--------------------------------------------------------------------
// Timer Popup for Custom Time
//--------------------------------------------------------------------

// For the popup for the custom time
//linking the html to the js
const customPopup = document.querySelector("#custom-popup");
console.log(customPopup);

const customMinutesInput = document.querySelector("#custom-minutes");
console.log(customMinutesInput);

const setCustomBtn = document.querySelector("#set-custom-timer");
console.log(setCustomBtn);

const cancelCustomBtn = document.querySelector("#cancel-custom");
console.log(cancelCustomBtn);

// Show popup when "Custom btn" is clicked
customBtn.addEventListener("click", function () {
  customPopup.classList.remove("hidden");
});

// Hide popup when cancel is clicked
cancelCustomBtn.addEventListener("click", function () {
  customPopup.classList.add("hidden");
});

// Set timer from custom input
// for this i had to research a bit and use chatgpt since I didn't know how to convert an input into the timer

setCustomBtn.addEventListener("click", function () {
  //it will take the value that user type into the minute box into a whole number
  // used 'parseInt' to achieve this
  const customMinutes = parseInt(customMinutesInput.value);

  // checking whether the number is a real value and also greater than 0
  // isNaN is used to check if the number is a number
  // && is used to ensure that both conditions are true
  if (!isNaN(customMinutes) && customMinutes > 0) {
    // this clears the stop a timer if it running and sets a new one
    clearInterval(timer);

    // Changing the state to 'the timer isnt running' so the user has to press start
    isRunning = false;

    // this converts the numbers into seconds since the countdown timer code runs in seconds
    timeLeft = customMinutes * 60;

    //updates the display
    updateDisplay();

    //hides the popup after start or cancel is press
    customPopup.classList.add("hidden");
  } else {
    alert("Please enter a valid number greater than 0.");
  }
});

//--------------------------------------------------------------------
// Add task Button
//--------------------------------------------------------------------

// Linking html elements to js
const addTaskBtn = document.querySelector("#add-task-btn");
console.log(addTaskBtn);

const taskItems = document.querySelector("#task-items");
console.log(taskItems);

//--------------------------------------------------------------------
// Add Task in Popup
//--------------------------------------------------------------------

// For the popup for the custom time
//linking the html to the js
const addTaskPopup = document.querySelector("#task-popup");
console.log(addTaskPopup);

const addTaskInput = document.querySelector("#task-input");
console.log(addTaskInput);

const addTasklistBtn = document.querySelector("#add-tasklist");
console.log(setCustomBtn);

const cancelTasklistBtn = document.querySelector("#cancel-tasklist");
console.log(cancelTasklistBtn);

const taskDoneSound = document.querySelector("#task-done-sound");
console.log(taskDoneSound);

//setting the max number of task
const maxTask = 4;

// Show popup when "add task" is clicked
addTaskBtn.addEventListener("click", function () {
  addTaskPopup.classList.remove("hidden");
  // Used so that if there was another value written inside it will be removed
  addTaskInput.value = "";
  // used so that the user can immediately start writting without having to use the cursor to hit the text box
  addTaskInput.focus();
});

//makes the task list close when the cancel button is hit
cancelTasklistBtn.addEventListener("click", function () {
  addTaskPopup.classList.add("hidden");
});

// Add task when "Add" is clicked
addTasklistBtn.addEventListener("click", function () {
  // puts down what the user written and removes the extra spaces
  const taskText = addTaskInput.value.trim();

  // converting the word users key in into li elemts
  if (taskText.trim()) {
    // ensuring that the number of task does not exceed the number of allow task which is 4
    if (taskItems.children.length < maxTask) {
      // creating a li element on the html
      const li = document.createElement("li");

      //making it that the text they write are the task shown
      li.textContent = taskText;

      // this is used for the hover animation
      const originalText = taskText;

      // to show when a text when the task is hovered over
      // This was done so the uses know to click to remove the task
      li.addEventListener("mouseenter", function () {
        li.textContent = "Remove?";
        li.style.textAlign = "center";
        li.style.fontStyle = "bold";
      });

      // Unhover: restore original task
      li.addEventListener("mouseleave", function () {
        li.textContent = originalText;
        // reset to default
        li.style.textAlign = "";
        li.style.fontWeight = "";
      });

      // Click to remove the li
      li.addEventListener("click", function () {
        li.remove();
        // playing the sound when the task is completed
        taskDoneSound.play();
      });

      // adding it to the html using appendChild which will add it to the end of the li in the html
      taskItems.appendChild(li);

      // after task is added the popup  will become hidden
      addTaskPopup.classList.add("hidden");
    } else {
      // If the task limit is reached, show an alert
      alert("You have reached the maximum number of tasks.");
    }
  } else {
    // of there is nothing written in the text box
    alert("Please enter a task.");
  }
});

//--------------------------------------------------------------------
// Focus
//--------------------------------------------------------------------

//linking the html to the js
const focusBtn = document.querySelector("#focus-btn");
console.log(focusBtn);

// had to used qureySelectorAll since there is multiple items i want to hide in the code
const focusModeHideElements = document.querySelectorAll(".focus-mood-hide");
console.log(focusModeHideElements);

const timerGroup = document.querySelector(".timer-group");
console.log(timerGroup);

const countdownDisplay2 = document.querySelector("#countdown-display");
console.log(countdownDisplay2);

const timerButtons = document.querySelectorAll(".timer");
console.log(timerButtons);

const timerParent = document.querySelector(".timer-group");
console.log(timerParent);

// this is to define the state of the og focusmode so that it can keep track what is the og state
let focusMode = false;

focusBtn.addEventListener("click", function () {
  // so that the state will change when the button is pressed

  focusMode = !focusMode;

  if (focusMode) {
    // since there is multiple things i want to hide in the script i need to use a 'foreach' to make sure it looks for all the 'focus-mood-hide'
    // Turn ON focus mode
    focusModeHideElements.forEach((element) => element.classList.add("hidden"));

    // I needed to delete the elements instead of just hiding it since I wanted the box to be adjusted to the size of the timer
    // Learnt to use .remove()

    // Wanted to do this since it was a focus mode I thought of having as little elements in the page as possible
    timerButtons.forEach((el) => el.remove());

    // changing the text
    focusBtn.textContent = "Focus Mode: On";
  } else {
    // Turn OFF focus mode
    focusModeHideElements.forEach((el) => el.classList.remove("hidden"));

    // to restore the elements to the og place i had to add where i found it otherwise it will go to another group

    timerButtons.forEach((el) => {
      timerParent.appendChild(el);
    });

    // changing the text
    focusBtn.textContent = "Focus Mode: Off";
  }
});

//--------------------------------------------------------------------
// Infomation Popup
//--------------------------------------------------------------------

//linking the html to the js
const infoPopup = document.querySelector("#information-popup");
console.log(infoPopup);

const closeBtn = document.querySelector("#close-info-btn");
console.log(closeBtn);

const infoBtn = document.querySelector("#info-btn");
console.log(infoBtn);

infoBtn.addEventListener("click", function () {
  infoPopup.classList.remove("hidden");
});

closeBtn.addEventListener("click", function () {
  infoPopup.classList.add("hidden");
});

//so that the window can be closed whenever the user clicks
// outside the popup just in case users doesnt use the close button
window.addEventListener("click", function (e) {
  if (e.target === infoPopup) {
    infoPopup.classList.add("hidden");
  }
});

//--------------------------------------------------------------------
// Sound
//--------------------------------------------------------------------

// linking the HTML to the JS
const muteButton = document.querySelector("#mute-music");
console.log(muteButton);

const dotsSound = document.querySelector("#dots-sound");
console.log(dotsSound);

const circlesSound = document.querySelector("#circles-sound");
console.log(circlesSound);

const gradSound = document.querySelector("#gradient-sound");
console.log(gradSound);

const muteImg = muteButton.querySelector("#sound-off-btn");

let currentSound = gradSound; // Default sound is gradSound

// Tracking the music state (muted/unmuted)
let musicMuted = false;

// Pausing or playing the audio when clicked
muteButton.addEventListener("click", toggleAudio);

// Toggle mute/unmute functionality
function toggleAudio() {
  if (currentSound.paused || currentSound.ended) {
    currentSound.play();
    // Change to sound-on icon
    muteImg.src = "img/sound-on.svg";
    musicMuted = false;
  } else {
    currentSound.pause();
    // Change to sound-off icon
    muteImg.src = "img/sound-off.svg";
    musicMuted = true;
  }
}

// Function to switch theme sound
function switchThemeSound(newSound) {
  currentSound.pause();
  // Reset the sound to the beginning
  currentSound.currentTime = 0;

  currentSound = newSound;
  // to loop the current sound
  currentSound.loop = true;
  // Keep the mute state consistent
  // if musicMuted is true the sound will mute, but if musicMuted is false the sound will play normally
  currentSound.muted = musicMuted;

  if (!musicMuted) {
    // Play the sound if it is unmuted
    currentSound.play();
  }
}

//--------------------------------------------------------------------
// Play Video
//--------------------------------------------------------------------

// Linking the HTML to the JS
const myVideo = document.querySelector("#bg-video");
console.log(myVideo);

const playButton = document.querySelector("#play-pause-music");
console.log(playButton);

const playpauseImg = playButton.querySelector("#play-pause-btn");
console.log(playpauseImg);

playButton.addEventListener("click", function () {
  if (myVideo.paused) {
    myVideo.play();
    // Change icon to pause
    playpauseImg.src = "img/pause.svg";
  } else {
    myVideo.pause();
    // Change icon to play
    playpauseImg.src = "img/play.svg";
  }
});

//--------------------------------------------------------------------
// Theme Popup
//--------------------------------------------------------------------

// Linking the HTML to the JS
const themePopup = document.querySelector("#theme-popup");
console.log(themePopup);

const closeBtn2 = document.querySelector("#close-btn_2");
console.log(closeBtn2);

const themeBtn = document.querySelector("#theme-btn");
console.log(themeBtn);

const gradTheme = document.querySelector("#grad-btn");
console.log(gradTheme);

const dotsTheme = document.querySelector("#dots-btn");
console.log(dotsTheme);

const circleTheme = document.querySelector("#circles-btn");
console.log(circleTheme);

const myVideoSource = myVideo.querySelector("source");

themeBtn.addEventListener("click", function () {
  // Show the theme popup
  themePopup.classList.remove("hidden");
});

closeBtn2.addEventListener("click", function () {
  // Hide the theme popup
  themePopup.classList.add("hidden");
});

// Function to change video source
function changeThemeVideo(newVideoSrc) {
  // Set new video source
  myVideoSource.src = newVideoSrc;
  // Reload the video with the new source
  myVideo.load();
}

// Handle theme selection
gradTheme.addEventListener("click", function () {
  changeThemeVideo("video/Gradient.mp4");
  // Change to Gradient sound
  switchThemeSound(gradSound);
});

dotsTheme.addEventListener("click", function () {
  changeThemeVideo("video/Dots.mp4");
  // Change to Dots sound
  switchThemeSound(dotsSound);
});

circleTheme.addEventListener("click", function () {
  changeThemeVideo("video/Circles_final.mp4");
  // Change to Circles sound
  switchThemeSound(circlesSound);
});
