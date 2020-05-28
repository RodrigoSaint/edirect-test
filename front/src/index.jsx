import React from "react";
import { render } from "react-dom";

import { BrowserRouter, Route } from "react-router-dom";

import Login from "./user/components/login";
import CreateUser from "./user/components/user-creation";
import ListProject from "./project/components/project-list";

import Menu from "./shared/component/menu";
import { UserProvider } from "./user/provider/current-user";

import "./index.less";

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Menu />
        <Route exact path="/project" component={ListProject} />
        <Route exact path="/sign-up" component={CreateUser} />
        <Route exact path="/" component={Login} />
      </BrowserRouter>
    </UserProvider>
  );
};

render(<App />, document.getElementById("app"));
