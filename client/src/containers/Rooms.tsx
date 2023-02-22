import React, { createRef, Fragment, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import {
  getAllRooms,
  selectRooms,
  clearRooms,
} from "../features/rooms/roomSlice";
import { clearSignin } from "../features/users/userSlice";
import useUser from "../hooks/useUser";
import useSearch from "../hooks/useSearch";
import useOutsideToClose from "../hooks/useOutsideToClose";
import Search from "../assets/Search.svg";
import Close from "../assets/Close.svg";
import User from "../assets/User.svg";
import AddUser from "../assets/AddUser.svg";
import ChatAdd from "../assets/ChatAdd.svg";
import UserOut from "../assets/UserOut.svg";
import style from "../styles/Rooms.module.css";

const Rooms = () => {
  const navigate = useNavigate();

  const { user } = useUser();

  const dispatch = useDispatch<AppDispatch>();
  const rooms = useSelector(selectRooms);

  const roomsRef = createRef<HTMLDivElement>();
  const { searchTerm, filteredItems, setSearchTerm } = useSearch(rooms);
  const { open, setOpen } = useOutsideToClose(roomsRef);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleLogOut = () => {
    dispatch(clearSignin());
    return navigate("/signin", { replace: true });
  };

  useEffect(() => {
    dispatch(getAllRooms());

    return () => {
      dispatch(clearRooms());
    };
  }, []);

  if (!open) {
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
            <img
              src={UserOut}
              className={style.no_rooms_icon}
              onClick={() => handleLogOut()}
            />
          </Fragment>
        )}
      </div>
    );
  } else
    return (
      <div className={`${style.rooms_list_cont} ${""}`} ref={roomsRef}>
        <div className={style.rooms_close_cont}>
          <img
            src={Close}
            className={style.rooms_close}
            onClick={() => setOpen(!open)}
          />
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className={style.form_search}>
          <input
            type="text"
            placeholder="Search room"
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
          />
        </form>
        <div className={style.rooms_list}>
          {filteredItems.length ? (
            filteredItems.map((item, index) => {
              return (
                <NavLink
                  to={`/chat/${item._id}`}
                  key={index}
                  className={style.rooms_list_item}
                  onClick={() => setOpen(!open)}
                >
                  <img
                    // src={item.image}
                    alt={`${item.roomname} image`}
                    className={style.item_image}
                  />
                  <p className={style.item_name}>{item.roomname}</p>
                </NavLink>
              );
            })
          ) : (
            <NavLink to={`/room/create`} className={style.rooms_list_item}>
              <p className={style.item_name}>Create Room</p>
            </NavLink>
          )}
        </div>
      </div>
    );
};

export default Rooms;
