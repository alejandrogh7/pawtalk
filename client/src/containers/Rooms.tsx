import React, { createRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRooms,
  selectRooms,
  clearRooms,
} from "../features/rooms/roomSlice";
import useSearch from "../hooks/useSearch";
import useOutsideToClose from "../hooks/useOutsideToClose";
import Search from "../assets/Search.svg";
import Close from "../assets/Close.svg";
import User from "../assets/User.svg";
import AddUser from "../assets/AddUser.svg";
import style from "../styles/Rooms.module.css";
import { AppDispatch } from "../app/store";

const Rooms = () => {
  const dispatch = useDispatch<AppDispatch>();
  const rooms = useSelector(selectRooms);

  const roomsRef = createRef<HTMLDivElement>();
  const { searchTerm, filteredItems, setSearchTerm } = useSearch(rooms);
  const { open, setOpen } = useOutsideToClose(roomsRef);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        <NavLink to="/signin">
          <img
            src={User}
            className={style.no_rooms_icon}
            onClick={() => setOpen(!open)}
          />
        </NavLink>

        <NavLink to="/signup">
          <img
            src={AddUser}
            className={style.no_rooms_icon}
            onClick={() => setOpen(!open)}
          />
        </NavLink>
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
          {filteredItems.map((item, index) => {
            return (
              <NavLink
                to={`/chat/${item._id}`}
                key={index}
                className={style.rooms_list_item}
              >
                <img
                  // src={item.image}
                  alt={`${item.roomname} image`}
                  className={style.item_image}
                />
                <p className={style.item_name}>{item.roomname}</p>
              </NavLink>
            );
          })}
        </div>
      </div>
    );
};

export default Rooms;
