# The Lounge Clean Chat

Custom CSS for [The Lounge](https://thelounge.chat/) focused on making busy IRC channels easier to read, especially when messages are bridged from a website.

This stylesheet was originally built for the DarkPeers `#darkpeers` channel and its `DP` web/IRC bridge, but the relevant selectors can be adapted to other channels and bridge bots.

**Current version:** v0.1  
**Tested with:** The Lounge 4.5.2  
**Browsers tested:** Chrome on Android and desktop

## What it does

- Replaces the `DP` bridge nickname with a compact **WEB** badge.
- Gives bridged website messages a subtle visual treatment.
- Detects likely bridged replies and adds a reply indicator.
- Replaces long DarkPeers URLs with compact labels such as `profile ↗`, `thread ↗`, `request ↗` and `BON pool ↗`.
- Hides useless unauthenticated UNIT3D `Login / Powered by UNIT3D` link previews.
- Keeps useful image/GIF previews while shortening long media URLs.
- Improves inline image sizing and spacing.
- Hides join/part/quit noise in `#darkpeers` while keeping topic changes visible.
- Avoids orphaned **New messages** markers when only hidden presence events follow them.
- Reduces timestamp and hostmask visual noise.
- Adds mobile-specific readability improvements.
- Expands the real formatted channel topic on touch devices.
- Makes The Lounge's Custom CSS editor larger.

## Installation

1. Open **The Lounge**.
2. Go to **Settings → Appearance → Custom CSS**.
3. Copy the contents of [`thelounge-clean-chat.css`](thelounge-clean-chat.css).
4. Paste it into the Custom CSS field and save.

For inline URL/image previews, The Lounge's normal link prefetch/media preview functionality must be enabled.

## Adapting it to another setup

The stylesheet is currently configured for:

```text
Channel:    #darkpeers
Bridge bot: DP
```

To adapt it, replace the relevant `#darkpeers` channel selectors and `data-from="DP"` bridge nickname selectors.

## Limitations

Website usernames such as `[Furyan]` or `[Chungus]` are plain text sent by the bridge. CSS cannot turn those substrings into native The Lounge nickname elements, assign them native nick colours, or make them open The Lounge's user context menu.

The same limitation applies to other bridge text that merely looks like markup. This project deliberately stays **CSS-only** and does not require modifications to The Lounge, Docker images, JavaScript, or the bridge bot.

## Development

This was not a one-shot "vibe coding" exercise. The stylesheet was developed through repeated DOM inspection, selector testing, browser comparisons and edge-case debugging.

GPT-5.6 Sol provided substantial assistance during development, particularly with CSS selector reasoning, DOM analysis, debugging and cleanup.

## Contributions

Issues, suggestions and pull requests are very welcome.

If something behaves differently in another browser, theme, screen size or The Lounge version, please report it. Better selectors, support for additional media hosts and general visual improvements are also welcome.
