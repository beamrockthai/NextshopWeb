require("dotenv").config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // ความปลอดภัยทาง password hash รหัสผ่าน
const User = require("../model/user.model");
const { encrypt, decrypt } = require("../../utils/encrypt"); // encrypt เข้ารหัส , decrypt ถอนรหัส

//CreateUsers
exports.createUser = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10); //hashpassord ไว้
    }

    if (req.body.phoneNumber) {
      req.body.phoneNumber = encrypt(req.body.phoneNumber); // สมัครได้ทําการเข้ารหัสไว้ encrypt
    }

    if (req.body.email) {
      req.body.email = encrypt(req.body.email); //สมัครได้ทําการเข้ารหัสไว้ encrypt
    }

    const user = await User.create(req.body);

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });

    res
      .status(200)
      .json({ success: true, message: "Register successful", token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const encryptedEmail = encrypt(email); // เอาอีเมลuser ทําการเข้ารหัสเเบบเดียว
    const user = await User.findOne({ where: { email: encryptedEmail } }); // จากนั้นก็ where จากฐานข้อมูล

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: { id: user.id, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "firstName", "lastName", "email", "phoneNumber"],
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // ถอดรหัส
    const decryptedUser = {
      ...user.toJSON(),
      email: decrypt(user.email),
      phoneNumber: decrypt(user.phoneNumber),
    };

    res.status(200).json({ success: true, data: decryptedUser });
  } catch (error) {
    console.error("Error in getMe:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
