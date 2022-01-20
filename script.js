let numberScreen = document.querySelector('.number-screen');
let equationScreen = document.querySelector('.equation-screen');
let buttons = document.querySelectorAll('button');
let numbers = document.querySelectorAll('.numbers');
let operateArr = [];
let operations = [];
let result;

// Clears numberScreen contents
function clearScreen() {
    numberScreen.innerHTML = "0";
}
// Clears equationScreen contents
function clearEquation() {
    equationScreen.innerHTML = "";
}
// Evaluates operation and operateArr contents
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

// Creates the nummberScreen output
function displayNumber(button) {
    if (numberScreen.classList.contains('result')) {
        numberScreen.classList.remove('result');
        numberScreen.innerHTML = "";
    }
    if (button.id == 'decimal' || button.id == 'negative') {
        button.disabled = true;
    }
    numberScreen.innerHTML = numberScreen.innerHTML + button.innerHTML;

    // Checks if the first number of the digit is zero, doesn't display leading zero if true
    var temp = [...numberScreen.innerHTML];
    if (temp[0] == 0) {
        temp.shift();
        temp = temp.join();
        numberScreen.innerHTML = temp;
    }
}
// Displays evaulate function result in numberScreen
function displayResult(result) {
    numberScreen.innerHTML = result;
    numberScreen.classList.add('result');
}

// Creates the output for the equationScreen. Triggered by clicking 'function' buttons
function displayEquation(button) {
    operateArr.push(parseFloat(numberScreen.innerHTML));
    operations.push(button.id)

    // Toggles decimal point so it can only be used once per number
    let decimal = document.querySelector('#decimal');
    if (decimal.disabled) {
        decimal.disabled = false;
    }
    // Create equationScreen contents
    if (operateArr.length != 2 || operateArr.length != 0) {
        equationScreen.innerHTML = equationScreen.innerHTML + numberScreen.innerHTML + button.innerHTML;
        numberScreen.innerHTML = "";
    }
    else if (operateArr[length] == 1) {
        equationScreen.innerHTML = operateArr[operateArr.length - 1] + button.innerHTML;
    }

    // Checks operateArr length, if equals 2 evaluates the equation
    if (operateArr.length == 2) {
        evaluate(button);
    }
}

// Determines what to display based on button attributes
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
