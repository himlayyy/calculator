let numberScreen = document.querySelector('.number-screen');
let equationScreen = document.querySelector('.equation-screen');
let buttons = document.querySelectorAll('button');
let numbers = document.querySelectorAll('.numbers');
let operateArr = [];
let operations = [];
let result;

function clearScreen() {
    numberScreen.innerHTML = "0";
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
            result = operateArr[0] * operateArr[1];
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
    try {
        let toggled = document.querySelector(".toggled");
        toggled.classList.remove('toggled');
    }
    catch {
        console.log("Negative button not used");
    }
}
function displayNumber(button) {
    if (numberScreen.classList.contains('result')) {
        numberScreen.classList.remove('result');
        numberScreen.innerHTML = "";
    }
    if (button.id == 'decimal' || button.id == 'negative') {
        button.disabled = true;
    }
    numberScreen.innerHTML = numberScreen.innerHTML + button.innerHTML;
    var temp = [...numberScreen.innerHTML];
    if (temp[0] == 0) {
        temp.shift();
        temp = temp.join();
        numberScreen.innerHTML = temp;
    }
}
function displayResult(result) {
    numberScreen.innerHTML = result;
    numberScreen.classList.add('result');
}
function displayEquation(button) {
    operateArr.push(parseFloat(numberScreen.innerHTML));
    operations.push(button.id)
    let decimal = document.querySelector('#decimal');
    if (decimal.disabled) {
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
        clearScreen();
        clearEquation();
        while (operateArr.length != 0) {
            operateArr.pop()
        }
        operations.pop();
    }
    else if (button.classList.contains("special")) {
        var temp = [...numberScreen.innerHTML];
        if (button.id == "negative") {
            // var temp = [...numberScreen.innerHTML];
            if (!button.classList.contains('toggled')) {
                if (temp[0] == '-') {
                    button.classList.add('toggled');
                }
                else {
                    temp.unshift('-');
                    temp = temp.join('');
                    numberScreen.innerHTML = temp;
                    button.classList.add('toggled');
                }
            }
            else {
                button.classList.remove('toggled');
                temp.shift();
                temp = temp.join('');
                numberScreen.innerHTML = temp;
            }
        }
        else if (button.id == "delete") {
            // let temp = [...numberScreen.innerHTML];
            temp.pop();
            temp = temp.join('');
            numberScreen.innerHTML = temp;
        }
        else if (button.id == "decimal") {
            button.disabled = true;
            displayNumber(button);
        }
    }
}
buttons.forEach(button => button.addEventListener("click", function () {
    display(button);
}))
if (operateArr.length == 0) {
    numberScreen.innerHTML = "0";
}
