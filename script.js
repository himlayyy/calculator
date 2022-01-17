let numberScreen = document.querySelector('.number-screen');
let equationScreen = document.querySelector('.equation-screen');
let buttons = document.querySelectorAll('button');
let numbers = document.querySelectorAll('.numbers');
let operateArr = [];
let operations = []

function clearScreen(){
    numberScreen.innerHTML = "";
}
function evaluate(button) {
    var result = Number;
    let operation = button.id;
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
    console.log(result);
    for(i=0;i<=operateArr.length;i++){
        operateArr.pop();
    }
    console.log(`operateArr: ${operateArr}`);
    operations.pop();
    operateArr.push(result);
    numberScreen.innerHTML = result;
    equationScreen.innerHTML = result;
    clearScreen();   
}
function displayNumber(button) {
    numberScreen.innerHTML = numberScreen.innerHTML + button.innerHTML;
}
function displayEquation(button) {
    operateArr.push(parseFloat(numberScreen.innerHTML));
    operations.push(button.id)
    console.log(`Array: ${operateArr}`);
    equationScreen.innerHTML = equationScreen.innerHTML + numberScreen.innerHTML + button.innerHTML;
    clearScreen()
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
}

function start(){
    buttons.forEach(button => button.addEventListener("click", function () {
        display(button);
    }))
}
start();
