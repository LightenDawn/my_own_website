const displayFunctionBtn = document.querySelector('.tools button');
const functionContainer = document.querySelector('.tools .container');

function displayFunction(event) {
  event.preventDefault();
  const target = event.target.parentElement;

  if (functionContainer.classList.contains('open')) {
    functionContainer.classList.remove('open');
    target.classList.remove('click');
  } else {
    functionContainer.classList.add('open');
    target.classList.add('click');
  }
}

displayFunctionBtn.addEventListener('click', displayFunction);