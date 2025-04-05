import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Layout
import LoginPage from "./Layout/login";
import RegisterForApp from "./components/RegisterForApp";
import LayoutMain from "./Layout/layoutmain";

// Pages and Components
import Home from "./pages/home";
import Profile from "./components/Profile";
import CreateMarket from "./components/CreateMarket";
import UserAdmin from "./components/userAdmin";

//Admin ProtechRoutes
import ProtectedRoute from "./admin/ProtectedRoutes";

function App() {
  const isLoggedIn = !!localStorage.getItem("token"); // ตรวจว่า login แล้วไหม

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterForApp />} />

      {/* Redirect ไป login หรือ home ตามสถานะ */}
      <Route
        path="/"
        element={<Navigate to={isLoggedIn ? "/home" : "/login"} />}
      />

      {/* Layout หลักหลัง login */}
      <Route path="/" element={<LayoutMain />}>
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<Profile />} />

        {/* Route เฉพาะ admin */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="marketAdmin" element={<CreateMarket />} />
          <Route path="userAdmin" element={<UserAdmin />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
