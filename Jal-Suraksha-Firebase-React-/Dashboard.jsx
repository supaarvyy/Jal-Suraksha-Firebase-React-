import { useState, useEffect } from "react";
import { MapPin, Users, AlertTriangle, TrendingUp, Calendar, Activity, Eye, Filter, Search, Download, PieChart, BarChart } from "lucide-react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart, Line, AreaChart, Area, Pie } from "recharts";

// India-focused Map Component with District Boundaries and Firebase Reports
const MapComponent = ({ reports, selectedReport, onReportSelect }) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showNortheast, setShowNortheast] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const [markersLayer, setMarkersLayer] = useState(null);
  
  // India bounds
  const INDIA_BOUNDS = [[6.4627, 68.1097], [35.6745, 97.3953]];
  
  // Northeast India bounds  
  const NORTHEAST_BOUNDS = [[21.5, 87.0], [29.5, 97.5]];
  
  // Northeast states
  const northeastStates = [
    'Arunachal Pradesh', 'Assam', 'Manipur', 'Meghalaya', 
    'Mizoram', 'Nagaland', 'Tripura', 'Sikkim'
  ];

  // Comprehensive Indian locations with coordinates
  const indianLocations = {
    // Major Cities
    'Delhi': { lat: 28.6139, lng: 77.2090 },
    'New Delhi': { lat: 28.6139, lng: 77.2090 },
    'Mumbai': { lat: 19.0760, lng: 72.8777 },
    'Kolkata': { lat: 22.5726, lng: 88.3639 },
    'Chennai': { lat: 13.0827, lng: 80.2707 },
    'Bangalore': { lat: 12.9716, lng: 77.5946 },
    'Bengaluru': { lat: 12.9716, lng: 77.5946 },
    'Hyderabad': { lat: 17.3850, lng: 78.4867 },
    'Pune': { lat: 18.5204, lng: 73.8567 },
    'Ahmedabad': { lat: 23.0225, lng: 72.5714 },
    'Jaipur': { lat: 26.9124, lng: 75.7873 },
    'Lucknow': { lat: 26.8467, lng: 80.9462 },
    
    // State Capitals
    'Guwahati': { lat: 26.1445, lng: 91.7362 },
    'Shillong': { lat: 25.5788, lng: 91.8933 },
    'Imphal': { lat: 24.8170, lng: 93.9368 },
    'Aizawl': { lat: 23.7271, lng: 92.7176 },
    'Agartala': { lat: 23.8315, lng: 91.2868 },
    'Kohima': { lat: 25.6751, lng: 94.1086 },
    'Itanagar': { lat: 27.0844, lng: 93.6053 },
    'Gangtok': { lat: 27.3389, lng: 88.6065 },
    'Bhopal': { lat: 23.2599, lng: 77.4126 },
    'Raipur': { lat: 21.2514, lng: 81.6296 },
    'Panaji': { lat: 15.4909, lng: 73.8278 },
    'Gandhinagar': { lat: 23.2156, lng: 72.6369 },
    'Chandigarh': { lat: 30.7333, lng: 76.7794 },
    'Shimla': { lat: 31.1048, lng: 77.1734 },
    'Srinagar': { lat: 34.0837, lng: 74.7973 },
    'Jammu': { lat: 32.7266, lng: 74.8570 },
    'Ranchi': { lat: 23.3441, lng: 85.3096 },
    'Thiruvananthapuram': { lat: 8.5241, lng: 76.9366 },
    'Trivandrum': { lat: 8.5241, lng: 76.9366 },
    'Bhubaneswar': { lat: 20.2961, lng: 85.8245 },
    'Amritsar': { lat: 31.6340, lng: 74.8723 },
    'Jaisalmer': { lat: 26.9157, lng: 70.9083 },
    'Patna': { lat: 25.5941, lng: 85.1376 },
    'Chennai': { lat: 13.0827, lng: 80.2707 },
    'Coimbatore': { lat: 11.0168, lng: 76.9558 },
    'Kochi': { lat: 9.9312, lng: 76.2673 },
    'Cochin': { lat: 9.9312, lng: 76.2673 },
    'Madurai': { lat: 9.9252, lng: 78.1198 },
    'Tiruchirappalli': { lat: 10.7905, lng: 78.7047 },
    'Trichy': { lat: 10.7905, lng: 78.7047 },
    
    // Other Important Cities
    'Varanasi': { lat: 25.3176, lng: 82.9739 },
    'Kanpur': { lat: 26.4499, lng: 80.3319 },
    'Agra': { lat: 27.1767, lng: 78.0081 },
    'Nagpur': { lat: 21.1458, lng: 79.0882 },
    'Indore': { lat: 22.7196, lng: 75.8577 },
    'Surat': { lat: 21.1702, lng: 72.8311 },
    'Vadodara': { lat: 22.3072, lng: 73.1812 },
    'Rajkot': { lat: 22.3039, lng: 70.8022 },
    'Vishakhapatnam': { lat: 17.6868, lng: 83.2185 },
    'Visakhapatnam': { lat: 17.6868, lng: 83.2185 },
    'Vijayawada': { lat: 16.5062, lng: 80.6480 },
    'Guntur': { lat: 16.3067, lng: 80.4365 },
    'Mysore': { lat: 12.2958, lng: 76.6394 },
    'Mysuru': { lat: 12.2958, lng: 76.6394 },
    'Mangalore': { lat: 12.9141, lng: 74.8560 },
    'Hubli': { lat: 15.3647, lng: 75.1240 },
    'Belgaum': { lat: 15.8497, lng: 74.4977 },
    'Gulbarga': { lat: 17.3297, lng: 76.8343 },
    
    // Districts and Smaller Cities
    'Ludhiana': { lat: 30.9010, lng: 75.8573 },
    'Jalandhar': { lat: 31.3260, lng: 75.5762 },
    'Bathinda': { lat: 30.2110, lng: 74.9455 },
    'Patiala': { lat: 30.3398, lng: 76.3869 },
    'Mohali': { lat: 30.7046, lng: 76.7179 },
    'Faridabad': { lat: 28.4089, lng: 77.3178 },
    'Gurgaon': { lat: 28.4595, lng: 77.0266 },
    'Gurugram': { lat: 28.4595, lng: 77.0266 },
    'Noida': { lat: 28.5355, lng: 77.3910 },
    'Ghaziabad': { lat: 28.6692, lng: 77.4538 },
    'Meerut': { lat: 28.9845, lng: 77.7064 },
    'Allahabad': { lat: 25.4358, lng: 81.8463 },
    'Prayagraj': { lat: 25.4358, lng: 81.8463 },
    
    // Default fallback locations for common area names
    'North India': { lat: 28.6139, lng: 77.2090 },
    'South India': { lat: 13.0827, lng: 80.2707 },
    'East India': { lat: 22.5726, lng: 88.3639 },
    'West India': { lat: 19.0760, lng: 72.8777 },
    'Central India': { lat: 23.2599, lng: 77.4126 },
    'Northeast India': { lat: 26.1445, lng: 91.7362 }
  };

  // Backup cities for random distribution if location not found
  const fallbackCities = [
    { name: 'Delhi', lat: 28.6139, lng: 77.2090 },
    { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
    { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
    { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
    { name: 'Bangalore', lat: 12.9716, lng: 77.5946 }
  ];

  useEffect(() => {
    const loadLeaflet = async () => {
      try {
        // Load Leaflet CSS
        if (!document.querySelector('link[href*="leaflet"]')) {
          const leafletCSS = document.createElement('link');
          leafletCSS.rel = 'stylesheet';
          leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          leafletCSS.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
          leafletCSS.crossOrigin = '';
          document.head.appendChild(leafletCSS);
        }

        // Load Leaflet JS
        if (!window.L) {
          return new Promise((resolve) => {
            const leafletJS = document.createElement('script');
            leafletJS.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            leafletJS.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
            leafletJS.crossOrigin = '';
            leafletJS.onload = () => {
              setMapLoaded(true);
              resolve();
            };
            document.head.appendChild(leafletJS);
          });
        } else {
          setMapLoaded(true);
        }
      } catch (error) {
        console.error('Error loading Leaflet:', error);
      }
    };

    loadLeaflet();
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapLoaded || !window.L) return;

    const mapContainer = document.getElementById('leaflet-map');
    if (!mapContainer) return;

    // Clear any existing map
    mapContainer.innerHTML = '';

    console.log('🗺️ Initializing map with', reports.length, 'reports');

    // Initialize map
    const map = window.L.map('leaflet-map', {
      maxBounds: INDIA_BOUNDS,
      maxBoundsViscosity: 1.0,
      zoomControl: true,
      scrollWheelZoom: true
    });

    // Set initial view with better zoom
    if (showNortheast) {
      map.fitBounds(NORTHEAST_BOUNDS);
      map.setZoom(7);
    } else {
      map.setView([20.5937, 78.9629], 6); // Center of India with appropriate zoom
    }

    // Add base tile layer
    const osmLayer = window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      minZoom: 4,
      maxZoom: 15
    }).addTo(map);

    // Alternative satellite view
    const satelliteLayer = window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '© Esri',
      minZoom: 4,
      maxZoom: 15
    });

    // Add layer control
    const baseLayers = {
      "Street Map": osmLayer,
      "Satellite": satelliteLayer
    };
    
    const layerControl = window.L.control.layers(baseLayers).addTo(map);

    // Create markers layer group
    const markersLayerGroup = window.L.layerGroup().addTo(map);
    setMarkersLayer(markersLayerGroup);

    // Store map instance
    setMapInstance(map);

    // Add simple India boundary (fallback)
    const addIndiaBoundary = () => {
      // Simplified India outline
      const indiaOutline = [
        [35.6745, 78.9629], [32.3293, 75.5937], [28.6139, 77.2090], 
        [26.9124, 75.7873], [23.5937, 78.9629], [21.7679, 78.1276],
        [19.7515, 75.7139], [15.2993, 74.1240], [11.1271, 78.6569],
        [8.4380, 77.5946], [8.0883, 77.5946], [6.4627, 68.1097],
        [9.9312, 76.2673], [15.3173, 75.7139], [20.5937, 78.9629],
        [23.6345, 85.9100], [25.0961, 87.2504], [26.2041, 92.9376],
        [27.0238, 97.3953], [28.2180, 97.3953], [29.0308, 95.9600],
        [28.7041, 88.4298], [27.0844, 88.1212], [26.4499, 89.4515],
        [25.0827, 89.2726], [35.6745, 78.9629]
      ];

      const indiaPolygon = window.L.polygon(indiaOutline, {
        color: '#0284C7',
        weight: 2,
        fillOpacity: 0.1,
        fillColor: '#E0F2FE'
      }).addTo(map);

      layerControl.addOverlay(indiaPolygon, "India Boundary");
    };

    addIndiaBoundary();

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [mapLoaded, showNortheast]);

  // Add/Update markers when reports change
  useEffect(() => {
    if (!mapInstance || !markersLayer || !window.L) return;

    console.log('🎯 Adding markers for', reports.length, 'reports');

    // Clear existing markers
    markersLayer.clearLayers();

    if (reports.length === 0) {
      console.log('⚠️ No reports to display on map');
      return;
    }

    let markersAdded = 0;

    reports.forEach((report, index) => {
      // Get coordinates - prioritize provided coordinates, then match location name, then fallback
      let lat, lng;
      
      if (report.latitude && report.longitude) {
        lat = parseFloat(report.latitude);
        lng = parseFloat(report.longitude);
        console.log(`📍 Using provided coordinates for ${report.patientName}:`, lat, lng);
      } else if (report.location) {
        // Try to match the location name to known coordinates
        const locationKey = report.location.trim();
        
        // Try exact match first
        let locationData = indianLocations[locationKey];
        
        // If no exact match, try case-insensitive match
        if (!locationData) {
          const locationKeyLower = locationKey.toLowerCase();
          const matchedKey = Object.keys(indianLocations).find(key => 
            key.toLowerCase() === locationKeyLower
          );
          if (matchedKey) {
            locationData = indianLocations[matchedKey];
          }
        }
        
        // If still no match, try partial match
        if (!locationData) {
          const locationKeyLower = locationKey.toLowerCase();
          const matchedKey = Object.keys(indianLocations).find(key => 
            key.toLowerCase().includes(locationKeyLower) || 
            locationKeyLower.includes(key.toLowerCase())
          );
          if (matchedKey) {
            locationData = indianLocations[matchedKey];
          }
        }
        
        if (locationData) {
          lat = locationData.lat + (Math.random() - 0.5) * 0.01; // Add small random offset
          lng = locationData.lng + (Math.random() - 0.5) * 0.01;
          console.log(`🎯 Matched location "${report.location}" to coordinates:`, lat, lng);
        } else {
          // Fallback to random city if location not found
          const fallbackCity = fallbackCities[index % fallbackCities.length];
          lat = fallbackCity.lat + (Math.random() - 0.5) * 0.5;
          lng = fallbackCity.lng + (Math.random() - 0.5) * 0.5;
          console.log(`❓ Location "${report.location}" not found, using fallback near ${fallbackCity.name}:`, lat, lng);
        }
      } else {
        // No location data at all, use fallback
        const fallbackCity = fallbackCities[index % fallbackCities.length];
        lat = fallbackCity.lat + (Math.random() - 0.5) * 0.5;
        lng = fallbackCity.lng + (Math.random() - 0.5) * 0.5;
        console.log(`🎲 No location data for ${report.patientName}, using fallback near ${fallbackCity.name}:`, lat, lng);
      }

      // Ensure coordinates are within India bounds
      lat = Math.max(6.4627, Math.min(35.6745, lat));
      lng = Math.max(68.1097, Math.min(97.3953, lng));

      // Determine colors based on priority
      let fillColor, borderColor;
      switch (report.priority) {
        case "High":
          fillColor = '#DC2626'; // Red
          borderColor = '#FFFFFF';
          break;
        case "Medium":
          fillColor = '#EA580C'; // Orange
          borderColor = '#FFFFFF';
          break;
        case "Low":
          fillColor = '#059669'; // Green
          borderColor = '#FFFFFF';
          break;
        default:
          fillColor = '#6B7280'; // Gray
          borderColor = '#FFFFFF';
      }

      // Create custom pin icon
      const pinIcon = window.L.divIcon({
        className: 'custom-pin-marker',
        html: `
          <div class="pin-container ${report.priority === "High" ? 'pulse-pin' : ''}" style="position: relative;">
            <div class="pin-head" style="
              width: 24px; 
              height: 24px; 
              border-radius: 50%; 
              background-color: ${fillColor}; 
              border: 3px solid white;
              box-shadow: 0 3px 8px rgba(0,0,0,0.3);
              position: relative;
              z-index: 10;
            "></div>
            <div class="pin-point" style="
              width: 0; 
              height: 0; 
              border-left: 6px solid transparent; 
              border-right: 6px solid transparent; 
              border-top: 12px solid ${fillColor};
              position: absolute;
              bottom: -9px;
              left: 50%;
              transform: translateX(-50%);
              filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
            "></div>
          </div>
        `,
        iconSize: [30, 36],
        iconAnchor: [15, 36], // Point of the pin touches the location
        popupAnchor: [0, -36]
      });

      // Create the marker with custom icon
      const marker = window.L.marker([lat, lng], {
        icon: pinIcon,
        zIndexOffset: selectedReport?.id === report.id ? 1000 : 100
      });

      // Create detailed popup content
      const popupContent = `
        <div class="p-4 min-w-64">
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-gray-800 text-lg">${report.patientName || 'Unknown Patient'}</h3>
            <span class="px-2 py-1 rounded text-xs font-medium ${
              report.priority === 'High' ? 'bg-red-100 text-red-800' :
              report.priority === 'Medium' ? 'bg-orange-100 text-orange-800' :
              report.priority === 'Low' ? 'bg-green-100 text-green-800' :
              'bg-gray-100 text-gray-800'
            }">${report.priority || 'Medium'}</span>
          </div>
          
          <div class="space-y-2 text-sm">
            <div class="grid grid-cols-2 gap-2">
              <div>
                <span class="font-medium text-gray-600">Location:</span>
                <p class="text-gray-800">${report.location || 'Unknown'}</p>
              </div>
              <div>
                <span class="font-medium text-gray-600">Status:</span>
                <p class="text-gray-800">${report.status || 'Active'}</p>
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-2">
              <div>
                <span class="font-medium text-gray-600">Age:</span>
                <p class="text-gray-800">${report.patientAge || 'N/A'} years</p>
              </div>
              <div>
                <span class="font-medium text-gray-600">Gender:</span>
                <p class="text-gray-800">${report.patientGender || 'N/A'}</p>
              </div>
            </div>
            
            ${report.symptoms ? `
              <div>
                <span class="font-medium text-gray-600">Symptoms:</span>
                <p class="text-gray-800">${Array.isArray(report.symptoms) ? report.symptoms.join(', ') : report.symptoms}</p>
              </div>
            ` : ''}
            
            <div>
              <span class="font-medium text-gray-600">Health Worker:</span>
              <p class="text-gray-800">${report.healthWorkerName || 'N/A'}</p>
            </div>
            
            <div class="text-xs text-gray-500 pt-2 border-t">
              Reported: ${report.lastUpdated ? new Date(report.lastUpdated).toLocaleString() : 'Unknown date'}
            </div>
          </div>
          
          <button onclick="selectReport('${report.id}')" class="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-medium">
            View Full Details
          </button>
        </div>
      `;

      marker.bindPopup(popupContent, {
        maxWidth: 300,
        className: 'custom-popup'
      });

      // Add click handler
      marker.on('click', () => {
        console.log('🖱️ Marker clicked for:', report.patientName);
        onReportSelect(report);
        marker.openPopup();
      });

      // Add marker to layer
      marker.addTo(markersLayer);
      markersAdded++;

      // Tooltip on hover
      marker.bindTooltip(`
        <div class="text-center">
          <div class="font-semibold">${report.patientName || 'Unknown'}</div>
          <div class="text-xs">${report.location || 'Unknown Location'}</div>
          <div class="text-xs font-medium ${
            report.priority === 'High' ? 'text-red-600' :
            report.priority === 'Medium' ? 'text-orange-600' : 'text-green-600'
          }">${report.priority || 'Medium'} Priority</div>
        </div>
      `, {
        direction: 'top',
        offset: [0, -10]
      });
    });

    console.log(`✅ Successfully added ${markersAdded} markers to map`);

    // Add global function for popup button
    window.selectReport = (reportId) => {
      const report = reports.find(r => r.id === reportId);
      if (report) {
        onReportSelect(report);
      }
    };

    // Fit map to show all markers with better padding and zoom constraints
    if (markersAdded > 0 && mapInstance) {
      setTimeout(() => {
        try {
          // Create a feature group with all markers for better bounds calculation
          const group = new window.L.featureGroup();
          markersLayer.eachLayer((layer) => {
            group.addLayer(layer);
          });
          
          const bounds = group.getBounds();
          if (bounds.isValid()) {
            mapInstance.fitBounds(bounds, { 
              padding: [40, 40], // Good padding for pins
              maxZoom: 10 // Don't zoom too close
            });
          }
        } catch (error) {
          console.warn('Could not fit bounds:', error);
          // Fallback to center of India view
          mapInstance.setView([23.5937, 78.9629], 5);
        }
      }, 100); // Small delay to ensure markers are rendered
    }

  }, [reports, selectedReport, mapInstance, markersLayer, onReportSelect]);

  // Handle view change (All India vs Northeast) with better zoom
  const handleViewChange = (isNortheast) => {
    setShowNortheast(isNortheast);
    if (mapInstance) {
      if (isNortheast) {
        mapInstance.fitBounds(NORTHEAST_BOUNDS);
        mapInstance.setZoom(8); // Better zoom for Northeast
      } else {
        mapInstance.setView([20.5937, 78.9629], 6); // Center of India
      }
    }
  };

  if (!mapLoaded) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading India map with district boundaries...</p>
          <p className="text-sm text-gray-500 mt-2">Preparing {reports.length} patient reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden border border-gray-300 bg-gray-50">
      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-[1000] bg-white p-3 rounded-lg shadow-lg border">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">
          भारत का नक्शा / India Map
        </h3>
        <p className="text-xs text-gray-600 mb-3">
          <span className="font-medium text-blue-600">{reports.length}</span> reports on map
        </p>
        
        <div className="space-y-2">
          <button
            onClick={() => handleViewChange(false)}
            className={`text-xs px-3 py-2 rounded w-full font-medium transition-colors ${
              !showNortheast 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🇮🇳 All India View
          </button>
          <button
            onClick={() => handleViewChange(true)}
            className={`text-xs px-3 py-2 rounded w-full font-medium transition-colors ${
              showNortheast 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🏔️ Northeast Focus
          </button>
          <button
            onClick={() => {
              if (mapInstance && markersLayer && reports.length > 0) {
                try {
                  // Create feature group for better bounds calculation
                  const group = new window.L.featureGroup();
                  markersLayer.eachLayer((layer) => {
                    group.addLayer(layer);
                  });
                  
                  const bounds = group.getBounds();
                  if (bounds.isValid()) {
                    mapInstance.fitBounds(bounds, { 
                      padding: [50, 50],
                      maxZoom: 8 // Good zoom level to see individual pins
                    });
                  }
                } catch (error) {
                  console.warn('Could not zoom to data:', error);
                  // Fallback zoom
                  mapInstance.setView([23.5937, 78.9629], 6);
                }
              }
            }}
            className="text-xs px-3 py-2 rounded w-full font-medium bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
          >
            🎯 Zoom to Data
          </button>
        </div>
      </div>

      {/* Enhanced Legend */}
      <div className="absolute top-4 right-4 z-[1000] bg-white p-3 rounded-lg shadow-lg border">
        <h4 className="text-xs font-semibold text-gray-800 mb-2">Report Priority</h4>
        <div className="space-y-1.5 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-600 rounded-full border-2 border-white shadow-sm"></div>
            <span className="text-xs text-gray-700 font-medium">High Priority</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-600 rounded-full border-2 border-white shadow-sm"></div>
            <span className="text-xs text-gray-700 font-medium">Medium Priority</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-600 rounded-full border-2 border-white shadow-sm"></div>
            <span className="text-xs text-gray-700 font-medium">Low Priority</span>
          </div>
        </div>
        
        <div className="border-t pt-2">
          <div className="text-xs text-gray-500">
            Click markers for details
          </div>
        </div>
      </div>

      {/* Leaflet Map Container */}
      <div id="leaflet-map" className="w-full h-full"></div>

      {/* Custom CSS for markers and popups */}
      <style jsx global>{`
        .custom-pin-marker {
          background: transparent !important;
          border: none !important;
        }
        
        .pulse-pin .pin-head {
          animation: pulsePinMarker 2s infinite;
        }
        
        @keyframes pulsePinMarker {
          0% { 
            transform: scale(1); 
            opacity: 1; 
            box-shadow: 0 3px 8px rgba(0,0,0,0.3), 0 0 0 0 rgba(220, 38, 38, 0.7);
          }
          50% { 
            transform: scale(1.1); 
            opacity: 0.9;
            box-shadow: 0 3px 8px rgba(0,0,0,0.3), 0 0 0 10px rgba(220, 38, 38, 0);
          }
          100% { 
            transform: scale(1); 
            opacity: 1; 
            box-shadow: 0 3px 8px rgba(0,0,0,0.3), 0 0 0 0 rgba(220, 38, 38, 0);
          }
        }
        
        .pin-container:hover .pin-head {
          transform: scale(1.3);
          transition: transform 0.3s ease;
          box-shadow: 0 5px 15px rgba(0,0,0,0.4);
          z-index: 1000;
        }
        
        .pin-container:hover .pin-point {
          transform: translateX(-50%) scale(1.3);
          transition: transform 0.3s ease;
        }
        
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
        
        .custom-popup .leaflet-popup-content {
          margin: 0;
          line-height: 1.4;
        }
        
        /* Make leaflet controls more visible */
        .leaflet-control-zoom a {
          font-size: 18px;
          width: 30px;
          height: 30px;
          line-height: 30px;
        }
        
        .leaflet-control {
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
        
        /* Ensure pins are always on top */
        .leaflet-marker-icon {
          z-index: 1000 !important;
        }
        
        .leaflet-marker-icon.leaflet-interactive {
          cursor: pointer;
        }
      `}</style>

      {/* Status Message */}
      {reports.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-95 z-[1000]">
          <div className="text-center p-6">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Reports to Display</h3>
            <p className="text-gray-600 max-w-sm">
              No patient reports are currently available in the Firebase database.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Map shows India with district boundaries
            </p>
          </div>
        </div>
      )}
      
      {reports.length > 0 && (
        <div className="absolute bottom-4 left-4 z-[1000] bg-white px-3 py-2 rounded-lg shadow-lg border">
          <div className="text-xs text-gray-600">
            <span className="font-medium text-green-600">✓ {reports.length}</span> reports loaded successfully
          </div>
        </div>
      )}
    </div>
  );
};

export default function Dashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [dateFilter, setDateFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("🔥 Setting up Dashboard Firebase listener...");
    
    const unsubscribe = onSnapshot(
      collection(db, "patient_reports"),
      (snapshot) => {
        console.log("📊 Dashboard data received:", snapshot.size, "reports");
        const reportsData = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          // Only include reports with location data for map display
          if (data.location) {
            reportsData.push({
              id: doc.id,
              ...data,
              // Generate mock coordinates if not available
              lat: data.latitude || (28.6139 + (Math.random() - 0.5) * 0.1), // Around New Delhi
              lng: data.longitude || (77.2090 + (Math.random() - 0.5) * 0.1)
            });
          }
        });
        
        // Sort by timestamp (newest first)
        reportsData.sort((a, b) => (b.lastUpdated || b.timestamp || 0) - (a.lastUpdated || a.timestamp || 0));
        
        setReports(reportsData);
        setLoading(false);
      },
      (error) => {
        console.error("❌ Dashboard Firebase error:", error);
        setError(`Failed to load dashboard data: ${error.message}`);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Filter reports based on selected criteria
  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPriority = priorityFilter === "all" || report.priority === priorityFilter;
    
    let matchesDate = true;
    if (dateFilter !== "all") {
      const reportDate = new Date(report.lastUpdated || report.timestamp || 0);
      const now = new Date();
      const daysDiff = Math.floor((now - reportDate) / (1000 * 60 * 60 * 24));
      
      switch (dateFilter) {
        case "today":
          matchesDate = daysDiff === 0;
          break;
        case "week":
          matchesDate = daysDiff <= 7;
          break;
        case "month":
          matchesDate = daysDiff <= 30;
          break;
      }
    }
    
    return matchesSearch && matchesPriority && matchesDate;
  });

  // Calculate statistics
  const stats = {
    total: reports.length,
    highPriority: reports.filter(r => r.priority === "High").length,
    active: reports.filter(r => r.status === "Active").length,
    resolved: reports.filter(r => r.status === "Resolved").length,
    todayReports: reports.filter(r => {
      const reportDate = new Date(r.lastUpdated || r.timestamp || 0);
      const today = new Date();
      return reportDate.toDateString() === today.toDateString();
    }).length
  };

  // Location-wise breakdown
  const locationStats = reports.reduce((acc, report) => {
    const location = report.location || "Unknown";
    acc[location] = (acc[location] || 0) + 1;
    return acc;
  }, {});

  const topLocations = Object.entries(locationStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  // Chart data preparations
  const priorityChartData = [
    { name: 'High Priority', value: reports.filter(r => r.priority === "High").length, color: '#DC2626' },
    { name: 'Medium Priority', value: reports.filter(r => r.priority === "Medium").length, color: '#D97706' },
    { name: 'Low Priority', value: reports.filter(r => r.priority === "Low").length, color: '#059669' },
    { name: 'Unspecified', value: reports.filter(r => !r.priority || r.priority === "").length, color: '#6B7280' }
  ].filter(item => item.value > 0);

  const statusChartData = [
    { name: 'Active', value: reports.filter(r => r.status === "Active").length, color: '#2563EB' },
    { name: 'Under Treatment', value: reports.filter(r => r.status === "Under Treatment").length, color: '#EA580C' },
    { name: 'Resolved', value: reports.filter(r => r.status === "Resolved").length, color: '#059669' },
    { name: 'Unspecified', value: reports.filter(r => !r.status || r.status === "").length, color: '#6B7280' }
  ].filter(item => item.value > 0);

  const locationBarData = topLocations.map(([location, count]) => ({
    location: location.length > 15 ? location.substring(0, 15) + '...' : location,
    reports: count,
    fullLocation: location
  }));

  // Time series data (last 30 days)
  const getTimeSeriesData = () => {
    const last30Days = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const reportsCount = reports.filter(report => {
        const reportDate = new Date(report.lastUpdated || report.timestamp || 0);
        return reportDate.toISOString().split('T')[0] === dateStr;
      }).length;
      
      last30Days.push({
        date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
        reports: reportsCount,
        fullDate: dateStr
      });
    }
    
    return last30Days;
  };

  const timeSeriesData = getTimeSeriesData();

  // Age group distribution
  const ageGroupData = reports.reduce((acc, report) => {
    if (!report.patientAge) return acc;
    
    const age = parseInt(report.patientAge);
    let ageGroup;
    
    if (age < 18) ageGroup = '0-17 (Children)';
    else if (age < 35) ageGroup = '18-34 (Young Adults)';
    else if (age < 60) ageGroup = '35-59 (Adults)';
    else ageGroup = '60+ (Elderly)';
    
    acc[ageGroup] = (acc[ageGroup] || 0) + 1;
    return acc;
  }, {});

  const ageChartData = Object.entries(ageGroupData).map(([group, count]) => ({
    ageGroup: group,
    count
  }));

  // Gender distribution
  const genderData = reports.reduce((acc, report) => {
    const gender = report.patientGender || 'Unspecified';
    acc[gender] = (acc[gender] || 0) + 1;
    return acc;
  }, {});

  const genderChartData = [
    { name: 'Male', value: genderData.Male || 0, color: '#3B82F6' },
    { name: 'Female', value: genderData.Female || 0, color: '#EC4899' },
    { name: 'Other', value: genderData.Other || 0, color: '#8B5CF6' },
    { name: 'Unspecified', value: genderData.Unspecified || 0, color: '#6B7280' }
  ].filter(item => item.value > 0);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto mt-10 p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-300 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1,2,3,4].map(i => <div key={i} className="h-24 bg-gray-300 rounded"></div>)}
          </div>
          <div className="h-96 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto mt-10 p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-800">
            Analytics Dashboard / एनालिटिक्स डैशबोर्ड
          </h1>
          <p className="text-gray-600 mt-2">Real-time patient reports and geographical distribution</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>

      {/* Key Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Reports</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-gray-900">{stats.highPriority}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
          <div className="flex items-center">
            <Activity className="w-8 h-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Cases</p>
              <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-gray-900">{stats.resolved}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Today's Reports</p>
              <p className="text-2xl font-bold text-gray-900">{stats.todayReports}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by patient name or location..."
              className="border rounded-lg px-3 py-2 text-sm w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>

          <div className="ml-auto text-sm text-gray-600">
            Showing {filteredReports.length} of {reports.length} reports
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Map Section */}
        <div className="xl:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              Geographical Distribution
            </h2>
            <MapComponent 
              reports={filteredReports}
              selectedReport={selectedReport}
              onReportSelect={setSelectedReport}
            />
            {filteredReports.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No reports with location data to display
              </div>
            )}
          </div>
        </div>

        {/* Charts Section */}
        <div className="xl:col-span-2 space-y-6">
          {/* Priority Distribution Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-purple-600" />
              Priority Distribution
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <RechartsPieChart>
                <Pie
                  data={priorityChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {priorityChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [value, name]} />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>

          {/* Status Distribution */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart className="w-5 h-5 text-green-600" />
              Status Distribution
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <RechartsBarChart data={statusChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {statusChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Additional Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Reports Timeline */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Reports Timeline (Last 30 Days)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={timeSeriesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip 
                formatter={(value) => [value, 'Reports']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Area 
                type="monotone" 
                dataKey="reports" 
                stroke="#3B82F6" 
                fillOpacity={1} 
                fill="url(#colorReports)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Age Group Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-600" />
            Age Group Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <RechartsBarChart data={ageChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="ageGroup" 
                tick={{ fontSize: 10 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#F97316" radius={[4, 4, 0, 0]} />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>

        {/* Gender Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-pink-600" />
            Gender Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <RechartsPieChart>
              <Pie
                data={genderChartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {genderChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [value, name]} />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Location-wise Reports Bar Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-indigo-600" />
          Top Locations by Report Count
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsBarChart data={locationBarData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="location" 
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis />
            <Tooltip 
              formatter={(value, name, props) => [value, 'Reports']}
              labelFormatter={(label, payload) => {
                const data = payload?.[0]?.payload;
                return data ? `Location: ${data.fullLocation}` : label;
              }}
            />
            <Bar 
              dataKey="reports" 
              fill="#6366F1" 
              radius={[4, 4, 0, 0]}
              name="Reports"
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Reports Table and Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Recent Reports Table */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Recent Reports</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReports.slice(0, 10).map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{report.patientName}</div>
                      <div className="text-sm text-gray-500">{report.patientAge}yr, {report.patientGender}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {report.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        report.priority === "High" ? "bg-red-100 text-red-800" :
                        report.priority === "Medium" ? "bg-yellow-100 text-yellow-800" :
                        "bg-green-100 text-green-800"
                      }`}>
                        {report.priority || "Medium"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        report.status === "Active" ? "bg-blue-100 text-blue-800" :
                        report.status === "Resolved" ? "bg-green-100 text-green-800" :
                        "bg-orange-100 text-orange-800"
                      }`}>
                        {report.status || "Active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(report.lastUpdated || report.timestamp).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedReport(report)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredReports.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No reports found matching your criteria
            </div>
          )}
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Selected Report Details */}
          {selectedReport && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-green-600" />
                Selected Report
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-600">Patient:</span>
                  <p className="text-gray-900">{selectedReport.patientName}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Location:</span>
                  <p className="text-gray-900">{selectedReport.location}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Priority:</span>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    selectedReport.priority === "High" ? "bg-red-100 text-red-800" :
                    selectedReport.priority === "Medium" ? "bg-yellow-100 text-yellow-800" :
                    "bg-green-100 text-green-800"
                  }`}>
                    {selectedReport.priority || "Medium"}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Status:</span>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    selectedReport.status === "Active" ? "bg-blue-100 text-blue-800" :
                    selectedReport.status === "Resolved" ? "bg-green-100 text-green-800" :
                    "bg-orange-100 text-orange-800"
                  }`}>
                    {selectedReport.status || "Active"}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Reported:</span>
                  <p className="text-sm text-gray-900">
                    {new Date(selectedReport.lastUpdated || selectedReport.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Quick Statistics */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Quick Statistics
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Reports</span>
                <span className="text-lg font-bold text-blue-600">{stats.total}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">High Priority</span>
                <span className="text-lg font-bold text-red-600">{stats.highPriority}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Cases</span>
                <span className="text-lg font-bold text-orange-600">{stats.active}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Resolved</span>
                <span className="text-lg font-bold text-green-600">{stats.resolved}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Today's Reports</span>
                <span className="text-lg font-bold text-purple-600">{stats.todayReports}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded">
                View All Patient Reports
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded">
                Generate Monthly Report
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-orange-600 hover:bg-orange-50 rounded">
                Alert High Priority Cases
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded">
                Export Location Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}