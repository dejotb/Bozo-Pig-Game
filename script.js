// selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');
const dice = document.querySelector('.dice');

// starting conditions
let activePlayer;
let currentScore;
let score;
let isPlaying;

// initializing game function
const init = function () {
  isPlaying = true;
  currentScore = 0;
  score = [0, 0];
  activePlayer = 0;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  document.querySelector('#score--0').textContent = 0;
  document.querySelector('#score--1').textContent = 0;
  document.querySelector('#current--0').textContent = 0;
  document.querySelector('#current--1').textContent = 0;
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  dice.classList.add(`hidden`);
};

init();

// switchin player function
const switchPlayer = function () {
  currentScore = 0;
  player0.classList.toggle(`player--active`);
  player1.classList.toggle(`player--active`);
  document.querySelector(
    `#current--${activePlayer}`
  ).textContent = currentScore;
  activePlayer = activePlayer ? (activePlayer = 0) : (activePlayer = 1);
};

// rolling a dice
btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    const diceRoll = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove(`hidden`);

    dice.src = `dice-${diceRoll}.png`;

    console.log(diceRoll);
    if (diceRoll != 1) {
      currentScore += diceRoll;
      document.querySelector(
        `#current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

// holding function
btnHold.addEventListener('click', function () {
  if (isPlaying) {
    score[`${activePlayer}`] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      score[`${activePlayer}`];
    if (score[`${activePlayer}`] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      dice.classList.add(`hidden`);
      currentScore = 0;
      isPlaying = false;
    } else switchPlayer();
  }
});

// function of a new game

btnNewGame.addEventListener('click', init);
