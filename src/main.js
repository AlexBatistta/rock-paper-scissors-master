const btnRules = document.querySelector('.rules-btn');
const btnClose = document.querySelector('.close-btn');
const modalRules = document.querySelector('.modal');

btnRules.addEventListener('click', () => {
  modalRules.classList.toggle('show-modal');
  btnRules.blur();
});

btnClose.addEventListener('click', () => {
  modalRules.classList.toggle('show-modal');
});
