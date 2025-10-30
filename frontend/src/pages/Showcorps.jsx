import { useEffect, useState } from "react";
import axios from "../api/axios";
import toast, { Toaster } from "react-hot-toast";

export default function ShowCrops() {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const res = await axios.get("/crops"); // Public route — all crops
        setCrops(res.data);
      } catch (err) {
        console.error("❌ Fetch crops error:", err);
        toast.error("Failed to load crops");
      }
    };
    fetchCrops();
  }, []);

  return (
    <section className="min-h-screen bg-[#111827] text-white pt-24 px-6 pb-12">
      <Toaster />
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-green-400 mb-8 text-center">
          🌾 All Crops
        </h2>

        {crops.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">No crops uploaded yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {crops.map((crop) => (
              <div
                key={crop._id}
                className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                {/* 🖼️ Image */}
                {crop.image ? (
                  <img
                    src={`http://localhost:5000${crop.image}`}
                    alt={crop.name}
                    className="w-full h-56 object-cover"
                  />
                ) : (
                  <div className="w-full h-56 bg-gray-800 flex items-center justify-center text-gray-500 text-sm">
                    No Image Available
                  </div>
                )}

                {/* 🌾 Crop Info */}
                <div className="p-5 space-y-2">
                  <h3 className="text-xl font-semibold text-green-400">
                    {crop.name}
                  </h3>
                  <p className="text-sm text-gray-300">
                    <span className="font-medium text-gray-400">Type:</span>{" "}
                    {crop.type}
                  </p>

                  {crop.description && (
                    <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                      {crop.description}
                    </p>
                  )}

                  {crop.sowingSeason && (
                    <p className="text-sm text-gray-400 mt-1">
                      🌱 <span className="font-medium text-gray-300">Sowing Season:</span>{" "}
                      {crop.sowingSeason}
                    </p>
                  )}

                  {crop.harvestingSeason && (
                    <p className="text-sm text-gray-400">
                      🌾 <span className="font-medium text-gray-300">Harvesting Season:</span>{" "}
                      {crop.harvestingSeason}
                    </p>
                  )}

                  {crop.tips && (
                    <p className="text-sm text-gray-400 italic mt-1">
                      💡 <span className="font-medium text-gray-300">Tips:</span>{" "}
                      {crop.tips}
                    </p>
                  )}

                  {crop.uploadedBy && (
                    <p className="text-xs text-gray-500 mt-3 italic">
                      👨‍🌾 Uploaded by:{" "}
                      <span className="text-gray-300">
                        {crop.uploadedBy.name || "Farmer"}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
