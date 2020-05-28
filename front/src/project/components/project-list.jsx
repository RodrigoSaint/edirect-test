import React from "react";
import ProjectCard from "./project-card";

import ProjectCreation from "./project-creation";

import { getProjects, deleteProject } from "../projectService";

export default () => {
  const [projectCollection, setProjectCollection] = React.useState([]);

  const addNewProject = (project) =>
    setProjectCollection([...projectCollection, project]);

  const onDelete = (project) => {
    deleteProject(project._id);
    setProjectCollection(projectCollection.filter((p) => p !== project));
  };

  React.useEffect(() => {
    getProjects().then(setProjectCollection);
  }, []);

  return (
    <div className="flex center">
      <h1 className="one">My Projects</h1>
      <div className="flex four">
        <ProjectCreation onCreate={addNewProject} />
        {projectCollection.map((project) => (
          <ProjectCard project={project} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};
