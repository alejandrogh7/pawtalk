import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import Chat from "../containers/Chat";
import Rooms from "../containers/Rooms";
import style from "../styles/ChatRooms.module.css";

type Message = {
  room: string;
  text: string;
};

const ChatRooms = () => {
  const { roomID } = useParams();
  const [messages, setMessages] = useState<Message[] | null>([]);

  if (!messages) {
    return (
      <div className={style.chat_found}>
        <Rooms />
        <NotFound text={`Room "name" not found`} />
        <Outlet />
      </div>
    );
  } else {
    return (
      <div className={style.chat_found}>
        <Rooms />
        <Chat />
        <Outlet />
      </div>
    );
  }
};

export default ChatRooms;
