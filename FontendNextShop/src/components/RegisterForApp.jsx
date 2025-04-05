import React, { useState } from "react";
import { register } from "../api/jwtLogin";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const RegisterForApp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await register(formData);
      if (res.success) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        navigate("/login"); // เปลี่ยนเส้นทางหลังสมัครd
      } else {
        setError("Registration failed");
      }
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <motion.div
      className="h-screen md:flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* ด้านซ้าย */}
      <motion.div
        className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-green-100 via-emerald-50 to-yellow-100 justify-around items-center hidden"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center px-6">
          <h1 className="text-black font-bold text-4xl font-sans">
            ยินดีต้อนรับสมาชิกทุกท่าน
          </h1>
          <p className="text-black mt-1">
            เป็นส่วนหนึ่งของร้านค้า N.Thatchanon And N.Prachwit And N.Chonlatarn
          </p>
        </div>
      </motion.div>

      {/* ด้านขวา - ฟอร์ม */}
      <motion.div
        className="flex md:w-1/2 justify-center py-10 items-center bg-white"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <form className="bg-white w-3/4" onSubmit={handleSubmit}>
          <h1 className="text-gray-800 font-bold text-2xl mb-1">สมัครสมาชิก</h1>
          <p className="text-sm font-normal text-gray-600 mb-7">
            สร้างบัญชีส่วนตัวของท่าน
          </p>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <input
            className="mb-4 px-4 py-2 w-full border-2 rounded-2xl outline-none"
            type="text"
            name="firstName"
            placeholder="ชื่อ"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            className="mb-4 px-4 py-2 w-full border-2 rounded-2xl outline-none"
            type="text"
            name="lastName"
            placeholder="นามสกุล"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            className="mb-4 px-4 py-2 w-full border-2 rounded-2xl outline-none"
            type="text"
            name="phoneNumber"
            placeholder="เบอร์โทรศัพท์"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <input
            className="mb-4 px-4 py-2 w-full border-2 rounded-2xl outline-none"
            type="email"
            name="email"
            placeholder="อีเมล"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="mb-6 px-4 py-2 w-full border-2 rounded-2xl outline-none"
            type="password"
            name="password"
            placeholder="รหัสผ่าน"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="block w-full bg-green-600 py-2 rounded-2xl text-white font-semibold hover:bg-green-700 hover:-translate-y-1 transition-all duration-500"
          >
            สมัครสมาชิก
          </button>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
          >
            ย้อนกลับ
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default RegisterForApp;
