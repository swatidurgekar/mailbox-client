import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink to="/compose">
        <button>COMPOSE</button>
      </NavLink>
      <hr />
      <NavLink className="navlink" to="/inbox">
        INBOX
      </NavLink>
      <hr />
      <NavLink className="navlink">Unread</NavLink>
      <hr />
      <NavLink className="navlink">Starred</NavLink>
      <hr />
      <NavLink className="navlink">Drafts</NavLink>
      <hr />
      <NavLink className="navlink" to="/sent">
        Sent
      </NavLink>
      <hr />
      <NavLink className="navlink">Archieve</NavLink>
      <hr />
      <NavLink className="navlink">Spam</NavLink>
      <hr />
      <NavLink className="navlink">Deleted Items</NavLink>
      <hr />
      <NavLink to="/welcome" className="navlink">
        Back
      </NavLink>
      <hr />
    </div>
  );
};

export default Sidebar;
