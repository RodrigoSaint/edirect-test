const express = require("express");

const Project = require("./model");
const safe = require("../safe");

const router = express.Router();

router.post(
  "/",
  safe(async (req, res) => {
    const projectToCreate = { ...req.body, userId: req.userId };
    const project = await Project.create(projectToCreate);
    res.status(201).send(project);
  })
);

router.get(
  "/",
  safe(async (req, res) => {
    const projectCollection = await Project.find({
      userId: req.userId,
    });
    res.status(200).send(projectCollection);
  })
);

router.use(
  "/:id",
  safe(async (req, res, next) => {
    const project = await Project.findById(req.params.id);
    if (project.userId !== req.userId) {
      res.status(403).send();
      return;
    }
    req.project = project;
    next();
  })
);

router.put(
  "/:id",
  safe(async (req, res) => {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).send(updatedProject);
  })
);

router.delete(
  "/:id",
  safe(async (req, res) => {
    await Project.deleteOne({ _id: req.params.id });
    res.status(200).send({ _id: req.params.id });
  })
);

router.post(
  "/:id/task",
  safe(async (req, res) => {
    const task = await Project.addTask(req.params.id, req.body);
    res.status(200).send(task);
  })
);

router.put(
  "/:projectId/task/:taskId",
  safe(async (req, res) => {
    const { projectId, taskId } = req.params;
    await Project.updateTask(projectId, taskId, req.body);
    res.status(200).send({ _id: taskId });
  })
);

router.delete(
  "/:projectId/task/:taskId",
  safe(async (req, res) => {
    const { projectId, taskId } = req.params;
    await Project.deleteTask(projectId, taskId);
    res.status(200).send({ _id: taskId });
  })
);

module.exports = router;
