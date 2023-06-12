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
document.getElementById('loginButton').addEventListener('click', login);

// Обработчик события нажатия кнопки Join Chat
document.getElementById('joinChatButton').addEventListener('click', function() {
  var chatList = document.getElementById('chatList');
  var selectedChatId = chatList.value;

  if (selectedChatId) {
    // Здесь должна быть логика входа в выбранный чат
    // Используйте AJAX или fetch API для отправки запроса на сервер и входа в чат

    // Пример использования fetch API для входа в чат
    fetch('/api/chats/' + selectedChatId + '/join', {
      method: 'POST'
    })
      .then(response => response.json())
      .then(data => {
        // Обработка ответа сервера после входа в чат
        if (data.success) {
          currentChat = data.chat;
          alert('Joined chat: ' + currentChat.name);
        } else {
          alert('Failed to join chat. Please try again later.');
        }
      })
      .catch(error => {
        console.error('An error occurred while joining chat:', error);
        alert('An error occurred while joining chat. Please try again later.');
      });
  } else {
    alert('Please select a chat to join');
  }
});

// Обработчик события нажатия кнопки Send Message
document.getElementById('sendMessageButton').addEventListener('click', function() {
  var recipientList = document.getElementById('recipientList');
  var selectedRecipient = recipientList.value;
  var messageText = document.getElementById('messageText').value;

  if (selectedRecipient && messageText) {
    // Здесь должна быть логика отправки сообщения
    // Используйте AJAX или fetch API для отправки запроса на сервер и отправки сообщения

    // Пример использования fetch API для отправки сообщения
    fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        recipient: selectedRecipient,
        message: messageText
      })
    })
      .then(response => response.json())
      .then(data => {
        // Обработка ответа сервера после отправки сообщения
        if (data.success) {
          alert('Message sent to: ' + selectedRecipient);
        } else {
          alert('Failed to send message. Please try again later.');
        }
      })
      .catch(error => {
        console.error('An error occurred while sending message:', error);
        alert('An error occurred while sending message. Please try again later.');
      });
  } else {
    alert('Please select a recipient and enter a message');
  }
});

// Обработчик события нажатия кнопки Edit Profile
document.getElementById('editProfileButton').addEventListener('click', function() {
  var newUsername = document.getElementById('newUsername').value;
  var newAvatar = document.getElementById('newAvatar').value;

  // Здесь должна быть логика редактирования профиля пользователя
  // Используйте AJAX или fetch API для отправки запроса на сервер и обновления профиля

  // Пример использования fetch API для обновления профиля
  fetch('/api/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: newUsername,
      avatar: newAvatar
    })
  })
    .then(response => response.json())
    .then(data => {
      // Обработка ответа сервера после обновления профиля
      if (data.success) {
        currentUser.username = newUsername;
        currentUser.avatar = newAvatar;
        alert('Profile updated');
      } else {
        alert('Failed to update profile. Please try again later.');
      }
    })
    .catch(error => {
      console.error('An error occurred while updating profile:', error);
      alert('An error occurred while updating profile. Please try again later.');
    });
});

// Функция инициализации
function init() {
  // Проверяем, выполнен ли вход пользователя
  if (currentUser) {
    // Показываем информацию о пользователе
    document.getElementById('usernameDisplay').textContent = currentUser.username;
    document.getElementById('avatarDisplay').src = currentUser.avatar ? currentUser.avatar : currentUser.avatarLink;

    // Получаем и отображаем список пользователей и групповых чатов
    getUserList();
    getChatList();

    // Скрываем секцию входа и показываем секцию мессенджера
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('messengerSection').style.display = 'block';
  }
}

// Вызываем функцию инициализации при загрузке страницы
init();