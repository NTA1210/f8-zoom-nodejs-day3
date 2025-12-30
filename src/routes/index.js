const express = require("express");

const router = express.Router();

const tasksRoute = require("./tasks.route");
const createRateLimiter = require("../middlewares/rateLimiter");

// ...

const rateLimiter = createRateLimiter({
  maxRequests: 2,
});

router.use("/tasks", tasksRoute);
router.use("/test-success", rateLimiter, (req, res) => {
  res.success({ message: "Hello World" });
});

router.use("/test-error", (req, res) => {
  throw new Error("Test exception");
});

module.exports = router;
