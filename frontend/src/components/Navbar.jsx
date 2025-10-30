import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-black/70 backdrop-blur-md fixed w-full z-50 border-b border-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-400 tracking-wide">
          Kisaan Sathi
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center text-lg">
          <Link to="/showcrops" className="hover:text-green-400 transition-colors">
            Show Crops
          </Link>

          {isLoggedIn ? (
            <>
              <Link to="/crops" className="hover:text-green-400 transition-colors">
                Add Crops
              </Link>

              <Link to="/advisories" className="hover:text-green-400 transition-colors">
                Advisories
              </Link>

              <Link to="/my-crops" className="hover:text-green-400 transition-colors">
                My Crops
              </Link>

              <Link to="/feedback" className="hover:text-green-400 transition-colors">
                Feedback
              </Link>

              <Link
                to="/dashboard"
                className="hover:text-green-400 font-semibold transition"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-lg text-white font-semibold hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-green-400 px-5 py-2 rounded-lg text-black font-semibold hover:bg-green-300 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu with Slide Animation */}
      <div
        className={`md:hidden bg-black/90 border-t border-gray-800 overflow-hidden transition-all duration-500 ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center py-4 space-y-4">
          <Link
            to="/showcrops"
            onClick={() => setMenuOpen(false)}
            className="hover:text-green-400 text-lg"
          >
            Show Crops
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                to="/crops"
                onClick={() => setMenuOpen(false)}
                className="hover:text-green-400 text-lg"
              >
                Add Crops
              </Link>

              <Link
                to="/advisories"
                onClick={() => setMenuOpen(false)}
                className="hover:text-green-400 text-lg"
              >
                Advisories
              </Link>

              <Link
                to="/my-crops"
                onClick={() => setMenuOpen(false)}
                className="hover:text-green-400 text-lg"
              >
                My Crops
              </Link>

              <Link
                to="/feedback"
                onClick={() => setMenuOpen(false)}
                className="hover:text-green-400 text-lg"
              >
                Feedback
              </Link>

              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="hover:text-green-400 text-lg"
              >
                Dashboard
              </Link>

              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="bg-red-500 px-5 py-2 rounded-lg text-white font-semibold hover:bg-red-600 transition text-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="bg-green-400 px-6 py-2 rounded-lg text-black font-semibold hover:bg-green-300 transition text-lg"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
