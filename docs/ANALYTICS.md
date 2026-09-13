# TLCC request analytics

TLCC can count requests for the public `thelounge-clean-chat.css` asset with a narrowly scoped Cloudflare Pages Function and Workers Analytics Engine.

## Routing

`_routes.json` invokes Pages Functions only for `/thelounge-clean-chat.css`. All other project assets remain normal static Pages assets.

The root middleware calls `context.next()` for the static CSS response and writes analytics asynchronously with `waitUntil()`. Missing bindings, missing secrets, or analytics failures never block stylesheet delivery.

## Cloudflare bindings

Configure these on the Pages project and redeploy:

- Analytics Engine binding: `TLCC_ANALYTICS`
- Dataset: `tlcc_loads`
- Encrypted secret: `TLCC_ANALYTICS_SECRET`

Generate a strong secret locally, for example with `openssl rand -hex 32`, and store only the resulting value in Cloudflare's encrypted secret field. Do not commit it to Git.

## Data model

Each successful GET/revalidation of the production CSS writes one datapoint:

- `index1`: HMAC-SHA256-derived pseudonymous client IP identifier
- `blob1`: event name (`css-load`)
- `blob2`: Cloudflare country code
- `blob3`: coarse client class (`desktop`, `mobile`, `tablet`, `bot`, `cli`, or `unknown`)
- `blob4`: requested hostname
- `double1`: HTTP response status

The middleware deliberately does not store the raw IP address, raw User-Agent, Referer, or any The Lounge URL. The HMAC identifier is useful for approximate unique-IP counts while preventing the dataset from containing directly readable IP addresses.

Workers Analytics Engine currently retains data for three months.

## Opting out of analytics

A request whose stylesheet URL contains the `nostats` query parameter is served normally but does not write an analytics datapoint. Both forms below are accepted:

```css
@import url("https://thelounge-clean-chat.pages.dev/thelounge-clean-chat.css?nostats");
```

```css
@import url("https://thelounge-clean-chat.pages.dev/thelounge-clean-chat.css?nostats=1");
```

This is intended primarily for the maintainer's own The Lounge instance so personal reloads do not contaminate public-usage statistics. The opt-out is deliberately simple and is available to anyone who chooses to use it.

## Reversibility

To remove TLCC analytics completely, delete `functions/_middleware.js` and `_routes.json`, then redeploy. The stable public CSS URL and the normal user-facing `@import` do not change.
