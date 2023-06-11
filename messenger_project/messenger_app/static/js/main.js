
// Определение базового URL для API
const BASE_URL = 'http://localhost:8000/api';

// Функция для отправки сообщения
function sendMessage(message) {
    fetch(`${BASE_URL}/messages/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: message }),
    })
    .then(response => response.json())
    .then(data => {
    //     // Обработка ответа от сервера
    })
    .catch(error => {
    //     // Обработка ошибок
    });
}

// Функция для получения сообщений
function getMessages() {
    fetch(`${BASE_URL}/messages/`)
    .then(response => response.json())
    .then(data => {
    //     // Обработка полученных сообщений
    })
    .catch(error => {
    //     // Обработка ошибок
    });
}

// Функция для создания группового чата
function createGroupChat(name) {
    fetch(`${BASE_URL}/group-chats/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name }),
    })
    .then(response => response.json())
    .then(data => {
        // Обработка ответа от сервера
    })
    .catch(error => {
    //     // Обработка ошибок
    });
}

// Функция для редактирования группового чата
function editGroupChat(chatId, newName) {
    fetch(`${BASE_URL}/group-chats/${chatId}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName }),
    })
    .then(response => response.json())
    .then(data => {
    //     // Обработка ответа от сервера
    })
    .catch(error => {
    //     // Обработка ошибок
    });
}

// Функция для удаления группового чата
function deleteGroupChat(chatId) {
    fetch(`${BASE_URL}/group-chats/${chatId}/`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
    //         // Групповой чат успешно удален
        } else {
    //         // Ошибка при удалении группового чата
        }
    })
    .catch(error => {
    //     // Обработка ошибок
    });
}

// Функция для редактирования личной информации пользователя
function editUserProfile(name, avatar) {
    fetch(`${BASE_URL}/users/current/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, avatar: avatar }),
    })
    .then(response => response.json())
    .then(data => {
    // Обработка ответа от сервера
    })
    .catch(error => {
    // Обработка ошибок
    });
}

// Функция для получения списка пользователей
function getUsers() {
    fetch(`${BASE_URL}/users/`)
    .then(response => response.json())
    .then(data => {
    //     // Обработка полученного списка пользователей
    })
    .catch(error => {
    // Обработка ошибок
    });
}

// Вызов функций и обработка событий
// Напишите код для вызова функций и обработки событий на вашей странице
// Например, добавьте обработчики событий для кнопок и форм в вашем HTML-шаблоне