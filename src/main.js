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

  setTimeout(() => {
    userDiv.classList.remove('result-placeholder');
    userDiv.classList.add('choice');
    userDiv.style.scale = '125%';
    userDiv.classList.add(`${results[0].name}`);

    setTimeout(() => {
      aiDiv.classList.remove('result-placeholder');
      aiDiv.classList.add('choice');
      aiDiv.style.scale = '125%';
      aiDiv.classList.add(`${results[1].name}`);

      setTimeout(() => {
        checkWin(results);
      }, 500);
    }, 500);
  }, 500);
};

const checkWin = (results) => {
  let titleText = '';
  if (results[0].name === results[1].name) {
    titleText = "It's a tie!";
  } else if (results[0].beats === results[1].name) {
    titleText = 'You Win';
    userDiv.classList.add('winner');
  } else {
    titleText = 'You Lose';
    aiDiv.classList.add('winner');
  }
  const title = document.getElementById('title-result');
  title.innerText = titleText;

  const resultContainer = document.querySelector('.result-game');
  resultContainer.classList.remove('hidden');
  void resultContainer.offsetWidth;
  resultContainer.classList.add('show');
};
