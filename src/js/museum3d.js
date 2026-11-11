/* Forgotten Footprints — browser-native WebGL museum.
   Vanilla WebGL 1/2, no external libraries, no network assets.
   The renderer distinguishes: unsupported WebGL, renderer-init failure,
   scene failure, asset failure and context loss. */
(function (w) {
  "use strict";

  const doc = w.document;
  const DATA = w.ForgottenFootprintsData || { artifacts: [] };
  const RECORDS = DATA.artifacts || [];
  const Models = w.ForgottenFootprintsModels;
  if (!Models) {
    console.error("Forgotten Footprints: museum-models.js is missing.");
    return;
  }
  const M = Models.mat4;
  const reducedQuery = w.matchMedia ? w.matchMedia("(prefers-reduced-motion: reduce)") : null;
  const REDUCED = !!(reducedQuery && reducedQuery.matches);

  const QUALITY = {
    low: { dpr: 1, antialias: false, segments: 40, rings: 26, textureW: 512, textureH: 256, stars: 420, frameMs: 1000 / 30 },
    balanced: { dpr: 1.5, antialias: true, segments: 56, rings: 36, textureW: 1024, textureH: 512, stars: 900, frameMs: 1000 / 30 },
    high: { dpr: 2, antialias: true, segments: 72, rings: 48, textureW: 1024, textureH: 512, stars: 1500, frameMs: 1000 / 60 }
  };

  function detectQuality() {
    const mem = w.navigator.deviceMemory || 8;
    const cores = w.navigator.hardwareConcurrency || 8;
    const small = Math.min(w.screen.width || 1024, w.screen.height || 768) < 720;
    if (mem <= 4 || cores <= 4 || small) return "low";
    if (mem <= 8 || cores <= 8) return "balanced";
    return "high";
  }

  const FF3D = {
    version: "2.1",
    quality: detectQuality(),
    supportsWebGL: null,
    scenes: [],
    getReport: function () {
      return {
        version: this.version,
        quality: this.quality,
        supportsWebGL: ensureWebGLSupport(),
        reducedMotion: REDUCED,
        userAgent: w.navigator.userAgent,
        scenes: this.scenes.map(function (scene) {
          return {
            kind: scene.kind,
            state: scene.mount.getAttribute("data-webgl-state") || "ok",
            renderer: scene.rendererInfo || null,
            webglVersion: scene.webglVersion || null,
            canvas: [scene.canvas.width, scene.canvas.height],
            markers: scene.markerButtons ? scene.markerButtons.length : 0,
            model: scene.modelInfo || null,
            error: scene.lastError || null
          };
        })
      };
    }
  };
  // Optional local override for demonstrations and for testing each quality tier:
  // page.html?quality=low|balanced|high
  try {
    const requestedQuality = new URLSearchParams(location.search).get("quality");
    if (requestedQuality === "low" || requestedQuality === "balanced" || requestedQuality === "high") FF3D.quality = requestedQuality;
  } catch { /* keep detected quality */ }
  w.ForgottenFootprints3D = FF3D;

  // ------------------------------------------------------------ small helpers
  function t(key, fallback) {
    try {
      if (w.ForgottenFootprints && typeof w.ForgottenFootprints.t === "function") {
        const value = w.ForgottenFootprints.t(key);
        if (value && value !== key) return value;
      }
    } catch { /* keep fallback */ }
    return fallback === undefined ? key : fallback;
  }
  function lang() {
    return (w.ForgottenFootprints && w.ForgottenFootprints.language) || doc.documentElement.lang || "en";
  }
  function pageInPagesFolder() {
    return /\/pages\//i.test(location.pathname.replace(/\\/g, "/"));
  }
  function dossierHref(id) {
    return (pageInPagesFolder() ? "" : "pages/") + "artifact.html#" + encodeURIComponent(id);
  }
  function archiveHref(fragment) {
    return (pageInPagesFolder() ? "" : "pages/") + "archive.html" + (fragment || "");
  }
  function recordName(record) {
    return record.name ? (record.name[lang()] || record.name.en) : record.id;
  }
  function recordField(record, base) {
    if (lang() === "ar" && record[base + "Ar"]) return record[base + "Ar"];
    return record[base] || "";
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
  function statusLabel(status) { return t(statusKey(status), status); }
  function recordTypeLabel(record) {
    const key = ({ artifact: "typeArtifact", component: "typeComponent", debris: "typeDebris" })[record.recordType] || "typeArtifact";
    return t(key, record.recordType || "artifact");
  }
  function typeLabel(record) { return recordField(record, "type"); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function nowMs() { return (w.performance && w.performance.now) ? w.performance.now() : Date.now(); }
  function el(tag, className, text) {
    const node = doc.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  // ------------------------------------------------------------ WebGL checks
  function probeWebGL() {
    try {
      const canvas = doc.createElement("canvas");
      const gl = canvas.getContext("webgl", { alpha: true, antialias: false }) ||
        canvas.getContext("experimental-webgl", { alpha: true, antialias: false }) ||
        canvas.getContext("webgl2", { alpha: true, antialias: false });
      if (!gl) return false;
      const lose = gl.getExtension("WEBGL_lose_context");
      if (lose) lose.loseContext();
      return true;
    } catch { return false; }
  }
  // WebGL support is resolved lazily and cached. Feature-testing with a throwaway
  // canvas used to force a second GL context to be created and immediately torn
  // down on every page load; the real scene canvas answers the same question, so
  // the probe now runs only if the capability is queried directly.
  function ensureWebGLSupport() {
    if (FF3D.supportsWebGL === null) FF3D.supportsWebGL = probeWebGL();
    return FF3D.supportsWebGL;
  }

  function createContext(canvas) {
    const attrs = {
      alpha: true,
      depth: true,
      antialias: QUALITY[FF3D.quality].antialias,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
      powerPreference: "default"
    };
    const names = ["webgl", "experimental-webgl", "webgl2"];
    for (let i = 0; i < names.length; i++) {
      try {
        const gl = canvas.getContext(names[i], attrs);
        if (gl) return { gl: gl, name: names[i] };
      } catch { /* try the next context name */ }
    }
    return null;
  }

  function compileShader(gl, type, source, label) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const log = gl.getShaderInfoLog(shader) || "unknown shader error";
      gl.deleteShader(shader);
      throw new Error(label + ": " + log);
    }
    return shader;
  }
  function linkProgram(gl, vertexSource, fragmentSource, label) {
    const program = gl.createProgram();
    const vs = compileShader(gl, gl.VERTEX_SHADER, vertexSource, label + " vertex");
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource, label + " fragment");
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const log = gl.getProgramInfoLog(program) || "unknown link error";
      gl.deleteProgram(program);
      throw new Error(label + ": " + log);
    }
    return program;
  }
  function deleteProgram(gl, program) { if (program) gl.deleteProgram(program); }
  function getLocations(gl, program, names) {
    const out = {};
    names.forEach(function (name) { out[name] = gl.getUniformLocation(program, name); });
    return out;
  }

  // ------------------------------------------------------------ shaders
  const PLANET_VS = [
    "attribute vec3 aPosition;",
    "attribute vec3 aNormal;",
    "attribute vec2 aUV;",
    "uniform mat4 uModel;",
    "uniform mat4 uViewProj;",
    "uniform mat3 uNormalMat;",
    "varying vec3 vNormal;",
    "varying vec3 vWorld;",
    "varying vec2 vUV;",
    "void main(){",
    "  vec4 world = uModel * vec4(aPosition, 1.0);",
    "  vWorld = world.xyz;",
    "  vNormal = normalize(uNormalMat * aNormal);",
    "  vUV = aUV;",
    "  gl_Position = uViewProj * world;",
    "}"
  ].join("\n");

  const PLANET_FS = [
    "precision highp float;",
    "uniform sampler2D uTexture;",
    "uniform vec3 uLightDir;",
    "uniform vec3 uCamera;",
    "uniform vec3 uAtmoColor;",
    "uniform float uAtmoStrength;",
    "uniform float uRoughness;",
    "uniform float uEmissive;",
    "varying vec3 vNormal;",
    "varying vec3 vWorld;",
    "varying vec2 vUV;",
    "void main(){",
    "  vec3 N = normalize(vNormal);",
    "  vec3 V = normalize(uCamera - vWorld);",
    "  if (uEmissive > 0.5) {",
    "    float rim = pow(1.0 - max(dot(N, V), 0.0), 2.0);",
    "    vec3 hot = vec3(1.0, 0.72, 0.30) * (1.0 - rim * 0.35) + vec3(1.0, 0.92, 0.62) * rim;",
    "    gl_FragColor = vec4(hot, 1.0);",
    "    return;",
    "  }",
    "  vec3 L = normalize(uLightDir);",
    "  float diff = max(dot(N, L), 0.0);",
    "  float fill = max(dot(N, normalize(vec3(-L.x, -0.25, -L.z))), 0.0) * 0.18;",
    "  vec3 base = texture2D(uTexture, vUV).rgb;",
    "  float rim = pow(1.0 - max(dot(N, V), 0.0), 3.0);",
    "  float spec = pow(max(dot(reflect(-L, N), V), 0.0), 24.0) * (1.0 - uRoughness) * 0.20;",
    "  vec3 col = base * (0.045 + 0.955 * diff + fill);",
    "  col += uAtmoColor * rim * uAtmoStrength;",
    "  col += vec3(spec);",
    "  gl_FragColor = vec4(col, 1.0);",
    "}"
  ].join("\n");

  const STAR_VS = [
    "attribute vec3 aPosition;",
    "attribute vec3 aColor;",
    "attribute float aSize;",
    "uniform mat4 uViewProj;",
    "uniform float uPixelRatio;",
    "varying vec3 vColor;",
    "void main(){",
    "  vColor = aColor;",
    "  gl_Position = uViewProj * vec4(aPosition, 1.0);",
    "  gl_PointSize = aSize * uPixelRatio;",
    "}"
  ].join("\n");

  const STAR_FS = [
    "precision mediump float;",
    "varying vec3 vColor;",
    "void main(){",
    "  vec2 d = gl_PointCoord - vec2(0.5);",
    "  if (dot(d, d) > 0.25) discard;",
    "  gl_FragColor = vec4(vColor, 1.0);",
    "}"
  ].join("\n");

  const MESH_VS = [
    "attribute vec3 aPosition;",
    "attribute vec3 aNormal;",
    "attribute vec3 aColor;",
    "attribute float aPart;",
    "uniform mat4 uModel;",
    "uniform mat4 uViewProj;",
    "uniform mat3 uNormalMat;",
    "varying vec3 vNormal;",
    "varying vec3 vWorld;",
    "varying vec3 vColor;",
    "varying float vPart;",
    "void main(){",
    "  vec4 world = uModel * vec4(aPosition, 1.0);",
    "  vWorld = world.xyz;",
    "  vNormal = normalize(uNormalMat * aNormal);",
    "  vColor = aColor;",
    "  vPart = aPart;",
    "  gl_Position = uViewProj * world;",
    "}"
  ].join("\n");

  const MESH_FS = [
    "precision highp float;",
    "uniform vec3 uLightDir;",
    "uniform vec3 uCamera;",
    "uniform float uSelected;",
    "varying vec3 vNormal;",
    "varying vec3 vWorld;",
    "varying vec3 vColor;",
    "varying float vPart;",
    "void main(){",
    "  vec3 N = normalize(vNormal);",
    "  vec3 L = normalize(uLightDir);",
    "  vec3 V = normalize(uCamera - vWorld);",
    "  float diff = max(dot(N, L), 0.0);",
    "  float fill = max(dot(N, normalize(vec3(-L.x, -0.25, -L.z))), 0.0) * 0.26;",
    "  float fill2 = max(dot(N, normalize(vec3(L.z, 0.10, -L.x))), 0.0) * 0.10;",
    "  float luma = dot(vColor, vec3(0.299, 0.587, 0.114));",
    "  float metal = smoothstep(0.30, 0.78, luma);",
    "  float shine = mix(8.0, 42.0, metal);",
    "  float spec = pow(max(dot(reflect(-L, N), V), 0.0), shine) * mix(0.08, 0.34, metal);",
    "  float rim = pow(1.0 - max(dot(N, V), 0.0), 2.4);",
    "  float ao = mix(0.74, 1.0, smoothstep(-1.45, 1.15, vWorld.y));",
    "  vec3 col = vColor * (0.19 + 0.81 * diff + fill + fill2) * ao + vec3(0.95, 0.83, 0.62) * spec;",
    "  col += vec3(0.38, 0.52, 0.58) * rim * 0.20;",
    "  if (uSelected >= 0.0) {",
    "    if (abs(vPart - uSelected) < 0.5) col = mix(col, vec3(1.0, 0.80, 0.44), 0.62);",
    "    else if (vPart >= 0.0) col *= 0.56;",
    "  }",
    "  gl_FragColor = vec4(col, 1.0);",
    "}"
  ].join("\n");

  // ------------------------------------------------------------ geometry helpers
  function buildSphere(segments, rings) {
    const positions = [], normals = [], uvs = [], indices = [];
    for (let y = 0; y <= rings; y++) {
      const v = y / rings;
      const phi = (v - 0.5) * Math.PI;
      for (let x = 0; x <= segments; x++) {
        const u = x / segments;
        const theta = u * Math.PI * 2;
        const nx = Math.cos(phi) * Math.cos(theta);
        const ny = Math.sin(phi);
        const nz = Math.cos(phi) * Math.sin(theta);
        positions.push(nx, ny, nz);
        normals.push(nx, ny, nz);
        uvs.push(u, 1 - v);
      }
    }
    for (let y = 0; y < rings; y++) {
      for (let x = 0; x < segments; x++) {
        const a = y * (segments + 1) + x;
        const b = a + segments + 1;
        indices.push(a, b, a + 1, b, b + 1, a + 1);
      }
    }
    return {
      positions: new Float32Array(positions),
      normals: new Float32Array(normals),
      uvs: new Float32Array(uvs),
      indices: new Uint16Array(indices)
    };
  }

  function buildStars(count, seed, inner, outer) {
    let s = seed >>> 0;
    function random() { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const u = random() * 2 - 1;
      const theta = random() * Math.PI * 2;
      const r = inner + random() * (outer - inner);
      const sq = Math.sqrt(1 - u * u);
      positions[i * 3] = r * sq * Math.cos(theta);
      positions[i * 3 + 1] = r * u;
      positions[i * 3 + 2] = r * sq * Math.sin(theta);
      const warm = random();
      if (warm > 0.86) { colors[i * 3] = 1.0; colors[i * 3 + 1] = 0.78; colors[i * 3 + 2] = 0.52; }
      else if (warm < 0.20) { colors[i * 3] = 0.62; colors[i * 3 + 1] = 0.78; colors[i * 3 + 2] = 1.0; }
      else { colors[i * 3] = 0.86; colors[i * 3 + 1] = 0.90; colors[i * 3 + 2] = 0.94; }
      sizes[i] = 0.8 + random() * 2.0;
    }
    return { positions: positions, colors: colors, sizes: sizes };
  }

  function buildGalaxy(count, seed) {
    let s = seed >>> 0;
    function random() { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const core = i < Math.floor(count * 0.22);
      const arm = Math.floor(random() * 3);
      const t = core ? Math.pow(random(), 0.5) * 0.20 : random();
      const radius = t * 2.8;
      const angle = arm * (Math.PI * 2 / 3) + t * 3.4 + (random() - 0.5) * (core ? 0.9 : 0.5);
      positions[i * 3] = Math.cos(angle) * radius + (random() - 0.5) * 0.4;
      positions[i * 3 + 1] = Math.sin(angle) * radius * 0.34 + (random() - 0.5) * (core ? 0.5 : 0.28);
      positions[i * 3 + 2] = -13 + Math.sin(angle) * radius * 0.55 + (random() - 0.5) * 0.7;
      const warm = random();
      colors[i * 3] = warm > 0.4 ? 0.97 : 0.60;
      colors[i * 3 + 1] = warm > 0.4 ? 0.84 : 0.72;
      colors[i * 3 + 2] = warm > 0.4 ? 0.68 : 1.0;
      sizes[i] = core ? 1.3 + random() * 1.6 : 0.6 + random() * 1.4;
    }
    return { positions: positions, colors: colors, sizes: sizes };
  }

  function buildRing(count, radius, color) {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      positions[i * 3] = Math.cos(a) * radius;
      positions[i * 3 + 1] = Math.sin(a * 2) * 0.10;
      positions[i * 3 + 2] = Math.sin(a) * radius;
      colors[i * 3] = color[0]; colors[i * 3 + 1] = color[1]; colors[i * 3 + 2] = color[2];
      sizes[i] = 1.0;
    }
    return { positions: positions, colors: colors, sizes: sizes };
  }

  // ------------------------------------------------------------ textures
  function makeCanvas(width, height) {
    const canvas = doc.createElement("canvas");
    canvas.width = width; canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("2D canvas is unavailable for procedural texture generation");
    return { canvas: canvas, ctx: ctx };
  }
  function rng(seed) {
    let s = seed >>> 0;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  // Fine detail (craters, grain, dust) is specified for the 1024x512 reference
  // surface and scaled by the painted area, so the reduced tier pays a
  // proportionally smaller cost while keeping the same look per pixel. Structured
  // features (regions, caps, streaks) keep their full count on every tier because
  // they define the planet's identity.
  function detailCount(base, width, height) {
    return Math.max(1, Math.round(base * (width * height) / (1024 * 512)));
  }
  function paintMoon(width, height) {
    const made = makeCanvas(width, height), ctx = made.ctx, random = rng(19690720);
    const base = ctx.createLinearGradient(0, 0, 0, height);
    base.addColorStop(0, "#8d8d88"); base.addColorStop(0.48, "#9a9a93"); base.addColorStop(1, "#7e7e7a");
    ctx.fillStyle = base; ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 8; i++) {
      const x = random() * width, y = height * (0.18 + random() * 0.6), r = width * (0.05 + random() * 0.12);
      for (const dx of [-width, 0, width]) {
        const g = ctx.createRadialGradient(x + dx, y, 0, x + dx, y, r);
        g.addColorStop(0, "rgba(55,58,57,0.55)"); g.addColorStop(0.7, "rgba(76,79,78,0.22)"); g.addColorStop(1, "rgba(76,79,78,0)");
        ctx.save(); ctx.translate(x + dx, y); ctx.scale(1, 0.55); ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill(); ctx.restore();
      }
    }
    function crater(x, y, r, strength) {
      for (const dx of [-width, 0, width]) {
        const cx = x + dx;
        if (cx < -r * 2 || cx > width + r * 2) continue;
        const g = ctx.createRadialGradient(cx - r * 0.18, y - r * 0.18, r * 0.04, cx, y, r);
        g.addColorStop(0, "rgba(44,44,42," + (0.42 * strength) + ")");
        g.addColorStop(0.62, "rgba(92,92,88," + (0.26 * strength) + ")");
        g.addColorStop(0.84, "rgba(196,196,188," + (0.22 * strength) + ")");
        g.addColorStop(1, "rgba(128,128,122,0)");
        ctx.beginPath(); ctx.arc(cx, y, r, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
      }
    }
    for (let i = 0, n = detailCount(260, width, height); i < n; i++) {
      const r = 1.2 + Math.pow(random(), 2.3) * width * 0.026;
      crater(random() * width, random() * height, r, 1);
    }
    for (let i = 0, n = detailCount(900, width, height); i < n; i++) crater(random() * width, random() * height, 0.45 + random() * 1.7, 0.8);
    for (let i = 0, n = detailCount(16000, width, height); i < n; i++) {
      const x = random() * width, y = random() * height;
      const v = Math.floor(95 + random() * 110);
      ctx.fillStyle = "rgba(" + v + "," + v + "," + Math.min(255, v + 2) + "," + (0.06 + random() * 0.17) + ")";
      ctx.fillRect(x, y, 1, 1);
    }
    return made.canvas;
  }
  function paintMars(width, height) {
    const made = makeCanvas(width, height), ctx = made.ctx, random = rng(20210218);
    const base = ctx.createLinearGradient(0, 0, 0, height);
    base.addColorStop(0, "#c47c55"); base.addColorStop(0.26, "#b56240"); base.addColorStop(0.55, "#aa5536"); base.addColorStop(0.82, "#94472f"); base.addColorStop(1, "#7e3e2c");
    ctx.fillStyle = base; ctx.fillRect(0, 0, width, height);
    // Soft, overlapping low-contrast regions; no single dominant disc.
    for (let i = 0; i < 16; i++) {
      const x = random() * width, y = height * (0.16 + random() * 0.68), r = width * (0.035 + random() * 0.075);
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, "rgba(82,44,34,0.24)"); g.addColorStop(0.65, "rgba(92,49,37,0.11)"); g.addColorStop(1, "rgba(92,49,37,0)");
      ctx.save(); ctx.translate(x, y); ctx.scale(1, 0.58); ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill(); ctx.restore();
    }
    for (let i = 0; i < 10; i++) {
      const x = random() * width, y = height * (0.18 + random() * 0.64), r = width * (0.03 + random() * 0.06);
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, "rgba(226,157,110,0.23)"); g.addColorStop(1, "rgba(226,157,110,0)");
      ctx.save(); ctx.translate(x, y); ctx.scale(1, 0.5); ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill(); ctx.restore();
    }
    // Polar caps with a soft, irregular edge.
    for (const top of [true, false]) {
      const y = top ? 0 : height;
      const g = ctx.createLinearGradient(0, y, 0, top ? height * 0.10 : height * 0.90);
      g.addColorStop(0, "rgba(242,236,224,0.94)"); g.addColorStop(0.55, "rgba(232,222,206,0.52)"); g.addColorStop(1, "rgba(226,214,196,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(0, y);
      const steps = 48;
      for (let i = 0; i <= steps; i++) {
        const x = (i / steps) * width;
        const wobble = 0.025 + random() * 0.055;
        ctx.lineTo(x, top ? height * wobble : height - height * wobble);
      }
      ctx.lineTo(width, y); ctx.closePath(); ctx.fill();
    }
    function crater(x, y, r) {
      for (const dx of [-width, 0, width]) {
        const cx = x + dx;
        if (cx < -r * 2 || cx > width + r * 2) continue;
        const g = ctx.createRadialGradient(cx, y, r * 0.1, cx, y, r);
        g.addColorStop(0, "rgba(60,30,24,0.34)"); g.addColorStop(0.78, "rgba(128,65,43,0.12)"); g.addColorStop(1, "rgba(206,130,90,0)");
        ctx.beginPath(); ctx.arc(cx, y, r, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
        ctx.beginPath(); ctx.arc(cx, y, r * 0.94, Math.PI * 0.15, Math.PI * 1.05);
        ctx.strokeStyle = "rgba(226,158,112,0.10)"; ctx.lineWidth = Math.max(0.7, r * 0.06); ctx.stroke();
      }
    }
    for (let i = 0, n = detailCount(170, width, height); i < n; i++) crater(random() * width, random() * height, 1.1 + Math.pow(random(), 2) * width * 0.016);
    for (let i = 0, n = detailCount(900, width, height); i < n; i++) crater(random() * width, random() * height, 0.5 + random() * 1.5);
    // Fine dust, wind streaks and grain.
    for (let i = 0, n = detailCount(22000, width, height); i < n; i++) {
      const x = random() * width, y = random() * height;
      const v = random() > 0.5 ? 208 : 98;
      ctx.fillStyle = "rgba(" + v + "," + Math.floor(v * 0.67) + "," + Math.floor(v * 0.48) + "," + (0.03 + random() * 0.09) + ")";
      ctx.fillRect(x, y, 1, 1);
    }
    ctx.globalAlpha = 0.10;
    ctx.strokeStyle = "rgba(88,43,31,0.55)";
    for (let i = 0; i < 9; i++) {
      ctx.lineWidth = 0.6 + random() * 1.2;
      ctx.beginPath();
      const y = height * (0.26 + random() * 0.48);
      ctx.moveTo(0, y);
      ctx.bezierCurveTo(width * 0.28, y + (random() - 0.5) * 14, width * 0.72, y + (random() - 0.5) * 20, width, y + (random() - 0.5) * 12);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    return made.canvas;
  }
  function paintSun() {
    const made = makeCanvas(64, 64), ctx = made.ctx;
    const g = ctx.createRadialGradient(32, 32, 2, 32, 32, 32);
    g.addColorStop(0, "#fff9d8"); g.addColorStop(0.5, "#ffd27a"); g.addColorStop(1, "#d98026");
    ctx.fillStyle = g; ctx.fillRect(0, 0, 64, 64);
    return made.canvas;
  }
  function uploadTexture(gl, source) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.generateMipmap(gl.TEXTURE_2D);
    const aniso = gl.getExtension("EXT_texture_filter_anisotropic") || gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
    if (aniso) {
      const max = gl.getParameter(aniso.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
      gl.texParameterf(gl.TEXTURE_2D, aniso.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(4, max));
    }
    return texture;
  }
  function makeBuffer(gl, target, data, usage) {
    const buffer = gl.createBuffer();
    gl.bindBuffer(target, buffer);
    gl.bufferData(target, data, usage || gl.STATIC_DRAW);
    return buffer;
  }

  // An attribute location is fixed for the lifetime of a linked program, yet the
  // draw paths used to ask the driver on every frame (up to ten queries per frame
  // in the deep-space scene). Memoise per program object; a context restore links
  // new programs, so the cached entries are simply replaced.
  const attribCache = new WeakMap();
  function attrib(gl, program, name) {
    let map = attribCache.get(program);
    if (!map) { map = Object.create(null); attribCache.set(program, map); }
    if (map[name] === undefined) map[name] = gl.getAttribLocation(program, name);
    return map[name];
  }

  // Writes the 3x3 normal matrix of a mat4 into a caller-owned array so the draw
  // loop stops allocating a fresh Float32Array on every frame.
  function writeNormalMat(out, m) {
    out[0] = m[0]; out[1] = m[1]; out[2] = m[2];
    out[3] = m[4]; out[4] = m[5]; out[5] = m[6];
    out[6] = m[8]; out[7] = m[9]; out[8] = m[10];
    return out;
  }

  // The Sun is the only mesh drawn with an identity normal matrix, so allocate
  // it once rather than building a Float32Array on every deep-space frame.
  const IDENTITY3 = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);

  // Adaptive quality. A reduction needs consecutive slow windows; a restoration
  // needs far more consecutive healthy ones, so an isolated dip in frame rate can
  // never flip the tier back and forth. LOW/BALANCED gate painting at 30 fps, so
  // the healthy threshold sits just under that ceiling.
  const PERF_WINDOW_MS = 2400;
  const SLOW_FPS = 22;
  const HEALTHY_FPS = 28;
  const SLOW_WINDOWS = 2;
  const HEALTHY_WINDOWS = 5;

  // ------------------------------------------------------------ base scene
  function BaseScene(mount, kind) {
    this.mount = mount;
    this.kind = kind;
    this.world = kind;
    this.canvas = mount.querySelector("canvas");
    this.frame = mount.querySelector(".scene-frame") || (this.canvas && this.canvas.parentElement);
    if (!this.canvas || !this.frame) throw new Error("scene requires a canvas and a .scene-frame");
    this.gl = null;
    this.webglVersion = null;
    this.rendererInfo = null;
    this.program = null;
    this.starProgram = null;
    this.sphere = null;
    this.starBuffers = null;
    this.texture = null;
    this.model = null;
    this.modelMesh = null;
    this.modelInfo = null;
    this.markerButtons = [];
    this.selectedRecord = null;
    this.selectedPart = -1;
    this.selectionPanel = null;
    this.recordList = null;
    this.componentPanel = null;
    this.hotspots = [];
    this.raf = 0;
    this.last = 0;
    this.dirty = true;
    this.visible = true;
    this.dragging = false;
    this.pointer = null;
    this.contextLost = false;
    this.lastError = null;
    this.fallbackReason = null;
    this.fallbackDetail = "";
    this.idleAt = 0;
    this.fpsFrames = 0;
    this.fpsStart = 0;
    this.fpsSlow = 0;
    this.fpsHealthy = 0;
    this.lowFps = false;
    this.baseDistance = 3.6;
    this.fov = 42 * Math.PI / 180;
    this.viewport = { cssWidth: 1, cssHeight: 1, dpr: 1 };
    this.cssSize = null;
    this.normalMat = new Float32Array(9);
    this.state = { yaw: 0, pitch: 0.12, zoom: 0 };
    this.target = { yaw: 0, pitch: 0.12, zoom: 0 };
    this.velocity = { yaw: 0, pitch: 0 };
    this.pointerSamples = [];
    this.pointers = new Map();
    this.pinch = null;
    this.sensitivity = 0.0055;
    this.storyProgress = null;
    this._frame = this.frameLoop.bind(this);
    this._resize = this.onResize.bind(this);
    this._visibility = this.onVisibility.bind(this);
    this._language = this.refreshLanguage.bind(this);
  }

  BaseScene.prototype.createContext = function () {
    const result = createContext(this.canvas);
    if (!result) {
      FF3D.supportsWebGL = false;
      this.showFallback("unsupported");
      return false;
    }
    FF3D.supportsWebGL = true;
    this.gl = result.gl;
    this.webglVersion = result.name;
    const debug = this.gl.getExtension("WEBGL_debug_renderer_info");
    this.rendererInfo = debug ? {
      vendor: this.gl.getParameter(debug.UNMASKED_VENDOR_WEBGL),
      renderer: this.gl.getParameter(debug.UNMASKED_RENDERER_WEBGL)
    } : { renderer: this.gl.getParameter(this.gl.RENDERER) };
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LEQUAL);
    this.canvas.addEventListener("webglcontextlost", this.onContextLost.bind(this), false);
    this.canvas.addEventListener("webglcontextrestored", this.onContextRestored.bind(this), false);
    this.mount.setAttribute("data-webgl-state", "starting");
    return true;
  };

  BaseScene.prototype.attach = function () {
    this.syncViewTargets();
    this.resize();
    this.bindInput();
    this.bindControls();
    this.bindObservers();
    this.bindLanguage();
    this.bindQualityLabel();
    this.createControlHint();
    this.ensureRecordList();
    this.mount.classList.add("webgl-ready");
    this.mount.classList.remove("webgl-fallback");
    this.mount.setAttribute("data-webgl-state", "ok");
    this.schedule();
  };

  BaseScene.prototype.syncViewTargets = function () {
    this.target.yaw = this.state.yaw;
    this.target.pitch = this.state.pitch;
    this.target.zoom = this.state.zoom;
    this.clearInertia();
  };

  BaseScene.prototype.createControlHint = function () {
    if (this.controlHint) return;
    const hint = el("div", "scene-control-hint");
    hint.textContent = t("sceneHintShort", "Drag to rotate · Pinch or scroll to zoom");
    this.frame.appendChild(hint);
    this.controlHint = hint;
    this.controlHintTimer = w.setTimeout(() => {
      if (hint) hint.classList.add("is-hidden");
    }, 6500);
  };

  BaseScene.prototype.hideControlHint = function () {
    if (this.controlHint) this.controlHint.classList.add("is-hidden");
    if (this.controlHintTimer) { w.clearTimeout(this.controlHintTimer); this.controlHintTimer = 0; }
  };

  BaseScene.prototype.setupPrograms = function () {
    this.planetProgram = linkProgram(this.gl, PLANET_VS, PLANET_FS, "planet program");
    this.planetUniforms = getLocations(this.gl, this.planetProgram,
      ["uModel", "uViewProj", "uNormalMat", "uTexture", "uLightDir", "uCamera", "uAtmoColor", "uAtmoStrength", "uRoughness", "uEmissive"]);
    this.starProgram = linkProgram(this.gl, STAR_VS, STAR_FS, "star program");
    this.starUniforms = getLocations(this.gl, this.starProgram, ["uViewProj", "uPixelRatio"]);
  };

  BaseScene.prototype.setupSphere = function () {
    const profile = QUALITY[FF3D.quality];
    const sphere = buildSphere(profile.segments, profile.rings);
    this.sphere = {
      positions: makeBuffer(this.gl, this.gl.ARRAY_BUFFER, sphere.positions),
      normals: makeBuffer(this.gl, this.gl.ARRAY_BUFFER, sphere.normals),
      uvs: makeBuffer(this.gl, this.gl.ARRAY_BUFFER, sphere.uvs),
      indices: makeBuffer(this.gl, this.gl.ELEMENT_ARRAY_BUFFER, sphere.indices),
      count: sphere.indices.length
    };
  };

  BaseScene.prototype.setupStars = function (count, seed, inner, outer) {
    const data = buildStars(count, seed, inner, outer);
    this.starBuffers = this.createPointBuffers(data);
    this.starCount = count;
  };

  BaseScene.prototype.createPointBuffers = function (data) {
    return {
      positions: makeBuffer(this.gl, this.gl.ARRAY_BUFFER, data.positions),
      colors: makeBuffer(this.gl, this.gl.ARRAY_BUFFER, data.colors),
      sizes: makeBuffer(this.gl, this.gl.ARRAY_BUFFER, data.sizes),
      count: data.sizes.length
    };
  };

  // Reads the CSS box once. getBoundingClientRect() forces a synchronous layout
  // flush, so it is called only from measure points (setup, ResizeObserver,
  // window resize) and never from the animation loop.
  BaseScene.prototype.measure = function () {
    const rect = this.canvas.getBoundingClientRect();
    this.cssSize = { width: Math.max(1, rect.width), height: Math.max(1, rect.height) };
    return this.cssSize;
  };

  // Cheap per-frame path: reuses the measured CSS box and only writes the
  // backing store / GL viewport when the resulting pixel size actually changed.
  BaseScene.prototype.applyViewport = function () {
    if (!this.canvas) return;
    const size = this.cssSize || this.measure();
    const profile = QUALITY[FF3D.quality];
    let dpr = Math.min(w.devicePixelRatio || 1, profile.dpr);
    if (this.lowFps) dpr = Math.min(dpr, 1);
    const width = Math.max(1, Math.round(size.width * dpr));
    const height = Math.max(1, Math.round(size.height * dpr));
    this.viewport.cssWidth = size.width;
    this.viewport.cssHeight = size.height;
    this.viewport.dpr = dpr;
    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width;
      this.canvas.height = height;
      this.dirty = true;
    }
    if (this.gl) this.gl.viewport(0, 0, width, height);
  };

  BaseScene.prototype.resize = function () {
    if (!this.canvas) return;
    this.measure();
    this.applyViewport();
  };

  // Resizing the canvas clears it, so a size change must also request a repaint.
  // This is the only place that re-measures: the ResizeObserver on the frame and
  // the window resize listener both route here. The draw loop no longer calls
  // getBoundingClientRect() on every frame.
  //
  // ResizeObserver already reports the observed box size, so a notification that
  // leaves the frame unchanged is dropped before it can force a synchronous
  // layout for nothing. A window resize that does not change the box is
  // therefore free, and the observer's own initial delivery cannot double the
  // measurement that attach() already performed.
  BaseScene.prototype.onResize = function (entries) {
    if (this.fallbackReason || this.contextLost) return;
    if (entries && entries.length) {
      const entry = entries[entries.length - 1];
      const box = entry.borderBoxSize ? (entry.borderBoxSize.length ? entry.borderBoxSize[0] : entry.borderBoxSize) : null;
      const width = box ? box.inlineSize : (entry.contentRect ? entry.contentRect.width : undefined);
      const height = box ? box.blockSize : (entry.contentRect ? entry.contentRect.height : undefined);
      if (typeof width === "number" && typeof height === "number") {
        if (this.observedFrame && this.observedFrame.width === width && this.observedFrame.height === height) return;
        this.observedFrame = { width: width, height: height };
      }
    }
    this.resize();
    this.dirty = true;
    this.schedule();
  };

  BaseScene.prototype.schedule = function () {
    if (this.raf || this.fallbackReason || !this.visible || doc.hidden || this.contextLost) return;
    this.raf = w.requestAnimationFrame(this._frame);
  };

  BaseScene.prototype.requestIdleResume = function () {
    if (this.resumeTimer) w.clearTimeout(this.resumeTimer);
    if (REDUCED || this.lowFps) return;
    this.resumeTimer = w.setTimeout(() => {
      this.resumeTimer = 0;
      if (!this.dragging && !doc.hidden) {
        this.state.autoRotate = true;
        this.dirty = true;
        this.schedule();
      }
    }, 9000);
  };

  BaseScene.prototype.frameLoop = function (now) {
    this.raf = 0;
    if (this.fallbackReason || !this.visible || doc.hidden || this.contextLost) return;
    const profile = QUALITY[FF3D.quality];
    if (now - this.last < profile.frameMs) {
      this.schedule();
      return;
    }
    const dt = Math.min(0.06, (now - this.last) / 1000 || 0.016);
    this.last = now;
    if (this.state.autoRotate && !this.dragging && !this.pinch && !this.lowFps) {
      const speed = this.kind === "deep" ? 0.018 : this.kind === "artifact" ? 0.055 : 0.025;
      this.target.yaw += dt * speed;
      this.dirty = true;
    }
    // Idle resume must respect the reduced-motion preference: without the REDUCED
    // guard a single interaction would restart the automatic rotation the user
    // asked the system to suppress.
    if (!this.state.autoRotate && !this.dragging && !this.pinch && !REDUCED && now > this.idleAt && !this.lowFps) {
      this.state.autoRotate = true;
      this.idleAt = 0;
    }
    let coasting = false;
    if (!this.dragging && !this.pinch) {
      const speed = Math.hypot(this.velocity.yaw, this.velocity.pitch);
      if (speed > 0.0015) {
        this.target.yaw += this.velocity.yaw * dt;
        this.target.pitch = clamp(this.target.pitch + this.velocity.pitch * dt, -1.15, 1.15);
        const decay = Math.exp(-dt * 3.6);
        this.velocity.yaw *= decay;
        this.velocity.pitch *= decay;
        if (Math.hypot(this.velocity.yaw, this.velocity.pitch) <= 0.0015) {
          this.velocity.yaw = 0;
          this.velocity.pitch = 0;
        }
        coasting = true;
        this.dirty = true;
      }
    }
    const smoothing = REDUCED ? 1 : (1 - Math.exp(-dt * 11));
    let moving = false;
    const ease = (name) => {
      const delta = this.target[name] - this.state[name];
      if (Math.abs(delta) > 0.00035) {
        this.state[name] += delta * smoothing;
        moving = true;
      } else if (this.state[name] !== this.target[name]) {
        this.state[name] = this.target[name];
        moving = true;
      }
    };
    ease("yaw"); ease("pitch"); ease("zoom");
    if (this.dirty || this.state.autoRotate || this.dragging || moving) {
      try { this.draw(now); } catch (error) {
        this.lastError = String(error && error.message || error);
        console.error("3D scene draw failed", error);
        this.showFallback("scene", this.lastError);
        return;
      }
      this.dirty = false;
      this.fpsFrames++;
      if (!this.fpsStart) this.fpsStart = now;
      const fpsSpan = now - this.fpsStart;
      if (fpsSpan > PERF_WINDOW_MS) {
        // Only judge a window that is close to its intended length. A window that
        // ran long (tab throttling, a blocking task) reports a meaningless rate.
        if (fpsSpan < PERF_WINDOW_MS * 2) this.evaluatePerformance(this.fpsFrames * 1000 / fpsSpan);
        this.fpsFrames = 0; this.fpsStart = now;
      }
    }
    if (this.state.autoRotate || this.dragging || this.pinch || moving || coasting) this.schedule();
  };

  // Applies an observed frame rate to the adaptive tier. Called at most once per
  // PERF_WINDOW_MS, and both directions require consecutive windows, so the tier
  // cannot oscillate on a temporary dip.
  BaseScene.prototype.evaluatePerformance = function (fps) {
    if (!(fps > 0)) return;
    if (fps < SLOW_FPS) {
      this.fpsHealthy = 0;
      this.fpsSlow++;
      if (this.fpsSlow >= SLOW_WINDOWS && !this.lowFps) {
        this.fpsSlow = 0;
        this.setPerformanceTier(true);
      }
      return;
    }
    this.fpsSlow = 0;
    if (!this.lowFps) return;
    if (fps >= HEALTHY_FPS) this.fpsHealthy++;
    else this.fpsHealthy = 0;
    if (this.fpsHealthy >= HEALTHY_WINDOWS) {
      this.fpsHealthy = 0;
      this.setPerformanceTier(false);
    }
  };

  // The reduced tier changes rendering resolution only. Model geometry, the
  // procedural surface texture and every readable label are left untouched, so
  // scientific readability never depends on the tier.
  BaseScene.prototype.setPerformanceTier = function (reduced) {
    if (this.lowFps === reduced) return;
    this.lowFps = reduced;
    if (reduced) {
      this.state.autoRotate = false;
      this.mount.setAttribute("data-webgl-performance", "adaptive");
    } else {
      this.mount.removeAttribute("data-webgl-performance");
    }
    this.updateQualityLabel();
    this.applyViewport();
    this.dirty = true;
    this.schedule();
  };

  BaseScene.prototype.clear = function () {
    const gl = this.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.clearDepth(1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  };

  BaseScene.prototype.enablePoints = function () {
    if (!this.starBuffers || !this.starCount) return;
    const gl = this.gl;
    gl.useProgram(this.starProgram);
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.uniformMatrix4fv(this.starUniforms.uViewProj, false, this.viewProj);
    gl.uniform1f(this.starUniforms.uPixelRatio, this.viewport.dpr);
    this.bindStarBuffers(this.starBuffers);
    gl.drawArrays(gl.POINTS, 0, this.starCount);
  };

  BaseScene.prototype.bindStarBuffers = function (buffers) {
    const gl = this.gl;
    const aPosition = attrib(gl, this.starProgram, "aPosition");
    const aColor = attrib(gl, this.starProgram, "aColor");
    const aSize = attrib(gl, this.starProgram, "aSize");
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.positions);
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.colors);
    gl.enableVertexAttribArray(aColor);
    gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.sizes);
    gl.enableVertexAttribArray(aSize);
    gl.vertexAttribPointer(aSize, 1, gl.FLOAT, false, 0, 0);
  };

  BaseScene.prototype.bindInput = function () {
    const canvas = this.canvas;
    const pointerDistance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
    canvas.addEventListener("pointerdown", (event) => {
      if (event.button !== 0 && event.pointerType === "mouse") return;
      this.hideControlHint();
      this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      try { canvas.setPointerCapture(event.pointerId); } catch { /* optional */ }
      if (event.pointerType === "touch") { try { event.preventDefault(); } catch { /* optional */ } }
      if (this.pointers.size === 1) {
        this.pointer = { x: event.clientX, y: event.clientY, id: event.pointerId };
        this.dragging = true;
        this.pinch = null;
        this.state.autoRotate = false;
        this.clearInertia();
        this.trackPointer(event.clientX, event.clientY, event.timeStamp);
        this.idleAt = nowMs() + 9000;
        if (this.resumeTimer) { w.clearTimeout(this.resumeTimer); this.resumeTimer = 0; }
        canvas.classList.add("dragging");
        canvas.focus({ preventScroll: true });
      } else if (this.pointers.size === 2) {
        const points = Array.from(this.pointers.values());
        this.dragging = false;
        this.pointer = null;
        this.clearInertia();
        this.pinch = { distance: pointerDistance(points[0], points[1]), zoom: this.target.zoom };
        this.state.autoRotate = false;
        canvas.classList.add("pinching");
      }
      this.dirty = true;
      this.schedule();
    });
    canvas.addEventListener("pointermove", (event) => {
      if (!this.pointers.has(event.pointerId)) return;
      this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (this.pointers.size >= 2) {
        const points = Array.from(this.pointers.values());
        if (this.pinch) {
          const distance = pointerDistance(points[0], points[1]);
          this.zoomTo(this.pinch.zoom + (distance - this.pinch.distance) * 0.0026);
        }
        this.dirty = true;
        this.schedule();
        return;
      }
      if (!this.dragging || !this.pointer) return;
      const dx = event.clientX - this.pointer.x;
      const dy = event.clientY - this.pointer.y;
      this.pointer = { x: event.clientX, y: event.clientY, id: event.pointerId };
      this.trackPointer(event.clientX, event.clientY, event.timeStamp);
      this.rotate(dx, dy, true);
      this.dirty = true;
      this.schedule();
    });
    const end = (event) => {
      this.pointers.delete(event.pointerId);
      try { canvas.releasePointerCapture(event.pointerId); } catch { /* optional */ }
      if (this.pointers.size === 1) {
        const remaining = Array.from(this.pointers.entries())[0];
        this.pointer = { x: remaining[1].x, y: remaining[1].y, id: remaining[0] };
        this.dragging = true;
        this.pinch = null;
        this.clearInertia();
      } else {
        this.dragging = false;
        this.pointer = null;
        this.pinch = null;
        canvas.classList.remove("dragging");
        canvas.classList.remove("pinching");
        if (event.type === "pointercancel") this.clearInertia();
        else this.releaseInertia(event.timeStamp);
        this.idleAt = nowMs() + 9000;
        this.requestIdleResume();
      }
      this.dirty = true;
      this.schedule();
    };
    canvas.addEventListener("pointerup", end);
    canvas.addEventListener("pointercancel", end);
    canvas.addEventListener("lostpointercapture", (event) => {
      if (!this.pointers.has(event.pointerId)) return;
      this.pointers.delete(event.pointerId);
      if (this.pointers.size === 1) {
        const remaining = Array.from(this.pointers.entries())[0];
        this.pointer = { x: remaining[1].x, y: remaining[1].y, id: remaining[0] };
        this.dragging = true;
        this.pinch = null;
      } else {
        this.dragging = false;
        this.pointer = null;
        this.pinch = null;
        canvas.classList.remove("dragging");
        canvas.classList.remove("pinching");
        this.idleAt = nowMs() + 9000;
        this.requestIdleResume();
      }
      this.clearInertia();
      this.dirty = true;
      this.schedule();
    });
    canvas.addEventListener("wheel", (event) => {
      event.preventDefault();
      this.hideControlHint();
      this.zoomBy(event.deltaY < 0 ? 0.10 : -0.10);
      this.state.autoRotate = false;
      this.idleAt = nowMs() + 9000;
      this.requestIdleResume();
      this.dirty = true;
      this.schedule();
    }, { passive: false });
    canvas.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        const panelOpen = this.selectionPanel && !this.selectionPanel.panel.hidden;
        if (panelOpen || this.selectedPart >= 0) {
          this.closeInspection();
          event.preventDefault();
          event.stopPropagation();
        }
        return;
      }
      let handled = true;
      if (event.key === "ArrowLeft") this.rotate(-18, 0);
      else if (event.key === "ArrowRight") this.rotate(18, 0);
      else if (event.key === "ArrowUp") this.rotate(0, -14);
      else if (event.key === "ArrowDown") this.rotate(0, 14);
      else if (event.key === "+" || event.key === "=") this.zoomBy(0.10);
      else if (event.key === "-" || event.key === "_") this.zoomBy(-0.10);
      else if (event.key === "0" || event.key.toLowerCase() === "r") this.resetView();
      else handled = false;
      if (handled) {
        event.preventDefault();
        this.hideControlHint();
        this.state.autoRotate = false;
        this.idleAt = nowMs() + 9000;
        this.requestIdleResume();
        this.dirty = true;
        this.schedule();
      }
    });
    canvas.addEventListener("dblclick", () => { this.hideControlHint(); this.resetView(); this.dirty = true; this.schedule(); });
  };

  BaseScene.prototype.closeInspection = function () {
    if (this.selectionPanel) this.selectionPanel.panel.hidden = true;
    this.selectedRecord = null;
    this.selectedCluster = null;
    this.markSelectedMarker();
    if (typeof this.selectPart === "function" && this.selectedPart >= 0) this.selectPart(-1);
    this.dirty = true;
    this.schedule();
  };

  BaseScene.prototype.bindControls = function () {
    this.mount.querySelectorAll("[data-scene-control]").forEach((button) => {
      button.addEventListener("click", () => {
        const action = button.getAttribute("data-scene-control");
        this.hideControlHint();
        if (action === "left") this.rotate(-20, 0);
        else if (action === "right") this.rotate(20, 0);
        else if (action === "in") this.zoomBy(0.12);
        else if (action === "out") this.zoomBy(-0.12);
        else this.resetView();
        this.state.autoRotate = false;
        this.idleAt = nowMs() + 9000;
        this.requestIdleResume();
        this.dirty = true;
        this.schedule();
      });
    });
  };

  BaseScene.prototype.bindObservers = function () {
    if ("IntersectionObserver" in w) {
      this.observer = new IntersectionObserver((entries) => {
        this.visible = !!(entries[0] && entries[0].isIntersecting);
        if (this.visible) this.schedule();
        else this.stop();
      }, { rootMargin: "120px" });
      this.observer.observe(this.mount);
    }
    doc.addEventListener("visibilitychange", this._visibility);
    w.addEventListener("resize", this._resize);
    if ("ResizeObserver" in w) {
      this.resizeObserver = new ResizeObserver((entries) => this.onResize(entries));
      this.resizeObserver.observe(this.frame);
    }
  };

  BaseScene.prototype.onVisibility = function () {
    if (doc.hidden) this.stop();
    else this.schedule();
  };

  BaseScene.prototype.stop = function () {
    if (this.raf) w.cancelAnimationFrame(this.raf);
    this.raf = 0;
  };

  // Releases every GPU object this scene owns. setup() is the only place that
  // allocates them, so disposing first means a rebuild (context restoration,
  // scene change) neither reuses stale handles nor leaks the previous set.
  BaseScene.prototype.dispose = function () {
    const gl = this.gl;
    if (!gl) return;
    const sets = [this.sphere, this.starBuffers, this.galaxyBuffers, this.dustBuffers, this.mesh];
    if (this.ringBuffers) sets.push.apply(sets, this.ringBuffers);
    sets.forEach(function (set) {
      if (!set) return;
      Object.keys(set).forEach(function (key) {
        const value = set[key];
        if (value && typeof value === "object" && gl.isBuffer(value)) gl.deleteBuffer(value);
      });
    });
    if (this.texture && gl.isTexture(this.texture)) gl.deleteTexture(this.texture);
    [this.planetProgram, this.starProgram, this.meshProgram].forEach(function (program) {
      if (program && gl.isProgram(program)) gl.deleteProgram(program);
    });
    this.sphere = null;
    this.starBuffers = null;
    this.galaxyBuffers = null;
    this.ringBuffers = null;
    this.dustBuffers = null;
    this.mesh = null;
    this.texture = null;
    this.planetProgram = null;
    this.starProgram = null;
    this.meshProgram = null;
    this.planetUniforms = null;
    this.starUniforms = null;
    this.meshUniforms = null;
  };

  BaseScene.prototype.bindLanguage = function () {
    doc.addEventListener("languagechange", this._language);
  };

  BaseScene.prototype.bindQualityLabel = function () {
    this.qualityLabel = el("span", "scene-quality");
    const rail = this.mount.querySelector(".scene-rail") || this.frame;
    rail.appendChild(this.qualityLabel);
    this.updateQualityLabel();
  };

  BaseScene.prototype.updateQualityLabel = function () {
    if (!this.qualityLabel) return;
    const key = this.lowFps ? "qualityAdaptive" : ("quality" + FF3D.quality.charAt(0).toUpperCase() + FF3D.quality.slice(1));
    const fallback = this.lowFps ? "3D · adaptive" : ("3D · " + FF3D.quality);
    this.qualityLabel.textContent = t(key, fallback);
    this.qualityLabel.setAttribute("title", t("qualityHint", "Adaptive rendering quality"));
  };

  BaseScene.prototype.refreshLanguage = function () {
    this.updateQualityLabel();
    this.updateMarkerLabels();
    this.updateSelection();
    this.updateRecordList();
    if (typeof this.updateComponentPanel === "function") this.updateComponentPanel();
    if (this.fallbackReason) this.showFallback(this.fallbackReason, this.fallbackDetail, true);
    this.dirty = true;
    this.schedule();
  };

  BaseScene.prototype.clearInertia = function () {
    this.velocity.yaw = 0;
    this.velocity.pitch = 0;
    this.pointerSamples = [];
  };

  BaseScene.prototype.trackPointer = function (x, y, stamp) {
    const t = typeof stamp === "number" && stamp > 0 ? stamp : nowMs();
    this.pointerSamples.push({ x: x, y: y, t: t });
    while (this.pointerSamples.length > 12) this.pointerSamples.shift();
    while (this.pointerSamples.length > 2 && t - this.pointerSamples[0].t > 140) this.pointerSamples.shift();
  };

  BaseScene.prototype.releaseInertia = function (stamp) {
    const samples = this.pointerSamples || [];
    if (samples.length < 2) { this.clearInertia(); return; }
    const latest = samples[samples.length - 1];
    const end = typeof stamp === "number" && stamp > 0 ? stamp : latest.t;
    if (end - latest.t > 90) { this.clearInertia(); return; }
    let first = latest;
    for (let i = samples.length - 1; i >= 0; i--) {
      if (end - samples[i].t <= 120) first = samples[i];
      else break;
    }
    const elapsed = (latest.t - first.t) / 1000;
    if (elapsed < 0.012) { this.clearInertia(); return; }
    const sensitivity = this.sensitivity || 0.0055;
    const yaw = ((latest.x - first.x) * sensitivity) / elapsed;
    const pitch = (-(latest.y - first.y) * sensitivity * 0.82) / elapsed;
    this.velocity.yaw = clamp(yaw, -4.5, 4.5);
    this.velocity.pitch = clamp(pitch, -3.2, 3.2);
    this.pointerSamples = [];
    this.state.autoRotate = false;
    this.dirty = true;
    this.schedule();
  };

  BaseScene.prototype.rotate = function (dx, dy, withInertia) {
    const sensitivity = this.sensitivity || 0.0055;
    this.target.yaw += dx * sensitivity;
    this.target.pitch = clamp(this.target.pitch - dy * sensitivity * 0.82, -1.15, 1.15);
    if (!withInertia) this.clearInertia();
    this.state.autoRotate = false;
    this.dirty = true;
  };

  BaseScene.prototype.zoomTo = function (value) {
    this.target.zoom = clamp(value, 0, 0.86);
    this.clearInertia();
    this.state.autoRotate = false;
    this.dirty = true;
  };

  BaseScene.prototype.zoomBy = function (delta) {
    this.zoomTo(this.target.zoom + delta);
  };

  BaseScene.prototype.resetView = function () {
    this.state.yaw = this.initialYaw || 0;
    this.state.pitch = this.initialPitch === undefined ? 0.12 : this.initialPitch;
    this.state.zoom = 0;
    this.target.yaw = this.state.yaw;
    this.target.pitch = this.state.pitch;
    this.target.zoom = 0;
    this.clearInertia();
    this.state.autoRotate = !REDUCED;
    this.storyProgress = null;
    this.idleAt = 0;
    this.dirty = true;
    this.schedule();
  };

  BaseScene.prototype.setStoryProgress = function (progress) {
    this.storyProgress = clamp(progress, 0, 1);
    const startYaw = this.initialYaw === undefined ? 0 : this.initialYaw;
    const startPitch = this.initialPitch === undefined ? 0.12 : this.initialPitch;
    this.target.yaw = startYaw + this.storyProgress * 0.82;
    this.target.pitch = clamp(startPitch + this.storyProgress * 0.12, -1.15, 1.15);
    this.target.zoom = this.storyProgress * 0.20;
    this.state.autoRotate = false;
    this.clearInertia();
    this.dirty = true;
    this.schedule();
  };

  BaseScene.prototype.distance = function (base) {
    return (base || this.baseDistance) * (1 - 0.45 * this.state.zoom);
  };

  BaseScene.prototype.modelMatrix = function () {
    return M.multiply(M.rotationX(this.state.pitch), M.rotationY(this.state.yaw));
  };

  BaseScene.prototype.viewProjection = function (distance, fov) {
    const aspect = this.viewport.cssWidth / Math.max(1, this.viewport.cssHeight);
    const projection = M.perspective(fov || this.fov, aspect, 0.08, 120);
    const view = M.lookAt([0, 0, distance], [0, 0, 0], [0, 1, 0]);
    return M.multiply(projection, view);
  };

  BaseScene.prototype.project = function (viewProj, point) {
    const x = point[0], y = point[1], z = point[2];
    const clipX = viewProj[0] * x + viewProj[4] * y + viewProj[8] * z + viewProj[12];
    const clipY = viewProj[1] * x + viewProj[5] * y + viewProj[9] * z + viewProj[13];
    const clipW = viewProj[3] * x + viewProj[7] * y + viewProj[11] * z + viewProj[15];
    if (clipW <= 0.0001) return null;
    const ndcX = clipX / clipW, ndcY = clipY / clipW;
    return {
      x: (ndcX * 0.5 + 0.5) * this.viewport.cssWidth,
      y: (-ndcY * 0.5 + 0.5) * this.viewport.cssHeight,
      z: clipW
    };
  };

  // ------------------------------------------------------------ markers + records
  BaseScene.prototype.ensureMarkers = function () {
    this.markerButtons = [];
    const records = RECORDS.filter((record) => record.world === this.world && record.lat != null && record.lon != null);
    const clusters = [];
    records.forEach((record) => {
      const key = this.world + "|" + Math.round(record.lat * 100) + "|" + Math.round(record.lon * 100);
      let cluster = clusters.find((item) => item.key === key);
      if (!cluster) { cluster = { key: key, records: [], lat: 0, lon: 0 }; clusters.push(cluster); }
      cluster.records.push(record);
      cluster.lat += record.lat;
      cluster.lon += record.lon;
    });
    clusters.forEach((cluster) => { cluster.lat /= cluster.records.length; cluster.lon /= cluster.records.length; });
    const used = new Set();
    clusters.forEach((cluster, index) => {
      const primary = cluster.records[0];
      let button = this.frame.querySelector('[data-scene-marker="' + primary.id + '"]');
      if (!button) {
        button = el("button", "scene-marker");
        button.type = "button";
        button.setAttribute("data-scene-marker", primary.id);
        this.frame.appendChild(button);
      }
      used.add(button);
      button.hidden = false;
      button.setAttribute("data-marker-index", String(index + 1));
      if (!button.dataset.boundScene) {
        button.dataset.boundScene = "1";
        button.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          this.selectCluster(cluster);
        });
      }
      this.markerButtons.push({ button: button, cluster: cluster, record: primary });
    });
    this.frame.querySelectorAll(".scene-marker").forEach((button) => {
      if (!used.has(button)) button.hidden = true;
    });
    this.updateMarkerLabels();
  };

  BaseScene.prototype.updateMarkerLabels = function () {
    this.markerButtons.forEach((entry) => {
      const cluster = entry.cluster;
      let label;
      if (cluster.records.length > 1) {
        label = recordField(cluster.records[0], "location") + " — " + cluster.records.length + " " + t("sceneRecords", "records");
      } else {
        const record = entry.record;
        label = recordName(record) + " — " + typeLabel(record) + " — " + statusLabel(record.status);
      }
      entry.button.setAttribute("aria-label", label);
      entry.button.setAttribute("title", label);
    });
  };

  BaseScene.prototype.ensureRecordList = function () {
    if (this.recordList) return;
    if (this.kind === "artifact") return;
    const records = RECORDS.filter((record) => record.world === this.world);
    if (!records.length) {
      this.recordList = el("div", "scene-record-list scene-record-empty");
      const note = el("span", "scene-record-note", t("sceneNoRecords", "No verified record is plotted in this gallery yet."));
      const link = el("a", "scene-record-archive-link", t("navArchive", "The archive"));
      link.href = archiveHref(this.world === "deep" ? "#world-deep" : "");
      this.recordList.append(note, link);
      this.mount.appendChild(this.recordList);
      return;
    }
    this.recordList = el("div", "scene-record-list");
    records.forEach((record) => {
      const link = el("a");
      link.href = dossierHref(record.id);
      link.setAttribute("data-record-id", record.id);
      if (record.lat == null || record.lon == null) link.classList.add("is-unplotted");
      this.recordList.appendChild(link);
    });
    this.mount.appendChild(this.recordList);
    this.updateRecordList();
  };

  BaseScene.prototype.updateRecordList = function () {
    if (!this.recordList) return;
    this.recordList.querySelectorAll("[data-record-id]").forEach((link) => {
      const record = RECORDS.find((item) => item.id === link.getAttribute("data-record-id"));
      if (!record) return;
      const plotted = record.lat != null && record.lon != null;
      link.textContent = recordName(record) + (plotted ? "" : " · " + t("sceneNotPlotted", "location not plotted"));
      link.title = typeLabel(record) + " · " + statusLabel(record.status);
    });
    const note = this.recordList.querySelector(".scene-record-note");
    if (note) note.textContent = t("sceneNoRecords", "No verified record is plotted in this gallery yet.");
    const archiveLink = this.recordList.querySelector(".scene-record-archive-link");
    if (archiveLink) archiveLink.textContent = t("navArchive", "The archive");
  };

  BaseScene.prototype.ensureSelection = function () {
    if (this.selectionPanel) return;
    const panel = el("aside", "scene-selection");
    panel.hidden = true;
    panel.setAttribute("aria-live", "polite");
    const close = el("button", "scene-selection-close", "×");
    close.type = "button";
    close.setAttribute("aria-label", t("close", "Close"));
    close.addEventListener("click", () => { panel.hidden = true; this.selectedRecord = null; this.selectedCluster = null; this.markSelectedMarker(); });
    const tag = el("span", "record-tag");
    const title = el("h3");
    const meta = el("p", "scene-selection-meta");
    const body = el("p", "scene-selection-body");
    const links = el("div", "scene-selection-links");
    panel.append(close, tag, title, meta, body, links);
    this.frame.appendChild(panel);
    this.selectionPanel = { panel: panel, tag: tag, title: title, meta: meta, body: body, links: links };
  };

  BaseScene.prototype.selectCluster = function (cluster) {
    this.selectedCluster = cluster;
    this.selectedRecord = cluster && cluster.records ? cluster.records[0] : null;
    this.ensureSelection();
    this.updateSelection();
    this.markSelectedMarker();
    this.selectionPanel.panel.hidden = false;
  };

  BaseScene.prototype.selectRecord = function (record) {
    this.selectCluster({ key: record.id, records: [record], lat: record.lat, lon: record.lon });
  };

  BaseScene.prototype.updateSelection = function () {
    if (!this.selectionPanel || !this.selectedCluster) return;
    const records = this.selectedCluster.records;
    const primary = records[0];
    const panel = this.selectionPanel;
    if (records.length > 1) {
      panel.tag.textContent = t("sceneSiteKicker", "SITE CLUSTER") + " · " + records.length + " " + t("sceneRecords", "records");
      panel.title.textContent = recordField(primary, "location");
      panel.meta.textContent = Array.from(new Set(records.map((record) => recordField(record, "mission")))).join(" · ");
      panel.body.textContent = records.map((record) => recordName(record) + " — " + statusLabel(record.status)).join("  ·  ");
    } else {
      panel.tag.textContent = recordTypeLabel(primary) + " · " + statusLabel(primary.status);
      panel.title.textContent = recordName(primary);
      panel.meta.textContent = typeLabel(primary) + " · " + recordField(primary, "mission");
      panel.body.textContent = recordField(primary, "location") + " — " + recordField(primary, "locationConfidence");
    }
    panel.links.textContent = "";
    records.forEach((record) => {
      const link = el("a", "scene-selection-link", recordName(record));
      link.href = dossierHref(record.id);
      panel.links.appendChild(link);
    });
  };

  BaseScene.prototype.markSelectedMarker = function () {
    const ids = this.selectedCluster ? this.selectedCluster.records.map((record) => record.id) : [];
    this.markerButtons.forEach((entry) => {
      const match = entry.cluster.records.some((record) => ids.indexOf(record.id) >= 0);
      entry.button.classList.toggle("is-selected", match);
    });
  };

  BaseScene.prototype.updateMarkers = function (model, viewProj, camera) {
    this.markerButtons.forEach((entry) => {
      const lat = entry.cluster.lat * Math.PI / 180;
      const lon = entry.cluster.lon * Math.PI / 180;
      const point = [Math.cos(lat) * Math.cos(lon), Math.sin(lat), Math.cos(lat) * Math.sin(lon)];
      const world = M.transformPoint(model, point);
      const normal = M.transformPoint(model, [point[0], point[1], point[2]]);
      const toCamera = [camera[0] - world[0], camera[1] - world[1], camera[2] - world[2]];
      const length = Math.hypot(toCamera[0], toCamera[1], toCamera[2]) || 1;
      const front = (normal[0] * toCamera[0] + normal[1] * toCamera[1] + normal[2] * toCamera[2]) / length;
      const projected = this.project(viewProj, world);
      const visible = !!projected && front > 0.015 && projected.x > -20 && projected.x < this.viewport.cssWidth + 20 && projected.y > -20 && projected.y < this.viewport.cssHeight + 20;
      entry.button.hidden = !visible;
      if (visible) {
        entry.button.style.left = projected.x.toFixed(1) + "px";
        entry.button.style.top = projected.y.toFixed(1) + "px";
        entry.button.setAttribute("data-cluster-count", String(entry.cluster.records.length));
      }
    });
  };

  BaseScene.prototype.ensureFallbackDetail = function () {
    const fallback = this.frame.querySelector("[data-scene-fallback]");
    if (!fallback) return null;
    let detail = fallback.querySelector(".scene-fallback-detail");
    if (!detail) {
      detail = el("small", "scene-fallback-detail");
      fallback.appendChild(detail);
    }
    return detail;
  };

  BaseScene.prototype.fallbackMessage = function (reason) {
    return t({
      unsupported: "sceneNoWebGL",
      init: "sceneInitFailed",
      scene: "sceneSceneFailed",
      asset: "sceneAssetFailed",
      contextlost: "sceneContextLost"
    }[reason] || "sceneFallback", t("sceneFallback", "The 3D exhibit is unavailable, but the records remain below."));
  };

  BaseScene.prototype.showFallback = function (reason, detail, quiet) {
    this.fallbackReason = reason;
    this.fallbackDetail = detail || "";
    this.mount.classList.add("webgl-fallback");
    this.mount.classList.remove("webgl-ready");
    this.mount.setAttribute("data-webgl-state", reason);
    const fallback = this.frame.querySelector("[data-scene-fallback]");
    if (fallback) {
      fallback.hidden = false;
      fallback.textContent = this.fallbackMessage(reason);
      const detailNode = this.ensureFallbackDetail();
      if (detailNode) {
        detailNode.textContent = reason === "unsupported"
          ? t("sceneNoWebGLOffer", "Use the archive and dossier pages to continue; all sourced records remain available.")
          : t("sceneErrorDetail", "The archive and record links remain available. Technical details are logged in the browser console.");
      }
    }
    this.frame.classList.add("is-fallback");
    const art = { moon: "moon-surface.svg", mars: "mars-dustfront.svg", deep: "deep-field.svg", artifact: "component-study.svg" }[this.kind] || "deep-field.svg";
    // The custom property is consumed inside src/css/platform.css, so this URL
    // is resolved relative to the stylesheet, not the page.
    this.frame.style.setProperty("--scene-fallback-image", "url('../../src/assets/" + art + "')");
    this.stop();
    this.ensureRecordList();
    if (detail && !quiet) console.error("Forgotten Footprints 3D " + reason + ":", detail);
  };

  BaseScene.prototype.hideFallback = function () {
    this.fallbackReason = null;
    this.fallbackDetail = "";
    this.mount.classList.remove("webgl-fallback");
    this.mount.classList.add("webgl-ready");
    this.mount.setAttribute("data-webgl-state", "ok");
    this.frame.classList.remove("is-fallback");
    this.frame.style.removeProperty("--scene-fallback-image");
    const fallback = this.frame.querySelector("[data-scene-fallback]");
    if (fallback) { fallback.hidden = true; fallback.textContent = t("sceneFallback", "The 3D exhibit is unavailable, but the records remain below."); }
  };

  BaseScene.prototype.onContextLost = function (event) {
    event.preventDefault();
    this.contextLost = true;
    this.stop();
    this.showFallback("contextlost", "webglcontextlost");
  };

  // The browser fires this after a lost context has been restored. Every GPU
  // handle from before the loss is dead, so setup() rebuilds from scratch and
  // the mount returns to its normal state only once that rebuild succeeded.
  BaseScene.prototype.onContextRestored = function () {
    if (!this.gl) return;
    this.contextLost = false;
    try {
      this.setup();
      this.lastError = "";
      this.hideFallback();
      this.dirty = true;
      this.schedule();
    } catch (error) {
      this.lastError = String(error && error.message || error);
      this.showFallback("init", this.lastError);
    }
  };

  // ------------------------------------------------------------ planet scene
  function PlanetScene(mount, kind) {
    BaseScene.call(this, mount, kind);
    this.world = kind;
    this.initialYaw = kind === "moon" ? 0.0 : 0.16;
    this.initialPitch = 0.11;
    this.state.yaw = this.initialYaw;
    this.state.pitch = this.initialPitch;
    this.state.zoom = 0;
    this.state.autoRotate = !REDUCED;
    this.baseDistance = 3.15;
    if (!this.createContext()) return;
    try {
      this.setup();
    } catch (error) {
      this.lastError = String(error && error.message || error);
      this.showFallback(this.lastError.indexOf("texture") >= 0 || this.lastError.indexOf("2D") >= 0 ? "asset" : "init", this.lastError);
      return;
    }
    this.attach();
  }
  PlanetScene.prototype = Object.create(BaseScene.prototype);
  PlanetScene.prototype.constructor = PlanetScene;

  PlanetScene.prototype.setup = function () {
    const gl = this.gl;
    this.dispose();
    this.stage = "programs";
    this.setupPrograms();
    this.stage = "textures";
    const profile = QUALITY[FF3D.quality];
    this.texture = uploadTexture(gl, this.world === "moon" ? paintMoon(profile.textureW, profile.textureH) : paintMars(profile.textureW, profile.textureH));
    this.stage = "geometry";
    this.starBuffers = null;
    this.starCount = 0;
    this.setupSphere();
    this.setupStars(profile.stars, this.world === "moon" ? 1101 : 2203, 11, 20);
    this.stage = "markers";
    this.ensureMarkers();
    this.ensureRecordList();
    this.modelInfo = { triangles: this.sphere.count / 3, stars: this.starCount };
  };

  PlanetScene.prototype.draw = function () {
    const gl = this.gl;
    this.applyViewport();
    this.clear();
    const distance = this.distance(this.baseDistance);
    this.viewProj = this.viewProjection(distance, this.fov);
    // Stars first, with depth disabled so the planet occludes them.
    this.enablePoints();
    gl.disable(gl.BLEND);
    gl.enable(gl.DEPTH_TEST);
    const model = this.modelMatrix();
    gl.useProgram(this.planetProgram);
    gl.uniformMatrix4fv(this.planetUniforms.uModel, false, model);
    gl.uniformMatrix4fv(this.planetUniforms.uViewProj, false, this.viewProj);
    gl.uniformMatrix3fv(this.planetUniforms.uNormalMat, false, writeNormalMat(this.normalMat, model));
    gl.uniform3f(this.planetUniforms.uLightDir, -0.52, 0.48, 0.72);
    gl.uniform3f(this.planetUniforms.uCamera, 0, 0, distance);
    gl.uniform3f(this.planetUniforms.uAtmoColor, this.world === "mars" ? 0.62 : 0.36, this.world === "mars" ? 0.40 : 0.38, this.world === "mars" ? 0.34 : 0.39);
    gl.uniform1f(this.planetUniforms.uAtmoStrength, this.world === "mars" ? 0.34 : 0.08);
    gl.uniform1f(this.planetUniforms.uRoughness, this.world === "mars" ? 0.86 : 1.0);
    gl.uniform1f(this.planetUniforms.uEmissive, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.uniform1i(this.planetUniforms.uTexture, 0);
    const aPosition = attrib(gl, this.planetProgram, "aPosition");
    const aNormal = attrib(gl, this.planetProgram, "aNormal");
    const aUV = attrib(gl, this.planetProgram, "aUV");
    gl.bindBuffer(gl.ARRAY_BUFFER, this.sphere.positions);
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.sphere.normals);
    gl.enableVertexAttribArray(aNormal);
    gl.vertexAttribPointer(aNormal, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.sphere.uvs);
    gl.enableVertexAttribArray(aUV);
    gl.vertexAttribPointer(aUV, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.sphere.indices);
    gl.drawElements(gl.TRIANGLES, this.sphere.count, gl.UNSIGNED_SHORT, 0);
    this.updateMarkers(model, this.viewProj, [0, 0, distance]);
  };

  // ------------------------------------------------------------ deep space scene
  function DeepScene(mount) {
    BaseScene.call(this, mount, "deep");
    this.world = "deep";
    this.initialYaw = 0.42;
    this.initialPitch = 0.14;
    this.state.yaw = this.initialYaw;
    this.state.pitch = this.initialPitch;
    this.state.autoRotate = !REDUCED;
    this.baseDistance = 8.4;
    if (!this.createContext()) return;
    try {
      this.setup();
    } catch (error) {
      this.lastError = String(error && error.message || error);
      this.showFallback("init", this.lastError);
      return;
    }
    this.attach();
  }
  DeepScene.prototype = Object.create(BaseScene.prototype);
  DeepScene.prototype.constructor = DeepScene;

  DeepScene.prototype.setup = function () {
    const gl = this.gl;
    this.dispose();
    this.setupPrograms();
    this.setupSphere();
    const profile = QUALITY[FF3D.quality];
    this.texture = uploadTexture(gl, paintSun());
    this.starBuffers = this.createPointBuffers(buildStars(profile.stars + 700, 7717, 12, 22));
    this.starCount = profile.stars + 700;
    this.galaxyBuffers = this.createPointBuffers(buildGalaxy(520, 9901));
    this.galaxyCount = 520;
    this.ringBuffers = [
      this.createPointBuffers(buildRing(220, 3.8, [0.36, 0.62, 0.78])),
      this.createPointBuffers(buildRing(240, 4.4, [0.30, 0.52, 0.68])),
      this.createPointBuffers(buildRing(260, 5.0, [0.24, 0.44, 0.60]))
    ];
    this.ringCounts = [220, 240, 260];
    this.ensureLegend();
    this.modelInfo = { triangles: this.sphere.count / 3, stars: this.starCount + this.galaxyCount + 720 };
  };

  DeepScene.prototype.draw = function () {
    const gl = this.gl;
    this.applyViewport();
    this.clear();
    const distance = this.distance(this.baseDistance);
    const eye = [
      Math.sin(this.state.yaw) * Math.cos(this.state.pitch) * distance,
      Math.sin(this.state.pitch) * distance,
      Math.cos(this.state.yaw) * Math.cos(this.state.pitch) * distance
    ];
    const projection = M.perspective(this.fov, this.viewport.cssWidth / Math.max(1, this.viewport.cssHeight), 0.08, 120);
    this.viewProj = M.multiply(projection, M.lookAt(eye, [0, 0, 0], [0, 1, 0]));
    this.enablePoints();
    gl.disable(gl.BLEND);
    gl.enable(gl.DEPTH_TEST);
    gl.useProgram(this.starProgram);
    gl.uniformMatrix4fv(this.starUniforms.uViewProj, false, this.viewProj);
    gl.uniform1f(this.starUniforms.uPixelRatio, this.viewport.dpr);
    this.bindStarBuffers(this.galaxyBuffers);
    gl.drawArrays(gl.POINTS, 0, this.galaxyCount);
    this.ringBuffers.forEach((buffers, index) => {
      this.bindStarBuffers(buffers);
      gl.drawArrays(gl.POINTS, 0, this.ringCounts[index]);
    });
    // The Sun is a small emissive sphere at the schematic centre.
    gl.useProgram(this.planetProgram);
    const sunModel = M.scaling(0.34, 0.34, 0.34);
    gl.uniformMatrix4fv(this.planetUniforms.uModel, false, sunModel);
    gl.uniformMatrix4fv(this.planetUniforms.uViewProj, false, this.viewProj);
    gl.uniformMatrix3fv(this.planetUniforms.uNormalMat, false, IDENTITY3);
    gl.uniform3f(this.planetUniforms.uLightDir, 0, 1, 0);
    gl.uniform3f(this.planetUniforms.uCamera, eye[0], eye[1], eye[2]);
    gl.uniform3f(this.planetUniforms.uAtmoColor, 1, 0.8, 0.4);
    gl.uniform1f(this.planetUniforms.uAtmoStrength, 0.0);
    gl.uniform1f(this.planetUniforms.uRoughness, 1.0);
    gl.uniform1f(this.planetUniforms.uEmissive, 1.0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.uniform1i(this.planetUniforms.uTexture, 0);
    const aPosition = attrib(gl, this.planetProgram, "aPosition");
    const aNormal = attrib(gl, this.planetProgram, "aNormal");
    const aUV = attrib(gl, this.planetProgram, "aUV");
    gl.bindBuffer(gl.ARRAY_BUFFER, this.sphere.positions);
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.sphere.normals);
    gl.enableVertexAttribArray(aNormal);
    gl.vertexAttribPointer(aNormal, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.sphere.uvs);
    gl.enableVertexAttribArray(aUV);
    gl.vertexAttribPointer(aUV, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.sphere.indices);
    gl.drawElements(gl.TRIANGLES, this.sphere.count, gl.UNSIGNED_SHORT, 0);
  };

  DeepScene.prototype.ensureLegend = function () {
    if (this.legend) return;
    const legend = el("div", "deep-legend");
    const title = el("p", "deep-legend-title", t("deepLegendTitle", "Deep-space field guide"));
    legend.appendChild(title);
    [
      ["deepLegendStars", "Stars — a procedural field, not a star catalogue"],
      ["deepLegendSun", "Sun — schematic centre of the field"],
      ["deepLegendHeliopause", "Heliopause rings — schematic, not to scale"],
      ["deepLegendGap", "No verified deep-space artifact coordinate is plotted in this build"]
    ].forEach(([key, fallback]) => {
      const row = el("p", "deep-legend-row");
      const dot = el("span", "deep-legend-dot");
      const text = el("span", "", t(key, fallback));
      row.append(dot, text);
      legend.appendChild(row);
    });
    const link = el("a", "deep-legend-link", t("deepArchiveLink", "Open the deep-space archive"));
    link.href = archiveHref("#world-deep");
    legend.appendChild(link);
    this.frame.appendChild(legend);
    this.legend = legend;
  };

  DeepScene.prototype.refreshLanguage = function () {
    BaseScene.prototype.refreshLanguage.call(this);
    if (this.legend) {
      const title = this.legend.querySelector(".deep-legend-title");
      if (title) title.textContent = t("deepLegendTitle", "Deep-space field guide");
      const rows = this.legend.querySelectorAll(".deep-legend-row span:last-child");
      const keys = ["deepLegendStars", "deepLegendSun", "deepLegendHeliopause", "deepLegendGap"];
      const fallbacks = [
        "Stars — a procedural field, not a star catalogue",
        "Sun — schematic centre of the field",
        "Heliopause rings — schematic, not to scale",
        "No verified deep-space artifact coordinate is plotted in this build"
      ];
      rows.forEach((node, index) => { if (keys[index]) node.textContent = t(keys[index], fallbacks[index]); });
      const link = this.legend.querySelector(".deep-legend-link");
      if (link) link.textContent = t("deepArchiveLink", "Open the deep-space archive");
    }
  };

  // ------------------------------------------------------------ artifact scene
  function ArtifactScene(mount) {
    BaseScene.call(this, mount, "artifact");
    this.world = "artifact";
    this.initialYaw = 0.55;
    this.initialPitch = 0.14;
    this.state.yaw = this.initialYaw;
    this.state.pitch = this.initialPitch;
    this.state.autoRotate = !REDUCED;
    this.baseDistance = 4.55;
    this.record = null;
    this.hotspots = [];
    if (!this.createContext()) return;
    try {
      this.setup();
    } catch (error) {
      this.lastError = String(error && error.message || error);
      this.showFallback(this.lastError.indexOf("model") >= 0 ? "scene" : "init", this.lastError);
      return;
    }
    this.attach();
    this.hashHandler = () => { this.rebuildForHash(); };
    w.addEventListener("hashchange", this.hashHandler);
  }
  ArtifactScene.prototype = Object.create(BaseScene.prototype);
  ArtifactScene.prototype.constructor = ArtifactScene;

  ArtifactScene.prototype.recordFromHash = function () {
    let id = location.hash.slice(1);
    try { id = decodeURIComponent(id); } catch { /* keep literal */ }
    return RECORDS.find((record) => record.id === id) || RECORDS[0] || null;
  };

  ArtifactScene.prototype.setup = function () {
    const gl = this.gl;
    this.dispose();
    this.setupPrograms();
    this.meshProgram = linkProgram(gl, MESH_VS, MESH_FS, "artifact program");
    this.meshUniforms = getLocations(gl, this.meshProgram, ["uModel", "uViewProj", "uNormalMat", "uLightDir", "uCamera", "uSelected"]);
    this.dustCount = 0;
    this.starCount = 0;
    this.record = this.recordFromHash();
    if (!this.record) throw new Error("no artifact record available");
    this.buildModelBuffers();
    if (!this._attachedOnce) {
      this._attachedOnce = true;
      this.state.yaw = this.initialYaw;
      this.state.pitch = this.initialPitch;
    }
    this.ensureComponentPanel();
    this.ensureHotspots();
    this.updateHeading();
  };

  ArtifactScene.prototype.buildModelBuffers = function () {
    if (!this.record) return;
    if (!this.record.modelKind || !Models.build) throw new Error("artifact model kind is missing");
    const model = Models.build(this.record.modelKind, this.record);
    const yaws = { "lm-descent": 0.55, lrrr: 0.35, lrv: 0.72, "surveyor-lander": 0.55, "surveyor-camera": 0.02, opportunity: 0.62, "m20-backshell": 0.55, "mars3-lander": 0.55 };
    const pitches = { "lm-descent": 0.14, lrrr: 0.18, lrv: 0.22, "surveyor-lander": 0.14, "surveyor-camera": 0.10, opportunity: 0.20, "m20-backshell": 0.10, "mars3-lander": 0.12 };
    this.initialYaw = yaws[this.record.modelKind] === undefined ? 0.55 : yaws[this.record.modelKind];
    this.initialPitch = pitches[this.record.modelKind] === undefined ? 0.14 : pitches[this.record.modelKind];
    if (this.mesh) {
      const gl = this.gl;
      gl.deleteBuffer(this.mesh.positions);
      gl.deleteBuffer(this.mesh.normals);
      gl.deleteBuffer(this.mesh.colors);
      gl.deleteBuffer(this.mesh.parts);
      gl.deleteBuffer(this.mesh.indices);
    }
    const gl = this.gl;
    this.mesh = {
      positions: makeBuffer(gl, gl.ARRAY_BUFFER, model.positions),
      normals: makeBuffer(gl, gl.ARRAY_BUFFER, model.normals),
      colors: makeBuffer(gl, gl.ARRAY_BUFFER, model.colors),
      parts: makeBuffer(gl, gl.ARRAY_BUFFER, model.parts),
      indices: makeBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, model.indices),
      count: model.indices.length
    };
    this.model = model;
    this.modelInfo = {
      kind: this.record.modelKind,
      vertices: model.vertexCount,
      triangles: model.triangleCount,
      components: model.componentCount
    };
    this.selectedPart = -1;
  };

  ArtifactScene.prototype.ensureComponentPanel = function () {
    if (!this.componentPanel) {
      const panel = el("div", "component-panel");
      const kicker = el("p", "eyebrow");
      const buttons = el("div", "component-buttons");
      buttons.setAttribute("role", "group");
      buttons.setAttribute("aria-label", t("componentSelect", "Select a model component"));
      const detail = el("div", "component-detail");
      detail.setAttribute("aria-live", "polite");
      panel.append(kicker, buttons, detail);
      const controls = this.mount.querySelector(".scene-controls");
      if (controls && controls.parentElement) controls.parentElement.insertBefore(panel, controls.nextSibling);
      else this.mount.appendChild(panel);
      this.componentPanel = { panel: panel, kicker: kicker, buttons: buttons, detail: detail };
    }
    this.updateComponentPanel();
  };

  ArtifactScene.prototype.updateComponentPanel = function () {
    if (!this.componentPanel) return;
    const panel = this.componentPanel;
    const components = (this.record && this.record.components) || [];
    panel.kicker.textContent = t("componentKicker", "Exhibit components");
    panel.buttons.setAttribute("aria-label", t("componentSelect", "Select a model component"));
    panel.buttons.textContent = "";
    if (!components.length) {
      panel.detail.textContent = t("componentNone", "This model has no separated components.");
      return;
    }
    components.forEach((component, index) => {
      const button = el("button", "component-button");
      button.type = "button";
      button.setAttribute("aria-pressed", String(this.selectedPart === index));
      button.textContent = String(index + 1).padStart(2, "0") + " · " + (component.name[lang()] || component.name.en);
      button.addEventListener("click", () => this.selectPart(index));
      panel.buttons.appendChild(button);
    });
    if (this.selectedPart >= 0 && components[this.selectedPart]) {
      const component = components[this.selectedPart];
      const title = el("h3", "", component.name[lang()] || component.name.en);
      const copy = el("p", "", component.description[lang()] || component.description.en);
      const focus = el("button", "component-focus", t("componentFocus", "Focus component"));
      focus.type = "button";
      focus.addEventListener("click", () => this.focusPart(this.selectedPart));
      panel.detail.textContent = "";
      panel.detail.append(title, copy, focus);
    } else {
      panel.detail.textContent = t("componentHint", "Choose a component to inspect its role. The numbers on the model match this list.");
    }
  };

  ArtifactScene.prototype.ensureHotspots = function () {
    const components = (this.record && this.record.components) || [];
    this.hotspots.forEach((hotspot) => hotspot.remove());
    this.hotspots = [];
    components.forEach((component, index) => {
      const button = el("button", "component-hotspot", String(index + 1).padStart(2, "0"));
      button.type = "button";
      button.setAttribute("data-component", String(index));
      button.setAttribute("aria-pressed", "false");
      button.setAttribute("aria-label", component.name[lang()] || component.name.en);
      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.selectPart(index);
      });
      button.addEventListener("dblclick", (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.selectPart(index);
        this.focusPart(index);
      });
      this.frame.appendChild(button);
      this.hotspots.push(button);
    });
  };

  ArtifactScene.prototype.selectPart = function (index) {
    this.selectedPart = index;
    this.dirty = true;
    this.schedule();
    this.updateComponentPanel();
    this.hotspots.forEach((hotspot, i) => {
      hotspot.classList.toggle("is-selected", i === index);
      hotspot.setAttribute("aria-pressed", String(i === index));
    });
    if (this.componentPanel && this.record) {
      const component = this.record.components[index];
      if (component) {
        const panel = this.componentPanel;
        panel.buttons.querySelectorAll(".component-button").forEach((button, i) => button.setAttribute("aria-pressed", String(i === index)));
      }
    }
  };

  ArtifactScene.prototype.focusPart = function (index) {
    if (!this.model || !this.model.anchors[index]) return;
    const anchor = this.model.anchors[index];
    const radius = Math.hypot(anchor[0], anchor[2]);
    this.target.yaw = Math.atan2(-anchor[0], anchor[2]);
    this.target.pitch = clamp(Math.atan2(anchor[1], radius), -1.05, 1.05);
    this.target.zoom = Math.max(this.target.zoom, 0.16);
    this.storyProgress = null;
    this.state.autoRotate = false;
    this.clearInertia();
    this.dirty = true;
    this.schedule();
  };

  ArtifactScene.prototype.updateHeading = function () {
    const heading = this.mount.querySelector("[data-artifact-name]");
    if (!heading) return;
    const id = (() => { try { return decodeURIComponent(location.hash.slice(1)); } catch { return location.hash.slice(1); } })();
    const match = RECORDS.find((record) => record.id === id);
    heading.textContent = match ? recordName(match) : t("artifactDefaultName", "Select an artifact dossier");
  };

  ArtifactScene.prototype.resetView = function () {
    BaseScene.prototype.resetView.call(this);
    this.selectedPart = -1;
    this.updateComponentPanel();
    this.hotspots.forEach((hotspot) => {
      hotspot.classList.remove("is-selected");
      hotspot.setAttribute("aria-pressed", "false");
    });
    this.dirty = true;
    this.schedule();
  };

  ArtifactScene.prototype.refreshLanguage = function () {
    BaseScene.prototype.refreshLanguage.call(this);
    this.updateHeading();
    this.updateComponentPanel();
    this.hotspots.forEach((hotspot, index) => {
      const component = this.record && this.record.components[index];
      if (component) hotspot.setAttribute("aria-label", component.name[lang()] || component.name.en);
    });
  };

  ArtifactScene.prototype.rebuildForHash = function () {
    const next = this.recordFromHash();
    if (!next) return;
    const changed = !this.record || this.record.id !== next.id;
    this.record = next;
    if (changed) {
      try {
        this.buildModelBuffers();
        this.ensureHotspots();
        this.updateComponentPanel();
        this.updateHeading();
        this.selectedPart = -1;
        this.resetView();
        this.dirty = true;
        this.schedule();
      } catch (error) {        this.lastError = String(error && error.message || error);
        this.showFallback("scene", this.lastError);
      }
    }
  };

  ArtifactScene.prototype.draw = function () {
    const gl = this.gl;
    this.applyViewport();
    this.clear();
    const distance = this.distance(this.baseDistance);
    this.viewProj = this.viewProjection(distance, 38 * Math.PI / 180);
    this.drawBackdrop();
    const model = this.modelMatrix();
    gl.useProgram(this.meshProgram);
    gl.enable(gl.DEPTH_TEST);
    gl.disable(gl.BLEND);
    gl.uniformMatrix4fv(this.meshUniforms.uModel, false, model);
    gl.uniformMatrix4fv(this.meshUniforms.uViewProj, false, this.viewProj);
    gl.uniformMatrix3fv(this.meshUniforms.uNormalMat, false, writeNormalMat(this.normalMat, model));
    gl.uniform3f(this.meshUniforms.uLightDir, -0.55, 0.58, 0.64);
    gl.uniform3f(this.meshUniforms.uCamera, 0, 0, distance);
    gl.uniform1f(this.meshUniforms.uSelected, this.selectedPart);
    const aPosition = attrib(gl, this.meshProgram, "aPosition");
    const aNormal = attrib(gl, this.meshProgram, "aNormal");
    const aColor = attrib(gl, this.meshProgram, "aColor");
    const aPart = attrib(gl, this.meshProgram, "aPart");
    gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.positions);
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.normals);
    gl.enableVertexAttribArray(aNormal);
    gl.vertexAttribPointer(aNormal, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.colors);
    gl.enableVertexAttribArray(aColor);
    gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.parts);
    gl.enableVertexAttribArray(aPart);
    gl.vertexAttribPointer(aPart, 1, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.mesh.indices);
    gl.drawElements(gl.TRIANGLES, this.mesh.count, gl.UNSIGNED_SHORT, 0);
    this.updateHotspots(model);
  };

  ArtifactScene.prototype.drawBackdrop = function () {
    // The warm chamber light is CSS. A small deterministic dust field adds depth
    // without requiring an external skybox.
    if (!this.dustBuffers) {
      this.dustBuffers = this.createPointBuffers(buildStars(180, 31415, 3.2, 7.5));
      this.dustCount = 180;
    }
    this.starBuffers = this.dustBuffers;
    this.starCount = this.dustCount;
    // A model rebuild may leave attribute pointers aimed at deleted buffers.
    // Disable the mesh attributes before drawing the point-sprite field.
    if (this.meshProgram) {
      ["aPosition", "aNormal", "aColor", "aPart"].forEach((name) => {
        const location = attrib(this.gl, this.meshProgram, name);
        if (location >= 0) this.gl.disableVertexAttribArray(location);
      });
    }
    this.enablePoints();
    this.gl.disable(this.gl.BLEND);
  };

  ArtifactScene.prototype.updateHotspots = function (model) {
    const viewProj = this.viewProj;
    const anchors = (this.model && this.model.anchors) || [];
    this.hotspots.forEach((hotspot, index) => {
      const anchor = anchors[index];
      if (!anchor) { hotspot.hidden = true; return; }
      const world = M.transformPoint(model, anchor);
      const projected = this.project(viewProj, world);
      const visible = !!projected && world[2] > -0.35 && projected.x > -20 && projected.x < this.viewport.cssWidth + 20 && projected.y > -20 && projected.y < this.viewport.cssHeight + 20;
      hotspot.hidden = !visible;
      if (visible) {
        hotspot.style.left = projected.x.toFixed(1) + "px";
        hotspot.style.top = projected.y.toFixed(1) + "px";
      }
    });
  };

  // ------------------------------------------------------------ boot
  function boot() {
    const mounts = Array.from(doc.querySelectorAll("[data-museum-scene]"));
    mounts.forEach((mount) => {
      const kind = mount.getAttribute("data-museum-scene");
      let scene = null;
      try {
        if (kind === "moon" || kind === "mars") scene = new PlanetScene(mount, kind);
        else if (kind === "deep") scene = new DeepScene(mount);
        else if (kind === "artifact") scene = new ArtifactScene(mount);
        else throw new Error("unknown museum scene: " + kind);
      } catch (error) {
        mount.classList.add("webgl-fallback");
        mount.setAttribute("data-webgl-state", "scene");
        const fallback = mount.querySelector("[data-scene-fallback]");
        if (fallback) {
          fallback.hidden = false;
          fallback.textContent = t("sceneSceneFailed", "The 3D exhibit could not start. The archive and record links remain available.");
        }
        console.error("Museum scene initialization failed", error);
      }
      if (scene) {
        FF3D.scenes.push(scene);
        if (scene.destroy) { /* reserved for page lifecycle */ }
      }
    });
  }

  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", boot);
  else boot();
}(window));
