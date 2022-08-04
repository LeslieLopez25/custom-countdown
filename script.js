const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

const completeEl = document.getElementById("complete");
const completeElInfo = document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-button");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000; //ms
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// SET DATE INPUT MIN WITH TODAY'S DATE
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

// POPULATE COUNTDOWN / COMPLETE UI
function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // HIDE INPUT
    inputContainer.hidden = true;

    // IF THE COUNTDOWN HAS ENDED, SHOW COMPLETE
    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeElInfo.textContent = `${countdownTitle} Finished on ${countdownDate}`;
      completeEl.hidden = false;
    } else {
      // ELSE, SHOW THE COUNTDOWN IN PROGRESS
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      completeEl.hidden = true;
      countdownEl.hidden = false;
    }
  }, second);
}

// TAKE VALUES FROM FORM INPUT
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.target[0].value;
  countdownDate = e.target[1].value;
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };
  localStorage.setItem("countdown", JSON.stringify(savedCountdown));
  // CHECK FOR VALID DATE
  if (countdownDate === "") {
    alert("Please select a date for the countdown.");
  } else {
    // GET NUMBER VERSION OF CURRENT DATE, updateDOM
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

// RESET ALL VALUES
function reset() {
  // HIDE COUNTDOWNS, SHOW INPUT
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;
  // STOP THE COUNTDOWN
  clearInterval(countdownActive);
  // RESET VALUES
  countdownTitle = "";
  countdownDate = "";
  localStorage.removeItem("countdown");
}

function restorePreviousCountdown() {
  // GET COUNTDOWN FROM LOCALSTORAGE IF AVAILABLE
  if (localStorage.getItem("countdown")) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem("countdown"));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

// EVENT LISTENERS
countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);

// ON LOAD, CHECK LOCALSTORAGE
restorePreviousCountdown();
