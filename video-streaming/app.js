const express = require("express");
const fs = require("fs");

const app = express();
app.listen(8080, () => {
  console.log("Server Lsitening");
});

app.get("/video", (req, res) => {
  const range = req.headers.range;
  if (!range) res.status(400).send("error");
  const videoPath = "test.mp4";
  console.log(fs.statSync(videoPath));
  const videoSize = fs.statSync(videoPath).size;
  const chunkSize = 1000000;
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + chunkSize, videoSize - 1);
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start} - ${end} / ${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };
  res.writeHead(206, headers);

  const videoStream = fs.createReadStream(videoPath, { start, end });
  videoStream.pipe(res);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
