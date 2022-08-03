const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

let countdownTitle = "";
let countdownDate = "";

// SET DATE INPUT MIN WITH TODAY'S DATE
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

// TAKE VALUES FROM FORM INPUT
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
}

// EVENT LISTENERS
countdownForm.addEventListener("submit", updateCountdown);
