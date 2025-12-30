const taskModel = require("../models/task.model");

const getAll = async (req, res) => {
  const tasks = await taskModel.findAll();
  res.success(tasks);
};

const getOne = async (req, res) => {
  const task = await taskModel.findOne(+req.params.id);
  res.success(task);
};

const create = async (req, res) => {
  const newTask = await taskModel.create({
    title: req.body.title.trim(),
  });
  res.success(newTask, 201);
};

const update = async (req, res) => {
  const { title, completed } = req.body;
  const task = await taskModel.update(+req.params.id, { title, completed });
  res.success(task);
};

const destroy = async (req, res) => {
  const task = await taskModel.destroy(+req.params.id);
  res.success(task);
};

module.exports = { getAll, getOne, create, update, destroy };
