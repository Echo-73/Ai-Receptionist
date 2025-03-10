const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET; // Change this to a strong secret key

// **Signup Route**
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user in DB
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Generate Token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ message: "Signup successful", token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// **Login Route**
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Generate Token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
router.post("/register", registerUser);
router.get("/profile", authMiddleware, getUserProfile);
module.exports = router;
