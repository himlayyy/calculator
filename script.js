let numberScreen = document.querySelector('.number-screen');
let equationScreen = document.querySelector('.equation-screen');
let buttons = document.querySelectorAll('button');
let numbers = document.querySelectorAll('.numbers');
let operateArr = [];
let operations = [];
let events = []
let results = [];
let result;

function clearScreen() {
    console.log("clear screen...");
    numberScreen.innerHTML = "";
}
function clearEquation() {
    equationScreen.innerHTML = "";
}
function evaluate(button) {
    let operation = operations.shift();
    switch (operation) {
        case 'add':
            result = operateArr[0] + operateArr[1];
            break;
        case 'subtract':
            result = operateArr[0] - operateArr[1];
            break;
        case 'multiply':
            result = operateArr[0] - operateArr[1];
            break;
        case 'divide':
            result = operateArr[0] / operateArr[1];
            break;
    }
    operateArr.pop();
    operateArr.shift();
    operateArr.push(result);
    equationScreen.innerHTML = result + button.innerHTML;
    displayResult(result);
    
}
function displayNumber(button) {
    if (numberScreen.classList.contains('result')) {
        numberScreen.classList.remove('result');
        numberScreen.innerHTML = "";
    }
    if(button.id == 'decimal'){
        button.disabled = true;
    }
    numberScreen.innerHTML = numberScreen.innerHTML + button.innerHTML;
}
function displayResult(result) {
    numberScreen.innerHTML = result;
    numberScreen.classList.add('result');
}
function displayEquation(button) {
    console.log(button.innerHTML);
    operateArr.push(parseFloat(numberScreen.innerHTML));
    operations.push(button.id)
    console.log(operations[0]);
    console.log(`Array: ${operateArr}`);
    let decimal = document.querySelector('#decimal');
    if(decimal.disabled){
        decimal.disabled = false;
    }
    if (operateArr.length != 2 || operateArr.length != 0) {
        equationScreen.innerHTML = equationScreen.innerHTML + numberScreen.innerHTML + button.innerHTML;
        numberScreen.innerHTML = "";
    }
    else if (operateArr[length] == 1) {
        equationScreen.innerHTML = operateArr[operateArr.length - 1] + button.innerHTML;
    }
    if (operateArr.length == 2) {
        evaluate(button);
    }
}
function display(button) {
    if (button.classList.contains('number')) {
        displayNumber(button);
    }
    else if (button.classList.contains('functions')) {
        displayEquation(button);
    }    
    else if (button.id == "clear") {
        console.log("Clear pressed! Clearing operateArr");
        clearScreen();
        clearEquation();
        console.log(operateArr);
        while(operateArr.length != 0){
            operateArr.pop()
        }
        console.log(operateArr);
        operations.pop();
        console.log(operations);
    }
   
    events.push(button.innerHTML);
}
buttons.forEach(button => button.addEventListener("click", function () {
    display(button);
}))

