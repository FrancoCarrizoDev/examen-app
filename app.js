// Configuración por defecto del examen; cada banco del servidor puede pisarla (config.size / config.mix).
// Composición objetivo (rangos inclusivos). Lo que falte de un tipo se rellena con simples.
// Simples 10-12, verdadero/falso 2-3 y el resto múltiples (5-8) para un examen de 20.
const DEFAULT_CONFIG = { size: 20, mix: { simple: [10, 12], trueFalse: [2, 3] } };
const BANKS_URL = "data/banks.json";
const LAST_BANK_KEY = "examenApp:lastBank";
const PROFILE_KEY = "examenApp:profile";
// Claves viejas (cuando la app tenía un solo banco), para no perder el último resultado.
const LEGACY_KEYS = { "ingenieria-software-parcial2": "parcial2Quiz:lastResult" };

const state = {
  banks: [],
  bankId: null,
  bank: [],
  config: DEFAULT_CONFIG,
  // true cuando hay backend (Raspberry); false en modo estático (GitHub Pages / http.server).
  server: false,
  profiles: [],
  profileId: null,
  seen: new Set(),
  exam: [],
  answers: new Map(),
  currentIndex: 0,
  // Historial de respuestas del banco actual ({questionId, isCorrect, answeredAt}), para estadísticas.
  history: [],
  // "normal" o "weak" (práctica de temas flojos).
  mode: "normal",
};

const els = {
  bankSelect: document.querySelector("#bankSelect"),
  subjectLabel: document.querySelector("#subjectLabel"),
  examTitle: document.querySelector("#examTitle"),
  examDescription: document.querySelector("#examDescription"),
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
  profileSelect: document.querySelector("#profileSelect"),
  profileGate: document.querySelector("#profileGate"),
  profileButtons: document.querySelector("#profileButtons"),
  newProfileForm: document.querySelector("#newProfileForm"),
  newProfileName: document.querySelector("#newProfileName"),
  profileError: document.querySelector("#profileError"),
  statsBtn: document.querySelector("#statsBtn"),
  statsPanel: document.querySelector("#statsPanel"),
  modeLabel: document.querySelector("#modeLabel"),
};

async function api(path, options = {}) {
  const response = await fetch(`api/${path}`, {
    cache: "no-store",
    ...options,
    headers: options.body ? { "Content-Type": "application/json" } : undefined,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  if (!response.ok) {
    let detail = `HTTP ${response.status}`;
    try {
      const data = await response.json();
      if (typeof data.detail === "string") detail = data.detail;
    } catch {}
    throw new Error(detail);
  }
  return response.status === 204 ? null : response.json();
}

function qs(params) {
  return new URLSearchParams(params).toString();
}

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

// Resultados y preguntas vistas viven en localStorage. Con servidor se separan por perfil;
// en modo estático se usan las claves de siempre (sin perfil).
function scope() {
  return state.server && state.profileId ? `p${state.profileId}:${state.bankId}` : state.bankId;
}

function storageKey() {
  return `examenApp:${scope()}:lastResult`;
}

function storageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function storageSet(key, value) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    // Sin storage (modo privado, etc.): la app sigue funcionando sin recordar resultados.
  }
}

function showLastResult(result) {
  if (!result) {
    els.lastResult.textContent = "Sin datos";
    return;
  }
  const date = new Date(result.finishedAt).toLocaleString("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
  });
  els.lastResult.textContent = `${result.score}/${result.total} (${date})`;
}

function loadLastResult() {
  els.lastResult.textContent = "Sin datos";
  let raw = storageGet(storageKey());
  const legacy = state.server ? null : LEGACY_KEYS[state.bankId];
  if (!raw && legacy && storageGet(legacy)) {
    raw = storageGet(legacy);
    storageSet(storageKey(), raw);
  }
  if (!raw) return;
  try {
    showLastResult(JSON.parse(raw));
  } catch {
    storageSet(storageKey(), null);
  }
}

function saveResult() {
  const answered = [...state.answers.values()];
  const score = answered.filter((answer) => answer.isCorrect).length;
  const missedIds = answered.filter((answer) => !answer.isCorrect).map((answer) => answer.id);
  const result = {
    finishedAt: new Date().toISOString(),
    score,
    total: state.exam.length,
    missedIds,
    examIds: state.exam.map((q) => q.id),
  };
  storageSet(storageKey(), JSON.stringify(result));
  loadLastResult();
}

function updateStats() {
  const answered = [...state.answers.values()];
  const score = answered.filter((answer) => answer.isCorrect).length;
  els.answeredCount.textContent = `${answered.length}/${state.exam.length}`;
  els.scoreCount.textContent = String(score);
  // El "Último" resultado es el de exámenes normales; la práctica de flojos no cuenta.
  if (answered.length === state.exam.length && state.exam.length > 0 && state.mode === "normal") {
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

function typeLabel(question) {
  if (question.type === "true-false") return "Verdadero / Falso";
  if (isMultiple(question)) return `Opción múltiple (${correctKeys(question).length} correctas)`;
  return "Opción simple";
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
          <p class="text-xs font-bold uppercase tracking-widest text-cyan-300">Pregunta ${index + 1} · ${escapeHtml(question.module)} · ${escapeHtml(typeLabel(question))}</p>
          <h2 class="mt-2 text-lg font-bold leading-7 text-white">${escapeHtml(question.question)}</h2>
        </div>
        <span class="rounded-full border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-300">${escapeHtml(question.topic)}</span>
      </div>
      <div class="space-y-3">${choiceButtons}</div>
      <button type="button" class="check-multiple-btn mt-4 rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-200" data-question-id="${question.id}">${multiple ? `Corregir selección (0/${correctKeys(question).length})` : "Corregir"}</button>
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
  // Solo mover la vista si el enunciado quedó fuera de pantalla (por ej. al usar botones de abajo).
  const top = els.quiz.getBoundingClientRect().top;
  if (top < 0 || top > window.innerHeight * 0.6) {
    els.quiz.scrollIntoView({ behavior: "smooth", block: "start" });
  }
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

  // Nunca se corrige al elegir: siempre hace falta confirmar con "Corregir" / Espacio.
  const question = state.exam.find((q) => q.id === questionId);
  toggleMultipleChoice(button, question);
}

function setChoiceSelected(button, selected) {
  button.classList.toggle("border-cyan-300", selected);
  button.classList.toggle("bg-cyan-950/50", selected);
  button.classList.toggle("bg-slate-950/70", !selected);
}

function toggleMultipleChoice(button, question) {
  const card = button.closest(".question-card");
  if (isMultiple(question)) {
    setChoiceSelected(button, !button.classList.contains("border-cyan-300"));
    const selectedCount = card.querySelectorAll(".choice-btn.border-cyan-300").length;
    card.querySelector(".check-multiple-btn").textContent = `Corregir selección (${selectedCount}/${correctKeys(question).length})`;
  } else {
    // Opción simple: una sola selección a la vez.
    card.querySelectorAll(".choice-btn").forEach((btn) => setChoiceSelected(btn, btn === button));
  }
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
  markSeen(questionId);
  recordAnswer(question, selectedKeys, isCorrect);

  const card = els.quiz.querySelector(`.question-card[data-question-id="${questionId}"]`);
  applyGradedState(card, question, answer);
  renderGrid();
  updateStats();
}

// ---------- Historial y estadísticas por área/tema ----------
// Cada respuesta se guarda apenas se corrige: con servidor va a la tabla `answers` (si falla la red
// queda en una cola local y se reintenta); en modo estático vive en localStorage.

const RECENT_WINDOW = 10; // el % de cada grupo mira sus últimas N respuestas
const MIN_ANSWERS = 3; // con menos respuestas el semáforo queda en gris ("pocos datos")

function historyKey() {
  return `examenApp:history:${scope()}`;
}

function outboxKey() {
  return `examenApp:outbox:${scope()}`;
}

function readJson(key, fallback) {
  try {
    return JSON.parse(storageGet(key) || "null") ?? fallback;
  } catch {
    return fallback;
  }
}

// Un solo envío a la vez: si se responde rápido, la segunda llamada espera a la primera
// y vuelve a leer la cola, así ninguna respuesta se manda dos veces.
let flushing = Promise.resolve();

function flushOutbox() {
  flushing = flushing.then(sendOutbox, sendOutbox);
  return flushing;
}

async function sendOutbox() {
  if (!state.server || !state.profileId || !state.bankId) return;
  const key = outboxKey();
  const pending = readJson(key, []);
  while (pending.length) {
    try {
      await api("answers", { method: "POST", body: pending[0] });
    } catch (error) {
      // 404 = pregunta o perfil que ya no existen: se descarta. Otro error (red): se reintenta después.
      if (!/inexistente/.test(error.message)) break;
    }
    pending.shift();
    storageSet(key, pending.length ? JSON.stringify(pending) : null);
  }
}

async function loadHistory() {
  const bankId = state.bankId;
  let history;
  if (state.server) {
    await flushOutbox();
    const pending = readJson(outboxKey(), []).map((a) => ({
      questionId: a.questionId,
      isCorrect: a.isCorrect,
      answeredAt: a.answeredAt,
    }));
    history = [...(await api(`answers?${qs({ profile: state.profileId, bank: bankId })}`)), ...pending];
  } else {
    history = readJson(historyKey(), []);
  }
  if (bankId === state.bankId) state.history = history;
}

function recordAnswer(question, selectedKeys, isCorrect) {
  const entry = { questionId: question.id, isCorrect, answeredAt: new Date().toISOString() };
  state.history.push(entry);
  if (state.server) {
    const key = outboxKey();
    const pending = readJson(key, []);
    pending.push({ profileId: state.profileId, bankId: state.bankId, selectedKeys, ...entry });
    storageSet(key, JSON.stringify(pending));
    flushOutbox();
  } else {
    storageSet(historyKey(), JSON.stringify(state.history));
  }
  if (!els.statsPanel.classList.contains("hidden")) renderStats();
}

async function resetHistory() {
  if (!confirm("¿Borrar todas las estadísticas de esta materia? No se puede deshacer.")) return;
  if (state.server) {
    await api(`answers?${qs({ profile: state.profileId, bank: state.bankId })}`, { method: "DELETE" });
    storageSet(outboxKey(), null);
  } else {
    storageSet(historyKey(), null);
  }
  state.history = [];
  renderStats();
}

// Área = agrupación curada del banco (campo "area"); si el banco no la tiene, el módulo.
function areaOf(question) {
  return question.area || question.module || "General";
}

function summarize(answers, questionIds) {
  const recent = answers.slice(-RECENT_WINDOW);
  const answeredIds = new Set(answers.map((a) => a.questionId));
  return {
    total: answers.length,
    correct: answers.filter((a) => a.isCorrect).length,
    recentTotal: recent.length,
    recentCorrect: recent.filter((a) => a.isCorrect).length,
    pct: recent.length ? Math.round((100 * recent.filter((a) => a.isCorrect).length) / recent.length) : null,
    covered: questionIds.filter((id) => answeredIds.has(id)).length,
    size: questionIds.length,
  };
}

function computeStats() {
  const byId = new Map(state.bank.map((q) => [q.id, q]));
  const groups = new Map(); // área -> { ids, answers, topics: Map(tema -> { ids, answers }) }
  for (const q of state.bank) {
    const area = areaOf(q);
    if (!groups.has(area)) groups.set(area, { ids: [], answers: [], topics: new Map() });
    const group = groups.get(area);
    group.ids.push(q.id);
    if (!group.topics.has(q.topic)) group.topics.set(q.topic, { ids: [], answers: [] });
    group.topics.get(q.topic).ids.push(q.id);
  }
  for (const answer of state.history) {
    const q = byId.get(answer.questionId);
    if (!q) continue;
    const group = groups.get(areaOf(q));
    group.answers.push(answer);
    group.topics.get(q.topic).answers.push(answer);
  }
  const areas = [...groups].map(([name, g]) => ({
    name,
    ...summarize(g.answers, g.ids),
    topics: [...g.topics].map(([topic, t]) => ({ name: topic, ...summarize(t.answers, t.ids) })),
  }));
  const known = state.history.filter((a) => byId.has(a.questionId));
  return { overall: summarize(known, state.bank.map((q) => q.id)), areas };
}

function light(stat) {
  if (stat.total < MIN_ANSWERS) return { key: "none", label: "Pocos datos", cls: "bg-slate-600" };
  if (stat.pct < 60) return { key: "red", label: "Flojo", cls: "bg-red-500" };
  if (stat.pct < 80) return { key: "amber", label: "Regular", cls: "bg-amber-400" };
  return { key: "green", label: "Bien", cls: "bg-emerald-400" };
}

// Orden: primero lo más flojo; los que tienen pocos datos al final.
function byWeakness(a, b) {
  const rank = (s) => (s.total < MIN_ANSWERS ? 1000 + s.total : s.pct);
  return rank(a) - rank(b) || b.total - a.total || a.name.localeCompare(b.name);
}

function statLine(stat) {
  if (!stat.total) return "Sin respuestas todavía";
  const recent = stat.total > stat.recentTotal ? ` · últimas ${stat.recentTotal}: ${stat.recentCorrect}/${stat.recentTotal}` : "";
  return `${stat.correct}/${stat.total} bien${recent} · vistas ${stat.covered}/${stat.size}`;
}

function bar(stat, light) {
  const width = stat.pct ?? 0;
  return `<div class="h-2 w-full overflow-hidden rounded-full bg-slate-800"><div class="h-full rounded-full ${light.cls}" style="width:${width}%"></div></div>`;
}

function renderStats() {
  const { overall, areas } = computeStats();
  areas.sort(byWeakness);
  const counts = { red: 0, amber: 0, green: 0, none: 0 };
  areas.forEach((a) => counts[light(a).key]++);
  const weak = areas.filter((a) => ["red", "amber"].includes(light(a).key));

  const areaHtml = areas
    .map((area) => {
      const l = light(area);
      const topics = area.topics
        .sort(byWeakness)
        .map((t) => {
          const tl = light(t);
          return `
            <li class="flex items-center gap-3 py-2">
              <span class="h-2.5 w-2.5 shrink-0 rounded-full ${tl.cls}" title="${tl.label}"></span>
              <div class="min-w-0 flex-1">
                <p class="text-sm font-semibold leading-snug text-slate-200">${escapeHtml(t.name)}</p>
                <p class="text-xs text-slate-400">${escapeHtml(statLine(t))}</p>
              </div>
              <span class="w-12 shrink-0 text-right text-sm font-black text-slate-200">${t.pct === null ? "–" : `${t.pct}%`}</span>
            </li>`;
        })
        .join("");
      return `
        <details class="group rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
          <summary class="flex cursor-pointer list-none items-center gap-3">
            <span class="h-3 w-3 shrink-0 rounded-full ${l.cls}" title="${l.label}"></span>
            <div class="min-w-0 flex-1">
              <div class="flex items-baseline justify-between gap-3">
                <p class="font-bold leading-snug text-white">${escapeHtml(area.name)}</p>
                <p class="shrink-0 text-lg font-black text-white">${area.pct === null ? "–" : `${area.pct}%`}</p>
              </div>
              <div class="mt-2">${bar(area, l)}</div>
              <p class="mt-1 text-xs text-slate-400">${escapeHtml(statLine(area))} · <span class="font-semibold">${l.label}</span></p>
            </div>
            <span class="shrink-0 text-slate-500 transition group-open:rotate-90">›</span>
          </summary>
          <ul class="mt-3 divide-y divide-slate-800 border-t border-slate-800">${topics}</ul>
        </details>`;
    })
    .join("");

  els.statsPanel.innerHTML = `
    <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h2 class="text-xl font-black text-white">Mis estadísticas</h2>
        <p class="mt-1 text-sm text-slate-300">
          ${overall.total ? `${overall.correct}/${overall.total} respuestas bien en total · viste ${overall.covered} de ${overall.size} preguntas.` : "Todavía no respondiste preguntas de esta materia."}
        </p>
        <p class="mt-1 text-xs text-slate-400">El % de cada área mira sus últimas ${RECENT_WINDOW} respuestas, así lo que mejoraste se nota. Rojo &lt; 60% · amarillo &lt; 80% · verde ≥ 80% · gris: menos de ${MIN_ANSWERS} respuestas.</p>
      </div>
      <div class="flex shrink-0 gap-2">
        <button id="weakBtn" type="button" ${weak.length ? "" : "disabled"} class="rounded-2xl bg-cyan-300 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-40">Practicar temas flojos</button>
        <button id="resetStatsBtn" type="button" ${overall.total ? "" : "disabled"} class="rounded-2xl border border-slate-700 px-4 py-2 text-sm font-bold text-slate-300 transition hover:border-red-400 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-40">Borrar</button>
      </div>
    </div>
    <div class="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
      <span class="rounded-full border border-slate-700 px-3 py-1"><span class="mr-1 inline-block h-2 w-2 rounded-full bg-red-500"></span>${counts.red} flojas</span>
      <span class="rounded-full border border-slate-700 px-3 py-1"><span class="mr-1 inline-block h-2 w-2 rounded-full bg-amber-400"></span>${counts.amber} regulares</span>
      <span class="rounded-full border border-slate-700 px-3 py-1"><span class="mr-1 inline-block h-2 w-2 rounded-full bg-emerald-400"></span>${counts.green} bien</span>
      <span class="rounded-full border border-slate-700 px-3 py-1"><span class="mr-1 inline-block h-2 w-2 rounded-full bg-slate-600"></span>${counts.none} con pocos datos</span>
    </div>
    <div class="mt-4 space-y-3">${areaHtml}</div>
  `;
  els.statsPanel.querySelector("#weakBtn").addEventListener("click", () => {
    toggleStats(false);
    startExam("weak");
  });
  els.statsPanel.querySelector("#resetStatsBtn").addEventListener("click", () => {
    resetHistory().catch((error) => alert(error.message));
  });
}

function toggleStats(show = els.statsPanel.classList.contains("hidden")) {
  els.statsPanel.classList.toggle("hidden", !show);
  els.statsBtn.setAttribute("aria-expanded", String(show));
  if (show) {
    renderStats();
    els.statsPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Práctica de temas flojos: prioriza preguntas de áreas en rojo/amarillo (y sus temas flojos),
// las que fallaste la última vez que las respondiste y, dentro de eso, las que todavía no viste.
function buildWeakExam(bank, size) {
  const { areas } = computeStats();
  const weakness = (s) => (s.total < MIN_ANSWERS ? 0.4 : 1 - s.pct / 100);
  const areaWeak = new Map(areas.map((a) => [a.name, weakness(a)]));
  const topicWeak = new Map(areas.flatMap((a) => a.topics.map((t) => [`${a.name}|${t.name}`, weakness(t)])));
  const last = new Map(state.history.map((a) => [a.questionId, a.isCorrect]));
  const scored = bank.map((q) => {
    const area = areaOf(q);
    let score = 2 * areaWeak.get(area) + topicWeak.get(`${area}|${q.topic}`);
    if (last.get(q.id) === false) score += 1;
    else if (last.get(q.id) === true) score -= 0.5;
    else score += 0.3; // sin ver: suma algo nuevo del área, no solo repasar errores
    return { q, score: score + Math.random() * 0.6 };
  });
  scored.sort((a, b) => b.score - a.score);
  // Tope por área (60% del examen) para que la peor no tape a las demás flojas; si no alcanza, se completa igual.
  const cap = Math.ceil(size * 0.6);
  const perArea = new Map();
  const picked = [];
  for (const { q } of scored) {
    if (picked.length >= size) break;
    const n = perArea.get(areaOf(q)) ?? 0;
    if (n >= cap) continue;
    perArea.set(areaOf(q), n + 1);
    picked.push(q);
  }
  for (const { q } of scored) {
    if (picked.length >= size) break;
    if (!picked.includes(q)) picked.push(q);
  }
  return shuffle(picked);
}

function randomInt([min, max]) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function questionKind(question) {
  if (question.type === "true-false") return "trueFalse";
  return isMultiple(question) ? "multiple" : "simple";
}

// Reparte `total` entre módulos de forma pareja (sobrantes al azar), sin pasar de la
// capacidad de cada uno: lo que un módulo no puede dar lo absorben los demás.
function splitEvenly(total, caps) {
  const result = Array(caps.length).fill(0);
  let left = total;
  while (left > 0) {
    const open = shuffle([...caps.keys()].filter((i) => result[i] < caps[i]));
    if (!open.length) break;
    // Orden por lo ya asignado para que los sobrantes caigan en el módulo con menos.
    open.sort((x, y) => result[x] - result[y]);
    for (const i of open) {
      if (left <= 0) break;
      result[i]++;
      left--;
    }
  }
  return result;
}

// Arma el examen: mitad y mitad entre módulos (M3/M4) y, dentro de cada módulo,
// la mezcla de tipos de EXAM_MIX. Si falta algo de un tipo se rellena con simples
// del mismo módulo; si el módulo se queda corto, con lo que sobre de los demás.
// Las preguntas de `seen` (ya corregidas en exámenes anteriores) van al final de cada grupo,
// así solo se repiten cuando no quedan nuevas de ese módulo/tipo.
function buildExam(bank, { size, mix } = DEFAULT_CONFIG, seen = new Set()) {
  const moduleIds = [...new Set(bank.map((q) => q.module ?? ""))];
  const pools = Object.fromEntries(
    moduleIds.map((id) => [id, { simple: [], multiple: [], trueFalse: [] }])
  );
  const unseenFirst = shuffle(bank).sort((a, b) => seen.has(a.id) - seen.has(b.id));
  unseenFirst.forEach((q) => pools[q.module ?? ""][questionKind(q)].push(q));

  const wantSimple = randomInt(mix.simple);
  const wantTrueFalse = randomInt(mix.trueFalse);
  const wantMultiple = Math.max(0, size - wantSimple - wantTrueFalse);
  const quotas = splitEvenly(size, moduleIds.map((id) => Object.values(pools[id]).flat().length));
  const trueFalses = splitEvenly(
    wantTrueFalse,
    moduleIds.map((id, i) => Math.min(pools[id].trueFalse.length, quotas[i]))
  );
  const multiples = splitEvenly(
    wantMultiple,
    moduleIds.map((id, i) => Math.min(pools[id].multiple.length, quotas[i] - trueFalses[i]))
  );

  const picked = [];
  moduleIds.forEach((id, i) => {
    const pool = pools[id];
    const quota = quotas[i];
    const chosen = [
      ...pool.multiple.splice(0, multiples[i]),
      ...pool.trueFalse.splice(0, trueFalses[i]),
    ];
    // Simples hasta completar el cupo del módulo, y si no alcanzan, cualquier otro tipo.
    for (const rest of [pool.simple, pool.multiple, pool.trueFalse]) {
      if (chosen.length >= quota) break;
      chosen.push(...rest.splice(0, quota - chosen.length));
    }
    picked.push(...chosen);
  });

  // Módulo corto: completar con sobrantes de cualquier módulo (simples primero).
  for (const kind of ["simple", "multiple", "trueFalse"]) {
    for (const id of shuffle(moduleIds)) {
      if (picked.length >= size) break;
      picked.push(...pools[id][kind].splice(0, size - picked.length));
    }
  }
  return shuffle(picked);
}

function seenKey() {
  return `examenApp:seen:${scope()}`;
}

function loadSeen() {
  try {
    state.seen = new Set(JSON.parse(storageGet(seenKey()) || "[]"));
  } catch {
    state.seen = new Set();
  }
}

function markSeen(questionId) {
  state.seen.add(questionId);
  storageSet(seenKey(), JSON.stringify([...state.seen]));
}

function resetSeen() {
  state.seen = new Set();
  storageSet(seenKey(), null);
}

function startExam(mode = "normal") {
  if (!state.bank.length) return;
  state.mode = mode;
  state.answers.clear();
  // Si ya viste todo el banco, se reinicia el historial.
  if (state.bank.every((q) => state.seen.has(q.id))) resetSeen();
  state.exam =
    mode === "weak"
      ? buildWeakExam(state.bank, state.config.size)
      : buildExam(state.bank, state.config, state.seen);
  els.modeLabel.textContent = mode === "weak" ? "Práctica · temas flojos" : "Navegación";
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
    <p class="mt-2${state.server ? " hidden" : ""}">Si abriste el archivo con doble click y el navegador bloquea <code>fetch</code>, levantá un server local con:</p>
    <pre class="mt-2${state.server ? " hidden" : ""} overflow-x-auto rounded-xl bg-slate-950 p-3 text-xs text-slate-100">python3 -m http.server 8000</pre>
    <p class="mt-2${state.server ? " hidden" : ""}">Después abrí <code>http://localhost:8000</code> desde la carpeta <code>examen-app</code>.</p>
  `;
}

function pickBankId() {
  const ids = state.banks.map((b) => b.id);
  const fromUrl = new URLSearchParams(window.location.search).get("bank");
  if (ids.includes(fromUrl)) return fromUrl;
  const last = storageGet(LAST_BANK_KEY);
  if (ids.includes(last)) return last;
  return ids[0];
}

function renderBankSelect() {
  els.bankSelect.innerHTML = state.banks
    .map((b) => `<option value="${escapeHtml(b.id)}">${escapeHtml(b.title)}</option>`)
    .join("");
  els.bankSelect.value = state.bankId;
  els.bankSelect.classList.toggle("hidden", state.banks.length < 2);
}

function storedProfileId() {
  const id = Number(storageGet(PROFILE_KEY));
  return state.profiles.some((p) => p.id === id) ? id : null;
}

function renderProfiles() {
  els.profileSelect.innerHTML =
    state.profiles.map((p) => `<option value="${p.id}">👤 ${escapeHtml(p.name)}</option>`).join("") +
    `<option value="new">➕ Nuevo perfil…</option>`;
  if (state.profileId) els.profileSelect.value = String(state.profileId);
  els.profileSelect.classList.toggle("hidden", !state.profileId);
  els.profileButtons.innerHTML = state.profiles
    .map(
      (p) => `<button type="button" data-profile-id="${p.id}" class="rounded-2xl border border-slate-700 bg-slate-950 px-6 py-4 text-lg font-black text-white transition hover:border-cyan-300 hover:bg-slate-800">${escapeHtml(p.name)}</button>`
    )
    .join("");
  els.profileButtons.querySelectorAll("[data-profile-id]").forEach((btn) => {
    btn.addEventListener("click", () => selectProfile(Number(btn.dataset.profileId)));
  });
}

// Pantalla "¿Quién sos?": se muestra la primera vez en cada navegador o al pedir un perfil nuevo.
function showProfileGate(show) {
  els.profileGate.classList.toggle("hidden", !show);
  if (show) els.statsPanel.classList.add("hidden");
  for (const id of ["status", "quizNav", "quiz", "restartBtn", "bankSelect", "statsBtn"]) {
    document.getElementById(id).classList.toggle("hidden", show);
  }
  if (show) {
    els.profileError.classList.add("hidden");
    els.newProfileName.value = "";
  }
}

async function selectProfile(profileId) {
  state.profileId = profileId;
  storageSet(PROFILE_KEY, String(profileId));
  renderProfiles();
  showProfileGate(false);
  await loadBanks();
}

async function createProfile(event) {
  event.preventDefault();
  const name = els.newProfileName.value.trim();
  if (!name) return;
  try {
    const profile = await api("profiles", { method: "POST", body: { name } });
    state.profiles.push(profile);
    await selectProfile(profile.id);
  } catch (error) {
    els.profileError.textContent = error.message;
    els.profileError.classList.remove("hidden");
  }
}

async function loadBanks() {
  if (state.server) {
    state.banks = await api(`banks?${qs({ profile: state.profileId })}`);
  } else {
    const response = await fetch(BANKS_URL, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status} al cargar ${BANKS_URL}`);
    state.banks = (await response.json()).banks;
  }
  if (!state.banks.length) {
    state.bankId = null;
    state.bank = [];
    state.exam = [];
    els.quiz.innerHTML = "";
    els.subjectLabel.textContent = "Sin materias";
    els.examTitle.textContent = "Simulador";
    els.examDescription.textContent = "";
    els.bankCount.textContent = "-";
    els.lastResult.textContent = "Sin datos";
    renderBankSelect();
    showError("Este perfil todavía no tiene bancos de preguntas cargados.");
    return;
  }
  state.bankId = pickBankId();
  renderBankSelect();
  await loadBank(state.bankId);
}

async function detectServer() {
  try {
    const response = await fetch("api/health", { cache: "no-store" });
    return response.ok && (await response.json()).ok === true;
  } catch {
    return false;
  }
}

async function loadBank(bankId) {
  const meta = state.banks.find((b) => b.id === bankId);
  state.bankId = bankId;
  els.bankSelect.value = bankId;
  storageSet(LAST_BANK_KEY, bankId);

  const url = new URL(window.location.href);
  url.searchParams.set("bank", bankId);
  window.history.replaceState(null, "", url);

  els.subjectLabel.textContent = meta.subject;
  els.examTitle.textContent = meta.exam;
  els.examDescription.textContent = meta.description;
  document.title = `${meta.exam} - ${meta.subject}`;
  els.errorBox.classList.add("hidden");
  els.bankCount.textContent = "-";
  loadLastResult();

  let data;
  if (state.server) {
    data = await api(`banks/${encodeURIComponent(bankId)}`);
  } else {
    const response = await fetch(meta.file, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status} al cargar ${meta.file}`);
    data = await response.json();
  }
  // Si mientras cargaba se eligió otro banco, se descarta esta respuesta.
  if (bankId !== state.bankId) return;
  state.config = { ...DEFAULT_CONFIG, ...(data.config ?? {}) };
  state.bank = data.questions.filter((q) => (q.correctKey || q.correctKeys?.length) && q.choices?.length >= 2);
  loadSeen();
  state.history = [];
  try {
    await loadHistory();
  } catch (error) {
    // Sin historial igual se puede rendir; las respuestas nuevas quedan en la cola local.
    console.warn("No pude cargar el historial:", error);
  }
  if (bankId !== state.bankId) return;
  els.bankCount.textContent = String(state.bank.length);
  if (!els.statsPanel.classList.contains("hidden")) renderStats();
  startExam();
}

function isFormControl(target) {
  return target instanceof Element && target.closest("select, input, textarea, [contenteditable]") !== null;
}

function handleKeydown(event) {
  if (event.ctrlKey || event.metaKey || event.altKey) return;
  if (isFormControl(event.target) || state.exam.length === 0) return;

  if (event.key === "ArrowRight") {
    event.preventDefault();
    navigateTo(state.currentIndex + 1);
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    navigateTo(state.currentIndex - 1);
  } else if (/^[a-e1-5]$/i.test(event.key)) {
    // A-E (o 1-5) eligen la opción en esa posición; en múltiples la marcan/desmarcan.
    event.preventDefault();
    if (event.repeat) return;
    const position = /\d/.test(event.key) ? Number(event.key) - 1 : event.key.toLowerCase().charCodeAt(0) - 97;
    const button = els.quiz.querySelectorAll(".choice-btn")[position];
    if (button && !button.disabled) button.click();
  } else if (event.key === " " || event.code === "Space") {
    // Siempre se frena el comportamiento por defecto: evita scrollear y que el botón con foco se vuelva a activar.
    event.preventDefault();
    if (event.repeat) return;
    const submit = els.quiz.querySelector(".check-multiple-btn:not(:disabled)");
    if (submit) handleMultipleSubmit(submit);
  }
}

function handleKeyup(event) {
  // Los botones se activan con la barra al soltarla: se cancela para que no duplique la acción.
  if ((event.key === " " || event.code === "Space") && !isFormControl(event.target)) {
    event.preventDefault();
  }
}

const THEME_KEY = "examenApp:theme";
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(pref) {
  const dark = pref === "dark" || (pref === "system" && systemDark.matches);
  document.documentElement.dataset.theme = dark ? "dark" : "light";
}

function initTheme() {
  const select = document.querySelector("#themeSelect");
  const pref = storageGet(THEME_KEY) || "system";
  select.value = pref;
  applyTheme(pref);
  select.addEventListener("change", () => {
    storageSet(THEME_KEY, select.value);
    applyTheme(select.value);
  });
  // Si está en "Sistema", seguir los cambios del sistema operativo en vivo.
  systemDark.addEventListener("change", () => {
    if (select.value === "system") applyTheme("system");
  });
}

async function init() {
  initTheme();
  document.addEventListener("keydown", handleKeydown);
  document.addEventListener("keyup", handleKeyup);
  els.restartBtn.addEventListener("click", () => startExam());
  els.statsBtn.addEventListener("click", () => toggleStats());
  window.addEventListener("online", () => flushOutbox());
  els.prevBtn.addEventListener("click", () => navigateTo(state.currentIndex - 1));
  els.nextBtn.addEventListener("click", () => navigateTo(state.currentIndex + 1));
  els.bankSelect.addEventListener("change", () => {
    loadBank(els.bankSelect.value).catch((error) => showError(error.message));
  });

  els.profileSelect.addEventListener("change", () => {
    if (els.profileSelect.value === "new") {
      els.profileSelect.value = String(state.profileId);
      showProfileGate(true);
      return;
    }
    selectProfile(Number(els.profileSelect.value)).catch((error) => showError(error.message));
  });
  els.newProfileForm.addEventListener("submit", createProfile);

  try {
    state.server = await detectServer();
    if (state.server) {
      state.profiles = await api("profiles");
      state.profileId = storedProfileId();
      renderProfiles();
      if (!state.profileId) {
        showProfileGate(true);
        return;
      }
    }
    await loadBanks();
  } catch (error) {
    showError(error.message);
  }
}

init();
