let firstNumber = document.getElementById("fnumber");
let secondNumber = document.getElementById("snumber");

addition.addEventListener("click", () => {
    let result = parseInt(firstNumber.value) + parseInt(secondNumber.value);
    display(result);
});

subtraction.addEventListener("click", () => {
    let result = parseInt(firstNumber.value) - parseInt(secondNumber.value);
    display(result);
});

multiplication.addEventListener("click", () => {
    let result = parseInt(firstNumber.value) * parseInt(secondNumber.value);
    display(result);
});

division.addEventListener("click", () => {
    let result = parseInt(firstNumber.value) / parseInt(secondNumber.value); 
    display(result);
});

function display(result) {
    document.getElementById("result").innerHTML = result;
}