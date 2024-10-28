let timeLeft = 45; // Default timer value in seconds
let defaultTime = 45; // Store the default timer value
let timerInterval = null;
let isRunning = false;
let currentClock = "clock"; // The currently selected clock (default digital)

// Audio elements for ticking and alarm sounds
const tickSound = document.getElementById("tick-sound");
const alarmSound = document.getElementById("alarm-sound");

const startStopButton = document.getElementById("start-stop");
const resetButton = document.getElementById("reset");
const timerText = document.getElementById("timer-text");

const modal = document.getElementById("modal");
const closeModalButton = document.getElementById("close-modal");
const confirmChangeButton = document.getElementById("confirm-change");
const newTimerValueInput = document.getElementById("new-timer-value");

// Function to update the display with the current time
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerText.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// Function to start or stop the timer
function toggleTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        startStopButton.textContent = "Start";
    } else {
        timerInterval = setInterval(countdown, 1000);
        isRunning = true;
        startStopButton.textContent = "Stop";
    }
}

// Countdown function
function countdown() {
    if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
        tickSound.play(); // Play tick sound
    } else {
        clearInterval(timerInterval);
        alarmSound.play(); // Play alarm sound
        isRunning = false;
        startStopButton.textContent = "Start";
    }
}

// Function to reset the timer
function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    timeLeft = defaultTime;
    updateDisplay();
    startStopButton.textContent = "Start";
}

// Function to open the modal to change the timer value
function openModal() {
    newTimerValueInput.value = timeLeft; // Set current time in the input field
    modal.style.display = 'block'; // Show the modal
}

// Function to change the timer value using the modal
function changeTimerValue() {
    openModal(); // Open the modal instead of prompt
}

// Close modal when 'X' is clicked
closeModalButton.onclick = function() {
    modal.style.display = 'none';
}

// When the user clicks the confirm button, update the timer
confirmChangeButton.onclick = function() {
    const newValue = parseInt(newTimerValueInput.value);
    if (newValue > 0) {
        timeLeft = newValue;
        defaultTime = timeLeft;
        updateDisplay();
        modal.style.display = 'none'; // Close modal after updating
    } else {
        alert("Please enter a valid time greater than 0.");
    }
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Function to set timer from preset button
function setPresetTimer(event) {
    const newTime = parseInt(event.target.getAttribute('data-time'));
    timeLeft = newTime;
    defaultTime = newTime;
    updateDisplay();
}

// Add event listeners to the preset buttons
const presetButtons = document.querySelectorAll('.preset-button');
presetButtons.forEach(button => {
    button.addEventListener('click', setPresetTimer);
});

// Add event listeners for start/stop and reset buttons
startStopButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);

// Add event listener to open modal when the timer display is clicked
timerText.addEventListener('click', changeTimerValue);

// Initialize the display with the default time
updateDisplay();
