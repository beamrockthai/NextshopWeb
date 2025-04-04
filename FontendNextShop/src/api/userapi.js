import axios from "axios";

const API_URL = "http://localhost:3001/api/User";

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}s`);
    return response.data.data;
  } catch (error) {
    console.error("Error No Users:", error);
    return [];
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
