const Policy = require("../models/Policy");
const { getPagination } = require("../utils/pagination");
const { audit } = require("../utils/audit");

const createPolicy = async (req, res) => {
  const policy = await Policy.create({ ...req.body, createdBy: req.user._id });
  await audit({
    actor: req.user._id,
    action: "create_policy",
    entity: "Policy",
    entityId: policy._id,
    ip: req.ip,
  });
  res.status(201).json(policy);
};

const getPolicies = async (req, res) => {
  const { page, limit, skip } = getPagination(req);
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  const [items, total] = await Promise.all([
    Policy.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Policy.countDocuments(filter),
  ]);
  res.json({ items, total, page, limit });
};

const updatePolicy = async (req, res) => {
  const policy = await Policy.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!policy) return res.status(404).json({ message: "Policy not found" });
  await audit({
    actor: req.user._id,
    action: "update_policy",
    entity: "Policy",
    entityId: policy._id,
    ip: req.ip,
  });
  res.json(policy);
};

const deletePolicy = async (req, res) => {
  const policy = await Policy.findByIdAndDelete(req.params.id);
  if (!policy) return res.status(404).json({ message: "Policy not found" });
  await audit({
    actor: req.user._id,
    action: "delete_policy",
    entity: "Policy",
    entityId: policy._id,
    ip: req.ip,
  });
  res.json({ message: "Policy deleted" });
};

module.exports = { createPolicy, getPolicies, updatePolicy, deletePolicy };
