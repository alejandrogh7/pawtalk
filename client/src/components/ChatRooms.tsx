import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import Chat from "../containers/Chat";
import Rooms from "../containers/Rooms";

type Message = {
  room: string;
  text: string;
};

const ChatRooms = () => {
  const { roomID } = useParams();
  const [messages, setMessages] = useState<Message[] | null>(null);

  if (!messages) {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Rooms />
        <NotFound text={`Room "name" not found`} />
        <Outlet />
      </div>
    );
  } else {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Rooms />
        <Chat />
        <Outlet />
      </div>
    );
  }
};

export default ChatRooms;
