# Changelog

All notable changes to **The Lounge Clean Chat** will be documented here.

## v0.5.0 - 2026-09-12

### Added

- Added first-class compatibility with the tracker-first TNB fork of The Lounge while keeping official The Lounge behaviour unchanged.
- Added a fork-specific compatibility module keyed to the TNB fork's structured `data-bridged="true"` marker.
- Preserved the real website username rendered by the fork alongside TLCC's `WEB`, `REQUEST`, `BON POOL` and giveaway badges.
- Added handling for the fork-only `mass_event` presence-summary type, including orphaned `New messages` marker cleanup.

### Changed

- Split the public stylesheet into a stable v0.5.0 loader, shared core stylesheet and narrowly scoped TNB compatibility module.
- Kept the existing public Cloudflare Pages URL unchanged, so existing installations update without editing their Custom Stylesheet.
- Expanded the Pages no-cache policy from only the entry stylesheet to all CSS modules.
- Updated documentation to distinguish what TLCC can do on official The Lounge from what becomes possible when the TNB fork has already converted bridge text into structured user DOM.

### Fixed

- Fixed bridged website usernames disappearing on the TNB fork. The fork replaces `.from .user` with the parsed website username while retaining `data-from="DP"`; pre-v0.5.0 TLCC therefore zero-sized the real username when replacing the bridge sender with `WEB`.
- The compatibility override now restores that username only on messages explicitly marked by the fork as bridged, avoiding broad selectors or changes to the official client path.

### Tested

- Audited the supplied TNB fork source, including its shoutbox parser, message rendering and fork-only event types.
- Installed the fork separately and confirmed on Chrome Android that a live bridged message renders the TLCC `WEB` badge together with the real website username (`WEB (maghuro)`).
- Confirmed normal IRC messages remain visually separate from the bridged treatment.

### Notes

- TLCC remains CSS-only. It does not parse bridge text itself; on the TNB fork it consumes structured DOM that the fork has already produced.
- Thanks to **Furyan** for exposing the incompatibility and to **NeoByte** for the fork whose source made the actual cause wonderfully unambiguous. 😄

## v0.4.5 - 2026-09-11

### Changed

- Added a persistent `Enhanced by TLCC vX.X.X` marker to a second row of The Lounge's sidebar footer, so the loaded version is visible even when a long channel topic truncates the existing topic suffix on smaller desktop monitors.
- Kept the topic marker as a secondary confirmation instead of replacing it.
- Used the shared `#footer` layout rather than separate desktop/mobile markup; on mobile the marker appears when the sidebar is open.

### Testing

- Promoted after visual validation of the footer marker in the `dev` preview.
- The marker provides a persistent version check even when the channel topic is too long to expose the topic suffix.

### Notes

- Suggested by **Captain Chungus** after his very long topic required 60% browser zoom to expose the old marker, with an assist from the increasingly employable **T.R.A.V.I.S.** 🙃

## v0.4.4 - 2026-09-11

### Fixed

- Removed the requirement for the local The Lounge connection/lobby to be named `DarkPeers`. TLCC now fingerprints the active DarkPeers network from the presence of its real `#darkpeers` channel, so locally named connections such as `DP`, `Batatas` or anything else work without editing the stylesheet.
- Extended the active-network fingerprint to cover the network lobby, `#darkpeers` itself, and other active channels on the same network regardless of whether `#darkpeers` appears before or after them in the sidebar.
- Corrected end-of-giveaway ordering assumptions after live bridge testing proved asynchronous userscript messages may reach IRC in reverse order. `TIE` and final `SPONSORS` adjacency now accept both sides of the result sequence.
- Fixed tie messages that remained generic `WEB` when the final result reached IRC first.

### Changed

- Extended the full formatted channel-topic popup to desktop pointer devices: hovering the topic now reveals the same readable full-topic box already available on touch devices.
- Kept the normal compact one-line header unchanged until hover, so the desktop UI does not permanently consume extra vertical space.
- The expanded desktop topic includes the local `Enhanced by TLCC vX.X.X` marker, making the loaded TLCC version discoverable on small monitors where the normal topic line truncates before the suffix.
- Giveaway heuristics now form their own visible family: desktop badges use `GIVEAWAY · <CATEGORY>` and narrow mobile screens use the shorter `GW · <CATEGORY>` prefix.
- Main `🎁 ... ✨ ... ✨` announcements remain the compact `GIVEAWAY` badge.
- Sponsor digests are now labelled `GIVEAWAY · SPONSORS` instead of a generic gold `WEB` badge.
- Trophy-only output now falls back to `GIVEAWAY · WINNERS` rather than `WEB · WINNERS`; the trophy is known to belong to the giveaway userscript even when CSS cannot distinguish `!top` from a final single-winner summary.
- `GIVEAWAY · RESULT` now recognises stronger live-verified evidence: trophy + podium/medal output, trophy + the rigged final-result `👀` marker, or trophy adjacency to a tie warning.
- Renamed the old `ALERT` giveaway category to the more accurate `REJECTED` for `🚫`, `🛑` and `🚨` denial/invalid-entry responses.

### Tested

- Ran real giveaways specifically to exercise the DarkPeers website → `DP` → IRC → The Lounge path rather than relying only on synthetic DOM examples.
- Verified main giveaway, sponsor digest, entries, rigged-mode, rejected-entry and trophy/result treatments in live bridged output.
- Verified a real two-winner result and a real tie where IRC arrival order was `RESULT → TIE`, despite the userscript calling the tie send first.
- Verified a real single-winner rigged result carrying `🏆` + `👀`.
- Verified the new network fingerprint with a deliberately non-`DarkPeers` local connection name.

### Notes

- Thanks to **Captain Chungus** for proving that “the marker exists” and “the human can actually see the marker” are two different requirements on a small monitor with a very long topic. 🙃
- TLCC remains completely CSS-only; no changes to The Lounge, the DarkPeers bridge or Blutopia BON Giveaway are required.
- The fixed production URL and browser revalidation behaviour introduced in v0.4.2 are unchanged.
- Special thanks to **Furyan**, who found the connection-name bug by apparently doing the outrageous thing of naming his own connection whatever he wanted, and to **Captain Chungus** plus his beautiful **T.R.A.V.I.S.** for helping turn giveaway classification into a small research programme. 😂

## v0.4.3 - 2026-09-11

### Fixed

- Audited giveaway detection directly against **Blutopia BON Giveaway v6.2.2**, taking into account that the userscript runs on the DarkPeers website and TLCC only sees the flattened message after the `DP` website → IRC bridge.
- Tightened the main giveaway/reminder signature from simple `🎁` + `✨` presence to the userscript's actual ordered `🎁 ... ✨ ... ✨` structure.
- Tightened rigged-reminder detection to require the full giveaway signature plus the userscript-added trailing `😉`.
- Tightened `TIE` detection: `⚠️` is only classified when the immediately following `DP` message contains the trophy output expected by the userscript's end sequence.
- Prevented emoji-derived giveaway rules from overriding the stronger link-derived `REQUEST` and `BON POOL` classifications.
- Removed the misleading assumption that every `🏆` message is necessarily a final result. Blutopia BON Giveaway v6.2.2 also uses `🏆` for its `!top` leaderboard.

### Changed

- Emoji-derived badges now retain their web origin as `WEB · <CATEGORY>` and use a dashed border. Link-derived `REQUEST` and `BON POOL` badges remain solid.
- Trophy-only messages are now labelled `WEB · WINNERS`, which is true for both the `!top` leaderboard and a final single-winner summary.
- `WEB · RESULT` is reserved for higher-confidence multi-winner result messages where both `🏆` and a podium/medal emoji survive the bridge.
- Sponsor digests remain a gold-accented generic `WEB` message rather than receiving a semantic badge.
- Corrected the `NAUGHTY` documentation: `👮` is emitted by the naughty-list **add** response; removal uses `🥳`.
- Refactored the repeated DarkPeers active-network guard into one outer scope using **native CSS nesting** and explicit `&` selectors. This removes 93 copied `body:has(...)` guards, improving readability and maintainability without claiming a selector-performance improvement.

### Reviewed

- Considered using `:first-child` / positional emoji selectors as an authenticity check, but deliberately rejected that as proof: the bridge prepends `[username]` as a plain text node, and CSS element-child pseudo-classes do not account for text nodes.
- Reviewed the performance concern around repeated `:has()` and forward sibling lookahead. No performance regression is claimed without measurement; the existing unread-marker trade-off remains unchanged pending profiling.

### Notes

- This remains entirely CSS-only. No userscript, bridge, JavaScript or The Lounge source modification is required.
- The stricter classifier policy intentionally prefers an occasional missed decoration over presenting an uncertain emoji match as authoritative.
- Special mention to **Chungus** and his beautiful **Travis** — not strictly required for CSS classification, but clearly essential to the research methodology. 😏

## v0.4.2 - 2026-09-11

### Fixed

- Moved the recommended automatic delivery path to a stable **Cloudflare Pages** endpoint so TLCC can control the stylesheet's browser-cache policy.
- Added a Pages `_headers` rule for `thelounge-clean-chat.css` using `Cache-Control: no-cache, max-age=0, must-revalidate`, preventing browsers from treating an old release as fresh for hours.
- Added `X-Content-Type-Options: nosniff` to the published stylesheet response.

### Changed

- The recommended automatic loader is now `https://thelounge-clean-chat.pages.dev/thelounge-clean-chat.css`.
- Corrected the project documentation to use The Lounge's actual UI terminology: **Custom Stylesheet**.
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

- DarkPeers bot-only `#announce` / `#pre` preview suppression no longer leaks into similarly named channels on other IRC networks.
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