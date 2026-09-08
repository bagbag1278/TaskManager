const express = require("express");
const router = express.Router();
const { getAllTasks, getTaskById, createTask, deleteTask, updateTask, patchTask, toggleTask } = require('../controllers/taskController');
const {createTaskValidator , updateTaskValidator , patchTaskValidator , idValidator , getAllTasksValidator} = require('../validators/taskValidator');

router.get("/", getAllTasksValidator, getAllTasks);

router.get("/:id", idValidator, getTaskById);

router.post("/", createTaskValidator, createTask);

router.delete("/:id", idValidator, deleteTask);

router.put("/:id", updateTaskValidator, updateTask);

router.patch("/:id", patchTaskValidator, patchTask);

router.patch("/:id/toggle", idValidator, toggleTask);

module.exports = router;