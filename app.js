const EXAM_SIZE = 20;
const STORAGE_KEY = "parcial2Quiz:lastResult";

const state = {
  bank: [],
  exam: [],
  answers: new Map(),
  currentIndex: 0,
};

const els = {
  quiz: document.querySelector("#quiz"),
  bankCount: document.querySelector("#bankCount"),
  answeredCount: document.querySelector("#answeredCount"),
  scoreCount: document.querySelector("#scoreCount"),
  lastResult: document.querySelector("#lastResult"),
  restartBtn: document.querySelector("#restartBtn"),
  errorBox: document.querySelector("#errorBox"),
  quizNav: document.querySelector("#quizNav"),
  prevBtn: document.querySelector("#prevBtn"),
  nextBtn: document.querySelector("#nextBtn"),
  navLabel: document.querySelector("#navLabel"),
  questionGrid: document.querySelector("#questionGrid"),
};

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function labelFor(index) {
  return String.fromCharCode("A".charCodeAt(0) + index);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function iconNode(kind) {
  const symbol = kind === "cross" ? "✗" : "✓";
  const colors = kind === "cross"
    ? "bg-red-400 text-slate-950"
    : "bg-emerald-400 text-slate-950";
  const span = document.createElement("span");
  span.className = `choice-marker ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-black ${colors}`;
  span.textContent = symbol;
  return span;
}

function loadLastResult() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const result = JSON.parse(raw);
    const date = new Date(result.finishedAt).toLocaleString("es-AR", {
      dateStyle: "short",
      timeStyle: "short",
    });
    els.lastResult.textContent = `${result.score}/${result.total} (${date})`;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveResult() {
  const answered = [...state.answers.values()];
  const score = answered.filter((answer) => answer.isCorrect).length;
  const missedIds = answered.filter((answer) => !answer.isCorrect).map((answer) => answer.id);
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      finishedAt: new Date().toISOString(),
      score,
      total: state.exam.length,
      missedIds,
      examIds: state.exam.map((q) => q.id),
    })
  );
  loadLastResult();
}

function updateStats() {
  const answered = [...state.answers.values()];
  const score = answered.filter((answer) => answer.isCorrect).length;
  els.answeredCount.textContent = `${answered.length}/${state.exam.length}`;
  els.scoreCount.textContent = String(score);
  if (answered.length === state.exam.length && state.exam.length > 0) {
    saveResult();
  }
}

function correctChoiceText(question) {
  return correctKeys(question)
    .map((key) => question.choices.find((choice) => choice.key === key)?.text ?? "Respuesta no encontrada")
    .join(" / ");
}

function correctKeys(question) {
  return question.correctKeys ?? [question.correctKey];
}

function isMultiple(question) {
  return correctKeys(question).length > 1 || question.type === "multiple";
}

function renderQuestion(question, index) {
  const choices = shuffle(question.choices);
  const multiple = isMultiple(question);
  const choiceButtons = choices
    .map((choice, choiceIndex) => {
      const displayKey = labelFor(choiceIndex);
      return `
        <button
          type="button"
          class="choice-btn group flex w-full gap-3 rounded-2xl border border-slate-700 bg-slate-950/70 p-4 text-left transition hover:border-cyan-300 hover:bg-slate-900"
          data-question-id="${question.id}"
          data-choice-key="${choice.key}"
          data-multiple="${multiple ? "true" : "false"}"
        >
          <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-black text-cyan-200 group-hover:bg-cyan-300 group-hover:text-slate-950">${displayKey}</span>
          <span class="text-sm leading-6 text-slate-100">${escapeHtml(choice.text)}</span>
          <span class="choice-marker"></span>
        </button>
      `;
    })
    .join("");

  return `
    <article class="question-card rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-xl shadow-slate-950/30" data-question-id="${question.id}">
      <div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p class="text-xs font-bold uppercase tracking-widest text-cyan-300">Pregunta ${index + 1} · ${escapeHtml(question.module)} · ${escapeHtml(question.type)}</p>
          <h2 class="mt-2 text-lg font-bold leading-7 text-white">${escapeHtml(question.question)}</h2>
        </div>
        <span class="rounded-full border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-300">${escapeHtml(question.topic)}</span>
      </div>
      <div class="space-y-3">${choiceButtons}</div>
      ${
        multiple
          ? `<button type="button" class="check-multiple-btn mt-4 rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-200" data-question-id="${question.id}">Corregir selección</button>`
          : ""
      }
      <div class="feedback mt-4 hidden rounded-2xl border p-4 text-sm leading-6"></div>
    </article>
  `;
}

function applyGradedState(card, question, answer) {
  const { selectedKeys, isCorrect } = answer;
  const expectedKeys = correctKeys(question);
  const buttons = [...card.querySelectorAll(".choice-btn")];
  buttons.forEach((btn) => {
    btn.disabled = true;
    btn.classList.remove(
      "hover:border-cyan-300",
      "hover:bg-slate-900",
      "border-cyan-300",
      "bg-cyan-950/50",
      "bg-slate-950/70",
      "border-slate-700"
    );
    const key = btn.dataset.choiceKey;
    const isExpected = expectedKeys.includes(key);
    const isSelected = selectedKeys.includes(key);
    if (isExpected && isSelected) {
      btn.classList.add("border-emerald-400", "bg-emerald-950/40", "text-emerald-100");
      btn.querySelector(".choice-marker")?.replaceChildren(iconNode("check"));
    } else if (isExpected && !isSelected) {
      btn.classList.add("border-emerald-400/50", "bg-emerald-950/20", "text-emerald-100/90");
      btn.querySelector(".choice-marker")?.replaceChildren(iconNode("check"));
    } else if (!isExpected && isSelected) {
      btn.classList.add("border-red-400", "bg-red-950/40", "text-red-100");
      btn.querySelector(".choice-marker")?.replaceChildren(iconNode("cross"));
    } else {
      btn.classList.add("opacity-60");
    }
  });
  const submit = card.querySelector(".check-multiple-btn");
  if (submit) submit.disabled = true;

  const feedback = card.querySelector(".feedback");
  feedback.classList.remove("hidden", "border-red-500/40", "bg-red-950/40", "text-red-100", "border-emerald-500/40", "bg-emerald-950/40", "text-emerald-100");
  feedback.classList.add(
    ...(isCorrect
      ? ["border-emerald-500/40", "bg-emerald-950/40", "text-emerald-100"]
      : ["border-red-500/40", "bg-red-950/40", "text-red-100"])
  );
  feedback.innerHTML = `
    <p class="font-black">${isCorrect ? "Correcto" : "Incorrecto"}</p>
    <p class="mt-2"><strong>Respuesta correcta${expectedKeys.length > 1 ? "s" : ""}:</strong> ${escapeHtml(correctChoiceText(question))}</p>
    <p class="mt-2">${escapeHtml(question.justification)}</p>
    <p class="mt-2 text-xs opacity-80"><strong>Fuente:</strong> ${escapeHtml(question.sourceFile)} ${escapeHtml(question.sourceLine)}</p>
  `;
}

function renderGrid() {
  const tiles = state.exam
    .map((question, idx) => {
      const answer = state.answers.get(question.id);
      const isCurrent = idx === state.currentIndex;
      let classes =
        "tile rounded-xl border-2 py-2 text-sm font-black transition focus:outline-none focus:ring-2 focus:ring-cyan-300/60";
      if (isCurrent) {
        classes += " border-cyan-300 bg-cyan-300 text-slate-950 scale-105";
      } else if (answer?.isCorrect) {
        classes += " border-emerald-500 bg-emerald-950/60 text-emerald-200 hover:bg-emerald-900";
      } else if (answer) {
        classes += " border-red-500 bg-red-950/60 text-red-200 hover:bg-red-900";
      } else {
        classes += " border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500 hover:bg-slate-800";
      }
      return `<button type="button" class="${classes}" data-tile-index="${idx}" aria-label="Ir a pregunta ${idx + 1}" aria-current="${isCurrent ? "true" : "false"}">${idx + 1}</button>`;
    })
    .join("");
  els.questionGrid.innerHTML = tiles;
  els.questionGrid.querySelectorAll(".tile").forEach((btn) => {
    btn.addEventListener("click", () => navigateTo(Number(btn.dataset.tileIndex)));
  });
}

function updateNavLabel() {
  const total = state.exam.length;
  const idx = state.currentIndex;
  els.navLabel.textContent = `Pregunta ${idx + 1} / ${total}`;
  els.prevBtn.disabled = idx === 0;
  els.nextBtn.disabled = idx >= total - 1;
}

function navigateTo(index) {
  if (index < 0 || index >= state.exam.length || index === state.currentIndex) return;
  state.currentIndex = index;
  renderCurrentQuestion();
  renderGrid();
  updateNavLabel();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderCurrentQuestion() {
  const question = state.exam[state.currentIndex];
  els.quiz.innerHTML = renderQuestion(question, state.currentIndex);
  els.quiz.querySelectorAll(".choice-btn").forEach((button) => {
    button.addEventListener("click", () => handleAnswer(button));
  });
  els.quiz.querySelectorAll(".check-multiple-btn").forEach((button) => {
    button.addEventListener("click", () => handleMultipleSubmit(button));
  });
  const answer = state.answers.get(question.id);
  if (answer) {
    const card = els.quiz.querySelector(`.question-card[data-question-id="${question.id}"]`);
    applyGradedState(card, question, answer);
  }
}

function renderQuiz() {
  els.quizNav.classList.remove("hidden");
  renderGrid();
  renderCurrentQuestion();
  updateNavLabel();
  updateStats();
}

function handleAnswer(button) {
  const questionId = button.dataset.questionId;
  if (state.answers.has(questionId)) return;

  const question = state.exam.find((q) => q.id === questionId);
  if (isMultiple(question)) {
    toggleMultipleChoice(button, question);
    return;
  }

  gradeQuestion(questionId, [button.dataset.choiceKey]);
}

function toggleMultipleChoice(button, question) {
  const card = button.closest(".question-card");
  const selected = button.classList.toggle("border-cyan-300");
  button.classList.toggle("bg-cyan-950/50", selected);
  button.classList.toggle("bg-slate-950/70", !selected);
  const selectedCount = card.querySelectorAll(".choice-btn.border-cyan-300").length;
  const submit = card.querySelector(".check-multiple-btn");
  submit.textContent = `Corregir selección (${selectedCount}/${correctKeys(question).length})`;
}

function handleMultipleSubmit(button) {
  const questionId = button.dataset.questionId;
  if (state.answers.has(questionId)) return;
  const card = button.closest(".question-card");
  const selectedKeys = [...card.querySelectorAll(".choice-btn.border-cyan-300")].map((btn) => btn.dataset.choiceKey);
  if (selectedKeys.length === 0) return;
  gradeQuestion(questionId, selectedKeys);
}

function sameKeySet(left, right) {
  if (left.length !== right.length) return false;
  const set = new Set(left);
  return right.every((key) => set.has(key));
}

function gradeQuestion(questionId, selectedKeys) {
  if (state.answers.has(questionId)) return;

  const question = state.exam.find((q) => q.id === questionId);
  const expectedKeys = correctKeys(question);
  const isCorrect = sameKeySet(selectedKeys, expectedKeys);
  const answer = { id: questionId, selectedKeys, isCorrect };
  state.answers.set(questionId, answer);

  const card = els.quiz.querySelector(`.question-card[data-question-id="${questionId}"]`);
  applyGradedState(card, question, answer);
  renderGrid();
  updateStats();
}

function startExam() {
  state.answers.clear();
  state.exam = shuffle(state.bank).slice(0, Math.min(EXAM_SIZE, state.bank.length));
  state.exam = state.exam.map((question) => ({ ...question, choices: shuffle(question.choices) }));
  state.currentIndex = 0;
  renderQuiz();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showError(message) {
  els.quizNav.classList.add("hidden");
  els.errorBox.classList.remove("hidden");
  els.errorBox.innerHTML = `
    <p class="font-bold">No pude cargar el banco de preguntas.</p>
    <p class="mt-2">${escapeHtml(message)}</p>
    <p class="mt-2">Si abriste el archivo con doble click y el navegador bloquea <code>fetch</code>, levantá un server local con:</p>
    <pre class="mt-2 overflow-x-auto rounded-xl bg-slate-950 p-3 text-xs text-slate-100">python3 -m http.server 8000</pre>
    <p class="mt-2">Después abrí <code>http://localhost:8000</code> desde la carpeta <code>parcial2-quiz</code>.</p>
  `;
}

async function init() {
  loadLastResult();
  els.restartBtn.addEventListener("click", startExam);
  els.prevBtn.addEventListener("click", () => navigateTo(state.currentIndex - 1));
  els.nextBtn.addEventListener("click", () => navigateTo(state.currentIndex + 1));

  try {
    const response = await fetch("data/questions.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    state.bank = data.questions.filter((q) => q.correctKey && q.choices?.length >= 2);
    els.bankCount.textContent = String(state.bank.length);
    startExam();
  } catch (error) {
    showError(error.message);
  }
}

init();
