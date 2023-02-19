import { NavLink } from "react-router-dom";
import Chat from "../assets/Chat.svg";
import User from "../assets/User.svg";
import AddUser from "../assets/AddUser.svg";
import style from "../styles/Navbar.module.css";

const Navbar = () => {
  return (
    <div className={style.nav_cont}>
      {/* <NavLink to="/chat" className={style.nav_item_cont}>
        <img src={Chat} alt="chat-image" className={style.nav_item} />
      </NavLink> */}
      <NavLink to="/signin" className={style.nav_item_cont}>
        <img src={User} alt="user-image" className={style.nav_item} />
      </NavLink>
      <NavLink to="/signup" className={style.nav_item_cont}>
        <img src={AddUser} alt="add-user-image" className={style.nav_item} />
      </NavLink>
    </div>
  );
};

export default Navbar;
