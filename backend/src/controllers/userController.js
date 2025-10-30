import User from "../models/user.js";

// ✅ Get logged-in user's profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error("❌ Profile fetch error:", error);
    res.status(500).json({ message: "Server error while fetching user" });
  }
};

// ✅ Get all users (optional, for admin use later)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// ✅ Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("❌ Error fetching user by ID:", err);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

// ✅ Update logged-in user's details
export const updateUser = async (req, res) => {
  try {
    const { name, region } = req.body;

    // find user
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // update allowed fields
    if (name) user.name = name;
    if (region) user.region = region;

    await user.save();

    res.json({
      message: "User updated successfully",
      user: { id: user._id, name: user.name, phone: user.phone, region: user.region },
    });
  } catch (err) {
    console.error("❌ Error updating user:", err);
    res.status(500).json({ message: "Failed to update user" });
  }
};

// ✅ Delete user (if needed later)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting user:", err);
    res.status(500).json({ message: "Failed to delete user" });
  }
};
