import { useState } from "react";

export default function SearchBar() {
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");

  const handlePincodeChange = async (e) => {
    const value = e.target.value;
    setPincode(value);

    // Only fetch if pincode is 6 digits
    if (value.length === 6) {
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${value}`);
        const data = await res.json();

        if (data[0].Status === "Success") {
          const postOffice = data[0].PostOffice[0];
          setState(postOffice.State);
          setDistrict(postOffice.District);
        } else {
          setState("");
          setDistrict("");
        }
      } catch (err) {
        console.error("Error fetching pincode data:", err);
        setState("");
        setDistrict("");
      }
    } else {
      setState("");
      setDistrict("");
    }
  };

  return (
    <section className="max-w-4xl mx-auto mt-8 p-6 border rounded-lg bg-gray-50 text-center">
      <h2 className="font-semibold text-lg mb-2">
        Check Water Quality in Your Area
      </h2>
      <p className="text-sm text-gray-700 mb-4">
        Enter your Pincode or select your State/District to view the latest water quality reports.
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        {/* Pincode Input */}
        <input
          type="text"
          value={pincode}
          onChange={handlePincodeChange}
          placeholder="Enter Pincode..."
          className="border rounded px-3 py-2 text-sm w-40"
        />

        {/* State Dropdown */}
        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="border rounded px-3 py-2 text-sm w-44"
        >
          <option value="">-- Select State --</option>
          {state && <option value={state}>{state}</option>}
        </select>

        {/* District Dropdown */}
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="border rounded px-3 py-2 text-sm w-44"
        >
          <option value="">-- Select District --</option>
          {district && <option value={district}>{district}</option>}
        </select>

        <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded">
          Search
        </button>
      </div>
    </section>
  );
}
