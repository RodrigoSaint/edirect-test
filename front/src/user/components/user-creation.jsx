import React from "react";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";

import { UserSchema } from "../model/user";
import { createUser } from "../userService";
import GenericField from "../../shared/component/generic-field";
import useRequestWithLoading from "../../shared/hook/useRequestWithLoading";

export default () => {
  const history = useHistory();
  const handleUserCreation = React.useCallback(
    (user) => createUser(user).then(() => history.push("/")),
    []
  );

  const { isLoading, request } = useRequestWithLoading(handleUserCreation);

  return (
    <div className="flex one two-600 center">
      <div>
        <h2>Create account</h2>
        <Formik
          initialValues={{ email: "", password: "", name: "" }}
          validationSchema={UserSchema}
          onSubmit={request}
        >
          <Form>
            <GenericField name="name" title="Name" />
            <div className="flex two">
              <GenericField name="email" title="E-mail" />
              <GenericField name="password" title="Password" type="password" />
            </div>
            <button disabled={isLoading} type="submit">
              Sign up
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
