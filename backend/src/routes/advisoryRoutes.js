import express from "express";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";
import { getAdvisories, createAdvisory, deleteAdvisory } from "../controllers/advisoryController.js";

const router = express.Router();

// 👨‍🌾 Users can view advisories for their region
router.get("/", protect, getAdvisories);

// 👨‍💼 Admin can create and delete advisories
router.post("/", protect, isAdmin, createAdvisory);
router.delete("/:id", protect, isAdmin, deleteAdvisory);

export default router;


