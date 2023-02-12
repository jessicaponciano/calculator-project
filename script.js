const add = (num1, num2) => parseFloat(num1) + parseFloat(num2);
const subtract = (num1, num2) => parseFloat(num1) - parseFloat(num2);
const multiply = (num1, num2) => parseFloat(num1) * parseFloat(num2);
const divide = (num1, num2) => parseFloat(num1) / parseFloat(num2);

function disableButtons() {
  for (let btn of (document.getElementsByTagName(".btn"))) {
      btn.disabled = true;
  }
}


class Calculator {
  constructor(firstOperandText, secondOperandText) {
    this.firstOperandText = firstOperandText;
    this.secondOperandText = secondOperandText;
    this.clear();
  }

  clear() {
    this.secondOperand = '';
    this.firstOperand = '';
    this.operator = undefined;
    this.printResult();
  }

  delete() {
    this.secondOperand = this.secondOperand.toString().slice(0, -1);
    this.printResult();
  }

  addNumber(number) {
    if (number === '.' && this.secondOperand.includes('.')) {
        return;
    }

    if(this.secondOperand.toString().length < 22){
      this.secondOperand = this.secondOperand.toString() + number.toString();
    }
    this.printResult();
  }

  chooseOperation(operation) {
    if (this.secondOperand === '') return;
    if (this.firstOperand !== '') {
      this.operate();
    }
    this.operator = operation;
    this.firstOperand = this.secondOperand;
    this.secondOperand = '';
    this.printResult();
  }

  operate() {
    let result;
    if (isNaN(this.firstOperand) || isNaN(this.secondOperand)) return;
    switch (this.operator) {
      case '+':
        result = add(this.firstOperand, this.secondOperand);
        break;
      case '-':
        result = subtract(this.firstOperand, this.secondOperand);
        break;
      case '*':
        result = multiply(this.firstOperand, this.secondOperand);
        break;
      case '/':
        if (this.secondOperand == 0) {
          alert('Arithmetic Error: Cannot divide by 0');
          disableButtons();
          clearButton.disabled = false;
          result = '';
          break;
        }
        result = divide(this.firstOperand, this.secondOperand);
        break;
      default:
        return;
    }

    if(result % 1 !== 0 && Number(result)){
      result.toString().split(".")[1].length > 5 ? result = result.toFixed(5) : null;
    }
  
    this.secondOperand = result;
    this.operator = undefined;
    this.firstOperand = '';
    this.printResult();
  }

  getprintNumber(number) {
    const integerDigits = parseFloat(number.toString().split('.')[0]);
    const decimalDigits = number.toString().split('.')[1];
    let integerprint;
    if (isNaN(integerDigits)) {
      integerprint = '';
    } else {
      integerprint = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    if (decimalDigits != null) {
      return `${integerprint}.${decimalDigits}`;
    } else {
      return integerprint;
    }
  }

  printResult() {
    this.secondOperandText.innerText =
      this.getprintNumber(this.secondOperand);
    if (this.operator != null) {
      this.firstOperandText.innerText =
        `${this.getprintNumber(this.firstOperand)} ${this.operator}`;
    } else {
      this.firstOperandText.innerText = '';
    }
  }
}

const numberButtons = document.querySelectorAll('.btn-number');
const operatorButtons = document.querySelectorAll('.btn-operation');
const equalsButton = document.querySelector('.btn-equal');
const delButton = document.querySelector('.btn-delete');
const clearButton = document.querySelector('.btn-all-clear');
const firstOperandText = document.querySelector('.previous-number');
const secondOperandText = document.querySelector('.current-number');

const calculator = new Calculator(firstOperandText, secondOperandText);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.addNumber(button.innerText);
  })
})

operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
  })
})

equalsButton.addEventListener('click', button => {
  calculator.operate();
})

clearButton.addEventListener('click', button => {
  calculator.clear();
})

delButton.addEventListener('click', button => {
  calculator.delete();
})

document.addEventListener('keydown', function (event) {
  let numbers = /[0-9]/g;
  let operators = /[+\-*\/]/g;
  if (event.key.match(numbers)) {
    event.preventDefault();
    calculator.addNumber(event.key);
  }
  if (event.key === '.') {
    event.preventDefault();
    calculator.addNumber(event.key);
  }
  if (event.key.match(operators)) {
    event.preventDefault();
    calculator.chooseOperation(event.key);
  }
  if (event.key === 'Enter' || event.key === '=') {
    event.preventDefault();
    calculator.operate();
  }
  if (event.key === "Backspace") {
    event.preventDefault();
    calculator.delete();
  }
  if (event.key == 'Delete') {
    event.preventDefault();
    calculator.clear();
  }
});