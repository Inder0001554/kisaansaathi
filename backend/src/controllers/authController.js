import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

// 📝 Register User
export const registerUser = async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check for existing user
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "Phone number already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      phone,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "Registration successful",
      user: { id: user._id, name: user.name, phone: user.phone },
      token,
    });
  } catch (error) {
    console.error("❌ Register error:", error);
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

// 🔑 Login User
export const loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });

    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, phone: user.phone },
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};
