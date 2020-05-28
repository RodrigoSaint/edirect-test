import React from "react";
import { Formik, Form } from "formik";
import EditableField from "../../shared/component/editable-field";

import TaskList from "./task/task-list";
import TaskCreation from "./task/task-creation";
import { updateProject } from "../projectService";

export default ({ project, onDelete }) => {
  const handleDelete = React.useCallback(() => onDelete(project), [project]);
  const handleChange = React.useCallback((name) =>
    updateProject({ ...project, name })
  );
  return (
    <Formik initialValues={{ project }}>
      <Form>
        <div className="card">
          <header>
            <EditableField
              name="project.name"
              onDelete={handleDelete}
              onChange={handleChange}
            />
          </header>
          <div className="cardContent">
            <TaskList />
          </div>
          <footer>
            <TaskCreation />
          </footer>
        </div>
      </Form>
    </Formik>
  );
};
