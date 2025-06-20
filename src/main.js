const btnRules = document.querySelector('.rules-btn');
const btnClose = document.querySelector('.close-btn');
const modalRules = document.querySelector('.modal');

// Show - Hide Rules Modal
btnRules.addEventListener('click', () => {
  modalRules.classList.toggle('show-modal');
  btnRules.blur();
});

btnClose.addEventListener('click', () => {
  modalRules.classList.toggle('show-modal');
});

const CHOICES = [
  {
    name: 'paper',
    beats: 'rock',
  },
  {
    name: 'scissors',
    beats: 'paper',
  },
  {
    name: 'rock',
    beats: 'scissors',
  },
];

const gameDiv = document.querySelector('.game-container');
const resultsDiv = document.querySelector('.results-container');
const userDiv = document.getElementById('user-result');
const aiDiv = document.getElementById('ai-result');
const score = document.querySelector('.score-points');
const resultContainer = document.querySelector('.result-game');
const restartBtn = document.querySelector('.reset-btn');
const winnerEffectGlobal = document.querySelector('.winner-effect-global');

restartBtn.addEventListener('click', () => restart());

document.querySelectorAll('.choice-btn').forEach((btn) => {
  btn.addEventListener('click', () => userChoose(btn));
});

// Game Logic
const userChoose = (button) => {
  const choiceName = button.dataset.choice;
  const choice = CHOICES.find((choice) => choice.name === choiceName);
  setChoose(choice);
};

const setChoose = (choice) => {
  displayResults([choice, aiChoose()]);
};

const aiChoose = () => {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
};

const displayResults = (results) => {
  gameDiv.classList.add('hidden');
  resultsDiv.classList.remove('hidden');
  void resultsDiv.offsetWidth;
  resultsDiv.classList.add('show');

  setTimeout(() => revealUserChoice(results), 500);
};

const revealUserChoice = (results) => {
  userDiv.classList.remove('result-placeholder');
  userDiv.classList.add('choice');
  userDiv.classList.add(`${results[0].name}`);
  userDiv.classList.add('choice-result');

  setTimeout(() => revealAiChoice(results), 500);
};

const revealAiChoice = (results) => {
  aiDiv.classList.remove('result-placeholder');
  aiDiv.classList.add('choice');
  aiDiv.classList.add(`${results[1].name}`);
  aiDiv.classList.add('choice-result');

  setTimeout(() => checkWin(results), 500);
};

const checkWin = (results) => {
  let titleText = '';
  winnerEffectGlobal.classList.remove('active');
  let winnerDiv = null;
  if (results[0].name === results[1].name) {
    titleText = "It's a tie!";
  } else if (results[0].beats === results[1].name) {
    titleText = 'You Win';
    score.innerText = `${Number(score.innerText) + 10}`;
    winnerDiv = userDiv;
  } else {
    titleText = 'You Lose';
    winnerDiv = aiDiv;
  }
  const title = document.getElementById('title-result');
  title.innerText = titleText;

  // Posicionar el efecto sobre el ganador
  if (winnerDiv) {
    const container = document.querySelector('.results-container');
    const winnerRect = winnerDiv.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    winnerEffectGlobal.style.top = winnerRect.top - containerRect.top + 'px';

    winnerEffectGlobal.classList.add('active');

    if (aiDiv === winnerDiv) {
      winnerEffectGlobal.style.left =
        winnerRect.left - containerRect.left + winnerRect.width / 2 + 'px';
      winnerEffectGlobal.style.marginLeft = '1.5rem';
    } else {
      winnerEffectGlobal.style.left =
        winnerRect.left - containerRect.left - winnerRect.width / 2 + 'px';
      winnerEffectGlobal.style.marginLeft = '-1.5rem';
    }
  } else {
    winnerEffectGlobal.classList.remove('active');
  }

  resultContainer.classList.remove('hidden');
  void resultContainer.offsetWidth;
  resultContainer.classList.add('show');
};

const restart = () => {
  winnerEffectGlobal.classList.remove('active');

  gameDiv.classList.remove('hidden');
  resultsDiv.classList.add('hidden');

  userDiv.classList = 'result-placeholder';
  aiDiv.classList = 'result-placeholder';

  resultContainer.classList.replace('show', 'hidden');
};

window.addEventListener('DOMContentLoaded', () => {
  const fade = document.querySelector('.page-fade');
  if (fade) {
    setTimeout(() => {
      fade.classList.add('fade-out');
      setTimeout(() => {
        fade.style.display = 'none';
      }, 800);
    }, 100);
  }
});
