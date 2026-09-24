// Note: This component expects Link to be available from react-router-dom in your project
import { Users, Droplet, ShieldCheck, Cpu, BarChart3, Waves, Award, Bell, Star, Brain } from "lucide-react";

// SearchBar Component
function SearchBar() {
  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Search Water Quality Reports
        </h3>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter location, district, or pin code..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Search Reports
          </button>
        </div>
      </div>
    </div>
  );
}

// StatsSection Component
function StatsSection() {
  const stats = [
    { title: "Water Samples Tested", value: "124,847", color: "blue", icon: Droplet },
    { title: "Safe Water Sources", value: "92.5%", color: "green", icon: ShieldCheck },
    { title: "Active Monitoring Points", value: "8,456", color: "purple", icon: BarChart3 },
    { title: "Issues Resolved", value: "18,923", color: "orange", icon: Award }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">National Water Quality Statistics</h2>
        <div className="flex items-center justify-center space-x-2">
          <div className="h-1 w-20 bg-gradient-to-r from-transparent to-blue-500 rounded-full"></div>
          <Star className="h-5 w-5 text-blue-500" />
          <div className="h-1 w-20 bg-gradient-to-l from-transparent to-blue-500 rounded-full"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-500 text-center hover:shadow-xl transition-shadow">
            <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-${stat.color}-100 flex items-center justify-center`}>
              <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{stat.value}</h3>
            <p className="text-gray-600">{stat.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// AlertSystem Component with only ML Disease Predictions
function AlertSystem() {
  return (
    <div className="max-w-sm mx-auto">
      {/* ML Disease Predictions Card */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl shadow-lg border border-purple-200">
        {/* Header */}
        <div className="flex items-center space-x-2 mb-3">
          <Brain className="h-5 w-5 text-purple-600" />
          <span className="font-semibold text-purple-800">🧠 ML Disease Predictions</span>
        </div>
        
        {/* Content */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-gray-600 text-sm">Prediction: </span>
              <span className="font-bold text-gray-800">Outbreak</span>
            </div>
            <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
              High
            </span>
          </div>
          
          <div className="mb-3">
            <span className="text-gray-600 text-sm">Confidence: </span>
            <span className="font-bold text-gray-800">82%</span>
          </div>
          
          <div>
            <span className="text-blue-600 text-sm font-medium">Recommendation: </span>
            <span className="text-blue-700 text-sm">Monitor area closely for symptoms</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home({ user, onLogout }) {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 py-20 shadow-lg relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center px-6 relative z-10">
          {/* Enhanced Government Style Emblem */}
          <div className="mb-6 relative">
            <div className="w-36 h-36 mx-auto relative">
              {/* Main Emblem Container with Government Logo */}
              <div className="bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-blue-100 overflow-hidden w-full h-full">
                <img 
                  src="/assets/jal-suraksha-logo.png" 
                  alt="Jal Suraksha Portal Logo" 
                  className="w-28 h-28 object-cover rounded-full"
                  onError={(e) => {
                    // Fallback to Government SVG if image fails to load
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                {/* Government Style SVG Logo */}
                <svg className="w-28 h-28" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'none'}}>
                  {/* Outer Circle with Tricolor */}
                  <circle cx="70" cy="70" r="68" fill="url(#tricolorGradient)" stroke="#1e40af" strokeWidth="2"/>
                  <circle cx="70" cy="70" r="62" fill="#ffffff" stroke="#0f172a" strokeWidth="1"/>
                  
                  {/* Ashoka Chakra in center */}
                  <circle cx="70" cy="70" r="25" fill="none" stroke="#1e40af" strokeWidth="2"/>
                  <circle cx="70" cy="70" r="20" fill="none" stroke="#1e40af" strokeWidth="1"/>
                  <circle cx="70" cy="70" r="15" fill="none" stroke="#1e40af" strokeWidth="1"/>
                  
                  {/* Ashoka Chakra Spokes */}
                  {Array.from({length: 24}, (_, i) => {
                    const angle = (i * 15) * Math.PI / 180;
                    const x1 = 70 + 15 * Math.cos(angle);
                    const y1 = 70 + 15 * Math.sin(angle);
                    const x2 = 70 + 20 * Math.cos(angle);
                    const y2 = 70 + 20 * Math.sin(angle);
                    return `<line key="${i}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#1e40af" strokeWidth="0.8"/>`;
                  }).join('')}
                  
                  {/* Central Hub */}
                  <circle cx="70" cy="70" r="3" fill="#1e40af"/>
                  
                  {/* Government Building Silhouette */}
                  <rect x="30" y="25" width="80" height="8" fill="#0f172a" rx="1"/>
                  <rect x="35" y="33" width="70" height="4" fill="#374151"/>
                  
                  {/* Main Building Structure */}
                  <rect x="40" y="37" width="60" height="25" fill="url(#buildingGradient)" stroke="#374151" strokeWidth="1"/>
                  
                  {/* Building Details */}
                  <rect x="45" y="42" width="8" height="15" fill="#1e40af" opacity="0.7"/>
                  <rect x="58" y="42" width="8" height="15" fill="#1e40af" opacity="0.7"/>
                  <rect x="71" y="42" width="8" height="15" fill="#1e40af" opacity="0.7"/>
                  <rect x="84" y="42" width="8" height="15" fill="#1e40af" opacity="0.7"/>
                  
                  {/* Central Dome */}
                  <ellipse cx="70" cy="37" rx="12" ry="8" fill="url(#domeGradient)" stroke="#374151" strokeWidth="1"/>
                  <circle cx="70" cy="32" r="2" fill="#fbbf24"/>
                  
                  {/* Water Symbol Integration */}
                  <path d="M25 100c-6 6-9 12-9 18 0 9 4 16 9 16s9-7 9-16c0-6-3-12-9-18z" fill="url(#waterGradient)" opacity="0.8"/>
                  <path d="M115 100c-6 6-9 12-9 18 0 9 4 16 9 16s9-7 9-16c0-6-3-12-9-18z" fill="url(#waterGradient)" opacity="0.8"/>
                  
                  {/* Indian Flag Colors as accent */}
                  <rect x="25" y="15" width="90" height="2" fill="#ff9933"/>
                  <rect x="25" y="17" width="90" height="2" fill="#ffffff"/>
                  <rect x="25" y="19" width="90" height="2" fill="#138808"/>
                  
                  {/* Government Text Arc */}
                  <path id="govTextPath" d="M 20 70 A 50 50 0 0 1 120 70" fill="none"/>
                  <text fontSize="8" fill="#1e40af" fontWeight="bold" textAnchor="middle">
                    <textPath href="#govTextPath" startOffset="50%">GOVERNMENT OF INDIA</textPath>
                  </text>
                  
                  {/* Ministry Text Arc */}
                  <path id="ministryTextPath" d="M 30 110 A 40 40 0 0 0 110 110" fill="none"/>
                  <text fontSize="6" fill="#374151" fontWeight="bold" textAnchor="middle">
                    <textPath href="#ministryTextPath" startOffset="50%">MINISTRY OF JAL SHAKTI</textPath>
                  </text>

                  <defs>
                    <linearGradient id="tricolorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{stopColor:"#ff9933"}} />
                      <stop offset="33%" style={{stopColor:"#ffffff"}} />
                      <stop offset="66%" style={{stopColor:"#ffffff"}} />
                      <stop offset="100%" style={{stopColor:"#138808"}} />
                    </linearGradient>
                    
                    <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{stopColor:"#f9fafb"}} />
                      <stop offset="100%" style={{stopColor:"#e5e7eb"}} />
                    </linearGradient>
                    
                    <linearGradient id="domeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{stopColor:"#fbbf24"}} />
                      <stop offset="100%" style={{stopColor:"#f59e0b"}} />
                    </linearGradient>
                    
                    <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{stopColor:"#67e8f9"}} />
                      <stop offset="50%" style={{stopColor:"#06b6d4"}} />
                      <stop offset="100%" style={{stopColor:"#0891b2"}} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          {/* Main Heading with Enhanced Typography */}
          <div className="space-y-4 mb-8">
            <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-800 via-indigo-700 to-blue-800 bg-clip-text text-transparent mb-2 leading-tight">
              राष्ट्रीय जल सुरक्षा पोर्टल
            </h1>
            <h2 className="text-xl md:text-3xl font-bold text-gray-700 mb-4 tracking-wide">
              National Jal Suraksha Portal
            </h2>
            
            {/* Decorative Line */}
            <div className="flex items-center justify-center space-x-2">
              <div className="h-1 w-16 bg-gradient-to-r from-transparent to-blue-500 rounded-full"></div>
              <Waves className="h-6 w-6 text-blue-500 animate-pulse" />
              <div className="h-1 w-16 bg-gradient-to-l from-transparent to-blue-500 rounded-full"></div>
            </div>
          </div>

          {/* Enhanced Welcome Banner */}
          {user.username && (
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-l-4 border-green-500 text-green-800 font-semibold px-8 py-4 mb-8 rounded-lg shadow-lg max-w-2xl mx-auto backdrop-blur-sm">
              <div className="flex items-center justify-center space-x-3">
                <Award className="h-5 w-5 text-green-600" />
                <span>Welcome back, <span className="font-bold">{user.username}</span></span>
                <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm capitalize">
                  {user.role}
                </span>
              </div>
            </div>
          )}

          {/* Enhanced Description */}
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6">
              A unified platform for{" "}
              <span className="font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded">
                water quality monitoring
              </span>,{" "}
              <span className="font-bold text-green-700 bg-green-100 px-2 py-1 rounded">
                public schemes
              </span>,{" "}
              <span className="font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded">
                awareness campaigns
              </span>, and{" "}
              <span className="font-bold text-red-700 bg-red-100 px-2 py-1 rounded">
                grievance redressal
              </span>{" "}
              under the Ministry of Jal Shakti, Government of India.
            </p>
            
            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md">
                <div className="text-2xl font-bold text-blue-600">124K+</div>
                <div className="text-sm text-gray-600">Tests Completed</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md">
                <div className="text-2xl font-bold text-green-600">92.5%</div>
                <div className="text-sm text-gray-600">Safe Water</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md">
                <div className="text-2xl font-bold text-orange-600">412</div>
                <div className="text-sm text-gray-600">Active Alerts</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md">
                <div className="text-2xl font-bold text-purple-600">18.9K</div>
                <div className="text-sm text-gray-600">Issues Resolved</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alert System Section with Enhanced Design */}
      <section className="max-w-6xl mx-auto mt-12 px-6 w-full">
        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-red-500">
          <div className="flex items-center space-x-3 mb-4">
            <Bell className="h-6 w-6 text-red-500 animate-pulse" />
            <h3 className="text-xl font-bold text-gray-800">Live Alerts & Notifications</h3>
          </div>
          <AlertSystem />
        </div>
      </section>

      {/* Enhanced Quick Links / Features */}
      <section className="max-w-6xl mx-auto mt-12 px-6 w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Portal Services</h2>
          <div className="flex items-center justify-center space-x-2">
            <div className="h-1 w-20 bg-gradient-to-r from-transparent to-blue-500 rounded-full"></div>
            <Star className="h-5 w-5 text-blue-500" />
            <div className="h-1 w-20 bg-gradient-to-l from-transparent to-blue-500 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Water Reports Card */}
          <div className="group bg-white p-8 rounded-xl shadow-lg text-center border-t-4 border-blue-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
              <Droplet className="h-8 w-8 text-blue-700 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-lg font-bold text-blue-700 mb-3">Water Reports</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Access real-time & historical water quality data with detailed analytics.
            </p>
          </div>

          {/* Dashboard Card */}
          <a href="/dashboard" className="group bg-white p-8 rounded-xl shadow-lg text-center border-t-4 border-purple-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
              <BarChart3 className="h-8 w-8 text-purple-700 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-lg font-bold text-purple-700 mb-3">Dashboard</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              View analytics & geographical distribution of reports with interactive maps.
            </p>
          </a>

          {/* Government Schemes Card */}
          <div className="group bg-white p-8 rounded-xl shadow-lg text-center border-t-4 border-green-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
              <ShieldCheck className="h-8 w-8 text-green-700 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-lg font-bold text-green-700 mb-3">Govt Schemes</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Learn about national & state water schemes and available resources.
            </p>
          </div>

          {/* ASHA Login Card */}
          <div className="group bg-white p-8 rounded-xl shadow-lg text-center border-t-4 border-orange-600 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
              <Users className="h-8 w-8 text-orange-600 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-lg font-bold text-orange-600 mb-3">ASHA Login</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Data entry & water sample updates by certified field workers.
            </p>
          </div>

          {/* Grievances Card */}
          <div className="group bg-white p-8 rounded-xl shadow-lg text-center border-t-4 border-red-600 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
              <Cpu className="h-8 w-8 text-red-600 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-lg font-bold text-red-600 mb-3">Grievances</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Submit and track complaints related to water services efficiently.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <div className="mt-16 w-full">
        <SearchBar />
      </div>

      {/* Stats Section */}
      <div className="mt-12 w-full">
        <StatsSection />
      </div>

      {/* Enhanced News / Updates Ticker */}
      <div className="w-full bg-gradient-to-r from-yellow-100 to-orange-100 border-t-2 border-yellow-400 mt-16 py-4 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 flex items-center space-x-4 overflow-hidden">
          <div className="flex items-center space-x-2 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold shadow-md">
            <Bell className="h-4 w-4 animate-pulse" />
            <span>Latest Updates</span>
          </div>
          <marquee
            behavior="scroll"
            direction="left"
            className="text-gray-800 font-semibold text-lg"
          >
            🚰 Water Quality Report (September 2025) released with 95% accuracy | 💡 Rural Water
            Conservation Scheme launched in 500+ districts | 📢 New AI-powered grievance redressal
            system deployed | 🌍 Jal Shakti Abhiyan 2.0 begins nationwide with digital monitoring
          </marquee>
        </div>
      </div>

      {/* Enhanced Call-to-Action */}
      <section className="max-w-6xl mx-auto mt-12 px-6 py-16 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-xl text-center border border-blue-200">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">
            Join Our Mission for Clean Water
          </h2>
          <p className="text-gray-700 text-lg mb-8 leading-relaxed">
            Be part of the largest water quality monitoring initiative in India. 
            Contribute data, report issues, and help ensure every citizen has access to safe drinking water.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/asha-login"
              className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <Users className="h-5 w-5 mr-2" />
              ASHA Worker Login
            </a>
            <button className="inline-flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105">
              <Droplet className="h-5 w-5 mr-2" />
              Report Water Issue
            </button>
          </div>
        </div>
      </section>

      {/* Add spacing at bottom */}
      <div className="h-12"></div>
    </div>
  );
}