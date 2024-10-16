const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function calculateObject(objA, objB, operation) {
    if (typeof objA !== 'object' || typeof objB !== 'object') {
        console.log('Ошибка: Оба значения должны быть объектами');
        rl.close();
        return;
    }
    let resultA = objA.a;
    let resultB = objB.b;
    let tempObject = {};
    switch (operation) {
        case '+':
            tempObject.result = String(resultA + resultB);
            break;
        case '-':
            tempObject.result = String(resultA - resultB);
            break;
        case '*':
            tempObject.result = String(resultA * resultB);
            break;
        case '/':
            if (resultB === 0) {
                console.log('Ошибка: Деление на ноль');
                rl.close();
                return;
            }
            tempObject.result = String(resultA / resultB);
            break;
        default:
            console.log('Ошибка: Некорректная операция');
            rl.close();
            return;
    }

    console.log(`Результат: ${tempObject.result}`);
    rl.close();
}
rl.question('Введите объект A (например, {"a": 10}): ', (input1) => {
    const objA = JSON.parse(input1);

    rl.question('Введите объект B (например, {"b": 5}): ', (input2) => {
        const objB = JSON.parse(input2);

        rl.question('Введите операцию (+, -, *, /): ', (operation) => {
            calculateObject(objA, objB, operation);
        });
    });
});
