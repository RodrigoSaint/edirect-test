import * as Yup from "yup";

export const ProjectSchema = Yup.object({
  name: Yup.string().required(),
});

export default class Project {
  static isValidSync(project) {
    return ProjectSchema.isValidSync(project);
  }

  static validateSync(project, abortEarly) {
    try {
      ProjectSchema.validateSync(project, { abortEarly });
      return null;
    } catch (error) {
      return error;
    }
  }
}
