import Task from "./task";

import {
  expectErrorsToExist,
  runValidationTest,
} from "../../shared/test-helper.spec";

describe("Task", () => {
  describe("Validation", () => {
    const validTask = {
      name: "Schedule meetings",
      completed: false,
      taskId: "123456789",
    };

    runValidationTest(Task, validTask, () => {
      it("validates required fields", () => {
        expectErrorsToExist(
          [{ path: "name", type: "required" }],
          Task.validateSync({})
        );
      });
    });
  });
});
