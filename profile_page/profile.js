// Пример данных пользователя и результатов тестов
const userProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  image: URL,
  testResults: [
    { date: "2023-01-01", score: 80 },
    { date: "2023-02-01", score: 90 },
    { date: "2023-03-01", score: 70 },
    { date: "2023-04-01", score: 60 },
    { date: "2023-05-01", score: 50 },
    { date: "2023-06-01", score: 100 },
    // Добавьте больше результатов тестов по мере необходимости
  ],
};

// Функция для отображения результатов тестов
function displayTestResults() {
  const testResultsContainer = document.getElementById("testResults");

  if (userProfile.testResults.length === 0) {
    testResultsContainer.innerHTML = "<p>No test results available.</p>";
  } else {
    testResultsContainer.innerHTML = "<p><strong>Test Results:</strong></br></br></p>";
    userProfile.testResults.forEach((result) => {
      const resultItem = document.createElement("p");
      resultItem.textContent = `Date: ${result.date}, Score: ${result.score}`;
      testResultsContainer.appendChild(resultItem);
    });
  }
}

// // Функция для начала нового теста
// function startTest() {
//   // Изменение окна на страницу с тестами
//   window.location.href = '/test_page/';
// }

// Отображаем данные при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(
    ".profile-header"
  ).textContent = `User Profile - ${userProfile.name}`;
  displayTestResults();
});

 // Добавленный JavaScript код для обработки нажатия на кнопку Log Out
 document.getElementById('logoutBtn').addEventListener('click', function() {
    // Перенаправление на страницу входа
    window.location.href = '../login_page/';
  });