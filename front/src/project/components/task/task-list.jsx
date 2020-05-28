import React from "react";
import { useFormikContext } from "formik";
import EditableField from "../../../shared/component/editable-field";

import { updateTask, deleteTask } from "../../projectService";

import "./task-list.less";

export default () => {
  const { values, setFieldValue } = useFormikContext();
  const { project } = values;

  const onDelete = (index) => {
    const task = project.taskCollection[index];
    setFieldValue(
      "project.taskCollection",
      project.taskCollection.filter((t) => t !== task)
    );
    deleteTask(project._id, task._id);
  };

  const onChange = (index, change) => {
    const task = project.taskCollection[index];
    updateTask(project._id, { ...task, ...change });
  };

  return (
    <div className="taskList">
      {project.taskCollection.map((task, index) => (
        <div className="taskList-item">
          <div>
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={(event) =>
                  onChange(index, { done: event.target.value })
                }
              />
              <span class="checkable" />
            </label>
          </div>
          <EditableField
            name={`project.taskCollection[${index}].name`}
            onDelete={() => onDelete(index)}
            onChange={(name) => onChange(index, { name })}
          />
        </div>
      ))}
    </div>
  );
};
