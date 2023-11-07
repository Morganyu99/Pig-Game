"use strict";
//Element Selector Function using querySelector
const selector = function (attribute) {
  return document.querySelector(attribute);
};

//Change text content function
const changeTextContent = function (attribute, context) {
  attribute.textContent = String(context);
};

//Selectors
const hold = selector(".btn--hold");
const player1Activity = selector(".player--0");
const player2Activity = selector(".player--1");
const rollDice = selector(".btn--roll");
const dice = selector(".dice");
const currentScore1 = selector("#current--0");
const currentScore2 = selector("#current--1");
const totalScore1 = selector("#score--0");
const totalScore2 = selector("#score--1");
const newGame = selector(".btn--new");
const playerName1 = selector("#name--0");
const playerName2 = selector("#name--1");

//Player 1 & 2 Stats
let playerCurrent, player1Total, player2Total, player1, player2, playing;

//Change Players
const changePlayers = function () {
  if (player1) {
    player1 = false;
    player2 = true;
    player1Activity.classList.remove("player--active");
    player2Activity.classList.add("player--active");
  } else if (player2) {
    player1 = true;
    player2 = false;
    player1Activity.classList.add("player--active");
    player2Activity.classList.remove("player--active");
  }
};

//Change Content for elements when rolled 1 or hold
const updatePlayers = function () {
  if (player1) {
    playerCurrent = 0;
    changeTextContent(currentScore1, 0);
  } else if (player2) {
    playerCurrent = 0;
    changeTextContent(currentScore2, 0);
  }
};

//Player reset function
const reset = function () {
  playerCurrent = 0;
  player1Total = 0;
  player2Total = 0;
  player1 = false;
  player2 = true;
  changeTextContent(currentScore1, 0);
  changeTextContent(currentScore2, 0);
  changeTextContent(totalScore1, 0);
  changeTextContent(totalScore2, 0);
  if (!dice.classList.contains("hidden")) dice.classList.add("hidden");
  changePlayers();
  playing = true;
  changeTextContent(playerName1, "Player 1");
  changeTextContent(playerName2, "Player 2");
  player1Activity.classList.remove("player--winner");
  player2Activity.classList.remove("player--winner");
};

//resetting before starting
reset();

//generating random number between 1-6 for rolling dice
const rollDiceNumber = function () {
  return Math.trunc(Math.random() * 6 + 1);
};
let diceNumber = 0;

//generate number when pressed roll dice and show Dice
rollDice.addEventListener("click", function () {
  if (playing) {
    diceNumber = rollDiceNumber();
    if (dice.classList.contains("hidden")) dice.classList.remove("hidden");
    dice.src = `dice-${diceNumber}.png`;
    if (diceNumber !== 1) {
      if (player1) {
        playerCurrent += diceNumber;
        changeTextContent(currentScore1, playerCurrent);
      } else if (player2) {
        playerCurrent += diceNumber;
        changeTextContent(currentScore2, playerCurrent);
      }
    } else {
      updatePlayers();
      changePlayers();
    }
  }
});

//winner check
const winnerCheck = function () {
  if (player1 && player1Total >= 100) {
    changeTextContent(playerName1, "Player 1 Wins!");
    playing = false;
    player1Activity.classList.add("player--winner");
    dice.classList.add("hidden");
    return true;
  } else if (player2 && player2Total >= 100) {
    changeTextContent(playerName2, "Player 2 Wins!");
    player2Activity.classList.add("player--winner");
    dice.classList.add("hidden");
    playing = false;
    return true;
  } else return false;
};

//Change when pressed hold
hold.addEventListener("click", function () {
  if (playing) {
    if (player1) {
      player1Total += playerCurrent;
      changeTextContent(totalScore1, player1Total);
    } else if (player2) {
      player2Total += playerCurrent;
      changeTextContent(totalScore2, player2Total);
    }
    updatePlayers();
    winnerCheck();
    if (!winnerCheck()) {
      changePlayers();
    }
  }
});

//New Game
newGame.addEventListener("click", reset);
