const questionContainer = document.getElementById("quiz-question");
const optionContainer = document.getElementById("quiz-option");
const resultContainer = document.getElementById("quiz-content");
let nextBtn = document.getElementById("next");
let startBtn = document.getElementById("start");
let correct, wrong, attempt, data, index, time, timeOut;
index = 0;
data = [];
correct = 0;
wrong = 0;
attempt = 0;
time = 120;
function startQuiz() {
  fetch("./question.json")
    .then((response) => response.json())
    .then((rData) => {
      data = rData;
      startBtn.style.display = "none";
      question(data, index);
      nextBtn.style.display = "inline";
      document.getElementById("countdown").style.display = "inline";
      timeCheck();
      timeOut = setInterval(timeCheck, 1000);
    });
}
startBtn.addEventListener("click", startQuiz);

const question = (data, index = 0) => {
  questionContainer.innerHTML = `<h1><span style="color:red;">${
    index + 1
  }</span>${data[index]["question"]}</h1>`;
  optionContainer.innerHTML = `
          <div class="question-o">
            
            <label for="question-o1"onclick="checkAnswer(this)"><input type="radio" id="question-o1" name="answer" value="${data[index]["question-o1"]}" />${data[index]["question-o1"]}</label>
          </div>
          <div class="question-o">
            
            <label for="question-o2"onclick="checkAnswer(this)"><input type="radio" id="question-o2" name="answer" value ="${data[index]["question-o2"]}" />${data[index]["question-o2"]}</label>
          </div>
          <div class="question-o">
           
            <label for="question-o3"onclick="checkAnswer(this)"> <input type="radio" id="question-o3" name="answer" value="${data[index]["question-o3"]}" />${data[index]["question-o3"]}</label>
          </div>
          <div class="question-o">
            
            <label for="question-o4"onclick="checkAnswer(this)"><input type="radio" id="question-o4" name="answer" value="${data[index]["question-o4"]}" />${data[index]["question-o4"]}</label>
          </div>
        `;
};
let preChecked = "";
function checkAnswer(element) {
  if (preChecked != "") {
    preChecked.classList.remove("checked");
  }
  element.parentElement.classList.add("checked");
  preChecked = element.parentElement;
  nextBtn.disabled = false;
}

function nextQuestion() {
  if (
    document.querySelector('input[name="answer"]:checked').value ==
    data[index]["answer"]
  ) {
    correct += 1;
  } else {
    wrong += 1;
  }
  index++;
  nextBtn.disabled = true;
  if (data.length == index) {
    clearInterval(timeOut);
    result();
  } else {
    question(data, index);
  }
}
function timeCheck() {
  if (time <= -1) {
    clearInterval(timeOut);
    result();
  } else {
    document.querySelector("#time").innerHTML = time;
    time--;
  }
}
nextBtn.addEventListener("click", nextQuestion);
function result() {
  resultContainer.innerHTML = `<div id="result"><img src="result.png"alt="result"><pre>
  Correct : ${correct}
Wrong : ${wrong}
  Attempt : ${index}
Total : ${data.length}
  </pre><hr><button id="reStart" class="start">Restart</button></div>`;
  document.getElementById("reStart").addEventListener("click", () => {
    window.open("index.html");
  });
}
