import React from "react";
import { useFormikContext, Formik } from "formik";

import { TaskSchema } from "../../model/task";
import { createTask } from "../../projectService";
import GenericField from "../../../shared/component/generic-field";
import useRequestWithLoading from "../../../shared/hook/useRequestWithLoading";

import "./task-creation.less";

export default () => {
  const { setFieldValue, values } = useFormikContext();

  const handleCreateTask = (task, formik) =>
    createTask(values.project._id, task)
      .then((newTask) =>
        setFieldValue("project.taskCollection", [
          ...values.project.taskCollection,
          newTask,
        ])
      )
      .then(() => formik.resetForm({}));

  const { isLoading, request } = useRequestWithLoading(handleCreateTask);

  return (
    <Formik
      validationSchema={TaskSchema}
      onSubmit={request}
      initialValues={{ name: "" }}
    >
      {({ handleSubmit }) => (
        <div className="taskCreation">
          <div className="taskCreation-input">
            <GenericField name="name" />
          </div>
          <button disabled={isLoading} type="button" onClick={handleSubmit}>
            Add Task
          </button>
        </div>
      )}
    </Formik>
  );
};
