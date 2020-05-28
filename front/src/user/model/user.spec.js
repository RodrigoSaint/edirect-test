import User from "./user";

import { hasError, runValidationTest } from "../../shared/test-helper.spec";

describe("User", () => {
  describe("Validation", () => {
    const validUser = {
      name: "John Doe",
      email: "john.doe@nobody.com",
      password: "a strong password",
    };

    runValidationTest(User, validUser, () => {
      it("validates required fields", () => {
        const validationResult = User.validateSync({});
        expect(hasError(validationResult, "name", "required")).toBe(true);
        expect(hasError(validationResult, "email", "required")).toBe(true);
        expect(hasError(validationResult, "password", "required")).toBe(true);
      });
      it("validates email", () => {
        const validationResult = User.validateSync({
          ...validUser,
          email: "invalid-email",
        });
        expect(hasError(validationResult, "email", "email")).toBe(true);
      });
      it("validates password", () => {
        const validationResult = User.validateSync({
          ...validUser,
          password: "1", // short password
        });
        expect(hasError(validationResult, "password", "min")).toBe(true);
      });
    });
  });
});
