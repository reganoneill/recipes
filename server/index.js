const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 8090;

app.use(cors());

//dev
//proxy all /api/ routes to our api server on port 8083 (not using nginx webserver as gateway)
if (process.env.NODE_ENV === "dev") {
  console.log("only running on dev");
  app.use(
    "/api/",
    proxy({ target: "http://localhost:8083", changeOrigin: true })
  );
}

app.use(express.static(path.join(__dirname, "../public")));

app.get("/*", function(req, res) {
  const filename = path.resolve(
    __dirname,
    "./../public/recipes/dist/index.html"
  );
  fs.readFile(filename, (err, result) => {
    if (err) {
      return next(err);
    }
    res.set("content-type", "text/html");
    res.send(result);
    res.end();
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
