import { useState } from "react";
import { getProjects } from "../api/getItems";
import ProjectCard from "../component/ProjectCard";
import { Project } from "../interface/Project";
import "./index.css";
import EditProjectModal from "../modal/EditProject";

const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>(getProjects());
  const [project, setProject] = useState<Project>();
  const [showEditProjectModal, setShowEditProjectModal] =
    useState<boolean>(false);

  const handleDeleteClick = (project: Project) => {
    setProjects((projects) => projects.filter((p) => p.id !== project.id));
  };
  const handleEditClick = (project: Project) => {
    setProject(project);
    setShowEditProjectModal(true);
  };
  return (
    <>
      <div className="project-list-container">
        {projects.map((project) => (
          <ProjectCard
            project={project}
            handleDeleteClick={handleDeleteClick}
            handleEditClick={handleEditClick}
          />
        ))}
      </div>
      {showEditProjectModal && project && (
        <EditProjectModal
          project={project}
          handleClose={() => setShowEditProjectModal(false)}
          handleSubmit={(project: Project) => {
            setProject(project);
            const nonEditedProjects = [...projects];
            const editedProjects = nonEditedProjects.map((p) =>
              p.id === project.id ? project : p
            );
            setProjects(editedProjects);
            setShowEditProjectModal(false);
          }}
        />
      )}
    </>
  );
};

export default ProjectList;
