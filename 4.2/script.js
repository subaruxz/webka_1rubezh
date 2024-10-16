document.addEventListener('DOMContentLoaded', () => {
    // Загружаем посты при загрузке страницы
    fetchPosts();
});

// Функция для получения всех постов
function fetchPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            if (!response.ok) {
                throw new Error('Сетевая ошибка при получении постов');
            }
            return response.json();
        })
        .then(data => displayPosts(data))
        .catch(error => console.error('Ошибка при получении постов:', error));
}

// Отображение постов на странице
function displayPosts(posts) {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = ''; // Очищаем контейнер перед повторной загрузкой

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <button onclick="updatePost(${post.id})">Обновить</button>
            <button onclick="deletePost(${post.id})">Удалить</button>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Обработка отправки формы для создания нового поста
document.getElementById('createPostForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;

    // Логируем данные, которые будут отправлены
    console.log('Отправка поста:', { title, body });

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            body: body,
            userId: 1 // Используем фиктивный userId
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ошибка при создании поста');
        }
        return response.json();
    })
    .then(data => {
        console.log('Пост успешно создан:', data);
        alert('Пост успешно создан!');
        fetchPosts(); // Обновляем список постов
    })
    .catch(error => console.error('Ошибка при создании поста:', error));
});

// Обновление поста
function updatePost(id) {
    const newTitle = prompt('Введите новый заголовок');
    const newBody = prompt('Введите новый текст поста');

    if (newTitle && newBody) {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: newTitle,
                body: newBody,
                userId: 1
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка при обновлении поста');
            }
            return response.json();
        })
        .then(data => {
            console.log('Пост обновлен:', data);
            alert('Пост обновлен!');
            fetchPosts(); // Обновляем список постов
        })
        .catch(error => console.error('Ошибка при обновлении поста:', error));
    } else {
        alert('Поле не может быть пустым!');
    }
}

// Удаление поста
function deletePost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ошибка при удалении поста');
        }
        alert('Пост удален!');
        fetchPosts(); // Обновляем список постов
    })
    .catch(error => console.error('Ошибка при удалении поста:', error));
}
