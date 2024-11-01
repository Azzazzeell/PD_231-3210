function sum(...args) {
    if (args.length < 2) {
        throw new Error('INVALID_ARGUMENTS_COUNT');
    }

    for (let arg of args) {
        if (typeof arg !== 'number') {
            throw new Error('INVALID_ARGUMENT');
        }
    }

    return args.reduce((acc, num) => acc + num, 0);
}

// Примеры использования
console.log(sum(1, 2, 3)); // 6
try {
    console.log(sum()); // Error: INVALID_ARGUMENTS_COUNT
} catch (e) {
    console.error(e.message);
}
try {
    console.log(sum(0, 1, '1', 2)); // Error: INVALID_ARGUMENT
} catch (e) {
    console.error(e.message);
}