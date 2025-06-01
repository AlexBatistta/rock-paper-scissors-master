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
const resultDivs = document.querySelectorAll('.results-result');

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

function displayResults(results) {
  gameDiv.classList.add('hidden');
  resultsDiv.classList.remove('hidden');
  void resultsDiv.offsetWidth;
  resultsDiv.classList.add('show');
  console.log(results);
}
