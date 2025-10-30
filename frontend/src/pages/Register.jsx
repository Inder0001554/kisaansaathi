import { useState } from "react";
import axios from "../api/axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
     await axios.post("/auth/register", form, {
  headers: { "Content-Type": "application/json" },
});

      toast.success("Registration successful!");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#111827] text-white flex justify-center items-center px-4">
      <Toaster />
      <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-xl w-full max-w-md p-6 sm:p-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-green-400">
          🌱 Register for Kisaan Sathi
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Name Input */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 bg-gray-800 rounded-lg text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
              required
            />
          </div>

          {/* Phone Input */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Phone Number</label>
            <input
              type="text"
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full p-3 bg-gray-800 rounded-lg text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full p-3 bg-gray-800 rounded-lg text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`bg-green-500 text-black font-semibold py-3 rounded-lg hover:bg-green-400 transition-all ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-400 hover:text-green-300 underline"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
