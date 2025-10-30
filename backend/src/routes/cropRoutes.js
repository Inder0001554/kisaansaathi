import express from "express";
import upload from "../middlewares/upload.js";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createCrop,
  listAllCrops,
  myCrops,
  updateCrop,
  deleteCrop,
} from "../controllers/cropController.js";

const router = express.Router();

// Public — anyone can see crops
router.get("/", listAllCrops);

// Private — user-specific crops
router.get("/my", protect, myCrops);

// Create crop
router.post("/", protect, upload.single("image"), createCrop);

// Update crop (only owner)
router.put("/:id", protect, upload.single("image"), updateCrop);

// Delete crop (only owner)
router.delete("/:id", protect, deleteCrop);

export default router;
