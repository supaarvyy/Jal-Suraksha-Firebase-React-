import { useState } from "react";

function Login({ onLogin }) {
  const [currentView, setCurrentView] = useState("login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
    email: "",
  });
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password, role, email } = formData;

    if (!username || !password || !role || !email) {
      setError("⚠️ Please fill all fields before submitting.");
      return;
    }

    if (!validateEmail(email)) {
      setError("⚠️ Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccess("✅ Verification code sent to your email!");
      setCurrentView("verify");
      startCountdown();
    }, 2000);
  };

  const handleVerification = (e) => {
    e.preventDefault();
    if (verificationCode === "123456") {
      onLogin(formData.username, formData.role);
    } else {
      setError("❌ Invalid verification code.");
    }
  };

  /* ================= VERIFY SCREEN ================= */
  if (currentView === "verify") {
    return (
      <div
        className="relative flex items-center justify-center min-h-screen"
        style={{
          backgroundImage: "url('/assets/bg-farm.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-white/45"></div>

        <div className="relative z-10 bg-white/90 p-8 rounded-2xl shadow-2xl w-[420px] border border-gray-100">
          <h2 className="text-2xl font-bold text-center mb-4">
            Verify Your Email
          </h2>

          <form onSubmit={handleVerification} className="space-y-4">
            <input
              type="text"
              maxLength="6"
              placeholder="000000"
              value={verificationCode}
              onChange={(e) =>
                setVerificationCode(e.target.value.replace(/\D/g, ""))
              }
              className="w-full px-4 py-3 text-center text-xl border rounded-xl"
            />

            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}
            {success && (
              <p className="text-green-600 text-sm text-center">
                {success}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
            >
              Verify Email
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* ================= LOGIN SCREEN ================= */
  return (
    <div
      className="relative flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: "url('/assets/bg-farm.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-white/45"></div>

      {/* CARD WIDTH INCREASED ~3% */}
      <div className="relative z-10 bg-white/90 px-10 py-8 rounded-2xl shadow-xl w-[535px] border border-gray-100">
        {/* JAN-SURAKSHA LOGO */}
        <div className="flex justify-center mb-4">
          <img
            src="/assets/jan-suraksha.png"
            alt="Jal Suraksha Portal"
            className="h-20"
          />
        </div>

        <h2 className="text-3xl font-bold text-center text-blue-700 mb-1">
          Jan Suraksha Portal
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Water Quality Monitoring System
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* CHOOSE ROLE (WIDER) */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-6 py-3 border rounded-xl text-base"
          >
            <option value="">Choose your role</option>
            <option value="admin">👨‍💼 Admin</option>
            <option value="doctor">👩‍⚕️ Doctor</option>
            <option value="worker">👷‍♂️ Health Worker</option>
            <option value="volunteer">🤝 Volunteer</option>
          </select>

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-6 py-3 border rounded-xl"
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-6 py-3 border rounded-xl"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-6 py-3 border rounded-xl"
          />

          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
          >
            {isLoading ? "Sending..." : "Login & Send Verification"}
          </button>
        </form>

        {/* FOOTER — HUMAN RIGHTS FORMAT */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            © 2026 Jan Suraksha Portal. All Human Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
