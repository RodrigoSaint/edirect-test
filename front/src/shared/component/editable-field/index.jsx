import React from "react";
import { useField } from "formik";

import "./index.less";

export default ({ name, onDelete, onChange }) => {
  const [isEditMode, setIsEditMode] = React.useState(false);
  const toggleEditMode = React.useCallback(() => setIsEditMode(!isEditMode), [
    isEditMode,
  ]);
  const [field, _, extra] = useField(name);
  const [value, setValue] = React.useState(field.value);

  React.useEffect(() => setValue(field.value), [field.value]);

  const applyValues = () => {
    extra.setValue(value);
    toggleEditMode();
    onChange(value);
  };

  if (isEditMode)
    return (
      <div className="editableField">
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <div className="editableField-action">
          <i
            onClick={applyValues}
            className="editableField-actionItem fa fa-check"
          />
          <i
            onClick={toggleEditMode}
            className="editableField-actionItem fa fa-times"
          />
        </div>
      </div>
    );

  return (
    <div className="editableField">
      <span>{field.value}</span>
      <div className="editableField-action">
        <i
          onClick={toggleEditMode}
          className="editableField-actionItem fa fa-pencil"
        />
        <i
          onClick={onDelete}
          className="editableField-actionItem fa fa-trash"
        />
      </div>
    </div>
  );
};
