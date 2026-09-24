export default function StatsCard() {
  return (
    <section className="max-w-6xl mx-auto mt-10 mb-12">
      <h3 className="text-center font-bold text-lg mb-6">
        Jal Suraksha Dashboard (At a Glance)
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="border rounded-lg p-4 text-center bg-white shadow-sm">
          <p className="text-sm text-blue-700 font-medium">📝 Samples Tested Today</p>
          <p className="text-2xl font-bold mt-2">1,24,567</p>
        </div>

        <div className="border rounded-lg p-4 text-center bg-white shadow-sm">
          <p className="text-sm text-green-700 font-medium">✔ Habitations with Safe Water</p>
          <p className="text-2xl font-bold mt-2">92.5%</p>
        </div>

        <div className="border rounded-lg p-4 text-center bg-white shadow-sm">
          <p className="text-sm text-red-600 font-medium">⚠ High-Risk Alerts</p>
          <p className="text-2xl font-bold mt-2">412</p>
        </div>

        <div className="border rounded-lg p-4 text-center bg-white shadow-sm">
          <p className="text-sm text-purple-600 font-medium">💡 Grievances Resolved</p>
          <p className="text-2xl font-bold mt-2">18,921</p>
        </div>
      </div>
    </section>
  );
}
