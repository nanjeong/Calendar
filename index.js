const today = new Date();

const todayDay = today.getDay();
const todayDate = today.getDate();
const todayMonth = today.getMonth();
const todayYear = today.getFullYear();
let moveMonth = todayMonth;
let moveYear = todayYear;

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

const $ = (selector) => document.querySelector(selector);
const $create = (tagName) => document.createElement(tagName);
const table = $(".calendar");

function showDate(setDay, setDate, setMonth, setYear) {
  $("#day").textContent = dayList[setDay];
  $("#date").textContent = setDate;
  $("#month").textContent = monthList[setMonth];
  $("#year").textContent = setYear;
}

function indexOfDay(year, month, date) {
  let days = 0;

  for (var y = 1; y < year; y++) {
    if (isLeapYear(y)) {
      days += 366;
    } else {
      days += 365;
    }
  }

  for (var m = 0; m < month; m++) {
    days += daysOftheMonth(year, m);
  }

  days += date;

  return days % 7;
}

function daysOftheMonth(year, month) {
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 1 && isLeapYear(year)) {
    return 29;
  }
  return days[month];
}

function isLeapYear(year) {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return true;
  }
  return false;
}

function calendar(year, month, today) {
  var idxOfDay = indexOfDay(year, month, 1);
  var days = 1;
  var totalDays = daysOftheMonth(year, month);

  if (todayYear !== year || todayMonth !== month) {
    today = -1;
  }

  while (days <= totalDays) {
    if (days === 1) {
      days = appendRow(days, idxOfDay, 7, today);
    } else if (totalDays - days < 7) {
      days = appendRow(days, 0, totalDays - days + 1, today);
    } else {
      days = appendRow(days, 0, 7, today);
    }
  }
}

function appendRow(date, day, end, today) {
  var tr = $create("tr");
  var tdSun = $create("td");
  var tdMon = $create("td");
  var tdTue = $create("td");
  var tdWed = $create("td");
  var tdThu = $create("td");
  var tdFri = $create("td");
  var tdSat = $create("td");

  var tdList = [tdSun, tdMon, tdTue, tdWed, tdThu, tdFri, tdSat];

  for (var i = day; i < end; i++) {
    tdList[i].textContent = date;
    if (today === date) {
      tdList[i].style.color = "red";
    }
    date++;
  }

  showDate(todayDay, todayDate, todayMonth, todayYear);

  for (let i = 0; i < 7; i++) {
    tr.appendChild(tdList[i]);
  }
  table.appendChild(tr);

  return date;
}

function removeCalendar() {
  var tr = document.querySelectorAll("tr");

  for (var i = 1; i < tr.length; i++) {
    table.removeChild(tr[i]);
  }
}

function resetCalendar(moveYear, moveMonth) {
  removeCalendar();
  calendar(moveYear, moveMonth, todayDate);

  if (moveYear === todayYear && moveMonth === todayMonth) {
    showDate(todayDay, todayDate, moveMonth, moveYear);
  } else {
    showDate(indexOfDay(moveYear, moveMonth, 1), 1, moveMonth, moveYear);
  }
}

table.addEventListener("click", (e) => {
  if (e.target.tagName === "TD" && e.target.textContent !== "") {
    const date = parseInt(e.target.textContent);
    const month = monthList.indexOf($("#month").textContent);
    const year = parseInt($("#year").textContent);
    const day = indexOfDay(year, month, date);
    showDate(day, date, month, year);
  }
});

$(".icon--right").addEventListener("click", function () {
  moveMonth++;
  if (moveMonth === 12) {
    moveMonth = 0;
    moveYear++;
  }

  resetCalendar(moveYear, moveMonth);
});

$(".icon--left").addEventListener("click", function () {
  moveMonth--;
  if (moveMonth < 0) {
    moveMonth = 11;
    moveYear--;
  }

  resetCalendar(moveYear, moveMonth);
});

calendar(todayYear, todayMonth, todayDate);
