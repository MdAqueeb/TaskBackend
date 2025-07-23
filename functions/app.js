const serverless = require("serverless-http");
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("../routes/users.js");
const historyRoutes = require("../routes/history.js");
const connectDB = require("../config/db.js");
const cors = require("cors");

const app = express();
const router = express.Router();

connectDB();

app.use(
  cors({
    origin: "https://leaderboard-aqueeb.netlify.app",
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/users", userRoutes);
app.use("/history", historyRoutes);

app.use("/.netlify/functions/app", router);
module.exports.handler = serverless(app);
