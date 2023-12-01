function login() {
  // Пример простой проверки логина и пароля
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  if (username === "user" && password === "password") {
    // Вход успешен, устанавливаем флаг в localStorage
    localStorage.setItem("isAuthenticated", "true");
    // Переходим на страницу теста
    window.location.href = "../profile_page/";
  } else {
    // Выводим ошибку в случае неудачного входа
    document.getElementById("error-message").textContent =
      "Invalid username or password";
  }
}

// Добавляем обработчик события keypress для формы
document
  .getElementById("loginForm")
  .addEventListener("keypress", function (event) {
    // Проверяем, была ли нажата клавиша Enter (код 13)
    if (event.key === "Enter") {
      // Вызываем функцию login() при нажатии Enter
      login();
    }
  });
