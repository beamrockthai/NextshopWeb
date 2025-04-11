import axios from "axios";

// const API_URL = "http://localhost:3001/api/Market";
// Local new

const API_URL = `${import.meta.env.VITE_API_URL}/Market`;

// ดึงเมนูทั้งหมดมา
export const getAllMarkets = async () => {
  try {
    const response = await axios.get(`${API_URL}s`);
    return response.data.data;
  } catch (error) {
    console.error("Error No Market:", error);
    throw error;
  }
};

//ดึง Id งาน
export const getMarketsById = async (id) => {
  try {
    console.log("📡 Fetching Job by ID:", id);
    const response = await axios.get(`${API_URL}/${id}`);
    console.log("API Response:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("❌ Error fetching job by ID:", error);
    throw error;
  }
};

// เพิ่มงานใหม่
export const addMarkets = async (Marketdata) => {
  try {
    const response = await axios.post(API_URL, Marketdata);
    return response.data.data;
  } catch (error) {
    console.error("Error adding market:", error);
    throw error;
  }
};

// แก้ไขงาน
export const updateMarkets = async (id, Marketdata) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, Marketdata);
    return response.data.data;
  } catch (error) {
    console.error("Error updating market:", error);
    throw error;
  }
};

// ลบงาน
export const deleteMarkets = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (error) {
    console.error("Error deleting market:", error);
    throw error;
  }
};
