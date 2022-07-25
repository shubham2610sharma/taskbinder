/* HOOKS */
import { useCollection } from "../../hooks/useCollection";

/* COMPONENTS & STYLES */
import Avatar from "../Avatar/Avatar";
import "./OnlineUsers.css";

const OnlineUsers = () => {
  const { isPending, error, documents: users } = useCollection("users");

  return (
    <div className="user-list">
      <h2>All Users</h2>
      {isPending && <div>Loading users...</div>}
      {error && <div>{error}</div>}
      {users &&
        users.map((user) => (
          <div key={user.id} className="user-list-item">
            {user.online && <span className="online-user"></span>}
            <span>{user.displayName}</span>
            <Avatar src={user.photoURL} />
          </div>
        ))}
    </div>
  );
};

export default OnlineUsers;
