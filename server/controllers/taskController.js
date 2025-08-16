const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, pin, status } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      pin,
      status,
      userId: req.userId,
    });

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId })
      .sort({ pin: -1, createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { status, title, description, dueDate, priority, pin } = req.body;

    const task = await Task.findOne({ _id: req.params.id, userId: req.userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (pin === true && task.pin === false) {
      const pinnedCount = await Task.countDocuments({ userId: req.userId, pin: true });
      if (pinnedCount >= 3) {
        return res.status(400).json({ message: "You can only pin up to 3 tasks." });
      }
    }

    if (status !== undefined) task.status = status;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (dueDate !== undefined) task.dueDate = dueDate;
    if (priority !== undefined) task.priority = priority;

    if (status === "Completed") {
      task.pin = false;
    } else if (pin !== undefined) {
      task.pin = pin;
    }

    await task.save();

    res.json({ message: "Task updated successfully", task });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Server error" });
  }
};
