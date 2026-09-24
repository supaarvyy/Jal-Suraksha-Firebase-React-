import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="max-w-6xl mx-auto mt-10 p-8 bg-gray-50 rounded-lg shadow">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">Contact Us / संपर्क करें</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        नागरिकों की सुविधा हेतु, आप <span className="font-semibold">जल शक्ति मंत्रालय</span> से किसी भी प्रकार की 
        जानकारी, सुझाव या सहायता के लिए संपर्क कर सकते हैं।  
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Details */}
        <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-start gap-3">
            <MapPin className="text-blue-600 w-6 h-6 mt-1" />
            <p>
              <strong>Address / पता:</strong> <br />
              Ministry of Jal Shakti, Government of India, New Delhi – 110001
              <br />
              Provided for Water Born Diseases detection
            </p>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="text-blue-600 w-6 h-6 mt-1" />
            <p>
              <strong>Phone / फ़ोन:</strong> <br />
              +91-11-12345678 <br />
              Toll-Free Helpline: 1800-123-456
            </p>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="text-blue-600 w-6 h-6 mt-1" />
            <p>
              <strong>Email / ईमेल:</strong> <br />
              info@jalshakti.gov.in <br />
              support@jalsuraksha.gov.in
              

            </p>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="text-blue-600 w-6 h-6 mt-1" />
            <p>
              <strong>Working Hours / कार्य समय:</strong> <br />
              Mon – Fri, 9:00 AM – 6:00 PM
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <form className="bg-white p-8 rounded-lg shadow-md space-y-6">
          <h3 className="text-lg font-semibold text-blue-600 mb-4">
            Send Us a Message / संदेश भेजें
          </h3>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name / नाम</label>
            <input
              type="text"
              className="border rounded w-full px-4 py-2 text-sm focus:ring focus:ring-blue-200"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email / ईमेल</label>
            <input
              type="email"
              className="border rounded w-full px-4 py-2 text-sm focus:ring focus:ring-blue-200"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Message / संदेश</label>
            <textarea
              className="border rounded w-full px-4 py-2 text-sm focus:ring focus:ring-blue-200"
              rows="4"
              placeholder="Write your message"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded font-medium shadow"
          >
            Send Message / संदेश भेजें
          </button>
        </form>
      </div>

      {/* Map Section */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold text-blue-700 mb-4">Locate Us / हमें खोजें</h3>
        <iframe
          className="w-full h-72 rounded-lg shadow"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.123456!2d77.210123!3d28.613939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd123456789%3A0xabcdef123456789!2sMinistry%20of%20Jal%20Shakti!5e0!3m2!1sen!2sin!4v1700000000000"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
