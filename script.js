'use strict';

// Players to modify styles
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

// total score variables
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

// current score totals
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

// button variables
const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const holdScore = document.querySelector('.btn--hold');

// dice picture
const diceEl = document.querySelector('.dice');

let scores, activePlayer, currentScore, playing;

// active player either 0 or 1
scores = [0, 0];
activePlayer = 0;
currentScore = 0;
playing = true;

// initialization function
const init = function () {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;
  // starting conditions
  score0El.textContent = 0;
  score1El.textContent = 0;
  document.getElementById('current--0').textContent = '0';
  document.getElementById('current--1').textContent = '0';
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  // add active player to player 0
  document.querySelector('.player--0').classList.add('player--active');
  //   set score for both players to zero
  console.log(scores);
  diceEl.classList.add('hidden');
};

// switch player function
const switchPlayer = function () {
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // remove player--active from one player to next
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

init();

// roll button event handler
rollDice.addEventListener('click', function () {
  if (playing) {
    // variable for random dice
    let randomNumber = Math.trunc(Math.random() * 6) + 1;

    //   display correct dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${randomNumber}.png`;

    if (randomNumber !== 1) {
      currentScore += randomNumber;
      // display current score under the active player
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // clear the score of active player
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      switchPlayer();
    }
  }
});

// Hold button
holdScore.addEventListener('click', function () {
  if (playing) {
    // add currentEL to score and add current to score
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
      console.log(currentScore, scores);
    }
  }
});

newGame.addEventListener('click', init);
