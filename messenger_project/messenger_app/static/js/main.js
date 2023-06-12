
// Функция для отображения списка сообщений
function displayMessages(messages) {
  var messageList = document.getElementById('messageList');
  messageList.innerHTML = '';

  messages.forEach(function(message) {
    var listItem = document.createElement('li');
    listItem.textContent = message.text;
    messageList.appendChild(listItem);
  });
}

// Функция для отправки сообщения
function sendMessage() {
  var messageText = document.getElementById('messageText').value;

  if (messageText) {
    // Отправка запроса на сервер для отправки сообщения
    // Используйте AJAX или fetch API для отправки данных на сервер

    // Пример использования fetch API для отправки сообщения
    fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify({ text: messageText }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        // Проверяем ответ от сервера и обновляем интерфейс при успешной отправке
        if (data.success) {
          // Очищаем поле ввода сообщения
          document.getElementById('messageText').value = '';

          // Обновляем список сообщений
          getMessages();
        } else {
          // Вывести сообщение об ошибке, если отправка не удалась
        }
      })
      .catch(error => {
        // Обработать ошибку при отправке запроса на сервер
      });
  } else {
    alert('Please enter a message');
  }
}

// Функция для получения списка сообщений
function getMessages() {
  // Отправка запроса на сервер для получения списка сообщений
  // Используйте AJAX или fetch API для получения данных с сервера

  // Пример использования fetch API для получения списка сообщений
  fetch('/api/messages')
    .then(response => response.json())
    .then(data => {
      // Проверяем ответ от сервера и отображаем список сообщений
      if (data.success) {
        displayMessages(data.messages);
      } else {
        // Вывести сообщение об ошибке, если получение не удалось
      }
    })
    .catch(error => {
      // Обработать ошибку при отправке запроса на сервер
    });
}

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
          // Разблокируем функционал создания, редактирования и удаления групповых чатов
          // и отправки сообщений после успешного входа

          // Пример разблокировки функционала:
          // document.getElementById('createChatButton').disabled = false;
          // document.getElementById('editChatButton').disabled = false;
          // document.getElementById('deleteChatButton').disabled = false;
          // document.getElementById('sendMessageButton').disabled = false;

          // Отобразить соответствующие сообщения или обновить интерфейс при успешном входе

          // Показать секцию мессенджера
          document.getElementById('loginSection').style.display = 'none';
          document.getElementById('messengerSection').style.display = 'block';

          // Получить и отобразить список сообщений
          getMessages();
        } else {
          // Вывести сообщение об ошибке, если вход не удался
          alert('Login failed. Please check your credentials and try again.');
        }
      })
      .catch(error => {
        // Обработать ошибку при отправке запроса на сервер
        console.error('An error occurred during login:', error);
        alert('An error occurred during login. Please try again later.');
      });
  } else {
    alert('Please enter your username and avatar');
  }
}

// Назначить обработчик события нажатия на кнопку "Login"
document.getElementById('loginButton').addEventListener('click', login);

// Назначить обработчик события нажатия на кнопку "Send Message"
document.getElementById('sendMessageButton').addEventListener('click', sendMessage);