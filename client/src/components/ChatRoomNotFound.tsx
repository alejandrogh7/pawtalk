import { Outlet } from "react-router-dom";
import NotFound from "./NotFound";
import Rooms from "../containers/Rooms";

const ChatRoomNotFound = () => {
  return (
    <div>
      <Rooms />
      <NotFound text="Search a room to start to chat" />
      <Outlet />
    </div>
  );
};

export default ChatRoomNotFound;
