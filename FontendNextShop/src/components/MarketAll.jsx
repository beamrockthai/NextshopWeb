import React, { useEffect, useState } from "react";
import { getAllMarkets } from "../api/marketApi";
import { motion } from "framer-motion";

const MarketAll = () => {
  const [markets, setMarkets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllMarkets();
      setMarkets(data);
    };
    fetchData();
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(markets.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = markets.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center gap-7 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-screen-xl">
        {currentItems.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-md p-5 border border-gray-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
              {!item.IsActive && (
                <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                  สินค้าหมด
                </span>
              )}
            </div>

            <div className="mt-4 flex justify-between items-center">
              <p className="text-xl font-bold text-gray-900">${item.price}</p>
            </div>

            <button
              disabled={!item.IsActive}
              className={`mt-4 w-full py-2 rounded-lg font-semibold transition-colors ${
                item.IsActive
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {item.IsActive ? "สั่งสินค้า" : "ไม่สามารถสั่งซื้อได้"}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <motion.div
        className="join mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`join-item btn ${
              currentPage === index + 1 ? "btn-primary" : ""
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </motion.div>
    </div>
  );
};

export default MarketAll;
