const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());

//dev
//proxy all /api/ routes to our api server on port 8820
if (process.env.NODE_ENV === "dev") {
  console.log("only running on dev");
  app.use(
    "/api/",
    proxy({ target: "http://localhost:8083", changeOrigin: true })
  );
}
// Add headers
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8090");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use(express.static(path.join(__dirname, "../public")));

app.get("/*", function(req, res) {
  const filename = path.resolve(__dirname, "./../public/dist/index.html");
  fs.readFile(filename, (err, result) => {
    if (err) {
      return next(err);
    }
    res.set("content-type", "text/html");
    res.send(result);
    res.end();
  });
});

app.listen(process.env.PORT || 8090, () =>
  console.log(`Listening on port ${process.env.PORT || 8090}!`)
);
