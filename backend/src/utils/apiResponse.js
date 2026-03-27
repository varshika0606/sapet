const ok = (res, data, message = "success") => res.json({ message, data });

module.exports = { ok };
