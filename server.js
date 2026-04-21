const { createServer } = require("http");
const { request: httpRequest } = require("http");
const { request: httpsRequest } = require("https");
const { URL } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOST || "0.0.0.0";
const port = Number.parseInt(process.env.PORT || "3000", 10);
const appDir = __dirname;

// Laravel API base
const apiBase = process.env.API_BASE_URL || "http://127.0.0.1:8000";

const app = next({ dev, hostname, port, dir: appDir });
const handle = app.getRequestHandler();

function proxyToApi(req, res) {
  const target = new URL(req.url, apiBase); // keeps /api/... path
  const client = target.protocol === "https:" ? httpsRequest : httpRequest;

  const proxyReq = client(
    {
      protocol: target.protocol,
      hostname: target.hostname,
      port: target.port || (target.protocol === "https:" ? 443 : 80),
      method: req.method,
      path: target.pathname + target.search,
      headers: {
        ...req.headers,
        host: target.host,
      },
    },
    (proxyRes) => {
      res.writeHead(proxyRes.statusCode || 502, proxyRes.headers);
      proxyRes.pipe(res);
    }
  );

  proxyReq.on("error", (err) => {
    res.statusCode = 502;
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify({ message: "API proxy error", error: err.message }));
  });

  req.pipe(proxyReq);
}

app.prepare().then(() => {
  createServer((req, res) => {
    if (req.url.startsWith("/api/")) {
      return proxyToApi(req, res);
    }
    return handle(req, res);
  }).listen(port, hostname, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
