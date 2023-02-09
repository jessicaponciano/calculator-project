let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");
let equal = document.getElementById("equals");
let dot = document.getElementById("dot");
let clear = document.getElementById("clear");
let back = document.getElementById("back");
let clickedNumber;
let calcData = {};

function add(num1, num2){
    return parseFloat(num1) + parseFloat(num2);
}

function subtract(num1, num2){
    return parseFloat(num1) - parseFloat(num2);
}

function multiply(num1, num2){
    return parseFloat(num1) * parseFloat(num2);
}

function divide(num1, num2){
    return parseFloat(num1) / parseFloat(num2);
}


function display(result) {
    document.getElementById("result").textContent = result;
}

function operate(operator, num1, num2){
    let result;
    switch (operator) {
        case "+":
            result = add(num1, num2)
            break;
        case "-":
            result = subtract(num1, num2)
            break;
        case "*":
            result = multiply(num1, num2)
            break;
        case "/":
            num2 === "0" ? result = "Error" : result = divide(num1, num2);
            break;
        default:
            console.log("Error");
            break;
    }
    if(result.toString().split(".").length > 1){
        result.toString().split(".")[1].length > 3 ? result = result.toFixed(3) : null;
    }
    calcData = {};
    calcData.num1 = result;
    display(result);   
}

numbers.forEach(num => {
    num.addEventListener("click", () => {
        clickedNumber === undefined ? 
            clickedNumber = num.value :
            clickedNumber = clickedNumber + num.value; 
        display(clickedNumber);
        console.log(calcData);
    });
});

dot.addEventListener("click", () => {
    clickedNumber === undefined ? 
            clickedNumber = dot.value :
            clickedNumber = clickedNumber + dot.value; 
        display(clickedNumber);
        console.log(calcData);
}, {once: true});

clear.addEventListener("click", () => {
    clickedNumber = undefined;
    calcData = {};
    display("");
});

back.addEventListener("click", () => {
    let arr = clickedNumber.split("");
    arr.pop();
    console.log(arr);
    clickedNumber = arr.join("");
    display(clickedNumber);
});

operators.forEach(operator => {
    operator.addEventListener("click", () => {
        if(clickedNumber !== undefined && calcData.num1 !== undefined){
            calcData.num2 = clickedNumber;
            operate(calcData.operator, calcData.num1, calcData.num2);
        }else if (clickedNumber !== undefined && calcData.num1 === undefined){
            calcData.num1 = clickedNumber;
        }
        clickedNumber = undefined;
        calcData.operator = operator.value;
        console.log(calcData);
    });
});

equal.addEventListener("click", () => {
    calcData.num2 = clickedNumber;
    clickedNumber = undefined;
    console.log(calcData);
    if(Object.keys(calcData).length == 3){
        operate(calcData.operator, calcData.num1, calcData.num2);
    }
    
});

