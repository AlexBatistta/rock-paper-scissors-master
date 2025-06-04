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
  userDiv.style.scale = '125%';
  userDiv.classList.add(`${results[0].name}`);

  setTimeout(() => revealAiChoice(results), 500);
};

const revealAiChoice = (results) => {
  aiDiv.classList.remove('result-placeholder');
  aiDiv.classList.add('choice');
  aiDiv.style.scale = '125%';
  aiDiv.classList.add(`${results[1].name}`);

  setTimeout(() => checkWin(results), 500);
};

const checkWin = (results) => {
  let titleText = '';
  if (results[0].name === results[1].name) {
    titleText = "It's a tie!";
  } else if (results[0].beats === results[1].name) {
    titleText = 'You Win';
    userDiv.classList.add('winner');
    score.innerText = `${Number(score.innerText) + 10}`;
  } else {
    titleText = 'You Lose';
    aiDiv.classList.add('winner');
  }
  const title = document.getElementById('title-result');
  title.innerText = titleText;

  resultContainer.classList.remove('hidden');
  void resultContainer.offsetWidth;
  resultContainer.classList.add('show');
};

const restart = () => {
  console.log('RESTART');

  gameDiv.classList.remove('hidden');
  resultsDiv.classList.add('hidden');

  userDiv.classList = 'result-placeholder';
  aiDiv.classList = 'result-placeholder';

  resultContainer.classList.replace('show', 'hidden');
};
