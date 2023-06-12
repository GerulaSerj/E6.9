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

    // Отправляем запрос на сервер
    fetch('login-url', {
      method: 'POST',
      body: formData
    })
      .then(function(response) {
        if (response.ok) {
          // Успешный вход, перенаправление на другую страницу
          window.location.href = 'users.html';
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

// Обработчик события нажатия кнопки Login
document.getElementById('loginButton').addEventListener('click', login);