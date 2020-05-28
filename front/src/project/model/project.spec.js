import Project from "./project";

import {
  expectErrorsToExist,
  runValidationTest,
} from "../../shared/test-helper.spec";

describe("Project", () => {
  describe("Validation", () => {
    const validProject = {
      name: "Expand company abroad",
      userId: "123456789",
    };

    runValidationTest(Project, validProject, () => {
      it("validates required fields", () => {
        expectErrorsToExist(
          [{ path: "name", type: "required" }],
          Project.validateSync({})
        );
      });
    });
  });
});
