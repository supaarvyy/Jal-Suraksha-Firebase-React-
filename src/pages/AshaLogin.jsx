import { useState } from "react";
import { MapPin, Droplet, FlaskConical, ShieldCheck } from "lucide-react";

export default function AshaLogin() {
  const [location, setLocation] = useState("");
  const [waterSource, setWaterSource] = useState("");
  const [ph, setPh] = useState("");
  const [tbs, setTbs] = useState("");
  const [ecoli, setEcoli] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ location, waterSource, ph, tbs, ecoli });
    alert("✅ Data submitted successfully! / डेटा सफलतापूर्वक जमा हुआ");
    setLocation("");
    setWaterSource("");
    setPh("");
    setTbs("");
    setEcoli(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex-grow flex justify-center items-start mt-12 px-4">
        <div className="bg-white w-full max-w-5xl p-10 rounded-lg shadow-lg border border-gray-200">
          {/* Title */}
          <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">
            ASHA Worker Login / डेटा एंट्री पोर्टल
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Enter water quality testing data for your assigned location.  
            अपने क्षेत्र के जल गुणवत्ता परीक्षण डेटा दर्ज करें।
          </p>

          {/* Form */}
          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Section 1: Location */}
            <div className="bg-gray-50 border rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-blue-600 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" /> Location Details / स्थान विवरण
              </h3>
              <div className="md:flex md:space-x-4">
                <div className="flex-1">
                  <label className="block text-gray-700 mb-1">Pincode / पिनकोड</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter Pincode"
                    className="border rounded w-full px-3 py-2 text-sm focus:ring focus:ring-blue-200"
                    required
                  />
                </div>

                <div className="flex-1 mt-4 md:mt-0">
                  <label className="block text-gray-700 mb-1">Water Source Type / जल स्रोत</label>
                  <select
                    value={waterSource}
                    onChange={(e) => setWaterSource(e.target.value)}
                    className="border rounded w-full px-3 py-2 text-sm focus:ring focus:ring-blue-200"
                    required
                  >
                    <option value="">-- Select / चुनें --</option>
                    <option value="tap">Tap Water / नल का पानी</option>
                    <option value="well">Well / कुआं</option>
                    <option value="river">River / नदी</option>
                    <option value="handpump">Hand Pump / हैंडपंप</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Test Results */}
            <div className="bg-gray-50 border rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-blue-600 mb-4 flex items-center gap-2">
                <FlaskConical className="w-5 h-5" /> Water Test Results / जल परीक्षण परिणाम
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-gray-700 mb-1">pH Value (6.5 - 8.5)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={ph}
                    onChange={(e) => setPh(e.target.value)}
                    className="border rounded w-full px-3 py-2 text-sm focus:ring focus:ring-blue-200"
                    placeholder="Enter pH value"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">TBS (ppm)</label>
                  <input
                    type="number"
                    value={tbs}
                    onChange={(e) => setTbs(e.target.value)}
                    className="border rounded w-full px-3 py-2 text-sm focus:ring focus:ring-blue-200"
                    placeholder="Enter TBS in ppm"
                    required
                  />
                </div>

                <div className="flex items-center mt-6 md:mt-0">
                  <input
                    type="checkbox"
                    checked={ecoli}
                    onChange={(e) => setEcoli(e.target.checked)}
                    className="mr-2"
                  />
                  <label className="text-gray-700">E.coli Present? / ई.कोलाई मौजूद?</label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded font-medium shadow-md"
              >
                Submit Data / डेटा जमा करें
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
