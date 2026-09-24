// src/pages/PatientReports.jsx
import { useState, useEffect } from "react";
import { User, MapPin, Calendar, AlertCircle, CheckCircle, Clock, Search, Eye, Activity } from "lucide-react";
import { db } from "../firebase";
import { collection, onSnapshot, getDocs } from "firebase/firestore";

export default function PatientReports() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Manual fetch function for testing real-time issues
  const fetchPatients = async () => {
    setLoading(true);
    try {
      console.log("🔄 Manual fetch started...");
      const snapshot = await getDocs(collection(db, "patient_reports"));
      const patientData = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        patientData.push({
          id: doc.id,
          ...data
        });
      });
      
      // Sort by lastUpdated (newest first)
      patientData.sort((a, b) => {
        const aTime = a.lastUpdated || a.timestamp || 0;
        const bTime = b.lastUpdated || b.timestamp || 0;
        return bTime - aTime; // Descending order (newest first)
      });
      
      console.log("✅ Manual fetch completed. Found:", patientData.length, "patients");
      if (patientData.length > 0) {
        console.log("First patient timestamp:", patientData[0]?.lastUpdated);
      }
      setPatients(patientData);
      setLoading(false);
    } catch (error) {
      console.error("❌ Manual fetch error:", error);
      setError("Failed to fetch data manually");
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    console.log("🔥 Setting up Firebase real-time listener...");
    
    try {
      // Simple collection listener (no ordering to avoid index issues)
      const q = collection(db, "patient_reports");

      // Subscribe to real-time updates
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          console.log("🔥 Firebase snapshot received!");
          console.log("Documents count:", snapshot.size);
          console.log("Snapshot metadata - fromCache:", snapshot.metadata.fromCache);
          console.log("Snapshot metadata - hasPendingWrites:", snapshot.metadata.hasPendingWrites);
          
          const patientData = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            console.log("📄 Document:", doc.id, "lastUpdated:", data.lastUpdated);
            patientData.push({
              id: doc.id,
              ...data
            });
          });
          
          // Sort manually by lastUpdated (newest first)
          patientData.sort((a, b) => {
            const aTime = a.lastUpdated || a.timestamp || 0;
            const bTime = b.lastUpdated || b.timestamp || 0;
            return bTime - aTime; // Descending order (newest first)
          });
          
          console.log("✅ Total patients processed:", patientData.length);
          if (patientData.length > 0) {
            console.log("🕒 Most recent patient:", patientData[0]?.patientName, "at", new Date(patientData[0]?.lastUpdated || 0).toLocaleString());
          }
          
          setPatients(patientData);
          setLoading(false);
        },
        (error) => {
          console.error("❌ Firebase error:", error);
          console.error("Error code:", error.code);
          console.error("Error message:", error.message);
          setError(`Failed to load patient data: ${error.message}`);
          setLoading(false);
        }
      );

      // Cleanup subscription on unmount
      return () => {
        console.log("🧹 Cleaning up Firebase listener");
        unsubscribe();
      };
    } catch (error) {
      console.error("❌ Error setting up listener:", error);
      setError("Failed to connect to database. Please try again.");
      setLoading(false);
    }
  }, []);

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      (patient.patientName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (patient.location || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (patient.healthWorkerName || "").toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "All" || patient.status === filterStatus;
    const matchesPriority = filterPriority === "All" || patient.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "text-red-600 bg-red-100";
      case "Medium": return "text-yellow-600 bg-yellow-100";
      case "Low": return "text-green-600 bg-green-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "text-blue-600 bg-blue-100";
      case "Under Treatment": return "text-orange-600 bg-orange-100";
      case "Resolved": return "text-green-600 bg-green-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const formatDate = (dateString, timestamp, lastUpdated) => {
    if (dateString) return dateString;
    if (lastUpdated) {
      return new Date(lastUpdated).toLocaleDateString('en-IN');
    }
    if (timestamp) {
      return new Date(timestamp).toLocaleDateString('en-IN');
    }
    return "N/A";
  };

  const formatTime = (timestamp, lastUpdated) => {
    if (lastUpdated) {
      return new Date(lastUpdated).toLocaleString('en-IN');
    }
    if (timestamp) {
      return new Date(timestamp).toLocaleString('en-IN');
    }
    return "N/A";
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto mt-10 p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-20 bg-gray-300 rounded"></div>
            ))}
          </div>
          <div className="space-y-4">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            vfvg
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-32 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto mt-10 p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>{error}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchPatients}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Try Manual Fetch
          </button>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 p-8 bg-gray-50 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-700">
          Patient Reports / मरीज़ों की रिपोर्ट
        </h2>
        <div className="flex gap-2">
          <button
            onClick={fetchPatients}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            📡 Manual Fetch
          </button>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            🔄 Refresh Page
          </button>
        </div>
      </div>

      {patients.length > 0 && (
        <div className="mb-4 p-3 bg-blue-100 rounded-lg">
          <div className="text-sm text-blue-800">
            Last update: {new Date(patients[0]?.lastUpdated || 0).toLocaleString()}
          </div>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <User className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Patients</p>
              <p className="text-2xl font-bold text-gray-900">{patients.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <AlertCircle className="w-8 h-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-gray-900">
                {patients.filter(p => p.priority === "High").length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Activity className="w-8 h-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Cases</p>
              <p className="text-2xl font-bold text-gray-900">
                {patients.filter(p => p.status === "Active").length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-gray-900">
                {patients.filter(p => p.status === "Resolved").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search patients, location, or health worker..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Under Treatment">Under Treatment</option>
            <option value="Resolved">Resolved</option>
          </select>
          
          <select
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="All">All Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        
        <div className="text-sm text-gray-600">
          Showing {filteredPatients.length} of {patients.length} patients
          {patients.length > 0 && (
            <span className="ml-4 text-blue-600">
              • Newest: {new Date(patients[0]?.lastUpdated || 0).toLocaleString()}
            </span>
          )}
        </div>
      </div>

      {/* Patient Cards */}
      <div className="space-y-4">
        {filteredPatients.map((patient) => (
          <div key={patient.id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <User className="text-blue-600 w-5 h-5" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {patient.patientName || "N/A"}
                  </h3>
                  <span className="text-sm text-gray-600">
                    Age: {patient.patientAge || "N/A"} | {patient.patientGender || "N/A"}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="text-gray-500 w-4 h-4" />
                  <span className="text-sm text-gray-600">{patient.location || "N/A"}</span>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="text-gray-500 w-4 h-4" />
                  <span className="text-sm text-gray-600">
                    Reported: {formatDate(patient.date, patient.timestamp, patient.lastUpdated)} by {patient.healthWorkerName || "N/A"}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-xs font-medium text-gray-700">Symptoms:</span>
                  {(() => {
                    const symptoms = patient.symptoms;
                    if (Array.isArray(symptoms)) {
                      return symptoms.map((symptom, index) => (
                        <span key={index} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
                          {symptom}
                        </span>
                      ));
                    } else if (symptoms) {
                      return (
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
                          {symptoms}
                        </span>
                      );
                    } else {
                      return (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          No symptoms recorded
                        </span>
                      );
                    }
                  })()}
                </div>

                {patient.notes && patient.notes !== "-" && (
                  <p className="text-sm text-gray-600 mb-3">
                    <strong>Notes:</strong> {patient.notes}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(patient.priority)}`}>
                    {patient.priority || "Medium"}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                    {patient.status || "Active"}
                  </span>
                </div>
                
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  {patient.diagnosisConfirmed ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Confirmed
                    </>
                  ) : (
                    <>
                      <Clock className="w-4 h-4 text-orange-500" />
                      Pending
                    </>
                  )}
                </div>

                {patient.followUpDate && (
                  <div className="text-xs text-gray-500">
                    Follow-up: {patient.followUpDate}
                  </div>
                )}
                
                <button 
                  onClick={() => setSelectedPatient(patient)}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPatients.length === 0 && !loading && (
        <div className="text-center py-12">
          <AlertCircle className="mx-auto w-12 h-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
          <p className="text-gray-500">
            {patients.length === 0 
              ? "No patient data has been submitted yet." 
              : "Try adjusting your search or filter criteria."
            }
          </p>
        </div>
      )}

      {/* Patient Details Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Patient Details</h3>
              <button 
                onClick={() => setSelectedPatient(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="text-gray-900">{selectedPatient.patientName || "N/A"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Age & Gender</label>
                  <p className="text-gray-900">{selectedPatient.patientAge || "N/A"} years, {selectedPatient.patientGender || "N/A"}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <p className="text-gray-900">{selectedPatient.location || "N/A"}</p>
                {selectedPatient.latitude && selectedPatient.longitude && (
                  <p className="text-sm text-gray-500">
                    Coordinates: {selectedPatient.latitude}, {selectedPatient.longitude}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Symptoms</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {(() => {
                    const symptoms = selectedPatient.symptoms;
                    if (Array.isArray(symptoms)) {
                      return symptoms.map((symptom, index) => (
                        <span key={index} className="px-2 py-1 bg-red-100 text-red-700 text-sm rounded">
                          {symptom}
                        </span>
                      ));
                    } else if (symptoms) {
                      return (
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-sm rounded">
                          {symptoms}
                        </span>
                      );
                    } else {
                      return <span className="text-gray-500 text-sm">No symptoms recorded</span>;
                    }
                  })()}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Health Worker</label>
                <p className="text-gray-900">{selectedPatient.healthWorkerName || "N/A"}</p>
                <p className="text-sm text-gray-500">ID: {selectedPatient.healthWorkerId || "N/A"}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <p className="text-gray-900">{selectedPatient.notes && selectedPatient.notes !== "-" ? selectedPatient.notes : "No additional notes"}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedPatient.status)}`}>
                    {selectedPatient.status || "Active"}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Priority</label>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedPatient.priority)}`}>
                    {selectedPatient.priority || "Medium"}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Reported Time</label>
                <p className="text-gray-900">{formatTime(selectedPatient.timestamp, selectedPatient.lastUpdated)}</p>
              </div>
              
              {selectedPatient.followUpDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Follow-up Date</label>
                  <p className="text-gray-900">{selectedPatient.followUpDate}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

