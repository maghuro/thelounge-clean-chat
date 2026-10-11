# TLCC repository instructions

Read this before making any changes to `maghuro/thelounge-clean-chat`. These instructions are for future AI assistants and human contributors alike.

## Non-negotiable rules

1. **The Lounge Clean Chat (TLCC) is CSS-only in the browser.** Do not add client-side JavaScript, DOM mutation, browser extensions, patched The Lounge/DarkPeers clients, or dependencies to classify or style IRC messages.
2. **Only edit the source CSS modules.** `thelounge-clean-chat.css` is a **generated artifact**, not a source file. **Do not manually edit it, regenerate/commit it in a feature PR, or make parallel edits to both a module and the generated file.**
3. **GitHub Actions builds the artifact after changes reach `main`.** The workflow `.github/workflows/build-css.yml` concatenates the modules and commits the updated `thelounge-clean-chat.css` with `github-actions[bot]`. A source-only PR is correct, even if the checked-in generated file initially differs while that PR is open.
4. **Keep every selector scoped to its intended network/channel/sender.** Do not let DarkPeers classifiers, badges, or styling leak into IdleRPG or unrelated networks.
5. **Do not invent CSS text classifiers.** CSS cannot reliably match arbitrary words within the plain text of an IRC message. Classify only when the rendered DOM provides reliable selectors (for example, URLs, IRC formatting/emoji nodes, or client-provided attributes). Prefer no category over a wrong category.

## Repository map

| Path | Ownership / purpose |
| --- | --- |
| `thelounge-clean-chat-core.css` | Global UI readability plus shared DarkPeers rules and the DarkPeers active-network scope. |
| `thelounge-clean-chat-idlerpg.css` | Independent `#idlerpg` / `IdleRPG` bot styling, case-insensitive. No message-text event classifiers. |
| `thelounge-clean-chat-tnb.css` | TNB-fork-specific compatibility for parsed DarkPeers bridge messages. |
| `thelounge-clean-chat-tnb-layout.css` | TNB-specific layout adjustments. |
| `thelounge-clean-chat-stats.css` | CSS indicator for optional stats mode. |
| `thelounge-clean-chat-version.css` | **Single authoritative visible version**, via `--tlcc-version`. |
| `.github/workflows/build-css.yml` | **Authoritative module list and build order**; automatic build/commit of production CSS. |
| `thelounge-clean-chat.css` | **Generated output**; never edit or commit manually as part of a source PR. |
| `README.md`, `CHANGELOG.md` | User-facing behaviour, installation, limitations, and release history. |
| `_headers`, `_routes.json` | Cloudflare Pages caching policy and function routing. |
| `functions/` | Cloudflare Pages server-side handling of **opt-in analytics** (`?stats`); not browser-side styling. See `docs/ANALYTICS.md`. |

The build concatenates the **six source CSS modules** in this exact order, with two newlines between them:

1. `thelounge-clean-chat-core.css`
2. `thelounge-clean-chat-idlerpg.css`
3. `thelounge-clean-chat-tnb.css`
4. `thelounge-clean-chat-tnb-layout.css`
5. `thelounge-clean-chat-stats.css`
6. `thelounge-clean-chat-version.css`

**When adding, removing or renaming a module**, update **both** the workflow's `push.paths` filter **and** its ordered concatenation commands. Do not introduce nested `@import` in the production file: The Lounge loads one flat stylesheet.

## Safe change workflow

1. Inspect the current `main` and read the actual source module(s), the workflow and this file before changing anything. Do not assume the architecture based on an old conversation.
2. Implement the smallest CSS-only, correctly scoped change in the responsible source module. Add a separate source module only if it genuinely improves isolation; register it in the build workflow as above.
3. For a **behaviour-changing release**, bump the version in `thelounge-clean-chat-version.css`, update the `README.md` current-version line, and add a `CHANGELOG.md` entry. **Do not bake a version number into core/TNB/IdleRPG modules.** Documentation-only changes do not need a version bump.
4. Open a focused PR containing only changed source modules, documentation and any necessary workflow modifications. **Never include a manually generated `thelounge-clean-chat.css` diff in that PR.**
5. Check CSS syntax, specificity, selectors and scope against The Lounge's real DOM. Test mobile/desktop and ordinary `.highlight` messages when feasible; do not claim a browser test occurred if it did not.
6. After merging into `main`, verify the **Build flat production CSS** GitHub Action completed successfully and committed the generated stylesheet when a source module changed. Compare the final file against the workflow concatenation and confirm it contains the new version and rules. Only then check Cloudflare Pages delivery and reload The Lounge to revalidate its imported CSS.

A docs-only merge normally does **not** invoke the CSS build: the workflow watches source modules, its own YAML file, and the version module rather than all repository files. That is expected.

For a *local* build check, write to a temporary path rather than overwriting the tracked artifact. From the repository root:

```sh
tmp="$(mktemp)"
trap 'rm -f "$tmp"' EXIT
{
  cat thelounge-clean-chat-core.css
  printf '\n\n'
  cat thelounge-clean-chat-idlerpg.css
  printf '\n\n'
  cat thelounge-clean-chat-tnb.css
  printf '\n\n'
  cat thelounge-clean-chat-tnb-layout.css
  printf '\n\n'
  cat thelounge-clean-chat-stats.css
  printf '\n\n'
  cat thelounge-clean-chat-version.css
} > "$tmp"
# After the post-merge build completes on main:
cmp -s "$tmp" thelounge-clean-chat.css && echo "Generated CSS matches sources"
```

Note: On an unmerged feature branch, a mismatch with `thelounge-clean-chat.css` is normal because the post-merge build has not run yet.

## CSS-specific guardrails

- The DarkPeers network fingerprint is deliberately computed once using a scoped `body:has(...)` selector that sets `--tlcc-active: on`; most related rules live inside `@container style(--tlcc-active: on)`. Do not reintroduce repeated expensive active-network `:has()` prefixes or nest `:has()` inside `:has()`.
- IdleRPG is independent of the DarkPeers scope. Match `#idlerpg` and the `IdleRPG` sender case-insensitively via The Lounge's channel and message data attributes; preserve native highlights.
- Official The Lounge and the TNB fork render website users differently. Keep TNB-only behaviour guarded by actual TNB DOM markers such as `data-bridged="true"`; preserve real usernames and interactions.
- Some DarkPeers giveaways provide surviving structural sentinels, IRC formatting, URLs or emoji, but other responses are ambiguous. Preserve classification precedence and legacy compatibility; do not infer arbitrary text.
- Preserve the stable public import URL: `https://thelounge-clean-chat.pages.dev/thelounge-clean-chat.css`. The separate `?stats` opt-in path must stay opt-in and must not enable analytics for normal imports.
- A CSS stylesheet version bump is not a request to change the Cloudflare Functions or modify any unrelated userscript.

**Bottom line: modify modules, let the `main` workflow build the final CSS, verify the result. Never edit both source and generated CSS.**
