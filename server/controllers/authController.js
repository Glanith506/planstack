const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("Register attempt:", { username, email, password });
    if (!username || !email || !password)
      return res.status(400).json({ message: "All fields are required." });

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(409).json({ message: "Email already in use." });

    const hash = await bcrypt.hash(password, 10);
    console.log("Generated hash for password:", password, "is:", hash);
    const user = await User.create({ username, email: email.toLowerCase(), password: hash });
    console.log("Saved user:", user);

    const token = signToken(user._id);
    const { password: _, ...userData } = user.toObject();
    res.status(201).json({ token, user: userData });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error." });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials." });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials." });

    const token = signToken(user._id);
    // res.json({ token, user: user.toJSON() });
    const { password: _, ...userData } = user.toObject();
    res.json({ token, user: userData });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found." });
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};
