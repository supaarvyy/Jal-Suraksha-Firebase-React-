import { Droplet, Users, Award, Target, TrendingUp, CheckCircle, ExternalLink, Calendar, MapPin, IndianRupee, Globe, Zap } from "lucide-react";

export default function Schemes() {
  const schemes = [
    {
      title: "Jal Jeevan Mission (JJM)",
      titleHindi: "जल जीवन मिशन",
      description: "A flagship program aimed at providing Functional Household Tap Connections (FHTCs) to every rural household by 2024.",
      budget: "₹3.60 Lakh Crore",
      target: "19.2 Crore Rural Households",
      status: "Active",
      progress: 68,
      features: [
        "Safe and adequate drinking water to all rural households",
        "Community participation through Village Water & Sanitation Committees",
        "Special focus on quality-affected habitations",
        "Capacity building of frontline workers and ASHA workers"
      ],
      color: "blue",
      icon: <Droplet className="h-6 w-6" />,
      launchYear: "2019"
    },
    {
      title: "National Water Quality Sub-Mission",
      titleHindi: "राष्ट्रीय जल गुणवत्ता उप-मिशन",
      description: "Focused on providing safe drinking water to arsenic- and fluoride-affected rural areas, ensuring public health protection.",
      budget: "₹23,050 Crore",
      target: "2.8 Lakh Habitations",
      status: "Active",
      progress: 75,
      features: [
        "Setting up water quality testing laboratories",
        "Deployment of Field Test Kits (FTKs)",
        "Real-time monitoring of contaminated regions",
        "Awareness and training programs for local communities"
      ],
      color: "green",
      icon: <Award className="h-6 w-6" />,
      launchYear: "2017"
    },
    {
      title: "Har Ghar Nal Se Jal",
      titleHindi: "हर घर नल से जल",
      description: "Ensures every household has access to safe water supply through piped connections.",
      budget: "₹2.87 Lakh Crore",
      target: "All Households",
      status: "Ongoing",
      progress: 55,
      features: [
        "Coverage of both rural and urban households",
        "Equitable distribution of water sources",
        "Integration with water conservation activities",
        "Sustainability ensured via community ownership"
      ],
      color: "teal",
      icon: <Users className="h-6 w-6" />,
      launchYear: "2021"
    },
    {
      title: "Water Conservation & Management Schemes",
      titleHindi: "जल संरक्षण एवं प्रबंधन योजनाएँ",
      description: "Schemes to revive traditional water bodies, promote rainwater harvesting, and manage water resources efficiently.",
      budget: "₹1.42 Lakh Crore",
      target: "15,000 Blocks",
      status: "Active",
      progress: 82,
      features: [
        "Rainwater harvesting structures in schools, offices, and homes",
        "Watershed development and groundwater recharge projects",
        "Awareness campaigns on water use efficiency",
        "Adoption of modern irrigation techniques"
      ],
      color: "gray",
      icon: <Globe className="h-6 w-6" />,
      launchYear: "2018"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-600',
        border: 'border-blue-600',
        text: 'text-blue-700',
        bgLight: 'bg-blue-50',
        progress: 'bg-blue-600'
      },
      green: {
        bg: 'bg-green-600',
        border: 'border-green-600',
        text: 'text-green-700',
        bgLight: 'bg-green-50',
        progress: 'bg-green-600'
      },
      teal: {
        bg: 'bg-teal-600',
        border: 'border-teal-600',
        text: 'text-teal-700',
        bgLight: 'bg-teal-50',
        progress: 'bg-teal-600'
      },
      gray: {
        bg: 'bg-gray-600',
        border: 'border-gray-600',
        text: 'text-gray-700',
        bgLight: 'bg-gray-50',
        progress: 'bg-gray-600'
      }
    };
    return colorMap[color];
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen">
      {/* Government Header */}
      <section className="w-full bg-white border-b-4 border-orange-500 py-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* Government Emblem */}
              <div className="w-16 h-16 mr-4">
                <div className="w-full h-full bg-gradient-to-br from-orange-400 via-white to-green-500 rounded-full flex items-center justify-center border-2 border-gray-300">
                  <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Ministry of Jal Shakti</h1>
                <p className="text-sm text-gray-600">Government of India</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Last Updated</div>
              <div className="text-sm font-semibold text-gray-700">15 March 2024</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Hero Section */}
      <section className="w-full bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Government Water Schemes
          </h1>
          <h2 className="text-2xl font-medium text-gray-600 mb-6">
            सरकारी जल योजनाएँ
          </h2>
          
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
            Comprehensive water security initiatives ensuring sustainable access, quality assurance, 
            and conservation for every Indian citizen under various government schemes.
          </p>

          {/* Key Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            <div className="bg-gray-50 border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-800">₹12L Cr</div>
              <div className="text-sm text-gray-600">Total Investment</div>
            </div>
            <div className="bg-gray-50 border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-800">6.4Cr</div>
              <div className="text-sm text-gray-600">Households Covered</div>
            </div>
            <div className="bg-gray-50 border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-800">65%</div>
              <div className="text-sm text-gray-600">Progress Achieved</div>
            </div>
            <div className="bg-gray-50 border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-800">28</div>
              <div className="text-sm text-gray-600">States/UTs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Scheme Cards */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Major Water Initiatives</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {schemes.map((scheme, index) => {
            const colors = getColorClasses(scheme.color);
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md border hover:shadow-lg transition-shadow duration-300"
              >
                {/* Card Header */}
                <div className={`${colors.bg} p-6 text-white rounded-t-lg`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="mr-3 p-2 bg-white bg-opacity-20 rounded">
                        {scheme.icon}
                      </div>
                      <span className="bg-white bg-opacity-20 px-3 py-1 rounded text-sm font-medium">
                        {scheme.status}
                      </span>
                    </div>
                    <div className="text-right text-sm">
                      <div className="opacity-90">Launched</div>
                      <div className="font-semibold">{scheme.launchYear}</div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{scheme.title}</h3>
                  <h4 className="text-lg opacity-90 mb-4">{scheme.titleHindi}</h4>
                  
                  {/* Progress Bar */}
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Implementation Progress</span>
                      <span className="font-semibold">{scheme.progress}%</span>
                    </div>
                    <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
                      <div 
                        className="bg-white h-2 rounded-full"
                        style={{ width: `${scheme.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {scheme.description}
                  </p>

                  {/* Key Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded border text-center">
                      <div className="flex items-center justify-center mb-2">
                        <IndianRupee className="h-4 w-4 mr-1 text-green-600" />
                        <span className="text-sm text-gray-600 font-medium">Budget Allocation</span>
                      </div>
                      <div className="font-bold text-gray-800">{scheme.budget}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded border text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Target className="h-4 w-4 mr-1 text-orange-600" />
                        <span className="text-sm text-gray-600 font-medium">Coverage Target</span>
                      </div>
                      <div className="font-bold text-gray-800">{scheme.target}</div>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-lg mb-3 text-gray-800">Key Features</h4>
                    <ul className="space-y-2">
                      {scheme.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-4 w-4 mr-3 mt-1 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <button className={`w-full ${colors.bg} text-white font-medium py-3 px-6 rounded hover:opacity-90 transition-opacity flex items-center justify-center`}>
                    <span>View Details</span>
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Access Services */}
      <section className="w-full bg-gray-50 py-12 border-t">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Related Services</h2>
            <p className="text-lg text-gray-600">Quick access to essential portal functions</p>
            <div className="w-20 h-1 bg-orange-500 mx-auto mt-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplet className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="text-blue-700 font-semibold text-lg mb-2">Water Reports</h4>
              <p className="text-gray-600 text-sm mb-4">Real-time & historical water quality analytics</p>
              <div className="flex items-center justify-center text-blue-600 font-medium">
                <span>Access Portal</span>
                <ExternalLink className="h-4 w-4 ml-2" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="text-green-700 font-semibold text-lg mb-2">About Portal</h4>
              <p className="text-gray-600 text-sm mb-4">Learn about National Jal Suraksha initiatives</p>
              <div className="flex items-center justify-center text-green-600 font-medium">
                <span>Learn More</span>
                <ExternalLink className="h-4 w-4 ml-2" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <h4 className="text-orange-600 font-semibold text-lg mb-2">ASHA Portal</h4>
              <p className="text-gray-600 text-sm mb-4">Healthcare worker data entry & monitoring</p>
              <div className="flex items-center justify-center text-orange-600 font-medium">
                <span>ASHA Login</span>
                <ExternalLink className="h-4 w-4 ml-2" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-red-600" />
              </div>
              <h4 className="text-red-600 font-semibold text-lg mb-2">Grievances</h4>
              <p className="text-gray-600 text-sm mb-4">Submit and track water service complaints</p>
              <div className="flex items-center justify-center text-red-600 font-medium">
                <span>File Complaint</span>
                <ExternalLink className="h-4 w-4 ml-2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-white border-t py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-2 bg-orange-500 rounded-full mr-2"></div>
            <div className="w-8 h-2 bg-white border-2 border-gray-300 rounded-full mr-2"></div>
            <div className="w-8 h-2 bg-green-600 rounded-full"></div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">जल ही जीवन है • Water is Life</h2>
            <p className="text-lg text-gray-600">
              Building a water-secure India for future generations
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}