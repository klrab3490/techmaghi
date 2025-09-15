            
class Calculator {

    // Method for addition
    add(a, b) {
        return a + b;
    }

    // Method for subtraction
    subtract(a, b) {
        return a - b;
    }

    // Method for multiplication
    multiply(a, b) {
        return a * b;
    }

    // Method for division
    divide(a, b) {
        if (b === 0) {
            return "Division by zero error";
        }
        return a / b;
    }
}

const calculator = new Calculator();


function inputhandler() {
    const buttons = document.querySelectorAll("button[data-value]");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.getAttribute("data-value");
            handleInput(value);
        });
    });
}

function handleInput(value) {
    const display = document.getElementById("display");
    if (value == "=") {
        try {
            // Extract numbers and operator
            const input = display.value;
            const match = input.match(/^(\d+\.?\d*)([+\-*/])(\d+\.?\d*)$/);
            if (match) {
                const a = parseFloat(match[1]);
                const operator = match[2];
                const b = parseFloat(match[3]);
                let result;
                switch (operator) {
                    case '+':
                        result = calculator.add(a, b);
                        break;
                    case '-':
                        result = calculator.subtract(a, b);
                        break;
                    case '*':
                        result = calculator.multiply(a, b);
                        break;
                    case '/':
                        result = calculator.divide(a, b);
                        break;
                    default:
                        result = "Error";
                }
                display.value = result;
            } else {
                display.value = "Error";
            }
        } catch (e) {
            display.value = "Error";
        }
    } else if (value == "C") {
        display.value = "";
    } else if (value == "back") {
        display.value = display.value.slice(0, -1);
    } else {
        display.value += value;
    }
}

inputhandler();