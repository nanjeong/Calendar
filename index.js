let today = new Date();

let todayDay = today.getDay();
let todayDate = today.getDate();
let todayMonth = today.getMonth();
let todayYear = today.getFullYear();

const dayList = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const monthList = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

let day = document.querySelector("#day");
let date = document.querySelector("#date");
let month = document.querySelector("#month");
let year = document.querySelector("#year");

day.textContent = dayList[todayDay];
date.textContent = todayDate;
month.textContent = monthList[todayMonth];
year.textContent = todayYear;

function firstDayOfTheMonth(todayYear, todayMonth, todayDay) {
  let days = 0;

  for (var y = 1; y < todayYear; y++) {
    if (isLeapYear(y)) {
      days += 366;
    } else {
      days += 365;
    }
  }

  for (var m = 1; m <= todayMonth; m++) {
    switch (m) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12: {
        days += 31;
        break;
      }
      case 4:
      case 6:
      case 9:
      case 11: {
        days += 30;
        break;
      }
      default: {
        if (isLeapYear(todayYear)) {
          days += 29;
        } else {
          days += 28;
        }
      }
    }
  }

  days += todayDay;

  return dayList[days % 7];
}

function isLeapYear(year) {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return true;
  }
  return false;
}
