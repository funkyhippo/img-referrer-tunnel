const server = require("./src/server");
const { ping } = require("./src/utils");
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  if (process.env.NODE_ENV === "production" && process.env.ACCESS_URL) {
    setInterval(() => {
      ping(process.env.ACCESS_URL);
    }, 1000 * 30);
  }
});
