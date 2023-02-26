import { Fragment } from "react";
import UserDetails from "../containers/UserDetails";
import User from "../assets/User.svg";
import AddUser from "../assets/AddUser.svg";
import ChatAdd from "../assets/ChatAdd.svg";
import UserOut from "../assets/UserOut.svg";
import UserProfile from "../assets/UserProfile.svg";
import Chat from "../assets/Chat.svg";
import style from "../styles/UserDetailsCont.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { fetchSignOut } from "../features/users/userSlice";
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";

const UserDetailsCont = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useUser();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(fetchSignOut());
    return navigate("/signin", { replace: true });
  };

  return (
    <div className={style.user_det_cont}>
      <div className={style.no_rooms_lists_cont}>
        <NavLink to="/chat">
          <img src={Chat} className={style.no_rooms_icon} />
        </NavLink>
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
            <NavLink to={`/user/${user._id}/details`}>
              <img src={UserProfile} className={style.no_rooms_icon} />
            </NavLink>
            <img
              src={UserOut}
              className={style.no_rooms_icon}
              onClick={() => handleLogOut()}
            />
          </Fragment>
        )}
      </div>
      <UserDetails />
    </div>
  );
};

export default UserDetailsCont;
