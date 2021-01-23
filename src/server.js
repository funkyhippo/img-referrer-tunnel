const http = require("http");
const routes = require("./routes");
const utils = require("./utils");
const proxy = require("./proxy").proxy;

module.exports = http.createServer((req, res) => {
  console.log(`[${new Date()}] ${req.url} by ${req.connection.remoteAddress}`);

  switch (req.url) {
    case "/":
      return routes.home(req, res);
    default:
      return proxy.web(req, res, {
        target: utils.normalizeUrl(req.url),
      });
  }
});
