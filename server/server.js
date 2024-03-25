const express = require("express");
const createError = require("http-errors");
const path = require("path");
const http = require("http");
const https = require("https");
const fs = require("fs");
const cors = require("cors");

const postsRouter = require("./routers/posts");
const usersRouter = require("./routers/users");
const groupsRouter = require("./routers/groups");
const lineRouter = require("./routers/line");

var privateKey = fs.readFileSync(path.join(__dirname, "..", "sslcert", "sjj_cat.key"), "utf8");
var certificate = fs.readFileSync(path.join(__dirname, "..", "sslcert", "sjj_cat.crt"), "utf8");
const credentials = { key: privateKey, cert: certificate };

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static(path.join(__dirname, "..", "build")));

app.use((req, res, next) => {
  console.log("Time: ", Date.now());
  console.log(`${req.method} ${req.url} ${req.ip}`);
  console.log(`Body: `);
  for (let key in req.body) {
    console.log(`\t${key}: ${req.body[key]}`);
  }
  next();
});

app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.use("/groups", groupsRouter);
app.use("/linewebhook", lineRouter);

app.get("/default_profile", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "public", "default_profile.png"));
});

app.get("/default_group_profile", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "public", "default_group_profile.png"));
});

app.get("/sportjiojiologo", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "public", "sportjiojiologo.png"));
});

app.get("/server", (req, res) => {
  res.send("welcome to sportjiojio backend!!");
});

app.get("/", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
  } catch (err) {
    console.log(err);
    res.send("client is not built yet");
  }
});

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(3000, () => console.log("HTTP server is listening on port 3000"));

httpsServer.listen(443, () => console.log("HTTPS server is listening on port 443"));
