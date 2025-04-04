import React, { useEffect, useState } from "react";
import {
  getAllMarkets,
  addMarkets,
  updateMarkets,
  deleteMarkets,
} from "../api/marketApi";
import { motion } from "framer-motion";

const CreateMarket = () => {
  const [markets, setMarkets] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    IsActive: true,
  });
  const [editId, setEditId] = useState(null);

  const fetchMarkets = async () => {
    const data = await getAllMarkets();
    setMarkets(data);
  };

  useEffect(() => {
    fetchMarkets();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateMarkets(editId, formData);
    } else {
      await addMarkets(formData);
    }
    setFormData({ name: "", description: "", price: "", IsActive: true });
    setEditId(null);
    fetchMarkets();
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      IsActive: item.IsActive,
    });
  };

  const handleDelete = async (id) => {
    await deleteMarkets(id);
    fetchMarkets();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 py-6"
    >
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-lg p-4 mb-6 w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="ชื่อสินค้า"
            className="border p-2 rounded w-full"
            required
          />
          <input
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="รายละเอียดสินค้า"
            className="border p-2 rounded w-full"
            required
          />
          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            type="text"
            placeholder="ราคา"
            className="border p-2 rounded w-full"
            required
          />
          <label className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              name="IsActive"
              checked={formData.IsActive}
              onChange={handleChange}
              className="accent-indigo-600"
            />
            <span>ยังมีสินค้าอยู่</span>
          </label>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            {editId ? "บันทึกการแก้ไข" : "เพิ่มสินค้า"}
          </button>
        </div>
      </form>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-[600px] w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">ชื่อสินค้า</th>
              <th className="px-4 py-2 text-left">รายละเอียด</th>
              <th className="px-4 py-2 text-left">ราคา</th>
              <th className="px-4 py-2 text-left">สถานะ</th>
              <th className="px-4 py-2 text-left">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {markets.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.description}</td>
                <td className="px-4 py-2">฿{item.price}</td>
                <td className="px-4 py-2">
                  {item.IsActive ? (
                    <span className="text-green-600">พร้อมจำหน่าย</span>
                  ) : (
                    <span className="text-red-500">สินค้าหมด</span>
                  )}
                </td>
                <td className="px-4 py-2 space-y-2 sm:space-y-0 sm:space-x-2 flex flex-col sm:flex-row">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-3 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500"
                  >
                    แก้ไข
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default CreateMarket;
