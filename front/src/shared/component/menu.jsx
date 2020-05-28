import React from "react";
import { Link, useHistory } from "react-router-dom";

import { UserContext } from "../../user/provider/current-user";

export default () => {
  const history = useHistory();

  const { currentUser, setCurrentUser } = React.useContext(UserContext);
  const logout = React.useCallback(() => {
    localStorage.removeItem("userToken");
    setCurrentUser(null);
    history.push("/");
  }, []);

  if (!currentUser) {
    return (
      <nav>
        <a href="#" className="brand">
          <span>Project Manager</span>
        </a>

        <input id="bmenub" type="checkbox" className="show" />
        <label htmlFor="bmenub" className="burger pseudo button">
          menu
        </label>

        <div className="menu">
          <Link to="/">Sign in</Link>
          <Link to="/sign-up">Sign up</Link>
        </div>
      </nav>
    );
  }

  return (
    <nav>
      <a href="#" className="brand">
        <span>Project Manager</span>
      </a>

      <input id="bmenub" type="checkbox" className="show" />
      <label htmlFor="bmenub" className="burger pseudo button">
        menu
      </label>

      <div className="menu">
        <span>{currentUser.name}</span>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
};
