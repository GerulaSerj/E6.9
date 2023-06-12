document.getElementById('edit-message-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Получите значение поля формы
    var messageText = document.getElementById('message_text').value;

    // Создайте объект XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // Установите обработчик события загрузки
    xhr.onload = function() {
        if (xhr.status === 200) {
            // Перенаправьте пользователя после сохранения
            window.location.href = '/chat'; // Замените на ваш URL-адрес перенаправления после сохранения
        } else {
            console.error('Произошла ошибка при сохранении сообщения.');
        }
    };

    // Отправьте AJAX-запрос на сервер для сохранения изменений
    var url = '/api/edit_message'; // Замените на ваш URL-адрес для сохранения изменений сообщения
    var data = {
        messageText: messageText
    };

    // Откройте соединение и отправьте запрос
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
});

document.getElementById('delete-message-btn').addEventListener('click', function() {
    // Создайте объект XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // Установите обработчик события загрузки
    xhr.onload = function() {
        if (xhr.status === 200) {
            // Перенаправьте пользователя после удаления
            window.location.href = '/chat'; // Замените на ваш URL-адрес перенаправления после удаления
        } else {
            console.error('Произошла ошибка при удалении сообщения.');
        }
    };

    // Отправьте AJAX-запрос на сервер для удаления сообщения
    var url = '/api/delete_message'; // Замените на ваш URL-адрес для удаления сообщения

    // Откройте соединение и отправьте запрос
    xhr.open('DELETE', url, true);
    xhr.send();
});