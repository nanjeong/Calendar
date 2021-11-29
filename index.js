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

function calendar(year, month, today = -1) {
  var idxOfDay = indexOfDay(year, month, 1);
  var days = 1;
  const totalDays = daysOftheMonth(year, month);

  if (todayYear === year && todayMonth === month) {
    today = todayDate;
  }

  showDate(idxOfDay, Math.abs(today), month, year);

  let daysHTML = [
    "<tr><th>SUN</th><th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th></tr>",
  ];

  while (days <= totalDays) {
    let start = 0;
    let end = 7;

    if (days === 1) {
      start = idxOfDay;
    } else if (totalDays - days < 7) {
      end = totalDays - days + 1;
    }

    daysHTML.push(appendRow(days, start, end, today));

    days += end - start;
  }

  table.innerHTML = daysHTML.join("");
}

function appendRow(date, day, end, today) {
  let dayItem = [];

  for (let i = 0; i < end; i++) {
    if (i < day) {
      dayItem.push("<td></td>");
    } else {
      if (today === date) {
        dayItem.push(`<td class="red">${date}</td>`);
      } else {
        dayItem.push(`<td>${date}</td>`);
      }
      date++;
    }
  }

  return "<tr>" + dayItem.join("") + "</tr>";
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

  calendar(moveYear, moveMonth);
});

$(".icon--left").addEventListener("click", function () {
  moveMonth--;
  if (moveMonth < 0) {
    moveMonth = 11;
    moveYear--;
  }

  calendar(moveYear, moveMonth);
});

calendar(todayYear, todayMonth, todayDate);
