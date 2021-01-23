const server = require("./src/server");
const PORT = process.env.PORT || 5000;

console.log(`Listening on port ${PORT}`);
server.listen(PORT);
