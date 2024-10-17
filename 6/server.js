const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3000;

// Массив для хранения пользователей
let users = [];
// Массив для хранения статей
let articles = [];

// Настройка middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('views')); // Статические файлы из папки views

// Отправка главной страницы
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// Отправка страницы регистрации
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/views/register.html');
});

// Отправка страницы входа
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});

// Отправка страницы со статьями
app.get('/articles', (req, res) => {
    res.sendFile(__dirname + '/views/articles.html');
});

// Отправка страницы добавления статьи
app.get('/add-article', (req, res) => {
    res.sendFile(__dirname + '/views/add-article.html');
});

// Обработка регистрации
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    // Проверка на уникальность email
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).send('Пользователь с таким email уже существует');
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Сохранение пользователя
    users.push({ email, password: hashedPassword });
    res.send('Регистрация успешна!');
});

// Обработка входа
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).send('Неверный email или пароль');
    }

    res.send('Вход успешен!');
});

// Обработка добавления статьи
app.post('/add-article', (req, res) => {
    const { title, content } = req.body;

    // Добавление статьи в массив
    articles.push({ title, content });
    res.send('Статья успешно добавлена!');
});

// Отправка списка статей
app.get('/articles/list', (req, res) => {
    res.json(articles);
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
