# Changelog

All notable changes to **The Lounge Clean Chat** will be documented here.

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
- Larger Custom CSS editor.
- Chrome Android and desktop testing with The Lounge 4.5.2.

### Fixed

- Corrected selector chaining for orphaned `New messages` detection.
- Corrected selector chaining for generic DarkPeers URL and Giphy fallback rules.
