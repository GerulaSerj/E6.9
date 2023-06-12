// Глобальные переменные для хранения информации о пользователе и текущем групповом чате
var currentUser = null;
var currentChat = null;

// Функция для выполнения входа пользователя
function login() {
  var username = document.getElementById('username').value;
  var avatar = document.getElementById('avatar').value;

  if (username && avatar) {
    // Отправка запроса на сервер для входа пользователя
    // Используйте AJAX или fetch API для отправки данных о пользователе на сервер

    // Пример использования fetch API для отправки данных о пользователе
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, avatar }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        // Проверяем ответ от сервера и выполняем соответствующие действия
        if (data.success) {
          // Сохраняем информацию о текущем пользователе
          currentUser = {
            username: username,
            avatar: avatar
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
    alert('Please enter your username and avatar');
  }
}

// Функция для получения списка пользователей
function getUserList() {
  // Отправка запроса на сервер для получения списка пользователей
  // Используйте AJAX или fetch API для получения данных о пользователях

  // Пример использования fetch API для получения списка пользователей
  fetch('/api/users')
    .then(response => response.json())
    .then(data => {
      // Обработка полученного списка пользователей
      if (data.success) {
        var userList = document.getElementById('userList');
        userList.innerHTML = '';

        data.users.forEach(user => {
          var option = document.createElement('option');
          option.text = user.username;
          option.value = user.username;
          userList.add(option);
        });
      } else {
        // Выводим сообщение об ошибке, если не удалось получить список пользователей
        alert('Failed to get user list. Please try again later.');
      }
    })
    .catch(error => {
      // Обрабатываем ошибку при отправке запроса на сервер
      console.error('An error occurred while getting user list:', error);
      alert('An error occurred while getting user list. Please try again later.');
    });
}

// Функция для получения списка групповых чатов
function getChatList() {
  // Отправка запроса на сервер для получения списка групповых чатов
  // Используйте AJAX или fetch API для получения данных о чатах

  // Пример использования fetch API для получения списка групповых чатов
  fetch('/api/chats')
    .then(response => response.json())
    .then(data => {
      // Обработка полученного списка групповых чатов
      if (data.success) {
        var chatList = document.getElementById('chatList');
        chatList.innerHTML = '';

        data.chats.forEach(chat => {
          var option = document.createElement('option');
          option.text = chat.name;
          option.value = chat.id;
          chatList.add(option);
        });
      } else {
        // Выводим сообщение об ошибке, если не удалось получить список групповых чатов
        alert('Failed to get chat list. Please try again later.');
      }
    })
    .catch(error => {
      // Обрабатываем ошибку при отправке запроса на сервер
      console.error('An error occurred while getting chat list:', error);
      alert('An error occurred while getting chat list. Please try again later.');
    });
}

// Обработчик события нажатия кнопки Login
document.getElementById('loginButton').addEventListener('click', login);