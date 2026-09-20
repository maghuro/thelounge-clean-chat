# The Lounge Clean Chat

Custom CSS for [The Lounge](https://thelounge.chat/) focused on making the DarkPeers IRC experience cleaner and easier to read, especially where the website chat is bridged into IRC.

TLCC remains deliberately **CSS-only**. It does not patch The Lounge, the DarkPeers bridge, Docker images, JavaScript or the giveaway userscript.

**Current version:** v0.5.69  
**Tested with:** The Lounge 4.5.2 and the TNB tracker-first fork based on The Lounge 4.4.3  
**Browsers tested:** Chrome on Android and desktop\n\n**Performance-scope requirement:** TLCC v0.5.5 uses custom-property container style queries (`@container style(...)`). Minimum support for this exact custom-property form is Chromium/Edge 111+, Safari 18+, Firefox 151+ desktop and Firefox 155+ Android. Unsupported browsers fail gracefully by leaving the scoped TLCC rules inactive.

## v0.5.69: full-source audit hardening

A full pass over the marker contract found three edge cases and closes them: exact white/black IRC palette aliases are accepted, event-context colours require the full marker triplet instead of any matching coloured fragment, and BON Pool split continuations now remain blue.

## v0.5.68: cleaner final sponsor messages

Giveaway v1.3.16 formats the closing sponsor sequence as a sponsor-total/list message followed, only when notes exist, by a grouped “Messages from our sponsors” block. TLCC labels that second message as `GIVEAWAY · MESSAGES` on desktop and `GW · MESSAGES` on mobile.

The underlying `sponsor-messages` marker and event-wide BON Pool blue / Rigged Taxes pink context remain unchanged.

## v0.5.67: BON Pool event-wide blue identity

Giveaway v1.3.15 adds an invisible event-context sentinel after the existing type marker. TLCC uses it to keep every authoritative message from a BON Pool contribution giveaway in the same blue visual family instead of falling back to generic gold/green/orange category colours.

The final sponsor-note recap also has its own `SPONSOR MSGS` badge. Rigged Taxes uses the same mechanism with its existing pink identity.

## v0.5.66: split-continuation parity

The sentinel contract now also covers every adjacency-based continuation classifier: final RESULT fragments, generic split starts, BON Pool continuations and Rigged Taxes continuations. No continuation rule remains dependent on the old URL transport.

## v0.5.65: invisible giveaway bridge markers

Maghuro giveaway v1.3.14+ no longer publishes technical `#dpgw-v1-*` links into the DarkPeers chat. It emits two zero-width styled sentinels instead: a fixed formatting prefix plus one standard IRC colour identifying the event type. The DarkPeers website therefore shows no implementation URL, while the IRC bridge still carries a structural signal that TLCC can classify without parsing arbitrary message text.

TLCC recognises this transport for every authoritative giveaway event and keeps the former URL selectors only for backwards-compatible scrollback. New sentinel messages cannot produce the orphaned `()` that occurred when an HTML→IRC bridge serialized a hidden link as `(URL)`.

The marker transport remains CSS-only on the The Lounge side; no JavaScript, DOM mutation or patched client is required.

## v0.5.5: performance scope + new giveaway/PM classifications

v0.5.5 changes how TLCC scopes itself to the active DarkPeers network.

Previous releases nested almost the entire stylesheet under the same `body:has(...)` network fingerprint. The Lounge changes unread/highlight state in its channel list as messages arrive, so that relational selector could be invalidated repeatedly while a long scrollback was loaded.

The active-network fingerprint now runs once to expose:

```css
--tlcc-active: on;
```

All normal TLCC rules are gated through:

```css
@container style(--tlcc-active: on) { ... }
```

This keeps the same network fingerprint and CSS-only behaviour while removing the repeated `body:has(...)` prefix from the message classifiers.

The previous per-message BONanza size containers were also removed. In the supported layouts the sender column is already below the old threshold, so TLCC now uses the compact `BON ·` prefix directly instead of creating an inline-size containment context for every message.

Also new in v0.5.5:

- `GIVEAWAY · STATS` / mobile `GW · STATS` for the giveaway's surviving 📊 bar-chart response.
- DarkPeers private-message alerts sent by the `DP` bot are recognised structurally from their `/users/.../conversations/...` URL, receive a green **NEW PM** treatment, shorten the conversation URL to `PM ↗`, and suppress the useless unauthenticated UNIT3D preview.
- TNB compatibility uses the same active flag; its remaining bridged-message `:has()` is anchored on the active `#chat-container` rather than `body`.

The performance architecture was proposed by **T.R.A.V.I.S.**, Captain Chungus' suspiciously employable AI friend, after a Firefox performance alert led it to profile TLCC. The proposal was reviewed and adapted into TLCC's modular source rather than replacing the repository with the supplied flat stylesheet.

## v0.5.4: BONanza fork giveaway compatibility

v0.5.4 extends TLCC's CSS-only giveaway classifier for the in-development DarkPeers **BONanza fund donation giveaway** fork.

The fork introduces new sponsor-summary and final-result output, and long website messages may be split into independent IRC messages before The Lounge receives them. TLCC now recognises the surviving fork emoji structure, promotes the final trophy result when it is adjacent to the final sponsor thank-you, and treats a proven split giveaway start plus its immediate continuation as one visual giveaway sequence.

v0.5.4 also adds a separate structural BONanza family for recurring forum announcements:

- `BONANZA · NUMBERS` — identified from the surviving topic 12 + topic 414 links.
- `BONANZA · DONATIONS` — identified from topic 414 plus the `👉 ... 👈` structure; an immediately adjacent marker-free total continuation inherits the same category.
- `BONANZA · NEW MEMBERS` — identified from the dedicated topic 1119 link.

These are link/structure based rather than plain-text guesses. On narrow sender columns, the family prefix contracts automatically from `BONANZA ·` to `BON ·`; the breakpoint follows the actual `.from` column rather than the browser or chat width.

The detection deliberately remains based on structure that survives the bridge rather than parsing plain text. Literal `[1/2]` / `[2/2]` text is not read by CSS.

The BONanza fork is still being tested and may change its emitted messages. TLCC's v0.5.4 rules may therefore receive follow-up adjustments while that fork stabilises.

## v0.5.2: TNB sender-column bugfix

v0.5.2 widens the desktop sender column when TLCC detects structured TNB bridged messages in `#darkpeers`.

The TNB fork places the parsed website username inside `.from`, alongside TLCC's `WEB` / category badge. The normal The Lounge sender width can therefore clip longer website usernames once the badge is added.

The compatibility rule expands that sender column to `12rem` on desktop and removes the fork username's internal max-width restriction while preserving TLCC's existing badge layout. Mobile keeps its normal inline layout.

The fix is deliberately narrow: it only activates when the active DarkPeers view contains a TNB message marked `data-bridged="true"`. Stock The Lounge does not match the rule.

As everywhere else in TLCC, the local connection/network name is irrelevant. DarkPeers is identified from the real `#darkpeers` channel, so locally named connections such as `DP`, `Batatas` or anything else continue to work.

## v0.5.0: official + TNB fork compatibility

v0.5.0 adds compatibility with the TNB fork without changing the normal upstream The Lounge path.

The official client keeps the IRC bridge sender (`DP`) in `.from .user`. The TNB fork parses supported shoutbox messages client-side, keeps `data-from="DP"`, adds `data-bridged="true"`, and replaces that rendered sender with the real website username. Older TLCC releases therefore hid the real bridged username when they zero-sized `.from .user` to build the `WEB` badge.

TLCC now detects the fork-specific structured hook and keeps both pieces of information visible, for example:

```text
WEB (Furyan) message...
```

The same behaviour carries through semantic badges such as `REQUEST`, `BON POOL` and the giveaway family. The fork-only `mass_event` presence summary is also treated as join/part/quit noise so it does not leave orphaned **New messages** markers.

The compatibility rules are isolated in their own stylesheet and depend on fork-only DOM markers, so they are inert on official The Lounge.

## Scope

TLCC is explicitly scoped to the **DarkPeers** IRC network and does not depend on the local name you gave that connection in The Lounge.

Expected setup:

```text
DarkPeers fingerprint: #darkpeers
Main channel:          #darkpeers
Bridge bot:            DP
```

The active network is identified by the presence of the real `#darkpeers` channel inside the same sidebar network as the active lobby/channel. Your local connection can therefore be named `DarkPeers`, `DP`, `Batatas`, `IRC do Furyan` or anything else without breaking TLCC.

The theoretical edge case is another unrelated IRC network that also contains a channel literally named `#darkpeers`; TLCC would treat that network as DarkPeers too.

## What it does

- Replaces the `DP` bridge nickname with a compact **WEB** badge in `#darkpeers`.
- On the TNB fork, preserves the real website username next to the TLCC badge.
- Gives bridged website messages a subtle visual treatment.
- Detects likely bridged replies and adds a reply indicator.
- Replaces long DarkPeers URLs with compact labels such as `profile ↗`, `thread ↗`, `request ↗` and `BON pool ↗`.
- Highlights bridged DarkPeers request-link messages — including new torrent request announcements — with a cyan **REQUEST** card/badge and a gold `request ↗` link accent.
- Highlights bridged BON Pool notifications with a green **BON POOL** card/badge using the surviving `darkpeers.org/bon-pool` link as a reliable CSS-only hook.
- Adds a subtle `Enhanced by TLCC vX.X.X` marker to the `#darkpeers` topic so the currently loaded stylesheet version is visible at a glance.
- Hides useless unauthenticated UNIT3D `Login / Powered by UNIT3D` link previews.
- Keeps useful image/GIF previews while shortening direct media URLs.
- Uses stricter media URL matching to avoid false positives.
- Preserves direct media hosted on `darkpeers.org` instead of treating it as a generic site link.
- Improves inline image sizing and spacing.
- Hides join/part/quit noise in `#darkpeers`, including the TNB fork's aggregated `mass_event` presence summaries.
- Avoids orphaned **New messages** markers when only hidden presence events follow them.
- Reduces timestamp and hostmask visual noise.
- Adds mobile-specific readability improvements.
- Expands the real formatted channel topic on touch devices and on desktop when hovering the topic.
- Contains expanded-topic overscroll so the background chat is less likely to move while reading a long topic.
- Makes The Lounge's Custom Stylesheet editor larger.
- Hides link/media previews in the DarkPeers bot-only `#announce` and `#pre` channels.
- Adds giveaway-aware styling for messages generated by the **Blutopia BON Giveaway** userscript when their emoji markers survive the DarkPeers → IRC bridge, including the 📊 stats response.\n- Recognises DP direct-message notifications for new DarkPeers private messages from their surviving conversation URL, adds a **NEW PM** treatment, shortens the link, and hides the dead UNIT3D preview.
- Adds structural BONanza forum-announcement badges for **NUMBERS**, **DONATIONS** and **NEW MEMBERS**, with responsive `BONANZA ·` → `BON ·` contraction based on the real sender-column width.

## Request-aware styling

New torrent request announcements survive the DarkPeers → IRC bridge with a real link to `darkpeers.org/requests/...`, even though the surrounding `[New-Request]` label is only plain text. The surviving anchor is therefore used as the CSS hook.

A bridged `DP` message containing a DarkPeers request URL receives a **REQUEST** badge, a stronger cyan card accent and a gold-accented compact `request ↗` link. This keeps the detection CSS-only and does not depend on parsing the announcement text.

Because the selector is intentionally URL-based, an ordinary bridged website message that happens to contain a DarkPeers request link will receive the same **REQUEST** treatment. CSS cannot distinguish the literal `[New-Request]` text from other plain text, so TLCC labels the message by what it can reliably prove: it contains a DarkPeers request link.

## BON Pool styling

Bridged messages containing a real `darkpeers.org/bon-pool` link receive a green **BON POOL** badge, card accent and compact link treatment. The URL provides a reliable structured hook, so the rule does not need to inspect the surrounding `[BON-POOL]` plain text.

Native The Lounge highlighted-message backgrounds are preserved; the stronger BON Pool card background is only applied to non-highlighted messages.

## Topic version marker

The `#darkpeers` topic receives a subtle local-only suffix such as:

```text
· Enhanced by TLCC v0.5.4
```

This does **not** modify the real IRC topic. It is generated by CSS in the local The Lounge UI and is useful for confirming which TLCC version the browser has actually received. The full formatted topic can be expanded on touch devices and on desktop by hovering the topic.

The sidebar footer mirrors the loaded version and also shows the local analytics state, for example:

```text
Enhanced by TLCC v0.5.4 · Stats: OFF
```

or, when the user explicitly opted in with `?stats`:

```text
Enhanced by TLCC v0.5.4 · Stats: ON
```

On mobile, open the sidebar to see the footer marker. The topic marker remains a version-only secondary confirmation.\n\nSince v0.5.5, the active-DarkPeers scope is carried by the inherited `--tlcc-active` custom property and consumed through container style queries. This substantially reduces repeated relational-selector invalidation on channel-list mutations.

## Giveaway-aware styling

The **Blutopia BON Giveaway** userscript runs on the DarkPeers website. Its output is then relayed into IRC by the `DP` bridge, so TLCC never sees the userscript state itself — it only sees whatever structure survives that website → IRC → The Lounge path.

TLCC uses two confidence levels:

- **Structural classifications** such as `REQUEST` and `BON POOL` are based on real surviving DarkPeers links. They use solid badges and take precedence over giveaway heuristics.
- **Giveaway classifications** are based on surviving `.emoji` structure from the userscript. They use a dashed border. On desktop they use the `GIVEAWAY ·` family; on narrow mobile screens the prefix contracts to `GW ·`.

Current giveaway treatments include:

- `GIVEAWAY` — main announcement/reminder when the full `🎁 ... ✨ ... ✨` sequence survives.
- `GIVEAWAY · SPONSORS` — sponsor digest (`✨`) and the final sponsor thank-you (`🥳`) when it is adjacent to the tie/result end sequence.
- `GIVEAWAY · ENTRIES` — current entries list (`📋`).\n- `GIVEAWAY · STATS` — per-user giveaway statistics (`📊`).
- `GIVEAWAY · TIME` — remaining-time response (`⏳`).
- `GIVEAWAY · WINNERS` — trophy-bearing output (`🏆`) used as the honest fallback because the same trophy is used by both `!top` and final winner summaries.
- `GIVEAWAY · RESULT` — higher-confidence final result when stronger context survives: `🏆` plus podium/medal output, the rigged-result `👀` marker, or adjacency to a tie warning.
- `GIVEAWAY · TIE` — `⚠️` when adjacent to trophy output. Both orders are accepted because live bridge testing showed the asynchronous messages may reach IRC as either `TIE → RESULT` or `RESULT → TIE`.
- `GIVEAWAY · RIGGED` — `😈` rigged-mode/rigged-entry output, plus a full giveaway reminder whose userscript-added `😉` is the trailing emoji after the normal signature.
- `GIVEAWAY · UNRIGGED` — successful rigged-mode disable response (`😒`).
- `GIVEAWAY · NAUGHTY` — naughty-list **add** response (`👮`).
- `GIVEAWAY · REJECTED` — rejected/unauthorised responses marked with `🚫`, `🛑` or `🚨`.

Emoji rules explicitly exclude messages already carrying the structural `/requests/` or `/bon-pool` hooks, so the stronger link-derived classification wins if signals collide.

Generic command/response emoji such as `✅`, `💰` and `💸` remain plain `WEB` when CSS cannot identify their meaning safely. Text-only replies remain deliberately unclassified rather than guessing from nearby traffic.

## Installation

### Recommended: automatic updates

Paste this block into **Settings → Appearance → Custom Stylesheet**:

```css
/* ============================================================
   The Lounge Clean Chat (TLCC)
   Auto-updating stylesheet via Cloudflare Pages / GitHub
   https://github.com/maghuro/thelounge-clean-chat
   ============================================================ */
@import url("https://thelounge-clean-chat.pages.dev/thelounge-clean-chat.css");
/* ========================== /TLCC =========================== */
```

The normal URL above has analytics **OFF** and records no usage statistics.

If you explicitly want to contribute anonymous aggregate usage statistics, opt in with:

```css
@import url("https://thelounge-clean-chat.pages.dev/thelounge-clean-chat.css?stats");
```

The public base URL is stable and does not contain a version number or cache-busting token. Cloudflare Pages automatically deploys the current production branch from GitHub.

The public `thelounge-clean-chat.css` is built as a **single standalone stylesheet**. The repository keeps shared and fork-specific source modules separate for maintainability, but the production file is flattened before delivery so The Lounge never needs to resolve nested `@import` rules.

TLCC ships a Pages `_headers` policy using:

```text
Cache-Control: no-cache, max-age=0, must-revalidate
```

An already-open The Lounge page still needs a normal reload/reopen before the browser requests/revalidates the stylesheet.

If you add your own CSS overrides, place them **after** the closing TLCC comment. `@import` must remain before normal CSS rules.

### Manual installation

If you prefer a fully local/static copy:

1. Open **The Lounge**.
2. Go to **Settings → Appearance → Custom Stylesheet**.
3. Copy the contents of `thelounge-clean-chat.css`.
4. Paste it into the Custom Stylesheet field and save.

Manual installs do **not** update automatically.

For inline URL/image previews, The Lounge's normal link prefetch/media preview functionality must be enabled.

## Official The Lounge vs TNB fork

On official The Lounge, website usernames such as `[Furyan]` or `[Chungus]` arrive as plain bridge text. CSS cannot isolate that arbitrary substring, turn it into a native The Lounge nickname, assign native nick colours, or make it open the user context menu.

The TNB fork changes that situation before TLCC runs. Its parser converts supported bridged shoutbox messages into structured user DOM, preserves the original bridge sender in `data-from="DP"`, marks the message with `data-bridged="true"`, and renders the website username through the normal user component. Since v0.5.0, TLCC uses that fork-provided structure to retain the username while still displaying its own badge.

That is why TLCC can show:

```text
WEB (Furyan) message...
```

on the TNB fork while remaining CSS-only.

## Limitations

TLCC does not parse arbitrary message text. On official The Lounge, bridge usernames remain text. Giveaway responses that arrive with no distinctive structured marker cannot be identified safely.

`🏆` remains inherently ambiguous because Blutopia BON Giveaway uses it for both `!top` and final winner output. Trophy-only output therefore falls back to `GIVEAWAY · WINNERS` and is promoted to `GIVEAWAY · RESULT` only when extra evidence survives.

Emoji-based classifications remain intentionally heuristic. The bridge prepends the website username as plain text on official The Lounge, so selectors such as `:first-child` on an emoji element do not prove that the emoji begins the logical message.

The bot-only `#announce` / `#pre` rules only hide preview UI. CSS cannot prevent The Lounge from performing server-side prefetch/network requests.

## Anonymous usage analytics

Analytics are **strictly opt-in**.

The normal stylesheet URL:

```css
@import url("https://thelounge-clean-chat.pages.dev/thelounge-clean-chat.css");
```

records no analytics at all.

Only requests that explicitly include the `stats` query parameter contribute a datapoint:

```css
@import url("https://thelounge-clean-chat.pages.dev/thelounge-clean-chat.css?stats");
```

For opted-in requests, the analytics dataset stores an HMAC-derived pseudonymous IP identifier, country code, a coarse client class, hostname and response status. It deliberately does **not** store raw IP addresses, raw User-Agent strings, Referer values, The Lounge URLs, IRC nicknames, channels, messages or chat content.

See [`docs/ANALYTICS.md`](docs/ANALYTICS.md) for deployment, privacy and rollback details.

## Development

The repository keeps the normal TLCC core and narrow TNB compatibility modules separate for maintainability. A GitHub Actions build step concatenates those source modules into the single public `thelounge-clean-chat.css` served through Cloudflare Pages. This preserves one-import installation and avoids runtime nested-import assumptions.

This was developed through repeated DOM inspection, selector testing, browser comparisons, live bridge testing and source auditing of the TNB fork.

GPT-5.6 Sol provided substantial assistance during development, particularly with CSS selector reasoning, DOM analysis, debugging and cleanup.

## Contributions

Issues, suggestions and pull requests are very welcome.

If something behaves differently in another browser, theme, screen size or The Lounge version, please report it.
