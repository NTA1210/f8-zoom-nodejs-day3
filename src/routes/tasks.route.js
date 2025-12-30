const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const taskCreateValidator = require("../middlewares/taskCreateValidator");

router.get("/", taskController.getAll);
router.get("/:id", taskController.getOne);
router.post("/", taskCreateValidator, taskController.create);
router.put("/:id", taskController.update);
router.delete("/:id", taskController.destroy);

module.exports = router;
