# Project rules

- Inspect existing files before editing; preserve working features and user files.
- Make targeted changes and avoid unnecessary dependencies or installations.
- Never fabricate scientific records, claims, citations, coordinates, dates, weights, or specifications. Keep each physical artifact distinct from its mission.
- Keep English and Arabic support consistent; preserve Arabic RTL behavior.
- Preserve direct `file://` launch from `index.html`: no runtime modules, imports, fetches, network assets, or required server/build step.
- Keep major experiences in separate HTML documents with ordinary relative links; do not turn the site into a single-page application.
- Use URL fragments for stable dossier identifiers so records can be opened directly from local files.
- Treat localStorage and other optional browser APIs as unavailable when access throws; the interface must continue in the current session.
- Validate changed JSON and data against the documented schema, and test changed functionality.
- Report only checks actually performed and their results.
- Keep explanations concise; avoid repeated summaries.
