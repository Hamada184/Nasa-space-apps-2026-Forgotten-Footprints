# Forgotten Footprints

A bilingual (English/Arabic) interactive space museum and scientific archive about the physical traces of human exploration beyond Earth.

> Every mission leaves a footprint. Some footprints remain long after the mission ends.

This is an independent educational project. It does not claim NASA endorsement, and it uses no NASA photographs as exhibit imagery.

## Open the site

Double-click `index.html`, or open it directly in a modern browser. Every destination is a separate HTML document under `pages/`; links and assets use relative local paths. No server, build step, installation, CDN, or external dependency is required. All core experiences work offline from local files. The only network-backed feature is the optional Canva presentation embed on `pages/presentation.html`; if Canva is unavailable, that page shows a fallback note and an external link to open the presentation.

For a controlled demo of the adaptive 3D tiers, append `?quality=low`, `?quality=balanced` or `?quality=high` to a gallery URL (for example `pages/moon.html?quality=high`). Without the parameter the renderer chooses a tier from the device.

## What is implemented

- **Twenty-two verified artifact records** (17 Moon, 5 Mars, 0 Deep Space) and **35 sourced timeline events**.
- **Real WebGL 3D**: an interactive Moon with procedural craters and sourced Apollo/Surveyor markers; a Mars globe with a distinctive procedural surface and a Mars 2020 mission marker; a deep-space star field with a schematic Sun, heliopause rings and a distant galaxy.
- **Eight distinct artifact chambers**: Apollo 11 descent stage, Apollo 11 retroreflector, Apollo 15 Lunar Roving Vehicle, Surveyor 3 lander structure, recovered Surveyor 3 camera, Sojourner rover, Opportunity rover, and the Mars 2020 backshell/parachute. Each has a recognisable procedural assembly, drag/zoom/reset controls, keyboard access and selectable components. The models are clearly labelled conceptual, not engineering reconstructions.
- **Scientific dossiers** with object identity, mission, type, status, location and coordinate confidence, original role, present state, significance, evidence, lifecycle, components, events, related records, mission family and source links.
- **Archive search, destination/status/mission filters, sorting, side-by-side comparison and a mission family tree.**
- **Moon and Mars marker clusters** that open the corresponding records instead of pretending a landing pin is the exact position of every component.
- **Discovery journal** for saving artifacts, plus learning notes and a policy-based quiz. Browser storage is best-effort with an in-memory fallback.
- **Guided presentation mode** with a nine-stop route and previous/next controls, a glossary, myth-versus-fact cards and source drawers.
- **Bilingual project presentation page** with the official Canva embed, a responsive viewer, a loading treatment, an offline fallback note and a button to open the presentation in Canva.
- **English/Arabic parity and RTL**, responsive layouts, reduced-motion support and keyboard-accessible controls.

## Scientific policy

- A mission is not an artifact. Each record identifies one physical object, component or debris field.
- Coordinates are labelled verified, approximate, a mission marker or not plotted.
- Passive retroreflectors are described as passive instruments; active spacecraft are not called abandoned.
- Conceptual 3D models and procedural planet textures are identified as illustrative. They are not presented as engineering reconstructions or mission photographs.
- Every record carries source links. The exact limitations of a coordinate or model are stated in the dossier.

## Project map

```text
index.html
pages/        archive, artifact, contact, credits, deep-space, discovery, mars, methodology, moon, presentation, timeline
src/css/      base, layout, platform
src/js/       locales, i18n, archive-data, app, museum-models, museum3d, story
src/locales/  en.json and ar.json editorial copies
src/assets/   original local SVG illustrations and asset manifest
docs/         architecture, structure, plan & routes, components, and roadmap
```

## Verification status

The project was exercised in Chrome 157 headless with SwiftShader and `file://` URLs: all pages loaded without JavaScript exceptions, every WebGL scene initialised, all eight artifact models rendered, the Moon and Mars markers projected, dossier/compare/family/journal features populated, Arabic RTL re-rendered dynamically, the no-WebGL fallback appeared correctly with WebGL disabled, and context loss/restoration recovered. The presentation page was checked at emulated widths of 375, 430, 768, 1366 and 1920 pixels, with 375, 430, 768 and 1366 checked in both languages: the Canva frame returned HTTP 200 and rendered the first slide, the loading overlay cleared, the localized iframe title and external link were correct, and no horizontal overflow appeared. A Canva-blocked run showed the fallback note and external link with no overflow. Firefox, Safari, real mobile devices and real-GPU performance were not tested in this environment; the Canva viewer requires network access and its availability is controlled by Canva.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md), [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md), [docs/PLAN_ROUTES_TECH.md](docs/PLAN_ROUTES_TECH.md), and [docs/COMPONENTS.md](docs/COMPONENTS.md). Source/asset notes are in [src/assets/ASSET-SOURCES.md](src/assets/ASSET-SOURCES.md).
