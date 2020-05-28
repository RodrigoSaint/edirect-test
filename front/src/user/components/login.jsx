import React from "react";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";

import { login } from "../userService";
import { UserContext } from "../provider/current-user";
import GenericField from "../../shared/component/generic-field";
import useRequestWithLoading from "../../shared/hook/useRequestWithLoading";

export default () => {
  const { currentUser, setCurrentUser } = React.useContext(UserContext);
  const history = useHistory();

  React.useEffect(() => {
    if (!currentUser) return;
    history.push("/project");
  }, [currentUser]);

  const handleLogin = React.useCallback(
    (loginRequest) =>
      login(loginRequest).then(({ token, user }) => {
        localStorage.userToken = token;
        setCurrentUser(user);
      }),
    []
  );

  const { isLoading, request } = useRequestWithLoading(handleLogin);

  const onSubmit = React.useCallback(request, [request]);

  return (
    <div className="flex one two-600 center">
      <div>
        <h2>Login Page</h2>
        <Formik initialValues={{ email: "", password: "" }} onSubmit={onSubmit}>
          <Form>
            <div className="flex one two-600">
              <GenericField name="email" title="E-mail" />
              <GenericField name="password" title="Password" type="password" />
            </div>
            <button type="submit">Login</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
