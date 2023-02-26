import React, { Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Search from "../assets/Search.svg";
import User from "../assets/User.svg";
import AddUser from "../assets/AddUser.svg";
import ChatAdd from "../assets/ChatAdd.svg";
import UserOut from "../assets/UserOut.svg";
import UserProfile from "../assets/UserProfile.svg";
import useUser from "../hooks/useUser";
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import { fetchSignOut } from "../features/users/userSlice";
import style from "../styles/ChatNavbar.module.css";

interface ChatNavbarProps {
  open: boolean;
  setOpen: (b: boolean) => void;
}

const ChatNavbar: React.FC<ChatNavbarProps> = ({ open, setOpen }) => {
  const { user } = useUser();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(fetchSignOut());
    return navigate("/signin", { replace: true });
  };

  return (
    <div className={style.no_rooms_lists_cont}>
      <img
        src={Search}
        className={style.no_rooms_icon}
        onClick={() => setOpen(!open)}
      />
      <NavLink to="/room/create">
        <img src={ChatAdd} className={style.no_rooms_icon} />
      </NavLink>
      {!user?._id ? (
        <Fragment>
          <NavLink to="/signin">
            <img src={User} className={style.no_rooms_icon} />
          </NavLink>
          <NavLink to="/signup">
            <img src={AddUser} className={style.no_rooms_icon} />
          </NavLink>
        </Fragment>
      ) : (
        <Fragment>
          {/* <NavLink to={`/user/${user._id}/details`}>
            <img src={UserProfile} className={style.no_rooms_icon} />
          </NavLink> */}
          <img
            src={UserOut}
            className={style.no_rooms_icon}
            onClick={() => handleLogOut()}
          />
        </Fragment>
      )}
    </div>
  );
};

export default ChatNavbar;
