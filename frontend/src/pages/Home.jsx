export default function Home() {
  return (
    <section className="pt-24 pb-16 min-h-screen bg-[#111827] text-white flex flex-col items-center justify-start sm:justify-center px-4">
      {/* Hero Text */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 text-green-400 leading-tight">
          Welcome to <span className="text-primary">Kisaan Sathi 🌾</span>
        </h1>
        <p className="text-gray-300 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
          Your trusted digital farming companion. Discover detailed crop insights,
          receive expert advisories, and connect with the farming community — all in one place.
        </p>
      </div>

      {/* Hero Image */}
      <div className="mt-10 w-full flex justify-center">
        <img
  src="https://plus.unsplash.com/premium_photo-1661962949590-1c248a9bbe6c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dHJhY3RvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600"
  alt="Farmer working in the field"
  className="w-full h-[40vh] max-w-[100vh] object-cover rounded-3xl shadow-2xl border border-gray-700 hover:scale-[1.02] transition-transform duration-300"
/>

      </div>

      {/* CTA Section */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <a
          href="/showcrops"
          className="bg-green-500 hover:bg-green-400 text-black font-semibold py-3 px-6 rounded-lg transition-all"
        >
          🌱 Explore Crops
        </a>
        <a
          href="/advisories"
          className="bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all"
        >
          📢 View Advisories
        </a>
      </div>
    </section>
  );
}
