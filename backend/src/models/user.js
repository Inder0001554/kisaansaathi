import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    region: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);


