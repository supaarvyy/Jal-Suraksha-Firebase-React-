import React, { useState } from 'react';
import { Search, MapPin, AlertTriangle, CheckCircle, XCircle, Droplet } from 'lucide-react';

// Mock water quality data
const waterQualityData = {
  "Delhi": { 
    status: "contaminated", 
    ph: 8.5, 
    tds: 850, 
    chlorine: 0.8, 
    lastTested: "2025-09-18",
    issueType: "High TDS levels, bacterial contamination detected",
    severity: "high",
    population: "32M"
  },
  "Mumbai": { 
    status: "good", 
    ph: 7.2, 
    tds: 320, 
    chlorine: 0.5, 
    lastTested: "2025-09-19",
    issueType: null,
    severity: "low",
    population: "20M"
  },
  "Ludhiana": { 
    status: "contaminated", 
    ph: 8.9, 
    tds: 920, 
    chlorine: 0.2, 
    lastTested: "2025-09-17",
    issueType: "Excessive fluoride, high TDS levels",
    severity: "high",
    population: "1.6M"
  },
  "Bangalore": { 
    status: "moderate", 
    ph: 6.8, 
    tds: 580, 
    chlorine: 0.3, 
    lastTested: "2025-09-19",
    issueType: "Slightly acidic pH",
    severity: "medium",
    population: "12M"
  },
  "Chennai": { 
    status: "good", 
    ph: 7.1, 
    tds: 290, 
    chlorine: 0.4, 
    lastTested: "2025-09-19",
    issueType: null,
    severity: "low",
    population: "7M"
  },
  "Hyderabad": { 
    status: "good", 
    ph: 7.3, 
    tds: 310, 
    chlorine: 0.45, 
    lastTested: "2025-09-19",
    issueType: null,
    severity: "low",
    population: "10M"
  },
  "Pune": { 
    status: "moderate", 
    ph: 6.9, 
    tds: 520, 
    chlorine: 0.35, 
    lastTested: "2025-09-18",
    issueType: "Slightly high TDS levels",
    severity: "medium",
    population: "7.4M"
  },
  "Kolkata": { 
    status: "contaminated", 
    ph: 8.2, 
    tds: 780, 
    chlorine: 0.25, 
    lastTested: "2025-09-17",
    issueType: "Iron contamination, high TDS",
    severity: "high",
    population: "14.8M"
  }
};

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const locations = Object.keys(waterQualityData);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.length > 0) {
      const filtered = locations.filter(location => 
        location.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5)); // Show only top 5 suggestions
    } else {
      setSuggestions([]);
      setShowResults(false);
    }
  };

  const handleSearch = (location = searchTerm) => {
    if (location && waterQualityData[location]) {
      setSelectedLocation({ name: location, ...waterQualityData[location] });
      setShowResults(true);
      setSuggestions([]);
      setSearchTerm(location);
    } else {
      // Handle case where location is not found
      setSelectedLocation(null);
      setShowResults(true);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'contaminated': return 'text-red-600 bg-red-50 border-red-200';
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'good': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'contaminated': return <XCircle className="w-6 h-6" />;
      case 'moderate': return <AlertTriangle className="w-6 h-6" />;
      case 'good': return <CheckCircle className="w-6 h-6" />;
      default: return <CheckCircle className="w-6 h-6" />;
    }
  };

  const getSuggestionStatusIcon = (location) => {
    const status = waterQualityData[location]?.status;
    switch(status) {
      case 'contaminated': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'moderate': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'good': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <MapPin className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <Droplet className="h-12 w-12 mx-auto text-white mb-4" />
          <h2 className="text-3xl font-bold text-white mb-2">
            Check Water Quality in Your Area
          </h2>
          <p className="text-blue-100 text-lg">
            Enter your city or area name to get real-time water quality information
          </p>
        </div>

        {/* Search Input */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Enter your city/area name (e.g., Delhi, Mumbai, Ludhiana)"
              className="w-full px-6 py-4 pr-14 text-lg border-0 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
            />
            <button
              onClick={() => handleSearch()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white rounded-xl shadow-xl z-20 mt-2 overflow-hidden">
              {suggestions.map((location) => (
                <button
                  key={location}
                  onClick={() => handleSearch(location)}
                  className="w-full px-6 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">{location}</span>
                  </div>
                  {getSuggestionStatusIcon(location)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results Section */}
        {showResults && (
          <div className="bg-white rounded-xl shadow-xl p-8">
            {selectedLocation ? (
              <div>
                <div className={`border-2 rounded-xl p-6 ${getStatusColor(selectedLocation.status)}`}>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(selectedLocation.status)}
                      <div>
                        <h3 className="text-2xl font-bold capitalize">
                          {selectedLocation.name} Water Quality
                        </h3>
                        <p className="text-sm opacity-75">
                          Population: {selectedLocation.population} | Last tested: {selectedLocation.lastTested}
                        </p>
                      </div>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-bold uppercase ${
                      selectedLocation.status === 'contaminated' ? 'bg-red-600 text-white' :
                      selectedLocation.status === 'moderate' ? 'bg-yellow-600 text-white' :
                      'bg-green-600 text-white'
                    }`}>
                      {selectedLocation.status}
                    </div>
                  </div>
                  
                  {/* Water Quality Metrics */}
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white bg-opacity-80 p-4 rounded-lg">
                      <div className="text-sm opacity-75 mb-1">pH Level</div>
                      <div className="text-2xl font-bold">{selectedLocation.ph}</div>
                      <div className="text-xs text-gray-600">Normal: 6.5-8.5</div>
                    </div>
                    <div className="bg-white bg-opacity-80 p-4 rounded-lg">
                      <div className="text-sm opacity-75 mb-1">TDS (ppm)</div>
                      <div className="text-2xl font-bold">{selectedLocation.tds}</div>
                      <div className="text-xs text-gray-600">Safe: &lt;500 ppm</div>
                    </div>
                    <div className="bg-white bg-opacity-80 p-4 rounded-lg">
                      <div className="text-sm opacity-75 mb-1">Chlorine (mg/L)</div>
                      <div className="text-2xl font-bold">{selectedLocation.chlorine}</div>
                      <div className="text-xs text-gray-600">Safe: 0.2-1.0 mg/L</div>
                    </div>
                  </div>
                  
                  {/* Issues and Recommendations */}
                  {selectedLocation.issueType && (
                    <div className="bg-white bg-opacity-80 p-4 rounded-lg mb-4">
                      <div className="text-sm opacity-75 mb-2">Issues Detected:</div>
                      <div className="font-semibold text-red-700">{selectedLocation.issueType}</div>
                    </div>
                  )}
                  
                  <div className="bg-white bg-opacity-80 p-4 rounded-lg">
                    <div className="text-sm opacity-75 mb-2">Recommendation:</div>
                    <div className="font-semibold">
                      {selectedLocation.status === 'contaminated' 
                        ? '⚠️ Use bottled water or boil tap water before consumption. Contact local authorities immediately.'
                        : selectedLocation.status === 'moderate'
                        ? '⚡ Water is acceptable but consider filtration for better quality.'
                        : '✅ Water quality is within safe parameters for consumption.'
                      }
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 mt-6">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      View Detailed Report
                    </button>
                    {selectedLocation.status === 'contaminated' && (
                      <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
                        Report Emergency
                      </button>
                    )}
                    <button className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                      Subscribe to Updates
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <XCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-600 mb-2">Location Not Found</h3>
                <p className="text-gray-500">
                  We don't have water quality data for "{searchTerm}" yet. 
                  Please try searching for a major city or contact us to add this location.
                </p>
                <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Request Data Collection
                </button>
              </div>
            )}
          </div>
        )}

        {/* Quick Access Cities */}
        {!showResults && (
          <div className="text-center">
            <p className="text-blue-100 mb-4">Quick access to major cities:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Ludhiana'].map((city) => (
                <button
                  key={city}
                  onClick={() => handleSearch(city)}
                  className="bg-blue-500 bg-opacity-30 text-white px-4 py-2 rounded-lg hover:bg-opacity-50 transition-all border border-blue-300"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchBar;