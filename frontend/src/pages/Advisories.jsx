import { useEffect, useState, useRef } from "react";
import axios from "../api/axios";
import toast, { Toaster } from "react-hot-toast";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function UpdateMapCenter({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.setView(position, map.getZoom());
  }, [position, map]);
  return null;
}

export default function Advisories() {
  const [advisories, setAdvisories] = useState([]);
  const [location, setLocation] = useState({ lat: 20.5937, lon: 78.9629 });
  const [region, setRegion] = useState("Detecting...");
  const [weather, setWeather] = useState(null);
  const [insight, setInsight] = useState("");
  const watchIdRef = useRef(null);
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const markerIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [30, 30],
  });

  // Fetch advisories
  const fetchAdvisories = async (regionName) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`/advisories?region=${regionName}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdvisories(res.data);
    } catch {
      toast.error("Failed to fetch advisories for your region");
    }
  };

  // Fetch weather safely
  const fetchWeather = async (lat, lon) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
      const res = await fetch(proxyUrl);

      if (!res.ok) throw new Error("Weather API error");

      const parsed = await res.json();
      const data = JSON.parse(parsed.contents);

      setWeather(data);
      generateInsight(data);
    } catch (err) {
      console.error("❌ Weather fetch failed:", err);
      toast.error("Unable to fetch weather data. Check your API key or GPS.");
    }
  };

  // Generate advice
  const generateInsight = (data) => {
    const main = data.weather?.[0]?.main?.toLowerCase() || "";
    const temp = data.main?.temp ?? 0;
    let msg = "";

    if (main.includes("rain")) msg = "🌧️ Rain expected! Avoid pesticide spraying today.";
    else if (main.includes("clear")) msg = "☀️ Perfect day for irrigation or fertilizer application.";
    else if (main.includes("cloud")) msg = "☁️ Cloudy day — good for sowing or weeding.";
    else if (temp > 35) msg = "🔥 High temperature! Water crops early morning or evening.";
    else if (temp < 15) msg = "❄️ Cold weather! Protect delicate crops from frost.";
    else msg = "🌾 Stable weather — continue regular crop care.";

    setInsight(msg);
  };

  // Watch user location
  useEffect(() => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported on this device");
      return;
    }

    const updatePosition = async (pos) => {
      const { latitude, longitude } = pos.coords;
      setLocation({ lat: latitude, lon: longitude });
      fetchWeather(latitude, longitude);

      try {
        const locRes = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const userRegion =
          locRes.data?.address?.state ||
          locRes.data?.address?.county ||
          "Unknown";
        if (userRegion !== region) {
          setRegion(userRegion);
          fetchAdvisories(userRegion);
        }
      } catch {
        toast.error("Failed to detect your region");
      }
    };

    const handleError = (err) => {
      console.error(err);
      toast.error("Unable to access location. Please enable GPS.");
    };

    watchIdRef.current = navigator.geolocation.watchPosition(
      updatePosition,
      handleError,
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );

    return () => {
      if (watchIdRef.current)
        navigator.geolocation.clearWatch(watchIdRef.current);
    };
  }, [region]);

  return (
    <section className="min-h-screen bg-[#111827] text-white pt-24 px-6">
      <Toaster />
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-green-400 mb-2 text-center">
          🌾 Real-Time Crop & Weather Advisory
        </h2>
        <p className="text-center text-gray-400 mb-6">
          📍 Region:{" "}
          <span className="text-green-300 font-semibold">{region}</span>
        </p>

        {/* Map Section */}
        <div className="w-full h-[400px] mb-10 rounded-2xl overflow-hidden border border-gray-700 shadow-xl">
          <MapContainer
            center={[location.lat, location.lon]}
            zoom={10}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <Marker position={[location.lat, location.lon]} icon={markerIcon}>
              <Popup>
                📍 You are here <br /> Region: {region}
              </Popup>
            </Marker>
            <UpdateMapCenter position={[location.lat, location.lon]} />
          </MapContainer>
        </div>

        {/* Weather Section */}
        {weather ? (
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-700 mb-10 shadow-lg text-center">
            <h3 className="text-2xl font-semibold text-green-400 mb-2">
              Weather in {weather.name || region}
            </h3>

            <p className="text-lg">
              🌡️ {weather.main?.temp?.toFixed(1) ?? "--"}°C |{" "}
              {weather.weather?.[0]?.description || "No description"}
            </p>

            <p className="text-sm text-gray-400 mt-2">
              💧 Humidity: {weather.main?.humidity ?? "--"}% | 💨 Wind:{" "}
              {weather.wind?.speed?.toFixed(1) ?? "--"} m/s
            </p>

            <p className="text-sm text-gray-400 mt-2">
              🔽 Pressure: {weather.main?.pressure ?? "--"} hPa | 🥵 Feels like:{" "}
              {weather.main?.feels_like?.toFixed(1) ?? "--"}°C
            </p>

            <div className="bg-green-900 bg-opacity-30 p-4 rounded-xl mt-6 border border-green-700">
              <h4 className="text-xl font-bold text-green-400 mb-2">
                🧠 Predictive Insight
              </h4>
              <p>{insight}</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-400 mb-6">
            🌤️ Weather data not available. Please allow GPS access.
          </p>
        )}

        {/* Advisories Section */}
        {advisories.length === 0 ? (
          <p className="text-center text-gray-500">
            No advisories available for your area yet.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {advisories.map((adv) => (
              <div
                key={adv._id}
                className="bg-gray-900 p-5 rounded-2xl border border-gray-700 shadow-lg hover:scale-[1.02] transition-all"
              >
                <h3 className="text-xl font-semibold text-green-400">
                  {adv.title}
                </h3>
                <p className="text-sm text-gray-300 mt-2">{adv.content}</p>
                <p className="text-xs text-gray-500 mt-3">📍 {adv.region}</p>
                {adv.cropType && (
                  <p className="text-xs text-gray-400 mt-1">
                    🌱 {adv.cropType}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
