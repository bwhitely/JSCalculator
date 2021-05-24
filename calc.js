// Global vars
let currOperator = null;
let ops = [];
let calculated = false;

// Elements
const res = document.getElementById("result");
const operands = document.querySelectorAll("button.operand");
const operators = document.querySelectorAll("button.operator");
const eval = document.querySelector(".equals");
const clear = document.querySelector('.clear');
const back = document.querySelector('.back');
const sign = document.querySelector('.sign');
const decimal = document.querySelector('.decimal');

// on load
document.onload = init();

function init() {
    // Operands
    operands.forEach(op => {
        op.addEventListener('click', e => {
            // If we just calculated
            if (calculated){
                res.textContent = "";
                calculated = false;
            }
            // If divided by zero, reset here.
            if (res.textContent === "Don't test me."){
                res.textContent = "";
            }
            if (res.textContent == "0"){
                res.textContent = "";
            }
            // Concat nums to calc area
            res.textContent += op.textContent;
        })
    })

    // Operators
    operators.forEach(op => {
        op.addEventListener('click', e => {
            // Store operand and operator
            ops.push(Number(res.textContent));

            res.textContent = "";

            // If we have 2 operands, calculate
            if (ops.length == 2) {
                res.textContent = operate(currOperator, 
                    Number(ops[0]), Number(ops[1]));
                ops.pop();
                ops.pop();
                ops[0] = res.textContent;
                calculated = true;
            }
            currOperator = op.textContent;
        })
    })

    // Equals
    eval.addEventListener('click', e => {
        if (!res.textContent == ""){
            // Store operand
            ops.push(Number(res.textContent));

            res.textContent = "";

            // If we have 2 operands, calculate
            if (ops.length == 2) {
                res.textContent = operate(currOperator, 
                    Number(ops[0]), Number(ops[1]));
                ops.pop();
                ops.pop();
                calculated = true;
            }
            calculated = false;
        } else {

        }

    })

    // Clear/AC
    clear.addEventListener('click', e => {
        result = null;
        currOperand = null;
        currOperator = null;
        res.innerText = "0";
        ops = [];
    })

    // Backspace
    back.addEventListener('click', e => {
        if (res.textContent != "0"){
            res.textContent = 
            res.textContent.slice(0, res.textContent.length-1);
        }
        if (res.textContent == ""){
            res.textContent = "0";
        }
    })

    // Sign
    sign.addEventListener('click', e => {
        if (!res.textContent.includes("-")){
            let old = res.textContent.slice(0, res.textContent.length);
            res.textContent = "-" + old;
        } else {
            res.textContent = res.textContent.replace("-", "");
        }
    })

    // Decimal
    decimal.addEventListener('click', e => {
        res.textContent += ".";
    })
}

const add = (x,y) => {
    return x + y;
}

const subtract = (x,y) => {
    return x - y;
}

const divide = (x,y) => {
    return (x / y);
}

const multiply = (x,y) => {
    return x * y;
}

const operate = (operator, x, y) => {
    let r = 0;
    switch (operator) {
        case "+":
            r = add(x,y);
            break;
        case "-":
            r = subtract(x,y);
            break;
        case "/":
            if (y === 0 || y === "0"){
                r = "Don't test me.";
            } else {
                r = divide(x,y);
            }
            break;
        case "*":
            r = multiply(x,y);
            break;
        default:
            break;
    }
    if (countPlaces(r) > 4 ){
        return r.toFixed(4);
    } else {
        return r;
    }
}

const countPlaces = (num) => {
    var sep = String(23.32).match(/\D/)[0];
    var b = String(num).split(sep);
    return b[1]? b[1].length : 0;
}