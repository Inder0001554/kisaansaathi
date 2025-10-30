import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Crops from "./pages/Crops";
import Advisories from "./pages/Advisories";
import Feedback from "./pages/Feedback";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ShowCrops from "./pages/Showcorps";
import MyCrops from "./pages/Mycrops";
import EditCrop from "./pages/Editcrop";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crops" element={<Crops />} />
        <Route path="/my-crops" element={<MyCrops />} />
        <Route path="/showcrops" element={<ShowCrops />} />
        <Route path="/advisories" element={<Advisories />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/edit-crop/:id" element={<EditCrop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
