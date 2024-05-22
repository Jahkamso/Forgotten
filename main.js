const displayText = document.getElementById("display-text");
const startButton = document.getElementById("start-btn");
const stopButton = document.getElementById("stop-btn");
const editButton = document.getElementById("edit-btn");
const editPopup = document.getElementById("edit-popup");
const inputField = document.getElementById("input-field");
const notificatonAudio = document.getElementById("notification-audio")
const userReminder = document.getElementById("user-reminder")
const alertText = document.getElementById("alert-text");
let userTimerSet = displayText.innerHTML;

let countdownInterval;

function startCountdown(duration) {
  let timer = duration * 60,
    minutes,
    seconds;
  countdownInterval = setInterval(() => {
    minutes = Math.floor(timer / 60);
    seconds = timer % 60;

    // Ensure double digits format for seconds
    seconds = seconds < 10 ? "0" + seconds : seconds;

    displayText.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      clearInterval(countdownInterval);
      displayText.textContent = "0:00";
      console.log("One minute has passed!");
      alertText.style.opacity = "100%";
      notificatonAudio.play() // plays audio to notify the user that the timer has completed
      setTimeout(() => { // runs the action after 5 seconds
        alertText.style.opacity = 0;
        startCountdown(duration);
      }, 20000);
    }
  }, 1000);
}

function stopCountDown() {
  clearInterval(countdownInterval);
  displayText.innerHTML = userTimerSet;
}

function getUserInput() {
  return inputField.value;
}

function getUserReminder() {
  return userReminder.value;
}

startButton.addEventListener("click", () => {
  startButton.style.display = "none";
  stopButton.style.display = "block";
  startCountdown(userTimerSet);
});

stopButton.addEventListener("click", () => {
  stopCountDown();
  startButton.style.display = "block";
  stopButton.style.display = "none";
});

function hideModal() {
  editPopup.style.display = "none"
  editButton.innerText = "Edit"
  inputField.value = ""
  userReminder.value = ""
}

editButton.addEventListener("click", () => {
  if (editButton.innerText === "Edit") { // checks if the text of the edit button matches what we want
    editPopup.style.display = "block";
    editButton.innerText = "Save";
  } else if (editButton.innerText === "Save") {
    const userInput = getUserInput(); // Retrieve user input
    const userReminderInput = getUserReminder()
    stopCountDown()
  //   startCountdown(userInput)
  startButton.style.display = "block";
  stopButton.style.display = "none";
    inputField.value = ""
    userReminder.value = ""
    if (userInput === "" || userReminderInput === "") {
      alert("Input all fields"); // alerts the user to fill in the input field
    } else if (userInput !== "" && userReminderInput !== "") {
      displayText.innerHTML = userInput;
      alertText.innerHTML = userReminderInput;
      userTimerSet = parseInt(userInput); // converts the userInput from a string to number
      editButton.innerText = "Edit";
      editPopup.style.display = "none";
    }
  }
});
