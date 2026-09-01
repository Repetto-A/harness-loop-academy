import server from "../dist/server/server.js";

export default async function handler(req, res) {
  try {
    const host = req.headers.host || "localhost";
    const protocol = req.headers["x-forwarded-proto"] || "https";
    const fullUrl = `${protocol}://${host}${req.url}`;

    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value) {
        if (Array.isArray(value)) {
          value.forEach((v) => headers.append(key, v));
        } else {
          headers.append(key, value);
        }
      }
    }

    const body =
      req.method !== "GET" && req.method !== "HEAD"
        ? await readRequestBody(req)
        : undefined;

    const request = new Request(fullUrl, {
      method: req.method,
      headers,
      body,
    });

    const response = await server.fetch(request, {}, {});

    res.statusCode = response.status;
    for (const [key, value] of response.headers.entries()) {
      res.setHeader(key, value);
    }
    if (response.body) {
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          res.end();
          break;
        }
        res.write(value);
      }
    } else {
      res.end();
    }
  } catch (error) {
    console.error("api/index handler error:", error);
    res.statusCode = 500;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end("Internal Server Error");
  }
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}
