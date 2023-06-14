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

function Calculate() {
    inputUpdate();
    today = new Date();
    console.log("today " + today);
    console.log("date " + date);
    let diff = new Date(Math.floor(today - date));
    console.log(diff.getTime() / milisecInDay);
    let calcHours = diff / 3600;
    //let calcDays = Math.floor(diff.getTime() / milisecInDay);
    let calcDays = diff.getDate() - 1;
    //let calcYears = year - yearValue;
    let calcYears = diff.getFullYear() - 1970;
    let calcMonths = diff.getMonth();
    console.log(calcYears + " lat " + calcMonths + " miesięcy " + calcDays + " dni " );
    document.getElementById("calc-years").textContent = calcYears;
    document.getElementById("calc-months").textContent = calcMonths;
    document.getElementById("calc-days").textContent = calcDays;
}

submitCalc.addEventListener("click", e => {
    Calculate();
})
