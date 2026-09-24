import { Link } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="bg-blue-800 shadow">
      <div className="max-w-7xl mx-auto flex items-center space-x-6 px-6 py-3 text-white text-sm font-medium">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/about" className="hover:underline">About Us</Link>
        <Link to="/dashboard" className="hover:underline">Dashboard</Link> {/* 🆕 NEW DASHBOARD LINK */}
        <Link to="/schemes" className="hover:underline">Schemes</Link>
        <Link to="/info" className="hover:underline">Information & Resources</Link>
        <Link to="/patient-reports" className="hover:underline">Patient Reports</Link>
        <Link to="/grievance" className="hover:underline">Grievance Redressal</Link>
        <Link to="/contact" className="hover:underline">Contact Us</Link>

        <Link
          to="/asha-login"
          className="ml-auto bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded text-center"
        >
          ASHA Login
        </Link>

        {/* Show logged-in username and Logout button */}
        {user.username && (
          <div className="flex items-center space-x-2 ml-4">
            <span className="text-yellow-300 font-semibold">{user.username} ({user.role})</span>
            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}