const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function calculateArray(a, b, operation) {
    if (!Array.isArray(a) || !Array.isArray(b)) {
        console.log('Ошибка: Оба значения должны быть массивами');
        rl.close();
        return;
    }
    let length = Math.min(a.length, b.length);
    let result = [];

    for (let i = 0; i < length; i++) {
        switch (operation) {
            case '+':
                result.push(a[i] + b[i]);
                break;
            case '-':
                result.push(a[i] - b[i]);
                break;
            case '*':
                result.push(a[i] * b[i]);
                break;
            case '/':
                if (b[i] === 0) {
                    console.log(`Ошибка: Деление на ноль в позиции ${i}`);
                    rl.close();
                    return;
                }
                result.push(a[i] / b[i]);
                break;
            default:
                console.log('Ошибка: Некорректная операция');
                rl.close();
                return;
        }
    }
    console.log(`Результат: [${result.join(', ')}]`);
    rl.close();
}
rl.question('Введите первый массив (через запятую): ', (input1) => {
    const a = input1.split(',').map(Number);

    rl.question('Введите второй массив (через запятую): ', (input2) => {
        const b = input2.split(',').map(Number);

        rl.question('Введите операцию (+, -, *, /): ', (operation) => {
            calculateArray(a, b, operation);
        });
    });
});
