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

router.use(
  cors({
    origin: "https://leaderboard-aqueeb.netlify.app",
    credentials: true,
  })
);

router.use(express.json({ limit: "50mb" }));
router.use(express.urlencoded({ extended: true, limit: "50mb" }));

router.use("/users", userRoutes);
router.use("/history", historyRoutes);

app.use("/.netlify/functions/app", router);
module.exports.handler = serverless(app);
