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

function setDate(setDay, setDate, setMonth, setYear) {
  let day = document.querySelector("#day");
  let date = document.querySelector("#date");
  let month = document.querySelector("#month");
  let year = document.querySelector("#year");

  day.textContent = dayList[setDay];
  date.textContent = setDate;
  month.textContent = monthList[setMonth];
  year.textContent = setYear;
}

setDate(todayDay, todayDate, todayMonth, todayYear);

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

function calendar(year, month, today) {
  var day = dayOfTheWeek(year, month, 1);
  var date = 1;
  var daysOfTheMonth = daysOftheMonth(year, month + 1);

  if (todayYear !== year || todayMonth !== month) {
    today = -1;
  }

  while (date <= daysOfTheMonth) {
    if (date === 1) {
      date = appendRow(date, day, 7, today, year, month);
    } else if (daysOfTheMonth - date < 7) {
      date = appendRow(date, 0, daysOfTheMonth - date + 1, today, year, month);
    } else {
      date = appendRow(date, 0, 7, today, year, month);
    }
  }
}

let table = document.querySelector(".calendar");

function appendRow(date, day, end, today, year, month) {
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
    tdList[i].addEventListener("click", changeDate(i, date, month, year));

    if (today === date) {
      tdList[i].style.color = "red";
    }
    date++;
  }

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

function changeDate(day, date, month, year) {
  return function () {
    setDate(day, date, month, year);
  };
}

calendar(todayYear, todayMonth, todayDate);

let moveMonth = todayMonth;
let moveYear = todayYear;

let rightIcon = document.querySelector(".icon--right");

rightIcon.addEventListener("click", function () {
  moveMonth++;
  if (moveMonth === 12) {
    moveMonth = 0;
    moveYear++;
  }

  resetCalendar(moveYear, moveMonth);
});

function removeCalendar() {
  var tr = document.querySelectorAll("tr");

  for (var i = 1; i < tr.length; i++) {
    table.removeChild(tr[i]);
  }
}

let leftIcon = document.querySelector(".icon--left");

leftIcon.addEventListener("click", function () {
  moveMonth--;
  if (moveMonth < 0) {
    moveMonth = 11;
    moveYear--;
  }

  resetCalendar(moveYear, moveMonth);
});

function resetCalendar(moveYear, moveMonth) {
  removeCalendar();
  calendar(moveYear, moveMonth, todayDate);

  if (moveYear === todayYear && moveMonth === todayMonth) {
    setDate(todayDay, todayDate, moveMonth, moveYear);
  } else {
    setDate(dayOfTheWeek(moveYear, moveMonth, 1), 1, moveMonth, moveYear);
  }
}
