function myFunction() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}

// Timer functionality
let countdownInterval;

function startTimer() {
  const minutesInput = document.getElementById("minutes").value;
  let timeInSeconds = parseInt(minutesInput) * 60;
  const display = document.getElementById("countdown-display");

  if (isNaN(timeInSeconds) || timeInSeconds <= 0) {
    display.textContent = "Please enter a valid number of minutes.";
    return;
  }

  clearInterval(countdownInterval); // Clear any previous timer

  countdownInterval = setInterval(() => {
    const mins = Math.floor(timeInSeconds / 60);
    const secs = timeInSeconds % 60;
    display.textContent = `Time left: ${mins}:${secs < 10 ? "0" + secs : secs}`;
    timeInSeconds--;

    if (timeInSeconds < 0) {
      clearInterval(countdownInterval);
      display.textContent = "Time's up!";
      alert("⏰ Timer finished!");
    }
  }, 1000);
}
