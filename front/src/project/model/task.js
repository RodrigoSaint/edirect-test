import * as Yup from "yup";

export const TaskSchema = Yup.object({
  name: Yup.string().required(),
  completed: Yup.bool().default(false),
});

export default class Task {
  static isValidSync(task) {
    return TaskSchema.isValidSync(task);
  }

  static validateSync(task, abortEarly) {
    try {
      TaskSchema.validateSync(task, { abortEarly });
      return null;
    } catch (error) {
      return error;
    }
  }
}
