const previousNumber = document.querySelector('.previous-number');
const mathSymbol = document.querySelector('.math-sign');
const currentNumber = document.querySelector('.current-number');
const clearBtn = document.querySelector('.clear');
const operatorBtn = document.querySelectorAll('.operator');
const numberBth = document.querySelectorAll('.number');
const equalsBtn = document.querySelector('.equals');
const clearHistoryBth = document.querySelector('.history__reset');
const calculatorHistory = document.querySelector('.list-history');

numberBth.forEach(li => li.addEventListener('click', showNumber));
operatorBtn.forEach(li => li.addEventListener('click', operate));
equalsBtn.addEventListener('click', showResult);
clearBtn.addEventListener('click', clearWindow);
clearHistoryBth.addEventListener('click', clearHistory);

function showNumber() {
  if (currentNumber.innerHTML.includes('.') && this.textContent === '.') return;
  if (currentNumber.innerHTML === '' && this.textContent === '.')
    return (currentNumber.innerHTML = '0.');
  currentNumber.innerHTML += this.textContent;
}

function operate() {
  if (this.textContent === '-' && currentNumber.innerHTML === '') {
    return (currentNumber.innerHTML = '-');
  } else if (currentNumber.innerHTML === '') {
    return;
  }
  if (mathSymbol.innerHTML !== '') {
    showResult();
  }
  previousNumber.innerHTML = currentNumber.innerHTML;
  mathSymbol.innerHTML = this.textContent;
  currentNumber.innerHTML = '';
}

let result = '';

function showResult() {
  if (currentNumber.innerHTML === '' || previousNumber.innerHTML === '') return;
  let operator = mathSymbol.innerHTML;
  let i = Number(previousNumber.innerHTML);
  let j = Number(currentNumber.innerHTML);
  switch (operator) {
    case '+':
      result = i + j;
      break;
    case '-':
      result = i - j;
      break;
    case '*':
      result = i * j;
      break;
    case '/':
      result = i / j;
      break;
    case '%':
      result = (i * j) / 100;
      break;
    case 'x^':
      result = i ** j;
      break;
  }
  addHistory();
  clearHistoryBth.classList.add('active');
  currentNumber.innerHTML = result;
  previousNumber.innerHTML = '';
  mathSymbol.innerHTML = '';
}

function addHistory() {
  const newHistory = document.createElement('li');
  newHistory.innerHTML = `${previousNumber.innerHTML} ${mathSymbol.innerHTML} ${currentNumber.innerHTML} = ${result}`;
  calculatorHistory.appendChild(newHistory);
}

function clearWindow() {
  previousNumber.innerHTML = '';
  mathSymbol.innerHTML = '';
  currentNumber.innerHTML = '';
  result = '';
}

function clearHistory() {
  calculatorHistory.textContent = '';
  if (calculatorHistory.textContent === '') {
    clearHistoryBth.classList.remove('active');
  }
}
