import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import toast, { Toaster } from "react-hot-toast";

export default function MyCrops() {
  const [crops, setCrops] = useState([]);

  const fetchCrops = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("/crops/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCrops(res.data);
    } catch (err) {
      toast.error("Failed to fetch your crops");
    }
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Are you sure you want to delete this crop?")) return;

    try {
      await axios.delete(`/crops/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Crop deleted successfully!");
      setCrops((prev) => prev.filter((crop) => crop._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete crop");
    }
  };

  return (
    <section className="min-h-screen bg-[#111827] text-white pt-24 px-6">
      <Toaster />
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-green-400 mb-6 text-center">
          🌱 My Crops
        </h2>

        {crops.length === 0 ? (
          <p className="text-center text-gray-400">You haven’t added any crops yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {crops.map((crop) => (
              <div
                key={crop._id}
                className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition-all"
              >
                {crop.image && (
                  <img
                    src={`http://localhost:5000${crop.image}`}
                    alt={crop.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-green-400">
                    {crop.name}
                  </h3>
                  <p className="text-sm text-gray-300 mt-1">{crop.type}</p>
                  <p className="text-sm text-gray-400 mt-2 line-clamp-3">
                    {crop.description}
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    <Link
                      to={`/edit-crop/${crop._id}`}
                      className="bg-blue-500 px-3 py-1 rounded text-white text-sm hover:bg-blue-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(crop._id)}
                      className="bg-red-500 px-3 py-1 rounded text-white text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
