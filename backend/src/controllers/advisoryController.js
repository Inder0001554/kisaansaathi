// src/controllers/advisoryController.js
import Advisory from "../models/advisory.js";

// ✅ GET advisories (region-based for users)
export const getAdvisories = async (req, res, next) => {
  try {
    let advisories;

    // if user is admin, show all
    if (req.user.role === "admin") {
      advisories = await Advisory.find().sort({ createdAt: -1 });
    } else {
      // show advisories for their region
      advisories = await Advisory.find({ region: req.user.region }).sort({ createdAt: -1 });
    }

    res.status(200).json(advisories);
  } catch (err) {
    console.error("❌ Error fetching advisories:", err);
    next(err);
  }
};

// ✅ POST advisory (admin only)
export const createAdvisory = async (req, res, next) => {
  try {
    const { title, content, region } = req.body;

    if (!title || !content || !region)
      return res.status(400).json({ message: "All fields are required" });

    const advisory = await Advisory.create({
      title,
      content,
      region,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Advisory created successfully",
      advisory,
    });
  } catch (err) {
    console.error("❌ Error creating advisory:", err);
    next(err);
  }
};

// ✅ DELETE advisory (admin only)
export const deleteAdvisory = async (req, res, next) => {
  try {
    const advisory = await Advisory.findById(req.params.id);
    if (!advisory)
      return res.status(404).json({ message: "Advisory not found" });

    await advisory.deleteOne();
    res.json({ message: "Advisory deleted successfully" });
  } catch (err) {
    next(err);
  }
};
