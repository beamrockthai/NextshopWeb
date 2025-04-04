import React, { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { Store } from "lucide-react";

const LayoutMain = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ใช้สำหรับเช็ค path ปัจจุบัน
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* ✅ Sidebar: Fixed ตลอดจอ */}
      <div
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className={`fixed top-0 left-0 h-screen overflow-hidden border-r bg-white shadow-lg transition-all duration-300 ease-in-out z-50 ${
          isExpanded ? "w-56" : "w-[3.35rem]"
        }`}
      >
        <div className="flex h-full flex-col justify-between pt-2 pb-6">
          {/* Logo */}
          <div>
            <div className="w-max p-2.5 flex items-center space-x-2">
              <Store className="w-8 h-8 text-black transition duration-300 ease-in-out" />
              {isExpanded && (
                <span className="text-xl font-bold text-black">NextShop</span>
              )}
            </div>

            {/* Menu */}
            <ul className="mt-6 space-y-2 tracking-wide">
              {menuItems.map((item, index) => {
                const isActive = location.pathname === item.path;

                return (
                  <li className="min-w-max" key={index}>
                    <Link
                      to={item.path}
                      className={`group flex items-center space-x-4 px-4 py-3 rounded-md transition-colors duration-200 ease-in-out ${
                        isActive
                          ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {item.icon}
                      {isExpanded && (
                        <span className="group-hover:text-gray-700 font-medium transition duration-200">
                          {item.label}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Logout */}
          <div className="w-max -mb-3">
            <button
              onClick={handleLogout}
              className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 transition-colors duration-200 ease-in-out hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M19 10a.75.75 0 0 0-.75-.75H8.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 19 10Z"
                  clipRule="evenodd"
                />
              </svg>
              {isExpanded && (
                <span className="group-hover:text-gray-700 transition duration-200">
                  Logout
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ease-in-out px-6 pt-0 pb-6 ml-[3.35rem] ${
          isExpanded ? "md:ml-56" : "md:ml-[3.35rem]"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
};

// เมนู Sidebar
const menuItems = [
  {
    label: "Home",
    path: "/home",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="size-5"
      >
        <path
          fillRule="evenodd"
          d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    label: "Profile",
    path: "/profile",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="size-5"
      >
        <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
      </svg>
    ),
  },
  {
    label: "MarketAdmin",
    path: "/marketAdmin",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="size-5"
      >
        <path
          fillRule="evenodd"
          d="M6 5v1H4.667a1.75 1.75 0 0 0-1.743 1.598l-.826 9.5A1.75 1.75 0 0 0 3.84 19H16.16a1.75 1.75 0 0 0 1.743-1.902l-.826-9.5A1.75 1.75 0 0 0 15.333 6H14V5a4 4 0 0 0-8 0Zm4-2.5A2.5 2.5 0 0 0 7.5 5v1h5V5A2.5 2.5 0 0 0 10 2.5ZM7.5 10a2.5 2.5 0 0 0 5 0V8.75a.75.75 0 0 1 1.5 0V10a4 4 0 0 1-8 0V8.75a.75.75 0 0 1 1.5 0V10Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    label: "ManageUser",
    path: "/userAdmin",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="size-5"
      >
        <path d="M3.75 3A1.75 1.75 0 0 0 2 4.75v3.26a3.235 3.235 0 0 1 1.75-.51h12.5c.644 0 1.245.188 1.75.51V6.75A1.75 1.75 0 0 0 16.25 5h-4.836a.25.25 0 0 1-.177-.073L9.823 3.513A1.75 1.75 0 0 0 8.586 3H3.75ZM3.75 9A1.75 1.75 0 0 0 2 10.75v4.5c0 .966.784 1.75 1.75 1.75h12.5A1.75 1.75 0 0 0 18 15.25v-4.5A1.75 1.75 0 0 0 16.25 9H3.75Z" />
      </svg>
    ),
  },
];

export default LayoutMain;
