/* Forgotten Footprints — procedural exhibit geometry.
   Plain browser script. Produces recognisable, conceptual 3D assemblies.
   The models are illustrative, not engineering reconstructions. */
(function (global) {
  "use strict";

  // ---------------------------------------------------------------- math
  function identity() {
    return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  }
  function multiply(a, b) {
    const out = new Float32Array(16);
    for (let c = 0; c < 4; c++) {
      for (let r = 0; r < 4; r++) {
        out[c * 4 + r] =
          a[r] * b[c * 4] +
          a[4 + r] * b[c * 4 + 1] +
          a[8 + r] * b[c * 4 + 2] +
          a[12 + r] * b[c * 4 + 3];
      }
    }
    return out;
  }
  function translation(x, y, z) {
    const m = identity();
    m[12] = x; m[13] = y; m[14] = z;
    return m;
  }
  function scaling(x, y, z) {
    const m = identity();
    m[0] = x; m[5] = y; m[10] = z;
    return m;
  }
  function rotationX(a) {
    const c = Math.cos(a), s = Math.sin(a), m = identity();
    m[5] = c; m[6] = s; m[9] = -s; m[10] = c;
    return m;
  }
  function rotationY(a) {
    const c = Math.cos(a), s = Math.sin(a), m = identity();
    m[0] = c; m[2] = -s; m[8] = s; m[10] = c;
    return m;
  }
  function rotationZ(a) {
    const c = Math.cos(a), s = Math.sin(a), m = identity();
    m[0] = c; m[1] = s; m[4] = -s; m[5] = c;
    return m;
  }
  function perspective(fovy, aspect, near, far) {
    const f = 1 / Math.tan(fovy / 2), nf = 1 / (near - far), out = new Float32Array(16);
    out[0] = f / aspect; out[5] = f; out[10] = (far + near) * nf; out[11] = -1;
    out[14] = 2 * far * near * nf;
    return out;
  }
  function normalize3(v) {
    const l = Math.hypot(v[0], v[1], v[2]) || 1;
    return [v[0] / l, v[1] / l, v[2] / l];
  }
  function cross(a, b) {
    return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  }
  function lookAt(eye, target, up) {
    const zAxis = normalize3([eye[0] - target[0], eye[1] - target[1], eye[2] - target[2]]);
    const xAxis = normalize3(cross(up, zAxis));
    const yAxis = cross(zAxis, xAxis);
    return new Float32Array([
      xAxis[0], yAxis[0], zAxis[0], 0,
      xAxis[1], yAxis[1], zAxis[1], 0,
      xAxis[2], yAxis[2], zAxis[2], 0,
      -xAxis[0] * eye[0] - xAxis[1] * eye[1] - xAxis[2] * eye[2],
      -yAxis[0] * eye[0] - yAxis[1] * eye[1] - yAxis[2] * eye[2],
      -zAxis[0] * eye[0] - zAxis[1] * eye[1] - zAxis[2] * eye[2], 1
    ]);
  }
  function basisFromY(direction, origin) {
    const y = normalize3(direction);
    const helper = Math.abs(y[1]) > 0.95 ? [1, 0, 0] : [0, 1, 0];
    const x = normalize3(cross(helper, y));
    const z = cross(x, y);
    return new Float32Array([
      x[0], x[1], x[2], 0,
      y[0], y[1], y[2], 0,
      z[0], z[1], z[2], 0,
      origin[0], origin[1], origin[2], 1
    ]);
  }
  function transformPoint(m, p) {
    const x = p[0], y = p[1], z = p[2];
    return [
      m[0] * x + m[4] * y + m[8] * z + m[12],
      m[1] * x + m[5] * y + m[9] * z + m[13],
      m[2] * x + m[6] * y + m[10] * z + m[14]
    ];
  }
  function transformDir(m, p) {
    const x = p[0], y = p[1], z = p[2];
    return normalize3([
      m[0] * x + m[4] * y + m[8] * z,
      m[1] * x + m[5] * y + m[9] * z,
      m[2] * x + m[6] * y + m[10] * z
    ]);
  }

  // ---------------------------------------------------------------- mesh builder
  function MeshBuilder() {
    this.positions = [];
    this.normals = [];
    this.colors = [];
    this.parts = [];
    this.indices = [];
    this.part = -1;
  }
  MeshBuilder.prototype.beginPart = function (index) { this.part = index; };
  MeshBuilder.prototype.vertex = function (p, n, c) {
    const i = this.positions.length / 3;
    this.positions.push(p[0], p[1], p[2]);
    this.normals.push(n[0], n[1], n[2]);
    this.colors.push(c[0], c[1], c[2]);
    this.parts.push(this.part);
    return i;
  };
  MeshBuilder.prototype.tri = function (a, b, c) { this.indices.push(a, b, c); };
  MeshBuilder.prototype.quad = function (a, b, c, d) {
    this.indices.push(a, b, c, a, c, d);
  };
  MeshBuilder.prototype.face = function (matrix, points, normal, color) {
    const n = transformDir(matrix, normal);
    const ids = points.map((p) => this.vertex(transformPoint(matrix, p), n, color));
    this.quad(ids[0], ids[1], ids[2], ids[3]);
  };
  MeshBuilder.prototype.addBox = function (matrix, w, h, d, color) {
    const x = w / 2, y = h / 2, z = d / 2;
    this.face(matrix, [[-x, -y, z], [x, -y, z], [x, y, z], [-x, y, z]], [0, 0, 1], color);
    this.face(matrix, [[x, -y, -z], [-x, -y, -z], [-x, y, -z], [x, y, -z]], [0, 0, -1], color);
    this.face(matrix, [[x, -y, z], [x, -y, -z], [x, y, -z], [x, y, z]], [1, 0, 0], color);
    this.face(matrix, [[-x, -y, -z], [-x, -y, z], [-x, y, z], [-x, y, -z]], [-1, 0, 0], color);
    this.face(matrix, [[-x, y, z], [x, y, z], [x, y, -z], [-x, y, -z]], [0, 1, 0], color);
    this.face(matrix, [[-x, -y, -z], [x, -y, -z], [x, -y, z], [-x, -y, z]], [0, -1, 0], color);
  };
  MeshBuilder.prototype.addCylinder = function (matrix, radiusBottom, radiusTop, height, segments, color, caps) {
    if (caps === undefined) caps = true;
    const half = height / 2;
    const side = [];
    for (let i = 0; i <= segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      const ca = Math.cos(a), sa = Math.sin(a);
      const slope = (radiusBottom - radiusTop) / Math.max(height, 0.0001);
      const n = transformDir(matrix, normalize3([ca, slope, sa]));
      const bottom = this.vertex(transformPoint(matrix, [ca * radiusBottom, -half, sa * radiusBottom]), n, color);
      const top = this.vertex(transformPoint(matrix, [ca * radiusTop, half, sa * radiusTop]), n, color);
      side.push([bottom, top]);
    }
    for (let i = 0; i < segments; i++) {
      const a = side[i], b = side[i + 1];
      this.quad(a[0], b[0], b[1], a[1]);
    }
    if (caps) {
      const bottomCenter = this.vertex(transformPoint(matrix, [0, -half, 0]), transformDir(matrix, [0, -1, 0]), color);
      const topCenter = this.vertex(transformPoint(matrix, [0, half, 0]), transformDir(matrix, [0, 1, 0]), color);
      const bottomRing = [], topRing = [];
      for (let i = 0; i < segments; i++) {
        const a = (i / segments) * Math.PI * 2;
        const ca = Math.cos(a), sa = Math.sin(a);
        bottomRing.push(this.vertex(transformPoint(matrix, [ca * radiusBottom, -half, sa * radiusBottom]), transformDir(matrix, [0, -1, 0]), color));
        topRing.push(this.vertex(transformPoint(matrix, [ca * radiusTop, half, sa * radiusTop]), transformDir(matrix, [0, 1, 0]), color));
      }
      for (let i = 0; i < segments; i++) {
        const j = (i + 1) % segments;
        this.tri(bottomCenter, bottomRing[j], bottomRing[i]);
        this.tri(topCenter, topRing[i], topRing[j]);
      }
    }
  };
  MeshBuilder.prototype.addCylinderBetween = function (a, b, radius, color, segments, radiusTop) {
    const dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    const length = Math.hypot(dx, dy, dz);
    if (length < 0.0001) return;
    const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2];
    const matrix = basisFromY([dx, dy, dz], mid);
    this.addCylinder(matrix, radius, radiusTop === undefined ? radius : radiusTop, length, segments || 8, color, true);
  };
  MeshBuilder.prototype.addStrut = function (a, b, radius, color, segments) {
    this.addCylinderBetween(a, b, radius, color, segments || 8);
  };
  MeshBuilder.prototype.addSphere = function (matrix, radius, segments, rings, color) {
    const grid = [];
    for (let y = 0; y <= rings; y++) {
      const v = y / rings;
      const phi = (v - 0.5) * Math.PI;
      const row = [];
      for (let x = 0; x <= segments; x++) {
        const u = x / segments;
        const theta = u * Math.PI * 2;
        const n = [Math.cos(phi) * Math.cos(theta), Math.sin(phi), Math.cos(phi) * Math.sin(theta)];
        const p = [n[0] * radius, n[1] * radius, n[2] * radius];
        row.push(this.vertex(transformPoint(matrix, p), transformDir(matrix, n), color));
      }
      grid.push(row);
    }
    for (let y = 0; y < rings; y++) {
      for (let x = 0; x < segments; x++) {
        this.quad(grid[y][x], grid[y][x + 1], grid[y + 1][x + 1], grid[y + 1][x]);
      }
    }
  };
  MeshBuilder.prototype.addDome = function (matrix, radius, height, segments, rings, colorA, colorB) {
    const grid = [];
    for (let r = 0; r <= rings; r++) {
      const t = r / rings;
      const theta = t * Math.PI / 2;
      const rho = radius * Math.sin(theta);
      const y = height * Math.cos(theta);
      const row = [];
      for (let s = 0; s <= segments; s++) {
        const phi = (s / segments) * Math.PI * 2;
        const p = [rho * Math.cos(phi), y, rho * Math.sin(phi)];
        const n = normalize3([p[0] / (radius * radius), p[1] / (height * height), p[2] / (radius * radius)]);
        row.push(this.vertex(transformPoint(matrix, p), transformDir(matrix, n), s % 2 === 0 ? colorA : colorB));
      }
      grid.push(row);
    }
    for (let r = 0; r < rings; r++) {
      for (let s = 0; s < segments; s++) {
        this.quad(grid[r][s], grid[r + 1][s], grid[r + 1][s + 1], grid[r][s + 1]);
      }
    }
  };
  MeshBuilder.prototype.addDisc = function (matrix, radius, segments, color) {
    this.addCylinder(matrix, radius, radius, 0.035, segments || 24, color, true);
  };
  MeshBuilder.prototype.addWheel = function (cx, cy, cz, radius, width, tire, hub, tread, treadCount) {
    const matrix = multiply(translation(cx, cy, cz), rotationZ(Math.PI / 2));
    this.addCylinder(matrix, radius, radius, width, 22, tire);
    this.addCylinder(multiply(translation(cx, cy, cz), rotationZ(Math.PI / 2)), radius * 0.56, radius * 0.56, width * 1.03, 16, hub);
    const count = treadCount || 18;
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const py = cy + Math.cos(a) * radius * 0.985;
      const pz = cz + Math.sin(a) * radius * 0.985;
      this.addBox(multiply(translation(cx, py, pz), rotationX(a)), width * 0.96, 0.055, 0.11, tread);
    }
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      this.addStrut([cx, cy + Math.cos(a) * radius * 0.12, cz + Math.sin(a) * radius * 0.12], [cx, cy + Math.cos(a) * radius * 0.52, cz + Math.sin(a) * radius * 0.52], 0.014, tread, 4);
    }
    this.addCylinder(multiply(translation(cx + width * 0.53, cy, cz), rotationZ(Math.PI / 2)), radius * 0.18, radius * 0.18, 0.035, 12, tread, true);
    this.addCylinder(multiply(translation(cx - width * 0.53, cy, cz), rotationZ(Math.PI / 2)), radius * 0.18, radius * 0.18, 0.035, 12, tread, true);
  };
  // A spoked open wheel: rim, hub, crossed wire spokes and a chevron tread.
  // Used for the lightweight wire-mesh wheels of the Apollo Lunar Roving Vehicle.
  MeshBuilder.prototype.addMeshWheel = function (cx, cy, cz, radius, width, rim, hub, spoke, tread, spokes, treadCount) {
    const axis = rotationZ(Math.PI / 2);
    this.addCylinder(multiply(translation(cx, cy, cz), axis), radius, radius, width, 24, rim);
    this.addCylinder(multiply(translation(cx, cy, cz), axis), radius * 0.30, radius * 0.30, width * 1.08, 16, hub);
    const spokeCount = spokes || 18;
    for (let i = 0; i < spokeCount; i++) {
      const a = (i / spokeCount) * Math.PI * 2;
      const r0 = radius * 0.30, r1 = radius * 0.93;
      this.addStrut(
        [cx, cy + Math.cos(a) * r0, cz + Math.sin(a) * r0],
        [cx, cy + Math.cos(a + 0.30) * r1, cz + Math.sin(a + 0.30) * r1],
        0.009, spoke, 3);
    }
    const treads = treadCount || 18;
    for (let i = 0; i < treads; i++) {
      const a = (i / treads) * Math.PI * 2;
      const py = cy + Math.cos(a) * radius * 0.985;
      const pz = cz + Math.sin(a) * radius * 0.985;
      const at = multiply(translation(cx, py, pz), rotationX(a));
      this.addBox(at, width * 0.98, 0.045, 0.09, tread);
      this.addBox(multiply(at, rotationZ(0.44)), width * 0.98, 0.028, 0.055, spoke);
    }
    this.addCylinder(multiply(translation(cx + width * 0.55, cy, cz), axis), radius * 0.15, radius * 0.15, 0.04, 12, tread, true);
    this.addCylinder(multiply(translation(cx - width * 0.55, cy, cz), axis), radius * 0.15, radius * 0.15, 0.04, 12, tread, true);
  };
  // A curved band of small plates, used for fenders and protective arcs.
  // Sweeps the upper half of a circle in the Y/Z plane around (cx, cy, cz).
  MeshBuilder.prototype.addFenderArc = function (cx, cy, cz, radius, width, thickness, segments, color, colorEdge) {
    const count = segments || 9;
    const span = Math.PI * 0.96;
    const start = -Math.PI / 2 - span / 2;
    const step = span / (count - 1);
    for (let i = 0; i < count; i++) {
      const a = start + i * step;
      const y = cy + Math.cos(a) * radius;
      const z = cz + Math.sin(a) * radius;
      const c = (colorEdge && i % 2 === 0) ? colorEdge : color;
      this.addBox(multiply(translation(cx, y, z), rotationX(a)), width, thickness, radius * step * 1.20, c);
    }
  };
  // A grid of shallow plates that reads as quilted thermal insulation.
  MeshBuilder.prototype.addQuilt = function (matrix, width, height, cols, rows, colorA, colorB, depth) {
    const dep = depth === undefined ? 0.05 : depth;
    const cw = width / cols, ch = height / rows;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = (i + 0.5) * cw - width / 2;
        const y = (j + 0.5) * ch - height / 2;
        this.addBox(multiply(matrix, translation(x, y, 0)), cw * 0.90, ch * 0.90, dep, (i + j) % 2 ? colorA : colorB);
      }
    }
  };

  // ---------------------------------------------------------------- palettes
  const C = {
    gold: [0.68, 0.49, 0.23],
    goldLight: [0.78, 0.59, 0.29],
    goldDark: [0.48, 0.34, 0.15],
    silver: [0.66, 0.69, 0.69],
    silverLight: [0.79, 0.81, 0.80],
    dark: [0.16, 0.18, 0.19],
    black: [0.07, 0.08, 0.09],
    blue: [0.15, 0.26, 0.45],
    blueLight: [0.24, 0.42, 0.64],
    panel: [0.23, 0.28, 0.34],
    white: [0.84, 0.84, 0.79],
    orange: [0.80, 0.40, 0.16],
    red: [0.50, 0.19, 0.14],
    copper: [0.55, 0.32, 0.17],
    lens: [0.10, 0.36, 0.45],
    marsTan: [0.55, 0.37, 0.25],
    // Materials added for recognisability. Colour is the only material
    // channel the mesh shader exposes, so surfaces are distinguished by
    // tone: bright tones read as polished metal, dark tones as bare structure.
    aluminum: [0.72, 0.74, 0.73],
    aluminumDark: [0.46, 0.48, 0.49],
    graphite: [0.20, 0.21, 0.23],
    blanket: [0.74, 0.55, 0.26],
    blanketDark: [0.52, 0.37, 0.17],
    solar: [0.13, 0.20, 0.36],
    solarEdge: [0.30, 0.44, 0.60],
    dust: [0.44, 0.38, 0.31],
    dustLight: [0.55, 0.48, 0.39],
    canopy: [0.84, 0.50, 0.24],
    canopyAlt: [0.86, 0.84, 0.78],
    harness: [0.88, 0.87, 0.82],
    glass: [0.12, 0.30, 0.36]
  };

  // ---------------------------------------------------------------- models
  function lmDescent() {
    const b = new MeshBuilder();
    // Part 0 — Descent-stage structure: the load-bearing frame, upper deck and
    // stowed equipment that the blanket skin is wrapped around. Only the
    // descent stage is modelled; the ascent stage is deliberately absent.
    b.beginPart(0);
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
      b.addBox(multiply(rotationY(a), translation(0, 0.0, 1.50)), 0.07, 1.16, 0.07, C.aluminumDark);
    }
    b.addCylinder(translation(0, 0.70, 0), 1.16, 1.16, 0.11, 8, C.aluminumDark);
    b.addCylinder(translation(0, -0.70, 0), 1.48, 1.48, 0.09, 8, C.aluminumDark);
    b.addCylinder(translation(0, 0.80, 0), 0.82, 0.82, 0.09, 14, C.aluminum);
    b.addCylinder(translation(0, 0.87, 0), 0.62, 0.62, 0.05, 14, C.graphite);
    b.addBox(translation(0, 0.93, 0), 0.30, 0.09, 0.26, C.dark);
    b.addBox(translation(1.02, 0.72, -0.82), 0.40, 0.26, 0.32, C.aluminum);
    b.addBox(translation(-1.02, 0.70, -0.84), 0.34, 0.22, 0.28, C.aluminum);
    b.addBox(translation(0, 0.74, -1.28), 0.56, 0.20, 0.22, C.aluminumDark);
    b.beginPart(1);
    // Part 1 — Landing legs, footpads and surface-contact probes.
    const legTops = [];
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
      const ca = Math.cos(a), sa = Math.sin(a);
      const top = [ca * 1.40, -0.26, sa * 1.40];
      const mid = [ca * 1.96, -0.72, sa * 1.96];
      const foot = [ca * 2.32, -1.03, sa * 2.32];
      legTops.push(top);
      b.addCylinderBetween(top, foot, 0.085, C.aluminum, 8);
      b.addCylinderBetween(top, mid, 0.072, C.aluminumDark, 7);
      b.addCylinderBetween([ca * 1.24, 0.08, sa * 1.24], mid, 0.045, C.silver, 6);
      b.addCylinderBetween([ca * 1.14, -0.60, sa * 1.14], mid, 0.038, C.silver, 5);
      b.addCylinder(translation(foot[0], foot[1] - 0.02, foot[2]), 0.31, 0.29, 0.10, 16, C.aluminum);
      b.addCylinder(translation(foot[0], foot[1] + 0.06, foot[2]), 0.20, 0.24, 0.10, 14, C.aluminumDark);
      for (let j = 0; j < 8; j++) {
        const ga = (j / 8) * Math.PI * 2;
        b.addBox(translation(foot[0] + Math.cos(ga) * 0.26, foot[1] - 0.07, foot[2] + Math.sin(ga) * 0.26), 0.08, 0.03, 0.12, j % 2 ? C.silver : C.aluminumDark);
      }
      // Contact probe: a slender rod that hung below each footpad and stowed on
      // touchdown, signalling surface contact to the crew. It is modelled near
      // vertical, as on the flown vehicle.
      b.addCylinderBetween([ca * 2.30, -1.08, sa * 2.30], [ca * 2.40, -1.60, sa * 2.40], 0.016, C.silverLight, 4);
      b.addCylinder(translation(ca * 2.40, -1.64, sa * 2.40), 0.045, 0.026, 0.08, 6, C.silverLight);
    }
    for (let i = 0; i < 4; i++) {
      const a = legTops[i], c = legTops[(i + 1) % 4];
      b.addCylinderBetween([a[0] * 0.86, a[1] + 0.08, a[2] * 0.86], [c[0] * 0.86, c[1] + 0.08, c[2] * 0.86], 0.034, C.silver, 5);
    }
    b.beginPart(2);
    // Part 2 — Descent engine: thrust chamber, extending bell, feed lines and
    // the plume deflectors that protected the stage from exhaust.
    b.addCylinder(translation(0, -0.90, 0), 0.52, 0.46, 0.30, 20, C.aluminumDark);
    b.addCylinder(translation(0, -1.20, 0), 0.60, 0.30, 0.90, 24, C.graphite);
    b.addCylinder(translation(0, -1.64, 0), 0.62, 0.62, 0.06, 24, C.copper);
    for (const y of [-0.84, -1.04, -1.24, -1.44]) {
      b.addCylinder(translation(0, y, 0), 0.50 + (y + 0.84) * 0.245, 0.51 + (y + 0.84) * 0.245, 0.022, 24, C.silver);
    }
    b.addCylinder(translation(0, -1.69, 0), 0.45, 0.31, 0.08, 24, C.black);
    b.addCylinderBetween([0.36, -0.52, 0.20], [0.22, -1.02, 0.12], 0.032, C.copper, 6);
    b.addCylinderBetween([-0.36, -0.52, -0.20], [-0.22, -1.02, -0.12], 0.032, C.copper, 6);
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
      b.addBox(multiply(rotationY(a), translation(0, -1.22, 0.94)), 0.44, 0.30, 0.035, C.blanket);
      b.addBox(multiply(rotationY(a), translation(0, -1.62, 0.62)), 0.20, 0.24, 0.03, C.blanketDark);
    }
    b.beginPart(3);
    // Part 3 — Ladder and porch on the port face.
    b.addStrut([-1.86, -0.98, 0.30], [-1.86, 0.74, 0.30], 0.035, C.silverLight, 6);
    b.addStrut([-1.86, -0.98, 0.82], [-1.86, 0.74, 0.82], 0.035, C.silverLight, 6);
    for (let y = -0.88; y <= 0.66; y += 0.22) b.addStrut([-1.86, y, 0.30], [-1.86, y, 0.82], 0.024, C.silver, 5);
    b.addBox(translation(-1.72, 0.78, 0.56), 0.50, 0.08, 0.92, C.aluminum);
    b.addStrut([-1.55, 0.80, 0.18], [-1.55, 1.14, 0.18], 0.025, C.silver);
    b.addStrut([-1.55, 0.80, 0.94], [-1.55, 1.14, 0.94], 0.025, C.silver);
    b.addStrut([-1.55, 1.14, 0.18], [-1.55, 1.14, 0.94], 0.025, C.silver);
    b.addStrut([-1.92, 0.80, 0.18], [-1.92, 1.14, 0.18], 0.016, C.silverLight);
    b.addStrut([-1.92, 0.80, 0.94], [-1.92, 1.14, 0.94], 0.016, C.silverLight);
    b.beginPart(4);
    // Part 4 — Thermal blanket: the gold insulation wrapped over the frame.
    b.addCylinder(identity(), 1.54, 1.54, 1.22, 8, C.blanket);
    b.addCylinder(translation(0, 0.615, 0), 1.58, 1.58, 0.10, 8, C.blanketDark);
    b.addCylinder(translation(0, -0.615, 0), 1.56, 1.56, 0.09, 8, C.blanketDark);
    for (let i = 0; i < 4; i++) {
      const turn = multiply(rotationY((i / 4) * Math.PI * 2), translation(0, 0.02, 1.52));
      b.addQuilt(turn, 1.26, 0.92, 3, 3, C.blanket, C.blanketDark, 0.05);
      b.addBox(multiply(rotationY((i / 4) * Math.PI * 2), translation(0.68, 0.02, 1.50)), 0.09, 1.06, 0.05, C.goldLight);
      b.addBox(multiply(rotationY((i / 4) * Math.PI * 2), translation(-0.68, 0.02, 1.50)), 0.09, 1.06, 0.05, C.goldLight);
    }
    return b;
  }

  function lrv() {
    const b = new MeshBuilder();
    // Part 0 — Chassis: the tubular frame, floor pan and stowed equipment.
    // The Apollo Lunar Roving Vehicle carried four wheels, not six.
    b.beginPart(0);
    for (const z of [-0.60, 0.60]) {
      b.addStrut([-1.30, 0.0, z], [1.30, 0.0, z], 0.045, C.aluminum, 7);
      b.addStrut([-1.30, -0.22, z], [1.30, -0.22, z], 0.030, C.aluminumDark, 6);
    }
    for (const x of [-1.28, 0, 1.28]) b.addStrut([x, 0.0, -0.60], [x, 0.0, 0.60], 0.040, C.aluminum, 6);
    b.addBox(translation(0, -0.04, 0), 2.40, 0.09, 1.10, C.aluminumDark);
    b.addBox(translation(0, 0.02, 0), 0.90, 0.10, 0.76, C.panel);
    b.addBox(translation(-0.52, -0.19, 0), 0.76, 0.20, 1.00, C.graphite);
    b.addBox(translation(0.62, -0.19, 0), 0.60, 0.20, 1.00, C.panel);
    b.addBox(translation(0.98, 0.10, 0.72), 0.34, 0.26, 0.26, C.gold);
    b.addBox(translation(0.98, 0.10, -0.72), 0.34, 0.26, 0.26, C.gold);
    for (const x of [-0.90, 0.20]) b.addBox(translation(x, 0.06, 0.62), 0.30, 0.14, 0.10, C.goldDark);
    // Cable runs along the frame.
    b.addCylinderBetween([-1.20, 0.06, 0.64], [1.24, 0.06, 0.64], 0.012, C.copper, 4);
    b.addCylinderBetween([-1.20, -0.06, -0.64], [1.24, -0.06, -0.64], 0.012, C.copper, 4);
    b.beginPart(1);
    // Part 1 — Wheels and suspension: four wire-mesh wheels on trailing arms
    // with torsion-bar springing and a drive motor at each hub.
    const wheelY = -0.30, wheelR = 0.34;
    for (const x of [-1.28, 1.28]) {
      for (const z of [-0.66, 0.66]) {
        b.addMeshWheel(x, wheelY, z, wheelR, 0.24, C.aluminumDark, C.silver, C.silverLight, C.graphite, 14, 14);
        b.addCylinder(multiply(translation(x * 0.62, -0.06, z * 0.62), rotationZ(Math.PI / 2)), 0.10, 0.10, 0.22, 10, C.goldDark);
        b.addStrut([x * 0.55, -0.05, z * 0.55], [x, wheelY, z], 0.042, C.aluminum, 6);
        b.addStrut([x * 0.55, -0.14, z * 0.55], [x * 0.86, wheelY, z * 0.86], 0.028, C.aluminumDark, 5);
        b.addCylinderBetween([x * 0.98, -0.02, z * 0.72], [x, wheelY + 0.12, z], 0.018, C.silver, 4);
      }
    }
    b.addStrut([-1.14, -0.12, 0], [1.14, -0.12, 0], 0.035, C.aluminum, 6);
    b.addCylinder(translation(0, -0.14, 0), 0.10, 0.10, 0.30, 10, C.goldDark);
    b.beginPart(2);
    // Part 2 — Seats and controls: two seats, footrests, the T-handle and the
    // instrument console.
    for (const z of [-0.34, 0.34]) {
      b.addBox(translation(-0.18, 0.36, z), 0.52, 0.10, 0.44, C.panel);
      b.addBox(translation(-0.42, 0.56, z), 0.10, 0.42, 0.44, C.panel);
      b.addBox(translation(-0.40, 0.76, z), 0.06, 0.08, 0.40, C.goldDark);
      b.addBox(translation(0.14, 0.16, z), 0.26, 0.05, 0.30, C.aluminumDark);
      b.addStrut([-0.02, 0.08, z], [-0.02, 0.34, z], 0.026, C.silverLight, 5);
      b.addStrut([-0.30, 0.30, z], [-0.34, 0.62, z], 0.022, C.silverLight, 4);
    }
    b.addBox(translation(0.06, 0.30, 0), 0.30, 0.14, 0.42, C.dark);
    b.addBox(translation(0.06, 0.38, 0), 0.24, 0.02, 0.34, C.lens);
    b.addStrut([0.24, 0.18, 0], [0.24, 0.58, 0], 0.024, C.silverLight, 6);
    b.addBox(translation(0.24, 0.62, 0), 0.16, 0.06, 0.06, C.dark);
    b.addBox(translation(0.24, 0.68, 0), 0.20, 0.04, 0.04, C.silver);
    b.addBox(translation(0.34, 0.68, 0), 0.06, 0.04, 0.18, C.silver);
    b.addCylinderBetween([0.24, 0.66, 0.0], [0.24, 0.62, 0.0], 0.02, C.copper, 4);
    b.beginPart(3);
    // Part 3 — Antenna and navigation: the steerable high-gain dish and a
    // low-gain whip, with the navigation equipment box.
    b.addStrut([0.55, 0.10, -0.52], [0.55, 1.00, -0.52], 0.028, C.silverLight, 6);
    b.addSphere(multiply(translation(0.55, 1.00, -0.52), scaling(0.055, 0.055, 0.055)), 1, 8, 6, C.silver);
    b.addCylinder(multiply(translation(0.55, 1.06, -0.52), rotationX(Math.PI / 2)), 0.21, 0.08, 0.10, 16, C.white);
    b.addCylinder(multiply(translation(0.55, 1.06, -0.58), rotationX(Math.PI / 2)), 0.07, 0.07, 0.05, 10, C.dark);
    b.addStrut([0.55, 0.30, -0.52], [0.86, 0.22, -0.52], 0.014, C.silverLight, 4);
    b.addStrut([0.55, 0.30, -0.52], [0.24, 0.22, -0.52], 0.014, C.silverLight, 4);
    b.addStrut([-0.95, 0.14, -0.52], [-0.95, 0.86, -0.52], 0.014, C.silverLight, 4);
    b.addBox(translation(-0.45, 0.20, -0.55), 0.32, 0.28, 0.26, C.graphite);
    b.addBox(translation(-0.45, 0.36, -0.55), 0.22, 0.04, 0.18, C.lens);
    b.addStrut([-0.45, 0.34, -0.55], [-0.72, 0.30, -0.55], 0.012, C.copper, 4);
    b.beginPart(4);
    // Part 4 — Fenders and tool carriers: protective fenders over each wheel
    // plus the sample and tool carriers on the forward frame.
    for (const x of [-1.28, 1.28]) {
      for (const z of [-0.66, 0.66]) {
        b.addFenderArc(x, wheelY, z, 0.44, 0.34, 0.028, 9, C.aluminum, C.aluminumDark);
        b.addStrut([x, wheelY + 0.42, z - 0.30], [x, wheelY + 0.42, z + 0.30], 0.014, C.silver, 4);
      }
    }
    b.addBox(translation(-0.92, 0.28, 0.44), 0.42, 0.16, 0.34, C.gold);
    b.addBox(translation(-0.92, 0.28, -0.44), 0.42, 0.16, 0.34, C.gold);
    for (const z of [0.44, -0.44]) {
      b.addStrut([-1.08, 0.20, z], [-1.08, 0.44, z], 0.015, C.silver, 4);
      b.addStrut([-0.76, 0.20, z], [-0.76, 0.44, z], 0.015, C.silver, 4);
    }
    b.addStrut([-1.08, 0.44, 0.44], [-1.08, 0.44, -0.44], 0.015, C.silver, 4);
    b.addBox(translation(1.10, 0.34, 0.0), 0.30, 0.16, 0.72, C.goldDark);
    return b;
  }

  function surveyorLander(record) {
    const b = new MeshBuilder();
    // Part 0 — Lander bus: the central structure, its thermal covering, the
    // equipment panels and the shock-absorbing leg attachment frame.
    b.beginPart(0);
    b.addBox(translation(0, 0.05, 0), 1.25, 0.84, 1.05, C.aluminum);
    b.addBox(translation(0, 0.05, 0.55), 1.02, 0.56, 0.05, C.blanket);
    b.addBox(translation(0, 0.05, -0.55), 1.02, 0.56, 0.05, C.blanketDark);
    b.addBox(translation(0.55, 0.05, 0), 0.05, 0.60, 0.90, C.blanket);
    b.addBox(translation(-0.55, 0.05, 0), 0.05, 0.60, 0.90, C.blanketDark);
    for (const x of [-0.52, 0.52]) {
      b.addBox(translation(x, 0.10, 0.53), 0.028, 0.55, 0.028, C.silverLight);
      b.addBox(translation(x, 0.10, -0.53), 0.028, 0.55, 0.028, C.silverLight);
    }
    b.addBox(translation(0.36, 0.20, -0.55), 0.44, 0.26, 0.05, C.graphite);
    for (let i = -1; i <= 1; i++) b.addBox(translation(0.36, 0.20 + i * 0.08, -0.58), 0.34, 0.02, 0.02, C.silver);
    b.addBox(translation(-0.30, 0.10, -0.47), 0.30, 0.48, 0.05, C.goldDark);
    b.addBox(translation(0, 0.50, 0.02), 1.08, 0.05, 0.76, C.goldLight);
    b.addCylinder(multiply(translation(0.62, 0.16, 0.16), rotationZ(Math.PI / 2)), 0.12, 0.12, 0.20, 12, C.graphite);
    b.addStrut([-0.55, 0.25, 0.48], [-0.95, 0.10, 0.85], 0.035, C.silverLight, 5);
    b.addBox(translation(-1.02, 0.05, 0.9), 0.18, 0.16, 0.20, C.goldDark);
    b.addStrut([-0.95, 0.10, 0.85], [-1.22, 0.05, 0.96], 0.025, C.silver, 4);
    b.addBox(translation(-1.28, 0.05, 0.98), 0.12, 0.08, 0.10, C.silver);
    b.beginPart(1);
    // Part 1 — Solar panel: a single flat array on a lightweight frame.
    b.addBox(translation(0, 0.72, 0), 1.75, 0.05, 1.18, C.solar);
    b.addBox(translation(0, 0.695, 0), 1.82, 0.02, 1.24, C.aluminumDark);
    for (let i = -3; i <= 3; i++) b.addBox(translation(i * 0.24, 0.749, 0), 0.012, 0.008, 1.14, C.solarEdge);
    for (let i = -2; i <= 2; i++) b.addBox(translation(0, 0.749, i * 0.22), 1.70, 0.008, 0.012, C.solarEdge);
    for (const z of [-0.58, 0.58]) b.addBox(translation(0, 0.70, z), 1.80, 0.03, 0.03, C.aluminum);
    for (const x of [-0.86, 0.86]) b.addStrut([x, 0.55, 0.40], [x, 0.68, 0.0], 0.020, C.silver, 4);
    b.beginPart(2);
    // Part 2 — Landing legs: three legs with footpads and crushable struts.
    const legBases = [];
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2 + Math.PI / 2;
      const ca = Math.cos(a), sa = Math.sin(a);
      const top = [ca * 0.55, -0.35, sa * 0.55];
      legBases.push([ca * 0.62, -0.42, sa * 0.62]);
      const mid = [ca * 1.05, -0.72, sa * 1.05];
      const foot = [ca * 1.45, -1.02, sa * 1.45];
      b.addCylinderBetween(top, foot, 0.07, C.aluminum, 8);
      b.addCylinderBetween([ca * 0.45, 0.0, sa * 0.45], mid, 0.045, C.silver, 6);
      b.addCylinderBetween([ca * 0.62, -0.42, sa * 0.62], mid, 0.035, C.dark, 5);
      b.addCylinderBetween(mid, foot, 0.045, C.aluminumDark, 6);
      b.addCylinder(translation(foot[0], foot[1] - 0.02, foot[2]), 0.25, 0.24, 0.075, 16, C.aluminum);
      for (let j = 0; j < 6; j++) {
        const ga = (j / 6) * Math.PI * 2;
        b.addBox(translation(foot[0] + Math.cos(ga) * 0.20, foot[1] - 0.05, foot[2] + Math.sin(ga) * 0.20), 0.07, 0.03, 0.10, C.aluminumDark);
      }
      b.addCylinder(translation(foot[0], foot[1] + 0.06, foot[2]), 0.08, 0.08, 0.08, 8, C.gold);
    }
    for (let i = 0; i < 3; i++) {
      const a = legBases[i], c = legBases[(i + 1) % 3];
      b.addStrut(a, c, 0.025, C.silver, 4);
    }
    b.beginPart(3);
    // Part 3 — Camera mast: only the mount remains. Apollo 12 removed the
    // television camera, so no camera body is modelled here.
    b.addStrut([0.38, 0.40, 0.30], [0.38, 1.00, 0.30], 0.045, C.aluminum, 6);
    b.addStrut([0.20, 0.46, 0.30], [0.38, 0.86, 0.30], 0.018, C.silver, 4);
    b.addBox(translation(0.38, 1.05, 0.30), 0.24, 0.12, 0.22, C.aluminumDark);
    b.addCylinder(multiply(translation(0.38, 1.05, 0.44), rotationX(Math.PI / 2)), 0.10, 0.10, 0.05, 12, C.graphite);
    b.addBox(translation(0.38, 1.14, 0.30), 0.30, 0.04, 0.22, C.silver);
    b.addBox(translation(0.38, 1.19, 0.30), 0.10, 0.05, 0.10, C.dark);
    b.addCylinderBetween([0.38, 0.86, 0.30], [0.62, 0.72, 0.30], 0.012, C.copper, 4);
    b.beginPart(4);
    // Part 4 — Omni antenna: a mast with a small dish and feed.
    b.addStrut([-0.45, 0.35, -0.35], [-0.45, 0.94, -0.35], 0.035, C.aluminum, 6);
    b.addStrut([-0.45, 0.72, -0.35], [-0.70, 0.64, -0.35], 0.015, C.silver, 4);
    b.addCylinder(multiply(translation(-0.45, 0.99, -0.35), rotationX(Math.PI / 2)), 0.19, 0.07, 0.10, 16, C.white);
    b.addCylinder(multiply(translation(-0.45, 0.99, -0.44), rotationX(Math.PI / 2)), 0.055, 0.055, 0.05, 8, C.dark);
    b.addSphere(multiply(translation(-0.45, 1.06, -0.35), scaling(0.055, 0.055, 0.055)), 1, 8, 6, C.dark);
    // Part 5 — Alpha-scattering instrument. Surveyor 5 and 6 carried this
    // surface analyser, so their records list one component more than the other
    // Surveyor landers. It is built only when the record declares that sixth
    // component, which keeps every component index aligned with its model part.
    const components = (record && record.components) || [];
    if (components.length > 5) {
      b.beginPart(5);
      const head = [0.30, -0.62, 0.50];
      // Deployment boom from the bus down to the instrument on the surface.
      b.addCylinderBetween([0.06, -0.06, 0.34], [head[0], head[1] + 0.26, head[2] - 0.06], 0.030, C.silver, 6);
      b.addStrut([0.14, -0.04, 0.26], [head[0] + 0.02, head[1] + 0.20, head[2]], 0.015, C.aluminumDark, 4);
      // The sensor head: a faceted body with the collimated source face.
      b.addCylinder(multiply(translation(head[0], head[1], head[2]), rotationX(Math.PI / 2)), 0.15, 0.15, 0.12, 16, C.graphite);
      b.addCylinder(multiply(translation(head[0], head[1], head[2] + 0.09), rotationX(Math.PI / 2)), 0.17, 0.11, 0.05, 16, C.gold);
      b.addCylinder(multiply(translation(head[0], head[1], head[2] - 0.10), rotationX(Math.PI / 2)), 0.10, 0.10, 0.05, 12, C.dark);
      b.addSphere(multiply(translation(head[0], head[1], head[2] + 0.13), scaling(0.045, 0.045, 0.045)), 1, 8, 6, C.copper);
      b.addBox(translation(head[0] - 0.14, head[1] + 0.06, head[2] - 0.05), 0.09, 0.08, 0.14, C.panel);
      // The footpad it rests on, so the deployment reads as ground contact.
      b.addCylinder(translation(head[0], head[1] - 0.16, head[2]), 0.13, 0.12, 0.05, 14, C.aluminumDark);
    }
    return b;
  }

  function surveyorCamera() {
    const b = new MeshBuilder();
    // Part 0 — Camera body: the cylindrical housing that contained the imaging
    // tube and electronics, with its rear connector and carry handles.
    b.beginPart(0);
    const body = multiply(translation(0, 0, 0), rotationX(Math.PI / 2));
    b.addCylinder(body, 0.34, 0.34, 0.72, 24, C.aluminum);
    b.addCylinder(multiply(translation(0, 0, -0.36), rotationX(Math.PI / 2)), 0.36, 0.36, 0.05, 24, C.aluminumDark);
    b.addCylinder(multiply(translation(0, 0, -0.42), rotationX(Math.PI / 2)), 0.26, 0.26, 0.05, 16, C.graphite);
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      b.addCylinder(translation(Math.cos(a) * 0.20, Math.sin(a) * 0.20, -0.45), 0.022, 0.022, 0.06, 6, C.copper);
    }
    b.addBox(translation(0, 0.33, -0.05), 0.28, 0.07, 0.45, C.blanket);
    b.addBox(translation(0.31, 0.02, -0.08), 0.09, 0.18, 0.24, C.panel);
    b.addBox(translation(-0.31, 0.02, -0.08), 0.09, 0.16, 0.20, C.graphite);
    for (const s of [-1, 1]) {
      b.addStrut([s * 0.30, 0.34, -0.20], [s * 0.30, 0.34, 0.20], 0.014, C.silver, 4);
      b.addStrut([s * 0.30, 0.26, 0.20], [s * 0.30, 0.34, 0.20], 0.012, C.silver, 4);
    }
    b.beginPart(1);
    // Part 1 — Lens and optical assembly: the barrel, its focus rings, the
    // front element and the scanning mirror that aimed the field of view.
    b.addCylinder(multiply(translation(0, 0, 0.46), rotationX(Math.PI / 2)), 0.21, 0.21, 0.28, 22, C.graphite);
    b.addCylinder(multiply(translation(0, 0, 0.60), rotationX(Math.PI / 2)), 0.23, 0.23, 0.045, 22, C.silver);
    b.addCylinder(multiply(translation(0, 0, 0.645), rotationX(Math.PI / 2)), 0.14, 0.14, 0.055, 18, C.glass);
    b.addCylinder(multiply(translation(0, 0, 0.685), rotationX(Math.PI / 2)), 0.17, 0.17, 0.025, 18, C.black);
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      b.addBox(multiply(multiply(translation(0, 0, 0.56), rotationX(Math.PI / 2)), rotationY(a)), 0.045, 0.030, 0.05, C.silverLight);
    }
    // Scanning mirror held ahead of the barrel on a small gimbal frame.
    const mirror = multiply(translation(0, 0.02, 0.80), rotationX(Math.PI / 4));
    b.addBox(mirror, 0.26, 0.26, 0.012, C.silverLight);
    b.addStrut([-0.19, 0.0, 0.80], [0.19, 0.0, 0.80], 0.012, C.silver, 4);
    b.addStrut([-0.19, 0.0, 0.80], [-0.19, 0.26, 0.66], 0.010, C.silver, 4);
    b.addStrut([0.19, 0.0, 0.80], [0.19, 0.26, 0.66], 0.010, C.silver, 4);
    b.beginPart(2);
    // Part 2 — Sunshade: an open-front shield so the lens stays visible.
    b.addCylinder(multiply(translation(0, 0, 0.86), rotationX(Math.PI / 2)), 0.44, 0.28, 0.34, 26, C.white, false);
    for (let i = 0; i < 26; i++) {
      const a = (i / 26) * Math.PI * 2;
      b.addBox(multiply(multiply(translation(0, 0, 1.02), rotationX(Math.PI / 2)), rotationY(a)), 0.046, 0.032, 0.046, i % 2 ? C.aluminumDark : C.silverLight);
    }
    b.beginPart(3);
    // Part 3 — Mounting bracket: the cradle that attached the camera to the
    // lander, with an attachment plate, clamps and a cable run.
    b.addBox(translation(0, -0.44, -0.05), 0.66, 0.08, 0.36, C.aluminumDark);
    b.addBox(translation(-0.38, -0.20, -0.05), 0.06, 0.44, 0.30, C.aluminumDark);
    b.addBox(translation(0.38, -0.20, -0.05), 0.06, 0.44, 0.30, C.aluminumDark);
    for (const x of [-0.30, 0.30]) {
      for (const z of [-0.16, 0.10]) b.addCylinder(translation(x, -0.40, z), 0.018, 0.018, 0.05, 6, C.silverLight);
    }
    b.addStrut([-0.38, 0.10, 0.12], [-0.48, 0.04, 0.34], 0.026, C.graphite, 5);
    b.addBox(translation(-0.50, 0.04, 0.34), 0.06, 0.06, 0.10, C.silver);
    b.addCylinderBetween([-0.50, 0.04, 0.38], [-0.30, -0.30, 0.10], 0.014, C.copper, 4);
    b.addCylinderBetween([0.36, -0.08, -0.05], [0.52, -0.34, -0.16], 0.012, C.copper, 4);
    return b;
  }

  function lrrr() {
    const b = new MeshBuilder();
    // Part 0 — Retroreflector array: a flat back plate carrying a field of
    // fused-silica corner-cube prisms in a gold-toned frame. The instrument is
    // entirely passive. It has no power source, no electronics and no
    // transmitter, so none of those are modelled. It only returns laser light
    // toward the station that fired it.
    b.beginPart(0);
    b.addBox(translation(0, 0.72, 0), 1.10, 0.09, 0.92, C.gold);
    b.addBox(translation(0, 0.665, 0), 1.00, 0.05, 0.82, C.goldDark);
    for (const x of [-0.53, 0.53]) b.addBox(translation(x, 0.735, 0), 0.06, 0.17, 0.98, C.silver);
    for (const z of [-0.44, 0.44]) b.addBox(translation(0, 0.735, z), 1.16, 0.17, 0.06, C.silver);
    // Field of corner-cube cells. The archive notes the array is a panel of
    // reflectors, so the count here is a representation, not a measured figure.
    for (let gx = 0; gx < 10; gx++) {
      for (let gz = 0; gz < 10; gz++) {
        const px = (gx - 4.5) * 0.094, pz = (gz - 4.5) * 0.086;
        b.addCylinder(translation(px, 0.775, pz), 0.039, 0.039, 0.05, 8, C.silverLight, false);
        b.addBox(translation(px, 0.804, pz), 0.050, 0.018, 0.050, C.lens);
      }
    }
    for (let g = 0; g <= 10; g++) {
      b.addBox(translation(-0.47 + g * 0.094, 0.792, 0), 0.009, 0.011, 0.82, C.goldLight);
      b.addBox(translation(0, 0.792, -0.43 + g * 0.086), 1.00, 0.011, 0.009, C.goldLight);
    }
    // Levelling bubble sight on the array face, used to aim it at Earth.
    b.addCylinder(translation(-0.36, 0.822, 0.30), 0.05, 0.045, 0.03, 12, C.silverLight);
    b.addCylinder(translation(-0.36, 0.838, 0.30), 0.034, 0.034, 0.012, 10, C.glass);
    b.beginPart(1);
    // Part 1 — Tripod mount: three simplified legs that raised and steadied the
    // array above the surface, with their footpads and bracing.
    const legFeet = [];
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2 + Math.PI / 6;
      const ca = Math.cos(a), sa = Math.sin(a);
      const top = [ca * 0.42, 0.64, sa * 0.42];
      const knee = [ca * 0.72, -0.32, sa * 0.72];
      const foot = [ca * 0.86, -0.92, sa * 0.86];
      legFeet.push(foot);
      b.addCylinderBetween(top, knee, 0.044, C.silverLight, 7);
      b.addCylinderBetween(knee, foot, 0.038, C.aluminum, 6);
      b.addCylinderBetween([ca * 0.24, 0.28, sa * 0.24], knee, 0.020, C.silver, 5);
      b.addCylinder(translation(foot[0], foot[1] - 0.01, foot[2]), 0.14, 0.13, 0.055, 12, C.aluminum);
      b.addCylinder(translation(foot[0], foot[1] + 0.05, foot[2]), 0.07, 0.07, 0.05, 8, C.goldDark);
    }
    for (let i = 0; i < 3; i++) {
      const a = legFeet[i], c = legFeet[(i + 1) % 3];
      b.addStrut([a[0] * 0.92, a[1] + 0.24, a[2] * 0.92], [c[0] * 0.92, c[1] + 0.24, c[2] * 0.92], 0.016, C.silver, 4);
    }
    b.beginPart(2);
    // Part 2 — Leveling base: the central column and adjustment mechanism that
    // established the array's orientation. Details are conceptual.
    b.addCylinder(translation(0, 0.34, 0), 0.24, 0.20, 0.30, 14, C.aluminumDark);
    b.addCylinder(translation(0, 0.54, 0), 0.17, 0.17, 0.24, 14, C.gold);
    b.addCylinder(translation(0, 0.68, 0), 0.22, 0.22, 0.06, 14, C.silver);
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2;
      b.addCylinder(translation(Math.cos(a) * 0.20, 0.30, Math.sin(a) * 0.20), 0.032, 0.032, 0.16, 8, C.silverLight);
      b.addCylinder(translation(Math.cos(a) * 0.20, 0.40, Math.sin(a) * 0.20), 0.045, 0.045, 0.03, 8, C.goldLight);
    }
    b.addCylinder(translation(0, 0.12, 0), 0.30, 0.30, 0.05, 14, C.dark);
    return b;
  }

  function opportunity() {
    const b = new MeshBuilder();
    // Part 0 — Rover body: the warm electronics box that housed the core
    // systems, wrapped in its thermal covering and carried on the chassis.
    b.beginPart(0);
    b.addBox(translation(0, 0.16, 0), 1.34, 0.60, 0.96, C.aluminum);
    b.addBox(translation(0, 0.16, 0.49), 1.06, 0.44, 0.045, C.blanket);
    b.addBox(translation(0, 0.16, -0.49), 1.06, 0.44, 0.045, C.blanketDark);
    for (const x of [-0.68, 0.68]) b.addBox(translation(x, 0.16, 0), 0.045, 0.46, 0.92, C.blanketDark);
    b.addBox(translation(0, 0.46, 0), 1.30, 0.05, 0.92, C.goldDark);
    b.addBox(translation(0, -0.14, 0), 1.40, 0.06, 1.00, C.panel);
    for (const z of [-0.36, 0.36]) b.addBox(translation(0, 0.16, z), 1.42, 0.03, 0.025, C.panel);
    b.addBox(translation(0.46, -0.16, 0), 0.34, 0.20, 0.56, C.graphite);
    b.addBox(translation(-0.50, 0.16, -0.50), 0.20, 0.22, 0.035, C.goldLight);
    for (const x of [-0.54, 0.54]) b.addBox(translation(x, 0.16, 0.512), 0.05, 0.48, 0.02, C.goldDark);
    // Restrained dust on the low, upward-facing chassis rim, where settled
    // regolith would collect. A material choice, not a measured pattern.
    for (const z of [-0.44, 0.44]) b.addBox(translation(0, -0.105, z), 1.30, 0.02, 0.10, C.dust);
    b.beginPart(1);
    // Part 1 — Solar arrays: two wing-like decks that generated the rover's
    // power, shown with their cell grid and support frames.
    for (const x of [-0.74, 0.74]) {
      b.addBox(translation(x, 0.585, 0), 1.12, 0.045, 0.80, C.solar);
      b.addBox(translation(x, 0.560, 0), 1.18, 0.02, 0.86, C.aluminum);
      for (let i = -5; i <= 5; i++) b.addBox(translation(x + i * 0.095, 0.612, 0), 0.012, 0.006, 0.76, C.solarEdge);
      for (let i = -4; i <= 4; i++) b.addBox(translation(x, 0.615, i * 0.095), 1.04, 0.006, 0.012, C.solarEdge);
      b.addBox(translation(x, 0.575, 0.42), 1.14, 0.03, 0.03, C.aluminumDark);
      b.addBox(translation(x, 0.575, -0.42), 1.14, 0.03, 0.03, C.aluminumDark);
      b.addStrut([x * 0.72, 0.44, 0.30], [x, 0.56, 0.30], 0.020, C.silver, 4);
      b.addStrut([x * 0.72, 0.44, -0.30], [x, 0.56, -0.30], 0.020, C.silver, 4);
    }
    b.beginPart(2);
    // Part 2 — Six wheels and the rocker-bogie suspension that linked them: a
    // rocker arm at each side carrying a bogie that held the middle and rear
    // wheels, so all six stayed in contact with uneven ground.
    const wheelY = -0.36, wheelR = 0.30, wheelX = 0.98;
    for (const side of [-1, 1]) {
      const x = side * wheelX;
      for (const z of [-0.64, 0, 0.64]) b.addWheel(x, wheelY, z, wheelR, 0.20, C.graphite, C.silver, C.silverLight, 16);
      const pivot = [side * 0.62, -0.02, 0.10];
      const bogie = [x * 0.94, -0.20, 0.44];
      b.addStrut(pivot, [x, wheelY, -0.64], 0.040, C.aluminum, 6);
      b.addStrut(pivot, bogie, 0.038, C.aluminum, 6);
      b.addStrut(bogie, [x, wheelY, 0], 0.030, C.aluminumDark, 5);
      b.addStrut(bogie, [x, wheelY, 0.64], 0.030, C.aluminumDark, 5);
      b.addStrut([side * 0.56, -0.12, 0.16], [x * 0.86, -0.30, 0.30], 0.022, C.silverLight, 4);
      for (const z of [-0.64, 0, 0.64]) {
        b.addCylinder(multiply(translation(x * 1.06, wheelY, z), rotationZ(Math.PI / 2)), 0.085, 0.085, 0.14, 10, C.goldDark);
      }
    }
    b.addStrut([-0.62, -0.02, 0.10], [0.62, -0.02, 0.10], 0.030, C.silver, 6);
    b.addCylinder(translation(0, -0.04, 0.10), 0.10, 0.10, 0.34, 10, C.goldDark);
    b.beginPart(3);
    // Part 3 — Camera mast: the deployable mast that raised the panoramic and
    // navigation cameras above the body, with its instrument head.
    b.addStrut([0.28, 0.44, -0.34], [0.28, 1.08, -0.34], 0.045, C.silverLight, 7);
    b.addStrut([0.10, 0.50, -0.34], [0.28, 0.92, -0.34], 0.018, C.silver, 4);
    b.addBox(translation(0.28, 1.15, -0.34), 0.36, 0.22, 0.24, C.white);
    b.addBox(translation(0.28, 1.28, -0.34), 0.40, 0.04, 0.28, C.silver);
    for (const dx of [-0.11, 0.11]) {
      b.addCylinder(multiply(translation(0.28 + dx, 1.15, -0.47), rotationX(Math.PI / 2)), 0.062, 0.062, 0.09, 12, C.graphite);
      b.addCylinder(multiply(translation(0.28 + dx, 1.15, -0.515), rotationX(Math.PI / 2)), 0.048, 0.048, 0.02, 12, C.lens);
    }
    b.addBox(translation(0.28, 1.15, -0.50), 0.34, 0.05, 0.05, C.gold);
    b.beginPart(4);
    // Part 4 — Robotic arm: the instrument deployment device that placed tools
    // against rocks and soil, ending in a turret of instruments.
    b.addSphere(multiply(translation(-0.44, 0.26, 0.48), scaling(0.10, 0.10, 0.10)), 1, 10, 8, C.aluminumDark);
    b.addCylinderBetween([-0.44, 0.26, 0.48], [-0.78, 0.12, 0.74], 0.055, C.silverLight, 7);
    b.addSphere(multiply(translation(-0.78, 0.12, 0.74), scaling(0.075, 0.075, 0.075)), 1, 10, 7, C.graphite);
    b.addCylinderBetween([-0.78, 0.12, 0.74], [-0.98, 0.03, 0.90], 0.045, C.silver, 7);
    b.addBox(multiply(translation(-1.04, 0.02, 0.96), rotationY(-0.6)), 0.20, 0.16, 0.18, C.aluminumDark);
    b.addCylinder(multiply(translation(-1.04, 0.02, 1.02), rotationX(Math.PI / 2)), 0.10, 0.10, 0.14, 12, C.silver);
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2;
      b.addCylinder(multiply(translation(-1.04 + Math.cos(a) * 0.13, 0.02 + Math.sin(a) * 0.13, 1.10), rotationX(Math.PI / 2)), 0.035, 0.035, 0.14, 8, i === 0 ? C.gold : C.graphite);
    }
    b.addBox(translation(-1.04, 0.02, 1.16), 0.16, 0.14, 0.05, C.dark);
    b.beginPart(5);
    // Part 5 — Antennas: the steerable high-gain dish that supported high-rate
    // communication with Earth, plus the low-gain and UHF antennas.
    b.addStrut([-0.22, 0.40, -0.50], [-0.22, 0.86, -0.52], 0.030, C.silverLight, 6);
    b.addSphere(multiply(translation(-0.22, 0.88, -0.52), scaling(0.06, 0.06, 0.06)), 1, 8, 6, C.silver);
    b.addCylinder(multiply(translation(-0.22, 0.94, -0.58), rotationX(Math.PI / 2)), 0.24, 0.08, 0.12, 18, C.white);
    b.addCylinder(multiply(translation(-0.22, 0.94, -0.64), rotationX(Math.PI / 2)), 0.07, 0.07, 0.05, 10, C.dark);
    b.addStrut([-0.22, 0.62, -0.52], [-0.48, 0.56, -0.52], 0.014, C.silver, 4);
    b.addStrut([-0.22, 0.62, -0.52], [0.02, 0.56, -0.52], 0.014, C.silver, 4);
    b.addStrut([-0.60, 0.42, -0.44], [-0.60, 1.02, -0.44], 0.014, C.silverLight, 4);
    b.addStrut([0.58, 0.44, -0.44], [0.58, 0.76, -0.44], 0.016, C.silverLight, 4);
    b.addCylinder(translation(0.58, 0.78, -0.44), 0.035, 0.035, 0.06, 8, C.dark);
    return b;
  }

  function m20Backshell() {
    const b = new MeshBuilder();
    // Two separate pieces of entry, descent and landing hardware are shown
    // together: the backshell (the aft aeroshell body) and the parachute it
    // released. The heat shield, which was a distinct forward component, is not
    // modelled. The assembly is presented as hardware found apart on the
    // surface, not as a single intact object.
    b.beginPart(0);
    // Part 0 — Backshell: the protective aft body that carried the parachute,
    // its deployment canister and the antennas during entry.
    b.addCylinder(translation(0, 0.18, 0), 1.18, 0.72, 0.94, 34, C.marsTan);
    b.addCylinder(translation(0, -0.30, 0), 1.24, 1.24, 0.12, 34, C.marsTan);
    b.addCylinder(translation(0, -0.38, 0), 1.20, 1.20, 0.05, 34, C.dark);
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      b.addBox(multiply(rotationY(a), translation(0, 0.18, 0.95)), 0.05, 0.84, 0.03, i % 2 ? C.goldDark : C.goldLight);
    }
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      b.addBox(multiply(rotationY(a), translation(0, -0.24, 1.10)), 0.16, 0.12, 0.06, C.silver);
    }
    b.addCylinder(translation(0, 0.02, 0), 0.82, 0.82, 0.035, 34, C.gold);
    // Restrained dust on the exposed ledge of the base ring.
    b.addCylinder(translation(0, -0.236, 0), 1.23, 1.23, 0.018, 34, C.dustLight);
    b.addCylinder(translation(0, 0.62, 0), 0.76, 0.54, 0.16, 26, C.dark);
    b.addCylinder(translation(0, 0.72, 0), 0.34, 0.30, 0.14, 16, C.silver);
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      b.addStrut([Math.cos(a) * 0.46, 0.22, Math.sin(a) * 0.46], [Math.cos(a) * 0.30, 0.70, Math.sin(a) * 0.30], 0.014, C.silver, 4);
    }
    b.beginPart(1);
    // Part 1 — Parachute canopy: a disk-gap-band canopy, the design flown on
    // Mars 2020, with alternating gores. Shown folded out at full inflation.
    b.addDome(translation(0, 2.00, 0), 1.40, 0.70, 36, 9, C.canopy, C.canopyAlt);
    b.addCylinder(translation(0, 1.70, 0), 1.38, 1.38, 0.22, 36, C.canopyAlt, false);
    for (let i = 0; i < 18; i++) {
      const a = (i / 18) * Math.PI * 2;
      b.addStrut([Math.cos(a) * 1.40, 2.00, Math.sin(a) * 1.40], [Math.cos(a) * 1.38, 1.81, Math.sin(a) * 1.38], 0.010, C.harness, 3);
    }
    b.addCylinder(translation(0, 2.70, 0), 0.16, 0.10, 0.10, 12, C.canopy);
    b.addCylinder(translation(0, 2.64, 0), 0.26, 0.22, 0.05, 20, C.canopyAlt);
    b.beginPart(2);
    // Part 2 — Suspension lines: the lines from the canopy skirt to a common
    // riser above the shell. The archive notes the exact number is not shown,
    // so a representative count is modelled.
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      const ca = Math.cos(a), sa = Math.sin(a);
      b.addCylinderBetween([ca * 1.38, 1.60, sa * 1.38], [ca * 0.24, 1.02, sa * 0.24], 0.011, C.harness, 4);
      b.addSphere(multiply(translation(ca * 1.38, 1.60, sa * 1.38), scaling(0.028, 0.028, 0.028)), 1, 6, 4, C.silverLight);
    }
    b.addCylinderBetween([0, 1.04, 0], [0, 0.86, 0], 0.060, C.harness, 8);
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      b.addCylinderBetween([Math.cos(a) * 0.10, 1.04, Math.sin(a) * 0.10], [Math.cos(a) * 0.26, 1.30, Math.sin(a) * 0.26], 0.008, C.harness, 3);
    }
    b.beginPart(3);
    // Part 3 — Attachment ring: the structural fittings that joined the
    // parachute riser and its release mechanisms to the shell.
    b.addCylinder(translation(0, 0.80, 0), 0.44, 0.36, 0.14, 20, C.silver);
    b.addCylinder(translation(0, 0.90, 0), 0.30, 0.30, 0.05, 16, C.gold);
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
      b.addBox(multiply(rotationY(a), translation(0, 0.80, 0.50)), 0.13, 0.11, 0.16, C.dark);
      b.addCylinder(multiply(rotationY(a), translation(0, 0.85, 0.58)), 0.026, 0.026, 0.14, 6, C.silver);
    }
    return b;
  }

  function sojourner() {
    const b = new MeshBuilder();
    // Part 0 — Body: compact flat aluminium chassis with thermal blanket covering.
    // Sojourner was about 65 cm long × 48 cm wide × 28 cm tall; model units ~1 unit per 60 cm.
    b.beginPart(0);
    b.addBox(translation(0, 0.10, 0), 0.76, 0.42, 1.08, C.aluminum);
    b.addBox(translation(0, 0.10, 0.55), 0.60, 0.34, 0.04, C.blanket);
    b.addBox(translation(0, 0.10, -0.55), 0.60, 0.34, 0.04, C.blanketDark);
    b.addBox(translation(0.40, 0.10, 0), 0.04, 0.36, 0.96, C.blanket);
    b.addBox(translation(-0.40, 0.10, 0), 0.04, 0.36, 0.96, C.blanketDark);
    b.addBox(translation(0, 0.32, 0), 0.74, 0.04, 1.06, C.aluminumDark);

    // Part 1 — Solar panel: single flat GaAs/Ge array covering the topside.
    b.beginPart(1);
    b.addBox(translation(0, 0.38, 0), 0.70, 0.04, 1.00, C.solar);
    b.addBox(translation(0, 0.36, 0), 0.76, 0.02, 1.06, C.aluminumDark);
    for (let i = -3; i <= 3; i++) b.addBox(translation(i * 0.10, 0.41, 0), 0.006, 0.004, 0.96, C.solarEdge);
    for (let i = -4; i <= 4; i++) b.addBox(translation(0, 0.41, i * 0.10), 0.66, 0.004, 0.006, C.solarEdge);

    // Part 2 — Six wheels on rocker-bogie suspension.
    b.beginPart(2);
    const wr = 0.185, ww = 0.13, wy = -0.10;
    for (const x of [-0.40, 0.40]) {
      for (const z of [-0.46, 0.0, 0.46]) {
        b.addMeshWheel(x, wy, z, wr, ww, C.aluminumDark, C.silver, C.silverLight, C.graphite, 10, 10);
      }
      b.addStrut([x, -0.02, -0.46], [x, -0.02, 0.0], 0.022, C.aluminum, 5);
      b.addStrut([x, -0.02, 0.0], [x, -0.02, 0.46], 0.022, C.aluminum, 5);
      b.addStrut([x * 0.90, 0.08, -0.42], [x, wy + 0.10, -0.46], 0.016, C.silverLight, 4);
      b.addStrut([x * 0.90, 0.08, 0.0], [x, wy + 0.10, 0.0], 0.016, C.silverLight, 4);
      b.addStrut([x * 0.90, 0.08, 0.42], [x, wy + 0.10, 0.46], 0.016, C.silverLight, 4);
    }

    // Part 3 — Cameras: stereoscopic front pair and single rear camera; all body-mounted.
    b.beginPart(3);
    for (const x of [-0.18, 0.18]) {
      b.addBox(translation(x, 0.24, 0.55), 0.09, 0.10, 0.08, C.dark);
      b.addBox(translation(x, 0.24, 0.60), 0.06, 0.07, 0.04, C.lens);
    }
    b.addBox(translation(0, 0.22, -0.55), 0.10, 0.09, 0.08, C.dark);
    b.addBox(translation(0, 0.22, -0.60), 0.07, 0.06, 0.04, C.lens);

    // Part 4 — APXS: alpha-proton-X-ray spectrometer on a short deployment arm.
    b.beginPart(4);
    b.addStrut([0.36, 0.14, -0.44], [0.54, -0.04, -0.58], 0.028, C.aluminumDark, 5);
    b.addCylinder(multiply(translation(0.58, -0.06, -0.62), rotationX(Math.PI / 2)), 0.10, 0.10, 0.08, 8, C.graphite);
    b.addCylinder(multiply(translation(0.58, -0.06, -0.62), rotationX(Math.PI / 2)), 0.06, 0.06, 0.04, 8, C.gold);

    // Part 5 — UHF modem antenna: a low whip mast, not a high-gain dish.
    b.beginPart(5);
    b.addStrut([0.28, 0.40, -0.44], [0.28, 0.72, -0.44], 0.016, C.silver, 4);
    b.addSphere(multiply(translation(0.28, 0.72, -0.44), scaling(0.030, 0.030, 0.030)), 1, 6, 5, C.silverLight);

    return b;
  }

  const builders = {
    "lm-descent": lmDescent,
    lrv: lrv,
    "surveyor-lander": surveyorLander,
    "surveyor-camera": surveyorCamera,
    lrrr: lrrr,
    opportunity: opportunity,
    "m20-backshell": m20Backshell,
    sojourner: sojourner
  };

  // ---------------------------------------------------------------- finalize
  function finalize(builder, record) {
    const positions = builder.positions;
    if (!positions.length) throw new Error("empty model geometry");
    let minX = Infinity, minY = Infinity, minZ = Infinity, maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i], y = positions[i + 1], z = positions[i + 2];
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
      if (z < minZ) minZ = z; if (z > maxZ) maxZ = z;
    }
    const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2, cz = (minZ + maxZ) / 2;
    const extent = Math.max(maxX - minX, maxY - minY, maxZ - minZ, 0.001);
    const scale = 2.5 / extent;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = (positions[i] - cx) * scale;
      positions[i + 1] = (positions[i + 1] - cy) * scale;
      positions[i + 2] = (positions[i + 2] - cz) * scale;
    }
    let radius = 0;
    for (let i = 0; i < positions.length; i += 3) {
      radius = Math.max(radius, Math.hypot(positions[i], positions[i + 1], positions[i + 2]));
    }
    const anchors = (record && record.components ? record.components : []).map((component) => {
      const a = component.anchor || [0, 0, 0];
      return [(a[0] - cx) * scale, (a[1] - cy) * scale, (a[2] - cz) * scale];
    });
    return {
      positions: new Float32Array(positions),
      normals: new Float32Array(builder.normals),
      colors: new Float32Array(builder.colors),
      parts: new Float32Array(builder.parts),
      indices: new Uint16Array(builder.indices),
      anchors: anchors,
      radius: radius,
      vertexCount: positions.length / 3,
      triangleCount: builder.indices.length / 3
    };
  }

  // ---------------------------------------------------------------- stage
  function buildStage() {
    const b = new MeshBuilder();
    b.beginPart(-1);
    // A ring of technical markers, not a solid platform: it reads as an
    // exhibition stage without hiding the lower part of the artifact.
    for (let i = 0; i < 72; i++) {
      const a = (i / 72) * Math.PI * 2;
      const matrix = multiply(rotationY(a), translation(0, -1.56, 2.02));
      b.addBox(matrix, 0.11, 0.035, 0.22, i % 6 === 0 ? C.goldLight : C.goldDark);
    }
    for (let i = 0; i < 36; i++) {
      const a = (i / 36) * Math.PI * 2 + 0.04;
      const matrix = multiply(rotationY(a), translation(0, -1.60, 2.16));
      b.addBox(matrix, 0.05, 0.02, 0.10, C.copper);
    }
    return {
      positions: new Float32Array(b.positions),
      normals: new Float32Array(b.normals),
      colors: new Float32Array(b.colors),
      parts: new Float32Array(b.parts),
      indices: new Uint16Array(b.indices)
    };
  }

  function build(kind, record) {
    const builder = builders[kind];
    if (!builder) throw new Error("unknown model kind: " + kind);
    // The record is passed through so a builder can add the optional parts a
    // particular mission carried; component indices still map one-to-one onto
    // part indices.
    const model = finalize(builder(record), record);
    const stage = buildStage();
    // Merge the exhibition stage into the same buffers, tagged with part -1.
    const vertexOffset = model.positions.length / 3;
    const positions = new Float32Array(model.positions.length + stage.positions.length);
    positions.set(model.positions, 0); positions.set(stage.positions, model.positions.length);
    const normals = new Float32Array(model.normals.length + stage.normals.length);
    normals.set(model.normals, 0); normals.set(stage.normals, model.normals.length);
    const colors = new Float32Array(model.colors.length + stage.colors.length);
    colors.set(model.colors, 0); colors.set(stage.colors, model.colors.length);
    const parts = new Float32Array(model.parts.length + stage.parts.length);
    parts.set(model.parts, 0); for (let i = 0; i < stage.parts.length; i++) parts[model.parts.length + i] = -1;
    const indices = new Uint16Array(model.indices.length + stage.indices.length);
    indices.set(model.indices, 0);
    for (let i = 0; i < stage.indices.length; i++) indices[model.indices.length + i] = stage.indices[i] + vertexOffset;
    return {
      positions: positions, normals: normals, colors: colors, parts: parts, indices: indices,
      anchors: model.anchors, radius: model.radius, vertexCount: positions.length / 3,
      triangleCount: indices.length / 3, componentCount: record && record.components ? record.components.length : 0
    };
  }

  global.ForgottenFootprintsModels = {
    build: build,
    mat4: {
      identity: identity, multiply: multiply, translation: translation, scaling: scaling,
      rotationX: rotationX, rotationY: rotationY, rotationZ: rotationZ,
      perspective: perspective, lookAt: lookAt, transformPoint: transformPoint
    }
  };
}(window));
