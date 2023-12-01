document.addEventListener("DOMContentLoaded", function () {
    checkAuthentication();
    getQuestionsFromBackend();
    startTimer();
    displayQuestion(0);
  });
  
  var isAuthenticated = localStorage.getItem("isAuthenticated");
  let currentQuestionIndex = 0;
  const backendQuestions = [
    {
        question: "What is the capital of Spane?",
        answers: ["Paris", "Berlin", "Rome", "Madrid"],
        correctAnswer: "Madrid",
      },
      {
        question: "What is the capital of England?",
        answers: ["London", "Berlin", "Rome", "Madrid"],
        correctAnswer: "London",
      },
      {
        question: "What is the capital of France?",
        answers: ["Aaris", "Berlin", "Rome", "Madrid"],
        correctAnswer: "Paris",
      },
      {
        question: "What is the capital of Russia?",
        answers: ["Moscow", "Berlin", "Rome", "Madrid"],
        correctAnswer: "Moscow",
      },
    // Добавьте больше вопросов по мере необходимости
  ];
  const totalQuestions = backendQuestions.length;
  let timeLeft = 5 * 60 * 1000; // 5 минут
  
  function checkAuthentication() {
    if (!isAuthenticated || isAuthenticated !== "true") {
      window.location.href = "login.html";
    }
  }
  
  function getQuestionsFromBackend() {
    updatePagination();
  }
  
  function createQuestionElement(question, index) {
    const questionSection = document.getElementById("questionSection");
  
    const questionElement = document.createElement("div");
    questionElement.classList.add("question");
    questionElement.innerHTML = `<p>${question.question}</p>`;
  
    questionSection.appendChild(questionElement);
  
    question.answers.forEach((answer, answerIndex) => {
      const answerElement = document.createElement("div");
      answerElement.classList.add("answer");
      answerElement.innerHTML = `
          <p>${String.fromCharCode(65 + answerIndex)}</p>
          <input type="radio" id="option${String.fromCharCode(
            65 + answerIndex
          )}_${index}" name="answer${index}" value="${String.fromCharCode(
        65 + answerIndex
      )}" />
          <label for="option${String.fromCharCode(
            65 + answerIndex
          )}_${index}">${answer}</label>
        `;
  
      questionElement.appendChild(answerElement);
    });
  }
  
  function startTimer() {
    function updateTimer() {
      const minutes = Math.floor(timeLeft / 60000);
      const seconds = Math.floor((timeLeft % 60000) / 1000);
  
      document.getElementById("timer").textContent = `${String(minutes).padStart(
        2,
        "0"
      )}:${String(seconds).padStart(2, "0")}`;
  
      timeLeft -= 1000;
  
      if (timeLeft < 0) {
        clearInterval(timerInterval);
        window.location.href = "/profile_page/";
      }
    }
  
    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
  }
  
  function finishTest() {
    hideConfirmationModal();
    window.location.href = "/profile_page/";
  }
  
  function showConfirmationModal() {
    document.getElementById("confirmationModal").style.display = "block";
  }
  
  function hideConfirmationModal() {
    document.getElementById("confirmationModal").style.display = "none";
  }
  
  function confirmFinishTest() {
    const userConfirmed = confirm("Вы действительно хотите завершить тест?");
    if (userConfirmed) {
      finishTest();
    }
  }
  
  function displayQuestion(questionIndex) {
    currentQuestionIndex = questionIndex;
    updatePagination();
  
    const currentQuestion = backendQuestions[questionIndex];
  
    document.getElementById("questionNumber").textContent =
      "Question " + (questionIndex + 1);
  
    document.querySelector(".question p").textContent = currentQuestion.question;
  
    const answerElements = document.querySelectorAll(".answer label");
    answerElements.forEach((label, index) => {
      label.textContent = `${String.fromCharCode(65 + index)}. ${
        currentQuestion.answers[index]
      }`;
    });
  }
  
  function updatePagination() {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";
  
    for (let i = 0; i < totalQuestions; i++) {
      const button = document.createElement("button");
      button.textContent = i + 1;
      button.onclick = () => displayQuestion(i);
      paginationContainer.appendChild(button);
    }
  
    const paginationButtons = paginationContainer.getElementsByTagName("button");
    for (let i = 0; i < paginationButtons.length; i++) {
      if (i === currentQuestionIndex) {
        paginationButtons[i].classList.add("marked");
      } else {
        paginationButtons[i].classList.remove("marked");
      }
    }
  }
  
  function changeQuestion(offset) {
    const newIndex = currentQuestionIndex + offset;
  
    if (newIndex >= 0 && newIndex < totalQuestions) {
      displayQuestion(newIndex);
    }
  }
  
  