// src/app.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cropRoutes from "./routes/cropRoutes.js";
import advisoryRoutes from "./routes/advisoryRoutes.js";
import path from "path";







dotenv.config();
const app = express();

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(helmet());
app.use(cors());
app.use(express.json()); // ✅ Required for req.body
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/advisories", advisoryRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Kisaan Sathi API running..." });
});

export default app;
