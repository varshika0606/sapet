const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { audit } = require("../utils/audit");

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

const register = async (req, res) => {
  const { name, email, password, role, department, studentId } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "Email already in use" });
  const user = await User.create({ name, email, password, role, department, studentId });
  await audit({
    actor: user._id,
    action: "register",
    entity: "User",
    entityId: user._id,
    ip: req.ip,
  });
  const token = signToken(user);
  res.status(201).json({ token, user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  const match = await user.comparePassword(password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });
  const token = signToken(user);
  await audit({
    actor: user._id,
    action: "login",
    entity: "User",
    entityId: user._id,
    ip: req.ip,
  });
  res.json({ token, user });
};

const me = async (req, res) => {
  res.json({ user: req.user });
};

module.exports = { register, login, me };
