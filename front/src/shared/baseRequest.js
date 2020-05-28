const baseUrl = "http://localhost:3000";

export default (path, config = {}) =>
  fetch(`${baseUrl}${path}`, {
    ...config,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: localStorage.getItem("userToken") || "",
      ...config.headers,
    },
  }).then((result) => result.json());
