# Technical architecture and content policy

## Runtime

The primary launch path is direct browser opening of `index.html`. Every major experience is its own HTML document and cross-page navigation uses relative anchors. Use vanilla HTML, CSS and regular browser scripts only. Do not require a server, backend, build tool, install, modules, imports or runtime fetches. Core experiences must remain local; the only network-backed feature is the official Canva embed on `pages/presentation.html`, which must degrade gracefully when offline or blocked.

Load localization and archive data from local JavaScript files before `i18n.js` and `app.js`. The dictionaries are exposed through `window.ForgottenFootprintsLocales`; the artifact dataset is `window.ForgottenFootprintsData`. Keep interface text and artifact records separate. Use `try/catch` around browser storage access; preserve current-session behaviour in memory if local storage is blocked. The dossier uses an identifier in the URL fragment, e.g. `pages/artifact.html#MOON-AP11-LMDS`.

## Project structure

```text
/
  index.html
  README.md
  logo/
  pages/
    archive.html
    artifact.html
    contact.html
    credits.html
    deep-space.html
    discovery.html
    mars.html
    methodology.html
    moon.html
    presentation.html
    timeline.html
  src/
    css/                 base.css, layout.css, platform.css
    js/                  app.js, i18n.js, locales.js, archive-data.js,
                         museum-models.js, museum3d.js, story.js
    locales/             en.json, ar.json (editorial copies)
    assets/              local SVG illustrations and ASSET-SOURCES.md
  docs/
    ARCHITECTURE.md
    ARCHITECTURE_AR.md
    COMPONENTS.md
    PLAN_ROUTES_TECH.md
    PROJECT_STRUCTURE.md
    ROADMAP.md
```

The site is a multi-page, direct-open experience with twelve standalone HTML documents: `index.html` plus eleven pages under `pages/`. `index.html` and the gallery/dossier pages load `museum-models.js` before `museum3d.js`. The model file has no DOM dependency; the renderer creates WebGL contexts and procedural textures at runtime. Apart from the public Canva embed on `pages/presentation.html`, no runtime asset is loaded from the network.

## 3D rendering

`museum3d.js` implements a small browser-native WebGL 1 pipeline (with a WebGL 2 context fallback). It distinguishes:

1. WebGL genuinely unavailable (`sceneNoWebGL`).
2. WebGL available but renderer/shader initialisation failed (`sceneInitFailed`).
3. Scene-specific geometry failure (`sceneSceneFailed`).
4. Texture/asset preparation failure (`sceneAssetFailed`).
5. Context loss (`sceneContextLost`), with automatic rebuild on `webglcontextrestored`.

Three shader programs are used: a textured, lit planet program; a vertex-coloured mesh program with per-component selection; and a point-sprite star program. Planet textures are generated locally with a 2D canvas using seeded procedural craters, maria, dust and polar caps. They are explicitly illustrative, not maps.

Artifact geometry is assembled from boxes, cylinders, spheres, domes and struts in `museum-models.js`. Each model has named component ranges and anchor points. The renderer supports drag rotation, wheel/button/keyboard zoom, reset, component list selection, 3D hotspots and a stage ring.

Adaptive quality selects Low, Balanced or High from memory, core count, screen size and device pixel ratio. Rendering is paused when the scene is off-screen, the page is hidden, or the context is lost. Low frame rates trigger an adaptive mode that reduces resolution and stops automatic rotation. `prefers-reduced-motion` disables automatic rotation.

## Archive experience

The Archive page owns search, destination/status filters, sorting, result cards, comparison, mission family tree and explicit empty states. Destination pages have unique visual treatments and coordinate limitations. Timeline filters render the 35 sourced events. Discovery uses a policy-based quiz, glossary, myth/fact cards and saved learning notes. The reusable dossier resolves stable identifiers from the URL fragment and renders lifecycle, evidence, events, related records, mission family, components and sources.

No record-level values should be filled without evidence. The verified dataset contains twenty-two records; future expansion remains a separate research target and is never presented as completed work.

## The Forgotten Journey

`story.js` adds a chapter-based narrative layer to the reusable dossier. It does not replace the dossier: on `pages/artifact.html` a `[data-journey]` section sits above `.dossier-layout`. The script is loaded after `museum3d.js`, giving the order `locales.js`, `i18n.js`, `archive-data.js`, `app.js`, `museum-models.js`, `museum3d.js`, `story.js`.

Each story is assembled at runtime from fields already verified in `archive-data.js` — `story`, `then`, `missionStory`, `modelNote`, `significance`, `evidence`, `now`, `status`, `operationalStatus`, `location`, `locationConfidence`, `events` and `components`. Six chapters map onto them: mission, hardware, how, science, remains and legacy. A chapter with no verified detail is labelled through `journeyMissing` rather than filled with invented text; a sparse record therefore shows only real chapters. No new scientific claim, source, date, coordinate or quotation is introduced.

Chapter position is kept in `history` state (`{ffJourney, ffRecord}`), never in the URL fragment, so `#<RECORD-ID>` keeps exactly one meaning and browser back/forward restores the chapter. Chapter changes move the camera through the existing `setStoryProgress`, and component entries call the existing `selectPart`/`focusPart`. When no scene is mounted the component list is disabled and a text fallback (`journeySceneNote`) is shown. `prefers-reduced-motion` disables camera movement, and a manual drag on the canvas stops automatic camera changes for the rest of the session.

## Data schema (current)

Each artifact record contains:

- `id`, bilingual `name`, `mission`, `missionId`, `missionLabel`, `world`.
- `recordType` (`artifact`, `component` or `debris`), bilingual `type`.
- `status` (one of the controlled categories), bilingual `operationalStatus`.
- `location`, bilingual location/confidence fields, optional `lat`/`lon`, `missionMarker`.
- Bilingual `story`, `then`, `missionStory`, `now`, `significance`, `evidence`, `modelNote`.
- `modelKind` for the procedural exhibit, `components[]` with bilingual names/descriptions and anchor points.
- `related` identifiers, `sources[]`, `events[]` (date, bilingual title, source URL), `coordinateSource`.

`archive-data.js` is validated for required keys, bilingual component text, status vocabulary and source URLs during development.

## Scientific content policy

The archive target remains a future research goal and is not a statement that those records have been researched. Never fabricate records, citations, coordinates, dates, weights or technical specifications. Each physical object/component needs its own identity; a mission is not itself an artifact. Trace important claims to sources.

Coordinates must be labelled verified, approximate or inferred with provenance and uncertainty. Distinguish recovered hardware from hardware remaining on another world. Do not classify active rovers as abandoned. Identify passive laser retroreflectors as passive scientific instruments.

Use exactly these status categories:

- `LEFT IN PLACE`
- `MISSION ENDED`
- `DISCARDED COMPONENT`
- `RECOVERED`
- `DELIBERATELY IMPACTED`
- `UNKNOWN LOCATION`
- `STILL ACTIVE`

Apply a status only when evidence supports it. These categories describe different conditions and are not interchangeable.

## Completed record identities

The verified dataset currently holds twenty-two individually sourced records (seventeen Moon, five Mars, none Deep Space):

Moon — Apollo hardware:

1. `MOON-AP11-LMDS` — Apollo 11 Eagle descent stage.
2. `MOON-AP11-LRRR` — Apollo 11 Lunar Laser Ranging Retroreflector.
3. `MOON-AP12-LMDS` — Apollo 12 Intrepid descent stage.
4. `MOON-AP14-LMDS` — Apollo 14 Antares descent stage.
5. `MOON-AP14-LRRR` — Apollo 14 Lunar Laser Ranging Retroreflector.
6. `MOON-AP15-LMDS` — Apollo 15 Falcon descent stage.
7. `MOON-AP15-LRRR` — Apollo 15 Lunar Laser Ranging Retroreflector.
8. `MOON-AP15-LRV` — Lunar Roving Vehicle (the three vehicles of Apollo 15, 16 and 17).
9. `MOON-AP16-LMDS` — Apollo 16 Orion descent stage.
10. `MOON-AP17-LMDS` — Apollo 17 Challenger descent stage.
11. `MOON-ALSEP` — Apollo Lunar Surface Experiments Package (five deployed station sites).

Moon — Surveyor hardware:

12. `MOON-SURV1-HULL` — Surveyor 1 remaining lander structure.
13. `MOON-SURV3-HULL` — Surveyor 3 remaining lander structure.
14. `MOON-SURV3-TV-CAMERA` — Surveyor 3 television camera (recovered to Earth).
15. `MOON-SURV5-HULL` — Surveyor 5 remaining lander structure.
16. `MOON-SURV6-HULL` — Surveyor 6 remaining lander structure.
17. `MOON-SURV7-HULL` — Surveyor 7 remaining lander structure.

Mars:

18. `MARS-MER-OPPORTUNITY` — Opportunity rover.
19. `MARS-MER-SPIRIT` — Spirit rover.
20. `MARS-M20-BACKSHELL` — Mars 2020 backshell and parachute debris.
21. `MARS-PATHFINDER-SOJOURNER` — Mars Pathfinder Sojourner rover.

Coordinate notes: the Apollo descent-stage and Lunar Roving Vehicle pins are mission landing coordinates, not final component positions. The LRV record covers three separate vehicles and plots only the Apollo 15 landing coordinate as one of the three sites. The Surveyor coordinates are LRO-determined landing coordinates that locate each site, not measured outlines of the remaining structures. The Mars 2020 and Mars Pathfinder pins are landing coordinates, not the debris or rover positions. The ALSEP record is a five-site collection and plots no single coordinate; its five station coordinates are listed in text. Opportunity's, Spirit's and Sojourner's final positions are not plotted; their pins are landing coordinates.

## Validation and integrity

Validate JSON and schema whenever data is added; source review is still required. Keep English and Arabic interface keys aligned and ensure RTL on every page. Report only tests actually run. Do not imply NASA endorsement, invent team details or competition achievements, or guess whether pre-window development is permitted. Confirm the applicable official competition edition, window, eligibility, attribution, asset-use and submission requirements before making such claims.
