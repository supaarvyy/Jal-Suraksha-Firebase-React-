import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Schemes from "./pages/Schemes";
import InfoResources from "./pages/InfoResources";
import Grievance from "./pages/Grievance";
import Contact from "./pages/Contact";
import AshaLogin from "./pages/AshaLogin";
import Login from "./pages/Login";
import PatientReports from "./pages/PatientReports";
import Dashboard from "./pages/Dashboard"; // 🆕 ADD THIS IMPORT

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ username: "", role: "" });

  const handleLogin = (username, role) => {
    setUser({ username, role });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser({ username: "", role: "" });
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <Navbar user={user} onLogout={handleLogout} />

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* 🆕 ADD THIS ROUTE */}
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/info" element={<InfoResources />} />
          <Route path="/patient-reports" element={<PatientReports />} />
          <Route path="/grievance" element={<Grievance />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/asha-login" element={<AshaLogin />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}