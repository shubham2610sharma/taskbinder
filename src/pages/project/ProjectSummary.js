import { useNavigate } from "react-router-dom";

/* HOOKS */
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";

/* COMPONENTS & STYLES */
import Avatar from "../../components/Avatar/Avatar";

const ProjectSummary = ({ project }) => {
  const navigate = useNavigate();

  const { user } = useAuthContext();
  const { deleteDocument } = useFirestore("projects");

  const handleClick = () => {
    deleteDocument(project.id);
    navigate("/");
  };

  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
        <p className="due-date">
          Project due by {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">{project.details}</p>
        <h4>Project assigned to:</h4>
        <div className="assigned-users">
          {project.assignedUsersList.map((user) => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
      </div>
      {/* project can be deleted by the owner only */}
      {user.uid === project.createdBy.id && (
        <button className="btn" onClick={handleClick}>
          Mark as Complete
        </button>
      )}
    </div>
  );
};

export default ProjectSummary;
