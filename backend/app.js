const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static(path.join(path.resolve(), "dist")));

const routes = require("./routes");
app.use("/api", routes);

module.exports = app;
