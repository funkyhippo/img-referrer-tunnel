const httpProxy = require("http-proxy");
const utils = require("./utils");

const proxy = httpProxy.createProxyServer({
  secure: false,
  changeOrigin: true, // To get around CF/most proxies
  ignorePath: true, // Ignore path for proxies like NGINX to route
  followRedirects: true, // For GDrive images
});

proxy.on("proxyReq", (proxyReq, req, res, options) => {
  try {
    if (!options["hopped"]) {
      proxyReq.setHeader("referer", utils.getRefererHeader(req));
    }
    options["hopped"] = true;
  } catch (e) {
    console.log(e);
  }
});

proxy.on("proxyRes", (proxyRes, req, res) => {
  if (
    proxyRes.statusCode === 200 &&
    proxyRes.headers["content-type"].startsWith("image")
  ) {
    Object.keys(proxyRes.headers).forEach((header) => {
      delete proxyRes.headers[header];
    });
    proxyRes.headers["cache-control"] = "public, max-age=604800";
    proxyRes.headers["access-control-allow-origin"] = "*";
  } else {
    res.writeHead(500, {
      "Content-Type": "text/plain",
    });
    res.end("Invalid content type. This proxy only supports images.");
  }
});

proxy.on("error", (err, req, res) => {
  res.writeHead(500, {
    "Content-Type": "text/plain",
  });
  res.end("There was an error.");
});

module.exports = {
  proxy,
};
