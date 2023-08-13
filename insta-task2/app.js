const express = require("express");
const redis = require("redis");
const redisClient = redis.createClient();
app = express();

app.listen(8080, () => {
  console.log("server Listening...");
});

console.log("Q");
app.get("/", async (req, res) => {
  const photos = await redisClient.get("photos");
  if (photos) {
    return res.json(JSON.parse(photos));
  }
  try {
    response = await fetch("https://jsonplaceholder.typicode.com/photos");
    response = await response.json();
    console.log(response);
    redisClient.set("photos", JSON.stringify(response));
    res.json(response);
  } catch (err) {
    console.log(err);
  }
});
