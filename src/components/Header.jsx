import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function Header({ user, onLogout }) {
  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title Section */}
          <div className="flex items-center space-x-4">
            {/* Government Style Logo */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 relative">
                <div className="bg-white rounded-full shadow-md flex items-center justify-center border-2 border-blue-100 overflow-hidden w-full h-full">
                  <img 
                    src="./images/jal-suraksha-logo.png"
                    alt="Jal Suraksha Logo"
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      // Try alternative paths if main path fails
                      const alternatives = [
                        '/images/jal-suraksha-logo.png',
                        './assets/jal-suraksha-logo.png',
                        '/assets/jal-suraksha-logo.png'
                      ];
                      const currentSrc = e.target.src;
                      const nextIndex = alternatives.findIndex(alt => currentSrc.includes(alt.replace('./', '').replace('/', ''))) + 1;
                      if (nextIndex < alternatives.length) {
                        e.target.src = alternatives[nextIndex];
                      } else {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }
                    }}
                  />
                  <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'none'}}>
                    {/* Outer blue circle */}
                    <circle cx="50" cy="50" r="48" fill="#1e40af" stroke="#0f172a" strokeWidth="2"/>
                    
                    {/* Inner white circle */}
                    <circle cx="50" cy="50" r="40" fill="#ffffff"/>
                    
                    {/* Water drop in center */}
                    <path d="M50 20c-8 8-12 16-12 24 0 12 5.4 22 12 22s12-10 12-22c0-8-4-16-12-24z" fill="url(#waterDrop)" stroke="#0369a1" strokeWidth="1.5"/>
                    
                    {/* Government shield behind water drop */}
                    <path d="M50 15 L42 25 L42 45 C42 52 46 58 50 60 C54 58 58 52 58 45 L58 25 Z" fill="url(#shieldGradient)" opacity="0.3"/>
                    
                    {/* Small tricolor elements */}
                    <rect x="35" y="12" width="30" height="1.5" fill="#ff9933"/>
                    <rect x="35" y="13.5" width="30" height="1.5" fill="#ffffff"/>
                    <rect x="35" y="15" width="30" height="1.5" fill="#138808"/>
                    
                    {/* Water waves at bottom */}
                    <path d="M15 75 Q25 70 35 75 T55 75 T75 75 T85 75" stroke="#06b6d4" strokeWidth="2" fill="none"/>
                    <path d="M20 80 Q30 77 40 80 T60 80 T80 80" stroke="#06b6d4" strokeWidth="1.5" fill="none" opacity="0.7"/>
                    
                    {/* Small lotus elements */}
                    <circle cx="25" cy="25" r="2" fill="#fbbf24" opacity="0.8"/>
                    <circle cx="75" cy="25" r="2" fill="#fbbf24" opacity="0.8"/>
                    
                    {/* Text "JS" in bottom */}
                    <text x="50" y="88" textAnchor="middle" fontSize="8" fill="#1e40af" fontWeight="bold">JS</text>

                    <defs>
                      <linearGradient id="waterDrop" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{stopColor:"#67e8f9"}} />
                        <stop offset="50%" style={{stopColor:"#06b6d4"}} />
                        <stop offset="100%" style={{stopColor:"#0891b2"}} />
                      </linearGradient>
                      
                      <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{stopColor:"#1e40af"}} />
                        <stop offset="100%" style={{stopColor:"#3b82f6"}} />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="hidden md:block">
              <h1 className="text-lg font-bold text-red-600">राष्ट्रीय जल सुरक्षा पोर्टल</h1>
              <p className="text-sm text-gray-600">National Jal Suraksha Portal</p>
              <p className="text-xs text-gray-500">Ministry of Jal Shakti, Government of India</p>
            </div>
          </div>

          {/* Clean right side - only user info if logged in */}
          <div className="flex items-center space-x-4">
            {user?.username && (
              <div className="flex items-center space-x-3">
                <span className="text-gray-600 font-medium">
                  Welcome, {user.username}
                </span>
                <button
                  onClick={onLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}