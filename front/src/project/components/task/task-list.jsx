import React from "react";
import { useFormikContext } from "formik";
import EditableField from "../../../shared/component/editable-field";

import { updateTask, deleteTask } from "../../projectService";

import "./task-list.less";

export default () => {
  const { values, setFieldValue } = useFormikContext();
  const { project } = values;

  const onGoingTaskCollection = React.useMemo(
    () => project.taskCollection.filter((c) => !c.done),
    [project.taskCollection]
  );

  const completedTaskCollection = React.useMemo(
    () => project.taskCollection.filter((c) => c.done),
    [project.taskCollection]
  );

  const onDelete = (index) => {
    const task = onGoingTaskCollection[index];
    setFieldValue(
      "project.taskCollection",
      project.taskCollection.filter((t) => t !== task)
    );
    deleteTask(project._id, task._id);
  };

  const onChange = (index, change) => {
    const task = onGoingTaskCollection[index];
    updateTask(project._id, { ...task, ...change });
  };

  const onComplete = (index) => {
    setFieldValue(`project.taskCollection[${index}].done`, true);
    onChange(index, { done: true });
  };

  return (
    <div className="taskList">
      <div>
        <strong>To do</strong>
      </div>
      {onGoingTaskCollection.map((task, index) => (
        <div key={task._id} className="taskList-item">
          <div>
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => onComplete(index)}
              />
              <span className="checkable" />
            </label>
          </div>
          <EditableField
            name={`project.taskCollection[${index}].name`}
            onDelete={() => onDelete(index)}
            onChange={(name) => onChange(index, { name })}
          />
        </div>
      ))}
      <div>
        <strong>Completed</strong>
      </div>
      {completedTaskCollection.map((task, index) => (
        <div key={task._id} className="taskList-item">
          <div>
            <label>
              <input type="checkbox" checked={task.done} readOnly />
              <span className="checkable">{task.name}</span>
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};
