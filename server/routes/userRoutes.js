import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/Users.js";

const router = express.Router();

// Utility Function: Handle Server Errors
const handleServerError = (err, res, message) => {
  console.error(message, err.message);
  res.status(500).json({ error: "Server error occurred" });
};

// User Registration
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "User already exists." });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // Automatically log in user after registration
    req.session.userId = newUser._id;

    console.log("User registered:", email);
    res.status(201).json({
      message: "User registered successfully.",
      user: { id: newUser._id, email: newUser.email },
    });
  } catch (err) {
    handleServerError(err, res, "Registration error:");
  }
});

// User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    // Create session for user
    req.session.userId = user._id;

    console.log("User logged in:", email);
    res.status(200).json({
      message: "Login successful.",
      user: { id: user._id, email: user.email },
    });
  } catch (err) {
    handleServerError(err, res, "Login error:");
  }
});

// User Logout
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err.message);
      return res.status(500).json({ error: "Logout failed." });
    }

    res.clearCookie("connect.sid"); // Clear session cookie
    res.status(200).json({ message: "Logged out successfully." });
  });
});

// Check Authentication Status
router.get("/check-auth", (req, res) => {
  if (req.session.userId) {
    return res.status(200).json({ isAuthenticated: true });
  }
  res.status(200).json({ isAuthenticated: false });
});

export default router;
