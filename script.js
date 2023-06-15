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
    input.validity.valid = false;
    input.setAttribute("invalid", "true");
    return error.textContent = `Must be a valid ${type}`;
}

function mustBeInPast(input) {
    let error = input.parentNode.querySelector(".error");
    input.validity.valid = false;
    input.setAttribute("invalid", "true");
    return error.textContent = "Must be in the past";
}

function clearError(input) {
    let error = input.parentNode.querySelector(".error");
    input.validity.valid = true;
    input.setAttribute("invalid", "false"); 
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
    const inputs = [dayValue, monthValue, yearValue];
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

    inputs.forEach(e => {
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
}


function Calculate() {

  

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
  
    calcYearsElement.classList.add("animated-number");
    calcMonthsElement.classList.add("animated-number");
    calcDaysElement.classList.add("animated-number");
  
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

  showAnimatedAge();

  console.log(
    calcYears + " lat " + calcMonths + " miesięcy " + calcDays + " dni"
  );
/*   document.getElementById("calc-years").textContent = "0";
  setTimeout(() => {
    document.getElementById("calc-years").textContent = calcYears;
  }, 500);
  document.getElementById("calc-months").textContent = calcMonths;
  document.getElementById("calc-days").textContent = calcDays; */
}


form.addEventListener("submit", e => {
    e.preventDefault();
    inputValidate();
    clearCalculation();
    console.log(inpDay.getAttribute("invalid"));
    console.log(inpMonth.getAttribute("invalid"));
    console.log(inpYear.getAttribute("invalid"));

    if (inpDay.getAttribute("invalid") !== "true" && inpMonth.getAttribute("invalid") !== "true" && inpYear.getAttribute("invalid") !== "true") {
        console.log("calculating");
        Calculate();
    }
})
//submitCalc.addEventListener("click", Calculate);
