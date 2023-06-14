const inpDay = document.getElementById("day");
const inpMonth = document.getElementById("month");
const inpYear = document.getElementById("year");
const submitCalc = document.getElementById("btn-calculate");
const milisecInSec = 1000;
const secInMin = 60;
const minInHour = 60;
const hoursInDay = 24;
const milisecInDay = milisecInSec * secInMin * minInHour * hoursInDay;
let isLeap = false;
let daysInYear = isLeapYear ? 366 : 365;

let dayValue = inpDay.value;
let monthValue = inpMonth.value - 1;
let yearValue = inpYear.value;
let date = new Date(yearValue, monthValue, dayValue);

let today = new Date();
let day = today.getDate();
let month = today.getMonth();
let year = today.getFullYear();

function inputUpdate() {
    dayValue = inpDay.value;
    monthValue = inpMonth.value - 1;
    yearValue = inpYear.value;
    date = new Date(yearValue, monthValue, dayValue);
}

function isLeapYear(year) {
    return (year % 4 == 0 && year % 100 != 0 || year % 400 == 0);
}

function handleInput() {

}

function calculateLeapYears(calcYears) {
    let leapYears = 0;
    for (let i = year; i < calcYears; i--) {
        if (isLeapYear(i))
            leapYears++;
    }
    if (date.getMonth() > month || (date.getMonth() === month && date.getDate() > day)) {
        leapYears--;
    }
    return leapYears;
}

function Calculate() {
    inputUpdate();
    today = new Date();
    console.log("today " + today);
    console.log("date " + date);
    //let diff = new Date(Math.floor(today - date));
    let diff = today.getTime() - date.getTime();
    let age = new Date(diff);
    var calcYears = age.getUTCFullYear() - 1970;
    var calcMonths = age.getUTCMonth();
    var calcDays = age.getUTCDate() - 1;
    var leapYears = calculateLeapYears(calcYears);
    var leapDays = leapYears * 366;
    var notLeapDays = (calcYears - leapYears) * 365;
    calcDays -= (notLeapDays + leapDays);


    //today.setTime(today.getTime() - diff);
    /*
    diff.setFullYear(diff.getFullYear() - 1970);
    console.log(diff.getTime() / milisecInDay);
    let calcHours = diff / 3600;
    //let calcDays = Math.floor(diff.getTime() / milisecInDay);
    let calcDays = diff.getDate() - 1;
    //let calcYears = diff.getFullYear();
    //let calcDays = day - date.getDate();
    let calcYears = year - date.getFullYear();
    //let calcMonths = diff.getMonth();
    */
    
   //let calcDays = today.getDate();
   //let calcMonths = today.getMonth() + 1;
   //let calcYears = today.getFullYear();
    console.log(calcYears + " lat " + calcMonths + " miesięcy " + calcDays + " dni " );
    document.getElementById("calc-years").textContent = calcYears;
    document.getElementById("calc-months").textContent = calcMonths;
    document.getElementById("calc-days").textContent = calcDays;
}

submitCalc.addEventListener("click", e => {
    Calculate();
})
