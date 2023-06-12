// Глобальные переменные для хранения информации о пользователе и текущем групповом чате
var currentUser = null;
var currentChat = null;

// Функция для выполнения входа пользователя
function login() {
  var username = document.getElementById('username').value;
  var avatar = document.getElementById('avatar').value;
  var avatarLink = document.getElementById('avatarLink').value;

  if (username) {
    // Создаем объект пользователя с указанными данными
    currentUser = {
      username: username,
      avatar: avatar,
      avatarLink: avatarLink
    };

    // Показываем информацию о пользователе
    document.getElementById('usernameDisplay').textContent = currentUser.username;
    document.getElementById('avatarDisplay').src = currentUser.avatar ? currentUser.avatar : currentUser.avatarLink;

    // Получаем и отображаем список пользователей и групповых чатов
    getUserList();
    getChatList();

    // Скрываем секцию входа и показываем секцию мессенджера
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('messengerSection').style.display = 'block';
  } else {
    alert('Please enter your username');
  }
}

// Функция для получения списка пользователей
function getUserList() {

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
        alert('Failed to get user list. Please try again later.');
      }
    })
    .catch(error => {
      console.error('An error occurred while getting user list:', error);
      alert('An error occurred while getting user list. Please try again later.');
    });
}

// Функция для получения списка групповых чатов
function getChatList() {
  // Здесь должна быть логика отправки запроса на сервер для получения списка групповых чатов
  // Используйте AJAX или fetch API для отправки запроса на сервер и получения данных о чатах

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
        alert('Failed to get chat list. Please try again later.');
      }
    })
    .catch(error => {
      console.error('An error occurred while getting chat list:', error);
      alert('An error occurred while getting chat list. Please try again later.');
    });
}

// Обработчик события нажатия кнопки Login
document.getElementById('loginButton').addEventListener('click', login)