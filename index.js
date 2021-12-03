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

const store = {
  setLocalStorage(schedule) {
    localStorage.setItem("schedule", JSON.stringify(schedule));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("schedule"));
  },
};

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
  if (todayYear === year && todayMonth === month) {
    today = todayDate;
  }

  let daysHTML = [
    "<tr><th>SUN</th><th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th></tr>",
  ];

  const idxOfFirstDay = indexOfDay(year, month, 1);
  let days = 1;
  const totalDays = daysOftheMonth(year, month);

  while (days <= totalDays) {
    let start = 0;
    let end = 7;

    if (days === 1) {
      start = idxOfFirstDay;
    } else if (totalDays - days < 7) {
      end = totalDays - days + 1;
    }

    daysHTML.push(appendRow(days, start, end, today));

    days += end - start;
  }

  table.innerHTML = daysHTML.join("");

  const idxOfDay = indexOfDay(year, month, Math.abs(today));
  showDate(idxOfDay, Math.abs(today), month, year);
}

function appendRow(date, day, end, today) {
  let dayItem = [];

  for (let i = 0; i < end; i++) {
    dayItem.push(
      `<td ${today === date ? 'class="red"' : ""}>${i < day ? "" : date++}</td>`
    );
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

const template = (schedule, index, checked) => {
  return `<li data-id="${index}" class="schedule-item ${
    checked ? "checked" : ""
  }"><input class="schedule-item-checkbox" type="checkbox" ${
    checked ? "checked" : ""
  }>${schedule}</input><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 icon icon--trash" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg></li>`;
};

let scheduleList = [];

if (store.getLocalStorage()) {
  scheduleList = store.getLocalStorage();
  render();
}

function render() {
  $(".schedule-list").innerHTML = scheduleList
    .map((it, index) => template(it.schedule, index, it.checked))
    .join("");
}

$(".icon--plus").addEventListener("click", function () {
  let schedule = prompt("일정을 입력해주세요", "예) 12일 친구 생일");
  if (schedule) {
    scheduleList.push({ schedule: schedule });
    store.setLocalStorage(scheduleList);
    render();
  }
});

$(".schedule-list").addEventListener("dblclick", function (e) {
  if (e.target.classList.contains("schedule-item")) {
    let newSchedule = prompt("수정된 일정을 입력해주세요", e.target.innerText);
    let index = e.target.dataset.id;
    scheduleList[index][schedule] = newSchedule;
    store.setLocalStorage(scheduleList);
    render();
  }
});

$(".schedule-list").addEventListener("click", function (e) {
  if (e.target.classList.contains("icon--trash") || e.target.closest("svg")) {
    if (confirm("삭제하시겠습니까?")) {
      let index = e.target.dataset.id;
      scheduleList.splice(index, 1);
      store.setLocalStorage(scheduleList);
      render();
    }
  }

  if (e.target.classList.contains("schedule-item-checkbox")) {
    if (e.target.checked) {
      let index = e.target.closest("li").dataset.id;
      scheduleList[index].checked = !scheduleList[index].checked;
      store.setLocalStorage(scheduleList);
      render();
      // scheduleList[index].checked = !scheduleList[index].checked;
      // store.setLocalStorage(scheduleList);
      // render();
    }
  }
});

calendar(todayYear, todayMonth, todayDate);
