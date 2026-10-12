export interface Env {
  extern_stream_media: R2Bucket;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Range",
  "Expose-Headers": "ETag, Content-Range, Accept-Ranges, Content-Length",
};

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (path === "/api/ping") {
      return Response.json({ status: "online", bucket: "extern-stream-media" }, { headers: corsHeaders });
    }

    // Media Range Request Streaming Route
    if (path.startsWith("/api/media/") && request.method === "GET") {
      const key = path.replace("/api/media/", "");
      const rangeHeader = request.headers.get("Range");

      try {
        if (rangeHeader) {
          const head = await env.extern_stream_media.head(key);
          if (!head) return new Response("File not found", { status: 404, headers: corsHeaders });

          const totalSize = head.size;
          const rangeMatch = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader);
          
          if (!rangeMatch) {
            return new Response("Range not satisfiable", { status: 416, headers: corsHeaders });
          }

          const start = rangeMatch[1] ? parseInt(rangeMatch[1], 10) : 0;
          const end = rangeMatch[2] ? parseInt(rangeMatch[2], 10) : totalSize - 1;
          const chunksize = (end - start) + 1;

          const object = await env.extern_stream_media.get(key, {
            range: { offset: start, length: chunksize }
          });

          if (!object || !object.body) {
            return new Response("Range not satisfiable", { status: 416, headers: corsHeaders });
          }

          return new Response(object.body, {
            status: 206,
            headers: {
              ...corsHeaders,
              "Content-Range": `bytes ${start}-${end}/${totalSize}`,
              "Accept-Ranges": "bytes",
              "Content-Length": chunksize.toString(),
              "Content-Type": head.httpMetadata?.contentType || "application/octet-stream",
            },
          });
        } else {
          const object = await env.extern_stream_media.get(key);
          if (!object || !object.body) {
            return new Response("File not found", { status: 404, headers: corsHeaders });
          }

          return new Response(object.body, {
            status: 200,
            headers: {
              ...corsHeaders,
              "Accept-Ranges": "bytes",
              "Content-Length": object.size.toString(),
              "Content-Type": object.httpMetadata?.contentType || "application/octet-stream",
            },
          });
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        return new Response(`Error: ${message}`, { status: 500, headers: corsHeaders });
      }
    }

    return new Response("Not found", { status: 404, headers: corsHeaders });
  },
};

export default worker;