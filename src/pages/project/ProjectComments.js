import { useState } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

/* HOOKS & UTILS */
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { timestamp } from "../../firebase/config";

/* STYLES & COMPONENTS */
import Avatar from "../../components/Avatar/Avatar";

const ProjectComments = ({ project }) => {
  const { user } = useAuthContext();
  const { updateDocument, response } = useFirestore("projects");

  const [newComment, setNewComment] = useState("");

  const { comments } = project;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // create comment object
    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: "_" + Math.random().toString(36).substring(2, 9),
    };

    // update document with new comment
    await updateDocument(project.id, {
      comments: [...project.comments, commentToAdd],
    });

    // for new comments reset the state
    if (!response.error) {
      setNewComment("");
    }
  };

  return (
    <div className="project-comments">
      <h4>Project Comments</h4>
      <ul>
        {comments.length > 0 &&
          comments
            .slice(0)
            .reverse()
            .map((comment) => (
              <li key={comment.id}>
                <div className="comment-author">
                  <Avatar src={comment.photoURL} />
                  <p>{comment.displayName}</p>
                </div>
                <div className="comment-date">
                  <p>
                    {formatDistanceToNow(comment.createdAt.toDate(), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                <div className="comment-content">
                  <p>{comment.content}</p>
                </div>
              </li>
            ))}
      </ul>

      <form className="add-comment" onSubmit={handleSubmit}>
        <label>
          <span>Add new comment:</span>
          <textarea
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>
        <button type="submit" className="btn">
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default ProjectComments;
