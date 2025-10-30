import { useState } from "react";
import axios from "../api/axios";
import toast, { Toaster } from "react-hot-toast";

export default function Feedback() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/feedback", form);
      toast.success("Thank you for your feedback!");
      setForm({ name: "", phone: "", message: "" });
    } catch (err) {
      toast.error("Error submitting feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-24 pb-16 min-h-screen bg-[#111827] text-white flex justify-center items-start sm:items-center">
      <Toaster />
      <div className="w-full max-w-lg bg-gray-900 border border-gray-700 rounded-2xl shadow-xl p-6 sm:p-10 mx-4 sm:mx-0">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-primary">
          💬 Send Feedback
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Name Input */}
          <div>
            <label className="block text-gray-300 mb-2 text-sm font-medium">
              Your Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
              required
            />
          </div>

          {/* Phone Input */}
          <div>
            <label className="block text-gray-300 mb-2 text-sm font-medium">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
              required
            />
          </div>

          {/* Message Input */}
          <div>
            <label className="block text-gray-300 mb-2 text-sm font-medium">
              Message
            </label>
            <textarea
              placeholder="Write your message here..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 text-white placeholder-gray-400 h-32 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`mt-2 bg-green-500 py-3 rounded-lg text-black font-semibold hover:bg-green-400 transition-all ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>
    </section>
  );
}
