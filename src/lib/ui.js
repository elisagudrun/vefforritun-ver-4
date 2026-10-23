import { el, empty, setText } from "./elements.js";

/**
 * @typedef {"start" | "question" | "results"} Screen
 */

/**
 * Allir mögulegir skjáir.
 * @type {Screen[]}
 */
const SCREENS = ["start", "question", "results"];

/**
 * Sýnir skjá `name` og felur aðra.
 * @param {Screen} name Skjár sem á að sýna
 * @returns {void}
 */
export function showScreen(name) {
  /*
  1. .hidden á alla skjái
  2. staðfesta að `name` sé skjár
  3. ef skjár, taka .hidden af
  */
  for (const screen of SCREENS) {
    const section = document.querySelector(`section.${screen}`);

    if (!section) {
      console.warn('section is null')
      continue;
    }

    section.classList.add("hidden");
  }

  const targetScreen = document.querySelector(`section.${name}`);

  if (targetScreen) {
    targetScreen.classList.remove("hidden");
  }
}

/**
 * Birtir tölfræði á upphafsskjá.
 * @param {import("./quiz.js").Stats} stats Tölfræði
 * @returns {void}
 */
export function renderStats(stats) {
  const startScreen = document.querySelector("section.start");

  if (!startScreen) {
    console.warn("Upphafsskjár fannst ekki");
    return;
  }

  const values = [
    ["played", "Fjöldi spilaðra leikja", stats.played],
    ["correct", "Fjöldi réttra svara", stats.correct],
    ["incorrect", "Fjöldi rangra svara", stats.incorrect],
  ];

  let container = startScreen.querySelector(".stats");

  if (!container) {
    container = document.createElement("div");
    container.classList.add("stats");
    startScreen.append(container);
  }

  empty(container);

  for (const [key, label, value] of values) {
    const paragraph = document.createElement("p");
    paragraph.dataset.stat = key;
    paragraph.textContent = `${label}: ${value}`;
    container.append(paragraph);
  }
}

/**
 * Birtir spurningu, tæmir svarreit og setur fókus á hann.
 * @param {import("./quiz.js").Question} question Spurning
 * @param {number} num Númer spurningar, byrjar á 1
 * @param {number} total Heildarfjöldi spurninga
 * @returns {void}
 */
export function renderQuestion(question, num, total) {
  console.log(question, num, total);

  const categoryElement = document.querySelector(".title .category");

  if (!categoryElement) {
    console.warn('category element not found');
    return;
  }

  categoryElement.textContent = question.category;

  const questionElement = document.querySelector(".title .question-text");

  if (questionElement) {
    questionElement.textContent = question.question;
  } else {
    console.error("fann ekki question element");
  }
}

/**
 * Birtir niðurstöður leiks.
 * @param {import("./quiz.js").Result[]} results Niðurstöður
 * @param {number} correctCount Fjöldi réttra svara
 * @returns {void}
 */
export function renderResults(results, correctCount) {
  const resultsScreen = document.querySelector("section.results");
  if (!resultsScreen) {
    console.warn("Niðurstöður finnast ekki");
    return;
  }

  let summary = resultsScreen.querySelector(".results-summary");

  if (!summary) {
    summary = document.createElement("h2");
    summary.classList.add("results-summary");
    resultsScreen.prepend(summary);
  }

  summary.textContent = `Rétt svör: ${correctCount} af ${results.length}`;

  let list = resultsScreen.querySelector(".results-list");

  if (!list) {
    list = document.createElement("div");
    list.classList.add("results-list");

    const restartButton = resultsScreen.querySelector(".restart-button");

    if (restartButton) {
      resultsScreen.insertBefore(list, restartButton);
    } else {
      resultsScreen.append(list);
    }
  }

  empty(list);

  results.forEach((result, index) => {
    const item = document.createElement("article");
    item.classList.add("result-item");
    item.classList.add(result.correct ? "correct" : "incorrect");

    const heading = document.createElement("h3");
    heading.textContent = `${index + 1}. ${result.question}`;

    const category = document.createElement("p");
    category.textContent = `Flokkur: ${result.category}`;

    const userAnswer = document.createElement("p");
    userAnswer.textContent = `Þitt svar: ${
      result.answer.trim() || "Ekkert svar"
    }`;

    const correctAnswer = document.createElement("p");
    correctAnswer.textContent = `Rétt svar: ${result.correctAnswer}`;

    const status = document.createElement("p");
    status.classList.add("result-status");
    status.textContent = result.correct ? "Rétt svar" : "Rangt svar";

    item.append(
      heading,
      category,
      userAnswer,
      correctAnswer,
      status,
    );

    list.append(item);
  });
}
