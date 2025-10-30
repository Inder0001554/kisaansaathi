// src/pages/AddCrop.jsx
import { useState } from "react";
import axios from "../api/axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddCrop() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    type: "",
    sowingSeason: "",
    harvestingSeason: "",
    tips: "",
  });
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const data = new FormData();
    Object.entries(form).forEach(([key, val]) => data.append(key, val));
    if (image) data.append("image", image);

    try {
      await axios.post("/crops", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Crop uploaded successfully!");
      setTimeout(() => navigate("/showcrops"), 1200);
      setForm({
        name: "",
        description: "",
        type: "",
        sowingSeason: "",
        harvestingSeason: "",
        tips: "",
      });
      setImage(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <section className="min-h-screen bg-[#111827] text-white flex justify-center items-start pt-24 px-6">
      <Toaster />
      <div className="bg-gray-900 p-8 rounded-2xl border border-gray-700 w-full max-w-3xl shadow-xl">
        <h2 className="text-3xl font-bold text-green-400 mb-6 text-center">
          🌾 Upload Your Crop
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 text-white"
        >
          <input
            type="text"
            placeholder="Crop Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white h-28 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
          ></textarea>

          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          >
            <option value="">Select Crop Type</option>
            <option value="Grain">Grain</option>
            <option value="Fruit">Fruit</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="text"
            placeholder="Sowing Season"
            value={form.sowingSeason}
            onChange={(e) =>
              setForm({ ...form, sowingSeason: e.target.value })
            }
            className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="text"
            placeholder="Harvesting Season"
            value={form.harvestingSeason}
            onChange={(e) =>
              setForm({ ...form, harvestingSeason: e.target.value })
            }
            className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="p-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            accept="image/*"
          />

          <button className="bg-green-500 text-black font-semibold py-3 rounded-lg hover:bg-green-400 transition-all">
            Upload Crop
          </button>
        </form>
      </div>
    </section>
  );
}
