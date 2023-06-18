// Глобальные переменные для хранения информации о пользователе и текущем групповом чате
var currentUser = null;
var currentChat = null;

// Функция для выполнения входа пользователя
function login() {
  var username = document.getElementById('username').value;
  var avatarFile = document.getElementById('avatar').files[0];
  var avatarLink = document.getElementById('avatarLink').value;

  if (username) {
    // Создаем объект FormData для отправки данных формы
    var formData = new FormData();
    formData.append('username', username);
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }
    if (avatarLink) {
      formData.append('avatarLink', avatarLink);
    }

    // Отправляем запрос на сервер для входа
    fetch('login-url', {
      method: 'POST',
      body: formData
    })
      .then(function(response) {
        if (response.ok) {
          // Успешный вход, загружаем данные для списков пользователей и групповых чатов
          loadUserList();
          loadGroupChatList();

          // Перенаправление на страницу chat_list
          window.location.href = 'chat_list.html';
        } else {
          // Обработка ошибок
          console.error('Login failed.');
        }
      })
      .catch(function(error) {
        console.error('Error:', error);
      });
  } else {
    alert('Please enter your username');
  }
}

// Функция для загрузки списка пользователей
function loadUserList() {
  fetch('/api/users')
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to load user list.');
      }
    })
    .then(function(data) {
      // Обновляем список пользователей на странице
      var userList = document.getElementById('userList');
      userList.innerHTML = '';

      data.forEach(function(user) {
        var userItem = document.createElement('li');
        userItem.textContent = user.username;
        userList.appendChild(userItem);
      });
    })
    .catch(function(error) {
      console.error('Error:', error);
    });
}

// Функция для загрузки списка групповых чатов
function loadGroupChatList() {
  fetch('/api/chats')
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to load group chat list.');
      }
    })
    .then(function(data) {
      // Обновляем список групповых чатов на странице
      var groupChatList = document.getElementById('groupChatList');
      groupChatList.innerHTML = '';

      data.forEach(function(chat) {
        var chatItem = document.createElement('li');
        chatItem.textContent = chat.name;
        groupChatList.appendChild(chatItem);
      });
    })
    .catch(function(error) {
      console.error('Error:', error);
    });
}

// Обработчик события нажатия кнопки Login
document.getElementById('loginButton').addEventListener('click', login);