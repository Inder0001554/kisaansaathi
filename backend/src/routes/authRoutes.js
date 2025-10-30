import express from "express";
import { body } from "express-validator";
import { registerUser, loginUser  } from "../controllers/authController.js";
import validate from "../middlewares/validate.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("phone").notEmpty().withMessage("Phone is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  validate,
  registerUser
);

router.post(
  "/login",
  [
    body("phone").notEmpty().withMessage("Phone is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validate,
  loginUser
);

export default router;




