let firstOperand = operator = secondOperand = numberText = '';

const numberButtons = document.querySelectorAll('[operand]')
const operatorButtons = document.querySelectorAll('[operator]')
const equalsButton = document.querySelector('[equals]')
const bkspcButton = document.querySelector('[bkspc]')
const clearButton = document.querySelector('[reset]')
const outputText = document.querySelector('[output]')

document.addEventListener('keydown', function (event) {
    let numbers = /[0-9]/g;
    let operators = /[+\-*\/]/g
    if (event.key.match(numbers) || event.key === '.') {
        event.preventDefault();
        numberButtonPressed(event.key);
    }
    if (event.key.match(operators)) {
        event.preventDefault();
        operatorButtonPressed(event.key)
    }
    if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        equalsButtonPressed();
    }
    if (event.key === "Backspace") {
        event.preventDefault();
        bkspcButtonPressed();
    }
    if (event.key == 'Delete') {
        event.preventDefault();
        clear();
    }

});



numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        numberButtonPressed(button.innerText);
    })
})

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        operatorButtonPressed(button.innerText);

    })
})

equalsButton.addEventListener('click', button => {
    equalsButtonPressed();
})

clearButton.addEventListener('click', button => {
    clear();
})

bkspcButton.addEventListener('click', button => {
    bkspcButtonPressed();
})

const operate = (firstOperand, operator, secondOperand) => {
    let result;
    if (isNaN(firstOperand) || isNaN(secondOperand)) return
    switch (operator) {
        case '+':
            result = parseFloat(firstOperand) + parseFloat(secondOperand);
            break
        case '-':
            result = parseFloat(firstOperand) - parseFloat(secondOperand);
            break
        case '*':
            result = parseFloat(firstOperand) * parseFloat(secondOperand);
            break
        case '/':
            if (secondOperand == 0) {
                result = 'Arithmetic Error: Cannot divide by 0';
                disableButtons();
                clearButton.disabled = false;
                break;
            }
            result = parseFloat(firstOperand) / parseFloat(secondOperand);
            break
        default:
            return
    }
    result = result.toString();
    if (result.includes('.')) {
        result = result.substring(0, result.indexOf('.') + 5)
    }
    firstOperand = result
    operator = undefined
    secondOperand = ''
    return result;
}

function numberButtonPressed(num) {
    if (num === '.' && numberText.includes('.')) {
        return;
    }
    if(num === '.' ) disableDotButton();
    numberText = numberText.toString() + num;
    outputText.innerText = numberText;
}

function operatorButtonPressed(op) {
    enableDotButton();
    if (outputText.innerText === '+' || outputText.innerText === '-' || outputText.innerText === '*' || outputText.innerText === '/') {
        operator = op;
    }
    outputText.innerText = op
    if (operator === '') operator = op
    if (numberText === '' && firstOperand === '' && secondOperand === '') displayErrorMsg();
    if (firstOperand === '') {
        firstOperand = numberText;
        numberText = ''
        operator = op
    } else if (numberText != '') {
        secondOperand = numberText;
        result = operate(firstOperand, operator, secondOperand)
        operator = op
        firstOperand = result
        numberText = ''
        outputText.innerText = firstOperand;
    }
}

function equalsButtonPressed() {
    enableDotButton();
    if ((firstOperand === '' && secondOperand === '') || operator === '') {
        displayErrorMsg();
        return;
    }
    outputText.innerText = operate(firstOperand, operator, numberText)
    numberText = outputText.innerText
    firstOperand = ''
    secondOperand = ''
}

function clear() {
    firstOperand = operator = secondOperand = numberText = outputText.innerText = '';
    const buttons = document.getElementsByTagName("button");
    for (const button of buttons) {
        button.disabled = false;
    }
}

function bkspcButtonPressed() {
    if (outputText.innerText === '+' || outputText.innerText === '-' || outputText.innerText === '*' || outputText.innerText === '/') {
        outputText.innerText = '';
        operator = '';
    } else if (outputText.innerText === '') return;
    else {
        if(numberText.toString().slice(-1) === '.') {
            enableDotButton();
        }
        numberText = numberText.toString().slice(0, -1);
        outputText.innerText = numberText;
    }
    console.log(outputText)
}

function disableButtons() {
    for (let btn of (document.getElementsByTagName("button"))) {
        btn.disabled = true;
    }
}

function displayErrorMsg() {
    clear();
    outputText.innerHTML = 'ERROR: Insufficient values';
    disableButtons();
    clearButton.disabled = false;
}

function disableDotButton() {
    for (let btn of (document.getElementsByTagName("button"))) {
        if(btn.innerText === '.') {
            if(btn.disabled == false){
                btn.disabled = true;
            }
        }
    }
}

function enableDotButton() {
    for (let btn of (document.getElementsByTagName("button"))) {
        if(btn.innerText === '.') {
            if(btn.disabled == true){
                btn.disabled = false;
            }
        }
    }
}