const inpDay = document.getElementById("day");
const inpMonth = document.getElementById("month");
const inpYear = document.getElementById("year");
const submitCalc = document.getElementById("btn-calculate");

function inputUpdate() {
  const dayValue = parseInt(inpDay.value);
  const monthValue = parseInt(inpMonth.value) - 1;
  const yearValue = parseInt(inpYear.value);
  date = new Date(yearValue, monthValue, dayValue);
}


function Calculate() {
  inputUpdate();
  let today = new Date();

  let calcYears = today.getFullYear() - date.getFullYear();
  let calcMonths = today.getMonth() - date.getMonth();
  let calcDays = today.getDate() - date.getDate();
  // Korekta wyników
  if (calcDays < 0) {
    const daysInLastMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    ).getDate();
    calcDays = daysInLastMonth + calcDays;
    calcMonths--;
  }

  if (calcMonths < 0) {
    calcYears--;
    calcMonths += 12;
  }

  console.log(
    calcYears + " lat " + calcMonths + " miesięcy " + calcDays + " dni"
  );
  document.getElementById("calc-years").textContent = calcYears;
  document.getElementById("calc-months").textContent = calcMonths;
  document.getElementById("calc-days").textContent = calcDays;
}

submitCalc.addEventListener("click", Calculate);
