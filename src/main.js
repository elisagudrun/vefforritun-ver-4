import { questions} from "./lib/questions.js";
import { isCorrect, shuffle, createResults, countCorrect, updateStats} from "./lib/quiz.js";
import { renderQuestion, showScreen, renderResults, renderStats } from "./lib/ui.js";

/** Fasti sem segir til um hversu margar spurningar við sýnum. */
const NUMBER_OF_QUESTIONS = 4;

/**
 * Staða leiks, heldur utanum tölfræði, spurningar í núverandi leik,
 * svör notanda í núverandi leik og á hvaða spurningu við erum.
 * @type {{
 *   stats: import("./lib/quiz.js").Stats,
 *   questions: import("./lib/quiz.js").Question[],
 *   answers: string[],
 *   current: number,
 * }}
 */
const state = {
  stats: { played: 0, correct: 0, incorrect: 0 },
  questions: [],
  answers: [],
  current: 0,
};

/**
 * Byrjar nýjan leik og sýnir fyrstu spurningu.
 * @returns {void}
 */
function start() {
  const shuffled = shuffle(questions);
  state.questions = shuffled.slice(0, NUMBER_OF_QUESTIONS);
  state.current = 1;
  state.answers = [];

  console.log('stokkaðar spurningar', shuffled)

  const startButton = document.querySelector(".start-button");

  if (startButton) {
    showScreen("question");

    renderQuestion(
      state.questions[state.current - 1],
      state.current - 1,
      NUMBER_OF_QUESTIONS,
    );
     } else {
    console.error("fann ekki start takkan");
  }
}

/**
 * Klárar leik, uppfærir tölfræði og sýnir niðurstöður.
 * @returns {void}
 */
function finish() {
  //console.log("virkar þetta?");
  const results = createResults(state.questions, state.answers);
  const correctCount = countCorrect(results);

  state.stats.played += 1;

  renderStats(state.stats);
  renderResults(results, correctCount);
  showScreen("results");

}

/**
 * Vistar svar við núverandi spurningu og sýnir næstu, eða niðurstöður ef
 * öllum spurningum hefur verið svarað.
 * @param answer {string}
 * @returns {void}
 */
function submitAnswer(answer) {

  state.answers.push(answer);
  
  const currentQuestion = state.questions[state.current - 1];

  if (isCorrect(answer, currentQuestion.answer)) {
    state.stats.correct += 1;
  } else {
    state.stats.incorrect += 1;
  }
  renderStats(state.stats);

  const nextQuestionNum = state.current + 1;

  if (nextQuestionNum > NUMBER_OF_QUESTIONS) {
    finish();
  } else {
    state.current = nextQuestionNum;
    renderQuestion(
      state.questions[state.current - 1],
      state.current - 1,
      NUMBER_OF_QUESTIONS,
    );
  }
}

/**
 * Fer aftur á upphafsskjá með uppfærðri tölfræði.
 * @returns {void}
 */
function restart() {
  showScreen("start");
  renderStats(state.stats);
}

function initialize() {

  showScreen("start");
  renderStats(state.stats);

  const shuffled = shuffle(questions);

  console.log('stokkaðar spurningar', shuffled);

  const startButton = document.querySelector(".start-button");

  if (startButton) {
    startButton.addEventListener("click", start);
  }
  const form = document.querySelector('form.answer-form');

  if (!form) {
    console.error("form not found");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("form submitted");

    const data = new FormData(form);
    const answer = data.get("answer");

    if (typeof answer !== "string") {
      console.warn("answer is not a string");
      return;
    }

    submitAnswer(answer);
    const input = form.querySelector('input');
    form.reset();
    input?.focus();
  });

  const restartButton = document.querySelector(".restart-button");

  if (restartButton) {
  restartButton.addEventListener("click", restart);
  }
}

window.addEventListener("keyup", (e) => {
  //console.log('ytt á lykil á lyklaborði', e)
});

initialize();
