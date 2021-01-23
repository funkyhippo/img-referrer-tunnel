const HOME_TEXT = `
Info here: http://github.com/funkyhippo/img-referrer-tunnel/

This is a barebones implementation of the well-known cors-anywhere proxy,
but with some additions that make image hotlinking more seamless.
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
