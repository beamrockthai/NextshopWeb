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

function App() {
  return (
    <Routes>
      {/* ❌ หน้าไม่มี Layout */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterForApp />} />
      <Route path="/" element={<Navigate to="/home" />} />

      {/* ✅ หน้าใน Layout */}
      <Route path="/" element={<LayoutMain />}>
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="marketAdmin" element={<CreateMarket />} />
        <Route path="userAdmin" element={<UserAdmin />} />
      </Route>
    </Routes>
  );
}

export default App;
