import React, { useState } from "react";
import { login } from "../api/jwtLogin";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Image from "../assets/loginFood.jpg";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login(formData);

      if (res.success) {
        localStorage.setItem("token", res.token);

        navigate("/home");
      } else {
        setError("Login failed");
      }
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <motion.div
      className="h-screen flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div
        className="hidden lg:flex w-full lg:w-1/2 justify-around items-center"
        style={{
          background: `url(${Image}) center center`,
          backgroundSize: "cover",
        }}
      ></div>

      <div className="flex w-full lg:w-1/2 justify-center items-center bg-white">
        <motion.div
          className="w-full px-8 md:px-32 lg:px-24"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <form
            className="bg-white rounded-md shadow-2xl p-5"
            onSubmit={handleSubmit}
          >
            <h1 className="text-gray-800 font-bold text-2xl mb-1">NEXTSHOP</h1>
            <p className="text-sm font-normal text-gray-600 mb-8">
              ยินดีต้อนรับทุกท่าน
            </p>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
              <input
                id="email"
                className="pl-2 w-full outline-none border-none"
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl">
              <input
                className="pl-2 w-full outline-none border-none"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="block w-full bg-green-600 mt-3 py-2 rounded-2xl hover:bg-green-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
            >
              Register
            </button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
