require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser"); //ไว้ใช้สําหรับส่ง body ให้หน้าบ้าน
const session = require("express-session");
const path = require("path");
const app = express();

//import routes
const Jwt = require("../src/Users/Routes/jwt.routes");
const User = require("../src/Users/Routes/user.routes");
const Market = require("../src/Market/Routes/job.routes");

// JSON Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

//useRoutes
app.use("/api", Jwt);
app.use("/api", User);
app.use("/api", Market);

module.exports = app;
