const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function calculate(a, b, operation) {
    if (isNaN(a) || isNaN(b)) {
        console.log('Ошибка: Оба значения должны быть числами');
        rl.close();
        return;
    }

    let result;
    switch (operation) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            result = a * b;
            break;
        case '/':
            if (b === 0) {
                console.log('Ошибка: Деление на ноль');
                rl.close();
                return;
            }
            result = a / b;
            break;
        default:
            console.log('Ошибка: Некорректная операция');
            rl.close();
            return;
    }
    console.log(`Результат: ${result}`);
    rl.close();
}
rl.question('Введите первое число: ', (input1) => {
    const a = parseFloat(input1);
    rl.question('Введите второе число: ', (input2) => {
        const b = parseFloat(input2);
        rl.question('Введите операцию (+, -, *, /): ', (operation) => {
            calculate(a, b, operation);
        });
    });
});
