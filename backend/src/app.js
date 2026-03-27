const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");

const { errorHandler, notFound } = require("./middleware/errorHandler");

const authRoutes = require("./routes/authRoutes");
const policyRoutes = require("./routes/policyRoutes");
const violationRoutes = require("./routes/violationRoutes");
const responseRoutes = require("./routes/responseRoutes");
const decisionRoutes = require("./routes/decisionRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors());

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});
app.use(limiter);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.json({
    name: "Secure Academic Policy Enforcement Tool API",
    status: "ok",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/policies", policyRoutes);
app.use("/api/violations", violationRoutes);
app.use("/api/responses", responseRoutes);
app.use("/api/decisions", decisionRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
