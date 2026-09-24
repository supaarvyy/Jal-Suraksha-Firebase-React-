import { Droplet, ShieldCheck, Users, Award, Target, Eye, Heart, MapPin, Phone, Mail, ExternalLink, TrendingUp, Globe, CheckCircle } from "lucide-react";

export default function AboutUs() {
  const handleLinkClick = (path) => {
    // In your actual app, you would use react-router navigation
    console.log(`Navigating to: ${path}`);
  };

  return (
    <div className="flex flex-col bg-white min-h-screen">
      {/* Government Header Section */}
      <section className="w-full bg-gradient-to-r from-blue-800 to-blue-900 py-12 shadow-sm">
        <div className="max-w-6xl mx-auto text-center px-4">
          {/* Government Emblem */}
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto mb-4 relative">
              <div className="absolute inset-0 bg-white rounded-full shadow-md flex items-center justify-center">
                <img 
                  src="./images/jal-suraksha-logo.png"
                  alt="Jal Suraksha Logo"
                  className="w-16 h-16 object-contain"
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
                {/* Fallback SVG */}
                <svg className="w-14 h-14" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'none'}}>
                  <circle cx="40" cy="40" r="35" fill="#f8fafc" stroke="#1e40af" strokeWidth="1"/>
                  <path d="M40 15c-6 6-10 12-10 18 0 10 4.5 18 10 18s10-8 10-18c0-6-4-12-10-18z" fill="#0ea5e9"/>
                  <rect x="32" y="35" width="16" height="20" fill="#f3f4f6" rx="1"/>
                  <polygon points="30,35 40,28 50,35" fill="#dc2626"/>
                  <path d="M15 55 Q25 50 35 55 T55 55 T65 55" stroke="#0ea5e9" strokeWidth="2" fill="none"/>
                </svg>
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-normal text-white mb-3 leading-tight">
            National Jal Suraksha Portal
          </h1>
          <h2 className="text-xl md:text-2xl font-normal text-blue-100 mb-4">
            राष्ट्रीय जल सुरक्षा पोर्टल
          </h2>
          {/* Government Badge */}
          <div className="inline-flex items-center bg-gray-800 text-white px-6 py-2 rounded shadow mb-6">
            <Award className="h-5 w-5 mr-2" />
            <span className="font-normal text-base">Ministry of Jal Shakti, Government of India</span>
          </div>
          <p className="text-blue-100 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed font-normal">
            A flagship digital initiative ensuring real-time water quality monitoring, transparent governance, and community empowerment for safe drinking water across India.
          </p>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="max-w-6xl mx-auto py-12 px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-normal text-gray-800 mb-3">About This Portal</h2>
          <div className="w-16 h-0.5 bg-blue-800 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Vision Card */}
          <div className="bg-gray-50 border border-gray-200 rounded p-6 shadow-sm">
            <div className="flex items-start mb-4">
              <div className="w-12 h-12 bg-blue-800 rounded flex items-center justify-center mr-4 flex-shrink-0">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-normal text-gray-800 mb-3">Vision</h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  To establish India as a global leader in water security through cutting-edge digital infrastructure, ensuring universal access to clean drinking water and zero water-borne diseases by 2030.
                </p>
              </div>
            </div>
          </div>
          {/* Mission Card */}
          <div className="bg-gray-50 border border-gray-200 rounded p-6 shadow-sm">
            <div className="flex items-start mb-4">
              <div className="w-12 h-12 bg-blue-800 rounded flex items-center justify-center mr-4 flex-shrink-0">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-normal text-gray-800 mb-3">Mission</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-blue-800 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-base">Real-time water quality monitoring across all sources</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-blue-800 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-base">AI-powered predictive analysis for health risks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-blue-800 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-base">Transparent governance and citizen participation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-blue-800 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-base">Strengthening rural healthcare through ASHA workers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Objectives Section */}
        <div className="bg-blue-50 border-l-4 border-blue-800 rounded p-6 shadow-sm mb-10">
          <h3 className="text-2xl font-normal text-gray-800 mb-4">Objectives</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">💧</div>
              <h4 className="font-medium text-base text-gray-800">Water Security</h4>
              <p className="text-gray-700 text-sm">Ensuring safe water for all citizens</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <h4 className="font-medium text-base text-gray-800">Data Transparency</h4>
              <p className="text-gray-700 text-sm">Open access to water quality data</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🏥</div>
              <h4 className="font-medium text-base text-gray-800">Health Protection</h4>
              <p className="text-gray-700 text-sm">Preventing water-borne diseases</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portal Features Section */}
      <section className="w-full bg-gray-50 py-12 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-normal text-gray-800 mb-3">Portal Features</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Digital infrastructure supporting India's water security initiatives
            </p>
            <div className="w-16 h-0.5 bg-blue-800 mx-auto mt-3"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 p-6 rounded shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-800 rounded flex items-center justify-center mx-auto mb-4">
                <Droplet className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Water Monitoring</h3>
              <p className="text-gray-600 text-sm">Real-time quality assessment with IoT sensors</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-800 rounded flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Data Analytics</h3>
              <p className="text-gray-600 text-sm">Predictive analysis and reporting systems</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-800 rounded flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Community Network</h3>
              <p className="text-gray-600 text-sm">ASHA workers and citizen participation</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-800 rounded flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Quality Assurance</h3>
              <p className="text-gray-600 text-sm">Certified testing and compliance monitoring</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Services */}
      <section className="max-w-6xl mx-auto py-12 px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-normal text-gray-800 mb-3">Quick Access</h2>
          <p className="text-lg text-gray-700">Direct access to portal services</p>
          <div className="w-16 h-0.5 bg-blue-800 mx-auto mt-3"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <button
            onClick={() => handleLinkClick('/dashboard')}
            className="group bg-white border border-gray-300 p-6 rounded shadow-sm text-center hover:border-blue-800 transition-colors"
          >
            <div className="text-4xl mb-3">📊</div>
            <h4 className="text-gray-800 font-medium text-lg mb-2">Water Reports</h4>
            <p className="text-gray-600 text-sm mb-3">Access water quality analytics and reports</p>
            <div className="flex items-center justify-center text-blue-800 text-sm">
              <span>View Reports</span>
              <ExternalLink className="h-3 w-3 ml-1" />
            </div>
          </button>
          <button
            onClick={() => handleLinkClick('/schemes')}
            className="group bg-white border border-gray-300 p-6 rounded shadow-sm text-center hover:border-blue-800 transition-colors"
          >
            <div className="text-4xl mb-3">📋</div>
            <h4 className="text-gray-800 font-medium text-lg mb-2">Schemes</h4>
            <p className="text-gray-600 text-sm mb-3">Government water conservation schemes</p>
            <div className="flex items-center justify-center text-blue-800 text-sm">
              <span>Browse Schemes</span>
              <ExternalLink className="h-3 w-3 ml-1" />
            </div>
          </button>
          <button
            onClick={() => handleLinkClick('/asha-login')}
            className="group bg-white border border-gray-300 p-6 rounded shadow-sm text-center hover:border-blue-800 transition-colors"
          >
            <div className="text-4xl mb-3">👩‍⚕️</div>
            <h4 className="text-gray-800 font-medium text-lg mb-2">ASHA Portal</h4>
            <p className="text-gray-600 text-sm mb-3">Healthcare worker data entry portal</p>
            <div className="flex items-center justify-center text-blue-800 text-sm">
              <span>ASHA Login</span>
              <ExternalLink className="h-3 w-3 ml-1" />
            </div>
          </button>
          <button
            onClick={() => handleLinkClick('/grievance')}
            className="group bg-white border border-gray-300 p-6 rounded shadow-sm text-center hover:border-blue-800 transition-colors"
          >
            <div className="text-4xl mb-3">📝</div>
            <h4 className="text-gray-800 font-medium text-lg mb-2">Grievances</h4>
            <p className="text-gray-600 text-sm mb-3">Submit and track complaints</p>
            <div className="flex items-center justify-center text-blue-800 text-sm">
              <span>File Complaint</span>
              <ExternalLink className="h-3 w-3 ml-1" />
            </div>
          </button>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="w-full bg-blue-800 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-normal text-white mb-3">Portal Statistics</h2>
            <p className="text-blue-100">Current implementation status across India</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-normal text-white">1.4B+</div>
              <div className="text-blue-200 text-sm">Citizens Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-normal text-white">75K+</div>
              <div className="text-blue-200 text-sm">Villages Monitored</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-normal text-white">95.2%</div>
              <div className="text-blue-200 text-sm">Safety Compliance</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-normal text-white">24/7</div>
              <div className="text-blue-200 text-sm">Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="w-full bg-gray-100 py-12 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-normal text-gray-800 mb-3">Contact Information</h2>
            <p className="text-lg text-gray-700">Ministry of Jal Shakti, Government of India</p>
            <div className="w-16 h-0.5 bg-blue-800 mx-auto mt-3"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-800 rounded flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Address</h3>
              <p className="text-gray-600 text-sm">
                Shram Shakti Bhawan<br />
                Rafi Marg, New Delhi - 110001<br />
                India
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-800 rounded flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Phone</h3>
              <p className="text-gray-600 text-sm">
                Helpline: 1800-11-WATER<br />
                Office: +91-11-23061014<br />
                Emergency: 108
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-800 rounded flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Email</h3>
              <p className="text-gray-600 text-sm">
                support@jalsuraksha.gov.in<br />
                grievances@jalsuraksha.gov.in<br />
                info@jalshakti.gov.in
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="w-full bg-white py-8 border-t border-gray-300">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="text-4xl mb-4">🇮🇳</div>
          <h2 className="text-2xl font-normal text-gray-800 mb-2">जल ही जीवन है • Water is Life</h2>
          <p className="text-base text-gray-600 italic mb-4">
            "सत्यमेव जयते" - Truth Alone Triumphs
          </p>
          <div className="flex justify-center space-x-3">
            <div className="w-6 h-6 bg-orange-500 rounded-sm"></div>
            <div className="w-6 h-6 bg-white border border-gray-400 rounded-sm"></div>
            <div className="w-6 h-6 bg-green-600 rounded-sm"></div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            © 2024 Government of India. All rights reserved.
          </p>
        </div>
      </section>
    </div>
  );
}