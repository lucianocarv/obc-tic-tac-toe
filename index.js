let names = false;
let player1;
let player2;

const initialScreen = document.querySelector(".initial-form");
const p1 = document.querySelector("input[name='player1']");
const p2 = document.querySelector("input[name='player2']");
const textInputs = document.querySelectorAll(".player");
const btStart = document.querySelector("input[name='start']");
const main = document.querySelector("main");

p1.focus();

const user1 = document.getElementById("name-of-player-1");
const user2 = document.getElementById("name-of-player-2");

textInputs.forEach((input) => {
  input.addEventListener("input", function () {
    let leng1 = Array.from(p1.value).length;
    let leng2 = Array.from(p2.value).length;
    if (leng1 > 1 && leng2 > 1) {
      btStart.disabled = false;
      window.addEventListener("keydown", loadGame);
    } else {
      btStart.disabled = true;
    }
  });
});
btStart.addEventListener("click", loadGame);

function loadGame(ev) {
  if (ev.type == "click" || ev.key == "Enter") {
    player1 = p1.value;
    player2 = p2.value;
    user1.innerText = player1;
    user2.innerText = player2;
    initialScreen.setAttribute("id", "initial-close");
    main.classList.remove("main-op");
  }
}

const divResult = document.getElementById("results-game");
const areaGame = document.querySelector(".area-game");

const counterWinsPlayer1 = document.getElementById("counter-player-1");
const counterWinsPlayer2 = document.getElementById("counter-player-2");

const markers = document.querySelectorAll(".marker");
markers.forEach((marker) => {
  marker.addEventListener("click", mark);
});

const replayBtn = document.getElementById("refresh");
replayBtn.addEventListener("click", function () {
  markers.forEach((marker) => {
    marker.addEventListener("click", mark);
    marker.innerHTML = "";
    marker.classList.remove("winner");
    marker.classList.remove("tie-rotate");
    replayBtn.disabled = true;
  });
  divResult.classList.remove("show-results");
  areaGame.classList.remove("tie");

  areaGame.classList.add("area-game-effect");
});

function mark(ev) {
  areaGame.classList.remove("area-game-effect");
  ev.target.removeEventListener("click", mark);
  const icon = document.createElement("span");
  icon.classList.add("material-symbols-outlined", "icon-size");
  if (user1.classList.contains("current-player")) {
    icon.innerText = "close";
  } else if (user2.classList.contains("current-player")) {
    icon.innerText = "circle";
  }

  ev.target.appendChild(icon);
  verify(ev.target);
  user1.classList.toggle("current-player");
  user2.classList.toggle("current-player");
  ev.target.firstChild.classList.add("marked");
}

let results = [
  [false, true, false],
  [false, true, true],
  [true, false, false],
];

function verify(element) {
  const id = element.id;
  if (id == "mark-1") {
    results[0][0] = element.firstChild.innerText;
  } else if (id == "mark-2") {
    results[0][1] = element.firstChild.innerText;
  } else if (id == "mark-3") {
    results[0][2] = element.firstChild.innerText;
  } else if (id == "mark-4") {
    results[1][0] = element.firstChild.innerText;
  } else if (id == "mark-5") {
    results[1][1] = element.firstChild.innerText;
  } else if (id == "mark-6") {
    results[1][2] = element.firstChild.innerText;
  } else if (id == "mark-7") {
    results[2][0] = element.firstChild.innerText;
  } else if (id == "mark-8") {
    results[2][1] = element.firstChild.innerText;
  } else if (id == "mark-9") {
    results[2][2] = element.firstChild.innerText;
  }
  verifyArr(results);
}

let countForTie = 0;
function verifyArr(results) {
  if (results[0][0] == results[0][1] && results[0][0] == results[0][2]) {
    markers[0].classList.add("winner");
    markers[1].classList.add("winner");
    markers[2].classList.add("winner");
    verifyPlayer(results[0][0]);
    breakGame();
    showResult(results[0][0]);
    countForTie = 0;
  } else if (results[1][0] == results[1][1] && results[1][0] == results[1][2]) {
    markers[3].classList.add("winner");
    markers[4].classList.add("winner");
    markers[5].classList.add("winner");
    verifyPlayer(results[1][0]);
    breakGame();
    showResult(results[1][0]);
    countForTie = 0;
  } else if (results[2][0] == results[2][1] && results[2][0] == results[2][2]) {
    markers[6].classList.add("winner");
    markers[7].classList.add("winner");
    markers[8].classList.add("winner");
    verifyPlayer(results[2][0]);
    breakGame();
    showResult(results[2][0]);
    countForTie = 0;
  } else if (results[0][0] == results[1][0] && results[0][0] == results[2][0]) {
    markers[0].classList.add("winner");
    markers[3].classList.add("winner");
    markers[6].classList.add("winner");
    verifyPlayer(results[0][0]);
    breakGame();
    showResult(results[0][0]);
    countForTie = 0;
  } else if (results[0][1] == results[1][1] && results[0][1] == results[2][1]) {
    markers[1].classList.add("winner");
    markers[4].classList.add("winner");
    markers[7].classList.add("winner");
    verifyPlayer(results[0][1]);
    breakGame();
    showResult(results[0][1]);
    countForTie = 0;
  } else if (results[0][2] == results[1][2] && results[0][2] == results[2][2]) {
    markers[2].classList.add("winner");
    markers[5].classList.add("winner");
    markers[8].classList.add("winner");
    verifyPlayer(results[0][2]);
    breakGame();
    showResult(results[0][2]);
    countForTie = 0;
  } else if (results[0][0] == results[1][1] && results[0][0] == results[2][2]) {
    markers[0].classList.add("winner");
    markers[4].classList.add("winner");
    markers[8].classList.add("winner");
    verifyPlayer(results[0][0]);
    breakGame();
    showResult(results[0][0]);
    countForTie = 0;
  } else if (results[0][2] == results[1][1] && results[0][2] == results[2][0]) {
    markers[2].classList.add("winner");
    markers[4].classList.add("winner");
    markers[6].classList.add("winner");
    verifyPlayer(results[0][2]);
    breakGame();
    showResult(results[0][2]);
    countForTie = 0;
  } else {
    countForTie += 1;
    if (countForTie == 9) {
      tie();
      countForTie = 0;
    }
  }
}

function tie() {
  breakGame();
  markers.forEach((marker) => {
    marker.classList.add("tie-rotate");
  });
  areaGame.classList.add("tie");
  showResult("empate");
}

function breakGame() {
  replayBtn.disabled = false;
  markers.forEach((marker) => {
    marker.removeEventListener("click", mark);
  });
  results = [
    [false, true, false],
    [false, true, true],
    [true, false, false],
  ];
}
function verifyPlayer(value) {
  replayBtn.disabled = false;
  if (value === "close") {
    const player = player1;
    let wins = Number(counterWinsPlayer1.innerText);
    wins += 1;
    counterWinsPlayer1.innerText = wins;
    return player1;
  }
  if (value === "circle") {
    const player = player2;
    let wins = Number(counterWinsPlayer2.innerText);
    wins += 1;
    counterWinsPlayer2.innerText = wins;
    return player2;
  } else if (value === 3) {
    showResult("empate");
  }
}

function showResult(name) {
  if (name == "circle") {
    document.querySelector("#results-game h2").innerText = player2 + " venceu!";
    divResult.classList.add("show-results");
  } else if (name == "close") {
    document.querySelector("#results-game h2").innerText = player1 + " venceu!";
    divResult.classList.add("show-results");
  } else if ((name = "empate")) {
    document.querySelector("#results-game h2").innerText = "Empate";
    divResult.classList.add("show-results");
  }
}
