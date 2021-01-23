const urlParser = require("url");
const mapping = require("../mapping.json");

const normalizeUrl = (url) => {
  if (url.startsWith("/")) {
    url = url.slice(1);
  }
  return url.startsWith("http") ? url : `https://${url}`;
};

/**
 * The order in which the referer is attained follows this precedence:
 *  1. host query param
 *  2. known mapping
 *  3. target origin
 */
const getRefererHeader = (req) => {
  const parsedUrl = urlParser.parse(req.url, true);
  if (parsedUrl.query.host) {
    return parsedUrl.query.host;
  }
  for (let [target, referer] of Object.entries(mapping)) {
    if (req.url.includes(target)) {
      return referer;
    }
  }
  return normalizeUrl(req.url);
};

module.exports = {
  normalizeUrl,
  getRefererHeader,
};
