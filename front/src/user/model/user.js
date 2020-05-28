import * as Yup from "yup";

export const UserSchema = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().required().email(),
  password: Yup.string().required().min(5),
});

export default class User {
  static isValidSync(user) {
    return UserSchema.isValidSync(user);
  }

  static validateSync(user, abortEarly) {
    try {
      UserSchema.validateSync(user, { abortEarly });
      return null;
    } catch (error) {
      return error;
    }
  }
}
