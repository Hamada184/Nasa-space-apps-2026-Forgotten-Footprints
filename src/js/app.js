/* Forgotten Footprints — shared museum interface.
   Plain browser script; no modules, fetches, framework or build step. */
(function (global) {
  "use strict";

  const app = global.ForgottenFootprints;
  if (!app) return;
  const doc = global.document;
  const DATA = global.ForgottenFootprintsData || { artifacts: [] };
  const records = DATA.artifacts || [];
  const reducedMotion = global.matchMedia && global.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const storagePrefix = "forgotten-footprints:";

  // ---------------------------------------------------------------- language helpers
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
  function recordName(record) { return record.name ? (record.name[lang()] || record.name.en) : record.id; }
  function localizedValue(value) {
    if (value && typeof value === "object") return value[lang()] || value.en || "";
    return value === null || value === undefined ? "" : String(value);
  }
  function recordField(record, base) {
    if (lang() === "ar" && record[base + "Ar"] !== undefined) return localizedValue(record[base + "Ar"]);
    return localizedValue(record[base]);
  }
  function recordTypeKey(record) {
    return ({ artifact: "typeArtifact", component: "typeComponent", debris: "typeDebris" })[record.recordType] || "typeArtifact";
  }
  function statusKey(status) {
    return ({
      "LEFT IN PLACE": "statusLeft",
      "MISSION ENDED": "statusEnded",
      "DISCARDED COMPONENT": "statusDiscarded",
      RECOVERED: "statusRecovered",
      "DELIBERATELY IMPACTED": "statusImpacted",
      "UNKNOWN LOCATION": "statusUnknown",
      "STILL ACTIVE": "statusActive"
    })[status] || "statusUnknown";
  }
  function statusLabel(status) { return t(statusKey(status)); }
  function worldLabel(record) { return record.world === "moon" ? t("moon") : record.world === "mars" ? t("mars") : t("deepSpace"); }
  function plotLabel(record) {
    if (record.lat == null || record.lon == null) return t("coordinateNotPlotted");
    if (record.missionMarker) return t("coordinateMissionMarker");
    if (/approximate/i.test(record.locationConfidence || "")) return t("coordinateApprox");
    return t("coordinatePlotted");
  }
  function plotState(record) {
    if (record.lat == null || record.lon == null) return "none";
    if (record.missionMarker) return "marker";
    if (/approximate/i.test(record.locationConfidence || "")) return "approx";
    return "exact";
  }
  function dossierHref(id) {
    const prefix = /\/pages\//i.test(location.pathname.replace(/\\/g, "/")) ? "" : "pages/";
    return prefix + "artifact.html#" + encodeURIComponent(id);
  }
  function archiveHref(fragment) {
    const prefix = /\/pages\//i.test(location.pathname.replace(/\\/g, "/")) ? "" : "pages/";
    return prefix + "archive.html" + (fragment || "");
  }

  // ---------------------------------------------------------------- storage
  const memory = Object.create(null);
  const storage = (function () {
    let persistent = false;
    try {
      const probe = storagePrefix + "probe";
      global.localStorage.setItem(probe, "1");
      global.localStorage.removeItem(probe);
      persistent = true;
    } catch { persistent = false; }
    return {
      get: function (key, fallback) {
        try {
          const value = global.localStorage.getItem(storagePrefix + key);
          return value === null ? (memory[key] === undefined ? fallback : memory[key]) : JSON.parse(value);
        } catch { return memory[key] === undefined ? fallback : memory[key]; }
      },
      set: function (key, value) {
        memory[key] = value;
        try { global.localStorage.setItem(storagePrefix + key, JSON.stringify(value)); }
        catch { persistent = false; }
      },
      remove: function (key) {
        delete memory[key];
        try { global.localStorage.removeItem(storagePrefix + key); } catch { /* memory only */ }
      },
      isPersistent: function () { return persistent; }
    };
  })();
  global.ForgottenFootprintsState = storage;

  // ---------------------------------------------------------------- motion and reveal
  if (doc.visibilityState === "hidden") doc.documentElement.classList.add("motion-paused");
  doc.addEventListener("visibilitychange", function () {
    doc.documentElement.classList.toggle("motion-paused", doc.visibilityState === "hidden");
  });
  if (reducedMotion) doc.documentElement.classList.add("reduced-motion");
  else doc.documentElement.classList.add("motion-ready");

  if (!reducedMotion && "IntersectionObserver" in global) {
    const revealItems = doc.querySelectorAll(".journey-intro,.world-chapter,.archive-coda,.method-preview,.editorial-band,.content-section,.archive-entry,.feature-tile,.story-plate,.method-card,.learning-card,.timeline-track,.surface-placeholder");
    const revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: "0px 0px -36px 0px" });
    revealItems.forEach(function (item, index) {
      item.classList.add("reveal-on-scroll");
      item.style.setProperty("--reveal-delay", String((index % 4) * 65) + "ms");
      revealObserver.observe(item);
    });
    global.setTimeout(function () {
      revealItems.forEach(function (item) { item.classList.add("is-revealed"); });
    }, 3200);
  }

  if (!reducedMotion && global.matchMedia && global.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    doc.querySelectorAll(".destination-panel,.story-plate").forEach(function (panel) {
      panel.addEventListener("pointermove", function (event) {
        const bounds = panel.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        panel.style.transform = "perspective(1100px) rotateX(" + (-y * 2.8).toFixed(2) + "deg) rotateY(" + (x * 3.2).toFixed(2) + "deg) translateY(-3px)";
      });
      panel.addEventListener("pointerleave", function () { panel.style.removeProperty("transform"); });
    });
  }

  // ---------------------------------------------------------------- navigation
  const menuButton = doc.querySelector(".menu-toggle");
  const navigation = doc.querySelector(".primary-nav");
  function closeMenu() {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  }
  if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
      const open = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!open));
      navigation.classList.toggle("is-open", !open);
    });
    doc.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && navigation.classList.contains("is-open")) { closeMenu(); menuButton.focus(); }
    });
    navigation.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu();
    });
  }
  const languageButton = doc.querySelector(".language-toggle");
  if (languageButton) languageButton.addEventListener("click", app.toggleLanguage);
  doc.querySelectorAll("[data-year]").forEach(function (element) { element.textContent = String(new Date().getFullYear()); });

  // ---------------------------------------------------------------- presentation route
  const museumRoutes = [
    { key: "routeEntrance", file: "index.html", page: "entrance" },
    { key: "routeMoon", file: "pages/moon.html", page: "moon" },
    { key: "routeLRV", file: "pages/artifact.html#MOON-AP15-LRV", page: "artifact", hash: "MOON-AP15-LRV" },
    { key: "routeALSEP", file: "pages/artifact.html#MOON-ALSEP", page: "artifact", hash: "MOON-ALSEP" },
    { key: "routeMars", file: "pages/mars.html", page: "mars" },
    { key: "routeSojourner", file: "pages/artifact.html#MARS-PATHFINDER-SOJOURNER", page: "artifact", hash: "MARS-PATHFINDER-SOJOURNER" },
    { key: "routeSpirit", file: "pages/artifact.html#MARS-MER-SPIRIT", page: "artifact", hash: "MARS-MER-SPIRIT" },
    { key: "routeArchive", file: "pages/archive.html", page: "archive" },
    { key: "routeTimeline", file: "pages/timeline.html", page: "timeline" }
  ];
  function pageName() {
    const path = location.pathname.toLowerCase();
    if (path.endsWith("/moon.html")) return "moon";
    if (path.endsWith("/mars.html")) return "mars";
    if (path.endsWith("/deep-space.html")) return "deep";
    if (path.endsWith("/artifact.html")) return "artifact";
    if (path.endsWith("/archive.html")) return "archive";
    if (path.endsWith("/timeline.html")) return "timeline";
    if (path.endsWith("/discovery.html")) return "discovery";
    if (path.endsWith("/methodology.html")) return "methodology";
    return "entrance";
  }
  const currentPage = pageName();
  const visitedPages = ["entrance", "moon", "mars", "deep", "artifact", "archive", "timeline"];
  let visited = storage.get("visited-exhibitions", []);
  if (visitedPages.indexOf(currentPage) >= 0 && visited.indexOf(currentPage) < 0) {
    visited = visited.concat(currentPage);
    storage.set("visited-exhibitions", visited);
  }
  const museumProgress = doc.createElement("span");
  museumProgress.className = "museum-progress";
  museumProgress.setAttribute("role", "status");
  museumProgress.setAttribute("aria-live", "polite");
  function updateMuseumProgress() {
    const count = storage.get("visited-exhibitions", []).filter(function (page) { return visitedPages.indexOf(page) >= 0; }).length;
    museumProgress.textContent = t("museumProgress", { count: count });
  }
  updateMuseumProgress();
  doc.addEventListener("languagechange", updateMuseumProgress);

  const headerNav = doc.querySelector(".primary-nav");
  let setPresentation = null;
  const PRESENT_PARAM = "present";
  const STATION_PARAM = "station";
  const PRESENT_SESSION_KEY = "presentation-active";
  function clampStation(index) { return Math.max(0, Math.min(museumRoutes.length - 1, index)); }
  function stationFromQuery() {
    try {
      const value = parseInt(new URLSearchParams(location.search).get(STATION_PARAM), 10);
      if (!isNaN(value)) {
        const index = clampStation(value - 1);
        const routeItem = museumRoutes[index];
        let hash = location.hash.slice(1);
        try { hash = decodeURIComponent(hash); } catch { /* keep literal */ }
        if (routeItem.page === currentPage && (!routeItem.hash || routeItem.hash === hash)) return index;
      }
    } catch { /* ignore malformed query */ }
    return null;
  }
  function presentationRequested() {
    try {
      if (new URLSearchParams(location.search).get(PRESENT_PARAM) === "1") return true;
      return global.sessionStorage.getItem("forgotten-footprints:" + PRESENT_SESSION_KEY) === "1";
    } catch { return false; }
  }
  function derivedStation() {
    for (let i = 0; i < museumRoutes.length; i++) {
      const routeItem = museumRoutes[i];
      if (routeItem.page === currentPage) {
        if (routeItem.hash) {
          let hash = location.hash.slice(1);
          try { hash = decodeURIComponent(hash); } catch { /* keep literal */ }
          if (hash === routeItem.hash) return i;
        } else return i;
      }
    }
    const pageMatch = museumRoutes.findIndex(function (item) { return item.page === currentPage; });
    return pageMatch >= 0 ? pageMatch : 0;
  }
  function presentationHref(index) {
    const item = museumRoutes[clampStation(index)];
    const pieces = item.file.split("#");
    const rootPrefix = pageName() === "entrance" ? "" : "../";
    const hash = pieces[1] ? "#" + pieces[1] : "";
    let quality = "";
    try {
      const requestedQuality = new URLSearchParams(location.search).get("quality");
      if (requestedQuality === "low" || requestedQuality === "balanced" || requestedQuality === "high") quality = "&quality=" + requestedQuality;
    } catch { /* ignore query */ }
    return rootPrefix + pieces[0] + "?" + PRESENT_PARAM + "=1&" + STATION_PARAM + "=" + (clampStation(index) + 1) + quality + hash;
  }
  function cleanPresentationUrl() {
    try {
      const url = new URL(location.href);
      url.searchParams.delete(PRESENT_PARAM);
      url.searchParams.delete(STATION_PARAM);
      const search = url.searchParams.toString();
      return url.pathname + (search ? "?" + search : "") + url.hash;
    } catch { return null; }
  }

  if (headerNav) {
    const present = doc.createElement("button");
    present.type = "button";
    present.className = "presentation-toggle";
    present.textContent = t("museumPresentation");
    headerNav.appendChild(museumProgress);
    headerNav.appendChild(present);

    const dock = doc.createElement("aside");
    dock.className = "presentation-dock";
    dock.hidden = true;
    dock.setAttribute("aria-label", t("presentationDockLabel"));
    const dockMain = doc.createElement("div");
    dockMain.className = "dock-main";
    const dockCopy = doc.createElement("div");
    dockCopy.className = "dock-copy";
    const dockKicker = doc.createElement("span");
    dockKicker.className = "dock-kicker";
    const dockTitle = doc.createElement("strong");
    dockTitle.className = "dock-title";
    dockTitle.setAttribute("aria-live", "polite");
    dockCopy.append(dockKicker, dockTitle);
    const dockActions = doc.createElement("div");
    dockActions.className = "dock-actions";
    const prev = doc.createElement("button");
    prev.type = "button";
    prev.className = "dock-step";
    prev.textContent = t("presentationPrevious");
    const next = doc.createElement("button");
    next.type = "button";
    next.className = "dock-step dock-next";
    next.textContent = t("presentationNext");
    const finish = doc.createElement("button");
    finish.type = "button";
    finish.className = "dock-finish";
    finish.textContent = t("presentationFinish");
    finish.hidden = true;
    const exit = doc.createElement("button");
    exit.type = "button";
    exit.className = "dock-exit";
    exit.textContent = "×";
    exit.setAttribute("aria-label", t("presentationClose"));
    dockActions.append(prev, next, finish, exit);
    const progress = doc.createElement("div");
    progress.className = "dock-progress";
    progress.setAttribute("role", "progressbar");
    progress.setAttribute("aria-valuemin", "1");
    progress.setAttribute("aria-valuemax", String(museumRoutes.length));
    const progressFill = doc.createElement("span");
    progress.appendChild(progressFill);
    const dots = doc.createElement("ol");
    dots.className = "dock-dots";
    dots.setAttribute("aria-label", t("presentationStations"));
    const dotButtons = [];
    museumRoutes.forEach(function (item, index) {
      const li = doc.createElement("li");
      const dot = doc.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", t("presentationGoTo", { station: t(item.key) }));
      dot.title = t(item.key);
      dot.addEventListener("click", function () { navigateStation(index); });
      li.appendChild(dot);
      dots.appendChild(li);
      dotButtons.push(dot);
    });
    dockMain.append(dockCopy, dockActions);
    dock.append(dockMain, progress, dots);
    doc.body.appendChild(dock);

    function syncPresentationMetrics() {
      if (dock.hidden) return;
      const height = dock.getBoundingClientRect().height;
      if (!height) return;
      let bottom = 0;
      try { bottom = parseFloat(global.getComputedStyle(dock).bottom) || 0; } catch { /* optional */ }
      const reserve = Math.ceil(height + bottom + 12);
      doc.documentElement.style.setProperty("--presentation-reserve", reserve + "px");
    }
    syncPresentationMetrics();
    global.addEventListener("resize", syncPresentationMetrics);
    doc.addEventListener("languagechange", syncPresentationMetrics);
    if (global.ResizeObserver) {
      try { new global.ResizeObserver(syncPresentationMetrics).observe(dock); } catch { /* optional */ }
    }

    let currentIndex = stationFromQuery();
    if (currentIndex === null) currentIndex = derivedStation();

    function scrollToStation() {
      const target = doc.querySelector(".museum-room") ||
        doc.querySelector(".scroll-story") ||
        doc.querySelector(".page-content") ||
        doc.querySelector(".page-intro") ||
        doc.querySelector("main");
      if (!target) return;
      try {
        const top = Math.max(0, target.getBoundingClientRect().top + global.pageYOffset - 8);
        global.scrollTo({ top: top, behavior: reducedMotion ? "auto" : "smooth" });
      } catch { /* scrolling is optional */ }
    }

    function updatePresentationUI() {
      currentIndex = clampStation(currentIndex);
      const item = museumRoutes[currentIndex];
      dock.setAttribute("aria-label", t("presentationDockLabel"));
      dockKicker.textContent = t("presentationPosition", { current: currentIndex + 1, total: museumRoutes.length }) + " · " + t("presentationKicker");
      dockTitle.textContent = t(item.key);
      prev.disabled = currentIndex <= 0;
      finish.hidden = currentIndex !== museumRoutes.length - 1;
      next.textContent = currentIndex === museumRoutes.length - 1 ? t("presentationRestart") : t("presentationNext");
      next.disabled = false;
      progressFill.style.width = (((currentIndex + 1) / museumRoutes.length) * 100).toFixed(1) + "%";
      progress.setAttribute("aria-valuenow", String(currentIndex + 1));
      dotButtons.forEach(function (dot, index) {
        const active = index === currentIndex;
        if (active) dot.setAttribute("aria-current", "step");
        else dot.removeAttribute("aria-current");
        dot.title = t(museumRoutes[index].key);
      });
      exit.setAttribute("aria-label", t("presentationClose"));
      present.textContent = t(doc.body.classList.contains("presentation-mode") ? "presentationClose" : "museumPresentation");
      prev.textContent = t("presentationPrevious");
      dots.setAttribute("aria-label", t("presentationStations"));
    }

    function navigateStation(index) {
      const target = clampStation(index);
      try { global.sessionStorage.setItem("forgotten-footprints:" + PRESENT_SESSION_KEY, "1"); } catch { /* optional */ }
      location.href = presentationHref(target);
    }

    function applyPresentation(on, options) {
      const userGesture = !!(options && options.userGesture);
      doc.body.classList.toggle("presentation-mode", on);
      dock.hidden = !on;
      if (on) {
        try { global.sessionStorage.setItem("forgotten-footprints:" + PRESENT_SESSION_KEY, "1"); } catch { /* optional */ }
        try { history.replaceState(null, "", presentationHref(currentIndex)); } catch { /* URL stays clean */ }
        updatePresentationUI();
        syncPresentationMetrics();
        if (userGesture && doc.documentElement.requestFullscreen) {
          try { doc.documentElement.requestFullscreen().catch(function () { }); } catch { /* optional */ }
        }
        global.setTimeout(scrollToStation, 260);
      } else {
        try { global.sessionStorage.removeItem("forgotten-footprints:" + PRESENT_SESSION_KEY); } catch { /* optional */ }
        const clean = cleanPresentationUrl();
        if (clean) { try { history.replaceState(null, "", clean); } catch { /* leave URL */ } }
        if (doc.fullscreenElement && doc.exitFullscreen) {
          try { doc.exitFullscreen().catch(function () { }); } catch { /* optional */ }
        }
        updatePresentationUI();
      }
    }

    prev.addEventListener("click", function () { if (currentIndex > 0) navigateStation(currentIndex - 1); });
    next.addEventListener("click", function () {
      navigateStation(currentIndex >= museumRoutes.length - 1 ? 0 : currentIndex + 1);
    });
    finish.addEventListener("click", function () { applyPresentation(false, { userGesture: true }); });
    exit.addEventListener("click", function () { applyPresentation(false); });
    present.addEventListener("click", function () { applyPresentation(!doc.body.classList.contains("presentation-mode"), { userGesture: true }); });
    doc.addEventListener("keydown", function (event) {
      if (!doc.body.classList.contains("presentation-mode")) return;
      if (event.key === "Escape") { event.preventDefault(); applyPresentation(false); return; }
      if (event.target.closest("input, textarea, select, canvas, [contenteditable='true']")) return;
      if (event.key === "ArrowRight") { event.preventDefault(); next.click(); }
      if (event.key === "ArrowLeft" && !prev.disabled) { event.preventDefault(); prev.click(); }
    });
    doc.addEventListener("languagechange", updatePresentationUI);
    setPresentation = applyPresentation;

    if (presentationRequested()) {
      global.setTimeout(function () { applyPresentation(true); }, 80);
    } else {
      updatePresentationUI();
    }
  }
  const guideButton = doc.querySelector("[data-start-presentation]");
  if (guideButton && setPresentation) guideButton.addEventListener("click", function () { setPresentation(true, { userGesture: true }); });

  // ---------------------------------------------------------------- archive
  const archive = doc.querySelector("[data-archive-results]");
  let renderArchive = null;
  if (archive) {
    const query = doc.querySelector("#archive-search");
    const world = doc.querySelector("#archive-world-filter");
    const status = doc.querySelector("#archive-status-filter");
    const sort = doc.querySelector("#archive-sort");
    const empty = doc.querySelector("[data-archive-empty]");
    const count = doc.querySelector("[data-result-count]");
    const grid = doc.querySelector("[data-result-grid]");
    const emptyHeading = empty && empty.querySelector("h2");
    const emptyCopy = empty && empty.querySelector("p");
    renderArchive = function () {
      const term = query ? query.value.trim().toLocaleLowerCase() : "";
      let found = records.filter(function (record) {
        const haystack = [record.id, record.name.en, record.name.ar, record.mission, record.missionAr, record.type, record.typeAr, record.location, record.locationAr, record.status, statusLabel(record.status), worldLabel(record), record.operationalStatus].join(" ").toLocaleLowerCase();
        const matchesTerm = !term || haystack.indexOf(term) >= 0;
        const matchesWorld = !world || world.value === "all" || record.world === world.value;
        const matchesStatus = !status || status.value === "all" || record.status === status.value;
        return matchesTerm && matchesWorld && matchesStatus;
      });
      if (sort && sort.value === "name") found = found.slice().sort(function (a, b) { return recordName(a).localeCompare(recordName(b)); });
      if (sort && sort.value === "world") found = found.slice().sort(function (a, b) { return a.world.localeCompare(b.world) || recordName(a).localeCompare(recordName(b)); });
      if (sort && sort.value === "mission") found = found.slice().sort(function (a, b) { return a.missionId.localeCompare(b.missionId) || recordName(a).localeCompare(recordName(b)); });
      if (sort && sort.value === "status") found = found.slice().sort(function (a, b) { return a.status.localeCompare(b.status) || recordName(a).localeCompare(recordName(b)); });
      if (count) count.textContent = t("archiveResultsCount", { count: found.length });
      if (grid) grid.classList.toggle("has-results", found.length > 0);
      if (empty) empty.hidden = found.length > 0;
      if (found.length === 0) {
        if (emptyHeading) emptyHeading.textContent = t(term ? "archiveQueryEmpty" : "archiveEmptyTitle");
        if (emptyCopy) emptyCopy.textContent = t(term ? "archiveQueryText" : "archiveEmptyText");
      }
      if (grid) {
        grid.textContent = "";
        found.forEach(function (record) {
          const link = doc.createElement("a");
          link.className = "record-card";
          link.href = dossierHref(record.id);
          link.setAttribute("data-record-id", record.id);
          const top = doc.createElement("div");
          top.className = "record-card-top";
          const tag = doc.createElement("span");
          tag.className = "record-tag";
          tag.textContent = worldLabel(record) + " · " + t(recordTypeKey(record));
          const state = doc.createElement("span");
          state.className = "record-status";
          state.textContent = statusLabel(record.status);
          top.append(tag, state);
          const title = doc.createElement("h3");
          title.textContent = recordName(record);
          const id = doc.createElement("span");
          id.className = "record-id";
          id.textContent = record.id;
          const meta = doc.createElement("p");
          meta.className = "record-card-meta";
          meta.textContent = recordField(record, "mission") + " · " + recordField(record, "location");
          const footer = doc.createElement("div");
          footer.className = "record-card-footer";
          const plot = doc.createElement("span");
          plot.className = "record-plot";
          plot.setAttribute("data-plot", plotState(record));
          plot.textContent = plotLabel(record);
          const sources = doc.createElement("span");
          sources.className = "record-sources";
          sources.textContent = t("sourceCount", { count: record.sources.length });
          footer.append(plot, sources);
          link.append(top, title, id, meta, footer);
          grid.appendChild(link);
        });
      }
    };
    [query, world, status, sort].forEach(function (control) {
      if (control) control.addEventListener("input", renderArchive);
      if (control) control.addEventListener("change", renderArchive);
    });
    const reset = doc.querySelector("[data-archive-reset]");
    if (reset) reset.addEventListener("click", function () {
      if (query) query.value = "";
      if (world) world.value = "all";
      if (status) status.value = "all";
      if (sort) sort.value = "default";
      renderArchive();
    });
    function readDestinationHash() {
      const value = location.hash.replace(/^#/, "");
      if (value.indexOf("compare=") === 0) {
        const comparison = doc.querySelector("[data-compare]");
        if (comparison) {
          const first = comparison.querySelector("[data-compare-a]");
          const record = records.find(function (item) { return item.id === decodeURIComponent(value.slice(8)); });
          if (first && record) { first.value = record.id; comparison.dispatchEvent(new CustomEvent("comparechange")); }
        }
        return;
      }
      const destination = { "#world-moon": "moon", "#world-mars": "mars", "#world-deep": "deep" }[location.hash];
      if (destination && world) { world.value = destination; renderArchive(); }
    }
    global.addEventListener("hashchange", readDestinationHash);
    readDestinationHash();
    setTimeout(readDestinationHash, 0);
    renderArchive();
  }

  // ---------------------------------------------------------------- compare tool
  const comparison = doc.querySelector("[data-compare]");
  if (comparison) {
    const selectA = comparison.querySelector("[data-compare-a]");
    const selectB = comparison.querySelector("[data-compare-b]");
    const output = comparison.querySelector("[data-compare-output]");
    function fillSelect(select, selected) {
      if (!select) return;
      select.textContent = "";
      const none = doc.createElement("option");
      none.value = "";
      none.textContent = t("compareChoose");
      select.appendChild(none);
      records.forEach(function (record) {
        const option = doc.createElement("option");
        option.value = record.id;
        option.textContent = recordName(record);
        select.appendChild(option);
      });
      select.value = selected || "";
    }
    function row(label, a, b) {
      const tr = doc.createElement("tr");
      const th = doc.createElement("th");
      th.scope = "row";
      th.textContent = label;
      const tdA = doc.createElement("td");
      tdA.textContent = a;
      const tdB = doc.createElement("td");
      tdB.textContent = b;
      tr.append(th, tdA, tdB);
      return tr;
    }
    function renderComparison() {
      if (!output) return;
      const a = records.find(function (record) { return record.id === (selectA && selectA.value); });
      const b = records.find(function (record) { return record.id === (selectB && selectB.value); });
      output.textContent = "";
      if (!a || !b) {
        const empty = doc.createElement("p");
        empty.className = "compare-empty";
        empty.textContent = t("compareChooseBoth");
        output.appendChild(empty);
        return;
      }
      const table = doc.createElement("table");
      table.className = "compare-table";
      const head = doc.createElement("thead");
      const headRow = doc.createElement("tr");
      const blank = doc.createElement("th");
      blank.scope = "col";
      blank.textContent = t("compareField");
      const thA = doc.createElement("th");
      thA.scope = "col";
      thA.textContent = recordName(a);
      const thB = doc.createElement("th");
      thB.scope = "col";
      thB.textContent = recordName(b);
      headRow.append(blank, thA, thB);
      head.appendChild(headRow);
      const body = doc.createElement("tbody");
      body.append(
        row(t("compareMission"), recordField(a, "mission"), recordField(b, "mission")),
        row(t("compareType"), recordField(a, "type"), recordField(b, "type")),
        row(t("compareWorld"), worldLabel(a), worldLabel(b)),
        row(t("compareStatus"), statusLabel(a.status), statusLabel(b.status)),
        row(t("compareOperational"), recordField(a, "operationalStatus"), recordField(b, "operationalStatus")),
        row(t("compareLocation"), recordField(a, "location"), recordField(b, "location")),
        row(t("compareCoordinate"), plotLabel(a), plotLabel(b)),
        row(t("compareRole"), recordField(a, "then"), recordField(b, "then")),
        row(t("compareNow"), recordField(a, "now"), recordField(b, "now")),
        row(t("compareSignificance"), recordField(a, "significance"), recordField(b, "significance"))
      );
      table.append(head, body);
      output.appendChild(table);
      const links = doc.createElement("div");
      links.className = "compare-links";
      [a, b].forEach(function (record) {
        const link = doc.createElement("a");
        link.href = dossierHref(record.id);
        link.textContent = t("openDossier") + ": " + recordName(record);
        links.appendChild(link);
      });
      output.appendChild(links);
    }
    fillSelect(selectA, "");
    fillSelect(selectB, "");
    const compareMatch = /^#compare=(.+)$/.exec(location.hash);
    if (compareMatch) {
      const initialId = decodeURIComponent(compareMatch[1]);
      const initial = records.find(function (record) { return record.id === initialId; });
      if (initial) {
        if (selectA) selectA.value = initial.id;
        const other = records.find(function (record) { return record.id !== initial.id; });
        if (other && selectB) selectB.value = other.id;
      }
    }
    comparison.addEventListener("comparechange", renderComparison);
    if (selectA) selectA.addEventListener("change", renderComparison);
    if (selectB) selectB.addEventListener("change", renderComparison);
    doc.addEventListener("languagechange", function () { fillSelect(selectA, selectA && selectA.value); fillSelect(selectB, selectB && selectB.value); renderComparison(); });
    renderComparison();
  }

  // ---------------------------------------------------------------- mission family tree
  const familyTree = doc.querySelector("[data-family-tree]");
  if (familyTree) {
    function renderFamilyTree() {
      familyTree.textContent = "";
      const groups = [];
      records.forEach(function (record) {
        let group = groups.find(function (item) { return item.id === record.missionId; });
        if (!group) { group = { id: record.missionId, label: record.missionLabel, records: [] }; groups.push(group); }
        group.records.push(record);
      });
      const intro = doc.createElement("p");
      intro.className = "family-intro";
      intro.textContent = t("familyIntro");
      familyTree.appendChild(intro);
      groups.forEach(function (group) {
        const article = doc.createElement("article");
        article.className = "family-branch";
        const heading = doc.createElement("h3");
        heading.textContent = group.label[lang()] || group.label.en;
        const count = doc.createElement("span");
        count.className = "family-count";
        count.textContent = " · " + t("familyArtifacts", { count: group.records.length });
        heading.appendChild(count);
        const list = doc.createElement("ul");
        group.records.forEach(function (record) {
          const item = doc.createElement("li");
          const link = doc.createElement("a");
          link.href = dossierHref(record.id);
          link.textContent = recordName(record);
          const meta = doc.createElement("span");
          meta.className = "family-meta";
          meta.textContent = t(recordTypeKey(record)) + " · " + statusLabel(record.status);
          item.append(link, meta);
          if (record.components && record.components.length) {
            const components = doc.createElement("ul");
            components.className = "family-components";
            record.components.forEach(function (component) {
              const componentItem = doc.createElement("li");
              componentItem.textContent = component.name[lang()] || component.name.en;
              components.appendChild(componentItem);
            });
            item.appendChild(components);
          }
          list.appendChild(item);
        });
        article.append(heading, list);
        familyTree.appendChild(article);
      });
    }
    renderFamilyTree();
    doc.addEventListener("languagechange", renderFamilyTree);
  }

  // ---------------------------------------------------------------- timeline
  const timeline = doc.querySelector("[data-timeline]");
  if (timeline) {
    const timelineStatus = doc.querySelector("[data-timeline-status]");
    const timelineHolder = timeline.querySelector("[data-timeline-events]");
    const timelineTrack = timeline.querySelector(".timeline-track");
    const timelineOrder = timeline.querySelector("[data-timeline-order]");
    let activeEra = timeline.querySelector("[data-era][aria-pressed='true']") || timeline.querySelector("[data-era]");
    function updateTimeline() {
      if (!activeEra || !timelineHolder) return;
      const destination = activeEra.getAttribute("data-era");
      const found = [];
      records.forEach(function (record) {
        (record.events || []).forEach(function (event) {
          if (destination === "all" || record.world === destination) found.push({ record: record, event: event });
        });
      });
      const newest = timelineOrder && timelineOrder.value === "newest";
      found.sort(function (a, b) { return newest ? b.event.date.localeCompare(a.event.date) : a.event.date.localeCompare(b.event.date); });
      if (timelineStatus) {
        timelineStatus.hidden = found.length > 0;
        timelineStatus.textContent = newest ? t("timelineReverseEmpty") : t("timelineOrderedEmpty");
      }
      if (timelineTrack) timelineTrack.hidden = found.length > 0;
      timelineHolder.textContent = "";
      found.forEach(function (item) {
        const article = doc.createElement("article");
        article.className = "timeline-event";
        const date = doc.createElement("time");
        date.dateTime = item.event.date;
        date.textContent = item.event.date;
        const title = doc.createElement("h3");
        title.textContent = lang() === "ar" ? (item.event.titleAr || item.event.title) : item.event.title;
        const tag = doc.createElement("span");
        tag.className = "record-tag";
        tag.textContent = worldLabel(item.record) + " · " + t(recordTypeKey(item.record));
        const recordLink = doc.createElement("a");
        recordLink.href = dossierHref(item.record.id);
        recordLink.textContent = recordName(item.record);
        const source = doc.createElement("a");
        source.href = item.event.source;
        source.target = "_blank";
        source.rel = "noopener noreferrer";
        source.textContent = t("eventSource");
        source.className = "event-source";
        article.append(date, tag, title, recordLink, source);
        timelineHolder.appendChild(article);
      });
    }
    timeline.querySelectorAll("[data-era]").forEach(function (button) {
      button.addEventListener("click", function () {
        activeEra = button;
        timeline.querySelectorAll("[data-era]").forEach(function (item) { item.setAttribute("aria-pressed", String(item === button)); });
        updateTimeline();
      });
    });
    if (timelineOrder) timelineOrder.addEventListener("change", updateTimeline);
    updateTimeline();
    doc.addEventListener("languagechange", updateTimeline);
  }

  // ---------------------------------------------------------------- discovery journal
  const discovery = doc.querySelector("[data-discovery]");
  let refreshDiscovery = null;
  if (discovery) {
    const savedLearningContainer = doc.querySelector("[data-saved-cards]");
    const savedArtifactContainer = doc.querySelector("[data-saved-artifact-list]");
    function renderSavedLearning() {
      if (!savedLearningContainer) return;
      const saved = storage.get("saved-learning", []);
      discovery.querySelectorAll("[data-save-learning]").forEach(function (button) {
        const isSaved = saved.indexOf(button.getAttribute("data-save-learning")) >= 0;
        button.setAttribute("aria-pressed", String(isSaved));
        button.textContent = t(isSaved ? "savedButton" : "saveButton");
      });
      savedLearningContainer.textContent = "";
      if (!saved.length) { savedLearningContainer.textContent = t("savedLearningEmpty"); return; }
      saved.forEach(function (id) {
        const source = discovery.querySelector('[data-learning-card="' + id + '"]');
        if (!source) return;
        const item = doc.createElement("div");
        item.className = "saved-learning-item";
        item.textContent = t(source.getAttribute("data-title-key"));
        savedLearningContainer.appendChild(item);
      });
    }
    function renderSavedArtifacts() {
      if (!savedArtifactContainer) return;
      const saved = storage.get("saved-artifacts", []);
      savedArtifactContainer.textContent = "";
      if (!saved.length) {
        const empty = doc.createElement("p");
        empty.className = "empty-state-copy";
        empty.textContent = t("journalEmpty");
        savedArtifactContainer.appendChild(empty);
        return;
      }
      saved.forEach(function (id) {
        const record = records.find(function (item) { return item.id === id; });
        if (!record) return;
        const card = doc.createElement("article");
        card.className = "journal-card";
        const tag = doc.createElement("span");
        tag.className = "record-tag";
        tag.textContent = worldLabel(record) + " · " + statusLabel(record.status);
        const title = doc.createElement("h3");
        title.textContent = recordName(record);
        const idNode = doc.createElement("span");
        idNode.className = "record-id";
        idNode.textContent = record.id;
        const link = doc.createElement("a");
        link.href = dossierHref(record.id);
        link.textContent = t("openDossier");
        const remove = doc.createElement("button");
        remove.type = "button";
        remove.className = "journal-remove";
        remove.textContent = t("journalRemove");
        remove.addEventListener("click", function () {
          storage.set("saved-artifacts", storage.get("saved-artifacts", []).filter(function (value) { return value !== id; }));
          renderSavedArtifacts();
        });
        card.append(tag, title, idNode, link, remove);
        savedArtifactContainer.appendChild(card);
      });
      const clear = doc.createElement("button");
      clear.type = "button";
      clear.className = "journal-clear";
      clear.textContent = t("journalClear");
      clear.addEventListener("click", function () { storage.set("saved-artifacts", []); renderSavedArtifacts(); });
      savedArtifactContainer.appendChild(clear);
    }
    refreshDiscovery = function () { renderSavedLearning(); renderSavedArtifacts(); updateStorageNote(); };
    discovery.querySelectorAll("[data-save-learning]").forEach(function (button) {
      button.addEventListener("click", function () {
        const id = button.getAttribute("data-save-learning");
        let saved = storage.get("saved-learning", []);
        saved = saved.indexOf(id) >= 0 ? saved.filter(function (value) { return value !== id; }) : saved.concat(id);
        storage.set("saved-learning", saved);
        renderSavedLearning();
        updateStorageNote();
      });
    });
    const quiz = doc.querySelector("[data-quiz]");
    if (quiz) {
      const questions = [
        { key: "quizQuestion1", choices: ["quizQ1A", "quizQ1B", "quizQ1C"], answer: 1, learn: "quizLearn1" },
        { key: "quizQuestion2", choices: ["quizQ2A", "quizQ2B", "quizQ2C"], answer: 2, learn: "quizLearn2" },
        { key: "quizQuestion3", choices: ["quizQ3A", "quizQ3B", "quizQ3C"], answer: 0, learn: "quizLearn3" }
      ];
      const savedProgress = storage.get("quiz-progress", null);
      let current = savedProgress && savedProgress.complete ? questions.length : (savedProgress ? Math.min(savedProgress.current, questions.length - 1) : 0);
      let score = savedProgress ? savedProgress.score || 0 : 0;
      let answered = false;
      let selectedIndex = -1;
      const prompt = quiz.querySelector("[data-quiz-question]");
      const choices = quiz.querySelector("[data-quiz-choices]");
      const feedback = quiz.querySelector("[data-quiz-feedback]");
      const next = quiz.querySelector("[data-quiz-next]");
      const progress = quiz.querySelector("[data-quiz-progress]");
      function renderQuestion(preserveAnswer) {
        if (!preserveAnswer) { answered = false; selectedIndex = -1; feedback.textContent = ""; next.hidden = true; }
        else { feedback.textContent = ""; next.hidden = !answered; }
        feedback.classList.toggle("has-feedback", answered);
        choices.textContent = "";
        if (current >= questions.length) {
          prompt.textContent = t("quizComplete", { score: score, total: questions.length });
          progress.textContent = t("quizProgressDone");
          next.hidden = true;
          progress.style.setProperty("--quiz-progress", "100%");
          storage.set("quiz-progress", { complete: true, score: score });
          return;
        }
        const question = questions[current];
        prompt.textContent = t(question.key);
        progress.textContent = t("quizProgress", { current: current + 1, total: questions.length });
        progress.style.setProperty("--quiz-progress", String((current + (answered ? 1 : 0)) / questions.length * 100) + "%");
        question.choices.forEach(function (choiceKey, index) {
          const button = doc.createElement("button");
          button.type = "button";
          button.className = "quiz-choice";
          button.textContent = t(choiceKey);
          if (answered && selectedIndex === index) {
            button.classList.add(index === question.answer ? "is-correct" : "is-incorrect");
            feedback.textContent = t(index === question.answer ? "quizCorrect" : "quizReview");
            const note = doc.createElement("p");
            note.textContent = t(question.learn);
            feedback.appendChild(note);
          }
          button.addEventListener("click", function () {
            if (answered) return;
            answered = true;
            selectedIndex = index;
            const correct = index === question.answer;
            if (correct) score += 1;
            button.classList.add(correct ? "is-correct" : "is-incorrect");
            feedback.textContent = t(correct ? "quizCorrect" : "quizReview");
            const note = doc.createElement("p");
            note.textContent = t(question.learn);
            feedback.appendChild(note);
            next.hidden = false;
            storage.set("quiz-progress", { complete: false, current: current, score: score });
            progress.style.setProperty("--quiz-progress", String((current + 1) / questions.length * 100) + "%");
            feedback.classList.add("has-feedback");
          });
          choices.appendChild(button);
        });
      }
      next.addEventListener("click", function () { current += 1; storage.set("quiz-progress", { complete: false, current: current, score: score }); renderQuestion(); prompt.focus(); });
      doc.addEventListener("languagechange", function () { renderQuestion(true); });
      renderQuestion();
    }
    renderSavedLearning();
    renderSavedArtifacts();
  }

  // ---------------------------------------------------------------- storage note
  function updateStorageNote() {
    const note = doc.querySelector("[data-storage-note]");
    if (!note) return;
    note.textContent = storage.isPersistent() ? t("storageNote") : t("storageUnavailable");
    note.classList.toggle("is-warning", !storage.isPersistent());
  }
  updateStorageNote();

  // ---------------------------------------------------------------- dossier
  const dossier = doc.querySelector("[data-dossier]");
  if (dossier) {
    const emptyState = dossier.querySelector("[data-dossier-empty-state]");
    const content = dossier.querySelector("[data-dossier-content]");
    const input = dossier.querySelector("[data-dossier-input]");
    const form = dossier.querySelector("[data-dossier-form]");
    const nameHeading = dossier.querySelector("[data-artifact-name]");
    const artifactActions = dossier.querySelector(".artifact-actions");
    const saveButtons = Array.from(dossier.querySelectorAll("[data-save-artifact]"));
    const compareLinks = Array.from(dossier.querySelectorAll("[data-compare-current]"));
    function readId() {
      let id = location.hash.slice(1);
      try { id = decodeURIComponent(id); } catch { /* keep literal */ }
      return id;
    }
    function fieldRow(label, value, extraClass) {
      const div = doc.createElement("div");
      div.className = "dossier-field" + (extraClass ? " " + extraClass : "");
      const dt = doc.createElement("dt");
      dt.textContent = label;
      const dd = doc.createElement("dd");
      if (value instanceof Node) dd.appendChild(value);
      else dd.textContent = value;
      div.append(dt, dd);
      return div;
    }
    function linkNode(href, text, external) {
      const a = doc.createElement("a");
      a.href = href;
      a.textContent = text;
      if (external) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
      return a;
    }
    function renderDossier() {
      const id = readId();
      const record = records.find(function (item) { return item.id === id; });
      if (!record) {
        if (emptyState) emptyState.hidden = false;
        if (content) content.hidden = true;
        if (artifactActions) artifactActions.hidden = true;
        if (nameHeading) nameHeading.textContent = t("dossierTitle");
        dossier.querySelectorAll("[data-dossier-id]").forEach(function (node) { node.textContent = id || "—"; });
        const emptyName = dossier.querySelector("[data-dossier-empty]");
        if (emptyName) emptyName.textContent = id ? t("dossierUnknown") : t("dossierEmpty");
        if (input && id) input.value = id;
        return;
      }
      if (emptyState) emptyState.hidden = true;
      if (content) content.hidden = false;
      if (artifactActions) artifactActions.hidden = false;
      if (input) input.value = record.id;
      if (nameHeading) nameHeading.textContent = recordName(record);
      dossier.querySelectorAll("[data-dossier-id]").forEach(function (node) { node.textContent = record.id; });
      const titleOutput = dossier.querySelector("[data-dossier-name]");
      if (titleOutput) titleOutput.textContent = recordName(record);
      const metaOutput = dossier.querySelector("[data-dossier-meta]");
      if (metaOutput) metaOutput.textContent = recordField(record, "mission") + " · " + recordField(record, "type") + " · " + worldLabel(record);
      const statusOutput = dossier.querySelector("[data-dossier-status]");
      if (statusOutput) statusOutput.textContent = statusLabel(record.status);
      const statusDetail = dossier.querySelector("[data-dossier-status-detail]");
      if (statusDetail) statusDetail.textContent = recordField(record, "operationalStatus");
      const story = dossier.querySelector("[data-dossier-story]");
      if (story) story.textContent = record.story[lang()] || record.story.en;
      const significance = dossier.querySelector("[data-dossier-significance]");
      if (significance) significance.textContent = recordField(record, "significance");
      const evidence = dossier.querySelector("[data-dossier-evidence]");
      if (evidence) evidence.textContent = recordField(record, "evidence");
      const modelNote = dossier.querySelector("[data-dossier-model-note]");
      if (modelNote) modelNote.textContent = recordField(record, "modelNote");
      const fields = dossier.querySelector("[data-dossier-fields]");
      if (fields) {
        fields.textContent = "";
        const coordinate = record.lat != null && record.lon != null
          ? record.lat.toFixed(5) + "°, " + record.lon.toFixed(5) + "° · " + plotLabel(record)
          : t("coordinateNotPlotted");
        fields.append(
          fieldRow(t("dossierIdentity"), record.id),
          fieldRow(t("dossierMission"), recordField(record, "mission")),
          fieldRow(t("dossierRecordType"), t(recordTypeKey(record))),
          fieldRow(t("dossierComponent"), recordField(record, "type")),
          fieldRow(t("dossierDestination"), worldLabel(record)),
          fieldRow(t("dossierStatus"), statusLabel(record.status)),
          fieldRow(t("dossierOperational"), recordField(record, "operationalStatus")),
          fieldRow(t("dossierLocation"), recordField(record, "location")),
          fieldRow(t("dossierCoordinate"), coordinate),
          fieldRow(t("dossierConfidence"), recordField(record, "locationConfidence"), "is-wide")
        );
      }
      const lifecycle = dossier.querySelector("[data-artifact-lifecycle]");
      if (lifecycle) {
        lifecycle.textContent = "";
        [
          { label: t("lifecycleOrigin"), value: recordField(record, "then") },
          { label: t("lifecycleMission"), value: recordField(record, "missionStory") },
          { label: t("lifecyclePresent"), value: recordField(record, "now") }
        ].forEach(function (step) {
          const div = doc.createElement("div");
          div.className = "lifecycle-step";
          const span = doc.createElement("span");
          span.textContent = step.label;
          const strong = doc.createElement("strong");
          strong.textContent = step.value;
          div.append(span, strong);
          lifecycle.appendChild(div);
        });
      }
      const events = dossier.querySelector("[data-dossier-events]");
      if (events) {
        events.textContent = "";
        if (!record.events || !record.events.length) {
          events.textContent = t("dossierNoEvents");
        } else {
          const list = doc.createElement("ol");
          list.className = "dossier-event-list";
          record.events.forEach(function (event) {
            const item = doc.createElement("li");
            const time = doc.createElement("time");
            time.dateTime = event.date;
            time.textContent = event.date;
            const title = doc.createElement("strong");
            title.textContent = lang() === "ar" ? (event.titleAr || event.title) : event.title;
            const source = linkNode(event.source, t("eventSource"), true);
            item.append(time, title, source);
            list.appendChild(item);
          });
          events.appendChild(list);
        }
      }
      const sourcesList = dossier.querySelector("[data-source-list]");
      if (sourcesList) {
        sourcesList.textContent = "";
        record.sources.forEach(function (source) {
          const item = doc.createElement("li");
          const link = linkNode(source.url, source.title, true);
          item.appendChild(link);
          sourcesList.appendChild(item);
        });
      }
      const related = dossier.querySelector("[data-dossier-related]");
      if (related) {
        related.textContent = "";
        const relatedRecords = (record.related || []).map(function (relatedId) { return records.find(function (item) { return item.id === relatedId; }); }).filter(Boolean);
        if (!relatedRecords.length) related.textContent = t("dossierNoRelated");
        else {
          const list = doc.createElement("ul");
          list.className = "related-list";
          relatedRecords.forEach(function (item) {
            const li = doc.createElement("li");
            const link = linkNode(dossierHref(item.id), recordName(item));
            const meta = doc.createElement("span");
            meta.textContent = " · " + statusLabel(item.status);
            li.append(link, meta);
            list.appendChild(li);
          });
          related.appendChild(list);
        }
      }
      const components = dossier.querySelector("[data-dossier-components]");
      if (components) {
        components.textContent = "";
        if (!record.components || !record.components.length) {
          components.textContent = t("componentNone");
        } else {
          const list = doc.createElement("ul");
          list.className = "dossier-component-list";
          record.components.forEach(function (component, index) {
            const item = doc.createElement("li");
            const number = doc.createElement("span");
            number.className = "component-number";
            number.textContent = String(index + 1).padStart(2, "0");
            const copy = doc.createElement("div");
            const title = doc.createElement("strong");
            title.textContent = component.name[lang()] || component.name.en;
            const description = doc.createElement("p");
            description.textContent = component.description[lang()] || component.description.en;
            copy.append(title, description);
            item.append(number, copy);
            list.appendChild(item);
          });
          components.appendChild(list);
        }
      }
      const family = dossier.querySelector("[data-dossier-family]");
      if (family) {
        family.textContent = "";
        const siblings = records.filter(function (item) { return item.missionId === record.missionId; });
        const list = doc.createElement("ul");
        list.className = "related-list";
        siblings.forEach(function (item) {
          const li = doc.createElement("li");
          if (item.id === record.id) {
            const strong = doc.createElement("strong");
            strong.textContent = recordName(item) + " · " + t("currentRecord");
            li.appendChild(strong);
          } else {
            li.appendChild(linkNode(dossierHref(item.id), recordName(item)));
          }
          list.appendChild(li);
        });
        family.appendChild(list);
      }
      if (saveButtons.length) {
        const saved = storage.get("saved-artifacts", []);
        const isSaved = saved.indexOf(record.id) >= 0;
        saveButtons.forEach(function (button) {
          button.setAttribute("aria-pressed", String(isSaved));
          button.textContent = t(isSaved ? "savedArtifact" : "saveArtifact");
          button.onclick = function () {
            let list = storage.get("saved-artifacts", []);
            list = list.indexOf(record.id) >= 0 ? list.filter(function (value) { return value !== record.id; }) : list.concat(record.id);
            storage.set("saved-artifacts", list);
            const nowSaved = list.indexOf(record.id) >= 0;
            saveButtons.forEach(function (item) {
              item.setAttribute("aria-pressed", String(nowSaved));
              item.textContent = t(nowSaved ? "savedArtifact" : "saveArtifact");
            });
            updateStorageNote();
          };
        });
      }
      compareLinks.forEach(function (link) { link.href = archiveHref("#compare=" + encodeURIComponent(record.id)); });
    }
    if (form) form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (input && input.value.trim()) location.hash = encodeURIComponent(input.value.trim());
    });
    global.addEventListener("hashchange", renderDossier);
    doc.addEventListener("languagechange", renderDossier);
    renderDossier();
    refreshDiscovery = refreshDiscovery || null;
  }

  // ---------------------------------------------------------------- glossary and myths
  const glossary = doc.querySelector("[data-glossary]");
  if (glossary) {
    const terms = [
      ["glossaryArtifact", "glossaryArtifactDef"],
      ["glossaryComponent", "glossaryComponentDef"],
      ["glossaryDebris", "glossaryDebrisDef"],
      ["glossaryStatus", "glossaryStatusDef"],
      ["glossaryCoordinate", "glossaryCoordinateDef"],
      ["glossaryRetroreflector", "glossaryRetroreflectorDef"],
      ["glossaryEdl", "glossaryEdlDef"],
      ["glossaryProvenance", "glossaryProvenanceDef"]
    ];
    function renderGlossary() {
      glossary.textContent = "";
      terms.forEach(function (pair) {
        const item = doc.createElement("article");
        item.className = "glossary-entry";
        const term = doc.createElement("h3");
        term.textContent = t(pair[0]);
        const definition = doc.createElement("p");
        definition.textContent = t(pair[1]);
        item.append(term, definition);
        glossary.appendChild(item);
      });
    }
    renderGlossary();
    doc.addEventListener("languagechange", renderGlossary);
  }
  const myths = doc.querySelector("[data-myths]");
  if (myths) {
    const pairs = [
      ["mythOne", "factOne"],
      ["mythTwo", "factTwo"],
      ["mythThree", "factThree"]
    ];
    function renderMyths() {
      myths.textContent = "";
      pairs.forEach(function (pair) {
        const card = doc.createElement("article");
        card.className = "myth-card";
        const mythLabel = doc.createElement("span");
        mythLabel.className = "myth-label";
        mythLabel.textContent = t("mythLabel");
        const myth = doc.createElement("p");
        myth.textContent = t(pair[0]);
        const factLabel = doc.createElement("span");
        factLabel.className = "fact-label";
        factLabel.textContent = t("factLabel");
        const fact = doc.createElement("p");
        fact.textContent = t(pair[1]);
        card.append(mythLabel, myth, factLabel, fact);
        myths.appendChild(card);
      });
    }
    renderMyths();
    doc.addEventListener("languagechange", renderMyths);
  }

  // ---------------------------------------------------------------- scroll-driven Moon story
  function initScrollStory() {
    const story = doc.querySelector("[data-scroll-story]");
    if (!story) return;
    const stage = story.querySelector(".scroll-story-stage");
    const steps = Array.from(story.querySelectorAll("[data-story-step]"));
    const bar = story.querySelector("[data-story-progress]");
    const scene = global.ForgottenFootprints3D && global.ForgottenFootprints3D.scenes
      ? global.ForgottenFootprints3D.scenes.find(function (item) { return item.mount === stage; })
      : null;
    if (!scene) {
      initScrollStory.tries = (initScrollStory.tries || 0) + 1;
      if (initScrollStory.tries < 6) global.setTimeout(initScrollStory, 350);
      return;
    }
    const desktopMotion = global.matchMedia
      ? global.matchMedia("(min-width: 981px) and (prefers-reduced-motion: no-preference)")
      : null;
    let ticking = false;
    function updateStory() {
      ticking = false;
      if (!desktopMotion || !desktopMotion.matches) {
        steps.forEach(function (step) { step.classList.add("is-active"); });
        if (bar) bar.style.width = "100%";
        return;
      }
      const rect = story.getBoundingClientRect();
      const total = Math.max(1, story.offsetHeight - global.innerHeight);
      const progress = Math.max(0, Math.min(1, (-rect.top) / total));
      if (scene && !scene.dragging && !scene.pinch) scene.setStoryProgress(progress);
      if (bar) bar.style.width = (progress * 100).toFixed(2) + "%";
      const active = progress < 0.34 ? 0 : progress < 0.68 ? 1 : 2;
      steps.forEach(function (step, index) { step.classList.toggle("is-active", index === active); });
    }
    function scheduleStory() {
      if (ticking) return;
      ticking = true;
      global.requestAnimationFrame(updateStory);
    }
    global.addEventListener("scroll", scheduleStory, { passive: true });
    global.addEventListener("resize", scheduleStory);
    if (desktopMotion && desktopMotion.addEventListener) desktopMotion.addEventListener("change", scheduleStory);
    global.setTimeout(updateStory, 120);
  }
  global.setTimeout(initScrollStory, 220);

  // ---------------------------------------------------------------- featured records (home)
  // A short, sourced selection from the catalogue. Nothing here is authored
  // for the homepage: each card is built from the same archive record that
  // its dossier renders, so a featured entry can never drift from the source.
  const featuredIds = ["MOON-AP15-LRV", "MOON-ALSEP", "MARS-PATHFINDER-SOJOURNER", "MARS-MER-SPIRIT"];
  function renderFeatured() {
    const mount = doc.querySelector("[data-featured-records]");
    if (!mount) return;
    mount.textContent = "";
    featuredIds.forEach(function (id) {
      const record = records.find(function (item) { return item.id === id; });
      if (!record) return;
      const link = doc.createElement("a");
      link.className = "featured-record";
      link.href = dossierHref(record.id);
      link.setAttribute("data-record-id", record.id);
      const tag = doc.createElement("span");
      tag.className = "record-tag";
      tag.textContent = worldLabel(record) + " · " + t(recordTypeKey(record));
      const title = doc.createElement("h3");
      title.textContent = recordName(record);
      const meta = doc.createElement("p");
      meta.className = "featured-meta";
      meta.textContent = recordField(record, "mission") + " · " + recordField(record, "location");
      const foot = doc.createElement("span");
      foot.className = "featured-foot";
      const state = doc.createElement("span");
      state.className = "record-status";
      state.textContent = statusLabel(record.status);
      const arrow = doc.createElement("span");
      arrow.setAttribute("aria-hidden", "true");
      arrow.textContent = "↗";
      foot.append(state, arrow);
      link.append(tag, title, meta, foot);
      mount.appendChild(link);
    });
  }
  renderFeatured();
  doc.addEventListener("languagechange", renderFeatured);

  // ---------------------------------------------------------------- language refresh
  doc.addEventListener("languagechange", function () {
    if (renderArchive) renderArchive();
    if (refreshDiscovery) refreshDiscovery();
    updateMuseumProgress();
    updateStorageNote();
  });
}(window));
