const Task = require("../models/Task");

// CREATE TASK
const createTask = async (req, res) => {
  try {
    // Destructure data from request body
    const { title, description, status, priority, dueDate } = req.body;

    // Create new task
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      user: req.user.id
    });

    // Send response
    res.status(201).json(task);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

// GET ALL TASKS OF LOGGED-IN USER
const getTasks = async (req, res) => {
  try {
    // Find tasks belonging only to logged-in user
    const tasks = await Task.find({
      user: req.user.id
    }).sort({
      createdAt: -1
    });

    // Send response
    res.status(200).json(tasks);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

module.exports = {
  createTask,
  getTasks
};