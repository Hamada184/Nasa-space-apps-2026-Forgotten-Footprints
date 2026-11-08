# Local visual asset sources

These five SVG files are original vector illustrations authored for Forgotten Footprints. They were created in this project and are not NASA imagery, documentary photographs, navigational maps, or depictions of known mission hardware/locations. No external image assets or network requests are used.

| File | Source / creator | Original page | Usage and credit |
|---|---|---|---|
| `home-planetary-archive.svg` | Original project artwork; Forgotten Footprints development | Created for this project; no external source page | Local decorative illustration. No NASA affiliation or photo credit implied. |
| `moon-surface.svg` | Original project artwork; Forgotten Footprints development | Created for this project; no external source page | Conceptual lunar terrain, not a geographic map or authentic photo. Also used as the no-WebGL fallback poster. |
| `mars-dustfront.svg` | Original project artwork; Forgotten Footprints development | Created for this project; no external source page | Conceptual Martian atmosphere, not a landing-site map or authentic photo. Also used as the no-WebGL fallback poster. |
| `deep-field.svg` | Original project artwork; Forgotten Footprints development | Created for this project; no external source page | Abstract deep-space composition; no spacecraft position or mission is shown. Also used as the no-WebGL fallback poster. |
| `component-study.svg` | Original project artwork; Forgotten Footprints development | Created for this project; no external source page | Generic conceptual module diagram, explicitly not a particular artifact or mission. Also used in the empty dossier and as the artifact fallback poster. |

## Procedural 3D assets

The Moon, Mars and Sun textures are generated at runtime in the browser with a 2D canvas and seeded procedural drawing. The seven artifact assemblies and the exhibition stage are generated at runtime as WebGL geometry in `src/js/museum-models.js`. They use no external models, textures, photographs or network assets. The planet textures are illustrative surface patterns, not geographic maps; the artifact models are conceptual assemblies, not engineering reconstructions. Marker coordinates are separate, sourced values listed in `src/js/archive-data.js`.
