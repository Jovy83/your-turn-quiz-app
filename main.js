// DOM elements
const currentQuestionSpan = document.getElementById('currentQuestionNumber');
const totalQuestionsSpan = document.getElementById('totalQuestions');
const currentQuestionParagraph = document.getElementById('question');
const answerInputs = document.querySelectorAll('input');
const answerLabels = document.querySelectorAll('label');
const backBtn = document.getElementById('backBtn');
const nextBtn = document.getElementById('nextBtn');
const overlayDiv = document.getElementById('overlay');
const scoreLabel = document.getElementById('score');
const resetBtn = document.getElementById('reset');

// Data
let score = 0;
const questions = [
  'Which of the following is not a real eCommerce platform?',
  'If Shopify is so good, why are Shopify developers necessary?',
  'Which of the following is true about Shopify developers?',
];
const answers = [
  ['Shopify', 'WooCommerce', 'ShopCommerce', 'BigCommerce'],
  [
    'To save time on things like store setups and migrations',
    'To extend the limited design options and functionalities of themes with custom code',
    'To provide support with a deep understanding of how the platform works and what its limitations are',
    'All the above',
  ],
  [
    'They are paid extremely well',
    'There is a high demand for them',
    'They need to know web development, the platform itself, and the liquid template language',
    'All the above',
  ],
];
const correctAnswersIndexes = [2, 3, 3];
const userAnswersIndexes = [];
let currentQuestionNumber = 0;

// Functions
const setupQuestion = () => {
  if (currentQuestionNumber < 0 || currentQuestionNumber > questions.length) {
    console.log('invalid question range');
    return;
  }

  // setup question number and question
  currentQuestionSpan.innerText = `${currentQuestionNumber + 1}`;
  totalQuestionsSpan.innerText = `${questions.length}`;
  currentQuestionParagraph.innerText = questions[currentQuestionNumber];

  // setup the labels
  for (let i = 0; i < answers[currentQuestionNumber].length; i++) {
    answerLabels[i].innerText = answers[currentQuestionNumber][i];
  }

  // reset input radios. load the user answer into input radio, if user answer exists
  clearInputRadios();
  if (userAnswersIndexes[currentQuestionNumber]) {
    answerInputs[userAnswersIndexes[currentQuestionNumber]].checked = true;
  }

  // disable next button by default
  disableBtn(nextBtn);
  // only enable the next button if the user has picked an answer already
  if (userAnswersIndexes[currentQuestionNumber]) {
    enableBtn(nextBtn);
  }

  // need to decide whether to enable/disable the back or next btn
  if (currentQuestionNumber === 0) {
    disableBtn(backBtn);
  } else {
    enableBtn(backBtn);
  }
};

const showNextQuestion = () => {
  currentQuestionNumber++;

  if (currentQuestionNumber >= questions.length) {
    showGameOverScreen();
  } else if (currentQuestionNumber === questions.length - 1) {
    nextBtn.innerText = 'Finish';
    setupQuestion();
  } else {
    nextBtn.innerText = 'Next';
    setupQuestion();
  }
};

const showPrevQuestion = () => {
  currentQuestionNumber--;
  setupQuestion();
};

const setupEventListeners = () => {
  backBtn.addEventListener('click', (e) => {
    showPrevQuestion(e);
  });

  nextBtn.addEventListener('click', (e) => {
    showNextQuestion(e);
  });

  for (const input of answerInputs) {
    input.addEventListener('click', (e) => {
      recordUserAnswer(e);
    });
  }

  resetBtn.addEventListener('click', (e) => {
    resetAll();
  });
};

const recordUserAnswer = (e) => {
  // store the user's answer in our userAnswersIndexes array
  const userAnswer = e.target.value;
  userAnswersIndexes[currentQuestionNumber] = userAnswer;
  console.log(userAnswersIndexes);

  // enable the next button
  enableBtn(nextBtn);
};

const clearInputRadios = () => {
  for (const input of answerInputs) {
    input.checked = false;
  }
};

const disableBtn = (btn) => {
  btn.disabled = true;
  btn.style.opacity = 0.2;
};

const enableBtn = (btn) => {
  btn.disabled = false;
  btn.style.opacity = 1;
};

const showGameOverScreen = () => {
  calculateScore();
  overlayDiv.style.display = 'flex';
  scoreLabel.innerText = `${score} out of ${questions.length} correct`;
};

const calculateScore = () => {
  for (let i = 0; i < correctAnswersIndexes.length; i++) {
    // need to convert toString because userAnswersIndex elements will be in string type
    if (correctAnswersIndexes[i].toString() === userAnswersIndexes[i]) {
      score++;
    }
  }
};

const resetAll = () => {
  location.reload();
};

setupEventListeners();
setupQuestion();
