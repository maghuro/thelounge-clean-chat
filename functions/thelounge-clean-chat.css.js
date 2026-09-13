export async function onRequest(context) {
    const response = await context.next();
    const url = new URL(context.request.url);

    if (!url.searchParams.has("stats")) return response;
    if (context.request.method !== "GET") return response;
    if (response.status === 304) return response;
    if (response.status < 200 || response.status >= 300) return response;

    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.delete("etag");

    const css = await response.text();
    return new Response(css + '\n:root{--tlcc-stats-state:"ON"}\n', {
        status: response.status,
        statusText: response.statusText,
        headers,
    });
}
