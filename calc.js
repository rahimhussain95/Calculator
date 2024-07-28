const ops = ['/', 'X', '-', '+', '='];
const nums = ['+/-', 'x\u00B2', '\u2190', '7', '8', '9', '4', '5', '6', '1', '2', '3', 'CLR', '0', '.'];
const numbers = document.querySelector(".numbers");
const operators = document.querySelector(".operators");
const display = document.querySelector("#txt");
let a = 0;
let operator = undefined;
let b = undefined;
let oPressed = false;
const MAX_LENGTH = 12;

for (let i = 0; i < nums.length; i++){
    const num = document.createElement("button");
    num.textContent = nums[i];
    if (!isNaN(nums[i])){
        num.style.backgroundColor = "white";
        num.style.color = "#0c243d";
    }

    if (!isNaN(nums[i]) || (nums[i] == '.')){
        num.addEventListener("click", () => {
            if (oPressed){
                display.textContent = '';
                oPressed = false;
            }

            if (display.textContent.length > MAX_LENGTH){
                return display.textContent = '';
            }

            if(display.textContent == '0'){
                display.textContent = '';
            }

            if(display.textContent.includes('.') && num.textContent == '.'){
                return;
            }
            
            display.textContent += nums[i];

        });
    }
    else {
        num.addEventListener("click", () => {
            if (num.textContent == 'CLR'){
                a = 0;
                b = undefined;
                operator = undefined;
                display.textContent = a;
            }
            else if (num.textContent == '\u2190'){
                display.textContent = display.textContent.slice(0, -1);
                if (display.textContent == ''){
                    display.textContent = '0';
                }
            }
            else{
                a = parseFloat(display.textContent);
                operator = num.textContent;
                equals();
            }
        });
    }
    numbers.appendChild(num);
}

for (let j = 0; j < ops.length; j++){
    const oper = document.createElement("button");
    oper.textContent = ops[j];
    oper.addEventListener("click", () => {
        if (isNaN(display.textContent) || (display.textContent.length > MAX_LENGTH)){
            return display.textContent = '0';
        }
        
        if (operator == undefined){
            a = parseFloat(display.textContent);
            operator = oper.textContent;
            oPressed = true;  //b is becoming undefined
        }
        else {
            b = parseFloat(display.textContent);
            equals();
            operator = oper.textContent;
            oPressed = true;
        }
        console.table(a, b, operator);
    });
    operators.appendChild(oper);
}

const sum = (a, b) => a + b;
const sub = (a, b) => a - b;
const mult = (a, b) => a * b;
const divide = (a, b) => a / b;
const neg = (a) => a * -1;
const sqr = (a) => a * a;

function operate () {
        switch(operator){
            case '+/-':
                return neg(a);
            case 'x\u00B2':
                return sqr(a);
            case '+':
                return sum(a, b);
            case '-':
                return sub(a, b);
            case 'X':
                return mult(a, b);
            case '/':
                if (b == 0){
                    return 'Undefined';
                }
                else {
                    return divide(a, b);
                }
            case '=':
                return parseFloat(display.textContent);
        }
}
    
function equals () {
    if (!isNaN(a) && b != undefined && operator != undefined){
        a = +operate().toFixed(4)
        display.textContent = a;
        b = undefined;
    }
    else if (b == undefined){
        a = +operate().toFixed(4);
        display.textContent = a;
        operator = undefined;
    }
    return;
}



