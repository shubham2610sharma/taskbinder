// NavLink same as Link but will by default put a active class on click
import { NavLink } from "react-router-dom";

/* HOOKS */
import { useAuthContext } from "../../hooks/useAuthContext";

/* COMPONENTS, STYLES, & IMAGES */
import Avatar from "../Avatar/Avatar";
import "./Sidebar.css";
import DashboardIcon from "../../assets/dashboard_icon.svg";
import AddIcon from "../../assets/add_icon.svg";

const Sidebar = () => {
  const { user } = useAuthContext();

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          {user && <Avatar src={user.photoURL} />}
          {user && <p>Hey {user.displayName}</p>}
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink to="/">
                <img src={DashboardIcon} alt="dashboard icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <img src={AddIcon} alt="add project icon" />
                <span>New Project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
