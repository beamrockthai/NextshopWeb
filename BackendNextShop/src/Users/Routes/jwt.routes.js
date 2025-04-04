const express = require("express");
const {
  createUser,
  loginUser,
  getMe,
} = require("../Controller/user.jwt.controller");
const authenticateToken = require("../middleware/authMiddleware");
const User = require("../model/user.model");
const jwt = require("jsonwebtoken");

const router = express.Router();

//Register
router.post("/auth/Register", createUser);
router.post("/auth/login", loginUser);
router.get("/me", authenticateToken, getMe);

module.exports = router;
