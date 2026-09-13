# TLCC request analytics

TLCC can count requests for the public `thelounge-clean-chat.css` asset with a narrowly scoped Cloudflare Pages Function and Workers Analytics Engine.

Analytics are **strictly opt-in**. The normal stylesheet URL does not record any analytics. A datapoint is written only when the stylesheet request explicitly contains the `stats` query parameter.

## Routing

`_routes.json` invokes Pages Functions only for `/thelounge-clean-chat.css`. All other project assets remain normal static Pages assets.

The root middleware immediately serves the normal static CSS response without analytics unless `stats` is explicitly present in the query string. For opted-in requests, the middleware calls `context.next()` for the CSS response and writes analytics asynchronously with `waitUntil()`. Missing bindings, missing secrets, or analytics failures never block stylesheet delivery.

## Cloudflare bindings

Configure these on the Pages project and redeploy:

- Analytics Engine binding: `TLCC_ANALYTICS`
- Dataset: `tlcc_loads`
- Encrypted secret: `TLCC_ANALYTICS_SECRET`

Generate a strong secret locally, for example with `openssl rand -hex 32`, and store only the resulting value in Cloudflare's encrypted secret field. Do not commit it to Git.

## Opting in

The normal recommended import does not record statistics:

```css
@import url("https://thelounge-clean-chat.pages.dev/thelounge-clean-chat.css");
```

To explicitly contribute anonymous usage statistics, add the `stats` query parameter:

```css
@import url("https://thelounge-clean-chat.pages.dev/thelounge-clean-chat.css?stats");
```

`?stats=1` is also accepted. No analytics datapoint is written unless the parameter is present.

## Data model

Each successful opted-in GET/revalidation of the production CSS writes one datapoint:

- `index1`: HMAC-SHA256-derived pseudonymous client IP identifier
- `blob1`: event name (`css-load`)
- `blob2`: Cloudflare country code
- `blob3`: coarse client class (`desktop`, `mobile`, `tablet`, `bot`, `cli`, or `unknown`)
- `blob4`: requested hostname
- `double1`: HTTP response status

The raw client IP is used only transiently at request time as the input to an HMAC and is never written to the analytics dataset. The dataset deliberately does not store raw IP addresses, raw User-Agent strings, Referer values, The Lounge URLs, IRC nicknames, channels, messages, or chat content.

The HMAC-derived identifier exists only to provide an approximate unique-IP count without storing directly readable IP addresses. The User-Agent is reduced immediately to a coarse client class and the original string is not stored.

Workers Analytics Engine currently retains data for three months.

## Reversibility

To remove TLCC analytics completely, delete `functions/_middleware.js` and `_routes.json`, then redeploy. The stable public CSS URL and the normal user-facing `@import` do not change.
