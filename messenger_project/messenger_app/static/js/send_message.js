document.addEventListener('DOMContentLoaded', function() {
    // Получить ссылку на элемент страницы
    var sendMessageButton = document.getElementById('sendMessageButton');

    sendMessageButton.addEventListener('click', function() {
        // Обработка нажатия кнопки "Send Message"
        // Получить выбранного пользователя из параметров URL
        var urlParams = new URLSearchParams(window.location.search);
        var selectedUser = urlParams.get('user');

        // Получить текст сообщения из поля формы
        var messageText = document.getElementById('messageText').value;

        // Отправить запрос на сервер для отправки сообщения
        fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                recipient: selectedUser,
                text: messageText
            })
        })
        .then(function(response) {
            if (response.ok) {
                console.log('Сообщение успешно отправлено');
            } else {
                console.log('Ошибка при отправке сообщения:', response.statusText);
            }
        })
        .catch(function(error) {
            console.log('Ошибка при отправке сообщения:', error);
        });
    });
});