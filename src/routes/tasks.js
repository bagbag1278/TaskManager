const express = require("express");
const router = express.Router();
const { getAllTasks, getTaskById, createTask, deleteTask, updateTask, patchTask, toggleTask } = require('../controllers/taskController');
const {createTaskValidator , updateTaskValidator , patchTaskValidator , idValidator , getAllTasksValidator} = require('../validators/taskValidator');

router.get("/", getAllTasksValidator, getAllTasks);

router.get("/:id",  getTaskById);

router.post("/", createTaskValidator, createTask);

router.delete("/:id",  deleteTask);

router.put("/:id",  updateTask);

router.patch("/:id",  patchTask);

router.patch("/:id/toggle",  toggleTask);

module.exports = router;