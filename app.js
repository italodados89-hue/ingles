const CONFIG = window.ENGLISH_MOMENTUM_CONFIG || {};
const STORAGE_KEY = "englishMomentum:userData:v1";
const PAGE_SIZE = 30;
const TODAY = new Date();

const app = {
  program: null,
  user: null,
  selectedDate: "",
  activeView: "dashboard",
  blockFilter: "all",
  vocabPage: 1,
  vocabQuery: "",
  vocabWeek: "all",
  vocabStatus: "all",
  reviewQueue: [],
  reviewIndex: 0,
  reviewAnswerVisible: false,
  saveTimer: null,
};

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(value, options = { day: "2-digit", month: "short" }) {
  return new Intl.DateTimeFormat("pt-BR", options).format(new Date(`${value}T12:00:00`));
}

function formatLongDate(value) {
  return formatDate(value, { day: "numeric", month: "long", year: "numeric" });
}

function todayIso() {
  const year = TODAY.getFullYear();
  const month = String(TODAY.getMonth() + 1).padStart(2, "0");
  const day = String(TODAY.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(value, amount) {
  const date = new Date(`${value}T12:00:00`);
  date.setDate(date.getDate() + amount);
  return date.toISOString().slice(0, 10);
}

function createUserData() {
  return {
    schemaVersion: 1,
    settings: { endpoint: "", deviceId: crypto.randomUUID(), lastSyncAt: "" },
    dayProgress: {},
    vocabProgress: {},
    assessments: {},
    events: [],
  };
}

function loadUserData() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return {
      ...createUserData(),
      ...saved,
      settings: { ...createUserData().settings, ...(saved?.settings || {}) },
      dayProgress: saved?.dayProgress || {},
      vocabProgress: saved?.vocabProgress || {},
      assessments: saved?.assessments || {},
      events: Array.isArray(saved?.events) ? saved.events : [],
    };
  } catch (error) {
    console.warn("Não foi possível ler os dados locais.", error);
    return createUserData();
  }
}

function saveUserData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(app.user));
  renderSyncStatus();
  renderDataStats();
}

function recordEvent(eventType, entityId, payload, meta = {}) {
  const timestamp = new Date().toISOString();
  const event = {
    id: crypto.randomUUID(),
    created_at: timestamp,
    updated_at: timestamp,
    device_id: app.user.settings.deviceId,
    event_type: eventType,
    entity_id: entityId,
    date: meta.date || "",
    week: meta.week || "",
    payload,
    synced: false,
  };
  app.user.events.push(event);
  if (app.user.events.length > 8000) app.user.events = app.user.events.slice(-8000);
  saveUserData();
  if (app.user.settings.endpoint) window.setTimeout(() => syncNow({ quiet: true }), 300);
  return event;
}

function applyEvent(event) {
  let payload = event.payload;
  if (!payload && event.payload_json) {
    try { payload = JSON.parse(event.payload_json); } catch { payload = {}; }
  }
  if (event.event_type === "day_update") app.user.dayProgress[event.entity_id] = payload || {};
  if (event.event_type === "vocab_update") app.user.vocabProgress[event.entity_id] = payload || {};
  if (event.event_type === "assessment_update") app.user.assessments[event.entity_id] = payload || {};
}

function toast(message, type = "success") {
  const node = document.createElement("div");
  node.className = `toast ${type}`;
  node.textContent = message;
  $("#toastRegion").append(node);
  window.setTimeout(() => node.remove(), 3200);
}

function currentDay() {
  return app.program.days.find((day) => day.date === app.selectedDate) || app.program.days[0];
}

function dayProgress(dayId) {
  return app.user.dayProgress[dayId] || {
    completedActivities: [], status: "not_started", minutes: 0, speakingMinutes: 0,
    listening: 0, speaking: 0, writing: "", notes: "", errors: "",
  };
}

function dayCompletion(day) {
  const progress = dayProgress(day.id);
  if (progress.status === "complete") return 100;
  const total = day.activities?.length || 7;
  return Math.round(((progress.completedActivities?.length || 0) / total) * 100);
}

function completedDays() {
  return app.program.days.filter((day) => dayProgress(day.id).status === "complete").length;
}

function totalMinutes() {
  return Object.values(app.user.dayProgress).reduce((sum, item) => sum + Number(item.minutes || 0), 0);
}

function vocabCounts() {
  const counts = { unrated: 0, unknown: 0, known: 0, mastered: 0 };
  for (const item of app.program.vocabulary) {
    const status = app.user.vocabProgress[item.id]?.status || "unrated";
    counts[status] = (counts[status] || 0) + 1;
  }
  return counts;
}

function findStudyDate(item) {
  const day = app.program.days.find((entry) => entry.week === item.week && entry.vocabularyIds?.includes(item.id));
  return day?.date || app.program.meta.start;
}

function buildReviewQueue() {
  const today = todayIso();
  app.reviewQueue = app.program.vocabulary.filter((item) => {
    const progress = app.user.vocabProgress[item.id];
    return progress?.nextReview && progress.nextReview <= today;
  }).sort((a, b) => {
    const aDate = app.user.vocabProgress[a.id].nextReview;
    const bDate = app.user.vocabProgress[b.id].nextReview;
    return aDate.localeCompare(bDate);
  });
  if (app.reviewIndex >= app.reviewQueue.length) app.reviewIndex = 0;
}

function setView(view) {
  app.activeView = view;
  $$(".view").forEach((node) => node.classList.toggle("active", node.id === `view-${view}`));
  $$("[data-view]").forEach((node) => node.classList.toggle("active", node.dataset.view === view && node.classList.contains("nav-item")));
  const active = $(`#view-${view}`);
  $("#viewTitle").textContent = active?.dataset.title || "English Momentum";
  document.body.classList.remove("menu-open");
  $("#mobileMenu").setAttribute("aria-expanded", "false");
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (view === "vocabulary") renderVocabulary();
  if (view === "review") { buildReviewQueue(); renderReview(); }
  if (view === "assessment") renderAssessments();
  if (view === "data") renderDataSettings();
}

function renderSyncStatus() {
  if (!app.user) return;
  const pending = app.user.events.filter((event) => !event.synced).length;
  const chip = $("#syncChip");
  chip.className = `sync-chip ${pending ? "pending" : ""}`;
  if (!app.user.settings.endpoint) {
    $("#syncLabel").textContent = pending ? `${pending} alterações no dispositivo` : "Salvo neste dispositivo";
  } else if (pending) {
    $("#syncLabel").textContent = `${pending} aguardando sincronização`;
  } else {
    $("#syncLabel").textContent = app.user.settings.lastSyncAt ? "Sincronizado" : "Conectado";
  }
}

function renderSidebar() {
  const done = completedDays();
  const percentage = Math.round((done / app.program.meta.coreDays) * 100);
  const selected = currentDay();
  $("#sideBlockLabel").textContent = `Bloco ${selected.week <= 8 ? 1 : 2} · Semana ${selected.week}`;
  $("#sideProgressBar").style.width = `${percentage}%`;
  $("#sideProgressText").textContent = `${percentage}% concluído`;
}

function renderDashboard() {
  const done = completedDays();
  const minutes = totalMinutes();
  const counts = vocabCounts();
  buildReviewQueue();
  const metricData = [
    ["Dias concluídos", `${done}/${app.program.meta.coreDays}`, `${Math.round(done / app.program.meta.coreDays * 100)}% do plano`, "#e8f1f6"],
    ["Horas realizadas", (minutes / 60).toFixed(1), `${(app.program.meta.coreDays * 2.5).toFixed(0)}h planejadas`, "#fff0e6"],
    ["Itens avaliados", counts.unknown + counts.known + counts.mastered, `${counts.mastered} dominados`, "#eff7d8"],
    ["Revisões devidas", app.reviewQueue.length, "recuperação espaçada", "#f5e9f0"],
  ];
  $("#metricsGrid").innerHTML = metricData.map(([label, value, detail, color]) => `
    <article class="metric-card" style="--metric-color:${color}"><span>${label}</span><strong>${value}</strong><small>${detail}</small></article>
  `).join("");

  const today = app.program.days.find((day) => day.date === todayIso()) || app.program.days.find((day) => dayProgress(day.id).status !== "complete") || app.program.days.at(-1);
  const progress = dayCompletion(today);
  $("#todayCard").innerHTML = `
    <div class="today-copy">
      <div class="today-meta"><span class="badge">Semana ${today.week}</span><span class="badge">${formatLongDate(today.date)}</span></div>
      <h2>${escapeHtml(today.focus)}</h2>
      <p><strong>Gramática:</strong> ${escapeHtml(today.grammar)} · <strong>Entrega:</strong> ${escapeHtml(today.deliverable)}</p>
      <div class="today-actions"><button class="button primary" type="button" data-open-day="${today.date}">Abrir sessão</button><button class="button secondary" type="button" data-view="review">Revisar ${app.reviewQueue.length} itens</button></div>
    </div>
    <div class="today-rail"><div><span>Carga do dia</span><strong>2h30</strong></div><div class="rail-ring" style="--progress:${progress}%" data-label="${progress}%"></div></div>
  `;

  $("#heatmap").innerHTML = app.program.days.map((day) => {
    const percentage = dayCompletion(day);
    const level = percentage === 100 ? 2 : percentage > 0 ? 1 : 0;
    return `<button class="heat-cell level-${level}" title="${formatLongDate(day.date)} — ${percentage}%" data-open-day="${day.date}" aria-label="${formatLongDate(day.date)}: ${percentage}%"></button>`;
  }).join("");

  let streak = 0;
  for (const day of [...app.program.days].reverse()) {
    if (dayProgress(day.id).status === "complete") streak += 1;
    else if (streak) break;
  }
  $("#streakBadge").textContent = `${streak} ${streak === 1 ? "dia" : "dias"}`;

  const max = app.program.vocabulary.length;
  const masteryRows = [
    ["Nova para mim", counts.unknown, "#ba3a3a"], ["Já conhecia", counts.known, "#ef7d3c"],
    ["Domino", counts.mastered, "#82ad3d"], ["Sem avaliação", counts.unrated, "#b9c3c4"],
  ];
  $("#masteryChart").innerHTML = masteryRows.map(([label, value, color]) => `
    <div class="mastery-row"><span>${label}</span><div class="bar-track"><span style="--value:${value / max * 100}%;--color:${color}"></span></div><strong>${value}</strong></div>
  `).join("");

  const todayIndex = Math.max(0, app.program.days.findIndex((day) => day.date >= todayIso()));
  const upcoming = app.program.days.slice(todayIndex, todayIndex + 4);
  $("#upcomingList").innerHTML = upcoming.map((day) => `
    <button class="upcoming-item text-button" data-open-day="${day.date}" type="button"><span class="upcoming-date">${formatDate(day.date)}</span><span><strong>${escapeHtml(day.focus)}</strong><small>Semana ${day.week} · ${escapeHtml(day.grammar)}</small></span><span>→</span></button>
  `).join("");

  renderSidebar();
}

function renderDaySelect() {
  const select = $("#daySelect");
  select.innerHTML = app.program.weeks.map((week) => {
    const days = app.program.days.filter((day) => day.week === week.week);
    return `<optgroup label="Semana ${week.week} — ${escapeHtml(week.theme)}">${days.map((day) => `<option value="${day.date}">${formatDate(day.date)} · ${escapeHtml(day.focus)}</option>`).join("")}</optgroup>`;
  }).join("");
  select.value = app.selectedDate;
}

function renderRatings(progress) {
  for (const kind of ["listening", "speaking"]) {
    const node = $(`[data-rating="${kind}"]`);
    node.innerHTML = [1, 2, 3, 4, 5].map((number) => `<button type="button" data-rate-kind="${kind}" data-rate-value="${number}" class="${progress[kind] === number ? "active" : ""}" aria-label="${kind} ${number} de 5">${number}</button>`).join("");
  }
}

function renderStudy() {
  const day = currentDay();
  const progress = dayProgress(day.id);
  renderDaySelect();
  $("#studyTitle").textContent = day.focus;
  $("#studySubtitle").textContent = `Semana ${day.week} · ${formatLongDate(day.date)} · ${day.theme}`;
  $("#missionBanner").innerHTML = `
    <div><p class="eyebrow">By the end, you can...</p><h2>${escapeHtml(app.program.weeks.find((week) => week.week === day.week)?.canDo || day.focus)}</h2><p>Foco linguístico: ${escapeHtml(day.grammar)}</p></div>
    <div class="mission-deliverable"><span>Entrega obrigatória</span><strong>${escapeHtml(day.deliverable)}</strong></div>
  `;

  const completed = new Set(progress.completedActivities || []);
  $("#ritualList").innerHTML = day.activities.map((activity, index) => {
    const id = activity.id || `activity-${index}`;
    return `<div class="ritual-item"><button class="ritual-check ${completed.has(id) ? "done" : ""}" type="button" data-activity="${id}" aria-label="${completed.has(id) ? "Desmarcar" : "Concluir"} ${escapeHtml(activity.label)}">${completed.has(id) ? "✓" : ""}</button><span class="ritual-time">${activity.minutes} min</span><div class="ritual-copy"><strong>${escapeHtml(activity.label)}</strong><span>${escapeHtml(activity.instruction)}</span></div></div>`;
  }).join("");
  $("#ritualProgress").textContent = `${completed.size} de ${day.activities.length}`;

  const guide = app.program.grammarGuides[day.grammarGuide] || app.program.grammarGuides.base;
  $("#grammarPanel").innerHTML = `
    <div class="panel-heading"><div><p class="eyebrow">Grammar in action</p><h2>${escapeHtml(day.grammar)}</h2></div><span class="badge">Forma · significado · uso</span></div>
    <div class="grammar-layout"><div class="grammar-rule"><strong>Regra mínima</strong><p>${escapeHtml(guide.rule)}</p><div class="pitfall"><strong>Atenção PT → EN:</strong> ${escapeHtml(guide.pitfall)}</div></div><div><ul class="example-list">${guide.examples.map((example) => `<li>${escapeHtml(example)}</li>`).join("")}</ul><div class="micro-practice">Microprática: ${escapeHtml(guide.practice)}</div></div></div>
  `;

  const items = day.vocabularyIds.map((id) => app.program.vocabulary.find((item) => item.id === id)).filter(Boolean);
  $("#dailyVocab").innerHTML = items.map((item, index) => `
    <div class="daily-word"><span class="word-number">${String(index + 1).padStart(2, "0")}</span><span><strong>${escapeHtml(item.english)}</strong><small>${escapeHtml(item.portuguese)}</small></span><button class="speak-button" type="button" data-speak="${escapeHtml(item.english)}" aria-label="Ouvir ${escapeHtml(item.english)}">◖</button></div>
  `).join("") || `<div class="empty-state">Este checkpoint usa a revisão dos itens já estudados.</div>`;

  $("#writingNote").value = progress.writing || "";
  $("#dayNotes").value = progress.notes || "";
  $("#errorNotes").value = progress.errors || "";
  $("#minutesDone").value = progress.minutes || "";
  $("#speakingMinutes").value = progress.speakingMinutes || "";
  updateWordCount();
  renderRatings(progress);
  $("#completeDay").textContent = progress.status === "complete" ? "Dia concluído ✓" : "Concluir e salvar o dia";
  $("#completeDay").classList.toggle("secondary", progress.status === "complete");
  $("#completeDay").classList.toggle("primary", progress.status !== "complete");
}

function collectDayProgress() {
  const day = currentDay();
  const existing = dayProgress(day.id);
  return {
    ...existing,
    writing: $("#writingNote").value,
    notes: $("#dayNotes").value,
    errors: $("#errorNotes").value,
    minutes: Number($("#minutesDone").value || 0),
    speakingMinutes: Number($("#speakingMinutes").value || 0),
    updatedAt: new Date().toISOString(),
  };
}

function persistDayProgress({ event = true } = {}) {
  const day = currentDay();
  const progress = collectDayProgress();
  if (progress.status !== "complete" && (progress.completedActivities?.length || progress.writing || progress.notes || progress.minutes)) progress.status = "in_progress";
  app.user.dayProgress[day.id] = progress;
  if (event) recordEvent("day_update", day.id, progress, { date: day.date, week: day.week });
  else saveUserData();
  renderDashboard();
}

function scheduleDaySave() {
  window.clearTimeout(app.saveTimer);
  app.saveTimer = window.setTimeout(() => persistDayProgress(), 650);
}

function updateWordCount() {
  const words = $("#writingNote").value.trim().split(/\s+/).filter(Boolean).length;
  $("#writingCount").textContent = `${words} ${words === 1 ? "palavra" : "palavras"}`;
}

function toggleActivity(activityId) {
  const day = currentDay();
  const progress = collectDayProgress();
  const completed = new Set(progress.completedActivities || []);
  if (completed.has(activityId)) completed.delete(activityId); else completed.add(activityId);
  progress.completedActivities = [...completed];
  progress.status = completed.size ? "in_progress" : "not_started";
  app.user.dayProgress[day.id] = progress;
  recordEvent("day_update", day.id, progress, { date: day.date, week: day.week });
  renderStudy();
  renderDashboard();
}

function setRating(kind, value) {
  const day = currentDay();
  const progress = collectDayProgress();
  progress[kind] = value;
  app.user.dayProgress[day.id] = progress;
  recordEvent("day_update", day.id, progress, { date: day.date, week: day.week });
  renderRatings(progress);
}

function completeSelectedDay() {
  const day = currentDay();
  const progress = collectDayProgress();
  progress.status = "complete";
  progress.completedAt = new Date().toISOString();
  app.user.dayProgress[day.id] = progress;
  recordEvent("day_update", day.id, progress, { date: day.date, week: day.week });
  toast("Dia concluído e salvo.");
  renderStudy();
  renderDashboard();
  renderPlan();
}

function renderPlan() {
  const weeks = app.program.weeks.filter((week) => app.blockFilter === "all" || String(week.block) === app.blockFilter);
  $("#weekGrid").innerHTML = weeks.map((week) => {
    const days = app.program.days.filter((day) => day.week === week.week);
    const done = days.filter((day) => dayProgress(day.id).status === "complete").length;
    const percent = Math.round(done / days.length * 100);
    return `<button class="week-card" type="button" data-week-detail="${week.week}"><span class="week-top"><span class="week-number">Semana ${week.week}</span><span class="block-tag">Bloco ${week.block}</span></span><h2>${escapeHtml(week.theme)}</h2><p>${escapeHtml(week.canDo)}</p><div class="progress-track"><span style="width:${percent}%"></span></div><footer><span>${formatDate(week.start)}–${formatDate(week.end)}</span><strong>${done}/7 dias</strong></footer></button>`;
  }).join("");

  const checkpoint = app.program.checkpoint;
  $("#checkpointPanel").innerHTML = `<div><h2>${escapeHtml(checkpoint.title)}</h2><p>7 dias do plano original para comparar gravações, corrigir fraquezas e consolidar os 560 itens do bloco 1.</p></div><button class="button secondary" type="button" data-checkpoint-detail>Ver checkpoint</button>`;
}

function showWeekDetail(weekNumber, daysOverride = null, titleOverride = "") {
  const week = app.program.weeks.find((entry) => entry.week === weekNumber);
  const days = daysOverride || app.program.days.filter((day) => day.week === weekNumber);
  const detail = $("#weekDetail");
  detail.hidden = false;
  detail.innerHTML = `<div class="day-drawer-head"><div><p class="eyebrow">${titleOverride ? "Consolidação" : `Semana ${weekNumber}`}</p><h2>${escapeHtml(titleOverride || week.theme)}</h2></div><button class="icon-button" type="button" data-close-drawer aria-label="Fechar">×</button></div><div class="drawer-days">${days.map((day) => `<div class="drawer-day"><span>${formatDate(day.date)}</span><strong>${escapeHtml(day.focus)}</strong><span>${escapeHtml(day.grammar)}</span>${day.phase === "core" ? `<button class="button secondary" type="button" data-open-day="${day.date}">Estudar</button>` : `<span class="badge">Checkpoint</span>`}</div>`).join("")}</div>`;
  detail.scrollIntoView({ behavior: "smooth", block: "start" });
}

function itemStatus(item) {
  return app.user.vocabProgress[item.id]?.status || "unrated";
}

function findReplacement(item) {
  const progress = app.user.vocabProgress[item.id] || {};
  if (progress.replacementId) return app.program.vocabulary.find((entry) => entry.id === progress.replacementId);
  const start = app.program.vocabulary.findIndex((entry) => entry.id === item.id);
  for (let offset = 73; offset < app.program.vocabulary.length; offset += 1) {
    const candidate = app.program.vocabulary[(start + offset) % app.program.vocabulary.length];
    if (candidate.id !== item.id && candidate.week !== item.week && !app.user.vocabProgress[candidate.id]?.acceptedFor) return candidate;
  }
  return null;
}

function setVocabStatus(itemId, status) {
  const item = app.program.vocabulary.find((entry) => entry.id === itemId);
  const current = app.user.vocabProgress[itemId] || {};
  const intervals = { unknown: 1, known: 3, mastered: 7 };
  const replacement = status === "known" || status === "mastered" ? findReplacement(item) : null;
  const progress = {
    ...current, status, ratedAt: new Date().toISOString(),
    nextReview: addDays(todayIso(), intervals[status]),
    replacementId: replacement?.id || "",
  };
  app.user.vocabProgress[itemId] = progress;
  recordEvent("vocab_update", itemId, progress, { date: findStudyDate(item), week: item.week });
  renderVocabulary();
  renderDashboard();
}

function acceptReplacement(itemId) {
  const sourceProgress = app.user.vocabProgress[itemId];
  const replacementId = sourceProgress?.replacementId;
  if (!replacementId) return;
  const replacementProgress = {
    ...(app.user.vocabProgress[replacementId] || {}),
    status: "unknown", acceptedFor: itemId, ratedAt: new Date().toISOString(), nextReview: addDays(todayIso(), 1),
  };
  sourceProgress.replacementAccepted = true;
  app.user.vocabProgress[replacementId] = replacementProgress;
  recordEvent("vocab_update", replacementId, replacementProgress, { week: app.program.vocabulary.find((item) => item.id === replacementId)?.week });
  recordEvent("vocab_update", itemId, sourceProgress, { week: app.program.vocabulary.find((item) => item.id === itemId)?.week });
  toast("Novo desafio adicionado à sua fila.");
  renderVocabulary();
}

function renderVocabulary() {
  let items = app.program.vocabulary.filter((item) => {
    const query = app.vocabQuery.toLowerCase();
    const haystack = `${item.english} ${item.portuguese} ${item.example}`.toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    const matchesWeek = app.vocabWeek === "all" || String(item.week) === app.vocabWeek;
    const matchesStatus = app.vocabStatus === "all" || itemStatus(item) === app.vocabStatus;
    return matchesQuery && matchesWeek && matchesStatus;
  });
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  if (app.vocabPage > totalPages) app.vocabPage = totalPages;
  const visible = items.slice((app.vocabPage - 1) * PAGE_SIZE, app.vocabPage * PAGE_SIZE);
  $("#vocabCount").textContent = `${items.length} ${items.length === 1 ? "item" : "itens"}`;
  $("#vocabList").innerHTML = visible.length ? visible.map((item) => {
    const progress = app.user.vocabProgress[item.id] || {};
    const replacement = progress.replacementId ? app.program.vocabulary.find((entry) => entry.id === progress.replacementId) : null;
    return `<article class="vocab-card"><div class="vocab-term"><span class="word-number">${item.id.slice(1)}</span><span><strong>${escapeHtml(item.english)}</strong><small>${escapeHtml(item.portuguese)} · Semana ${item.week}</small></span><button class="speak-button" type="button" data-speak="${escapeHtml(item.english)}" aria-label="Ouvir pronúncia">◖</button></div><div class="vocab-example">${escapeHtml(item.example)}<em>Crie uma frase pessoal e outra profissional.</em></div><div class="thermometer" aria-label="Nível de domínio"><button type="button" data-vocab-id="${item.id}" data-status="unknown" class="${progress.status === "unknown" ? "active" : ""}">Nova</button><button type="button" data-vocab-id="${item.id}" data-status="known" class="${progress.status === "known" ? "active" : ""}">Já conhecia</button><button type="button" data-vocab-id="${item.id}" data-status="mastered" class="${progress.status === "mastered" ? "active" : ""}">Domino</button></div>${replacement ? `<div class="replacement"><span>Novo desafio sugerido:</span><strong>${escapeHtml(replacement.english)}</strong><span>${escapeHtml(replacement.portuguese)}</span>${progress.replacementAccepted ? `<span class="badge">Adicionado</span>` : `<button class="accept-replacement" type="button" data-accept-replacement="${item.id}">Adicionar ao estudo</button>`}</div>` : ""}</article>`;
  }).join("") : `<div class="empty-state">Nenhum item corresponde aos filtros.</div>`;
  const pages = [];
  const start = Math.max(1, app.vocabPage - 2);
  const end = Math.min(totalPages, start + 4);
  for (let page = start; page <= end; page += 1) pages.push(page);
  $("#vocabPagination").innerHTML = totalPages > 1 ? `${app.vocabPage > 1 ? `<button type="button" data-vocab-page="${app.vocabPage - 1}">←</button>` : ""}${pages.map((page) => `<button type="button" data-vocab-page="${page}" class="${page === app.vocabPage ? "active" : ""}">${page}</button>`).join("")}${app.vocabPage < totalPages ? `<button type="button" data-vocab-page="${app.vocabPage + 1}">→</button>` : ""}` : "";
  $("#vocabSearch").value = app.vocabQuery;
  $("#vocabWeekFilter").value = app.vocabWeek;
  $("#vocabStatusFilter").value = app.vocabStatus;
}

function pronounce(text) {
  if (!("speechSynthesis" in window)) return toast("Pronúncia não disponível neste navegador.", "error");
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.84;
  window.speechSynthesis.speak(utterance);
}

function renderReview() {
  $("#reviewQueueCount").textContent = `${app.reviewQueue.length} para revisar`;
  if (!app.reviewQueue.length) {
    $("#reviewShell").innerHTML = `<div class="review-empty"><div><div class="brand-mark" style="margin:auto">✓</div><h2>Fila em dia</h2><p>Classifique novas palavras ou volte quando uma revisão vencer.</p><button class="button secondary" type="button" data-view="vocabulary" style="margin-top:18px">Abrir vocabulário</button></div></div>`;
    return;
  }
  const item = app.reviewQueue[app.reviewIndex];
  const progress = app.user.vocabProgress[item.id] || {};
  $("#reviewShell").innerHTML = `<article class="flashcard"><span class="week-number">${app.reviewIndex + 1} de ${app.reviewQueue.length} · Semana ${item.week}</span><h2>${escapeHtml(item.english)}</h2><button class="button secondary" type="button" data-speak="${escapeHtml(item.english)}">Ouvir pronúncia</button>${app.reviewAnswerVisible ? `<div class="flashcard-answer"><strong>${escapeHtml(item.portuguese)}</strong><p>${escapeHtml(item.example)}</p><div class="review-actions"><button class="review-grade" data-grade="again" type="button">Não lembrei · 1d</button><button class="review-grade" data-grade="hard" type="button">Difícil · 3d</button><button class="review-grade" data-grade="good" type="button">Bom · 7/14d</button><button class="review-grade" data-grade="easy" type="button">Fácil · 30d</button></div></div>` : `<div class="review-actions"><button class="button primary" type="button" data-show-answer>Mostrar resposta</button></div>`}<p style="margin-top:24px;color:var(--muted);font-size:.72rem">Revisões anteriores: ${progress.reviewCount || 0}</p></article>`;
}

function gradeReview(grade) {
  const item = app.reviewQueue[app.reviewIndex];
  const current = app.user.vocabProgress[item.id] || {};
  const count = (current.reviewCount || 0) + 1;
  const interval = grade === "again" ? 1 : grade === "hard" ? 3 : grade === "easy" ? 30 : count >= 3 ? 14 : 7;
  const status = grade === "easy" ? "mastered" : grade === "again" ? "unknown" : current.status || "known";
  const progress = { ...current, status, reviewCount: count, lastReview: todayIso(), nextReview: addDays(todayIso(), interval), lastGrade: grade };
  app.user.vocabProgress[item.id] = progress;
  recordEvent("vocab_update", item.id, progress, { week: item.week });
  app.reviewAnswerVisible = false;
  buildReviewQueue();
  renderReview();
  renderDashboard();
}

function assessmentAverage(values) {
  const fields = ["fluency", "comprehension", "interaction", "vocabulary", "grammar", "pronunciation"];
  const numbers = fields.map((field) => Number(values[field] || 0));
  return Math.round(numbers.reduce((sum, value) => sum + value, 0) / 60 * 100);
}

function renderAssessments(selectedWeek = null) {
  const defaultWeek = selectedWeek || app.program.weeks.find((week) => !app.user.assessments[String(week.week)])?.week || 16;
  const week = app.program.weeks.find((entry) => entry.week === Number(defaultWeek));
  const data = app.user.assessments[String(defaultWeek)] || {};
  $("#assessmentFormPanel").innerHTML = `<p class="eyebrow">Registrar evidência</p><h2>Semana ${defaultWeek}</h2><form class="assessment-form" id="assessmentForm"><label>Semana<select name="week">${app.program.weeks.map((entry) => `<option value="${entry.week}" ${entry.week === Number(defaultWeek) ? "selected" : ""}>Semana ${entry.week}</option>`).join("")}</select></label><div class="rubric-grid">${[["fluency","Fluência"],["comprehension","Compreensão"],["interaction","Interação"],["vocabulary","Vocabulário"],["grammar","Gramática"],["pronunciation","Pronúncia"]].map(([key,label]) => `<label>${label} 0–10<input name="${key}" type="number" min="0" max="10" value="${data[key] ?? ""}" required></label>`).join("")}</div><label>Evidência observável<textarea name="evidence" rows="4" placeholder="Ex.: mantive 18 minutos de reunião com duas reformulações...">${escapeHtml(data.evidence || "")}</textarea></label><button class="button primary" type="submit">Salvar avaliação</button></form>`;

  const scores = app.program.weeks.map((entry) => ({ week: entry.week, score: app.user.assessments[String(entry.week)]?.score || 0 }));
  $("#scoreChart").innerHTML = scores.map(({ week: number, score }) => `<div class="score-column"><strong>${score || "—"}</strong><i style="--height:${Math.max(2, score * 2)}px"></i><span>S${number}</span></div>`).join("");
  $("#assessmentRows").innerHTML = app.program.weeks.map((entry) => {
    const assessment = app.user.assessments[String(entry.week)] || {};
    const finalDay = app.program.days.filter((day) => day.week === entry.week).at(-1);
    return `<tr><td>Semana ${entry.week}</td><td>${escapeHtml(finalDay?.deliverable || entry.canDo)}</td><td><span class="score-pill">${assessment.score ?? "—"}</span></td><td>${escapeHtml(assessment.evidence || "Ainda não registrada")}</td><td><button class="text-button" type="button" data-edit-assessment="${entry.week}">Editar</button></td></tr>`;
  }).join("");
}

function saveAssessment(form) {
  const values = Object.fromEntries(new FormData(form).entries());
  const week = values.week;
  const assessment = { ...values, week: Number(week), score: assessmentAverage(values), updatedAt: new Date().toISOString() };
  app.user.assessments[week] = assessment;
  recordEvent("assessment_update", week, assessment, { week });
  toast(`Avaliação da semana ${week} salva: ${assessment.score}/100.`);
  renderAssessments(Number(week));
}

function renderRoadmap() {
  $("#roadmapList").innerHTML = app.program.roadmap.map((item) => `<article class="roadmap-card ${item.block <= 2 ? "complete" : "adaptive"}"><span class="block-index">Bloco ${item.block} · Meses ${item.months}</span><h2>${escapeHtml(item.goal)}</h2><p>${item.block <= 2 ? "Conteúdo diário disponível na plataforma." : "Será gerado a partir das avaliações, erros e vocabulário que mais precisam de reforço."}</p><footer><span class="badge">${escapeHtml(item.status)}</span></footer></article>`).join("");
  $("#bridgeGrid").innerHTML = app.program.yearEndBridge.map((item) => `<article class="bridge-card"><span>${formatDate(item.start)}–${formatDate(item.end)}</span><strong>${escapeHtml(item.focus)}</strong><p>${escapeHtml(item.task)}</p></article>`).join("");
}

function renderDataStats() {
  if (!app.user) return;
  $("#eventCount").textContent = app.user.events.length;
  $("#pendingCount").textContent = app.user.events.filter((event) => !event.synced).length;
}

function renderDataSettings() {
  $("#appsScriptUrl").value = app.user.settings.endpoint || "";
  const result = $("#connectionResult");
  if (app.user.settings.endpoint) {
    result.className = "connection-result success";
    result.textContent = app.user.settings.lastSyncAt ? `Conectado · última sincronização ${new Date(app.user.settings.lastSyncAt).toLocaleString("pt-BR")}` : "URL salva. Use “Salvar e testar” para validar.";
  } else {
    result.className = "connection-result";
    result.textContent = "Ainda não conectado. O progresso continua seguro neste dispositivo.";
  }
  renderDataStats();
}

async function testEndpoint(endpoint) {
  const separator = endpoint.includes("?") ? "&" : "?";
  const response = await fetch(`${endpoint}${separator}action=ping&t=${Date.now()}`);
  if (!response.ok) throw new Error("Web App indisponível");
  const data = await response.json();
  if (!data.ok) throw new Error(data.error || "Resposta inválida");
  return data;
}

async function saveEndpoint() {
  const endpoint = $("#appsScriptUrl").value.trim();
  if (!/^https:\/\/script\.google\.com\//.test(endpoint)) return toast("Cole uma URL válida de Web App do Google Apps Script.", "error");
  const result = $("#connectionResult");
  result.className = "connection-result";
  result.textContent = "Testando conexão...";
  try {
    await testEndpoint(endpoint);
    app.user.settings.endpoint = endpoint;
    saveUserData();
    result.className = "connection-result success";
    result.textContent = "Conexão validada. Sincronizando alterações locais...";
    await syncNow();
  } catch (error) {
    result.className = "connection-result error";
    result.textContent = `Não foi possível conectar: ${error.message}`;
  }
}

async function syncNow({ quiet = false } = {}) {
  const endpoint = app.user.settings.endpoint;
  if (!endpoint) {
    if (!quiet) { setView("data"); toast("Configure o Apps Script para sincronizar.", "error"); }
    return;
  }
  const pending = app.user.events.filter((event) => !event.synced);
  try {
    $("#syncChip").className = "sync-chip pending";
    $("#syncLabel").textContent = "Sincronizando...";
    if (pending.length) {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action: "upsertEvents", deviceId: app.user.settings.deviceId, clientVersion: CONFIG.version, events: pending.map(({ synced, ...event }) => event) }),
      });
      if (!response.ok) throw new Error("Falha no envio");
      const result = await response.json();
      if (!result.ok) throw new Error(result.error || "Falha na gravação");
      const acknowledged = new Set(result.acknowledged || pending.map((event) => event.id));
      app.user.events.forEach((event) => { if (acknowledged.has(event.id)) event.synced = true; });
    }
    const separator = endpoint.includes("?") ? "&" : "?";
    const pullResponse = await fetch(`${endpoint}${separator}action=pull&limit=8000&t=${Date.now()}`);
    if (pullResponse.ok) {
      const remote = await pullResponse.json();
      if (remote.ok && Array.isArray(remote.events)) {
        const localIds = new Set(app.user.events.map((event) => event.id));
        remote.events.sort((a, b) => String(a.updated_at).localeCompare(String(b.updated_at))).forEach((event) => {
          if (!localIds.has(event.id)) {
            applyEvent(event);
            app.user.events.push({ ...event, synced: true });
          }
        });
      }
    }
    app.user.settings.lastSyncAt = new Date().toISOString();
    saveUserData();
    renderAll();
    if (!quiet) toast("Sincronização concluída.");
  } catch (error) {
    $("#syncChip").className = "sync-chip error";
    $("#syncLabel").textContent = "Falha na sincronização";
    if (!quiet) toast(`Não foi possível sincronizar: ${error.message}`, "error");
  }
}

function parseCsv(text) {
  const rows = [];
  let row = [], field = "", quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];
    if (char === '"' && quoted && next === '"') { field += '"'; index += 1; }
    else if (char === '"') quoted = !quoted;
    else if (char === "," && !quoted) { row.push(field); field = ""; }
    else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(field); field = "";
      if (row.some((value) => value !== "")) rows.push(row);
      row = [];
    } else field += char;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows;
}

async function checkPublishedSource() {
  const result = $("#sourceResult");
  result.className = "connection-result";
  result.textContent = "Consultando a planilha pública...";
  try {
    const url = `${CONFIG.publishedSheetBase}?gid=${CONFIG.sheets.plan}&single=true&output=csv&t=${Date.now()}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Fonte indisponível");
    const rows = parseCsv(await response.text());
    const dataRows = rows.filter((row) => /^\d{2}\/\d{2}\/\d{4}$/.test(row[0]));
    result.className = "connection-result success";
    result.textContent = `Planilha online acessível: ${dataRows.length} dias encontrados no plano original.`;
  } catch (error) {
    result.className = "connection-result error";
    result.textContent = "A planilha não respondeu. O conteúdo local permanece disponível.";
  }
}

function exportBackup() {
  const payload = { exportedAt: new Date().toISOString(), app: "English Momentum", data: app.user };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `english-momentum-backup-${todayIso()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

async function importBackup(file) {
  try {
    const parsed = JSON.parse(await file.text());
    const incoming = parsed.data || parsed;
    if (!incoming.dayProgress || !incoming.vocabProgress) throw new Error("Formato de backup inválido");
    app.user = { ...createUserData(), ...incoming, settings: { ...createUserData().settings, ...(incoming.settings || {}) } };
    saveUserData();
    renderAll();
    toast("Backup restaurado com sucesso.");
  } catch (error) {
    toast(`Não foi possível importar: ${error.message}`, "error");
  }
}

function renderAll() {
  renderDashboard();
  renderStudy();
  renderPlan();
  renderVocabulary();
  buildReviewQueue();
  renderReview();
  renderAssessments();
  renderRoadmap();
  renderDataSettings();
}

function populateFilters() {
  $("#vocabWeekFilter").innerHTML = `<option value="all">Todas</option>${app.program.weeks.map((week) => `<option value="${week.week}">Semana ${week.week}</option>`).join("")}`;
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    const viewButton = event.target.closest("[data-view]");
    if (viewButton) setView(viewButton.dataset.view);
    const openDay = event.target.closest("[data-open-day]");
    if (openDay) { app.selectedDate = openDay.dataset.openDay; renderStudy(); setView("study"); }
    const activity = event.target.closest("[data-activity]");
    if (activity) toggleActivity(activity.dataset.activity);
    const rate = event.target.closest("[data-rate-kind]");
    if (rate) setRating(rate.dataset.rateKind, Number(rate.dataset.rateValue));
    const speak = event.target.closest("[data-speak]");
    if (speak) pronounce(speak.dataset.speak);
    const status = event.target.closest("[data-vocab-id][data-status]");
    if (status) setVocabStatus(status.dataset.vocabId, status.dataset.status);
    const replacement = event.target.closest("[data-accept-replacement]");
    if (replacement) acceptReplacement(replacement.dataset.acceptReplacement);
    const page = event.target.closest("[data-vocab-page]");
    if (page) { app.vocabPage = Number(page.dataset.vocabPage); renderVocabulary(); window.scrollTo({ top: 0, behavior: "smooth" }); }
    const week = event.target.closest("[data-week-detail]");
    if (week) showWeekDetail(Number(week.dataset.weekDetail));
    if (event.target.closest("[data-checkpoint-detail]")) showWeekDetail(0, app.program.checkpoint.days, app.program.checkpoint.title);
    if (event.target.closest("[data-close-drawer]")) $("#weekDetail").hidden = true;
    if (event.target.closest("[data-show-answer]")) { app.reviewAnswerVisible = true; renderReview(); }
    const grade = event.target.closest("[data-grade]");
    if (grade) gradeReview(grade.dataset.grade);
    const editAssessment = event.target.closest("[data-edit-assessment]");
    if (editAssessment) { renderAssessments(Number(editAssessment.dataset.editAssessment)); $("#assessmentFormPanel").scrollIntoView({ behavior: "smooth" }); }
  });

  $("#mobileMenu").addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    $("#mobileMenu").setAttribute("aria-expanded", String(open));
  });
  $("#daySelect").addEventListener("change", (event) => { persistDayProgress({ event: false }); app.selectedDate = event.target.value; renderStudy(); });
  $("#prevDay").addEventListener("click", () => { const index = app.program.days.findIndex((day) => day.date === app.selectedDate); if (index > 0) { persistDayProgress({ event: false }); app.selectedDate = app.program.days[index - 1].date; renderStudy(); } });
  $("#nextDay").addEventListener("click", () => { const index = app.program.days.findIndex((day) => day.date === app.selectedDate); if (index < app.program.days.length - 1) { persistDayProgress({ event: false }); app.selectedDate = app.program.days[index + 1].date; renderStudy(); } });
  $("#completeDay").addEventListener("click", completeSelectedDay);
  ["#writingNote", "#dayNotes", "#errorNotes", "#minutesDone", "#speakingMinutes"].forEach((selector) => $(selector).addEventListener("input", () => { if (selector === "#writingNote") updateWordCount(); scheduleDaySave(); }));

  $("#blockFilter").addEventListener("click", (event) => { const button = event.target.closest("[data-block]"); if (!button) return; app.blockFilter = button.dataset.block; $$("button", $("#blockFilter")).forEach((node) => node.classList.toggle("active", node === button)); renderPlan(); });
  $("#vocabSearch").addEventListener("input", (event) => { app.vocabQuery = event.target.value; app.vocabPage = 1; renderVocabulary(); });
  $("#vocabWeekFilter").addEventListener("change", (event) => { app.vocabWeek = event.target.value; app.vocabPage = 1; renderVocabulary(); });
  $("#vocabStatusFilter").addEventListener("change", (event) => { app.vocabStatus = event.target.value; app.vocabPage = 1; renderVocabulary(); });
  $("#assessmentFormPanel").addEventListener("change", (event) => { if (event.target.name === "week") renderAssessments(Number(event.target.value)); });
  $("#assessmentFormPanel").addEventListener("submit", (event) => { event.preventDefault(); saveAssessment(event.target); });
  $("#syncButton").addEventListener("click", () => syncNow());
  $("#saveEndpoint").addEventListener("click", saveEndpoint);
  $("#clearEndpoint").addEventListener("click", () => { app.user.settings.endpoint = ""; app.user.settings.lastSyncAt = ""; saveUserData(); renderDataSettings(); toast("Sincronização desconectada; os dados locais foram preservados."); });
  $("#checkSource").addEventListener("click", checkPublishedSource);
  $("#exportData").addEventListener("click", exportBackup);
  $("#importData").addEventListener("change", (event) => { const [file] = event.target.files; if (file) importBackup(file); event.target.value = ""; });
}

async function initialize() {
  try {
    const response = await fetch("./data/program.json");
    if (!response.ok) throw new Error("program.json não encontrado");
    app.program = await response.json();
    app.user = loadUserData();
    const today = todayIso();
    app.selectedDate = app.program.days.some((day) => day.date === today)
      ? today
      : app.program.days.find((day) => dayProgress(day.id).status !== "complete")?.date || app.program.meta.start;
    $("#todayLabel").textContent = formatLongDate(today);
    populateFilters();
    bindEvents();
    renderAll();
    $("#appLoading").remove();
    if ("serviceWorker" in navigator && location.protocol.startsWith("http")) navigator.serviceWorker.register("./service-worker.js").catch(() => {});
    if (app.user.settings.endpoint) syncNow({ quiet: true });
  } catch (error) {
    console.error(error);
    document.body.innerHTML = `<main style="max-width:720px;margin:80px auto;padding:24px"><h1>Não foi possível abrir a plataforma.</h1><p>Execute o site por um servidor local para carregar os dados: ${escapeHtml(error.message)}</p></main>`;
  }
}

initialize();
