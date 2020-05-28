import React from "react";
import { Formik, Form } from "formik";

import { ProjectSchema } from "../model/project";
import { createProject } from "../projectService";
import GenericField from "../../shared/component/generic-field";
import useRequestWithLoading from "../../shared/hook/useRequestWithLoading";

export default ({ onCreate }) => {
  const initialValues = { name: "" };

  const handleProjectCreation = (project, formik) =>
    createProject(project)
      .then(onCreate)
      .then(() => formik.resetForm(initialValues));

  const { isLoading, request } = useRequestWithLoading(handleProjectCreation);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ProjectSchema}
      onSubmit={request}
    >
      <Form>
        <div className="card">
          <header>Create Project</header>
          <div className="cardContent">
            <GenericField name="name" title="Name" />
          </div>
          <footer>
            <button disabled={isLoading} type="submit">
              Save
            </button>
          </footer>
        </div>
      </Form>
    </Formik>
  );
};
