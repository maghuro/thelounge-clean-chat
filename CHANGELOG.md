# Changelog

All notable changes to **The Lounge Clean Chat** will be documented here.

## v0.4.2 - 2026-09-11

### Fixed

- Moved the recommended automatic delivery path to a stable **Cloudflare Pages** endpoint so TLCC can control the stylesheet's browser-cache policy.
- Added a Pages `_headers` rule for `thelounge-clean-chat.css` using `Cache-Control: no-cache, max-age=0, must-revalidate`, preventing browsers from treating an old release as fresh for hours.
- Added `X-Content-Type-Options: nosniff` to the published stylesheet response.

### Changed

- The recommended automatic loader is now `https://thelounge-clean-chat.pages.dev/thelounge-clean-chat.css`.
- Corrected The Lounge UI terminology in the project documentation from **Custom Stylesheet** to **Custom Stylesheet**.
- The Cloudflare Pages project is connected directly to GitHub and deploys the selected production branch automatically.
- Cloudflare Pages is now the sole recommended automatic delivery path.

### Tested

- Confirmed consecutive development revisions loaded from the exact same Cloudflare Pages URL on The Lounge 4.5.2 / Chrome Android after a normal reload.
- Confirmed the update appeared without clearing browser cache, changing the `@import` URL or adding a version/query-string cachebuster.
- Confirmed the visible `Enhanced by TLCC vX.X.X` topic marker changed with the newly delivered stylesheet, providing an immediate version check.


### Notes

- This is a delivery/cache-control bugfix release; it does not intentionally redesign TLCC's chat styling.
- An already-open The Lounge page still needs a normal reload/reopen before the browser requests/revalidates the stylesheet.
- TLCC remains entirely CSS-only; no DarkPeers bridge, JavaScript, userscript or The Lounge source changes are required.

## v0.4.1 - 2026-09-11

### Added

- Added a subtle `Enhanced by TLCC vX.X.X` marker to the local `#darkpeers` topic so users can see which stylesheet version their browser has actually received.
- Added dedicated green **BON POOL** styling for `DP` bridge messages containing a real `darkpeers.org/bon-pool` link.
- Added a **BON POOL** badge and matching card treatment while preserving native The Lounge highlighted-message backgrounds.

### Changed

- Compact DarkPeers page-link pills now explicitly remove inherited text underlining for cleaner presentation across themes/browsers.
- The topic version marker is generated entirely in CSS and does not modify the real IRC topic.
- The installation documentation uses the visible topic version marker as an easy cache/version check.

### Detection

- BON Pool detection uses the surviving `darkpeers.org/bon-pool` anchor instead of trying to parse the plain-text `[BON-POOL]` label.
- The version marker reads from the central `--tlcc-version` custom property, keeping the displayed version tied to the delivered stylesheet.

### Tested

- Confirmed the topic version marker and BON Pool treatment in The Lounge 4.5.2 on Chrome Android.

### Notes

- This remains a CSS-only release; no DarkPeers bridge, userscript, JavaScript or The Lounge source changes are required.

## v0.4.0 - 2026-09-10

### Added

- Added the first recommended auto-updating installation method using a lightweight `@import` loader.
- Added a clearly labelled TLCC loader block with comments before and after the import, making it easy to identify inside The Lounge's Custom Stylesheet field.
- Documented where users should place their own CSS overrides: after the TLCC loader block, while keeping `@import` before all normal CSS rules.

### Changed

- The README now recommends a lightweight `@import` loader instead of copying the full stylesheet for every update.
- Manual full-CSS installation remains supported for users who prefer a static local copy.
- The stylesheet header now points users to the recommended loader while remaining fully standalone.

### Tested

- Confirmed the automatic `@import` loader loads TLCC successfully in the tested The Lounge 4.5.2 setup.
- A direct `raw.githubusercontent.com` import was tested separately but did not load in that setup.

### Notes

- v0.4.0 does not intentionally change TLCC's visual styling; it changes how the stylesheet can be installed and kept up to date.
- This first automatic-delivery implementation could still be briefly delayed by browser/CDN caching.
- The project remains entirely CSS-only.

## v0.3.3 - 2026-09-10

### Added

- Added a cyan `REQUEST` card/badge for DarkPeers bridge messages containing a `darkpeers.org/requests/` link, including the `[New-Request]` torrent-request announcements seen in `#darkpeers`.
- Added a gold accent to the existing compact `request ↗` link when it appears inside a detected request message.

### Detection

- Request detection is deliberately based on the surviving `/requests/` anchor rather than the literal `[New-Request]` text, because CSS cannot inspect arbitrary text-node contents after the bridge.
- Any `DP`-bridged message containing a DarkPeers request URL receives the same `REQUEST` treatment. This avoids fragile text or adjacency heuristics while keeping TLCC entirely CSS-only.
- Native The Lounge highlighted-message backgrounds remain preserved; the request card background/border treatment is only applied to non-highlighted messages.

### Notes

- No DarkPeers bridge, userscript, JavaScript or The Lounge source changes are required.

## v0.3.2 - 2026-09-09

### Fixed

- Fixed false `RIGGED` classification when a normal giveaway's custom message contained a `😉` emoji.
- Tightened the rigged-reminder heuristic: the userscript-added `😉` must now survive as the trailing/last emoji element after the normal `🎁` + `✨` giveaway structure, instead of merely appearing anywhere in the message.
- Preserved genuine rigged detection through `😈`, including rigged-mode announcements and rigged entry responses.

### Investigated

- Re-checked Blutopia BON Giveaway v6.2.2 entry handling. Normal `has entered with the number ...` confirmations are emitted as text plus BBCode colours, with no distinctive emoji or other structure that survives the DarkPeers → IRC bridge.
- No broad CSS adjacency heuristic was added for normal entry confirmations because it would also misclassify ordinary consecutive web messages. TLCC remains CSS-only and prefers no styling over unreliable styling.

### Notes

- This is a CSS-only bugfix/hardening release; no bridge, userscript or The Lounge source changes are required.

## v0.3.1 - 2026-09-09

### Fixed

- Corrected the DarkPeers active-network scope introduced in v0.3: the original selector used nested `:has()` pseudo-classes, which browsers reject and therefore caused most TLCC rules to stop matching.
- Reworked the network scope to use a single valid `:has()` with alternatives for the active DarkPeers lobby or an active channel/query inside the DarkPeers network.
- Removed the remaining nested `:has()` pattern from the final sponsor thank-you heuristic.
- Restored the intended v0.3 behaviour: `WEB` badges, presence-noise hiding, compact DarkPeers links, UNIT3D preview suppression, media handling and giveaway styling now apply again while DarkPeers is active.
- Preserved network isolation: similarly named channels such as `#announce` on other IRC networks are not affected.

### Notes

- This is a corrective patch release for v0.3; no intentional visual redesign was introduced.
- The project remains CSS-only.

## v0.3 - 2026-09-09

### Added

- Proper active-network scoping for the **DarkPeers** IRC network using The Lounge's sidebar DOM.
- Centralised giveaway colour palette through `--tlcc-*` custom properties.
- `overscroll-behavior: contain` for the expanded touch-device channel topic.

### Changed

- TLCC is now explicitly DarkPeers-specific instead of behaving like a partly generic stylesheet.
- Runtime styling is applied only while a target belonging to the `DarkPeers` network is active.
- `#darkpeers` and `DP` bridge selectors are now case-insensitive where appropriate.
- Direct media URL detection now requires the file extension to end the URL path or be followed by `?` / `#`, reducing false positives.
- Generic DarkPeers page-link handling now explicitly excludes direct image/GIF URLs.
- DarkPeers page-preview control suppression now avoids direct media hosted on `darkpeers.org`.
- Several repeated selectors were consolidated with `:is()` without changing the intended visual result.

### Fixed

- DarkPeers bot-only `#announce` / `#pre` preview suppression no longer leaks into similarly named channels on other connected IRC networks.
- Global readability, preview, topic, mobile, own-message and link tweaks no longer affect non-DarkPeers networks in the same The Lounge instance.

### Notes

- The larger Custom Stylesheet editor remains intentionally global because it belongs to The Lounge itself, not to a specific IRC network.
- The network scope expects the local The Lounge network/lobby label to be `DarkPeers`.
- The project remains CSS-only; bridged usernames and text-only giveaway messages still cannot be semantically parsed.

## v0.2 - 2026-09-08

### Added

- Giveaway-aware styling for DarkPeers messages generated by the **Blutopia BON Giveaway** userscript.
- `GIVEAWAY` badge and gold card styling for main giveaway announcements and reminders detected through the preserved `🎁` + `✨` emoji signature.
- Gold-accented sponsor update digests detected through `✨`.
- `ENTRIES` treatment for `📋` entry-list messages.
- `TIME` treatment for `⏳` remaining-time responses.
- `SPONSORS` treatment for final `🥳` sponsor thank-you messages when immediately followed by the tie/result sequence.
- `RESULT` treatment for `🏆` winner summaries.
- `TIE` treatment for `⚠️` tie-break announcements.
- Magenta `RIGGED` treatment for `😈` rigged-mode announcements/marked entries and for rigged main reminders carrying `😉`.
- `UNRIGGED` treatment for the successful `😒` rigged-mode disable response.
- `NAUGHTY` treatment for `👮` naughty-list add messages.
- `ALERT` treatment for rejected/unauthorised messages marked with `🚫`, `🛑` or `🚨`.

### Changed

- The main giveaway announcement now replaces the normal `WEB` badge with `GIVEAWAY` instead of adding a second badge inside the message.
- Giveaway detection now relies on structured emoji markers that survive the DarkPeers → IRC bridge, rather than BBCode colour spans that are stripped before reaching The Lounge.
- Giveaway category styles avoid overriding The Lounge's native highlighted-message background.

### Removed

- Experimental giveaway detection based on original BBCode colour values, which cannot work after the bridge strips those spans.

### Known limitations

- CSS cannot reliably identify giveaway responses that arrive as plain text with no distinctive surviving DOM structure, including normal entry confirmations, `Giveaway Amount`, `your number is`, winner-scaling messages and time-adjustment messages.

## v0.1 - 2026-09-08

Initial public version.

### Added

- WEB badge and visual styling for messages bridged through `DP`.
- Heuristic detection and visual treatment of bridged replies.
- Compact DarkPeers labels for profiles, forum threads, requests, the BON pool and other site links.
- Removal of useless unauthenticated UNIT3D page previews and their dead preview toggles.
- Compact direct image and GIF links while preserving native media previews.
- Improved inline image sizing, spacing and mobile behaviour.
- Hiding of join, part, quit and condensed presence noise in `#darkpeers`.
- Handling for orphaned `New messages` markers caused by hidden presence events.
- Link/media previews are hidden in the bot-only `#announce` and `#PRE` channels.
- Less intrusive timestamps and hidden hostmasks.
- Touch-device formatted topic expansion.
- Larger Custom Stylesheet editor.
- Chrome Android and desktop testing with The Lounge 4.5.2.

### Fixed

- Corrected selector chaining for orphaned `New messages` detection.
- Corrected selector chaining for generic DarkPeers URL and Giphy fallback rules.