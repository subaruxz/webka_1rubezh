const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Обработчик POST-запроса
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    
    if (!name || name.length < 2) {
        return res.status(400).send('Имя должно содержать минимум 2 символа.');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).send('Некорректный email.');
    }
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).send('Пароль должен содержать минимум 8 символов, включая строчные, заглавные буквы и цифры.');
    }

    res.send('Регистрация успешна!');
});

app.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000');
});
