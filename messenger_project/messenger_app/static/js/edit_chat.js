document.getElementById('edit-chat-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Получите значения полей формы
    var chatName = document.getElementById('chat_name').value;
    var selectedUsers = Array.from(document.getElementById('users').selectedOptions).map(function(option) {
        return option.value;
    });

    // Создайте объект XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // Установите обработчик события загрузки
    xhr.onload = function() {
        if (xhr.status === 200) {
            // Перенаправьте пользователя после сохранения
            window.location.href = '/chat-list'; // Замените на ваш URL-адрес перенаправления после сохранения
        } else {
            console.error('Произошла ошибка при сохранении чата.');
        }
    };

    // Отправьте AJAX-запрос на сервер для сохранения изменений
    var url = '/api/edit_chat'; // Замените на ваш URL-адрес для сохранения изменений группового чата
    var data = {
        chatName: chatName,
        selectedUsers: selectedUsers
    };

    // Откройте соединение и отправьте запрос
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
});

document.getElementById('delete-chat-btn').addEventListener('click', function() {
    // Создайте объект XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // Установите обработчик события загрузки
    xhr.onload = function() {
        if (xhr.status === 200) {
            // Перенаправьте пользователя после удаления
            window.location.href = '/chat-list'; // Замените на ваш URL-адрес перенаправления после удаления
        } else {
            console.error('Произошла ошибка при удалении чата.');
        }
    };

    // Отправьте AJAX-запрос на сервер для удаления чата
    var url = '/api/delete_chat'; // Замените на ваш URL-адрес для удаления чата

    // Откройте соединение и отправьте запрос
    xhr.open('DELETE', url, true);
    xhr.send();
});