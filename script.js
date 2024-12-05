"use strict";

let player1 = true;

// Selecting the current score elements
const score1 = document.querySelector("#score--1");
const score2 = document.querySelector("#score--2");

// Buttons Declarations
const rollDice = document.querySelector(".roll-dice");
const newGame = document.querySelector(".new-game");
const hold = document.querySelector(".hold");

const player0el = document.querySelector(".player--0");
const player1el = document.querySelector(".player--1");

// Dice images declarations
const dice = document.getElementById("dice"); // Dice image declaration

const diceOne = "./Assets/dice-1.png"; // Src of dice images
const diceTwo = "./Assets/dice-2.png"; // Src of dice images
const diceThree = "./Assets/dice-3.png"; // Src of dice images
const diceFour = "./Assets/dice-4.png"; // Src of dice images
const diceFive = "./Assets/dice-5.png"; // Src of dice images
const diceSix = "./Assets/dice-6.png"; // Src of dice images

let currentScore = 0;
let activePlayer = 0;
const playerScores = [0, 0];
let playing = true;

// Hiding the dice
dice.classList.add("hidden");

// Switch player function
const switchPlayerFunction = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0el.classList.toggle("player--active");
  player1el.classList.toggle("player--active");
};
// Function to assign dice images and update current score for each player
const assignDice = function assignDice(randomDiceRoll) {
  const diceImages = [diceOne, diceTwo, diceThree, diceFour, diceFive, diceSix];
  dice.src = diceImages[randomDiceRoll - 1];
};
// Event for Roll-Dice Button
rollDice.addEventListener("click", function () {
  if (playing) {
    let randomDiceRoll = Math.trunc(Math.random() * 6) + 1;

    // Display the dice
    dice.classList.remove("hidden");
    assignDice(randomDiceRoll);
    if (randomDiceRoll !== 1) {
      // Add dice to current score
      currentScore += randomDiceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayerFunction();
      currentScore += randomDiceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

hold.addEventListener("click", function () {
  if (playing) {
    // Add current score to global score of active player
    playerScores[activePlayer] += currentScore;
    console.log(playerScores[activePlayer]);
    document.querySelector(`.score--${activePlayer}`).textContent =
      playerScores[activePlayer];
    // Check if score is >= 100
    if (playerScores[activePlayer] >= 10) {
      document;
      // Hide the dice
      dice.classList.add("hidden");
      // Set play as false
      playing = false;
      // Displaying the win
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player-winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      document.querySelector(`.header--${activePlayer}`).textContent =
        "Hooray 🎉";
    } else {
      // Switch to the next player
      switchPlayerFunction();
    }
  }
});

newGame.addEventListener("click", function () {
  document.querySelector(`.header--${activePlayer}`).textContent = `PLAYER ${
    activePlayer + 1
  }`;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player-winner");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");
  playing = true;
  currentScore = 0;
  playerScores[0] = 0;
  playerScores[1] = 0;
  activePlayer = 0;
  document.querySelector(`.score--0`).textContent = 0;
  document.querySelector(`.score--1`).textContent = 0;

  document.querySelector("#current--0").textContent = 0;
  document.querySelector("#current--1").textContent = 0;
});
