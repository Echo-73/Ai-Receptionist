const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// User Registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Generate JWT Token
    const token = generateToken(user._id);
    
    res.status(201).json({ message: "User registered successfully", token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// User Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Generate JWT Token
    const token = generateToken(user._id);

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get User Profile (Protected Route)
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password"); // Exclude password
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };