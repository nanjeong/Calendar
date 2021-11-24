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

function dayOfTheWeek(year, month, day) {
  let days = 0;

  for (var y = 1; y < year; y++) {
    if (isLeapYear(y)) {
      days += 366;
    } else {
      days += 365;
    }
  }

  for (var m = 1; m <= month; m++) {
    days += daysOftheMonth(year, m);
  }

  days += day;

  return days % 7;
}

function daysOftheMonth(year, month) {
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12: {
      return 31;
    }
    case 4:
    case 6:
    case 9:
    case 11: {
      return 30;
    }
    default: {
      if (isLeapYear(year)) {
        return 29;
      } else {
        return 28;
      }
    }
  }
}

function isLeapYear(year) {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return true;
  }
  return false;
}

function calendar(year, month) {
  var day = dayOfTheWeek(year, month, 1);
  var date = 1;
  var daysOfTheMonth = daysOftheMonth(year, month + 1);
  console.log(daysOfTheMonth);

  while (date <= daysOfTheMonth) {
    if (date === 1) {
      date = appendRow(date, day);
    } else if (daysOfTheMonth - date < 7) {
      date = appendRow(date, 0, daysOfTheMonth - date + 1);
    } else {
      date = appendRow(date);
    }
  }
}

function appendRow(date, day = 0, end = 7) {
  var tr = document.createElement("tr");
  var tdSun = document.createElement("td");
  var tdMon = document.createElement("td");
  var tdTue = document.createElement("td");
  var tdWed = document.createElement("td");
  var tdThu = document.createElement("td");
  var tdFri = document.createElement("td");
  var tdSat = document.createElement("td");

  var tdList = [tdSun, tdMon, tdTue, tdWed, tdThu, tdFri, tdSat];

  for (var i = day; i < end; i++) {
    tdList[i].innerHTML = date;
    date++;
  }

  var table = document.querySelector(".calendar");
  tr.appendChild(tdSun);
  tr.appendChild(tdMon);
  tr.appendChild(tdTue);
  tr.appendChild(tdWed);
  tr.appendChild(tdThu);
  tr.appendChild(tdFri);
  tr.appendChild(tdSat);
  table.appendChild(tr);

  return date;
}

calendar(todayYear, todayMonth);
