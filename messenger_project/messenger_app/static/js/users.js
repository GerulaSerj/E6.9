document.addEventListener('DOMContentLoaded', function() {
    // Получить ссылки на элементы страницы
    var userList = document.getElementById('userList');
    var sendMessageButton = document.getElementById('sendMessageButton');

    sendMessageButton.addEventListener('click', function() {
        // Обработка нажатия кнопки "Send Message"
        // Получить выбранного пользователя из выпадающего списка
        var selectedUser = userList.value;

        // Перенаправление пользователя на страницу отправки сообщения с выбранным пользователем
        window.location.href = 'send_message.html?user=' + encodeURIComponent(selectedUser);
    });

    // Получить список пользователей с сервера
    fetch('/api/users')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // Отобразить список пользователей в выпадающем списке
            data.forEach(function(user) {
                var option = document.createElement('option');
                option.value = user.username;
                option.text = user.username;
                userList.appendChild(option);
            });
        })
        .catch(function(error) {
            console.log('Ошибка при получении списка пользователей:', error);
        });
});