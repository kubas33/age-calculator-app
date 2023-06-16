const inpDay = document.getElementById("day");
const inpMonth = document.getElementById("month");
const inpYear = document.getElementById("year");
const submitCalc = document.getElementById("btn-calculate");
const form = document.getElementById("date-form");
let dayValue;
let monthValue;
let yearValue;
let today = new Date();

function inputUpdate() {
  dayValue = parseInt(inpDay.value);
  monthValue = parseInt(inpMonth.value) - 1;
  yearValue = parseInt(inpYear.value);
  date = new Date(yearValue, monthValue, dayValue);
  console.log(date.toString());
  today = new Date();
}

function mustBeValidInput(input, type) {
    let error = input.parentNode.querySelector(".error");
    let label = input.parentNode.querySelector("label");
    input.setAttribute("invalid", "true");
    input.classList.add("invalid");
    label.classList.add("invalid");
    return error.textContent = `Must be a valid ${type}`;
}

function mustBeInPast(input) {
    let error = input.parentNode.querySelector(".error");
    let label = input.parentNode.querySelector("label");
    input.setAttribute("invalid", "true");
    input.classList.add("invalid");
    label.classList.add("invalid");
    return error.textContent = "Must be in the past";
}

function inputRequired(input) {
  console.log(input.value);
  let error = input.parentNode.querySelector(".error");
  let label = input.parentNode.querySelector("label");
  if (input.value === ""){
    input.setAttribute("invalid", "true");
    input.classList.add("invalid");
    label.classList.add("invalid");
    error.textContent = "This field is required";
  }
}

function clearError(input) {
    let error = input.parentNode.querySelector(".error");
    let label = input.parentNode.querySelector("label");
    input.setAttribute("invalid", "false");
    input.classList.remove("invalid");
    label.classList.remove("invalid");
    error.textContent = "";
}

function isLeapYear(year) {
    return (year % 4 == 0 && year % 100 != 0 || year % 400 == 0);
}

function clearCalculation() {
    document.getElementById("calc-years").textContent = "--";
    document.getElementById("calc-months").textContent = "--";;
    document.getElementById("calc-days").textContent = "--";;
}


function inputValidate() {
    inputUpdate();
    const inputsValues = [dayValue, monthValue, yearValue];
    const inputs = [inpDay, inpMonth, inpYear];
    if ((monthValue + 1) % 2 !== 0) {
        if (dayValue > 31) {
            //inpDay.validity.valid = false;
            mustBeValidInput(inpDay, "day");
        } else {
            clearError(inpDay);
            inpDay.validity.valid = true;
        }
    } else {
        if ((monthValue + 1) === 2) {
            if (!isLeapYear(yearValue)){
                if (dayValue > 28){
                    mustBeValidInput(inpDay, "day");
                }
                else {
                    clearError(inpDay);
                }
            }
            else if (dayValue > 29){
                mustBeValidInput(inpDay, "day");
            } else {
                clearError(inpDay);
            }
        } else if (dayValue > 30) {
            mustBeValidInput(inpDay, "day");
        } else {
            clearError(inpDay);
        }
    }

    if ((monthValue + 1) > 12) {
        mustBeValidInput(inpMonth, "month");
    } else {
        clearError(inpMonth);
    }

    if (yearValue > today.getFullYear()) {
        mustBeInPast(inpYear);
    } else if (yearValue == today.getFullYear()) {
        console.log("monthValue:" + monthValue + " today Month: " + today.getMonth());
        if (monthValue > today.getMonth()) {
            mustBeInPast(inpMonth);
        } else if (monthValue == today.getMonth()){
            if (dayValue > today.getDate()){
                mustBeInPast(inpDay);
            } else {
                clearError(inpDay);
                clearError(inpMonth);
                clearError(inpYear);
            }
        } else {
            clearError(inpMonth);
            clearError(inpYear);
        }
    } else {
        clearError(inpYear);
    }

    inputsValues.forEach(e => {
        if (e < 1) {
            console.log(monthValue);
            switch(e) {
                case dayValue:
                    mustBeValidInput(inpDay, "day");
                    break;
                case monthValue:
                    if (monthValue < 0) {
                        mustBeValidInput(inpMonth, "month");
                    }
                    break;
                case yearValue:
                    mustBeValidInput(inpYear, "year");
            }
        }
    });
    inputs.forEach(e => inputRequired(e));
}


function Calculate() {

    const ariaCalcYearsElement = document.getElementById("aria-calc-years");
    const ariaCalcMonthsElement = document.getElementById("aria-calc-months");
    const ariaCalcDaysElement = document.getElementById("aria-calc-days");

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

  let currentYears = 0;
  let currentMonths = 0;
  let currentDays = 0;

function showAnimatedAge() {
    const calcYearsElement = document.getElementById("calc-years");
    const calcMonthsElement = document.getElementById("calc-months");
    const calcDaysElement = document.getElementById("calc-days");


    if (currentYears < calcYears) {
      currentYears++;
      calcYearsElement.textContent = currentYears;
      setTimeout(showAnimatedAge, 50);
    } else if (currentMonths < calcMonths) {
      currentMonths++;
      calcMonthsElement.textContent = currentMonths;
      setTimeout(showAnimatedAge, 100);
    } else if (currentDays < calcDays) {
      currentDays++;
      calcDaysElement.textContent = currentDays;
      setTimeout(showAnimatedAge, 100);
    }
  }
  ariaCalcYearsElement.textContent = (calcYears);
  ariaCalcMonthsElement.textContent = (calcMonths);
  ariaCalcDaysElement.textContent = (calcDays);

  showAnimatedAge();
}

function runCalculation(e) {
  e.preventDefault();
    inputValidate();
    clearCalculation();

    if (inpDay.getAttribute("invalid") !== "true" && inpMonth.getAttribute("invalid") !== "true" && inpYear.getAttribute("invalid") !== "true") {
        console.log("calculating");
        Calculate();
    }
}

form.addEventListener("keydown", e =>{
  if (e.code === "Enter") {
    runCalculation(e);
  }
});

form.addEventListener("submit", e => {
   runCalculation(e);
})
//submitCalc.addEventListener("click", Calculate);
