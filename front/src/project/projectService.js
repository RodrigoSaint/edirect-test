import request from "../shared/baseRequest";

const url = "/project";

export const createProject = (project) =>
  request(url, {
    method: "POST",
    body: JSON.stringify(project),
  });

export const getProjects = () => request(url);

export const updateProject = (project) =>
  request(`${url}/${project._id}`, {
    method: "put",
    body: JSON.stringify(project),
  });

export const deleteProject = (projectId) =>
  request(`${url}/${projectId}`, {
    method: "DELETE",
  });

export const createTask = (projectId, task) =>
  request(`${url}/${projectId}/task`, {
    method: "POST",
    body: JSON.stringify(task),
  });

export const updateTask = (projectId, task) =>
  request(`${url}/${projectId}/task/${task._id}`, {
    method: "PUT",
    body: JSON.stringify(task),
  });

export const deleteTask = (projectId, taskId) =>
  request(`${url}/${projectId}/task/${taskId}`, {
    method: "DELETE",
  });
