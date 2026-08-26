const express = require("express");
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get("/", taskController.getAllTasks);
router.get("/:id", taskController.getTaskById);
router.post("/", taskController.createTask);     
router.delete("/:id", taskController.deleteTask);
router.put("/:id", taskController.updateTask);
router.patch("/:id", taskController.patchTask);   
router.patch("/:id/toggle", taskController.toggleTask);

module.exports = router;

