import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import toast, { Toaster } from "react-hot-toast";

export default function EditCrop() {
  const { id } = useParams();
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
  const [preview, setPreview] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCrop = async () => {
      try {
        const res = await axios.get("/crops/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const crop = res.data.find((c) => c._id === id);
        if (!crop) {
          toast.error("You are not authorized to edit this crop");
          navigate("/my-crops");
          return;
        }
        setForm({
          name: crop.name,
          description: crop.description || "",
          type: crop.type || "",
          sowingSeason: crop.sowingSeason || "",
          harvestingSeason: crop.harvestingSeason || "",
          tips: crop.tips || "",
        });
        setPreview(`http://localhost:5000${crop.image}`);
      } catch {
        toast.error("Failed to fetch crop data");
      }
    };
    fetchCrop();
  }, [id, navigate, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, val]) => data.append(key, val));
    if (image) data.append("image", image);

    try {
      await axios.put(`/crops/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Crop updated!");
      setTimeout(() => navigate("/my-crops"), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <section className="min-h-screen bg-[#111827] text-white pt-24 px-6">
      <Toaster />
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-green-400 mb-6 text-center">
          ✏️ Edit Crop
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 border border-gray-700 rounded-xl p-6 flex flex-col gap-4"
        >
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-full h-48 object-cover rounded-xl mb-2"
            />
          )}
          <input
            type="text"
            placeholder="Crop Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
            required
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white h-28"
          />
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
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
            onChange={(e) => setForm({ ...form, sowingSeason: e.target.value })}
            className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
          />
          <input
            type="text"
            placeholder="Harvesting Season"
            value={form.harvestingSeason}
            onChange={(e) =>
              setForm({ ...form, harvestingSeason: e.target.value })
            }
            className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="p-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            accept="image/*"
          />
          <button className="bg-green-500 text-black font-semibold py-3 rounded-lg hover:bg-green-400 transition-all">
            Update Crop
          </button>
        </form>
      </div>
    </section>
  );
}
