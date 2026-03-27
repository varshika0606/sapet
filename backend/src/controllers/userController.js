const User = require("../models/User");
const { getPagination } = require("../utils/pagination");

const getUsers = async (req, res) => {
  const { page, limit, skip } = getPagination(req);
  const filter = {};
  if (req.query.role) filter.role = req.query.role;
  const [items, total] = await Promise.all([
    User.find(filter).select("name email role studentId department").skip(skip).limit(limit),
    User.countDocuments(filter),
  ]);
  res.json({ items, total, page, limit });
};

module.exports = { getUsers };
