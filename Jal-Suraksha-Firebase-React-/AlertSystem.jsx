import React, { useState } from 'react';
import { Bell, X, AlertTriangle, MapPin, Calendar, Users, ExternalLink } from 'lucide-react';

// Mock contaminated water data
const contaminationAlerts = [
  {
    id: 1,
    title: "High Priority: Water Contamination in Ludhiana",
    message: "Excessive fluoride and high TDS levels detected. Immediate action required.",
    location: "Ludhiana, Punjab",
    affectedPopulation: "1.6M people",
    severity: "high",
    issueType: "Fluoride contamination, High TDS (920 ppm)",
    reportedDate: "2025-09-17",
    expectedResolution: "2025-09-25",
    contactNumber: "1800-11-2345",
    actionTaken: "Water tankers deployed, filtration plants activated"
  },
  {
    id: 2,
    title: "Water Quality Alert: Delhi NCR",
    message: "High TDS levels and bacterial contamination detected in multiple sectors.",
    location: "Delhi, NCR",
    affectedPopulation: "32M people",
    severity: "high",
    issueType: "Bacterial contamination, High TDS (850 ppm)",
    reportedDate: "2025-09-18",
    expectedResolution: "2025-09-28",
    contactNumber: "1800-11-5678",
    actionTaken: "Enhanced chlorination, water quality testing increased"
  },
  {
    id: 3,
    title: "Water Contamination: Kolkata Areas",
    message: "Iron contamination and elevated TDS levels affecting water supply.",
    location: "Kolkata, West Bengal",
    affectedPopulation: "14.8M people",
    severity: "medium",
    issueType: "Iron contamination, High TDS (780 ppm)",
    reportedDate: "2025-09-17",
    expectedResolution: "2025-09-30",
    contactNumber: "1800-11-9012",
    actionTaken: "Iron removal plants operational, alternative sources identified"
  }
];

const AlertSystem = () => {
  const [alerts, setAlerts] = useState(contaminationAlerts);
  const [expandedAlert, setExpandedAlert] = useState(null);
  const [showNotification, setShowNotification] = useState(true);

  const dismissAlert = (alertId) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  const toggleExpanded = (alertId) => {
    setExpandedAlert(expandedAlert === alertId ? null : alertId);
  };

  const getSeverityConfig = (severity) => {
    switch(severity) {
      case 'high':
        return {
          bgColor: 'bg-red-50',
          borderColor: 'border-red-500',
          textColor: 'text-red-800',
          iconColor: 'text-red-600',
          badgeColor: 'bg-red-600 text-white'
        };
      case 'medium':
        return {
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-500',
          textColor: 'text-yellow-800',
          iconColor: 'text-yellow-600',
          badgeColor: 'bg-yellow-600 text-white'
        };
      default:
        return {
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-500',
          textColor: 'text-blue-800',
          iconColor: 'text-blue-600',
          badgeColor: 'bg-blue-600 text-white'
        };
    }
  };

  if (alerts.length === 0) {
    return (
      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg shadow-sm">
        <div className="flex items-center">
          <Bell className="w-5 h-5 text-green-600 mr-3" />
          <span className="text-green-800 font-medium">No active water quality alerts</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Bell className="w-6 h-6 text-red-600 animate-pulse" />
          <h2 className="text-2xl font-bold text-red-800">
            Active Water Quality Alerts ({alerts.length})
          </h2>
        </div>
        {showNotification && (
          <div className="bg-red-100 border border-red-300 rounded-lg px-4 py-2 flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span className="text-red-800 text-sm font-medium">Live Updates</span>
            <button 
              onClick={() => setShowNotification(false)}
              className="text-red-600 hover:text-red-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Alert Cards */}
      {alerts.map((alert) => {
        const config = getSeverityConfig(alert.severity);
        const isExpanded = expandedAlert === alert.id;
        
        return (
          <div 
            key={alert.id} 
            className={`border-l-4 ${config.borderColor} ${config.bgColor} rounded-r-lg shadow-lg overflow-hidden`}
          >
            <div className="p-6">
              {/* Alert Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <AlertTriangle className={`w-6 h-6 ${config.iconColor}`} />
                    <h3 className={`text-lg font-bold ${config.textColor}`}>
                      {alert.title}
                    </h3>
                    <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${config.badgeColor}`}>
                      {alert.severity} Priority
                    </span>
                  </div>
                  <p className={`${config.textColor} mb-3 text-sm`}>
                    {alert.message}
                  </p>
                  
                  {/* Quick Info */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{alert.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{alert.affectedPopulation}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">Reported: {alert.reportedDate}</span>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => toggleExpanded(alert.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isExpanded 
                        ? 'bg-gray-200 text-gray-700' 
                        : `${config.bgColor.replace('50', '100')} ${config.textColor}`
                    }`}
                  >
                    {isExpanded ? 'Hide Details' : 'View Details'}
                  </button>
                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="text-gray-500 hover:text-gray-700 p-2"
                    title="Dismiss Alert"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="border-t border-gray-200 pt-4 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white bg-opacity-70 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-700 mb-2">Issue Details</h4>
                      <p className="text-sm text-gray-600">{alert.issueType}</p>
                    </div>
                    <div className="bg-white bg-opacity-70 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-700 mb-2">Action Taken</h4>
                      <p className="text-sm text-gray-600">{alert.actionTaken}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white bg-opacity-70 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-gray-700">Expected Resolution</h4>
                      <span className="text-sm font-medium text-blue-600">{alert.expectedResolution}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '35%'}}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Progress: 35% Complete</p>
                  </div>

                  {/* Emergency Actions */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                    <a
                      href={`tel:${alert.contactNumber}`}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium flex items-center space-x-2"
                    >
                      <span>Emergency Helpline</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      Report Related Issue
                    </button>
                    <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium">
                      Get Water Tanker
                    </button>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                      Subscribe Updates
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Emergency Contact Footer */}
      <div className="bg-blue-600 text-white p-6 rounded-lg text-center">
        <h3 className="text-lg font-bold mb-2">Emergency Water Quality Helpline</h3>
        <p className="text-blue-100 mb-4">
          For immediate assistance with water contamination or health concerns
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a 
            href="tel:1800-11-2345" 
            className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Call: 1800-11-2345
          </a>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-400 transition-colors">
            WhatsApp Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertSystem;