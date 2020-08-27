const http = require("http"),
  httpProxy = require("http-proxy"),
  urlParser = require("url");
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

const parseUrl = (rawUrl) => {
  const parsedUrl = urlParser.parse(rawUrl, true);
  return {
    query: parsedUrl.query,
    path: parsedUrl.path,
  };
};

let proxy = httpProxy.createProxyServer({
  secure: false,
  changeOrigin: true, // Change the origin to get around CF
  ignorePath: true, // Ignore the path so target NGINX routes properly
});

proxy.on("proxyReq", function (proxyReq, req, res, options) {
  proxyReq.setHeader("referer", options.referrer || normalizeUrl(req.url));
});

proxy.on("error", function (err, req, res) {
  res.writeHead(500, {
    "Content-Type": "text/plain",
  });

  res.end("There was an error.");
});

let server = http.createServer(function (req, res) {
  const parsedUrl = parseUrl(req.url);

  console.log(`[${new Date()}] ${req.url} by ${req.connection.remoteAddress}`);

  proxy.web(req, res, {
    target: normalizeUrl(req.url),
    referrer: parsedUrl.query.host,
  });
});

console.log(`listening on port ${PORT}`);
server.listen(PORT);
