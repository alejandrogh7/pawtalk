import { Outlet } from "react-router-dom";
import NotFound from "./NotFound";
import Rooms from "../containers/Rooms";
import style from "../styles/ChatRoomNotFound.module.css";

const ChatRoomNotFound = () => {
  return (
    <div className={style.chat_not_found}>
      <Rooms />
      <NotFound text="Search a room to start to chat" />
      <Outlet />
    </div>
  );
};

export default ChatRoomNotFound;
