import React, { createRef, Fragment, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import {
  getAllRooms,
  selectRooms,
  clearRooms,
  selectRoomsStatus,
} from "../features/rooms/roomSlice";
import useSearch from "../hooks/useSearch";
import useOutsideToClose from "../hooks/useOutsideToClose";
import Close from "../assets/Close.svg";
import style from "../styles/Rooms.module.css";
import ChatNavbar from "./CharNavbar";

const Rooms = () => {
  const dispatch = useDispatch<AppDispatch>();
  const rooms = useSelector(selectRooms);
  const roomsStatus = useSelector(selectRoomsStatus);

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
    return <ChatNavbar open={open} setOpen={setOpen} />;
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
          {filteredItems.length && roomsStatus === 200 ? (
            filteredItems.map((item, index) => {
              return (
                <NavLink
                  to={`/chat/${item._id}`}
                  key={index}
                  className={style.rooms_list_item}
                  onClick={() => setOpen(!open)}
                >
                  {/* <img
                    src={item.image}
                    alt={`${item.roomname} image`}
                    className={style.item_image}
                  /> */}
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
