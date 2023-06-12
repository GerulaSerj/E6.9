document.addEventListener('DOMContentLoaded', function() {
    // Получить ссылки на элементы страницы
    var chatList = document.getElementById('chatList');
    var createChatButton = document.getElementById('createChatButton');
    var editChatButton = document.getElementById('editChatButton');
    var deleteChatButton = document.getElementById('deleteChatButton');

    createChatButton.addEventListener('click', function() {
        // Обработка нажатия кнопки "Create Chat"
        // Перенаправление пользователя на страницу создания чата
        window.location.href = 'create_chat.html';
    });

    editChatButton.addEventListener('click', function() {
        // Обработка нажатия кнопки "Edit Chat"
        // Получить выбранный групповой чат из выпадающего списка
        var selectedChat = chatList.value;

        // Перенаправление пользователя на страницу редактирования чата с выбранным чатом
        window.location.href = 'edit_chat.html?chat=' + encodeURIComponent(selectedChat);
    });

    deleteChatButton.addEventListener('click', function() {
        // Обработка нажатия кнопки "Delete Chat"
        // Получить выбранный групповой чат из выпадающего списка
        var selectedChat = chatList.value;

        // Отправить запрос на сервер для удаления чата
        fetch('/api/chatrooms/' + encodeURIComponent(selectedChat), {
            method: 'DELETE'
        })
        .then(function(response) {
            if (response.ok) {
                console.log('Чат успешно удален');
            } else {
                console.log('Ошибка при удалении чата:', response.statusText);
            }
        })
        .catch(function(error) {
            console.log('Ошибка при удалении чата:', error);
        });
    });

    // Получить список групповых чатов с сервера
    fetch('/api/chatrooms')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // Отобразить список групповых чатов в выпадающем списке
            data.forEach(function(chat) {
                var option = document.createElement('option');
                option.value = chat.name;
                option.text = chat.name;
                chatList.appendChild(option);
            });
        })
        .catch(function(error) {
            console.log('Ошибка при получении списка групповых чатов:', error);
        });
});