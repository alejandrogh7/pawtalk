import { NavLink } from "react-router-dom";
import Chat from "../assets/Chat.svg";
import style from "../styles/NavbarCreateRoom.module.css";

const NavbarCreateRoom = () => {
  return (
    <div className={style.nav_cont}>
      <NavLink to="/chat" className={style.nav_item_cont}>
        <img src={Chat} alt="chat-image" className={style.nav_item} />
      </NavLink>
    </div>
  );
};

export default NavbarCreateRoom;
