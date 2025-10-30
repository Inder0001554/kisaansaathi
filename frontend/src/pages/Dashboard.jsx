import { useEffect, useState } from "react";
import axios from "../api/axios";
import toast, { Toaster } from "react-hot-toast";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must log in first");
      window.location.href = "/login";
      return;
    }

    axios
      .get("/users/profile", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setUser(res.data))
      .catch(() => toast.error("Failed to fetch user"))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    setTimeout(() => (window.location.href = "/login"), 1000);
  };

  return (
    <section className="pt-24 pb-16 min-h-screen bg-[#111827] text-white flex justify-center items-center">
      <Toaster />
      <div className="w-full max-w-lg bg-gray-900 border border-gray-700 rounded-2xl shadow-xl p-8 text-center">
        <h2 className="text-3xl font-bold text-green-400 mb-6">👨‍🌾 Dashboard</h2>

        {loading ? (
          <p className="text-gray-400 animate-pulse">Loading user data...</p>
        ) : user ? (
          <div className="space-y-4 text-left">
            <p>
              <span className="font-semibold text-gray-300">Name:</span>{" "}
              {user.name}
            </p>
            <p>
              <span className="font-semibold text-gray-300">Phone:</span>{" "}
              {user.phone}
            </p>
            <p>
              <span className="font-semibold text-gray-300">Region:</span>{" "}
              {user.region || "Not set"}
            </p>

            <button
              onClick={handleLogout}
              className="mt-6 w-full bg-red-500 py-2 rounded-lg hover:bg-red-600 transition font-semibold"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-gray-400">User data not found.</p>
        )}
      </div>
    </section>
  );
}
