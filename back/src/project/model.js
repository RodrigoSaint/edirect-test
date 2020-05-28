const { model, Schema, Types } = require("mongoose");

const TaskSchema = new Schema({
  name: { type: String, required: true },
  done: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
  finishedAt: { type: Date },
});

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  taskCollection: [TaskSchema],
});

ProjectSchema.static("addTask", async function (projectId, task) {
  const _id = Types.ObjectId();
  const taskToAdd = { _id, ...task };
  await this.updateOne(
    { _id: projectId },
    { $push: { taskCollection: taskToAdd } }
  );
  return taskToAdd;
});

ProjectSchema.static("updateTask", async function (projectId, taskId, change) {
  await this.findOneAndUpdate(
    { _id: projectId, "taskCollection._id": taskId },
    {
      $set: {
        "taskCollection.$.name": change.name,
        "taskCollection.$.done": change.done,
        "taskCollection.$.finishedAt": change.done ? new Date() : null,
      },
    }
  );
});

ProjectSchema.static("deleteTask", async function (projectId, taskId) {
  await this.updateOne(
    { _id: projectId },
    { $pull: { taskCollection: { _id: taskId } } }
  );
});

module.exports = model("projects", ProjectSchema);
