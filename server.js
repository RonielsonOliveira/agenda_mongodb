require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.CONNECTIONSTRING)
  .catch((err) => console.error(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor OK 🚀");
});

module.exports = app;
