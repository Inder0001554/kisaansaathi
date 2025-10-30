import Crop from "../models/Crop.js";

// 📤 Create Crop
export const createCrop = async (req, res) => {
  try {
    const { name, description, type, sowingSeason, harvestingSeason, tips } = req.body;

    console.log("📦 Uploaded file:", req.file);
    console.log("👤 Authenticated user:", req.user);

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized. Please log in again." });
    }

    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const crop = await Crop.create({
      name,
      description,
      type,
      sowingSeason,
      harvestingSeason,
      tips,
      image,
      uploadedBy: req.user._id,
    });

    res.status(201).json({ message: "Crop uploaded successfully", crop });
  } catch (error) {
    console.error("❌ Error creating crop:", error);
    res.status(500).json({ message: "Failed to upload crop", error: error.message });
  }
};

// 🌍 List All Crops (Public)
export const listAllCrops = async (req, res) => {
  try {
    const crops = await Crop.find().populate("uploadedBy", "name");
    res.json(crops);
  } catch (err) {
    console.error("❌ Error fetching crops:", err);
    res.status(500).json({ message: "Failed to fetch crops" });
  }
};

// 👤 List User's Crops
export const myCrops = async (req, res) => {
  try {
    const crops = await Crop.find({ uploadedBy: req.user._id });
    res.json(crops);
  } catch (err) {
    console.error("❌ Error fetching user crops:", err);
    res.status(500).json({ message: "Failed to fetch user crops" });
  }
};

// ✏️ Update Crop (Only owner can edit)
export const updateCrop = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (!crop) return res.status(404).json({ message: "Crop not found" });

    if (crop.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to edit this crop" });
    }

    const { name, description, type, sowingSeason, harvestingSeason, tips } = req.body;

    if (req.file) crop.image = `/uploads/${req.file.filename}`;
    if (name) crop.name = name;
    if (description) crop.description = description;
    if (type) crop.type = type;
    if (sowingSeason) crop.sowingSeason = sowingSeason;
    if (harvestingSeason) crop.harvestingSeason = harvestingSeason;
    if (tips) crop.tips = tips;

    await crop.save();

    res.json({ message: "Crop updated successfully", crop });
  } catch (err) {
    console.error("❌ Error updating crop:", err);
    res.status(500).json({ message: "Failed to update crop" });
  }
};

// 🗑️ Delete Crop (Only owner can delete)
export const deleteCrop = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (!crop) return res.status(404).json({ message: "Crop not found" });

    if (crop.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this crop" });
    }

    await crop.deleteOne();
    res.json({ message: "Crop deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting crop:", err);
    res.status(500).json({ message: "Failed to delete crop" });
  }
};
