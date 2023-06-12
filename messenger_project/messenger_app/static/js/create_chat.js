document.addEventListener('DOMContentLoaded', function() {
    // Получить ссылку на элемент страницы
    var createButton = document.getElementById('createButton');

    createButton.addEventListener('click', function() {
        // Обработка нажатия кнопки "Create"
        // Получить данные из полей формы (название чата и список приглашенных пользователей)
        var chatName = document.getElementById('chatName').value;
        var invitedUsers = document.getElementById('invitedUsers').value.split(',');

        // Отправить запрос на сервер для создания чата
        fetch('/api/chatrooms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: chatName,
                invitedUsers: invitedUsers
            })
        })
        .then(function(response) {
            if (response.ok) {
                console.log('Чат успешно создан');
            } else {
                console.log('Ошибка при создании чата:', response.statusText);
            }
        })
        .catch(function(error) {
            console.log('Ошибка при создании чата:', error);
        });
    });
});
