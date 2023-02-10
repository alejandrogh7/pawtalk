import React, { createRef } from "react";
import { NavLink } from "react-router-dom";
import useSearch from "../hooks/useSearch";
import useOutsideToClose from "../hooks/useOutsideToClose";
import { Rooms as RoomsInterface } from "../features/rooms/room.interface";
import logo from "../assets/Search.svg";
import close from "../assets/Close.svg";
import style from "../styles/Rooms.module.css";

const rooms: RoomsInterface[] = [
  {
    _id: "63e025961e692de698b862c1",
    image: "",
    roomname: "Room 1",
    description: "Description room 1",
    creator: {
      _id: "63e025841e692de698b862bb",
      name: "Pulga",
    },
  },
  {
    _id: "63e025961e692de698b862n1",
    image: "",
    roomname: "Room 2",
    description: "Description room 2",
    creator: {
      _id: "63e025841e692de698b862ba",
      name: "Monin",
    },
  },
  {
    _id: "63e025961e692de698b862a1",
    image: "",
    roomname: "Games",
    description: "Description room 2",
    creator: {
      _id: "63e025841e692de698b862ba",
      name: "Monin",
    },
  },
  {
    _id: "63e025961e692de698b862q1",
    image: "",
    roomname: "Animals",
    description: "Description room 2",
    creator: {
      _id: "63e025841e692de698b862ba",
      name: "Monin",
    },
  },
  {
    _id: "63e025961e692de698b862q1",
    image: "",
    roomname: "Animals 2",
    description: "Description room 2",
    creator: {
      _id: "63e025841e692de698b862ba",
      name: "Monin",
    },
  },
  {
    _id: "63e025961e692de698b862q1",
    image: "",
    roomname: "Anime",
    description: "Description room 2",
    creator: {
      _id: "63e025841e692de698b862ba",
      name: "Monin",
    },
  },
];

const Rooms = () => {
  const roomsRef = createRef<HTMLDivElement>();
  const { searchTerm, filteredItems, setSearchTerm } = useSearch(rooms);
  const { open, setOpen } = useOutsideToClose(roomsRef);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  if (!open) {
    return (
      <div className={style.no_rooms_lists_cont}>
        <img
          src={logo}
          className={style.no_rooms_search}
          onClick={() => setOpen(!open)}
        />
      </div>
    );
  } else
    return (
      <div className={`${style.rooms_list_cont} ${""}`} ref={roomsRef}>
        <div className={style.rooms_close_cont}>
          <img src={close} className={style.rooms_close} onClick={() => setOpen(!open)} />
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
          {filteredItems.map((item) => {
            return (
              <NavLink
                to={`/chat/${item._id}`}
                key={item._id}
                className={style.rooms_list_item}
              >
                <img
                  src={item.image}
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
