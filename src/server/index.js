const path = require("path");
const express = require("express");
const volleyball = require("volleyball");
const socketio = require("socket.io");
// const db = require("./db/db");
const app = express();

if (process.env.NODE_DEV === "development") {
  app.use(volleyball);
}

app.use(express.json());

const staticFolder = path.join(__dirname, "..", "..", "static");
const distFolder = path.join(__dirname, "..", "..", "dist");
app.use(express.static(staticFolder));
app.use(express.static(distFolder));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(staticFolder, "index.html"));
});

// api routes
app.use("/api", require("./api"));

// error middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 3000;

// db.sync().then(() => {
const server = app.listen(port);
const io = socketio(server);
require("./socket")(io);
// });
