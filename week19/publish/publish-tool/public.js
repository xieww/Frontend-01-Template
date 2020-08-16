const http = require("http");
const querystring = require("querystring");
const fs = require("fs");
const archiver = require("archiver");

const packname = "./package";

const options = {
  host: "localhost" || "127.0.0.1",
  port: 3001,
  path: "/?filename=" + "package.zip",
  method: "POST",
  headers: {
    "Content-Type": "application/octet-stream",
  },
};

const req = http.request(options, (res) => {
  console.log(`状态码: ${res.statusCode}`);
  console.log(`响应头: ${JSON.stringify(res.headers)}`);
});

req.on("error", (e) => {
  console.error(`请求遇到问题: ${e.message}`);
});

const archive = archiver("zip", {
  zlib: { level: 9 },
});

archive.directory(packname, false);
archive.finalize();

archive.pipe(req);

archive.on("end", () => {
  req.end();
});

// 将数据写入请求主体。
// const readStream = fs.createReadStream("./cat.jpg");
// readStream.pipe(req);
// readStream.on("end", () => {
//   req.end();
// });
