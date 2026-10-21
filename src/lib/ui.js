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
  /* TODO útfæra */
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
  /* TODO útfæra */
}
