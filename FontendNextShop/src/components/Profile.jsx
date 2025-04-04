import React, { useEffect, useState } from "react";
import { getUserProfile } from "../api/user";
import { motion } from "framer-motion";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserProfile();
        setUser(res.data);
      } catch (err) {
        setError(err.message || "Failed to load user profile");
        console.error("❌ Failed to load user profile", err);
      }
    };

    const token = localStorage.getItem("token");

    fetchUser();
  }, []);

  if (error) {
    return (
      <motion.div
        className="p-10 text-red-500 font-semibold text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {error}
      </motion.div>
    );
  }

  if (!user) {
    return (
      <motion.div
        className="p-10 text-center text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      ></motion.div>
    );
  }

  return (
    <div className="space-y-6 p-6 pb-16 md:p-10 bg-white rounded-2xl shadow-xl">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">ตั้งค่า</h2>
        <p className="text-muted-foreground">
          จัดการการตั้งค่าบัญชีของคุณและตั้งค่าอีเมล์
        </p>
      </div>

      <div className="shrink-0 bg-gray-200 h-[1px] w-full"></div>

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
          <a
            className="inline-flex items-center rounded-md text-sm font-medium bg-gray-100 h-9 px-4 py-2 justify-start"
            href="#"
          >
            บัญชี
          </a>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 lg:max-w-2xl space-y-6"
        >
          <h2 className="text-lg font-bold tracking-tight">โปรไฟล์</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">ชื่อ</p>
              <p className="text-lg font-semibold">{user.firstName}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">นามสกุล</p>
              <p className="text-lg font-semibold">{user.lastName}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">อีเมล</p>
              <p className="text-lg font-semibold">{user.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">เบอร์โทรศัพท์</p>
              <p className="text-lg font-semibold">{user.phoneNumber}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
