import { ICalcObj, EOperators } from "../types";

// THEME
document.querySelectorAll('input[name="theme"]').forEach(item => item.addEventListener('change', () => {
    const theme = document.querySelector('input[name="theme"]:checked') as HTMLInputElement;
    document.querySelector(':root')?.setAttribute('theme', theme.value);
}))

// TITLE document
const title = document.getElementById('root-title') as HTMLTitleElement;
let titleStatus: boolean = true;

setInterval(() => {
    title.innerHTML = titleStatus ? "Shaxriyor's" : 'Calculator';
    titleStatus = !titleStatus;
}, 1400);

const display = document.getElementById('display') as HTMLInputElement;

// Obeject
const calculator: ICalcObj = {
    firstOperand: 0,
    operator: null,
    result: "",
}

function toNumber(str: string | number): number {
    if (calculator.result != "" || typeof str == 'number') {
        return +str;
    }
    return Number(str.replace(/,/g, ''));
}

function toLocalStr(param: string | number): string {
    return toNumber(param).toLocaleString('en-US');
}

function operands(operators: EOperators | null) {
    switch (operators) {
        case EOperators.plus:
            calculator.result = +calculator.firstOperand + toNumber(display.value);
            break;
        case EOperators.minus:
            calculator.result = +calculator.firstOperand - toNumber(display.value);
            break;
        case EOperators.increase:
            calculator.result = +calculator.firstOperand * toNumber(display.value);
            break;
        case EOperators.disjunction:
            calculator.result = +calculator.firstOperand / toNumber(display.value);
            break;
        default: 
            console.error('what');
    }
}

const keyElem = document.querySelector('.keys') as HTMLDivElement;
keyElem.addEventListener('click', e => changer(e));

function changer(e: MouseEvent): void {
    const elem = e.target as HTMLDivElement;

    // .
    if (elem?.classList.contains('decimal')) {
        if (calculator.result) return;
        if (display.value.includes('.')) return;
        if (display.value == '0' || display.value == '') {
            display.value = '0.'
        } else {
            display.value += elem.innerHTML;
        }
    }

    // Del last
    if (elem.classList.contains('del')) {
        if (display.value == '0') return;
        if (calculator.result != '') {
            display.value = '0';
        } else {
            display.value = display.value.substr(0, display.value.length - 1);
        }
    }

    // Reset
    if (elem.classList.contains('reset')) {
        display.value = '0';
        calculator.firstOperand = 0;
        calculator.operator = null;
        calculator.result = '';
    }

    // Equal
    if (elem.classList.contains('equal')) {
        if (calculator.firstOperand == 0) return;
        console.log(calculator.operator);
        operands(calculator.operator);
        display.value = toLocalStr(calculator.result);

        calculator.firstOperand = 0;
        calculator.operator = null;
    }

    // Operators
    if (elem.classList.contains('operator')) {
        if (calculator.operator == null) {
            calculator.firstOperand = toNumber(display.value);
            calculator.operator = elem.getAttribute('data-operator') as EOperators;
            display.value = '0';
        } else console.log(calculator);
    }


    // Numbers
    if (elem.classList.contains('btn-numbers')) {
        if (display.value.length == 19) return;
        if (display.value == '0') display.value = '';

        if (calculator.result == '') {
            display.value += elem.innerHTML;
            display.value = toLocalStr(display.value);
        } else {
            calculator.result = '';
            display.value = '';
            display.value += elem.innerHTML;
        }
    }
}