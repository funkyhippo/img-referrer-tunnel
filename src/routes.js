const HOME_TEXT = `
Info here: http://github.com/funkyhippo/img-referrer-tunnel/

This is a barebones implementation of the well-known cors-anywhere proxy,
but with some additions that tailor it for image hotlinking.

The resolution strategy for images is as follows:
1. Host query parameter
2. Known mapping in the repo
3. Target origin
`;

const home = (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/plain",
  });
  res.end(HOME_TEXT);
};

module.exports = {
  home,
};
