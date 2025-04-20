//--------------------------------------------------------------------
// Tasklist Popup
//--------------------------------------------------------------------

// so that when the tasklist button is clicked the popup closes

//linking the html to the js
const tasklistBtn = document.querySelector("#tasklist-btn");
console.log(tasklistBtn);

const tasklistPopUp = document.querySelector(".task-list-group");
console.log(tasklistPopUp);

// defining the function
function toggleTasklistVisibility() {
  tasklistPopUp.classList.toggle("hidden");
}

// adding an action to when the button is clicked
tasklistBtn.addEventListener("click", toggleTasklistVisibility);

//--------------------------------------------------------------------
// Timer Popup
//--------------------------------------------------------------------

// so that when the timer button is clicked the popup closes

//linking the html to the js
const timerBtn = document.querySelector("#timer-btn");
console.log(timerBtn);

const timerPopUp = document.querySelector(".timer-group");
console.log(timerPopUp);

// defining the function
function toggleTimerVisibility() {
  timerPopUp.classList.toggle("hidden");
}

// adding an action to when the button is clicked
timerBtn.addEventListener("click", toggleTimerVisibility);

//--------------------------------------------------------------------
// Timer Popup Button
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

var timer; // holds the setInterval reference
var timeLeft = 30 * 60; // default 25 minutes
var isRunning = false; // prevent double-starts

// Helper to format seconds into MM:SS
function formatTime(seconds) {
  var mins = Math.floor(seconds / 60);
  var secs = seconds % 60;
  return (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;
}

// Update display
function updateDisplay() {
  countdownDisplay.textContent = formatTime(timeLeft);
}

// Start timer
function startTimer() {
  if (isRunning) return; // avoid multiple intervals
  isRunning = true;
  timer = setInterval(function () {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;
      alert("Time's up!");
    }
  }, 1000);
}

// Reset timer
function resetTimer() {
  // this clears the stop a timer if it running and sets a new one
  clearInterval(timer);
  // telling the program that 'the timer isnt running' so the user has to press start
  isRunning = false;
  //this is to set the timer for the pomodoro study method which is a 25 minute study time before a break
  timeLeft = 30 * 60;
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
// Timer Popup for Custom Time
//--------------------------------------------------------------------

// For the popup for the custom time
const customPopup = document.querySelector("#custom-popup");
console.log(customPopup);

const customMinutesInput = document.querySelector("#custom-minutes");
console.log(customMinutesInput);

const setCustomBtn = document.querySelector("#set-custom-timer");
console.log(setCustomBtn);

const cancelCustomBtn = document.querySelector("#cancel-custom");
console.log(cancelCustomBtn);

// Show popup when "Custom" is clicked
customBtn.addEventListener("click", function () {
  customPopup.classList.remove("hidden");
});

// Hide popup when cancel is clicked
cancelCustomBtn.addEventListener("click", function () {
  customPopup.classList.add("hidden");
});

// Set timer from custom input
// for this i had to research a bit and use chatgpt since I didn't know how to create a timer

setCustomBtn.addEventListener("click", function () {
  //it will take the value that user type into the minute box into a whole number
  const customMinutes = parseInt(customMinutesInput.value);

  // checking whether the number is a real value and also greater than 0
  if (!isNaN(customMinutes) && customMinutes > 0) {
    // this clears the stop a timer if it running and sets a new one
    clearInterval(timer);

    // telling the program that 'the timer isnt running' so the user has to press start
    isRunning = false;

    // this converts the minutes to seconds since the countdown runs in seconds
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

//setting the max number of task
const maxTask = 4;

// Show popup when "add task" is clicked
addTaskBtn.addEventListener("click", function () {
  addTaskPopup.classList.remove("hidden");
  // clear old input
  addTaskInput.value = "";
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

  // makes sure something is typed

  // converting the word users key in into li elemts

  if (taskText.trim()) {
    if (taskItems.children.length < maxTask) {
      const li = document.createElement("li");

      //making it that the text they write are the task shown
      li.textContent = taskText;

      // Click to remove the li
      li.addEventListener("click", function () {
        li.remove();
      });

      // adding it to the html using appendChild which will add it to the end of the li in the html
      taskItems.appendChild(li);

      // after task is added it will become hidden
      addTaskPopup.classList.add("hidden");
    } else {
      // If the task limit is reached, show an alert
      alert("You have reached the maximum number of tasks.");
    }
  } else {
    alert("Please enter a task.");
  }
});

//--------------------------------------------------------------------
// Focus
//--------------------------------------------------------------------

const focusBtn = document.querySelector("#focus-btn");
console.log(focusBtn);

const focusModeHideElements = document.querySelectorAll(".focus-mood-hide");
console.log(focusModeHideElements);

const timerGroup = document.querySelector(".timer-group");
const countdownDisplay2 = document.querySelector("#countdown-display");

focusBtn.addEventListener("click", function () {
  focusModeHideElements.forEach((el) => {
    const isHidden = el.classList.contains("hidden");

    if (isHidden) {
      // Show focus elements
      el.classList.remove("hidden");

      // Update focus button text
      focusBtn.textContent = "Focus Mode: On";

      // Hide timer buttons and center the countdown
      timerGroup.classList.add("focused"); // Adds focused class
      countdownDisplay2.style.display = "block"; // Ensure countdown is visible
    } else {
      // Hide focus elements
      el.classList.add("hidden");

      // Update focus button text
      focusBtn.textContent = "Focus Mode:";

      // Remove the focused class and show all timer elements
      timerGroup.classList.remove("focused");
      countdownDisplay2.style.display = "block"; // Show countdown display
    }
  });
});
