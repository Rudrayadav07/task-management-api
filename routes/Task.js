const express = require("express");

const router = express.Router();

// Middleware
const protect = require("../middleware/auth");

// Controllers
const {
  createTask,
  getTasks
} = require("../controllers/taskController");

// Protect all task routes
router.use(protect);

// Routes
router.post("/", createTask);

router.get("/", getTasks);

module.exports = router;