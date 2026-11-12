# Implementation roadmap

## Complete

1. **Foundation:** project rules, scientific content policy, README, architecture and asset provenance.
2. **Direct-open application shell:** vanilla local scripts/styles, graceful browser-storage fallback, responsive design, English/Arabic dictionaries and RTL handling.
3. **Multi-page platform:** separate Home, Archive, Moon, Mars, Deep Space, Timeline, Discovery, Methodology and Artifact Dossier documents with relative links.
4. **Verified dataset:** twenty-two individually sourced records and 35 sourced events, with components, evidence, sources and controlled status categories.
5. **WebGL museum:** local procedural Moon, Mars and deep-space scenes; seven distinct conceptual artifact chambers; component selection; marker clusters; adaptive quality; explicit unsupported/init/scene/asset/context-loss fallback paths.
6. **Museum interactions:** search, filters, sorting, comparison, mission family tree, dossier lifecycle and evidence, related records, discovery journal, quiz, glossary, myth/fact cards, guided route and presentation mode.
7. **Quality pass:** `file://` runtime checks in Chrome 156 (headless SwiftShader), no-JavaScript-error audit across all pages, Arabic RTL checks, mobile emulation, reduced-motion emulation, no-WebGL fallback and context-loss restoration.

## Remaining research and production work

- Expand only with individually reviewed sources; the current twenty-two records are the verified subset.
- Research deep-space records. The Deep Space gallery currently presents the environment and states explicitly that no verified artifact coordinate is plotted.
- Replace conceptual models with engineering-reviewed reconstructions where authoritative dimensions and geometry are available. Keep the conceptual label until that review exists.
- Verify on real integrated/discrete GPUs, Firefox and Safari. The automated checks used Chrome 156 with SwiftShader.
- Confirm the applicable official competition edition, submission window, eligibility, attribution and asset-use requirements before making competition claims.

Do not fabricate content to fill the archive. Add records only after source review and schema validation.
