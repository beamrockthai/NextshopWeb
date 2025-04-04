import axios from "axios";

const API_URL = "http://localhost:3001/api";

// user.js
export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("❌ No token found");

    const response = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    localStorage.removeItem("token"); // ลบ token ที่หมดอายุทิ้ง
    throw (
      error.response?.data || {
        success: false,
        message: "Failed to fetch user profile",
      }
    );
  }
};
