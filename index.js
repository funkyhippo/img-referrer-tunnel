const http = require("http"),
  httpProxy = require("http-proxy");
const PORT = process.env.PORT || 5000;

const normalizeUrl = (url) => {
  if (url.startsWith("/")) {
    url = url.slice(1);
  }
  if (url.startsWith("http")) {
    return url;
  } else {
    return "https://" + url;
  }
};
let proxy = httpProxy.createProxyServer({
  secure: false,
  changeOrigin: true, // Change the origin to get around CF
  ignorePath: true, // Ignore the path so target NGINX routes properly
});

proxy.on("proxyReq", function (proxyReq, req, res, options) {
  proxyReq.setHeader("referer", normalizeUrl(req.url));
});

proxy.on("error", function (err, req, res) {
  res.writeHead(500, {
    "Content-Type": "text/plain",
  });

  res.end("There was an error.");
});

let server = http.createServer(function (req, res) {
  console.log(
    `[${new Date()}] ${normalizeUrl(req.url)} by ${
      req.connection.remoteAddress
    }`
  );
  proxy.web(req, res, { target: normalizeUrl(req.url) });
});

console.log(`listening on port ${PORT}`);
server.listen(PORT);
