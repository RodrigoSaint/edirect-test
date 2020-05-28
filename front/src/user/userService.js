import request from "../shared/baseRequest";
const url = "/user";

export const login = (loginRequest) =>
  request(`${url}/login`, {
    method: "POST",
    body: JSON.stringify(loginRequest),
  });

export const createUser = (user) =>
  request(url, {
    method: "POST",
    body: JSON.stringify(user),
  });

export const getCurrentUser = () => request(`${url}/current-user`);
