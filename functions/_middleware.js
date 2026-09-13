const EVENT_NAME = "css-load";
const HASH_CONTEXT = "tlcc-ip-v1";
const HASH_BYTES = 24;

function classifyClient(userAgent) {
    if (!userAgent) return "unknown";

    if (/(bot|crawler|spider|slurp|bingpreview|facebookexternalhit|discordbot|telegrambot|whatsapp)/i.test(userAgent)) {
        return "bot";
    }

    if (/(curl|wget|httpie|powershell|python-requests|go-http-client)/i.test(userAgent)) {
        return "cli";
    }

    if (/(ipad|tablet|kindle|silk)/i.test(userAgent)) {
        return "tablet";
    }

    if (/(mobi|android|iphone|ipod)/i.test(userAgent)) {
        return "mobile";
    }

    return "desktop";
}

async function hmacHex(secret, value) {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"],
    );

    const signature = new Uint8Array(
        await crypto.subtle.sign("HMAC", key, encoder.encode(value)),
    );

    return Array.from(signature.slice(0, HASH_BYTES), (byte) =>
        byte.toString(16).padStart(2, "0"),
    ).join("");
}

async function recordAnalytics(context, response) {
    const { request, env } = context;
    const dataset = env.TLCC_ANALYTICS;
    const secret = env.TLCC_ANALYTICS_SECRET;

    // Fail open: analytics must never be required to serve the stylesheet.
    if (!dataset || !secret) return;

    const ip = request.headers.get("CF-Connecting-IP");
    if (!ip) return;

    const userAgent = request.headers.get("User-Agent") || "";
    const ipHash = await hmacHex(secret, `${HASH_CONTEXT}\0${ip}`);
    const country =
        typeof request.cf?.country === "string" && /^[A-Z]{2}$/.test(request.cf.country)
            ? request.cf.country
            : "XX";

    // Analytics Engine schema:
    //   index1  = HMAC of client IP (raw IP is never stored)
    //   blob1   = event name
    //   blob2   = country code
    //   blob3   = coarse client class
    //   blob4   = requested hostname
    //   double1 = HTTP response status
    dataset.writeDataPoint({
        indexes: [ipHash],
        blobs: [
            EVENT_NAME,
            country,
            classifyClient(userAgent),
            new URL(request.url).hostname,
        ],
        doubles: [response.status],
    });
}

export async function onRequest(context) {
    const response = await context.next();

    // Only successful stylesheet GET/revalidation requests count as loads.
    if (context.request.method !== "GET") return response;
    if (response.status < 200 || response.status >= 400) return response;

    // Do not add analytics latency to the CSS response.
    context.waitUntil(
        recordAnalytics(context, response).catch((error) => {
            console.error(
                "TLCC analytics write failed:",
                error instanceof Error ? error.message : String(error),
            );
        }),
    );

    return response;
}
