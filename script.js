const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

// SET DATE INPUT MIN WITH TODAY'S DATE
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);
