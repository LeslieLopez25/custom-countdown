const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;

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

    // POPULATE COUNTDOWN
    countdownElTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${minutes}`;
    timeElements[3].textContent = `${seconds}`;

    // HIDE INPUT
    inputContainer.hidden = true;
    // SHOW COUNTDOWN
    countdownEl.hidden = false;
  }, second);
}

// TAKE VALUES FROM FORM INPUT
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.target[0].value;
  countdownDate = e.target[1].value;
  // GET NUMBER VERSION OF CURRENT DATE, updateDOM
  countdownValue = new Date(countdownDate).getTime();
  updateDOM();
}

// EVENT LISTENERS
countdownForm.addEventListener("submit", updateCountdown);
