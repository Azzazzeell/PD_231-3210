class Calculator {
    constructor() {
        this.methods = {};
    }

    calculate(expression) {
        if (typeof expression !== 'string') {
            throw new Error('INVALID_ARGUMENT');
        }

        const [a, operator, b] = expression.split(' ');
        if (isNaN(a) || isNaN(b)) {
            throw new Error('INVALID_OPERAND');
        }
        if (!this.methods[operator]) {
            throw new Error('UNKNOWN_OPERATION');
        }

        return this.methods[operator](+a, +b);
    }

    addMethod(operation, func) {
        if (typeof operation !== 'string' || typeof func !== 'function') {
            throw new Error('INVALID_ARGUMENT');
        }

        this.methods[operation] = func;
    }
}

// Пример использования
let calc = new Calculator();
calc.addMethod("+", (a, b) => a + b);
calc.addMethod("*", (a, b) => a * b);
calc.addMethod("/", (a, b) => a / b);
calc.addMethod("**", (a, b) => a ** b);

console.log(calc.calculate("2 ** 3")); // 8
try {
    console.log(calc.calculate("h - 10")); // Error: INVALID_OPERAND
} catch (e) {
    console.error(e.message);
}
try {
    console.log(calc.calculate("3 * 5")); // Error: UNKNOWN_OPERATION
} catch (e) {
    console.error(e.message);
}
try {
    console.log(calc.calculate(1 + 3)); // Error: INVALID_ARGUMENT
} catch (e) {
    console.error(e.message);
}