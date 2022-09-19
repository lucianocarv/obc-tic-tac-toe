const initializeGameButton = document.querySelector("input[name='start']");
initializeGameButton.addEventListener("click", preLoadGame);
const HTMLMain = document.querySelector("main");
const HTMLInitialScreenValid = document.querySelector(".initial-form");
const HTMLPlayer1 = document.querySelector("input[name='player1']");
const HTMLPlayer2 = document.querySelector("input[name='player2']");
let player1, player2;
HTMLPlayer1.focus();

function preLoadGame(ev) {
  if (ev.type == "click" || ev.key == "Enter") {
    player1 = HTMLPlayer1.value;
    player2 = HTMLPlayer2.value;
    HTMLNameOfFirstPlayer.innerText = player1;
    HTMLNameOfSecondPlayer.innerText = player2;
    HTMLInitialScreenValid.setAttribute("id", "initial-close");
    HTMLMain.classList.remove("main-op");
  }
}

const HTMLInputsPlayers = document.querySelectorAll(".player");
HTMLInputsPlayers.forEach((input) => {
  input.addEventListener("input", function () {
    let lenghtNamePlayer1 = Array.from(HTMLPlayer1.value).length;
    let lenghtNamePlayer2 = Array.from(HTMLPlayer2.value).length;
    if (lenghtNamePlayer1 > 1 && lenghtNamePlayer2 > 1) {
      initializeGameButton.disabled = false;
      window.addEventListener("keydown", preLoadGame);
    } else {
      initializeGameButton.disabled = true;
    }
  });
});

const HTMLNameOfFirstPlayer = document.getElementById("name-of-player-1");
const HTMLNameOfSecondPlayer = document.getElementById("name-of-player-2");
const HTMLResultView = document.getElementById("results-game");
const HTMLGameGridArea = document.querySelector(".area-game");
const HTMLFirstPlayerWinsCount = document.getElementById("counter-player-1");
const HTMLSecondPlayerWinsCount = document.getElementById("counter-player-2");
const HTMLPlayAgain = document.getElementById("btn");
const HTMLBoxesToBeMarked = document.querySelectorAll(".marker");

HTMLBoxesToBeMarked.forEach((marker) => {
  marker.addEventListener("click", handleBoxMarked);
});

HTMLPlayAgain.addEventListener("click", function () {
  HTMLBoxesToBeMarked.forEach((marker) => {
    marker.addEventListener("click", handleBoxMarked);
    marker.innerHTML = "";
    marker.classList.remove("winner");
    marker.classList.remove("tie-rotate");
    HTMLPlayAgain.disabled = true;
  });
  HTMLResultView.classList.remove("show-results");
  HTMLGameGridArea.classList.remove("tie");

  HTMLGameGridArea.classList.add("area-game-effect");
});

function handleBoxMarked(ev) {
  HTMLGameGridArea.classList.remove("area-game-effect");
  ev.target.removeEventListener("click", handleBoxMarked);
  const HTMLIconGame = document.createElement("span");
  HTMLIconGame.classList.add("material-symbols-outlined", "icon-size");
  if (HTMLNameOfFirstPlayer.classList.contains("current-player")) {
    HTMLIconGame.innerText = "close";
  } else if (HTMLNameOfSecondPlayer.classList.contains("current-player")) {
    HTMLIconGame.innerText = "circle";
  }

  ev.target.appendChild(HTMLIconGame);
  checkElementChildToPushArray(ev.target);
  HTMLNameOfFirstPlayer.classList.toggle("current-player");
  HTMLNameOfSecondPlayer.classList.toggle("current-player");
  ev.target.firstChild.classList.add("marked");
}

let gameVirtualMatrix = [
  [false, true, false],
  [false, true, true],
  [true, false, false],
];

function checkElementChildToPushArray(element) {
  const id = element.id;
  if (id == "mark-1") {
    gameVirtualMatrix[0][0] = element.firstChild.innerText;
  } else if (id == "mark-2") {
    gameVirtualMatrix[0][1] = element.firstChild.innerText;
  } else if (id == "mark-3") {
    gameVirtualMatrix[0][2] = element.firstChild.innerText;
  } else if (id == "mark-4") {
    gameVirtualMatrix[1][0] = element.firstChild.innerText;
  } else if (id == "mark-5") {
    gameVirtualMatrix[1][1] = element.firstChild.innerText;
  } else if (id == "mark-6") {
    gameVirtualMatrix[1][2] = element.firstChild.innerText;
  } else if (id == "mark-7") {
    gameVirtualMatrix[2][0] = element.firstChild.innerText;
  } else if (id == "mark-8") {
    gameVirtualMatrix[2][1] = element.firstChild.innerText;
  } else if (id == "mark-9") {
    gameVirtualMatrix[2][2] = element.firstChild.innerText;
  }
  vMatrixCheck(gameVirtualMatrix);
}

let countToTie = 0;
function vMatrixCheck(vMatrix) {
  if (vMatrix[0][0] == vMatrix[0][1] && vMatrix[0][0] == vMatrix[0][2]) {
    HTMLBoxesToBeMarked[0].classList.add("winner");
    HTMLBoxesToBeMarked[1].classList.add("winner");
    HTMLBoxesToBeMarked[2].classList.add("winner");
    checkWhichPlayer(vMatrix[0][0]);
    stopGameAndFreezePlays();
    showResultInPage(vMatrix[0][0]);
    countToTie = 0;
  } else if (vMatrix[1][0] == vMatrix[1][1] && vMatrix[1][0] == vMatrix[1][2]) {
    HTMLBoxesToBeMarked[3].classList.add("winner");
    HTMLBoxesToBeMarked[4].classList.add("winner");
    HTMLBoxesToBeMarked[5].classList.add("winner");
    checkWhichPlayer(vMatrix[1][0]);
    stopGameAndFreezePlays();
    showResultInPage(vMatrix[1][0]);
    countToTie = 0;
  } else if (vMatrix[2][0] == vMatrix[2][1] && vMatrix[2][0] == vMatrix[2][2]) {
    HTMLBoxesToBeMarked[6].classList.add("winner");
    HTMLBoxesToBeMarked[7].classList.add("winner");
    HTMLBoxesToBeMarked[8].classList.add("winner");
    checkWhichPlayer(vMatrix[2][0]);
    stopGameAndFreezePlays();
    showResultInPage(vMatrix[2][0]);
    countToTie = 0;
  } else if (vMatrix[0][0] == vMatrix[1][0] && vMatrix[0][0] == vMatrix[2][0]) {
    HTMLBoxesToBeMarked[0].classList.add("winner");
    HTMLBoxesToBeMarked[3].classList.add("winner");
    HTMLBoxesToBeMarked[6].classList.add("winner");
    checkWhichPlayer(vMatrix[0][0]);
    stopGameAndFreezePlays();
    showResultInPage(vMatrix[0][0]);
    countToTie = 0;
  } else if (vMatrix[0][1] == vMatrix[1][1] && vMatrix[0][1] == vMatrix[2][1]) {
    HTMLBoxesToBeMarked[1].classList.add("winner");
    HTMLBoxesToBeMarked[4].classList.add("winner");
    HTMLBoxesToBeMarked[7].classList.add("winner");
    checkWhichPlayer(vMatrix[0][1]);
    stopGameAndFreezePlays();
    showResultInPage(vMatrix[0][1]);
    countToTie = 0;
  } else if (vMatrix[0][2] == vMatrix[1][2] && vMatrix[0][2] == vMatrix[2][2]) {
    HTMLBoxesToBeMarked[2].classList.add("winner");
    HTMLBoxesToBeMarked[5].classList.add("winner");
    HTMLBoxesToBeMarked[8].classList.add("winner");
    checkWhichPlayer(vMatrix[0][2]);
    stopGameAndFreezePlays();
    showResultInPage(vMatrix[0][2]);
    countToTie = 0;
  } else if (vMatrix[0][0] == vMatrix[1][1] && vMatrix[0][0] == vMatrix[2][2]) {
    HTMLBoxesToBeMarked[0].classList.add("winner");
    HTMLBoxesToBeMarked[4].classList.add("winner");
    HTMLBoxesToBeMarked[8].classList.add("winner");
    checkWhichPlayer(vMatrix[0][0]);
    stopGameAndFreezePlays();
    showResultInPage(vMatrix[0][0]);
    countToTie = 0;
  } else if (vMatrix[0][2] == vMatrix[1][1] && vMatrix[0][2] == vMatrix[2][0]) {
    HTMLBoxesToBeMarked[2].classList.add("winner");
    HTMLBoxesToBeMarked[4].classList.add("winner");
    HTMLBoxesToBeMarked[6].classList.add("winner");
    checkWhichPlayer(vMatrix[0][2]);
    stopGameAndFreezePlays();
    showResultInPage(vMatrix[0][2]);
    countToTie = 0;
  } else {
    countToTie += 1;
    if (countToTie == 9) {
      chekGameTie();
      countToTie = 0;
    }
  }
}

function chekGameTie() {
  stopGameAndFreezePlays();
  HTMLBoxesToBeMarked.forEach((marker) => {
    marker.classList.add("tie-rotate");
  });
  HTMLGameGridArea.classList.add("tie");
  showResultInPage("empate");
}

function stopGameAndFreezePlays() {
  HTMLPlayAgain.disabled = false;
  HTMLBoxesToBeMarked.forEach((marker) => {
    marker.removeEventListener("click", handleBoxMarked);
  });
  gameVirtualMatrix = [
    [false, true, false],
    [false, true, true],
    [true, false, false],
  ];
}
function checkWhichPlayer(value) {
  HTMLPlayAgain.disabled = false;
  if (value === "close") {
    const player = player1;
    let wins = Number(HTMLFirstPlayerWinsCount.innerText);
    wins += 1;
    HTMLFirstPlayerWinsCount.innerText = wins;
    return player1;
  }
  if (value === "circle") {
    const player = player2;
    let wins = Number(HTMLSecondPlayerWinsCount.innerText);
    wins += 1;
    HTMLSecondPlayerWinsCount.innerText = wins;
    return player2;
  } else if (value === 3) {
    showResultInPage("empate");
  }
}

function showResultInPage(name) {
  if (name == "circle") {
    document.querySelector("#results-game h2").innerText = player2 + " venceu!";
    HTMLResultView.classList.add("show-results");
  } else if (name == "close") {
    document.querySelector("#results-game h2").innerText = player1 + " venceu!";
    HTMLResultView.classList.add("show-results");
  } else if ((name = "empate")) {
    document.querySelector("#results-game h2").innerText = "Empate";
    HTMLResultView.classList.add("show-results");
  }
}
