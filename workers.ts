export interface Env {
  // Bind your R2 bucket in wrangler.toml under the binding name 'MEDIA_VAULT'
  MEDIA_VAULT: R2Bucket;
  R2_ACCESS_KEY_ID: string;
  R2_SECRET_ACCESS_KEY: string;
  R2_BUCKET_NAME: string;
  R2_ENDPOINT: string; // e.g., "https://<account_id>.r2.cloudflarestorage.com"
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Replace with your frontend domain in production
  "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Range",
  "Expose-Headers": "ETag, Content-Range, Accept-Ranges, Content-Length",
};

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Route 1: Generate Pre-Signed PUT URL for direct client uploads (>100MB chunking solution)
      if (path.startsWith("/api/presign") && request.method === "GET") {
        const fileName = url.searchParams.get("filename");
        if (!fileName) {
          return new Response("Missing filename parameter", { status: 400, headers: corsHeaders });
        }

        // Generate a pre-signed URL logic or call AWS S3 SDK compatible signer for R2
        const presignedUrl = await generateR2PutPresignedUrl(env, fileName);
        return Response.json({ url: presignedUrl }, { headers: corsHeaders });
      }

      // Route 2: Stream media files with HTTP Range Request support
      if (path.startsWith("/api/media/") && request.method === "GET") {
        const key = path.replace("/api/media/", "");
        const rangeHeader = request.headers.get("Range");

        if (rangeHeader) {
          // Parse range header (e.g., "bytes=0-1048575")
          const parts = rangeHeader.replace(/bytes=/, "").split("-");
          const start = parseInt(parts[0], 10);
          
          // Get metadata first to check total file size
          const head = await env.MEDIA_VAULT.head(key);
          if (!head) return new Response("File not found", { status: 404, headers: corsHeaders });
          
          const totalSize = head.size;
          const end = parts[1] ? parseInt(parts[1], 10) : totalSize - 1;
          const chunksize = (end - start) + 1;

          // Fetch exact byte range from R2
          const object = await env.MEDIA_VAULT.get(key, {
            range: { offset: start, length: chunksize }
          });

          if (!object || !object.body) {
            return new Response("Range not satisfiable", { status: 416, headers: corsHeaders });
          }

          return new Response(object.body, {
            status: 206, // Partial Content
            headers: {
              ...corsHeaders,
              "Content-Range": `bytes ${start}-${end}/${totalSize}`,
              "Accept-Ranges": "bytes",
              "Content-Length": chunksize.toString(),
              "Content-Type": head.httpMetadata?.contentType || "application/octet-stream",
            },
          });
        } else {
          // Fallback: Stream entire file if no range requested
          const object = await env.MEDIA_VAULT.get(key);
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
      }

      return new Response("Endpoint not found", { status: 404, headers: corsHeaders });
    } catch (err: any) {
      return new Response(`Server Error: ${err.message}`, { status: 500, headers: corsHeaders });
    }
  },
};

// Helper stub for generating R2 compatible pre-signed PUT URLs
async function generateR2PutPresignedUrl(env: Env, fileName: string): Promise<string> {
  // You can use standard S3 SDK v3 configured with R2 credentials to generate signed URLs
  // or return a structured endpoint bound to your environment variables.
  return `${env.R2_ENDPOINT}/${env.R2_BUCKET_NAME}/uploads/${Date.now()}-${fileName}`;
}