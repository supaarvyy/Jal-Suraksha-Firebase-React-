import { Phone, Mail, FileText, CheckCircle } from "lucide-react";

export default function Grievance() {
  return (
    <div className="max-w-6xl mx-auto mt-10 p-8 bg-gray-50 rounded-lg shadow">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">
        Grievance Redressal प्रणाली
      </h2>

      {/* Notice / Intro */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6 rounded">
        <p className="text-gray-800 text-sm leading-relaxed">
          नागरिकों की सुविधा के लिए <span className="font-semibold">राष्ट्रीय जल सुरक्षा पोर्टल</span> 
          जल आपूर्ति, गुणवत्ता एवं उपलब्धता से संबंधित समस्याओं के लिए 
          <span className="font-semibold"> ऑनलाइन शिकायत निवारण प्रणाली</span> प्रदान करता है।  
          सभी शिकायतों का निवारण निर्धारित समय सीमा में किया जाएगा।
        </p>
      </div>

      {/* Process Steps */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
          <FileText className="text-blue-600 mb-3 w-8 h-8" />
          <h3 className="font-semibold text-gray-800 mb-2">1. Register</h3>
          <p className="text-sm text-gray-600">
            नागरिक पोर्टल पर अपनी शिकायत दर्ज करें।
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
          <Mail className="text-blue-600 mb-3 w-8 h-8" />
          <h3 className="font-semibold text-gray-800 mb-2">2. Track</h3>
          <p className="text-sm text-gray-600">
            शिकायत की स्थिति ईमेल और पोर्टल पर देखें।
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
          <CheckCircle className="text-blue-600 mb-3 w-8 h-8" />
          <h3 className="font-semibold text-gray-800 mb-2">3. Resolve</h3>
          <p className="text-sm text-gray-600">
            समयबद्ध समाधान और अद्यतन प्राप्त करें।
          </p>
        </div>
      </div>

      {/* Form */}
      <form className="bg-white p-8 rounded-lg shadow-md space-y-6">
        <h3 className="text-xl font-semibold text-blue-600 mb-4">
          Submit Your Grievance / अपनी शिकायत दर्ज करें
        </h3>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Full Name / नाम</label>
          <input
            type="text"
            className="border rounded w-full px-4 py-2 text-sm focus:ring focus:ring-blue-200"
            placeholder="Enter your name"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              className="border rounded w-full px-4 py-2 text-sm focus:ring focus:ring-blue-200"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Mobile Number</label>
            <input
              type="text"
              className="border rounded w-full px-4 py-2 text-sm focus:ring focus:ring-blue-200"
              placeholder="Enter your mobile number"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Grievance Details / शिकायत विवरण</label>
          <textarea
            className="border rounded w-full px-4 py-2 text-sm focus:ring focus:ring-blue-200"
            rows="4"
            placeholder="Describe your issue"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded font-medium shadow"
        >
          Submit Complaint / शिकायत दर्ज करें
        </button>
      </form>

      {/* Helpline Info */}
      <div className="mt-10 bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-700 mb-2">Helpline / हेल्पलाइन</h3>
        <p className="text-gray-700 mb-2">
          Toll-Free Number: <span className="font-bold">1800-123-456</span>
        </p>
        <p className="text-gray-700">
          Email Support: <span className="font-bold">support@jalsuraksha.gov.in</span>
        </p>
      </div>
    </div>
  );
}
