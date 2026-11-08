/* Forgotten Footprints — "The Forgotten Journey".
   A chapter-based story layer for the artifact dossier.

   Every chapter is assembled from fields already verified in archive-data.js.
   No new scientific claim, quotation, date or coordinate is introduced here.
   When the record holds no verified detail for a chapter, the chapter is
   labelled as missing instead of being filled with unsupported text.

   Plain browser script: no modules, imports, fetches or build step. */
(function (global) {
  "use strict";

  const doc = global.document;
  const app = global.ForgottenFootprints;
  if (!app) return;
  const DATA = global.ForgottenFootprintsData || { artifacts: [] };
  const records = DATA.artifacts || [];
  const journey = doc.querySelector("[data-journey]");
  if (!journey) return;

  const reducedMotion = !!(global.matchMedia && global.matchMedia("(prefers-reduced-motion: reduce)").matches);

  // ---------------------------------------------------------------- helpers
  function lang() { return app.language || "en"; }
  function t(key, replacements) {
    let value = app.t(key);
    if (replacements) {
      Object.keys(replacements).forEach(function (name) {
        value = value.replace(new RegExp("\\{" + name + "\\}", "g"), String(replacements[name]));
      });
    }
    return value;
  }
  function localized(value) {
    if (value && typeof value === "object") return value[lang()] || value.en || "";
    return value === null || value === undefined ? "" : String(value);
  }
  function field(record, base) {
    if (lang() === "ar" && record[base + "Ar"] !== undefined) return localized(record[base + "Ar"]);
    return localized(record[base]);
  }
  function recordName(record) { return record.name ? (record.name[lang()] || record.name.en) : record.id; }
  function readId() {
    let id = location.hash.slice(1);
    try { id = decodeURIComponent(id); } catch { /* keep literal identifier */ }
    return id;
  }
  const STATUS_KEYS = {
    "LEFT IN PLACE": "statusLeft",
    "MISSION ENDED": "statusEnded",
    "DISCARDED COMPONENT": "statusDiscarded",
    RECOVERED: "statusRecovered",
    "DELIBERATELY IMPACTED": "statusImpacted",
    "UNKNOWN LOCATION": "statusUnknown",
    "STILL ACTIVE": "statusActive"
  };
  function statusKey(status) { return STATUS_KEYS[status] || "statusUnknown"; }
  function statusLabel(status) { return t(statusKey(status)); }
  function element(tag, className, text) {
    const node = doc.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  // ---------------------------------------------------------------- chapter model
  function usableBlocks(pairs) {
    return pairs.filter(function (pair) {
      return pair.text && String(pair.text).trim().length > 0;
    });
  }

  function buildStory(record) {
    const status = statusLabel(record.status);
    const mission = field(record, "mission") || recordName(record);
    const events = record.events || [];
    const components = record.components || [];

    const chapters = [
      {
        id: "mission",
        titleKey: "chapterMissionTitle",
        sceneProgress: 0,
        events: events,
        blocks: usableBlocks([
          { labelKey: "journeyOverview", text: localized(record.story) }
        ])
      },
      {
        id: "hardware",
        titleKey: "chapterHardwareTitle",
        sceneProgress: 0.18,
        blocks: usableBlocks([
          { labelKey: "journeyHardwareOrigin", text: field(record, "then") },
          { labelKey: "journeyHardwareRole", text: field(record, "missionStory") }
        ])
      },
      {
        id: "how",
        titleKey: "chapterHowTitle",
        sceneProgress: 0.36,
        components: components,
        question: questionFor("model", record),
        blocks: usableBlocks([
          { labelKey: "journeyModelNote", text: field(record, "modelNote") }
        ])
      },
      {
        id: "science",
        titleKey: "chapterScienceTitle",
        sceneProgress: 0.58,
        noteKey: "journeyScienceNote",
        blocks: usableBlocks([
          { labelKey: "journeyScienceOutcome", text: field(record, "significance") },
          { labelKey: "journeyEvidence", text: field(record, "evidence") }
        ])
      },
      {
        id: "remains",
        titleKey: "chapterRemainsTitle",
        sceneProgress: 0.78,
        question: questionFor("status", record),
        blocks: usableBlocks([
          { labelKey: "journeyRemainsState", text: field(record, "now") },
          { labelKey: "journeyRemainsStatus", text: status + " — " + field(record, "operationalStatus") },
          { labelKey: "journeyRemainsLocation", text: field(record, "location") },
          { labelKey: "journeyRemainsConfidence", text: field(record, "locationConfidence") }
        ])
      },
      {
        id: "legacy",
        titleKey: "chapterLegacyTitle",
        sceneProgress: 1,
        takeaway: t("journeyTakeawayText", { mission: mission, status: status }),
        didYouKnow: events.length ? events[0] : null,
        blocks: usableBlocks([
          { labelKey: "dossierSignificanceTitle", text: field(record, "significance") },
          { labelKey: "journeyLegacyReflection", text: t("journeyLegacyReflectionText") }
        ])
      }
    ];

    chapters.forEach(function (chapter) {
      chapter.missing = !chapter.blocks.length &&
        !(chapter.components && chapter.components.length) &&
        !(chapter.events && chapter.events.length);
    });
    return chapters;
  }

  // Answers are read straight from the record, so every option is defensible.
  function questionFor(kind, record) {
    const seed = String(record.id).split("").reduce(function (sum, character) {
      return sum + character.charCodeAt(0);
    }, 0);
    if (kind === "model") {
      const choices = [
        { labelKey: "journeyChoiceConceptual", correct: true },
        { labelKey: "journeyChoiceEngineering", correct: false },
        { labelKey: "journeyChoicePhoto", correct: false }
      ];
      return { promptKey: "journeyQuestionModel", choices: rotate(choices, seed % choices.length) };
    }
    const correctKey = statusKey(record.status);
    const pool = ["statusLeft", "statusEnded", "statusDiscarded", "statusRecovered", "statusImpacted", "statusUnknown", "statusActive"];
    const wrong = pool.filter(function (key) { return key !== correctKey; });
    const picks = [wrong[seed % wrong.length], wrong[(seed + 3) % wrong.length]];
    const choices = [{ labelKey: correctKey, correct: true }];
    picks.forEach(function (key) {
      if (!choices.some(function (choice) { return choice.labelKey === key; })) {
        choices.push({ labelKey: key, correct: false });
      }
    });
    return { promptKey: "journeyQuestionStatus", choices: rotate(choices, seed % choices.length) };
  }
  function rotate(list, amount) {
    if (!amount) return list;
    return list.slice(amount).concat(list.slice(0, amount));
  }

  // ---------------------------------------------------------------- 3D linkage
  let sceneInstance = null;
  function resolveScene() {
    if (sceneInstance && sceneInstance.mount && doc.contains(sceneInstance.mount)) return sceneInstance;
    const mount = doc.querySelector("[data-museum-scene='artifact']");
    const scenes = (global.ForgottenFootprints3D && global.ForgottenFootprints3D.scenes) || [];
    sceneInstance = mount ? (scenes.find(function (item) { return item.mount === mount; }) || null) : null;
    return sceneInstance;
  }

  // ---------------------------------------------------------------- elements
  const navElement = journey.querySelector("[data-journey-nav]");
  const bodyElement = journey.querySelector("[data-journey-body]");
  const chapterElement = journey.querySelector("[data-journey-chapter]");
  const extrasElement = journey.querySelector("[data-journey-extras]");
  const progressBar = journey.querySelector("[data-journey-progress]");
  const progressFill = journey.querySelector("[data-journey-progress] > span");
  const progressCopy = journey.querySelector("[data-journey-progress-copy]");
  const recordCopy = journey.querySelector("[data-journey-record]");
  const prevButton = journey.querySelector("[data-journey-prev]");
  const nextButton = journey.querySelector("[data-journey-next]");
  const dossierButton = journey.querySelector("[data-journey-dossier]");
  const toggleButton = journey.querySelector("[data-journey-toggle]");

  let currentRecord = null;
  let chapters = [];
  let index = 0;
  let navButtons = [];
  let sceneTouched = false;
  let sceneRetries = 0;
  let historyReady = false;

  // ---------------------------------------------------------------- rendering
  function render() {
    const id = readId();
    const record = records.find(function (item) { return item.id === id; });
    if (!record) {
      journey.hidden = true;
      currentRecord = null;
      chapters = [];
      navButtons = [];
      return;
    }
    const changed = !currentRecord || currentRecord.id !== record.id;
    currentRecord = record;
    journey.hidden = false;
    if (changed) {
      chapters = buildStory(record);
      index = 0;
      sceneRetries = 0;
      journey.classList.remove("is-collapsed");
      toggleButton.setAttribute("aria-expanded", "true");
      toggleButton.textContent = t("journeyHide");
    }
    recordCopy.textContent = [recordName(record), field(record, "mission"), statusLabel(record.status)]
      .filter(Boolean).join(" · ");
    renderNav();
    progressBar.setAttribute("aria-label", t("journeyProgressLabel"));
    progressBar.setAttribute("aria-valuemax", String(chapters.length || 1));
    navElement.setAttribute("aria-label", t("journeyChaptersLabel"));
    renderChapter();
  }

  function renderNav() {
    navButtons = [];
    navElement.textContent = "";
    const list = element("ol", "journey-nav-list");
    chapters.forEach(function (chapter, i) {
      const item = doc.createElement("li");
      const button = element("button", "journey-nav-button");
      button.type = "button";
      button.setAttribute("aria-label", t("journeyGoTo", {
        chapter: t("journeyChapter", { number: i + 1 }) + " — " + t(chapter.titleKey)
      }));
      button.append(
        element("span", "journey-nav-number", String(i + 1).padStart(2, "0")),
        element("span", "journey-nav-title", t(chapter.titleKey))
      );
      button.addEventListener("click", function () { selectChapter(i); });
      item.appendChild(button);
      list.appendChild(item);
      navButtons.push(button);
    });
    navElement.appendChild(list);
  }

  function renderChapter() {
    const chapter = chapters[index];
    if (!chapter) return;
    navButtons.forEach(function (button, i) {
      button.classList.toggle("is-current", i === index);
      if (i === index) button.setAttribute("aria-current", "step");
      else button.removeAttribute("aria-current");
    });
    progressCopy.textContent = t("journeyChapterProgress", { current: index + 1, total: chapters.length });
    progressBar.setAttribute("aria-valuenow", String(index + 1));
    if (progressFill) progressFill.style.width = (((index + 1) / chapters.length) * 100).toFixed(1) + "%";
    prevButton.disabled = index <= 0;
    nextButton.disabled = index >= chapters.length - 1;
    prevButton.textContent = t("journeyPrevious");
    nextButton.textContent = t("journeyNext");
    dossierButton.textContent = t("journeyReturnDossier");

    chapterElement.textContent = "";
    chapterElement.append(
      element("p", "eyebrow journey-chapter-marker", t("journeyChapter", { number: index + 1 }))
    );
    const heading = element("h3", "journey-chapter-title", t(chapter.titleKey));
    heading.tabIndex = -1;
    chapterElement.appendChild(heading);
    if (chapter.missing) {
      chapterElement.appendChild(element("p", "journey-missing", t("journeyMissing")));
    }
    chapter.blocks.forEach(function (block) {
      const wrap = element("div", "journey-block");
      wrap.append(
        element("p", "journey-block-label", t(block.labelKey)),
        element("p", "journey-block-text", block.text)
      );
      chapterElement.appendChild(wrap);
    });
    if (chapter.noteKey) {
      chapterElement.appendChild(element("p", "journey-hint", t(chapter.noteKey)));
    }
    if (chapter.events && chapter.events.length) {
      chapterElement.appendChild(buildEvents(chapter.events));
    }
    renderExtras(chapter);
  }

  function buildEvents(events) {
    const wrap = element("div", "journey-events");
    wrap.appendChild(element("p", "journey-block-label", t("journeyEvents")));
    const list = element("ol", "journey-event-list");
    events.forEach(function (event) {
      const item = doc.createElement("li");
      const time = element("time", "journey-event-date", event.date);
      time.dateTime = event.date;
      const title = element("strong", "journey-event-title",
        lang() === "ar" ? (event.titleAr || event.title) : event.title);
      item.append(time, title);
      if (event.source) item.appendChild(sourceLink(event.source));
      list.appendChild(item);
    });
    wrap.appendChild(list);
    return wrap;
  }

  function sourceLink(href) {
    const link = element("a", "journey-source", t("journeySource"));
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    return link;
  }

  function renderExtras(chapter) {
    extrasElement.textContent = "";
    if (chapter.takeaway) {
      const box = element("div", "journey-takeaway");
      box.append(
        element("p", "journey-block-label", t("journeyTakeaway")),
        element("p", "journey-block-text", chapter.takeaway)
      );
      extrasElement.appendChild(box);
    }
    if (chapter.didYouKnow) {
      const box = element("div", "journey-didyouknow");
      box.appendChild(element("p", "journey-block-label", t("journeyDidYouKnow")));
      const title = lang() === "ar"
        ? (chapter.didYouKnow.titleAr || chapter.didYouKnow.title)
        : chapter.didYouKnow.title;
      box.appendChild(element("p", "journey-block-text", chapter.didYouKnow.date + " · " + title));
      if (chapter.didYouKnow.source) box.appendChild(sourceLink(chapter.didYouKnow.source));
      extrasElement.appendChild(box);
    }
    if (chapter.components && chapter.components.length) {
      extrasElement.appendChild(buildComponents(chapter));
    }
    if (chapter.question) {
      extrasElement.appendChild(buildQuestion(chapter.question));
    }
  }

  function buildComponents(chapter) {
    const wrap = element("div", "journey-components");
    wrap.appendChild(element("p", "journey-block-label", t("journeyComponents")));
    const scene = resolveScene();
    const list = element("ul", "journey-component-list");
    chapter.components.forEach(function (component, i) {
      const button = element("button", "journey-component");
      button.type = "button";
      button.append(
        element("strong", "journey-component-name",
          String(i + 1).padStart(2, "0") + " · " + (component.name[lang()] || component.name.en)),
        element("span", "journey-component-copy",
          component.description[lang()] || component.description.en)
      );
      if (scene) {
        button.addEventListener("click", function () { focusComponent(i); });
      } else {
        button.disabled = true;
      }
      const item = doc.createElement("li");
      item.appendChild(button);
      list.appendChild(item);
    });
    wrap.appendChild(list);
    wrap.appendChild(element("p", "journey-hint", t(scene ? "journeyComponentsHint" : "journeySceneNote")));
    if (!scene && sceneRetries < 4) {
      sceneRetries += 1;
      global.setTimeout(function () {
        if (chapters[index] === chapter && resolveScene()) renderExtras(chapter);
      }, 400 * sceneRetries);
    }
    return wrap;
  }

  function buildQuestion(question) {
    const wrap = element("div", "journey-question");
    wrap.setAttribute("role", "group");
    wrap.setAttribute("aria-label", t("journeyQuestion"));
    wrap.append(
      element("p", "journey-block-label", t("journeyQuestion")),
      element("p", "journey-question-prompt", t(question.promptKey))
    );
    const list = element("div", "journey-choices");
    const feedback = element("p", "journey-feedback");
    feedback.setAttribute("role", "status");
    const correct = question.choices.find(function (choice) { return choice.correct; });
    question.choices.forEach(function (choice) {
      const button = element("button", "journey-choice", t(choice.labelKey));
      button.type = "button";
      button.addEventListener("click", function () {
        feedback.textContent = choice.correct
          ? t("journeyAnswerRight")
          : t("journeyAnswerWrong", { answer: t(correct.labelKey) });
        feedback.classList.toggle("is-right", !!choice.correct);
        feedback.classList.toggle("is-wrong", !choice.correct);
        button.classList.add("is-chosen");
        Array.from(list.children).forEach(function (node) { node.disabled = true; });
      });
      list.appendChild(button);
    });
    wrap.append(list, feedback, element("p", "journey-hint", t("journeyQuestionOptional")));
    return wrap;
  }

  // ---------------------------------------------------------------- navigation
  function go(target, options) {
    const config = options || {};
    if (!chapters.length) return;
    index = Math.max(0, Math.min(chapters.length - 1, target));
    renderChapter();
    if (config.focus) {
      const heading = chapterElement.querySelector(".journey-chapter-title");
      if (heading) {
        try { heading.focus({ preventScroll: true }); } catch { heading.focus(); }
        try { heading.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" }); } catch { /* optional */ }
      }
    }
    if (config.scene) applyScene(chapters[index]);
    if (config.history) pushChapterState();
  }

  function selectChapter(target) {
    if (target < 0 || target > chapters.length - 1) return;
    go(target, { focus: true, scene: true, history: true });
  }

  function applyScene(chapter) {
    if (reducedMotion || sceneTouched) return;
    const scene = resolveScene();
    if (!scene || typeof scene.setStoryProgress !== "function") return;
    if (scene.dragging || scene.pinch) return;
    scene.setStoryProgress(chapter.sceneProgress || 0);
  }

  function focusComponent(i) {
    const scene = resolveScene();
    if (!scene) return;
    if (typeof scene.selectPart === "function") scene.selectPart(i);
    if (typeof scene.focusPart === "function") scene.focusPart(i);
    const room = doc.querySelector("[data-museum-scene='artifact']");
    if (!room) return;
    try { room.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" }); }
    catch { room.scrollIntoView(); }
  }

  function returnToDossier() {
    const target = doc.querySelector("[data-dossier-content]") || doc.querySelector(".page-content");
    if (!target) return;
    try { target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" }); }
    catch { target.scrollIntoView(); }
    const heading = target.querySelector("[data-dossier-name]") || target.querySelector("h2");
    if (heading) {
      heading.tabIndex = -1;
      try { heading.focus({ preventScroll: true }); } catch { /* optional */ }
    }
  }

  // Chapter position is kept in history state, never in the URL fragment:
  // the fragment is reserved for dossier identifiers (one fragment, one record).
  function pushChapterState() {
    if (!currentRecord) return;
    try {
      global.history.pushState({ ffJourney: index, ffRecord: currentRecord.id }, "", location.href);
      historyReady = true;
    } catch { /* file:// or restricted contexts may refuse; the story still works */ }
  }

  global.addEventListener("popstate", function (event) {
    if (!historyReady || !currentRecord || journey.hidden) return;
    const state = event.state;
    if (state && state.ffRecord === currentRecord.id && typeof state.ffJourney === "number") {
      go(state.ffJourney, { scene: false });
    } else if (!state) {
      go(0, { scene: false });
    }
  });

  function onKeydown(event) {
    if (doc.body.classList.contains("presentation-mode")) return;
    const target = event.target;
    if (!target || !target.closest || !target.closest("[data-journey]")) return;
    if (target.closest("input, textarea, select, [contenteditable='true']")) return;
    if (event.key === "ArrowRight") { event.preventDefault(); selectChapter(index + 1); }
    else if (event.key === "ArrowLeft") { event.preventDefault(); selectChapter(index - 1); }
    else if (event.key === "Home") { event.preventDefault(); selectChapter(0); }
    else if (event.key === "End") { event.preventDefault(); selectChapter(chapters.length - 1); }
  }

  function onToggle() {
    const collapsed = journey.classList.toggle("is-collapsed");
    toggleButton.setAttribute("aria-expanded", String(!collapsed));
    toggleButton.textContent = t(collapsed ? "journeyShow" : "journeyHide");
    if (!collapsed) renderChapter();
  }

  // ---------------------------------------------------------------- init
  prevButton.addEventListener("click", function () { selectChapter(index - 1); });
  nextButton.addEventListener("click", function () { selectChapter(index + 1); });
  dossierButton.addEventListener("click", returnToDossier);
  toggleButton.addEventListener("click", onToggle);
  doc.addEventListener("keydown", onKeydown);
  doc.addEventListener("languagechange", render);
  global.addEventListener("hashchange", render);

  const canvas = doc.querySelector("[data-museum-scene='artifact'] canvas");
  if (canvas) canvas.addEventListener("pointerdown", function () { sceneTouched = true; }, { passive: true });

  render();
  global.setTimeout(render, 400);
}(window));
