import { useParams } from "react-router-dom";

/* HOOKS */
import { useDocument } from "../../hooks/useDocument";

/* COMPONENETS & STYLES */
import ProjectSummary from "./ProjectSummary";
import ProjectComments from "./ProjectComments";
import "./Project.css";

const Project = () => {
  const { id } = useParams();
  // useDocument is real time listener
  const { document, error } = useDocument("projects", id);

  if (error) {
    return <div className="error">{error}</div>;
  }
  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="project-details">
      <ProjectSummary project={document} />
      <ProjectComments project={document} />
    </div>
  );
};

export default Project;
