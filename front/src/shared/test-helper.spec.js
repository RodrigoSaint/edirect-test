export const hasError = (result, path, type) =>
  !!result.inner.find(
    ({ path: errorPath, type: errorType }) =>
      path === errorPath && errorType === type
  );

export const expectErrorsToExist = (expectedErrors, validationError) =>
  expectedErrors.forEach((error) =>
    expect(hasError(validationError, error.path, error.type)).toBe(true)
  );

export const runValidationTest = (
  modelClass,
  validObject,
  invalidValidationCallback = () => {},
  invalidObject = {}
) => {
  describe("when is a invalid model", () => {
    it("isValid returns false", () => {
      expect(modelClass.isValidSync(invalidObject)).toBe(false);
    });

    it("validate returns failed validation", () => {
      const validatioResult = modelClass.validateSync(invalidObject);
      expect(validatioResult).not.toBe(null);
    });

    invalidValidationCallback();
  });

  describe("when is a valid model", () => {
    it("isValid returns true", () => {
      expect(modelClass.isValidSync(validObject)).toBe(true);
    });
  });
};

describe("Model: Test Helper", () => {
  describe("hasError", () => {
    const validationResult = {
      inner: [
        { path: "name", type: "required" },
        { path: "email", type: "required" },
        { path: "email", type: "email" },
      ],
    };
    it("finds the error with same path and type provided", () => {
      expect(hasError(validationResult, "name", "required")).toBe(true);
    });
    it("do not find error with different path or type provided", () => {
      expect(hasError(validationResult, "name", "email")).toBe(false);
      expect(hasError(validationResult, "password", "required")).toBe(false);
    });
  });
});
