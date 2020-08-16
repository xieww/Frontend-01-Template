const http = require("http");
const fs = require("fs");
const unzip = require("unzipper");

const server = http.createServer((req, res) => {
  // const matched = req.url.match(/filename=([^&]+)/);
  // const filename = matched && matched[1];
  // if (!filename) {
  //   return;
  // }
  // const writeStream = fs.createWriteStream("../server/public/" + filename);

  // req.pipe(writeStream);

  let writeStream = unzip.Extract({ path: "../server/public" });

  // 等同于  req.pipe
  req.on("data", (trunk) => {
    writeStream.write(trunk);
  });
  req.on("end",(trunk) => {
    writeStream.end(trunk);
  })

  res.on("end", () => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("okay");
  });
});

server.listen(3001);
