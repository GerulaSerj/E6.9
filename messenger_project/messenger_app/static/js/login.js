document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Отменить отправку формы по умолчанию

    var username = document.getElementById('username').value;
    var avatarFile = document.getElementById('avatar').files[0];
    var avatarLink = document.getElementById('avatarLink').value;

    if (username) {
        // Отправка запроса на сервер для входа пользователя
        // Используйте AJAX или fetch API для отправки данных о пользователе на сервер

        // Создание объекта FormData для передачи данных формы, включая файл аватара (если указан)
        var formData = new FormData();
        formData.append('username', username);
        if (avatarFile) {
            formData.append('avatar', avatarFile);
        }
        if (avatarLink) {
            formData.append('avatarLink', avatarLink);
        }

        // Отправка запроса на сервер
        fetch('/api/login', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                // Проверяем ответ от сервера и выполняем соответствующие действия
                if (data.success) {
                    // Сохраняем информацию о текущем пользователе
                    currentUser = {
                        username: username,
                        avatar: data.avatar
                    };

                    // Показываем секцию мессенджера и скрываем секцию входа
                    document.getElementById('loginSection').style.display = 'none';
                    document.getElementById('messengerSection').style.display = 'block';

                    // Получаем и отображаем список пользователей и групповых чатов
                    getUserList();
                    getChatList();
                } else {
                    // Выводим сообщение об ошибке, если вход не удался
                    alert('Login failed. Please check your credentials and try again.');
                }
            })
            .catch(error => {
                // Обрабатываем ошибку при отправке запроса на сервер
                console.error('An error occurred during login:', error);
                alert('An error occurred during login. Please try again later.');
            });
    } else {
        alert('Please enter your username');
    }
});