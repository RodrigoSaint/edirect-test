import React from "react";
import { useField } from "formik";

import "./generic-field.less";

export default ({ name, title, ...rest }) => {
  const [field, meta] = useField(name);

  return (
    <div className="genericField">
      <label>{title}</label>
      <input {...field} {...rest} />
      {meta.error && <div className="genericField-error">{meta.error}</div>}
    </div>
  );
};
